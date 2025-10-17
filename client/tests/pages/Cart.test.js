import Cart from "@/app/cart/page";
import { AppContext } from "@/context/AppContext";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const mockCartItems = [
  { product: { _id: "1", name: "Produit A", images: [{ url: "/img1.png" }] }, quantity: 2 },
  { product: { _id: "2", name: "Produit B", images: [{ url: "/img2.png" }] }, quantity: 1 },
];

const mockContext = {
  cartItems: mockCartItems,
  cartCount: 3,
  getAllProducts: jest.fn(() => Promise.resolve({ products: mockCartItems.map(item => item.product) })),
  decreaseItemQuantity: jest.fn(() => Promise.resolve({ success: true })),
  increaseItemQuantity: jest.fn(() => Promise.resolve({ success: true })),
  removeFromCart: jest.fn(() => Promise.resolve({ success: true })),
  clearCart: jest.fn(() => Promise.resolve()),
  router: { push: jest.fn() },
};

describe("Cart Component", () => {
  it("affiche tous les produits du panier", async () => {
    render(
      <AppContext.Provider value={mockContext}>
        <Cart />
      </AppContext.Provider>
    );

    // Vérifier que les produits apparaissent
    expect(await screen.findByText("Produit A")).toBeInTheDocument();
    expect(screen.getByText("Produit B")).toBeInTheDocument();
  });

  it("augmente la quantité d'un produit", async () => {
    render(
      <AppContext.Provider value={mockContext}>
        <Cart />
      </AppContext.Provider>
    );

    const increaseButtons = await screen.findAllByRole("button", { name: /increase_arrow/i });
    await userEvent.click(increaseButtons[0]);

    expect(mockContext.increaseItemQuantity).toHaveBeenCalledWith("1");
  });

  it("diminue la quantité d'un produit", async () => {
    render(
      <AppContext.Provider value={mockContext}>
        <Cart />
      </AppContext.Provider>
    );

    const decreaseButtons = await screen.findAllByRole("button", { name: /decrease_arrow/i });
    await userEvent.click(decreaseButtons[0]);

    expect(mockContext.decreaseItemQuantity).toHaveBeenCalledWith("1");
  });

  it("supprime un produit du panier", async () => {
  render(
    <AppContext.Provider value={mockContext}>
      <Cart />
    </AppContext.Provider>
  );

  // Utiliser findAllByText car c'est asynchrone
  const removeButtons = await screen.findAllByText("Supprimer");
  await userEvent.click(removeButtons[0]);

  expect(mockContext.removeFromCart).toHaveBeenCalledWith("1");
});


 it("vide le panier", async () => {
  render(
    <AppContext.Provider value={mockContext}>
      <Cart />
    </AppContext.Provider>
  );

  // findByText pour attendre l'apparition du bouton
  const clearButton = await screen.findByText(/Vider le panier/i);
  await userEvent.click(clearButton);

  expect(mockContext.clearCart).toHaveBeenCalled();
});
});
