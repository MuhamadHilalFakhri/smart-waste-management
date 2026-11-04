import type { ReactNode } from "react";

export function NativeCanvas({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "absolute", width: 1920, height: 1200, transform: "scale(0.75)", transformOrigin: "top left" }}>
      {children}
    </div>
  );
}
