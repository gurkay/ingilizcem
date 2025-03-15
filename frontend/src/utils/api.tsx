import axios from "axios";
import { BACKEND_API, FRONTEND_API } from "./constants";

export default async function apiAuthSignIn(
  credentials: Record<"email" | "password", string> | undefined
) {
  try {
    console.log('apiAuthSignIn:::credentials: ', credentials);
    
    // BACKEND_API sabitini kullan
    const response = await axios.post(`${BACKEND_API}/api/auth/signin`, 
      {
        email: credentials?.email, 
        password: credentials?.password
      }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log('apiAuthSignIn:::response: ', response);

    // Daha detaylı hata yönetimi
    if (!response.data || response.status !== 200) {
      throw new Error(response.data?.message || "Authentication failed");
    }

    const data = response.data;
    
    // Token'ı localStorage'a kaydet (eğer gerekiyorsa)
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return {
      ...data,
      status: 'success',
      ok: true
    };

  } catch (error: any) {
    console.error("apiAuthSignIn error:", error);
    
    // Daha detaylı hata mesajları
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: "Invalid credentials", status: 'error', ok: false };
        case 403:
          return { error: "Access denied", status: 'error', ok: false };
        default:
          return { error: error.response.data?.message || "An error occurred", status: 'error', ok: false };
      }
    }
    
    return { 
      error: "Network error - Unable to connect to server", 
      status: 'error',
      ok: false 
    };
  }
}

export async function apiAuthSignUp(credentials: {
  email: string;
  password: string;
}) {
  try {
    console.log(`backendSignUp:::${FRONTEND_API}/api/auth/signup`);
    console.log("credentials", credentials);
    const response = await fetch(`${FRONTEND_API}/api/auth/signup`, {
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
export const BAPI = 'http://spring-backend:8080';
export const Token = process.env.BEARER as string;
