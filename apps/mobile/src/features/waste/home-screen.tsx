import { Text, View } from "react-native";
import { useWaste } from "./context";
import { status } from "./status";
import { s } from "./styles";
export default function Screen() {
  const { stats, button, newReport, run, load, logout } = useWaste();
  return (
    <>
      <Text style={s.title}>Dashboard Anda</Text>
      <View style={s.card}>
        <Text>Total laporan</Text>
        <Text style={s.count}>{stats?.total ?? 0}</Text>
        {Object.entries(status).map(([k, v]) => (
          <Text key={k} style={s.line}>
            {v}: {stats?.statuses[k] ?? 0}
          </Text>
        ))}
      </View>
      {button("Buat laporan sampah", () => newReport())}
      {button("Muat ulang", () => void run(() => load()), true)}
      {button("Keluar", () => void run(logout), true)}
    </>
  );
}
