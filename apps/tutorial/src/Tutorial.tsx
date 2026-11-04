import { Audio } from "@remotion/media";
import { Series, staticFile, useVideoConfig } from "remotion";
import { Intro } from "./Intro";
import { WebTutorial } from "./WebTutorial";
import { MobileTutorial } from "./MobileTutorial";
import { Closing } from "./Closing";
import {
  AUDIO_DURATION_SECONDS,
  CLOSING_START_SECONDS,
  durationBetweenSeconds,
  MOBILE_SCENE_STARTS,
  WEB_SCENE_STARTS,
} from "./narrationTimeline";
export function Tutorial() {
  const { fps } = useVideoConfig();
  return (
    <>
      <Audio src={staticFile("audio/narasi-tutorial.wav")} />
      <Series>
        <Series.Sequence
          name="Pembuka"
          durationInFrames={durationBetweenSeconds(0, WEB_SCENE_STARTS[0], fps)}
        >
          <Intro />
        </Series.Sequence>
        <Series.Sequence
          name="Tutorial website"
          durationInFrames={durationBetweenSeconds(WEB_SCENE_STARTS[0], MOBILE_SCENE_STARTS[0], fps)}
        >
          <WebTutorial />
        </Series.Sequence>
        <Series.Sequence
          name="Tutorial mobile"
          durationInFrames={durationBetweenSeconds(MOBILE_SCENE_STARTS[0], CLOSING_START_SECONDS, fps)}
        >
          <MobileTutorial />
        </Series.Sequence>
        <Series.Sequence
          name="Penutup"
          durationInFrames={durationBetweenSeconds(CLOSING_START_SECONDS, AUDIO_DURATION_SECONDS, fps)}
        >
          <Closing />
        </Series.Sequence>
      </Series>
    </>
  );
}
