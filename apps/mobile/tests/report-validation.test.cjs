const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");
const code = ts.transpileModule(fs.readFileSync(path.resolve(__dirname, "../src/features/waste/report-validation.ts"), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exportsObject = {};
new Function("exports", code)(exportsObject);
const { reportErrors } = exportsObject;
const valid = { description: "Sampah plastik di pinggir jalan", coords: { latitude: -6.2, longitude: 106.8 }, hasPhoto: true, editing: false, mimeType: "image/jpeg", fileSize: 1024 };

test("new report requires description, photo, and GPS together", () => {
  const errors = reportErrors({ description: " ", hasPhoto: false, editing: false });
  assert.equal(errors.length, 3);
  assert.ok(errors.some((error) => error.includes("Deskripsi")));
  assert.ok(errors.some((error) => error.includes("Foto")));
  assert.ok(errors.some((error) => error.includes("GPS")));
});
test("editing permits retaining the existing photo", () => {
  assert.deepEqual(reportErrors({ ...valid, editing: true, hasPhoto: false }), []);
});
test("invalid coordinates, excessive description, size, and format are rejected", () => {
  assert.equal(reportErrors({ ...valid, coords: { latitude: NaN, longitude: 106 } }).length, 1);
  assert.equal(reportErrors({ ...valid, coords: { latitude: 91, longitude: 181 } }).length, 1);
  assert.equal(reportErrors({ ...valid, description: "a".repeat(5001) }).length, 1);
  assert.equal(reportErrors({ ...valid, fileSize: 5 * 1024 * 1024 + 1 }).length, 1);
  assert.equal(reportErrors({ ...valid, mimeType: "image/gif" }).length, 1);
});
test("valid boundary values and supported formats are accepted", () => {
  for (const mimeType of ["image/jpeg", "image/png", "image/webp"]) {
    assert.deepEqual(reportErrors({ ...valid, mimeType, description: "a".repeat(5000), fileSize: 5 * 1024 * 1024, coords: { latitude: -90, longitude: 180 } }), []);
  }
});
