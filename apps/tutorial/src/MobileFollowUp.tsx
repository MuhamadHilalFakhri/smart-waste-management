import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
import { CLOSING_START_SECONDS, MOBILE_SCENE_STARTS, sceneDurationInFrames } from "./narrationTimeline";
export function MobileFollowUp() {
  const { fps } = useVideoConfig();
  const sceneDuration = (index: number) => sceneDurationInFrames(MOBILE_SCENE_STARTS, index, CLOSING_START_SECONDS, fps);
  return (
    <Series>
      <Series.Sequence
        name="14 Riwayat"
        durationInFrames={sceneDuration(13)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Buka riwayat laporan"
          instruction="Lihat nomor laporan, deskripsi, kategori, dan status. Ketuk salah satu laporan untuk membuka detail."
          image="mobile-history"
          cursor={[190, 410]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="15 Pencarian"
        durationInFrames={sceneDuration(14)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Cari laporan pada halaman"
          instruction="Masukkan nomor atau deskripsi pada pencarian. Hapus kata kunci untuk menampilkan kembali semua laporan pada halaman tersebut."
          image="mobile-search"
          cursor={[190, 280]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="16 Detail"
        durationInFrames={sceneDuration(15)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Periksa detail laporan"
          instruction="Detail berisi foto, deskripsi, koordinat, kategori pilihan, serta saran AI dan confidence. Data lokasi pada tutorial adalah contoh."
          image="mobile-detail"
          navigateFrom="mobile-history"
          clickTarget={[195, 430]}
          cursor={[190, 380]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="17 Ulangi AI"
        durationInFrames={sceneDuration(16)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ulangi prediksi"
          instruction="Pada laporan Pending, pilih Ulangi prediksi. Proses berjalan terpisah dari penyimpanan laporan."
          image="mobile-ai-queued"
          navigateFrom="mobile-detail"
          clickTarget={[190, 810]}
          cursor={[190, 650]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="18 Hasil AI"
        durationInFrames={sceneDuration(17)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ambil hasil prediksi terbaru"
          instruction="Pilih Perbarui detail untuk mengambil hasil AI. Kategori dan confidence berasal dari prediksi nyata pada foto contoh."
          image="mobile-ai-result"
          navigateFrom="mobile-ai-queued"
          clickTarget={[190, 440]}
          cursor={[190, 500]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="19 Edit"
        durationInFrames={sceneDuration(18)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ubah laporan Pending"
          instruction="Pilih Ubah laporan, koreksi deskripsi atau kategori, lalu simpan. Pelapor dapat mengubah laporannya selama masih Pending."
          image="mobile-edit-filled"
          navigateFrom="mobile-detail"
          clickTarget={[190, 730]}
          cursor={[190, 600]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="20 Hapus"
        durationInFrames={sceneDuration(19)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Konfirmasi penghapusan"
          instruction="Pada laporan latihan, tekan Ya, hapus laporan untuk menghapusnya dari daftar. Batal hanya menutup konfirmasi."
          image="mobile-deleted"
          navigateFrom="mobile-delete-confirm"
          clickTarget={[190, 510]}
          cursor={[190, 510]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="21 Status histori"
        durationInFrames={sceneDuration(20)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ikuti status penanganan"
          instruction="Setelah admin memproses laporan di web, pilih Perbarui detail. Histori memperlihatkan Pending, In Progress, lalu Completed beserta catatannya."
          image="mobile-history-status"
          navigateFrom="mobile-detail"
          clickTarget={[190, 695]}
          cursor={[190, 600]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="22 Keluar"
        durationInFrames={sceneDuration(21)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Keluar dari akun"
          instruction="Buka sidebar lalu ketuk Keluar. Aplikasi kembali ke halaman login dan sesi akun berakhir."
          image="mobile-logout"
          navigateFrom="mobile-sidebar"
          clickTarget={[95, 800]}
          cursor={[190, 660]}
        />
      </Series.Sequence>
    </Series>
  );
}
