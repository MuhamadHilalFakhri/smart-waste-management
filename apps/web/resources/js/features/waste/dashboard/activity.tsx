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
            total: Number(
                data.trend.find((item) => item.date === date)?.total ?? 0,
            ),
        };
    });
    const max = Math.max(3, ...days.map((day) => day.total));
    const activeDays = days.flatMap((day, index) => (day.total ? [index] : []));
    const minimumGap =
        activeDays.length < 2
            ? 30
            : Math.min(
                  ...activeDays
                      .slice(1)
                      .map((day, index) => day - activeDays[index]),
              );
    const label = (date: string) =>
        new Date(date + "T12:00:00").toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });
    return (
        <Card className="dashboard-card sw-activity-card">
            <div className="sw-card-heading">
                <h2 className="sw-section-title">Aktivitas laporan</h2>
                <span>30 hari terakhir</span>
            </div>
            <p className="sw-activity-total">
                <strong>{days.reduce((sum, day) => sum + day.total, 0)}</strong>
                laporan masuk
            </p>
            <div className="sw-chart-wrap">
                <div className="sw-chart-ticks">
                    {[
                        max,
                        Math.round((max * 2) / 3),
                        Math.round(max / 3),
                        0,
                    ].map((value, index) => (
                        <span key={index}>{value}</span>
                    ))}
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
                            {day.total > 0 && (
                                <div
                                    className="sw-chart-bar"
                                    style={{
                                        height: `${(day.total / max) * 100}%`,
                                        width: `min(26px, calc(${minimumGap * 100}% - 3px))`,
                                    }}
                                >
                                    <span>{day.total}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="sw-chart-axis">
                {[0, 10, 20, 29].map((index) => (
                    <span key={index}>{label(days[index].date)}</span>
                ))}
            </div>
        </Card>
    );
}
