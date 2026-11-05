# Smart Waste Management System

Monorepo Laravel 13 + Inertia React TypeScript, React Native Expo, FastAPI, MySQL, dan training Google Colab.

[Dokumen pengumpulan sesuai 10 ketentuan](docs/README.md).

## Mulai dengan Docker

1. Salin `.env.example` menjadi `.env`. Isi password database, ML_TOKEN, ADMIN_EMAIL, ADMIN_PASSWORD, dan APP_URL.
2. Buat APP_KEY: `php apps/web/artisan key:generate --show`, lalu simpan nilainya di `.env` root.
3. Jalankan `sh infra/sandbox/deploy.sh` pada host Linux dengan Docker Compose.
4. Buka `http://localhost:8080`. Admin dibuat hanya jika email tersebut belum ada.
5. Model belum terpasang ditampilkan sebagai layanan prediksi belum siap; pelaporan tetap berfungsi.

## Pengembangan web

PHP >=8.3, Composer 2, Node >=22.12, dan MySQL 8.

```sh
cd apps/web
composer install
cp .env.example .env
php artisan key:generate
# Atur DB_CONNECTION=mysql dan kredensial MySQL pada .env aplikasi.
php artisan migrate --seed
npm ci
npm run build
php artisan serve
# Terminal kedua:
php artisan queue:work --tries=1 --timeout=45
```

Untuk tes terisolasi, PHPUnit memakai SQLite in-memory. Database aplikasi demo menggunakan MySQL.

## Android

```sh
cd apps/mobile
npm ci
cp .env.example .env
# Isi EXPO_PUBLIC_API_URL dengan origin HTTPS backend, tanpa /api/v1.
npx expo start
# APK standalone:
npx eas-cli build --platform android --profile preview
```

Gunakan perangkat Android untuk kamera dan GPS. Profil APK tidak memerlukan Metro. Login akun Expo diperlukan untuk EAS Build.

## Training dan inference

[Lihat arsip hasil training di Google Colab](https://colab.research.google.com/github/MuhamadHilalFakhri/smart-waste-management/blob/main/ml/notebooks/training_results.ipynb), termasuk log epoch, classification report, confusion matrix, dan grafik. Untuk menjalankan ulang training, gunakan [notebook source](https://colab.research.google.com/github/MuhamadHilalFakhri/smart-waste-management/blob/main/ml/notebooks/train_waste.ipynb).

Buka `ml/notebooks/train_waste.ipynb` di Colab, pilih GPU T4 bila tersedia, jalankan semua sel. Notebook mandiri mengunduh RealWaste dan menjalankan training. Unduh arsip hasil, ekstrak ke `ml/artifacts/`, lalu restart layanan ML. Arsip berisi model.keras, metadata.json, manifest.csv, evaluation.json, confusion matrix, dan kurva training.

```sh
cd services/ml
python -m venv .venv
# Aktifkan virtual environment sesuai OS.
pip install -r requirements.lock
# Atur ML_TOKEN dan MODEL_DIR melalui environment.
uvicorn app.main:app --port 8001
```

Hasil training aktual: **97,06% accuracy testing** pada 340 gambar. Confusion matrix, classification report, dan metadata model tersedia dalam arsip hasil training di GitHub Releases.

## Pemeriksaan

```sh
cd apps/web
php artisan test
npm run types:check
npm run build
cd ../mobile
npx tsc --noEmit
```

## Hasil dan demo

- Repository: https://github.com/MuhamadHilalFakhri/smart-waste-management
- Website: https://8080-001m6e4ck17dvek9788p0t5q4fm.sbx.sandboxes-cloud.docker.com
- OpenAPI: endpoint web `/api-documentation` atau `apps/web/resources/openapi.json`.
- APK Android terbaru: versi 1.0.3 (build 3), tersedia di GitHub Releases.
- Model: accuracy testing 97,06%, 340 gambar testing, versi `9fdcea1e664b`.
- Dataset aktual: 2.262 gambar, 1.583 train / 339 validation / 340 test.
- Video walkthrough memakai tangkapan layar aplikasi aktual dan narasi sintetis bahasa Indonesia. Pengujian kamera/GPS di perangkat fisik masih diperlukan.

Model, dataset aktual, APK, dan video disediakan melalui GitHub Releases. Kredensial Admin demo disimpan lokal di `.cache/demo-credentials.txt` dan tidak dipublikasikan.

Unduhan lengkap: https://github.com/MuhamadHilalFakhri/smart-waste-management/releases/tag/v1.0.1
