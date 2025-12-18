import ExperienceForm from "@/components/admin/experience-form"

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Add Experience</h1>
            <div className="bg-white p-6 rounded-xl border border-border max-w-xl">
                <ExperienceForm />
            </div>
        </div>
    )
}
