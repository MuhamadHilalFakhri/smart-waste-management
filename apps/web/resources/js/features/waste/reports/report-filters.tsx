import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextField, Choice } from "../common";
import { statuses, categories } from "../api";
export default function ReportFilters({
    query,
    onApply,
}: {
    query: URLSearchParams;
    onApply: (params: URLSearchParams) => void;
}) {
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const params = new URLSearchParams();
        new FormData(event.currentTarget).forEach((value, key) => {
            if (value && value !== "_none") params.set(key, String(value));
        });
        onApply(params);
    }
    return (
        <form key={query.toString()} onSubmit={submit} className="sw-filters">
            <div className="sw-field">
                <Label htmlFor="search">Cari laporan</Label>
                <div className="sw-search">
                    <Search size={15} />
                    <Input
                        id="search"
                        name="search"
                        placeholder="Nomor atau deskripsi"
                        defaultValue={query.get("search") ?? ""}
                    />
                </div>
            </div>
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
            <TextField
                label="Dari"
                id="from"
                name="from"
                type="date"
                defaultValue={query.get("from") ?? ""}
            />
            <TextField
                label="Sampai"
                id="to"
                name="to"
                type="date"
                defaultValue={query.get("to") ?? ""}
            />
            <Button type="submit">Terapkan</Button>
        </form>
    );
}
