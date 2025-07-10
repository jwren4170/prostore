import { PrismaClient } from "@prisma/client";

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient().$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price;
        },
      },
      rating: {
        compute(product) {
          return product.rating;
        },
      },
    },
  },
});
