import type { ComponentProps } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
export function Table({ className, ...props }: ComponentProps<"table">) {
    return (
        <ScrollArea
            orientation="horizontal"
            type="auto"
            className="sw-table-scroll w-full"
            viewportProps={{
                tabIndex: 0,
                role: "region",
                "aria-label": "Tabel dapat digulir horizontal",
            }}
        >
            <table
                data-slot="table"
                className={cn("w-full caption-bottom text-sm", className)}
                {...props}
            />
        </ScrollArea>
    );
}
export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn("[&_tr]:border-b", className)}
            {...props}
        />
    );
}
export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn("[&_tr:last-child]:border-0", className)}
            {...props}
        />
    );
}
export function TableRow({ className, ...props }: ComponentProps<"tr">) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "border-b transition-colors hover:bg-muted/50",
                className,
            )}
            {...props}
        />
    );
}
export function TableHead({ className, ...props }: ComponentProps<"th">) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "h-10 px-3 text-left align-middle font-medium whitespace-nowrap",
                className,
            )}
            {...props}
        />
    );
}
export function TableCell({ className, ...props }: ComponentProps<"td">) {
    return (
        <td
            data-slot="table-cell"
            className={cn("p-3 align-middle", className)}
            {...props}
        />
    );
}
