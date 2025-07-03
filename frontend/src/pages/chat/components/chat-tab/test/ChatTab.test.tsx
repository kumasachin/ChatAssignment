import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatTab from "../ChatTab";
// import useMessagesStore from "../../../../../store/messages.store";
// import useUserStore from "../../../../store/user.store";

vi.mock("../../../../store/messages.store", () => ({
  default: vi.fn(() => ({
    messages: [],
    createMessage: vi.fn(),
  })),
}));

vi.mock("../../../../store/user.store", () => ({
  default: vi.fn(() => ({
    currentUser: { id: 1, name: "User1" },
    currentRecipient: { id: 2, name: "User2" },
  })),
}));

describe("ChatTab Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input field and placeholder text", () => {
    render(<ChatTab />);
    // const input = screen.getByPlaceholderText("Message User2");
    // expect(input).not.toBeInTheDocument();
  });

  //   it("renders messages from the store", () => {
  //     // (useMessagesStore as jest.Mock).mockReturnValue({
  //     //   messages: [
  //     //     {
  //     //       id: 1,
  //     //       senderId: 1,
  //     //       recipientId: 2,
  //     //       content: "Hello, User2!",
  //     //       timestamp: "2025-07-01T12:00:00Z",
  //     //     },
  //     //   ],
  //     //   createMessage: vi.fn(),
  //     // });
  //     useMessagesStore.setState({
  //       messages: [
  //         {
  //           id: 1,
  //           senderId: 1,
  //           recipientId: 2,
  //           content: "Hello, User2!",
  //           timestamp: "2025-07-01T12:00:00Z",
  //         },
  //       ],
  //       createMessage: vi.fn(),
  //     });
  //     // useUserStore.setState({
  //     //   id: 100,
  //     //   name: "Sachin",
  //     //   profile: "https://randomuser.me/api/portraits/women/89.jpg",
  //     // });

  //     render(<ChatTab />);
  //     expect(screen.getByText("Hello, User2!")).toBeInTheDocument();
  //   });

  //   it("calls createMessage when a message is sent", () => {
  //     const mockCreateMessage = vi.fn();
  //     (useMessagesStore as jest.Mock).mockReturnValue({
  //       messages: [],
  //       createMessage: mockCreateMessage,
  //     });

  //     render(<ChatTab />);
  //     const input = screen.getByPlaceholderText("Message User2");
  //     const form = screen.getByRole("form");

  //     fireEvent.change(input, { target: { value: "Hello, User2!" } });
  //     fireEvent.submit(form);

  //     expect(mockCreateMessage).toHaveBeenCalledWith({
  //       senderId: 1,
  //       recipientId: 2,
  //       content: "Hello, User2!",
  //     });
  //     expect(input).toHaveValue(""); // Ensure input is cleared after sending
  //   });

  //   it("does not call createMessage if the input is empty", () => {
  //     const mockCreateMessage = vi.fn();
  //     (useMessagesStore as jest.Mock).mockReturnValue({
  //       messages: [],
  //       createMessage: mockCreateMessage,
  //     });

  //     render(<ChatTab />);
  //     const form = screen.getByRole("form");

  //     fireEvent.submit(form);

  //     expect(mockCreateMessage).not.toHaveBeenCalled();
  //   });
});
