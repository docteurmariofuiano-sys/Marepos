/* =====================================================================
   ASSISTANT MÉDICAL — moteur du portail
   Données embarquées (fonctionne hors-ligne, sans serveur ni fetch).
   ===================================================================== */
'use strict';

/* Domaines : libellé + couleur (var CSS) + fond clair */
const DOMAINES = {
  "Neurologie":   {c:"var(--d-neuro)",  cb:"#eef0ff"},
  "Dermatologie": {c:"var(--d-derm)",   cb:"#fff5e6"},
  "Cardiologie":  {c:"var(--d-cardio)", cb:"#feecec"},
  "ORL":          {c:"var(--d-orl)",    cb:"#e6faf6"},
  "Gynécologie":  {c:"var(--d-gyneco)", cb:"#fdecf5"},
  "Biologie":     {c:"var(--d-bio)",    cb:"#e7f5fe"},
  "Raisonnement": {c:"var(--d-rais)",   cb:"#f1ecfe"},
  "Prévention":   {c:"var(--d-prev)",   cb:"#e8f9ee"},
  "Prescription": {c:"var(--d-presc)",  cb:"#e2f5f3"},
  "Transversal":  {c:"var(--d-trans)",  cb:"#eef1f6"}
};

/* Catalogue des applications (chemins relatifs à la racine du portail) */
const APPS = [
  {t:"NEURO-GP ASSIST", e:"🧠", dom:"Neurologie",
   d:"Aide clinique neurologique : triage des urgences, examen guidé, céphalées, courriers et formation.",
   href:"neuro-gp/index.html"},
  {t:"Dermato Consult", e:"🔬", dom:"Dermatologie",
   d:"Aide au diagnostic dermatologique, avec paliers d'urgence (dont urgence vitale).",
   href:"suite-clinique/apps-externes/dermato.html"},
  {t:"ECG Cabinet", e:"🫀", dom:"Cardiologie",
   d:"Assistant local de lecture de l'ECG, repères et pièges (recommandations ESC).",
   href:"suite-clinique/apps-externes/ecg_assistant.html"},
  {t:"Bilan ORL — Vertiges", e:"👂", dom:"ORL",
   d:"Démarche devant un vertige : HINTS/INFARCT, central vs périphérique.",
   href:"suite-clinique/apps-externes/bilan_orl_vertiges.html"},
  {t:"GynoAide", e:"🩺", dom:"Gynécologie",
   d:"Gynécologie en médecine générale : femme en âge de procréer et ménopausée (sous-portail).",
   href:"suite-clinique/apps-externes/index-accueil.html"},
  {t:"Contraception", e:"🤰", dom:"Gynécologie",
   d:"Pilule, oubli, contraception d'urgence, relais, IVG, grossesse & allaitement.",
   href:"suite-clinique/apps-externes/contraception.html"},
  {t:"Ménopause", e:"🌸", dom:"Gynécologie",
   d:"Péri/ménopause, score de symptômes, décision THM, SGUM, os, cardio-métabolique.",
   href:"suite-clinique/apps-externes/menopause.html"},
  {t:"Fiches d'interrogatoire", e:"📋", dom:"Raisonnement",
   d:"64 fiches : du symptôme au diagnostic — interrogatoire ciblé, différentiels, red flags.",
   href:"suite-clinique/index.html"},
  {t:"Aide au raisonnement clinique", e:"🧭", dom:"Raisonnement",
   d:"Préparation de consultation et raisonnement clinique structuré.",
   href:"suite-clinique/aide-decision/index.html"},
  {t:"Catalogue des motifs", e:"🗂️", dom:"Raisonnement",
   d:"Catalogue des motifs de consultation, point d'entrée du raisonnement.",
   href:"suite-clinique/aide-decision/catalogue.html"},
  {t:"Procédures & prévention", e:"✅", dom:"Prévention",
   d:"Aide-mémoire des procédures et de la prévention au cabinet.",
   href:"suite-clinique/aide-decision/procedures.html"},
  {t:"Interprétation biologique", e:"🧪", dom:"Biologie",
   d:"Aide au raisonnement devant un bilan biologique.",
   href:"suite-clinique/aide-decision/biologie.html"},
  {t:"Lecture de bilan biologique", e:"🩸", dom:"Biologie",
   d:"Lecture intelligente d'un bilan (troponine, calcémie corrigée, seuils…).",
   href:"bilan-biologique/index.html"},
  {t:"Suivi préventif CNAM", e:"🛡️", dom:"Prévention",
   d:"Suivi préventif au cabinet selon les référentiels CNAM.",
   href:"suite-clinique/apps-externes/suivi_preventif.html"},
  {t:"MAGISTRA — Préparations magistrales", e:"⚗️", dom:"Prescription",
   d:"Aide à la prescription de préparations magistrales : base de formules sourcée, consultation rapide, alertes de sécurité, générateur d'ordonnance, calculateurs (%, qsp).",
   href:"magistrales/index.html"},
  {t:"Échelles & évaluations", e:"📊", dom:"Transversal",
   d:"MoCA, CHA₂DS₂-VASc, AUDIT, RMQD, iatrogénie… échelles cliniques.",
   href:"suite-clinique/apps-externes/evaluations_medicales.html"},
  /* ---- à venir (non encore fournies / volontairement exclues) ---- */
  {t:"Cotation NGAP/CCAM", e:"💶", dom:"Transversal", soon:true,
   d:"Cotation des actes — nécessite une base tarifaire Ameli sourcée et datée + disclaimer avant diffusion."},
  {t:"Pneumologie / Spirométrie", e:"🫁", dom:"Transversal", soon:true,
   d:"Lecture de spirométrie / aide pneumologique — application à fournir."}
];

