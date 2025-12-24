import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    // Simple search implementation
    let query =
      "SELECT id, username, profile_pic, bio, location, created_at, social_links FROM users";
    let params: any[] = [];

    if (search) {
      query += " WHERE username ILIKE $1 OR bio ILIKE $1";
      params.push(`%${search}%`);
    }

    query += " ORDER BY created_at DESC LIMIT 100";

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
