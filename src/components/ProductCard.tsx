import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../firebase/products";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import type { Product } from "../types/product";
import EditProductForm from "./EditProductForm";
import { getFallbackProductImage, getProductImageSrc } from "../utils/productImages";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={getProductImageSrc(product.image, product.category, product.title)}
        alt={product.title}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = getFallbackProductImage(
            product.category,
            product.title,
          );
        }}
      />

      <div className="product-card__content">
        <h3>{product.title}</h3>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating.rate}
        </p>

        <div className="product-card__actions">
          <button type="button" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>

          <EditProductForm product={product} />

          <button
            type="button"
            className="product-card__delete-button"
            disabled={deleteProductMutation.isPending}
            onClick={() => deleteProductMutation.mutate(product.id)}
          >
            {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
