import Prisma from "@/lib/prisma"
import ProjectForm from "@/components/admin/project-form"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await Prisma.project.findUnique({
        where: { id },
    })

    if (!project) {
        notFound()
    }

    // Robust serialization
    const serializedProject = JSON.parse(JSON.stringify(project))

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Edit Project</h1>
            <div className="bg-white p-6 rounded-xl border border-border">
                <ProjectForm project={serializedProject} isEdit />
            </div>
        </div>
    )
}
