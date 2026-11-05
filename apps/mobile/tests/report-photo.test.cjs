const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

const expoSource = path.join(path.dirname(require.resolve("expo/package.json")), "src");

function loadSource(filename, imports = {}) {
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    exports: module.exports,
    module,
    require: (name) => {
      if (name in imports) return imports[name];
      if (name.startsWith(".")) return loadSource(path.resolve(path.dirname(filename), name + ".ts"));
      throw new Error(`Unexpected import: ${name}`);
    },
    Blob, TextEncoder, Uint8Array, Object, Symbol,
  }, { filename });
  return module.exports;
}

class NativeFormData {
  constructor() { this._parts = []; }
}
const { installFormDataPatch } = loadSource(path.join(expoSource, "winter/FormData.ts"));
const ExpoFormData = installFormDataPatch(NativeFormData);
const { convertFormDataAsync } = loadSource(path.join(expoSource, "winter/fetch/convertFormData.ts"));
const helper = path.resolve(__dirname, "../src/features/waste/report-photo.ts");

test("old URI object reproduces the Expo upload error", async () => {
  const form = new ExpoFormData();
  form.append("photo", { uri: "file:///photo.jpg", name: "report.jpg", type: "image/jpeg" });
  await assert.rejects(convertFormDataAsync(form), /Unsupported FormDataPart/);
});

for (const [type, extension] of [["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"]]) {
  test(`native ${type} photo serializes with Expo multipart and preserves bytes`, async () => {
    const bytes = new Uint8Array([0, 17, 127, 255]);
    const { appendReportPhoto } = loadSource(helper, {
      "expo/fetch": { fetch: async (uri) => {
        assert.equal(uri, "file:///picked-photo");
        return { ok: true, blob: async () => new Blob([bytes], { type }) };
      } },
    });
    const form = new ExpoFormData();
    form.append("description", "Laporan pengujian");
    await appendReportPhoto(form, { uri: "file:///picked-photo", mimeType: type });
    const { body, boundary } = await convertFormDataAsync(form);
    const response = new Response(body, { headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` } });
    const parsed = await response.formData();
    assert.equal(parsed.get("description"), "Laporan pengujian");
    const photo = parsed.get("photo");
    assert.equal(photo.name, `report.${extension}`);
    assert.equal(photo.type, type);
    assert.deepEqual(new Uint8Array(await photo.arrayBuffer()), bytes);
  });
}

test("browser File uploads without fetching its URI", async () => {
  const { appendReportPhoto } = loadSource(helper, { "expo/fetch": { fetch: () => assert.fail("unexpected fetch") } });
  const form = new ExpoFormData();
  await appendReportPhoto(form, { file: new Blob(["photo"], { type: "image/png" }) });
  assert.equal(form.get("photo").type, "image/png");
});

test("unreadable, unsupported, and oversized photos fail before upload", async () => {
  for (const [response, message] of [
    [{ ok: false }, /tidak dapat dibaca/],
    [{ ok: true, blob: async () => new Blob(["gif"], { type: "image/gif" }) }, /JPEG, PNG, atau WebP/],
    [{ ok: true, blob: async () => new Blob([new Uint8Array(5 * 1024 * 1024 + 1)], { type: "image/jpeg" }) }, /maksimal 5 MB/],
  ]) {
    const { appendReportPhoto } = loadSource(helper, { "expo/fetch": { fetch: async () => response } });
    await assert.rejects(appendReportPhoto(new ExpoFormData(), { uri: "file:///photo" }), message);
  }
});
