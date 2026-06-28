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
  "Rhumatologie": {c:"var(--d-rhumato)",cb:"#f7ead9"},
  "Pneumologie":  {c:"var(--d-pneumo)", cb:"#e0f5fa"},
  "Médecine de la douleur": {c:"var(--d-douleur)", cb:"#fbeafe"},
  "Endocrinologie": {c:"var(--d-endoc)", cb:"#eef7da"},
  "Gériatrie":     {c:"var(--d-geriatrie)", cb:"#dcf1ed"},
  "Prévention":   {c:"var(--d-prev)",   cb:"#e8f9ee"},
  "Transversal":  {c:"var(--d-trans)",  cb:"#eef1f6"}
};

/* Catalogue des applications (chemins relatifs à la racine du portail) */
const APPS = [
  {t:"NEURO-GP ASSIST", e:"🧠", dom:"Neurologie",
   d:"Aide clinique neurologique : triage des urgences, examen guidé, céphalées, courriers et formation.",
   href:"neuro-gp/index.html"},
  {t:"Dermato MG", e:"🩺", dom:"Dermatologie",
   d:"Assistant dermatologique de consultation : recherche, symptôme/localisation, fiches, red flags, ordonnances, conseils patients, aide visuelle (lésions + dermatoscopie), apprentissage. Source : Dermatoclic.",
   href:"dermato-mg/index.html"},
  {t:"Dermato Consult", e:"🔬", dom:"Dermatologie",
   d:"Aide au diagnostic dermatologique, avec paliers d'urgence (dont urgence vitale).",
   href:"suite-clinique/apps-externes/dermato.html"},
  {t:"ECG Assistant", e:"🫀", dom:"Cardiologie",
   d:"Assistant local de lecture de l'ECG, repères et pièges (recommandations ESC).",
   href:"suite-clinique/apps-externes/ecg_assistant.html"},
  {t:"HTA-MG Assistant", e:"🩸", dom:"Cardiologie",
   d:"Choix et associations des antihypertenseurs en médecine générale : stratégies thérapeutiques, paliers et situations particulières.",
   href:"hta-mg/index.html"},
  {t:"LipidMG", e:"🧈", dom:"Cardiologie",
   d:"Choix pratique des hypolipémiants en médecine générale : statines et alternatives, intensité, objectifs LDL selon le risque cardiovasculaire.",
   href:"lipid-mg/index.html"},
  {t:"Bilan ORL — Vertiges", e:"👂", dom:"ORL",
   d:"Démarche devant un vertige : HINTS/INFARCT, central vs périphérique.",
   href:"suite-clinique/apps-externes/bilan_orl_vertiges.html"},
  {t:"Otoscopie MG", e:"👂", dom:"ORL",
   d:"Aide visuelle à la décision en otoscopie : reconnaissance des tympans (OMA, OME, otite externe, bouchon…), red flags et conduite à tenir en médecine générale.",
   href:"otoscopie-mg/index.html"},
  {t:"GynoAide", e:"🩺", dom:"Gynécologie",
   d:"Gynécologie en médecine générale (application principale) : femme en âge de procréer (contraception, oubli, urgence, IVG, grossesse) et femme ménopausée (THM, SGUM, os, cardio).",
   href:"suite-clinique/apps-externes/index-accueil.html"},
  {t:"Médoc Grossesse & Allaitement", e:"💊", dom:"Gynécologie",
   d:"Aide à la prescription pendant la grossesse et l'allaitement : recherche de médicaments, niveaux de risque et alternatives (à confronter au CRAT).",
   href:"medoc-grossesse-allaitement/index.html"},
  {t:"ContraceptioMG", e:"💠", dom:"Gynécologie",
   d:"Choix rapide de contraception : aide à la décision selon profil et contre-indications, contraception d'urgence et conseils de prescription.",
   href:"contraception-mg/index.html"},
  {t:"Prenatal MG", e:"🤰", dom:"Gynécologie",
   d:"Consultation préconceptionnelle et entretien prénatal précoce (EPP/EPG) : points de vigilance, synthèse 10/45 min, document imprimable.",
   href:"prenatal-mg/index.html"},
  {t:"Calendrier grossesse", e:"📅", dom:"Gynécologie",
   d:"Calendrier de suivi de grossesse : calcul du terme, échographies, examens biologiques et démarches administratives selon l'âge gestationnel.",
   href:"grossesse-calendrier-mg/index.html"},
  {t:"Atlas épaule MG", e:"🦴", dom:"Rhumatologie",
   d:"Atlas clinique de l'épaule pour le médecin généraliste : repères anatomiques, manœuvres d'examen, diagnostics fréquents et conduite à tenir (aide visuelle intégrée).",
   href:"atlas-epaule/index.html"},
  {t:"Atlas main · poignet · coude", e:"🖐️", dom:"Rhumatologie",
   d:"Atlas clinique interactif main, poignet et coude : repères anatomiques, manœuvres d'examen, diagnostics fréquents et conduite à tenir en médecine générale.",
   href:"atlas-main-poignet-coude/index.html"},
  {t:"Hanche MG", e:"🦵", dom:"Rhumatologie",
   d:"Aide clinique de la hanche pour le médecin généraliste : repères, manœuvres d'examen, diagnostics fréquents et conduite à tenir (aide visuelle intégrée).",
   href:"hanche-mg/index.html"},
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
   d:"Import d'un bilan en PDF + lecture intelligente (troponine, calcémie corrigée, seuils…).",
   href:"suite-clinique/apps-externes/biologie_lecture_bilan.html"},
  {t:"Suivi préventif CNAM", e:"🛡️", dom:"Prévention",
   d:"Suivi préventif au cabinet selon les référentiels CNAM.",
   href:"suite-clinique/apps-externes/suivi_preventif.html"},
  {t:"Échelles & évaluations", e:"📊", dom:"Transversal",
   d:"MoCA, CHA₂DS₂-VASc, AUDIT, RMQD, iatrogénie… échelles cliniques.",
   href:"suite-clinique/apps-externes/evaluations_medicales.html"},
  {t:"Vaccins MG", e:"💉", dom:"Transversal",
   d:"Calendrier vaccinal et rattrapage : aide à la mise à jour des vaccinations et recommandations voyage.",
   href:"vaccins-mg/index.html"},
  {t:"OrdoMatériel MG", e:"🦽", dom:"Transversal",
   d:"Rédaction d'ordonnances de matériel médical (LPP) : recherche, fiches, sources datées et alertes de prescription.",
   href:"ordo-materiel-mg/index.html"},
  {t:"PAI autonome", e:"🏫", dom:"Transversal",
   d:"Projet d'Accueil Individualisé : remplissage du modèle officiel Éducation nationale (Eduscol) par pathologie (asthme, diabète, épilepsie, allergie…), export PDF.",
   href:"pai/index.html"},
  {t:"MDPH assist", e:"📝", dom:"Transversal",
   d:"Certificat médical MDPH : remplissage assisté du Cerfa 15695*01 officiel par pathologie, cases cochées automatiquement, export PDF.",
   href:"mdph/index.html"},
  {t:"Cotation MG", e:"💶", dom:"Transversal",
   d:"CotaMG Pro : aide à la cotation des actes en médecine générale (NGAP & CCAM), recherche et combinaisons d'actes.",
   href:"cotation-mg/index.html"},
  {t:"ALD renouvellement express", e:"🔄", dom:"Transversal",
   d:"ALD Express : texte de renouvellement HAS-conforme en 1 clic (liste ALD 30), copie automatique, ordonnance bizone.",
   href:"ald-express/index.html"},
  {t:"Certificats médicaux", e:"📜", dom:"Transversal",
   d:"CERTIMED : rédaction de certificats médicaux et aide à la couverture médico-légale au cabinet.",
   href:"certificats/index.html"},
  {t:"Préparations magistrales", e:"⚗️", dom:"Dermatologie",
   d:"MAGISTRA : aide à la prescription de préparations magistrales (formules, dosages, libellés d'ordonnance).",
   href:"magistrales/index.html"},
  {t:"Pneumo MG", e:"🫁", dom:"Pneumologie",
   d:"Aide consultation respiratoire : BPCO, asthme, SAOS, oxygène/aérosols, scores (CAT, mMRC, STOP-Bang, Epworth, CRB-65, Wells), ordonnances et courriers.",
   href:"pneumo/index.html"},
  {t:"Spiro MG", e:"🌬️", dom:"Pneumologie",
   d:"Interprétation de la spirométrie (EFR) : qualité de l'examen, VEMS/CVF, obstruction/restriction, réversibilité, import PDF et compte rendu prêt à copier.",
   href:"pneumo/spiro.html"},
  {t:"Douleur MG", e:"🩹", dom:"Médecine de la douleur",
   d:"Aide au choix antalgique en médecine générale : paliers OMS, douleurs nociceptives/neuropathiques, équivalences opioïdes, précautions et situations particulières.",
   href:"douleur-mg/index.html"},
  {t:"Diabète MG", e:"🩸", dom:"Endocrinologie",
   d:"Aide rapide à la décision dans le diabète en médecine générale : objectifs glycémiques, choix et associations d'antidiabétiques, situations particulières et surveillance.",
   href:"diabete-mg/index.html"},
  {t:"Thyroïde MG", e:"🦋", dom:"Endocrinologie",
   d:"Aide rapide à la décision devant une anomalie thyroïdienne : hypo/hyperthyroïdie, TSH, nodule, conduite à tenir, traitement et suivi (import PDF de bilan).",
   href:"thyroide-mg/index.html"},
  {t:"MémoMG", e:"🧓", dom:"Gériatrie",
   d:"Bilan mémoire pratique en médecine générale : scores cognitifs simples, synthèse prudente et documents médicaux copiables/imprimables.",
   href:"memo-mg/index.html"}
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
