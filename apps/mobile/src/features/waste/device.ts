import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
export function deviceActions(
  setPhoto: (photo: ImagePicker.ImagePickerAsset) => void,
  setCoords: (coords: { latitude: number; longitude: number }) => void,
) {
  async function pick(camera: boolean) {
    const permission = camera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Izin dibutuhkan",
        "Aktifkan izin kamera atau foto melalui pengaturan.",
        [
          { text: "Pengaturan", onPress: () => void Linking.openSettings() },
          { text: "Tutup" },
        ],
      );
      return;
    }
    const result = camera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          quality: 0.75,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 0.75,
        });
    if (!result.canceled) setPhoto(result.assets[0]);
  }
  async function gps() {
    const p = await Location.requestForegroundPermissionsAsync();
    if (!p.granted) {
      Alert.alert(
        "Izin lokasi diperlukan",
        "Aktifkan izin lokasi untuk mencatat koordinat.",
        [
          { text: "Pengaturan", onPress: () => void Linking.openSettings() },
          { text: "Tutup" },
        ],
      );
      return;
    }
    const result = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setCoords(result.coords);
  }
  return { pick, gps };
}
