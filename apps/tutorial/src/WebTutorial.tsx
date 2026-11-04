import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
export function WebTutorial() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="01 Masuk admin"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Masuk sebagai Admin"
          instruction="Isi email dan kata sandi, kemudian pilih Masuk."
          image="web-login-filled"
          before="web-login-empty"
          typed="admin@smartwaste.test"
          field={[828, 367, 315, 44]}
          cursor={[1000, 390]}
          zoom={1.6}
        />
      </Series.Sequence>
      <Series.Sequence
        name="02 Ringkasan"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Baca ringkasan laporan"
          instruction="Dashboard menampilkan total laporan dan jumlah setiap status."
          image="web-dashboard"
          cursor={[770, 300]}
          zoom={1.2}
        />
      </Series.Sequence>
      <Series.Sequence
        name="03 Tren"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Pantau kategori dan aktivitas"
          instruction="Gulir untuk melihat distribusi kategori, tren, dan laporan terbaru."
          image="web-dashboard-trend"
          cursor={[760, 560]}
          zoom={1.3}
        />
      </Series.Sequence>
      <Series.Sequence
        name="04 Laporan"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Buka Laporan sampah"
          instruction="Pilih menu pada sidebar. Setiap baris menyediakan tombol Lihat."
          image="web-reports"
          cursor={[110, 205]}
          zoom={1.2}
        />
      </Series.Sequence>
      <Series.Sequence
        name="05 Deskripsi"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Buat laporan baru"
          instruction="Pilih Buat laporan, lalu jelaskan kondisi dan lokasi temuan sampah."
          image="web-report-form-filled"
          before="web-report-form-empty"
          typed="[Tutorial video] Sampah di dekat taman, perlu dipilah dan diangkut."
          field={[435, 352, 570, 86]}
          cursor={[700, 390]}
          zoom={1.5}
        />
      </Series.Sequence>
      <Series.Sequence
        name="06 Foto lokasi"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Lengkapi foto dan koordinat"
          instruction="Gunakan JPEG, PNG, atau WebP maksimal 5 MB. Koordinat pada contoh ini adalah data demo."
          image="web-report-form-filled"
          cursor={[730, 520]}
          zoom={1.45}
        />
      </Series.Sequence>
      <Series.Sequence
        name="07 Hasil AI"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Periksa detail dan saran AI"
          instruction="Laporan tersimpan terlebih dahulu. AI memproses foto dan menampilkan kategori beserta confidence."
          image="web-report-detail"
          cursor={[720, 540]}
          zoom={1.4}
        />
      </Series.Sequence>
      <Series.Sequence
        name="08 Koreksi laporan"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Ubah deskripsi atau kategori"
          instruction="Pilih Ubah. Kategori pilihan pelapor selalu didahulukan dari saran AI."
          image="web-report-edit"
          cursor={[720, 565]}
          zoom={1.5}
        />
      </Series.Sequence>
      <Series.Sequence
        name="09 In Progress"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Mulai tindak lanjut"
          instruction="Admin mengubah Pending menjadi In Progress dan menambahkan catatan penanganan."
          image="web-status-progress-form"
          cursor={[720, 610]}
          zoom={1.4}
        />
      </Series.Sequence>
      <Series.Sequence
        name="10 Completed"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Selesaikan penanganan"
          instruction="Ubah In Progress menjadi Completed. Pelaku, waktu, dan catatan tersimpan pada histori."
          image="web-status-completed"
          cursor={[720, 570]}
          zoom={1.45}
        />
      </Series.Sequence>
      <Series.Sequence
        name="11 Rejected"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Tolak dengan alasan yang jelas"
          instruction="Pilih Rejected dan isi alasan penolakan. Contoh menggunakan laporan duplikat khusus tutorial."
          image="web-rejection-form"
          cursor={[720, 630]}
          zoom={1.45}
        />
      </Series.Sequence>
      <Series.Sequence
        name="12 Filter"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Cari dan saring laporan"
          instruction="Gabungkan pencarian, status, kategori, serta rentang tanggal. Klik Terapkan; Reset filter mengosongkan pilihan."
          image="web-filters"
          cursor={[870, 345]}
          zoom={1.35}
        />
      </Series.Sequence>
      <Series.Sequence
        name="13 Ekspor"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Unduh hasil filter"
          instruction="Pilih Ekspor untuk mengunduh CSV. Notifikasi mengonfirmasi bahwa berkas berhasil diunduh."
          image="web-export"
          cursor={[1190, 240]}
          zoom={1.4}
        />
      </Series.Sequence>
      <Series.Sequence
        name="14 Pengguna"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Kelola akun pengguna"
          instruction="Menu Pengguna tersedia bagi Admin. Ringkasan menampilkan akun aktif dan jumlah administrator."
          image="web-users"
          cursor={[110, 250]}
          zoom={1.25}
        />
      </Series.Sequence>
      <Series.Sequence
        name="15 Tambah akun"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Tambahkan pengguna"
          instruction="Isi nama, email, dan kata sandi. Tentukan role serta akses, lalu Simpan pengguna."
          image="web-user-form-filled"
          cursor={[720, 440]}
          zoom={1.5}
        />
      </Series.Sequence>
      <Series.Sequence
        name="16 Cari akun"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Temukan akun yang akan diubah"
          instruction="Cari nama atau email, lalu pilih Ubah pada akun yang sesuai."
          image="web-user-search"
          cursor={[1240, 460]}
          zoom={1.4}
        />
      </Series.Sequence>
      <Series.Sequence
        name="17 Nonaktifkan"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          title="Ubah akses dan simpan"
          instruction="Pilih Nonaktif untuk mencabut akses akun dan token aplikasi. Contoh hanya mengubah akun tutorial."
          image="web-user-disabled"
          cursor={[1070, 580]}
          zoom={1.4}
        />
      </Series.Sequence>
    </Series>
  );
}
