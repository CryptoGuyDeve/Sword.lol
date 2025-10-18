import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  
  const { userId, viewerId, country, device, browser } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Check if view already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: existingView } = await supabase
      .from("profile_views")
      .select("id")
      .eq("user_id", userId)
      .eq("viewer_id", viewerId)
      .gte("viewed_at", today.toISOString())
      .single();

    if (existingView) {
      return NextResponse.json({ success: true, message: 'View already logged today' });
    }

    // Insert new view
    const { error } = await supabase.from("profile_views").insert({
      user_id: userId,
      viewer_id: viewerId,
      country: country || 'Unknown',
      device: device || 'Unknown',
      browser: browser || 'Unknown',
      session_duration: 0,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'View logged successfully' });
  } catch (error) {
    console.error('Profile view API error:', error);
    return NextResponse.json({ error: 'Failed to log profile view' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const supabase = createSupabaseServerClient();
  
  const { userId, viewerId, duration } = await request.json();

  if (!userId || !viewerId || duration === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Update the most recent view for this user/viewer combination
    const { error } = await supabase
      .from("profile_views")
      .update({ session_duration: duration })
      .eq("user_id", userId)
      .eq("viewer_id", viewerId)
      .order("viewed_at", { ascending: false })
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Session duration updated' });
  } catch (error) {
    console.error('Session duration API error:', error);
    return NextResponse.json({ error: 'Failed to update session duration' }, { status: 500 });
  }
}
