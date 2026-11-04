import { Series, useVideoConfig } from "remotion";
import { MobileAccess } from "./MobileAccess";
import { MobileReporting } from "./MobileReporting";
import { MobileFollowUp } from "./MobileFollowUp";
export function MobileTutorial() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Akun dan navigasi"
        durationInFrames={70 * fps}
        premountFor={fps}
      >
        <MobileAccess />
      </Series.Sequence>
      <Series.Sequence
        name="Membuat laporan"
        durationInFrames={112 * fps}
        premountFor={fps}
      >
        <MobileReporting />
      </Series.Sequence>
      <Series.Sequence
        name="Riwayat dan tindak lanjut"
        durationInFrames={126 * fps}
        premountFor={fps}
      >
        <MobileFollowUp />
      </Series.Sequence>
    </Series>
  );
}
