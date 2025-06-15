import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

/**
 * ✅ Define your own server-side user shape
 */
interface AppUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  username: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AppUser | null> {
        if (!credentials) return null;

        await dbConnect();

        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        }) as (typeof UserModel)["prototype"] | null;

        if (!user) {
          throw new Error("No user found");
        }

        if (!user.isVerified) {
          throw new Error("Please verify your account");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // ✅ Return matches AppUser
        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          name: user.username,
          email: user.email,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
          username: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AppUser; // ✅ cast to your type
        token._id = u._id;
        token.isVerified = u.isVerified;
        token.isAcceptingMessages = u.isAcceptingMessages;
        token.username = u.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/sign-in",
  },
};
