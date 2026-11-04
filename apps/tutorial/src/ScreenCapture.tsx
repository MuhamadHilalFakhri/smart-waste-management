import {
  CanvasImage,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Cursor } from "./Cursor";
import type { StepProps } from "./step-types";
import { theme } from "./theme";
export function ScreenCapture({
  image,
  before,
  typed,
  field,
  cursor = [720, 450],
  zoom = 1.35,
  mobile = false,
}: StepProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const typingEnd = 6 * fps;
  const typing = !!typed && frame < typingEnd;
  const bounds = mobile
    ? { x: 1170, y: 112, w: 390, h: 844 }
    : { x: 160, y: 105, w: 1600, h: 1000 };
  const ratio = bounds.w / (mobile ? 390 : 1440);
  return (
    <div
      style={{
        position: "absolute",
        left: bounds.x,
        top: bounds.y,
        width: bounds.w,
        height: mobile ? bounds.h : 810,
        overflow: "hidden",
        border: `1px solid ${theme.line}`,
        borderRadius: mobile ? 24 : 10,
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: bounds.w,
          height: bounds.h,
          transformOrigin: `${cursor[0] * ratio}px ${cursor[1] * ratio}px`,
          scale: interpolate(
            frame,
            [
              0,
              fps,
              3 * fps,
              Math.max(4 * fps, durationInFrames - 2 * fps),
              durationInFrames - 1,
            ],
            [1, 1, zoom, zoom, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            },
          ),
        }}
      >
        <CanvasImage
          src={staticFile(`captures/${typing && before ? before : image}.png`)}
          style={{ position: "absolute", width: bounds.w, height: bounds.h }}
        />
        {typing && field && (
          <div
            style={{
              position: "absolute",
              left: field[0] * ratio,
              top: field[1] * ratio,
              width: field[2] * ratio,
              height: field[3] * ratio,
              boxSizing: "border-box",
              background: "#fff",
              border: "2px solid #007f73",
              borderRadius: 6,
              padding: 10 * ratio,
              fontSize: (mobile ? 14 : 13) * ratio,
              lineHeight: 1.4,
              overflow: "hidden",
              whiteSpace: "pre-wrap",
            }}
          >
            {typed?.slice(
              0,
              Math.floor(
                interpolate(frame, [fps, typingEnd - fps], [0, typed.length], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ),
            )}
            <span
              style={{
                opacity: Math.floor(frame / (fps / 2)) % 2 ? 0 : 1,
                color: theme.brand,
              }}
            >
              │
            </span>
          </div>
        )}
        <Cursor x={cursor[0] * ratio} y={cursor[1] * ratio} mobile={mobile} />
      </div>
    </div>
  );
}
