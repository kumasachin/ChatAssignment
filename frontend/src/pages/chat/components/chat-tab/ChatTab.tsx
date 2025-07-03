import { useState } from "react";
import useUserStore from "../../../../store/user.store.ts";
import MessageItem from "./components/message/MessageItem.tsx";
import { useAuthStore } from "../../../../store/auth.store";
import type { Message } from "../../../../store/chat.store";
import { useChatStore } from "../../../../store/chat.store";
import { useEffect, useRef } from "react";
import {
  getTimeDifferenceInSeconds,
  formatTimestamp,
} from "../../../../utils/time.ts";

const ChatTab = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const currentUser = useUserStore((state) => state.currentUser);
  const currentRecipient = useUserStore((state) => state.currentRecipient);
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
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="flex-1 flex flex-col p-[5px] overflow-auto max-h-[490px]"
        ref={messageEndRef}
      >
        <div className="mt-auto">
          {messages?.length > 0 &&
            messages?.map((message: Message, index: number) => {
              const timeDifference = getTimeDifferenceInSeconds(
                message.updatedAt || message.createdAt,
                messages[index - 1]?.updatedAt || messages[index - 1]?.createdAt
              );

              return (
                <div key={message.updatedAt || message.createdAt}>
                  {timeDifference >= 3600 && (
                    <div className="flex justify-center text-xs text-gray-500 my-[6px]">
                      {formatTimestamp(message.updatedAt || message.createdAt)}
                    </div>
                  )}
                  <MessageItem
                    message={message}
                    key={message._id}
                    isNotRecent={timeDifference < 21}
                    type={
                      `${selectedUser?._id}` === message.recipientId
                        ? "sent"
                        : "received"
                    }
                  />
                </div>
              );
            })}
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
