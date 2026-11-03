import { Image, Pressable, Text, TextInput, View } from "react-native";
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
      <Text style={s.title}>{editing ? "Ubah laporan" : "Laporan baru"}</Text>
      {photo && <Image source={{ uri: photo.uri }} style={s.photo} />}
      <View style={s.nav}>
        {button("Ambil foto", () => void run(() => pick(true)), true)}
        {button("Pilih foto", () => void run(() => pick(false)), true)}
      </View>
      <Text style={s.label}>Deskripsi</Text>
      <TextInput
        accessibilityLabel="Deskripsi"
        style={[s.input, { minHeight: 100 }]}
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
          style={s.choice}
          onPress={() => setCategory(category === k ? null : k)}
        >
          <Text>
            {category === k ? "●" : "○"} {v}
          </Text>
        </Pressable>
      ))}
      {button("Simpan laporan", () => void run(save))}
      {button("Batal", () => setScreen("history"), true)}
    </View>
  );
}
