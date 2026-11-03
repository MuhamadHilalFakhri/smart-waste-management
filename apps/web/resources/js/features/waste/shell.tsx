import { Head } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import Navigation, { useAccount } from "./navigation";
import { initials } from "./types";
import "./styles/index.css";
export default function Shell({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const user = useAccount();
    return (
        <div className="waste-app sw-root">
            <Head title={title + " · Smart Waste"} />
            <aside className="waste-sidebar">
                <Navigation />
            </aside>
            <div className="waste-main">
                <header className="waste-header">
                    <div className="flex min-w-0 items-center gap-3">
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
                        <div className="min-w-0">
                            <p className="sw-breadcrumb">
                                Smart Waste / {title}
                            </p>
                            <h1>{title}</h1>
                        </div>
                    </div>
                    <div className="sw-header-person">
                        <div className="sw-header-name">
                            <strong>{user.name}</strong>
                            <span>
                                {user.role === "admin"
                                    ? "Administrator"
                                    : "Pelapor"}
                            </span>
                        </div>
                        <span className="avatar-circle" aria-hidden="true">
                            {initials(user.name)}
                        </span>
                    </div>
                </header>
                <main className="waste-content">{children}</main>
                <footer className="sw-footer">
                    Smart Waste · Laporan yang tercatat, penanganan yang
                    terpantau.
                </footer>
            </div>
        </div>
    );
}
