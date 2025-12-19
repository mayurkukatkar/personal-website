"use client";

import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
    experience: any[]
}

export const Experience = ({ experience }: ExperienceProps) => {
    return (
        <section id="experience" className="py-32 max-w-7xl mx-auto px-6">
            <div className="mb-20">
                <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-6">Career Timeline</h2>
                <p className="text-lg text-text-secondary max-w-2xl">
                    A track record of delivering impact in high-velocity engineering environments.
                </p>
            </div>

            <div className="relative border-l border-border ml-3 space-y-12 pl-12">
                {experience.map((exp, index) => (
                    <div key={exp.id} className="relative group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[54px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-border group-hover:border-primary group-hover:scale-125 transition-all duration-300 shadow-[0_0_0_4px_#F9FAFB]" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 hover:bg-surface p-6 rounded-2xl transition-colors border border-transparent hover:border-border">
                            {/* Timeline Header */}
                            <div className="lg:col-span-4 space-y-2">
                                <span className="inline-block px-3 py-1 bg-gray-100 text-text-secondary rounded-full text-xs font-bold font-mono">
                                    {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                                </span>
                                <h3 className="text-xl font-bold text-text-primary">
                                    {exp.company}
                                </h3>
                                <p className="text-primary font-medium">{exp.role}</p>
                            </div>

                            {/* Content */}
                            <div className="lg:col-span-8 space-y-4">
                                <p className="text-text-secondary leading-relaxed">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {(exp.techUsed || []).map((tech: string) => (
                                        <span key={tech} className="text-xs text-text-secondary px-2 py-1 bg-gray-50 rounded border border-border/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
