import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
export function MobileFollowUp() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="14 Riwayat"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Buka riwayat laporan"
          instruction="Lihat nomor laporan, deskripsi, kategori, dan status. Ketuk salah satu laporan untuk membuka detail."
          image="mobile-history"
          cursor={[190, 410]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="15 Pencarian"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Cari laporan pada halaman"
          instruction="Masukkan nomor atau deskripsi pada pencarian. Hapus kata kunci untuk menampilkan kembali semua laporan pada halaman tersebut."
          image="mobile-search"
          cursor={[190, 280]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="16 Detail"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Periksa detail laporan"
          instruction="Detail berisi foto, deskripsi, koordinat, kategori pilihan, serta saran AI dan confidence. Data lokasi pada tutorial adalah contoh."
          image="mobile-detail"
          cursor={[190, 380]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="17 Ulangi AI"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ulangi prediksi bila perlu"
          instruction="Pada laporan Pending, pilih Ulangi prediksi. Proses berjalan terpisah dari penyimpanan laporan."
          image="mobile-ai-queued"
          cursor={[190, 650]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="18 Hasil AI"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ambil hasil prediksi terbaru"
          instruction="Pilih Perbarui detail untuk mengambil hasil AI. Kategori dan confidence berasal dari prediksi nyata pada foto contoh."
          image="mobile-ai-result"
          cursor={[190, 500]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="19 Edit"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ubah laporan Pending"
          instruction="Pilih Ubah laporan, koreksi deskripsi atau kategori, lalu simpan. Pelapor dapat mengubah laporannya selama masih Pending."
          image="mobile-edit-filled"
          cursor={[190, 600]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="20 Hapus"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Hapus laporan latihan"
          instruction="Pilih Hapus laporan, lalu konfirmasi Ya, hapus laporan. Batal menutup dialog tanpa menghapus data."
          image="mobile-delete-confirm"
          cursor={[190, 510]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="21 Status histori"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Ikuti status penanganan"
          instruction="Setelah admin memproses laporan di web, pilih Perbarui detail. Histori memperlihatkan Pending, In Progress, lalu Completed beserta catatannya."
          image="mobile-history-status"
          cursor={[190, 600]}
          zoom={1.05}
        />
      </Series.Sequence>
      <Series.Sequence
        name="22 Keluar"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Keluar dari akun"
          instruction="Buka sidebar lalu ketuk Keluar. Aplikasi kembali ke halaman login dan sesi akun berakhir."
          image="mobile-logout"
          cursor={[190, 660]}
          zoom={1.05}
        />
      </Series.Sequence>
    </Series>
  );
}
