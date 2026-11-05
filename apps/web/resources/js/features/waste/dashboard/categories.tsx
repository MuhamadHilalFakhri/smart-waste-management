import { Droplet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { categories } from "../api";
import type { Statistics } from "../types";
const colors = ["var(--foreground)", "#52639f", "#8a96c2", "#c3c9dc"];
export default function CategoryChart({ data }: { data: Statistics }) {
    const rows = data.categories
        .filter((row) => Number(row.total) > 0)
        .sort((a, b) => Number(b.total) - Number(a.total))
        .map((row, index) => ({
            label: categories[row.category ?? ""] ?? "Belum dipilih",
            count: Number(row.total),
            color: colors[index % colors.length],
        }));
    const total = rows.reduce((sum, row) => sum + row.count, 0);
    let offset = 0;
    const stops = rows.map((row) => {
        const start = offset;
        offset += total ? (row.count / total) * 100 : 0;
        return `${row.color} ${start}% ${offset}%`;
    });
    return (
        <Card className="dashboard-card sw-category-card">
            <div className="sw-card-heading">
                <h2 className="sw-section-title">Kategori pilihan pelapor</h2>
                <span>{total} laporan</span>
            </div>
            <div className="sw-category-content">
                <div
                    className="sw-donut"
                    aria-hidden="true"
                    style={{
                        background: total
                            ? `conic-gradient(${stops.join(",")})`
                            : "var(--border)",
                    }}
                >
                    <div className="sw-donut-hole">
                        <Droplet size={24} />
                        <strong>{total}</strong>
                        <span>Total laporan</span>
                    </div>
                </div>
                <div className="sw-legend">
                    {rows.map((row) => (
                        <div className="sw-category-row" key={row.label}>
                            <span>
                                <i
                                    className="sw-dot"
                                    style={{ background: row.color }}
                                />
                                {row.label}
                            </span>
                            <strong>{row.count}</strong>
                            <span>
                                {Math.round((row.count / total) * 100)}%
                            </span>
                        </div>
                    ))}
                    <p>
                        Kategori terbanyak
                        <strong>{rows[0]?.label ?? "Belum ada laporan"}</strong>
                    </p>
                </div>
            </div>
        </Card>
    );
}
