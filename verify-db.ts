import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const count = await prisma.project.count()
    console.log(`Total projects: ${count}`)
    const projects = await prisma.project.findMany({ select: { title: true } })
    console.log('Projects:', projects)

    const skillCount = await prisma.skill.count()
    console.log(`Total skills: ${skillCount}`)
    const skills = await prisma.skill.findMany()
    console.log('Skills:', skills)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
