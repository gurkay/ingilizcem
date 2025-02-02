import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name?: string;
      roles?: string[];
    } & DefaultSession["user"];
    accessToken?: string;
  }
} 