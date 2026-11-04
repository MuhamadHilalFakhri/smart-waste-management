"""Create explicitly labelled report fixtures for the mobile UI tutorial."""
import json
import os
from pathlib import Path

import requests

root = Path(__file__).resolve().parents[3]
base = os.environ["TUTORIAL_API_URL"].rstrip("/") + "/api/v1"
login = requests.post(base + "/login", json={
    "email": os.environ["TUTORIAL_EMAIL"],
    "password": os.environ["TUTORIAL_PASSWORD"],
}, timeout=30)
login.raise_for_status()
headers = {"Authorization": "Bearer " + login.json()["token"], "Accept": "application/json"}
photo = root / ".cache/tutorial-assets/private/reports/bCHCjUByov4EfDaufbT7d0Nz4UQMZ6q75mrwmApt.jpg"
reports = []
descriptions = [
    "[Tutorial mobile] Sampah plastik di sisi taman. Koordinat contoh untuk demonstrasi.",
    "[Tutorial mobile] Laporan latihan untuk alur hapus. Koordinat contoh untuk demonstrasi.",
]
if os.environ.get("TUTORIAL_REPORT_MODE") == "delete":
    descriptions = descriptions[1:]
try:
    for description in descriptions:
        with photo.open("rb") as source:
            result = requests.post(base + "/reports", headers=headers,
                data={"description": description, "latitude": "-6.2", "longitude": "106.8", "category": ""},
                files={"photo": ("sampah-plastik.jpg", source, "image/jpeg")}, timeout=60)
        result.raise_for_status()
        report = result.json()
        reports.append({key: report[key] for key in ("id", "number", "description")})
    destination = root / ".cache/tutorial-mobile-reports.json"
    destination.write_text(json.dumps(reports, indent=2), encoding="utf-8")
    print(json.dumps(reports))
finally:
    requests.post(base + "/logout", headers=headers, timeout=30).raise_for_status()
