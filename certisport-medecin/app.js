/* =====================================================================
   CertiSport Médecin — interface (dépend de data.js et moteur.js)
   Toutes les données restent en mémoire (aucun stockage, aucun envoi).
   ===================================================================== */
'use strict';

/* ------------------------------ état ------------------------------ */
const etat = {
  praticien: { nom:"", rpps:"", adresse:"", ville:"" },
  patient: { nom:"", prenom:"", ddn:"", sexe:"", taille:"", poids:"", profession:"",
    coordonnees:"", representant:"", dateConsult: new Date().toISOString().slice(0,10),
    age:null, imc:null },
  sport: { sportId:"", disciplinePrecise:"", federation:"", club:"", licencie:false,
    premiereLicence:"premiere", competition:false, niveau:"", frequence:"", duree:"",
    intensite:"", reprise:false, debutant:false, objectifs:"", environnement:"",
    dateCompetition:"", documentClub:"", dateDernierCertificat:"",
    questionnaireSantePositif:"inconnu", exigenceFederaleConnue:"inconnu",
    exigenceClub:"inconnu", koAutorise:"inconnu", tousSports:false },
  reponses: {}, commentaires: {},
  moduleReponses: {},
  examen: {},
  alertesTraitees: {},
  examensComp: [],
  decision: { conclusionId:"", restrictions:"", duree:"", dateReeval:"", justification:"",
    information:"", confirme:false, texteLibre:"", destinataire:"", motifOrientation:"", elementsCourrier:"" },
  certificatModele: "standard"
};

let etapeActive = 0;
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const esc = t => String(t ?? "").replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));

const ETAPES = [
  { n:"Accueil", ic:"🏠" }, { n:"Patient", ic:"🧑" }, { n:"Sport", ic:"⚽" },
  { n:"Cadre réglementaire", ic:"⚖️" }, { n:"Questionnaire", ic:"📋" },
  { n:"Module sport", ic:"🎯" }, { n:"Examen clinique", ic:"🩺" },
  { n:"Alertes", ic:"🚦" }, { n:"Examens compl.", ic:"🧪" },
  { n:"Synthèse", ic:"🧭" }, { n:"Décision", ic:"✅" },
  { n:"Certificat", ic:"📜" }, { n:"Note dossier", ic:"🗂️" },
  { n:"Base réglementaire", ic:"📚" }
];

/* ---------------------- calculs transverses ---------------------- */
function recalculer() {
  etat.patient.age = CSM.calcAge(etat.patient.ddn, etat.patient.dateConsult);
  etat.patient.imc = CSM.calcIMC(etat.patient.poids, etat.patient.taille);
}
function cadreCourant() {
  recalculer();
  return CSM.evaluerCadre({
    age: etat.patient.age, sportId: etat.sport.sportId,
    competition: etat.sport.competition, licencie: etat.sport.licencie,
    premiereLicence: etat.sport.premiereLicence === "premiere",
    questionnaireSantePositif: etat.sport.questionnaireSantePositif,
    exigenceFederaleConnue: etat.sport.exigenceFederaleConnue,
    exigenceClub: etat.sport.exigenceClub, koAutorise: etat.sport.koAutorise,
    tousSports: etat.sport.tousSports,
    dateDernierCertificat: etat.sport.dateDernierCertificat
  });
}
function alertesCourantes() { return CSM.evaluerAlertes(etat); }
function syntheseCourante(alertes) { return CSM.classifier(alertes || alertesCourantes()); }

