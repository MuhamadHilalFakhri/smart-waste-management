import {
  CanvasImage,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Cursor } from "./Cursor";
import type { StepProps } from "./step-types";
import { theme } from "./theme";
import { actionTiming } from "./actionTiming";
export function ScreenCapture({
  image,
  before,
  navigateFrom,
  typed,
  field,
  cursor = [720, 450],
  clickTarget,
  mobile = false,
}: StepProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timing = image === "mobile-edit-filled"
    ? { reveal: typed ? 0.5 : navigateFrom === "mobile-photo" ? 3.34 : 4.32, typingStart: 0.7, typingEnd: 4 }
    : actionTiming[image] ?? { reveal: 0.8 };
  const typingStart = (timing.typingStart ?? timing.reveal + 0.2) * fps;
  const typingEnd = (timing.typingEnd ?? timing.reveal + 3) * fps;
  const typing = !!typed && frame < typingEnd;
  const navigationEnd = timing.reveal * fps;
  const showingSource = !!navigateFrom && frame < navigationEnd;
  const imageOpacity = 1;
  const bounds = mobile
    ? { x: 1300, y: 40, w: 520, h: 1125.333333 }
    : { x: 0, y: 0, w: 1920, h: 1200 };
  const ratio = bounds.w / (mobile ? 390 : 1440);
  const seconds = frame / fps;
  const cursorAt = navigateFrom ? navigationEnd : typingStart;
  const sourceImage = image === "mobile-logout" && seconds < 2.4
    ? "mobile-history-status"
    : image === "mobile-category" ? "mobile-edit-filled"
    : image === "mobile-deleted" && seconds < 2.66 ? "mobile-detail" : navigateFrom;
  const destinationImage = image === "mobile-deleted" && seconds >= 6.28
    ? seconds < 8.5 ? "mobile-delete-confirm" : "mobile-detail"
    : image === "mobile-category" ? "mobile-edit-filled" : image;
  return (
    <div
      style={{
        position: "absolute",
        left: bounds.x,
        top: bounds.y,
        width: bounds.w,
        height: bounds.h,
      }}
    >
      <div style={{ position: "absolute", inset: 0, width: bounds.w, height: bounds.h }}>
        {showingSource && (
          <CanvasImage
            src={staticFile(`captures/${sourceImage}.png`)}
            style={{ position: "absolute", width: bounds.w, height: bounds.h, objectFit: "contain" }}
          />
        )}
        <CanvasImage
          src={staticFile(`captures/${typing && before ? before : destinationImage}.png`)}
          style={{
            position: "absolute",
            width: bounds.w,
            height: bounds.h,
            opacity: showingSource ? 0 : imageOpacity,
            objectFit: "contain",
          }}
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
                interpolate(frame, [typingStart, typingEnd], [0, typed.length], {
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
        {(navigateFrom || typed) && frame >= Math.max(0, cursorAt - fps * 0.7) && frame < cursorAt + fps * 0.15 && (
          <Cursor
            startAt={Math.max(0, cursorAt - fps * 0.7)}
            x={(clickTarget ?? cursor)[0] * ratio}
            y={(clickTarget ?? cursor)[1] * ratio}
            mobile={mobile}
          />
        )}
        {image === "mobile-deleted" && seconds >= 7.8 && seconds < 8.65 && (
          <Cursor x={195 * ratio} y={445 * ratio} mobile startAt={7.8 * fps} />
        )}
      </div>
    </div>
  );
}
