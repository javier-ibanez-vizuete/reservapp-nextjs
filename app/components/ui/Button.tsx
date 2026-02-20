import { Theme, useThemeStore } from "@/app/theme/useThemeStore";
import { BasicSizes, ButtonTypes, VariantType } from "@/app/types/index.type";
import clsx from "clsx";
import { memo, useMemo, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";

export type ButtonComponentProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    children: ReactNode;
    type: ButtonTypes;
    variant?: VariantType;
    padding?: BasicSizes | "2xs" | "none";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
};

const baseButtonConfig =
    "cursor-pointer transition-all duration-xtraslow ease-in-out lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2";

function Button({
    children,
    type = "button",
    variant,
    padding,
    onClick,
    disabled,
    className,
    ...props
}: ButtonComponentProps) {
    const theme = useThemeStore((state) => state.theme);

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        if (!disabled) onClick?.(event);
    };

    const variantsConfig = useMemo(
        () => ({
            default: {
                classes:
                    "bg-default border border-default/90 shadow-sm hover:bg-default/90 lg:focus:ring-default",
                hasHoverEffects: true,
                hasActiveEffects: true,
                shadowColor: null,
            },
            primary: {
                classes: clsx("border shadow-sm", {
                    "bg-primary border-primary/90 hover:bg-primary/90 lg:focus:ring-primary":
                        theme === Theme.LIGHT,
                    "bg-primary-dark border-primary-dark/90 hover:bg-primary-dark/90 lg:focus:ring-primary-dark":
                        theme === Theme.DARK,
                }),
                hasHoverEffects: true,
                hasActiveEffects: true,
                shadowColor: clsx({
                    "hover:shadow-primary/25": theme === Theme.LIGHT,
                    "hover:shadow-primary-dark/25": theme === Theme.DARK,
                }),
            },
            secondary: {
                classes: clsx("border shadow-sm text-text", {
                    "bg-secondary border-secondary/90 hover:bg-secondary/90 lg:focus:ring-secondary":
                        theme === Theme.LIGHT,
                    "bg-secondary-dark border-secondary-dark/90 hover:bg-secondary-dark/90 lg:focus:ring-secondary-dark":
                        theme === Theme.DARK,
                }),
                hasHoverEffects: true,
                hasActiveEffects: true,
                shadowColor: clsx({
                    "hover:shadow-secondary/25": theme === Theme.LIGHT,
                    "hover:shadow-secondary-dark/25": theme === Theme.DARK,
                }),
            },
            outline: {
                classes: clsx("border bg-transparent hover:bg-default/40 shadow-sm", {
                    "border-default/90 lg:focus:ring-default": theme === Theme.LIGHT,
                    "border-default-dark lg:focus:ring-default-dark": theme === Theme.DARK,
                }),
                hasHoverEffects: true,
                hasActiveEffects: true,
                shadowColor: null,
            },
            ghost: {
                classes:
                    "bg-transparent border border-transparent lg:hover:bg-default/20 lg:focus:ring-default",
                hasHoverEffects: false,
                hasActiveEffects: true,
                shadowColor: null,
            },
            danger: {
                classes:
                    "bg-danger border border-danger/90 shadow-sm hover:bg-danger/90 lg:focus:ring-danger",
                hasHoverEffects: true,
                hasActiveEffects: true,
                shadowColor: "hover:shadow-danger/10",
            },
            none: {
                classes: "",
                hasHoverEffects: false,
                hasActiveEffects: true,
                shadowColor: null,
            },
        }),
        [theme]
    );

    const variantsPadding = {
        none: " ",
        "2xs": "px-1 py-0.5",
        xs: "px-2 py-1",
        sm: "px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-6 py-3",
        xl: "px-8 py-4",
    };

    const autoConfig = useMemo(
        () => ({
            padding: clsx("px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-base"),
        }),
        []
    );

    const currentVariantConfig = useMemo(
        () => variantsConfig[variant ?? "default"],
        [variant, variantsConfig]
    );

    const currentButtonConfig = useMemo(
        () =>
            clsx(
                baseButtonConfig,
                currentVariantConfig?.classes,
                padding ? variantsPadding[padding] : autoConfig?.padding || variantsPadding["sm"],
                {
                    "opacity-50 cursor-not-allowed pointer-events-none": disabled,
                    "hover:shadow-lg": !disabled && currentVariantConfig?.hasHoverEffects,
                    "active:scale-95": !disabled && currentVariantConfig?.hasActiveEffects,
                },
                !disabled && currentVariantConfig?.shadowColor,
                className
            ),
        [currentVariantConfig, padding, autoConfig?.padding]
    );

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={handleClick}
            className={currentButtonConfig}
            {...props}
        >
            {children}
        </button>
    );
}

export default memo(Button);
