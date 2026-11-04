# Arah desain
Bahasa Indonesia, panel operasional hijau putih sesuai pilihan pengguna.
ENERGY 1 / RHYTHM 2 / MOTION 1.
Hijau menandai tindakan utama; putih dan abu terang menjaga keterbacaan data.
Tabel dipakai untuk membandingkan laporan. Form linear memudahkan pelaporan mobile.
Font sans sistem mengutamakan keterbacaan dan tidak memerlukan unduhan font.

## Halaman login
Mengikuti referensi React dan CSS dari pengguna: panel hijau di desktop, form dengan ikon, serta tombol gradasi. Gradasi panel memisahkan area pengantar dari form; gradasi tombol menandai aksi utama. Warna dan arah gradasi tombol mengikuti gambar referensi pengguna. Font sans sistem menjaga keterbacaan di semua perangkat. Panel disembunyikan di bawah 768 px, form memakai input 16 px dan target sentuh minimal 44 px, sementara halaman dapat digulir pada layar pendek. CSS dibatasi ke `.smart-login` sehingga token global dashboard tidak berubah.

## Halaman setelah login
Dashboard, laporan, dan pengguna mengikuti referensi React/CSS pengguna. Navigasi tetap melalui Inertia; data contoh diganti API Laravel dengan otorisasi, filter, dan pagination server. Komponen memakai shadcn/ui berbasis Radix: Button, Card, Input, Select, Dialog, Sheet, Badge, Alert, Table, dan Textarea. Token warna dibatasi ke `.waste-app`, termasuk portal dialog dan select. Sidebar desktop berubah menjadi Sheet di bawah 900 px. Kartu dan filter disusun ulang di bawah 600 px; tabel dapat digulir di dalam panel tanpa memperlebar halaman. Dialog dibatasi 90dvh agar judul dan tindakan tetap dapat dijangkau pada layar pendek.

## Batas panjang source
Source yang dipelihara untuk web dan mobile dibatasi maksimal 250 baris per file, dengan target di bawah 200 bila memungkinkan. Halaman, komponen fitur, hook, dan stylesheet dipisahkan berdasarkan tanggung jawab. Jalankan `node infra/scripts/check-source-size.mjs` dari root; pemeriksaan yang sama dijalankan CI. Dependensi, lockfile, artefak build, serta source Wayfinder yang dihasilkan otomatis (`actions`, `routes`, `wayfinder`) tidak termasuk pemeriksaan. Jangan mengedit atau memadatkan hasil generator untuk memenuhi batas ini.

Perbaikan login: stylesheet dasar diimpor sebelum stylesheet responsif melalui satu entry CSS agar aturan desktop tidak tertimpa. Panel desktop memakai lebar 34%, form maksimal 384 px, pengantar di bagian bawah panel, dan gradasi teal–hijau sesuai screenshot pengguna. Teks tetap dalam bahasa Indonesia untuk Smart Waste. Ukuran 1492×635 diperiksa langsung terhadap referensi, termasuk keberadaan panel kiri.

## Acuan screenshot halaman utama
Tiga screenshot Lovable yang diberikan pengguna menjadi acuan komposisi dashboard, laporan, dan pengguna. Header menampilkan avatar, sapaan, tanggal aktual, dan notifikasi Pending dari API. Judul dan menu workspace berada di area konten. Sidebar memakai ikon Leaf, penanda aktif gelap–hijau, tombol keluar, serta catatan lingkungan. Dashboard memakai susunan statistik 2:1:1:1:1, donut kategori, panel prioritas gelap, tiga aksi cepat, serta grafik dan daftar laporan terbaru berdampingan. Filter laporan berada dalam satu baris desktop; tanggal laporan dipindahkan ke kolom nomor. Font Manrope Latin di-host lokal dengan lisensi OFL di `apps/web/resources/fonts`.

Warna canvas, surface, ink, garis, dan status memakai token dari CSS referensi pengguna. Sidebar berganti menjadi Sheet di bawah 1024 px, grid disusun ulang pada tablet dan ponsel. Kategori, persentase, grafik, notifikasi, tanggal, dan daftar berasal dari data aktual; gambar bukan sumber data aplikasi.

## Sidebar ringkas dan ScrollArea
Sidebar desktop diperkecil menjadi 216 px; logo 18 px, ikon merek 32 px, serta menu 40 px dengan teks 11 px. Pada navigasi sentuh, tinggi menu tetap 44 px. Brand berada di atas, menu dan catatan lingkungan di dalam ScrollArea, dan tombol Keluar di footer terpisah agar selalu berada di bawah layar. Konten utama, sidebar, tabel horizontal, dan dialog menggunakan komponen ScrollArea shadcn/ui berbasis Radix. Header tetap di atas, halaman menggunakan tinggi 100dvh, dan hanya viewport konten yang bergulir. Viewport utama ditandai `scroll-region` untuk integrasi dengan Inertia. Scrollbar menggunakan warna hijau abu, dengan dukungan roda mouse, sentuhan, dan keyboard.
# Tampilan mobile mengikuti web

Aplikasi Expo memakai Manrope berlisensi OFL, latar hijau muda, kartu putih, ringkasan hijau gelap, serta aksen merek hijau. Gradasi pada tombol utama mengikuti hierarki tindakan pada web. Ikon garis menunjukkan laporan, kamera, lokasi, dan navigasi; tidak dipakai sebagai dekorasi. ENERGY 1 / RHYTHM 2 / MOTION 1.

Navigasi menggunakan sidebar sesuai permintaan: tombol menu pada header, item aktif, area menu yang dapat digulir, tombol tutup, backdrop, dukungan tombol Back Android, dan Keluar di bawah. Tidak ada navigasi bawah. Halaman login, ringkasan, daftar laporan, form, dan detail berbagi komponen tema, teks, tombol, serta badge status. Sentuhan minimal 48 px dan SafeAreaProvider menjaga area sistem ponsel.
