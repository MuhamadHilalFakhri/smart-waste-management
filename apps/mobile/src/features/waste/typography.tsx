import { Text as NativeText, type TextProps } from "react-native";
import { colors } from "./theme";
export function Text({ style, ...props }: TextProps) {
  return (
    <NativeText
      {...props}
      style={[
        { fontFamily: "Manrope", fontSize: 14, color: colors.ink },
        style,
      ]}
    />
  );
}
