"use client";

import { Theme, useThemeStore } from "@/app/theme/useThemeStore";
import { SizeTypeFull, VariantType } from "@/app/types/index.type";
import { clsx } from "clsx";
import {
    forwardRef,
    KeyboardEvent,
    useMemo,
    type HTMLAttributes,
    type MouseEvent,
    type ReactNode,
} from "react";

export type DropdownTriggerProps = {
    children: ReactNode;
    variant?: VariantType;
    padding?: SizeTypeFull | "2xs" | "default";
    rounded?: SizeTypeFull;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    isOpen?: boolean;
    disabled?: boolean;
    shadow?: boolean;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
    (
        {
            children,
            variant,
            padding,
            rounded,
            onClick,
            onKeyDown,
            isOpen,
            disabled,
            shadow = true,
            className = "",
            ...props
        },
        ref
    ) => {
        const theme = useThemeStore((state) => state.theme);

        const baseTriggerClasses = useMemo(
            () =>
                clsx(
                    "cursor-pointer perfect-center transition-all duration-500 ease-in-out",
                    "lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-1",
                    {
                        "cursor-not-allowed": disabled,
                        "shadow-sm": shadow,
                    }
                ),
            [shadow, disabled]
        );

        const variantsConfig: Record<
            VariantType,
            {
                classes: string;
                hasHoverEffects: boolean;
                hasActiveEffects: boolean;
                shadowColor: string | null;
            }
        > = useMemo(
            () => ({
                default: {
                    classes: clsx("border shadow-sm", {
                        "bg-default border-default/90 lg:hover:bg-default/90 lg:focus:ring-default":
                            theme === Theme.LIGHT,
                        "bg-default-dark border-default-dark/90 lg:hover:bg-default-dark/90 lg:focus:ring-default-dark":
                            theme === Theme.DARK,
                    }),
                    hasHoverEffects: true,
                    hasActiveEffects: true,
                    shadowColor: null,
                },
                primary: {
                    classes: clsx("border shadow-sm", {
                        "bg-primary border-primary/90 lg:hover:bg-primary/90 lg:focus:ring-primary":
                            theme === Theme.LIGHT,
                        "bg-primary-dark border-primary-dark/90 lg:hover:bg-primary-dark/90 lg:focus:ring-primary-dark":
                            theme === Theme.DARK,
                    }),
                    hasHoverEffects: true,
                    hasActiveEffects: true,
                    shadowColor: "lg:hover:shadow-primary/25",
                },
                secondary: {
                    classes: clsx("border shadow-sm", {
                        "bg-secondary border-secondary/90 lg:hover:bg-secondary/90 lg:focus:ring-secondary":
                            theme === Theme.LIGHT,
                        "bg-secondary-dark border-secondary-dark/90 lg:hover:bg-secondary-dark/90 lg:focus:ring-secondary-dark":
                            theme === Theme.DARK,
                    }),
                    hasHoverEffects: true,
                    hasActiveEffects: true,
                    shadowColor: "lg:hover:shadow-secondary/25",
                },
                outline: {
                    classes: clsx("border shadow-sm", {
                        "bg-default/5 border-default/90 lg:hover:bg-default/50 lg:focus:ring-default":
                            theme === Theme.LIGHT,
                        "bg-default-dark/5 border-default-dark/90 lg:hover:bg-default-dark/50 lg:focus:ring-default-dark":
                            theme === Theme.DARK,
                    }),

                    hasHoverEffects: true,
                    hasActiveEffects: true,
                    shadowColor: null,
                },
                ghost: {
                    classes: "bg-transparent border-transparent lg:hover:bg-default/20 focus:ring-default/50",
                    hasHoverEffects: false,
                    hasActiveEffects: false,
                    shadowColor: null,
                },
                danger: {
                    classes: clsx("border shadow-sm", {
                        "bg-danger border-danger/90 lg:hover:bg-danger/90 lg:focus:ring-danger":
                            theme === Theme.LIGHT,
                        "bg-danger-dark border-danger-dark/90 lg:hover:bg-danger-dark lg:focus:ring-danger-dark":
                            theme === Theme.DARK,
                    }),
                    hasHoverEffects: true,
                    hasActiveEffects: true,
                    shadowColor: "lg:hover:shadow-danger/25",
                },
                none: {
                    classes: " ",
                    hasHoverEffects: false,
                    hasActiveEffects: true,
                    shadowColor: null,
                },
            }),
            [theme]
        );

        const variantsPadding: Record<SizeTypeFull | "2xs" | "default", string> = useMemo(
            () => ({
                default: "px-3 py-1.5",
                none: " ",
                "2xs": "px-1 py-0.5",
                xs: "px-2 py-1",
                sm: "px-3 py-1",
                md: "px-4 py-2",
                lg: "px-6 py-3",
                xl: "px-8 py-4",
                full: "p-4",
            }),
            []
        );

        const variantsRounded: Record<SizeTypeFull | "default", string> = useMemo(
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
                padding: "px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm",
                rounded: "rounded-sm sm:rounded",
                variant: clsx("border active:scale-95 active:shadow-md", {
                    "bg-default border-default/90 lg:hover:bg-default/90 lg:focus:ring-default":
                        theme === Theme.LIGHT,
                    "bg-default-dark border-default-dark/90 lg:hover:bg-default-dark/90 lg:focus:ring-default-dark":
                        theme === Theme.DARK,
                }),
            }),
            [theme]
        );

        const currentClasses = useMemo(
            () =>
                clsx(
                    baseTriggerClasses,
                    variant?.trim()
                        ? variantsConfig[variant]?.classes
                        : autoConfig.variant || variantsConfig["default"].classes,
                    padding?.trim() ? variantsPadding[padding] : autoConfig.padding,
                    rounded?.trim()
                        ? (variantsRounded[rounded] ?? variantsRounded["default"])
                        : autoConfig.rounded,
                    shadow && variant && variantsConfig[variant]?.shadowColor,
                    {
                        "opacity-50 cursor-not-allowed pointer-events-none": disabled,
                        "lg:hover:shadow-md":
                            !disabled && shadow && variantsConfig[variant ?? "default"]?.hasHoverEffects,
                        "active:scale-95 active:shadow-lg":
                            !disabled && variantsConfig[variant ?? "default"]?.hasActiveEffects,
                    },
                    className
                ),
            [variant, padding, rounded, autoConfig, disabled, shadow, baseTriggerClasses, className]
        );

        return (
            <div
                ref={ref}
                onClick={onClick}
                onKeyDown={onKeyDown}
                className={currentClasses}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled ?? false}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {typeof children === "string" ? <p>{children}</p> : children}
            </div>
        );
    }
);

DropdownTrigger.displayName = "DropdownTrigger";
