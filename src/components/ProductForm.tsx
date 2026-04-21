import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../firebase/products";

const initialFormData = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  rate: "",
  count: "",
};

function ProductForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setFormData(initialFormData);
      setErrorMessage("");
      setMessage("Product added successfully.");
    },
    onError: () => {
      setMessage("");
      setErrorMessage("Could not add product.");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    createProductMutation.mutate({
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
      rating: {
        rate: Number(formData.rate),
        count: Number(formData.count),
      },
    });
  };

  return (
    <section className="product-form-section">
      <h2>Add Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="rate">Rating</label>
        <input
          id="rate"
          name="rate"
          type="number"
          step="0.1"
          value={formData.rate}
          onChange={handleChange}
          required
        />

        <label htmlFor="count">Rating Count</label>
        <input
          id="count"
          name="count"
          type="number"
          value={formData.count}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={createProductMutation.isPending}>
          {createProductMutation.isPending ? "Saving..." : "Add Product"}
        </button>
      </form>

      {message && <p className="cart-success">{message}</p>}
      {errorMessage && <p className="auth-error">{errorMessage}</p>}
    </section>
  );
}

export default ProductForm;
