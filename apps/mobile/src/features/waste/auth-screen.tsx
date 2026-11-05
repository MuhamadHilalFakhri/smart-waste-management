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
    confirm,
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
        {button(register ? "Daftar" : "Masuk", () => {
          if (!register) {
            void run(auth);
            return;
          }
          confirm(auth, {
            title: "Buat akun pelapor?",
            message:
              "Daftarkan akun menggunakan nama dan email yang telah diisi?",
            success: "Akun pelapor berhasil dibuat.",
            validate: () => {
              const errors = [];
              if (!name.trim() || name.trim().length > 100)
                errors.push("Nama wajib diisi, maksimal 100 karakter.");
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                errors.push("Isi alamat email yang valid.");
              if (password.length < 8)
                errors.push("Kata sandi minimal 8 karakter.");
              if (password !== confirmation)
                errors.push("Konfirmasi kata sandi tidak sesuai.");
              if (errors.length) throw new Error(errors.join("\n"));
            },
          });
        })}
        {button(
          register ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar",
          () => setRegister(!register),
          true,
        )}
      </View>
    </>
  );
}
