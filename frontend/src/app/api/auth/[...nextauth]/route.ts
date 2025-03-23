import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

// Tüm ilgili çevre değişkenlerini logla
console.log('[NextAuth] Environment:', {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NODE_ENV: process.env.NODE_ENV
});

// API URL oluşturma testi
try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ingilizcem.net';
    console.log('[NextAuth] Test URL creation:', {
        apiUrl,
        dashboardUrl: new URL('/dashboard', apiUrl).toString()
    });
} catch (error) {
    console.error('[NextAuth] URL creation test failed:', error);
}

console.log('[NextAuth] Options:', {
    providers: authOptions.providers.map(p => p.id),
    debug: authOptions.debug,
    pages: authOptions.pages,
    session: authOptions.session?.strategy
});

let handler;

try {
    // Handler oluştur
    handler = NextAuth(authOptions);
    console.log('[NextAuth] Handler initialized successfully');
} catch (error) {
    console.error('[NextAuth] Error initializing handler:', error);
    
    // Hata durumunda yedek handler
    handler = () => new Response(
        JSON.stringify({ 
            error: 'Failed to initialize auth',
            message: error instanceof Error ? error.message : String(error)
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
}

// Handler fonksiyonlarını dışa aktar
export { handler as GET, handler as POST };
