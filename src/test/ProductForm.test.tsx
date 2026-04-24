import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import ProductForm from "../components/ProductForm";

jest.mock("../firebase/products", () => ({
  createProduct: jest.fn(),
}));

function renderProductForm() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ProductForm />
    </QueryClientProvider>,
  );
}

describe("ProductForm", () => {
  test("renders all form fields", () => {
    renderProductForm();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^rating$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating count/i)).toBeInTheDocument();
  });

  test("renders the add product button", () => {
    renderProductForm();

    expect(
      screen.getByRole("button", { name: /add product/i }),
    ).toBeInTheDocument();
  });
});
