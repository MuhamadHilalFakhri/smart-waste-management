# Docker Cloud Sandbox

Target: sandbox milik pengguna pada Docker Agentic Platform. Gunakan `sbx --cloud ls` dan ID hasil sebenarnya.

1. Salin source ke direktori baru di sandbox menggunakan `sbx --cloud cp` atau clone repository.
2. Buat `.env` dari contoh, isi kredensial dan APP_KEY. Simpan rahasia hanya di environment, bukan Git.
3. Jalankan `sh infra/sandbox/deploy.sh`.
4. Publikasikan port 8080 dengan `sbx --cloud ports SANDBOX_ID --publish 8080`.
5. Gunakan URL yang dikembalikan untuk APP_URL dan EXPO_PUBLIC_API_URL; rebuild APK jika URL berubah.
6. Verifikasi /up, login, buat laporan, status worker, serta inference nyata.

Cloud sandbox dapat berhenti, restart, atau kedaluwarsa. Periksa TTL sebelum presentasi. Database dan foto memakai named volume selama sandbox tersedia. Ekspor ke luar sandbox dengan `infra/sandbox/backup.sh`; pulihkan memakai `restore.sh backup.sql photos.tar.gz`. Salin artefak model secara terpisah.

Hindari docker compose exec dan healthcheck berbasis exec pada cloud sandbox karena keterbatasan filesystem Docker Cloud. Setup dilakukan sebagai main process container sekali jalan; kesiapan HTTP diperiksa dari host sandbox. Jangan menganggap URL yang dipublikasikan berarti aplikasi sudah siap.
