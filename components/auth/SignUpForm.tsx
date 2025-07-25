"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpNewUserWithCredentials } from "@/lib/actions/userActions";
import { useSearchParams } from "next/navigation";
import { SIGN_UP_DEFAULTS } from "@/lib/constants";

import { FormState } from "@/types";

const SignUpForm = () => {
  const [data, action] = useActionState<FormState, FormData>(
    signUpNewUserWithCredentials,
    {
      success: false,
      message: "",
    }
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full" disabled={pending} variant={"default"}>
        {pending ? "Submitting..." : "Sign up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" value={callbackUrl} name="callbackUrl" />
      <div className="md:gap-6 grid md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            autoComplete="on"
            id="name"
            placeholder="e.g. John Doe"
            defaultValue={SIGN_UP_DEFAULTS.name}
          />
          {data?.errors?.name && (
            <div className="text-green-400 text-sm">{data.errors.name}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            autoComplete="on"
            id="email"
            placeholder="email@example.com"
            defaultValue={SIGN_UP_DEFAULTS.email}
          />
          {data?.errors?.email && (
            <div className="text-green-400 text-sm">{data.errors.email}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            placeholder="**********"
            defaultValue={SIGN_UP_DEFAULTS.password}
          />
          {data?.errors?.password && (
            <div className="text-green-400 text-sm">{data.errors.password}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="on"
            placeholder="**********"
            defaultValue={SIGN_UP_DEFAULTS.confirmPassword}
          />
          {data?.errors?.confirmPassword && (
            <div className="text-green-400 text-sm">
              {data.errors.confirmPassword}
            </div>
          )}
        </div>
        {data?.errors?.form && (
          <div className="md:col-span-2 text-green-400 text-center">
            {data.errors.form}
          </div>
        )}
        <div className="md:col-span-2">
          <SignUpButton />
        </div>

        {data && !data.success && data.message && (
          <div className="text-green-400 text-center">{data.message}</div>
        )}

        <div className="md:col-span-2 text-muted-foreground text-sm text-center">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            target="_self"
            className="font-semibold text-ring underline cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
