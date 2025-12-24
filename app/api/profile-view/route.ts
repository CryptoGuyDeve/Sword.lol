import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { userId, viewerId, country, device, browser } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Check if view already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    // Check for existing view
    // viewerId can be null if anonymous? Previous Supabase code allowed null?
    // Supabase code: .eq("viewer_id", viewerId) would fail if viewerId is null unless handled.
    // If viewerId is provided, we check. If not, maybe we allow logging anonymous views (with viewer_id NULL) but not deduping as strictly?
    // Let's assume strict check if viewerId provided.

    if (viewerId) {
      const { rows } = await db.query(
        "SELECT id FROM profile_views WHERE user_id = $1 AND viewer_id = $2 AND viewed_at >= $3",
        [userId, viewerId, todayISO]
      );

      if (rows.length > 0) {
        return NextResponse.json({
          success: true,
          message: "View already logged today",
        });
      }
    }

    // Insert new view
    await db.query(
      `
      INSERT INTO profile_views (user_id, viewer_id, country, device, browser, session_duration)
      VALUES ($1, $2, $3, $4, $5, 0)
    `,
      [
        userId,
        viewerId || null,
        country || "Unknown",
        device || "Unknown",
        browser || "Unknown",
      ]
    );

    return NextResponse.json({
      success: true,
      message: "View logged successfully",
    });
  } catch (error) {
    console.error("Profile view API error:", error);
    return NextResponse.json(
      { error: "Failed to log profile view" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { userId, viewerId, duration } = await request.json();

  if (!userId || !viewerId || duration === undefined) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Update the most recent view
    // Postgres doesn't allow UPDATE ... ORDER BY ... LIMIT 1 in standard SQL easily (requires subquery with ctid or similar).
    // Better: Find ID first then update.

    const { rows } = await db.query(
      "SELECT id FROM profile_views WHERE user_id = $1 AND viewer_id = $2 ORDER BY viewed_at DESC LIMIT 1",
      [userId, viewerId]
    );

    if (rows.length > 0) {
      const viewId = rows[0].id;
      await db.query(
        "UPDATE profile_views SET session_duration = $1 WHERE id = $2",
        [duration, viewId]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Session duration updated",
    });
  } catch (error) {
    console.error("Session duration API error:", error);
    return NextResponse.json(
      { error: "Failed to update session duration" },
      { status: 500 }
    );
  }
}
