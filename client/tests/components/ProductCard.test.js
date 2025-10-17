import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Mock des hooks et fonctions
jest.mock("@/context/AppContext");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("ProductCard", () => {
  const product = {
    _id: "1",
    name: "Produit Test",
    stock: 5,
    images: [{ url: "/image.jpg" }],
  };

  const addToCartMock = jest.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      addToCart: addToCartMock,
    });
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("affiche le label de stock correctement", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("En stock")).toBeInTheDocument();
  });

  it("affiche 'Rupture' si le stock est à 0", () => {
    render(<ProductCard product={{ ...product, stock: 0 }} />);
    expect(screen.getByText("Rupture")).toBeInTheDocument();
  });

  it("ajoute un produit au panier et affiche un toast succès", async () => {
    addToCartMock.mockResolvedValue({ success: true, message: "Ajouté !" });

    render(<ProductCard product={product} />);
    const button = screen.getByRole("button", { name: /Panier/i });

    await userEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledWith("1", 1);
    expect(toast.success).toHaveBeenCalledWith("Ajouté !");
  });

  it("affiche un toast erreur si l'ajout échoue", async () => {
    addToCartMock.mockResolvedValue({ success: false, message: "Erreur !" });

    render(<ProductCard product={product} />);
    const button = screen.getByRole("button", { name: /Panier/i });

    await userEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledWith("1", 1);
    expect(toast.error).toHaveBeenCalledWith("Erreur !");
  });
});
