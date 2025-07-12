import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";

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
