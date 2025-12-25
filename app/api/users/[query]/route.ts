import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  // Wait, in app router [query]/route.ts, query is in params.
  // But wait, the folder structure needs to be app/api/users/[query]/route.ts
  // This file usage: fetch("/api/users/" + idOrUsername)

  // Actually, I can't access params here directly if I'm creating the file content, I need to know the folder structure.
  // I will create the file at e:\Programming Projects\Sword.lol\app\api\users\[query]\route.ts

  // Wait, I need to read the path from the context.
  // The function signature:
  // export async function GET(request: Request, { params }: { params: { query: string } })

  // Wait, params are awaited in Next.js 15? Yes.
  // But "next": "15.2.2" in package.json.
  // So params should be awaited.

  const { query } = await params; // await params in Next.js 15

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter required" },
      { status: 400 }
    );
  }

  try {
    // Check if UUID
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        query
      );

    let queryStr = "SELECT * FROM users WHERE username = $1";
    let queryParams = [query];

    if (isUuid) {
      queryStr = "SELECT * FROM users WHERE id = $1";
    }

    const { rows } = await db.query(queryStr, queryParams);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove password_hash
    delete user.password_hash;

    // Fetch aggregate counts
    const countsPromise = db.query(
      `
      SELECT 
        (SELECT COUNT(*) FROM follows WHERE following_id = $1) as followers_count,
        (SELECT COUNT(*) FROM follows WHERE follower_id = $1) as following_count,
        (SELECT COUNT(*) FROM profile_views WHERE user_id = $1) as views_count
    `,
      [user.id]
    );

    // Check if current user follows this user
    const session = await getServerSession(authOptions);
    let isFollowing = false;
    if (session?.user) {
      const followerId = (session.user as any).id;
      const { rows: followRows } = await db.query(
        "SELECT 1 FROM follows WHERE follower_id = $1 AND following_id = $2",
        [followerId, user.id]
      );
      isFollowing = followRows.length > 0;
    }

    const countsResults = await countsPromise;
    const counts = countsResults.rows[0];

    return NextResponse.json({
      ...user,
      followers_count: parseInt(counts.followers_count || "0"),
      following_count: parseInt(counts.following_count || "0"),
      views_count: parseInt(counts.views_count || "0"),
      isFollowing,
    });
  } catch (error) {
    console.error("User fetch API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const { query } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).id !== query) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      username,
      profile_pic,
      bio,
      theme,
      background_video,
      location,
      social_links,
    } = body;

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (username !== undefined) {
      // Check availability if username is changing
      const { rows: existing } = await db.query(
        "SELECT id FROM users WHERE username = $1 AND id != $2",
        [username, query]
      );
      if (existing.length > 0) {
        return NextResponse.json({ error: "Username taken" }, { status: 409 });
      }
      updates.push(`username = $${paramIndex++}`);
      values.push(username);
    }

    if (profile_pic !== undefined) {
      updates.push(`profile_pic = $${paramIndex++}`);
      values.push(profile_pic);
    }
    if (bio !== undefined) {
      updates.push(`bio = $${paramIndex++}`);
      values.push(bio);
    }
    if (theme !== undefined) {
      updates.push(`theme = $${paramIndex++}`);
      values.push(theme);
    }
    if (background_video !== undefined) {
      updates.push(`background_video = $${paramIndex++}`);
      values.push(background_video);
    }
    if (location !== undefined) {
      updates.push(`location = $${paramIndex++}`);
      values.push(location);
    }
    if (social_links !== undefined) {
      updates.push(`social_links = $${paramIndex++}`);
      values.push(social_links);
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: true }); // Nothing to update
    }

    values.push(query); // id for WHERE clause
    await db.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = $${paramIndex}`,
      values
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
