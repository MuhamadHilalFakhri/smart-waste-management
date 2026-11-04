# Pembagian Audio Tutorial Smart Waste

Audio `apps/tutorial/public/audio/narasi-tutorial.wav` berdurasi 6 menit 19,52 detik. Kecepatan dan isi suara dipertahankan. Batas adegan dicocokkan dengan naskah lalu dibulatkan ke frame terdekat pada 30 fps; perbedaan pembulatan maksimal sekitar 0,02 detik.

| Bagian | Waktu | Adegan |
|---|---:|---|
| Pembuka | 00:00.00–00:14.70 | Pengantar Smart Waste |
| Web 01 | 00:14.70–00:19.54 | Masuk sebagai Admin |
| Web 02 | 00:19.54–00:38.32 | Ringkasan laporan |
| Web 03 | 00:38.32–00:50.08 | Kategori dan aktivitas |
| Web 04 | 00:50.08–01:02.44 | Daftar laporan |
| Web 05 | 01:02.44–01:12.00 | Buat laporan |
| Web 06 | 01:12.00–01:17.82 | Foto dan koordinat |
| Web 07 | 01:17.82–01:36.12 | Detail laporan dan hasil AI |
| Web 08 | 01:36.12–01:46.58 | Ubah deskripsi atau kategori |
| Web 09 | 01:46.58–01:59.02 | Mulai tindak lanjut |
| Web 10 | 01:59.02–02:14.10 | Selesaikan laporan |
| Web 11 | 02:14.10–02:26.30 | Tolak laporan |
| Web 12 | 02:26.30–02:39.32 | Cari dan saring laporan |
| Web 13 | 02:39.32–02:45.90 | Ekspor CSV |
| Web 14 | 02:45.90–02:50.68 | Ringkasan pengguna |
| Web 15 | 02:50.68–02:54.60 | Cari akun pengguna |
| Web 16 | 02:54.60–03:00.72 | Tambah pengguna |
| Web 17 | 03:00.72–03:05.18 | Nonaktifkan akses |
| Android 01 | 03:05.18–03:15.64 | Daftar sebagai pelapor |
| Android 02 | 03:15.64–03:19.20 | Masuk ke aplikasi |
| Android 03 | 03:19.20–03:27.46 | Dashboard pelapor |
| Android 04 | 03:27.46–03:36.86 | Sidebar |
| Android 05 | 03:36.86–03:39.28 | Riwayat kosong |
| Android 06 | 03:39.28–03:42.62 | Buka formulir laporan |
| Android 07 | 03:42.62–03:52.24 | Validasi formulir |
| Android 08 | 03:52.24–04:01.26 | Pilih foto dari galeri |
| Android 09 | 04:01.26–04:08.46 | Ambil foto dengan kamera |
| Android 10 | 04:08.46–04:25.22 | Catat lokasi GPS dan izin |
| Android 11 | 04:25.22–04:34.42 | Tulis deskripsi temuan |
| Android 12 | 04:34.42–04:45.42 | Pilih kategori |
| Android 13 | 04:45.42–04:50.02 | Simpan laporan |
| Android 14 | 04:50.02–04:59.62 | Buka riwayat |
| Android 15 | 04:59.62–05:04.50 | Cari laporan |
| Android 16 | 05:04.50–05:12.82 | Periksa detail |
| Android 17 | 05:12.82–05:20.10 | Ulangi prediksi AI |
| Android 18 | 05:20.10–05:25.78 | Perbarui hasil AI |
| Android 19 | 05:25.78–05:33.32 | Ubah laporan Pending |
| Android 20 | 05:33.32–05:43.48 | Konfirmasi hapus |
| Android 21 | 05:43.48–05:57.16 | Periksa status dan histori |
| Android 22 | 05:57.16–06:05.72 | Keluar dari akun |
| Penutup | 06:05.72–06:19.52 | Rangkuman alur web dan Android |

Timeline utama berada di `apps/tutorial/src/narrationTimeline.ts`. Komposisi `TutorialSmartWaste` menggunakan audio utuh dari awal sampai akhir. Bab web dan Android dimulai sesuai cue sheet ini.
