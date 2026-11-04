import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
export function MobileAccess() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="01 Registrasi"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Daftar sebagai pelapor"
          instruction="Pilih Daftar. Isi nama, email, kata sandi, dan konfirmasi. Registrasi menghasilkan akun User."
          image="mobile-register-filled"
          cursor={[190, 630]}
          zoom={1.1}
        />
      </Series.Sequence>
      <Series.Sequence
        name="02 Login"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Masuk ke aplikasi"
          instruction="Gunakan email dan kata sandi akun pelapor. Pilih Masuk untuk membuka dashboard."
          image="mobile-login-filled"
          before="mobile-login-empty"
          typed="pelapor.tutorial@example.test"
          field={[41, 448, 308, 48]}
          cursor={[194, 470]}
          zoom={1.12}
        />
      </Series.Sequence>
      <Series.Sequence
        name="03 Dashboard"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Lihat ringkasan Anda"
          instruction="Dashboard menampilkan laporan milik akun Anda, jumlah per status, dan laporan terbaru."
          image="mobile-dashboard"
          cursor={[195, 290]}
          zoom={1.08}
        />
      </Series.Sequence>
      <Series.Sequence
        name="04 Sidebar"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Gunakan sidebar"
          instruction="Ketuk ikon menu. Pilih Dashboard, Laporan sampah, atau Buat laporan. Keluar berada di bagian bawah."
          image="mobile-sidebar"
          cursor={[125, 205]}
          zoom={1.05}
        />
      </Series.Sequence>
      <Series.Sequence
        name="05 Riwayat kosong"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Mulai dari laporan pertama"
          instruction="Akun baru menampilkan keadaan kosong. Pilih Buat laporan untuk mencatat temuan sampah."
          image="mobile-history-empty"
          cursor={[195, 215]}
          zoom={1.08}
        />
      </Series.Sequence>
    </Series>
  );
}
