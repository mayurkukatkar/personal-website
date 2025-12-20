"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Server, Database, Cloud, Wrench, Layout, Terminal, Code2, Smartphone, Globe } from "lucide-react";

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
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">Technical Proficiency</h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        A comprehensive overview of the production-grade technologies I leverage to architect scalable, resilient systems.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {sortedCategories.map((category) => {
                        const Icon = CategoryIcons[category] || Terminal;
                        return (
                            <motion.div key={category} variants={item}>
                                <Card className="h-full border-border/60 bg-white/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-4 border-b border-border/40">
                                        <div className="p-2.5 rounded-lg bg-secondary/30 text-primary">
                                            <Icon size={20} />
                                        </div>
                                        <CardTitle className="text-base font-bold text-text-primary">
                                            {category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="flex flex-wrap gap-2.5">
                                            {groupedSkills[category].map((skill: any) => {
                                                const iconSlug = skill.name.toLowerCase().replace(/[ .]/g, "")
                                                    .replace("#", "sharp")
                                                    .replace("++", "plusplus");

                                                return (
                                                    <Badge
                                                        key={skill.id}
                                                        className="px-3 py-1.5 bg-background border border-border/60 text-text-secondary hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all text-xs font-medium flex items-center gap-2 group/badge"
                                                    >
                                                        <img
                                                            src={`https://cdn.simpleicons.org/${iconSlug}`}
                                                            alt=""
                                                            className="w-3.5 h-3.5 opacity-60 group-hover/badge:opacity-100 transition-opacity grayscale group-hover/badge:grayscale-0"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                        />
                                                        {skill.name}
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
};
