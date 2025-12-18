import { auth } from "@/auth"
import Link from "next/link"
import { LayoutDashboard, FolderKanban, Cpu, Briefcase, Settings, LogOut, ExternalLink } from "lucide-react"
import { signOutAction } from "@/lib/actions/sign-out"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-border fixed h-full flex flex-col z-50">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">M</span>
                        </div>
                        <span className="font-bold text-text-primary">Admin Console</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavLink href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <NavLink href="/admin/projects" icon={<FolderKanban size={20} />} label="Projects" />
                    <NavLink href="/admin/skills" icon={<Cpu size={20} />} label="Skills" />
                    <NavLink href="/admin/experience" icon={<Briefcase size={20} />} label="Experience" />
                    <NavLink href="/admin/settings" icon={<Settings size={20} />} label="Settings" />

                    <div className="pt-4 mt-4 border-t border-border">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium text-sm"
                        >
                            <ExternalLink size={20} />
                            Back to Website
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="mb-4 px-3">
                        <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">User</p>
                        <p className="text-sm font-bold truncate">{session?.user?.email}</p>
                    </div>
                    <form action={signOutAction}>
                        <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium text-sm"
        >
            {icon}
            {label}
        </Link>
    )
}
