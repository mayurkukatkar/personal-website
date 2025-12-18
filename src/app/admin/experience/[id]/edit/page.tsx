import Prisma from "@/lib/prisma"
import ExperienceForm from "@/components/admin/experience-form"
import { notFound } from "next/navigation"

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
    const experience = await Prisma.experience.findUnique({
        where: { id: params.id },
    })

    if (!experience) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Edit Experience</h1>
            <div className="bg-white p-6 rounded-xl border border-border max-w-xl">
                <ExperienceForm experience={experience} isEdit />
            </div>
        </div>
    )
}
