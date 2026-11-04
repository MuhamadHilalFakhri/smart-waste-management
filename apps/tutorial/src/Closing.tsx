import { AbsoluteFill, CanvasImage, staticFile } from "remotion";
import { fontFamily, theme } from "./theme";
export function Closing() {
  return (
    <AbsoluteFill
      style={{
        background: theme.ink,
        color: "white",
        fontFamily,
        padding: 100,
        justifyContent: "center",
      }}
    >
      <CanvasImage
        src={staticFile("droplet.svg")}
        style={{ width: 80, height: 80, marginBottom: 40 }}
      />
      <h2
        style={{
          fontSize: 100,
          lineHeight: 1.15,
          letterSpacing: -4,
          margin: 0,
        }}
      >
        Laporan tercatat.
        <br />
        Penanganan terpantau.
      </h2>
      <p
        style={{
          fontSize: 35,
          lineHeight: 1.6,
          color: "#d9e4da",
          maxWidth: 1420,
          marginTop: 40,
        }}
      >
        Web: kelola pengguna, tinjau laporan, dan perbarui status.
        <br />
        Mobile: foto, lokasi, deskripsi, saran AI, serta riwayat laporan.
      </p>
      <div style={{ fontSize: 23, color: "#b5c8bb", marginTop: 42 }}>
        Materi memakai data tutorial. Kamera dan GPS dijelaskan sebagai panduan
        UI untuk HP.
      </div>
    </AbsoluteFill>
  );
}
