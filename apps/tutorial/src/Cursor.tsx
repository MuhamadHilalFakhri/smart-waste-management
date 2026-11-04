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
  const click = (frame / fps) % 6;
  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(frame, [0, fps], [x - 90, x], {
          extrapolateRight: "clamp",
        }),
        top: interpolate(frame, [0, fps], [y + 55, y], {
          extrapolateRight: "clamp",
        }),
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 38,
          height: 38,
          left: -19,
          top: -19,
          border: "3px solid #007f73",
          borderRadius: "50%",
          opacity: click > 1 && click < 2 ? 2 - click : 0,
          scale: click > 1 && click < 2 ? 1 + click : 1,
        }}
      />
      {mobile ? (
        <div
          style={{
            width: 28,
            height: 28,
            margin: -14,
            border: "3px solid white",
            borderRadius: "50%",
            background: "#007f73b0",
            boxShadow: "0 0 0 2px #007f73",
          }}
        />
      ) : (
        <svg width="30" height="40" viewBox="0 0 30 40">
          <path
            d="M2 2v31l8-8 6 13 6-3-6-12h12Z"
            fill="#0e1a10"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
}
