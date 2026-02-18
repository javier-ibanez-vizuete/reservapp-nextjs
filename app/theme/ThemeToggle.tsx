"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip } from "@mui/material";
import { Theme, useThemeStore } from "./useThemeStore";

export function ThemeToggle() {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const isDarkTheme = theme === Theme.DARK;

    return (
        <Tooltip title={isDarkTheme ? "Activar Modo Claro" : "Activar Modo Oscuro"}>
            <IconButton onClick={toggleTheme} color="inherit" aria-label="Cambiar Thema">
                {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
}
