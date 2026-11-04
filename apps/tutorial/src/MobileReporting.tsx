import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
export function MobileReporting() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="06 Formulir"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Buat laporan baru"
          instruction="Formulir menggabungkan foto, deskripsi, lokasi, dan kategori pilihan yang opsional."
          image="mobile-form-empty"
          navigateFrom="mobile-history-empty"
          clickTarget={[190, 213]}
          cursor={[195, 280]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="07 Validasi"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Lengkapi data wajib"
          instruction="Foto, lokasi GPS, dan deskripsi minimal 10 karakter diperlukan. Pesan validasi membantu melengkapi data."
          image="mobile-validation"
          cursor={[190, 140]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="08 Galeri"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Pilih foto dari galeri"
          instruction="Ketuk Pilih foto, lalu pilih gambar sampah. Pratinjau foto muncul pada formulir."
          image="mobile-photo"
          navigateFrom="mobile-form-empty"
          clickTarget={[185, 389]}
          cursor={[190, 495]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="09 Kamera"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          deviceGuide
          title="Ambil foto di lokasi"
          instruction="Pada HP Android, ketuk Ambil foto dan izinkan kamera saat diminta. Ambil gambar yang jelas lalu gunakan foto tersebut."
          image="mobile-photo"
          navigateFrom="mobile-photo"
          clickTarget={[85, 495]}
          cursor={[85, 495]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="10 Deskripsi"
        durationInFrames={9 * fps}
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
        />
      </Series.Sequence>
      <Series.Sequence
        name="11 GPS"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          deviceGuide
          title="Catat lokasi GPS"
          instruction="Ketuk Ambil lokasi GPS dan izinkan akses saat aplikasi digunakan. Jika ditolak, aktifkan izin di pengaturan HP."
          image="mobile-edit-filled"
          navigateFrom="mobile-description"
          clickTarget={[190, 555]}
          cursor={[190, 555]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="12 Kategori"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Pilih kategori bila perlu"
          instruction="Tersedia Organic Waste, Plastic Waste, dan Paper Waste. Pilihan pelapor didahulukan dari saran AI."
          image="mobile-category"
          navigateFrom="mobile-edit-filled"
          clickTarget={[180, 585]}
          cursor={[170, 765]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="13 Simpan"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Simpan data yang lengkap"
          instruction="Pilih Simpan laporan. Contoh penyimpanan memakai laporan latihan dengan koordinat contoh; laporan tampil kembali di riwayat."
          image="mobile-saved"
          navigateFrom="mobile-category"
          clickTarget={[190, 650]}
          cursor={[190, 360]}
        />
      </Series.Sequence>
    </Series>
  );
}
