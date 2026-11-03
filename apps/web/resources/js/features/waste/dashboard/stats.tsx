import {
    FileText,
    Clock,
    LoaderCircle,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Statistics } from "../types";
export default function Stats({ data }: { data: Statistics }) {
    const items = [
        {
            label: "Total laporan",
            value: data.total,
            icon: FileText,
            total: true,
        },
        { label: "Pending", value: data.statuses.pending ?? 0, icon: Clock },
        {
            label: "In Progress",
            value: data.statuses.in_progress ?? 0,
            icon: LoaderCircle,
        },
        {
            label: "Completed",
            value: data.statuses.completed ?? 0,
            icon: CheckCircle2,
        },
        {
            label: "Rejected",
            value: data.statuses.rejected ?? 0,
            icon: XCircle,
        },
    ];
    return (
        <div className="sw-stat-grid">
            {items.map(({ label, value, icon: Icon, total }) => (
                <Card
                    className={
                        "dashboard-card " + (total ? "sw-stat-total" : "")
                    }
                    key={label}
                >
                    <div className="sw-stat-label">
                        {label}
                        <Icon size={16} />
                    </div>
                    <strong className="sw-stat-number">
                        {value.toLocaleString("id-ID")}
                    </strong>
                </Card>
            ))}
        </div>
    );
}
