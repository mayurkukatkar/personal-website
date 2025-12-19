"use client";

import Link from "next/link"
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

interface ProjectsProps {
    projects: any[]
}

export const Projects = ({ projects }: ProjectsProps) => {
    return (
        <section className="py-32 bg-background relative" id="projects">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-text-primary">Featured Systems</h2>
                    <p className="text-lg text-text-secondary max-w-2xl">
                        Selected architectural work solving distributed system challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="p-8 md:p-10 flex flex-col h-full bg-surface border-border hover:border-primary/30 transition-all duration-300 group relative"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <Link href={`/projects/${project.slug}`} className="block">
                                        <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </Link>
                                    <span className="text-xs font-mono text-text-secondary mt-1 block">
                                        {project.slug}
                                    </span>
                                </div>
                                <div className="flex gap-3 relative z-10">
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-secondary hover:text-primary transition-colors hover:bg-gray-50 rounded-lg">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-secondary hover:text-primary transition-colors hover:bg-gray-50 rounded-lg">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Description Link Wrapper */}
                            <div className="space-y-6 flex-1">
                                <Link href={`/projects/${project.slug}`} className="block">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">The Problem</h4>
                                        <p className="text-text-secondary leading-relaxed">
                                            {project.shortDescription}
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-8 pt-8 border-t border-border">
                                <div className="flex flex-wrap gap-2">
                                    {(project.techStack || []).map((tech: string) => (
                                        <Badge key={tech} className="bg-gray-50 text-text-secondary border-border font-mono text-xs hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
