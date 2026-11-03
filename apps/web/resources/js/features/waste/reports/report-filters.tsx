import type { FormEvent } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextField, Choice } from "../common";
import { statuses, categories } from "../api";
export default function ReportFilters({
    query,
    onApply,
}: {
    query: URLSearchParams;
    onApply: (params: URLSearchParams) => void;
}) {
    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const params = new URLSearchParams();
        new FormData(e.currentTarget).forEach((value, key) => {
            if (value && value !== "_none") params.set(key, String(value));
        });
        onApply(params);
    }
    return (
        <Card className="dashboard-card sw-filters-card">
            <form key={query.toString()} onSubmit={submit}>
                <div className="sw-filter">
                    <TextField
                        label="Cari laporan"
                        id="search"
                        name="search"
                        placeholder="Nomor atau deskripsi"
                        defaultValue={query.get("search") ?? ""}
                    />
                    <Choice
                        label="Status"
                        name="status"
                        options={statuses}
                        allLabel="Semua status"
                        defaultValue={query.get("status") ?? undefined}
                    />
                    <Choice
                        label="Kategori"
                        name="category"
                        options={categories}
                        allLabel="Semua kategori"
                        defaultValue={query.get("category") ?? undefined}
                    />
                </div>
                <div className="sw-filter-dates">
                    <TextField
                        label="Dari tanggal"
                        id="from"
                        name="from"
                        type="date"
                        defaultValue={query.get("from") ?? ""}
                    />
                    <TextField
                        label="Sampai tanggal"
                        id="to"
                        name="to"
                        type="date"
                        defaultValue={query.get("to") ?? ""}
                    />
                    <Button type="submit">
                        <Search />
                        Terapkan
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onApply(new URLSearchParams())}
                    >
                        <RotateCcw />
                        Reset
                    </Button>
                </div>
            </form>
        </Card>
    );
}
