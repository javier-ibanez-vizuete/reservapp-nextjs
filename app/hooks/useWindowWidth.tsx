import { useCallback, useEffect, useRef, useState } from "react";
export const useWindowWidth = () => {
    const [width, setWidth] = useState<number>(0);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleResize = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 150);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return width;
};
