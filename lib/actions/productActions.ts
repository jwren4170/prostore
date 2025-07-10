"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { Product } from "@/types";

// Get latest products
export const getLatestProducts = async () => {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return convertToPlainObject(data as unknown as Product[]);
};

// Get product by slug
export const getProductBySlug = async (slug: string) => {
  const data = await prisma.product.findUnique({ where: { slug } });
  return convertToPlainObject(data);
};
