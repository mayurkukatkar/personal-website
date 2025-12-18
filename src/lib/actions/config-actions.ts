"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const configSchema = z.object({
    name: z.string().min(1, "Name is required"),
    heroTitle: z.string().min(1, "Hero Title is required"),
    heroSubtitle: z.string().min(1, "Subtitle is required"),
    avatarUrl: z.string().optional(),
    contactEmail: z.string().email(),
    githubUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    resumeUrl: z.string().optional(),
})

export async function updateConfig(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        heroTitle: formData.get("heroTitle"),
        heroSubtitle: formData.get("heroSubtitle"),
        avatarUrl: formData.get("avatarUrl"),
        contactEmail: formData.get("contactEmail"),
        githubUrl: formData.get("githubUrl"),
        linkedinUrl: formData.get("linkedinUrl"),
        resumeUrl: formData.get("resumeUrl"),
    }

    const validatedFields = configSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: "Invalid form data" }
    }

    try {
        // Find existing config or create new
        const existingConfig = await prisma.config.findFirst()

        if (existingConfig) {
            await prisma.config.update({
                where: { id: existingConfig.id },
                data: {
                    ...validatedFields.data,
                    avatarUrl: validatedFields.data.avatarUrl || null,
                    githubUrl: validatedFields.data.githubUrl || null,
                    linkedinUrl: validatedFields.data.linkedinUrl || null,
                    resumeUrl: validatedFields.data.resumeUrl || null
                }
            })
        } else {
            await prisma.config.create({
                data: {
                    ...validatedFields.data,
                    avatarUrl: validatedFields.data.avatarUrl || null,
                    githubUrl: validatedFields.data.githubUrl || null,
                    linkedinUrl: validatedFields.data.linkedinUrl || null,
                    resumeUrl: validatedFields.data.resumeUrl || null
                }
            })
        }

        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Failed to update config:", error)
        return { error: "Database Error: Failed to update settings" }
    }
}
