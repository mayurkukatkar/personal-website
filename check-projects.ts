
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function checkProjects() {
    console.log("Checking database for projects...")
    try {
        const projects = await prisma.project.findMany()
        console.log(`Found ${projects.length} projects.`)
        projects.forEach(p => {
            console.log(`- [${p.status}] ${p.title} (ID: ${p.id})`)
        })
    } catch (e) {
        console.error("Error fetching projects:", e)
    } finally {
        await prisma.$disconnect()
    }
}

checkProjects()
