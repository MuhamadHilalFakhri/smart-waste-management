import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import Shell from "@/features/waste/shell";
import { useAccount } from "@/features/waste/navigation";
import { useData } from "@/features/waste/use-data";
import { Notice } from "@/features/waste/common";
import { Button } from "@/components/ui/button";
import Stats from "@/features/waste/dashboard/stats";
import CategoryChart from "@/features/waste/dashboard/categories";
import Activity from "@/features/waste/dashboard/activity";
import Actions from "@/features/waste/dashboard/actions";
import ReportTable from "@/features/waste/reports/report-table";
import type { Statistics, Page, Report } from "@/features/waste/types";
export default function Dashboard() {
    const user = useAccount();
    const stats = useData<Statistics>("dashboard");
    const reports = useData<Page<Report>>("reports");
    return (
        <Shell title="Dashboard">
            <div className="sw-intro">
                <div>
                    <h2>Selamat datang, {user.name.split(" ")[0]}.</h2>
                    <p className="sw-muted">
                        {user.role === "admin"
                            ? "Pantau laporan dan penanganan sampah di satu tempat."
                            : "Catat temuan sampah dan pantau perkembangannya."}
                    </p>
                </div>
                <Button asChild>
                    <Link href="/reports?buat=true">
                        <Plus />
                        Buat laporan
                    </Link>
                </Button>
            </div>
            <Notice error={stats.error || reports.error} />
            {!stats.data ? (
                <p className="sw-empty">
                    {stats.loading
                        ? "Memuat statistik…"
                        : "Statistik belum tersedia."}
                </p>
            ) : (
                <>
                    <Stats data={stats.data} />
                    <div className="sw-dashboard-grid">
                        <CategoryChart data={stats.data} />
                        <Actions
                            pending={stats.data.statuses.pending ?? 0}
                            admin={user.role === "admin"}
                        />
                    </div>
                    <Activity data={stats.data} />
                </>
            )}
            <section className="table-section">
                <div className="table-heading">
                    <h2 className="sw-section-title">Laporan terbaru</h2>
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/reports">Lihat semua →</Link>
                    </Button>
                </div>
                <ReportTable
                    rows={reports.data?.data.slice(0, 5) ?? []}
                    loading={reports.loading}
                    onSelect={(report) => {
                        router.visit("/reports?detail=" + report.id);
                    }}
                />
            </section>
        </Shell>
    );
}
