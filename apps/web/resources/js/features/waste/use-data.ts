import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "./api";
import type { ActionMessage } from "./action-dialog";
type Result<T> = { path: string; data?: T; error?: string; loading: boolean };
export function useData<T>(path: string) {
    const [result, setResult] = useState<Result<T>>({ path, loading: true });
    const reload = useCallback(async () => {
        setResult((previous) => ({
            ...previous,
            path,
            loading: true,
            error: "",
        }));
        try {
            const data = await api<T>(path);
            setResult({ path, data, loading: false });
        } catch (error) {
            setResult({
                path,
                loading: false,
                error: (error as Error).message,
            });
            throw error;
        }
    }, [path]);
    useEffect(() => {
        const controller = new AbortController();
        api<T>(path, { signal: controller.signal })
            .then((data) => setResult({ path, data, loading: false }))
            .catch((error) => {
                if (!controller.signal.aborted)
                    setResult({ path, error: error.message, loading: false });
            });
        return () => controller.abort();
    }, [path]);
    const current = result.path === path;
    return {
        data: current ? result.data : undefined,
        error: current ? (result.error ?? "") : "",
        loading: !current || result.loading,
        reload,
    };
}
export function useAction() {
    const running = useRef(false);
    const [feedback, setFeedback] = useState<ActionMessage>();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    async function run(
        action: () => Promise<void>,
        message = "Perubahan tersimpan.",
    ) {
        if (running.current) return;
        running.current = true;
        setBusy(true);
        setError("");
        setNotice("");
        try {
            await action();
            setNotice(message);
            if (message) setFeedback({ title: "Berhasil", message });
        } catch (error) {
            setError((error as Error).message);
            setFeedback({
                title: "Perubahan belum berhasil",
                message: (error as Error).message,
            });
        } finally {
            running.current = false;
            setBusy(false);
        }
    }
    return {
        busy,
        error,
        notice,
        run,
        feedback,
        dismiss: () => setFeedback(undefined),
        clear: () => {
            setError("");
            setNotice("");
        },
    };
}
