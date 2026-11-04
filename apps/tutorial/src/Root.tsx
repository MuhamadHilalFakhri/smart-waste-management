import { Audio } from "@remotion/media";
import { Composition, staticFile, useVideoConfig } from "remotion";
import type { ReactNode } from "react";
import { Intro } from "./Intro";
import { Tutorial } from "./Tutorial";
import { WebTutorial } from "./WebTutorial";
import { MobileTutorial } from "./MobileTutorial";
import { NativeCanvas } from "./NativeCanvas";
import {
  AUDIO_DURATION_SECONDS,
  CLOSING_START_SECONDS,
  durationBetweenSeconds,
  MOBILE_SCENE_STARTS,
  secondsToFrames,
  WEB_SCENE_STARTS,
} from "./narrationTimeline";

function AudioChapter({
  startSeconds,
  endSeconds,
  children,
}: {
  startSeconds: number;
  endSeconds: number;
  children: ReactNode;
}) {
  const { fps } = useVideoConfig();
  return (
    <>
      <Audio
        src={staticFile("audio/narasi-tutorial.wav")}
        trimBefore={secondsToFrames(startSeconds, fps)}
        durationInFrames={durationBetweenSeconds(startSeconds, endSeconds, fps)}
      />
      <NativeCanvas>{children}</NativeCanvas>
    </>
  );
}

function NarratedIntro() {
  return (
    <AudioChapter startSeconds={0} endSeconds={WEB_SCENE_STARTS[0]}>
      <Intro />
    </AudioChapter>
  );
}

function NarratedWebTutorial() {
  return (
    <AudioChapter
      startSeconds={WEB_SCENE_STARTS[0]}
      endSeconds={MOBILE_SCENE_STARTS[0]}
    >
      <WebTutorial />
    </AudioChapter>
  );
}

function NarratedMobileTutorial() {
  return (
    <AudioChapter
      startSeconds={MOBILE_SCENE_STARTS[0]}
      endSeconds={CLOSING_START_SECONDS}
    >
      <MobileTutorial />
    </AudioChapter>
  );
}

function NativeTutorial() { return <NativeCanvas><Tutorial /></NativeCanvas>; }

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TutorialSmartWaste"
        component={NativeTutorial}
        durationInFrames={secondsToFrames(AUDIO_DURATION_SECONDS, 30)}
        fps={30}
        width={1440}
        height={900}
      />
      <Composition
        id="Pembuka"
        component={NarratedIntro}
        durationInFrames={durationBetweenSeconds(0, WEB_SCENE_STARTS[0], 30)}
        fps={30}
        width={1440}
        height={900}
      />
      <Composition
        id="TutorialWeb"
        component={NarratedWebTutorial}
        durationInFrames={durationBetweenSeconds(WEB_SCENE_STARTS[0], MOBILE_SCENE_STARTS[0], 30)}
        fps={30}
        width={1440}
        height={900}
      />
      <Composition
        id="TutorialMobile"
        component={NarratedMobileTutorial}
        durationInFrames={durationBetweenSeconds(MOBILE_SCENE_STARTS[0], CLOSING_START_SECONDS, 30)}
        fps={30}
        width={1440}
        height={900}
      />
    </>
  );
};
