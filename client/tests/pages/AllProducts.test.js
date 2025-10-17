// tests/pages/AllProducts.test.js
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AllProducts from "@/app/all-products/page";

// Mock du router de Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock du contexte
jest.mock("@/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

// ✅ IMPORTANT : Mock du composant ProductCard
jest.mock("@/components/ProductCard", () => {
  return function MockProductCard({ product }) {
    return (
      <div data-testid={`product-${product._id}`}>
        <h3>{product.title}</h3>
        <p>{product.category}</p>
        <button>Ajouter au panier</button>
      </div>
    );
  };
});

// Données mockées pour les tests
const mockProducts = [
  { 
    _id: "1", 
    title: "Engrais Bio", 
    category: "bio",
    price: 25,
    image: "/img/product1.jpg"
  },
  { 
    _id: "2", 
    title: "Engrais Chimique", 
    category: "chimique",
    price: 30,
    image: "/img/product2.jpg"
  },
  { 
    _id: "3", 
    title: "Fumier Organique", 
    category: "bio",
    price: 20,
    image: "/img/product3.jpg"
  },
];

describe("AllProducts Page", () => {
  let mockGetAllProducts;
  let mockAddToCart;

  beforeEach(() => {
    // Mock des fonctions du contexte
    mockGetAllProducts = jest.fn();
    mockAddToCart = jest.fn();

    // Mock du router
    useRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    });

    // Mock du contexte avec toutes les fonctions nécessaires
    useAppContext.mockReturnValue({
      getAllProducts: mockGetAllProducts,
      addToCart: mockAddToCart,
      currency: "TND",
      cartCount: 0,
      cartItems: [],
    });

    // Par défaut, getAllProducts retourne les produits mockés
    mockGetAllProducts.mockResolvedValue({
      products: mockProducts,
      pagination: {
        total: mockProducts.length,
        page: 1,
        pages: 1,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("affiche le loader puis tous les produits", async () => {
    render(<AllProducts />);

    // Vérifier le loader
    expect(screen.getByText(/Chargement des produits/i)).toBeInTheDocument();

    // Attendre que les produits apparaissent
    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
    });

    expect(screen.getByText("Engrais Chimique")).toBeInTheDocument();
    expect(screen.getByText("Fumier Organique")).toBeInTheDocument();
    
    // Vérifier que getAllProducts a été appelé
    expect(mockGetAllProducts).toHaveBeenCalledTimes(1);
    
    // Vérifier le compteur de produits
    expect(screen.getByText(/3 produits/i)).toBeInTheDocument();
  });

  test("filtre les produits selon la catégorie", async () => {
    render(<AllProducts />);

    // Attendre le chargement initial
    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
    });

    // Tous les produits doivent être visibles initialement
    expect(screen.getByText("Engrais Chimique")).toBeInTheDocument();
    expect(screen.getByText("Fumier Organique")).toBeInTheDocument();

    // Cliquer sur le bouton de filtre "bio"
    const bioBtn = screen.getByRole('button', { name: 'bio' });
    fireEvent.click(bioBtn);

    // Attendre que le filtre soit appliqué
    await waitFor(() => {
      // Vérifier que seuls les produits bio sont affichés
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
      expect(screen.getByText("Fumier Organique")).toBeInTheDocument();
      expect(screen.queryByText("Engrais Chimique")).not.toBeInTheDocument();
    });

    // Vérifier le compteur (2 produits bio)
    expect(screen.getByText(/2 produits/i)).toBeInTheDocument();
  });

  test("réinitialise le filtre sur 'all'", async () => {
    render(<AllProducts />);

    // Attendre le chargement initial
    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
    });

    // Filtrer par bio
    const bioBtn = screen.getByRole('button', { name: 'bio' });
    fireEvent.click(bioBtn);

    await waitFor(() => {
      expect(screen.queryByText("Engrais Chimique")).not.toBeInTheDocument();
    });

    // Réinitialiser le filtre en cliquant sur "Tous les produits"
    const allBtn = screen.getByRole('button', { name: /Tous les produits/i });
    fireEvent.click(allBtn);

    // Vérifier que tous les produits sont de nouveau affichés
    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
      expect(screen.getByText("Engrais Chimique")).toBeInTheDocument();
      expect(screen.getByText("Fumier Organique")).toBeInTheDocument();
    });

    // Vérifier le compteur (3 produits)
    expect(screen.getByText(/3 produits/i)).toBeInTheDocument();
  });

  test("affiche message si aucun produit disponible", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // pas de produits
    })
  );

  render(<AllProducts />);

  await waitFor(() => {
    // Vérifie le message principal
    expect(screen.getByText(/Aucun produit trouvé/i)).toBeInTheDocument();
    expect(screen.getByText(/Aucun produit disponible/i)).toBeInTheDocument();

    // Vérifie le compteur de produits de manière flexible
    expect(
      screen.getByText((content) => content.includes("0") && content.includes("produit"))
    ).toBeInTheDocument();
  });
});

  test("gère les erreurs lors du chargement", async () => {
    // Espionner console.error pour éviter le bruit dans les tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Mock pour simuler une erreur
    mockGetAllProducts.mockRejectedValueOnce(
      new Error("Erreur de connexion au serveur")
    );

    render(<AllProducts />);

    // Attendre la fin du chargement
    await waitFor(() => {
      expect(screen.queryByText(/Chargement des produits/i)).not.toBeInTheDocument();
    });

    // Vérifier que le message "Aucun produit disponible" s'affiche
    // (car products reste vide après l'erreur)
    expect(screen.getByText(/Aucun produit disponible/i)).toBeInTheDocument();
    
    // Vérifier que console.error a été appelé
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test("affiche les catégories dynamiquement", async () => {
    render(<AllProducts />);

    // Attendre le chargement
    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
    });

    // Vérifier que les boutons de catégories sont présents
    expect(screen.getByRole('button', { name: /Tous les produits/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'bio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'chimique' })).toBeInTheDocument();
  });

  test("affiche le badge 'Filtré par' quand une catégorie est sélectionnée", async () => {
    render(<AllProducts />);

    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
    });

    // Cliquer sur le filtre bio
    const bioBtn = screen.getByRole('button', { name: 'bio' });
    fireEvent.click(bioBtn);

    // Vérifier que le badge "Filtré par" apparaît
    await waitFor(() => {
      expect(screen.getByText(/Filtré par:/i)).toBeInTheDocument();
    });
  });

  test("permet de supprimer le filtre via le badge", async () => {
    render(<AllProducts />);

    await waitFor(() => {
      expect(screen.getByText("Engrais Bio")).toBeInTheDocument();
    });

    // Appliquer un filtre
    const bioBtn = screen.getByRole('button', { name: 'bio' });
    fireEvent.click(bioBtn);

    await waitFor(() => {
      expect(screen.getByText(/Filtré par:/i)).toBeInTheDocument();
    });

    // Supprimer le filtre via le badge X
    const closeBtn = screen.getByRole('button', { name: '' }); // Le bouton X
    fireEvent.click(closeBtn);

    // Vérifier que tous les produits sont de nouveau affichés
    await waitFor(() => {
      expect(screen.getByText("Engrais Chimique")).toBeInTheDocument();
    });
  });
});