"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { createProject, updateProject } from "@/lib/actions/project-actions"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/ui/image-upload"

// Use a simplified type until we have full types
type Project = any

interface ProjectFormProps {
    project?: Project
    isEdit?: boolean
}

export default function ProjectForm({ project, isEdit }: ProjectFormProps) {
    const action = isEdit ? updateProject.bind(null, project.id) : createProject
    const [state, dispatch] = useFormState(action, undefined)

    // State for Images
    const [heroImage, setHeroImage] = useState<string>(project?.heroImage || "")
    const [galleryImages, setGalleryImages] = useState<string[]>(project?.galleryImages || [])

    return (
        <form action={dispatch} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                {/* Title & Slug */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            name="title"
                            defaultValue={project?.title}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <input
                            name="slug"
                            defaultValue={project?.slug}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                    </div>
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Short Description</label>
                    <input
                        name="shortDescription"
                        defaultValue={project?.shortDescription}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                    />
                </div>

                {/* Long Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Long Description (Markdown)</label>
                    <textarea
                        name="longDescription"
                        defaultValue={project?.longDescription}
                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                        required
                    />
                </div>

                {/* Hero Image */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Main Image</label>
                    <ImageUpload
                        value={heroImage ? [heroImage] : []}
                        onChange={(url: string) => setHeroImage(url)}
                        onRemove={() => setHeroImage("")}
                    />
                    <input type="hidden" name="heroImage" value={heroImage} />
                </div>

                {/* Gallery Images */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Gallery Images</label>
                    <ImageUpload
                        value={galleryImages}
                        maxFiles={5}
                        onChange={(url: string) => setGalleryImages((current) => [...current, url])}
                        onRemove={(url: string) => setGalleryImages((current) => current.filter((c) => c !== url))}
                    />
                    <input
                        type="hidden"
                        name="galleryImages"
                        value={JSON.stringify(galleryImages)}
                    />
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tech Stack (JSON Array)</label>
                    <input
                        name="techStack"
                        defaultValue={project?.techStack || '["Java", "Spring Boot"]'}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                    />
                    <p className="text-xs text-muted-foreground">Format: ["Tech1", "Tech2"]</p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub URL</label>
                        <input
                            name="githubUrl"
                            defaultValue={project?.githubUrl}
                            placeholder="https://github.com/..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Live URL</label>
                        <input
                            name="liveUrl"
                            defaultValue={project?.liveUrl}
                            placeholder="https://..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Status & Featured */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select
                            name="status"
                            defaultValue={project?.status || "DRAFT"}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Order</label>
                        <input
                            type="number"
                            name="order"
                            defaultValue={project?.order || 0}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" name="featured" id="featured" defaultChecked={project?.featured} />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                </div>

                {/* Errors */}
                {state?.error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                        {state.error}
                    </div>
                )}

                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    {isEdit ? "Update Project" : "Create Project"}
                </button>
            </div>
        </form>
    )
}
