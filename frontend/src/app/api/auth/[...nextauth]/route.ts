import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

// Log all relevant environment variables
console.log('[NextAuth] Environment:', {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV
});

console.log('[NextAuth] Options:', {
    providers: authOptions.providers.map(p => p.id),
    debug: authOptions.debug,
    pages: authOptions.pages,
    session: authOptions.session
});

let handler;

try {
    // Create the handler
    handler = NextAuth(authOptions);
    console.log('[NextAuth] Handler initialized successfully');
} catch (error) {
    console.error('[NextAuth] Error initializing handler:', error);
    
    // Create a fallback handler that returns an error
    handler = () => new Response(
        JSON.stringify({ error: 'Failed to initialize auth' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
}

// Export the handler functions
export { handler as GET, handler as POST };
