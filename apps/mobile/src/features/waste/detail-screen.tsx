import { View } from "react-native";
import { useState } from "react";
import { DeleteConfirmation } from "./delete-confirmation";
import { Text } from "./typography";
import { StatusBadge } from "./status-badge";
import { api, categories } from "../../api";
import { ProtectedPhoto } from "./protected-photo";
import { useWaste } from "./context";
import { status } from "./status";
import { s } from "./styles";
export default function Screen() {
  const {
    token,
    selected,
    button,
    run,
    detail,
    newReport,
    load,
    setScreen,
    busy,
  } = useWaste();
  const [confirmDelete, setConfirmDelete] = useState(false);
  if (!selected) return null;
  return (
    <View style={s.card}>
      <Text style={s.eyebrow}>WORKSPACE / DETAIL LAPORAN</Text>
      <Text style={s.title}>#{selected.number.slice(0, 8)}</Text>
      <StatusBadge value={selected.status} />
      <ProtectedPhoto key={selected.id} id={selected.id} token={token} />
      <Text style={s.line}>{selected.description}</Text>
      <Text style={s.line}>
        {selected.latitude}, {selected.longitude}
      </Text>
      <Text style={s.line}>
        Kategori pilihan:{" "}
        {categories[selected.category ?? ""] ?? "Belum dipilih"}
      </Text>
      <Text style={s.line}>
        Saran AI:{" "}
        {selected.prediction?.status === "succeeded"
          ? `${categories[selected.prediction.label ?? ""]} (${((selected.prediction.confidence ?? 0) * 100).toFixed(1)}%)`
          : selected.prediction?.status === "failed"
            ? "Gagal, coba kembali"
            : "Menunggu prediksi"}
      </Text>
      {button(
        "Perbarui detail",
        () => void run(() => detail(selected.id)),
        true,
      )}
      {selected.status === "pending" && (
        <>
          {button("Ubah laporan", () => newReport(selected))}
          {button(
            "Ulangi prediksi",
            () =>
              void run(async () => {
                await api("reports/" + selected.id + "/predict", {
                  method: "POST",
                });
                await detail(selected.id);
              }),
            true,
          )}
          {button("Hapus laporan", () => setConfirmDelete(true), true)}
        </>
      )}
      <Text style={[s.label, s.divider]}>Histori status</Text>
      {selected.histories?.map((h) => (
        <Text key={h.id} style={s.line}>
          {status[h.to_status]} ·{" "}
          {new Date(h.created_at).toLocaleString("id-ID")} {h.note}
        </Text>
      ))}
      <DeleteConfirmation
        open={confirmDelete}
        busy={busy}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() =>
          void run(async () => {
            await api("reports/" + selected.id, { method: "DELETE" });
            setConfirmDelete(false);
            await load();
            setScreen("history");
          })
        }
      />
    </View>
  );
}
