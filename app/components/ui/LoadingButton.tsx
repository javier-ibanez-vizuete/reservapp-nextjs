import { Theme, useThemeStore } from "@/app/theme/useThemeStore";
import { BasicSizes, ButtonTypes, ExtendedSizes, VariantType } from "@/app/types/index.type";
import { clsx } from "clsx";
import { HTMLAttributes, memo, MouseEvent, ReactNode, useCallback, useMemo } from "react";
import Spinner from "./Spinner";

export type LoadingButtonProps = {
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    variant?: VariantType;
    size?: BasicSizes;
    rounded?: ExtendedSizes;
    loadingText?: string;
    onClick?: () => void;
    type?: ButtonTypes;
    className?: string;
} & HTMLAttributes<HTMLButtonElement>;

const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-500 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-2 cursor-pointer relative";

function LoadingButton({
    children,
    loading = false,
    disabled = false,
    variant = "default",
    size,
    rounded,
    loadingText = "Loading...",
    className = "",
    onClick,
    type = "button",
    ...props
}: LoadingButtonProps) {
    const theme = useThemeStore((state) => state.theme);

    const variantClasses: Record<VariantType, string> = useMemo(
        () => ({
            default: "bg-default border border-default/90 lg:hover:bg-default/90 lg:focus:ring-default",
            primary: clsx("border shadow-sm", {
                "bg-primary border-primary/90 lg:hover:bg-primary/90 lg:hover:shadow-primary/40 lg:focus:ring-primary":
                    theme === Theme.LIGHT,
                "bg-primary-dark border-primary-dark/90 lg:hover:bg-primary/90 lg:hover:shadow-primary-dark/40 lg:focus:ring-primary-dark":
                    theme === Theme.DARK,
            }),
            secondary: clsx("border shadow-sm", {
                "bg-secondary border-secondary/90 lg:hover:bg-secondary/90 lg:hover:shadow-secondary/40 lg:focus:ring-secondary":
                    theme === Theme.LIGHT,
                "bg-secondary-dark border-secondary/90 lg:hover:bg-secondary-dark/90 lg:hover:shadow-secondary-dark/40 lg:focus:ring-secondary-dark":
                    theme === Theme.DARK,
            }),
            outline: clsx("border bg-transparent lg:hover:bg-default/40 shadow-sm", {
                "border-default/90 lg:focus:ring-default": theme === Theme.LIGHT,
                "border-gray-400 lg:focus:ring-default-dark": theme === Theme.DARK,
            }),
            ghost: "bg-transparent border-transparent lg:hover:bg-default/40 lg:focus:ring-default",
            danger: "bg-danger border border-danger/90 lg:hover:bg-danger/90 focus:ring-danger shadow-sm",
            none: " ",
        }),
        [theme]
    );

    const sizeClasses: Record<BasicSizes, string> = useMemo(
        () => ({
            xs: "px-2.5 py-1 text-xs",
            sm: "px-3 py-1.5 text-base",
            md: "px-4 py-2 text-md",
            lg: "px-6 py-3 text-md",
            xl: "px-8 py-4 text-lg",
        }),
        []
    );

    const roundedClasses: Record<ExtendedSizes, string> = useMemo(
        () => ({
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

    const autoButtonConfig = useMemo(
        () => ({
            padding: "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-base",
            rounded: "rounded-sm md:rounded-md",
        }),
        []
    );

    const isDisabled = disabled || loading;

    const buttonClasses = useMemo(
        () =>
            clsx(
                baseClasses,
                variant.trim() ? variantClasses[variant] : variantClasses["default"],
                size?.trim() ? sizeClasses[size] : autoButtonConfig?.padding || sizeClasses["sm"],
                rounded?.trim() ? roundedClasses[rounded] : autoButtonConfig.rounded || roundedClasses["sm"],
                {
                    "opacity-50 cursor-not-allowed pointer-events-none": isDisabled,
                    "lg:hover:shadow-md": !isDisabled && variant !== "ghost",
                },
                className
            ),
        [variant, size, isDisabled, className, autoButtonConfig?.padding]
    );

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (!isDisabled && onClick) {
                onClick?.(event);
            }
        },
        [isDisabled, onClick]
    );

    const getSpinnerColor = () => {
        if (variant === "primary" || variant === "danger") return "white";
        return "primary";
    };

    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
            className={buttonClasses}
            aria-busy={loading}
            {...props}
        >
            {loading && <Spinner size={size} color={getSpinnerColor()} className="mr-2" />}
            <span className={loading ? "opacity-75" : ""}>{loading ? loadingText : children}</span>
        </button>
    );
}

export default memo(LoadingButton);
