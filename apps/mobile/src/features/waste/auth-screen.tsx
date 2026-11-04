import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWaste } from "./context";
import { s } from "./styles";
import { Text } from "./typography";
import { Icon } from "./icons";
import { colors } from "./theme";
export default function Screen() {
  const {
    field,
    register,
    setRegister,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmation,
    setConfirmation,
    button,
    run,
    auth,
  } = useWaste();
  return (
    <>
      <LinearGradient
        colors={["#123219", "#72b636"]}
        style={{ padding: 24, borderRadius: 12, gap: 12 }}
      >
        <Text style={{ color: colors.white, fontSize: 23, fontWeight: "600" }}>
          Lingkungan lebih baik.
        </Text>
        <Text style={{ color: "#edf5e8", lineHeight: 22 }}>
          Laporan yang tercatat, penanganan yang terpantau.
        </Text>
      </LinearGradient>
      <View style={[s.card, { paddingVertical: 28 }]}>
        <View style={{ alignItems: "center", gap: 14, marginBottom: 14 }}>
          <Icon name="droplet" size={36} />
          <Text style={[s.title, { textAlign: "center" }]}>
            {register ? "Buat akun pelapor" : "Selamat datang kembali"}
          </Text>
          <Text style={s.sub}>
            {register
              ? "Mulai catat dan pantau laporan sampah."
              : "Masuk untuk melanjutkan laporan Anda."}
          </Text>
        </View>
        <View>
          {register && field("Nama", name, setName)}
          {field("Email", email, setEmail)}
          {field("Kata sandi", password, setPassword, true)}
          {register &&
            field("Konfirmasi kata sandi", confirmation, setConfirmation, true)}
        </View>
        {button(register ? "Daftar" : "Masuk", () => void run(auth))}
        {button(
          register ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar",
          () => setRegister(!register),
          true,
        )}
      </View>
    </>
  );
}
