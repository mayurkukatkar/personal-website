import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
    const content = (
        <div className={cn("glass p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl", className)}>
            {children}
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {content}
            </motion.div>
        );
    }

    return content;
};
