import { useEffect, useState } from "react";
import Shell from "@/features/waste/shell";
import { api, statuses, categories } from "@/features/waste/api";
type Stats = {
    total: number;
    statuses: Record<string, number>;
    categories: { category: string | null; total: number }[];
    trend: { date: string; total: number }[];
};
export default function Dashboard() {
    const [data, setData] = useState<Stats>();
    const [error, setError] = useState("");
    useEffect(() => {
        api<Stats>("dashboard")
            .then(setData)
            .catch((e) => setError(e.message));
    }, []);
    return (
        <Shell title="Ringkasan laporan">
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {!data && !error && <p>Memuat statistik...</p>}
            {data && (
                <>
                    <div className="stats">
                        <div className="stat">
                            Total laporan<strong>{data.total}</strong>
                        </div>
                        {Object.entries(statuses).map(([key, label]) => (
                            <div className="stat" key={key}>
                                {label}
                                <strong>{data.statuses[key] ?? 0}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="two-col">
                        <section className="panel">
                            <h2>Kategori pilihan pelapor</h2>
                            {data.categories.length ? (
                                data.categories.map((c) => (
                                    <div key={c.category ?? "none"}>
                                        {categories[c.category ?? ""] ??
                                            "Belum dipilih"}{" "}
                                        <b>{c.total}</b>
                                        <div
                                            className="bar"
                                            style={{
                                                width:
                                                    Math.max(
                                                        1,
                                                        (c.total /
                                                            Math.max(
                                                                data.total,
                                                                1,
                                                            )) *
                                                            100,
                                                    ) + "%",
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="muted">Belum ada laporan.</p>
                            )}
                        </section>
                        <section className="panel">
                            <h2>Aktivitas 30 hari terakhir</h2>
                            {data.trend.length ? (
                                data.trend.map((t) => (
                                    <p key={t.date}>
                                        {t.date}: <b>{t.total} laporan</b>
                                    </p>
                                ))
                            ) : (
                                <p className="muted">Belum ada aktivitas.</p>
                            )}
                        </section>
                    </div>
                    <a className="button" href="/reports">
                        Buka laporan
                    </a>
                </>
            )}
        </Shell>
    );
}
