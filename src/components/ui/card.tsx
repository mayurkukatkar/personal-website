"use client";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card = ({ children, className, hoverEffect = false, ...props }: CardProps) => {
    return (
        <div
            className={cn(
                "bg-surface border border-border rounded-xl p-6",
                hoverEffect && "transition-all duration-300 hover:shadow-sm hover:border-primary/20",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
