Smart Waste Management System: Laravel 13 + Inertia React TypeScript, Expo Android, FastAPI, dan MySQL.

Hasil training nyata Google Colab: accuracy testing 97,06% pada 340 gambar. Dataset bersih: 2.262 gambar RealWaste (CC BY 4.0), split train/validation/test 1.583/339/340.

Artefak:
- trained-model.zip: model Keras, metadata, evaluasi, confusion matrix, kurva, manifest, dan sampel pengujian.
- dataset-used.zip: seluruh gambar yang benar-benar dipakai beserta manifest dan sumber/lisensi.
- demo-smart-waste.mp4: video walkthrough 2 menit 49 detik, tangkapan layar aktual dan narasi sintetis bahasa Indonesia.
- smart-waste-android.apk: APK standalone hasil build Expo EAS `8eb46061-2de3-4b0f-b321-4c0d0ce8e850` (snapshot mobile `ad0ac6d`).

Website demo: https://8080-001m6e4ck17dvek9788p0t5q4fm.sbx.sandboxes-cloud.docker.com

README, OpenAPI, ERD, notebook Colab, dan hasil pengujian tersedia di repository. Pengujian perangkat Android fisik untuk kamera/GPS masih diperlukan.

Pemeriksaan akhir: Pint lulus, PHPStan level 7 tanpa error, 50 tes Laravel / 160 assertions, 3 tes FastAPI, lint dan TypeScript Expo, serta build web. SHA256SUMS.txt memuat checksum artefak.

Patch web v1.0.1: header CSRF memakai cookie terbaru setelah login/register Inertia. Probe HTTP nyata membuktikan token meta lama ditolak 419 dan cookie terbaru berhasil menyimpan laporan 201. Artefak model, dataset, APK, dan video tetap memakai hasil terverifikasi yang sama.
