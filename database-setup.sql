-- Sword.lol Database Setup Script
-- Run this in your Supabase SQL Editor

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =========================
-- Tables (using IF NOT EXISTS to avoid errors)
-- =========================

-- 1) users table
create table if not exists public.users (
  id uuid primary key,
  username text unique not null,
  profile_pic text,
  bio text,
  theme text,
  background_video text,
  location text,
  profile_views integer default 0,
  social_links jsonb default '{}'::jsonb,
  badges text[] default '{}',
  -- Discord fields
  discord_id text,
  discord_username text,
  discord_avatar text,
  created_at timestamp with time zone default now()
);

-- 2) follows table
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references users(id) on delete cascade,
  following_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (follower_id, following_id)
);

-- 3) profile_views table
create table if not exists public.profile_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  viewer_id uuid references users(id),
  country text,
  device text,
  browser text,
  session_duration integer default 0,
  viewed_at timestamp with time zone default now()
);

-- 4) clicked_links table
create table if not exists public.clicked_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  link text not null,
  clicked_at timestamp with time zone default now()
);

-- =========================
-- Indexes for Performance
-- =========================

-- Profile views indexes
create index if not exists idx_profile_views_user_id on profile_views(user_id);
create index if not exists idx_profile_views_viewed_at on profile_views(viewed_at);
create index if not exists idx_profile_views_viewer_id on profile_views(viewer_id);

-- Follows indexes
create index if not exists idx_follows_follower_id on follows(follower_id);
create index if not exists idx_follows_following_id on follows(following_id);
create index if not exists idx_follows_created_at on follows(created_at);

-- Clicked links indexes
create index if not exists idx_clicked_links_user_id on clicked_links(user_id);
create index if not exists idx_clicked_links_clicked_at on clicked_links(clicked_at);

-- Users indexes
create index if not exists idx_users_username on users(username);
create index if not exists idx_users_discord_id on users(discord_id);

-- =========================
-- Row Level Security (RLS)
-- =========================

-- Enable RLS on all tables
alter table users enable row level security;
alter table follows enable row level security;
alter table profile_views enable row level security;
alter table clicked_links enable row level security;

-- Users policies
drop policy if exists "Users can view all profiles" on users;
create policy "Users can view all profiles" on users for select using (true);

drop policy if exists "Users can update own profile" on users;
create policy "Users can update own profile" on users for update using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on users;
create policy "Users can insert own profile" on users for insert with check (auth.uid() = id);

-- Follows policies
drop policy if exists "Anyone can view follows" on follows;
create policy "Anyone can view follows" on follows for select using (true);

drop policy if exists "Users can manage their own follows" on follows;
create policy "Users can manage their own follows" on follows for all using (auth.uid() = follower_id);

-- Profile views policies
drop policy if exists "Anyone can view profile analytics" on profile_views;
create policy "Anyone can view profile analytics" on profile_views for select using (true);

drop policy if exists "System can insert profile views" on profile_views;
create policy "System can insert profile views" on profile_views for insert with check (true);

drop policy if exists "System can update profile views" on profile_views;
create policy "System can update profile views" on profile_views for update using (true);

-- Clicked links policies
drop policy if exists "Anyone can view link clicks" on clicked_links;
create policy "Anyone can view link clicks" on clicked_links for select using (true);

drop policy if exists "System can insert link clicks" on clicked_links;
create policy "System can insert link clicks" on clicked_links for insert with check (true);

-- =========================
-- Optional RPC Functions
-- =========================

-- Function to update session duration
create or replace function update_last_profile_view_duration(
  p_user_id uuid,
  p_viewer_id uuid,
  p_duration integer
) returns void as $$
begin
  update profile_views 
  set session_duration = p_duration
  where user_id = p_user_id 
    and viewer_id = p_viewer_id
    and viewed_at = (
      select max(viewed_at) 
      from profile_views 
      where user_id = p_user_id and viewer_id = p_viewer_id
    );
end;
$$ language plpgsql security definer;

-- =========================
-- Success Message
-- =========================
select 'Database setup completed successfully!' as status;
