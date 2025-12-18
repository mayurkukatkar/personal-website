import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

export const revalidate = 60

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = await prisma.project.findFirst({
        where: { slug: params.slug },
    })

    if (!project) {
        notFound()
    }

    const techStack = project.techStack || []

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

                {/* Content */}
                <div className="prose prose-slate max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80">
                    {/* We would render Markdown here. For now, just robust text display or simple dangerouslySetInnerHTML if trusted, 
               but ideally we use a library like react-markdown. Given the constraints, I will split by newlines for basic formatting. */}
                    {project.longDescription.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 text-text-secondary leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>
        </main>
    )
}
