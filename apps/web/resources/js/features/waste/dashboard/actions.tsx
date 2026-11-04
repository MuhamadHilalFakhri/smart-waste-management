import { Link } from "@inertiajs/react";
import {
    ArrowUpRight,
    Plus,
    Users,
    FileText,
    Droplet,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Actions({
    pending,
    admin,
}: {
    pending: number;
    admin: boolean;
}) {
    const links = [
        { label: "Buat laporan", href: "/reports?buat=true", icon: Plus },
        { label: "Lihat laporan", href: "/reports", icon: FileText },
        ...(admin ? [{ label: "Pengguna", href: "/users", icon: Users }] : []),
    ];
    return (
        <div className="sw-side-stack">
            <Card className="dashboard-card sw-attention">
                <p>
                    <Droplet size={15} />
                    Prioritas hari ini
                </p>
                <h2>
                    {pending > 0
                        ? `${pending} laporan menunggu ${admin ? "penanganan Anda." : "tindak lanjut."}`
                        : "Semua laporan telah ditinjau."}
                </h2>
                <Button asChild className="sw-priority-button">
                    <Link href="/reports?status=pending">
                        Tinjau laporan
                        <ArrowUpRight />
                    </Link>
                </Button>
                <Droplet
                    className="sw-attention-symbol"
                    size={42}
                    aria-hidden="true"
                />
            </Card>
            <Card className="dashboard-card sw-quick-card">
                <h2 className="sw-section-title">Aksi cepat</h2>
                <div className="sw-quick-links">
                    {links.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href}>
                            <span>
                                <Icon size={17} />
                            </span>
                            {label}
                        </Link>
                    ))}
                </div>
            </Card>
        </div>
    );
}
