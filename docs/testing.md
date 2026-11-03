# Hasil pemeriksaan, 3 November 2026

| Pemeriksaan | Hasil |
|---|---|
| composer test | Lulus: Pint, PHPStan level 7 tanpa error, 54 tes / 180 assertions |
| TypeScript web dan build produksi | Lulus |
| TypeScript Expo dan expo lint | Lulus |
| Expo Doctor | 20/20 pemeriksaan lulus |
| Ekspor bundle Android | Lulus |
| Unit test FastAPI | 3/3 lulus dalam image CPU deployment |
| API + MySQL + worker + model nyata | Laporan foto plastik menghasilkan plastic, versi 9fdcea1e664b |
| Form web + model nyata | Upload foto kertas, tersimpan, menghasilkan Paper Waste |
| Status web + histori | Pending, In Progress, Completed berhasil |
| Pembatasan kepemilikan | Foto tanpa token 401; User tidak dapat menghapus laporan Completed |
| Pengguna web | Perubahan nama berhasil; route dan API Admin dibatasi |
| Responsive web | Viewport 390 px, documentWidth 390 px; tabel memakai scroll internal |
| Backup | SQL dan foto berhasil diekspor ke luar sandbox |
| Evaluasi Colab T4 | Accuracy testing 97,06%, 330/340 benar |

Tangkapan layar aktual berada di docs/screenshots. APK diverifikasi melalui hasil build EAS, integritas ZIP, AndroidManifest.xml, DEX, bundle aplikasi, dan origin API produksi dalam bundle. Pengujian kamera dan GPS pada perangkat Android fisik masih diperlukan. Video walkthrough tidak menggantikan pengujian perangkat fisik.

Regresi CSRF diuji dengan server Laravel nyata: setelah register tanpa reload, token meta lama menghasilkan 419; header cookie XSRF terbaru berhasil membuat laporan dengan 201.

Pembaruan UI shadcn: dashboard, laporan, dan pengguna diperiksa pada lebar 320, 390, 768, 844 (landscape), 1024, 1440, dan 2560 px. Tidak ada overflow halaman; tabel memakai scroll di panel. Dialog create/edit diperiksa pada 320×640 dengan tinggi maksimum 90dvh. Menu Sheet dapat membuka halaman laporan. Uji browser lokal berhasil menyimpan foto dan kategori, menampilkan hasil filter kosong, reset, mengunduh CSV, menyimpan nama pengguna, serta mencatat Pending → In Progress → Rejected dengan alasan. Ekspor CSV juga menangani koordinat bertipe angka dari SQLite. Console browser tidak mencatat error pada alur akhir.

`node infra/scripts/check-source-size.mjs`: 214 file source web/mobile lolos batas 250 baris; file terpanjang 248 baris. Source Wayfinder otomatis, dependency, lockfile, dan build dikecualikan. Pemecahan mobile lulus lint, TypeScript, ekspor bundle Android, dan 20/20 pemeriksaan Expo Doctor. APK rilis sebelumnya masih memakai snapshot source sebelumnya; perubahan mobile pada pembaruan ini berupa pemisahan modul dan perbaikan pembersihan sesi saat logout.

Penyelarasan ke tiga screenshot Lovable: header sapaan, sidebar, grid statistik, donut, prioritas, aksi cepat, aktivitas, daftar terbaru, filter laporan, dan tabel pengguna diperiksa ulang pada viewport referensi 1246 px. Pengujian responsif pada lebar 320, 390, 768, 1024, 1246, dan 2560 px tidak menemukan overflow halaman. Filter/reset laporan, pencarian pengguna dengan debounce, navigasi Sheet, menu workspace, serta dialog laporan (288×576 pada layar 320×640) berfungsi. Console browser tidak mencatat error pada alur akhir. TypeScript dan build produksi lolos. Pemeriksaan batas source: 221 file, terpanjang 248 baris.

Pembaruan sidebar/scroll: lebar sidebar 216 px terverifikasi. Pada tinggi desktop 390, 875, 900, dan 1440 px, footer Keluar tetap sekitar 16 px dari bawah. Gulir keyboard End pada ScrollArea utama mengubah scrollTop konten sementara scrollTop dokumen tetap 0. Pada ponsel 320×640, viewport halaman 556 px, tabel dapat digulir horizontal (scrollLeft > 0), serta dialog 288×576 memiliki viewport 576 px dengan isi 828 px; tombol simpan dapat dijangkau setelah menggulir. Sidebar Sheet pada landscape 844×390 memiliki area menu yang dapat digulir dan tombol Keluar tetap terlihat di bawah. Batas source tetap maksimal 250 baris per file.
