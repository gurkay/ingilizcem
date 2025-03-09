import SignUpForm from "./signUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up Page",
  description: "Sign up for our app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      Hi There
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
