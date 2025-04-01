"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const callSignOut = async () => {
  await signOut({
    callbackUrl: `/`,
  });
};


export function SignOutButton(){
  return(
    <button onClick={callSignOut} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
    Sign out
  </button>
  )
}

export function DashboardButton(){
  return(
    <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
    Dashboard
  </Link>
  )
}