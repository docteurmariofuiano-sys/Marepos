/* =====================================================================
   CERTIMED — logique (vanilla JS, hors-ligne)
   Dépend de data.js (TEXTES, REGLES_OR, CATS, STATUTS, CERTIFICATS).
   Aucune donnée patient n'est stockée. Seule l'identité du praticien
   peut être mémorisée localement (localStorage) sur action volontaire.
   ===================================================================== */
'use strict';

const $  = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));
const norm = t => String(t||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const esc = t => String(t==null?'':t).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

const TEXTE_MAP = Object.fromEntries(TEXTES.map(t=>[t.id,t]));
const LS_KEY = 'certimed_praticien_v1';

let etat = { q:'', cat:'tous', selId:null };

/* ---------- Identité praticien (localStorage, opt-in) ---------- */
const ID_FIELDS = ['medecin','qualite','rpps','adresse','ville'];

function chargerIdentite(){
  let saved={};
  try{ saved = JSON.parse(localStorage.getItem(LS_KEY)||'{}'); }catch(e){}
  ID_FIELDS.forEach(f=>{ const el=$('#f_'+f); if(el && saved[f]) el.value=saved[f]; });
}
function sauverIdentite(){
  const data={};
  ID_FIELDS.forEach(f=>{ const el=$('#f_'+f); if(el) data[f]=el.value; });
  try{ localStorage.setItem(LS_KEY, JSON.stringify(data)); flash('#saveId','Identité mémorisée ✓'); }
  catch(e){ alert('Mémorisation impossible dans ce navigateur.'); }
}
function effacerIdentite(){
  try{ localStorage.removeItem(LS_KEY); }catch(e){}
  ID_FIELDS.forEach(f=>{ const el=$('#f_'+f); if(el) el.value=''; });
  flash('#saveId','Identité effacée');
}

/* ---------- Onglets ---------- */
function initTabs(){
  $$('.tab').forEach(b=>b.addEventListener('click',()=>{
    $$('.tab').forEach(x=>x.classList.remove('active'));
    $$('.panel').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    $('#panel-'+b.dataset.tab).classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  }));
}

/* ---------- Liste + filtres ---------- */
function initFiltres(){
  const cats = ['tous', ...Object.keys(CATS)];
  $('#chips').innerHTML = cats.map(c=>{
    const label = c==='tous' ? 'Tous' : (CATS[c].e+' '+CATS[c].t);
    return `<button class="chip${c==='tous'?' active':''}" data-cat="${c}">${esc(label)}</button>`;
  }).join('');
  $$('#chips .chip').forEach(b=>b.addEventListener('click',()=>{
    $$('#chips .chip').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    etat.cat=b.dataset.cat; rendreListe();
  }));
}

function correspond(c){
  if(etat.cat!=='tous' && c.cat!==etat.cat) return false;
  if(!etat.q) return true;
  const hay = [c.titre, c.resume, CATS[c.cat]?.t, (c.bases||[]).map(b=>TEXTE_MAP[b]?.ref).join(' ')].join(' ');
  return norm(hay).includes(norm(etat.q));
}

function rendreListe(){
  const arr = CERTIFICATS.filter(correspond);
  const host = $('#list');
  if(!arr.length){ host.innerHTML = `<div class="empty"><strong>Aucun certificat ne correspond.</strong><br>Essayez un autre mot-clé ou une autre catégorie.</div>`; return; }
  host.innerHTML = arr.map(c=>{
    const st = STATUTS[c.statut]||STATUTS['usuel'];
    const cat = CATS[c.cat];
    return `<div class="item${c.id===etat.selId?' active':''}" data-id="${c.id}" style="border-left-color:${st.c}" tabindex="0" role="button">
      <h3>${esc(c.titre)}</h3>
      <div class="meta">
        <span class="badge" style="color:${st.c};background:${st.bg}">${esc(st.t)}</span>
        <span class="cat-tag">${esc(cat.e+' '+cat.t)}</span>
      </div>
    </div>`;
  }).join('');
  $$('#list .item').forEach(el=>{
    const open=()=>selectionner(el.dataset.id);
    el.addEventListener('click',open);
    el.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();open();} });
  });
  $('#count').textContent = `${arr.length} certificat${arr.length>1?'s':''}`;
}

/* ---------- Détail + générateur ---------- */
function basesHTML(ids){
  return (ids||[]).map(id=>{
    const t = TEXTE_MAP[id]; if(!t) return '';
    return `<div class="law">
      <div class="ref">${esc(t.ref)}</div>
      <div class="law-titre">${esc(t.titre)}</div>
      <p>${esc(t.texte)}</p>
      ${t.note?`<div class="note">⚠️ ${esc(t.note)}</div>`:''}
    </div>`;
  }).join('');
}

