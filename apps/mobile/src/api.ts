import * as SecureStore from "./storage";
export const baseUrl =
  (process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:8080") + "/api/v1";
export async function api<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await SecureStore.getItemAsync("token");
  const response = await fetch(baseUrl + "/" + path, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
      ...(init.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...init.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      Object.values(error.errors ?? {})
        .flat()
        .join(" ") ||
        error.message ||
        "Koneksi gagal. Coba kembali.",
    );
  }
  return response.status === 204 ? (undefined as T) : response.json();
}
export type Report = {
  id: number;
  number: string;
  description: string;
  status: string;
  category: string | null;
  latitude: string;
  longitude: string;
  prediction?: {
    status: string;
    label: string | null;
    confidence: number | null;
  };
  histories?: {
    id: number;
    to_status: string;
    note: string | null;
    created_at: string;
  }[];
};
export type Page<T> = { data: T[]; current_page: number; last_page: number };
export const categories: Record<string, string> = {
  organic: "Organic Waste",
  paper: "Paper Waste",
  plastic: "Plastic Waste",
};
