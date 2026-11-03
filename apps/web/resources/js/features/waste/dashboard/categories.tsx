import { Card } from "@/components/ui/card";
import { categories } from "../api";
import type { Statistics } from "../types";
const colors = ["#3e7651", "#a5bd73", "#d7e3c2", "#e5eae3"];
export default function CategoryChart({ data }: { data: Statistics }) {
    const rows = [
        ...Object.entries(categories).map(([key, label], index) => ({
            label,
            count:
                data.categories.find((row) => row.category === key)?.total ?? 0,
            color: colors[index],
        })),
        {
            label: "Belum dikategorikan",
            count: data.categories
                .filter((row) => !row.category || !categories[row.category])
                .reduce((sum, row) => sum + row.total, 0),
            color: colors[3],
        },
    ];
    const total = rows.reduce((sum, row) => sum + row.count, 0);
    let offset = 0;
    const stops = rows.map((row) => {
        const start = offset;
        offset += total ? (row.count / total) * 100 : 0;
        return `${row.color} ${start}% ${offset}%`;
    });
    return (
        <Card className="dashboard-card">
            <h2 className="sw-section-title">Distribusi kategori</h2>
            <p className="sw-muted mt-1">
                Kategori pilihan dan hasil klasifikasi AI.
            </p>
            <div className="sw-category-content">
                <div
                    className="sw-donut"
                    aria-hidden="true"
                    style={{
                        background: total
                            ? `conic-gradient(${stops.join(",")})`
                            : "#edf1e9",
                    }}
                >
                    <div className="sw-donut-hole">
                        <strong>{total}</strong>
                        <span>laporan</span>
                    </div>
                </div>
                <div className="sw-legend">
                    {rows.map((row) => (
                        <div key={row.label}>
                            <span
                                className="sw-dot"
                                style={{ background: row.color }}
                            />
                            {row.label}
                            <strong>{row.count}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
