/**
 * Pixel-art generator for the footer dog runner.
 *
 * Sprites are authored here as ASCII maps and compiled to crisp SVG — one <rect> per merged run of same-coloured pixels.
 * Keeping the source in one file makes the art editable without a pixel editor
 * and keeps the shipped SVGs tiny.
 *
 * Run with: node scripts/generate-game-art.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../public/dino");

/** Every colour in the game, keyed by the character used in the ASCII maps. */
const PALETTE = {
  // Dog
  k: "#3a2b21", // outline
  o: "#e2a25f", // fur
  d: "#bd7c34", // fur shadow
  h: "#f0bd7d", // fur highlight
  c: "#fbf0dc", // cream
  s: "#e0c8a2", // cream shadow
  e: "#ffffff", // eye glint
  b: "#2f7fd1", // collar
  y: "#f4c430", // collar tag

  // Rocks
  K: "#3d4952", // outline
  L: "#b3c0ca", // lit face
  G: "#828f9a", // mid face
  N: "#5a6873", // shadow face
  M: "#7aa565", // moss
  m: "#547a47", // moss shadow

  // Wood
  W: "#4c3521", // bark outline
  l: "#ab7c4c", // bark lit
  w: "#85592f", // bark mid

  // Pines
  P: "#659150", // needles
  p: "#4a6f42", // needles shadow
  T: "#6b4a2c", // trunk
  u: "#4a3320", // trunk shadow

  // Shrubs
  B: "#7aa565",
  n: "#547a47",

  // Clouds
  f: "#dbe4ec",
  F: "#f4f8fb",
  g: "#c7d3de",

  // Hills
  q: "#dcebe0", // far ridge crest
  Q: "#c6dbcd", // far ridge body
  r: "#b4d2be", // near ridge crest
  R: "#9cc0aa", // near ridge body
};

/* ------------------------------------------------------------------ *
 * Grid helpers
 * ------------------------------------------------------------------ */

const blank = (w, h) => Array.from({ length: h }, () => ".".repeat(w));

/** Turn ASCII rows into a validated grid. */
const fromRows = (rows) => {
  const width = rows[0].length;
  rows.forEach((row, index) => {
    if (row.length !== width) {
      throw new Error(`Row ${index} is ${row.length} wide, expected ${width}`);
    }
    for (const char of row) {
      if (char !== "." && !PALETTE[char]) {
        throw new Error(`Row ${index} uses unknown palette key "${char}"`);
      }
    }
  });
  return rows;
};

/** Draw `art` onto `base` at an offset, optionally mirrored horizontally. */
const stamp = (base, art, dx = 0, dy = 0, { flip = false } = {}) => {
  const cells = base.map((row) => row.split(""));
  art.forEach((row, y) => {
    const source = flip ? [...row].reverse().join("") : row;
    [...source].forEach((char, x) => {
      if (char === ".") return;
      const ty = y + dy;
      const tx = x + dx;
      if (ty < 0 || ty >= cells.length || tx < 0 || tx >= cells[0].length) return;
      cells[ty][tx] = char;
    });
  });
  return cells.map((row) => row.join(""));
};

/* ------------------------------------------------------------------ *
 * SVG emitter
 * ------------------------------------------------------------------ */

/** Horizontal run-length encode, then merge identical runs vertically. */
const toRects = (grid) => {
  const runs = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      let length = 1;
      while (x + length < row.length && row[x + length] === char) length += 1;
      if (char !== ".") runs.push({ x, y, w: length, h: 1, char });
      x += length;
    }
  });

  const open = new Map(); // "x:w:char" -> rect still growing downwards
  const merged = [];
  for (const run of runs) {
    const key = `${run.x}:${run.w}:${run.char}`;
    const previous = open.get(key);
    if (previous && previous.y + previous.h === run.y) {
      previous.h += 1;
    } else {
      open.set(key, run);
      merged.push(run);
    }
  }
  return merged;
};

const writeSprite = (name, grid, unit) => {
  const width = grid[0].length;
  const height = grid.length;
  const rects = toRects(grid)
    .map(
      ({ x, y, w, h, char }) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${PALETTE[char]}"/>`,
    )
    .join("");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width * unit}" height="${height * unit}" ` +
    `viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">${rects}</svg>\n`;

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, `${name}.svg`), svg);
  return { name, width: width * unit, height: height * unit, bytes: svg.length };
};

