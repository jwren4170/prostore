import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="max-sm:hidden space-x-2">
        <ModeToggle />
        <Button asChild variant={"ghost"}>
          <Link href={"/cart"} className="flex items-center">
            <ShoppingCart className="mr-2" /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/sign-in"} className="flex items-center">
            <UserIcon className="mr-2" /> Sign In
          </Link>
        </Button>
      </nav>

      <nav className="sm:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant={"ghost"}>
              <Link href={"/cart"}>
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href={"/sign-in"} className="flex items-center">
                <UserIcon className="mr-2" /> Sign In
              </Link>
            </Button>
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
