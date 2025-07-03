import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageItem from "./MessageItem";
import type { Message } from "../../../../../../store/messages.store";

describe("MessageItem Component", () => {
  it("renders the message content", () => {
    const mockMessage: Message = {
      id: 1,
      senderId: 1,
      recipientId: 2,
      content: "Hello, World!",
      timestamp: "2025-07-01T12:00:00Z",
    };

    render(<MessageItem message={mockMessage} />);

    // Verify that the message content is displayed
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    const mockMessage: Message = {
      id: 1,
      senderId: 1,
      recipientId: 2,
      content: "Styled Message",
      timestamp: "2025-07-01T12:00:00Z",
    };

    const { container } = render(<MessageItem message={mockMessage} />);

    // Verify that the component has the correct class names
    const messageDiv = container.querySelector("div");
    expect(messageDiv).toHaveClass(
      "rounded-lg px-[10px] py-[4px] text-sm bg-amber-50 m-[8px]"
    );
  });
});
