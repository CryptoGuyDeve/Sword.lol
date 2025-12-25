import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
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
