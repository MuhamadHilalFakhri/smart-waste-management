import { readdir, readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const images = new Set();
function dimensions(data) {
  if (data.subarray(1, 4).toString() === "PNG") {
    return [data.readUInt32BE(16), data.readUInt32BE(20)];
  }
  if (data[0] === 0xff && data[1] === 0xd8) {
    for (let offset = 2; offset < data.length;) {
      const marker = data[offset + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) {
        return [data.readUInt16BE(offset + 7), data.readUInt16BE(offset + 5)];
      }
      offset += data.readUInt16BE(offset + 2) + 2;
    }
  }
  throw new Error("Format tangkapan layar tidak dikenali.");
}
for (const file of await readdir(resolve(root, "src"))) {
  if (!file.endsWith(".tsx")) continue;
  const source = await readFile(resolve(root, "src", file), "utf8");
  for (const match of source.matchAll(/(?:image|before)="([^"]+)"/g)) images.add(match[1]);
}
for (const name of images) {
  const data = await readFile(resolve(root, "public/captures", name + ".png"));
  const [width, height] = dimensions(data);
  if (name.startsWith("mobile-") && (width !== 390 || height < 800 || height > 900)) {
    throw new Error(`${name}: ukuran mobile tidak konsisten (${width}×${height}).`);
  }
  if (name.startsWith("web-") && (width !== 1440 || height < 800 || height > 900)) {
    throw new Error(`${name}: ukuran web tidak konsisten (${width}×${height}).`);
  }
}
await access(resolve(root, "public/Manrope.ttf"));
await access(resolve(root, "public/droplet.svg"));
console.log(`${images.size} tangkapan layar tersedia dengan ukuran yang sesuai.`);
