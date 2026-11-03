import { ScrollDialogContent as DialogContent } from "../scroll-dialog";
import type { FormEvent } from "react";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notice, TextField, Choice } from "../common";
import type { Account } from "../types";
export default function UserEditor({
    open,
    user,
    busy,
    error,
    onClose,
    onSave,
}: {
    open: boolean;
    user?: Account;
    busy: boolean;
    error: string;
    onClose: () => void;
    onSave: (data: Record<string, unknown>) => void;
}) {
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        onSave({ ...data, is_active: data.is_active === "true" });
    }
    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value && !busy) onClose();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {user ? "Ubah pengguna" : "Tambah pengguna"}
                    </DialogTitle>
                    <DialogDescription>
                        Perubahan disimpan ke akun pengguna. Penonaktifan
                        mencabut token aplikasi.
                    </DialogDescription>
                </DialogHeader>
                <form
                    key={user?.id ?? "new"}
                    className="editor-form"
                    onSubmit={submit}
                >
                    <Notice error={error} />
                    <TextField
                        label="Nama"
                        id="name"
                        name="name"
                        required
                        maxLength={100}
                        defaultValue={user?.name}
                    />
                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        required
                        defaultValue={user?.email}
                    />
                    <TextField
                        label={user ? "Password baru (opsional)" : "Password"}
                        id="password"
                        name="password"
                        type="password"
                        minLength={8}
                        required={!user}
                        autoComplete="new-password"
                    />
                    <p className="sw-muted">
                        Minimal 8 karakter.
                        {user
                            ? " Kosongkan untuk mempertahankan password."
                            : ""}
                    </p>
                    <div className="sw-form-grid">
                        <Choice
                            label="Role"
                            name="role"
                            options={{ user: "User", admin: "Admin" }}
                            defaultValue={user?.role ?? "user"}
                        />
                        <Choice
                            label="Akses"
                            name="is_active"
                            options={{ true: "Aktif", false: "Nonaktif" }}
                            defaultValue={String(user?.is_active ?? true)}
                        />
                    </div>
                    <div className="sw-actions justify-end">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={onClose}
                            disabled={busy}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={busy}>
                            {busy ? "Menyimpan…" : "Simpan pengguna"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
