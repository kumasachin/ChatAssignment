import { create } from "zustand";
import type { AuthTypes } from "../types/auth";

const useUserStore = create<AuthTypes.UserState>()((set) => ({
  currentUser: {
    _id: 1,
    name: "Alisha",
    profile: "https://randomuser.me/api/portraits/women/891.jpg",
  },
  setCurrentUser: (user: AuthTypes.User) => set({ currentUser: user }),
  currentRecipient: null,
  setCurrentRecipient: (user: AuthTypes.User | null) =>
    set({ currentRecipient: user }),
}));

export default useUserStore;
