import { KeyStorageType } from "../types/index.type";

export const getDataFromStorage = <T = unknown>(key: KeyStorageType): T | string | null => {
    if (typeof window === "undefined") return null

    const data = localStorage.getItem(key);

    if (!data) return null;

    try {
        const parsed = JSON.parse(data);
        if (
            (typeof parsed === "object" && parsed !== null) ||
            (typeof parsed === "boolean" && parsed !== null)
        ) {
            return parsed;
        }
        return data;
    } catch (error) {
        return data;
    }
};

export const saveDataInStorage = <T = unknown>(key: KeyStorageType, data: T) => {
    if (typeof window === "undefined") return null

    if (typeof data === "string") {
        localStorage.setItem(key, data);
    }
    if (typeof data !== "string") {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const deleteLocalStorage = () => {
    if (typeof window === "undefined") return null

    localStorage.clear();
    window.location.reload();
};

export const removeFromStorage = (key: KeyStorageType) => {
    if (typeof window === "undefined") return null

    const data = localStorage.getItem(key);

    if (!data) return null;

    if (data) localStorage.removeItem(key);
};

export const getDataFromSessionStorage = <T = unknown>(key: KeyStorageType): T | null | string => {
    if (typeof window === "undefined") return null

    const data = sessionStorage.getItem(key);

    if (!data) return null;

    try {
        const parsed = JSON.parse(data);
        if (
            (typeof parsed === "object" && parsed !== null) ||
            (typeof parsed === "boolean" && parsed !== null)
        ) {
            return parsed;
        }
        return data;
    } catch (error) {
        return data;
    }
};

export const saveDataInSessionStorage = <T = unknown>(key: KeyStorageType, data: T) => {
    if (typeof window === "undefined") return null

    if (typeof data === "string") {
        sessionStorage.setItem(key, data);
    }
    if (typeof data !== "string") {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
};

export const removeFromSessionStorage = (key: KeyStorageType) => {
    if (typeof window === "undefined") return null

    const data = sessionStorage.getItem(key);

    if (!data) return null;

    if (data) sessionStorage.removeItem(key);
};

export const deletSessionStorage = () => {
    if (typeof window === "undefined") return null

    sessionStorage.clear();
    window.location.reload();
};
