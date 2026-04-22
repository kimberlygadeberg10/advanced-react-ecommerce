import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderById } from "../firebase/orders";

const fallbackImageUrl = "https://placehold.co/120x120?text=Product+Image";

function OrderDetailsPage() {
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: Boolean(orderId),
  });

  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (isError || !order) {
    return <p>There was a problem loading the order details.</p>;
  }

  return (
    <section>
      <h2>Order Details</h2>

      <div className="order-card">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {order.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString()
            : "Pending timestamp"}
        </p>
        <p>
          <strong>Total Products:</strong> {order.totalProducts}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="cart-list">
        {order.items.map((item) => (
          <article key={item.id} className="cart-item">
            <img
              className="cart-item__image"
              src={item.image || fallbackImageUrl}
              alt={item.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackImageUrl;
              }}
            />

            <div className="cart-item__content">
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OrderDetailsPage;
