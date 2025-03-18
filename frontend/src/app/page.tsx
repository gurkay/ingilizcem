import { Inter } from "next/font/google";
import Hero from "@/app/_components/Hero";
import Services from "@/app/_components/home/serviceMain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ingilizcem",
  description: "Word master",
};

const inter = Inter({ subsets: ["latin"] });
export default async function Home() {
  return (
    <>
      <main className={inter.className}>
        <Hero />
        <Services />
      </main>
    </>
  );
}
