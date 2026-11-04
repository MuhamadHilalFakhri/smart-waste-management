import { Image, Pressable, TextInput, View } from "react-native";
import { Text } from "./typography";
import { Icon } from "./icons";
import { colors } from "./theme";
import { categories } from "../../api";
import { useWaste } from "./context";
import { s } from "./styles";
export default function Screen() {
  const {
    editing,
    description,
    setDescription,
    category,
    setCategory,
    photo,
    coords,
    button,
    run,
    pick,
    gps,
    save,
    setScreen,
  } = useWaste();
  return (
    <View style={s.card}>
      <Text style={s.eyebrow}>WORKSPACE / BUAT LAPORAN</Text>
      <Text style={s.title}>{editing ? "Ubah laporan" : "Laporan baru"}</Text>
      <Text style={s.sub}>Sertakan foto, lokasi, dan deskripsi sampah.</Text>
      {photo && <Image source={{ uri: photo.uri }} style={s.photo} />}
      {!photo && (
        <View
          style={[
            s.card,
            {
              alignItems: "center",
              backgroundColor: colors.background,
              paddingVertical: 28,
            },
          ]}
        >
          <Icon name="camera" size={32} />
          <Text style={s.sub}>
            {editing
              ? "Pilih foto untuk mengganti foto laporan."
              : "Ambil foto atau pilih dari galeri."}
          </Text>
        </View>
      )}
      <View style={s.nav}>
        {button("Ambil foto", () => void run(() => pick(true)), true)}
        {button("Pilih foto", () => void run(() => pick(false)), true)}
      </View>
      <Text style={s.label}>Deskripsi</Text>
      <TextInput
        accessibilityLabel="Deskripsi"
        style={[s.input, { minHeight: 120, textAlignVertical: "top" }]}
        placeholder="Jelaskan kondisi dan lokasi sampah…"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      {button("Ambil lokasi GPS", () => void run(gps), true)}
      <Text style={s.sub}>
        {coords
          ? `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`
          : "Lokasi belum tersedia"}
      </Text>
      <Text style={s.label}>Kategori pilihan (opsional)</Text>
      {Object.entries(categories).map(([k, v]) => (
        <Pressable
          key={k}
          accessibilityRole="radio"
          accessibilityState={{ checked: category === k }}
          style={[
            s.choice,
            category === k && {
              borderColor: colors.brand,
              backgroundColor: colors.background,
            },
          ]}
          onPress={() => setCategory(category === k ? null : k)}
        >
          <Text style={{ color: category === k ? colors.brand : colors.ink }}>
            {category === k ? "●" : "○"} {v}
          </Text>
        </Pressable>
      ))}
      {button("Simpan laporan", () => void run(save))}
      {button("Batal", () => setScreen("history"), true)}
    </View>
  );
}
