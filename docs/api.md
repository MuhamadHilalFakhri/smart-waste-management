# API v1

Origin: URL demo atau http://localhost:8080. Prefix `/api/v1`. Semua request memakai `Accept: application/json`.

| Method | Path | Fungsi |
|---|---|---|
| POST | /register | name, email, password, password_confirmation; role selalu user |
| POST | /login | email, password; mengembalikan user dan token |
| POST | /logout | Mencabut token saat ini |
| GET | /me | Profil |
| GET | /dashboard | Total, statuses, categories, trend |
| GET | /reports | Pagination; search, status, category, from, to, page |
| POST | /reports | Multipart description, photo, latitude, longitude, category opsional |
| GET | /reports/{id} | Detail dengan prediction dan histories |
| PUT/PATCH | /reports/{id} | Perubahan laporan; foto opsional |
| DELETE | /reports/{id} | Soft delete |
| GET | /reports/{id}/photo | Foto privat |
| POST | /reports/{id}/predict | Jadwalkan ulang prediksi |
| PATCH | /reports/{id}/status | Admin: status dan note; alasan wajib untuk rejected |

Selain register/login, tambahkan `Authorization: Bearer TOKEN`. Untuk mengganti foto melalui multipart gunakan POST dengan `_method=PUT`.

Kategori: organic, paper, plastic. Status: pending, in_progress, completed, rejected. Status prediksi: pending, succeeded, failed. Pilihan kategori pengguna tidak ditimpa AI.

Respons daftar: `{data: [...], current_page: 1, last_page: 1, total: 0, ...}`. Respons detail adalah objek laporan. Register dan create menghasilkan 201; retry 202; delete/logout 204. Error: 401 tidak login, 403 akses ditolak, 404 tidak ditemukan, 422 validasi, 429 rate limit. Validasi menggunakan `{message, errors: {field: [pesan]}}`.

Contoh login:
```sh
curl -X POST "$BASE/api/v1/login" -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{"email":"user@example.com","password":"your-password"}'
```

FastAPI internal: GET /health, GET /ready (503 jika model belum ada), POST /predict dengan multipart field file dan Bearer ML_TOKEN. Respons: `{label:"plastic",confidence:0.9,probabilities:{organic:0.05,paper:0.05,plastic:0.9},model_version:"sha-prefix"}`. Angka di sini hanya contoh format. Swagger layanan ML tersedia pada /docs di jaringan internal.
