import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm",
                className,
            )}
            {...props}
        />
    );
}
