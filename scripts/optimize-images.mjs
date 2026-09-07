#!/usr/bin/env node
/**
 * One-time development image-optimization script.
 *
 * Not part of the build or runtime -- run manually with:
 *   node scripts/optimize-images.mjs
 *
 * For every image actually referenced by client/src (found via a source
 * grep, same approach as the inventory used in PRODUCTION_READINESS.md),
 * generates a sibling .webp file at a size and quality appropriate to how
 * large that image is ever actually displayed:
 *
 *  - TEXT_HEAVY images (scanned circulars, the Veda Vruksham diagram, Maha
 *    Periyava's letter) are re-encoded at high quality (90) with NO resize,
 *    since they're already modest resolution and shrinking risks making
 *    embedded text illegible.
 *  - The header logo is resized to 256px (it renders at 44x44px on screen;
 *    256px covers even a 4x pixel-density retina display with headroom)
 *    and re-encoded at quality 82.
 *  - Everything else (portraits, event/gallery photography) is capped at
 *    1600px on the long edge -- generous for the largest on-page use (the
 *    Gallery carousel, full-bleed up to ~1200px) -- and re-encoded at
 *    quality 80.
 *
 * Original files are never modified or deleted. Requires `sharp`
 * (devDependency only -- not shipped to the browser).
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "client", "src");
const PUBLIC = path.join(ROOT, "client", "public");

// Text-heavy scans/diagrams: high quality, never resized.
const TEXT_HEAVY = new Set([
  "/assets/announcement/poorthy-september-en.jpg",
  "/assets/announcement/poorthy-september-ta.jpg",
  "/assets/generated_images/Maha Periyava messages.png",
  "/history/Golden jublee.jpg",
  "/images/veda-vruksha-original-new.JPG",
]);

const LOGO = "/images/logo.jpg";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function findUsedImages() {
  const files = walk(SRC);
  const refs = new Set();
  const re = /"(\/[^"]+\.(?:jpg|jpeg|png|JPG|JPEG|PNG))"/g;
  for (const f of files) {
    const content = fs.readFileSync(f, "utf8");
    let m;
    while ((m = re.exec(content))) refs.add(decodeURIComponent(m[1]));
  }
  return [...refs].sort();
}

async function optimizeOne(publicPath) {
  const srcFull = path.join(PUBLIC, publicPath);
  if (!fs.existsSync(srcFull)) return null;

  const outFull = srcFull.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, ".webp");
  const originalSize = fs.statSync(srcFull).size;

  // .rotate() with no arguments auto-orients the pixel data according to
  // the source's EXIF Orientation tag (e.g. phone photos stored landscape
  // with a "rotate 90deg to display" flag) *before* any resize happens.
  // Without this, a portrait photo whose sensor stored it as landscape
  // pixels + an orientation tag gets that raw, un-rotated data baked into
  // the .webp with no tag left to correct it -- rendering sideways in the
  // browser. Sharp's own rotate() strips/normalizes the orientation tag
  // once it has physically applied it, so no extra metadata handling is
  // needed afterwards.
  let pipeline = sharp(srcFull).rotate();
  const meta = await pipeline.metadata();

  if (publicPath === LOGO) {
    pipeline = pipeline.resize({ width: 256, height: 256, fit: "cover" }).webp({ quality: 82 });
  } else if (TEXT_HEAVY.has(publicPath)) {
    pipeline = pipeline.webp({ quality: 90 });
  } else {
    const maxDim = 1600;
    if ((meta.width ?? 0) > maxDim || (meta.height ?? 0) > maxDim) {
      pipeline = pipeline.resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true });
    }
    pipeline = pipeline.webp({ quality: 80 });
  }

  await pipeline.toFile(outFull);
  const newSize = fs.statSync(outFull).size;
  return { publicPath, originalSize, newSize };
}

async function main() {
  const used = findUsedImages();
  console.log(`Found ${used.length} referenced images. Generating .webp versions...\n`);

  const results = [];
  for (const p of used) {
    try {
      const r = await optimizeOne(p);
      if (r) {
        results.push(r);
        const pct = (100 * (1 - r.newSize / r.originalSize)).toFixed(0);
        console.log(
          `${(r.originalSize / 1024).toFixed(0).padStart(6)} KB -> ${(r.newSize / 1024).toFixed(0).padStart(6)} KB (-${pct}%)  ${p}`
        );
      }
    } catch (err) {
      console.error(`FAILED: ${p}: ${err.message}`);
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.originalSize, 0);
  const totalAfter = results.reduce((s, r) => s + r.newSize, 0);
  console.log(`\n${results.length} images optimized.`);
  console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reduction:    ${(100 * (1 - totalAfter / totalBefore)).toFixed(1)}%`);
}

main();
