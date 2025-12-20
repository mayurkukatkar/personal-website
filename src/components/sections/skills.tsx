"use client";

import { Badge } from "@/components/ui/badge";

interface SkillsProps {
    skills: any[]
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
        <section id="skills" className="py-24 bg-surface border-y border-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Technical Stack</h2>
                    <p className="text-lg text-text-secondary max-w-2xl">
                        Production-grade technologies I use to build scalable systems.
                    </p>
                </div>

                <div className="space-y-12">
                    {sortedCategories.map((category) => (
                        <div key={category} className="space-y-6">
                            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest border-b border-border pb-2">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {groupedSkills[category].map((skill: any) => (
                                    <Badge
                                        key={skill.id}
                                        className="px-4 py-2 bg-white border border-border text-text-primary hover:border-primary/30 hover:text-primary transition-all text-sm font-mono shadow-sm"
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
