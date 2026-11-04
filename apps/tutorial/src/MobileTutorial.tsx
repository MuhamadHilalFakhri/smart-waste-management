import { Series, useVideoConfig } from "remotion";
import { MobileAccess } from "./MobileAccess";
import { MobileReporting } from "./MobileReporting";
import { MobileFollowUp } from "./MobileFollowUp";
import { CLOSING_START_SECONDS, durationBetweenSeconds, MOBILE_SCENE_STARTS } from "./narrationTimeline";
export function MobileTutorial() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Akun dan navigasi"
        durationInFrames={durationBetweenSeconds(MOBILE_SCENE_STARTS[0], MOBILE_SCENE_STARTS[5], fps)}
        premountFor={fps}
      >
        <MobileAccess />
      </Series.Sequence>
      <Series.Sequence
        name="Membuat laporan"
        durationInFrames={durationBetweenSeconds(MOBILE_SCENE_STARTS[5], MOBILE_SCENE_STARTS[13], fps)}
        premountFor={fps}
      >
        <MobileReporting />
      </Series.Sequence>
      <Series.Sequence
        name="Riwayat dan tindak lanjut"
        durationInFrames={durationBetweenSeconds(MOBILE_SCENE_STARTS[13], CLOSING_START_SECONDS, fps)}
        premountFor={fps}
      >
        <MobileFollowUp />
      </Series.Sequence>
    </Series>
  );
}
