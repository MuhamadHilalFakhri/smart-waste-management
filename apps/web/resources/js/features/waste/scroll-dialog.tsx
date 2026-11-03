import type { ComponentProps } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
export function ScrollDialogContent({
    children,
    className,
    ...props
}: ComponentProps<typeof DialogContent>) {
    return (
        <DialogContent
            className={cn("waste-app sw-dialog", className)}
            {...props}
        >
            <ScrollArea
                className="sw-dialog-scroll"
                type="auto"
                viewportProps={{
                    tabIndex: 0,
                    role: "region",
                    "aria-label": "Isi dialog",
                }}
            >
                <div className="sw-dialog-inner">{children}</div>
            </ScrollArea>
        </DialogContent>
    );
}
