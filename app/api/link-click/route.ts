import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { userId, link } = await request.json();

  if (!userId || !link) {
    return NextResponse.json(
      { error: "User ID and link are required" },
      { status: 400 }
    );
  }

  try {
    // Insert link click
    await db.query(
      "INSERT INTO clicked_links (user_id, link) VALUES ($1, $2)",
      [userId, link]
    );

    return NextResponse.json({
      success: true,
      message: "Link click logged successfully",
    });
  } catch (error) {
    console.error("Link click API error:", error);
    return NextResponse.json(
      { error: "Failed to log link click" },
      { status: 500 }
    );
  }
}
