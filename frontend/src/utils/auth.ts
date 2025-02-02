import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiAuthSignIn from "./api";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" |  "password", string> | undefined
      ) {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        try {
          console.log("authorize:::credentials: ", credentials);
          const user = await apiAuthSignIn(credentials);
          console.log("authorize:::user: ", user);
          if (!user) {
            throw new Error("Invalid username or password");
          }
          return user;
        } catch (error) {
          throw new Error((error as Error)?.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = (user as any)?.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Maximum session age in seconds (30 days)
  },

  pages: {
    // signIn: "/auth/signin",
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  secret: process.env.JWT_SECRET as string,
};
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
