import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

// Ortam değişkenlerini göster
console.log('[NextAuth] Başlatılıyor');
console.log('[NextAuth] Ortam değişkenleri:', {
  PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  BACKEND_API_URL: process.env.BACKEND_API_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NODE_ENV: process.env.NODE_ENV
});
// NextAuth handler'ı oluştur
const handler = NextAuth(authOptions);

// Dışa aktar
export { handler as GET, handler as POST };
