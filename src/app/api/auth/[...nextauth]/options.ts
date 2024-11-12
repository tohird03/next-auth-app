import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    Github({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Your username' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password' }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Invalid credentials');
          }

          // const userCredential = await createUserWithEmailAndPassword(auth, credentials.username, credentials.password);
          // const user = userCredential.user;
          // return {
          //   id: user?.uid,
          //   name: 'User123',
          //   email: credentials.username,
          // };
          throw new Error('Invalid credentials');
        } catch (error) {
          console.error("Error in credentials provider:", error);
          return null;
        }
      }
    })
  ],
};
