import {
  AbsoluteFill,
  CanvasImage,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { fontFamily, theme } from "./theme";
export function Intro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: theme.paper,
        fontFamily,
        padding: 100,
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/intro.wav")} premountFor={fps} />
      <div
        style={{
          opacity: interpolate(frame, [0, fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
          translate: `0 ${interpolate(frame, [0, fps], [28, 0], { extrapolateRight: "clamp" })}px`,
        }}
      >
        <CanvasImage
          src={staticFile("droplet.svg")}
          style={{ width: 92, height: 92, marginBottom: 42 }}
        />
        <div
          style={{
            color: theme.brand,
            fontSize: 24,
            letterSpacing: 3,
            marginBottom: 28,
          }}
        >
          SMART WASTE / PANDUAN PEMAKAIAN
        </div>
        <h1
          style={{
            fontSize: 108,
            lineHeight: 1.12,
            letterSpacing: -5,
            margin: 0,
            color: theme.ink,
          }}
        >
          Dari laporan sampah
          <br />
          hingga penanganan.
        </h1>
        <p
          style={{
            fontSize: 34,
            color: theme.muted,
            lineHeight: 1.5,
            marginTop: 36,
          }}
        >
          Web untuk pengelolaan. Android untuk pelaporan di lapangan.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 90,
          fontSize: 23,
          color: theme.muted,
        }}
      >
        Tutorial dengan data demo khusus · Bahasa Indonesia
      </div>
    </AbsoluteFill>
  );
}
