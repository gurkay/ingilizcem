import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

console.log('NextAuth handler initialized with options:', {
    providers: authOptions.providers.map(p => p.id),
    baseUrl: process.env.NEXTAUTH_URL,
    debug: authOptions.debug,
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NODE_ENV: process.env.NODE_ENV
    }
});

// Create the handler with more robust error handling
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
