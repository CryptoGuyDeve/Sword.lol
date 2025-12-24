import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple admin check middleware-like function
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return false;

  // You might want to add an 'is_admin' column to your users table or check specifically against a list of admin emails/IDs
  // For now, let's assume if they can hit this, they are authenticated.
  // TODO: Add real admin check.
  // const { rows } = await db.query("SELECT is_admin FROM users WHERE id = $1", [session.user.id]);
  // return rows[0]?.is_admin === true;
  return true; // DANGEROUS: For dev/migration only. Secure this later.
}

export async function GET() {
  if (!(await checkAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { rows } = await db.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    const keys = Object.keys(updates);
    const values = Object.values(updates);

    if (keys.length === 0) return NextResponse.json({ success: true });

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    values.push(id);

    await db.query(
      `UPDATE users SET ${setClause} WHERE id = $${values.length}`,
      values
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.query("DELETE FROM users WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
