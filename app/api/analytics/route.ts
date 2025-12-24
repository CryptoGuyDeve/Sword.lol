import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const dateRange = searchParams.get("dateRange") || "30";

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const getSince = () => {
      if (dateRange === "all") return null;
      const since = new Date();
      since.setDate(since.getDate() - (dateRange === "7" ? 6 : 29));
      since.setHours(0, 0, 0, 0);
      return since;
    };

    const since = getSince();
    const sinceISO = since ? since.toISOString() : null;

    // Queries
    const queries = [
      // Total Views
      db.query(
        "SELECT COUNT(*) as count FROM profile_views WHERE user_id = $1",
        [userId]
      ),

      // Unique Visitors (approximate distinct viewer_id)
      db.query(
        "SELECT COUNT(DISTINCT viewer_id) as count FROM profile_views WHERE user_id = $1",
        [userId]
      ),

      // Followers Count
      db.query(
        "SELECT COUNT(*) as count FROM follows WHERE following_id = $1",
        [userId]
      ),

      // Following Count
      db.query("SELECT COUNT(*) as count FROM follows WHERE follower_id = $1", [
        userId,
      ]),

      // Recent Followers
      db.query(
        `
        SELECT f.follower_id, u.id, u.username, u.profile_pic
        FROM follows f
        JOIN users u ON f.follower_id = u.id
        WHERE f.following_id = $1
        ORDER BY f.created_at DESC
        LIMIT 5
      `,
        [userId]
      ),

      // Recent Viewers
      db.query(
        `
        SELECT pv.viewer_id, u.id, u.username, u.profile_pic
        FROM profile_views pv
        JOIN users u ON pv.viewer_id = u.id
        WHERE pv.user_id = $1 AND pv.viewer_id IS NOT NULL
        ORDER BY pv.viewed_at DESC
        LIMIT 10
      `,
        [userId]
      ),

      // Views Over Time
      sinceISO
        ? db.query(
            "SELECT viewed_at FROM profile_views WHERE user_id = $1 AND viewed_at >= $2",
            [userId, sinceISO]
          )
        : db.query("SELECT viewed_at FROM profile_views WHERE user_id = $1", [
            userId,
          ]),

      // Followers Growth
      sinceISO
        ? db.query(
            "SELECT created_at FROM follows WHERE following_id = $1 AND created_at >= $2",
            [userId, sinceISO]
          )
        : db.query("SELECT created_at FROM follows WHERE following_id = $1", [
            userId,
          ]),

      // Top Countries
      db.query(
        "SELECT country, COUNT(*) as count FROM profile_views WHERE user_id = $1 GROUP BY country ORDER BY count DESC LIMIT 10",
        [userId]
      ),

      // Device Breakdown
      db.query(
        "SELECT device, COUNT(*) as count FROM profile_views WHERE user_id = $1 GROUP BY device ORDER BY count DESC",
        [userId]
      ),
    ];

    const results = await Promise.all(queries);

    const totalViews = parseInt(results[0].rows[0]?.count || "0");
    const uniqueVisitors = parseInt(results[1].rows[0]?.count || "0");
    const followers = parseInt(results[2].rows[0]?.count || "0");
    const following = parseInt(results[3].rows[0]?.count || "0");
    const recentFollowersList = results[4].rows;
    // For recent viewers, dedup by user id in JS or rely on raw list. The UI expects a list of users.
    // The previous implementation fetched list and sliced.
    // Unique recent viewers:
    const recentViewersRaw = results[5].rows;
    const seenViewers = new Set();
    const recentViewersList = recentViewersRaw
      .filter((u) => {
        if (seenViewers.has(u.id)) return false;
        seenViewers.add(u.id);
        return true;
      })
      .slice(0, 5);

    const viewsData = results[6].rows;
    const followersData = results[7].rows;
    // countries and devices are already grouped by SQL

    // Process views over time (JS grouping similar to previous)
    const days = dateRange === "7" ? 7 : 30;
    const counts: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = since ? new Date(since) : new Date();
      if (since) d.setDate(since.getDate() + i);
      else d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().slice(0, 10);
      counts[key] = 0;
    }

    viewsData.forEach((row: any) => {
      // row.viewed_at is date object or string? pg returns Date object usually.
      const dateStr = new Date(row.viewed_at).toISOString().slice(0, 10);
      if (counts[dateStr] !== undefined) counts[dateStr]++;
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
    followersData.forEach((row: any) => {
      const dateStr = new Date(row.created_at).toISOString().slice(0, 10);
      if (followerCounts[dateStr] !== undefined) followerCounts[dateStr]++;
    });

    return NextResponse.json({
      analytics: {
        totalViews,
        uniqueVisitors,
        followers,
        following,
        recentFollowers: recentFollowersList,
        recentViewers: recentViewersList,
      },
      viewsOverTime: Object.entries(counts).map(([date, views]) => ({
        date,
        views,
      })),
      followersGrowth: Object.entries(followerCounts).map(
        ([date, followers]) => ({ date, followers })
      ),
      topCountries: results[8].rows, // already { country, count }
      deviceBreakdown: results[9].rows, // already { device, count }
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
