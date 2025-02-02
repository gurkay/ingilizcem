"use client";

import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";
import { Session } from "next-auth";

interface ClientProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export default function ClientProviders({ children, session }: ClientProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
