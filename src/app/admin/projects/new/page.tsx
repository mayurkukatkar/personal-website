import ProjectForm from "@/components/admin/project-form"

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Create New Project</h1>
            <div className="bg-white p-6 rounded-xl border border-border">
                <ProjectForm />
            </div>
        </div>
    )
}
