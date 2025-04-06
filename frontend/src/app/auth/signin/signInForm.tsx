"use client";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log("SignInForm: Attempting login via NextAuth signIn...");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("SignInForm: NextAuth signIn result:", result);

      if (!result?.ok) {
        console.error("SignInForm: NextAuth signIn failed:", result?.error);
        toast.error(result?.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      console.log("SignInForm: NextAuth signIn successful. Fetching user data + token...");
      toast.success("Authentication successful. Fetching profile...");

      try {
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
          { withCredentials: true }
        );

        console.log("SignInForm: Received profile data:", profileResponse);

        if (profileResponse.status === 200 && profileResponse.data?.accessToken) {
          const { accessToken, ...userData } = profileResponse.data;
          console.log("SignInForm: Saving token and user data to localStorage.");
          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(userData));
          window.dispatchEvent(new Event('storage'));

          toast.success("Login successful!");
          console.log("SignInForm: Redirecting to dashboard...");
          window.location.href = '/dashboard';

        } else {
          console.error("SignInForm: Failed to fetch profile or token missing.", profileResponse);
          toast.error("Failed to retrieve user profile after login.");
        }
      } catch (profileError: any) {
        console.error("SignInForm: Error fetching profile:", profileError.response || profileError.message);
        toast.error("Error fetching user profile after login.");
      }

    } catch (error) {
      console.error('SignInForm: Unexpected error during signIn process:', error);
      toast.error("An unexpected error occurred during sign in");
    } finally {
      if (typeof window !== 'undefined' && !window.location.pathname.endsWith('/dashboard')) {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
