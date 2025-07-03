import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserList from "./UserList";
import { create } from "zustand";

vi.mock("../../../store/user.store", () => {
  const actual = vi.importActual("../../../store/user.store");
  return {
    ...actual,
    default: create(() => ({
      currentUser: { id: 1, name: "John Doe", avatar: "avatar-url" },
      setCurrentUser: vi.fn(),
      setCurrentRecipient: vi.fn(),
    })),
  };
});

vi.mock("../../../store/page.store", () => {
  const actual = vi.importActual("../../../store/page.store");
  return {
    ...actual,
    default: create(() => ({
      setCurrentPage: vi.fn(),
    })),
  };
});

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(() => ({
    data: [
      { id: 1, name: "John Doe", avatar: "avatar-url" },
      { id: 2, name: "Jane Smith", avatar: "avatar-url" },
    ],
  })),
}));

const queryClient = new QueryClient();

describe("UserList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("renders the user list with correct headings", () => {
    renderWithQueryClient(<UserList />);
    expect(screen.getByText("Select Current User")).toBeInTheDocument();
    expect(screen.getByText("Message Someone")).toBeInTheDocument();
  });

  it("renders users with correct buttons", () => {
    renderWithQueryClient(<UserList />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Current User")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("calls setCurrentUser when switching users", () => {
    const mockSetCurrentUser = vi.fn();
    const userStore = require("../../../store/user.store").default;
    userStore.setState({ setCurrentUser: mockSetCurrentUser });

    renderWithQueryClient(<UserList />);
    const switchButton = screen.getByText("Switch to");
    fireEvent.click(switchButton);

    expect(mockSetCurrentUser).toHaveBeenCalledWith({
      id: 2,
      name: "Jane Smith",
      avatar: "avatar-url",
    });
  });

  it("calls setCurrentRecipient and setCurrentPage when messaging a user", () => {
    const mockSetCurrentRecipient = vi.fn();
    const mockSetCurrentPage = vi.fn();
    const userStore = require("../../../store/user.store").default;
    const pageStore = require("../../../store/page.store").default;

    userStore.setState({ setCurrentRecipient: mockSetCurrentRecipient });
    pageStore.setState({ setCurrentPage: mockSetCurrentPage });

    renderWithQueryClient(<UserList />);
    const messageButton = screen.getByText("Message");
    fireEvent.click(messageButton);

    expect(mockSetCurrentRecipient).toHaveBeenCalledWith({
      id: 2,
      name: "Jane Smith",
      avatar: "avatar-url",
    });
    expect(mockSetCurrentPage).toHaveBeenCalledWith("chat");
  });
});
