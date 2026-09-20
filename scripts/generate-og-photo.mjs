import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Regenerates the Open Graph photo derivative (public/og-photo.jpg) from the
// source portrait (public/photos/on-blue-shirt.webp).
//
// Why a derivative exists: the Open Graph route renders through satori
// (next/og), which cannot decode WebP. The route therefore reads this JPEG.
// Re-run after replacing the source portrait:  pnpm og:photo

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public", "photos", "on-blue-shirt.webp");
const target = path.join(root, "public", "og-photo.jpg");

// 880x1260 is exactly 2x the 440x630 photo panel in src/app/opengraph-image.tsx,
// so this framing matches the objectFit:cover crop the card would apply.
await mkdir(path.dirname(target), { recursive: true });

const info = await sharp(source)
  .resize(880, 1260, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88 })
  .toFile(target);

console.log(
  `og-photo.jpg regenerated from ${path.relative(root, source)} ` +
    `(${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`,
);
