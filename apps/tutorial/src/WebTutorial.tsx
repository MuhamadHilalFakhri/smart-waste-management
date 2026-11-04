import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
import { MOBILE_SCENE_STARTS, sceneDurationInFrames, WEB_SCENE_STARTS } from "./narrationTimeline";
export function WebTutorial() {
  const { fps } = useVideoConfig();
  const sceneDuration = (index: number) => sceneDurationInFrames(WEB_SCENE_STARTS, index, MOBILE_SCENE_STARTS[0], fps);
  return (
    <Series>
      <Series.Sequence
        name="01 Masuk admin"
        durationInFrames={sceneDuration(0)}
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
        />
      </Series.Sequence>
      <Series.Sequence
        name="02 Ringkasan"
        durationInFrames={sceneDuration(1)}
        premountFor={fps}
      >
        <Step
          title="Baca ringkasan laporan"
          instruction="Dashboard menampilkan total laporan dan jumlah setiap status."
          image="web-dashboard"
          navigateFrom="web-login-filled"
          clickTarget={[965, 612]}
          cursor={[770, 300]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="03 Tren"
        durationInFrames={sceneDuration(2)}
        premountFor={fps}
      >
        <Step
          title="Pantau kategori dan aktivitas"
          instruction="Gulir untuk melihat distribusi kategori, tren, dan laporan terbaru."
          image="web-dashboard-trend"
          cursor={[760, 560]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="04 Laporan"
        durationInFrames={sceneDuration(3)}
        premountFor={fps}
      >
        <Step
          title="Buka Laporan sampah"
          instruction="Pilih menu pada sidebar. Setiap baris menyediakan tombol Lihat."
          image="web-reports"
          navigateFrom="web-dashboard-trend"
          clickTarget={[80, 205]}
          cursor={[110, 205]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="05 Deskripsi"
        durationInFrames={sceneDuration(4)}
        premountFor={fps}
      >
        <Step
          title="Buat laporan baru"
          instruction="Pilih Buat laporan, lalu jelaskan kondisi dan lokasi temuan sampah."
          image="web-report-form-filled"
          navigateFrom="web-reports"
          clickTarget={[1345, 235]}
          before="web-report-form-empty"
          typed="[Tutorial video] Sampah di dekat taman, perlu dipilah dan diangkut."
          field={[435, 352, 570, 86]}
          cursor={[700, 390]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="06 Foto lokasi"
        durationInFrames={sceneDuration(5)}
        premountFor={fps}
      >
        <Step
          title="Lengkapi foto dan koordinat"
          instruction="Gunakan JPEG, PNG, atau WebP maksimal 5 MB. Koordinat pada contoh ini adalah data demo."
          image="web-report-form-filled"
          cursor={[730, 520]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="07 Hasil AI"
        durationInFrames={sceneDuration(6)}
        premountFor={fps}
      >
        <Step
          title="Periksa detail dan saran AI"
          instruction="Laporan tersimpan terlebih dahulu. AI memproses foto dan menampilkan kategori beserta confidence."
          image="web-report-detail"
          navigateFrom="web-report-form-filled"
          clickTarget={[950, 735]}
          cursor={[720, 540]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="08 Koreksi laporan"
        durationInFrames={sceneDuration(7)}
        premountFor={fps}
      >
        <Step
          title="Ubah deskripsi atau kategori"
          instruction="Pilih Ubah. Kategori pilihan pelapor selalu didahulukan dari saran AI."
          image="web-report-edit"
          navigateFrom="web-report-detail"
          clickTarget={[475, 553]}
          cursor={[720, 565]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="09 In Progress"
        durationInFrames={sceneDuration(8)}
        premountFor={fps}
      >
        <Step
          title="Mulai tindak lanjut"
          instruction="Periksa catatan penanganan, lalu klik Perbarui status untuk memulai tindak lanjut."
          image="web-status-progress"
          navigateFrom="web-status-progress-form"
          clickTarget={[720, 698]}
          cursor={[720, 610]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="10 Completed"
        durationInFrames={sceneDuration(9)}
        premountFor={fps}
      >
        <Step
          title="Selesaikan penanganan"
          instruction="Klik Perbarui status pada formulir Completed. Pelaku, waktu, dan catatan tercatat dalam histori."
          image="web-status-completed"
          navigateFrom="web-status-completed-form"
          clickTarget={[720, 615]}
          cursor={[720, 570]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="11 Rejected"
        durationInFrames={sceneDuration(10)}
        premountFor={fps}
      >
        <Step
          title="Tolak dengan alasan yang jelas"
          instruction="Periksa alasan penolakan laporan duplikat, lalu klik Perbarui status untuk menyimpan keputusan."
          image="web-rejected"
          navigateFrom="web-rejection-form"
          clickTarget={[720, 698]}
          cursor={[720, 630]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="12 Filter"
        durationInFrames={sceneDuration(11)}
        premountFor={fps}
      >
        <Step
          title="Cari dan saring laporan"
          instruction="Gabungkan pencarian, status, kategori, serta rentang tanggal. Klik Terapkan; Reset filter mengosongkan pilihan."
          image="web-filters"
          cursor={[870, 345]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="13 Ekspor"
        durationInFrames={sceneDuration(12)}
        premountFor={fps}
      >
        <Step
          title="Unduh hasil filter"
          instruction="Pilih Ekspor untuk mengunduh CSV. Notifikasi mengonfirmasi bahwa berkas berhasil diunduh."
          image="web-export"
          cursor={[1190, 240]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="14 Pengguna"
        durationInFrames={sceneDuration(13)}
        premountFor={fps}
      >
        <Step
          title="Kelola akun pengguna"
          instruction="Menu Pengguna tersedia bagi Admin. Ringkasan menampilkan akun aktif dan jumlah administrator."
          image="web-users"
          navigateFrom="web-reports"
          clickTarget={[80, 250]}
          cursor={[110, 250]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="15 Cari akun"
        durationInFrames={sceneDuration(14)}
        premountFor={fps}
      >
        <Step
          title="Temukan akun yang akan diubah"
          instruction="Cari nama atau email, lalu pilih Ubah pada akun yang sesuai."
          image="web-user-search"
          navigateFrom="web-users"
          clickTarget={[1240, 460]}
          cursor={[1240, 460]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="16 Tambah akun"
        durationInFrames={sceneDuration(15)}
        premountFor={fps}
      >
        <Step
          title="Tambahkan pengguna"
          instruction="Isi nama, email, dan kata sandi. Tentukan role serta akses, lalu Simpan pengguna."
          image="web-user-form-filled"
          navigateFrom="web-user-search"
          clickTarget={[1335, 235]}
          cursor={[720, 440]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="17 Nonaktifkan"
        durationInFrames={sceneDuration(16)}
        premountFor={fps}
      >
        <Step
          title="Ubah akses dan simpan"
          instruction="Pilih Nonaktif untuk mencabut akses akun dan token aplikasi. Contoh hanya mengubah akun tutorial."
          image="web-user-disabled"
          navigateFrom="web-user-form-filled"
          clickTarget={[938, 660]}
          cursor={[1070, 580]}
        />
      </Series.Sequence>
    </Series>
  );
}