/* --------------------------- navigation --------------------------- */
function afficherEtape(n) {
  etapeActive = n;
  $$(".panel").forEach(p => p.classList.remove("active"));
  $("#panel-" + n).classList.add("active");
  RENDUS[n]();
  majStepper();
  majBandeauUrgence();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function majStepper() {
  const synth = syntheseCourante();
  $("#stepper").innerHTML = ETAPES.map((e, i) => {
    const cls = ["step"];
    if (i === etapeActive) cls.push("active");
    if (i === 7 && synth.bloquantes.length) cls.push("alerte");
    return `<button class="${cls.join(" ")}" data-etape="${i}"><span class="n">${i}</span>${e.ic} ${e.n}</button>`;
  }).join("");
  $$("#stepper .step").forEach(b => b.addEventListener("click", () => afficherEtape(Number(b.dataset.etape))));
}
function majBandeauUrgence() {
  const synth = syntheseCourante();
  const b = $("#bandeau-urgence");
  if (synth.urgence) {
    $("#bandeau-urgence-texte").textContent = CS_AVERTISSEMENTS.urgence +
      " (" + synth.urgences.map(u => u.donnee).join(" ; ") + ")";
    b.style.display = "";
  } else b.style.display = "none";
}
function navBoutons(prec, suiv, labelSuiv) {
  return `<div class="nav-etapes">
    ${prec !== null ? `<button class="btn secondaire" data-nav="${prec}">← ${ETAPES[prec].n}</button>` : "<span></span>"}
    ${suiv !== null ? `<button class="btn" data-nav="${suiv}">${labelSuiv || "Continuer : " + ETAPES[suiv].n} →</button>` : ""}
  </div>`;
}
function brancherNav(panel) {
  $$("[data-nav]", panel).forEach(b => b.addEventListener("click", () => afficherEtape(Number(b.dataset.nav))));
}

/* helpers formulaires : liaison état <-> champs via data-bind="objet.champ" */
function lier(panel) {
  $$("[data-bind]", panel).forEach(el => {
    const [obj, champ] = el.dataset.bind.split(".");
    const cible = etat[obj];
    if (el.type === "checkbox") el.checked = !!cible[champ];
    else el.value = cible[champ] ?? "";
    el.addEventListener("input", () => {
      cible[champ] = el.type === "checkbox" ? el.checked : el.value;
      recalculer();
      if (el.dataset.rafraichir !== undefined) RENDUS[etapeActive]();
    });
    el.addEventListener("change", () => {
      cible[champ] = el.type === "checkbox" ? el.checked : el.value;
      recalculer();
      if (el.dataset.rafraichir !== undefined) RENDUS[etapeActive]();
    });
  });
}

/* =====================================================================
   RENDUS PAR ÉTAPE
===================================================================== */
const RENDUS = {};

/* ---------- 0. Tableau de bord ---------- */
RENDUS[0] = function () {
  $("#panel-0").innerHTML = `
    <h2>Tableau de bord</h2>
    <p class="sous-titre">Session locale : rien n'est stocké ni transmis. Les compteurs reflètent la consultation en cours.</p>
    <div class="dash">
      <div class="dash-card" data-nav="1"><div class="ic">🆕</div><h3>Nouveau certificat</h3><p>Démarrer le parcours de consultation en 12 étapes.</p></div>
      <div class="dash-card" data-nav="7"><div class="ic">🚦</div><h3>Alertes de la consultation</h3><p>${syntheseCourante().bloquantes.length} alerte(s) bloquante(s) à évaluer.</p></div>
      <div class="dash-card" data-nav="10"><div class="ic">⏳</div><h3>Décision différée / réévaluation</h3><p>Programmer une réévaluation lorsque l'aptitude est différée ou temporairement refusée.</p></div>
      <div class="dash-card" data-nav="13"><div class="ic">📚</div><h3>Base réglementaire</h3><p>${CS_REGLES.length} règles versionnées — ${CS_REGLES.filter(r=>r.statut==="a-verifier").length} « à vérifier ».</p></div>
      <div class="dash-card" data-nav="2"><div class="ic">🔎</div><h3>Fiches sports</h3><p>${CS_SPORTS.length} disciplines référencées (recherche par synonymes).</p></div>
      <div class="dash-card" onclick="window.location='tests.html'"><div class="ic">🧾</div><h3>Scénarios de validation</h3><p>10 cas de test médico-réglementaires exécutables.</p></div>
    </div>
    <div class="carte" style="margin-top:16px">
      <h3>👨‍⚕️ Identité du médecin (reportée sur les documents)</h3>
      <div class="grille">
        <div class="field"><label>Nom du médecin</label><input data-bind="praticien.nom" placeholder="Dr Nom Prénom"></div>
        <div class="field"><label>N° RPPS</label><input data-bind="praticien.rpps"></div>
        <div class="field"><label>Coordonnées professionnelles</label><input data-bind="praticien.adresse" placeholder="Adresse, téléphone"></div>
        <div class="field"><label>Ville (lieu de rédaction)</label><input data-bind="praticien.ville"></div>
      </div>
    </div>
    ${navBoutons(null, 1, "Commencer la consultation")}`;
  lier($("#panel-0")); brancherNav($("#panel-0"));
  $$("#panel-0 .dash-card[data-nav]").forEach(c => c.addEventListener("click", () => afficherEtape(Number(c.dataset.nav))));
};

/* ---------- 1. Patient ---------- */
RENDUS[1] = function () {
  recalculer();
  const p = etat.patient;
  $("#panel-1").innerHTML = `
    <h2>Étape 1 — Identité et contexte</h2>
    <p class="sous-titre">Les données restent locales. Seuls les éléments strictement nécessaires figureront sur le certificat.</p>
    <div class="carte">
      <div class="grille">
        <div class="field"><label>Nom</label><input data-bind="patient.nom"></div>
        <div class="field"><label>Prénom</label><input data-bind="patient.prenom"></div>
        <div class="field"><label>Date de naissance</label><input type="date" data-bind="patient.ddn" data-rafraichir></div>
        <div class="field"><label>Sexe (utile au raisonnement clinique)</label>
          <select data-bind="patient.sexe"><option value="">—</option><option value="F">Féminin</option><option value="M">Masculin</option><option value="X">Autre / non précisé</option></select></div>
        <div class="field"><label>Taille (cm)</label><input type="number" data-bind="patient.taille" data-rafraichir></div>
        <div class="field"><label>Poids (kg)</label><input type="number" data-bind="patient.poids" data-rafraichir></div>
        <div class="field"><label>Profession</label><input data-bind="patient.profession"></div>
        <div class="field"><label>Coordonnées (facultatif)</label><input data-bind="patient.coordonnees"></div>
        <div class="field"><label>Représentant légal (mineur)</label><input data-bind="patient.representant"></div>
        <div class="field"><label>Date de la consultation</label><input type="date" data-bind="patient.dateConsult" data-rafraichir></div>
      </div>
      <div class="calc" style="margin-top:12px">
        <span>Âge : <strong>${p.age ?? "—"}</strong>${p.age !== null ? " ans" : ""}</span>
        <span>Catégorie : <strong>${p.age === null ? "—" : p.age < 18 ? "MINEUR" : "majeur"}</strong></span>
        <span>IMC : <strong>${p.imc ?? "—"}</strong>${p.imc ? " kg/m²" : ""}</span>
      </div>
      ${p.age !== null && p.age < 18 && !p.representant ? `<p class="muted" style="margin-top:8px">⚠️ Patient mineur : renseigner le représentant légal.</p>` : ""}
    </div>
    ${navBoutons(0, 2)}`;
  lier($("#panel-1")); brancherNav($("#panel-1"));
};

/* ---------- 2. Sport ---------- */
RENDUS[2] = function () {
  const s = etat.sport;
  const sport = CSM.sportById(s.sportId);
  $("#panel-2").innerHTML = `
    <h2>Étape 2 — Demande sportive</h2>
    <p class="sous-titre">Le certificat doit porter sur une discipline identifiée : la formulation « tous les sports » est refusée.</p>
    <div class="carte">
      <h3>🔎 Discipline</h3>
      <div class="field"><label>Rechercher un sport (nom, synonyme : « scuba », « MMA », « jet-ski »…)</label>
        <input id="recherche-sport" placeholder="Ex. : plongée bouteille, boxe, moto-cross…" autocomplete="off"></div>
      <div id="resultats-sport" style="margin-top:8px"></div>
      ${sport ? `<div class="sport-resume">
        <div><strong>${esc(sport.nom)}</strong> <span class="tag">${esc(sport.fed)}</span>
          ${sport.cp === true ? '<span class="badge-niveau n4">Contraintes particulières</span>' :
            sport.cp === "conditionnel" ? '<span class="badge-niveau n2">Contraintes particulières selon modalités</span>' :
            sport.cp === "exclu" ? '<span class="badge-niveau n1">Exclu de la liste (règlement propre possible)</span>' :
            sport.ancienListe ? '<span class="badge-niveau n1">Retiré de l’ancienne liste</span>' : ""}</div>
        <div>Intensité : ${esc(sport.intensite)} · Profil : ${esc(sport.statDyn)} · Environnement : ${esc((sport.env||[]).join(", ") || "—")}</div>
        <div>Risques propres : ${esc((sport.risques||[]).join(" ; ") || "—")}</div>
        ${sport.notes ? `<div class="muted">${esc(sport.notes)}</div>` : ""}
        ${sport.condCP ? `<div class="muted">⚖️ ${esc(sport.condCP)}</div>` : ""}
        <div class="muted">Fiche vérifiée le : ${esc(sport.dateVerif || "non vérifiée")}</div>
      </div>` : ""}
      <div class="grille" style="margin-top:12px">
        <div class="field"><label>Discipline exacte (libellé du certificat)</label><input data-bind="sport.disciplinePrecise" placeholder="Ex. : plongée en scaphandre en milieu naturel"></div>
        <div class="field"><label>Fédération</label><input data-bind="sport.federation" placeholder="${esc(sport ? sport.fed : "")}"></div>
        <div class="field"><label>Club / structure</label><input data-bind="sport.club"></div>
      </div>
      <label class="q-item" style="border:none;margin-top:6px"><input type="checkbox" data-bind="sport.tousSports" data-rafraichir> <span class="lib">Le patient demande un certificat « pour tous les sports »</span></label>
      ${s.tousSports ? `<div class="bandeau-card bandeau-alerte" style="margin-top:6px">Cette formulation est refusée : demander une discipline (ou une liste précise) — l'absence de contre-indication s'apprécie par rapport aux contraintes d'une pratique identifiée.</div>` : ""}
    </div>
    <div class="carte">
      <h3>🎯 Modalités de pratique</h3>
      <div class="grille">
        <div class="field"><label>Licence fédérale</label>
          <select data-bind="sport.licencie" data-rafraichir id="sel-licencie">
            <option value="">Non licencié</option><option value="oui">Licencié / demande de licence</option></select></div>
        <div class="field"><label>Première licence ou renouvellement</label>
          <select data-bind="sport.premiereLicence"><option value="premiere">Première licence</option><option value="renouvellement">Renouvellement</option></select></div>
        <div class="field"><label>Compétition</label>
          <select id="sel-competition" data-rafraichir><option value="">Loisir</option><option value="oui">Compétition</option></select></div>
        <div class="field"><label>Niveau de compétition</label><input data-bind="sport.niveau" placeholder="départemental, régional, national…"></div>
        <div class="field"><label>Fréquence hebdomadaire</label><input data-bind="sport.frequence" placeholder="ex. 3 séances/semaine"></div>
        <div class="field"><label>Durée des séances</label><input data-bind="sport.duree"></div>
        <div class="field"><label>Intensité</label><select data-bind="sport.intensite"><option value="">—</option><option>légère</option><option>modérée</option><option>intense</option><option>très intense</option></select></div>
        <div class="field"><label>Objectifs</label><input data-bind="sport.objectifs"></div>
        <div class="field"><label>Environnement particulier</label><input data-bind="sport.environnement" placeholder="eau, altitude, souterrain, chaleur, froid, isolement"></div>
        <div class="field"><label>Date de la compétition / inscription</label><input type="date" data-bind="sport.dateCompetition"></div>
        <div class="field"><label>Date du précédent certificat</label><input type="date" data-bind="sport.dateDernierCertificat"></div>
        <div class="field"><label>Document fourni par le club</label><input data-bind="sport.documentClub" placeholder="formulaire, demande spécifique…"></div>
      </div>
      <div class="grille" style="margin-top:10px">
        <label class="q-item" style="border:none"><input type="checkbox" data-bind="sport.reprise"> <span class="lib">Reprise après arrêt prolongé</span></label>
        <label class="q-item" style="border:none"><input type="checkbox" data-bind="sport.debutant"> <span class="lib">Débutant dans la discipline</span></label>
      </div>
      ${sport && sport.catCP === "combat_ko" ? `<div class="field" style="margin-top:10px;max-width:420px">
        <label>La mise hors combat (KO) est-elle autorisée par le règlement applicable ?</label>
        <select data-bind="sport.koAutorise" data-rafraichir><option value="inconnu">Je ne sais pas — à vérifier</option><option value="oui">Oui</option><option value="non">Non (assaut / touche)</option></select></div>` : ""}
    </div>
    ${navBoutons(1, 3)}`;
  lier($("#panel-2")); brancherNav($("#panel-2"));

  /* selects booléens particuliers */
  const selLic = $("#sel-licencie"); selLic.value = s.licencie ? "oui" : "";
  selLic.addEventListener("change", () => { s.licencie = selLic.value === "oui"; });
  const selComp = $("#sel-competition"); selComp.value = s.competition ? "oui" : "";
  selComp.addEventListener("change", () => { s.competition = selComp.value === "oui"; RENDUS[2](); });

  /* recherche sports */
  const inp = $("#recherche-sport"), res = $("#resultats-sport");
  const rendreResultats = q => {
    const liste = CSM.rechercherSports(q).slice(0, 12);
    res.innerHTML = liste.map(x =>
      `<button class="q-opt${x.id === s.sportId ? " sel-non" : ""}" data-sport="${x.id}" style="margin:2px">${esc(x.nom)}</button>`).join(" ") || '<span class="muted">Aucun résultat.</span>';
    $$("[data-sport]", res).forEach(b => b.addEventListener("click", () => {
      s.sportId = b.dataset.sport;
      const sp = CSM.sportById(s.sportId);
      if (sp && !s.disciplinePrecise) s.disciplinePrecise = sp.nom;
      if (sp && !s.federation) s.federation = sp.fed;
      RENDUS[2]();
    }));
  };
  inp.addEventListener("input", () => rendreResultats(inp.value));
  rendreResultats("");
};

/* ---------- 3. Cadre réglementaire ---------- */
RENDUS[3] = function () {
  const cadre = cadreCourant();
  const s = etat.sport;
  const clsRes = cadre.code === "OBLIGATOIRE_LOI" ? "warn" : cadre.code === "INDETERMINE" ? "neutre" :
    cadre.code === "NON_SYSTEMATIQUE" || cadre.code === "QUESTIONNAIRE_SUFFIT" ? "ok" : "warn";
  $("#panel-3").innerHTML = `
    <h2>Étape 3 — Le certificat est-il nécessaire ?</h2>
    <p class="sous-titre">Raisonnement fondé sur l'âge, la discipline, la licence, la compétition et les questionnaires de santé.</p>
    <div class="carte">
      <h3>❓ Éléments complémentaires du raisonnement</h3>
      <div class="grille">
        ${etat.patient.age !== null && etat.patient.age < 18 ? `<div class="field">
          <label>Questionnaire de santé du mineur : une réponse positive ?</label>
          <select data-bind="sport.questionnaireSantePositif" data-rafraichir>
            <option value="inconnu">Non renseigné</option><option value="non">Non (toutes négatives)</option><option value="oui">Oui (au moins une)</option></select></div>` : ""}
        <div class="field"><label>La fédération exige-t-elle un certificat (règlement fédéral fourni) ?</label>
          <select data-bind="sport.exigenceFederaleConnue" data-rafraichir>
            <option value="inconnu">Je ne sais pas</option><option value="oui">Oui</option><option value="non">Non</option></select></div>
        <div class="field"><label>Le club / l'organisateur exige-t-il un certificat ?</label>
          <select data-bind="sport.exigenceClub" data-rafraichir>
            <option value="inconnu">Je ne sais pas</option><option value="oui">Oui</option><option value="non">Non</option></select></div>
      </div>
    </div>
    <div class="cadre-resultat ${clsRes}">
      <h3>${esc(cadre.libelle)}</h3>
      <div class="muted">Niveau de certitude : <strong>${esc(cadre.certitude)}</strong>
        ${cadre.validiteMax ? " · Validité maximale : <strong>" + esc(cadre.validiteMax) + "</strong>" : ""}
        ${cadre.examenSpecifique ? " · Examen médical spécifique requis (arrêté du 24/07/2017 — version à vérifier)" : ""}</div>
    </div>
    <div class="justif">
      <h4>Pourquoi cette conclusion ?</h4>
      ${cadre.justifications.map(j => j.regle ? `<div class="src">
          <strong>${esc(j.regle.texte)}</strong> — ${esc(j.regle.article)}
          <span class="statut-regle ${esc(j.regle.statut)}">${esc(j.regle.statut)}</span><br>
          <span>${esc(j.motif)}</span><br>
          <span class="meta">Entrée en vigueur : ${esc(j.regle.date || "—")} · Dernière vérification : ${esc(j.regle.verification || "—")} ·
            <a href="${esc(j.regle.url)}" target="_blank" rel="noopener">source officielle ↗</a></span>
          ${j.regle.niveau_validation ? `<br><span class="meta">Validation : ${esc(j.regle.niveau_validation)}</span>` : ""}
        </div>` : "").join("") || '<p class="vide">Renseigner la discipline pour obtenir la justification.</p>'}
      ${cadre.avertissements.length ? `<h4 style="margin-top:12px">Avertissements</h4>` +
        cadre.avertissements.map(a => `<div class="src">⚠️ ${esc(a)}</div>`).join("") : ""}
      <p class="muted" style="margin-top:10px">${esc(CS_AVERTISSEMENTS.federal)}</p>
    </div>
    ${navBoutons(2, 4)}`;
  lier($("#panel-3")); brancherNav($("#panel-3"));
};

/* ---------- 4. Questionnaire général ---------- */
RENDUS[4] = function () {
  $("#panel-4").innerHTML = `
    <h2>Étape 4 — Questionnaire médical général</h2>
    <p class="sous-titre">Réponses : oui / non / inconnu / non applicable, avec commentaire libre. Les « oui » alimentent le moteur d'alertes.</p>
    ${CS_QUESTIONNAIRE.map(sec => {
      const nbOui = sec.items.filter(it => etat.reponses[it.id] === "oui").length;
      const nbRep = sec.items.filter(it => etat.reponses[it.id]).length;
      return `<details class="q-section" ${nbOui ? "open" : ""}>
        <summary>${sec.icone} ${esc(sec.titre)}
          <span class="badge-rep ${nbOui ? "pos" : ""}">${nbOui ? nbOui + " oui" : nbRep + "/" + sec.items.length}</span></summary>
        <div class="q-corps">
          ${sec.note ? `<div class="q-note">ℹ️ ${esc(sec.note)}</div>` : ""}
          ${sec.items.map(it => qItem(it)).join("")}
        </div>
      </details>`;
    }).join("")}
    <div class="actions">
      <button class="btn secondaire" id="btn-tout-non">Tout marquer « non » (sections non ouvertes uniquement — à n'utiliser qu'après interrogatoire réel)</button>
    </div>
    ${navBoutons(3, 5)}`;
  brancherNav($("#panel-4"));
  brancherQItems($("#panel-4"));
  $("#btn-tout-non").addEventListener("click", () => {
    CS_QUESTIONNAIRE.forEach(sec => sec.items.forEach(it => { if (!etat.reponses[it.id]) etat.reponses[it.id] = "non"; }));
    RENDUS[4]();
  });
};

function qItem(it) {
  const r = etat.reponses[it.id] || "";
  const opts = [["oui","Oui"],["non","Non"],["inconnu","?"],["na","N/A"]];
  return `<div class="q-item" data-q="${it.id}">
    <span class="lib">${esc(it.l)}</span>
    <span class="q-opts">${opts.map(([v,l]) =>
      `<button class="q-opt${r === v ? " sel-" + v : ""}" data-val="${v}">${l}</button>`).join("")}</span>
    ${r === "oui" || etat.commentaires[it.id] ? `<input class="q-comment" data-comment="${it.id}" placeholder="Commentaire (précisions, dates…)" value="${esc(etat.commentaires[it.id] || "")}">` : ""}
  </div>`;
}
function brancherQItems(panel) {
  $$(".q-item[data-q]", panel).forEach(item => {
    const id = item.dataset.q;
    $$(".q-opt", item).forEach(b => b.addEventListener("click", () => {
      etat.reponses[id] = b.dataset.val;
      RENDUS[etapeActive]();
    }));
  });
  $$("[data-comment]", panel).forEach(inp => inp.addEventListener("input", () => {
    etat.commentaires[inp.dataset.comment] = inp.value;
  }));
}

/* ---------- 5. Module spécifique ---------- */
RENDUS[5] = function () {
  const sport = CSM.sportById(etat.sport.sportId);
  const mod = sport && sport.module ? CS_MODULES[sport.module] : null;
  $("#panel-5").innerHTML = `
    <h2>Étape 5 — Questionnaire spécifique au sport</h2>
    <p class="sous-titre">${sport ? esc(sport.nom) : "Aucune discipline sélectionnée."}</p>
    ${!mod ? `<div class="carte"><p class="muted">${sport ?
        "Pas de module spécifique pour cette discipline : le questionnaire général et la fiche sport (intensité " + esc(sport.intensite) + ", " + esc(sport.statDyn) + ") suffisent. Adapter selon le contexte." :
        "Sélectionner d'abord une discipline (étape 2)."}</p></div>` :
      `<div class="carte">
        <h3>${mod.icone} ${esc(mod.titre)}</h3>
        <div class="grille">
          ${mod.questions.map(q => champModule(q)).join("")}
        </div>
      </div>
      <div class="carte">
        <h3>⚠️ Points de vigilance propres à la discipline</h3>
        <ul style="list-style:none;display:grid;gap:5px;font-size:13px">
          ${mod.vigilance.map(v => `<li>· ${esc(v)}</li>`).join("")}
        </ul>
      </div>
      <div class="carte">
        <h3>🩺 Examens ciblés à considérer</h3>
        <ul style="list-style:none;display:grid;gap:5px;font-size:13px">
          ${mod.examens.map(v => `<li>· ${esc(v)}</li>`).join("")}
        </ul>
        ${mod.note ? `<div class="q-note" style="margin-top:10px">ℹ️ ${esc(mod.note)}</div>` : ""}
      </div>`}
    ${navBoutons(4, 6)}`;
  brancherNav($("#panel-5"));
  $$("#panel-5 [data-module-champ]").forEach(el => {
    const id = el.dataset.moduleChamp;
    el.value = etat.moduleReponses[id] ?? "";
    el.addEventListener("change", () => { etat.moduleReponses[id] = el.value; });
  });
};
function champModule(q) {
  if (q.type === "ouinon") return `<div class="field"><label>${esc(q.l)}</label>
    <select data-module-champ="${q.id}"><option value="">—</option><option value="oui">Oui</option><option value="non">Non</option><option value="inconnu">Inconnu</option></select></div>`;
  if (q.type === "select") return `<div class="field"><label>${esc(q.l)}</label>
    <select data-module-champ="${q.id}"><option value="">—</option>${q.opts.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>`;
  return `<div class="field"><label>${esc(q.l)}</label><input type="${q.type === "number" ? "number" : q.type === "date" ? "date" : "text"}" data-module-champ="${q.id}"></div>`;
}

/* ---------- 6. Examen clinique ---------- */
RENDUS[6] = function () {
  $("#panel-6").innerHTML = `
    <h2>Étape 6 — Examen clinique</h2>
    <p class="sous-titre">Fiche d'examen adaptable ; les constantes anormales alimentent le moteur d'alertes.</p>
    ${CS_EXAMEN.map(sec => `<div class="carte">
      <h3>${sec.icone} ${esc(sec.titre)}</h3>
      <div class="grille">
        ${sec.champs.map(ch => champExamen(ch)).join("")}
      </div>
    </div>`).join("")}
    ${navBoutons(5, 7)}`;
  brancherNav($("#panel-6"));
  $$("#panel-6 [data-exam-champ]").forEach(el => {
    const id = el.dataset.examChamp;
    el.value = etat.examen[id] ?? "";
    const h = () => { etat.examen[id] = el.value; };
    el.addEventListener("change", h); el.addEventListener("input", h);
  });
};
function champExamen(ch) {
  if (ch.type === "ouinon" || ch.type === "ouinon-inverse") {
    return `<div class="field"><label>${esc(ch.l)}</label>
      <select data-exam-champ="${ch.id}"><option value="">—</option><option value="oui">Oui</option><option value="non">Non</option></select></div>`;
  }
  if (ch.type === "select") return `<div class="field"><label>${esc(ch.l)}</label>
    <select data-exam-champ="${ch.id}"><option value="">—</option>${ch.opts.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>`;
  return `<div class="field"><label>${esc(ch.l)}</label><input type="${ch.type === "number" ? "number" : "text"}" data-exam-champ="${ch.id}" step="any"></div>`;
}

/* ---------- 7. Alertes ---------- */
RENDUS[7] = function () {
  const alertes = alertesCourantes();
  const synth = syntheseCourante(alertes);
  $("#panel-7").innerHTML = `
    <h2>Étape 7 — Signaux d'alerte</h2>
    <p class="sous-titre">Moteur transparent : chaque alerte affiche la donnée déclenchante, le risque, la conduite suggérée et ses limites.</p>
    <div class="bandeau-card bandeau-alerte" style="margin-bottom:14px">⚠️ ${esc(CS_AVERTISSEMENTS.alerte)}</div>
    ${synth.urgence ? `<div class="bandeau-card bandeau-urgence" style="margin-bottom:14px">🚨 ${esc(CS_AVERTISSEMENTS.urgence)}</div>` : ""}
    <div class="legende">
      <span><span class="pastille vert"></span> 0 aucun obstacle identifié (jamais une garantie absolue)</span>
      <span><span class="pastille jaune"></span> 1 vigilance</span>
      <span><span class="pastille orange"></span> 2 bilan/avis</span>
      <span><span class="pastille rouge"></span> 3–5 ne pas délivrer immédiatement</span>
      <span><span class="pastille gris"></span> inconnu / non vérifié</span>
    </div>
    ${alertes.length === 0 ? `<div class="carte"><span class="badge-niveau n0">Niveau 0</span>
      <p style="margin-top:8px">${esc(CS_NIVEAUX[0].desc)}</p>
      <p class="muted">Le vert signale l'absence d'élément défavorable identifié par l'outil — pas une garantie de sécurité.</p></div>` :
      alertes.map(a => renduAlerte(a)).join("")}
    ${navBoutons(6, 8)}`;
  brancherNav($("#panel-7"));
  $$("#panel-7 [data-traiter]").forEach(b => b.addEventListener("click", () => {
    const id = b.dataset.traiter;
    const txt = $(`#panel-7 textarea[data-eval="${id}"]`);
    etat.alertesTraitees[id] = { statut: "traitee", evaluation: txt ? txt.value : "" };
    RENDUS[7](); majBandeauUrgence(); majStepper();
  }));
  $$("#panel-7 [data-annuler]").forEach(b => b.addEventListener("click", () => {
    delete etat.alertesTraitees[b.dataset.annuler];
    RENDUS[7](); majBandeauUrgence(); majStepper();
  }));
};
function renduAlerte(a) {
  const t = etat.alertesTraitees[a.id];
  const nivCls = a.niveau === "U" ? "nU" : "n" + a.niveau;
  const nivNom = a.niveau === "U" ? "URGENCE" : "Niveau " + a.niveau + " — " + CS_NIVEAUX[a.niveau].nom;
  const bloquante = a.niveau === "U" || a.niveau >= 3;
  return `<div class="alerte-item ${nivCls}">
    <div class="a-titre"><span class="badge-niveau ${nivCls}">${nivNom}</span> ${esc(a.donnee)}
      ${t && t.statut === "traitee" ? '<span class="badge-traite">✓ évaluée par le médecin</span>' : ""}</div>
    <div class="a-corps">
      <div><b>Donnée :</b> ${esc(a.donnee)}</div>
      <div><b>Risque :</b> ${esc(a.risque)}</div>
      <div><b>Sport concerné :</b> ${esc(a.sport)}</div>
      <div><b>Conduite suggérée :</b> ${esc(a.conduite)}</div>
      ${a.source ? `<div><b>Source :</b> ${esc(a.source.texte)} — ${esc(a.source.article)} (vérifié le ${esc(a.source.verification || "—")}) <span class="statut-regle ${esc(a.source.statut)}">${esc(a.source.statut)}</span></div>` : ""}
      <div><b>Base :</b> version ${esc(a.maj)}</div>
    </div>
    <div class="a-limites">Limites : ${esc(a.limites)} Le médecin reste responsable de la décision finale.</div>
    <div class="alerte-traitement">
      ${t && t.statut === "traitee"
        ? `<span style="font-size:12.5px"><b>Évaluation :</b> ${esc(t.evaluation || "(sans commentaire)")}</span>
           <button class="btn secondaire" data-annuler="${a.id}">Rouvrir</button>`
        : `<textarea data-eval="${a.id}" placeholder="Évaluation du médecin (obligatoire pour lever le blocage${bloquante ? " — alerte bloquante" : ""}) : contexte, examens vus, raisonnement…"></textarea>
           <button class="btn" data-traiter="${a.id}">J'ai évalué ce signal</button>`}
    </div>
  </div>`;
}

/* ---------- 8. Examens complémentaires ---------- */
RENDUS[8] = function () {
  $("#panel-8").innerHTML = `
    <h2>Étape 8 — Examens complémentaires</h2>
    <p class="sous-titre">L'outil suggère, il n'impose pas : distinguer obligation textuelle, exigence fédérale, recommandation, option. L'ECG n'est pas rendu obligatoire chez tous les sportifs : l'indication dépend de l'âge, des symptômes, des antécédents, de l'examen, du sport et du niveau (cf. recommandation SFC — source datée dans la base).</p>
    <div class="carte">
      <h3>➕ Ajouter un examen</h3>
      <div class="actions">
        <select class="mini" id="sel-examen">${CS_EXAMENS_COMP.map(e => `<option>${esc(e)}</option>`).join("")}</select>
        <select class="mini" id="sel-statut-examen">${CS_STATUTS_EXAM.map(e => `<option>${esc(e)}</option>`).join("")}</select>
        <input class="mini" id="inp-resultat-examen" placeholder="Résultat / état (prescrit, en attente…)" style="flex:1;min-width:200px">
        <button class="btn" id="btn-ajout-examen">Ajouter</button>
      </div>
      <p class="muted" style="margin-top:8px">Un examen « obligatoire selon un texte » exige une source explicite ; en son absence, choisir « exigé par la fédération (à vérifier) » ou « recommandé ».</p>
    </div>
    <div class="carte">
      <h3>🧪 Examens retenus (${etat.examensComp.length})</h3>
      ${etat.examensComp.length ? etat.examensComp.map((e, i) => `
        <div class="q-item"><span class="lib"><strong>${esc(e.type)}</strong> — ${esc(e.statut)}${e.resultat ? " — " + esc(e.resultat) : ""}</span>
          <button class="q-opt" data-suppr-examen="${i}">Retirer</button></div>`).join("") :
        '<p class="vide">Aucun examen ajouté.</p>'}
    </div>
    ${navBoutons(7, 9)}`;
  brancherNav($("#panel-8"));
  $("#btn-ajout-examen").addEventListener("click", () => {
    etat.examensComp.push({ type: $("#sel-examen").value, statut: $("#sel-statut-examen").value, resultat: $("#inp-resultat-examen").value });
    RENDUS[8]();
  });
  $$("[data-suppr-examen]").forEach(b => b.addEventListener("click", () => {
    etat.examensComp.splice(Number(b.dataset.supprExamen), 1); RENDUS[8]();
  }));
};

/* ---------- 9. Synthèse ---------- */
RENDUS[9] = function () {
  const alertes = alertesCourantes();
  const synth = syntheseCourante(alertes);
  const cadre = cadreCourant();
  const rassurants = [];
  CS_QUESTIONNAIRE.forEach(sec => {
    const tousNon = sec.items.length && sec.items.every(it => etat.reponses[it.id] === "non" || etat.reponses[it.id] === "na");
    if (tousNon) rassurants.push(sec.titre + " : sans particularité déclarée");
  });
  const vigilance = alertes.filter(a => a.niveau === 1 || a.niveau === 2);
  const bloquants = alertes.filter(a => a.niveau === "U" || a.niveau >= 3).map(a => ({
    ...a, traitee: etat.alertesTraitees[a.id] && etat.alertesTraitees[a.id].statut === "traitee" }));
  $("#panel-9").innerHTML = `
    <h2>Étape 9 — Synthèse</h2>
    <p class="sous-titre">Trois colonnes : éléments rassurants, points de vigilance, éléments empêchant actuellement la délivrance.</p>
    <div class="colonnes">
      <div class="col-synth ok"><h4>✅ Éléments rassurants</h4>
        <ul>${rassurants.length ? rassurants.map(r => `<li>${esc(r)}</li>`).join("") : '<li class="vide">Sections du questionnaire incomplètes ou éléments positifs présents.</li>'}</ul></div>
      <div class="col-synth vig"><h4>⚠️ Points de vigilance</h4>
        <ul>${vigilance.length ? vigilance.map(a => `<li>${esc(a.donnee)} — ${esc(a.conduite)}</li>`).join("") : '<li class="vide">Aucun.</li>'}</ul></div>
      <div class="col-synth stop"><h4>⛔ Empêchent actuellement la délivrance</h4>
        <ul>${bloquants.length ? bloquants.map(a => `<li>${esc(a.donnee)} ${a.traitee ? "(évaluée par le médecin)" : "(NON évaluée)"}</li>`).join("") : '<li class="vide">Aucun.</li>'}</ul></div>
    </div>
    <div class="carte" style="margin-top:16px">
      <h3>🧭 Proposition de conduite (aide, non décision)</h3>
      <p style="font-size:13.5px">${esc(propositionConduite(synth, cadre))}</p>
      <p class="muted" style="margin-top:8px">${esc(CS_AVERTISSEMENTS.ia)}</p>
      <div class="sport-resume" style="margin-top:10px">
        <div><b>Cadre réglementaire :</b> ${esc(cadre.libelle)} (certitude : ${esc(cadre.certitude)})</div>
        <div><b>Niveau d'alerte maximal :</b> ${synth.urgence ? "URGENCE" : synth.niveauMax} — ${esc(synth.urgence ? CS_NIVEAUX.U.nom : CS_NIVEAUX[synth.niveauMax].nom)}</div>
        <div><b>Examens envisagés :</b> ${etat.examensComp.length ? esc(etat.examensComp.map(e => e.type).join(", ")) : "aucun"}</div>
      </div>
    </div>
    ${navBoutons(8, 10)}`;
  brancherNav($("#panel-9"));
};
function propositionConduite(synth, cadre) {
  if (synth.urgence) return CS_AVERTISSEMENTS.urgence;
  if (synth.niveauMax >= 5) return "Une contre-indication durable est possible : validation manuelle explicite, justification clinique, vérification du règlement applicable et avis spécialisé avant toute conclusion.";
  if (synth.niveauMax === 4) return "Contre-indication temporaire probable : différer le certificat, traiter/attendre la résolution, programmer une réévaluation datée.";
  if (synth.niveauMax === 3) return "Différer le certificat : documenter la situation (examens, avis) avant de conclure.";
  if (synth.niveauMax === 2) return "Bilan complémentaire recommandé avant décision ; la délivrance immédiate reste possible si le médecin estime, après examen, que les éléments sont suffisants.";
  if (synth.niveauMax === 1) return "Points de vigilance : information, recommandations, éventuellement restrictions ; délivrance possible après évaluation.";
  if (cadre.code === "NON_SYSTEMATIQUE" || cadre.code === "QUESTIONNAIRE_SUFFIT") return "Aucun élément défavorable identifié — et le certificat n'est pas nécessairement requis dans ce cadre : expliquer le dispositif applicable (questionnaire de santé, règlement fédéral) et ne délivrer que si utile.";
  return "Aucun élément défavorable identifié par l'outil : l'absence de contre-indication peut être envisagée sous réserve de l'examen et de la validation du médecin.";
}

/* ---------- 10. Décision ---------- */
RENDUS[10] = function () {
  const synth = syntheseCourante();
  const d = etat.decision;
  $("#panel-10").innerHTML = `
    <h2>Étape 10 — Décision médicale</h2>
    <p class="sous-titre">Onze conclusions possibles. La validation explicite du médecin est requise pour générer un certificat.</p>
    <div class="carte">
      <h3>📌 Conclusion</h3>
      <div class="field"><label>Conclusion retenue</label>
        <select data-bind="decision.conclusionId" data-rafraichir>
          <option value="">— choisir —</option>
          ${CS_CONCLUSIONS.map(c => `<option value="${c.id}">${c.id}. ${esc(c.l)}</option>`).join("")}
        </select></div>
      <div class="grille" style="margin-top:12px">
        <div class="field"><label>Restrictions / recommandations (le cas échéant)</label><textarea data-bind="decision.restrictions"></textarea></div>
        <div class="field"><label>Durée (restriction / CI temporaire)</label><input data-bind="decision.duree" placeholder="ex. 6 semaines"></div>
        <div class="field"><label>Date de réévaluation programmée</label><input type="date" data-bind="decision.dateReeval"></div>
        <div class="field"><label>Justification clinique (obligatoire si CI durable)</label><textarea data-bind="decision.justification"></textarea></div>
        <div class="field"><label>Information donnée au patient</label><textarea data-bind="decision.information" placeholder="risques, signes d'alerte à l'effort, conduite si symptômes…"></textarea></div>
      </div>
      ${synth.niveauMax >= 4 || synth.urgence ? `<div class="bandeau-card bandeau-alerte" style="margin-top:10px">
        ⚠️ Des alertes de niveau ≥ 4 ${synth.urgence ? "ou une urgence " : ""}sont présentes : une conclusion favorable exige de les avoir explicitement évaluées et argumentées (étape 7).</div>` : ""}
      <div class="confirm-box">
        <input type="checkbox" id="chk-confirme" ${d.confirme ? "checked" : ""}>
        <label for="chk-confirme">« Je confirme avoir examiné le patient et avoir personnellement évalué la pertinence de cette conclusion. »</label>
      </div>
      <p class="muted">Le certificat engage la responsabilité du médecin ; il est établi après examen personnel, à la date de l'examen, sans antidatage, pour une discipline identifiée. L'absence de contre-indication s'apprécie à la date de l'examen. Une contre-indication peut être temporaire, relative ou dépendre du niveau de pratique.</p>
    </div>
    ${navBoutons(9, 11)}`;
  lier($("#panel-10")); brancherNav($("#panel-10"));
  $("#chk-confirme").addEventListener("change", e => { etat.decision.confirme = e.target.checked; });
};

/* ---------- 11. Certificat ---------- */
RENDUS[11] = function () {
  const alertes = alertesCourantes();
  const synth = syntheseCourante(alertes);
  const verrous = CSM.verrousCertificat(etat, alertes, synth);
  const cadre = cadreCourant();
  if (cadre.cpActive && etat.certificatModele === "standard") etat.certificatModele = "contraintes";
  const genOK = verrous.length === 0;
  const doc = genOK ? CSM.genererCertificat(etat, etat.certificatModele) : "";
  $("#panel-11").innerHTML = `
    <h2>Étape 11 — Certificat</h2>
    <p class="sous-titre">Le certificat remis au club ne mentionne ni diagnostic, ni traitement, ni antécédent, ni motif médical. Jamais de formule « apte à tous les sports ».</p>
    ${verrous.length ? `<div class="verrous"><h4>🔒 Génération verrouillée — conditions non réunies</h4>
      <ul>${verrous.map(v => `<li>${esc(v)}</li>`).join("")}</ul></div>` : ""}
    <div class="carte no-print">
      <h3>📄 Modèle</h3>
      <div class="actions">
        <select class="mini" id="sel-modele">${CS_MODELES_CERTIFICATS.map(m =>
          `<option value="${m.id}" ${etat.certificatModele === m.id ? "selected" : ""}>${esc(m.nom)}</option>`).join("")}</select>
        <button class="btn" id="btn-copier-certif" ${genOK ? "" : "disabled"}>📋 Copier</button>
        <button class="btn secondaire" id="btn-imprimer-certif" ${genOK ? "" : "disabled"}>🖨️ Imprimer</button>
      </div>
      ${etat.certificatModele === "courrier" ? `<div class="grille" style="margin-top:10px">
        <div class="field"><label>Destinataire</label><input data-bind="decision.destinataire" placeholder="Dr X, cardiologue"></div>
        <div class="field"><label>Motif de l'avis</label><input data-bind="decision.motifOrientation"></div>
        <div class="field"><label>Éléments transmis (accord patient)</label><textarea data-bind="decision.elementsCourrier"></textarea></div>
      </div>` : ""}
      ${etat.certificatModele === "reevaluation" ? `<div class="field" style="margin-top:10px">
        <label>Conclusion de la réévaluation</label><textarea data-bind="decision.texteLibre"></textarea></div>` : ""}
    </div>
    <div class="doc" id="doc-certificat">${genOK ? esc(doc) : "— Certificat non généré : lever d'abord les verrous ci-dessus. —"}</div>
    <p class="muted no-print" style="margin-top:10px">La signature reste manuscrite ou via un dispositif de signature électronique conforme : l'outil ne signe jamais à la place du médecin.</p>
    ${navBoutons(10, 12)}`;
  lier($("#panel-11")); brancherNav($("#panel-11"));
  $("#sel-modele").addEventListener("change", e => { etat.certificatModele = e.target.value; RENDUS[11](); });
  if (genOK) {
    $("#btn-copier-certif").addEventListener("click", () => copier(doc, $("#btn-copier-certif")));
    $("#btn-imprimer-certif").addEventListener("click", () => imprimerDoc(doc));
  }
};

/* ---------- 12. Note dossier ---------- */
RENDUS[12] = function () {
  const alertes = alertesCourantes();
  const synth = syntheseCourante(alertes);
  const cadre = cadreCourant();
  const note = CSM.genererNote(etat, cadre, alertes, synth);
  $("#panel-12").innerHTML = `
    <h2>Étape 12 — Note clinique pour le dossier</h2>
    <p class="sous-titre">Document distinct du certificat, NON transmis au club : trace des éléments ayant fondé la décision.</p>
    <div class="actions no-print">
      <button class="btn" id="btn-copier-note">📋 Copier dans le dossier patient</button>
      <button class="btn secondaire" id="btn-imprimer-note">🖨️ Imprimer / PDF</button>
      <button class="btn secondaire" id="btn-telecharger-note">💾 Télécharger (.txt)</button>
      <button class="btn secondaire" id="btn-export-json">💾 Export structuré (.json)</button>
    </div>
    <div class="doc" style="font-family:ui-monospace,Consolas,monospace;font-size:12.5px">${esc(note)}</div>
    <div class="actions no-print" style="margin-top:16px">
      <button class="btn danger" id="btn-nouvelle-consult">🗑️ Terminer et effacer la consultation</button>
    </div>
    ${navBoutons(11, 0, "Retour au tableau de bord")}`;
  brancherNav($("#panel-12"));
  $("#btn-copier-note").addEventListener("click", () => copier(note, $("#btn-copier-note")));
  $("#btn-imprimer-note").addEventListener("click", () => imprimerDoc(note));
  $("#btn-telecharger-note").addEventListener("click", () => telecharger(note, "note-clinique.txt", "text/plain"));
  $("#btn-export-json").addEventListener("click", () => {
    const exportStruct = { version: CS_VERSION_BASE, genere: new Date().toISOString(),
      patient: etat.patient, sport: etat.sport, cadre, reponses: etat.reponses,
      moduleReponses: etat.moduleReponses, examen: etat.examen, alertes,
      alertesTraitees: etat.alertesTraitees, examensComplementaires: etat.examensComp,
      decision: etat.decision };
    telecharger(JSON.stringify(exportStruct, null, 2), "consultation-certisport.json", "application/json");
  });
  $("#btn-nouvelle-consult").addEventListener("click", () => {
    if (confirm("Effacer toutes les données de la consultation en cours ? (le certificat et la note doivent avoir été copiés/imprimés au préalable)")) location.reload();
  });
};

/* ---------- 13. Base réglementaire ---------- */
RENDUS[13] = function () {
  $("#panel-13").innerHTML = `
    <h2>Base réglementaire versionnée (v${CS_VERSION_BASE})</h2>
    <p class="sous-titre">Chaque règle : source, article, dates, statut, portée, divergences. Sources prioritaires : Légifrance, ministère des Sports, Service-Public.fr, fédérations, HAS, sociétés savantes. Aucune règle n'est modifiée automatiquement depuis une page internet non validée.</p>
    <div class="bandeau-card bandeau-info" style="margin-bottom:14px">${esc(CS_AVERTISSEMENTS.federal)}</div>
    ${CS_REGLES.map(r => `<div class="carte">
      <h3>${esc(r.intitule)} <span class="statut-regle ${esc(r.statut)}">${esc(r.statut)}</span></h3>
      <p style="font-size:13px"><b>${esc(r.texte)}</b> — ${esc(r.article)}</p>
      <p style="font-size:13px;margin-top:6px">${esc(r.resume)}</p>
      <p class="muted" style="margin-top:6px">Portée : ${esc(r.portee)} · Entrée en vigueur : ${esc(r.date_vigueur || "—")} · Dernière vérification : ${esc(r.date_verification)} ·
        <a href="${esc(r.urlOfficielle)}" target="_blank" rel="noopener">source officielle ↗</a></p>
      ${r.niveau_validation ? `<p class="muted">Validation : ${esc(r.niveau_validation)}</p>` : ""}
      ${r.divergence ? `<p class="muted">⚠️ Divergence possible : ${esc(r.divergence)}</p>` : ""}
    </div>`).join("")}
    ${navBoutons(0, null)}`;
  brancherNav($("#panel-13"));
};

/* ------------------------- utilitaires UI ------------------------- */
function copier(txt, btn) {
  const fini = () => { const o = btn.textContent; btn.textContent = "✓ Copié"; setTimeout(() => btn.textContent = o, 1600); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(fini, () => copierFallback(txt, fini));
  else copierFallback(txt, fini);
}
function copierFallback(txt, fini) {
  const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta);
  ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); fini();
}
function imprimerDoc(txt) {
  const w = window.open("", "_blank");
  w.document.write("<pre style='font-family:Georgia,serif;font-size:13.5pt;white-space:pre-wrap;padding:14mm'>" +
    txt.replace(/[&<>]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;"}[m])) + "</pre>");
  w.document.close(); w.focus(); w.print();
}
function telecharger(contenu, nom, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([contenu], { type }));
  a.download = nom; a.click(); URL.revokeObjectURL(a.href);
}

/* ------------------------------ init ------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  $("#avertissement-general").innerHTML = "<strong>Avertissement.</strong> " + esc(CS_AVERTISSEMENTS.general);
  $("#avertissement-footer").textContent = CS_AVERTISSEMENTS.general;
  $("#version-base").textContent = "v" + CS_VERSION_BASE;
  $("#version-footer").textContent = CS_VERSION_BASE;
  afficherEtape(0);
});
