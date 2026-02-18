import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Theme {
    LIGHT = "light",
    DARK = "dark",
}

type ThemeState = {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(persist((set, get) => ({
    theme: Theme.LIGHT,
    toggleTheme: () => set({ theme: get().theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT }),
    setTheme: (theme) => set({ theme })
}), { name: "theme-storage" }));