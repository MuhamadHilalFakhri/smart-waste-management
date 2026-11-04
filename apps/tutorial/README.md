# Tutorial Smart Waste dengan Remotion

Komposisi `TutorialSmartWaste`: 1920×1080, 30 fps, 9 menit 24 detik. Tersedia pula `TutorialWeb`, `TutorialMobile`, dan `Pembuka` untuk meninjau bab secara terpisah.

```powershell
cd D:\Assesment\apps\tutorial
npm ci
npm run dev -- --no-open --port=3090
```

Buka `http://localhost:3090/TutorialSmartWaste`. Tekan Play untuk melihat animasi ketikan, kursor/tanda sentuh, serta zoom masuk/keluar. Timeline berisi langkah dengan timing yang dapat disunting terpisah. Source per file dibatasi 250 baris.

```powershell
npm run lint
node scripts/check-assets.mjs
npm run build
```

Untuk ekspor MP4 ketika dibutuhkan:

```powershell
npx remotion render TutorialSmartWaste out/tutorial-smart-waste.mp4
```

Jika unduhan Chrome otomatis terhambat, gunakan instalasi Chrome lokal dengan opsi `--browser-executable="C:/Program Files/Google/Chrome/Application/chrome.exe"`.

Materi memakai tangkapan layar UI aktual dan data contoh yang ditandai Tutorial, bukan rekaman layar kontinu. Tidak ada narasi suara. Kamera dan GPS dijelaskan sebagai panduan penggunaan di HP, bukan rekaman izin atau sensor perangkat. Koordinat pada laporan adalah contoh. Lihat `../../docs/tutorial-video.md` untuk daftar cakupan.

Foto: RealWaste, UCI, CC BY 4.0; sumber dan atribusi mengikuti dokumentasi dataset proyek. Font Manrope disertakan dengan OFL di `public/Manrope-OFL.txt`. Logo mengikuti droplet hijau Smart Waste.

Script `scripts/prepare_demo.py` hanya untuk menyiapkan laporan contoh di backend yang ditentukan. Script membaca `TUTORIAL_API_URL`, `TUTORIAL_EMAIL`, dan `TUTORIAL_PASSWORD` dari environment. Set `TUTORIAL_REPORT_MODE=delete` bila hanya memerlukan laporan latihan hapus. Script membuat data baru setiap dijalankan; jangan jalankan pada backend lain tanpa memastikan tujuannya.
