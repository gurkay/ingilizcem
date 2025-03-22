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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          // Ensure we have a valid API URL - fallback to a hard-coded value if needed
          let baseUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!baseUrl) {
            console.error('NEXT_PUBLIC_API_URL is not defined, using fallback');
            baseUrl = 'https://ingilizcem.net';
          }
          
          // Remove trailing slash if present
          if (baseUrl.endsWith('/')) {
            baseUrl = baseUrl.slice(0, -1);
          }
          
          console.log('Auth baseUrl:', baseUrl);
          
          const res = await fetch(`${baseUrl}/api/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          console.log('Auth response:', data);

          if (!res.ok) {
            const errorMessage = data.message || `HTTP error! status: ${res.status}`;
            console.error('Auth failed:', errorMessage);
            throw new Error(errorMessage);
          }

          if (!data.accessToken) {
            console.error('No access token in response:', data);
            throw new Error('No access token received');
          }

          return {
            id: data.id?.toString() || '0',
            email: data.email || credentials.email,
            name: data.username || data.name || credentials.email,
            accessToken: data.accessToken,
            roles: Array.isArray(data.roles) ? data.roles : [],
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error(error instanceof Error ? error.message : 'Authentication failed');
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
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'NQOSd8J/wnueoxrzwc9BzoSfxvn5vvT9d+pGowghpUA=',
  debug: process.env.NODE_ENV !== 'production',
};

export const getServerAuthSession = () => getServerSession(authOptions);
