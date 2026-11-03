# Hasil pemeriksaan, 3 November 2026

| Pemeriksaan | Hasil |
|---|---|
| composer test | Lulus: Pint, PHPStan level 7 tanpa error, 50 tes / 160 assertions |
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
