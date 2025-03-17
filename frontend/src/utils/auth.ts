import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth";
import apiAuthSignIn from "./api";

declare module "next-auth" {
  interface User {
    id?: string;
    accessToken?: string;
    roles?: string[];
    token?: string;
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
          const result = await apiAuthSignIn(credentials);
          
          if (result.error) {
            throw new Error(result.error);
          }

          // Backend'den gelen token ve kullanıcı bilgilerini döndür
          return {
            id: result.userID,
            email: credentials?.email,
            token: result.token,
            // Diğer gerekli kullanıcı bilgileri...
          };
        } catch (error) {
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 saat
  },
  callbacks: {
    async jwt({ token, user }) {
      // user bilgisi varsa token'a ekle
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // token bilgilerini session'a ekle
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const getServerAuthSession = () => getServerSession(authOptions);
