import { ScrollDialogContent as DialogContent } from "../scroll-dialog";
import { useState } from "react";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notice, Status } from "../common";
import { categories, type Report } from "../api";
import { dateLabel } from "../types";
import StatusForm from "./status-form";
export default function ReportDetail({
    report,
    admin,
    busy,
    error,
    onClose,
    onEdit,
    onDelete,
    onRetry,
    onStatus,
}: {
    report?: Report;
    admin: boolean;
    busy: boolean;
    error: string;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onRetry: () => void;
    onStatus: (data: Record<string, FormDataEntryValue>) => void;
}) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    if (!report) return null;
    const editable = admin || report.status === "pending";
    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open && !busy) onClose();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Laporan #{report.number.slice(0, 8)}
                    </DialogTitle>
                    <DialogDescription>
                        Dibuat {dateLabel(report.created_at)} · {report.number}
                    </DialogDescription>
                </DialogHeader>
                <Notice error={error} />
                <img
                    src={"/data/reports/" + report.id + "/photo"}
                    alt="Foto sampah pada laporan"
                    className="sw-report-image"
                />
                <div className="sw-detail-grid">
                    <Status value={report.status} />
                    <p className="whitespace-pre-wrap break-words">
                        {report.description}
                    </p>
                    <p>
                        Kategori:{" "}
                        <strong>
                            {categories[report.category ?? ""] ??
                                "Belum dipilih"}
                        </strong>
                    </p>
                    <a
                        className="underline"
                        href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Lokasi: {report.latitude}, {report.longitude}
                    </a>
                    <p className="sw-muted">
                        {report.prediction?.status === "succeeded"
                            ? `Saran AI: ${categories[report.prediction.label ?? ""] ?? report.prediction.label} · ${((report.prediction.confidence ?? 0) * 100).toFixed(1)}% confidence`
                            : report.prediction?.status === "failed"
                              ? "Prediksi gagal. Silakan coba ulang."
                              : "Foto sedang menunggu atau diproses AI."}
                    </p>
                </div>
                {editable && (
                    <div className="sw-actions">
                        <Button
                            variant="outline"
                            disabled={busy}
                            onClick={onEdit}
                        >
                            <Pencil />
                            Ubah
                        </Button>
                        <Button
                            variant="outline"
                            disabled={busy}
                            onClick={onRetry}
                        >
                            <RefreshCw />
                            Ulangi AI
                        </Button>
                        <Button
                            variant="outline"
                            disabled={busy}
                            onClick={() => setConfirmDelete(true)}
                        >
                            <Trash2 />
                            Hapus
                        </Button>
                    </div>
                )}
                {confirmDelete && (
                    <div className="rounded-lg border border-red-200 p-4">
                        <p className="mb-3 text-sm">
                            Hapus laporan ini? Laporan akan diarsipkan dan tidak
                            muncul di daftar.
                        </p>
                        <div className="sw-actions">
                            <Button
                                disabled={busy}
                                variant="destructive"
                                onClick={onDelete}
                            >
                                Ya, hapus
                            </Button>
                            <Button
                                disabled={busy}
                                variant="outline"
                                onClick={() => setConfirmDelete(false)}
                            >
                                Batal
                            </Button>
                        </div>
                    </div>
                )}
                {admin &&
                    ["pending", "in_progress"].includes(report.status) && (
                        <StatusForm
                            key={report.status}
                            report={report}
                            busy={busy}
                            onUpdate={onStatus}
                        />
                    )}
                <h3 className="sw-section-title">Histori status</h3>
                <div className="sw-history">
                    {report.histories?.map((history) => (
                        <div key={history.id}>
                            <Status value={history.to_status} />
                            <p className="sw-muted">
                                {new Date(history.created_at).toLocaleString(
                                    "id-ID",
                                )}
                            </p>
                            {history.note && (
                                <p className="whitespace-pre-wrap break-words">
                                    {history.note}
                                </p>
                            )}
                        </div>
                    ))}
                    {!report.histories?.length && (
                        <p className="sw-muted">Belum ada perubahan status.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
