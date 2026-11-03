import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Shell from "@/features/waste/shell";
import { useAccount } from "@/features/waste/navigation";
import { api } from "@/features/waste/api";
import { Notice, Pagination } from "@/features/waste/common";
import ReportFilters from "@/features/waste/reports/report-filters";
import ReportTable from "@/features/waste/reports/report-table";
import ReportEditor from "@/features/waste/reports/report-editor";
import ReportDetail from "@/features/waste/reports/report-detail";
import useReports from "@/features/waste/reports/use-reports";
import { exportReports } from "@/features/waste/reports/export";
export default function Reports() {
    const reports = useReports();
    const user = useAccount();
    const id = reports.selected?.id;
    return (
        <Shell title="Laporan sampah">
            <div className="sw-intro">
                <p className="sw-muted">
                    {user.role === "admin"
                        ? "Tinjau, tindak lanjuti, dan pantau seluruh laporan sampah."
                        : "Kelola laporan Anda dan pantau status penanganannya."}
                </p>
                <div className="sw-actions">
                    <Button
                        variant="outline"
                        disabled={reports.action.busy}
                        onClick={() =>
                            void reports.action.run(
                                () => exportReports(reports.query),
                                "CSV berhasil diunduh.",
                            )
                        }
                    >
                        <Download />
                        Ekspor CSV
                    </Button>
                    <Button onClick={reports.create}>
                        <Plus />
                        Buat laporan
                    </Button>
                </div>
            </div>
            <Notice
                error={
                    reports.list.error ||
                    (!reports.open && !reports.selected
                        ? reports.action.error
                        : "")
                }
                notice={reports.action.notice}
            />
            <ReportFilters query={reports.query} onApply={reports.setQuery} />
            <section className="table-section">
                <div className="table-heading">
                    <h2 className="sw-section-title">
                        Daftar laporan{" "}
                        <span className="count-badge">
                            {reports.list.data?.total ?? 0}
                        </span>
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            void reports.action.run(
                                reports.list.reload,
                                "Data diperbarui.",
                            )
                        }
                    >
                        Perbarui
                    </Button>
                </div>
                <ReportTable
                    rows={reports.list.data?.data ?? []}
                    loading={reports.list.loading}
                    onSelect={reports.select}
                />
                {reports.list.data && (
                    <Pagination
                        page={reports.list.data}
                        onPage={reports.page}
                        busy={reports.action.busy}
                    />
                )}
            </section>
            <ReportEditor
                open={reports.open}
                report={reports.editing}
                busy={reports.action.busy}
                error={reports.action.error}
                onClose={() => reports.setOpen(false)}
                onSave={reports.save}
            />
            <ReportDetail
                key={id}
                report={reports.selected}
                admin={user.role === "admin"}
                busy={reports.action.busy}
                error={reports.action.error}
                onClose={() => reports.setSelected(undefined)}
                onEdit={reports.edit}
                onDelete={() =>
                    void reports.mutate(
                        () => api("reports/" + id, { method: "DELETE" }),
                        true,
                    )
                }
                onRetry={() =>
                    void reports.mutate(() =>
                        api("reports/" + id + "/predict", { method: "POST" }),
                    )
                }
                onStatus={(data) =>
                    void reports.mutate(() =>
                        api("reports/" + id + "/status", {
                            method: "PATCH",
                            body: JSON.stringify(data),
                        }),
                    )
                }
            />
        </Shell>
    );
}
