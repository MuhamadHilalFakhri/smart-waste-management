import { FileText, Clock, LoaderCircle, CheckCircle2, Ban } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Statistics } from "../types";
export default function Stats({ data }: { data: Statistics }) {
    const items = [
        {
            label: "Pending",
            value: data.statuses.pending ?? 0,
            icon: Clock,
            tone: "pending",
        },
        {
            label: "In Progress",
            value: data.statuses.in_progress ?? 0,
            icon: LoaderCircle,
            tone: "progress",
        },
        {
            label: "Completed",
            value: data.statuses.completed ?? 0,
            icon: CheckCircle2,
            tone: "success",
        },
        {
            label: "Rejected",
            value: data.statuses.rejected ?? 0,
            icon: Ban,
            tone: "rejected",
        },
    ];
    const todayCount =
        data.trend.find(
            (row) => row.date === new Date().toLocaleDateString("sv-SE"),
        )?.total ?? 0;
    const today = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div className="sw-stat-grid">
            <Card className="dashboard-card sw-stat-total">
                <div className="sw-stat-label">
                    Total laporan
                    <FileText size={18} />
                </div>
                <div className="sw-total-value">
                    <strong>{data.total}</strong>
                    <span>laporan</span>
                </div>
                <p>
                    <time>{today}</time>
                    <span>{todayCount} tercatat hari ini</span>
                </p>
            </Card>
            {items.map(({ label, value, icon: Icon, tone }) => (
                <Card className="dashboard-card sw-stat-small" key={label}>
                    <span className={"sw-stat-icon tone-" + tone}>
                        <Icon size={15} />
                    </span>
                    <p className="sw-stat-label">{label}</p>
                    <div className="sw-stat-value">
                        <strong>{value}</strong>
                        <span>laporan</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}
