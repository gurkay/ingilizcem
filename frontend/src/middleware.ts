import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
// import { verifyToken } from "./auth"; // Assuming you have an authentication function

export function middleware(req: NextRequest, event: NextFetchEvent) {
  try {
    console.log("middleware çalıştı");
    console.log("req.cookies", req.cookies);
    const token = req.cookies.get("next-auth.session-token");
    const token2 = req.cookies.get("__Secure-next-auth.session-token");
    console.log("token", token);
    console.log("token2", token2);

    if (!token?.value) {
      // Authentication failed
      return NextResponse.redirect(new URL("/auth/signin", req.url)); // Redirect to 
    }

    // Authentication successful, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    // Handle authentication errors
    console.error("Authentication error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during authentication." },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/dashboard/:path",
};
