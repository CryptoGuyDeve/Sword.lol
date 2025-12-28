import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // You might need to verify where authOptions is exported from
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin status from DB (safer than relying on session if session is stale)
    const adminCheck = await db.query(
      "SELECT is_admin FROM users WHERE id = $1",
      [(session.user as any).id]
    );

    if (adminCheck.rows.length === 0 || !adminCheck.rows[0].is_admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch Users
    const usersRes = await db.query(`
            SELECT id, username, email, created_at, is_verified, is_admin, is_banned, stripe_account_id
            FROM users 
            ORDER BY created_at DESC 
            LIMIT 100
        `);

    // Fetch Stats
    const totalUsersRes = await db.query("SELECT COUNT(*) FROM users");
    const totalViewsRes = await db.query("SELECT COUNT(*) FROM profile_views");

    const stats = {
      totalUsers: parseInt(totalUsersRes.rows[0].count),
      premiumUsers: 0, // Implement later
      totalViews: parseInt(totalViewsRes.rows[0].count),
    };

    return NextResponse.json({
      users: usersRes.rows,
      stats,
    });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
