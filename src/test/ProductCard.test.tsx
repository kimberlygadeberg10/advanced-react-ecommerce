import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";
import { store } from "../store/store";

jest.mock("../firebase/products", () => ({
  deleteProduct: jest.fn(),
}));

jest.mock("../components/EditProductForm", () => ({
  __esModule: true,
  default: () => <button type="button">Edit</button>,
}));

const product = {
  id: "1",
  title: "Test Product",
  price: 19.99,
  description: "This is a test product.",
  category: "clothing",
  image: "",
  rating: {
    rate: 4.5,
    count: 10,
  },
};

function renderProductCard() {
  const queryClient = new QueryClient();

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ProductCard product={product} />
      </QueryClientProvider>
    </Provider>,
  );
}

describe("ProductCard", () => {
  test("renders product information", () => {
    renderProductCard();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/This is a test product./i)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5/i)).toBeInTheDocument();
  });

  test("adds product to cart when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    renderProductCard();

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].title).toBe("Test Product");
  });
});
