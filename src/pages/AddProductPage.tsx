import ProductForm from "../components/ProductForm";

function AddProductPage() {
  return (
    <section className="manage-products-page">
      <header className="manage-products-page__header">
        <h2>Add Product</h2>
        <p>Create a new store product here instead of cluttering the home page.</p>
      </header>

      <ProductForm />
    </section>
  );
}

export default AddProductPage;
