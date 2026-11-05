import { useRef, useState } from "react";
import { ActionDialog, type ActionMessage } from "./action-dialog";
import { formErrors } from "./form-validation";

export function useConfirmation() {
    const [value, setValue] = useState<ActionMessage>();
    const pending = useRef<(() => void) | undefined>(undefined);
    const [destructive, setDestructive] = useState(false);
    function close() {
        pending.current = undefined;
        setValue(undefined);
    }
    function show(message: string) {
        pending.current = undefined;
        setValue({ title: "Periksa data Anda", message });
    }
    function ask(
        message: string,
        action: () => void,
        form?: HTMLFormElement,
        remove = false,
    ) {
        const errors = form ? formErrors(form) : [];
        pending.current = errors.length ? undefined : action;
        setDestructive(remove);
        setValue(
            errors.length
                ? { title: "Periksa data Anda", message: errors.join("\n") }
                : {
                      title: remove ? "Hapus laporan?" : "Simpan perubahan?",
                      message,
                  },
        );
    }
    const dialog = (
        <ActionDialog
            value={value}
            onClose={close}
            destructive={destructive}
            confirmLabel={destructive ? "Ya, hapus" : "Ya, simpan"}
            onConfirm={
                pending.current
                    ? () => {
                          const action = pending.current;
                          close();
                          action?.();
                      }
                    : undefined
            }
        />
    );
    return { ask, show, dialog };
}
