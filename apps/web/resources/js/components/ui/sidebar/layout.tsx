import { Slot } from "@radix-ui/react-slot";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { useSidebar } from "./context";
function SidebarTrigger({
    className,
    onClick,
    ...props
}: React.ComponentProps<typeof Button>) {
    const { toggleSidebar, isMobile, state } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", className)}
            onClick={(event) => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
        >
            {isMobile || state === "collapsed" ? (
                <PanelLeftOpenIcon />
            ) : (
                <PanelLeftCloseIcon />
            )}
            <span className="sr-only">Toggle sidebar</span>
        </Button>
    );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            data-sidebar="rail"
            data-slot="sidebar-rail"
            aria-label="Toggle sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            title="Toggle sidebar"
            className={cn(
                "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
                "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
                "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
                "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
                "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
                "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
                className,
            )}
            {...props}
        />
    );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
    return (
        <main
            data-slot="sidebar-inset"
            className={cn(
                "bg-background relative flex max-w-full min-h-svh flex-1 flex-col",
                "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",
                className,
            )}
            {...props}
        />
    );
}

function SidebarInput({
    className,
    ...props
}: React.ComponentProps<typeof Input>) {
    return (
        <Input
            data-slot="sidebar-input"
            data-sidebar="input"
            className={cn("bg-background h-8 w-full shadow-none", className)}
            {...props}
        />
    );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-header"
            data-sidebar="header"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-footer"
            data-sidebar="footer"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    );
}

function SidebarSeparator({
    className,
    ...props
}: React.ComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="sidebar-separator"
            data-sidebar="separator"
            className={cn("bg-sidebar-border mx-2 w-auto", className)}
            {...props}
        />
    );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-content"
            data-sidebar="content"
            className={cn(
                "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
                className,
            )}
            {...props}
        />
    );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-group"
            data-sidebar="group"
            className={cn(
                "relative flex w-full min-w-0 flex-col p-2",
                className,
            )}
            {...props}
        />
    );
}

function SidebarGroupLabel({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            data-slot="sidebar-group-label"
            data-sidebar="group-label"
            className={cn(
                "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none group-data-[collapsible=icon]:pointer-events-none",
                className,
            )}
            {...props}
        />
    );
}

function SidebarGroupAction({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="sidebar-group-action"
            data-sidebar="group-action"
            className={cn(
                "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-2 md:after:hidden",
                "group-data-[collapsible=icon]:hidden",
                className,
            )}
            {...props}
        />
    );
}

function SidebarGroupContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-group-content"
            data-sidebar="group-content"
            className={cn("w-full text-sm", className)}
            {...props}
        />
    );
}

export {
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
};
