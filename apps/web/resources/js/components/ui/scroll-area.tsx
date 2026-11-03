import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both";
    viewportProps?: ComponentProps<typeof ScrollAreaPrimitive.Viewport> & {
        "scroll-region"?: string;
    };
};
function ScrollArea({
    className,
    children,
    orientation = "vertical",
    viewportProps,
    ...props
}: ScrollAreaProps) {
    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={cn("relative min-w-0", className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                {...viewportProps}
                disableImplicitContentElement
                className={cn(
                    "size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    viewportProps?.className,
                )}
            >
                <ScrollAreaPrimitive.Content
                    data-slot="scroll-area-content"
                    style={{
                        display:
                            orientation === "horizontal" ? "table" : "block",
                    }}
                >
                    {children}
                </ScrollAreaPrimitive.Content>
            </ScrollAreaPrimitive.Viewport>
            {orientation !== "horizontal" && (
                <ScrollBar orientation="vertical" />
            )}
            {orientation !== "vertical" && (
                <ScrollBar orientation="horizontal" />
            )}
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}
function ScrollBar({
    className,
    orientation = "vertical",
    ...props
}: ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                "flex touch-none select-none p-px transition-colors",
                orientation === "vertical"
                    ? "h-full w-2 border-l border-l-transparent"
                    : "h-2 flex-col border-t border-t-transparent",
                className,
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot="scroll-area-thumb"
                className="relative flex-1 rounded-full bg-border"
            />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
}
export { ScrollArea, ScrollBar };
