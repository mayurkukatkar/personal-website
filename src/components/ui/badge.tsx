"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "neutral";
}

export const Badge = ({ children, className, variant = "secondary" }: BadgeProps) => {
    const variants = {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        neutral: "bg-gray-100 text-text-secondary",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-mono font-medium",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
