import { Pressable, TextInput, View } from "react-native";
import { s } from "./styles";
import { Text } from "./typography";
import { colors } from "./theme";
export function useControls(busy: boolean) {
  const button = (label: string, onPress: () => void, secondary = false) => (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: busy }}
      disabled={busy}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        { opacity: busy ? 0.5 : pressed ? 0.75 : 1 },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          s.buttonInner,
          { backgroundColor: secondary ? colors.surface : colors.brand },
        ]}
      >
        <Text style={[s.buttonText, secondary && { color: colors.ink }]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
  const field = (
    label: string,
    value: string,
    onChangeText: (v: string) => void,
    secure = false,
  ) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={s.input}
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        autoCapitalize="none"
        placeholderTextColor={colors.muted}
        keyboardType={label === "Email" ? "email-address" : "default"}
        autoComplete={
          label === "Email" ? "email" : secure ? "current-password" : "name"
        }
      />
    </View>
  );
  return { button, field };
}
