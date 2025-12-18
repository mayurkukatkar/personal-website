import { getAllProjects } from "@/lib/data";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export const revalidate = 60;

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <main className="min-h-screen bg-background text-text-primary selection:bg-primary/20">
            <Navbar />
            <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">All Projects</h1>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        A complete archive of my engineering work and side projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project) => (
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
                                        <p className="text-text-secondary leading-relaxed">
                                            {project.shortDescription}
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-8 pt-8 border-t border-border">
                                <div className="flex flex-wrap gap-2">
                                    {(typeof project.techStack === 'string' ? JSON.parse(project.techStack) : project.techStack).map((tech: string) => (
                                        <Badge key={tech} className="bg-gray-50 text-text-secondary border-border font-mono text-xs hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}
