import { api, categories, statuses, type Page, type Report } from "../api";
function cell(input: unknown) {
    const value = String(input ?? "");
    const safe = /^[=+@\-\t\r]/.test(value) ? "'" + value : value;
    return '"' + safe.replaceAll('"', '""') + '"';
}
export async function exportReports(query: URLSearchParams) {
    const rows: Report[] = [];
    const params = new URLSearchParams(query);
    let page = 1;
    let last = 1;
    do {
        params.set("page", String(page));
        const result = await api<Page<Report>>("reports?" + params);
        rows.push(...result.data);
        last = result.last_page;
        page++;
    } while (page <= last);
    const content = [
        [
            "Nomor",
            "Deskripsi",
            "Kategori",
            "Status",
            "Tanggal",
            "Latitude",
            "Longitude",
        ],
        ...rows.map((report) => [
            report.number,
            report.description,
            categories[report.category ?? ""] ?? "",
            statuses[report.status],
            report.created_at,
            report.latitude,
            report.longitude,
        ]),
    ]
        .map((row) => row.map(cell).join(","))
        .join("\r\n");
    const url = URL.createObjectURL(
        new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "laporan-sampah.csv";
    link.click();
    URL.revokeObjectURL(url);
}
