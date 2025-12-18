"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
    maxFiles?: number
}

export function ImageUpload({
    disabled,
    onChange,
    onRemove,
    value,
    maxFiles = 1
}: ImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!isMounted) {
        return null
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => {
                    const isPdf = url.toLowerCase().endsWith(".pdf")
                    return (
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-secondary flex items-center justify-center">
                            <div className="z-10 absolute top-2 right-2">
                                <Button
                                    type="button"
                                    onClick={() => onRemove(url)}
                                    variant="destructive"
                                    size="icon"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            {isPdf ? (
                                <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 text-center hover:underline">
                                    <span className="text-4xl">📄</span>
                                    <span className="text-xs mt-2 break-all line-clamp-2">PDF Document</span>
                                </a>
                            ) : (
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Image"
                                    src={url}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            {value.length < maxFiles && (
                <CldUploadWidget
                    onSuccess={onUpload}
                    uploadPreset="soil59g4"
                >
                    {({ open }) => {
                        const onClick = () => {
                            open()
                        }

                        return (
                            <Button
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Upload an Image
                            </Button>
                        )
                    }}
                </CldUploadWidget>
            )}
        </div>
    )
}
