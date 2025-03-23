import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

// Ortam değişkenlerini basitçe göster
console.log('[NextAuth] Başlatılıyor');
console.log('[NextAuth] API_URL:', process.env.NEXT_PUBLIC_API_URL || 'https://ingilizcem.net');

// Handler'ı basit bir şekilde oluştur
let handler;

try {
  // NextAuth handler'ı direk oluştur
  handler = NextAuth(authOptions);
  console.log('[NextAuth] Handler başarıyla oluşturuldu');
} catch (error) {
  console.error('[NextAuth] Handler oluşturma hatası:', error);
  
  // Hata durumunda basit bir yanıt ver
  handler = () => new Response(
    JSON.stringify({ 
      error: 'Kimlik doğrulama hatası',
      time: new Date().toISOString()
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}

// Dışa aktar
export { handler as GET, handler as POST };
