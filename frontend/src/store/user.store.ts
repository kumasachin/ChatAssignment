import { create } from "zustand";

export type User = {
  _id: number;
  name: string;
  profile?: string;
  email: string;
};

type UserState = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  currentRecipient: User | null;
  setCurrentRecipient: (user: User | null) => void;
};

const useUserStore = create<UserState>()((set) => ({
  currentUser: {
    _id: 1,
    name: "Alisha",
    profile: "https://randomuser.me/api/portraits/women/89.jpg",
    email: "",
  },
  setCurrentUser: (user: User) => set({ currentUser: user }),
  currentRecipient: null,
  setCurrentRecipient: (user: User | null) => set({ currentRecipient: user }),
}));

export default useUserStore;
