"use server"

import prisma from "@/lib/prisma"

export async function getHeroConfig() {
    const config = await prisma.config.findFirst()
    return config || {
        name: "Your Name",
        heroTitle: "Building robust distributed systems at scale.",
        heroSubtitle: "I design and implement high-performance backend architectures, microservices, and reliable APIs.",
        avatarUrl: "/profile-pic.png", // You'll need to add a placeholder image or use an existing one
        contactEmail: "hello@example.com",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        resumeUrl: "/resume.pdf"
    }
}

export async function getFeaturedProjects() {
    return prisma.project.findMany({
        where: { status: "PUBLISHED", featured: true },
        orderBy: { order: "asc" },
    })
}

export async function getAllProjects() {
    return prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
    })
}

export async function getSkills() {
    return prisma.skill.findMany({
        orderBy: { order: "asc" },
    })
}

export async function getExperience() {
    return prisma.experience.findMany({
        orderBy: { order: "asc" }, // or startDate desc
    })
}
