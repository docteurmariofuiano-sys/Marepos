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
    dernieresOptions="", voixFr=null, derniereConsigne="", relances=0, attenteReponse=false;

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
  "huitieme":7,"huit":7,"8":7,
  "neuvieme":8,"neuf":8,"9":8,
  "dixieme":9,"dix":9,"10":9};

/* ---------- TTS robuste ---------- */
function chargeVoix(){
  const vs = speechSynthesis.getVoices();
  /* préférence : voix fr-FR "naturelles" (Google/Microsoft/Amélie/Thomas), puis fr-FR, puis fr-* */
  voixFr = vs.find(v=>/fr[-_]FR/i.test(v.lang) && /google|microsoft|amelie|amélie|thomas|denise|audrey/i.test(v.name))
        || vs.find(v=>/fr[-_]FR/i.test(v.lang))
        || vs.find(v=>/^fr/i.test(v.lang)) || null;
  if(voixFr) console.log("[module-vocal] voix française :", voixFr.name, "("+voixFr.lang+")");
}
if("speechSynthesis" in window){
  chargeVoix();
  speechSynthesis.onvoiceschanged = chargeVoix;
  /* certains navigateurs ne peuplent les voix qu'après un premier appel */
  setTimeout(chargeVoix, 400); setTimeout(chargeVoix, 1500);
}

/* Correctif Chrome desktop : la synthèse s'arrête après ~15 s sans resume() périodique */
let ttsKeepAlive=null;
function startKeepAlive(){
  stopKeepAlive();
  ttsKeepAlive = setInterval(()=>{
    try{
      if(speechSynthesis.speaking){ speechSynthesis.pause(); speechSynthesis.resume(); }
      else stopKeepAlive();
    }catch(e){ stopKeepAlive(); }
  }, 8000);
}
function stopKeepAlive(){ if(ttsKeepAlive){ clearInterval(ttsKeepAlive); ttsKeepAlive=null; } }

/* Découpage en segments courts : Chrome tronque les longs textes (fin jamais signalée).
   On lit phrase par phrase (≤ ~170 caractères), la boucle ne peut plus mourir en route. */
function decoupe(texte){
  const t = String(texte).replace(/\s+/g," ").trim();
  const phrases = t.split(/(?<=[.!?;:])\s+/);
  const parts=[]; let cur="";
  for(const ph of phrases){
    if((cur+" "+ph).trim().length<=170){ cur=(cur+" "+ph).trim(); continue; }
    if(cur) parts.push(cur);
    if(ph.length<=170){ cur=ph; continue; }
    let seg="";
    for(const c of ph.split(/,\s*/)){
      const cand = seg? seg+", "+c : c;
      if(cand.length<=170) seg=cand; else { if(seg) parts.push(seg); seg=c; }
    }
    cur=seg;
  }
  if(cur) parts.push(cur);
  return parts.length?parts:[t];
}

let parleGen=0;
function dire(texte, fin){
  if(!("speechSynthesis" in window)){ if(fin) fin(); return; }
  const gen = ++parleGen;
  try{ speechSynthesis.cancel(); }catch(e){}
  stopKeepAlive();
  const chunks = decoupe(texte); let i=0;
  const suivant = ()=>{
    if(gen!==parleGen) return;                       /* une nouvelle lecture a pris la main */
    if(i>=chunks.length){ stopKeepAlive(); if(fin) fin(); return; }
    const txt = chunks[i++];
    setTimeout(()=>{
      if(gen!==parleGen) return;
      if(!voixFr) chargeVoix();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang="fr-FR"; u.rate=CFG.debit;
      try{ if(voixFr) u.voice = voixFr; }catch(e){}
      let fini=false, demarre=false, startGuard=null, durGuard=null;
      const next = ()=>{ if(fini) return; fini=true;
        clearTimeout(startGuard); clearTimeout(durGuard); suivant(); };
      u.onstart = ()=>{ demarre=true; };
      u.onend = next; u.onerror = next;
      /* la voix ne démarre jamais (autoplay bloqué, voix absente) → on continue sans bloquer */
      startGuard = setTimeout(()=>{ if(!demarre && !speechSynthesis.speaking){
        console.warn("[module-vocal] synthèse muette — on poursuit"); next(); } }, 3000);
      /* filet de durée par segment : jamais bloqué même si onend est perdu */
      durGuard = setTimeout(next, Math.max(7000, txt.length*120));
      startKeepAlive();
      try{ speechSynthesis.speak(u); }catch(e){ next(); }
    }, 90);
  };
  suivant();
}

