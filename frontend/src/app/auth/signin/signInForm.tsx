"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
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
    console.log("SignInForm: Attempting login...");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        toast.error(result?.error || "Invalid credentials");
      } else {
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("SignInForm: Received response from backend:", response);

      if (response.status === 200 && response.data?.accessToken) {
        toast.success("Login successful");
        console.log("SignInForm: Login successful, preparing to save data.");

        const { accessToken, ...userData } = response.data;
        console.log("SignInForm: Extracted Token:", accessToken ? 'Token Found' : 'Token NOT Found');
        console.log("SignInForm: Extracted User Data:", userData);

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log("SignInForm: Data saved to localStorage.");

        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        console.log("SignInForm: Verified localStorage - Token:", savedToken ? 'Exists' : 'MISSING');
        console.log("SignInForm: Verified localStorage - User:", savedUser ? 'Exists' : 'MISSING');

        window.dispatchEvent(new Event('storage'));
        console.log("SignInForm: Dispatched storage event.");

        console.log("SignInForm: Redirecting to /dashboard via window.location.href...");
        window.location.href = '/dashboard';

      } else {
        console.error("SignInForm: Login failed - Backend response:", response.data);
        toast.error(response.data?.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error('SignInForm: Login request error:', error.response || error.message);
      toast.error(error.response?.data?.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
      console.log("SignInForm: Login attempt finished.");
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
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
