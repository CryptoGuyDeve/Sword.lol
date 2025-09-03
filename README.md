# Sword.lol

A Next.js + Supabase app for public user profiles with customization, follows, analytics, Discord OAuth, and Lemon Squeezy-powered checkout.

## Features

- User profiles: avatar, bio, theme, background YouTube video, location, badges, social links
- Public pages at /:username with animated UI
- Follow system (followers/following with counts and lists)
- Profile analytics (country, device, browser, session duration)
- Discord OAuth (fetch and store Discord user info)
- Subscriptions via Lemon Squeezy (client-side checkout with verification endpoint)
- Beautiful UI with Framer Motion, Radix UI, Tailwind, React Icons

## Tech Stack

- Next.js (App Router)
- Supabase (Auth, Postgres, Storage)
- Lemon Squeezy (checkout + API)
- Discord OAuth
- UI/UX: Tailwind CSS, Framer Motion, Radix UI, React Icons, Bowser

## Quickstart

1) Clone and install:
```bash
git clone <your-repo-url>
cd Sword.lol
npm install
```

2) Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=...
NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID=...
NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID=...

DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
LEMON_SQUEEZY_API_KEY=...
```

3) Create Supabase schema (run in Supabase SQL editor). Includes `users`, `follows`, `profile_views`, `clicked_links`, Discord fields, indexes, RLS, and optional RPC:
- See `Context.md` for the full SQL, or use the consolidated SQL in the repo’s docs.

4) Run:
```bash
npm run dev
```

5) Validate config:
- Open `/pricing` and start checkout (requires signed-in user)
- Check `/api/test-subscription` and `/api/verify-lemonsqueezy`

## Environment Notes

- Discord OAuth redirect is currently:
```
http://localhost:3000/auth/discord/callback
```
Update as needed in `app/api/discord/callback.ts`.

- Lemon Squeezy checkout URLs are assembled client-side using Store/Variant IDs.

## App Structure

- `app/` App Router
  - `(root)/` marketing + auth + pricing
  - `(userview)/[username]/` public profile
  - `(account)/account/[id]/` dashboard: `customize`, `links`, `explore`, `badges`
  - `api/`: `discord/callback`, `verify-lemonsqueezy`, `test-subscription`
- `components/` shared UI, `Sidebar`, etc.
- `lib/` utilities
- `public/` assets

## Key Routes

- Public: `/`, `/pricing`, `/leaderboard`, `/:username`
- Auth: `/login`, `/signup`
- Account: `/account/:id`, `/account/:id/customize`, `/account/:id/links`, `/account/:id/explore`, `/account/:id/badges`
- API:
  - `GET /api/test-subscription` – Build checkout URLs from ENV
  - `GET /api/verify-lemonsqueezy` – Validate store/variants via API key
  - `GET /api/discord/callback` – Exchange OAuth code, store Discord user info

## Database Overview

Tables used in app:
- `users(id, username, profile_pic, bio, theme, background_video, location, profile_views, social_links, badges, discord_id, discord_username, discord_avatar, created_at)`
- `follows(id, follower_id, following_id, created_at, unique(follower_id,following_id))`
- `profile_views(id, user_id, viewer_id, country, device, browser, session_duration, viewed_at)`
- `clicked_links(id, user_id, link, clicked_at)`

Optional RPC for updating last session duration:
- `update_last_profile_view_duration(user_id, viewer_id, duration)`

See `Context.md` for full SQL and policies.

## Development Notes

- After signup, the app upserts a `users` row linked to the auth user id.
- If a `users` row is missing on dashboard load, it auto-creates one from auth metadata/email.
- Customize page supports changing username with live availability checks.
- Sidebar uses fixed height (`h-screen`); main content scrolls (`overflow-y-auto`).

## Security and Production Hardening

- Configure Supabase RLS to restrict writes to owners; examples included in SQL.
- Add OAuth `state` parameter for CSRF protection in Discord flow.
- Move Discord callback to a Next.js Route Handler shape if desired.
- Add Lemon Squeezy webhooks to confirm purchases before granting entitlements.
- Validate and sanitize user-generated content (e.g., URLs, usernames).

## Troubleshooting

- Missing env vars: check `/api/test-subscription` and `/api/verify-lemonsqueezy`.
- Profiles not found: ensure `users` table exists and RLS allows owner insert/update.
- Discord callback 404: ensure redirect URI matches the configured route and Discord app settings.

## License

MIT
