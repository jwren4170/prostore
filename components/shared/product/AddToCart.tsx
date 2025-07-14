"use client";

import React from "react"; // Added React import
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
import { Cart } from "@/types";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default form submission if button is inside a form

      const cleanedPrice = item.price.replace(/[^\d.]/g, "");
      const newItem = { ...item, price: cleanedPrice };
      const res = await addItemToCart(newItem);

      if (!res.success) {
        toast("", {
          description: res.message.toString(),
          actionButtonStyle: {
            backgroundColor: "darkred",
            fontWeight: "bold",
            fontSize: "16px",
            paddingBlock: "10px",
            paddingInline: "15px",
            color: "oklch(98.7% 0.022 95.277)",
            width: "fit-content",
          },
          style: {
            fontSize: ".8rem",
            width: "400px",
            backgroundColor: "firebrick",
          },
          action: {
            label: "Dismiss",
            onClick: () => router.push(`/`),
          },
        });
        return; // Stop execution if there's an error
      }

      // Success
      toast("", {
        description: res.message.toString(),
        actionButtonStyle: {
          background: "oklch(0.7686 0.1647 70.0804)",
          fontWeight: "bold",
          fontSize: "16px",
          paddingBlock: "10px",
          paddingInline: "15px",
          color: "oklch(98.7% 0.022 95.277)",
          width: "fit-content",
        },
        style: {
          fontSize: ".8rem",
          width: "400px",
        },
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    },
    [item, router]
  );

  // handle remove item from cart
  const handleRemoveFromCart = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default form submission if button is inside a form

      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast("", {
          description: res.message.toString(),
          actionButtonStyle: {
            backgroundColor: "darkred",
            fontWeight: "bold",
            fontSize: "16px",
            paddingBlock: "10px",
            paddingInline: "15px",
            color: "oklch(98.7% 0.022 95.277)",
            width: "fit-content",
          },
          style: {
            fontSize: ".8rem",
            width: "400px",
            backgroundColor: "firebrick",
          },
          action: {
            label: "Dismiss",
            onClick: () => router.push(`/`),
          },
        });
        return; // Stop execution if there's an error
      }

      // Success
      toast("", {
        description: res.message.toString(),
        actionButtonStyle: {
          background: "oklch(0.7686 0.1647 70.0804)",
          fontWeight: "bold",
          fontSize: "16px",
          paddingBlock: "10px",
          paddingInline: "15px",
          color: "oklch(98.7% 0.022 95.277)",
          width: "fit-content",
        },
        style: {
          fontSize: ".8rem",
          width: "400px",
        },
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
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
        <Minus className="w-4 h-4" />
      </Button>
      <span className="px-2">{itemExists.quantity}</span>
      <Button type="button" variant={"outline"} onClick={handleAddToCart}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  ) : (
    <Button
      variant="default"
      type="button"
      className="hover:bg-chart-1 w-full cursor-pointer"
      onClick={handleAddToCart}
    >
      <Plus /> Add to Cart
    </Button>
  );
};

export default AddToCart;
