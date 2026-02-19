export type BasicSizes = Exclude<ExtendedSizes, "none" | "full">;

export type ExtendedSizes = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type VariantType = "default" | "primary" | "secondary" | "outline" | "ghost" | "danger" | "none";

export type ButtonTypes = "button" | "submit" | "reset";
export type VariantLoadingButtonColor = "primary" | "secondary" | "white" | "gray" | "warning" | "success" | "error";

export enum EventsType {
    MOUSE_DOWN = "mousedown",
    KEY_DOWN = "keydown"
}

export enum KeyboardKey {
    ESCAPE = "Escape",
    ENTER = "Enter",
    TAB = "Tab",
    SHIFT = "Shift"
}

export enum TriggerType {
    CLICK = "click",
    HOVER = "hover",
}

export enum DirectionType {
    ROW = "row",
    COL = "col",
}

export enum PathTypes {
    LOGIN = "/login",
    REGISTER = "/register",
    HOME = "/",
    PROFILE = "/profile",
    DASHBOARD = "/dashboard"
}

export interface ImageSourceType {
    avif480?: string;
    webp480?: string;
    png480?: string;

    avif800?: string;
    webp800?: string;
    png800?: string;

    avif1200?: string;
    webp1200?: string;
    png1200?: string;

    avif1800?: string;
    webp1800?: string;
    png1800?: string;

    avif?: string;
    webp?: string;
    png?: string;

    url: string;
    alt?: string
}