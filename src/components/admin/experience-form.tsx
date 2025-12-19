"use client"

import { useFormState } from "react-dom"
import { createExperience, updateExperience } from "@/lib/actions/experience-actions"

interface ExperienceFormProps {
    experience?: any
    isEdit?: boolean
}

export default function ExperienceForm({ experience, isEdit }: ExperienceFormProps) {
    const action = isEdit ? updateExperience.bind(null, experience.id) : createExperience
    const [state, dispatch] = useFormState(action, undefined)

    const formatDate = (date: Date | null) => {
        if (!date) return ""
        return new Date(date).toISOString().split("T")[0]
    }

    return (
        <form action={dispatch} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <input
                        name="company"
                        defaultValue={experience?.company}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <input
                        name="role"
                        defaultValue={experience?.role}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    defaultValue={experience?.description}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        defaultValue={formatDate(experience?.startDate)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        defaultValue={formatDate(experience?.endDate)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <input type="checkbox" name="current" id="current" defaultChecked={experience?.current} />
                <label htmlFor="current" className="text-sm font-medium">Currently working here</label>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Tech Used (JSON Array)</label>
                <input
                    name="techUsed"
                    defaultValue={experience?.techUsed ? JSON.stringify(experience.techUsed) : '["Java"]'}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
            </div>

            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                {isEdit ? "Update Experience" : "Add Experience"}
            </button>

        </form>
    )
}
