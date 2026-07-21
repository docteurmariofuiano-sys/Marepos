/* =====================================================================
   MODULE VOCAL GÉNÉRIQUE — Marepos / Évaluations Médicales
   Dr Mario Fuiano — prototype
   ---------------------------------------------------------------------
   Intégration : une seule ligne avant </body> de evaluations_medicales.html
       <script src="module-vocal.js"></script>
   ---------------------------------------------------------------------
   Principe : le module ne connaît AUCUN test. Il lit les questions
   affichées (.qcard → .qtext) et les options (.opt → .otx), écoute la
   réponse, et clique l'option correspondante. Fonctionne donc pour tous
   les tests à choix (PHQ-9, Epworth, MMSE items à options, AUDIT, DN4,
   Fagerström, IPSS, Berlin, EPDS, HAM-A…) et pour ceux ajoutés demain.
   Les tests à champs libres (écho, grossesse, paquets-années) sont
   automatiquement exclus : le bouton vocal ne s'affiche pas.
   ---------------------------------------------------------------------
   ⚠ PROTOTYPE : la reconnaissance vocale du navigateur (Chrome)
   transite par les serveurs de l'éditeur. Pour un usage patient réel :
   STT local (Whisper) — même logique, moteur différent.
   ===================================================================== */
(function(){
"use strict";

/* ---------- Configuration ---------- */
const CFG = {
  debit: 0.95,                       // vitesse TTS
  lireOptionsPremiereQuestion: true, // consignes lues seulement quand elles changent
  escaladeActive: true
};

/* Mots d'alerte → pause + appel humain */
const ALERTES = [
  /douleur.{0,14}(poitrine|thorac)/i, /(poitrine|thorax).{0,14}douleur/i,
  /(peux|peut|arrive) (pas|plus) (à |de )?respirer/i, /j.?étouffe/i,
  /malaise/i, /idées? noires?/i, /envie de mourir/i, /suicid/i,
  /me faire du mal/i, /en finir/i
];
const AIDE = [/aidez[- ]moi/i, /appelez quelqu/i, /je veux (voir|parler)/i];

/* ---------- État ---------- */
let actif=false, rec=null, ecouteEnCours=false, qCourante=null,
    dernieresOptions="", voixFr=null, derniereConsigne="";

/* ---------- Utilitaires ---------- */
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
                   .replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const ORDINAUX = {"premiere":0,"premier":0,"un":0,"une":0,"1":0,
  "deuxieme":1,"seconde":1,"deux":1,"2":1,
  "troisieme":2,"trois":2,"3":2,
  "quatrieme":3,"quatre":3,"4":3,
  "cinquieme":4,"cinq":4,"5":4,
  "sixieme":5,"six":5,"6":5,
  "septieme":6,"sept":6,"7":6,
  "huitieme":7,"huit":7,"8":7};

/* ---------- TTS robuste ---------- */
function chargeVoix(){
  const vs = speechSynthesis.getVoices();
  voixFr = vs.find(v=>/fr[-_]FR/i.test(v.lang)) || vs.find(v=>/^fr/i.test(v.lang)) || null;
}
if("speechSynthesis" in window){ chargeVoix(); speechSynthesis.onvoiceschanged = chargeVoix; }

function dire(texte, fin){
  if(!("speechSynthesis" in window)){ if(fin) fin(); return; }
  speechSynthesis.cancel();
  setTimeout(()=>{
    if(!voixFr) chargeVoix();
    const u = new SpeechSynthesisUtterance(texte);
    u.lang="fr-FR"; u.rate=CFG.debit;
    if(voixFr) u.voice = voixFr;
    let ok=false; const done=()=>{ if(!ok){ ok=true; if(fin) fin(); } };
    u.onend=done; u.onerror=done;
    setTimeout(()=>{ if(!speechSynthesis.speaking) done(); },1200);
    speechSynthesis.speak(u);
  },120);
}

/* ---------- STT ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function initRec(){
  const r = new SR();
  r.lang="fr-FR"; r.interimResults=false; r.maxAlternatives=3; r.continuous=false;
  r.onresult = e => {
    const t = e.results[0][0].transcript.trim();
    setStatut("« "+t+" »");
    traite(t);
  };
  r.onend = ()=>{ ecouteEnCours=false; majUI(); };
  r.onerror = ev => {
    ecouteEnCours=false; majUI();
    if(ev.error==="not-allowed"||ev.error==="service-not-allowed"){
      setStatut("Micro non autorisé"); stopVocal();
    } else setStatut("Je n'ai pas entendu — touchez le micro");
  };
  return r;
}
function ecoute(){ if(!rec||!actif) return; try{ rec.start(); ecouteEnCours=true; }catch(e){} majUI(); }
function stopEcoute(){ if(rec){ try{rec.stop();}catch(e){} } ecouteEnCours=false; majUI(); }

/* ---------- Lecture du DOM : questions & options ---------- */
function cartesQuestions(){
  const sc = document.getElementById("screen-test");
  if(!sc || !sc.classList.contains("active")) return [];
  return [...sc.querySelectorAll(".qcard")].filter(c=>c.querySelectorAll(".opt").length>0);
}
function prochaineQuestion(){
  return cartesQuestions().find(c=>!c.querySelector(".opt.sel")) || null;
}
function texteQuestion(card){
  const q = card.querySelector(".qtext");
  const s = card.querySelector(".qsub");
  return (q?q.textContent:"") + (s? ". "+s.textContent : "");
}
function optionsDe(card){
  return [...card.querySelectorAll(".opt")].map(o=>({
    el:o, label:(o.querySelector(".otx")||o).textContent.trim()
  }));
}

/* ---------- Boucle vocale ---------- */
function poseQuestion(){
  if(!actif) return;
  qCourante = prochaineQuestion();
  if(!qCourante){
    dire("Le questionnaire est terminé. Vous pouvez valider en bas de l'écran, ou rendre la tablette à l'accueil.");
    setStatut("Terminé ✅"); stopVocal(false);
    return;
  }
  qCourante.scrollIntoView({behavior:"smooth", block:"center"});
  qCourante.classList.add("vx-focus");
  const opts = optionsDe(qCourante);
  const sig = opts.map(o=>o.label).join("|");
  let phrase = texteQuestion(qCourante);
  if(CFG.lireOptionsPremiereQuestion && sig!==dernieresOptions){
    phrase += ". Les réponses possibles sont : " + opts.map(o=>o.label).join(", ") + ".";
    dernieresOptions = sig;
  }
  derniereConsigne = texteQuestion(qCourante) + ". Les réponses possibles sont : " + opts.map(o=>o.label).join(", ") + ".";
  dire(phrase, ()=>ecoute());
}

function traite(transcript){
  const t = norm(transcript);
  if(CFG.escaladeActive){
    if(ALERTES.some(rx=>rx.test(transcript))){ escalade(true); return; }
    if(AIDE.some(rx=>rx.test(transcript))){ escalade(false); return; }
  }
  if(!qCourante){ poseQuestion(); return; }
  const opts = optionsDe(qCourante);

  /* 1. correspondance directe avec un libellé (score de recouvrement de mots) */
  let meilleur=null, meilleurScore=0;
  opts.forEach((o,i)=>{
    const mots = norm(o.label).split(" ").filter(w=>w.length>2);
    if(!mots.length) return;
    const hits = mots.filter(w=>t.includes(w)).length;
    const score = hits/mots.length;
    if(score>meilleurScore){ meilleurScore=score; meilleur=i; }
  });
  if(meilleurScore>=0.6) return choisit(opts[meilleur]);

  /* 2. libellé entièrement contenu dans la phrase ("jamais", "oui", "non"…) */
  const exact = opts.findIndex(o=>{
    const l=norm(o.label);
    return l.length<=14 && new RegExp("\\b"+l.replace(/ /g,"\\s+")+"\\b").test(t);
  });
  if(exact>=0) return choisit(opts[exact]);

  /* 3. ordinal / chiffre ("la deuxième", "réponse trois", "2") */
  for(const mot of t.split(" ")){
    if(mot in ORDINAUX && ORDINAUX[mot] < opts.length){
      return choisit(opts[ORDINAUX[mot]]);
    }
  }
  setStatut("Pas compris — reformulez, ou touchez la réponse à l'écran");
  ecoute();
}

function choisit(opt){
  qCourante && qCourante.classList.remove("vx-focus");
  opt.el.click();                       /* → selectOpt() natif de la page */
  setTimeout(()=>poseQuestion(), 350);  /* enchaîne sur la question suivante */
}

/* ---------- Escalade humaine ---------- */
function escalade(medical){
  stopEcoute(); speechSynthesis.cancel();
  const ov = document.getElementById("vx-escalade");
  ov.querySelector("p").textContent = medical
    ? "Vous avez évoqué quelque chose d'important. Restez ici, quelqu'un vient vous voir immédiatement."
    : "Quelqu'un arrive pour vous aider. Le questionnaire est en pause.";
  ov.style.display="flex";
  console.log("[ESCALADE]", new Date().toISOString());
  /* 🔌 production : webhook local / sonnette / notification interne ici */
}

/* ---------- UI injectée ---------- */
function injecteUI(){
  const css = document.createElement("style");
  css.textContent = `
    .vx-fab{position:fixed;right:16px;bottom:84px;z-index:60;display:none;
      align-items:center;gap:10px;background:#0f1e2e;color:#fff;border:none;
      border-radius:999px;padding:12px 18px;font:600 15px/1 inherit;
      box-shadow:0 6px 20px rgba(0,0,0,.25);cursor:pointer}
    .vx-fab.on{background:#c47f2a;animation:vxp 1.6s ease-in-out infinite}
    @keyframes vxp{0%,100%{box-shadow:0 0 0 0 rgba(196,127,42,.45)}50%{box-shadow:0 0 0 16px rgba(196,127,42,0)}}
    @media (prefers-reduced-motion:reduce){.vx-fab.on{animation:none}}
    .vx-statut{position:fixed;right:16px;bottom:140px;z-index:60;display:none;
      max-width:70vw;background:#fff;border:1px solid #d8dfe8;border-radius:12px;
      padding:10px 14px;font-size:14px;color:#33415c;box-shadow:0 4px 14px rgba(0,0,0,.12)}
    .vx-relire{position:fixed;right:16px;bottom:196px;z-index:60;display:none;
      background:#fff;border:1.5px solid #d8dfe8;border-radius:999px;
      padding:9px 14px;font:600 13px/1 inherit;color:#33415c;cursor:pointer}
    .qcard.vx-focus{outline:3px solid #c47f2a;outline-offset:2px;border-radius:12px}
    #vx-escalade{display:none;position:fixed;inset:0;background:rgba(15,30,46,.96);
      z-index:200;flex-direction:column;align-items:center;justify-content:center;
      text-align:center;padding:32px;color:#fff}
    #vx-escalade h2{font-size:26px;margin:14px 0 8px}
    #vx-escalade p{color:#c7cfdb;font-size:18px;max-width:460px;margin-bottom:24px}
    #vx-escalade button{font:700 17px/1 inherit;border:none;border-radius:14px;
      padding:16px 26px;cursor:pointer}
    #vx-esc-fin{background:#c47f2a;color:#0f1e2e}
    #vx-esc-rep{background:transparent;color:#c7cfdb;border:2px solid #3a4763!important;margin-top:12px}`;
  document.head.appendChild(css);

  const fab = document.createElement("button");
  fab.className="vx-fab"; fab.id="vx-fab"; fab.innerHTML="🎙️ <span>Mode vocal</span>";
  fab.onclick = ()=> actif ? stopVocal() : startVocal();
  document.body.appendChild(fab);

  const st = document.createElement("div");
  st.className="vx-statut"; st.id="vx-statut";
  document.body.appendChild(st);

  const rl = document.createElement("button");
  rl.className="vx-relire"; rl.id="vx-relire"; rl.textContent="🔊 Relire + réponses";
  rl.onclick = ()=>{ stopEcoute(); dire(derniereConsigne, ()=>ecoute()); };
  document.body.appendChild(rl);

  const ov = document.createElement("div");
  ov.id="vx-escalade";
  ov.innerHTML = `<div style="font-size:64px">🔔</div><h2>Nous prévenons l'assistante</h2>
    <p></p><button id="vx-esc-fin">Terminer ici</button>
    <button id="vx-esc-rep">Reprendre le questionnaire</button>`;
  document.body.appendChild(ov);
  ov.querySelector("#vx-esc-fin").onclick = ()=>{ ov.style.display="none"; stopVocal(); };
  ov.querySelector("#vx-esc-rep").onclick = ()=>{ ov.style.display="none"; if(actif) poseQuestion(); };

  /* affiche/masque le bouton selon l'écran et le type de test */
  const obs = new MutationObserver(majVisibilite);
  document.querySelectorAll(".screen").forEach(s=>obs.observe(s,{attributes:true,attributeFilter:["class"]}));
  majVisibilite();
}
function majVisibilite(){
  const dispo = cartesQuestions().length>0;
  document.getElementById("vx-fab").style.display = dispo ? "flex":"none";
  if(!dispo && actif) stopVocal();
}
function setStatut(txt){
  const s = document.getElementById("vx-statut");
  s.textContent = txt; s.style.display = txt ? "block":"none";
}
function majUI(){
  const fab = document.getElementById("vx-fab");
  fab.classList.toggle("on", actif && ecouteEnCours);
  fab.querySelector("span").textContent = actif ? (ecouteEnCours?"J'écoute…":"Vocal actif") : "Mode vocal";
  document.getElementById("vx-relire").style.display = actif ? "block":"none";
}
function startVocal(){
  if(!SR){
    setStatut(location.protocol==="file:"
      ? "⚠️ Fichier ouvert en local (file://) : le micro est bloqué. Ouvrez la page via GitHub Pages (https) ou un petit serveur local."
      : "⚠️ Reconnaissance vocale indisponible — utilisez Chrome ou Edge.");
    return;
  }
  rec = rec || initRec();
  actif = true; dernieresOptions="";
  majUI(); setStatut("");
  poseQuestion();
}
function stopVocal(annonce=true){
  actif = false; stopEcoute(); speechSynthesis && speechSynthesis.cancel();
  qCourante && qCourante.classList.remove("vx-focus");
  qCourante = null; majUI();
  if(!annonce) return;
  setStatut("");
}

/* ---------- Démarrage ---------- */
function toastChargement(){
  const t=document.createElement("div");
  t.textContent="🎙️ Module vocal chargé ✓";
  t.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:300;background:#0f1e2e;color:#fff;padding:10px 18px;border-radius:999px;font-size:14px;box-shadow:0 4px 14px rgba(0,0,0,.3)";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),3000);
  console.log("[module-vocal] chargé — SR dispo:", !!SR, "| protocole:", location.protocol);
}
if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded", ()=>{injecteUI();toastChargement();});
} else { injecteUI(); toastChargement(); }

/* Réévalue la visibilité quand on ouvre un test (openTest change l'écran) */
document.addEventListener("click", ()=>setTimeout(majVisibilite, 300), true);

})();
