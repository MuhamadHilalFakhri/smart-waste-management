import { LinearGradient } from "expo-linear-gradient";
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
      <LinearGradient
        colors={
          secondary
            ? [colors.surface, colors.surface]
            : [colors.brand, colors.lime]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.buttonInner}
      >
        <Text style={[s.buttonText, secondary && { color: colors.ink }]}>
          {label}
        </Text>
      </LinearGradient>
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
