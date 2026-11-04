import { readdir, readFile } from "node:fs/promises";
import { resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
const folders = [
  "apps/web/resources/js",
  "apps/web/resources/css",
  "apps/web/app",
  "apps/web/routes",
  "apps/web/tests",
  "apps/web/database",
  "apps/mobile/src",
  "apps/tutorial/src",
];
const generated = [
  "apps/web/resources/js/actions/",
  "apps/web/resources/js/routes/",
  "apps/web/resources/js/wayfinder/",
];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".php"]);
async function walk(folder) {
  const files = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (extensions.has(extname(path))) files.push(path);
  }
  return files;
}
let count = 0;
const violations = [];
let largest = { lines: 0, path: "" };
for (const folder of folders) {
  for (const file of await walk(resolve(root, folder))) {
    const path = relative(root, file).replaceAll("\\", "/");
    if (generated.some((prefix) => path.startsWith(prefix))) continue;
    const content = await readFile(file, "utf8");
    const lines = content.trimEnd().split(/\r?\n/).length;
    count++;
    if (lines > largest.lines) largest = { lines, path };
    if (lines > 250) violations.push(`${path}: ${lines} baris`);
  }
}
if (violations.length) {
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `${count} file lolos batas 250 baris. Terpanjang: ${largest.path} (${largest.lines} baris).`,
  );
