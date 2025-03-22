import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    accessToken?: string;
    roles?: string[];
  }
  
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      roles?: string[];
    } & DefaultSession["user"]
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    roles?: string[];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Get the backend URL from environment variables or use a default if not available
          const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8080';
          console.log("Using backend URL:", backendUrl);
          
          const res = await fetch(`${backendUrl}/api/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();
          console.log("NextAuth authorize response:", data);

          if (res.ok && data) {
            return {
              id: data.id?.toString(),
              email: data.email || data.username,
              name: data.username,
              accessToken: data.accessToken || data.token,
              roles: data.roles,
            };
          }

          console.error("Authentication failed:", data);
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string | undefined;
        session.user.accessToken = token.accessToken as string | undefined;
        session.user.roles = token.roles as string[] | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // Use a client-side error page instead of API route
    error: '/auth/signin?error=true',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);
