-- Sword.lol Database Setup Script for NeonDB

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  profile_pic TEXT,
  bio TEXT,
  theme TEXT DEFAULT 'dark',
  background_video TEXT,
  location TEXT,
  profile_views INTEGER DEFAULT 0,
  social_links JSONB DEFAULT '{}'::jsonb,
  badges TEXT[] DEFAULT '{}',
  discord_id TEXT,
  discord_username TEXT,
  discord_avatar TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Follows Table
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (follower_id, following_id)
);

-- Profile Views
CREATE TABLE IF NOT EXISTS profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES users(id),
  country TEXT,
  device TEXT,
  browser TEXT,
  session_duration INTEGER DEFAULT 0,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clicked Links
CREATE TABLE IF NOT EXISTS clicked_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  link TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profile_views_user_id ON profile_views(user_id);
CREATE INDEX IF NOT EXISTS idx_profile_views_viewed_at ON profile_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
