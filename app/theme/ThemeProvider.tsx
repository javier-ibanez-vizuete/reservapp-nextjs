"use client";

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { getMuiTheme } from "./muiTheme";
import { useThemeStore } from "./useThemeStore";

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const theme = useThemeStore((state) => state.theme);
    const muiThemeValue = useMemo(() => getMuiTheme(theme), [theme]);
    return (
        <MuiThemeProvider theme={muiThemeValue}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
