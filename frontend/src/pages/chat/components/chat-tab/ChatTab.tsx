import { useState } from "react";
import useMessagesStore from "../../../../store/messages.store.ts";
import useUserStore from "../../../../store/user.store.ts";
import MessageItem from "./components/message/MessageItem.tsx";
import { useAuthStore } from "../../../../store/auth.store";
import { useChatStore } from "../../../../store/chat.store";
import type { Message } from "../../../../store/messages.store.ts";
import { useEffect, useRef } from "react";

type ExtendedMessage = Message & {
  recipientId: string;
  timestamp: string;
};

const ChatTab = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const currentUser = useUserStore((state) => state.currentUser);
  const currentRecipient = useUserStore((state) => state.currentRecipient);
  // const messages = useMessagesStore((state) => state.messages);
  const { authUser } = useAuthStore();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage,
  } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [content, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRecipient || !currentMessage.trim()) return;

    const newMessage = {
      senderId: currentUser._id,
      recipientId: currentRecipient._id,
      content: currentMessage.trim(),
    };

    console.log("Sending message:", selectedUser?._id, currentRecipient._id);
    setCurrentMessage("");

    try {
      await sendMessage({
        content: currentMessage.trim(),
        senderId: `${currentUser._id}`,
        recipientId: `${currentRecipient._id}`,
      });

      // Clear form
      // setText("");
      // setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // useEffect(() => {
  //   console.log("messages", messages);
  //   if (messageEndRef.current && messages) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) getMessages(`${selectedUser?._id}`);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col p-[5px] overflow-auto max-h-[490px]">
        <div className="mt-auto">
          {messages?.length > 0 &&
            messages?.map((message) => (
              <div key={message.updatedAt || message.createdAt}>
                <MessageItem message={message} key={message._id} />
              </div>
            ))}
        </div>
      </div>
      <div className="p-[20px] px-[10px]">
        <form
          onSubmit={(e) => handleMessageSend(e)}
          className="flex gap-[10px]"
        >
          <input
            type="text"
            placeholder={`Message ${currentRecipient?.name || ""}`}
            className="flex-1 rounded-full border-[8px] border-[#cfcfcf] px-[12px] py-[8px]"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatTab;
