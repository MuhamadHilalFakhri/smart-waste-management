import {
  AbsoluteFill,
  CanvasImage,
  staticFile,
} from "remotion";
import { ScreenCapture } from "./ScreenCapture";
import type { StepProps } from "./step-types";
import { fontFamily, theme } from "./theme";
export function Step(props: StepProps) {
  const { title, instruction, mobile = false, deviceGuide } = props;
  return (
    <AbsoluteFill style={{ background: "white", fontFamily, color: theme.ink }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 32,
          right: 80,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 24,
          color: theme.brand,
        }}
      >
        <CanvasImage
          src={staticFile("droplet.svg")}
          style={{ width: 30, height: 30 }}
        />
        <span>SMART WASTE</span>
        <span style={{ color: theme.muted }}>
          {" "}
          / {mobile ? "PRATINJAU UI MOBILE" : "WEBSITE"}
        </span>
      </div>
      <ScreenCapture {...props} />
      {mobile ? (
        <div style={{ position: "absolute", left: 100, top: 200, width: 900 }}>
          <div style={{ color: theme.brand, fontSize: 24, marginBottom: 24 }}>
            {deviceGuide
              ? "PANDUAN SAAT DIGUNAKAN DI HP"
              : "LANGKAH PENGGUNAAN"}
          </div>
          <h2
            style={{
              fontSize: 72,
              letterSpacing: -2,
              lineHeight: 1.18,
              margin: "0 0 34px",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 34,
              color: theme.muted,
              lineHeight: 1.55,
              maxWidth: 790,
            }}
          >
            {instruction}
          </p>
          {deviceGuide && (
            <div
              style={{
                paddingTop: 24,
                marginTop: 36,
                color: theme.brand,
                fontSize: 24,
                lineHeight: 1.5,
              }}
            >
              Kamera dan GPS dijelaskan melalui alur UI. Izin dan sensor
              perangkat tidak direkam pada pratinjau browser ini.
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 150,
            background: "#fff",
            padding: "20px 80px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ fontSize: 35, margin: "0 0 8px", fontWeight: 650 }}>
            {title}
          </h2>
          <p style={{ fontSize: 25, color: theme.muted, margin: 0 }}>
            {instruction}
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
}
