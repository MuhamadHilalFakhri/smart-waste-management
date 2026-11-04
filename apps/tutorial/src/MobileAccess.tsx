import { Series, useVideoConfig } from "remotion";
import { Step } from "./Step";
export function MobileAccess() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="01 Registrasi"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Daftar sebagai pelapor"
          instruction="Pilih Daftar. Isi nama, email, kata sandi, dan konfirmasi. Registrasi menghasilkan akun User."
          image="mobile-register-filled"
          navigateFrom="mobile-login-empty"
          clickTarget={[185, 702]}
          cursor={[190, 630]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="02 Login"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Masuk ke aplikasi"
          instruction="Gunakan email dan kata sandi akun pelapor. Pilih Masuk untuk membuka dashboard."
          image="mobile-login-filled"
          before="mobile-login-empty"
          navigateFrom="mobile-register-filled"
          clickTarget={[185, 640]}
          typed="pelapor.tutorial@example.test"
          field={[41, 448, 308, 48]}
          cursor={[194, 470]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="03 Dashboard"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Lihat ringkasan Anda"
          instruction="Dashboard menampilkan laporan milik akun Anda, jumlah per status, dan laporan terbaru."
          image="mobile-dashboard"
          navigateFrom="mobile-login-filled"
          clickTarget={[190, 638]}
          cursor={[195, 290]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="04 Sidebar"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Gunakan sidebar"
          instruction="Ketuk ikon menu. Pilih Dashboard, Laporan sampah, atau Buat laporan. Keluar berada di bagian bawah."
          image="mobile-sidebar"
          navigateFrom="mobile-dashboard"
          clickTarget={[40, 38]}
          cursor={[125, 205]}
        />
      </Series.Sequence>
      <Series.Sequence
        name="05 Riwayat kosong"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Step
          mobile
          title="Mulai dari laporan pertama"
          instruction="Akun baru menampilkan keadaan kosong. Pilih Buat laporan untuk mencatat temuan sampah."
          image="mobile-history-empty"
          navigateFrom="mobile-sidebar"
          clickTarget={[95, 205]}
          cursor={[195, 215]}
        />
      </Series.Sequence>
    </Series>
  );
}
