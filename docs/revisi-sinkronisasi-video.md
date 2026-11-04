# Revisi ketajaman dan sinkronisasi

Video menggunakan 1440×900, sesuai piksel sumber web. Footage web mengisi seluruh frame tanpa teks tambahan. Frame perantara PNG dan CRF 14 menjaga detail saat ekspor. Ukuran piksel sumber tetap menjadi batas detail gambar.

Pergantian tampilan mengikuti ucapan tindakan, bukan jeda satu detik yang sama untuk semua adegan. Suara asli tetap berjalan utuh. Waktu berikut adalah saat hasil tindakan ditampilkan, sesudah kursor mencapai kontrol.

| Hasil tindakan | Detik rekaman |
|---|---:|
| Masuk Admin → dashboard | 21.02 |
| Sidebar → daftar laporan | 53.80 |
| Buat laporan → formulir | 65.14 |
| Perbarui In Progress | 113.30 |
| Simpan Completed | 123.22 |
| Simpan Rejected | 142.32 |
| Ekspor CSV | 162.62 |
| Daftar pelapor → formulir | 190.78 |
| Masuk pelapor → dashboard | 199.84 |
| Buka sidebar mobile | 210.36 |
| Pilih foto → pratinjau | 235.94 |
| Ambil GPS → koordinat contoh | 251.80 |
| Simpan laporan | 289.52 |
| Buka detail | 306.00 |
| Ulangi prediksi | 318.02 |
| Perbarui hasil AI | 322.80 |
| Buka perubahan laporan | 330.10 |
| Konfirmasi hapus | 338.82 |
| Contoh Batal pada konfirmasi | 341.82 |
| Keluar → halaman masuk | 361.41 |

Konfigurasi adegan berada di `apps/tutorial/src/narrationTimeline.ts`; waktu tindakan relatif berada di `apps/tutorial/src/actionTiming.ts`. Kamera dan izin GPS tetap memakai panduan UI karena materi sumber bukan rekaman sensor Android.
