export type { Report, Page } from "./api";
export type Account = {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    is_active: boolean;
};
export type UserPage = import("./api").Page<Account> & {
    counts: { total: number; active: number; admins: number };
};
export type Statistics = {
    total: number;
    statuses: Record<string, number>;
    categories: { category: string | null; total: number }[];
    trend: { date: string; total: number }[];
};
export const dateLabel = (value: string) =>
    new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
export const initials = (name: string) =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
