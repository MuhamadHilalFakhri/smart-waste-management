import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
export function MobileReporting() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="06 Formulir"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Buat laporan baru"
          instruction="Formulir menggabungkan foto, deskripsi, lokasi, dan kategori pilihan yang opsional."
          image="mobile-form-empty"
          cursor={[195, 280]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="07 Validasi"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Lengkapi data wajib"
          instruction="Foto, lokasi GPS, dan deskripsi minimal 10 karakter diperlukan. Pesan validasi membantu melengkapi data."
          image="mobile-validation"
          cursor={[190, 140]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="08 Galeri"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Pilih foto dari galeri"
          instruction="Ketuk Pilih foto, lalu pilih gambar sampah. Pratinjau foto muncul pada formulir."
          image="mobile-photo"
          cursor={[190, 495]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="09 Kamera"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          deviceGuide
          title="Ambil foto di lokasi"
          instruction="Pada HP Android, ketuk Ambil foto dan izinkan kamera saat diminta. Ambil gambar yang jelas lalu gunakan foto tersebut."
          image="mobile-form-empty"
          cursor={[85, 385]}
          zoom={1.12}
        />
      </Series.Sequence>
      <Series.Sequence
        name="10 GPS"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          deviceGuide
          title="Catat lokasi GPS"
          instruction="Ketuk Ambil lokasi GPS. Izinkan lokasi saat aplikasi digunakan. Jika izin ditolak, aktifkan melalui pengaturan HP dan ulangi."
          image="mobile-photo"
          cursor={[190, 728]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="11 Deskripsi"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Jelaskan temuan sampah"
          instruction="Tuliskan jenis, kondisi, dan penanda lokasi agar petugas mudah menindaklanjuti laporan."
          image="mobile-description"
          before="mobile-description-empty"
          typed="[Tutorial mobile] Sampah plastik di sisi taman, perlu diangkut."
          field={[41, 399, 293, 120]}
          cursor={[195, 440]}
          zoom={1.12}
        />
      </Series.Sequence>
      <Series.Sequence
        name="12 Kategori"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Pilih kategori bila perlu"
          instruction="Tersedia Organic Waste, Plastic Waste, dan Paper Waste. Pilihan pelapor didahulukan dari saran AI."
          image="mobile-category"
          cursor={[170, 765]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="13 Simpan"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Simpan data yang lengkap"
          instruction="Pilih Simpan laporan. Contoh penyimpanan memakai laporan latihan dengan koordinat contoh; laporan tampil kembali di riwayat."
          image="mobile-saved"
          cursor={[190, 360]}
          zoom={1.08}
        />
      </Series.Sequence>
    </Series>
  );
}
