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
       DERMATOSCOPIE, ANALYSE_IMAGE, SOURCES, NIVEAUX} = DB;

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
   SOURCES
   =================================================================== */
function RENDER_sources(panel){
  const s=SOURCES;
  panel.innerHTML = `
    <div class="section-title"><h2>Références / Sources</h2></div>
    <div class="note note-blue">
      <b>Source principale : <a href="${esc(s.principale.url)}" target="_blank" rel="noopener">${esc(s.principale.nom)}</a></b><br>
      <a href="${esc(s.principale.url)}" target="_blank" rel="noopener">${esc(s.principale.url)}</a>
      <p style="margin:.5em 0 0">${esc(s.principale.desc)}</p>
    </div>
    <div class="note note-orange">${esc(s.note)}</div>
    <h3 style="margin:16px 0 8px">Autres références</h3>
    ${list(s.autres)}
    <div class="note note-green" style="margin-top:16px">
      <b>Respect des sources et du droit d'auteur.</b> Les contenus sont reformulés à partir des recommandations et arbres décisionnels (Dermatoclic, HAS, sociétés savantes). Aucun texte protégé n'est reproduit intégralement et aucune image source protégée n'est copiée ; les schémas éventuels sont originaux et pédagogiques.
    </div>`;
};

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
  dermatoscopie:RENDER_dermatoscopie, image:RENDER_image, apprentissage:RENDER_apprentissage,
  sources:RENDER_sources
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
