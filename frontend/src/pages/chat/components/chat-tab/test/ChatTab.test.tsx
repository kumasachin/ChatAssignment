import { render, screen, fireEvent } from "@testing-library/react";
import ChatTab from "../ChatTab";
import { useChatStore } from "../../../../../store/messages.store.ts";

let mockUserStore = {
  currentUser: { _id: "user1" },
  currentRecipient: { _id: "user2", name: "Recipient" },
};

// let mockTimeUtils = {
//   getTimeDifferenceInSeconds: jest.fn(() => 3600),
//   formatTimestamp: jest.fn(() => "Formatted Timestamp"),
// };

// jest.mock("../../../../store/user.store.ts", () => ({
//   __esModule: true,
//   default: () => mockUserStore,
// }));

// jest.mock("../../../../utils/time.ts", () => mockTimeUtils);

// afterEach(() => {
//   // Reset mocks after each test
//   useChatStore.getMessages.mockReset();
//   useChatStore.subscribeToMessages.mockReset();
//   mockChatStore.unsubscribeFromMessages.mockReset();
//   mockChatStore.sendMessage.mockReset();
//   mockTimeUtils.getTimeDifferenceInSeconds.mockReset();
//   mockTimeUtils.formatTimestamp.mockReset();
// });

describe("ChatTab Component", () => {
  it("renders correctly", () => {
    useChatStore.setState({
      messages: [
        {
          _id: "1",
          senderId: "user1",
          recipientId: "user2",
          content: "Message Recipient",
          createdAt: new Date().toISOString(),
        },
      ],
    });
    render(<ChatTab />);

    console.log(screen.debug());
    const inputElement = screen.getByText("Message Recipient");
    expect(inputElement).toBeInTheDocument();
  });

  // it("prevents sending empty messages", () => {
  //   render(<ChatTab />);
  //   const form = screen.getByTestId("chat-tab-form");
  //   fireEvent.submit(form);
  //   expect(useChatStore.setState).not.toHaveBeenCalled();
  // });

  // it("calls sendMessage with correct parameters", () => {
  //   render(<ChatTab />);
  //   const input = screen.getByPlaceholderText("Message Recipient");
  //   fireEvent.change(input, { target: { value: "Test Message" } });
  //   const form = screen.getByRole("form");
  //   fireEvent.submit(form);

  //   expect(mockChatStore.sendMessage).toHaveBeenCalledWith({
  //     content: "Test Message",
  //     senderId: "user1",
  //     recipientId: "user2",
  //   });
  // });

  // it("calls getMessages when selectedUser._id changes", () => {
  //   render(<ChatTab />);
  //   expect(mockChatStore.getMessages).toHaveBeenCalledWith("user1");
  // });

  // it("calls subscribeToMessages and unsubscribeFromMessages correctly", () => {
  //   const { unmount } = render(<ChatTab />);
  //   expect(mockChatStore.subscribeToMessages).toHaveBeenCalled();
  //   unmount();
  //   expect(mockChatStore.unsubscribeFromMessages).toHaveBeenCalled();
  // });

  // it("renders messages correctly", () => {
  //   render(<ChatTab />);
  //   expect(screen.getByText("Hello")).toBeInTheDocument();
  //   expect(screen.getByText("Hi")).toBeInTheDocument();
  //   expect(screen.getByText("Formatted Timestamp")).toBeInTheDocument();
  // });
});
