import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WasteProvider } from "../features/waste";
export default function Layout() {
  const [loaded, error] = useFonts({
    Manrope: require("../../assets/fonts/Manrope.ttf"),
  });
  if (!loaded && !error)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color="#007f73" />
      </View>
    );
  return (
    <SafeAreaProvider>
      <WasteProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </WasteProvider>
    </SafeAreaProvider>
  );
}
