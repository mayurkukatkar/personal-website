import prisma from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { deleteProject } from "@/lib/actions/project-actions"
import { ProjectImportDialog } from "@/components/admin/project-import-dialog"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
                <div className="flex gap-2">
                    <ProjectImportDialog />
                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                    >
                        <Plus size={18} />
                        Add Project
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-border text-xs uppercase text-text-secondary font-semibold">
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Tech Stack</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-text-primary">{project.title}</div>
                                    <div className="text-xs text-text-secondary truncate max-w-[200px]">{project.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={project.status === "PUBLISHED" ? "primary" : "secondary"}>
                                        {project.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {(project.techStack || []).slice(0, 3).map((tech: string) => (
                                            <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                        {(project.techStack || []).length > 3 && (
                                            <span className="text-xs text-gray-400 pl-1">+{(project.techStack || []).length - 3}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end items-center gap-2">
                                        <Link href={`/admin/projects/${project.id}/edit`} className="p-2 text-text-secondary hover:text-primary transition">
                                            <Edit2 size={18} />
                                        </Link>
                                        <form action={deleteProject.bind(null, project.id)}>
                                            <button className="p-2 text-text-secondary hover:text-red-600 transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                                    No projects found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
