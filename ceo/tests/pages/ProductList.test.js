/**
 * @file ProductList.test.js
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "@/app/product-list/page";
import { AdminContext } from "@/context/AdminContext";
import toast from "react-hot-toast";

// 🧪 Mock du module toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
  promise: jest.fn((p) => p),
}));

// 🧪 Mock du composant EditProductModal pour ne pas vraiment l'afficher
jest.mock("@/components/EditProductModal", () => () => (
  <div data-testid="edit-modal"></div>
));

// 🧪 Mock du composant Loading
jest.mock("@/components/Loading", () => () => <div>Chargement...</div>);

describe("ProductList (Admin)", () => {
  const mockProducts = [
    {
      _id: "1",
      name: "Produit 1",
      category: "Catégorie A",
      price: 100,
      images: [{ url: "/test.jpg", alt: "img" }],
    },
    {
      _id: "2",
      name: "Produit 2",
      category: "Catégorie B",
      price: 200,
      images: [{ url: "/test2.jpg", alt: "img2" }],
    },
  ];

  const mockGetAllProducts = jest.fn().mockResolvedValue({ products: mockProducts });
  const mockUpdateProduct = jest.fn().mockResolvedValue({});
  const mockContext = {
    getAllProducts: mockGetAllProducts,
    updateProduct: mockUpdateProduct,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("affiche le loader puis la liste de produits", async () => {
    render(
      <AdminContext.Provider value={mockContext}>
        <ProductList />
      </AdminContext.Provider>
    );

    // Le loader s'affiche d'abord
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();

    // Puis les produits sont affichés
    expect(await screen.findByText("Produit 1")).toBeInTheDocument();
    expect(screen.getByText("Produit 2")).toBeInTheDocument();
  });

  test("permet de supprimer un produit", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Produit supprimé" }),
    });

    render(
      <AdminContext.Provider value={mockContext}>
        <ProductList />
      </AdminContext.Provider>
    );

    const deleteButtons = await screen.findAllByTitle(/supprimer/i);
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/admin/products/1"),
        expect.objectContaining({ method: "DELETE" })
      );
      expect(toast.success).toHaveBeenCalledWith("Produit supprimé");
    });
  });

  test("affiche une erreur si la suppression échoue", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    render(
      <AdminContext.Provider value={mockContext}>
        <ProductList />
      </AdminContext.Provider>
    );

    const deleteButtons = await screen.findAllByTitle(/supprimer/i);
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test("ouvre la modale d'édition lorsqu'on clique sur modifier", async () => {
    render(
      <AdminContext.Provider value={mockContext}>
        <ProductList />
      </AdminContext.Provider>
    );

    const editButtons = await screen.findAllByTitle(/modifier/i);
    await userEvent.click(editButtons[0]);

    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });
});
