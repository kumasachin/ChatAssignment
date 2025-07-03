import { describe, it, expect } from "vitest";
import useMessagesStore from "../../store/messages.store";

describe("Messages Store", () => {
  it("initializes with an empty messages array", () => {
    const { messages } = useMessagesStore.getState();
    expect(messages).toEqual([]);
  });

  it("creates a new message and adds it to the store", () => {
    const { createMessage } = useMessagesStore.getState();

    const newMessage = {
      senderId: 1,
      recipientId: 2,
      content: "Hello, world!",
    };

    createMessage(newMessage);

    const updatedMessages = useMessagesStore.getState().messages;
    expect(updatedMessages).toHaveLength(1);
    expect(updatedMessages[0]).toMatchObject({
      id: 1,
      senderId: 1,
      recipientId: 2,
      content: "Hello, world!",
    });
    expect(updatedMessages[0].timestamp).toBeDefined();
  });

  it("increments the message ID for each new message", () => {
    const { createMessage } = useMessagesStore.getState();

    createMessage({
      senderId: 1,
      recipientId: 2,
      content: "First message",
    });

    createMessage({
      senderId: 3,
      recipientId: 4,
      content: "Second message",
    });

    const updatedMessages = useMessagesStore.getState().messages;
    expect(updatedMessages).toHaveLength(3);
    expect(updatedMessages[0].id).toBe(1);
    expect(updatedMessages[1].id).toBe(2);
  });

  it("stores the correct timestamp for each message", () => {
    const { createMessage } = useMessagesStore.getState();

    createMessage({
      senderId: 1,
      recipientId: 2,
      content: "Timestamp test",
    });

    const updatedMessages = useMessagesStore.getState().messages;
    expect(new Date(updatedMessages[0].timestamp).toString()).not.toBe(
      "Invalid Date"
    );
  });
});
