/* ============================================================
   NEURO-GP ASSIST — moteur applicatif
   Tout fonctionne localement, sans stockage par défaut.
   ============================================================ */
'use strict';

/* ---------- utilitaires ---------- */
const $  = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
const el = (t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
function toast(msg){let t=$('#toast');if(!t){t=el('div','toast');t.id='toast';document.body.appendChild(t);}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}
function copier(txt){navigator.clipboard?.writeText(txt).then(()=>toast('Copié dans le presse-papier'),()=>toast('Copie impossible'));}

/* ---------- navigation ---------- */
function go(vue){
  $$('.vue').forEach(v=>v.classList.remove('active'));
  $('#vue-'+vue)?.classList.add('active');
  $$('.nav-onglets button').forEach(b=>{const on=b.dataset.vue===vue;b.classList.toggle('actif',on);b.setAttribute('aria-current',on?'page':'false');});
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- mode rapide / pédago ---------- */
function setMode(m){
  document.body.classList.toggle('mode-rapide',m==='rapide');
  $$('.mode-toggle button').forEach(b=>b.classList.toggle('actif',b.dataset.mode===m));
}

/* =====================================================================
   MODULE 1 — AIDE CLINIQUE RAPIDE
   ===================================================================== */
function renderSymptomes(filtre=''){
  const g=$('#grille-symptomes');g.innerHTML='';
  const f=filtre.toLowerCase();
  Object.entries(FICHES).sort((a,b)=>a[1].lettre.localeCompare(b[1].lettre)).forEach(([id,fi])=>{
    if(f && !(fi.titre.toLowerCase().includes(f)||fi.sousTitre.toLowerCase().includes(f)))return;
    const c=el('div','carte-symptome'+(fi.urgence?' urg':''));
    c.innerHTML=`<div class="lettre">${fi.lettre}</div><div><h4>${fi.titre}</h4><span class="tag">${fi.sousTitre}</span></div>`;
    c.onclick=()=>ouvrirTriage(id);
    g.appendChild(c);
  });
}

/* ---------- moteur de triage ---------- */
let triageCible=null;
function ouvrirTriage(ficheId){
  triageCible=ficheId;
  const m=$('#modale-corps');
  m.innerHTML=`<div class="alerte bleu"><span class="ai">🛑</span><div><strong>Triage initial obligatoire.</strong> Répondez avant d'accéder à la fiche : l'outil commence toujours par les urgences.</div></div>
    <div id="triage-liste"></div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
      <button class="btn danger" id="t-valide">Valider le triage</button>
      <button class="btn gris" id="t-skip">Aucun critère → accéder à la fiche</button>
    </div>`;
  const liste=$('#triage-liste',m);
  TRIAGE.forEach(q=>{
    const row=el('div','check-row');
    row.style.cssText='background:#f7f9fd;border-radius:8px;padding:9px 11px;margin-bottom:6px';
    row.innerHTML=`<input type="checkbox" id="tq-${q.id}" data-crit="${q.critique}"><label for="tq-${q.id}" style="font-weight:600;cursor:pointer">${q.q}<br><span style="font-weight:400;color:var(--gris-doux);font-size:12px">${q.aide}</span></label>`;
    liste.appendChild(row);
  });
  $('#t-valide',m).onclick=evaluerTriage;
  $('#t-skip',m).onclick=()=>{fermerModale();ouvrirFiche(ficheId);};
  $('#modale-titre').textContent='Algorithme de triage neurologique';
  $('#modale').classList.add('ouvert');
}
function evaluerTriage(){
  const coches=$$('#triage-liste input:checked');
  const critique=coches.some(c=>c.dataset.crit==='true');
  if(coches.length){
    const m=$('#modale-corps');
    const labels=coches.map(c=>c.closest('.check-row').querySelector('label').childNodes[0].textContent.trim());
    const cls=critique?'urgence-max':'orange';
    const txt=critique
      ?`<strong>URGENCE NEUROLOGIQUE POTENTIELLE.</strong> Au moins un critère majeur est présent — contacter le 15 / SAMU ou adresser aux urgences selon le contexte avant toute autre démarche.`
      :`<strong>Vigilance.</strong> Critère(s) à risque relevé(s) : surveiller, réévaluer et abaisser le seuil d'orientation.`;
    m.querySelector('#triage-resultat')?.remove();
    const box=el('div','');box.id='triage-resultat';
    box.innerHTML=`<div class="alerte ${cls}" style="margin-top:14px"><span class="ai">${critique?'🚨':'⚠️'}</span><div>${txt}<ul style="margin:8px 0 0 16px">${labels.map(l=>'<li>'+l+'</li>').join('')}</ul></div></div>
      <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
        ${critique?'<button class="btn danger" id="t-courrier">Générer un courrier d\'urgence</button>':''}
        <button class="btn sec" id="t-continue">Consulter quand même la fiche</button>
      </div>`;
    m.appendChild(box);
    $('#t-continue',m).onclick=()=>{fermerModale();ouvrirFiche(triageCible);};
    const tc=$('#t-courrier',m);if(tc)tc.onclick=()=>{fermerModale();go('courrier');chargerCourrier(FICHES[triageCible].courrier||'neuro_urgent');};
    box.scrollIntoView({behavior:'smooth'});
  }else{
    fermerModale();ouvrirFiche(triageCible);
  }
}
function fermerModale(){
  $('#modale').classList.remove('ouvert','modale-video');
}

/* ---------- rendu de la fiche ---------- */
function bloc(num,titre,items,cls=''){
  const liStyle = cls==='rf'?'liste rf':'liste';
  return `<div class="bloc ${cls==='pedago'?'pedago':''}"><div class="bloc-titre"><span class="nb">${num}</span>${titre}</div>
    <ul class="${liStyle}">${items.map(i=>'<li>'+i+'</li>').join('')}</ul></div>`;
}
function ouvrirFiche(id){
  const fi=FICHES[id];if(!fi)return;
  go('aide');
  const v=$('#aide-detail');
  const orientHtml=fi.orientation.map(o=>`<span class="orient-tag ${o.type}">${o.texte}</span>`).join('');
  v.innerHTML=`
   <a class="btn-retour" id="retour-symptomes">← Retour aux motifs</a>
   <div class="fiche-entete"><h2>${fi.lettre} · ${fi.titre}</h2><p>${fi.sousTitre}</p></div>
   <div class="fiche-corps">
     ${fi.urgence?'<div class="alerte rouge"><span class="ai">⚠️</span><div><strong>Fiche à potentiel d\'urgence.</strong> Vérifiez les drapeaux rouges en priorité.</div></div>':''}
     ${bloc(1,'Interrogatoire ciblé',fi.interrogatoire)}
     ${bloc('!','Drapeaux rouges',fi.drapeauxRouges,'rf')}
     ${bloc(2,'Examen clinique minimal obligatoire',fi.examenMinimal)}
     ${bloc(3,'Examen neurologique orienté',fi.examenOriente,'pedago')}
     ${bloc(4,'Hypothèses diagnostiques',fi.hypotheses)}
     ${bloc(5,'Examens complémentaires à prescrire',fi.examens)}
     <div class="bloc"><div class="bloc-titre"><span class="nb">6</span>Orientation</div><div class="orientation">${orientHtml}</div></div>
     ${bloc(7,'Traitement initial éventuel (adapté au MG)',fi.traitement)}
     <div class="bloc pedago"><div class="bloc-titre"><span class="nb">?</span>Pourquoi ? <button class="pourquoi-btn" id="btn-pourquoi">Afficher</button></div>
       <div class="pourquoi-box" id="pourquoi-box" style="display:none">${fi.pourquoi}</div></div>
   </div>
   <div class="fiche-actions">
     <button class="btn" id="f-courrier">📄 Générer le courrier</button>
     <button class="btn sec" id="f-exam">🩺 Examen orienté</button>
     <button class="btn danger" id="f-15">📞 Rappel : urgence → 15</button>
   </div>`;
  $('#retour-symptomes',v).onclick=()=>{$('#aide-detail').innerHTML='';$('#aide-liste').style.display='block';};
  $('#aide-liste').style.display='none';
  $('#btn-pourquoi',v).onclick=e=>{const b=$('#pourquoi-box',v);const open=b.style.display==='none';b.style.display=open?'block':'none';e.target.textContent=open?'Masquer':'Afficher';};
  $('#f-courrier',v).onclick=()=>{go('courrier');chargerCourrier(fi.courrier);prefillCourrier(fi);};
  $('#f-exam',v).onclick=()=>{go('exam');const map={cephalee:'cephalee',avc:'avc',vertige:'vertige',neuropathie:'neuropathie',parkinson:'parkinson',lombosciatique:'lombo',cognitif:'cognitif',myasthenie:'myasthenie'};lancerExam(map[id]||'complet');};
  $('#f-15',v).onclick=()=>toast('En cas d\'urgence vitale : 15 (SAMU) / 112');
}

/* =====================================================================
   MODULE 2 — EXAMEN NEUROLOGIQUE GUIDÉ
   ===================================================================== */
let examEtat={type:null,steps:[],idx:0,cr:{}};
function renderChoixExam(){
  const g=$('#choix-exam');g.innerHTML='';
  Object.entries(EXAM_TYPES).forEach(([k,t])=>{
    const b=el('button','');
    b.innerHTML=`<span class="ci">${t.ico}</span><span><strong>${t.nom}</strong><br><span style="font-size:12px;color:var(--gris-doux)">${t.steps.length} étapes</span></span>`;
    b.onclick=()=>lancerExam(k);
    g.appendChild(b);
  });
}
function lancerExam(type){
  examEtat={type,steps:EXAM_TYPES[type].steps,idx:0,cr:{}};
  $('#exam-choix').style.display='none';
  $('#exam-deroule').style.display='block';
  renderExamStep();
}
function renderExamStep(){
  const {steps,idx}=examEtat;
  const key=steps[idx];const t=EXAM_TESTS[key];
  const prog=Math.round((idx)/steps.length*100);
  const sel=examEtat.cr[key]||'';
  const c=$('#exam-deroule');
  c.innerHTML=`
   <a class="btn-retour" id="exam-quit">← Changer d'examen</a>
   <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
     <h3 class="titre-section" style="margin:0">${EXAM_TYPES[examEtat.type].nom}</h3>
     <span style="font-weight:700;color:var(--bleu)">Étape ${idx+1}/${steps.length}</span>
   </div>
   <div class="exam-progress"><span style="width:${prog}%"></span></div>
   <div class="exam-step">
     <div class="cat">${t.cat}</div>
     <h3>${t.nom}</h3>
     <p style="color:var(--gris-doux);margin:4px 0 0">🎯 ${t.objectif}</p>
     <div class="exam-grid">
       <div class="exam-cell"><h5>Matériel</h5><p>${t.materiel}</p></div>
       <div class="exam-cell"><h5>Position du patient</h5><p>${t.position}</p></div>
       <div class="exam-cell consigne"><h5>Consigne à dire</h5><p>« ${t.consigne} »</p></div>
       <div class="exam-cell"><h5>Geste du médecin</h5><p>${t.geste}</p></div>
       <div class="exam-cell normal"><h5>Résultat normal</h5><p>${t.normal}</p></div>
       <div class="exam-cell anormal"><h5>Résultat anormal</h5><p>${t.anormal}</p></div>
     </div>
     <div class="bloc pedago" style="border:none;padding:0">
       <p style="font-size:13.5px"><strong style="color:var(--bleu)">Interprétation.</strong> ${t.interpretation}</p>
       <p style="font-size:13.5px;margin-top:6px"><strong style="color:var(--orange)">Piège fréquent.</strong> ${t.pieges}</p>
       <p style="font-size:13.5px;margin-top:6px"><strong style="color:var(--rouge)">Si anormal.</strong> ${t.cta}</p>
     </div>
     <div class="exam-cr-controls">
       <span style="font-weight:600;font-size:13px">Noter au compte rendu :</span>
       <div class="seg" data-key="${key}">
         <button data-v="N" class="${sel==='N'?'sel-n':''}">Normal</button>
         <button data-v="A" class="${sel==='A'?'sel-a':''}">Anormal</button>
         <button data-v="X" class="${sel==='X'?'sel-x':''}">Non testé</button>
       </div>
     </div>
   </div>
   <div class="exam-nav">
     <button class="btn gris" id="exam-prev" ${idx===0?'disabled':''}>← Précédent</button>
     ${idx<steps.length-1?'<button class="btn" id="exam-next">Suivant →</button>':'<button class="btn vert" id="exam-fin">✓ Terminer & voir le compte rendu</button>'}
   </div>`;
  $('#exam-quit',c).onclick=()=>{$('#exam-deroule').style.display='none';$('#exam-choix').style.display='block';};
  $$('.seg button',c).forEach(b=>b.onclick=()=>{examEtat.cr[key]=b.dataset.v;renderExamStep();});
  if($('#exam-prev',c))$('#exam-prev',c).onclick=()=>{if(examEtat.idx>0){examEtat.idx--;renderExamStep();}};
  if($('#exam-next',c))$('#exam-next',c).onclick=()=>{examEtat.idx++;renderExamStep();};
  if($('#exam-fin',c))$('#exam-fin',c).onclick=finExam;
}
function genererCRdepuisExam(){
  const phrases=[];
  examEtat.steps.forEach(k=>{
    const v=examEtat.cr[k];const t=EXAM_TESTS[k];
    if(v==='N')phrases.push(t.crN);
    else if(v==='A')phrases.push('⚠ '+t.crA);
    else if(v==='X')phrases.push(t.nom+' : non testé.');
  });
  return phrases.length?phrases.join(' '):'';
}
function finExam(){
  const cr=genererCRdepuisExam();
  go('cr');
  $('#cr-texte').value=cr||CR_DEFAUT;
  toast('Compte rendu généré depuis l\'examen');
}

/* =====================================================================
   MODULE COMPTE RENDU
   ===================================================================== */
const CR_DEFAUT="Conscience claire, patient orienté. Pas de trouble phasique évident. Paires crâniennes sans anomalie objectivée. Pas de déficit moteur segmentaire, Barré négatif, Mingazzini négatif. ROT symétriques, pas de Babinski. Sensibilité conservée. Pas de syndrome cérébelleux. Marche normale. Pas de syndrome méningé.";
function initCR(){
  $('#cr-texte').value=CR_DEFAUT;
  $('#cr-normal').onclick=()=>{$('#cr-texte').value=CR_DEFAUT;toast('Compte rendu « examen normal » inséré');};
  $('#cr-vider').onclick=()=>{$('#cr-texte').value='';};
  $('#cr-copier').onclick=()=>copier($('#cr-texte').value);
  $('#cr-vers-courrier').onclick=()=>{go('courrier');$('#c-examenNeuro').value=$('#cr-texte').value;majApercu();toast('Compte rendu transféré dans le courrier');};
  /* éléments cliquables : insertion rapide */
  const phrases={
   "Conscience":"Conscience claire, patient orienté.",
   "Langage":"Pas de trouble phasique évident.",
   "Paires crâniennes":"Paires crâniennes sans anomalie objectivée.",
   "Motricité":"Pas de déficit moteur segmentaire, Barré et Mingazzini négatifs.",
   "Réflexes":"ROT symétriques, pas de signe de Babinski.",
   "Sensibilité":"Sensibilité conservée.",
   "Cervelet":"Pas de syndrome cérébelleux.",
   "Marche":"Marche normale.",
   "Méningé":"Pas de syndrome méningé."
  };
  const g=$('#cr-insertions');
  Object.entries(phrases).forEach(([k,v])=>{
    const b=el('button','chip',k);b.onclick=()=>{const ta=$('#cr-texte');ta.value=(ta.value.trim()+' '+v).trim();};
    g.appendChild(b);
  });
}

/* =====================================================================
   MODULE GÉNÉRATEUR DE COURRIER
   ===================================================================== */
const EXAMENS_PRESCRIPTIBLES=[
 "TDM cérébrale sans injection","Angio-TDM (TSA / cérébral)","IRM cérébrale","IRM médullaire","IRM lombaire",
 "Doppler des troncs supra-aortiques","EEG standard","EEG de sommeil / privation","Vidéo-EEG","ENMG / EMG",
 "Polygraphie ventilatoire","Polysomnographie","TILE / MSLT","ECG","Holter ECG","NFS-CRP","Ionogramme-créatinine",
 "Glycémie / HbA1c","TSH","B12 / folates","VS + CRP (Horton)","Ponction lombaire (milieu spécialisé)"
];
function initCourrier(){
  const sel=$('#c-modele');
  Object.entries(COURRIERS).forEach(([k,c])=>{const o=el('option');o.value=k;o.textContent=c.titre;sel.appendChild(o);});
  /* checkboxes examens */
  const ce=$('#c-examens-demandes');
  EXAMENS_PRESCRIPTIBLES.forEach((ex,i)=>{
    const r=el('label','check-row');
    r.innerHTML=`<input type="checkbox" value="${ex}" id="ex-${i}"><span>${ex}</span>`;
    r.querySelector('input').onchange=majApercu;
    ce.appendChild(r);
  });
  /* écouteurs */
  $$('#vue-courrier input,#vue-courrier textarea,#vue-courrier select').forEach(i=>i.addEventListener('input',majApercu));
  sel.addEventListener('change',()=>{chargerCourrier(sel.value);});
  $('#c-copier').onclick=()=>copier($('#courrier-papier').innerText);
  $('#c-imprimer').onclick=()=>window.print();
  $('#c-txt').onclick=()=>telecharger($('#courrier-papier').innerText,'courrier.txt','text/plain');
  $('#c-pdf').onclick=()=>{toast('Utilisez « Imprimer » → Enregistrer au format PDF');window.print();};
  chargerCourrier('neuro_standard');
}
function chargerCourrier(key){
  $('#c-modele').value=key;
  majApercu();
}
function prefillCourrier(fi){
  $('#c-motif').value=fi.titre;
  $('#c-hypotheses').value=fi.hypotheses.slice(0,2).join(' ; ');
  majApercu();
}
function val(id){return $('#'+id)?.value.trim()||'';}
function majApercu(){
  const key=$('#c-modele').value;const c=COURRIERS[key];
  const exas=$$('#c-examens-demandes input:checked').map(i=>i.value);
  const urg={prog:['u-prog','Programmé / non urgent'],urg:['u-urg','Urgent'],samu:['u-samu','URGENCE — régulation 15']}[c.urgence];
  $('#c-urg-pill').className='urg-pill '+urg[0];
  $('#c-urg-pill').textContent=urg[1];

  const date=new Date().toLocaleDateString('fr-FR');
  const L=[];
  L.push(`${c.dest},`);
  L.push('');
  L.push(`Objet : ${c.objet}`);
  if(c.urgence==='samu')L.push('⚠ DEGRÉ D\'URGENCE : prise en charge immédiate (régulation 15).');
  else if(c.urgence==='urg')L.push('Degré d\'urgence : avis rapide souhaité.');
  L.push('');
  const pat=val('c-nom')||'[Initiales / Nom Prénom]';
  const age=val('c-age');const sexe=val('c-sexe');
  L.push(`Concernant ${pat}${age?', '+age+' ans':''}${sexe?', '+sexe:''}.`);
  L.push('');
  if(val('c-motif'))L.push(`Motif : ${val('c-motif')}.`);
  if(val('c-atcd'))L.push(`Antécédents : ${val('c-atcd')}.`);
  if(val('c-traitements'))L.push(`Traitements en cours : ${val('c-traitements')}.`);
  if(val('c-allergies'))L.push(`Allergies : ${val('c-allergies')}.`);
  L.push('');
  if(val('c-debut'))L.push(`Date / mode de début : ${val('c-debut')}.`);
  if(val('c-chronologie'))L.push(`Chronologie : ${val('c-chronologie')}.`);
  if(val('c-signesPos'))L.push(`Signes positifs : ${val('c-signesPos')}.`);
  if(val('c-signesNeg'))L.push(`Signes négatifs importants : ${val('c-signesNeg')}.`);
  if(val('c-constantes'))L.push(`Constantes : ${val('c-constantes')}.`);
  if(val('c-examenNeuro'))L.push(`Examen neurologique : ${val('c-examenNeuro')}`);
  L.push('');
  if(val('c-hypotheses'))L.push(`Hypothèses diagnostiques : ${val('c-hypotheses')}.`);
  if(val('c-examensFaits'))L.push(`Examens déjà réalisés : ${val('c-examensFaits')}.`);
  if(exas.length)L.push(`Examens demandés : ${exas.join(', ')}.`);
  L.push('');
  L.push(c.motifAvis);
  if(val('c-motifPrecis'))L.push(val('c-motifPrecis'));
  L.push('');
  L.push('Confraternellement,');
  L.push(val('c-signature')||'Dr [Nom] — [RPPS] — [Coordonnées]');
  L.push('');
  L.push(`Le ${date}.`);
  $('#courrier-papier').innerText=L.join('\n');
}
function telecharger(txt,nom,type){
  const b=new Blob([txt],{type});const u=URL.createObjectURL(b);
  const a=el('a');a.href=u;a.download=nom;a.click();URL.revokeObjectURL(u);
}

/* =====================================================================
   MODULE FORMATION
   ===================================================================== */
function initFormation(){
  $$('.form-tabs button').forEach(b=>b.onclick=()=>{
    $$('.form-tabs button').forEach(x=>x.classList.remove('actif'));
    b.classList.add('actif');
    $$('.form-pane').forEach(p=>p.style.display='none');
    $('#form-'+b.dataset.pane).style.display='block';
  });
  initFlashcards();
  initVideos();
  initCas();
  initQuiz();
}

/* ----- flashcards ----- */
let fcEtat={liste:[],idx:0,cat:'Toutes'};
function initFlashcards(){
  const cats=['Toutes',...new Set(FLASHCARDS.map(f=>f.cat))];
  const fil=$('#fc-filtres');fil.innerHTML='';
  cats.forEach(c=>{const b=el('button','chip'+(c==='Toutes'?' actif':''),c);b.onclick=()=>{$$('#fc-filtres .chip').forEach(x=>x.classList.remove('actif'));b.classList.add('actif');fcEtat.cat=c;filtreFc();};fil.appendChild(b);});
  filtreFc();
  $('#fc-prev').onclick=()=>{fcEtat.idx=(fcEtat.idx-1+fcEtat.liste.length)%fcEtat.liste.length;showFc();};
  $('#fc-next').onclick=()=>{fcEtat.idx=(fcEtat.idx+1)%fcEtat.liste.length;showFc();};
  $('#flashcard').onclick=()=>$('#flashcard').classList.toggle('flip');
}
function filtreFc(){
  fcEtat.liste=fcEtat.cat==='Toutes'?FLASHCARDS:FLASHCARDS.filter(f=>f.cat===fcEtat.cat);
  fcEtat.idx=0;showFc();
}
function showFc(){
  const f=fcEtat.liste[fcEtat.idx];if(!f)return;
  const card=$('#flashcard');card.classList.remove('flip');
  card.innerHTML=`<div class="fc-inner">
    <div class="fc-face fc-front"><div class="fc-cat">${f.cat}</div><div class="q">${f.q}</div></div>
    <div class="fc-face fc-back"><div class="cat-bk">Réponse</div><div class="r">${f.r}</div><div class="piege">⚠ ${f.piege}</div></div>
  </div>`;
  $('#fc-compteur').textContent=`${fcEtat.idx+1} / ${fcEtat.liste.length}`;
}

/* ----- vidéos / animations ----- */
function animSVG(id){
  const base=`<svg class="scene-svg" viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg">`;
  const styleCommon=`<style>.bg{fill:#0d1b2a}.skin{fill:#f0c9a8}.body{fill:#3a86ff}.line{stroke:#cfe0ff;stroke-width:3;fill:none}.lbl{fill:#cfe0ff;font:600 13px Segoe UI}</style>`;
  const scenes={
   babinski:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Stimulation plantaire (bord externe)</text>
     <g transform="translate(120,180)">
       <rect x="0" y="0" width="200" height="40" rx="14" fill="#f0c9a8"/>
       <g transform="translate(200,18)"><rect x="0" y="-6" width="46" height="12" rx="6" fill="#f0c9a8" style="transform-origin:0 0;animation:bab-toe 3s infinite"/></g>
       <circle r="6" fill="#d62828" style="cy:18px;animation:bab-stim 3s infinite"/>
     </g>
     <text class="lbl" x="120" y="250" fill="#1b9e5a">Normal : flexion des orteils</text>
     <text class="lbl" x="120" y="272" fill="#d62828">Babinski : extension lente du gros orteil</text>`,
   barre:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Bras tendus, paumes vers le haut, yeux fermés</text>
     <circle class="skin" cx="250" cy="90" r="26"/><rect class="body" x="232" y="116" width="36" height="90" rx="10"/>
     <rect class="body" x="150" y="120" width="90" height="16" rx="8" style="transform-origin:240px 128px;animation:arm-stay 4s infinite"/>
     <rect class="body" x="260" y="120" width="90" height="16" rx="8" style="transform-origin:260px 128px;animation:arm-drop 4s infinite"/>
     <text class="lbl" x="120" y="300" fill="#d62828">→ Côté droit : pronation + chute lente (déficit)</text>`,
   facial:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Comparer les deux hémifaces</text>
     <circle class="skin" cx="250" cy="170" r="100"/>
     <path class="line" d="M170 120 q30 -16 60 0" /><path class="line" d="M270 120 q30 -16 60 0" style="opacity:.3"/>
     <circle cx="200" cy="150" r="10" fill="#0d1b2a"/><circle cx="300" cy="150" r="10" fill="#0d1b2a" style="transform-origin:300px 150px;animation:blink 3s infinite"/>
     <path class="line" d="M200 215 q50 30 100 -10" style="stroke:#d62828"/>
     <text class="lbl" x="60" y="320" fill="#cfe0ff">Front atteint = périphérique · Front épargné = central</text>`,
   pupilles:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Réflexe photomoteur (direct + consensuel)</text>
     <ellipse cx="170" cy="170" rx="70" ry="45" fill="#fff"/><circle cx="170" cy="170" r="22" fill="#5a8"/><circle cx="170" cy="170" fill="#000" style="r:14px;animation:pupil 3s infinite"/>
     <ellipse cx="330" cy="170" rx="70" ry="45" fill="#fff"/><circle cx="330" cy="170" r="22" fill="#5a8"/><circle cx="330" cy="170" fill="#000" style="r:14px;animation:pupil 3s infinite"/>
     <text class="lbl" x="120" y="300" fill="#1b9e5a">Les deux pupilles se contractent à la lumière</text>`,
   romberg:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Pieds joints, yeux fermés (sécuriser)</text>
     <g style="transform-origin:250px 300px;animation:sway 3s infinite">
       <circle class="skin" cx="250" cy="80" r="24"/><rect class="body" x="234" y="104" width="32" height="120" rx="10"/>
       <rect class="body" x="238" y="222" width="10" height="78" rx="5"/><rect class="body" x="252" y="222" width="10" height="78" rx="5"/></g>
     <text class="lbl" x="100" y="325" fill="#d62828">Oscillations/chute yeux fermés = Romberg +</text>`,
   marche_park:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Marche à petits pas, tronc penché</text>
     <g style="animation:shuffle 1.2s infinite">
       <circle class="skin" cx="250" cy="90" r="22"/><rect class="body" x="236" y="110" width="30" height="100" rx="10" transform="rotate(8 250 110)"/>
       <rect class="body" x="240" y="206" width="9" height="70" rx="5"/><rect class="body" x="252" y="206" width="9" height="70" rx="5"/></g>
     <text class="lbl" x="90" y="320" fill="#cfe0ff">Perte du ballant des bras · freezing</text>`,
   steppage:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Pied tombant, genou levé haut</text>
     <circle class="skin" cx="250" cy="80" r="22"/><rect class="body" x="236" y="102" width="30" height="100" rx="10"/>
     <rect class="body" x="240" y="198" width="10" height="70" rx="5"/>
     <g style="transform-origin:257px 198px;animation:step-leg 1.6s infinite"><rect class="body" x="252" y="198" width="10" height="70" rx="5"/><rect x="252" y="262" width="34" height="10" rx="5" fill="#f0c9a8"/></g>
     <text class="lbl" x="100" y="320" fill="#cfe0ff">Atteinte nerf fibulaire / racine L5</text>`,
   vppb:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Dix-Hallpike : tête à 45°, décubitus rapide</text>
     <ellipse cx="250" cy="170" rx="60" ry="60" fill="#f0c9a8"/>
     <g style="animation:nyst 1s infinite"><circle cx="230" cy="160" r="9" fill="#0d1b2a"/><circle cx="270" cy="160" r="9" fill="#0d1b2a"/></g>
     <path class="line" d="M210 200 q40 22 80 0"/>
     <text class="lbl" x="80" y="310" fill="#cfe0ff">Nystagmus rotatoire bref et épuisable = VPPB</text>`,
   aphasies:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Évaluer fluence / compréhension</text>
     <circle class="skin" cx="180" cy="150" r="55"/><circle cx="165" cy="140" r="7" fill="#000"/><circle cx="195" cy="140" r="7" fill="#000"/>
     <ellipse cx="180" cy="178" rx="16" ry="9" fill="#7d1414" style="transform-origin:180px 178px;animation:mouthmove 1.5s infinite"/>
     <text class="lbl" x="270" y="130">Broca : non fluent</text><text class="lbl" x="270" y="155">compréhension OK</text>
     <text class="lbl" x="270" y="195" fill="#e76f00">Wernicke : fluent</text><text class="lbl" x="270" y="220" fill="#e76f00">jargon, compréhension -</text>`,
   crise:`<rect class="bg" width="500" height="340"/>
     <text class="lbl" x="20" y="30">Séquence fictive — phase tonico-clonique</text>
     <g style="animation:shake .25s infinite"><rect x="120" y="180" width="260" height="36" rx="16" fill="#f0c9a8"/><circle class="skin" cx="120" cy="198" r="26"/></g>
     <rect x="100" y="230" width="300" height="6" rx="3" fill="#274690"/>
     <text class="lbl" x="60" y="290" fill="#d62828">Protéger · ne rien mettre en bouche · chronométrer</text>
     <text class="lbl" x="60" y="312" fill="#d62828">> 5 min ou répétée = 15</text>`
  };
  return base+styleCommon+(scenes[id]||scenes.babinski)+`</svg>`;
}
function animSVG(id){
  const scenes={
    babinski:`<g class="scene-stage babinski-stage realistic-scene">
      <rect class="exam-table" x="44" y="214" width="412" height="28" rx="14"/>
      <path class="leg-shin" d="M92 198 C156 187 216 190 276 204"/>
      <g class="real-foot" transform="translate(250 183)">
        <path class="foot-sole" d="M-132 31 C-68 -8 15 -6 92 17 C124 26 127 59 95 70 C20 95 -91 79 -135 55 C-157 43 -155 36 -132 31Z"/>
        <path class="plantar-border trace trace-slow" d="M-112 56 C-70 31 -18 23 62 28"/>
        <g class="toe-bank" transform="translate(80 26)">
          <ellipse class="toe toe-main" cx="21" cy="0" rx="25" ry="8"/>
          <ellipse class="toe toe-small fan fan-1" cx="14" cy="17" rx="18" ry="6"/>
          <ellipse class="toe toe-small fan fan-2" cx="6" cy="31" rx="15" ry="5"/>
        </g>
      </g>
      <g class="examiner-hand stim-hand">
        <path class="skin hand" d="M96 262 c23 -14 42 -19 62 -12 l-14 22 c-17 -6 -29 -3 -42 8z"/>
        <line class="probe" x1="147" y1="249" x2="175" y2="229"/>
        <circle class="stim-dot motion-dot" cx="138" cy="239" r="7"/>
      </g>
      <text class="scene-label" x="38" y="55">Stimulation lente du bord externe</text>
      <text class="scene-callout danger" x="284" y="78">Extension lente du gros orteil</text>
      <text class="scene-micro" x="306" y="296">Trajet talon → orteils, pointe mousse</text>
    </g>`,
    barre:`<g class="scene-stage barre-stage realistic-scene">
      <rect class="exam-floor" x="36" y="292" width="428" height="8" rx="4"/>
      <g class="patient-torso barre-patient">
        <circle class="skin head breath" cx="250" cy="86" r="28"/>
        <path class="body coat" d="M223 124 C231 112 269 112 277 124 L292 230 H208Z"/>
        <path class="neck" d="M239 110 h22 v22 h-22z"/>
        <g class="arm neutral-arm"><rect class="body" x="86" y="136" width="154" height="18" rx="9"/><ellipse class="skin palm" cx="81" cy="145" rx="16" ry="10"/></g>
        <g class="arm weak-arm"><rect class="body" x="260" y="136" width="154" height="18" rx="9"/><ellipse class="skin palm" cx="419" cy="145" rx="16" ry="10"/></g>
      </g>
      <path class="ghost-path trace" d="M266 145 C314 157 366 187 419 228"/>
      <path class="eye-mask" d="M221 85 C239 78 261 78 279 85"/>
      <text class="scene-label" x="38" y="55">Bras tendus, paumes vers le haut</text>
      <text class="scene-callout danger" x="280" y="274">Pronation + chute progressive</text>
      <text class="scene-micro" x="52" y="274">Observer 20-30 s sans toucher le bras</text>
    </g>`,
    facial:`<g class="scene-stage facial-stage realistic-scene">
      <g class="face-panel normal-face" transform="translate(64 80)">
        <rect class="panel-card" x="0" y="0" width="164" height="212" rx="18"/>
        <circle class="skin face" cx="82" cy="90" r="58"/>
        <path class="brow" d="M42 70 C55 62 68 62 80 70"/><path class="brow" d="M87 70 C100 62 114 62 126 70"/>
        <circle class="eye" cx="60" cy="88" r="6"/><circle class="eye" cx="106" cy="88" r="6"/>
        <path class="mouth-smile" d="M52 126 C72 144 98 144 116 126"/>
        <text class="panel-label" x="40" y="188">Central</text>
        <text class="panel-small" x="28" y="204">front preserve</text>
      </g>
      <g class="face-panel palsy-face" transform="translate(272 80)">
        <rect class="panel-card danger-card" x="0" y="0" width="164" height="212" rx="18"/>
        <circle class="skin face" cx="82" cy="90" r="58"/>
        <path class="midline" d="M82 34 V146"/>
        <path class="brow left-brow" d="M42 70 C55 62 68 62 80 70"/>
        <path class="brow right-brow weak-brow" d="M87 74 C101 72 114 72 126 76"/>
        <circle class="eye" cx="60" cy="88" r="6"/><circle class="eye blink-eye" cx="106" cy="91" r="6"/>
        <path class="mouth-asym" d="M50 128 C76 148 103 139 121 119"/>
        <text class="panel-label danger" x="24" y="188">Peripherique</text>
        <text class="panel-small" x="25" y="204">front + bouche atteints</text>
      </g>
      <text class="scene-label" x="38" y="55">Comparer front, fermeture des yeux et sourire</text>
      <text class="scene-callout danger" x="288" y="308">Tout l'hemiface = peripherique</text>
    </g>`,
    pupilles:`<g class="scene-stage pupilles-stage realistic-scene">
      <rect class="panel-card" x="70" y="92" width="360" height="158" rx="26"/>
      <path class="light-beam" d="M42 142 L142 174 L42 206 Z"/>
      <g class="examiner-hand torch-hand" transform="translate(26 166)">
        <rect class="torch" x="0" y="-12" width="58" height="24" rx="12"/>
        <circle class="torch-lens" cx="58" cy="0" r="12"/>
      </g>
      <ellipse class="eye-white" cx="178" cy="174" rx="72" ry="46"/>
      <ellipse class="eye-white" cx="332" cy="174" rx="72" ry="46"/>
      <circle class="iris" cx="178" cy="174" r="23"/><circle class="iris" cx="332" cy="174" r="23"/>
      <circle class="pupil pupil-direct" cx="178" cy="174" r="14"/><circle class="pupil pupil-consensual" cx="332" cy="174" r="14"/>
      <path class="trace nerve" d="M178 232 C215 278 290 278 332 232"/>
      <text class="scene-label" x="42" y="56">Lumiere directe puis reponse consensuelle</text>
      <text class="scene-callout success" x="232" y="302">Contraction bilaterale attendue</text>
    </g>`,
    romberg:`<g class="scene-stage romberg-stage realistic-scene">
      <rect class="exam-floor" x="58" y="292" width="384" height="8" rx="4"/>
      <g class="examiner-catcher" transform="translate(118 118)">
        <circle class="skin" cx="0" cy="0" r="21"/><path class="body coat" d="M-18 28 h36 l14 116 h-64z"/>
        <path class="catch-arm" d="M14 52 C44 70 63 88 82 112"/>
      </g>
      <g class="patient-sway">
        <circle class="skin head" cx="270" cy="82" r="25"/>
        <path class="body" d="M246 114 C256 105 284 105 294 114 L304 220 H236Z"/>
        <rect class="body" x="258" y="218" width="11" height="76" rx="5"/>
        <rect class="body" x="273" y="218" width="11" height="76" rx="5"/>
        <path class="eye-mask" d="M244 82 C262 76 280 76 298 82"/>
      </g>
      <path class="balance-line trace" d="M202 298 C238 262 306 262 344 298"/>
      <text class="scene-label" x="42" y="56">Pieds joints, fermer les yeux, securiser</text>
      <text class="scene-callout danger" x="108" y="316">Chute immediate : Romberg proprioceptif</text>
    </g>`,
    marche_park:`<g class="scene-stage marche-stage realistic-scene">
      <path class="floor-dash" d="M72 288 H430"/>
      <g class="door-frame"><rect x="346" y="78" width="62" height="176" rx="3"/><path d="M408 78 v176"/></g>
      <g class="park-walker">
        <circle class="skin head" cx="212" cy="86" r="24"/>
        <path class="body trunk-forward" d="M194 112 C205 102 234 105 240 119 L252 212 H198Z"/>
        <path class="arm-reduced" d="M195 130 C178 163 180 194 190 211"/>
        <path class="arm-reduced weak-swing" d="M238 132 C251 158 255 188 247 210"/>
        <rect class="body short-step step-a" x="204" y="207" width="11" height="74" rx="5"/>
        <rect class="body short-step step-b" x="221" y="207" width="11" height="74" rx="5"/>
      </g>
      <path class="freeze-bars" d="M286 274 h30 M292 288 h42"/>
      <text class="scene-label" x="42" y="56">Petits pas, initiation hesitante, bras peu ballants</text>
      <text class="scene-callout warning" x="290" y="268">Freezing au passage</text>
    </g>`,
    steppage:`<g class="scene-stage steppage-stage realistic-scene">
      <path class="floor-dash" d="M66 288 H430"/>
      <g class="walker-prop">
        <circle class="skin head" cx="226" cy="78" r="24"/>
        <path class="body" d="M204 106 C216 96 244 96 256 106 L266 202 H194Z"/>
        <rect class="body stance-leg" x="210" y="198" width="11" height="82" rx="5"/>
        <g class="stepping-leg"><rect class="body" x="242" y="199" width="11" height="74" rx="5"/><rect class="skin foot-drop" x="238" y="266" width="52" height="13" rx="7"/></g>
      </g>
      <path class="knee-lift trace" d="M247 203 C307 160 329 231 286 277"/>
      <path class="toe-catch" d="M286 279 c22 -7 40 -7 61 0"/>
      <text class="scene-label" x="42" y="56">Pied tombant : le genou monte trop haut</text>
      <text class="scene-callout warning" x="252" y="306">Talons impossibles cote atteint</text>
    </g>`,
    vppb:`<g class="scene-stage vppb-stage realistic-scene">
      <rect class="exam-table" x="98" y="224" width="308" height="24" rx="12"/>
      <g class="dix-body">
        <path class="body" d="M190 206 C232 190 292 194 337 214 L328 239 C276 225 224 226 178 236Z"/>
        <g class="head-tilt">
          <ellipse class="skin face" cx="166" cy="188" rx="54" ry="44"/>
          <g class="nystagmus"><circle class="eye" cx="148" cy="180" r="7"/><circle class="eye" cx="183" cy="180" r="7"/></g>
          <path class="mouth" d="M146 207 C162 218 181 218 196 207"/>
        </g>
      </g>
      <path class="rotation-ring trace" d="M116 188 A64 64 0 1 1 216 188"/>
      <path class="examiner-arm" d="M318 122 C284 142 250 167 206 187"/>
      <text class="scene-label" x="42" y="56">Dix-Hallpike : 45 degres puis decubitus rapide</text>
      <text class="scene-callout success" x="238" y="294">Nystagmus rotatoire bref et epuisable</text>
    </g>`,
    aphasies:`<g class="scene-stage aphasies-stage realistic-scene">
      <g class="speaker clinician" transform="translate(98 110)">
        <circle class="skin face" cx="58" cy="56" r="42"/>
        <circle class="eye" cx="45" cy="49" r="5"/><circle class="eye" cx="71" cy="49" r="5"/>
        <ellipse class="mouth speaking" cx="58" cy="73" rx="14" ry="7"/>
        <path class="body coat" d="M25 105 h66 l18 112 h-102z"/>
      </g>
      <g class="speech-bubbles">
        <rect class="bubble broca" x="236" y="92" width="204" height="64" rx="14"/>
        <text class="bubble-text" x="254" y="121">Broca : phrases courtes</text>
        <text class="bubble-sub" x="254" y="142">comprehension preservee</text>
        <rect class="bubble wernicke" x="236" y="184" width="214" height="72" rx="14"/>
        <text class="bubble-text" x="254" y="214">Wernicke : fluent</text>
        <text class="bubble-sub" x="254" y="236">jargon + comprehension alteree</text>
      </g>
      <path class="trace language-path" d="M188 167 C224 122 254 121 282 125"/>
      <text class="scene-label" x="42" y="56">Tester fluence, comprehension, repetition</text>
    </g>`,
    crise:`<g class="scene-stage crise-stage realistic-scene">
      <rect class="mat" x="70" y="244" width="360" height="14" rx="7"/>
      <g class="seizure-body">
        <path class="skin" d="M140 194 C204 178 288 180 364 206 C382 212 380 235 360 239 C274 256 196 250 132 226 C112 219 116 201 140 194Z"/>
        <circle class="skin" cx="124" cy="210" r="25"/>
        <path class="limb jitter" d="M188 194 C174 148 224 142 235 185"/>
        <path class="limb jitter2" d="M276 230 C298 274 348 260 356 224"/>
      </g>
      <g class="safe-actions">
        <path class="danger-ring pulse-ring" d="M76 112 C142 62 356 62 424 120"/>
        <text class="scene-micro" x="112" y="126">ecarter les objets - proteger la tete - chronometrer</text>
      </g>
      <text class="scene-label" x="42" y="56">Crise tonico-clonique : scene fictive securisee</text>
      <text class="scene-callout danger" x="128" y="312">&gt; 5 min ou repetition = appel 15</text>
    </g>`
  };
  return `<svg class="scene-svg neuromotion video-${id}" viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animation ${id}">
    <defs>
      <radialGradient id="sceneGlow" cx="50%" cy="42%" r="70%"><stop offset="0%" stop-color="#234a7d"/><stop offset="100%" stop-color="#071320"/></radialGradient>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3a86ff"/><stop offset="100%" stop-color="#274690"/></linearGradient>
      <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect class="scene-backdrop" width="500" height="340"/>
    <path class="scene-grid" d="M0 286 H500 M0 226 H500 M0 166 H500 M0 106 H500 M80 0 V340 M180 0 V340 M280 0 V340 M380 0 V340"/>
    <circle class="ambient ambient-a" cx="96" cy="86" r="70"/><circle class="ambient ambient-b" cx="420" cy="248" r="92"/>
    <text class="scene-title" x="28" y="32">NEURO TRAINING</text>
    ${scenes[id]||scenes.babinski}
    <g class="scanline"><rect x="0" y="0" width="500" height="28"/></g>
  </svg>`;
}

function imageFocusStyle(id,index,variant='card'){
  const base={
    babinski:[["54% 65%",1.06],["42% 72%",1.2],["68% 38%",1.18]],
    barre:[["50% 46%",1.05],["62% 44%",1.18],["68% 62%",1.2]],
    facial:[["50% 44%",1.06],["42% 40%",1.16],["62% 48%",1.16]],
    pupilles:[["50% 48%",1.08],["38% 45%",1.2],["64% 45%",1.2]],
    romberg:[["50% 52%",1.06],["48% 38%",1.17],["56% 62%",1.18]],
    marche_park:[["50% 56%",1.08],["42% 60%",1.18],["64% 58%",1.2]],
    steppage:[["50% 58%",1.08],["54% 54%",1.2],["62% 70%",1.18]],
    vppb:[["50% 50%",1.06],["42% 42%",1.18],["62% 44%",1.18]],
    aphasies:[["50% 50%",1.06],["38% 48%",1.18],["66% 46%",1.18]],
    crise_tcg:[["50% 56%",1.08],["46% 58%",1.18],["62% 52%",1.16]]
  }[id]||[["50% 50%",1.05],["42% 50%",1.16],["62% 50%",1.16]];
  const [position,scale]=base[index]||base[0];
  const cardScale=variant==='thumb'?Math.max(1.02,scale-.08):scale;
  return `object-position:${position};transform:scale(${cardScale});`;
}

function imageTriptych(v,variant='card'){
  if(!v?.image3d)return animSVG(v?.anim||v);
  const steps=(v.imageSteps&&v.imageSteps.length===3)?v.imageSteps:[
    {titre:"Vue clinique",texte:v.theme},
    {titre:"Geste d'examen",texte:(v.pointsCles||[])[0]||v.titre},
    {titre:"Interprétation",texte:(v.pointsCles||[])[1]||v.theme}
  ];
  const animId=v.anim||v.id;
  return `<div class="formation-triptych triptych-${variant} neuro-animated">
    ${steps.map((step,i)=>{
      const src=step.src||v.image3d;
      const style=step.src?'':imageFocusStyle(v.id,i,variant);
      return `<figure class="formation-image-step step-${i+1}">
      <div class="formation-image-crop"><img src="${src}" alt="${v.titre} - ${step.titre}" loading="${variant==='detail'?'eager':'lazy'}" style="${style}" onerror="neuroImgFallback(this,'${animId}')"></div>
      <figcaption><span>${i+1}</span><strong>${step.titre}</strong><em>${step.texte}</em></figcaption>
    </figure>`;
    }).join('')}
  </div>`;
}

/* Anti-figé : si une image médicale manque ou échoue à charger,
   on bascule la vignette sur la scène SVG animée correspondante (jamais vide, jamais figée). */
function neuroImgFallback(img,animId){
  const crop=img.closest('.formation-image-crop');
  if(!crop||crop.dataset.fallback)return;
  crop.dataset.fallback='1';
  crop.classList.add('is-svg-fallback');
  crop.innerHTML=animSVG(animId);
}

let videoFilters={theme:'Tous',search:''};

function normalizeVideoText(txt){
  return String(txt||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}

function videoMatches(v){
  const themeOk=videoFilters.theme==='Tous'||v.theme===videoFilters.theme;
  const needle=normalizeVideoText(videoFilters.search);
  if(!themeOk)return false;
  if(!needle)return true;
  return normalizeVideoText([v.titre,v.theme,v.script,...(v.pointsCles||[])].join(' ')).includes(needle);
}

function makeVideoCard(v,extraClass=''){
  const c=el('div',`carte-video ${extraClass}`.trim());
  c.tabIndex=0;
  c.setAttribute('role','button');
  c.setAttribute('aria-label',`Ouvrir le sujet : ${v.titre}`);
  c.innerHTML=`<div class="video-vignette image-vignette">${imageTriptych(v,'thumb')}</div>
    <div class="vinfo"><div class="video-meta-line"><span class="video-theme">${v.theme}</span><span class="video-duration-chip">3 images</span>${v.cenRef?'<span class="video-source-chip">CEN</span>':''}</div><h4>${v.titre}</h4><p>${(v.pointsCles||[]).slice(0,2).join(' &middot; ')}</p></div>`;
  c.onclick=()=>ouvrirVideo(v.id);
  c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();ouvrirVideo(v.id);}};
  return c;
}

function renderVideoGrid(){
  const filtered=VIDEOS.filter(videoMatches);
  const g=$('#grille-videos');if(!g)return;
  const count=$('#video-count');if(count)count.textContent=`${filtered.length} / ${VIDEOS.length}`;
  const feature=$('#video-feature');
  const chosen=filtered[0]||VIDEOS[0];
  if(feature&&chosen){
    feature.innerHTML=`<div class="video-feature-art image-feature-art">${imageTriptych(chosen,'feature')}</div>
      <div class="video-feature-copy">
        <span class="video-kicker">Sélection</span>
        <h3>${chosen.titre}</h3>
        <p>${chosen.pointsCles[0]||chosen.theme}</p>
        ${chosen.cenRef?`<p class="video-source-note">${chosen.fidelite}</p>`:''}
        <button class="btn sm" id="video-feature-play">Voir les 3 images</button>
      </div>`;
    $('#video-feature-play',feature).onclick=()=>ouvrirVideo(chosen.id);
    feature.onclick=e=>{if(!e.target.closest('button'))ouvrirVideo(chosen.id);};
  }
  g.innerHTML='';
  if(!filtered.length){
    g.innerHTML=`<div class="video-empty"><strong>Aucune animation trouvée.</strong><br>Essayez un autre thème ou une recherche plus courte.</div>`;
    return;
  }
  const gridItems=chosen?filtered.filter(v=>v.id!==chosen.id):filtered;
  gridItems.forEach(v=>g.appendChild(makeVideoCard(v)));
}

function initVideos(){
  const pane=$('#form-videos');
  const themes=['Tous',...new Set(VIDEOS.map(v=>v.theme).filter(Boolean))];
  pane.innerHTML=`<div class="video-library">
    <div class="video-library-head">
      <div>
        <span class="video-kicker">Formation par images</span>
        <h3>Gestes et signes neurologiques en 3 vues</h3>
      </div>
      <div class="video-stats">
        <span><strong>${VIDEOS.length}</strong> sujets</span>
        <span><strong>${VIDEOS.length*3}</strong> images</span>
        <span><strong id="video-count">${VIDEOS.length} / ${VIDEOS.length}</strong> affichés</span>
      </div>
    </div>
    <div class="video-toolbar">
      <label class="video-search">
        <span>Recherche</span>
        <input id="video-search" type="search" placeholder="Babinski, pupilles, marche...">
      </label>
      <div class="video-filter-row">${themes.map(t=>`<button class="video-filter ${t==='Tous'?'active':''}" data-theme="${t}">${t}</button>`).join('')}</div>
    </div>
    <div class="video-feature" id="video-feature"></div>
  </div>
  <div class="grille-videos" id="grille-videos"></div>`;

  $('#video-search',pane).addEventListener('input',e=>{
    videoFilters.search=e.target.value;
    renderVideoGrid();
  });
  $$('.video-filter',pane).forEach(b=>b.onclick=()=>{
    videoFilters.theme=b.dataset.theme;
    $$('.video-filter',pane).forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    renderVideoGrid();
  });
  renderVideoGrid();
}

function ouvrirVideo(id){
  const v=VIDEOS.find(x=>x.id===id);
  if(!v)return;
  const m=$('#modale-corps');
  $('#modale-titre').textContent=v.titre+' · 3 images explicatives';
  m.innerHTML=`<div class="lecteur image-lesson" id="lecteur-video">
     <div class="image-lesson-hero">${imageTriptych(v,'detail')}</div>
     <div class="lecteur-info">
       ${v.cenRef?`<div class="script-bloc source-cen"><h5>Référence de fidélité</h5><a href="${v.cenRef.url}" target="_blank" rel="noopener">${v.cenRef.label}</a><p>${v.fidelite}</p></div>`:''}
       <div class="script-bloc"><h5>Explication</h5>${v.script}</div>
       <div class="script-bloc"><h5>Points clés</h5><ul class="liste">${v.pointsCles.map(p=>'<li>'+p+'</li>').join('')}</ul></div>
       <div class="alerte orange"><span class="ai">!</span><div><strong>Erreur fréquente.</strong> ${v.erreur}</div></div>
       <div id="video-quiz"></div>
     </div></div>`;

  const q=v.quiz;const qd=$('#video-quiz',m);
  qd.innerHTML=`<div class="quiz-box" style="box-shadow:none;border:none;padding:0"><h4 style="color:var(--bleu)">Mini-quiz</h4><p style="margin:6px 0 8px">${q.q}</p><div id="vq-opts"></div></div>`;
  q.opt.forEach((o,idx)=>{
    const b=el('button','cas-option',o);
    b.onclick=()=>{$$('#vq-opts button').forEach(x=>x.disabled=true);b.classList.add(idx===q.bon?'bon':'mauvais');if(idx!==q.bon)$$('#vq-opts button')[q.bon].classList.add('bon');toast(idx===q.bon?'Bonne reponse':'Reponse incorrecte');};
    $('#vq-opts',qd).appendChild(b);
  });
  $('#modale').classList.add('ouvert','modale-video');
}

/* ----- cas cliniques ----- */
function initCas(){
  const g=$('#grille-cas');g.innerHTML='';
  CAS.forEach((c,i)=>{
    const card=el('div','carte-cas');
    card.innerHTML=`<div class="cas-num">CAS ${i+1} · ${c.theme}${c.urgence?' · ⚠ urgence':''}</div><h4>${c.titre}</h4><p>${c.motif}</p>`;
    card.onclick=()=>ouvrirCas(c.id);
    g.appendChild(card);
  });
}
function ouvrirCas(id){
  const c=CAS.find(x=>x.id===id);
  $('#modale-titre').textContent=c.titre;
  const m=$('#modale-corps');
  let etape=0;
  function render(){
    if(etape>=c.etapes.length){
      m.innerHTML=`<div class="alerte vert"><span class="ai">✓</span><div><strong>Synthèse.</strong> ${c.conclusion}</div></div>
        <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <button class="btn" id="cas-courrier">📄 Voir le courrier associé</button>
        <button class="btn gris" id="cas-close">Fermer</button></div>`;
      $('#cas-courrier',m).onclick=()=>{fermerModale();go('courrier');chargerCourrier(c.courrier);};
      $('#cas-close',m).onclick=fermerModale;
      return;
    }
    const e=c.etapes[etape];
    m.innerHTML=`<div class="alerte bleu" style="margin-top:0"><span class="ai">🧾</span><div>${c.motif}</div></div>
      <p style="font-weight:700;margin:14px 0 6px">Étape ${etape+1}/${c.etapes.length} — ${e.q}</p>
      <div id="cas-opts" class="cas-etape" style="box-shadow:none;padding:0;border:none"></div>`;
    e.opt.forEach((o,idx)=>{
      const b=el('button','cas-option',o.t);
      b.onclick=()=>{
        $$('#cas-opts button').forEach(x=>x.disabled=true);
        b.classList.add(o.bon?'bon':'mauvais');
        const fb=el('div','cas-feedback '+(o.bon?'alerte vert':'alerte rouge'));
        fb.innerHTML=`<span class="ai">${o.bon?'✓':'✗'}</span><div>${o.fb}</div>`;
        $('#cas-opts',m).appendChild(fb);
        const nx=el('button','btn',etape<c.etapes.length-1?'Étape suivante →':'Voir la synthèse →');
        nx.style.marginTop='12px';nx.onclick=()=>{etape++;render();};
        $('#cas-opts',m).appendChild(nx);
      };
      $('#cas-opts',m).appendChild(b);
    });
  }
  render();
  $('#modale').classList.add('ouvert');
}

/* ----- quiz formation (synthèse) ----- */
function initQuiz(){
  const box=$('#form-quiz');
  box.innerHTML=`<p class="sous-titre">Regardez les 3 images du sujet, puis répondez. Les mini-quiz sont aussi intégrés à chaque fiche.</p>
    <div class="grille-videos" id="quiz-grille"></div>`;
  const g=$('#quiz-grille');
  VIDEOS.forEach(v=>{
    const c=el('div','carte-video');
    c.innerHTML=`<div class="video-vignette" style="background:linear-gradient(135deg,var(--violet),#9b7fc4)">❓<span class="duree">quiz</span></div><div class="vinfo"><h4>${v.titre}</h4><p>${v.quiz.q}</p></div>`;
    c.onclick=()=>ouvrirVideo(v.id);
    g.appendChild(c);
  });
}

/* =====================================================================
   MODULE CÉPHALÉES — arbre décisionnel
   ===================================================================== */
const CEPH_CAT_LABEL={urgence:"Urgence",secondaire:"À explorer",chronique:"Chronique",primaire:"Primaire"};
function initCephalees(){
  $('#ceph-arbre-start').onclick=()=>lancerArbreCeph();
  renderCephCartes();
}
function renderCephCartes(){
  const g=$('#ceph-cartes');g.innerHTML='';
  const ordre=["coup_tonnerre","febrile","deficit","post_trauma","cancer_immuno","grossesse","apres50","effort","orthostatique","nouvelle","chronique","migraine","migraine_aura","avf","tension","abus"];
  ordre.forEach((id,i)=>{
    const s=CEPHALEES[id];const c=el('div','carte-cas');
    c.style.borderLeftColor=s.drapeau==='rouge'?'var(--rouge)':s.drapeau==='orange'?'var(--orange)':'var(--vert)';
    c.innerHTML=`<div class="cas-num" style="color:${s.drapeau==='rouge'?'var(--rouge)':s.drapeau==='orange'?'var(--orange)':'var(--vert)'}">${i+1} · ${CEPH_CAT_LABEL[s.cat]}</div><h4>${s.titre}</h4><p>${s.reconnaitre.slice(0,90)}…</p>`;
    c.onclick=()=>ouvrirCephSituation(id);
    g.appendChild(c);
  });
}
let arbreCephIdx=0;
function lancerArbreCeph(){
  arbreCephIdx=0;
  $('#ceph-intro').style.display='none';
  $('#ceph-arbre').style.display='block';
  renderArbreCeph();
}
function renderArbreCeph(){
  const c=$('#ceph-arbre');
  if(arbreCephIdx>=CEPH_ARBRE.length){
    /* aucune urgence retenue → classification des céphalées primaires */
    c.innerHTML=`<a class="btn-retour" id="ceph-quit">← Quitter l'arbre</a>
      <div class="alerte vert"><span class="ai">✓</span><div><strong>Pas de drapeau rouge identifié.</strong> Orientez vers une céphalée primaire selon le profil clinique :</div></div>
      <div class="choix-exam" id="ceph-prim"></div>`;
    const g=$('#ceph-prim',c);
    const profils={avf:"Salves péri-orbitaires + larmoiement/ptosis (algie vasculaire)",migraine_aura:"Aura visuelle/sensitive réversible avant la douleur",migraine:"Pulsatile, unilatérale, nausées/photophobie",tension:"Bilatérale, en étau, légère, sans nausée",abus:"≥ 15 j/mois avec surconsommation d'antalgiques"};
    CEPH_PRIMAIRES.forEach(id=>{
      const b=el('button','');b.innerHTML=`<span class="ci">🧩</span><span><strong>${CEPHALEES[id].titre}</strong><br><span style="font-size:12px;color:var(--gris-doux)">${profils[id]}</span></span>`;
      b.onclick=()=>ouvrirCephSituation(id);g.appendChild(b);
    });
    $('#ceph-quit',c).onclick=resetArbreCeph;
    return;
  }
  const b=CEPH_ARBRE[arbreCephIdx];
  c.innerHTML=`<a class="btn-retour" id="ceph-quit">← Quitter l'arbre</a>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 class="titre-section" style="margin:0">Arbre décisionnel céphalées</h3>
      <span style="font-weight:700;color:var(--bleu)">Question ${arbreCephIdx+1}/${CEPH_ARBRE.length}</span>
    </div>
    <div class="exam-progress"><span style="width:${arbreCephIdx/CEPH_ARBRE.length*100}%"></span></div>
    <div class="exam-step">
      ${b.crit?'<div class="cat" style="color:var(--rouge)">⚠ Critère d\'urgence</div>':'<div class="cat">Orientation</div>'}
      <h3>${b.q}</h3>
      <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
        <button class="btn ${b.crit?'danger':''}" id="ceph-oui">OUI</button>
        <button class="btn gris" id="ceph-non">NON</button>
      </div>
    </div>`;
  $('#ceph-quit',c).onclick=resetArbreCeph;
  $('#ceph-oui',c).onclick=()=>ouvrirCephSituation(b.sit);
  $('#ceph-non',c).onclick=()=>{arbreCephIdx++;renderArbreCeph();};
}
function resetArbreCeph(){$('#ceph-arbre').style.display='none';$('#ceph-detail').innerHTML='';$('#ceph-intro').style.display='block';}
function ouvrirCephSituation(id){
  const s=CEPHALEES[id];if(!s)return;
  $('#ceph-arbre').style.display='none';
  $('#ceph-intro').style.display='none';
  const drap=s.drapeau==='rouge'?'rouge':s.drapeau==='orange'?'orange':'vert';
  const v=$('#ceph-detail');
  v.innerHTML=`
   <a class="btn-retour" id="ceph-retour">← Retour au module céphalées</a>
   <div class="fiche-entete" style="background:${s.drapeau==='rouge'?'#7d1414':s.drapeau==='orange'?'#824100':'var(--bleu-nuit)'}">
     <h2>${s.titre}</h2><p>${CEPH_CAT_LABEL[s.cat]}${s.cat==='urgence'?' — prise en charge prioritaire':''}</p></div>
   <div class="fiche-corps">
     <div class="alerte ${drap}"><span class="ai">${s.drapeau==='rouge'?'🚨':s.drapeau==='orange'?'⚠️':'✓'}</span><div><strong>Reconnaître.</strong> ${s.reconnaitre}</div></div>
     ${bloc(1,'Examen neurologique à faire',[s.examenNeuro])}
     ${bloc(2,'Examen général',[s.examenGeneral])}
     ${bloc(3,'Fond d\'œil / œdème papillaire',[s.fondOeil])}
     ${bloc(4,'Imagerie & explorations',s.imagerie)}
     ${bloc(5,'Biologie',[s.biologie])}
     ${s.traitement?bloc(6,'Traitement',[s.traitement]):''}
     <div class="bloc"><div class="bloc-titre"><span class="nb">→</span>Conduite à tenir</div>
       <div class="alerte ${drap}" style="margin:4px 0 0"><span class="ai">${s.drapeau==='vert'?'🩺':'📞'}</span><div>${s.conduite}</div></div></div>
     ${bloc('Δ','Diagnostics différentiels',[s.ddx],'pedago')}
   </div>
   <div class="fiche-actions">
     <button class="btn" id="ceph-courrier">📄 ${s.urgenceCourrier==='samu'?'Courrier d\'urgence':'Générer le courrier'}</button>
     <button class="btn sec" id="ceph-exam">🩺 Examen orienté céphalée</button>
     ${s.urgenceCourrier!=='prog'?'<button class="btn danger" id="ceph-15">📞 Urgence → 15</button>':''}
   </div>`;
  $('#ceph-retour',v).onclick=()=>{v.innerHTML='';$('#ceph-intro').style.display='block';};
  $('#ceph-courrier',v).onclick=()=>{go('courrier');chargerCourrier(s.courrier);$('#c-motif').value='Céphalée — '+s.titre;majApercu();};
  $('#ceph-exam',v).onclick=()=>{go('exam');lancerExam('cephalee');};
  const u15=$('#ceph-15',v);if(u15)u15.onclick=()=>toast('Urgence → 15 (SAMU) / 112');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* =====================================================================
   INITIALISATION
   ===================================================================== */
document.addEventListener('DOMContentLoaded',()=>{
  /* nav */
  $$('[data-vue]').forEach(b=>b.onclick=()=>go(b.dataset.vue));
  $$('.mode-toggle button').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
  $('#modale-fermer').onclick=fermerModale;
  $('#modale').onclick=e=>{if(e.target.id==='modale')fermerModale();};
  /* recherche */
  $('#recherche-symptome').addEventListener('input',e=>renderSymptomes(e.target.value));
  /* modules */
  renderSymptomes();
  renderChoixExam();
  initCR();
  initCourrier();
  initCephalees();
  initFormation();
  setMode('pedago');
  go('accueil');
});
