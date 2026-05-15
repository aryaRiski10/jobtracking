'use client'
import { Briefcase, Calendar, Layers, LayoutDashboard} from "lucide-react";
import NavLink from "../NavLink";

export default function Sidebar(){
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
                <NavLink href="/dashboard" icon={LayoutDashboard} label="Overview"/>
                <NavLink href="/dashboard/applications" icon={Layers} label="Applications"/>
                <NavLink href="/dashboard/interviews" icon={Calendar} label="Interviews"/>
            </nav>
        </aside>
    )
}