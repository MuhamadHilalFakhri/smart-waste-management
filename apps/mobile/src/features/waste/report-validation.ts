export function reportErrors({
  description,
  coords,
  hasPhoto,
  editing,
  mimeType,
  fileSize,
}: {
  description: string;
  coords?: { latitude: number; longitude: number };
  hasPhoto: boolean;
  editing: boolean;
  mimeType?: string;
  fileSize?: number;
}): string[] {
  const errors: string[] = [];
  if (description.trim().length < 10)
    errors.push("Deskripsi minimal 10 karakter.");
  if (description.trim().length > 5000)
    errors.push("Deskripsi maksimal 5.000 karakter.");
  if (!hasPhoto && !editing) errors.push("Foto sampah wajib dipilih.");
  if (!coords) errors.push("Ambil lokasi GPS sebelum menyimpan laporan.");
  else if (
    !Number.isFinite(coords.latitude) ||
    !Number.isFinite(coords.longitude) ||
    Math.abs(coords.latitude) > 90 ||
    Math.abs(coords.longitude) > 180
  )
    errors.push("Koordinat lokasi tidak valid. Ambil ulang lokasi GPS.");
  if (
    hasPhoto &&
    mimeType &&
    !["image/jpeg", "image/png", "image/webp"].includes(mimeType)
  )
    errors.push("Foto harus berupa JPEG, PNG, atau WebP.");
  if (fileSize && fileSize > 5 * 1024 * 1024)
    errors.push("Ukuran foto maksimal 5 MB.");
  return errors;
}
