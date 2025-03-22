import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BACKEND_API, FRONTEND_API } from "./constants";
import { getSession } from "next-auth/react";

// Create a configured Axios instance for authenticated requests
export const createAuthenticatedApi = async (): Promise<AxiosInstance> => {
  const session = await getSession();
  
  const api = axios.create({
    baseURL: BACKEND_API,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Add request interceptor to add token to all requests
  api.interceptors.request.use(
    async (config) => {
      // If token exists in session, add it to request header
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return api;
};

// Helper function to make authenticated requests
export const authFetch = async (
  url: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
) => {
  try {
    const api = await createAuthenticatedApi();
    const config: AxiosRequestConfig = { url, method };
    
    if (data) {
      config.data = data;
    }
    
    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default async function apiAuthSignIn(
  credentials: Record<"email" | "password" , string> | undefined
) {
  try {
    console.log('apiAuthSignIn:::credentials: ', credentials);
    console.log(`apiAuthSignIn:::backend: ${BACKEND_API}/api/auth/signin`);
    const response = await axios.post(`${BACKEND_API}/api/auth/signin`, {email: credentials?.email, password: credentials?.password}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log('apiAuthSignIn:::response: ', response);
    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid username or password");
    } else if (response.status === 403) {
      throw new Error("Forbidden: Access denied");
    } else if (response.status < 200 || response.status >= 300) {
      throw new Error("An error occurred during sign-in");
    }

    const data = response.data;
    if (data.error) {
      return { error: data.message };
    }
    console.log("apiAuthSignIn:::data::: ", data);
    const userID = data.userID;
    return { ...data, userID };
  } catch (error) {
    console.log((error as Error)?.message, "No connection to Backend");
    return error;
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
export const BAPI = process.env.BACKEND_API as string;
export const Token = process.env.BEARER as string;
