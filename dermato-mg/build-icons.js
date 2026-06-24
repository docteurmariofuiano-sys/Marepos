#!/usr/bin/env node
/* =====================================================================
   Génère les icônes PNG de l'application (PWA) sans dépendance :
   encodeur PNG minimal (RGBA) + zlib natif de Node.
   Design : carré plein bleu (#1e6fd6) + croix médicale blanche.
   Sorties : icon-192.png, icon-512.png, icon-maskable-512.png
   Usage : node build-icons.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const dir = __dirname + path.sep;

/* CRC32 */
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return (buf) => {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) c = t[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  };
})();

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(CRC(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  // raw scanlines with filter byte 0
  const raw = Buffer.alloc(size * (size * 4 + 1));
  let o = 0;
  for (let y = 0; y < size; y++) {
    raw[o++] = 0;
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      raw[o++] = rgba[i]; raw[o++] = rgba[i + 1]; raw[o++] = rgba[i + 2]; raw[o++] = rgba[i + 3];
    }
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

/* dessine carré bleu + croix blanche ; armRatio = demi-longueur de la croix (fraction de size) */
function drawIcon(size, armRatio) {
  const rgba = new Uint8Array(size * size * 4);
  const bg = [30, 111, 214];      // --blue #1e6fd6
  const fg = [255, 255, 255];
  const cx = size / 2, cy = size / 2;
  const half = size * armRatio;    // demi-longueur des bras
  const thick = size * 0.165;      // demi-épaisseur des bras
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = Math.abs(x + 0.5 - cx), dy = Math.abs(y + 0.5 - cy);
      const inV = dx <= thick && dy <= half;   // barre verticale
      const inH = dy <= thick && dx <= half;   // barre horizontale
      const c = (inV || inH) ? fg : bg;
      const i = (y * size + x) * 4;
      rgba[i] = c[0]; rgba[i + 1] = c[1]; rgba[i + 2] = c[2]; rgba[i + 3] = 255;
    }
  }
  return rgba;
}

const out = [
  ['icon-192.png', 192, 0.30],
  ['icon-512.png', 512, 0.30],
  ['icon-maskable-512.png', 512, 0.24], // plus de marge (zone de sécurité maskable)
];
out.forEach(([name, size, arm]) => {
  fs.writeFileSync(dir + name, encodePNG(size, drawIcon(size, arm)));
  console.log('écrit', name);
});
