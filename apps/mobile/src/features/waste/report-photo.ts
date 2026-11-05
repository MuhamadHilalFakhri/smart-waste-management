import { fetch } from "expo/fetch";
import type { ImagePickerAsset } from "expo-image-picker";

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function appendReportPhoto(
  form: FormData,
  photo: ImagePickerAsset,
) {
  let blob: Blob;
  if (photo.file) {
    blob = photo.file;
  } else {
    const response = await fetch(photo.uri);
    if (!response.ok) {
      throw new Error("Foto tidak dapat dibaca. Silakan pilih foto kembali.");
    }
    blob = await response.blob();
  }

  const type = photo.mimeType || blob.type;
  const extension = extensions[type];
  if (!extension) {
    throw new Error("Gunakan foto JPEG, PNG, atau WebP.");
  }
  if (blob.size > 5 * 1024 * 1024) {
    throw new Error("Ukuran foto maksimal 5 MB.");
  }

  form.append("photo", new Blob([blob], { type }), `report.${extension}`);
}