function statutCallout(c){
  if(c.statut==='interdit') return `<div class="callout red"><strong>⛔ Certificat interdit.</strong> Ce document ne doit pas être délivré. Voir les bases légales ci-dessous.</div>`;
  if(c.statut==='déconseillé') return `<div class="callout amber"><strong>⚠️ À manier avec une grande prudence.</strong> Lire attentivement les pièges avant toute rédaction.</div>`;
  if(c.statut==='encadré') return `<div class="callout amber"><strong>⚠️ Procédure strictement encadrée.</strong> Le respect des conditions légales conditionne la validité du certificat.</div>`;
  return '';
}

function selectionner(id){
  etat.selId=id;
  $$('#list .item').forEach(el=>el.classList.toggle('active', el.dataset.id===id));
  const c = CERTIFICATS.find(x=>x.id===id);
  if(!c) return;
  const st = STATUTS[c.statut]||STATUTS['usuel'];
  const interdit = (c.statut==='interdit'||c.statut==='déconseillé');

  const champs = champsDuModele(c.modele);
  const champsForm = interdit ? '' : `
    <div class="sec">
      <h4>🖊️ Générateur — champs spécifiques</h4>
      ${champs.length ? `<div class="gen-fields" id="genFields">
        ${champs.map(k=>`<div class="field"><label>${esc(libelleChamp(k))}</label><input data-k="${esc(k)}" type="text" placeholder="${esc(placeholderChamp(k))}"></div>`).join('')}
      </div>` : `<p class="muted">Ce modèle n'utilise que l'identité praticien/patient renseignée plus haut.</p>`}
    </div>`;

  const generateur = interdit ? '' : `
    <div class="sec">
      <h4>📄 Certificat généré <span class="muted" style="text-transform:none;letter-spacing:0">(éditable)</span></h4>
      <div class="model-wrap"><textarea class="model" id="model" spellcheck="false"></textarea></div>
      <div class="actions">
        <button class="btn primary" id="btnCopy">📋 Copier</button>
        <button class="btn" id="btnPrint">🖨️ Imprimer / PDF</button>
        <button class="btn" id="btnReset">↺ Régénérer</button>
      </div>
      <p class="muted" style="margin-top:9px">Relisez systématiquement : n'attestez que des faits personnellement constatés ; rapportez les dires du patient au conditionnel ; remettez en main propre.</p>
    </div>`;

  $('#detail').innerHTML = `
    <div class="d-head">
      <h2>${esc(c.titre)}</h2>
      <span class="badge" style="color:${st.c};background:${st.bg};align-self:flex-start">${esc(st.t)}</span>
    </div>
    <div class="d-resume">${esc(c.resume)}</div>
    ${statutCallout(c)}

    <div class="sec regles">
      <h4>✅ Règles de rédaction</h4>
      <ul>${(c.regles||[]).map(r=>`<li>${esc(r)}</li>`).join('')}</ul>
    </div>

    <div class="sec warn">
      <h4>⚠️ Pièges médico-légaux</h4>
      <ul>${(c.pieges||[]).map(r=>`<li>${esc(r)}</li>`).join('')}</ul>
    </div>

    <div class="sec">
      <h4>📌 Remise du certificat</h4>
      <p style="font-size:13.5px">${esc(c.remise||'—')}</p>
    </div>

    <div class="sec">
      <h4>⚖️ Bases légales</h4>
      ${basesHTML(c.bases)}
    </div>

    ${champsForm}
    ${generateur}
  `;

  if(!interdit){
    regenerer();
    $$('#genFields input').forEach(inp=>inp.addEventListener('input',regenerer));
    $('#btnCopy').addEventListener('click',copier);
    $('#btnPrint').addEventListener('click',imprimer);
    $('#btnReset').addEventListener('click',regenerer);
  }
  // scroll détail en vue sur mobile
  if(window.matchMedia('(max-width:920px)').matches){
    $('#detail').scrollIntoView({behavior:'smooth',block:'start'});
  }
}

/* ----- placeholders ----- */
function champsDuModele(modele){
  const set=new Set(); const re=/\{\{(\w+)\}\}/g; let m;
  while((m=re.exec(modele||''))){ set.add(m[1]); }
  // champs gérés par l'identité (en-tête) ou auto : on ne les met pas dans le form spécifique
  const auto = new Set(['medecin','qualite','rpps','adresse','ville','rppsLine','date']);
  return [...set].filter(k=>!auto.has(k));
}

