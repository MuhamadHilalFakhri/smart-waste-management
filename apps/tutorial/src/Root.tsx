import { Composition } from "remotion";
import { Intro } from "./Intro";
import { Tutorial } from "./Tutorial";
import { WebTutorial } from "./WebTutorial";
import { MobileTutorial } from "./MobileTutorial";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TutorialSmartWaste"
        component={Tutorial}
        durationInFrames={11100}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Pembuka"
        component={Intro}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TutorialWeb"
        component={WebTutorial}
        durationInFrames={4590}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TutorialMobile"
        component={MobileTutorial}
        durationInFrames={5940}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