/* ---------- utilitaires ---------- */
const $ = (s,c=document)=>c.querySelector(s);
const norm = t => String(t||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();

let etat = {q:"", dom:"Toutes"};

function carte(app){
  const dm = DOMAINES[app.dom] || DOMAINES["Transversal"];
  const styleVars = `--c:${dm.c};--cb:${dm.cb}`;
  if(app.soon){
    return `<div class="card soon" style="${styleVars}" aria-disabled="true">
      <span class="badge-soon">Bientôt</span>
      <div class="card-top">
        <div class="card-icon">${app.e}</div>
        <div><h3>${app.t}</h3></div>
      </div>
      <p>${app.d}</p>
      <div class="card-foot"><span class="tag">${app.dom}</span><span class="go">À venir</span></div>
    </div>`;
  }
  return `<a class="card" style="${styleVars}" href="${app.href}" aria-label="Ouvrir ${app.t}">
    <div class="card-top">
      <div class="card-icon">${app.e}</div>
      <div><h3>${app.t}</h3></div>
    </div>
    <p>${app.d}</p>
    <div class="card-foot"><span class="tag">${app.dom}</span><span class="go">Ouvrir →</span></div>
  </a>`;
}

function correspond(app){
  if(etat.dom!=="Toutes" && app.dom!==etat.dom) return false;
  if(!etat.q) return true;
  return norm([app.t,app.dom,app.d].join(" ")).includes(norm(etat.q));
}

function rendre(){
  const dispo = APPS.filter(a=>!a.soon).filter(correspond);
  const soon  = APPS.filter(a=>a.soon).filter(correspond);

  const g = $("#grid");
  if(!dispo.length && !soon.length){
    g.innerHTML = `<div class="empty"><strong>Aucune application ne correspond.</strong><br>Essayez un autre mot-clé ou un autre domaine.</div>`;
  }else{
    g.innerHTML = dispo.map(carte).join("");
  }
  $("#count").textContent = `${dispo.length} application${dispo.length>1?"s":""}`;

  const sg = $("#grid-soon");
  const sec = $("#section-soon");
  if(soon.length){ sec.style.display=""; sg.innerHTML = soon.map(carte).join(""); }
  else{ sec.style.display="none"; }
}

function initFiltres(){
  const doms = ["Toutes", ...Object.keys(DOMAINES).filter(d=>APPS.some(a=>a.dom===d))];
  const f = $("#filters");
  f.innerHTML = doms.map(d=>{
    const dm = DOMAINES[d];
    const dot = dm ? `<span class="dot" style="--c:${dm.c}"></span>` : "";
    return `<button class="chip${d==="Toutes"?" active":""}" data-dom="${d}">${dot}${d}</button>`;
  }).join("");
  f.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{
    f.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    etat.dom = b.dataset.dom;
    rendre();
  }));
}

document.addEventListener("DOMContentLoaded",()=>{
  $("#total").textContent = APPS.filter(a=>!a.soon).length;
  initFiltres();
  $("#search").addEventListener("input",e=>{ etat.q = e.target.value; rendre(); });
  rendre();
});
