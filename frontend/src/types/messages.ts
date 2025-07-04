import type { AuthTypes } from "../types/auth";

export namespace Messages {
  export interface Message {
    _id: string;
    senderId: string;
    recipientId: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
  }
  export type MessageType = "received" | "sent";
  export type MessageProps = {
    message: { content: string; senderId: string; recipientId: string };
    type?: MessageType;
    isNotRecent?: boolean;
  };

  export interface ChatStore {
    messages: Messages.Message[];
    users: AuthTypes.User[];
    selectedUser: AuthTypes.User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
  }
}
