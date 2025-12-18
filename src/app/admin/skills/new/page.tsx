import SkillForm from "@/components/admin/skill-form"

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-primary">Add New Skill</h1>
            <div className="bg-white p-6 rounded-xl border border-border max-w-xl">
                <SkillForm />
            </div>
        </div>
    )
}
