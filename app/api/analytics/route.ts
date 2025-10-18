import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const dateRange = searchParams.get('dateRange') || '30';

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();

  try {
    // Helper to get since date
    const getSince = () => {
      if (dateRange === 'all') return null;
      const since = new Date();
      since.setDate(since.getDate() - (dateRange === '7' ? 6 : 29));
      since.setHours(0, 0, 0, 0);
      return since;
    };

    const since = getSince();

    // Fetch basic analytics
    const [totalViews, uniqueVisitors, followers, following] = await Promise.all([
      supabase
        .from("profile_views")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("profile_views")
        .select("viewer_id")
        .eq("user_id", userId),
      supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("following_id", userId),
      supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", userId),
    ]);

    // Fetch recent followers and viewers
    const [recentFollowers, recentViewers] = await Promise.all([
      supabase
        .from("follows")
        .select("follower_id, users:follower_id(id, username, profile_pic)")
        .eq("following_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("profile_views")
        .select("viewer_id, users:viewer_id(id, username, profile_pic)")
        .eq("user_id", userId)
        .order("viewed_at", { ascending: false })
        .limit(10),
    ]);

    // Fetch views over time
    let viewsQuery = supabase
      .from("profile_views")
      .select("viewed_at")
      .eq("user_id", userId);
    if (since) viewsQuery = viewsQuery.gte("viewed_at", since.toISOString());
    const { data: viewsData } = await viewsQuery;

    // Fetch followers growth
    let followersQuery = supabase
      .from("follows")
      .select("created_at")
      .eq("following_id", userId);
    if (since) followersQuery = followersQuery.gte("created_at", since.toISOString());
    const { data: followersData } = await followersQuery;

    // Fetch top countries
    const { data: countriesData } = await supabase
      .from("profile_views")
      .select("country")
      .eq("user_id", userId);

    // Fetch device breakdown
    const { data: devicesData } = await supabase
      .from("profile_views")
      .select("device")
      .eq("user_id", userId);

    // Process data
    const uniqueVisitorsCount = new Set((uniqueVisitors.data || []).map((v) => v.viewer_id)).size;
    
    const recentFollowersList = ((recentFollowers.data || []).flatMap((f) => 
      Array.isArray(f.users) ? f.users : [f.users]
    ) as any[]).filter(Boolean);
    
    const recentViewersList = ((recentViewers.data || [])
      .flatMap((v) => Array.isArray(v.users) ? v.users : [v.users]) as any[])
      .filter((u) => u && u.id)
      .slice(0, 5);

    // Process views over time
    const days = dateRange === '7' ? 7 : 30;
    const counts: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = since ? new Date(since) : new Date();
      if (since) d.setDate(since.getDate() + i);
      else d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().slice(0, 10);
      counts[key] = 0;
    }
    (viewsData || []).forEach((row: any) => {
      const key = row.viewed_at.slice(0, 10);
      if (counts[key] !== undefined) counts[key]++;
    });

    // Process followers growth
    const followerCounts: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = since ? new Date(since) : new Date();
      if (since) d.setDate(since.getDate() + i);
      else d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().slice(0, 10);
      followerCounts[key] = 0;
    }
    (followersData || []).forEach((row: any) => {
      const key = row.created_at.slice(0, 10);
      if (followerCounts[key] !== undefined) followerCounts[key]++;
    });

    // Process countries
    const countryCounts: Record<string, number> = {};
    (countriesData || []).forEach((row: any) => {
      const country = row.country || 'Unknown';
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    // Process devices
    const deviceCounts: Record<string, number> = {};
    (devicesData || []).forEach((row: any) => {
      const device = row.device || 'Unknown';
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    return NextResponse.json({
      analytics: {
        totalViews: totalViews.count || 0,
        uniqueVisitors: uniqueVisitorsCount,
        followers: followers.count || 0,
        following: following.count || 0,
        recentFollowers: recentFollowersList,
        recentViewers: recentViewersList,
      },
      viewsOverTime: Object.entries(counts).map(([date, views]) => ({ date, views })),
      followersGrowth: Object.entries(followerCounts).map(([date, followers]) => ({ date, followers })),
      topCountries: Object.entries(countryCounts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      deviceBreakdown: Object.entries(deviceCounts)
        .map(([device, count]) => ({ device, count }))
        .sort((a, b) => b.count - a.count),
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
