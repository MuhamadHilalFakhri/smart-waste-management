import { useState } from "react";
import { TextInput, View } from "react-native";
import { useWaste } from "./context";
import { s } from "./styles";
import { Text } from "./typography";
import { ReportRow } from "./report-row";
export default function Screen() {
  const { reports, button, run, load, detail, newReport, busy } = useWaste();
  const [query, setQuery] = useState("");
  const rows = reports?.data.filter((r) =>
    `${r.number} ${r.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <View>
        <Text style={s.eyebrow}>WORKSPACE / LAPORAN SAMPAH</Text>
        <Text style={s.title}>Laporan sampah</Text>
        <Text style={s.sub}>Semua laporan, satu tempat.</Text>
      </View>
      {button("+ Buat laporan", () => newReport())}
      <TextInput
        accessibilityLabel="Cari laporan pada halaman ini"
        placeholder="Cari nomor atau deskripsi di halaman ini"
        style={s.input}
        value={query}
        onChangeText={setQuery}
      />
      <View style={s.between}>
        <Text style={s.label}>Daftar laporan</Text>
        <Text style={s.sub}>{rows?.length ?? 0} laporan</Text>
      </View>
      {rows?.map((report) => (
        <ReportRow
          key={report.id}
          report={report}
          disabled={busy}
          onPress={() => void run(() => detail(report.id))}
        />
      ))}
      {reports && !rows?.length && (
        <View style={s.card}>
          <Text>
            {query ? "Laporan tidak ditemukan." : "Belum ada laporan."}
          </Text>
          <Text style={s.sub}>
            {query
              ? "Coba kata kunci lain pada halaman ini."
              : "Foto dan catat lokasi sampah untuk membuat laporan."}
          </Text>
        </View>
      )}
      {reports && (
        <View style={s.card}>
          <Text style={s.sub}>
            Halaman {reports.current_page} dari {reports.last_page}
          </Text>
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
