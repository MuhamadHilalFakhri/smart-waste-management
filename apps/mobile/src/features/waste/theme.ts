export const colors = {
  background: "#f7f8fc",
  surface: "#ffffff",
  ink: "#20263b",
  muted: "#687289",
  border: "#e1e4ee",
  brand: "#52639f",
  selected: "#b4bee2",
  soft: "#edf0fa",
  white: "#ffffff",
};
export const tones: Record<string, { color: string; background: string }> = {
  pending: { color: "#896519", background: "#fcf2d9" },
  in_progress: { color: "#52639f", background: "#edf0fa" },
  completed: { color: "#405f80", background: "#e9eff7" },
  rejected: { color: "#963d35", background: "#fbe9e5" },
};
