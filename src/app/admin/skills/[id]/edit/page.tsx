import Prisma from "@/lib/prisma"
import SkillForm from "@/components/admin/skill-form"
import { notFound } from "next/navigation"

export default async function EditSkillPage({ params }: { params: { id: string } }) {
    const skill = await Prisma.skill.findUnique({
        where: { id: params.id },
    })

    if (!skill) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Edit Skill</h1>
            <div className="bg-white p-6 rounded-xl border border-border max-w-xl">
                <SkillForm skill={skill} isEdit />
            </div>
        </div>
    )
}
