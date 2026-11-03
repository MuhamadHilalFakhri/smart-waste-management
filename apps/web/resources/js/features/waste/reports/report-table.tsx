import { ArrowUpRight } from "lucide-react";
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
import { dateLabel, type Report } from "../types";
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
                            "Kategori",
                            "Status",
                            "Tanggal",
                            "Tindakan",
                        ].map((label) => (
                            <TableHead key={label}>{label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>
                                <strong className="font-medium">
                                    #{report.number.slice(0, 8)}
                                </strong>
                            </TableCell>
                            <TableCell>
                                <span className="sw-report-description">
                                    {report.description}
                                </span>
                            </TableCell>
                            <TableCell>
                                {categories[report.category ?? ""] ??
                                    "Belum dipilih"}
                            </TableCell>
                            <TableCell>
                                <Status value={report.status} />
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                {dateLabel(report.created_at)}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onSelect(report)}
                                >
                                    Detail
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
