import { useRef, useState } from "react";
import { Keyboard } from "react-native";
import type { ActionMessage } from "./action-modal";
export function useFeedback() {
  const running = useRef(false);
  const pending = useRef<(() => Promise<void>) | undefined>(undefined);
  const success = useRef("");
  const [feedback, setFeedback] = useState<ActionMessage>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  function dismiss() {
    pending.current = undefined;
    setFeedback(undefined);
  }
  function fail(error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan. Silakan coba kembali.";
    setError(message);
    Keyboard.dismiss();
    setFeedback({ title: "Periksa kembali", message });
  }
  async function run(fn: () => Promise<void>, message = "") {
    if (running.current) return;
    running.current = true;
    setBusy(true);
    setError("");
    try {
      await fn();
      if (message) setFeedback({ title: "Berhasil", message });
    } catch (error) {
      fail(error);
    } finally {
      running.current = false;
      setBusy(false);
    }
  }
  function confirm(
    fn: () => Promise<void>,
    options: ActionMessage & { success: string; validate?: () => void },
  ) {
    if (running.current || pending.current) return;
    setError("");
    try {
      options.validate?.();
    } catch (error) {
      fail(error);
      return;
    }
    pending.current = fn;
    success.current = options.success;
    Keyboard.dismiss();
    setFeedback({ ...options, confirm: true });
  }
  function proceed() {
    const fn = pending.current;
    if (!fn || running.current) return;
    dismiss();
    void run(fn, success.current);
  }
  return { error, setError, busy, run, feedback, dismiss, confirm, proceed };
}
