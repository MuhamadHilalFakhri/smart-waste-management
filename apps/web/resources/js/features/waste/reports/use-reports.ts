import { useEffect, useState } from "react";
import { api, type Page, type Report } from "../api";
import { useData, useAction } from "../use-data";
export default function useReports() {
    const [query, setQuery] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        params.delete("buat");
        params.delete("detail");
        return params;
    });
    const list = useData<Page<Report>>("reports?" + query);
    const action = useAction();
    const [selected, setSelected] = useState<Report>();
    const [editing, setEditing] = useState<Report>();
    const [open, setOpen] = useState(
        () =>
            new URLSearchParams(window.location.search).get("buat") === "true",
    );
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("detail");
        if (id && /^\d+$/.test(id))
            void action.run(
                async () => setSelected(await api<Report>("reports/" + id)),
                "",
            );
    }, []);
    function select(report: Report) {
        action.clear();
        void action.run(
            async () => setSelected(await api<Report>("reports/" + report.id)),
            "",
        );
    }
    function create() {
        action.clear();
        setEditing(undefined);
        setSelected(undefined);
        setOpen(true);
    }
    function edit() {
        action.clear();
        setEditing(selected);
        setSelected(undefined);
        setOpen(true);
    }
    async function mutate(
        fn: () => Promise<unknown>,
        close = false,
        message = "Perubahan laporan berhasil disimpan.",
    ) {
        await action.run(async () => {
            await fn();
            await list.reload();
            if (close) {
                setSelected(undefined);
                setOpen(false);
            } else if (selected)
                setSelected(await api<Report>("reports/" + selected.id));
        }, message);
    }
    function save(data: FormData) {
        if (editing) data.set("_method", "PUT");
        void mutate(
            () =>
                api("reports" + (editing ? "/" + editing.id : ""), {
                    method: "POST",
                    body: data,
                }),
            true,
        );
    }
    function page(value: number) {
        const params = new URLSearchParams(query);
        params.set("page", String(value));
        setQuery(params);
    }
    return {
        list,
        action,
        query,
        setQuery,
        selected,
        setSelected,
        editing,
        open,
        setOpen,
        select,
        create,
        edit,
        mutate,
        save,
        page,
    };
}
