# Tutorial Smart Waste

Source Remotion berada di `apps/tutorial`. Komposisi utama `TutorialSmartWaste` berdurasi 6 menit 19,52 detik, 1440×900, 30 fps, mengikuti rekaman suara yang diberikan. Bab web dan mobile juga tersedia sebagai komposisi terpisah. Preview dibuka melalui `npm run dev -- --no-open` dari folder tersebut. Source menggunakan Remotion 4.0.540, Manrope lokal, dan logo droplet proyek. Lihat [naskah lengkap](naskah-narasi-lengkap.txt) dan [pembagian audio per adegan](pembagian-audio-tutorial.md).

Materi terdiri dari tangkapan layar UI aktual yang ditampilkan utuh tanpa bingkai atau crop tambahan, animasi ketikan, serta klik kursor sederhana sebelum tampilan tujuan muncul. Tidak ada zoom atau efek detak kursor. Materi bukan rekaman layar kontinu. Durasi tiap adegan mengikuti bagian narasi dan bervariasi. Data akun dan laporan tutorial ditandai dengan nama atau deskripsi Tutorial; koordinat -6.2, 106.8 adalah contoh.

## Cakupan praktik

| Bagian | Materi |
|---|---|
| Web | Login/logout, statistik dashboard, kategori dan tren, buat laporan dengan foto dan koordinat contoh, hasil AI, edit kategori/deskripsi, status In Progress/Completed/Rejected beserta catatan dan histori, filter tanggal/status/kategori/pencarian, ekspor CSV, tambah/cari/ubah/nonaktifkan pengguna |
| UI mobile | Register/login/logout, dashboard dan keadaan kosong, sidebar, formulir, validasi, pilih foto dari galeri, ketik deskripsi, pilih kategori, simpan perubahan Pending, riwayat/pencarian, detail foto yang terotorisasi, ulangi AI/perbarui detail, konfirmasi dan hasil hapus, status dan histori setelah admin memperbarui dari web |
| Panduan perangkat | Tombol Ambil foto dan Ambil lokasi GPS dijelaskan melalui UI. Izin kamera, pengambilan kamera nyata, sensor GPS, dan perubahan pengaturan izin pada HP tidak direkam. Emulator dihentikan sesuai arahan untuk memakai UI yang sudah ada. |

Foto contoh berasal dari dataset RealWaste (UCI), berlisensi CC BY 4.0; atribusi lengkap terdapat pada dokumentasi dataset proyek. Hasil AI yang ditampilkan berasal dari eksekusi layanan ML pada foto contoh. Jangan menafsirkan satu confidence sebagai accuracy model secara keseluruhan.

## Verifikasi

Petunjuk singkat per adegan tersedia dalam format JSON pada `apps/tutorial/scripts/narration.json`. Audio tersimpan di `apps/tutorial/public/audio/narasi-tutorial.wav`; daftar cue terdapat pada `pembagian-audio-tutorial.md`. Periksa dengan `npm run lint`, `node scripts/check-assets.mjs`, dan `node infra/scripts/check-source-size.mjs`. Ekspor MP4 tersedia melalui tombol Render di Studio atau `npx remotion render TutorialSmartWaste out/tutorial-smart-waste-revisi.mp4 --crf=14 --image-format=png`.
