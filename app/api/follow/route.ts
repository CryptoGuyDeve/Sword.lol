import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Need user ID. session.user.id was added in auth.ts
  const followerId = (session.user as any).id;

  const { followingId, action } = await request.json(); // followerId should come from session for security

  if (!followingId || !action) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (followerId === followingId) {
    return NextResponse.json(
      { error: "Cannot follow yourself" },
      { status: 400 }
    );
  }

  try {
    if (action === "follow") {
      // Upsert or insert ignoring conflict? Or explicitly check?
      // "ON CONFLICT DO NOTHING" is safest
      await db.query(
        "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [followerId, followingId]
      );

      return NextResponse.json({ success: true, action: "followed" });
    } else if (action === "unfollow") {
      await db.query(
        "DELETE FROM follows WHERE follower_id = $1 AND following_id = $2",
        [followerId, followingId]
      );

      return NextResponse.json({ success: true, action: "unfollowed" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Follow API error:", error);
    return NextResponse.json(
      { error: "Failed to process follow action" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const type = searchParams.get("type"); // 'followers' or 'following'

  if (!userId || !type) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    let users = [];
    if (type === "followers") {
      const { rows } = await db.query(
        `
        SELECT u.id, u.username, u.profile_pic
        FROM follows f
        JOIN users u ON f.follower_id = u.id
        WHERE f.following_id = $1
        ORDER BY f.created_at DESC
      `,
        [userId]
      );
      users = rows;
    } else if (type === "following") {
      const { rows } = await db.query(
        `
        SELECT u.id, u.username, u.profile_pic
        FROM follows f
        JOIN users u ON f.following_id = u.id
        WHERE f.follower_id = $1
        ORDER BY f.created_at DESC
      `,
        [userId]
      );
      users = rows;
    } else {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Follow list API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch follow list" },
      { status: 500 }
    );
  }
}
