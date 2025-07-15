import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "@/components/shared/product/ProductPrice";
import { getProductBySlug } from "@/lib/actions/productActions";
import { notFound } from "next/navigation";
import ProductImages from "@/components/shared/product/ProductImages";
import Link from "next/link";
import AddToCart from "@/components/shared/product/AddToCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getMyCart } from "@/lib/actions/cartActions";
import { Decimal } from "@prisma/client/runtime/library";

// Helper function to convert Decimal to number
const convertDecimalToNumber = (obj: any): any => {
  if (obj instanceof Decimal) {
    return obj.toNumber();
  }
  if (typeof obj === "object" && obj !== null) {
    for (const key of Object.keys(obj)) {
      obj[key] = convertDecimalToNumber(obj[key]);
    }
  }
  return obj;
};

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cart = await getMyCart();

  const convertedCart = cart ? convertDecimalToNumber(cart) : undefined;

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>

          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>

              {/* <Rating value={Number(product.rating)} /> */}
              <p>{product.numReviews} reviews</p>
              <div className="flex sm:flex-row flex-col sm:items-center gap-3">
                <ProductPrice
                  value={Number(product.price)}
                  className="bg-green-100 px-5 py-2 rounded-full w-24 text-green-700"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>

          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>Status</div>
                  {product.stock && product.stock > 0 ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out Of Stock</Badge>
                  )}
                </div>

                {product.stock && product.stock > 0 ? (
                  <div className="flex-center gap-2 mt-4">
                    <AddToCart
                      cart={convertedCart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        quantity: 1,
                        image: product.images![0],
                        price: formatPrice(Number(product.price)),
                      }}
                    />
                  </div>
                ) : (
                  <Button
                    variant="default"
                    type="button"
                    className="hover:bg-chart-1 mt-4 w-full"
                    disabled
                  >
                    <Plus /> <span className="line-through">Add to Cart</span>{" "}
                  </Button>
                )}
                <Link
                  href="/"
                  className="block mt-4 font-medium text-primary-blue text-center underline"
                >
                  Continue Shopping
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
