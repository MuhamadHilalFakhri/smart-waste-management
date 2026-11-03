import { Card } from "@/components/ui/card";
import type { Statistics } from "../types";
export default function Activity({ data }: { data: Statistics }) {
    const days = Array.from({ length: 30 }, (_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - 29 + i);
        const date = [
            day.getFullYear(),
            String(day.getMonth() + 1).padStart(2, "0"),
            String(day.getDate()).padStart(2, "0"),
        ].join("-");
        return {
            date,
            total: data.trend.find((item) => item.date === date)?.total ?? 0,
        };
    });
    const max = Math.max(1, ...days.map((day) => day.total));
    return (
        <Card className="dashboard-card mb-6">
            <div className="sw-actions justify-between">
                <div>
                    <h2 className="sw-section-title">Aktivitas laporan</h2>
                    <p className="sw-muted mt-1">
                        {days.reduce((sum, day) => sum + day.total, 0)} laporan
                        dalam 30 hari terakhir.
                    </p>
                </div>
                <span className="sw-muted">30 hari terakhir</span>
            </div>
            <div
                className="sw-chart"
                role="img"
                aria-label={days
                    .map((day) => `${day.date}: ${day.total} laporan`)
                    .join("; ")}
            >
                {days.map((day) => (
                    <div
                        className="sw-chart-day"
                        key={day.date}
                        title={`${day.date}: ${day.total} laporan`}
                    >
                        <div
                            className="sw-chart-bar"
                            style={{
                                height: `${(day.total / max) * 100}%`,
                                opacity: day.total ? 1 : 0.25,
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="sw-chart-axis">
                <span>{days[0].date}</span>
                <span>{days[29].date}</span>
            </div>
        </Card>
    );
}
