import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/discord/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "Discord client ID not configured" },
      { status: 500 }
    );
  }

  const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=identify`;

  return NextResponse.redirect(url);
}
