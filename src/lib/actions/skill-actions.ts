"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const SkillSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    proficiency: z.coerce.number().min(1).max(5).optional(),
    order: z.coerce.number().optional(),
})

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({ where: { id } })
        revalidatePath("/admin/skills")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete skill" }
    }
}

export async function createSkill(prevState: any, formData: FormData) {
    const validatedFields = SkillSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        proficiency: formData.get("proficiency"),
        order: formData.get("order"),
    })

    if (!validatedFields.success) {
        return { error: "Validation failed" }
    }

    try {
        await prisma.skill.create({ data: validatedFields.data })
    } catch (error) {
        return { error: "Failed to create skill" }
    }

    revalidatePath("/admin/skills")
    redirect("/admin/skills")
}

export async function updateSkill(id: string, prevState: any, formData: FormData) {
    const validatedFields = SkillSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        proficiency: formData.get("proficiency"),
        order: formData.get("order"),
    })

    if (!validatedFields.success) {
        return { error: "Validation failed" }
    }

    try {
        await prisma.skill.update({
            where: { id },
            data: validatedFields.data,
        })
    } catch (error) {
        return { error: "Failed to update skill" }
    }

    revalidatePath("/admin/skills")
    redirect("/admin/skills")
}
