import prisma from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { deleteExperience } from "@/lib/actions/experience-actions"

export const dynamic = "force-dynamic"

export default async function ExperiencePage() {
    const experiences = await prisma.experience.findMany({
        orderBy: { startDate: "desc" },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-text-primary">Experience</h1>
                <Link
                    href="/admin/experience/new"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                >
                    <Plus size={18} />
                    Add Experience
                </Link>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="divide-y divide-border">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="p-6 flex justify-between items-start hover:bg-gray-50 transition">
                            <div>
                                <h3 className="text-lg font-bold text-text-primary">{exp.role}</h3>
                                <p className="text-sm text-text-secondary">{exp.company}</p>
                                <div className="text-xs text-text-secondary mt-1">
                                    {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/admin/experience/${exp.id}/edit`} className="p-2 text-text-secondary hover:text-primary">
                                    <Edit2 size={18} />
                                </Link>
                                <form action={deleteExperience.bind(null, exp.id)}>
                                    <button className="p-2 text-text-secondary hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {experiences.length === 0 && (
                        <div className="p-12 text-center text-text-secondary">
                            No experience found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
