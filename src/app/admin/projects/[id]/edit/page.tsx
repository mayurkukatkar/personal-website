import Prisma from "@/lib/prisma"
import ProjectForm from "@/components/admin/project-form"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const project = await Prisma.project.findUnique({
        where: { id: params.id },
    })

    if (!project) {
        notFound()
    }

    // Serialize dates
    const serializedProject = {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Edit Project</h1>
            <div className="bg-white p-6 rounded-xl border border-border">
                <ProjectForm project={serializedProject} isEdit />
            </div>
        </div>
    )
}
