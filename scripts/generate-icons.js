import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, renderPixel) {
  // RGBA buffer with filter byte (0) before each scanline
  const rowStride = 1 + width * 4;
  const rawData = Buffer.alloc(rowStride * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    rawData[rowOffset] = 0; // Filter type: None
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = renderPixel(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // color type RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const checksum = crc32(typeAndData);
  chunk.writeUInt32BE(checksum, 8 + len);
  return chunk;
}

function renderListoIcon(x, y, w, h, isMaskable = false) {
  // Coordinate normalization [0, 1]
  const nx = x / w;
  const ny = y / h;

  // Background color #101714 (16, 23, 20)
  // Subtle radial gradient center highlight #18231D
  const distCenter = Math.hypot(nx - 0.5, ny - 0.5);
  let bgR = 16 + Math.max(0, Math.floor((0.5 - distCenter) * 15));
  let bgG = 23 + Math.max(0, Math.floor((0.5 - distCenter) * 20));
  let bgB = 20 + Math.max(0, Math.floor((0.5 - distCenter) * 16));

  // If not maskable, add rounded corners to the whole icon
  if (!isMaskable) {
    const cornerRadius = 0.22;
    const dx = Math.max(0, Math.max(cornerRadius - nx, nx - (1 - cornerRadius)));
    const dy = Math.max(0, Math.max(cornerRadius - ny, ny - (1 - cornerRadius)));
    if (dx > 0 && dy > 0 && Math.hypot(dx, dy) > cornerRadius) {
      return [0, 0, 0, 0]; // transparent outside rounded app icon
    }
  }

  // Safe inner card area
  const cardPad = isMaskable ? 0.22 : 0.16;
  const cardW = 1 - cardPad * 2;
  const inCard = nx >= cardPad && nx <= 1 - cardPad && ny >= cardPad && ny <= 1 - cardPad;

  // Card color #1B2620 (27, 38, 32)
  let r = bgR;
  let g = bgG;
  let b = bgB;
  let a = 255;

  if (inCard) {
    r = 27;
    g = 38;
    b = 32;

    // Card border
    const onBorder = (nx <= cardPad + 0.015 || nx >= 1 - cardPad - 0.015 || ny <= cardPad + 0.015 || ny >= 1 - cardPad - 0.015);
    if (onBorder) {
      r = 43;
      g = 61;
      b = 51;
    }

    // Top checklist item (completed checkmark)
    const checkCenterY = cardPad + cardW * 0.25;
    const checkCenterX = cardPad + cardW * 0.24;
    const checkRadius = cardW * 0.12;

    const dCheck = Math.hypot(nx - checkCenterX, ny - checkCenterY);
    if (dCheck <= checkRadius) {
      // Accent green #35C878 (53, 200, 120)
      r = 53;
      g = 200;
      b = 120;

      // Inside checkmark stroke (tick mark)
      // relative check coordinates
      const cx = (nx - checkCenterX) / checkRadius;
      const cy = (ny - checkCenterY) / checkRadius;
      // V shape: (-0.4, 0) to (-0.1, 0.35) to (0.45, -0.35)
      const distToSeg1 = pointToSegmentDist(cx, cy, -0.4, 0, -0.05, 0.35);
      const distToSeg2 = pointToSegmentDist(cx, cy, -0.05, 0.35, 0.45, -0.3);
      if (Math.min(distToSeg1, distToSeg2) < 0.15) {
        r = 16;
        g = 23;
        b = 20; // dark mark inside check
      }
    }

    // Line 1 next to check
    if (ny >= checkCenterY - 0.025 && ny <= checkCenterY + 0.025 && nx >= cardPad + cardW * 0.44 && nx <= cardPad + cardW * 0.88) {
      r = 245; g = 247; b = 245; // Soft white
    }

    // Second checklist item (pending circle)
    const pending1Y = cardPad + cardW * 0.52;
    const pending1X = checkCenterX;
    const dPending1 = Math.hypot(nx - pending1X, ny - pending1Y);
    if (dPending1 <= checkRadius && dPending1 >= checkRadius - 0.025) {
      r = 53; g = 200; b = 120; // green outline
    }
    // Line 2
    if (ny >= pending1Y - 0.022 && ny <= pending1Y + 0.022 && nx >= cardPad + cardW * 0.44 && nx <= cardPad + cardW * 0.80) {
      r = 182; g = 193; b = 186; // text secondary #B6C1BA
    }

    // Third checklist item
    const pending2Y = cardPad + cardW * 0.78;
    const pending2X = checkCenterX;
    const dPending2 = Math.hypot(nx - pending2X, ny - pending2Y);
    if (dPending2 <= checkRadius && dPending2 >= checkRadius - 0.025) {
      r = 75; g = 95; b = 84; // muted border
    }
    // Line 3
    if (ny >= pending2Y - 0.022 && ny <= pending2Y + 0.022 && nx >= cardPad + cardW * 0.44 && nx <= cardPad + cardW * 0.68) {
      r = 140; g = 155; b = 146;
    }
  }

  return [r, g, b, a];
}

function pointToSegmentDist(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate 192x192
const pwa192 = createPNG(192, 192, (x, y, w, h) => renderListoIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pwa192);

// Generate 512x512
const pwa512 = createPNG(512, 512, (x, y, w, h) => renderListoIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pwa512);

// Generate maskable 512x512 with safe margin
const pwaMaskable512 = createPNG(512, 512, (x, y, w, h) => renderListoIcon(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pwaMaskable512);

// Generate apple-touch-icon 180x180
const appleIcon = createPNG(180, 180, (x, y, w, h) => renderListoIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Generate favicon 64x64
const favicon = createPNG(64, 64, (x, y, w, h) => renderListoIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon);

console.log('PWA icons successfully generated in public/ directory.');
