import { useState } from "react";
import { clearCart, removeFromCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAuth } from "../context/useAuth";
import { createOrder } from "../firebase/orders";

const fallbackImageUrl = "https://placehold.co/120x120?text=Product+Image";

function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user } = useAuth();
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    setCheckoutMessage("");
    setErrorMessage("");

    if (!user) {
        setErrorMessage("You must be logged in to place an order.");
        return;
    }

    try {
        setIsCheckingOut(true);

        await createOrder({
            userId: user.uid,
            items: cartItems,
            totalProducts,
            totalPrice,
        });

        dispatch(clearCart());
        setCheckoutMessage("Order placed successfully and cart was cleared.");
    } catch (error) {
        console.error("Checkout error:", error);
        setErrorMessage("Could not place your order.");
    } finally {
        setIsCheckingOut(false);
    }
  };

  return (
    <section>
      <h2>Shopping Cart</h2>

      {checkoutMessage && <p className="cart-success">{checkoutMessage}</p>}
      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
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

            <button 
            type="button"
            onClick={handleCheckout}
            disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
