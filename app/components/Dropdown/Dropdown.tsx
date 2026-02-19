"use client";

import React, {
    FocusEvent,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type HTMLAttributes,
    type ReactNode,
    type RefAttributes,
} from "react";

import { EventsType, KeyboardKey, SizeTypeFull, TriggerType } from "@/app/types/index.type";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import DropdownMenu, { type DropdownMenuProps } from "./DropdownMenu";
import { DropdownTrigger, type DropdownTriggerProps } from "./DropdownTrigger";

type Placement = Record<DropdownPlacementValues, string>;

export type DropdownPlacementValues =
    | "right-center"
    | "left-center"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-center"
    | "bottom-full"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end"
    | "center-center"
    | "top-center";

export type DropdownProps = {
    children: ReactNode;
    trigger?: TriggerType;
    placement?: DropdownPlacementValues;
    padding?: SizeTypeFull;
    gap?: SizeTypeFull;
    rounded?: SizeTypeFull;
    disabled?: boolean;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Dropdown = ({
    children,
    trigger = TriggerType.CLICK,
    placement = "bottom-start",
    padding,
    gap,
    rounded,
    disabled = false,
    className = "",
    ...props
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === KeyboardKey.ESCAPE) setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener(EventsType.MOUSE_DOWN, handleClickOutside);
            document.addEventListener(EventsType.KEY_DOWN, handleEscape);
        }

        return () => {
            document.removeEventListener(EventsType.MOUSE_DOWN, handleClickOutside);
            document.removeEventListener(EventsType.KEY_DOWN, handleEscape);
        };
    }, [isOpen]);

    const toggleDropdown = useCallback(() => {
        if (!disabled) setIsOpen((prev) => !prev);
    }, [disabled]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        const hasTriggerFocus = document.activeElement === triggerRef.current;
        if (event.key === KeyboardKey.ENTER && hasTriggerFocus) {
            event.preventDefault();
            toggleDropdown();
        }
    }, []);

    const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
        const isFocusLeaving = !event.currentTarget.contains(event.relatedTarget);

        if (isFocusLeaving) setIsOpen(false);
    }, []);

    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const handleMouseEnter = useCallback(() => {
        if (trigger === TriggerType.HOVER && !disabled) setIsOpen(true);
    }, [trigger, disabled]);

    const handleMouseLeave = useCallback(() => {
        if (trigger === TriggerType.HOVER) setIsOpen(false);
    }, [trigger]);

    const placementClasses: Placement = useMemo(
        () => ({
            "right-center": "left-full ml-2 -translate-y-1/2",
            "left-center": "right-full mr-2 -translate-y-1/2",
            "top-start": "bottom-full left-0 mb-2",
            "top-end": "bottom-full right-0 mb-2",
            "top-center": "bottom-full left-1/2 -translate-x-1/2 mb-2",
            "bottom-start": "top-full left-0 mt-2",
            "bottom-center": "top-full left-1/2 -translate-x-1/2 mt-2",
            "bottom-full": "top-full right-0 left-0 mt-2",
            "bottom-end": "top-full right-0 mt-2",
            "left-start": "right-full top-0 mr-2",
            "left-end": "right-full bottom-0 mr-2",
            "right-start": "left-full top-0 ml-2",
            "right-end": "left-full bottom-0 ml-2",
            "center-center": "bottom-1/2 translate-y-1/2",
        }),
        []
    );

    const dropdownBaseClasses = useMemo(
        () =>
            clsx("relative inline-flex text-left", { "opacity-50 cursor-not-allowed": disabled }, className),
        [disabled, className]
    );

    return (
        <div
            ref={dropdownRef}
            className={dropdownBaseClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={handleBlur}
            role="menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
            data-dropdown="true"
            data-open={isOpen}
            data-placement={placement}
            data-trigger={trigger}
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (
                    isValidElement<DropdownTriggerProps & RefAttributes<HTMLDivElement>>(child) &&
                    child.type === DropdownTrigger
                ) {
                    return React.cloneElement(child, {
                        onClick: toggleDropdown,
                        onKeyDown: handleKeyDown,
                        isOpen,
                        disabled,
                        ref: triggerRef,
                    });
                }
                if (isValidElement<DropdownMenuProps>(child) && child.type === DropdownMenu) {
                    return React.cloneElement(child, {
                        isOpen,
                        onClose: closeDropdown,
                        placement: placementClasses[placement],
                        padding,
                        gap,
                        rounded,
                    });
                }
                return child;
            })}
        </div>
    );
};
