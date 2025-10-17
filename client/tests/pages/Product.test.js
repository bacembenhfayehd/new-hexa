import Product , { AuctionHistory } from "@/app/product/[id]/page";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import userEvent from "@testing-library/user-event";

// --- MOCKS ---
jest.mock("@/context/AppContext");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock("react-hot-toast", () => ({ success: jest.fn(), error: jest.fn() }));
jest.mock("next/image", () => ({ __esModule: true, default: (props) => <img {...props} /> }));

// --- Données fictives ---
const mockProduct = {
  _id: "1",
  name: "Produit Test",
  shortDescription: "Short desc",
  detailedDescription: "Long desc",
  category: "Test Category",
  stock: 5,
  images: [{ _id: "img1", url: "/img1.jpg", alt: "Image 1" }],
  benefices: ["Benefit 1", "Benefit 2"],
  caracteristiques: [
    { element: "Apparence", value: "Liquide" },
    { element: "Couleur", value: "Rouge" },
  ],
  composition: [
    { _id: "c1", element: "Element1", value: "10", unit: "mg" },
  ],
  recommendations: [
    { _id: "r1", type: "Dosage", value: "2x/jour" },
  ],
};

describe("Product component", () => {
  const mockAddToCart = jest.fn().mockResolvedValue({ success: true, message: "Ajouté !" });
  const mockGetAllProducts = jest.fn().mockResolvedValue([mockProduct]);
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      products: [mockProduct],
      addToCart: mockAddToCart,
      getAllProducts: mockGetAllProducts,
      router: { push: mockRouterPush },
    });
    useParams.mockReturnValue({ id: "1" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche les informations du produit", async () => {
    render(<Product />);
    
    // Les éléments devraient apparaître
    expect(await screen.findByText("Produit Test")).toBeInTheDocument();
    expect(screen.getByText("Short desc")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("Apparence:")).toBeInTheDocument();
    expect(screen.getByText("Couleur:")).toBeInTheDocument();
  });

  it("ajoute le produit au panier", async () => {
    render(<Product />);
    
    const addButton = await screen.findByText("Ajouter au panier");
    await userEvent.click(addButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith("1", 1);
    expect(toast.success).toHaveBeenCalledWith("Ajouté !");
  });

  it("change l'onglet Bénéfices", async () => {
    render(<Product />);
    
    const tabButton = screen.getByText("Bénéfices");
    await userEvent.click(tabButton);
    
    expect(screen.getByText("Benefit 1")).toBeInTheDocument();
    expect(screen.getByText("Benefit 2")).toBeInTheDocument();
  });
});
