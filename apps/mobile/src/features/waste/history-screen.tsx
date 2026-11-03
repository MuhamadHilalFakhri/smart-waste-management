import { Pressable, Text, View } from "react-native";
import { categories } from "../../api";
import { useWaste } from "./context";
import { status } from "./status";
import { s } from "./styles";
export default function Screen() {
  const { reports, button, run, load, detail } = useWaste();
  return (
    <>
      <Text style={s.title}>Riwayat laporan</Text>
      {button("Muat ulang", () => void run(() => load()), true)}
      {!reports?.data.length && <Text style={s.line}>Belum ada laporan.</Text>}
      {reports?.data.map((r) => (
        <Pressable
          accessibilityRole="button"
          key={r.id}
          style={s.card}
          onPress={() => void run(() => detail(r.id))}
        >
          <Text style={s.label}>
            {r.number.slice(0, 8)} · {status[r.status]}
          </Text>
          <Text>{r.description}</Text>
          <Text style={s.sub}>
            {categories[r.category ?? ""] ?? "Kategori belum dipilih"}
          </Text>
        </Pressable>
      ))}
      {reports && (
        <View style={s.nav}>
          {reports.current_page > 1 &&
            button(
              "Sebelumnya",
              () => void run(() => load(reports.current_page - 1)),
              true,
            )}
          {reports.current_page < reports.last_page &&
            button(
              "Berikutnya",
              () => void run(() => load(reports.current_page + 1)),
              true,
            )}
        </View>
      )}
    </>
  );
}
