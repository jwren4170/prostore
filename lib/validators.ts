import { z } from "zod";
import { formatPrice } from "./utils";

const currency = z.string().refine((value) => {
  /^\d+(\.\d{2})?$/.test(formatPrice(Number(value)));
  return true;
}, "Invalid price");

// schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  category: z.string().min(3).max(255),
  brand: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  stock: z.number().min(0),
  images: z.array(z.string()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().optional(),
  price: currency,
});

// schema for signin a user
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255),
});
