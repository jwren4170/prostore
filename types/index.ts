import { z } from "zod";
import {
  insertProductSchema,
  cartItemSchema,
  insertCartItemsSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type Cart = z.infer<typeof insertCartItemsSchema> & {
  id: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  itemsPrice: number;
  totalPrice: number;
  shippingPrice: number;
  taxPrice: number;
};
export type CartItem = z.infer<typeof cartItemSchema>;
