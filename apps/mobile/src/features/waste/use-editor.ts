import type { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import { api, type Report } from "../../api";
import { deviceActions } from "./device";
import { appendReportPhoto } from "./report-photo";
export function useEditor(
  load: () => Promise<void>,
  setScreen: (view: string) => void,
) {
  const [editing, setEditing] = useState<Report>();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [photo, setPhoto] = useState<ImagePickerAsset>();
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();
  function newReport(report?: Report) {
    setEditing(report);
    setDescription(report?.description ?? "");
    setCategory(report?.category ?? null);
    setCoords(
      report
        ? {
            latitude: Number(report.latitude),
            longitude: Number(report.longitude),
          }
        : undefined,
    );
    setPhoto(undefined);
    setScreen("form");
  }
  async function save() {
    if (description.trim().length < 10 || !coords || (!photo && !editing))
      throw new Error(
        "Isi deskripsi minimal 10 karakter, foto, dan lokasi GPS.",
      );
    const data = new FormData();
    data.append("description", description);
    data.append("latitude", String(coords.latitude));
    data.append("longitude", String(coords.longitude));
    data.append("category", category ?? "");
    if (photo) await appendReportPhoto(data, photo);
    if (editing) data.append("_method", "PUT");
    await api("reports" + (editing ? "/" + editing.id : ""), {
      method: "POST",
      body: data,
    });
    await load();
    setScreen("history");
    Alert.alert(
      "Laporan tersimpan",
      "Saran kategori AI akan muncul pada detail laporan.",
    );
  }
  return {
    editing,
    description,
    setDescription,
    category,
    setCategory,
    photo,
    coords,
    newReport,
    save,
    ...deviceActions(setPhoto, setCoords),
  };
}
