import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAccount } from "./navigation";
export default function WorkspaceMenu() {
    const user = useAccount();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="sw-workspace">
                    <i />
                    Workspace aktif
                    <ChevronDown size={13} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="waste-app">
                <DropdownMenuLabel>
                    Smart Waste ·{" "}
                    {user.role === "admin" ? "Administrator" : "Pelapor"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/settings/profile">Profil akun</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/reports">Laporan sampah</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
