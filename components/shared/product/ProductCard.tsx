import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import ProductPrice from "./ProductPrice";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            className="w-full"
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            priority
          ></Image>
        </Link>
      </CardHeader>
      <CardContent className="gap-4 grid p-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="font-medium text-sm">{product.name}</h2>
          <div className="flex flex-between gap-4">
            <p>{product.rating} Stars</p>
            {product.stock > 0 ? (
              <ProductPrice
                value={Number(product.price)}
                className="font-bold text-xl"
              />
            ) : (
              <p className="text-destructive">Out of Stock</p>
            )}
          </div>
        </Link>
      </CardContent>
      <CardTitle></CardTitle>
      <CardAction></CardAction>
      <CardDescription></CardDescription>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ProductCard;
