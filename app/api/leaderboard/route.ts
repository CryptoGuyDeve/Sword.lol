import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "views"; // 'views' or 'followers'

    let query = "";
    if (type === "views") {
      query = `
        SELECT 
          u.id, 
          u.username, 
          u.profile_pic, 
          u.badges,
          u.is_verified,
          (SELECT COUNT(*) FROM profile_views WHERE user_id = u.id) as views_count,
          (SELECT COUNT(*) FROM follows WHERE following_id = u.id) as followers_count
        FROM users u
        ORDER BY views_count DESC
        LIMIT 50
      `;
    } else if (type === "followers") {
      query = `
        SELECT 
          u.id, 
          u.username, 
          u.profile_pic, 
          u.badges,
          u.is_verified,
          (SELECT COUNT(*) FROM follows WHERE following_id = u.id) as followers_count,
          (SELECT COUNT(*) FROM profile_views WHERE user_id = u.id) as views_count
        FROM users u
        ORDER BY followers_count DESC
        LIMIT 50
      `;
    } else {
      // Engagement: views + followers weighted or just sum?
      // Let's do views_count + (followers_count * 10)
      query = `
        SELECT 
          u.id, 
          u.username, 
          u.profile_pic, 
          u.badges,
          u.is_verified,
          (SELECT COUNT(*) FROM profile_views WHERE user_id = u.id) as views_count,
          (SELECT COUNT(*) FROM follows WHERE following_id = u.id) as followers_count,
          ((SELECT COUNT(*) FROM profile_views WHERE user_id = u.id) + (SELECT COUNT(*) FROM follows WHERE following_id = u.id) * 10) as engagement_score
        FROM users u
        ORDER BY engagement_score DESC
        LIMIT 50
      `;
    }

    const { rows } = await db.query(query);

    // Format results to ensure numbers are integers
    const formattedRows = rows.map((row: any) => ({
      ...row,
      views_count: parseInt(row.views_count || "0"),
      followers_count: parseInt(row.followers_count || "0"),
      engagement_score: row.engagement_score
        ? parseInt(row.engagement_score)
        : undefined,
    }));

    return NextResponse.json(formattedRows);
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
