import { createTheme, Theme } from "@mui/material/styles";
import { Theme as ThemeType } from "./useThemeStore";

const lightTheme: Theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#6366f1" },
        secondary: { main: "#ec4899" },
        background: {
            default: "#ffffff",
            paper: "#f3f4f6",
        },
        text: {
            primary: "#111827",
            secondary: "#6b7280",
        },
    },
    shape: {
        borderRadius: 12,
    },
});

const darkTheme: Theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#818cf8" },
        secondary: { main: "#f472b6" },
        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },
        text: {
            primary: "#f1f5f9",
            secondary: "#94a3b8",
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export const getMuiTheme = (mode: ThemeType): Theme => mode === ThemeType.LIGHT ? lightTheme : darkTheme;