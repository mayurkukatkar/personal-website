"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
    words: string[];
    delay?: number;
    className?: string;
}

export const Typewriter = ({ words, delay = 3000, className }: TypewriterProps) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, delay);
        return () => clearInterval(timer);
    }, [words, delay]);

    return (
        <div className={className}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};
