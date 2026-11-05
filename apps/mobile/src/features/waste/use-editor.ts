import type { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { api, type Report } from "../../api";
import { deviceActions } from "./device";
import { appendReportPhoto } from "./report-photo";
import { reportErrors } from "./report-validation";
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
  function validate() {
    const errors = reportErrors({
      description,
      coords,
      hasPhoto: !!photo,
      editing: !!editing,
      mimeType: photo?.mimeType,
      fileSize: photo?.fileSize,
    });
    if (errors.length) throw new Error(errors.join("\n"));
  }
  async function save() {
    validate();
    if (!coords) return;
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
    validate,
    ...deviceActions(setPhoto, setCoords),
  };
}
