"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const ProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    shortDescription: z.string().min(1, "Short description is required"),
    longDescription: z.string().min(1, "Long description is required"),
    techStack: z.string(),
    heroImage: z.string().optional(),
    galleryImages: z.string().optional(), // JSON string
    featured: z.coerce.boolean().optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    order: z.coerce.number().optional(),
    githubUrl: z.string().optional().or(z.literal("")),
    liveUrl: z.string().optional().or(z.literal("")),
})

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        })
        revalidatePath("/admin/projects")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete project" }
    }
}

export async function createProject(prevState: any, formData: FormData) {
    const validatedFields = ProjectSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        shortDescription: formData.get("shortDescription"),
        longDescription: formData.get("longDescription"),
        techStack: formData.get("techStack"),
        heroImage: formData.get("heroImage"),
        galleryImages: formData.get("galleryImages"),
        featured: formData.get("featured") === "on",
        status: formData.get("status"),
        order: formData.get("order"),
        githubUrl: formData.get("githubUrl"),
        liveUrl: formData.get("liveUrl"),
    })

    if (!validatedFields.success) {
        return {
            error: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        // Parse galleryImages JSON string to array
        const galleryImages = validatedFields.data.galleryImages
            ? JSON.parse(validatedFields.data.galleryImages)
            : []

        await prisma.project.create({
            data: {
                ...validatedFields.data,
                galleryImages: galleryImages,
                techStack: validatedFields.data.techStack || "[]",
            },
        })
    } catch (error) {
        return { error: "Failed to create project" }
    }

    revalidatePath("/admin/projects")
    redirect("/admin/projects")
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    const validatedFields = ProjectSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        shortDescription: formData.get("shortDescription"),
        longDescription: formData.get("longDescription"),
        techStack: formData.get("techStack"),
        heroImage: formData.get("heroImage"),
        galleryImages: formData.get("galleryImages"),
        featured: formData.get("featured") === "on",
        status: formData.get("status"),
        order: formData.get("order"),
        githubUrl: formData.get("githubUrl"),
        liveUrl: formData.get("liveUrl"),
    })

    if (!validatedFields.success) {
        return {
            error: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        // Parse galleryImages JSON string to array
        const galleryImages = validatedFields.data.galleryImages
            ? JSON.parse(validatedFields.data.galleryImages)
            : []

        await prisma.project.update({
            where: { id },
            data: {
                ...validatedFields.data,
                galleryImages: galleryImages,
                techStack: validatedFields.data.techStack || "[]",
            },
        })
    } catch (error) {
        return { error: "Failed to update project" }
    }

    revalidatePath("/admin/projects")
    redirect("/admin/projects")
}
