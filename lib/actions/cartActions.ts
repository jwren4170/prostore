"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import {
  convertToPlainObject,
  formatErrors,
  roundCartPriceToTwoDecimals,
} from "@/lib/utils";
import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { cartItemSchema, insertCartItemsSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Calc cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundCartPriceToTwoDecimals(
      items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    ),
    shippingPrice = roundCartPriceToTwoDecimals(itemsPrice > 100 ? 0 : 10),
    taxPrice = roundCartPriceToTwoDecimals(0.15 * itemsPrice),
    totalPrice = roundCartPriceToTwoDecimals(
      itemsPrice + shippingPrice + taxPrice
    );

  return {
    itemsPrice: itemsPrice.toFixed(2).toString(),
    shippingPrice: shippingPrice.toFixed(2).toString(),
    taxPrice: taxPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toFixed(2).toString(),
  };
};

export const addItemToCart = async (data: CartItem) => {
  try {
    // check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    // get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();

    // parse and validate item
    const item = cartItemSchema.parse(data);

    // find product from database
    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });
    if (!product) throw new Error("Product not found");

    if (!cart) {
      // create new cart object
      const newCart = insertCartItemsSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      // add to data base
      await prisma.cart.create({
        data: newCart,
      });

      // revalidate the product page
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to cart.`,
      };
    } else {
      const itemExists = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (itemExists) {
        // Check stock
        if (product.stock === null || product.stock < itemExists.quantity + 1) {
          throw new Error(`${product.name} not is out of stock`);
        }

        // increase the quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.quantity = itemExists.quantity + 1;
      } else {
        // if item doesn't exist in cart, check stock
        if (product.stock === null || product.stock < item.quantity) {
          throw new Error(
            `${product.name} is out of stock or not enough stock available`
          );
        }

        // add item to the cart.items
        cart.items.push(item);
      }
      // save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          itemExists ? " updated in " : " added to "
        } cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice,
    totalPrice: cart.totalPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // Check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found");

    // Check if only one in quantity
    if (exist.quantity === 1) {
      // Remove from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease quantity
      (cart.items as CartItem[]).find(
        (x) => x.productId === productId
      )!.quantity = exist.quantity - 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}
