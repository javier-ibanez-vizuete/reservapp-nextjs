"use client";

import { Theme, useThemeStore } from "@/app/theme/useThemeStore";
import { DirectionType, ExtendedSizes, VariantType } from "@/app/types/index.type";
import { clsx } from "clsx";
import React, { HTMLAttributes, memo, ReactNode, useEffect, useMemo, useRef } from "react";
import { DropdownItemProps } from "./DropdownItem";

export type DropdownMenuProps = {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    placement?: string;
    variant?: VariantType | "background" | "accent";
    padding?: ExtendedSizes;
    gap?: ExtendedSizes;
    rounded?: ExtendedSizes;
    className?: string;
    direction?: "row" | "col";
} & HTMLAttributes<HTMLDivElement>;

const baseMenuClasses =
    "absolute z-50 flex p-0 flex-col transition-all duration-500 ease-in-out overflow-hidden" +
    "max-w-[325px] xs:max-w-[375px] sm:max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]";

const baseContainerItemsClasses = "flex flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide";

function DropdownMenu({
    children,
    isOpen = false,
    onClose,
    placement,
    variant,
    padding,
    gap,
    rounded,
    className = "",
    direction = "col",
    ...props
}: DropdownMenuProps) {
    const theme = useThemeStore((state) => state.theme);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (isOpen) {
            container.style.display = "flex";

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    container.style.visibility = "visible";
                    container.style.opacity = "1";
                    container.style.height = "auto";
                });
            });
        } else {
            container.style.opacity = "0";
            container.style.height = "0";

            const timeout = setTimeout(() => {
                if (container) {
                    container.style.visibility = "hidden";
                    container.style.display = "none";
                }
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const variantConfig: Record<VariantType | "background" | "accent", string> = useMemo(
        () => ({
            default: clsx("shadow-sm border lg:hover:shadow-md", {
                "bg-default border-default/90 ": theme === Theme.LIGHT,
                "bg-default-dark border-default-dark/90": theme === Theme.DARK,
            }),
            primary: clsx("shadow-sm border lg:hover:shadow-md", {
                "bg-primary border-primary/90": theme === Theme.LIGHT,
                "bg-primary-dark border-primary-dark/90": theme === Theme.DARK,
            }),
            secondary: clsx("shadow-sm border lg:hover:shadow-md", {
                "bg-secondary border-secondary/90": theme === Theme.LIGHT,
                "bg-secondary-dark border-secondary-dark/90 shadow-black/40": theme === Theme.DARK,
            }),
            outline: clsx("shadow-sm border lg:hover:shadow-md bg-default/5", {
                "border-default/90": theme === Theme.LIGHT,
                "border-default-dark/90": theme === Theme.DARK,
            }),
            ghost: "shadow-sm lg:hover:bg-default/50 bg-transparent border-transparent backdrop-blur-sm",
            background: clsx("shadow-sm border lg:hover:shadow-md", {
                "bg-background border-background/90": theme === Theme.LIGHT,
                "bg-background-dark border-background-dark/90": theme === Theme.DARK,
            }),
            accent: clsx("shadow-sm border lg:hover:shadow-md", {
                "bg-paper border-paper/90": theme === Theme.LIGHT,
                "bg-paper-dark border-paper-dark/90": theme === Theme.DARK,
            }),
            danger: clsx("shadow-sm border lg:hover:shadow-md", {
                "bg-danger border-danger/90": theme === Theme.LIGHT,
                "bg-danger-dark border-danger-dark/90": theme === Theme.DARK,
            }),
            none: " ",
        }),
        [theme]
    );

    const variantsPadding = useMemo(
        () => ({
            default: "p-3",
            none: " ",
            xs: "p-2",
            sm: "p-3",
            md: "p-4",
            lg: "p-6",
            xl: "p-8",
            full: "p-4",
        }),
        []
    );

    const variantsGap = useMemo(
        () => ({
            default: "gap-2",
            none: " ",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-4",
            xl: "gap-6",
            full: "gap-4",
        }),
        []
    );

    const variantsRounded = useMemo(
        () => ({
            default: "rounded",
            none: " ",
            xs: "rounded-xs",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        }),
        []
    );

    const autoConfig = useMemo(
        () => ({
            padding: "px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5",
            gap: "gap-1 sm:gap-2 lg:gap-3",
            rounded: "rounded-sm sm:rounded lg:rounded-md",
            color: clsx("border shadow-sm lg:hover:shadow-md", {
                "bg-default border-default/90 ": theme === Theme.LIGHT,
                "bg-default-dark border-default-dark/90": theme === Theme.DARK,
            }),
        }),
        [theme]
    );

    const containerItemHeightConfig = "max-h-[60vh] sm:max-h-[50vh] lg:max-h-[40vh]";

    const currentMenuClasses = useMemo(
        () =>
            clsx(
                baseMenuClasses,
                variant?.trim() ? variantConfig[variant] : autoConfig.color || variantConfig["default"],
                padding?.trim() ? variantsPadding[padding] : autoConfig.padding || variantsPadding["default"],
                rounded?.trim() ? variantsRounded[rounded] : autoConfig.rounded || variantsRounded["default"],
                placement,
                className
            ),
        [variant, padding, rounded, placement, className, autoConfig, variantConfig]
    );

    const currentContainerItemClasses = useMemo(
        () =>
            clsx(
                baseContainerItemsClasses,
                containerItemHeightConfig,
                gap?.trim() ? variantsGap[gap] : autoConfig.gap || variantsGap["default"],
                {
                    "overflow-hidden": !isOpen,
                    "flex-col": direction === DirectionType.COL,
                    "flex-row": direction === DirectionType.ROW,
                }
            ),
        [gap, direction, isOpen]
    );

    return (
        <div
            ref={containerRef}
            className={currentMenuClasses}
            role="menu"
            data-state={isOpen ? "open" : "closed"}
            style={{
                display: "none",
                visibility: "hidden",
                opacity: 0,
                transformOrigin: "top-right",
            }}
            {...props}
        >
            {isOpen && (
                <div className={currentContainerItemClasses}>
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement<DropdownItemProps>(child)) {
                            return React.cloneElement(child, { onClose });
                        }
                        return child;
                    })}
                </div>
            )}
        </div>
    );
}
export default memo(DropdownMenu);
