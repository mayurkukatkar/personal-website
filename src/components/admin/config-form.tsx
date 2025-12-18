"use client"

import { updateConfig } from "@/lib/actions/config-actions"
import { useFormStatus } from "react-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ui/image-upload"

interface ConfigFormProps {
    initialData: any
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? "Saving..." : "Save Changes"}
        </Button>
    )
}


// ... imports

export function ConfigForm({ initialData }: ConfigFormProps) {
    const { toast } = useToast()
    const [avatarUrl, setAvatarUrl] = useState<string>(initialData?.avatarUrl || "")
    const [resumeUrl, setResumeUrl] = useState<string>(initialData?.resumeUrl || "")

    async function clientAction(formData: FormData) {
        // ... existing save logic
        const result = await updateConfig(formData)
        if (result.error) {
            // ... error toast
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            })
        } else {
            // ... success toast
            toast({
                title: "Success",
                description: "Settings updated successfully",
            })
        }
    }

    return (
        <form action={clientAction} className="space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ... Name, Email, Hero Title/Subtitle inputs ... */}
                <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" name="name" defaultValue={initialData?.name} required placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" name="contactEmail" type="email" defaultValue={initialData?.contactEmail} required />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="heroTitle">Hero Title (H1)</Label>
                    <Textarea id="heroTitle" name="heroTitle" defaultValue={initialData?.heroTitle} required rows={2} />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Textarea id="heroSubtitle" name="heroSubtitle" defaultValue={initialData?.heroSubtitle} required rows={3} />
                </div>

                <div className="space-y-4">
                    <Label>Avatar Image</Label>
                    <ImageUpload
                        value={avatarUrl ? [avatarUrl] : []}
                        onChange={(url: string) => setAvatarUrl(url)}
                        onRemove={() => setAvatarUrl("")}
                    />
                    <input type="hidden" id="avatarUrl" name="avatarUrl" value={avatarUrl} />
                </div>
                <div className="space-y-4">
                    <Label>Resume (PDF/Image)</Label>
                    <ImageUpload
                        value={resumeUrl ? [resumeUrl] : []}
                        onChange={(url: string) => setResumeUrl(url)}
                        onRemove={() => setResumeUrl("")}
                    />
                    <input type="hidden" id="resumeUrl" name="resumeUrl" value={resumeUrl} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input id="githubUrl" name="githubUrl" defaultValue={initialData?.githubUrl || ""} placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input id="linkedinUrl" name="linkedinUrl" defaultValue={initialData?.linkedinUrl || ""} placeholder="https://linkedin.com/in/username" />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
                <SubmitButton />
            </div>
        </form>
    )
}
