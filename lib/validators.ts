import { z } from "zod";
import { formatPrice } from "./utils";

const currency = z.string().refine((value) => {
  /^\d+(\.\d{2})?$/.test(formatPrice(Number(value)));
  return true;
}, "Invalid price");

// schema for inserting products
export const insertProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than 3 characters" })
    .max(32, { message: "Name must be less than 32 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slugmust be more than 3 characters" })
    .max(100, { message: "Slug must be less than 100 characters" }),
  category: z
    .string()
    .min(3, { message: "Category must be more than 3 characters" })
    .max(32, { message: "Category must be less than 32 characters" }),
  brand: z
    .string()
    .min(3, { message: "Brand must be more than 3 characters" })
    .max(32, { message: "Brand must be less than 32 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be more than 3 characters" })
    .max(155, { message: "Description must be less than 155 characters" }),
  stock: z
    .number()
    .min(0, { message: "Stock must be greater than or equal to zero" }),
  images: z
    .array(z.string())
    .min(1, { message: "You need to upload at least one image" }),
  isFeatured: z.boolean(),
  banner: z.string().optional(),
  price: currency,
});

// schema for signin a user
export const signInSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password cannot exceed 32 characters" }),
});

// schema for signup a user
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be more than 3 characters" })
      .max(32, { message: "Name must be less than 32 characters" }),
    email: z.email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password cannot exceed 32 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// cart schema
export const cartItemSchema = z.object({
  productId: z.string().nonempty({ message: "Product id is required" }),
  name: z.string().nonempty({ message: "Item name required" }),
  slug: z.string().nonempty({ message: "Item slug required" }),
  qantity: z
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a positive integer" }),
  image: z.string().nonempty({ message: "Image url required" }),
  price: currency,
});

// insert items in the cart
export const insertCartItemsSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().nonempty({ message: "Session Cart Id Required" }),
  userId: z.string().optional().nullable(),
});
