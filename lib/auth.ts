import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import bcrypt from "bcrypt";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Allow login with either username or email? For now just username based on input field
        const { rows } = await db.query(
          "SELECT * FROM users WHERE username = $1 OR email = $1",
          [credentials.username]
        );
        const user = rows[0];

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (passwordMatch) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
            image: user.profile_pic,
            onboarding_completed: user.onboarding_completed,
          };
        }
        return null;
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email" } },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "discord") {
        const discordId = profile?.id;
        const email = profile?.email;
        const username = profile?.username;
        const avatar = profile?.avatar;
        const publicFlags = profile?.public_flags;
        const premiumType = profile?.premium_type;

        try {
          // Check if user exists by discord_id
          const { rows: existingDiscord } = await db.query(
            "SELECT * FROM users WHERE discord_id = $1",
            [discordId]
          );

          if (existingDiscord.length > 0) {
            // Update flags/premium if changed
            await db.query(
              "UPDATE users SET discord_username = $1, discord_avatar = $2, discord_public_flags = $3, discord_premium_type = $4 WHERE discord_id = $5",
              [username, avatar, publicFlags, premiumType, discordId]
            );
            user.id = existingDiscord[0].id;
            user.onboarding_completed = existingDiscord[0].onboarding_completed;
            return true;
          }

          // Check if user exists by email
          if (email) {
            const { rows: existingEmail } = await db.query(
              "SELECT * FROM users WHERE email = $1",
              [email]
            );

            if (existingEmail.length > 0) {
              // Link discord account to existing email
              await db.query(
                "UPDATE users SET discord_id = $1, discord_username = $2, discord_avatar = $3, discord_public_flags = $4, discord_premium_type = $5 WHERE email = $6",
                [discordId, username, avatar, publicFlags, premiumType, email]
              );
              user.id = existingEmail[0].id;
              user.onboarding_completed = existingEmail[0].onboarding_completed;
              return true;
            }
          }

          // Create new user
          // Random password hash since it's NOT NULL
          const randomPass = await bcrypt.hash(Math.random().toString(36), 10);

          // Ensure unique username
          let finalUsername = username;
          const { rows: nameCheck } = await db.query(
            "SELECT id FROM users WHERE username = $1",
            [finalUsername]
          );
          if (nameCheck.length > 0) {
            finalUsername = `${username}${Math.floor(Math.random() * 1000)}`;
          }

          const { rows: newUser } = await db.query(
            "INSERT INTO users (username, email, discord_id, discord_username, discord_avatar, discord_public_flags, discord_premium_type, password_hash, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
              finalUsername,
              email,
              discordId,
              username,
              avatar,
              publicFlags,
              premiumType,
              randomPass,
              `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`,
            ]
          );

          user.id = newUser[0].id;
          user.onboarding_completed = newUser[0].onboarding_completed;
          return true;
        } catch (error) {
          console.error("Error in Discord signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        // Add ID to session user
        (session.user as any).id = token.sub;
        session.user.name = token.name;
        (session.user as any).onboarding_completed = token.onboarding_completed;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.onboarding_completed = (user as any).onboarding_completed;
      }

      if (trigger === "update" && session?.onboarding_completed !== undefined) {
        token.onboarding_completed = session.onboarding_completed;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
