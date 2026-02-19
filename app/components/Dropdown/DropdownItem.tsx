"use client";

import { KeyboardKey, SizeTypeFull } from "@/app/types/index.type";
import { clsx } from "clsx";
import {
    KeyboardEvent,
    memo,
    useCallback,
    useMemo,
    type HTMLAttributes,
    type MouseEvent,
    type ReactNode,
} from "react";

export type DropdownItemProps = {
    children: ReactNode;
    onClick?: () => void;
    onClose?: () => void;
    padding?: SizeTypeFull | "2xs";
    disabled?: boolean;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

function DropdownItem({
    children,
    onClick,
    onClose,
    padding,
    disabled = false,
    className = "",
    ...props
}: DropdownItemProps) {
    const handleClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (disabled) return;
            onClick?.(event);
            onClose?.();
        },
        [disabled, onClick, onClose]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === KeyboardKey.ENTER && !disabled) {
                onClick?.();
                onClose?.();
            }
        },
        [disabled, onClick, onClose]
    );

    const baseItemClasses = useMemo(
        () =>
            clsx(
                "cursor-pointer whitespace-nowrap transition-all duration-500 ease-in-out",
                "lg:hover:-translate-y-[2px]",
                {
                    "opacity-50 cursor-not-allowed": disabled,
                }
            ),
        [disabled]
    );

    const variantsPadding: Record<SizeTypeFull | "2xs" | "default", string> = useMemo(
        () => ({
            default: "px-3 py-1.5",
            none: " ",
            "2xs": "px-1 py-0.5",
            xs: "px-2 py-1",
            sm: "px-3 py-1.5",
            md: "px-4 py-2",
            lg: "px-6 py-3",
            xl: "px-8 py-4",
            full: "p-4",
        }),
        []
    );

    const autoConfig = useMemo(() => ({ padding: "px-3 py-1.5 lg:px-4 lg:py-2" }), []);

    const currentItemClasses = useMemo(
        () =>
            clsx(
                baseItemClasses,
                padding?.trim() ? variantsPadding[padding] : autoConfig.padding || variantsPadding["default"],
                className
            ),
        [baseItemClasses, padding, autoConfig.padding, className]
    );

    return (
        <div
            className={currentItemClasses}
            onClick={handleClick}
            role="menuitem"
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            {...props}
        >
            {typeof children === "string" ? <p>{children}</p> : children}
        </div>
    );
}

export default memo(DropdownItem);
