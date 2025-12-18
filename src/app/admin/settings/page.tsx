import { getHeroConfig } from "@/lib/data"
import { ConfigForm } from "@/components/admin/config-form"

export default async function SettingsPage() {
    const config = await getHeroConfig()

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Site Settings</h1>
                <p className="text-text-secondary mt-2">Manage your global site configuration, profile details, and social links.</p>
            </div>

            <ConfigForm initialData={config} />
        </div>
    )
}
