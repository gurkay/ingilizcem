import axios from "axios";
import { BACKEND_API, FRONTEND_API } from "./constants";
import { getApiUrl } from "./auth";

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
export const BAPI = process.env.BACKEND_API as string;
export const Token = process.env.BEARER as string;
