import { Modal, Pressable, ScrollView, View } from "react-native";
import { useControls } from "./controls";
import { s } from "./styles";
import { Text } from "./typography";

export type ActionMessage = {
  title: string;
  message: string;
  confirm?: boolean;
  destructive?: boolean;
};

export function ActionModal({
  value,
  busy,
  onClose,
  onConfirm,
}: {
  value?: ActionMessage;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { button } = useControls(busy);
  return (
    <Modal
      visible={!!value}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!busy) onClose();
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e1a1070",
          padding: 24,
        }}
      >
        <View
          accessibilityViewIsModal
          style={[
            s.card,
            { width: "100%", maxWidth: 420, maxHeight: "85%", gap: 16 },
          ]}
        >
          <Text
            accessibilityRole="header"
            style={{ fontSize: 22, fontWeight: "600" }}
          >
            {value?.title}
          </Text>
          <ScrollView style={{ flexShrink: 1 }}>
            <Text style={s.line}>{value?.message}</Text>
          </ScrollView>
          {button(
            value?.confirm ? "Batal" : "Mengerti",
            onClose,
            !!value?.confirm,
          )}
          {value?.confirm && (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: busy }}
              disabled={busy}
              onPress={onConfirm}
              style={[s.button, { opacity: busy ? 0.5 : 1 }]}
            >
              <View
                style={[
                  s.buttonInner,
                  {
                    backgroundColor: value.destructive ? "#b63838" : "#007f73",
                  },
                ]}
              >
                <Text style={s.buttonText}>
                  {busy
                    ? "Memproses…"
                    : value.destructive
                      ? "Ya, hapus"
                      : "Ya, simpan"}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}
