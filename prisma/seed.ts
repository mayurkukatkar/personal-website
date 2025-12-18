import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Clear existing data
    await prisma.project.deleteMany()
    await prisma.skill.deleteMany()
    await prisma.experience.deleteMany()
    await prisma.config.deleteMany()

    // 1. Projects
    await prisma.project.create({
        data: {
            title: "Vortex Engine",
            slug: "vortex-engine",
            shortDescription: "Processing 1M+ events/sec with minimal latency.",
            longDescription: `## Problem
      Processing high-volume event streams (1M+ events/second) usually results in unacceptable latency spikes and data loss using standard queue implementations.
      
      ## Solution
      Designed a distributed event streaming engine using Kafka and Go. Implemented custom partitioning strategies and zero-copy deserialization to achieve sub-millisecond throughput.
      
      ## Architecture
      - **Ingestion**: gRPC gateway 
      - **Buffering**: Kafka partitioned topics
      - **Processing**: Go consumers with worker pools
      - **Storage**: Time-series optimized Redis layer`,
            techStack: ["Go", "Kafka", "Protobuf", "Redis"],
            featured: true,
            status: "PUBLISHED",
            order: 1
        }
    })

    await prisma.project.create({
        data: {
            title: "Ledger Core",
            slug: "ledger-core",
            shortDescription: "Ensuring double-entry consistency across distributed services.",
            longDescription: `## Problem
      In a microservices architecture, maintaining financial consistency (ACID) across multiple distinct databases is notoriously difficult.
      
      ## Solution
      Implemented an acid-compliant ledger service with idempotent transaction handling and automated reconciliation using the Saga pattern.
      
      ## Key Features
      - Double-entry bookkeeping
      - Idempotency keys
      - Automated reconciliation jobs`,
            techStack: ["Java", "Spring Boot", "PostgreSQL", "Temporal"],
            featured: true,
            status: "PUBLISHED",
            order: 2
        }
    })

    await prisma.project.create({
        data: {
            title: "Auth Sentinel",
            slug: "auth-sentinel",
            shortDescription: "Centralizing RBAC for scalable microservices.",
            longDescription: `## Problem
      Fragmented authorization logic across 20+ microservices led to security vulnerabilities and maintenance nightmares.
      
      ## Solution
      Built a high-performance authorization gateway using OPA (Open Policy Agent) and JWT verification. Centralized policy management decoupled from business logic.`,
            techStack: ["Rust", "OPA", "Docker", "Kubernetes"],
            featured: true,
            status: "PUBLISHED",
            order: 3
        }
    })

    // 2. Skills
    const skillCategories = [
        {
            category: "Backend Engineering",
            items: ["Java 21", "Spring Boot", "Microservices", "System Design", "gRPC", "REST API"]
        },
        {
            category: "Databases & Storage",
            items: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch", "Cassandra"]
        },
        {
            category: "DevOps & Infrastructure",
            items: ["Docker", "Kubernetes", "AWS (EC2, S3, RDS)", "Terraform", "CI/CD"]
        },
        {
            category: "Tools & Testing",
            items: ["Git", "Maven", "Gradle", "JUnit 5", "Mockito", "TestContainers"]
        }
    ]

    let skillOrder = 0
    for (const group of skillCategories) {
        for (const item of group.items) {
            await prisma.skill.create({
                data: {
                    name: item,
                    category: group.category,
                    icon: "code", // Default icon
                    order: skillOrder++
                }
            })
        }
    }

    // 3. Experience
    await prisma.experience.create({
        data: {
            company: "FinTech Global",
            role: "Senior Backend Engineer",
            description: "Leading the migration from monolithic architecture to microservices. Improved transaction processing speed by 40% and reduced downtime to near-zero.",
            startDate: new Date("2022-01-01"),
            current: true,
            techUsed: ["Java", "Spring Cloud", "Kafka", "AWS"],
            order: 1
        }
    })

    await prisma.experience.create({
        data: {
            company: "DataStream Corp",
            role: "Backend Developer",
            description: "Designed and implemented high-volume data ingestion pipelines using Apache Beam and Cloud Dataflow. Processed 5TB+ daily data.",
            startDate: new Date("2019-01-01"),
            endDate: new Date("2022-01-01"),
            current: false,
            techUsed: ["Java", "GCP", "Apache Beam", "BigQuery"],
            order: 2
        }
    })

    // 4. Config
    await prisma.config.create({
        data: {
            // id is auto-generated
            heroTitle: "Building robust distributed systems at scale.",
            heroSubtitle: "I design and implement high-performance backend architectures, microservices, and reliable APIs. Focused on stability, scalability, and clean code.",
            contactEmail: "hello@example.com",
            resumeUrl: "/resume.pdf"
        }
    })

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
