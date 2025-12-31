"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

interface ProjectsProps {
    projects: any[];
}

export const Projects = ({ projects }: ProjectsProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform vertical scroll to horizontal movement
    // Adjust "-90%" based on the number of projects. More projects = larger negative percentage needed.
    // For a dynamic solution, one would measure content width, but a safe estimate works for now.
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

    return (
        <section className="relative bg-background" id="projects">

            {/* Desktop Horizontal Scroll Experience */}
            <div ref={targetRef} className="hidden lg:block relative h-[300vh]">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-16 px-20">

                        {/* Intro Card */}
                        <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
                            <h2 className="text-6xl font-extrabold tracking-tight text-text-primary mb-6">
                                Featured <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Works</span>
                            </h2>
                            <p className="text-xl text-text-secondary leading-relaxed">
                                A curated gallery of architectural challenges and distributed systems I've engineered. <br /><br />
                                Scroll to explore. &rarr;
                            </p>
                        </div>

                        {/* Project Cards */}
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Mobile Vertical/Native Scroll Fallback */}
            <div className="lg:hidden py-24 px-6 space-y-20">
                <div className="mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight text-text-primary">
                        Featured <span className="text-primary">Works</span>
                    </h2>
                </div>
                {projects.map((project) => (
                    <MobileProjectCard key={project.id} project={project} />
                ))}
            </div>

        </section>
    );
};

const ProjectCard = ({ project }: { project: any }) => {
    return (
        <div className="group relative h-[70vh] w-[800px] overflow-hidden bg-zinc-900 rounded-3xl border border-border/20 shadow-2xl flex-shrink-0">
            {/* Split Layout: Image Left (60%), Content Right (40%) */}
            <div className="absolute inset-0 flex">
                <div className="w-[65%] relative overflow-hidden">
                    {project.heroImage ? (
                        <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-text-secondary/30">
                            No Preview
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60" />
                </div>

                <div className="w-[35%] bg-zinc-950 p-10 flex flex-col relative z-10 border-l border-white/5">
                    {/* Top Badges */}
                    <div className="flex flex-wrap gap-2 mb-auto">
                        <Badge
                            variant="primary"
                            className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20"
                        >
                            {project.status === 'PUBLISHED' ? 'Live' : project.status}
                        </Badge>
                        <Badge variant="neutral" className="border-white/10 text-zinc-400">
                            {project.techStack?.[0] || 'Dev'}
                        </Badge>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6">
                            {project.longDescription || project.shortDescription}
                        </p>
                    </div>

                    <div className="mt-auto pt-8 flex gap-4">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                            >
                                <ExternalLink size={18} />
                                View
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <Github size={18} />
                                Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MobileProjectCard = ({ project }: { project: any }) => {
    return (
        <div className="relative group">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 border border-border/50">
                {project.heroImage ? (
                    <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-secondary/20" />
                )}
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-black backdrop-blur-md">
                        {project.status === 'PUBLISHED' ? 'Live' : project.status}
                    </Badge>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
                    <Link href={`/projects/${project.slug}`} className="p-2 rounded-full border border-border/50 text-text-primary">
                        <ArrowUpRight size={20} />
                    </Link>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {project.shortDescription}
                </p>

                <div className="flex gap-2 flex-wrap">
                    {(project.techStack || []).slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-xs font-medium text-text-secondary bg-secondary/30 px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 pt-4">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" className="text-sm font-bold text-primary flex items-center gap-2">
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" className="text-sm font-medium text-text-secondary flex items-center gap-2 hover:text-text-primary">
                            <Github size={16} /> Source Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
