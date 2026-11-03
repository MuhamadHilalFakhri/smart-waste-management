import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import SettingsLayout from "@/layouts/settings/layout";
void createInertiaApp({
    resolve: async (name) => {
        const page = (await resolvePageComponent(
            "./pages/" + name + ".tsx",
            import.meta.glob("./pages/**/*.tsx"),
        )) as { default: import("@inertiajs/react").ResolvedComponent };
        if (
            !name.startsWith("waste/") &&
            !["auth/login", "auth/register"].includes(name)
        )
            page.default.layout = name.startsWith("auth/")
                ? AuthLayout
                : name.startsWith("settings/")
                  ? [AppLayout, SettingsLayout]
                  : AppLayout;
        return page.default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: { color: "#216b45" },
});
