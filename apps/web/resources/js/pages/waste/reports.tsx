import { useEffect, useState, type FormEvent } from "react";
import { usePage } from "@inertiajs/react";
import Shell from "@/features/waste/shell";
import {
    api,
    statuses,
    categories,
    type Report,
    type Page,
} from "@/features/waste/api";
export default function Reports() {
    const [page, setPage] = useState<Page<Report>>();
    const [selected, setSelected] = useState<Report>();
    const [editing, setEditing] = useState<Report>();
    const [formOpen, setFormOpen] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [busy, setBusy] = useState(false);
    const [query, setQuery] = useState("");
    const { auth } = usePage().props as unknown as {
        auth: { user: { role: string } };
    };
    const load = (q = query) =>
        api<Page<Report>>("reports?" + q)
            .then(setPage)
            .catch((e) => setError(e.message));
    useEffect(() => {
        void load();
    }, [query]);
    const act = async (fn: () => Promise<unknown>) => {
        setBusy(true);
        setError("");
        try {
            await fn();
            setNotice("Perubahan tersimpan.");
            await load();
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setBusy(false);
        }
    };
    function filters(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const nextQuery = new URLSearchParams(
            new FormData(e.currentTarget) as unknown as Record<string, string>,
        ).toString();
        if (nextQuery === query) void load(nextQuery);
        else setQuery(nextQuery);
    }
    function save(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        if (editing) d.set("_method", "PUT");
        void act(async () => {
            await api("reports" + (editing ? "/" + editing.id : ""), {
                method: "POST",
                body: d,
            });
            setFormOpen(false);
            setSelected(undefined);
        });
    }
    return (
        <Shell title="Laporan sampah">
            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}
            {notice && (
                <p className="notice" role="status">
                    {notice}
                </p>
            )}
            <div className="panel">
                <form className="filters" onSubmit={filters}>
                    <label>
                        Cari laporan
                        <input
                            name="search"
                            placeholder="Nomor atau deskripsi"
                        />
                    </label>
                    <label>
                        Status
                        <select name="status">
                            <option value="">Semua status</option>
                            {Object.entries(statuses).map(([k, v]) => (
                                <option key={k} value={k}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Kategori
                        <select name="category">
                            <option value="">Semua kategori</option>
                            {Object.entries(categories).map(([k, v]) => (
                                <option key={k} value={k}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Dari
                        <input type="date" name="from" />
                    </label>
                    <label>
                        Sampai
                        <input type="date" name="to" />
                    </label>
                    <button>Terapkan</button>
                </form>
            </div>
            <button
                onClick={() => {
                    setEditing(undefined);
                    setFormOpen(true);
                }}
            >
                Buat laporan
            </button>
            {formOpen && (
                <section className="panel">
                    <h2>{editing ? "Ubah laporan" : "Laporan baru"}</h2>
                    <form onSubmit={save} key={editing?.id ?? "new"}>
                        <label>
                            Foto
                            <input
                                type="file"
                                name="photo"
                                accept="image/jpeg,image/png,image/webp"
                                required={!editing}
                            />
                        </label>
                        <label>
                            Deskripsi
                            <textarea
                                name="description"
                                defaultValue={editing?.description}
                                minLength={10}
                                maxLength={5000}
                                required
                            />
                        </label>
                        <div className="row">
                            <label>
                                Latitude
                                <input
                                    id="lat"
                                    name="latitude"
                                    type="number"
                                    step="any"
                                    min={-90}
                                    max={90}
                                    defaultValue={editing?.latitude}
                                    required
                                />
                            </label>
                            <label>
                                Longitude
                                <input
                                    id="lng"
                                    name="longitude"
                                    type="number"
                                    step="any"
                                    min={-180}
                                    max={180}
                                    defaultValue={editing?.longitude}
                                    required
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() =>
                                    navigator.geolocation.getCurrentPosition(
                                        (p) => {
                                            (
                                                document.getElementById(
                                                    "lat",
                                                ) as HTMLInputElement
                                            ).value = String(p.coords.latitude);
                                            (
                                                document.getElementById(
                                                    "lng",
                                                ) as HTMLInputElement
                                            ).value = String(
                                                p.coords.longitude,
                                            );
                                        },
                                        () =>
                                            setError(
                                                "Lokasi gagal diperoleh. Aktifkan izin lokasi atau isi koordinat.",
                                            ),
                                    )
                                }
                            >
                                Ambil GPS
                            </button>
                        </div>
                        <label>
                            Kategori pilihan
                            <select
                                name="category"
                                defaultValue={editing?.category ?? ""}
                            >
                                <option value="">Belum dipilih</option>
                                {Object.entries(categories).map(([k, v]) => (
                                    <option key={k} value={k}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <p className="muted">
                            Saran AI akan tersedia setelah laporan dikirim.
                        </p>
                        <div className="row">
                            <button disabled={busy}>Simpan laporan</button>
                            <button
                                type="button"
                                onClick={() => setFormOpen(false)}
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </section>
            )}
            {selected && (
                <section className="panel">
                    <button onClick={() => setSelected(undefined)}>
                        Tutup detail
                    </button>
                    <h2>{selected.number}</h2>
                    <img
                        className="photo"
                        src={"/data/reports/" + selected.id + "/photo"}
                        alt="Foto sampah yang dilaporkan"
                    />
                    <p>{selected.description}</p>
                    <p>
                        {statuses[selected.status]} · {selected.latitude},{" "}
                        {selected.longitude}
                    </p>
                    <p>
                        Kategori pilihan:{" "}
                        {categories[selected.category ?? ""] ?? "Belum dipilih"}
                    </p>
                    <p>
                        Saran AI:{" "}
                        {selected.prediction?.status === "succeeded"
                            ? `${categories[selected.prediction.label ?? ""]} (${((selected.prediction.confidence ?? 0) * 100).toFixed(1)}%)`
                            : selected.prediction?.status === "failed"
                              ? "Prediksi gagal"
                              : "Menunggu prediksi"}
                    </p>
                    <div className="row">
                        {(auth.user.role === "admin" ||
                            selected.status === "pending") && (
                            <>
                                <button
                                    onClick={() => {
                                        setEditing(selected);
                                        setFormOpen(true);
                                    }}
                                >
                                    Ubah
                                </button>
                                <button
                                    disabled={busy}
                                    onClick={() => {
                                        if (confirm("Hapus laporan ini?"))
                                            void act(async () => {
                                                await api(
                                                    "reports/" + selected.id,
                                                    { method: "DELETE" },
                                                );
                                                setSelected(undefined);
                                            });
                                    }}
                                >
                                    Hapus
                                </button>
                                <button
                                    disabled={busy}
                                    onClick={() =>
                                        void act(() =>
                                            api(
                                                "reports/" +
                                                    selected.id +
                                                    "/predict",
                                                { method: "POST" },
                                            ),
                                        )
                                    }
                                >
                                    Ulangi prediksi
                                </button>
                            </>
                        )}
                    </div>
                    {auth.user.role === "admin" &&
                        ["pending", "in_progress"].includes(
                            selected.status,
                        ) && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const d = Object.fromEntries(
                                        new FormData(e.currentTarget),
                                    );
                                    void act(async () => {
                                        await api(
                                            "reports/" +
                                                selected.id +
                                                "/status",
                                            {
                                                method: "PATCH",
                                                body: JSON.stringify(d),
                                            },
                                        );
                                        setSelected(
                                            await api<Report>(
                                                "reports/" + selected.id,
                                            ),
                                        );
                                    });
                                }}
                            >
                                <label>
                                    Status baru
                                    <select name="status">
                                        {selected.status === "pending" ? (
                                            <option value="in_progress">
                                                In Progress
                                            </option>
                                        ) : (
                                            <option value="completed">
                                                Completed
                                            </option>
                                        )}
                                        <option value="rejected">
                                            Rejected
                                        </option>
                                    </select>
                                </label>
                                <label>
                                    Catatan / alasan penolakan
                                    <textarea name="note" />
                                </label>
                                <button disabled={busy}>Perbarui status</button>
                            </form>
                        )}
                    <h2>Histori status</h2>
                    {selected.histories?.map((h) => (
                        <p key={h.id}>
                            {statuses[h.to_status]} ·{" "}
                            {new Date(h.created_at).toLocaleString("id-ID")}{" "}
                            {h.note}
                        </p>
                    ))}
                </section>
            )}
            <section className="panel">
                {!page ? (
                    <p>Memuat laporan...</p>
                ) : !page.data.length ? (
                    <p>Belum ada laporan yang sesuai filter.</p>
                ) : (
                    <>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Laporan</th>
                                        <th>Deskripsi</th>
                                        <th>Status</th>
                                        <th>Kategori</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {page.data.map((r) => (
                                        <tr key={r.id}>
                                            <td>
                                                {r.number.slice(0, 8)}
                                                <small>
                                                    {new Date(
                                                        r.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                    )}
                                                </small>
                                            </td>
                                            <td>
                                                {r.description.slice(0, 100)}
                                            </td>
                                            <td>{statuses[r.status]}</td>
                                            <td>
                                                {categories[r.category ?? ""] ??
                                                    "Belum dipilih"}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        void api<Report>(
                                                            "reports/" + r.id,
                                                        )
                                                            .then(setSelected)
                                                            .catch((e) =>
                                                                setError(
                                                                    e.message,
                                                                ),
                                                            )
                                                    }
                                                >
                                                    Lihat
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <button
                                disabled={page.current_page === 1}
                                onClick={() => {
                                    const p = new URLSearchParams(query);
                                    p.set(
                                        "page",
                                        String(page.current_page - 1),
                                    );
                                    setQuery(p.toString());
                                }}
                            >
                                Sebelumnya
                            </button>
                            <p>
                                Halaman {page.current_page} / {page.last_page}
                            </p>
                            <button
                                disabled={page.current_page === page.last_page}
                                onClick={() => {
                                    const p = new URLSearchParams(query);
                                    p.set(
                                        "page",
                                        String(page.current_page + 1),
                                    );
                                    setQuery(p.toString());
                                }}
                            >
                                Berikutnya
                            </button>
                        </div>
                    </>
                )}
            </section>
        </Shell>
    );
}
