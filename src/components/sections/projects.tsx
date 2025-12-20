"use client";

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Github, ExternalLink, ArrowRight, Star, GitFork } from "lucide-react";

interface ProjectsProps {
    projects: any[]
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
}

export const Projects = ({ projects }: ProjectsProps) => {
    return (
        <section className="py-32 bg-background relative overflow-hidden" id="projects">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 space-y-4 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary">
                        Featured <span className="text-primary">Systems</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto md:mx-0">
                        Selected architectural work solving distributed system challenges.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
                >
                    {projects.map((project, index) => (
                        <motion.div key={project.id} variants={item} className="h-full">
                            <SpotlightCard className="h-full bg-white dark:bg-zinc-900 border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group/card">
                                {/* Image Section */}
                                <div className="relative w-full h-56 overflow-hidden border-b border-border/10">
                                    {project.heroImage ? (
                                        <Image
                                            src={project.heroImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-text-secondary/30">
                                            <span className="font-mono text-sm">No Preview</span>
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

                                    {/* Top Left Badge: Status */}
                                    <div className="absolute top-4 left-4">
                                        <Badge
                                            variant={project.status === 'PUBLISHED' ? 'primary' : 'secondary'}
                                            className="bg-white/90 text-black shadow-sm backdrop-blur-md px-3 py-1 text-xs font-bold rounded-full"
                                        >
                                            {project.status === 'PUBLISHED' ? 'Live' : project.status}
                                        </Badge>
                                    </div>

                                    {/* Bottom Left Badge: Category/Primary Tech */}
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-zinc-800/90 text-white border-0 backdrop-blur-md px-3 py-1 text-xs font-medium rounded-full">
                                            {project.techStack?.[0] || 'Project'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover/card:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tech Stack Pills */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {(project.techStack || []).slice(0, 4).map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {(project.techStack || []).length > 4 && (
                                            <span className="px-2 py-1 text-[11px] text-zinc-500 font-medium">
                                                +{(project.techStack || []).length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer / Actions */}
                                    <div className="mt-auto pt-6 border-t border-border/10 flex items-center gap-4">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border/40 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-semibold text-text-primary"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={18} />
                                                Code
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity text-sm font-semibold"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {/* Play icon lookalike for 'Demo' */}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                                </svg>
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
