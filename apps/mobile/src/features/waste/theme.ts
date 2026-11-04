export const colors = {
  background: "#ffffff",
  surface: "#fafdf9",
  ink: "#0e1a10",
  muted: "#617369",
  border: "#d9e4da",
  brand: "#007f73",
  lime: "#75b936",
  soft: "#daefda",
  white: "#ffffff",
};
export const tones: Record<string, { color: string; background: string }> = {
  pending: { color: "#896519", background: "#fcf2d9" },
  in_progress: { color: "#276c88", background: "#dff2fb" },
  completed: { color: "#25623e", background: "#daefda" },
  rejected: { color: "#963d35", background: "#fbe9e5" },
};
