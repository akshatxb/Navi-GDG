"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

export type ButtonProps = {
    content: string;
    link?: string;
    variant?: 'light' | 'dark' | 'transparentLight' | 'transparentDark' | 'outlineLight' | 'outlineDark';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ content, link = '#', variant = "light", size = "md", className, ...props }, ref) => {

        const router = useRouter();

        const variantClasses = {
            light: "bg-white text-black ",
            dark: "bg-black text-white disabled:bg-black/70",
            transparentLight: "text-white hover:text-gray-300",
            transparentDark: "text-black hover:text-[#676767]",
            outlineLight: "border-3 border-white text-white",
            outlineDark: "border-3 border-white text-white",
        };

        const sizeClasses = {
            sm: "px-3 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-6 py-4 text-lg",
        };

        const handleClick = () => {
            router.push(link)
        }

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={clsx("rounded-4xl transition-transform duration-200 cursor-pointer hover:scale-95 disabled:scale-90", variantClasses[variant], sizeClasses[size], className)}
                {...props}>
                {content}
            </button >
        )
    }
);

Button.displayName = 'Button'

export default Button;