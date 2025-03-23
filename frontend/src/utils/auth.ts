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
          console.error('Auth yetkilendirme hatası: Email veya şifre boş');
          throw new Error('Email ve şifre gereklidir');
        }

        try {
          // API URL'yi sabit olarak tanımla
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ingilizcem.net';
          const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
          
          console.log('Auth URL:', `${apiUrl}/api/auth/signin`);
          
          const res = await fetch(`${apiUrl}/api/auth/signin`, {
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
            const statusCode = res.status;
            let errorMessage;
            
            try {
              const data = await res.json();
              errorMessage = data.message || `HTTP hatası! Durum kodu: ${statusCode}`;
            } catch (e) {
              errorMessage = `HTTP hatası! Durum kodu: ${statusCode}`;
            }
            
            console.error('Auth yanıt hatası:', errorMessage, statusCode);
            throw new Error(errorMessage);
          }

          const data = await res.json();
          console.log('Auth başarılı yanıt:', JSON.stringify(data));

          if (!data.accessToken) {
            console.error('Auth hatası: JWT token bulunamadı');
            throw new Error('Kimlik doğrulama sunucusu geçerli bir token döndürmedi');
          }

          // User nesnesini döndür
          return {
            id: data.id?.toString() || '0',
            email: data.email || credentials.email,
            name: data.username || data.name || credentials.email,
            accessToken: data.accessToken,
            roles: Array.isArray(data.roles) ? data.roles : [],
          };
        } catch (error) {
          console.error('Auth istisna:', error);
          throw new Error(error instanceof Error ? error.message : 'Kimlik doğrulama başarısız');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // İlk girişte kullanıcı verilerini JWT'ye ekle
      if (user) {
        console.log('JWT callback: User nesnesi alındı');
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      // JWT'den session'a veri aktarımı
      if (token) {
        console.log('Session callback: JWT verisi session\'a ekleniyor');
        session.user.id = token.id as string | undefined;
        session.user.accessToken = token.accessToken as string | undefined;
        session.user.roles = token.roles as string[] | undefined;
      }
      return session;
    },
    async redirect() {
      // Sabit yönlendirme - tüm yönlendirmeleri dashboard'a yap
      return "/dashboard";
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
  secret: process.env.NEXTAUTH_SECRET || 'my-very-secret-key-for-next-auth',
  debug: process.env.NODE_ENV !== 'production',
}

export const getServerAuthSession = () => getServerSession(authOptions);
