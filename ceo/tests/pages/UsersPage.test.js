// tests/pages/UsersPage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersPage from "@/app/users/page"; // ⚠️ adapte ce chemin selon ton arborescence
import { AdminContext } from "@/context/AdminContext";

// On mock react-hot-toast pour éviter les erreurs de toast pendant les tests
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("UsersPage", () => {
  const mockFetchUsers = jest.fn();
  const mockDeleteUser = jest.fn();
  const mockExportUsers = jest.fn();

  const mockContextValue = {
    users: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        city: "Tunis",
        isActive: true,
        analytics: { totalOrders: 5, totalSpent: 250, lastOrderDate: "2025-10-10" },
        createdAt: "2025-10-20",
      },
    ],
    statistics: { totalUsers: 1, newUsersThisMonth: 1, deletedUsers: 0 },
    loading: false,
    deleteUser: mockDeleteUser,
    fetchUsers: mockFetchUsers,
    pagination: { totalUsers: 1, totalPages: 1, hasPrevPage: false, hasNextPage: false },
    exportUsers: mockExportUsers,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("affiche la liste des utilisateurs", () => {
    render(
      <AdminContext.Provider value={mockContextValue}>
        <UsersPage />
      </AdminContext.Provider>
    );

    expect(screen.getByText("Clients")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  test("appelle fetchUsers au montage", () => {
    render(
      <AdminContext.Provider value={mockContextValue}>
        <UsersPage />
      </AdminContext.Provider>
    );
    expect(mockFetchUsers).toHaveBeenCalled();
  });

  test("ouvre le modal lors du clic sur Supprimer", async () => {
    render(
      <AdminContext.Provider value={mockContextValue}>
        <UsersPage />
      </AdminContext.Provider>
    );

    const deleteButton = screen.getByTestId("delete-button-1"); 
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Supprimer utilisateur")).toBeInTheDocument();
    });
  });

  test("confirme la suppression d’un utilisateur", async () => {
    render(
      <AdminContext.Provider value={mockContextValue}>
        <UsersPage />
      </AdminContext.Provider>
    );

    const deleteButton = screen.getAllByRole("button")[3]; // le bouton Trash2
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Supprimer utilisateur")).toBeInTheDocument();
    });

    const confirmButton = screen.getByText("Supprimer");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith("1");
    });
  });
});
