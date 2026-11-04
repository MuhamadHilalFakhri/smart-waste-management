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
  for (const match of source.matchAll(/(?:image|before|navigateFrom)="([^"]+)"/g)) {
    images.add(match[1]);
  }
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
await access(resolve(root, "public/audio/narasi-tutorial.wav"));
await access(resolve(root, "../../docs/naskah-narasi-lengkap.txt"));
await access(resolve(root, "../../docs/naskah-narasi-tutorial.md"));
await access(resolve(root, "../../docs/pembagian-audio-tutorial.md"));
const narration = JSON.parse(await readFile(resolve(root, "scripts/narration.json"), "utf8"));
const scenes = new Map();
for (const file of await readdir(resolve(root, "src"))) {
  if (!file.endsWith(".tsx")) continue;
  const source = await readFile(resolve(root, "src", file), "utf8");
  for (const match of source.matchAll(/<Step\s+([\s\S]*?)\/>/g)) {
    const title = match[1].match(/title="([^"]+)"/)?.[1];
    if (!title) continue;
    const mobile = /\bmobile\b/.test(match[1]);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    scenes.set(`${mobile ? "mobile" : "web"}-${slug}`, title);
  }
}
const audioFiles = [...Object.keys(narration)];
if (scenes.size !== 39) throw new Error(`Jumlah adegan berubah: ${scenes.size}, periksa durasi tutorial.`);
if (!narration.intro || !narration.closing || audioFiles.length !== scenes.size + 2) {
  throw new Error("Naskah harus mencakup pembuka, seluruh adegan, dan penutup.");
}
for (const key of scenes.keys()) {
  if (!(key in narration)) throw new Error(`Naskah suara tidak ditemukan: ${key}.`);
}
console.log(`${images.size} tangkapan layar dan naskah untuk ${audioFiles.length} bagian tersedia.`);
