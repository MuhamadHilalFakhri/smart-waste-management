# Tutorial Smart Waste

Source Remotion berada di `apps/tutorial`. Komposisi utama `TutorialSmartWaste` berdurasi 9 menit 24 detik, 1920×1080, 30 fps. Bab web dan mobile juga tersedia sebagai komposisi terpisah. Preview dibuka melalui `npm run dev -- --no-open` dari folder tersebut. Source menggunakan Remotion 4.0.540, Manrope lokal, dan logo droplet proyek.

Materi terdiri dari tangkapan layar UI yang berjalan, animasi ketikan, kursor/tanda sentuh, dan zoom masuk/keluar. Materi bukan rekaman layar kontinu. Tidak ada narasi suara pada versi ini. Setiap langkah memiliki petunjuk teks. Data akun dan laporan khusus tutorial ditandai dengan nama atau deskripsi Tutorial; koordinat -6.2, 106.8 adalah contoh.

## Cakupan praktik

| Bagian | Materi |
|---|---|
| Web | Login/logout, statistik dashboard, kategori dan tren, buat laporan dengan foto dan koordinat contoh, hasil AI, edit kategori/deskripsi, status In Progress/Completed/Rejected beserta catatan dan histori, filter tanggal/status/kategori/pencarian, ekspor CSV, tambah/cari/ubah/nonaktifkan pengguna |
| UI mobile | Register/login/logout, dashboard dan keadaan kosong, sidebar, formulir, validasi, pilih foto dari galeri, ketik deskripsi, pilih kategori, simpan perubahan Pending, riwayat/pencarian, detail foto yang terotorisasi, ulangi AI/perbarui detail, konfirmasi dan hasil hapus, status dan histori setelah admin memperbarui dari web |
| Panduan perangkat | Tombol Ambil foto dan Ambil lokasi GPS dijelaskan melalui UI. Izin kamera, pengambilan kamera nyata, sensor GPS, dan perubahan pengaturan izin pada HP tidak direkam. Emulator dihentikan sesuai arahan untuk memakai UI yang sudah ada. |

Foto contoh berasal dari dataset RealWaste (UCI), berlisensi CC BY 4.0; atribusi lengkap terdapat pada dokumentasi dataset proyek. Hasil AI yang ditampilkan berasal dari eksekusi layanan ML pada foto contoh. Jangan menafsirkan satu confidence sebagai accuracy model secara keseluruhan.

## Verifikasi

`npm run lint`, `node scripts/check-assets.mjs`, serta pemeriksaan source maksimal 250 baris dijalankan. Frame login/ketikan web dan beberapa frame mobile dirender sebagai PNG untuk pemeriksaan visual. Pratinjau Studio diperiksa pada komposisi utama dan bab mobile. Ekspor MP4 dilakukan melalui Render pada Studio atau `npx remotion render TutorialSmartWaste out/tutorial-smart-waste.mp4` ketika ekspor diminta. Berkas hasil ekspor tidak dimasukkan Git.
