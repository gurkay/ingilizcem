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

// Docker ortamında doğru API URL'yi ayarla
export function getApiUrl(): string {
  // Server-side kullanım için BACKEND_API_URL (container-to-container)
  if (typeof window === 'undefined') {
    const backendUrl = process.env.BACKEND_API_URL;
    if (backendUrl) {
      console.log('[Auth] Server-side API URL:', backendUrl);
      return backendUrl;
    }
  }
  
  // Client-side kullanım için NEXT_PUBLIC_API_URL (browser-to-server)
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('[Auth] Client-side API URL:', publicUrl);
  return publicUrl || 'https://ingilizcem.net';
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
          const apiUrl = getApiUrl();
          console.log('[Auth] Kullanılan API URL:', apiUrl);
          
          const signinUrl = `${apiUrl}/api/auth/signin`;
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
          console.log('[Auth] Backend yanıtı:', data);
          
          if (!data.accessToken) {
            console.error('[Auth] Token bulunamadı');
            throw new Error('Kimlik doğrulama başarısız oldu');
          }

          // Kullanıcı nesnesini oluştur
          const user = {
            id: String(data.id || '0'),
            email: data.email,
            name: data.email,
            accessToken: data.accessToken,
            roles: data.roles || [],
          };
          
          console.log('[Auth] Oluşturulan kullanıcı:', user);
          return user;
        } catch (error) {
          console.error('[Auth] Hata:', error);
          throw new Error('Giriş başarısız oldu');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('[Auth] JWT Callback - Giriş:', { 
        hasUser: !!user, 
        hasAccount: !!account,
        token: token ? 'mevcut' : 'yok'
      });

      if (user) {
        console.log('[Auth] JWT oluşturuluyor - Kullanıcı:', {
          id: user.id,
          email: user.email,
          hasToken: !!user.accessToken,
          roles: user.roles
        });
        
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.roles = user.roles;
      }
      
      console.log('[Auth] JWT Callback - Çıkış:', {
        hasToken: !!token,
        hasAccessToken: !!token?.accessToken,
        hasRoles: !!token?.roles
      });
      
      return token;
    },
    async session({ session, token, user }) {
      console.log('[Auth] Session Callback - Giriş:', {
        hasSession: !!session,
        hasToken: !!token,
        hasUser: !!user
      });

      if (token) {
        console.log('[Auth] Session oluşturuluyor - Token:', {
          id: token.id,
          hasAccessToken: !!token.accessToken,
          roles: token.roles
        });

        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.roles = token.roles as string[];
      }

      console.log('[Auth] Session Callback - Çıkış:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        hasAccessToken: !!session?.user?.accessToken
      });

      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('[Auth] Redirect Callback:', { url, baseUrl });
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
    updateAge: 24 * 60 * 60, // 24 saat
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Debug modunu her zaman açık tut
}

export const getServerAuthSession = () => getServerSession(authOptions);
