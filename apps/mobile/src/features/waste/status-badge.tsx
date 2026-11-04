import { View } from "react-native";
import { status } from "./status";
import { tones } from "./theme";
import { Text } from "./typography";
export function StatusBadge({ value }: { value: string }) {
  const tone = tones[value] ?? tones.pending;
  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: tone.background,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 3,
          backgroundColor: tone.color,
        }}
      />
      <Text style={{ color: tone.color, fontSize: 11 }}>
        {status[value] ?? value}
      </Text>
    </View>
  );
}
