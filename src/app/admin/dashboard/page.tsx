import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FolderGit2, Layers } from "lucide-react";

export const revalidate = 0; // Always fresh

export default async function AdminDashboard() {
    const projectCount = await prisma.project.count()
    const skillCount = await prisma.skill.count()
    const experienceCount = await prisma.experience.count();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Projects"
                    count={projectCount}
                    icon={<FolderGit2 className="text-primary" size={24} />}
                />
                <DashboardCard
                    title="Total Skills"
                    count={skillCount}
                    icon={<Layers className="text-indigo-500" size={24} />}
                />
                <DashboardCard
                    title="Experience Entries"
                    count={experienceCount}
                    icon={<Briefcase className="text-green-500" size={24} />}
                />
            </div>
        </div>
    )
}

function DashboardCard({ title, count, icon }: { title: string, count: number, icon: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
                <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
                <p className="text-3xl font-bold text-text-primary mt-2">{count}</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
                {icon}
            </div>
        </div>
    )
}
