import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password", placeholder: "Your password"}
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
  }
};
