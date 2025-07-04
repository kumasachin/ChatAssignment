import { create } from "zustand";
import type { User, UserState } from "../types/auth";

const useUserStore = create<UserState>()((set) => ({
  currentUser: {
    _id: 1,
    name: "Alisha",
    profile: "https://randomuser.me/api/portraits/women/89.jpg",
  },
  setCurrentUser: (user: User) => set({ currentUser: user }),
  currentRecipient: null,
  setCurrentRecipient: (user: User | null) => set({ currentRecipient: user }),
}));

export default useUserStore;
