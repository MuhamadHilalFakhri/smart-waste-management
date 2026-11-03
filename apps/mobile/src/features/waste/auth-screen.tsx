import { Text, View } from "react-native";
import { useWaste } from "./context";
import { s } from "./styles";
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
    <View style={s.card}>
      <Text style={s.title}>{register ? "Buat akun" : "Masuk ke akun"}</Text>
      {register && field("Nama", name, setName)}
      {field("Email", email, setEmail)}
      {field("Kata sandi", password, setPassword, true)}
      {register &&
        field("Konfirmasi kata sandi", confirmation, setConfirmation, true)}
      {button(register ? "Daftar" : "Masuk", () => void run(auth))}
      {button(
        register ? "Sudah punya akun" : "Buat akun baru",
        () => setRegister(!register),
        true,
      )}
    </View>
  );
}
