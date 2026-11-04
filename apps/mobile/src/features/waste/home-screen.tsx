import { View } from "react-native";
import { useWaste } from "./context";
import { status } from "./status";
import { s } from "./styles";
import { colors, tones } from "./theme";
import { Text } from "./typography";
import { Icon } from "./icons";
import { ReportRow } from "./report-row";
export default function Screen() {
  const { stats, reports, button, newReport, run, detail, setScreen, busy } =
    useWaste();
  return (
    <>
      <View>
        <Text style={s.eyebrow}>WORKSPACE / RINGKASAN LAPORAN</Text>
        <Text style={s.title}>Ringkasan laporan</Text>
      </View>
      <View
        style={[
          s.card,
          { backgroundColor: colors.ink, borderColor: colors.ink },
        ]}
      >
        <View style={s.between}>
          <Text style={{ color: colors.white }}>Total laporan</Text>
          <Icon name="report" color="#a5b5a6" />
        </View>
        <View style={[s.row, { alignItems: "baseline" }]}>
          <Text style={s.count}>{stats?.total ?? "–"}</Text>
          <Text style={{ color: "#c5d1c7" }}>laporan</Text>
        </View>
        <Text style={{ color: "#c5d1c7", fontSize: 12 }}>
          Laporan yang tercatat di workspace Anda.
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {Object.entries(status).map(([key, label]) => (
          <View
            key={key}
            style={[s.card, { width: "47.5%", flexGrow: 1, padding: 16 }]}
          >
            <View
              style={[s.symbol, { backgroundColor: tones[key].background }]}
            >
              <Icon
                name={key === "completed" ? "check" : "clock"}
                color={tones[key].color}
                size={18}
              />
            </View>
            <Text style={s.sub}>{label}</Text>
            <Text style={{ fontSize: 28, fontWeight: "600" }}>
              {stats ? (stats.statuses[key] ?? 0) : "–"}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={[
          s.card,
          { backgroundColor: colors.ink, borderColor: colors.ink },
        ]}
      >
        <Text style={{ color: "#c5d1c7", fontSize: 12 }}>
          Prioritas hari ini
        </Text>
        <Text style={{ color: colors.white, fontSize: 21, lineHeight: 30 }}>
          {stats
            ? `${stats.statuses.pending ?? 0} laporan menunggu penanganan.`
            : "Memuat ringkasan laporan…"}
        </Text>
        {button("Buat laporan", () => newReport())}
      </View>
      <View style={s.between}>
        <Text style={s.label}>Laporan terbaru</Text>
        {button("Lihat semua", () => setScreen("history"), true)}
      </View>
      {reports?.data.slice(0, 3).map((report) => (
        <ReportRow
          key={report.id}
          report={report}
          disabled={busy}
          onPress={() => void run(() => detail(report.id))}
        />
      ))}
      {reports && !reports.data.length && (
        <View style={s.card}>
          <Text>Belum ada laporan.</Text>
          <Text style={s.sub}>
            Buat laporan pertama dengan foto dan lokasi sampah.
          </Text>
        </View>
      )}
    </>
  );
}
