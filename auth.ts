import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";
import type { NextAuthConfig } from "next-auth";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === null || credentials.password === null)
          return null;

        // get user data from db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // check if user exists and passwords match
        if (user && user?.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          // if isMatch returns true then return user else return null
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // if user does not exist or passwords do not match then
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // Set user id from token
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role;
        session.user.name = token.name;
      }

      // console.log(token);

      return session;
    },
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: "signIn" | "signUp" | "update";
      session?: any;
    }) {
      // Initial sign-in or sign-up
      if (user) {
        token.role = user.role;
        if (user.name === "NO_NAME" && user.email) {
          token.name = user.email.split("@")[0];
          // Update user name in db
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        } else {
          token.name = user.name; // Set name from user if it's not NO_NAME
        }
      }

      // Handle session updates from the client
      if (trigger === "update" && session?.name) {
        token.name = session.name; // Update token name with the new name from the session update payload
      }
      return token;
    },
    authorized: async ({ request, auth }: any) => {
      // check session cart for cookie
      if (!request.cookies.get("sessionCartId")) {
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // clone request headers
        const newRequestHeaders = new Headers(request.headers);

        // create new response and add new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // set newly created sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      } else {
        return true;
      }
      // return auth;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