/* ------------------------------------------------------------------ *
 * The dog
 * ------------------------------------------------------------------ */

// Head, ears, torso and markings — identical in every frame. The tail and the
// legs live in their own maps so poses can be swapped without redrawing these.
const DOG_CORE = fromRows([
  "....................kk.....kk...",
  "...................kdok...kdok..",
  "..................kddook.kddook.",
  "..................kddoooooddook.",
  "..................koooooooooook.",
  ".................kooooooooooook.",
  ".................kooooookeooook.",
  ".................kooooookkooocck",
  ".................koooooooccccckk",
  "........khhhhhhhhoooooocccccckk.",
  ".....khhhhhhhhhhhhoooooccckcck..",
  "...koooohhhhhhhhhoobbooccccck...",
  "...kooooooooooooooobboocccck....",
  "...kooooooooooooooobbocccck.....",
  "...kooooooooooooooobbccck.......",
  "...koooooooooooooooyccck........",
  "....kdddddoooooooocccck.........",
  ".....kddddddssssssccck..........",
  "......kddddddsssssssk...........",
  ".......kkkkkkkkkkkkk............",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
]);

// Curled plume, resting over the back. Drawn under the body so the last few
// rows disappear into the rump instead of floating beside it.
const TAIL_RUN = fromRows([
  "...kck......",
  "..kcck......",
  "..kccck.....",
  "..kcscck....",
  "..ksooock...",
  "...ksooook..",
  "...ksoooook.",
  "....kdooooo.",
  "....kdoooooo",
  ".....koooooo",
]);

// Same plume, streamed out behind for the airborne pose.
const TAIL_JUMP = fromRows([
  "kck..........",
  "kcck.........",
  "kcsck........",
  ".kcsock......",
  ".kcsoook.....",
  "..ksooook....",
  "..kdoooook...",
  "...kdoooooo..",
  "....kdoooooo.",
  ".....koooooo.",
]);

// Frame 1: rear leg trailing, front leg planted.
const LEGS_A = fromRows([
  "....kdddk...koook.....",
  "...kdddk....koook.....",
  "..kdddk.....koook.....",
  ".kdddk......koook.....",
  "kcccck......kcccck....",
  "kkkkkk......kkkkkk....",
]);

// Frame 2: rear leg planted, front leg reaching forward.
const LEGS_B = fromRows([
  ".kdddk....koook....",
  ".kdddk.....koook...",
  ".kdddk......koook..",
  ".kdddk.......koook.",
  ".kcccck......kcccck",
  ".kkkkkk......kkkkkk",
]);

// Airborne: rear legs kicked back, front legs stretched forward.
const LEGS_JUMP = fromRows([
  "...kdddk........koooook....",
  ".kddddk...........koooook..",
  "kcccck.............kccccck.",
  "kkkkkk.............kkkkkkk.",
]);

// Tail goes down first so the body draws over its root; legs go on last.
const dogFrame = (tail, tailAt, legs, legsAt) => {
  let g = stamp(blank(32, 26), tail, tailAt[0], tailAt[1]);
  g = stamp(g, DOG_CORE, 0, 0);
  return stamp(g, legs, legsAt[0], legsAt[1]);
};

/* ------------------------------------------------------------------ *
 * Obstacles: rocks and sticks
 * ------------------------------------------------------------------ */

const ROCK_SMALL = fromRows([
  "......KKKKK.......",
  ".....KLLMMMK......",
  "....KLLLMMGGK.....",
  "...KLLLGGGGGGK....",
  "..KLLGGGGGGGGNK...",
  "..KLGGGGGGGGGNK...",
  ".KLGGGGGGGGGGNNK..",
  ".KGGGGGGGGGGNNNK..",
  ".KNNNNNNNNNNNNNK..",
  ".KNNNNNNNNNNNNNK..",
  ".KKKKKKKKKKKKKKK..",
]);

const ROCK_MID = fromRows([
  "....KKKK....",
  "...KLLMMK...",
  "..KLLLGGGK..",
  ".KLLGGGGGGK.",
  ".KLGGGGGGNK.",
  "KLGGGGGGGNNK",
  "KGGGGGGNNNNK",
  "KNNNNNNNNNNK",
  "KKKKKKKKKKKK",
]);

const PEBBLE = fromRows([
  "..KKKK..",
  ".KLLGGK.",
  ".KGGGGNK",
  ".KNNNNNK",
  ".KKKKKKK",
]);

