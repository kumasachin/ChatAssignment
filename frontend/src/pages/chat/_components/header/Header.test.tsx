import { describe, it, expect, beforeEach } from "vitest";
import useMessagesStore from "../../../../store/messages.store";

describe("Messages Store", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useMessagesStore.setState({ messages: [] });
  });

  it("initializes with an empty messages array", () => {
    const { messages } = useMessagesStore.getState();
    expect(messages).toEqual([]);
  });

  it("creates a new message and adds it to the store", () => {
    const messageInput = {
      senderId: 1,
      recipientId: 2,
      content: "Hello, World!",
    };

    useMessagesStore.getState().createMessage(messageInput);

    const { messages } = useMessagesStore.getState();
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      senderId: 1,
      recipientId: 2,
      content: "Hello, World!",
    });
    expect(messages[0].id).toBe(1);
    expect(messages[0].timestamp).toBeDefined();
  });

  it("creates multiple messages and assigns unique IDs", () => {
    const messageInput1 = {
      senderId: 1,
      recipientId: 2,
      content: "First message",
    };

    const messageInput2 = {
      senderId: 2,
      recipientId: 1,
      content: "Second message",
    };

    useMessagesStore.getState().createMessage(messageInput1);
    useMessagesStore.getState().createMessage(messageInput2);

    const { messages } = useMessagesStore.getState();
    expect(messages).toHaveLength(2);
    expect(messages[0].id).toBe(1);
    expect(messages[1].id).toBe(2);
  });

  it("preserves the order of messages", () => {
    const messageInput1 = {
      senderId: 1,
      recipientId: 2,
      content: "First message",
    };

    const messageInput2 = {
      senderId: 2,
      recipientId: 1,
      content: "Second message",
    };

    useMessagesStore.getState().createMessage(messageInput1);
    useMessagesStore.getState().createMessage(messageInput2);

    const { messages } = useMessagesStore.getState();
    expect(messages[0].content).toBe("First message");
    expect(messages[1].content).toBe("Second message");
  });

  it("handles empty input gracefully", () => {
    const messageInput = {
      senderId: 0,
      recipientId: 0,
      content: "",
    };

    useMessagesStore.getState().createMessage(messageInput);

    const { messages } = useMessagesStore.getState();
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      senderId: 0,
      recipientId: 0,
      content: "",
    });
  });
});
