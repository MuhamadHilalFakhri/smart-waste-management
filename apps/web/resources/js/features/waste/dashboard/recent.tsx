import { Link } from "@inertiajs/react";
import { ArrowRight, ChevronRight, MapPin, Recycle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Status } from "../common";
import type { Report } from "../api";
import { dateLabel } from "../types";
const reportLabels: Record<string, string> = {
    organic: "Sampah organik",
    plastic: "Sampah plastik",
    paper: "Sampah kertas",
};
export default function Recent({
    rows,
    loading,
}: {
    rows: Report[];
    loading: boolean;
}) {
    return (
        <Card className="dashboard-card sw-recent-card">
            <div className="sw-card-heading">
                <h2 className="sw-section-title">Laporan terbaru</h2>
                <Link href="/reports">
                    Lihat semua
                    <ArrowRight size={15} />
                </Link>
            </div>
            <div className="sw-recent-list">
                {rows.map((report) => (
                    <Link
                        className="sw-recent-report"
                        key={report.id}
                        href={"/reports?detail=" + report.id}
                    >
                        <span
                            className={
                                "report-symbol " +
                                (report.category === "paper"
                                    ? "report-paper"
                                    : "")
                            }
                        >
                            <Recycle size={19} />
                        </span>
                        <div className="sw-recent-text">
                            <strong>
                                {reportLabels[
                                    report.category ??
                                        report.prediction?.label ??
                                        ""
                                ] ?? report.description}
                            </strong>
                            <small>
                                #{report.number.slice(0, 8)} ·{" "}
                                {dateLabel(report.created_at)}
                            </small>
                        </div>
                        <Status value={report.status} />
                        <ChevronRight size={14} />
                    </Link>
                ))}
                {!rows.length && (
                    <p className="sw-empty">
                        {loading ? "Memuat laporan…" : "Belum ada laporan."}
                    </p>
                )}
            </div>
            <p className="sw-recent-caption">
                <MapPin size={12} />
                Data laporan dari workspace Smart Waste
            </p>
        </Card>
    );
}
