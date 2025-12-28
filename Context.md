# Project Context: Sword.lol

A Next.js 15 + Supabase app for public user profiles, following, analytics, and subscriptions.

## 🔐 Authentication & Database

- **Auth Library**: NextAuth.js (`app/api/auth/[...nextauth]`)
  - **Providers**: Discord (OAuth), Credentials (Username/Password).
  - **Strategy**: JWT Sessions.
  - **User Sync**: Custom `signIn` callback upserts Discord users into the `users` table.
- **Database**: Supabase (PostgreSQL).
  - Accessed via `pg` library (raw SQL).
  - **NOT** using Supabase Auth (GoTrue) for session management directly, but using Supabase as the backend.

## ⚙️ Environment Variables

Required in `.env` / `.env.local`:

```
DATABASE_URL=postgres://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
LEMON_SQUEEZY_API_KEY=...
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=...
NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID=...
NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 📂 Project Structure

- `app/(root)`: Marketing pages (Home, Pricing, Login, Signup).
- `app/(userview)`: Public profile pages (`/[username]`).
- `app/(account)`: User settings (`/account/[id]/...`).
- `app/(admin)`: Admin dashboard (`/admin`).
- `app/(dashboard)`: Main user dashboard (`/dashboard/[username]`).
- `app/api`: Backend routes.
- `app/leaderboard`: Global leaderboard.
- `app/onboarding`: New user onboarding flow.

## 🔌 API Routes

- `/api/auth/[...nextauth]`: NextAuth handler.
- `/api/users/[query]`: GET user data (public/private), PUT updates profile.
- `/api/admin/*`: Admin endpoints.
- `/api/leaderboard`: Fetches top users.
- `/api/profile-view`: Logs analytics.
- `/api/follow`: Handles follow/unfollow actions.
- `/api/verify-lemonsqueezy`: Validates subscriptions.

## 💾 Database Schema

**users table updates:**

- `widgets` (jsonb): configurations for profile widgets.
- `is_verified` (boolean): Verification badge status.
- `onboarding_completed` (boolean): Tracks onboarding status.
- `discord_public_flags`, `discord_premium_type`: Stored from Discord profile.

**Key Tables:** `users`, `follows`, `profile_views`, `clicked_links`.

## 🧩 Key Features

1.  **Profiles**: Highly customizable. Widget support (JSONB).
2.  **Payments**: Lemon Squeezy integration. Client generates links -> Webhook/API verifies.
3.  **Admin**: Dedicated area for user management.
4.  **Analytics**: Custom solution logging to Postgres.

## 🚀 Development Workflow

1.  `npm run dev` to start.
2.  Database changes: Run SQL in Supabase Dashboard.
3.  Auth debugging: Check `lib/auth.ts`.
