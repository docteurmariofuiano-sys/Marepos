/* =====================================================================
   FORMATION AUDIO-VESTIBULAIRE — noyau
   Tableau global FORMATION + helpers de mise en forme du contenu.
   Les fichiers data-*.js poussent leurs groupes dans FORMATION.
   ===================================================================== */
'use strict';

const FORMATION = [];

/* Niveaux pédagogiques (badge) */
const NIV = {
  base:  { cls: "base",  txt: "Bases" },
  inter: { cls: "inter", txt: "Intermédiaire" },
  avance:{ cls: "avance",txt: "Avancé" }
};

/* ---------- Encadrés ---------- */
function box(type, body, titre) {
  const T = {
    retenir:    ["retenir",    "💡 À retenir"],
    piege:      ["piege",      "⚠️ Piège classique"],
    erreur:     ["erreur",     "🔁 Erreur fréquente"],
    redflag:    ["redflag",    "🚩 Red flag"],
    adresser:   ["adresser",   "📨 Quand adresser ?"],
    patient:    ["patient",    "🗣️ Ce que doit savoir le patient"],
    specialiste:["specialiste","🎯 Ce qu'attend le spécialiste"],
    note:       ["note",       "📝 Note"]
  };
  const [cls, def] = T[type] || T.note;
  return `<div class="box ${cls}"><div class="box-t">${titre || def}</div>${body}</div>`;
}

/* ---------- Tableau ---------- */
function tbl(headers, rows) {
  const th = headers.map(h => `<th>${h}</th>`).join("");
  const tr = rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<div class="tbl-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

/* ---------- Algorithme en étapes ---------- */
function algo(steps) {
  return `<div class="algo">` + steps.map((s, i) =>
    `<div class="step"><div class="dot">${i + 1}</div><div class="step-c">${s}</div></div>`).join("") + `</div>`;
}

/* ---------- Checklist ---------- */
function checklist(items) {
  return `<ul class="chk">` + items.map(i => `<li>${i}</li>`).join("") + `</ul>`;
}

/* ---------- Accordéon (cas, items longs) ---------- */
function acc(titre, body, num) {
  const n = num ? `<span class="acc-num">${num}</span>` : "";
  return `<details class="acc"><summary>${n}<span>${titre}</span></summary><div class="acc-body">${body}</div></details>`;
}

/* ---------- QCM ---------- */
/* opts : [{t:"texte", good:true/false}], corr : explication HTML */
function qcm(question, opts, corr) {
  const o = opts.map(op =>
    `<span class="opt" data-good="${op.good ? 1 : 0}">${op.t}</span>`).join("");
  return `<div class="qcm"><div class="q">${question}</div>${o}
    <div class="corr"><strong>Correction.</strong> ${corr}</div></div>`;
}

/* ---------- Cas clinique structuré ---------- */
function cas(n, titre, data) {
  const seg = (label, val) => val ? `<h4>${label}</h4>${val}` : "";
  const body = [
    seg("Contexte", data.contexte),
    seg("Plainte principale", data.plainte),
    seg("Interrogatoire ciblé", data.interro),
    seg("Examen clinique attendu", data.examen),
    seg("Examens complémentaires pertinents", data.complementaires),
    seg("Interprétation", data.interpretation),
    seg("Diagnostic le plus probable", data.diagnostic),
    seg("Diagnostics différentiels", data.differentiels),
    seg("Conduite à tenir", data.cat),
    seg("Critères de gravité", data.gravite),
    seg("Messages d'éducation au patient", data.education),
    seg("Points pédagogiques à retenir", data.points)
  ].join("");
  return acc(`Cas ${n} — ${titre}`, body, n);
}

/* ---------- QROC ---------- */
function qroc(question, attendu) {
  return acc("QROC — " + question, `<h4>Éléments attendus</h4>${attendu}`, "?");
}
