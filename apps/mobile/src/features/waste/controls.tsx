import { Pressable, Text, TextInput, View } from "react-native";
import { s } from "./styles";
export function useControls(busy: boolean) {
  const button = (label: string, onPress: () => void, secondary = false) => (
    <Pressable
      accessibilityRole="button"
      disabled={busy}
      style={[s.button, secondary && s.secondary, busy && { opacity: 0.5 }]}
      onPress={onPress}
    >
      <Text style={[s.buttonText, secondary && { color: "#216b45" }]}>
        {label}
      </Text>
    </Pressable>
  );
  const field = (
    label: string,
    value: string,
    onChangeText: (v: string) => void,
    secure = false,
  ) => (
    <View>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={s.input}
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        autoCapitalize="none"
      />
    </View>
  );
  return { button, field };
}
