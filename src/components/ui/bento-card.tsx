"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const BentoCard = ({ children, className, animate = true }: BentoCardProps) => {
    const content = (
        <div className={cn("bento-item h-full p-8", className)}>
            {children}
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
            >
                {content}
            </motion.div>
        );
    }

    return content;
};
