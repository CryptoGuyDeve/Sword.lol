# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: Sword.lol — Next.js (App Router) + Supabase app for public profiles, follows, analytics, Discord OAuth, and Lemon Squeezy checkout.

Commands
- Install deps: npm install
- Dev server (Turbopack): npm run dev
- Build: npm run build
- Start (prod): npm start
- Lint: npm run lint
- Type check: npx tsc --noEmit
- Tests: no test suite configured in package.json

Environment
- Copy or create .env.local with:
  - NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID, NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID, NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID
  - DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
  - LEMON_SQUEEZY_API_KEY
- Quick sanity checks in browser:
  - /api/test-subscription (builds checkout URLs from env)
  - /api/verify-lemonsqueezy (verifies store/variant via API key)
- Database: use database-setup.sql in Supabase SQL editor to create tables, indexes, RLS, and RPC.

High-level architecture
- Framework/runtime
  - Next.js App Router (app/) with React Server/Client Components and Route Handlers (export async function GET/POST).
  - TypeScript (strict), Tailwind CSS v4 (postcss @tailwindcss/postcss), shadcn/ui components (see components.json aliases), Framer Motion, Radix UI.
- Routing (route groups)
  - app/(root): marketing pages, auth (/login, /signup), pricing, docs, terms, privacy, etc.; wrapped by Navbar/Footer layout.
  - app/(userview)/[username]: public profile page; client records profile views and link clicks.
  - app/(account)/account/[id]: authenticated dashboard (overview, analytics, links, badges, customize, explore); heavy client-side Supabase usage and realtime channels.
- API routes (app/api)
  - analytics/route.ts (GET): aggregates views, followers, devices, countries, growth series.
  - profile-view/route.ts (POST/PUT): log views and update session duration.
  - follow/route.ts (POST/GET): follow/unfollow and list followers/following.
  - link-click/route.ts (POST): track social link clicks.
  - test-subscription/route.ts (GET): returns checkout URLs from env.
  - verify-lemonsqueezy/route.ts (GET): validates Lemon Squeezy store/variant via REST.
  - discord/callback.ts: Pages-style NextApi handler under app/api (see Notes).
- Libraries and utilities
  - lib/supabase-server.ts: createServerClient wired to Next cookies for server-side route handlers.
  - lib/utils.ts: cn utility (clsx + tailwind-merge).
  - Styling globals in app/globals.css; theme tokens, variants, and custom animations.

Data model (Supabase)
- users: profile fields (username, avatar, bio, theme, background_video, location, social_links jsonb, badges), plus Discord fields (discord_id, discord_username, discord_avatar).
- follows: follower_id -> following_id, unique pair.
- profile_views: user_id, viewer_id, country, device, browser, session_duration, viewed_at.
- clicked_links: user_id, link, clicked_at.
- See database-setup.sql for full schema, indexes, RLS policies, and RPC update_last_profile_view_duration.

Key flows (where to look)
- Profile views: app/(userview)/[username] (client) -> app/api/profile-view -> profile_views table; aggregated via app/api/analytics.
- Follow: client actions in account pages -> app/api/follow -> follows table; counts derived via select with count.
- Subscriptions: pricing page constructs Lemon Squeezy checkout URLs from NEXT_PUBLIC_* vars; server verification via app/api/verify-lemonsqueezy.
- Discord OAuth: discord/callback.ts exchanges code -> upserts Discord fields into users.

Notes and gotchas
- Discord route handler is implemented using NextApiRequest/NextApiResponse in app/api/discord/callback.ts. In App Router, convert to a Route Handler (export async function GET) under app/api/discord/callback/route.ts or move to pages/api if using Pages Router.
- Realtime analytics: account pages subscribe to Supabase channels for profile_views and follows; ensure Supabase Realtime is enabled for these tables.
- Public vs server env: values prefixed with NEXT_PUBLIC_* are consumed client-side; LEMON_SQUEEZY_API_KEY and DISCORD_CLIENT_SECRET must remain server-only.
- Next.js version and React 19 per package.json; dev uses --turbopack.
