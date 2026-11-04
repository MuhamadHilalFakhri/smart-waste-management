import { Series, useVideoConfig } from "remotion";
import { Intro } from "./Intro";
import { WebTutorial } from "./WebTutorial";
import { MobileTutorial } from "./MobileTutorial";
import { Closing } from "./Closing";
export function Tutorial() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="Pembuka"
        durationInFrames={9 * fps}
        premountFor={fps}
      >
        <Intro />
      </Series.Sequence>
      <Series.Sequence
        name="Tutorial website"
        durationInFrames={153 * fps}
        premountFor={fps}
      >
        <WebTutorial />
      </Series.Sequence>
      <Series.Sequence
        name="Tutorial mobile"
        durationInFrames={198 * fps}
        premountFor={fps}
      >
        <MobileTutorial />
      </Series.Sequence>
      <Series.Sequence
        name="Penutup"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Closing />
      </Series.Sequence>
    </Series>
  );
}
