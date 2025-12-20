"use client";

import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";
import { Server, Database, Cloud, Wrench, Layout, Terminal, Code2, Smartphone, Globe, Cpu } from "lucide-react";

interface SkillsProps {
    skills: any[]
}

const CategoryIcons: Record<string, any> = {
    "Backend Engineering": Server,
    "Databases & Storage": Database,
    "DevOps & Infrastructure": Cloud,
    "Tools & Testing": Wrench,
    "Frontend": Layout,
    "Mobile Development": Smartphone,
    "Languages": Code2,
    "Web Technologies": Globe,
    "Computer Science": Cpu,
    "Other": Terminal
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export const Skills = ({ skills }: SkillsProps) => {
    if (!skills || skills.length === 0) {
        return null
    }

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category || "Other"
        if (!acc[category]) acc[category] = []
        acc[category].push(skill)
        return acc
    }, {} as Record<string, typeof skills>)

    const CATEGORY_ORDER = ["Backend Engineering", "Databases & Storage", "DevOps & Infrastructure", "Tools & Testing", "Frontend"]

    // Sort keys: defined order first, then alphabetical for others
    const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
        const indexA = CATEGORY_ORDER.indexOf(a)
        const indexB = CATEGORY_ORDER.indexOf(b)

        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return a.localeCompare(b)
    })

    return (
        <section id="skills" className="py-24 bg-surface border-y border-border relative overflow-hidden">
            {/* Background Grid with Mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center md:text-left relative">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
                        Technical <span className="text-primary relative inline-block">
                            Proficiency
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5 L 100 0 Q 50 5 0 0 Z" fill="currentColor" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        Mastery over a diverse set of production-grade technologies, enabling the architecture of scalable, resilient, and high-performance systems.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {sortedCategories.map((category) => {
                        const Icon = CategoryIcons[category] || Terminal;
                        return (
                            <motion.div key={category} variants={item} className="h-full">
                                <SpotlightCard className="h-full bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 border-border/40">
                                    <div className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                <Icon size={24} strokeWidth={2} />
                                            </div>
                                            <h3 className="text-lg font-bold text-text-primary tracking-tight">
                                                {category}
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2.5 mt-auto">
                                            {groupedSkills[category].map((skill: any) => {
                                                const iconSlug = skill.name.toLowerCase().replace(/[ .]/g, "")
                                                    .replace("#", "sharp")
                                                    .replace("++", "plusplus");

                                                return (
                                                    <Badge
                                                        key={skill.id}
                                                        variant="secondary"
                                                        className="px-3 py-1.5 bg-secondary/30 text-text-secondary border border-transparent hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default flex items-center gap-2 group/badge shadow-sm hover:shadow-md"
                                                    >
                                                        <div className="relative w-4 h-4 flex items-center justify-center grayscale group-hover/badge:grayscale-0 transition-all duration-300 transform group-hover/badge:scale-110">
                                                            <img
                                                                src={`https://cdn.simpleicons.org/${iconSlug}`}
                                                                alt=""
                                                                className="w-full h-full object-contain opacity-70 group-hover/badge:opacity-100"
                                                                onError={(e) => {
                                                                    e.currentTarget.style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="font-semibold text-[13px]">{skill.name}</span>
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
};
