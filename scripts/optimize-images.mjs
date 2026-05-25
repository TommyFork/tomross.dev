import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const targets = [
  "public/blue-abstract-gradient.png",
  "public/headshot.jpeg",
  "public/brightbook/BrightBook-Preview.jpg",
  "public/brightbook/New-Venture-Competition.jpg",
  "public/brightbook/NYU-Shanghai-Panel.jpg",
  "public/next-step/NextStep-Preview-1.png",
  "public/next-step/NextStep-Preview-2.png",
  "public/next-step/NextStep-Preview-3.png",
  "public/stumped/Stumped-Preview.png",
];

const minSavingsRatio = 0.04;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

async function candidateFor(filePath, metadata) {
  const ext = path.extname(filePath).toLowerCase();
  const image = sharp(filePath, { limitInputPixels: false }).rotate();

  if (ext === ".jpg" || ext === ".jpeg") {
    return image.jpeg({
      quality: 86,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    }).toBuffer();
  }

  if (ext === ".png") {
    const lossless = await image.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
    }).toBuffer();

    if ((metadata.size ?? 0) < 200 * 1024) {
      return lossless;
    }

    const palette = await sharp(filePath, { limitInputPixels: false })
      .rotate()
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 10,
        palette: true,
        quality: 92,
        colors: 256,
      })
      .toBuffer();

    return palette.length < lossless.length ? palette : lossless;
  }

  throw new Error(`Unsupported image type: ${filePath}`);
}

let totalBefore = 0;
let totalAfter = 0;
let changed = 0;

for (const target of targets) {
  const filePath = path.join(root, target);
  const before = await fs.stat(filePath);
  const beforeMeta = await sharp(filePath, { limitInputPixels: false }).metadata();
  const candidate = await candidateFor(filePath, { size: before.size });
  const afterMeta = await sharp(candidate, { limitInputPixels: false }).metadata();

  if (beforeMeta.width !== afterMeta.width || beforeMeta.height !== afterMeta.height) {
    throw new Error(`${target}: candidate changed dimensions`);
  }

  const savings = before.size - candidate.length;
  const savingsRatio = savings / before.size;
  totalBefore += before.size;

  if (savings > 0 && savingsRatio >= minSavingsRatio) {
    await fs.writeFile(filePath, candidate);
    totalAfter += candidate.length;
    changed += 1;
    console.log(
      `${target}: ${formatBytes(before.size)} -> ${formatBytes(candidate.length)} saved ${formatBytes(savings)}`,
    );
  } else {
    totalAfter += before.size;
    console.log(`${target}: kept ${formatBytes(before.size)}; candidate savings below threshold`);
  }
}

console.log(
  `Optimized ${changed}/${targets.length} files. Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} saved ${formatBytes(totalBefore - totalAfter)}.`,
);
