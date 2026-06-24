#!/usr/bin/env node
/* =====================================================================
   Génère photos.js à partir des images du dossier img/.
   Chaque fichier img/<id>.<jpg|jpeg|png|webp> devient une image intégrée
   par défaut pour la lésion <id> (aide visuelle).
   Les <id> attendus correspondent aux identifiants des lésions :
     élémentaires : macule, papule, plaque, nodule, vesicule, bulle,
       pustule, papule_oedemateuse, squame, croute, erosion, ulceration,
       atrophie, lichenification, fissure
     dermatoscopie : reseau_typique, reseau_atypique, points_globules,
       stries, voile_bleu_blanc, regression, telangiectasies,
       nids_bleu_gris, vaisseaux_glomerulaires, comedons_milia
   Usage : node build-photos.js   (puis node build-single.js)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const dir = __dirname + path.sep;
const imgDir = dir + 'img' + path.sep;
const MIME = { '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.webp':'image/webp' };

const out = {};
if (fs.existsSync(imgDir)) {
  fs.readdirSync(imgDir).sort().forEach((f) => {
    const ext = path.extname(f).toLowerCase();
    if (!MIME[ext]) return;
    const id = path.basename(f, ext);
    const b64 = fs.readFileSync(imgDir + f).toString('base64');
    out[id] = `data:${MIME[ext]};base64,${b64}`;
  });
}
const body =
  '/* Généré par build-photos.js — NE PAS éditer à la main. */\n' +
  'window.DERMATO_PHOTOS = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync(dir + 'photos.js', body);
console.log('photos.js : ' + Object.keys(out).length + ' image(s) intégrée(s).');
