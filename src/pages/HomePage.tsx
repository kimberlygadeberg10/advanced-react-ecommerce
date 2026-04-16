import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../api/products";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");

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
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchProductsByCategory(selectedCategory)
        : fetchProducts(),
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

      <div className="catalog-filter">
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">All Products</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
