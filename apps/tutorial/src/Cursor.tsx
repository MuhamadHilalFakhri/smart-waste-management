import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
export function Cursor({
  x,
  y,
  mobile = false,
}: {
  x: number;
  y: number;
  mobile?: boolean;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startX = x - (mobile ? 28 : 70);
  const startY = y + (mobile ? 42 : 44);
  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(frame, [0, fps * 0.75], [startX, x], {
          extrapolateRight: "clamp",
        }),
        top: interpolate(frame, [0, fps * 0.75], [startY, y], {
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