// Shoulder-high boulder with a mossy cap and a hairline crack.
const BOULDER = fromRows([
  ".......KKKK.......",
  "......KLMMMK......",
  ".....KLLMMMGK.....",
  ".....KLMMGGGK.....",
  "....KLLGGGGGGK....",
  "....KLGGGGGGGK....",
  "...KLLGGGGGGGNK...",
  "...KLGGGGGGGGNK...",
  "..KLLGGGGGGGGNK...",
  "..KLGGGNGGGGGNK...",
  "..KGGGGNGGGGGGNK..",
  ".KGGGGGGNGGGGGNK..",
  ".KGGGGGGGNGGGGNK..",
  ".KGGGGGGGGNGGGNK..",
  ".KGGGGGGGGGNNGNK..",
  ".KGGGGGGGGGGNNNK..",
  ".KGGGGGGGGGNNNNK..",
  ".KGGGGGGGGNNNNNK..",
  ".KGGGGGGGNNNNNNK..",
  ".KGGGGGGNNNNNNNK..",
  ".KNNNNNNNNNNNNNK..",
  ".KNNNNNNNNNNNNNK..",
  ".KKKKKKKKKKKKKKK..",
]);

// Weathered standing stone — the tallest rock in the set.
const STANDING_STONE = fromRows([
  "....KKK....",
  "...KLMMK...",
  "...KLMGK...",
  "..KLLGGGK..",
  "..KLGGGGK..",
  "..KLGGGGK..",
  ".KLLGGGGNK.",
  ".KLGGGGGNK.",
  ".KLGGGGGNK.",
  ".KGGGGGGNK.",
  ".KGGGNGGNK.",
  ".KGGGNGGNK.",
  ".KGGGNGGNK.",
  ".KGGGGNGNK.",
  ".KGGGGNGNK.",
  ".KGGGGGNNK.",
  ".KGGGGGNNK.",
  ".KGGGGNNNK.",
  "KLGGGGNNNNK",
  "KGGGGGNNNNK",
  "KGGGGNNNNNK",
  "KGGGNNNNNNK",
  "KNNNNNNNNNK",
  "KNNNNNNNNNK",
  "KKKKKKKKKKK",
]);

const ROCK_CLUSTER = (() => {
  let g = blank(34, 11);
  g = stamp(g, ROCK_SMALL, 0, 0);
  g = stamp(g, ROCK_MID, 20, 2);
  g = stamp(g, PEBBLE, 15, 6);
  return g;
})();

// Twig lying flat, two shoots pointing up.
const TWIG = fromRows([
  "..............W.......",
  ".............WlW......",
  "......W......WlW......",
  ".....WlW.....WlW......",
  ".....WlW.....WlW......",
  "WWWWWWlWWWWWWWlWWWWWW.",
  "WlllllllllllllllllllW.",
  "WlwwwwwwwwwwwwwwwwwlW.",
  "WwwwwwwwwwwwwwwwwwwW..",
  ".WWWWWWWWWWWWWWWWWWW..",
]);

// A long branch leaning up and to the right, with two side shoots.
const BRANCH = fromRows([
  "..............WW....",
  ".............WllW...",
  "............WlwW....",
  "...........WlwW.....",
  "....WW....WlwW......",
  "...WllW..WllW.......",
  "....WlW.WllW........",
  ".....WlWWlW.........",
  "......WllwW.........",
  ".....WWlwW..........",
  ".....WlwW...........",
  "....WWlwW...........",
  "....WlwW............",
  "...WWlwW............",
  "...WlwW.............",
  "..WWlwW.............",
  "..WlwW..............",
  "..WlwW..............",
  ".WWlwW..............",
  ".WlwWW..............",
  ".WWWW...............",
]);

const LOG = fromRows([
  ".......MMM...MM.........",
  "..WWWWWWWWWWWWWWWWWWW...",
  ".WlllllllllllllllllllW..",
  "WWwwwwwwwwwwwwwwwwwwwWW.",
  "WlwWwwwwwwwwwwwwwwwwwlW.",
  "WlwWwwwwwwwwwwwwwwwwwlW.",
  "WlwWwwwwwwwwwwwwwwwwwlW.",
  "WWwwwwwwwwwwwwwwwwwwwWW.",
  ".WWWWWWWWWWWWWWWWWWWWW..",
]);

