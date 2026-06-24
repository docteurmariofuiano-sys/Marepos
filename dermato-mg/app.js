/* =====================================================================
   DERMATO MG — moteur de l'application
   Recherche, navigation, fiches, ordonnances, conseils, urgences,
   diagnostic différentiel, médicaments, dermatoscopie, lecture d'image,
   apprentissage (cas/QCM/flashcards), alertes terrain, impression.
   Tout en local, sans serveur ni fetch.
   ===================================================================== */
'use strict';
(function(){
const DB = window.DERMATO_DB;
const {PATHOLOGIES, SYMPTOMES, LOCALISATIONS, URGENCES, DIFFERENTIELS,
       MEDICAMENTS, TERRAINS, CAS_CLINIQUES, QCM, FLASHCARDS,
       DERMATOSCOPIE, ANALYSE_IMAGE, NIVEAUX,
       LESIONS_ELEMENTAIRES, LESIONS_DERMATO, AIDE_VISUELLE_NOTE} = DB;

/* ---------- utilitaires ---------- */
const $  = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));
const norm = t => String(t||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const esc = t => String(t==null?"":t).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const byId = id => PATHOLOGIES.find(p=>p.id===id);
const list = (arr,cls="") => (arr&&arr.length)?`<ul class="${cls}">${arr.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p class="muted">—</p>`;

function badge(niveau){
  const n = NIVEAUX[niveau]||NIVEAUX[0];
  return `<span class="badge ${n.cls} badge-dot">${esc(n.lib)}</span>`;
}

/* index de recherche (pré-calculé) */
const INDEX = PATHOLOGIES.map(p=>({
  p, hay: norm([p.nom,p.categorie,p.definition,(p.symptomes||[]).join(" "),
    (p.localisations||[]).join(" "),(p.tags||[]).join(" "),
    (p.elements_cles||[]).join(" "),(p.diagnostics_differentiels||[]).join(" "),
    p.urgence].join(" "))
}));

/* ---------- état + navigation onglets ---------- */
const state = { tab:"recherche", terrains:new Set() };

function showTab(tab){
  state.tab = tab;
  $$(".tab").forEach(b=>{
    const on = b.dataset.tab===tab;
    b.classList.toggle("active",on);
    b.setAttribute("aria-selected", on?"true":"false");
  });
  $$(".panel").forEach(s=>{ s.hidden = s.dataset.panel!==tab; });
  const fn = RENDER[tab];
  const panel = $(`.panel[data-panel="${tab}"]`);
  if(fn && panel && !panel.dataset.rendered){ fn(panel); panel.dataset.rendered="1"; }
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ===================================================================
   RECHERCHE RAPIDE
   =================================================================== */
function searchPathos(q){
  const nq = norm(q).trim();
  if(!nq) return PATHOLOGIES.slice();
  const terms = nq.split(/\s+/);
  return INDEX
    .map(({p,hay})=>{
      let score=0;
      terms.forEach(t=>{
        if(norm(p.nom).includes(t)) score+=5;
        if(hay.includes(t)) score+=1;
      });
      return {p,score};
    })
    .filter(x=>x.score>0)
    .sort((a,b)=> b.score-a.score || a.p.nom.localeCompare(b.p.nom))
    .map(x=>x.p);
}

function pathoCard(p){
  return `<button class="card" data-open="${p.id}">
    <div class="card-row"><span class="card-ic">🔹</span>
      <h3>${esc(p.nom)}</h3></div>
    <div class="card-row">${badge(p.niveau)}<span class="card-cat">${esc(p.categorie)}</span></div>
    <p>${esc(p.definition)}</p>
  </button>`;
}

function RENDER_recherche(panel){
  panel.innerHTML = `
    <div class="section-title"><h2>Recherche rapide</h2>
      <span class="muted" id="searchCount"></span></div>
    <p class="lead">Tapez un nom de pathologie, un symptôme, une localisation, un type de lésion, un contexte clinique ou un mot-clé thérapeutique. La recherche affiche le diagnostic, les différentiels, le niveau d'urgence, la conduite à tenir, l'ordonnance et les conseils.</p>
    <div class="chips" id="catChips"></div>
    <div class="grid grid-2" id="searchResults"></div>`;

  // chips catégories
  const cats = ["Toutes", ...Array.from(new Set(PATHOLOGIES.map(p=>p.categorie)))];
  $("#catChips",panel).innerHTML = cats.map((c,i)=>
    `<button class="chip${i===0?' active':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

  let curCat="Toutes";
  const draw = ()=>{
    const q = $("#globalSearch").value;
    let res = searchPathos(q);
    if(curCat!=="Toutes") res = res.filter(p=>p.categorie===curCat);
    const g = $("#searchResults",panel);
    g.innerHTML = res.length ? res.map(pathoCard).join("")
      : `<div class="empty"><strong>Aucune fiche ne correspond.</strong><br>Essayez un autre mot-clé (symptôme, localisation, pathologie).</div>`;
    $("#searchCount",panel).textContent = `${res.length} fiche${res.length>1?"s":""}`;
  };
  $("#catChips",panel).addEventListener("click",e=>{
    const b=e.target.closest(".chip"); if(!b)return;
    $$(".chip",panel).forEach(x=>x.classList.remove("active"));
    b.classList.add("active"); curCat=b.dataset.cat; draw();
  });
  panel._draw = draw;
  draw();
};

/* ===================================================================
   PAR SYMPTÔME
   =================================================================== */
function RENDER_symptome(panel){
  panel.innerHTML = `
    <div class="section-title"><h2>Je pars du symptôme</h2></div>
    <p class="lead">Cliquez sur un symptôme dermatologique : les diagnostics à proposer s'affichent, avec accès direct aux fiches.</p>
    <div class="grid grid-2">${SYMPTOMES.map(symptomeCard).join("")}</div>`;
};
function symptomeCard(s){
  const fiches = s.ids.map(id=>byId(id)).filter(Boolean);
  const extras = s.dx.filter(d=>!fiches.some(f=>norm(f.nom)===norm(d)));
  return `<div class="card" style="cursor:default">
    <div class="card-row"><span class="card-ic">${s.icon}</span><h3>${esc(s.nom)}</h3></div>
    <div class="dx-list">
      ${fiches.map(f=>`<span class="dx-pill" data-open="${f.id}">${esc(f.nom)} ›</span>`).join("")}
      ${extras.map(d=>`<span class="dx-pill plain">${esc(d)}</span>`).join("")}
    </div></div>`;
}

/* ===================================================================
   PAR LOCALISATION
   =================================================================== */
function RENDER_localisation(panel){
  panel.innerHTML = `
    <div class="section-title"><h2>Je pars de la localisation</h2></div>
    <p class="lead">Choisissez une localisation : les pathologies à évoquer s'affichent, avec accès direct aux fiches.</p>
    <div class="grid grid-2">${LOCALISATIONS.map(symptomeCard).join("")}</div>`;
};

/* ===================================================================
   PATHOLOGIES (catalogue)
   =================================================================== */
function RENDER_pathologies(panel){
  const cats = Array.from(new Set(PATHOLOGIES.map(p=>p.categorie)));
  panel.innerHTML = `
    <div class="section-title"><h2>Pathologies fréquentes</h2>
      <span class="muted">${PATHOLOGIES.length} fiches</span></div>
    <p class="lead">Fiches structurées (définition, éléments clés, clinique, gravité, différentiels, examens, traitements, ordonnance, conseils, quand adresser, suivi).</p>
    ${cats.map(c=>`
      <h3 style="margin:18px 0 8px">${esc(c)}</h3>
      <div class="grid grid-2">${PATHOLOGIES.filter(p=>p.categorie===c).map(pathoCard).join("")}</div>
    `).join("")}`;
};

/* ===================================================================
   FICHE PATHOLOGIE (modale)
   =================================================================== */
function rubrique(titre,content,cls=""){
  return `<details class="acc ${cls}" ${cls?'open':''}><summary>${esc(titre)}</summary>
    <div class="acc-in">${content}</div></details>`;
}
function openFiche(id){
  const p = byId(id); if(!p) return;
  const terrainAlerts = terrainAlertHTML();
  const body = `
    <div class="print-head"><strong>Dermato MG</strong> — Fiche : ${esc(p.nom)}</div>
    <div class="fiche-top">${badge(p.niveau)}<span class="fiche-cat">${esc(p.categorie)}</span>
      <span class="tag">${esc(p.urgence)}</span></div>
    <p class="fiche-def">${esc(p.definition)}</p>
    ${terrainAlerts}
    <div class="fiche-actions">
      <button class="btn btn-green btn-sm" data-ordo="${p.id}">💊 Ordonnance type</button>
      <button class="btn btn-blue btn-sm" data-conseil="${p.id}">📄 Conseil patient</button>
    </div>

    ${rubrique("⭐ Éléments clés", list(p.elements_cles), "")}
    ${rubrique("🧬 Terrain / facteurs favorisants", list(p.terrain))}
    ${rubrique("🔍 Clinique typique", list(p.clinique))}
    ${rubrique("🚩 Signes de gravité", list(p.gravite), p.niveau===2?"crit":"warn")}
    ${rubrique("↔️ Diagnostics différentiels", list(p.diagnostics_differentiels))}
    ${rubrique("🧪 Examens complémentaires", list(p.examens))}
    ${rubrique("✅ Traitement de 1re intention", list(p.traitement_premiere_intention), "")}
    ${rubrique("➕ Traitement de 2e intention", list(p.traitement_deuxieme_intention))}
    ${rubrique("💊 Ordonnance type", `<div class="ordo-box">${esc(p.ordonnance_type)}</div>`)}
    ${rubrique("📄 Conseils patient", `<div class="conseil-box">${esc(p.conseils_patient)}</div>`)}
    ${rubrique("📨 Quand adresser ?", list(p.quand_adresser), "")}
    ${rubrique("🔄 Suivi", list(p.suivi))}
    <div class="src-line">Source : <a href="${esc(p.source_url)}" target="_blank" rel="noopener">${esc(p.source)}</a> — contenu reformulé, à vérifier (recommandations en vigueur, CRAT/RCP).</div>
  `;
  openModal(p.nom, body);
}

/* ===================================================================
   URGENCES / RED FLAGS
   =================================================================== */
function RENDER_urgences(panel){
  const block = (b,cls,icon)=>`
    <div class="urg-block ${cls}">
      <h3>${icon} ${esc(b.titre)}</h3>
      <p style="margin:.3em 0 0">${esc(b.intro)}</p>
      <ul class="urg-list">
        ${b.items.map(it=>`<li><span>${esc(it.txt)}</span>
          ${it.id?`<span class="lk" data-open="${it.id}">Fiche ›</span>`:""}</li>`).join("")}
      </ul>
    </div>`;
  panel.innerHTML = `
    <div class="section-title"><h2 style="color:var(--red)">🚨 Urgences / Red flags</h2></div>
    <div class="note note-red"><b>Urgence vitale : appeler le 15 / 112.</b> En présence d'un seul red flag, ne pas temporiser.</div>
    ${block(URGENCES.absolues,"urg-crit","🆘")}
    ${block(URGENCES.relatives,"urg-warn","⚠️")}`;
};

/* ===================================================================
   DIAGNOSTIC DIFFÉRENTIEL
   =================================================================== */
function RENDER_differentiel(panel){
  panel.innerHTML = `
    <div class="section-title"><h2>Diagnostic différentiel intelligent</h2></div>
    <p class="lead">Tableaux comparatifs : arguments pour / contre et orientation, pour les situations cliniques fréquentes.</p>
    ${DIFFERENTIELS.map(d=>`
      <h3 style="margin:18px 0 8px">${esc(d.titre)}</h3>
      <div class="table-wrap"><table>
        <thead><tr>${d.colonnes.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>${d.lignes.map(r=>`<tr>${r.map((c,i)=>`<td>${i===0?`<strong>${esc(c)}</strong>`:esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>`).join("")}`;
};

/* ===================================================================
   ORDONNANCES TYPES (bibliothèque)
   =================================================================== */
function RENDER_ordonnances(panel){
  const withOrdo = PATHOLOGIES.filter(p=>p.ordonnance_type && p.ordonnance_type.trim());
  panel.innerHTML = `
    <div class="section-title"><h2>Ordonnances types</h2>
      <span class="muted">${withOrdo.length} modèles</span></div>
    <p class="lead">Bibliothèque d'ordonnances modifiables et imprimables. Vérifier posologies, contre-indications, allergies et terrain (CRAT/RCP) avant prescription.</p>
    <div class="grid grid-2">
      ${withOrdo.map(p=>`<button class="card" data-ordo="${p.id}">
        <div class="card-row"><span class="card-ic">💊</span><h3>${esc(p.nom)}</h3></div>
        <p>${esc(p.categorie)}</p></button>`).join("")}
    </div>`;
};
function openOrdo(id){
  const p=byId(id); if(!p)return;
  const body = `
    <div class="print-head"><strong>Dermato MG</strong> — Ordonnance type : ${esc(p.nom)}</div>
    <div class="note note-green"><b>Ordonnance type — ${esc(p.nom)}</b></div>
    ${terrainAlertHTML()}
    <div class="ordo-box" id="ordoEdit" contenteditable="true" spellcheck="false">${esc(p.ordonnance_type)}</div>
    <p class="muted" style="font-size:.84rem;margin-top:8px">Texte modifiable : cliquez pour adapter posologie, durée et quantités avant d'imprimer. Réévaluation et précautions à préciser au cas par cas.</p>
    <div class="note note-orange" style="margin-top:10px">Vérifier systématiquement : contre-indications, allergies, grossesse/allaitement, âge, poids, fonction rénale et RCP.</div>
    <div class="src-line">Source : <a href="${esc(p.source_url)}" target="_blank" rel="noopener">${esc(p.source)}</a> — reformulé.</div>`;
  openModal("Ordonnance — "+p.nom, body);
}

/* ===================================================================
   CONSEILS PATIENTS (bibliothèque)
   =================================================================== */
function RENDER_conseils(panel){
  const withC = PATHOLOGIES.filter(p=>p.conseils_patient && p.conseils_patient.trim());
  panel.innerHTML = `
    <div class="section-title"><h2>Conseils patients</h2>
      <span class="muted">${withC.length} fiches</span></div>
    <p class="lead">Fiches patients imprimables : compréhensibles, courtes, rassurantes, orientées conduite pratique, avec les signes devant amener à reconsulter.</p>
    <div class="grid grid-2">
      ${withC.map(p=>`<button class="card" data-conseil="${p.id}">
        <div class="card-row"><span class="card-ic">📄</span><h3>${esc(p.nom)}</h3></div>
        <p>${esc(p.categorie)}</p></button>`).join("")}
    </div>`;
};
function openConseil(id){
  const p=byId(id); if(!p)return;
  const body = `
    <div class="print-head"><strong>Fiche conseils patient</strong> — ${esc(p.nom)}</div>
    <div class="note note-blue"><b>Fiche d'information patient — ${esc(p.nom)}</b></div>
    <div class="conseil-box">${esc(p.conseils_patient)}</div>
    <p class="muted" style="font-size:.84rem;margin-top:10px">Document d'information remis par votre médecin. Il ne remplace pas la consultation. En cas de doute ou d'aggravation, recontactez votre médecin.</p>`;
  openModal("Conseils — "+p.nom, body);
}

/* ===================================================================
   TRAITEMENTS (base médicamenteuse)
   =================================================================== */
function RENDER_medicaments(panel){
  panel.innerHTML = `
    <div class="section-title"><h2>Traitements dermatologiques</h2></div>
    <p class="lead">Base médicamenteuse simple, centrée médecine générale. Indications, contre-indications, précautions grossesse/allaitement, effets indésirables, durée, erreurs fréquentes, conseils d'application.</p>
    ${terrainAlertHTML()}
    <div class="grid grid-2">${MEDICAMENTS.map((m,i)=>`
      <button class="card" data-med="${i}">
        <div class="card-row"><span class="card-ic">${m.icon}</span><h3>${esc(m.classe)}</h3></div>
        <p>${esc((m.indications||[])[0]||"")}</p></button>`).join("")}</div>`;
};
function openMed(i){
  const m=MEDICAMENTS[i]; if(!m)return;
  const body = `
    <div class="med-grid">
      ${terrainAlertHTML()}
      <dl>
        <dt>Indications fréquentes</dt><dd>${list(m.indications)}</dd>
        <dt>Contre-indications</dt><dd>${list(m.ci)}</dd>
        <dt>Grossesse / allaitement</dt><dd><div class="note note-orange" style="margin:4px 0">${esc(m.grossesse)}</div></dd>
        <dt>Effets indésirables fréquents</dt><dd>${list(m.ei)}</dd>
        <dt>Durée habituelle</dt><dd>${esc(m.duree)}</dd>
        <dt>Erreurs fréquentes</dt><dd>${list(m.erreurs)}</dd>
        <dt>Conseils d'application</dt><dd>${esc(m.application)}</dd>
      </dl>
    </div>`;
  openModal(m.icon+" "+m.classe, body);
}

/* ===================================================================
   DERMATOSCOPIE MG
   =================================================================== */
function RENDER_dermatoscopie(panel){
  const d=DERMATOSCOPIE;
  panel.innerHTML = `
    <div class="section-title"><h2>Dermatoscopie MG</h2></div>
    <p class="lead">${esc(d.intro)}</p>
    ${d.blocs.map(b=>`<details class="acc" open><summary>${esc(b.titre)}</summary>
      <div class="acc-in">${list(b.items)}</div></details>`).join("")}
    <div class="note note-red"><b>Message de sécurité.</b> ${esc(d.securite)}</div>`;
};

/* ===================================================================
   LECTURE D'IMAGE (grille structurée — pas d'IA réelle)
   =================================================================== */
function RENDER_image(panel){
  const a=ANALYSE_IMAGE;
  panel.innerHTML = `
    <div class="section-title"><h2>Lecture d'image (aide structurée)</h2></div>
    <div class="note note-orange"><b>Avertissement.</b> ${esc(a.avertissement)}</div>
    <p class="lead">Importez une photo pour la visualiser localement (aucune donnée n'est transmise) et remplissez la grille d'analyse structurée. Cet outil n'établit jamais de diagnostic ; il aide à décrire la lésion et à ne pas oublier les red flags.</p>
    <div class="grid grid-2">
      <div class="card" style="cursor:default">
        <h3>Image (locale)</h3>
        <input type="file" id="imgFile" accept="image/*">
        <div id="imgPreview" style="margin-top:10px"></div>
        <p class="muted" style="font-size:.82rem">La photo reste dans votre navigateur. Pour le dossier patient, respectez le secret médical et le RGPD.</p>
      </div>
      <div class="card" style="cursor:default">
        <h3>Grille d'analyse structurée</h3>
        <ol style="padding-left:18px;margin:0">${a.grille.map(g=>`<li style="margin:5px 0">${esc(g)}</li>`).join("")}</ol>
      </div>
    </div>
    <h3 style="margin:18px 0 8px;color:var(--red)">🚩 Red flags image</h3>
    <div class="note note-red"><ul style="margin:0;padding-left:18px">${a.redflags.map(r=>`<li>${esc(r)}</li>`).join("")}</ul></div>
    <div class="note note-blue">Conduite prudente recommandée : décrire objectivement, proposer des hypothèses, rappeler les différentiels et les diagnostics à ne pas manquer, ne jamais conclure de façon définitive. L'examen clinique et la dermatoscopie restent indispensables.</div>`;

  const fileInput = $("#imgFile",panel);
  fileInput.addEventListener("change",e=>{
    const f=e.target.files&&e.target.files[0]; if(!f)return;
    const url=URL.createObjectURL(f);
    $("#imgPreview",panel).innerHTML=`<img src="${url}" alt="Lésion importée" style="max-width:100%;border-radius:10px;border:1px solid var(--line)">`;
  });
};

/* ===================================================================
   APPRENTISSAGE (fiches / flashcards / QCM / cas cliniques)
   =================================================================== */
function RENDER_apprentissage(panel){
  panel.innerHTML = `
    <div class="section-title"><h2 style="color:var(--violet)">🎓 Mode apprentissage</h2></div>
    <div class="app-sub">
      <button class="chip active" data-app="cas">🩺 Cas cliniques</button>
      <button class="chip" data-app="qcm">❓ QCM</button>
      <button class="chip" data-app="flash">🃏 Flashcards</button>
      <button class="chip" data-app="fiches">📑 Fiches synthétiques</button>
    </div>
    <div id="appContent"></div>`;
  const content = $("#appContent",panel);
  const draw = mode =>{
    if(mode==="cas") content.innerHTML = casHTML();
    else if(mode==="qcm"){ content.innerHTML = qcmHTML(); bindQcm(content); }
    else if(mode==="flash") content.innerHTML = flashHTML();
    else content.innerHTML = fichesHTML();
  };
  panel.addEventListener("click",e=>{
    const b=e.target.closest("[data-app]"); if(!b)return;
    $$(".chip",panel).forEach(x=>x.classList.remove("active"));
    b.classList.add("active"); draw(b.dataset.app);
  });
  draw("cas");
};
function casHTML(){
  return `<p class="lead">8 cas cliniques. Chaque cas propose : description, diagnostic, différentiels, conduite à tenir, ordonnance, red flags, conseil patient.</p>` +
    CAS_CLINIQUES.map((c,i)=>`
    <div class="qcm-q">
      <h4>Cas ${i+1} — ${esc(c.titre)}</h4>
      <p>${esc(c.enonce)}</p>
      ${c.qr.map((qr,j)=>`<details class="cas-q"><summary>Q${j+1} — ${esc(qr[0])}</summary>
        <div class="note note-violet" style="margin:6px 0">${esc(qr[1])}</div></details>`).join("")}
      ${c.pathoId?`<button class="btn btn-sm btn-blue" data-open="${c.pathoId}">📄 Fiche : ${esc((byId(c.pathoId)||{}).nom||"")}</button>`:""}
    </div>`).join("");
}
function qcmHTML(){
  return `<p class="lead">${QCM.length} questions. Cliquez sur une réponse pour la corriger et afficher l'explication.</p>` +
    QCM.map((q,i)=>`
    <div class="qcm-q" data-qi="${i}">
      <h4>${i+1}. ${esc(q.q)}</h4>
      ${q.options.map((o,j)=>`<button class="qcm-opt" data-qi="${i}" data-oi="${j}">${esc(o)}</button>`).join("")}
      <div class="qcm-expl" hidden></div>
    </div>`).join("");
}
function bindQcm(root){
  root.addEventListener("click",e=>{
    const b=e.target.closest(".qcm-opt"); if(!b)return;
    const qi=+b.dataset.qi, oi=+b.dataset.oi, q=QCM[qi];
    const box=root.querySelector(`.qcm-q[data-qi="${qi}"]`);
    if(box.dataset.done) return;
    box.dataset.done="1";
    $$(".qcm-opt",box).forEach(opt=>{
      const j=+opt.dataset.oi;
      if(j===q.bonne) opt.classList.add("good");
      else if(j===oi) opt.classList.add("bad");
      opt.disabled=true;
    });
    const expl=$(".qcm-expl",box);
    expl.hidden=false;
    expl.innerHTML=`<b>${oi===q.bonne?"✅ Bonne réponse.":"❌ Réponse incorrecte."}</b> ${esc(q.expl)}`;
  });
}
function flashHTML(){
  return `<p class="lead">${FLASHCARDS.length} flashcards. Cliquez sur une carte pour la retourner.</p>
    <div class="grid grid-3">${FLASHCARDS.map((f,i)=>`
      <div class="flash" data-flash="${i}"><div class="flash-in">
        <div><small>Question</small>${esc(f.recto)}</div></div></div>`).join("")}</div>`;
}
function fichesHTML(){
  return `<p class="lead">Fiches synthétiques (éléments clés) pour réviser rapidement. Cliquez pour ouvrir la fiche complète.</p>` +
    PATHOLOGIES.map(p=>`<details class="acc"><summary>${esc(p.nom)} ${badge(p.niveau)}</summary>
      <div class="acc-in">${list((p.elements_cles||[]).slice(0,4))}
        <button class="btn btn-sm btn-blue" data-open="${p.id}" style="margin-top:6px">Ouvrir la fiche ›</button></div></details>`).join("");
}

/* ===================================================================
   AIDE VISUELLE — schémas SVG originaux (lésions élémentaires + dermato)
   =================================================================== */
/* -- coupe de peau (vue latérale) -- */
const SKIN =
  '<rect width="200" height="130" fill="#fff8f1"/>' +
  '<rect y="42" width="200" height="22" fill="#f2d6bf"/>' +      /* épiderme */
  '<rect y="64" width="200" height="48" fill="#e7bfa6"/>' +      /* derme */
  '<rect y="112" width="200" height="18" fill="#f7ead4"/>' +     /* hypoderme */
  '<line x1="0" y1="42" x2="200" y2="42" stroke="#c69a7c" stroke-width="1.5"/>';
function elemSVG(inner){
  return `<svg viewBox="0 0 200 130" class="lez" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img">${SKIN}${inner}</svg>`;
}
const SVG_ELEM = {
  macule:  ()=>elemSVG('<ellipse cx="100" cy="53" rx="44" ry="9" fill="#8a5a3c" opacity="0.5"/>'),
  papule:  ()=>elemSVG('<path d="M74 42 Q100 14 126 42 Z" fill="#d59873" stroke="#b9774f" stroke-width="1.5"/>'),
  plaque:  ()=>elemSVG('<path d="M48 42 Q50 22 70 22 L130 22 Q150 22 152 42 Z" fill="#d59873" stroke="#b9774f" stroke-width="1.5"/>'),
  nodule:  ()=>elemSVG('<path d="M62 42 Q62 98 100 98 Q138 98 138 42 Z" fill="#cf8f6f" stroke="#b9774f" stroke-width="1.5"/>'),
  vesicule:()=>elemSVG('<path d="M80 42 Q100 16 120 42 Z" fill="#dff1f7" stroke="#7fb3c4" stroke-width="1.5"/><ellipse cx="100" cy="33" rx="6" ry="3.5" fill="#ffffff" opacity="0.7"/>'),
  bulle:   ()=>elemSVG('<path d="M58 42 Q100 6 142 42 Z" fill="#dff1f7" stroke="#7fb3c4" stroke-width="1.5"/><ellipse cx="100" cy="28" rx="9" ry="5" fill="#ffffff" opacity="0.6"/>'),
  pustule: ()=>elemSVG('<path d="M80 42 Q100 16 120 42 Z" fill="#f3e6c2" stroke="#caa15a" stroke-width="1.5"/><ellipse cx="100" cy="31" rx="9" ry="6" fill="#e8c45f"/>'),
  oedeme:  ()=>elemSVG('<path d="M52 42 Q54 24 100 24 Q146 24 148 42 Z" fill="#f3c9d2" stroke="#dd9aa8" stroke-width="1.5" opacity="0.85"/><path d="M40 20 l-8 0 m4 -4 l-4 4 4 4" stroke="#c0392b" stroke-width="1.5" fill="none"/><path d="M160 20 l8 0 m-4 -4 l4 4 -4 4" stroke="#c0392b" stroke-width="1.5" fill="none"/>'),
  squame:  ()=>elemSVG('<g fill="#f4ead7" stroke="#cdb38f" stroke-width="1">'+
                 '<path d="M68 42 l14 -7 l5 7 z"/><path d="M88 42 l13 -8 l5 8 z"/><path d="M108 42 l13 -6 l5 6 z"/><path d="M126 42 l12 -8 l5 8 z"/></g>'),
  croute:  ()=>elemSVG('<path d="M70 42 Q76 24 92 30 Q104 20 116 30 Q132 24 134 42 Z" fill="#a9682f" stroke="#7d4a20" stroke-width="1.2"/><path d="M86 34 q6 4 12 0 m4 2 q6 3 10 -1" stroke="#7d4a20" stroke-width="1" fill="none"/>'),
  erosion: ()=>elemSVG('<path d="M72 42 Q100 60 128 42 Z" fill="#e7bfa6"/><path d="M72 42 Q100 60 128 42" fill="none" stroke="#d98c7a" stroke-width="2.5"/>'),
  ulceration:()=>elemSVG('<path d="M74 42 Q100 104 126 42 Z" fill="#e7bfa6"/><path d="M74 42 Q100 104 126 42" fill="none" stroke="#b3261e" stroke-width="2.5"/><path d="M84 56 q16 10 32 0" stroke="#b3261e" stroke-width="1" fill="none" opacity="0.6"/>'),
  atrophie:()=>elemSVG('<rect x="60" y="51" width="80" height="11" fill="#f7e6d6"/><path d="M60 42 Q100 51 140 42" fill="none" stroke="#c69a7c" stroke-width="1.5"/><path d="M70 47 h60 M74 49 h52" stroke="#d8b79c" stroke-width="0.8"/>'),
  lichen:  ()=>elemSVG('<rect x="58" y="28" width="84" height="14" rx="2" fill="#c79a78" stroke="#a9774f" stroke-width="1.2"/><path d="M70 28 v14 M86 28 v14 M102 28 v14 M118 28 v14 M130 28 v14 M58 35 h84" stroke="#8a5e3c" stroke-width="0.8"/>'),
  fissure: ()=>elemSVG('<path d="M100 42 L96 82 L100 86 L104 82 Z" fill="#7d4a20"/><path d="M100 42 L96 82" stroke="#5e3414" stroke-width="0.6"/>')
};

/* -- champ dermatoscopique (vue de dessus) -- */
function dermoSVG(id, inner, bg){
  return `<svg viewBox="0 0 200 150" class="lez" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img">`+
    `<defs><clipPath id="dc_${id}"><circle cx="100" cy="73" r="62"/></clipPath></defs>`+
    `<circle cx="100" cy="73" r="64" fill="${bg||'#d9a684'}"/>`+
    `<g clip-path="url(#dc_${id})">${inner}</g>`+
    `<circle cx="100" cy="73" r="62" fill="none" stroke="#3a3a3a" stroke-width="3"/>`+
    `</svg>`;
}
function grid(reg){
  let s='';
  const x0=42,x1=158,y0=14,y1=132;
  for(let i=0;i<=8;i++){
    const x=x0+(x1-x0)*i/8;
    const w=reg?1.4:(1+ (i%3)*1.3);
    const op=reg?0.7:(0.5+(i%2)*0.4);
    const dash=reg?'':(i%2? '6 4':'');
    s+=`<line x1="${x}" y1="${y0}" x2="${x+(reg?0:(i%2?6:-5))}" y2="${y1}" stroke="#6b4226" stroke-width="${w}" opacity="${op}" stroke-dasharray="${dash}"/>`;
  }
  for(let j=0;j<=8;j++){
    const y=y0+(y1-y0)*j/8;
    const w=reg?1.4:(1+(j%3)*1.2);
    const op=reg?0.7:(0.5+(j%2)*0.4);
    const dash=reg?'':(j%2?'5 5':'');
    s+=`<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y+(reg?0:(j%2?5:-4))}" stroke="#6b4226" stroke-width="${w}" opacity="${op}" stroke-dasharray="${dash}"/>`;
  }
  return s;
}
function dots(reg){
  let s='';
  const pts = reg
    ? [[80,55],[100,55],[120,55],[80,75],[100,75],[120,75],[80,95],[100,95],[120,95]]
    : [[70,48],[96,52],[128,46],[150,72],[58,70],[84,80],[112,88],[140,98],[74,108],[120,116],[100,72]];
  pts.forEach((p,i)=>{
    const r = reg?5:(3+ (i%4)*2);
    s+=`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="#5a3318"/>`;
  });
  return s;
}
const SVG_DERMO = {
  reseau_typique: ()=>dermoSVG('rt', grid(true), '#d9a684'),
  reseau_atypique:()=>dermoSVG('ra', grid(false)+'<ellipse cx="120" cy="92" rx="26" ry="20" fill="#3b2414" opacity="0.45"/>', '#d3a07e'),
  points_globules:()=>dermoSVG('pg', dots(false), '#d9a684'),
  stries: ()=>dermoSVG('st', (function(){
      let s='<ellipse cx="100" cy="73" rx="34" ry="30" fill="#7a4a28" opacity="0.55"/>';
      const ang=[0,32,60,95,130,160,200,235,270,305,335];
      ang.forEach((a,i)=>{ const r1=30,r2=52+(i%3)*7; const t=a*Math.PI/180;
        const x1=100+r1*Math.cos(t),y1=73+r1*Math.sin(t),x2=100+r2*Math.cos(t),y2=73+r2*Math.sin(t);
        s+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#4a2a12" stroke-width="${3+(i%2)*2}"/>`;
        if(i%2) s+=`<circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="4" fill="#4a2a12"/>`; });
      return s; })(), '#d9a684'),
  voile: ()=>dermoSVG('vo', grid(false)+'<ellipse cx="106" cy="82" rx="44" ry="34" fill="#5b7fa6" opacity="0.5"/><ellipse cx="92" cy="64" rx="18" ry="12" fill="#eef3f8" opacity="0.55"/>', '#caa07e'),
  regression: ()=>dermoSVG('rg', (function(){
      let s='<ellipse cx="100" cy="73" rx="46" ry="36" fill="#efeae3" opacity="0.92"/>';
      for(let i=0;i<60;i++){ const a=i*47%360, r=10+ (i*7%44); const t=a*Math.PI/180;
        s+=`<circle cx="${(100+r*Math.cos(t)).toFixed(1)}" cy="${(73+r*Math.sin(t)).toFixed(1)}" r="1.4" fill="#6b7480"/>`; }
      return s; })(), '#d9a684'),
  telangiectasies: ()=>dermoSVG('te',
      '<path d="M44 120 Q80 92 104 78 Q128 64 158 40" stroke="#c0392b" stroke-width="3" fill="none"/>'+
      '<path d="M104 78 Q116 86 138 92" stroke="#c0392b" stroke-width="2.2" fill="none"/>'+
      '<path d="M104 78 Q98 96 110 116" stroke="#c0392b" stroke-width="2" fill="none"/>'+
      '<path d="M80 92 Q70 100 50 102" stroke="#c0392b" stroke-width="1.8" fill="none"/>'+
      '<path d="M128 64 Q140 58 150 64" stroke="#c0392b" stroke-width="1.6" fill="none"/>', '#e9c0aa'),
  nids: ()=>dermoSVG('nd',
      '<path d="M60 60 q-12 14 2 26 q16 6 20 -10 q2 -18 -22 -16 z" fill="#4a5a78"/>'+
      '<path d="M140 64 q14 12 2 28 q-16 8 -22 -8 q-2 -18 20 -20 z" fill="#566a8a"/>'+
      '<ellipse cx="100" cy="104" rx="16" ry="11" fill="#4a5a78"/>'+
      '<ellipse cx="104" cy="52" rx="12" ry="9" fill="#5d7193"/>', '#caa07e'),
  glomerulaires: ()=>dermoSVG('gl', (function(){
      let s='';
      const cl=[[78,58],[112,62],[92,92],[128,96],[64,96]];
      cl.forEach((c,i)=>{ for(let k=0;k<4;k++){ const a=k*90+i*20; const t=a*Math.PI/180;
        s+=`<circle cx="${(c[0]+5*Math.cos(t)).toFixed(1)}" cy="${(c[1]+5*Math.sin(t)).toFixed(1)}" r="3.2" fill="#c0392b"/>`; } });
      return s; })(), '#e3b89e'),
  comedons: ()=>dermoSVG('cm', (function(){
      let s='';
      const black=[[72,56],[110,50],[140,80],[88,96],[122,108]];
      const white=[[96,72],[128,64],[64,90],[112,90]];
      black.forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="#2a1a0e"/>`);
      white.forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#f4ecd8" stroke="#d8c39a" stroke-width="1"/>`);
      return s; })(), '#b07a4a')
};

function svgFor(item){
  return (SVG_ELEM[item.svg] || SVG_DERMO[item.svg] || (()=> '<div class="muted">schéma indisponible</div>'))();
}

/* -- photos personnelles (importées par l'utilisateur, stockées localement) -- */
/* images intégrées par défaut (générées dans photos.js) ; l'import utilisateur prime */
const DEFAULT_PHOTOS = (typeof window !== "undefined" && window.DERMATO_PHOTOS) || {};
const PHOTOS = Object.create(null);
function photoKey(id){ return "dmg_photo_"+id; }
function getPhoto(id){
  if(id in PHOTOS) return PHOTOS[id];
  let v=null; try{ v=localStorage.getItem(photoKey(id)); }catch(e){}
  if(!v && DEFAULT_PHOTOS[id]) v=DEFAULT_PHOTOS[id];
  PHOTOS[id]=v||null; return PHOTOS[id];
}
function setPhoto(id,dataURL){
  PHOTOS[id]=dataURL;
  try{ localStorage.setItem(photoKey(id),dataURL); }catch(e){/* quota / file:// : reste en mémoire */}
}
function delPhoto(id){
  delete PHOTOS[id];            /* re-évalue (revient à l'image par défaut si elle existe) */
  try{ localStorage.removeItem(photoKey(id)); }catch(e){}
}
function userHasOverride(id){
  try{ return !!localStorage.getItem(photoKey(id)); }catch(e){ return false; }
}
function importPhoto(id,file,cb){
  const reader=new FileReader();
  reader.onload=()=>{
    const img=new Image();
    img.onload=()=>{
      try{
        const max=720, sc=Math.min(1,max/Math.max(img.width,img.height));
        const c=document.createElement("canvas");
        c.width=Math.max(1,Math.round(img.width*sc)); c.height=Math.max(1,Math.round(img.height*sc));
        c.getContext("2d").drawImage(img,0,0,c.width,c.height);
        setPhoto(id,c.toDataURL("image/jpeg",0.82));
      }catch(e){ setPhoto(id,reader.result); }
      cb&&cb();
    };
    img.onerror=()=>{ setPhoto(id,reader.result); cb&&cb(); };
    img.src=reader.result;
  };
  reader.readAsDataURL(file);
}
function photoCell(it,big){
  const p=getPhoto(it.id);
  if(p) return `<div class="lez-photo${big?' big':''}"><img src="${p}" alt="Photo : ${esc(it.nom)}"></div>`;
  return `<div class="lez-photo empty-photo${big?' big':''}"><span>📷<br>photo<br>à ajouter</span></div>`;
}

/* requêtes (en anglais : meilleurs résultats d'images) pour les atlas en accès libre */
const ATLAS_Q = {
  macule:"skin macule", papule:"skin papule", plaque:"skin plaque dermatology",
  nodule:"skin nodule", vesicule:"skin vesicle", bulle:"skin bulla blister",
  pustule:"skin pustule", papule_oedemateuse:"urticaria wheal hives",
  squame:"skin scale desquamation", croute:"skin crust impetigo",
  erosion:"skin erosion", ulceration:"skin ulcer", atrophie:"skin atrophy",
  lichenification:"lichenification skin", fissure:"skin fissure",
  reseau_typique:"dermoscopy pigment network nevus",
  reseau_atypique:"dermoscopy atypical pigment network melanoma",
  points_globules:"dermoscopy dots globules",
  stries:"dermoscopy streaks pseudopods melanoma",
  voile_bleu_blanc:"dermoscopy blue white veil",
  regression:"dermoscopy regression structures melanoma",
  telangiectasies:"dermoscopy arborizing vessels basal cell carcinoma",
  nids_bleu_gris:"dermoscopy blue gray ovoid nests basal cell carcinoma",
  vaisseaux_glomerulaires:"dermoscopy glomerular vessels bowen",
  comedons_milia:"dermoscopy seborrheic keratosis comedo milia"
};
function atlasLinks(it){
  const q = encodeURIComponent(ATLAS_Q[it.id] || it.nom);
  const commons = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${q}`;
  const dermnet = `https://dermnetnz.org/search?q=${q}`;
  return `<div class="note note-blue" style="margin-top:10px">
    <b>📷 Voir des photos réelles (accès libre — ouvre un nouvel onglet) :</b>
    <div class="atlas-links">
      <a href="${commons}" target="_blank" rel="noopener">Images libres · Wikimedia Commons ↗</a>
      <a href="${dermnet}" target="_blank" rel="noopener">Atlas DermNet (anglais) ↗</a>
    </div>
    <small class="muted">Les photos ne sont pas hébergées dans l'application (respect du droit d'auteur) : elles sont consultées sur des ressources externes en accès libre. Nécessite une connexion internet.</small>
  </div>`;
}

function RENDER_visuel(panel){
  const card = (it, kind) => `<button class="card lez-card" data-lesion="${kind}:${it.id}">
      <div class="lez-duo"><div class="lez-wrap">${svgFor(it)}</div>${photoCell(it)}</div>
      <div class="card-row">${typeof it.alerte==='number'?badge(it.alerte):''}<h3>${esc(it.nom)}</h3></div>
      <p>${esc((it.groupe||(it.exemples&&it.exemples[0]))||'')}</p>
    </button>`;
  const prim = LESIONS_ELEMENTAIRES.filter(l=>l.groupe==="Lésion primitive");
  const seco = LESIONS_ELEMENTAIRES.filter(l=>l.groupe==="Lésion secondaire");
  panel.innerHTML = `
    <div class="section-title"><h2>🖼️ Aide visuelle</h2></div>
    <p class="lead">Schémas pédagogiques originaux des lésions élémentaires (vue en coupe de la peau) et des principales structures dermatoscopiques. Cliquez sur un schéma pour le détail.</p>
    <div class="note note-orange">${esc(AIDE_VISUELLE_NOTE)}</div>
    <div class="note note-blue">📷 À côté de chaque schéma, vous pouvez <b>importer votre propre photo</b> (dont vous détenez les droits) : ouvrez une lésion puis « Importer une photo ». Elle s'affiche à côté du dessin et reste <b>enregistrée dans votre navigateur</b> (aucun envoi). Pour trouver des images, chaque fiche propose aussi des liens vers des <b>atlas en accès libre</b> (Wikimedia Commons, DermNet) — les images ne sont pas copiées dans l'app, pour respecter le droit d'auteur.</div>

    <h3 style="margin:16px 0 8px">Lésions élémentaires — primitives</h3>
    <div class="grid grid-3">${prim.map(l=>card(l,"e")).join("")}</div>

    <h3 style="margin:18px 0 8px">Lésions élémentaires — secondaires</h3>
    <div class="grid grid-3">${seco.map(l=>card(l,"e")).join("")}</div>

    <h3 style="margin:18px 0 8px">Structures dermatoscopiques</h3>
    <div class="grid grid-3">${LESIONS_DERMATO.map(l=>card(l,"d")).join("")}</div>`;
}
function refreshVisuelPanel(){
  const p=$('.panel[data-panel="visuel"]');
  if(p && p.dataset.rendered) RENDER_visuel(p);
}
function openLesion(key){
  const [kind,id] = key.split(":");
  const arr = kind==="d" ? LESIONS_DERMATO : LESIONS_ELEMENTAIRES;
  const it = arr.find(x=>x.id===id); if(!it) return;
  const hasPhoto = !!getPhoto(it.id);
  const ownPhoto = userHasOverride(it.id);
  const body = `
    <div class="lez-modal-duo">
      <div><div class="lez-cap">Schéma</div><div class="schema">${svgFor(it)}</div></div>
      <div><div class="lez-cap">Photo réelle</div>${photoCell(it,true)}</div>
    </div>
    <div class="fiche-actions">
      <label class="btn btn-sm btn-blue">📷 ${hasPhoto?'Remplacer la photo':'Importer une photo'}
        <input type="file" accept="image/*" id="lezPhotoInput" hidden></label>
      ${ownPhoto?'<button class="btn btn-sm" id="lezPhotoDel" type="button">🗑️ Supprimer ma photo</button>':''}
    </div>
    <small class="muted">Importez une photo dont vous détenez les droits. Elle est enregistrée uniquement dans votre navigateur (aucun envoi sur internet) et reste privée.</small>
    ${(typeof it.alerte==='number')?`<p style="margin-top:10px">${badge(it.alerte)} ${it.alerte===2?'Structure suspecte (signe de malignité)':it.alerte===1?'À interpréter selon le contexte':'Aspect plutôt rassurant'}</p>`:`<p class="fiche-cat" style="margin-top:10px">${esc(it.groupe||'')}</p>`}
    <div class="note note-blue">${esc(it.definition)}</div>
    <h3 style="margin:12px 0 6px">Exemples / contextes</h3>
    ${list(it.exemples)}
    ${atlasLinks(it)}
    <div class="src-line">${esc(AIDE_VISUELLE_NOTE)}</div>`;
  openModal(it.nom, body);
  const inp=$("#lezPhotoInput");
  if(inp) inp.addEventListener("change",e=>{
    const f=e.target.files&&e.target.files[0]; if(!f) return;
    importPhoto(it.id,f,()=>{ openLesion(key); refreshVisuelPanel(); });
  });
  const del=$("#lezPhotoDel");
  if(del) del.addEventListener("click",()=>{ delPhoto(it.id); openLesion(key); refreshVisuelPanel(); });
}

/* ===================================================================
   ALERTES TERRAIN
   =================================================================== */
function terrainAlertHTML(){
  if(!state.terrains.size) return "";
  const active = TERRAINS.filter(t=>state.terrains.has(t.id));
  return `<div class="note note-orange">
    <b>⚠️ Terrain coché — précautions :</b>
    <ul>${active.map(t=>`<li><b>${esc(t.label)} :</b> ${esc(t.msg)}</li>`).join("")}</ul>
  </div>`;
}
function renderTerrainPanel(){
  $("#terrainList").innerHTML = TERRAINS.map(t=>`
    <label class="terrain-item ${state.terrains.has(t.id)?'on':''}">
      <input type="checkbox" data-terrain="${t.id}" ${state.terrains.has(t.id)?'checked':''}>
      <span><b>${t.icon} ${esc(t.label)}</b><small>${esc(t.msg)}</small></span>
    </label>`).join("");
}
function updateTerrainBanner(){
  const banner=$("#terrainBanner");
  const btn=$("#terrainBtn");
  if(!state.terrains.size){ banner.hidden=true; btn.classList.remove("on"); btn.textContent="⚠️ Terrain"; return; }
  const active=TERRAINS.filter(t=>state.terrains.has(t.id));
  banner.hidden=false;
  banner.innerHTML=`<b>Terrain actif :</b> ${active.map(t=>esc(t.label)).join(", ")}.
    <ul>${active.map(t=>`<li>${esc(t.msg)}</li>`).join("")}</ul>`;
  btn.classList.add("on"); btn.textContent=`⚠️ Terrain (${state.terrains.size})`;
  // rafraîchir une fiche/panneau ouvert
  const open=$("#modal"); if(!open.hidden){ /* laissé tel quel, ré-ouverture si besoin */ }
}

/* ===================================================================
   MODALE générique
   =================================================================== */
let lastFocus=null;
function openModal(title, html){
  $("#modalTitle").textContent=title;
  $("#modalBody").innerHTML=html;
  $("#modal").hidden=false;
  document.body.style.overflow="hidden";
  $("#modalBody").scrollTop=0;
}
function closeModal(){ $("#modal").hidden=true; document.body.style.overflow=""; }

/* ===================================================================
   RENDER registry (déclaré tardivement -> on map les fonctions)
   =================================================================== */
const RENDER = {
  recherche:RENDER_recherche, symptome:RENDER_symptome, localisation:RENDER_localisation,
  pathologies:RENDER_pathologies, urgences:RENDER_urgences, differentiel:RENDER_differentiel,
  ordonnances:RENDER_ordonnances, conseils:RENDER_conseils, medicaments:RENDER_medicaments,
  dermatoscopie:RENDER_dermatoscopie, visuel:RENDER_visuel, image:RENDER_image,
  apprentissage:RENDER_apprentissage
};

/* ===================================================================
   ÉVÉNEMENTS GLOBAUX
   =================================================================== */
function init(){
  // onglets
  $("#tabs").addEventListener("click",e=>{
    const b=e.target.closest(".tab"); if(!b)return; showTab(b.dataset.tab);
  });
  $(".brand").addEventListener("click",e=>{ e.preventDefault(); showTab("recherche"); });

  // recherche globale -> bascule sur l'onglet recherche
  const gs=$("#globalSearch");
  gs.addEventListener("input",()=>{
    if(state.tab!=="recherche") showTab("recherche");
    const panel=$(`.panel[data-panel="recherche"]`);
    if(panel && panel._draw) panel._draw();
  });
  gs.addEventListener("focus",()=>{ if(state.tab!=="recherche") showTab("recherche"); });

  // délégation : ouvrir fiche / ordo / conseil / med / flashcard
  document.body.addEventListener("click",e=>{
    const o=e.target.closest("[data-open]"); if(o){ openFiche(o.dataset.open); return; }
    const od=e.target.closest("[data-ordo]"); if(od){ openOrdo(od.dataset.ordo); return; }
    const co=e.target.closest("[data-conseil]"); if(co){ openConseil(co.dataset.conseil); return; }
    const me=e.target.closest("[data-med]"); if(me){ openMed(+me.dataset.med); return; }
    const lz=e.target.closest("[data-lesion]"); if(lz){ openLesion(lz.dataset.lesion); return; }
    const fl=e.target.closest("[data-flash]"); if(fl){ flipFlash(fl); return; }
  });

  // fermeture modale
  $("#modal").addEventListener("click",e=>{ if(e.target.closest("[data-close]")) closeModal(); });
  $("#modalPrint").addEventListener("click",()=>window.print());
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){ closeModal(); closeTerrain(); }
  });

  // terrain
  $("#terrainBtn").addEventListener("click",()=>{ renderTerrainPanel(); $("#terrainPanel").hidden=false; document.body.style.overflow="hidden"; });
  $("#terrainPanel").addEventListener("click",e=>{ if(e.target.closest("[data-close-terrain]")) closeTerrain(); });
  $("#terrainList").addEventListener("change",e=>{
    const cb=e.target.closest("[data-terrain]"); if(!cb)return;
    if(cb.checked) state.terrains.add(cb.dataset.terrain); else state.terrains.delete(cb.dataset.terrain);
    cb.closest(".terrain-item").classList.toggle("on",cb.checked);
    updateTerrainBanner();
    // re-render panneaux dépendants du terrain
    ["medicaments"].forEach(t=>{ const p=$(`.panel[data-panel="${t}"]`); if(p&&p.dataset.rendered){ delete p.dataset.rendered; if(state.tab===t) showTab(t);} });
  });

  showTab("recherche");
}
function closeTerrain(){ $("#terrainPanel").hidden=true; if($("#modal").hidden) document.body.style.overflow=""; }
function flipFlash(el){
  const i=+el.dataset.flash, f=FLASHCARDS[i];
  el.classList.toggle("flip");
  const inner=$(".flash-in",el);
  inner.innerHTML = el.classList.contains("flip")
    ? `<div><small style="color:var(--green)">Réponse</small>${esc(f.verso)}</div>`
    : `<div><small>Question</small>${esc(f.recto)}</div>`;
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
else init();

})();
