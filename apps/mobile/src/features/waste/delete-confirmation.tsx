import { Modal, Pressable, View } from "react-native";
import { useControls } from "./controls";
import { s } from "./styles";
import { Text } from "./typography";

export function DeleteConfirmation({
  open,
  busy,
  onClose,
  onConfirm,
}: {
  open: boolean;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { button } = useControls(busy);
  return (
    <Modal
      visible={open}
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
          style={[s.card, { width: "100%", maxWidth: 400, gap: 16 }]}
        >
          <Text
            accessibilityRole="header"
            style={{ fontSize: 22, fontWeight: "600" }}
          >
            Hapus laporan?
          </Text>
          <Text style={s.line}>
            Laporan akan diarsipkan dan dihapus dari daftar.
          </Text>
          {button("Batal", onClose, true)}
          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={onConfirm}
            style={[s.button, { opacity: busy ? 0.5 : 1 }]}
          >
            <View style={[s.buttonInner, { backgroundColor: "#b63838" }]}>
              <Text style={s.buttonText}>Ya, hapus laporan</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
