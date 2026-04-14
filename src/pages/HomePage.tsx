import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "../api/products";

function HomePage() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (categoriesLoading || productsLoading) {
    return <p>Loading store data...</p>;
  }

  if (categoriesError || productsError) {
    return <p>There was a problem loading the store.</p>;
  }

  return (
    <section>
      <h2>Product Catalog</h2>

      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="category">Category: </label>
        <select id="category" defaultValue="">
          <option value="">All Products</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        {products?.map((product) => (
          <article
            key={product.id}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              background: "#ffffff",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "120px", height: "120px", objectFit: "contain" }}
            />
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <p>Rating: {product.rating.rate}</p>
            <button type="button">Add to Cart</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
