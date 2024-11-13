import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInUser } from "./baseaction";
import { IUser } from "@/types/dto/auth";
import { JWT } from "next-auth/jwt";

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: "Firebase Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await signInUser(credentials!);

          if (user) {
            return { ...user, id: user.uid };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        session.user = {
          id: token.id as string,
          fullname: token.fullname as string,
          username: token.username as string,
        } as any;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullname = (user as any).fullname;
        token.username = (user as any).username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};
