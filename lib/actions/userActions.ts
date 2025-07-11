"use server";

import { signInSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in user with email and password
export const signInWithCredentials = async (
  prevState: unknown,
  data: FormData
) => {
  try {
    const user = signInSchema.parse({
      email: data.get("email"),
      password: data.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Sign In Successful",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
};

// Sign out the user
export const signOutUser = async () => {
  await signOut();
};
