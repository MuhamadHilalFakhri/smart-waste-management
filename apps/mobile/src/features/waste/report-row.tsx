import { Pressable, View } from "react-native";
import { categories, type Report } from "../../api";
import { Icon } from "./icons";
import { StatusBadge } from "./status-badge";
import { s } from "./styles";
import { Text } from "./typography";
export function ReportRow({
  report,
  onPress,
  disabled = false,
}: {
  report: Report;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Lihat laporan ${report.number}`}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [s.card, { opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={s.between}>
        <View style={s.row}>
          <View style={s.symbol}>
            <Icon name="report" />
          </View>
          <Text style={{ fontWeight: "600", fontSize: 13 }}>
            #{report.number.slice(0, 8)}
          </Text>
        </View>
        <StatusBadge value={report.status} />
      </View>
      <Text style={s.line} numberOfLines={3}>
        {report.description}
      </Text>
      <View style={[s.between, s.divider]}>
        <Text style={[s.sub, { flex: 1 }]}>
          {categories[report.category ?? ""] ?? "Belum dipilih"}
        </Text>
        <Icon name="arrow" size={17} />
      </View>
    </Pressable>
  );
}
