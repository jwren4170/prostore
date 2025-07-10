import ProductList from "@/components/shared/product/ProductList";
import { getLatestProducts } from "@/lib/actions/productActions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default HomePage;
