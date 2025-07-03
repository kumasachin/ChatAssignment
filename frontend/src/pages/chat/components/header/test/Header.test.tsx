import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import Header from "../Header";
import usePageStore from "../../../../../store/page.store";
import useUserStore from "../../../../../store/user.store";

describe("Header Component", () => {
  it("renders correctly when currentRecipient and currentUser exist", () => {
    useUserStore.setState({
      currentRecipient: { _id: 1, name: "Recipient User" },
      currentUser: { _id: 1, name: "Current User" },
    });
    render(<Header />);

    expect(screen.getByText("Recipient User")).toBeInTheDocument();
  });

  it.skip("does not render when currentRecipient or currentUser is missing", () => {
    useUserStore.setState({
      currentRecipient: null,
    });
    const { container } = render(<Header />);
    expect(container.firstChild).toBeNull();
  });

  it.skip("calls setCurrentPage when ChevronLeft is clicked", () => {
    const setCurrentPageMock = vi.fn();
    usePageStore.setState({
      setCurrentPage: setCurrentPageMock,
    });
    render(<Header />);
    const chevronLeft = screen.getByRole("button", { name: /ChevronLeft/i });
    fireEvent.click(chevronLeft);

    expect(setCurrentPageMock).toHaveBeenCalledWith("home");
  });
});
