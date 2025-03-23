import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

// Tüm ortam değişkenlerini konsolda göster
console.log('[NextAuth] Environment:', {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    HOSTNAME: process.env.HOSTNAME || 'unknown',
});

// NextAuth ayarlarını log'la
console.log('[NextAuth] Options:', {
    providerIds: authOptions.providers.map(p => p.id),
    debug: authOptions.debug,
    sessionStrategy: authOptions.session?.strategy,
    pages: authOptions.pages,
    hasSecret: !!authOptions.secret,
});

// URL doğrulama testi
try {
    const testUrls = [
        process.env.NEXT_PUBLIC_API_URL || 'https://ingilizcem.net',
        process.env.NEXTAUTH_URL || 'https://ingilizcem.net',
    ];
    
    for (const url of testUrls) {
        // URL'nin geçerli olup olmadığını test et
        try {
            new URL(url);
            console.log(`[NextAuth] URL validation passed: ${url}`);
        } catch (e) {
            console.error(`[NextAuth] INVALID URL: ${url}`, e);
        }
        
        // Dashboard URL oluşturmayı test et
        try {
            const dashboardUrl = new URL('/dashboard', url).toString();
            console.log(`[NextAuth] Dashboard URL test: ${dashboardUrl}`);
        } catch (e) {
            console.error(`[NextAuth] Failed to create dashboard URL from ${url}`, e);
        }
    }
} catch (error) {
    console.error('[NextAuth] URL validation failed:', error);
}

// Handler'ı oluştur ve hataları yakala
let handler;

try {
    handler = NextAuth(authOptions);
    console.log('[NextAuth] Handler başarıyla başlatıldı');
} catch (error) {
    console.error('[NextAuth] Handler başlatma hatası:', error);
    
    // Hata durumunda basit yanıt veren bir handler
    handler = () => new Response(
        JSON.stringify({ 
            error: 'Kimlik doğrulama hizmeti başlatılamadı',
            message: error instanceof Error ? error.message : String(error),
            time: new Date().toISOString()
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
}

// Dışa aktar
export { handler as GET, handler as POST };
