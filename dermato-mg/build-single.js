#!/usr/bin/env node
/* =====================================================================
   Génère dermato-mg.html : fichier HTML autonome unique regroupant
   index.html + style.css + data.js + app.js (CSS et scripts inlinés).
   Usage : node build-single.js
   NB : on utilise des FONCTIONS de remplacement (String.replace) pour que
   les séquences "$" / "$$" présentes dans le code soient insérées telles
   quelles (sinon "$$" serait interprété comme un "$" littéral).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const dir = __dirname + path.sep;

let html = fs.readFileSync(dir + 'index.html', 'utf8');
const css  = fs.readFileSync(dir + 'style.css', 'utf8');
const data = fs.readFileSync(dir + 'data.js', 'utf8');
const app  = fs.readFileSync(dir + 'app.js', 'utf8');

html = html.replace(/<link rel="stylesheet" href="style\.css\?v=1">/, () => '<style>\n' + css + '\n</style>');
html = html.replace(/<script src="data\.js\?v=1"><\/script>/, () => '<script>\n' + data + '\n</script>');
html = html.replace(/<script src="app\.js\?v=1"><\/script>/, () => '<script>\n' + app + '\n</script>');
html = html.replace('</title>', () =>
  '</title>\n<!-- Fichier autonome unique : CSS + donnees + script inlines.' +
  ' Genere depuis index.html/style.css/data.js/app.js par build-single.js.' +
  ' Ne pas editer a la main : modifier les sources puis regenerer. -->');

fs.writeFileSync(dir + 'dermato-mg.html', html);
console.log('dermato-mg.html généré (' + html.length + ' octets).');
