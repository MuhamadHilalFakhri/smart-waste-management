import { Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    FileText,
    Users,
    LogOut,
    Recycle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { initials, type Account } from "./types";
export function useAccount() {
    return (usePage().props as unknown as { auth: { user: Account } }).auth
        .user;
}
export default function Navigation({
    onNavigate,
}: {
    onNavigate?: () => void;
}) {
    const user = useAccount();
    const { url } = usePage();
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/reports", label: "Laporan", icon: FileText },
        ...(user.role === "admin"
            ? [{ href: "/users", label: "Pengguna", icon: Users }]
            : []),
    ];
    return (
        <div className="sw-navigation">
            <Link href="/dashboard" onClick={onNavigate} className="sw-brand">
                <span className="sw-brand-icon">
                    <Recycle size={22} />
                </span>
                <span>Smart Waste</span>
            </Link>
            <p className="sw-nav-label">MENU UTAMA</p>
            <nav aria-label="Navigasi utama">
                {links.map(({ href, label, icon: Icon }) => (
                    <Button
                        key={href}
                        asChild
                        variant="ghost"
                        className={
                            "sw-nav-link " +
                            (url.split("?")[0] === href ? "active" : "")
                        }
                    >
                        <Link
                            href={href}
                            onClick={onNavigate}
                            aria-current={
                                url.split("?")[0] === href ? "page" : undefined
                            }
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    </Button>
                ))}
            </nav>
            <div className="sw-sidebar-bottom">
                <div className="sw-sidebar-person">
                    <span className="avatar-circle">{initials(user.name)}</span>
                    <div className="min-w-0">
                        <strong className="block truncate text-sm">
                            {user.name}
                        </strong>
                        <p className="text-xs text-muted-foreground">
                            {user.role === "admin"
                                ? "Administrator"
                                : "Pelapor"}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="sw-nav-link mt-4"
                    onClick={() => router.post("/logout")}
                >
                    <LogOut size={17} />
                    Keluar
                </Button>
            </div>
        </div>
    );
}
