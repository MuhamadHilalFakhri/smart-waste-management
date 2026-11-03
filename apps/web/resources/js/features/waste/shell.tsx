import { Head } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";
import Navigation, { useAccount } from "./navigation";
import Header from "./header";
import WorkspaceMenu from "./workspace-menu";
import "./styles/index.css";
export default function Shell({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    const user = useAccount();
    return (
        <div className="waste-app sw-root">
            <Head title={title + " · Smart Waste"} />
            <aside className="waste-sidebar">
                <Navigation />
            </aside>
            <div className="waste-main">
                <Header />
                <ScrollArea
                    className="sw-page-scroll"
                    type="auto"
                    viewportProps={{
                        "scroll-region": "",
                        tabIndex: 0,
                        role: "region",
                        "aria-label": "Konten halaman",
                    }}
                >
                    <div className="sw-scroll-content">
                        <main className="waste-content">
                            <section className="sw-page-heading">
                                <div>
                                    <p>
                                        {user.role === "admin"
                                            ? "ADMINISTRATOR"
                                            : "PELAPOR"}{" "}
                                        / {title.toLocaleUpperCase("id-ID")}
                                    </p>
                                    <h1>{title}</h1>
                                </div>
                                <WorkspaceMenu />
                            </section>
                            {children}
                        </main>
                        <footer className="sw-footer">
                            <span>
                                © {new Date().getFullYear()} Smart Waste
                            </span>
                            <span>
                                Laporan yang tercatat, penanganan yang
                                terpantau.
                            </span>
                        </footer>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
