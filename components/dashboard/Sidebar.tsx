import { Briefcase, Calendar, Layers, LayoutDashboard} from "lucide-react";
import Link from "next/link";

export default function Sidebar(){
    const switchTab = (tab: string) => {
        console.log(`Switching to ${tab} tab`);
    };

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border sticky top-0 h-screen shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/20">
                    <Briefcase className="size-5 text-white" />
                </div>
                <h1 className="font-bold text-xl text-foreground">JobTracker</h1>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link href="/dashboard" data-tab-btn="overview" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-muted text-foreground transition-all text-left">
                    <LayoutDashboard className="size-5"/> Overview
                </Link>
                <Link href="/dashboard/applications" data-tab-btn="applications" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-secondary hover:bg-muted hover:text-foreground transition-all text-left">
                    <Layers className="size-5"/> Applications
                </Link>
                <Link href="/dashboard/interviews" data-tab-btn="interviews" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-secondary hover:bg-muted hover:text-foreground transition-all text-left">
                    <Calendar className="size-5"/> Interviews
                </Link>
            </nav>
        </aside>
    )
}