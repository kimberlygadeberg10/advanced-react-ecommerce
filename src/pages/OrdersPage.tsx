import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { getUserOrders } from "../firebase/orders";

function OrdersPage() {
  const { user, loading } = useAuth();

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.uid],
    queryFn: () => getUserOrders(user!.uid),
    enabled: Boolean(user),
  });

  if (loading || isLoading) {
    return <p>Loading orders...</p>;
  }

  if (!user) {
    return <p>You must be logged in to view your orders.</p>;
  }

  if (isError) {
    return <p>There was a problem loading your orders.</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <section>
        <h2>Order History</h2>
        <p>You have not placed any orders yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Order History</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>
              Date:{" "}
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : "Pending timestamp"}
            </p>
            <p>Total Products: {order.totalProducts}</p>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

            <Link to={`/orders/${order.id}`}>View Details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
