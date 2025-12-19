import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"

export const revalidate = 60

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await prisma.project.findFirst({
        where: { slug },
    })

    if (!project) {
        notFound()
    }

    const techStack = project.techStack || []
    const galleryImages = project.galleryImages || []

    return (
        <main className="min-h-screen bg-background text-text-primary">
            <Navbar />

            <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                {/* Header */}
                <div className="mb-12 space-y-6">
                    <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-4">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                            {project.title}
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            {project.shortDescription}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {techStack.map((tech: string) => (
                            <Badge key={tech} className="bg-surface border border-border text-text-secondary font-mono text-sm px-3 py-1">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-text-primary text-background rounded-md font-medium hover:bg-text-primary/90 transition-colors">
                                <Github size={18} /> View Code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text-primary rounded-md font-medium hover:bg-gray-50 transition-colors">
                                <ExternalLink size={18} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Hero Image */}
                {project.heroImage && (
                    <div className="mb-12 rounded-xl overflow-hidden border border-border relative aspect-video bg-surface">
                        <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-slate max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80">
                    <ReactMarkdown>{project.longDescription}</ReactMarkdown>
                </div>

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <div className="mt-16 space-y-8">
                        <h2 className="text-2xl font-bold text-text-primary">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {galleryImages.map((img, index) => (
                                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border bg-surface">
                                    <Image
                                        src={img}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </main>
    )
}
