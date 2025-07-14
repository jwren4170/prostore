import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert prisma object to typescript object
export const convertToPlainObject = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

// format price to currency
export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// format errors: Record<string, string>
export const formatErrors = (error: any): Record<string, string> => {
  if (error.name === "ZodError") {
    // Handle Zod validation errors
    const fieldErrors: Record<string, string> = {};
    for (const issue of error.issues) {
      // Use the first path segment as the key for simplicity
      const path = issue.path[0] as string;
      fieldErrors[path] = issue.message;
    }
    return fieldErrors;
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma unique constraint errors (e.g., duplicate email)
    // The specific field is often in `error.meta.target`
    const field = error.meta?.target ? error.meta?.target[0] : "Field";
    return { [field]: `This ${field} is already in use.` };
  } else {
    // Handle other types of errors
    return { field: error.message || "An unexpected error occurred." };
  }
};

// round cart prices to 2 decimal places
export const roundCartPriceToTwoDecimals = (value: number | string) => {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Error: Value needs to be number or string");
  }
};
