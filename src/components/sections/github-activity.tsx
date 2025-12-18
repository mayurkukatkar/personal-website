"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Github } from "lucide-react";

export const GithubActivity = () => {
    // Simulate 52 weeks of contributions
    const weeks = 52;
    const daysPerWeek = 7;

    const generateData = () => {
        return Array.from({ length: weeks * daysPerWeek }, () => Math.floor(Math.random() * 4));
    };

    const data = generateData();

    const getColor = (level: number) => {
        switch (level) {
            case 0: return "bg-white/5";
            case 1: return "bg-primary/20";
            case 2: return "bg-primary/50";
            case 3: return "bg-primary/80";
            default: return "bg-white/5";
        }
    };

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <GlassCard className="p-10 md:p-12 border-primary/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Github size={24} />
                            <h2 className="text-2xl font-bold tracking-tight">Code Activity</h2>
                        </div>
                        <p className="text-secondary max-w-md">
                            Real-time snapshot of my contributions across various open-source projects and private repositories.
                        </p>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="text-center">
                            <p className="text-3xl font-black text-primary">1,284</p>
                            <p className="text-[10px] uppercase tracking-widest font-black text-secondary/60">Total Contributions</p>
                        </div>
                        <div className="text-center border-l border-glass pl-10">
                            <p className="text-3xl font-black text-primary">32</p>
                            <p className="text-[10px] uppercase tracking-widest font-black text-secondary/60">Current Streak</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex gap-1.5 md:gap-2 min-w-[800px]">
                        {/* Split data into weeks */}
                        {Array.from({ length: weeks }).map((_, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1.5 md:gap-2">
                                {data.slice(weekIndex * 7, (weekIndex + 1) * 7).map((level, dayIndex) => (
                                    <motion.div
                                        key={`${weekIndex}-${dayIndex}`}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (weekIndex * 0.01) + (dayIndex * 0.01) }}
                                        className={`w-3 h-3 md:w-4 md:h-4 rounded-[2px] md:rounded-sm ${getColor(level)} transition-colors hover:ring-2 hover:ring-primary/40`}
                                        title={`${level} contributions`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 text-[10px] uppercase tracking-widest font-black text-secondary/60">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-[2px] bg-white/5" />
                        <div className="w-3 h-3 rounded-[2px] bg-primary/20" />
                        <div className="w-3 h-3 rounded-[2px] bg-primary/50" />
                        <div className="w-3 h-3 rounded-[2px] bg-primary/80" />
                    </div>
                    <span>More</span>
                </div>
            </GlassCard>
        </section>
    );
};
