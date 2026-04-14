import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <main className="app">
      <div className="app__container">
        <header className="app__header">
          <h1>Advanced React E-Commerce App</h1>
          <nav className="app__nav">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
