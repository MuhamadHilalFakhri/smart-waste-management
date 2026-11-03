import { useEffect, useState, type FormEvent } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Shell from "@/features/waste/shell";
import { useData, useAction } from "@/features/waste/use-data";
import { Notice, Pagination } from "@/features/waste/common";
import { api } from "@/features/waste/api";
import type { Account, UserPage } from "@/features/waste/types";
import UserStats from "@/features/waste/users/user-stats";
import UserTable from "@/features/waste/users/user-table";
import UserEditor from "@/features/waste/users/user-editor";
export default function UsersPage() {
    const [query, setQuery] = useState("");
    const [draft, setDraft] = useState("");
    const [page, setPage] = useState(1);
    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(draft);
            setPage(1);
        }, 350);
        return () => clearTimeout(timer);
    }, [draft]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Account>();
    const list = useData<UserPage>(
        "users?" + new URLSearchParams({ search: query, page: String(page) }),
    );
    const action = useAction();
    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setQuery(String(new FormData(event.currentTarget).get("search") ?? ""));
        setPage(1);
    }
    function editor(user?: Account) {
        action.clear();
        setEditing(user);
        setOpen(true);
    }
    function save(data: Record<string, unknown>) {
        void action.run(async () => {
            await api("users" + (editing ? "/" + editing.id : ""), {
                method: editing ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            setOpen(false);
            await list.reload();
        });
    }
    return (
        <Shell title="Manajemen pengguna">
            <div className="sw-intro">
                <p className="sw-muted">
                    Kelola orang-orang di workspace Anda.
                </p>
                <Button className="sw-primary-button" onClick={() => editor()}>
                    <Plus />
                    Tambah pengguna
                </Button>
            </div>
            <Notice
                error={list.error || (!open ? action.error : "")}
                notice={action.notice}
            />
            {list.data && <UserStats counts={list.data.counts} />}
            <section className="table-section sw-user-table">
                <div className="table-heading">
                    <h2 className="sw-section-title">
                        Daftar pengguna{" "}
                        <span className="count-badge">
                            {list.data?.total ?? 0}
                        </span>
                    </h2>
                    <form
                        className="sw-search sw-user-search"
                        onSubmit={search}
                    >
                        <Search size={15} />
                        <Input
                            name="search"
                            aria-label="Cari pengguna"
                            placeholder="Cari nama atau email"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                        />
                    </form>
                </div>
                <UserTable
                    rows={list.data?.data ?? []}
                    loading={list.loading}
                    onEdit={editor}
                />
                {list.data && (
                    <Pagination
                        noun="pengguna"
                        page={list.data}
                        onPage={setPage}
                        busy={action.busy}
                    />
                )}
            </section>
            <UserEditor
                open={open}
                user={editing}
                busy={action.busy}
                error={action.error}
                onClose={() => setOpen(false)}
                onSave={save}
            />
        </Shell>
    );
}
