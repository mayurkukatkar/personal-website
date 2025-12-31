"use client";

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ProjectsProps {
    projects: any[]
}

export const Projects = ({ projects }: ProjectsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

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

                <div className="flex flex-col lg:flex-row gap-8 relative">
                    {/* Right Column (Sticky Image) - Hidden on mobile, visible on lg */}
                    <div className="hidden lg:block lg:w-1/2 sticky top-20 h-[80vh] rounded-3xl overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            {projects.map((project, index) => (
                                activeIndex === index && (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        {project.heroImage ? (
                                            <Image
                                                src={project.heroImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-text-secondary/30">
                                                <span className="font-mono text-lg">No Preview</span>
                                            </div>
                                        )}

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

                                        {/* Floating Badges on Sticky Image */}
                                        <div className="absolute top-6 left-6">
                                            <Badge
                                                variant={project.status === 'PUBLISHED' ? 'primary' : 'secondary'}
                                                className="shadow-lg backdrop-blur-md px-4 py-1.5 text-sm font-bold rounded-full"
                                            >
                                                {project.status === 'PUBLISHED' ? 'Live System' : project.status}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-6 left-6">
                                            <Badge className="bg-white/90 text-black border-0 shadow-lg backdrop-blur-md px-4 py-1.5 text-sm font-bold rounded-full">
                                                {project.techStack?.[0] || 'Project'}
                                            </Badge>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Left Column (Scrollable Text) */}
                    <div className="w-full lg:w-1/2 lg:pl-10">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                                onViewportEnter={() => setActiveIndex(index)}
                                className="min-h-[70vh] flex flex-col justify-center py-20 lg:py-0 border-b lg:border-none border-border/10 last:border-0"
                            >
                                {/* Mobile Image (Visible only on small screens) */}
                                <div className="lg:hidden w-full h-64 rounded-2xl overflow-hidden mb-8 relative border border-border/50">
                                    {project.heroImage ? (
                                        <Image src={project.heroImage} alt={project.title} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-secondary/20" />
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <Badge variant={project.status === 'PUBLISHED' ? 'primary' : 'secondary'}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                </div>

                                <h3
                                    className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-500 ${activeIndex === index ? "text-primary" : "text-text-primary"
                                        }`}
                                >
                                    {project.title}
                                </h3>

                                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                                    {project.longDescription || project.shortDescription}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {(project.techStack || []).map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-text-primary border border-white/5"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all text-sm"
                                        >
                                            <ExternalLink size={18} />
                                            Visit Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-text-primary font-semibold transition-all text-sm border border-border/50"
                                        >
                                            <Github size={18} />
                                            View Source
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
