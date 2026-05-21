'use client'
import { Calendar, Layers, LayoutDashboard} from "lucide-react";
import NavLink from "../NavLink";

const MobileNav = () => {
  return (
    <div className="md:hidden overflow-x-auto scrollbar-hide border-t border-border bg-white px-4">
        <nav className="flex min-w-max gap-2 py-2">
            <nav className="flex-1 flex py-3 overflow-y-auto">
                <NavLink href="/dashboard" icon={LayoutDashboard} label="Overview"/>
                <NavLink href="/dashboard/applications" icon={Layers} label="Applications"/>
                <NavLink href="/dashboard/interviews" icon={Calendar} label="Interviews"/>
            </nav>
        </nav>
    </div>
  )
}

export default MobileNav