import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { store } from "../store/store";

jest.mock("../context/useAuth", () => ({
    useAuth: () => ({
        user: null,
        loading: false,
    }),
}));

jest.mock("../firebase/auth", () => ({
    loginUser: jest.fn(),
    logoutUser: jest.fn(),
    registerUser: jest.fn(),
}));

jest.mock("../firebase/orders", () => ({
    createOrder: jest.fn(),
    getOrderById: jest.fn(),
    getUserOrders: jest.fn().mockResolvedValue([]),
}));

jest.mock("../firebase/users", () => ({
    deleteUserProfile: jest.fn(),
    getCurrentUser: jest.fn(),
    getUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
}));

jest.mock("../firebase/products", () => ({
    getProducts: jest.fn().mockResolvedValue([
        {
            id: "1",
            title: "Integration Test Product",
            price: 25.0,
            description: "This product is used for integration testing.",
            category: "clothing",
            image: "",
            rating: {
                rate: 4.5,
                count: 12,
            },
        },
    ]),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));

jest.mock("../components/EditProductForm", () => ({
    __esModule: true,
    default: () => <button type="button">Edit</button>,
}));

function renderApp() {
    const queryClient = new QueryClient();

    return render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );
}

describe("App integration", () => {
    test("updates cart count when a product is added", async () => {
        const user = userEvent.setup();
        renderApp();

        expect(await screen.findByText("Integration Test Product")).toBeInTheDocument();

        const addButton = screen.getByRole("button", { name: /add to cart/i });
        await user.click(addButton);

        expect(screen.getByText(/cart \(1\)/i)).toBeInTheDocument();
    });
});
