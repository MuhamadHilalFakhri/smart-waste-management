import { Pencil, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Status } from "../common";
import { initials, type Account } from "../types";
export default function UserTable({
    rows,
    loading,
    onEdit,
}: {
    rows: Account[];
    loading: boolean;
    onEdit: (account: Account) => void;
}) {
    return (
        <div className="table-scroll">
            <Table className="waste-table">
                <TableHeader>
                    <TableRow>
                        {["Nama", "Email", "Role", "Akses", "Tindakan"].map(
                            (label) => (
                                <TableHead key={label}>{label}</TableHead>
                            ),
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <span className="avatar-circle">
                                        {initials(user.name)}
                                    </span>
                                    <strong className="text-sm font-medium">
                                        {user.name}
                                    </strong>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {user.email}
                            </TableCell>
                            <TableCell>
                                <span className="role-badge">
                                    {user.role === "admin" && (
                                        <ShieldCheck size={13} />
                                    )}{" "}
                                    {user.role}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Status
                                    value={
                                        user.is_active ? "active" : "inactive"
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(user)}
                                >
                                    <Pencil />
                                    Ubah
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!rows.length && (
                <p className="sw-empty">
                    {loading ? "Memuat pengguna…" : "Pengguna tidak ditemukan."}
                </p>
            )}
        </div>
    );
}
