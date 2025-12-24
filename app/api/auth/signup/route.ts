import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, password, username } = payload || {};
  if (!email || !password || !username) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Validate username format
  if (!/^[_a-zA-Z0-9]{3,20}$/.test(username)) {
    return NextResponse.json(
      { error: "Invalid username format" },
      { status: 400 }
    );
  }

  try {
    // Check if username or email already exists
    const existingCheck = await db.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existingCheck.rows.length > 0) {
      return NextResponse.json(
        { error: "Username or email already taken" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const { rows } = await db.query(
      `INSERT INTO users (username, email, password_hash, theme)
       VALUES ($1, $2, $3, 'dark')
       RETURNING id`,
      [username, email, passwordHash]
    );

    const userId = rows[0].id;

    return NextResponse.json({ userId });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
