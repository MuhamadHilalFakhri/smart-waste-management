import { ScrollDialogContent as DialogContent } from "../scroll-dialog";
import type { FormEvent } from "react";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TextField, Choice, Notice } from "../common";
import { categories, type Report } from "../api";
import LocationFields from "./location-fields";
import { useConfirmation } from "../use-confirmation";
export default function ReportEditor({
    open,
    report,
    busy,
    error,
    onClose,
    onSave,
}: {
    open: boolean;
    report?: Report;
    busy: boolean;
    error: string;
    onClose: () => void;
    onSave: (data: FormData) => void;
}) {
    const confirmation = useConfirmation();
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("category") === "_none") data.set("category", "");
        const photo = data.get("photo");
        if (photo instanceof File && !photo.size) data.delete("photo");
        if (!busy)
            confirmation.ask(
                report
                    ? "Simpan perubahan pada laporan ini?"
                    : "Kirim laporan beserta foto dan lokasi yang telah diisi?",
                () => onSave(data),
                event.currentTarget,
            );
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
                        {report ? "Ubah laporan" : "Buat laporan sampah"}
                    </DialogTitle>
                    <DialogDescription>
                        Tambahkan foto, lokasi, dan deskripsi temuan Anda.
                    </DialogDescription>
                </DialogHeader>
                <form
                    noValidate
                    className="editor-form"
                    key={report?.id ?? "new"}
                    onSubmit={submit}
                >
                    <Notice error={error} />
                    <TextField
                        label={report ? "Ganti foto (opsional)" : "Foto sampah"}
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        required={!report}
                    />
                    <p className="sw-muted">
                        JPEG, PNG, atau WebP. Maksimal 5 MB.
                    </p>
                    <div className="sw-field">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            minLength={10}
                            maxLength={5000}
                            rows={4}
                            defaultValue={report?.description}
                            placeholder="Jelaskan kondisi dan lokasi sampah."
                        />
                    </div>
                    <LocationFields report={report} />
                    <Choice
                        label="Kategori pilihan (opsional)"
                        name="category"
                        options={categories}
                        allLabel="Gunakan saran AI"
                        defaultValue={report?.category ?? undefined}
                    />
                    <p className="sw-muted">
                        AI memproses foto setelah laporan tersimpan. Kategori
                        yang Anda pilih selalu didahulukan.
                    </p>
                    <div className="sw-actions justify-end">
                        <Button
                            variant="outline"
                            type="button"
                            disabled={busy}
                            onClick={onClose}
                        >
                            Batal
                        </Button>
                        <Button disabled={busy} type="submit">
                            {busy ? "Menyimpan…" : "Simpan laporan"}
                        </Button>
                    </div>
                </form>
                {confirmation.dialog}
            </DialogContent>
        </Dialog>
    );
}
