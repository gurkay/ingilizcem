import axios from "axios";
import { BACKEND_API, FRONTEND_API } from "./constants";

export async function apiAuthSignUp(credentials: {
  email: string;
  password: string;
}) {
  try {
    console.log(`backendSignUp:::${FRONTEND_API}/api/auth/signup`);
    console.log("credentials", credentials);
    // Docker ortamında doğru URL'yi kullan
    let apiUrl;
    if (typeof window === 'undefined') {
      // Server-side rendering durumunda
      apiUrl = process.env.BACKEND_API_URL;
      console.log('[Auth] Server-side giriş URL yapısı kullanılıyor');
    } else {
      // Client-side rendering durumunda
      apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log('[Auth] Client-side giriş URL yapısı kullanılıyor');
    }

    if (!apiUrl) {
      apiUrl = 'https://ingilizcem.net';
    }
    const response = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("credentials", credentials);
    if (!response.ok) {
      return new Error("Sign-up failed");
    }

    const data = await response.json();
    console.log("data", data);
    if (data.error) {
      return { error: data.message };
    }

    return data; // Return the response data on successful sign-up
  } catch (error) {

    console.log((error as Error)?.message, "No connection to Backend");
    return error;
  }

}
export const BAPI = process.env.BACKEND_API_URL as string;
export const Token = process.env.BEARER as string;
