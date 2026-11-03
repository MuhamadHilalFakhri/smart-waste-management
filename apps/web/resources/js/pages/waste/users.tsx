import { useEffect, useState, type FormEvent } from "react";
import Shell from "@/features/waste/shell";
import { api, type Page } from "@/features/waste/api";
type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
};
export default function Users() {
    const [users, setUsers] = useState<Page<User>>();
    const [edit, setEdit] = useState<User>();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const load = (p = 1) =>
        api<Page<User>>("users?page=" + p)
            .then(setUsers)
            .catch((e) => setError(e.message));
    useEffect(() => {
        void load();
    }, []);
    async function save(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget));
        setBusy(true);
        try {
            await api("users" + (edit ? "/" + edit.id : ""), {
                method: edit ? "PATCH" : "POST",
                body: JSON.stringify({
                    ...d,
                    is_active: d.is_active === "true",
                }),
            });
            setOpen(false);
            await load();
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setBusy(false);
        }
    }
    return (
        <Shell title="Manajemen pengguna">
            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}
            <button
                onClick={() => {
                    setEdit(undefined);
                    setOpen(true);
                }}
            >
                Tambah pengguna
            </button>
            {open && (
                <form className="panel" onSubmit={save} key={edit?.id ?? "new"}>
                    <label>
                        Nama
                        <input name="name" defaultValue={edit?.name} required />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            defaultValue={edit?.email}
                            required
                        />
                    </label>
                    <label>
                        Kata sandi {edit && "(kosongkan jika tetap)"}
                        <input
                            type="password"
                            name="password"
                            minLength={8}
                            required={!edit}
                        />
                    </label>
                    <label>
                        Role
                        <select name="role" defaultValue={edit?.role ?? "user"}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    <label>
                        Akses
                        <select
                            name="is_active"
                            defaultValue={String(edit?.is_active ?? true)}
                        >
                            <option value="true">Aktif</option>
                            <option value="false">Nonaktif</option>
                        </select>
                    </label>
                    <div className="row">
                        <button disabled={busy}>Simpan pengguna</button>
                        <button type="button" onClick={() => setOpen(false)}>
                            Batal
                        </button>
                    </div>
                </form>
            )}
            <div className="panel table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Akses</th>
                            <th>Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.data.map((u) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>{u.is_active ? "Aktif" : "Nonaktif"}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setEdit(u);
                                            setOpen(true);
                                        }}
                                    >
                                        Ubah
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users && (
                    <div className="row">
                        <button
                            disabled={users.current_page === 1}
                            onClick={() => void load(users.current_page - 1)}
                        >
                            Sebelumnya
                        </button>
                        <span>
                            {users.current_page} / {users.last_page}
                        </span>
                        <button
                            disabled={users.current_page === users.last_page}
                            onClick={() => void load(users.current_page + 1)}
                        >
                            Berikutnya
                        </button>
                    </div>
                )}
            </div>
        </Shell>
    );
}
