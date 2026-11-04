import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWaste } from "./context";
import { Icon, type IconName } from "./icons";
import { s } from "./styles";
import { colors as c } from "./theme";
import { Text } from "./typography";
export function Sidebar({
  open,
  close,
  screen,
}: {
  open: boolean;
  close: () => void;
  screen: string;
}) {
  const { setScreen, newReport, logout, run, busy } = useWaste();
  const links: {
    key: string;
    label: string;
    icon: IconName;
    action: () => void;
  }[] = [
    {
      key: "home",
      label: "Dashboard",
      icon: "dashboard",
      action: () => setScreen("home"),
    },
    {
      key: "history",
      label: "Laporan sampah",
      icon: "report",
      action: () => setScreen("history"),
    },
    {
      key: "form",
      label: "Buat laporan",
      icon: "plus",
      action: () => newReport(),
    },
  ];
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
      <View style={{ flex: 1 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tutup sidebar"
          onPress={close}
          style={[StyleSheet.absoluteFill, { backgroundColor: "#0e1a1070" }]}
        />
        <SafeAreaView
          style={{
            width: "80%",
            maxWidth: 280,
            height: "100%",
            backgroundColor: c.surface,
          }}
        >
          <View accessibilityViewIsModal style={{ flex: 1, padding: 18 }}>
            <View style={[s.between, { marginBottom: 26 }]}>
              <View style={s.row}>
                <View style={s.symbol}>
                  <Icon name="droplet" />
                </View>
                <View>
                  <Text style={s.brand}>Smart Waste</Text>
                  <Text
                    style={{ fontSize: 9, letterSpacing: 1, color: c.muted }}
                  >
                    MANAGEMENT CONSOLE
                  </Text>
                </View>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Tutup menu"
                onPress={close}
                hitSlop={10}
              >
                <Icon name="close" size={18} />
              </Pressable>
            </View>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: 6, paddingBottom: 20 }}
            >
              <Text style={[s.eyebrow, { color: c.muted, margin: 12 }]}>
                WORKSPACE
              </Text>
              {links.map((item) => {
                const active =
                  screen === item.key ||
                  (screen === "detail" && item.key === "history");
                return (
                  <Pressable
                    key={item.key}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active, disabled: busy }}
                    disabled={busy}
                    onPress={() => {
                      close();
                      item.action();
                    }}
                    style={[
                      s.row,
                      {
                        padding: 14,
                        borderRadius: 8,
                        backgroundColor: active ? c.ink : "transparent",
                        minHeight: 48,
                      },
                    ]}
                  >
                    <Icon
                      name={item.icon}
                      color={active ? c.lime : c.muted}
                      size={18}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        flex: 1,
                        color: active ? c.lime : c.muted,
                      }}
                    >
                      {item.label}
                    </Text>
                    {active && (
                      <View
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 3,
                          backgroundColor: c.lime,
                        }}
                      />
                    )}
                  </Pressable>
                );
              })}
              <View
                style={[
                  s.divider,
                  { marginTop: 22, paddingHorizontal: 10, gap: 12 },
                ]}
              >
                <View style={s.row}>
                  <Icon name="leaf" size={18} />
                  <Text style={{ fontSize: 12, fontWeight: "600" }}>
                    Lingkungan lebih baik
                  </Text>
                </View>
                <Text style={s.sub}>
                  Laporan yang tercatat,{"\n"}penanganan yang terpantau.
                </Text>
              </View>
            </ScrollView>
            <View style={s.divider}>
              <Pressable
                accessibilityRole="button"
                disabled={busy}
                onPress={() => {
                  close();
                  void run(logout);
                }}
                style={[s.row, { minHeight: 48, paddingHorizontal: 14 }]}
              >
                <Icon name="logout" color={c.muted} size={18} />
                <Text style={{ color: c.muted, fontSize: 13 }}>Keluar</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
