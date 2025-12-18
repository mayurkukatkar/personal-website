import prisma from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { deleteSkill } from "@/lib/actions/skill-actions"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function SkillsPage() {
    const skills = await prisma.skill.findMany({
        orderBy: { order: "asc" },
    })

    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category || "Uncategorized"
        if (!acc[category]) acc[category] = []
        acc[category].push(skill)
        return acc
    }, {} as Record<string, typeof skills>)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-text-primary">Skills</h1>
                <Link
                    href="/admin/skills/new"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                >
                    <Plus size={18} />
                    Add Skill
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(groupedSkills).map(([category, items]) => (
                    <div key={category} className="bg-white border border-border rounded-xl p-6 shadow-sm">
                        <h2 className="font-semibold text-lg mb-4 text-text-primary border-b border-gray-100 pb-2 flex justify-between">
                            {category}
                            <span className="text-xs font-normal text-text-secondary bg-gray-100 px-2 py-1 rounded-full">{items.length}</span>
                        </h2>
                        <div className="space-y-2">
                            {items.map((skill) => (
                                <div key={skill.id} className="flex items-center justify-between group p-2 hover:bg-gray-50 rounded-lg transition">
                                    <span className="font-medium text-text-secondary">{skill.name}</span>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <Link href={`/admin/skills/${skill.id}/edit`} className="p-1 text-text-secondary hover:text-primary">
                                            <Edit2 size={16} />
                                        </Link>
                                        <form action={deleteSkill.bind(null, skill.id)}>
                                            <button className="p-1 text-text-secondary hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {skills.length === 0 && (
                    <div className="col-span-full text-center py-12 text-text-secondary bg-white rounded-xl border border-border">
                        No skills found. Add some skills to populate your portfolio.
                    </div>
                )}
            </div>
        </div>
    )
}
