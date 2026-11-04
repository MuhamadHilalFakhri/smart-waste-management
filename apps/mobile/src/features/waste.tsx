import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Auth from "./waste/auth-screen";
import { useWaste } from "./waste/context";
import Detail from "./waste/detail-screen";
import Form from "./waste/form-screen";
import History from "./waste/history-screen";
import Home from "./waste/home-screen";
import { Icon } from "./waste/icons";
import { Sidebar } from "./waste/sidebar";
import { s } from "./waste/styles";
import { colors } from "./waste/theme";
import { Text } from "./waste/typography";
export { WasteProvider } from "./waste/context";
export function WasteScreen({ screen }: { screen: string }) {
  const { ready, token, error, busy, run, load } = useWaste();
  const [menu, setMenu] = useState(false);
  if (!ready)
    return (
      <SafeAreaView style={[s.safe, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.brand} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="dark" />
      <View
        style={[
          s.row,
          {
            paddingHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderColor: colors.border,
          },
        ]}
      >
        {token ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buka menu"
            onPress={() => setMenu(true)}
            style={{ padding: 10 }}
          >
            <Icon name="menu" color={colors.ink} />
          </Pressable>
        ) : (
          <View style={s.symbol}>
            <Icon name="droplet" />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={s.row}>
            {token && <Icon name="droplet" size={22} />}
            <Text style={s.brand}>Smart Waste</Text>
          </View>
          <Text style={s.sub}>
            {token
              ? "Selamat datang di Smart Waste"
              : "Catat sampah. Pantau penanganannya."}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          key={screen}
          contentContainerStyle={s.container}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            token && screen !== "form" ? (
              <RefreshControl
                refreshing={busy}
                tintColor={colors.brand}
                colors={[colors.brand]}
                onRefresh={() => void run(() => load())}
              />
            ) : undefined
          }
        >
          {!!error && (
            <Text accessibilityRole="alert" style={s.error}>
              {error}
            </Text>
          )}
          {busy && (
            <ActivityIndicator
              color={colors.brand}
              accessibilityLabel="Memuat"
            />
          )}
          {!token ? (
            <Auth />
          ) : (
            <>
              {screen === "home" && <Home />}
              {screen === "history" && <History />}
              {screen === "form" && <Form />}
              {screen === "detail" && <Detail />}
            </>
          )}
          <Text style={[s.sub, { textAlign: "center", marginTop: 12 }]}>
            © {new Date().getFullYear()} Smart Waste
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
      {token && (
        <Sidebar open={menu} close={() => setMenu(false)} screen={screen} />
      )}
    </SafeAreaView>
  );
}
