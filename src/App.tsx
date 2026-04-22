import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AddProductPage from "./pages/AddProductPage";
import { useAppSelector } from "./store/hooks";
import { useAuth } from "./context/useAuth";
import { logoutUser } from "./firebase/auth";

function App() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user, loading } = useAuth();

  const totalItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="app">
      <div className="app__container">
        <header className="app__header">
          <h1>Advanced React E-Commerce App</h1>

          <nav className="app__nav">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart ({totalItemCount})</Link>
            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/add-product">Add Product</Link>
                <button type="button" onClick={logoutUser}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
