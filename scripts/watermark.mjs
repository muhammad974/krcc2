/**
 * KRCC certificate watermarker
 * ----------------------------
 * Run:  npm run watermark
 *
 * Reads the ORIGINAL (clean) certificate pages from  private/certificates-original/
 *   single page:  <id>.jpg            (e.g. iso-9001.jpg)
 *   many pages :  <id>-1.jpg, <id>-2.jpg ...   (e.g. classification-1.jpg)
 * and writes the PUBLIC, watermarked files the website uses to
 *   public/assets/certificates/   ->  <page>.jpg, <id>-thumb.jpg, <id>.pdf
 *
 * The watermark is burned into the pixels (full-page KRCC logo pattern + a
 * stronger logo on every stamp/signature) and the PDF is rebuilt from those
 * flattened images, so a saved copy can not be cleaned or edited later.
 * The clean originals never go inside /public, so they are never deployed.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'private/certificates-original');
const OUT = path.join(ROOT, 'public/assets/certificates');
const LOGO = path.join(ROOT, 'scripts/watermark/krcc-logo.png');
const STAMPS = JSON.parse(await fs.readFile(path.join(ROOT, 'scripts/watermark/stamps.json'), 'utf8'));

/* ---- look & feel: change these numbers to make the watermark stronger/softer */
const TILE_ALPHA = 0.13;   // full-page pattern strength (0-1)
const TILE_LOGO_W = 0.085; // pattern logo width, as a share of page width
const TILE_CELL = 0.30;    // distance between pattern rows, share of page width
const TILE_ANGLE = -28;    // pattern tilt in degrees
const STAMP_ALPHA = 0.6;   // logo-on-stamp strength (0-1)
const STAMP_ANGLE = -10;
const DEFAULT_STAMP = [[0.28, 0.84, 0.17]];
const THUMB_W = 520;
const THUMB_W_WIDE = 700;
const JPEG_Q = 86;

/** logo as a PNG buffer: resized, rotated, with alpha multiplied by `alpha` */
async function logoPng(width, alpha, angle) {
  const { data, info } = await sharp(LOGO)
    .resize({ width: Math.max(8, Math.round(width)) })
    .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) data[i] = Math.round(data[i] * alpha);
  const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
  return { png, w: info.width, h: info.height };
}

async function watermark(file, id) {
  const { data: pageBuf, info } = await sharp(file).rotate().flatten({ background: '#fff' }).jpeg({ quality: 98 }).toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const layers = [];

  /* 1. full-page staggered pattern */
  const S = Math.round(W * TILE_CELL);
  const tileLogo = await logoPng(W * TILE_LOGO_W, TILE_ALPHA, TILE_ANGLE);
  const cell = await sharp({ create: { width: S, height: S, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: tileLogo.png, left: Math.round(S * 0.25 - tileLogo.w / 2), top: Math.round(S * 0.25 - tileLogo.h / 2) },
      { input: tileLogo.png, left: Math.round(S * 0.75 - tileLogo.w / 2), top: Math.round(S * 0.75 - tileLogo.h / 2) },
    ])
    .png()
    .toBuffer();
  const pattern = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: cell, tile: true }])
    .png()
    .toBuffer();
  layers.push({ input: pattern, blend: 'multiply' });

  /* 2. stronger logo on every stamp / signature */
  const name = path.basename(file).replace(/\.[^.]+$/, '');
  const spots = STAMPS[name] ?? STAMPS[id] ?? DEFAULT_STAMP;
  for (const [x, y, size, mode] of spots) {
    const l = await logoPng(W * size, STAMP_ALPHA, STAMP_ANGLE);
    const left = Math.min(Math.max(0, Math.round(x * W - l.w / 2)), W - l.w);
    const top = Math.min(Math.max(0, Math.round(y * H - l.h / 2)), H - l.h);
    layers.push({ input: l.png, left, top, blend: mode === 'over' ? 'over' : 'multiply' });
  }

  const out = await sharp(pageBuf).composite(layers).jpeg({ quality: JPEG_Q, mozjpeg: true }).toBuffer();
  return { buf: out, W, H };
}

const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const docs = new Map();
for (const f of files) {
  const base = f.replace(/\.[^.]+$/, '');
  const m = base.match(/^(.*)-(\d{1,2})$/); // "-1" .. "-99" = page number ("iso-9001" is NOT a page)
  const id = m ? m[1] : base;
  if (!docs.has(id)) docs.set(id, []);
  docs.get(id).push({ f, base, page: m ? Number(m[2]) : 1 });
}

await fs.mkdir(OUT, { recursive: true });
for (const [id, pages] of docs) {
  pages.sort((a, b) => a.page - b.page);
  const pdf = await PDFDocument.create();
  pdf.setTitle(`KRCC - ${id}`);
  pdf.setProducer('KRCC');
  pdf.setCreator('KRCC');
  let first = null;
  for (const p of pages) {
    const { buf, W, H } = await watermark(path.join(SRC, p.f), id);
    await fs.writeFile(path.join(OUT, `${p.base}.jpg`), buf);
    if (!first) first = { buf, W, H };
    const pw = W > H ? 842 : 595;
    const page = pdf.addPage([pw, (pw * H) / W]);
    const img = await pdf.embedJpg(buf);
    page.drawImage(img, { x: 0, y: 0, width: pw, height: (pw * H) / W });
  }
  const tw = first.W > first.H ? THUMB_W_WIDE : THUMB_W;
  await sharp(first.buf).resize({ width: tw }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, `${id}-thumb.jpg`));
  await fs.writeFile(path.join(OUT, `${id}.pdf`), await pdf.save());
  console.log(`✔ ${id}  (${pages.length} page${pages.length > 1 ? 's' : ''})`);
}
console.log(`\nDone. ${docs.size} certificates watermarked -> public/assets/certificates`);
