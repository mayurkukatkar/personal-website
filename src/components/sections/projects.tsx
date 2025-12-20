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
                            <Link href={`/projects/${project.slug}`} className="block h-full cursor-pointer group/card">
                                <SpotlightCard className="h-full bg-surface/50 backdrop-blur-xl border-border/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                    <div className="flex flex-col h-full">
                                        {/* Image Section with Overlay */}
                                        <div className="relative w-full h-64 overflow-hidden border-b border-border/50">
                                            {project.heroImage ? (
                                                <Image
                                                    src={project.heroImage}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-text-secondary/30">
                                                    <span className="font-mono text-sm">No Preview Available</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-500" />

                                            {/* Floating Links on Image */}
                                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/card:translate-y-0">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/10"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/10"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="mb-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-2xl font-bold text-text-primary group-hover/card:text-primary transition-colors flex items-center gap-2">
                                                        {project.title}
                                                        <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 text-primary" />
                                                    </h3>
                                                </div>
                                                <p className="text-text-secondary leading-relaxed line-clamp-2 text-sm md:text-base">
                                                    {project.shortDescription}
                                                </p>
                                            </div>

                                            {/* Tech Stack area */}
                                            <div className="mt-auto pt-6 border-t border-border/40">
                                                <div className="flex flex-wrap gap-2">
                                                    {(project.techStack || []).slice(0, 4).map((tech: string) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="bg-secondary/40 text-text-secondary border-transparent text-[11px] px-2.5 py-1 font-mono tracking-tight"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                    {(project.techStack || []).length > 4 && (
                                                        <span className="text-xs text-text-secondary/60 flex items-center px-2">
                                                            +{(project.techStack || []).length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
