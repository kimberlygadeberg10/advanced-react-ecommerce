import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../firebase/products";
import type { Product } from "../types/product";

interface EditProductFormProps {
  product: Product;
}

function EditProductForm({ product }: EditProductFormProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [rate, setRate] = useState(product.rating.rate.toString());
  const [count, setCount] = useState(product.rating.count.toString());

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct: Omit<Product, "id">) =>
      updateProduct(product.id, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditing(false);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProductMutation.mutate({
      title,
      price: Number(price),
      description,
      category,
      image,
      rating: {
        rate: Number(rate),
        count: Number(count),
      },
    });
  };

  if (!isEditing) {
    return (
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    );
  }

  return (
    <form className="edit-product-form" onSubmit={handleSubmit}>
      <input
        aria-label="Product title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <input
        aria-label="Product price"
        type="number"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />
      <textarea
        aria-label="Product description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <input
        aria-label="Product category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      />
      <input
        aria-label="Product image url"
        value={image}
        onChange={(event) => setImage(event.target.value)}
        required
      />
      <input
        aria-label="Product rating"
        type="number"
        step="0.1"
        value={rate}
        onChange={(event) => setRate(event.target.value)}
        required
      />
      <input
        aria-label="Product rating count"
        type="number"
        value={count}
        onChange={(event) => setCount(event.target.value)}
        required
      />

      <div className="edit-product-form__actions">
        <button type="submit" disabled={updateProductMutation.isPending}>
          {updateProductMutation.isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditProductForm;
