
import Link from "next/link"
import { auth } from "@/auth";
import { Briefcase } from "lucide-react";


export default async function Header(){
    const session = await auth();
    return (
        <header className="bg-white border-b border-border sticky top-0 z-40">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="h-16 flex items-center border-b border-border shrink-0">
                        <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/20">
                            <Briefcase className="size-5 text-white" />
                        </div>
                        <h1 className="font-bold text-xl text-foreground">JobTracker</h1>
                        </div>
                    </div>

                    {/* Spacer for Desktop */}
                    <div className="hidden md:block flex-1" />
                    {/* Right Actions */}
                    <nav className="flex items-center gap-3">

                        {/* button login for user loggedOut and button Dashboard for user loggedin */}
                        {session ? (
                            <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white transition-all">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white transition-all">
                                Login
                            </Link>
                        )}                        
                    </nav>
                </div>
            </div>
        </header>
    )
}