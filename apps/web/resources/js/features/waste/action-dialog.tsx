import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { ScrollDialogContent } from "./scroll-dialog";

export type ActionMessage = { title: string; message: string };

export function ActionDialog({
    value,
    onClose,
    onConfirm,
    confirmLabel = "Ya, simpan",
    destructive = false,
    busy = false,
}: {
    value?: ActionMessage;
    onClose: () => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    destructive?: boolean;
    busy?: boolean;
}) {
    const cancel = useRef<HTMLButtonElement>(null);
    return (
        <Dialog
            open={!!value}
            onOpenChange={(open) => {
                if (!open && !busy) onClose();
            }}
        >
            <ScrollDialogContent
                role="alertdialog"
                className="[&>button]:hidden"
                onEscapeKeyDown={(e) => {
                    if (busy) e.preventDefault();
                }}
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                    cancel.current?.focus();
                }}
            >
                <DialogHeader>
                    <DialogTitle>{value?.title}</DialogTitle>
                    <DialogDescription className="whitespace-pre-line break-words">
                        {value?.message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        ref={cancel}
                        type="button"
                        variant={onConfirm ? "outline" : "default"}
                        disabled={busy}
                        onClick={onClose}
                    >
                        {onConfirm ? "Batal" : "Mengerti"}
                    </Button>
                    {onConfirm && (
                        <Button
                            type="button"
                            disabled={busy}
                            variant={destructive ? "destructive" : "default"}
                            onClick={onConfirm}
                        >
                            {busy ? "Memproses…" : confirmLabel}
                        </Button>
                    )}
                </DialogFooter>
            </ScrollDialogContent>
        </Dialog>
    );
}
