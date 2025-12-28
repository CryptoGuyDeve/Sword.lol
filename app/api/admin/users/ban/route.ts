import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminCheck = await db.query(
      "SELECT is_admin FROM users WHERE id = $1",
      [(session.user as any).id]
    );
    if (!adminCheck.rows.length || !adminCheck.rows[0].is_admin)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { userId, action } = body;

    if (!userId || !action)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    if (action === "toggle_ban") {
      const userRes = await db.query(
        "SELECT is_banned FROM users WHERE id = $1",
        [userId]
      );
      if (!userRes.rows.length)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

      const newStatus = !userRes.rows[0].is_banned;
      await db.query("UPDATE users SET is_banned = $1 WHERE id = $2", [
        newStatus,
        userId,
      ]);

      return NextResponse.json({ success: true, is_banned: newStatus });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Ban API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
