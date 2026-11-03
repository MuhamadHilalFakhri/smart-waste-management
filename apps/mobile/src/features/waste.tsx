import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Auth from "./waste/auth-screen";
import { useWaste } from "./waste/context";
import Detail from "./waste/detail-screen";
import Form from "./waste/form-screen";
import History from "./waste/history-screen";
import Home from "./waste/home-screen";
import { s } from "./waste/styles";
export { WasteProvider } from "./waste/context";
export function WasteScreen({ screen }: { screen: string }) {
  const { ready, token, error, busy, button, setScreen, newReport } =
    useWaste();
  if (!ready)
    return (
      <SafeAreaView style={s.safe}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={s.brand}>Smart Waste</Text>
        <Text style={s.sub}>Catat sampah. Pantau penanganannya.</Text>
        {error !== "" && (
          <Text accessibilityRole="alert" style={s.error}>
            {error}
          </Text>
        )}
        {busy && <ActivityIndicator color="#216b45" />}
        {!token ? (
          <Auth />
        ) : (
          <>
            <View style={s.nav}>
              {button("Dashboard", () => setScreen("home"), true)}
              {button("Riwayat", () => setScreen("history"), true)}
              {button("Lapor", () => newReport(), true)}
            </View>
            {screen === "home" && <Home />}
            {screen === "history" && <History />}
            {screen === "form" && <Form />}
            {screen === "detail" && <Detail />}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
