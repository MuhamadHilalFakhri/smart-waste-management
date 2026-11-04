import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
void loadFont({ family: "Manrope", url: staticFile("Manrope.ttf") });
export const theme = {
  ink: "#0e1a10",
  brand: "#007f73",
  muted: "#617369",
  line: "#d9e4da",
  paper: "#ffffff",
};
export const fontFamily = "Manrope, sans-serif";
