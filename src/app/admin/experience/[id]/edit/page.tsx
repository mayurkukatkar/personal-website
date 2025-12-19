import Prisma from "@/lib/prisma"
import ExperienceForm from "@/components/admin/experience-form"
import { notFound } from "next/navigation"

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const experience = await Prisma.experience.findUnique({
        where: { id },
    })

    if (!experience) {
        notFound()
    }

    // Robust serialization
    const serializedExperience = JSON.parse(JSON.stringify(experience))

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Edit Experience</h1>
            <div className="bg-white p-6 rounded-xl border border-border max-w-xl">
                <ExperienceForm experience={serializedExperience} isEdit />
            </div>
        </div>
    )
}