// A branch propped against a rock — the tall, "you have to jump" obstacle.
const BRANCH_ROCK = (() => {
  let g = blank(28, 21);
  g = stamp(g, BRANCH, 6, 0);
  g = stamp(g, ROCK_MID, 0, 12);
  return g;
})();

/* ------------------------------------------------------------------ *
 * Scenery
 * ------------------------------------------------------------------ */

const PINE_TALL = fromRows([
  "....P....",
  "...PpP...",
  "...PpP...",
  "..PPpPP..",
  "..PppPP..",
  ".PPPpPPP.",
  ".PppPpPP.",
  "PPPPpPPPP",
  "PppPpPPPP",
  "PPPPpPPPP",
  "...TuT...",
  "...TuT...",
  "...TuT...",
  "..TTTTT..",
]);

const PINE_SHORT = fromRows([
  "...P...",
  "..PpP..",
  ".PPpPP.",
  ".PppPP.",
  "PPPpPPP",
  "PppPpPP",
  "PPPpPPP",
  "..TuT..",
  "..TuT..",
  ".TTTTT.",
]);

const PINES = (() => {
  let g = blank(24, 15);
  g = stamp(g, PINE_TALL, 0, 1);
  g = stamp(g, PINE_SHORT, 9, 5);
  g = stamp(g, PINE_TALL, 15, 1, { flip: true });
  return g;
})();

const SHRUB = fromRows([
  "...nBn....",
  ".nBBBBn...",
  "nBBnBBBBn.",
  "BBBBBBBBBB",
  "nBBBBBBBBn",
  ".nnnnnnnn.",
]);

const CLOUD = fromRows([
  "......ffff......",
  "....ffFFFFff....",
  "..ffFFFFFFFFff..",
  ".fFFFFFFFFFFFFf.",
  "fFFFFFFFFFFFFFFf",
  ".fggggggggggggf.",
  "..ffffffffffff..",
]);

/** Seamlessly tiling twin ridge line, built from harmonics of the tile width. */
const HILLS = (() => {
  const width = 240;
  const height = 40;
  const cells = Array.from({ length: height }, () => Array(width).fill("."));
  const wave = (x, k, phase) => Math.sin((2 * Math.PI * k * x) / width + phase);

  for (let x = 0; x < width; x += 1) {
    const farTop = Math.round(
      15 - 5 * wave(x, 3, 0.4) - 3 * wave(x, 7, 1.9) - 2 * wave(x, 11, 3.1),
    );
    const nearTop = Math.round(
      26 - 4 * wave(x, 5, 2.2) - 2.5 * wave(x, 9, 0.6) - 1.5 * wave(x, 13, 4.4),
    );
    for (let y = farTop; y < height; y += 1) {
      cells[y][x] = y < farTop + 2 ? "q" : "Q";
    }
    for (let y = nearTop; y < height; y += 1) {
      cells[y][x] = y < nearTop + 2 ? "r" : "R";
    }
  }
  return cells.map((row) => row.join(""));
})();

/* ------------------------------------------------------------------ *
 * Emit
 * ------------------------------------------------------------------ */

const written = [
  writeSprite("dog-run-a", dogFrame(TAIL_RUN, [0, 2], LEGS_A, [3, 20]), 2),
  writeSprite("dog-run-b", dogFrame(TAIL_RUN, [0, 2], LEGS_B, [6, 20]), 2),
  writeSprite("dog-jump", dogFrame(TAIL_JUMP, [0, 1], LEGS_JUMP, [2, 20]), 2),
  writeSprite("rock-small", ROCK_SMALL, 2),
  writeSprite("rock-cluster", ROCK_CLUSTER, 2),
  writeSprite("boulder", BOULDER, 2),
  writeSprite("standing-stone", STANDING_STONE, 2),
  writeSprite("twig", TWIG, 2),
  writeSprite("branch", BRANCH, 2),
  writeSprite("log", LOG, 2),
  writeSprite("branch-rock", BRANCH_ROCK, 2),
  writeSprite("pines", PINES, 2),
  writeSprite("shrub", SHRUB, 2),
  writeSprite("cloud", CLOUD, 2),
  writeSprite("hills", HILLS, 2),
];

for (const { name, width, height, bytes } of written) {
  console.log(`${name}.svg  ${width}x${height}  ${bytes}B`);
}
