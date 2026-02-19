import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";
import { Theme as ThemeType } from "./useThemeStore";

const sharedConfig = {
    typography: {
        fontFamily: "var(--font-inter-title)",

        body1: { fontFamily: "var(--font-inter-sans)" },
        body2: { fontFamily: "var(--font-inter-sans)" },
        subtitle1: { fontFamily: "var(--font-inter-sans)" },
        subtitle2: { fontFamily: "var(--font-inter-sans)" },
        caption: { fontFamily: "var(--font-inter-sans)" },
        button: { fontFamily: "var(--font-inter-sans)" },
        overline: { fontFamily: "var(--font-inter-sans)" },
    },
    shape: {
        borderRadius: 12,
    },
}

const lightTheme: Theme = createTheme({
    ...sharedConfig,
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
});

const darkTheme: Theme = createTheme({
    ...sharedConfig,
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
});

export const getMuiTheme = (mode: ThemeType): Theme => {
    return responsiveFontSizes(mode === ThemeType.LIGHT ? lightTheme : darkTheme, {
        breakpoints: ["xs", "sm", "md", "lg", "xl"],
        factor: 5
    })
};