import { Link } from "@inertiajs/react";
import { ArrowUpRight, Plus, Users, ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Actions({
    pending,
    admin,
}: {
    pending: number;
    admin: boolean;
}) {
    return (
        <div className="sw-side-stack">
            <Card className="dashboard-card sw-attention">
                <h2 className="sw-section-title">
                    {pending
                        ? "Laporan menunggu penanganan"
                        : "Semua laporan telah ditinjau"}
                </h2>
                <p className="sw-muted">
                    {pending
                        ? `${pending} laporan berstatus Pending. ${admin ? "Tinjau laporan dan tentukan langkah penanganannya." : "Pantau perkembangan laporan Anda di halaman riwayat."}`
                        : "Buat laporan baru saat menemukan sampah yang perlu ditangani."}
                </p>
                <Button asChild variant="outline" className="w-fit bg-white">
                    <Link href="/reports?status=pending">
                        Lihat laporan
                        <ArrowUpRight />
                    </Link>
                </Button>
            </Card>
            <Card className="dashboard-card">
                <h2 className="sw-section-title">Akses cepat</h2>
                <div className="sw-quick-links">
                    <Link href="/reports?buat=true">
                        <Plus size={19} />
                        Buat laporan
                    </Link>
                    {admin ? (
                        <Link href="/users">
                            <Users size={19} />
                            Kelola pengguna
                        </Link>
                    ) : (
                        <Link href="/reports">
                            <ClipboardList size={19} />
                            Riwayat laporan
                        </Link>
                    )}
                </div>
            </Card>
        </div>
    );
}
