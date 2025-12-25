import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    // Simple search implementation
    let query = `
      SELECT 
        u.id, 
        u.username, 
        u.profile_pic, 
        u.bio, 
        u.location, 
        u.created_at, 
        u.social_links,
        (SELECT COUNT(*) FROM follows WHERE following_id = u.id) as followers_count,
        (SELECT COUNT(*) FROM profile_views WHERE user_id = u.id) as views_count
      FROM users u
    `;
    let params: any[] = [];

    if (search) {
      query += " WHERE u.username ILIKE $1 OR u.bio ILIKE $1";
      params.push(`%${search}%`);
    }

    query += " ORDER BY u.created_at DESC LIMIT 100";

    const { rows } = await db.query(query, params);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Explore API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