/* ---------- STT ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function initRec(){
  const r = new SR();
  r.lang="fr-FR"; r.interimResults=false; r.maxAlternatives=3; r.continuous=false;
  r.onresult = e => {
    const t = e.results[0][0].transcript.trim();
    relances = 0; attenteReponse = false;
    setStatut("« "+t+" »");
    traite(t);
  };
  r.onend = ()=>{
    ecouteEnCours=false; majUI();
    /* l'écoute s'est terminée sans réponse ni erreur signalée → on relance
       automatiquement (cause n°1 des « ça s'arrête » constatés sur le terrain) */
    if(actif && attenteReponse){
      attenteReponse=false;
      if(relances < 2){
        relances++;
        dire(relances===1 ? "Je vous écoute." : "Dites votre réponse, ou touchez-la à l'écran.", ()=>ecoute());
      } else {
        setStatut("Je n'ai rien entendu — touchez le micro 🎙️ pour reprendre, ou répondez à l'écran.");
      }
    }
  };
  r.onerror = ev => {
    ecouteEnCours=false; attenteReponse=false; majUI();
    switch(ev.error){
      case "not-allowed":
      case "service-not-allowed":
        setStatut("🎙️ Micro non autorisé — cliquez sur l'icône 🔒/🎙️ dans la barre d'adresse, autorisez le micro, puis relancez le mode vocal.");
        stopVocal(false);
        break;
      case "audio-capture":
        setStatut("Aucun micro détecté sur cet appareil.");
        stopVocal(false);
        break;
      case "network":
        setStatut("Service de reconnaissance injoignable (connexion Internet requise). Réessayez, ou répondez à l'écran.");
        break;
      case "no-speech":
        if(actif && relances < 2){
          relances++;
          dire(relances===1 ? "Je vous écoute." : "Dites votre réponse, ou touchez-la à l'écran.", ()=>ecoute());
        } else {
          setStatut("Je n'ai rien entendu — touchez le micro 🎙️ pour reprendre, ou répondez à l'écran.");
        }
        break;
      case "aborted":
        break; /* arrêt volontaire : silencieux */
      default:
        setStatut("Je n'ai pas entendu — touchez le micro pour réessayer.");
    }
  };
  return r;
}
function ecoute(){ if(!rec||!actif) return; try{ rec.start(); ecouteEnCours=true; attenteReponse=true; }catch(e){} majUI(); }
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
  relances = 0;
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
  /* les réponses sont lues À CHAQUE question, numérotées : le patient peut dire
     le libellé (« jamais ») ou le numéro (« deux »). */
  const consigne = "Réponses possibles : " + opts.map((o,i)=>(i+1)+", "+o.label).join(". ") + ".";
  let phrase = texteQuestion(qCourante) + ". " + consigne;
  if(sig!==dernieresOptions){
    phrase += " Dites la réponse, ou son numéro.";
    dernieresOptions = sig;
  }
  derniereConsigne = texteQuestion(qCourante) + ". " + consigne;
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
    .vx-stop{position:fixed;right:16px;bottom:248px;z-index:60;display:none;
      background:#fff;border:1.5px solid #e3b9b9;border-radius:999px;
      padding:9px 14px;font:600 13px/1 inherit;color:#a33f3f;cursor:pointer}
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
  fab.onclick = ()=>{
    if(!actif){ startVocal(); return; }
    if(ecouteEnCours){ stopEcoute(); attenteReponse=false; setStatut("En pause — touchez le micro pour reprendre."); return; }
    /* reprise : on réécoute la question en cours (ou la suivante non répondue) */
    relances = 0; setStatut("");
    if(qCourante && !qCourante.querySelector(".opt.sel")) dire("Je vous écoute.", ()=>ecoute());
    else poseQuestion();
  };
  document.body.appendChild(fab);

  const st = document.createElement("div");
  st.className="vx-statut"; st.id="vx-statut";
  document.body.appendChild(st);

  const rl = document.createElement("button");
  rl.className="vx-relire"; rl.id="vx-relire"; rl.textContent="🔊 Relire + réponses";
  rl.onclick = ()=>{ stopEcoute(); attenteReponse=false; dire(derniereConsigne, ()=>ecoute()); };
  document.body.appendChild(rl);

  const stp = document.createElement("button");
  stp.className="vx-stop"; stp.id="vx-stop"; stp.textContent="✕ Quitter le mode vocal";
  stp.onclick = ()=> stopVocal();
  document.body.appendChild(stp);

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
  fab.querySelector("span").textContent = actif ? (ecouteEnCours?"J'écoute…":"Reprendre l'écoute") : "Mode vocal";
  document.getElementById("vx-relire").style.display = actif ? "block":"none";
  document.getElementById("vx-stop").style.display = actif ? "block":"none";
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
  actif = false; relances = 0; attenteReponse = false;
  stopEcoute(); parleGen++; speechSynthesis && speechSynthesis.cancel(); stopKeepAlive();
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
