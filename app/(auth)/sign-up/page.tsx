import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import SignUpForm from "@/components/auth/SignUpForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign Up | ${APP_NAME}`,
};

const SignupPage = async (props: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Register your account to get started!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
