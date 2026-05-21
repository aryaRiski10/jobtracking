'use client'
import { Bell,  Search } from "lucide-react"
import NavbarUser from "./NavbarUser";
import { useState } from "react"
import ModalSearch from "../modals/ModalSearch"
import { Session } from "next-auth";
import type { Job } from "@/app/generated/prisma/client"

type NavbarProps = {
    session: Session | null;
    jobs: Job[]; // Replace 'any' with the appropriate type for your jobs
}

export default function Navbar({ session, jobs }: NavbarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    
    function handlerOpenModalSearch() {
        setIsSearchOpen(!isSearchOpen);
    }
    return (
        <>
        <nav className="flex items-center gap-3">
            <button
            onClick={() => handlerOpenModalSearch()}
            className="size-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer"
            >
                <Search className="size-5 text-muted-foreground" />
            </button>
            
            <button className="size-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative cursor-pointer">
                <Bell className="size-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-error ring-2 ring-white" />
            </button>
            
            <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
            {session && <NavbarUser session={session} />}
        </nav>
        <ModalSearch closeModalSearch={() => setIsSearchOpen(false)} jobs={jobs} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    )
}