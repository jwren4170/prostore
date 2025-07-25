"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SIGN_IN_DEFAULTS } from "@/lib/constants";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/userActions";
import { useSearchParams } from "next/navigation";

import { FormState } from "@/types";

const SignInForm = () => {
  const [data, action] = useActionState<FormState, FormData>(
    signInWithCredentials,
    {
      success: false,
      message: "",
    }
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full" disabled={pending} variant={"default"}>
        {pending ? "Signing in..." : "Sign In"}
      </Button>
    );
  };
  return (
    <form action={action}>
      <input type="hidden" value={callbackUrl} name="callbackUrl" />
      <div className="space-y-6">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          name="email"
          autoComplete="on"
          id="email"
          placeholder="name@example.com"
          defaultValue={SIGN_IN_DEFAULTS.email}
        />
        {data?.errors?.email && (
          <div className="text-green-400 text-sm">{data.errors.email}</div>
        )}

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="**********"
          defaultValue={SIGN_IN_DEFAULTS.password}
        />
        {data?.errors?.password && (
          <div className="text-green-400 text-sm">{data.errors.password}</div>
        )}

        {data?.errors?.form && (
          <div className="text-green-400 text-center">{data.errors.form}</div>
        )}

        <div>
          <SignInButton />
        </div>

        {data && !data.success && data.message && (
          <div className="text-green-400 text-center">{data.message}</div>
        )}

        <div className="mt-2 text-muted-foreground text-sm text-center">
          Don&#39;t have an account?{" "}
          <Link
            href={"/sign-up"}
            target="_self"
            className="font-semibold text-ring underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
