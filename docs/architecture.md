# Arsitektur

```mermaid
flowchart LR
  Android[Expo Android] -->|Sanctum Bearer|Laravel[Laravel API]
  Browser[Web Inertia React] -->|Session|Laravel
  Laravel --> MySQL
  Laravel --> Queue[Database queue]
  Queue --> Worker
  Worker -->|Internal Bearer|FastAPI
  FastAPI --> Model[Model Keras]
  Colab -->|Artefak terlatih|Model
```

Laravel adalah sumber otorisasi dan data. User hanya mengelola laporannya saat Pending. Admin mengelola seluruh laporan dan pengguna. Transisi status dibatasi dan dicatat. Foto tersimpan privat, dengan akses melalui controller berotorisasi. Prediksi gagal tidak membatalkan laporan. Versi foto mencegah hasil pekerjaan lama menimpa foto terbaru.

Struktur Laravel: Form Request → Controller → Action → Model; Policy menangani kepemilikan; Job menghubungi PredictionClient. Expo menyimpan token di SecureStore. FastAPI tidak mengakses database.
