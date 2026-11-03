# ERD

```mermaid
erDiagram
 USERS ||--o{ REPORTS : creates
 REPORTS ||--o| REPORT_PREDICTIONS : has
 REPORTS ||--o{ REPORT_STATUS_HISTORIES : records
 USERS ||--o{ REPORT_STATUS_HISTORIES : changes
 USERS { bigint id PK
 string name
 string email UK
 string password
 string role
 boolean is_active }
 REPORTS { bigint id PK
 uuid number UK
 bigint user_id FK
 text description
 string photo_path
 uuid photo_version
 decimal latitude
 decimal longitude
 string category
 string status
 timestamp deleted_at }
 REPORT_PREDICTIONS { bigint id PK
 bigint report_id FK
 string status
 string label
 float confidence
 json probabilities
 string model_version }
 REPORT_STATUS_HISTORIES { bigint id PK
 bigint report_id FK
 bigint user_id FK
 string from_status
 string to_status
 text note }
```

Semua tabel domain memiliki created_at dan updated_at. Migration Laravel merupakan schema yang dapat dijalankan. Tabel sessions, jobs, cache, dan personal_access_tokens mendukung autentikasi dan queue.
