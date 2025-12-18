import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"
                    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

                    if (email === adminEmail && password === adminPassword) {
                        return { id: "1", name: "Admin", email: adminEmail }
                    }
                }
                return null
            },
        }),
    ],
})
