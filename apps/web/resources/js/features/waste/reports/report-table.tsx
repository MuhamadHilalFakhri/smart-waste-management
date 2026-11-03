import { ArrowUpRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Status } from "../common";
import { categories } from "../api";
import type { Report } from "../types";
export default function ReportTable({
    rows,
    loading,
    onSelect,
}: {
    rows: Report[];
    loading?: boolean;
    onSelect: (report: Report) => void;
}) {
    return (
        <div className="table-scroll">
            <Table className="waste-table">
                <TableHeader>
                    <TableRow>
                        {[
                            "Laporan",
                            "Deskripsi",
                            "Status",
                            "Kategori",
                            "Detail",
                        ].map((label) => (
                            <TableHead key={label}>{label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>
                                <div className="sw-report-title">
                                    <span className="report-symbol">
                                        <FileText size={17} />
                                    </span>
                                    <div>
                                        <strong>
                                            #{report.number.slice(0, 8)}
                                        </strong>
                                        <small>
                                            {new Date(
                                                report.created_at,
                                            ).toLocaleDateString("id-ID")}
                                        </small>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="w-[45%]">
                                <p className="sw-report-description">
                                    {report.description}
                                </p>
                            </TableCell>
                            <TableCell>
                                <Status value={report.status} />
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-muted-foreground">
                                {categories[report.category ?? ""] ??
                                    "Belum dipilih"}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onSelect(report)}
                                >
                                    Lihat
                                    <ArrowUpRight />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!rows.length && (
                <p className="sw-empty">
                    {loading
                        ? "Memuat laporan…"
                        : "Belum ada laporan yang sesuai filter."}
                </p>
            )}
        </div>
    );
}
