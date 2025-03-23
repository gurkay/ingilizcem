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

// Basit URL oluşturma - API URL'yi doğrudan döndür, yol eklemeye çalışma
function getApiUrl(): string {
  // Sabit URL döndür, karmaşık URL işlemlerinden kaçın
  return process.env.NEXT_PUBLIC_API_URL || 'https://ingilizcem.net';
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
          console.error('[Auth] Email veya şifre boş');
          throw new Error('Email ve şifre gereklidir');
        }

        try {
          // Basit sabit URL kullan
          const apiUrl = getApiUrl();
          console.log('[Auth] API URL:', apiUrl);
          
          // Tam URL oluşturmadan sabit URL kullan
          const signinUrl = apiUrl + '/api/auth/signin';
          console.log('[Auth] Giriş URL:', signinUrl);
          
          const res = await fetch(signinUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorMsg = `Giriş başarısız: HTTP ${res.status}`;
            console.error('[Auth] Hata:', errorMsg);
            throw new Error(errorMsg);
          }

          const data = await res.json();
          
          if (!data.accessToken) {
            console.error('[Auth] Token bulunamadı');
            throw new Error('Kimlik doğrulama başarısız oldu');
          }

          // Basit kullanıcı nesnesi döndür
          return {
            id: String(data.id || '0'),
            email: data.email,
            name: data.email,
            accessToken: data.accessToken,
            roles: data.roles || [],
          };
        } catch (error) {
          console.error('[Auth] Hata:', error);
          throw new Error('Giriş başarısız oldu');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('[Auth] JWT oluşturuluyor');
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log('[Auth] Oturum oluşturuluyor');
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.roles = token.roles as string[];
      }
      return session;
    },
    async redirect() {
      // Basit, sabit bir URL döndür - her zaman dashboard
      return '/dashboard';
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  secret: process.env.NEXTAUTH_SECRET || 'my-secret-key-for-next-auth',
  debug: process.env.NODE_ENV !== 'production',
}

export const getServerAuthSession = () => getServerSession(authOptions);
