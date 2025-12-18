"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const ExperienceSchema = z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    description: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().optional().or(z.literal("")),
    current: z.coerce.boolean().optional(),
    techUsed: z.string(),
    order: z.coerce.number().optional(),
})

export async function deleteExperience(id: string) {
    try {
        await prisma.experience.delete({ where: { id } })
        revalidatePath("/admin/experience")
        revalidatePath("/admin/experience")
    } catch (error) {
        console.error("Failed to delete experience", error)
    }
}

export async function createExperience(prevState: any, formData: FormData) {
    const validatedFields = ExperienceSchema.safeParse({
        company: formData.get("company"),
        role: formData.get("role"),
        description: formData.get("description"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        current: formData.get("current") === "on",
        techUsed: formData.get("techUsed"),
        order: formData.get("order"),
    })

    if (!validatedFields.success) {
        return { error: "Validation failed" }
    }

    try {
        await prisma.experience.create({
            data: {
                ...validatedFields.data,
                startDate: new Date(validatedFields.data.startDate),
                endDate: validatedFields.data.endDate ? new Date(validatedFields.data.endDate) : null,
                techUsed: validatedFields.data.techUsed ? JSON.parse(validatedFields.data.techUsed) : [],
            },
        })
    } catch (error) {
        return { error: "Failed to create experience" }
    }

    revalidatePath("/admin/experience")
    redirect("/admin/experience")
}

export async function updateExperience(id: string, prevState: any, formData: FormData) {
    const validatedFields = ExperienceSchema.safeParse({
        company: formData.get("company"),
        role: formData.get("role"),
        description: formData.get("description"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        current: formData.get("current") === "on",
        techUsed: formData.get("techUsed"),
        order: formData.get("order"),
    })

    if (!validatedFields.success) {
        return { error: "Validation failed" }
    }

    try {
        await prisma.experience.update({
            where: { id },
            data: {
                ...validatedFields.data,
                startDate: new Date(validatedFields.data.startDate),
                techUsed: validatedFields.data.techUsed ? JSON.parse(validatedFields.data.techUsed) : [],
            },
        })
    } catch (error) {
        return { error: "Failed to update experience" }
    }

    revalidatePath("/admin/experience")
    redirect("/admin/experience")
}
