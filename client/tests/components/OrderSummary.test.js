import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useAppContext } from "@/context/AppContext";

import toast from "react-hot-toast";
import OrderSummary from "@/components/OrderSummary";
import { usePersistentOrderForm } from "@/hooks/usePersistentOrderForm";

// --- MOCKS ---
jest.mock("@/context/AppContext");
jest.mock("@/hooks/usePersistentOrderForm");
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("OrderSummary", () => {
  const mockRouterPush = jest.fn();
  const mockCreateOrder = jest.fn();

  const mockUpdateFormData = jest.fn();
  const mockClearFormData = jest.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      router: { push: mockRouterPush },
      total: 100,
      createOrder: mockCreateOrder,
    });

    usePersistentOrderForm.mockReturnValue({
      formData: {
        address: { phone: "+123456789", city: "City", street: "Street", postalCode: "12345", notes: "" },
        deliveryType: "delivery",
        paymentMethod: "cash_on_delivery",
        selectedAddress: null,
        isSubmitted: true,
      },
      updateFormData: mockUpdateFormData,
      clearFormData: mockClearFormData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche les informations de commande", () => {
    render(<OrderSummary cartCount={2} cartItems={[{ product: { _id: "1" }, quantity: 2 }]} />);
    
    expect(screen.getByText("Détails de la commande")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("+123456789")).toBeInTheDocument();
  });

  it("désactive le bouton si le formulaire n'est pas valide", () => {
    usePersistentOrderForm.mockReturnValueOnce({
      formData: {
        address: { phone: "" },
        deliveryType: "",
        paymentMethod: "",
        selectedAddress: null,
        isSubmitted: false,
      },
      updateFormData: mockUpdateFormData,
      clearFormData: mockClearFormData,
    });

    render(<OrderSummary cartCount={0} cartItems={[]} />);
    
    const button = screen.getByRole("button", { name: /demander un devis/i });
    expect(button).toBeDisabled();
  });

  it("crée une commande correctement", async () => {
    mockCreateOrder.mockResolvedValue({ success: true });
    
    render(<OrderSummary cartCount={1} cartItems={[{ product: { _id: "1" }, quantity: 1 }]} />);
    
    const button = screen.getByRole("button", { name: /demander un devis/i });
    await userEvent.click(button);
    
    expect(mockCreateOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [{ product: "1", quantity: 1 }],
        deliveryType: "delivery",
        phone: "+123456789",
      })
    );
    expect(toast.success).toHaveBeenCalledWith("Commande créée avec succès !");
  });

  it("affiche une erreur si le formulaire n'est pas valide", async () => {
    usePersistentOrderForm.mockReturnValueOnce({
      formData: {
        address: { phone: "" },
        deliveryType: "delivery",
        paymentMethod: "cash_on_delivery",
        selectedAddress: null,
        isSubmitted: false,
      },
      updateFormData: mockUpdateFormData,
      clearFormData: mockClearFormData,
    });

    render(<OrderSummary cartCount={1} cartItems={[{ product: { _id: "1" }, quantity: 1 }]} />);
    
    const button = screen.getByRole("button", { name: /demander un devis/i });
    await userEvent.click(button);
    
    expect(toast.error).toHaveBeenCalledWith("Veuillez remplir tous les champs requis");
  });
});
