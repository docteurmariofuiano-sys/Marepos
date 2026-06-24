/* Construit pai-autonome.html : un seul fichier HTML embarquant pdf-lib et les
   7 formulaires officiels (base64), pour un usage 100 % hors-ligne.
   Usage : node pai/build-standalone.js  */
const fs=require('fs'), path=require('path');
const PAI=__dirname;
let html=fs.readFileSync(path.join(PAI,'index.html'),'utf8');

// 1) pdf-lib -> base64, injecté au runtime via le textContent d'un <script>
const libB64=fs.readFileSync(path.join(PAI,'vendor','pdf-lib.min.js')).toString('base64');
const libBoot=
'<script>window.__PDFLIB_B64="'+libB64+'";</script>\n'+
'<script>(function(){var b=atob(window.__PDFLIB_B64),u=new Uint8Array(b.length);'+
'for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);'+
'var s=document.createElement("script");s.textContent=new TextDecoder("utf-8").decode(u);'+
'document.head.appendChild(s);})();</script>\n';
if(!html.includes('<script src="vendor/pdf-lib.min.js"></script>')){console.error('lib tag introuvable');process.exit(1);}
html=html.replace('<script src="vendor/pdf-lib.min.js"></script>', libBoot);

// 2) modèles officiels remplis par l'app, embarqués en base64
const files=['pai-general.pdf','fiche-asthme.pdf','fiche-anaphylaxie.pdf','fiche-diabete.pdf','fiche-epilepsie.pdf','fiche-drepanocytose.pdf','fiche-standard.pdf'];
const tpl={};
for(const f of files){ tpl[f]=fs.readFileSync(path.join(PAI,'templates',f)).toString('base64'); }
const tplScript='<script>window.__PAI_TPL='+JSON.stringify(tpl)+';</script>\n';

// 3) loadDoc utilise les modèles embarqués en priorité, sinon fetch
const oldLoad=`async function loadDoc(file){
  const res = await fetch("templates/"+file);
  if(!res.ok) throw new Error("Modèle introuvable : "+file);
  return PDFLib.PDFDocument.load(await res.arrayBuffer());
}`;
const newLoad=`function __b64ToBytes(b64){var bin=atob(b64),n=bin.length,u=new Uint8Array(n);for(var i=0;i<n;i++)u[i]=bin.charCodeAt(i);return u;}
async function loadDoc(file){
  if(window.__PAI_TPL && window.__PAI_TPL[file]) return PDFLib.PDFDocument.load(__b64ToBytes(window.__PAI_TPL[file]));
  const res = await fetch("templates/"+file);
  if(!res.ok) throw new Error("Modèle introuvable : "+file);
  return PDFLib.PDFDocument.load(await res.arrayBuffer());
}`;
if(!html.includes(oldLoad)){console.error('ancre loadDoc introuvable');process.exit(1);}
html=html.replace(oldLoad,newLoad);

// 4) insère les modèles avant le script principal
html=html.replace("<script>\n'use strict';", tplScript+"<script>\n'use strict';");

const out=path.join(PAI,'pai-autonome.html');
fs.writeFileSync(out,html);
console.log('Écrit',out,(fs.statSync(out).size/1048576).toFixed(1)+' Mo');
