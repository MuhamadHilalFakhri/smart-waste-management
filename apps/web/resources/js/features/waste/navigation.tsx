import { Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    FileText,
    Users,
    LogOut,
    Leaf,
    Recycle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import type { Account } from "./types";
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
        { href: "/reports", label: "Laporan sampah", icon: FileText },
        ...(user.role === "admin"
            ? [{ href: "/users", label: "Pengguna", icon: Users }]
            : []),
    ];
    return (
        <div className="sw-navigation">
            <Link href="/dashboard" onClick={onNavigate} className="sw-brand">
                <span className="sw-brand-icon">
                    <Leaf size={20} />
                </span>
                <span>
                    Smart Waste
                    <small>
                        MANAGEMENT
                        <br />
                        CONSOLE
                    </small>
                </span>
            </Link>
            <ScrollArea
                className="sw-nav-scroll"
                type="auto"
                viewportProps={{
                    tabIndex: 0,
                    role: "region",
                    "aria-label": "Menu sidebar",
                }}
            >
                <div className="sw-nav-body">
                    <p className="sw-nav-label">WORKSPACE</p>
                    <nav aria-label="Navigasi utama">
                        {links.map(({ href, label, icon: Icon }) => (
                            <Button
                                asChild
                                variant="ghost"
                                key={href}
                                className={
                                    "sw-nav-link " +
                                    (url.split("?")[0] === href ? "active" : "")
                                }
                            >
                                <Link
                                    href={href}
                                    onClick={onNavigate}
                                    aria-current={
                                        url.split("?")[0] === href
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    <Icon size={15} />
                                    {label}
                                    {url.split("?")[0] === href && (
                                        <span className="sw-nav-dot" />
                                    )}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                    <div className="sw-sidebar-note">
                        <h2>
                            <Recycle size={17} />
                            Lingkungan lebih baik
                        </h2>
                        <p>
                            Laporan yang tercatat,
                            <br />
                            penanganan yang terpantau.
                        </p>
                        <span>
                            <i />
                            Smart Waste
                        </span>
                    </div>
                </div>
            </ScrollArea>
            <div className="sw-logout">
                <Button
                    variant="ghost"
                    className="sw-nav-link"
                    onClick={() => router.post("/logout")}
                >
                    <LogOut size={16} />
                    Keluar
                </Button>
            </div>
        </div>
    );
}
