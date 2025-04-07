import Link from "next/link";
import { DashboardButton, SignOutButton } from "./ClientLayout";
import MobileMenuButton from "./mobile-menu-button";

interface IProps {
  session?: any;
}

function Header({ session }: IProps) {

  return (
    <header className="bg-white border-b-4 border-indigo-600 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center py-4 px-6">
        <MobileMenuButton />
        <Link href="/" className="text-xl font-bold text-gray-800">
          Learn English with AI
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link
            href="/pages/about"
            className="px-4 py-2 text-gray-900 rounded hover:bg-gray-200 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            href="/pages/contact"
            className="px-4 py-2 text-gray-900 rounded hover:bg-gray-200 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/lessons"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Lessons
                </Link>
                <Link
                  href="/dashboard/learning"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Learning
                </Link>
                <DashboardButton />
                <SignOutButton />
              </nav>


            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-200 hover:text-gray-800"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
