export type SizeTypeFull = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type VariantType = "default" | "primary" | "secondary" | "outline" | "ghost" | "danger" | "none";

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