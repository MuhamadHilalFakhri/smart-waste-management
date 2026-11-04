import { Link } from "@inertiajs/react";
import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Navigation, { useAccount } from "./navigation";
import { initials, type Statistics } from "./types";
import { useData } from "./use-data";
export default function Header() {
    const [open, setOpen] = useState(false);
    const user = useAccount();
    const stats = useData<Statistics>("dashboard");
    const pending = stats.data?.statuses.pending ?? 0;
    return (
        <header className="waste-header">
            <div className="sw-header-left">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="sw-mobile-menu"
                            aria-label="Buka menu navigasi"
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="waste-app sw-mobile-sidebar"
                    >
                        <SheetHeader className="sr-only">
                            <SheetTitle>Menu Smart Waste</SheetTitle>
                            <SheetDescription>
                                Pilih halaman atau keluar dari akun.
                            </SheetDescription>
                        </SheetHeader>
                        <Navigation onNavigate={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
                <span className="avatar-circle">{initials(user.name)}</span>
                <div className="sw-greeting">
                    <strong>Halo, {user.name}</strong>
                    <p>Selamat datang di Smart Waste</p>
                </div>
            </div>
            <div className="sw-header-right">
                <time dateTime={new Date().toISOString().slice(0, 10)}>
                    {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </time>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="sw-bell"
                            aria-label="Notifikasi laporan"
                        >
                            <Bell size={18} />
                            {pending > 0 && <i />}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="waste-app">
                        <DropdownMenuLabel>Laporan menunggu</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href="/reports?status=pending">
                                {stats.loading
                                    ? "Memuat…"
                                    : `${pending} laporan Pending`}{" "}
                                →
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
