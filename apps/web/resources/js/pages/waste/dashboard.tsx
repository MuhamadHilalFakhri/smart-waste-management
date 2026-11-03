import Shell from "@/features/waste/shell";
import { useAccount } from "@/features/waste/navigation";
import { useData } from "@/features/waste/use-data";
import { Notice } from "@/features/waste/common";
import Stats from "@/features/waste/dashboard/stats";
import CategoryChart from "@/features/waste/dashboard/categories";
import Activity from "@/features/waste/dashboard/activity";
import Actions from "@/features/waste/dashboard/actions";
import Recent from "@/features/waste/dashboard/recent";
import type { Statistics, Page, Report } from "@/features/waste/types";
export default function Dashboard() {
    const user = useAccount();
    const stats = useData<Statistics>("dashboard");
    const reports = useData<Page<Report>>("reports");
    return (
        <Shell title="Ringkasan laporan">
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
                    <div className="sw-dashboard-grid">
                        <Activity data={stats.data} />
                        <Recent
                            rows={reports.data?.data.slice(0, 3) ?? []}
                            loading={reports.loading}
                        />
                    </div>
                </>
            )}
        </Shell>
    );
}
