// Rebuilds the optimised images in /public and /app from the legacy Vite repo.
// Usage: LEGACY_DIR=../snapinfinity-react/public/images node scripts/prepare-assets.mjs
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const LEGACY = process.env.LEGACY_DIR ?? "../snapinfinity-react/public/images";
const PUBLIC = "public/images";
const src = (p) => path.join(LEGACY, p);
const out = async (p) => {
  const file = path.join(PUBLIC, p);
  await fs.mkdir(path.dirname(file), { recursive: true });
  return file;
};

/* ---------- Client logos: opaque PNGs on black → white marks on transparent ---------- */

const clients = [
  ["client_1.png", "laurel-garden"],
  ["client_2.png", "elc"],
  ["client_3.png", "rias-engineering"],
  ["client_4.png", "techbiz"],
  ["client_5.png", "foster"],
  ["client_6.png", "western-sayal"],
  ["client_7.png", "shaastec"],
  ["client_8.png", "cscplay", { invertBox: true }],
  ["client_9.png", "freshmills"],
  ["client_10.png", "insource-360-banking"],
  ["client_11.png", "insource-real-estate", { lo: 0.3 }],
];

async function monochromeLogo(file, opts = {}) {
  let img = sharp(src(`clients/${file}`)).removeAlpha();
  if (opts.invertBox) {
    // Dark logo printed on a white box: crop to the box, then treat dark as ink.
    img = sharp(await img.trim({ background: "#000", threshold: 40 }).toBuffer());
  }
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const lum = new Float32Array(width * height);
  for (let i = 0; i < lum.length; i++) {
    const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]].map((v) => v / 255);
    lum[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  const border = [];
  for (let x = 0; x < width; x++) border.push(lum[x], lum[(height - 1) * width + x]);
  for (let y = 0; y < height; y++) border.push(lum[y * width], lum[y * width + width - 1]);
  border.sort((a, b) => a - b);
  const bg = border[Math.floor(border.length / 2)];
  const invert = bg > 0.5;
  const value = Float32Array.from(lum, (l) => (invert ? bg - l : l - bg));
  const lo = opts.lo ?? 0.04;
  const ink = [...value].filter((v) => v > lo).sort((a, b) => a - b);
  const hi = ink[Math.floor(ink.length * 0.9)] ?? 1;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < value.length; i++) {
    const a = Math.max(0, Math.min(1, (value[i] - lo) / Math.max(hi - lo, 0.01)));
    rgba.set([255, 255, 255, Math.round(a * 255)], i * 4);
  }
  return sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: 480, height: 200, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 });
}

/* ---------- Photos ---------- */

const team = [
  ["team/aadil.jpeg", "aadil-mansoor"],
  ["team/ansif.jpeg", "ansif-abdulla"],
  ["team/ashfaq.jpg", "ashfaque-ahamed"],
  ["team/fawas.jpeg", "mohammad-fawas"],
  ["team/hadi.jpg", "hadi"],
  ["team/hani.jpeg", "muhammed-hani"],
  ["team/sanand.jpeg", "sanand"],
  ["demo13.png", "muhammed-niyas"],
  ["demo14.png", "muethesim"],
  ["demo15.jpeg", "fayyas-ashraf"],
];

const studio = [
  ["demo4.jpeg", "team-together"],
  ["demo5.jpeg", "team-at-work"],
  ["snapteam6.jpeg", "studio-desks"],
  ["snapteam3.jpeg", "studio-floor"],
  ["snapteam7.jpeg", "meeting-room"],
  ["snapteam2.jpeg", "desk-detail"],
  ["snapteam1.jpeg", "focus"],
  ["team/team6.jpeg", "inauguration-team"],
  ["team/team3.jpeg", "be-bold"],
  ["team/team4.jpeg", "to-infinity-cake"],
  ["team/team1.jpeg", "inauguration-welcome"],
];

const projects = [
  "poogo", "csc", "grb", "shaastec", "elc", "insource-properties",
  "western-sayal", "rias", "laurel-garden", "techbiz", "insource-banking", "foster",
];

/* ---------- Icons from the traced mark ---------- */

async function icons() {
  const { markPaths } = JSON.parse(await fs.readFile("scripts/logo-paths.json", "utf8"));
  const mark = markPaths.map((d) => `<path d="${d}"/>`).join("");
  // Mark viewBox is 1386×953; centre it on a 1600 square with a dark rounded tile.
  const svg = (bg = true) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600">${
      bg ? '<rect width="1600" height="1600" rx="360" fill="#050807"/>' : ""
    }<g transform="translate(207 323)" fill="#37AD9D">${mark}</g></svg>`;
  await fs.writeFile("app/icon.svg", svg());
  const png = (size) => sharp(Buffer.from(svg())).resize(size, size).png().toBuffer();
  await fs.writeFile("app/apple-icon.png", await png(180));
  await fs.mkdir("public/icons", { recursive: true });
  await fs.writeFile("public/icons/icon-192.png", await png(192));
  await fs.writeFile("public/icons/icon-512.png", await png(512));
  // Maskable icon keeps the mark inside the 80% safe zone.
  const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600"><rect width="1600" height="1600" fill="#050807"/><g transform="translate(366 433) scale(0.66)" fill="#37AD9D">${mark}</g></svg>`;
  await fs.writeFile("public/icons/icon-maskable-512.png", await sharp(Buffer.from(maskable)).resize(512, 512).png().toBuffer());

  // favicon.ico with embedded PNGs (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map(png));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(s, e);
    header.writeUInt8(s, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(pngs[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += pngs[i].length;
  });
  await fs.writeFile("app/favicon.ico", Buffer.concat([header, ...pngs]));
}

/* ---------- Run ---------- */

for (const [file, slug, opts] of clients) {
  await (await monochromeLogo(file, opts)).toFile(await out(`clients/${slug}.png`));
}

for (const [file, slug] of team) {
  await sharp(src(file))
    .rotate()
    .resize(960, 1200, { fit: "cover", position: sharp.strategy.attention, withoutEnlargement: false })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(await out(`team/${slug}.jpg`));
}

for (const [file, slug] of studio) {
  await sharp(src(file))
    .rotate()
    .resize(1800, 1800, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(await out(`studio/${slug}.jpg`));
}

for (const slug of projects) {
  await sharp(src(`projects/${slug}.png`)).png({ compressionLevel: 9 }).toFile(await out(`work/${slug}.png`));
}

// Placeholder backdrops until the AI visuals arrive. The teal grade and dimming
// are baked in here so the page needs no CSS filters or blend layers at runtime.
const teal = { r: 55, g: 173, b: 157 };
const heroMeta = await sharp(src("main-hero.png")).metadata();
await sharp(src("main-hero.png"))
  .extract({ left: 0, top: 0, width: heroMeta.width, height: heroMeta.height - 48 })
  .flatten({ background: "#050807" })
  .grayscale()
  .tint(teal)
  .linear(0.75, 0)
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(await out("placeholders/hero-bars.jpg"));
await sharp(src("about.jpg"))
  .resize(1600)
  .grayscale()
  .tint(teal)
  .linear(0.6, 0)
  .jpeg({ quality: 76, mozjpeg: true })
  .toFile(await out("placeholders/silk.jpg"));

await icons();
console.log("Assets ready.");
