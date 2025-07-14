"use client";

import React from "react"; // Added React import
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cartActions";

type CartItemProps = {
  item: CartItem;
};

const AddToCart = ({ item }: CartItemProps) => {
  const router = useRouter();

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
      const date = new Date(); // Get date only on success
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

  return (
    <div>
      <Button
        variant="default"
        type="button"
        className="hover:bg-chart-1 w-full cursor-pointer"
        onClick={handleAddToCart}
      >
        <Plus /> Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
