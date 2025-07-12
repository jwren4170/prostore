"use server";

import { signInSchema, signUpSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/db/prisma";
import { formatErrors } from "../utils";
import { FormState } from "@/types";

// Sign in user with email and password
export const signInWithCredentials = async (
  prevState: FormState,
  data: FormData
): Promise<FormState> => {
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

    if (error instanceof Error && error.message.includes("CredentialsSignin")) {
      return {
        success: false,
        message: "Invalid email or password.",
        errors: { form: "Invalid email or password." },
      };
    }

    return {
      success: false,
      message: "Invalid credentials. Please try again",
      errors: formatErrors(error),
    };
  }
};

// sign up a new user
export const signUpNewUserWithCredentials = async (
  prevState: FormState,
  data: FormData
): Promise<FormState> => {
  try {
    const newUser = signUpSchema.parse({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });

    const plainTextPassword = newUser.password;

    newUser.password = hashSync(newUser.password, 10);

    await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
    });

    await signIn("credentials", {
      email: newUser.email,
      password: plainTextPassword,
    });

    return {
      success: true,
      message: "Registration Successful",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: "User not created. Please try again",
      errors: formatErrors(error),
    };
  }
};

// Sign out the user
export const signOutUser = async () => {
  await signOut();
};
