import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./auth.type";

type UserStoreState = {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserStoreState>()(persist((set) => ({
    user: null,
    setUser: (user: User) => set({ user })
}), { name: "user-storage" }));