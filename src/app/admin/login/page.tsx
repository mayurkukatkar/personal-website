"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { authenticate } from "@/lib/actions/auth-actions"
import { Card } from "@/components/ui/card"

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <button
            className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            aria-disabled={pending}
        >
            {pending ? "Logging in..." : "Access Console"}
        </button>
    )
}

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined)

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <Card className="w-full max-w-sm p-8 space-y-8 bg-surface shadow-sm border border-border">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">Admin Access</h1>
                    <p className="text-sm text-text-secondary">Enter credentials to managing system.</p>
                </div>

                <form action={dispatch} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono font-medium text-text-secondary uppercase">Email</label>
                        <input
                            className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:border-primary outline-none transition-colors"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono font-medium text-text-secondary uppercase">Password</label>
                        <input
                            className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:border-primary outline-none transition-colors"
                            id="password"
                            type="password"
                            name="password"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="flex flex-col space-y-4 pt-4">
                        <LoginButton />
                        {errorMessage && (
                            <p className="text-sm text-red-500 text-center font-medium bg-red-50 p-2 rounded-md border border-red-100">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    )
}
