import { clearCart, removeFromCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    dispatch(clearCart());
    window.alert("Checkout successful! Your cart has been cleared.");
  };

  if (cartItems.length === 0) {
    return (
      <section>
        <h2>Shopping Cart</h2>
        <p>Your cart is currently empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Shopping Cart</h2>

      <div className="cart-list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-item">
            <img
              className="cart-item__image"
              src={item.image}
              alt={item.title}
              onError={(event) => {
                event.currentTarget.src =
                  "https://via.placeholder.com/120x120?text=Product+Image";
              }}
            />

            <div className="cart-item__content">
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

              <button
                type="button"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <p>
          <strong>Total Products:</strong> {totalProducts}
        </p>
        <p>
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </p>

        <button type="button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </section>
  );
}

export default CartPage;
