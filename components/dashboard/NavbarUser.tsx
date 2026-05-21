import { CircleUserRound, LogOut, UserPen } from "lucide-react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logout } from "@/lib/logout";
import Image from "next/image";

export default function NavbarUser({session} : {session: Session}) {
const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    useEffect(() => {
        if (!isProfileOpen) return;

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!document.getElementById("profile-menu")?.contains(target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileOpen]);

    function handleOpenProfile() {
        setIsProfileOpen(!isProfileOpen);
    }
    
    return (
        <>
        <button onClick={handleOpenProfile} className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <span>{session?.user?.name}</span>
            {session?.user?.image ? (
                <Image src={session.user.image} className="size-9 rounded-full object-cover ring-2 ring-border" width={40} height={40} alt={session.user.name || "User Image"}/>
            ) : (
                <CircleUserRound className="text-gray-400" size={40} />
            )} 
        </button>

        {isProfileOpen ? (
        <div id="profile-menu" className="w-40 absolute right-12 top-12 bg-white rounded-md shadow-sm flex flex-col" role="menu">
          <Link href="/profile" className="h-10 px-3 border border-border text-muted-foreground hover:bg-muted transition-colors cursor-pointer flex items-center gap-2">
            <UserPen className="size-4"/>
            <span className="hidden sm:inline text-sm font-medium">Profile</span>
          </Link>
          <button onClick={Logout} className="h-10 px-3 border border-border text-muted-foreground hover:bg-muted transition-colors cursor-pointer flex items-center gap-2"
            >
                <LogOut className="size-4" />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
        </div>
      ) : null}
        </>
    )
}