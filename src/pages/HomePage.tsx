import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../firebase/products";

function HomePage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>There was a problem loading products.</p>;
  }

  return (
    <section>
      <h2>Product Catalog</h2>

      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
