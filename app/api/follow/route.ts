import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  
  // Check authentication
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { followerId, followingId, action } = await request.json();

  if (!followerId || !followingId || !action) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Ensure user can only follow/unfollow for themselves
  if (followerId !== session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Prevent self-following
  if (followerId === followingId) {
    return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
  }

  try {
    if (action === 'follow') {
      const { error } = await supabase
        .from("follows")
        .insert({ follower_id: followerId, following_id: followingId });
      
      if (error && error.code !== "23505") { // 23505 is unique violation
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      
      return NextResponse.json({ success: true, action: 'followed' });
    } else if (action === 'unfollow') {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", followerId)
        .eq("following_id", followingId);
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      
      return NextResponse.json({ success: true, action: 'unfollowed' });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Follow API error:', error);
    return NextResponse.json({ error: 'Failed to process follow action' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const type = searchParams.get('type'); // 'followers' or 'following'

  if (!userId || !type) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();

  try {
    let query;
    if (type === 'followers') {
      query = supabase
        .from("follows")
        .select("follower_id, users:follower_id(id, username, profile_pic)")
        .eq("following_id", userId)
        .order("created_at", { ascending: false });
    } else if (type === 'following') {
      query = supabase
        .from("follows")
        .select("following_id, users:following_id(id, username, profile_pic)")
        .eq("follower_id", userId)
        .order("created_at", { ascending: false });
    } else {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const users = (data || []).map((item: any) => {
      const userKey = type === 'followers' ? 'follower_id' : 'following_id';
      return item.users;
    }).filter(Boolean);

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Follow list API error:', error);
    return NextResponse.json({ error: 'Failed to fetch follow list' }, { status: 500 });
  }
}
