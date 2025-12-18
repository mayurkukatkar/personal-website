"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
    config: {
        name: string
        heroTitle: string
        heroSubtitle: string
        avatarUrl: string | null
        contactEmail: string
        githubUrl: string | null
        linkedinUrl: string | null
        resumeUrl: string | null
    }
}

export const Hero = ({ config }: HeroProps) => {
    return (
        <section className="min-h-screen flex items-center pt-20 pb-32 overflow-hidden relative" id="home">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left: Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-4 py-2 text-sm font-mono mb-6">
                            Available for hire
                        </Badge>
                        <div className="mb-6">
                            <span className="text-xl font-medium text-text-secondary block mb-2">Hi, I'm</span>
                            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-text-primary leading-[1] mb-4">
                                {config.name}
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-secondary">
                                {config.heroTitle}
                            </h2>
                        </div>
                        <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
                            {config.heroSubtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-4"
                    >
                        {config.githubUrl && (
                            <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:bg-muted transition-colors text-text-secondary hover:text-primary">
                                <Github size={24} />
                            </a>
                        )}
                        {config.linkedinUrl && (
                            <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:bg-muted transition-colors text-text-secondary hover:text-primary">
                                <Linkedin size={24} />
                            </a>
                        )}
                        <a href={`mailto:${config.contactEmail}`} className="p-3 bg-background border border-border rounded-full hover:bg-muted transition-colors text-text-secondary hover:text-primary">
                            <Mail size={24} />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                        <a
                            href="#projects"
                            className="bg-primary text-white border border-primary px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-center flex items-center justify-center gap-2 group"
                        >
                            View Projects
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        {config.resumeUrl && (
                            <a
                                href={config.resumeUrl}
                                target="_blank"
                                className="bg-transparent border border-border text-text-primary px-8 py-4 rounded-full font-medium hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2 group"
                            >
                                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                                Download Resume
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Right: Profile Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center lg:justify-end"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-zinc-800 shadow-2xl overflow-hidden bg-muted">
                            {config.avatarUrl ? (
                                <Image
                                    src={config.avatarUrl}
                                    alt={config.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary text-4xl font-bold text-text-secondary">
                                    {config.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Floating Badge Example */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -bottom-4 -left-4 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-border flex items-center gap-3"
                        >
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium">Open to Work</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
