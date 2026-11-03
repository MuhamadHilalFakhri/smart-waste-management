import { Users, UserCheck, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { UserPage } from "../types";
export default function UserStats({ counts }: { counts: UserPage["counts"] }) {
    return (
        <div className="sw-user-stats">
            {[
                { label: "Total pengguna", value: counts.total, icon: Users },
                {
                    label: "Pengguna aktif",
                    value: counts.active,
                    icon: UserCheck,
                },
                {
                    label: "Administrator",
                    value: counts.admins,
                    icon: ShieldCheck,
                },
            ].map(({ label, value, icon: Icon }) => (
                <Card
                    key={label}
                    className="dashboard-card flex flex-row items-center gap-4"
                >
                    <span className="report-symbol">
                        <Icon size={22} />
                    </span>
                    <div>
                        <p className="sw-muted">{label}</p>
                        <strong className="mt-2 block text-2xl font-semibold">
                            {value}
                        </strong>
                    </div>
                </Card>
            ))}
        </div>
    );
}
