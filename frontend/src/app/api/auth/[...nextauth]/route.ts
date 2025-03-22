import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

console.log('NextAuth handler initialized with options:', {
    providers: authOptions.providers.map(p => p.id),
    callbackUrl: process.env.NEXTAUTH_URL,
    debug: authOptions.debug,
});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
