import { useState } from 'react';
import useUserStore from '../../../../store/user.store.ts';
import MessageItem from './MessageItem.tsx';
import type { Message } from '../../../../types/messages.ts';
import { useChatStore } from '../../../../store/messages.store.ts';
import { useEffect, useRef } from 'react';
import { getTimeDifferenceInSeconds, formatTimestamp } from '../../../../utils/time.ts';

const ChatTab = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const currentUser = useUserStore(state => state.currentUser);
  const currentRecipient = useUserStore(state => state.currentRecipient);
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage,
  } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRecipient || !currentMessage.trim()) return;

    setCurrentMessage('');

    try {
      await sendMessage({
        content: currentMessage.trim(),
        senderId: `${currentUser._id}`,
        recipientId: `${currentRecipient._id}`,
      });

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) getMessages(`${selectedUser?._id}`);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="flex-1 flex flex-col p-[5px] overflow-auto max-h-[490px]"
        ref={messageEndRef}
        data-testid="message-container"
      >
        <div className="mt-auto">
          {messages?.length > 0 &&
            messages?.map((message: Message, index: number) => {
              const timeDifference: number = getTimeDifferenceInSeconds(
                message.updatedAt || message.createdAt,
                messages[index - 1]?.updatedAt || messages[index - 1]?.createdAt
              );

              return (
                <div key={message.updatedAt || message.createdAt} data-testid="message-item">
                  {timeDifference >= 60 && (
                    <div
                      className="flex justify-center text-xs text-gray-500 my-[6px]"
                      data-testid="message-timestamp"
                    >
                      {formatTimestamp(message.updatedAt || message.createdAt)}
                    </div>
                  )}
                  <MessageItem
                    message={message}
                    key={message._id}
                    isNotRecent={timeDifference > 20}
                    type={`${selectedUser?._id}` === message.recipientId ? 'sent' : 'received'}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="p-[20px] px-[10px]">
        <form
          onSubmit={e => handleMessageSend(e)}
          className="flex gap-[10px]"
          data-testid="chat-tab-form"
        >
          <input
            type="text"
            data-testid="message-input"
            placeholder={`Message ${currentRecipient?.name || ''}`}
            className="flex-1 rounded-full border-[8px] border-[#cfcfcf] px-[12px] py-[8px]"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatTab;
