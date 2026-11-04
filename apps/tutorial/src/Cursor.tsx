import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
export function Cursor({
  x,
  y,
  mobile = false,
  startAt = 0,
}: {
  x: number;
  y: number;
  mobile?: boolean;
  startAt?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startX = x - (mobile ? 28 : 70);
  const startY = y + (mobile ? 42 : 44);
  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(frame, [startAt, startAt + fps * 0.65], [startX, x], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        top: interpolate(frame, [startAt, startAt + fps * 0.65], [startY, y], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        pointerEvents: "none",
      }}
    >
      <svg width={mobile ? 24 : 30} height={mobile ? 32 : 40} viewBox="0 0 30 40">
        <path
          d="M2 2v31l8-8 6 13 6-3-6-12h12Z"
          fill="#0e1a10"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
