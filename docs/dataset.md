# Dataset dan sumber

Dataset sumber: **RealWaste**, Single, Iranmanesh, dan Raad (2023), UCI Machine Learning Repository.

- [Halaman sumber RealWaste](https://archive.ics.uci.edu/dataset/908/realwaste)
- DOI: [10.24432/C5SS4G](https://doi.org/10.24432/C5SS4G)
- Lisensi: CC BY 4.0.
- [Dataset yang digunakan](https://github.com/MuhamadHilalFakhri/smart-waste-management/releases/download/v1.0.1/dataset-used.zip), termasuk manifest dan sumber/lisensi.
- [Manifest pembagian gambar](../ml/manifests/split.csv).
- [Source persiapan dataset](../ml/scripts/prepare_dataset.py).

| Label RealWaste | Label model | Kategori aplikasi |
|---|---|---|
| Food Organics, Vegetation | organic | Organic Waste |
| Paper | paper | Paper Waste |
| Plastic | plastic | Plastic Waste |

Sebanyak 2.268 gambar pada kategori sumber diproses menjadi 2.262 gambar setelah enam gambar duplikat atau sangat mirip dihapus sebelum pembagian data.

| Pembagian | Jumlah gambar |
|---|---:|
| Training | 1.583 |
| Validation | 339 |
| Testing | 340 |
| Total | 2.262 |

Pembagian dilakukan secara stratified dengan seed tetap. Dataset testing digunakan untuk evaluasi final; pemilihan model menggunakan validation set. Atribusi RealWaste tetap disertakan pada dataset distribusi.