const LIBELLES = {
  patient:'Patient — Nom Prénom', ddn:'Date de naissance', patientAdresse:'Adresse du patient',
  lieu:'Lieu de l\'examen / du constat', motif:'Motif / maladie', libre:'Texte libre',
  declarations:'Déclarations du patient (rapportées)', lesions:'Lésions constatées (description)',
  psy:'Retentissement psychologique', itt:'ITT (jours)', discipline:'Discipline sportive',
  totalePartielle:'Totale ou partielle', dateDebut:'Date de début', dateFin:'Date de fin',
  terme:'Terme estimé', dateHeureDeces:'Date / heure du décès', obstacle:'Obstacle médico-légal (oui/non)',
  biere:'Mise en bière immédiate (oui/non)', prelevements:'Prélèvements / don du corps',
  pile:'Prothèse à pile (oui/non)', alteration:'Type d\'altération des facultés', evolution:'Évolution prévisible',
  consequences:'Conséquences', mesure:'Mesure envisagée', audition:'Aptitude à l\'audition',
  troubles:'Troubles constatés', justification:'Justification des soins immédiats', peril:'Péril imminent (description)',
  motifTiers:'Motif d\'absence de tiers', circonstances:'Circonstances (ordre public/sûreté)',
  activite:'Activité visée', finalite:'Finalité du certificat', dateVoyage:'Date du voyage',
  duree:'Durée', objet:'Objet de la dispense'
};
const PLACEHS = {
  patient:'Nom Prénom', ddn:'JJ/MM/AAAA', itt:'ex. 5', discipline:'ex. football',
  totalePartielle:'totale / partielle', declarations:'« … » (au conditionnel)',
  lesions:'siège, type, taille, couleur, stade', obstacle:'non', biere:'non', pile:'non'
};
const libelleChamp = k => LIBELLES[k] || (k.charAt(0).toUpperCase()+k.slice(1));
const placeholderChamp = k => PLACEHS[k] || '';

function valeursCourantes(){
  const v={};
  ID_FIELDS.forEach(f=>{ v[f]=($('#f_'+f)?.value||'').trim(); });
  $$('#genFields input').forEach(inp=>{ v[inp.dataset.k]=inp.value.trim(); });
  v.date = v.date || dateDuJour();
  v.rppsLine = v.rpps ? `\nRPPS : ${v.rpps}` : '';
  return v;
}
function dateDuJour(){
  const d=new Date();
  return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
}
function remplir(modele,v){
  return (modele||'').replace(/\{\{(\w+)\}\}/g,(m,k)=>{
    const val=v[k];
    if(k==='rppsLine') return val||'';
    if(val) return val;
    return '[À COMPLÉTER : '+libelleChamp(k)+']';
  });
}
function regenerer(){
  const c = CERTIFICATS.find(x=>x.id===etat.selId); if(!c) return;
  const v = valeursCourantes();
  $('#model').value = remplir(c.modele, v);
}

function copier(){
  const ta=$('#model');
  ta.select();
  navigator.clipboard?.writeText(ta.value).then(
    ()=>flash('#btnCopy','Copié ✓'),
    ()=>{ document.execCommand('copy'); flash('#btnCopy','Copié ✓'); }
  );
}
function imprimer(){
  const txt = $('#model').value;
  let area = $('#printArea');
  if(!area){ area=document.createElement('div'); area.id='printArea'; document.body.appendChild(area); }
  area.textContent = txt;
  window.print();
}
function flash(sel,msg){
  const el=$(sel); if(!el) return;
  const prev=el.textContent; el.textContent=msg; el.classList.add('ok');
  setTimeout(()=>{ el.textContent=prev; el.classList.remove('ok'); },1600);
}

/* ---------- Onglet Règles d'or ---------- */
function rendreRegles(){
  $('#regles').innerHTML = REGLES_OR.map((r,i)=>`
    <div class="rule">
      <h3><span class="n">${i+1}</span><span>${esc(r.t)}</span></h3>
      <p>${esc(r.d)}</p>
    </div>`).join('');
}

/* ---------- Onglet Textes de loi ---------- */
function rendreTextes(){
  const host=$('#textes');
  const render = list => list.map(t=>`
    <div class="law-full">
      <div class="ref">${esc(t.ref)}</div>
      <div class="law-titre">${esc(t.titre)}</div>
      <p>${esc(t.texte)}</p>
      ${t.note?`<div class="note">⚠️ ${esc(t.note)}</div>`:''}
    </div>`).join('');
  host.innerHTML = render(TEXTES);

  $('#searchTextes').addEventListener('input',e=>{
    const q=norm(e.target.value);
    const f = TEXTES.filter(t=>norm([t.ref,t.titre,t.texte,(t.cle||[]).join(' ')].join(' ')).includes(q));
    host.innerHTML = f.length? render(f) : `<div class="empty"><strong>Aucun texte trouvé.</strong></div>`;
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded',()=>{
  $('#totalCert').textContent = CERTIFICATS.length;
  initTabs();
  initFiltres();
  rendreListe();
  rendreRegles();
  rendreTextes();
  chargerIdentite();

  $('#search').addEventListener('input',e=>{ etat.q=e.target.value; rendreListe(); });
  $('#saveId').addEventListener('click',sauverIdentite);
  $('#clearId').addEventListener('click',effacerIdentite);
  ID_FIELDS.forEach(f=>{
    const el=$('#f_'+f);
    if(el) el.addEventListener('input',()=>{ if(etat.selId && $('#model')) regenerer(); });
  });
});
