import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    await db.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
    `);

    return NextResponse.json({
      success: true,
      message: "Migration successful",
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
