import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useId, type ComponentProps } from "react";
import { statuses } from "./api";
export function Notice({ error, notice }: { error?: string; notice?: string }) {
    if (!error && !notice) return null;
    return (
        <Alert
            className={error ? "sw-error" : "sw-notice"}
            role={error ? "alert" : "status"}
        >
            <AlertDescription>{error || notice}</AlertDescription>
        </Alert>
    );
}
export function Status({ value }: { value: string }) {
    const tone =
        value === "completed" || value === "active"
            ? "success"
            : value === "pending"
              ? "pending"
              : value === "in_progress"
                ? "progress"
                : value === "rejected"
                  ? "rejected"
                  : "neutral";
    return (
        <Badge variant="outline" className={"status-badge status-" + tone}>
            {statuses[value] ??
                (value === "active"
                    ? "Aktif"
                    : value === "inactive"
                      ? "Nonaktif"
                      : value)}
        </Badge>
    );
}
export function TextField({
    label,
    id,
    ...props
}: ComponentProps<typeof Input> & { label: string; id: string }) {
    return (
        <div className="sw-field">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...props} />
        </div>
    );
}
export function Choice({
    label,
    name,
    options,
    defaultValue,
    value,
    onChange,
    allLabel,
}: {
    label: string;
    name: string;
    options: Record<string, string>;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    allLabel?: string;
}) {
    const id = useId();
    return (
        <div className="sw-field">
            <Label htmlFor={id}>{label}</Label>
            <Select
                name={name}
                defaultValue={defaultValue ?? "_none"}
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger id={id}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="waste-app">
                    {allLabel && (
                        <SelectItem value="_none">{allLabel}</SelectItem>
                    )}
                    {Object.entries(options).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
export function Pagination({
    page,
    onPage,
    busy = false,
    noun = "laporan",
}: {
    page: {
        current_page: number;
        last_page: number;
        total: number;
        data?: unknown[];
    };
    onPage: (page: number) => void;
    busy?: boolean;
    noun?: string;
}) {
    return (
        <div className="table-footer">
            <span>
                Menampilkan {page.data?.length ?? 0} dari {page.total} {noun}
            </span>
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={busy || page.current_page <= 1}
                    onClick={() => onPage(page.current_page - 1)}
                >
                    Sebelumnya
                </Button>
                <span>
                    {page.current_page} / {page.last_page}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={busy || page.current_page >= page.last_page}
                    onClick={() => onPage(page.current_page + 1)}
                >
                    Berikutnya
                </Button>
            </div>
        </div>
    );
}
