import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./auth.store";
import type { AxiosResponse } from "axios";

export interface Message {
  _id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface User {
  _id: number;
  name: string;
}

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: {
    content: string;
    senderId?: string;
    recipientId: string;
  }) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res: AxiosResponse<User[]> = await axiosInstance.get(
        "/messages/users"
      );
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res: AxiosResponse<Message[]> = await axiosInstance.get(
        `/messages/${userId}`
      );
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: {
    content: string;
    recipientId: string;
    senderId?: string;
  }) => {
    const { selectedUser, messages } = get();

    console.log("Sending message to:", selectedUser?._id, messageData);
    console.log("messageDatao:", messageData);
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
    try {
      const res: AxiosResponse<Message> = await axiosInstance.post(
        `/messages/send/${messageData.recipientId}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) {
      toast.error("Socket connection is not available");
      return;
    }

    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === `${selectedUser._id}`;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser: User) => set({ selectedUser }),
}));
