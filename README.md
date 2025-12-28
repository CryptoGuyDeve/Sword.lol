# Sword.lol

> Public user profiles with customization, follows, analytics, Discord OAuth, and Lemon Squeezy subscriptions — built with Next.js 15, NextAuth, and Supabase (Postgres).

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Lemon Squeezy](https://img.shields.io/badge/Lemon%20Squeezy-Payments-FFDD57?style=for-the-badge)](https://docs.lemonsqueezy.com/)
[![Discord](https://img.shields.io/badge/Discord-OAuth-7289DA?style=for-the-badge&logo=discord)](https://discord.com/developers/docs/intro)

## ✨ Overview

Sword.lol is a premium public profile platform where users can:

- **Create customizable profile pages**: Avatar, bio, theme, background YouTube video, location, widgets, and social links.
- **Follow system**: Follow other users with real-time counts.
- **Analytics**: Track detailed profile views (country, device, browser, session duration).
- **Gamification**: Leaderboards and badges (including "Verified" status).
- **Monetization**: Lemon Squeezy subscriptions for premium features.
- **Admin Dashboard**: Manage users and view platform stats.

## 🚀 Features

- **Public Profiles**: `/:username` with animated UI, themes, and widgets.
- **Authentication**: NextAuth.js with Discord OAuth and Credentials.
- **Database**: Supabase (PostgreSQL) accessed via `pg`.
- **Admin Panel**: Dedicated admin dashboard at `/admin`.
- **Leaderboard**: Global user rankings at `/leaderboard`.
- **Onboarding**: Smooth onboarding flow for new users.
- **Analytics**: Custom tracking of profile views and link clicks.
- **Payments**: Lemon Squeezy integration for subscriptions.

## 🛠️ Tech Stack

| Category  | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 15 (App Router)             |
| Language  | TypeScript                          |
| Auth      | NextAuth.js (Discord + Credentials) |
| Database  | Supabase (PostgreSQL)               |
| Payments  | Lemon Squeezy                       |
| Styling   | Tailwind CSS                        |
| UI Libs   | Radix UI, Framer Motion             |
| Icons     | React Icons, Lucide React           |

## 📁 Project Structure

```
app/
  (admin)/       # Admin dashboard routes
  (account)/     # User account settings (customize, links, badgs)
  (dashboard)/   # User main dashboard
  (root)/        # Marketing pages (home, pricing, auth)
  (userview)/    # Public profile pages
  api/           # API Routes (auth, users, admin, analytics, etc.)
  leaderboard/   # Leaderboard page
  onboarding/    # Onboarding flow
components/      # Reusable UI components
lib/             # Utilities (db connection, auth options)
public/          # Static assets
```

## ⚙️ Environment Variables

Create `.env` (or `.env.local`) with:

```bash
# Database (Supabase Connection String)
DATABASE_URL=postgres://postgres:[PASSWORD]@[HOST]:[PORT]/postgres

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Discord OAuth
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=
NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID=
NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID=

# Supabase (Public)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 💾 Database Schema (Key Tables)

The project uses a standard PostgreSQL schema.

- **users**: Stores profile info, auth details, and Discord data.
  - New fields: `widgets` (jsonb), `is_verified` (bool), `onboarding_completed` (bool).
- **follows**: Tracks follower/following relationships.
- **profile_views**: Analytics data for profile visits.
- **clicked_links**: Analytics for social link clicks.

## 🔌 Key API Routes

- `/api/auth/[...nextauth]`: Authentication handler (NextAuth).
- `/api/users/[query]`: Fetch/Update user data (PUT for updates).
- `/api/leaderboard`: Fetch leaderboard data.
- `/api/admin/*`: Admin-specific endpoints.
- `/api/verify-lemonsqueezy`: Verify subscription status.

## 🧩 Local Development

1. **Clone & Install**:

   ```bash
   git clone <repo>
   npm install
   ```

2. **Setup Env**:
   Copy `.env.example` to `.env.local` and fill in credentials.

3. **Run**:

   ```bash
   npm run dev
   ```

4. **Visit**: `http://localhost:3000`

## 🤝 Contributing

1. Fork & Clone
2. Create Feature Branch
3. Submit PR

## License

MIT
