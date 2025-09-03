# Project Context: Sword.lol

A Next.js + Supabase app for public user profiles, following, basic analytics, Discord OAuth, and Lemon Squeezy-powered checkout.

## Environment Variables

Set the following in `.env.local` (values are read directly by client and server code):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID`
- `NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID`
- `NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID`
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `LEMON_SQUEEZY_API_KEY`

Notes:
- Discord OAuth redirect is currently hardcoded to `http://localhost:3000/auth/discord/callback` in `app/api/discord/callback.ts`.
- Lemon Squeezy checkout URLs are constructed on the client using the public Store and Variant IDs.

## Quickstart

1) Create `.env.local` with all variables listed above.
2) Create the Supabase tables using the SQL below (add the three Discord fields on `users`).
3) Ensure your Lemon Squeezy Store and Variant IDs are correct and products are published.
4) Run the app:
   - Install: `npm install`
   - Dev: `npm run dev`
5) Test config:
   - Visit `/pricing` and click Premium to test checkout URL generation.
   - Call `/api/verify-lemonsqueezy` and `/api/test-subscription` in the browser to confirm env/config.

## API Routes (Next.js)

- `/api/verify-lemonsqueezy` (GET): Verifies Lemon Squeezy configuration via REST API using `LEMON_SQUEEZY_API_KEY` and public IDs.
- `/api/test-subscription` (GET): Returns computed checkout URLs for premium/basic variants from env variables.
- `/api/discord/callback` (GET): Handles Discord OAuth code exchange, fetches user info, and upserts Discord fields into `users`.

## Top-Level Routes (App Router)

- `/` Home (marketing) under `app/(root)/page.tsx`
- `/login`, `/signup` under `app/(root)/(auth)/`
- `/pricing` checkout entry with plan selection
- `/premium`, `/get-started`, `/docs`, `/privacy`, `/terms`, `/copyright`
- `/leaderboard` (UI placeholder if not wired to data)
- `/:username` public profile under `app/(userview)/[username]/`
- `/account/:id` and subpages (badges, customize, explore, links) under `app/(account)/account/[id]/`

## Database Schema (Supabase SQL)

```sql
-- Users table
create table users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  profile_pic text,
  bio text,
  theme text,
  background_video text,
  location text,
  profile_views integer default 0,
  social_links jsonb,
  badges text[],
  -- Discord fields referenced by the app
  discord_id text,
  discord_username text,
  discord_avatar text,
  created_at timestamp with time zone default now()
);

-- Follows table (followers/following)
create table follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references users(id) on delete cascade,
  following_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (follower_id, following_id)
);

-- Profile views analytics
create table profile_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  viewer_id uuid references users(id),
  country text,
  device text,
  browser text,
  session_duration integer default 0,
  viewed_at timestamp with time zone default now()
);
```

Optional RPC used for analytics cleanup (commented in code):
```sql
-- create function update_last_profile_view_duration(user_id uuid, viewer_id uuid, duration integer) ...
```

## Main Features

- **User profiles**: Username, avatar, bio, theme, YouTube background video, location, badges, social links.
- **User pages**: Public profile at `/(userview)/[username]` with animated UI and YouTube background.
- **Follow system**: Follow/unfollow, follower and following counts, lists via `follows` table.
- **Profile analytics**: Logs unique daily views to `profile_views` with country, device, browser, and session duration tracking.
- **Discord OAuth**: OAuth code exchange and user upsert of Discord fields.
- **Subscriptions**: Lemon Squeezy checkout links (basic/premium) generated on the client from env vars; verification endpoint available.
- **Pricing UI**: Interactive pricing page with plan features and checkout redirect.

## Directory Structure (high-level)

- `app/` App Router pages and route handlers
  - `(root)/` marketing + auth + pricing
  - `(userview)/[username]/` public profile page
  - `(account)/account/[id]/` account pages (badges/customize/explore/links)
  - `api/` route handlers: `discord/callback`, `verify-lemonsqueezy`, `test-subscription`
- `components/` shared components and UI primitives (Radix-based)
- `lib/` utilities
- `public/` static assets

## Data Flows

- Authentication (Supabase):
  - Client creates Supabase client with `NEXT_PUBLIC_*` keys.
  - Session read via `supabase.auth.getUser()` or `getSession()`.
  - Discord OAuth flow is custom: browser is redirected to Discord, which redirects to `/api/discord/callback` with a code; server exchanges code for access token, fetches Discord user and upserts Discord fields in `users`.

- Subscription (Lemon Squeezy):
  - On `/pricing`, when user selects a plan, the client builds a checkout URL using Store/Variant IDs, user email/id, optional custom fields, and a `redirect_url` back to `/account/:id`.
  - `/api/verify-lemonsqueezy` can be used to validate Store and Variant IDs using `LEMON_SQUEEZY_API_KEY`.

- Profile Analytics:
  - On visiting `/:username`, the client queries `users` for profile data.
  - A view record is inserted in `profile_views` if not already logged for the viewer on the same day (fields: country via `ipapi.co`, device/browser via Bowser, session_duration initially 0).
  - On unmount, code is prepared to update last session duration via an RPC (currently commented out).

- Follow System:
  - `follows` has unique `(follower_id, following_id)`.
  - Client inserts/deletes to follow/unfollow; counts derived by `count` queries.

## Technologies

- Next.js (App Router, React, client components)
- Supabase (Auth, PostgreSQL, JS client)
- Lemon Squeezy (checkout and API verification)
- Discord OAuth (axios-based token/user fetch)
- UI/UX: Framer Motion, Radix UI, Tailwind CSS, React Icons, Bowser (UA parsing)

## Security & Assumptions

- Client uses public Supabase anon key; row-level security should be configured appropriately in Supabase (not defined here).
- Discord callback uses `NextApiRequest`/`NextApiResponse` in a file under `app/api/*`. In App Router, prefer a Route Handler (`export async function GET/POST`) signature; current code may require the Pages router or an adapter.
- Lemon Squeezy checkout is client-driven; validate purchases server-side for production (webhooks or API checks) before granting entitlements.
- The `users` table is assumed to exist and be used for both auth user profile and app profile data.

## Limitations / TODOs

- No webhook handling for Lemon Squeezy to confirm payment and entitlements.
- Discord OAuth flow lacks state/CSRF protection and uses a hardcoded redirect URI.
- Session duration RPC is not implemented.
- No explicit RLS policies included in this repo.

---

Update this context as you add more features or entities.