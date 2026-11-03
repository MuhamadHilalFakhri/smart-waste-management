import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Choice } from "../common";
import type { Report } from "../api";
export default function StatusForm({
    report,
    busy,
    onUpdate,
}: {
    report: Report;
    busy: boolean;
    onUpdate: (data: Record<string, FormDataEntryValue>) => void;
}) {
    const next = report.status === "pending" ? "in_progress" : "completed";
    const [status, setStatus] = useState(next);
    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onUpdate(Object.fromEntries(new FormData(e.currentTarget)));
    }
    return (
        <form className="editor-form rounded-lg border p-4" onSubmit={submit}>
            <h3 className="sw-section-title">Tindak lanjut laporan</h3>
            <Choice
                label="Status baru"
                name="status"
                options={{
                    [next]: next === "completed" ? "Completed" : "In Progress",
                    rejected: "Rejected",
                }}
                value={status}
                onChange={setStatus}
            />
            <div className="sw-field">
                <Label htmlFor="note">
                    {status === "rejected"
                        ? "Alasan penolakan (wajib)"
                        : "Catatan (opsional)"}
                </Label>
                <Textarea
                    id="note"
                    name="note"
                    required={status === "rejected"}
                    maxLength={1000}
                />
            </div>
            <Button disabled={busy} type="submit">
                Perbarui status
            </Button>
        </form>
    );
}
