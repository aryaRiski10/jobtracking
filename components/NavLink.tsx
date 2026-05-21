'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

const NavLink = ({ href, icon: Icon, label }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

  return (
    <Link href={href} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-muted focus:bg-muted active:bg-muted text-foreground transition-all text-left ${isActive ? 'bg-muted' : ''}`}>
        <Icon className="size-5"/> {label}
    </Link>
  )
}

export default NavLink