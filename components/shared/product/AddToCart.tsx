"use client";

import React from "react"; // Added React import
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
import { Cart } from "@/types";
import { useTransition } from "react";
import {
  showSuccessToast,
  showErrorToast,
} from "@/components/shared/toasts/Toast";

const AddToCart = ({ item, cart }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default form submission if button is inside a form

      const cleanedPrice = item.price.replace(/[^\d.]/g, "");
      const newItem = { ...item, price: cleanedPrice };
      const res = await addItemToCart(newItem);

      startTransition(async () => {
        if (!res.success) {
          showErrorToast(res.message.toString(), {
            label: "Dismiss",
            onClick: () => router.push(`/`),
          });
          return; // Stop execution if there's an error
        }

        // Success
        showSuccessToast(res.message.toString(), {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        });
      });
    },
    [item, router]
  );

  // handle remove item from cart
  const handleRemoveFromCart = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default form submission if button is inside a form

      const res = await removeItemFromCart(item.productId);

      startTransition(() => {
        if (!res.success) {
          showErrorToast(res.message.toString(), {
            label: "Dismiss",
            onClick: () => router.push(`/`),
          });
          return; // Stop execution if there's an error
        }

        // Success
        showSuccessToast(res.message.toString(), {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        });
      });
    },
    [item, router]
  );

  // Check if item is in cart
  const itemExists =
    cart && cart.items.find((x) => x.productId === item.productId);

  return itemExists ? (
    <div>
      <Button type="button" variant={"outline"} onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{itemExists.quantity}</span>
      <Button type="button" variant={"outline"} onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      variant="default"
      type="button"
      className="hover:bg-chart-1 w-full cursor-pointer"
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to Cart
    </Button>
  );
};

export default AddToCart;
