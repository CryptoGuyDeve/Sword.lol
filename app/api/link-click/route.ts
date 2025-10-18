import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  
  const { userId, link } = await request.json();

  if (!userId || !link) {
    return NextResponse.json({ error: 'User ID and link are required' }, { status: 400 });
  }

  try {
    // Insert link click
    const { error } = await supabase.from("clicked_links").insert({
      user_id: userId,
      link: link,
      clicked_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Link click logged successfully' });
  } catch (error) {
    console.error('Link click API error:', error);
    return NextResponse.json({ error: 'Failed to log link click' }, { status: 500 });
  }
}
