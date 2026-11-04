import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
import { CLOSING_START_SECONDS, MOBILE_SCENE_STARTS, sceneDurationInFrames } from "./narrationTimeline";
export function MobileReporting() {
  const { fps } = useVideoConfig();
  const sceneDuration = (index: number) => sceneDurationInFrames(MOBILE_SCENE_STARTS, index, CLOSING_START_SECONDS, fps);
  return (
    <Series>
      <Series.Sequence
        name="06 Formulir"
        durationInFrames={sceneDuration(5)}
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
        durationInFrames={sceneDuration(6)}
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
        durationInFrames={sceneDuration(7)}
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
        durationInFrames={sceneDuration(8)}
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
        name="10 GPS"
        durationInFrames={sceneDuration(9)}
        premountFor={fps}
      >
        <Step
          mobile
          deviceGuide
          title="Catat lokasi GPS"
          instruction="Ketuk Ambil lokasi GPS dan izinkan akses saat digunakan. Jika izin ditolak, aktifkan kembali di pengaturan HP. Koordinat pada contoh ini hanya demonstrasi."
          image="mobile-edit-filled"
          navigateFrom="mobile-photo"
          clickTarget={[190, 728]}
          cursor={[190, 340]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="11 Deskripsi"
        durationInFrames={sceneDuration(10)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Jelaskan temuan sampah"
          instruction="Tuliskan jenis, kondisi, dan penanda lokasi agar petugas mudah menindaklanjuti laporan."
          image="mobile-edit-filled"
          before="mobile-edit-filled"
          navigateFrom="mobile-edit-filled"
          typed="[Tutorial mobile] Sampah plastik sudah dipilah, menunggu pengangkutan. Koordinat contoh."
          field={[41, 164, 293, 136]}
          clickTarget={[185, 230]}
          cursor={[195, 230]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="12 Kategori"
        durationInFrames={sceneDuration(11)}
        premountFor={fps}
      >
        <Step
          mobile
          title="Pilih kategori bila perlu"
          instruction="Tersedia Organic Waste, Plastic Waste, dan Paper Waste. Pilihan pelapor didahulukan dari saran AI."
          image="mobile-category"
          navigateFrom="mobile-description"
          clickTarget={[180, 765]}
          cursor={[170, 765]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="13 Simpan"
        durationInFrames={sceneDuration(12)}
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
