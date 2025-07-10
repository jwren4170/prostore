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
