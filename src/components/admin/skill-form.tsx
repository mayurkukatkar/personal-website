"use client"

import { useFormState } from "react-dom"
import { createSkill, updateSkill } from "@/lib/actions/skill-actions"

interface SkillFormProps {
    skill?: any
    isEdit?: boolean
}

export default function SkillForm({ skill, isEdit }: SkillFormProps) {
    const action = isEdit ? updateSkill.bind(null, skill.id) : createSkill
    const [state, dispatch] = useFormState(action, undefined)

    return (
        <form action={dispatch} className="space-y-6 max-w-md">
            {state?.error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {state.error}
                </div>
            )}
            <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Skill Name</label>
                    <input
                        name="name"
                        defaultValue={skill?.name}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        name="category"
                        defaultValue={skill?.category}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Backend Engineering">Backend Engineering</option>
                        <option value="Databases & Storage">Databases & Storage</option>
                        <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
                        <option value="Tools & Testing">Tools & Testing</option>
                        <option value="Frontend">Frontend</option>
                    </select>
                </div>

                {/* Order */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Order</label>
                    <input
                        type="number"
                        name="order"
                        defaultValue={skill?.order || 0}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                </div>

                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors w-full">
                    {isEdit ? "Update Skill" : "Create Skill"}
                </button>
            </div>
        </form>
    )
}
