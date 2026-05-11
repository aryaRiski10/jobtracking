import Link from "next/link"
import Navbar from "./Navbar"
import { auth } from "@/auth";
import { Briefcase } from "lucide-react";
import { getJobs } from "@/lib/data";

export default async function Header(){
    const session = await auth();
    const jobs = await getJobs();
    return (
        <>
        <header className="bg-white border-b border-border sticky top-0 z-40">
            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo (Mobile) */}
                    <div className="flex items-center gap-3 md:hidden">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/20">
                            <Briefcase className="size-5 text-white" />
                        </div>
                        <h1 className="font-bold text-xl hidden sm:block text-foreground">
                        JobTracker
                        </h1>
                    </div>
                    {/* Spacer for Desktop */}
                    <div className="hidden md:block flex-1" />
                    {/* Right Actions */}
                    <Navbar session={session} jobs={jobs} />
                </div>
            </div>
            {/* Mobile Tabs */}
            <div className="md:hidden overflow-x-auto scrollbar-hide border-t border-border bg-white px-4">
                <nav className="flex min-w-max gap-2 py-2">
                <Link href="/dashboard"
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-muted text-foreground transition-all"
                    >
                    Overview
                </Link>
                <Link href="/dashboard/applications"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-muted transition-all"
                    >
                    Applications
                </Link>
                <Link href="/dashboard/interviews"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-muted transition-all"
                    >
                    Interviews
                </Link>
                </nav>
            </div>
        </header>

        
        </>

    )
}