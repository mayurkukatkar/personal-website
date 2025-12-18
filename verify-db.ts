import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const count = await prisma.project.count()
    console.log(`Total projects: ${count}`)
    const projects = await prisma.project.findMany({ select: { title: true } })
    console.log('Projects:', projects)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
