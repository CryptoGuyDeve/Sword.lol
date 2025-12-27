import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session || !(session.user as any).id) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
  }

  const userId = (session.user as any).id;

  try {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/discord/callback`;

    // Exchange code for token
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const discordUser = userResponse.data;

    // Update user in DB
    await db.query(
      "UPDATE users SET discord_id = $1, discord_username = $2, discord_avatar = $3, discord_public_flags = $4, discord_premium_type = $5 WHERE id = $6",
      [
        discordUser.id,
        `${discordUser.username}#${discordUser.discriminator}`.replace(
          "#0",
          ""
        ),
        discordUser.avatar,
        discordUser.public_flags,
        discordUser.premium_type,
        userId,
      ]
    );

    // Redirect back to customize page
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/account/${userId}/customize?discord=success`
    );
  } catch (error: any) {
    console.error(
      "Discord callback error:",
      error.response?.data || error.message
    );
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/account/${userId}/customize?discord=error`
    );
  }
}
