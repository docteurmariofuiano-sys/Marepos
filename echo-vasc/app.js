/* =====================================================================
   ÉCHO-VASC DIU — moteur de formation (hors-ligne, sans dépendance)
   Lit window.VASC.chapters (alimenté par data/*.js) et rend les 13
   sections pédagogiques + widgets interactifs.
   ===================================================================== */
'use strict';

const VASC = window.VASC = window.VASC || { chapters: [] };
const CH = VASC.chapters;

/* ---------- utilitaires ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const norm = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const arr = x => Array.isArray(x) ? x : (x == null ? [] : [x]);

/* ---------- ordre & groupes des sections ---------- */
const SECTIONS = [
  { key: 'objectifs',     label: 'Objectifs',      icon: '🎯' },
  { key: 'anatomie',      label: 'Anatomie',       icon: '🫀' },
  { key: 'physiologie',   label: 'Physiologie',    icon: '🌊' },
  { key: 'physique',      label: 'Physique',       icon: '📡' },
  { key: 'reglages',      label: 'Réglages',       icon: '🎛️' },
  { key: 'installation',  label: 'Installation',   icon: '🧍' },
  { key: 'acquisition',   label: 'Acquisition',    icon: '🤚' },
  { key: 'interpretation',label: 'Interprétation', icon: '🔍' },
  { key: 'valeurs',       label: 'Valeurs normales',icon:'📊' },
  { key: 'pathologies',   label: 'Pathologies',    icon: '🩹' },
  { key: 'algorithme',    label: 'Algorithme',     icon: '🧭' },
  { key: 'cr',            label: 'Compte-rendu',   icon: '📝' },
  { key: 'cas',           label: 'Cas cliniques',  icon: '🧩' },
  { key: 'pieges',        label: 'Pièges',         icon: '⚠️' },
  { key: 'flashcards',    label: 'Flashcards',     icon: '🃏' },
  { key: 'qcm',           label: 'QCM',            icon: '✅' },
];

/* ---------- état ---------- */
let current = null;     // chapitre courant
let query = '';

/* =====================================================================
   SRS — révisions espacées (J1/J7/J30/J90) en localStorage
   ===================================================================== */
const SRS_KEY = 'echovasc.srs.v1';
const SRS_STEPS = [1, 7, 30, 90]; // jours
function srsLoad() { try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; } catch (e) { return {}; } }
function srsSave(o) { try { localStorage.setItem(SRS_KEY, JSON.stringify(o)); } catch (e) {} }
function todayStr() { const d = new Date(); return d.toISOString().slice(0, 10); }
function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function srsMark(id) {
  const o = srsLoad();
  const rec = o[id] || { stage: 0, last: null };
  rec.stage = Math.min(rec.stage + 1, SRS_STEPS.length);
  rec.last = todayStr();
  rec.next = nextDate(rec.last, SRS_STEPS[Math.min(rec.stage - 1, SRS_STEPS.length - 1)]);
  o[id] = rec; srsSave(o); renderSide(); updateSrsCount();
}
function srsReset(id) { const o = srsLoad(); delete o[id]; srsSave(o); renderSide(); updateSrsCount(); renderSrsList(); }
function nextDate(from, days) { const d = new Date(from); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); }
function srsDue(id) {
  const o = srsLoad(); const r = o[id]; if (!r || !r.next) return false;
  return r.next <= todayStr();
}
function dueCount() { return CH.filter(c => srsDue(c.id)).length; }
function updateSrsCount() {
  const n = dueCount(); const el = $('#srsCount');
  el.textContent = n; el.style.display = n ? 'inline-block' : 'none';
}

/* =====================================================================
   Rendu du menu latéral
   ===================================================================== */
function groups() {
  const g = [];
  const seen = new Map();
  CH.forEach(c => {
    const k = c.groupe || 'Autres';
    if (!seen.has(k)) { seen.set(k, []); g.push(k); }
    seen.get(k).push(c);
  });
  return g.map(k => ({ nom: k, items: seen.get(k) }));
}
function chapterMatches(c) {
  if (!query) return true;
  const hay = norm(JSON.stringify([c.titre, c.groupe, c.resume, c.objectifs,
    (c.pathologies || []).map(p => p.nom), c.tags]).slice(0, 6000));
  return hay.includes(norm(query));
}
function renderSide() {
  const side = $('#side');
  let html = '';
  groups().forEach(grp => {
    const items = grp.items.filter(chapterMatches);
    if (!items.length) return;
    html += `<h2>${esc(grp.nom)}</h2>`;
    items.forEach(c => {
      const due = srsDue(c.id) ? ' due' : '';
      const active = current && current.id === c.id ? ' active' : '';
      html += `<div class="navitem${active}${due}" data-id="${esc(c.id)}">
        <span class="ne">${c.emoji || '•'}</span>
        <span class="nn">${esc(c.titre)}</span>
        <span class="srsdot" title="À réviser"></span></div>`;
    });
  });
  if (!html) html = '<p class="muted" style="padding:10px">Aucun chapitre ne correspond.</p>';
  side.innerHTML = html;
  $$('.navitem', side).forEach(n => n.addEventListener('click', () => { selectChapter(n.dataset.id); }));
}

/* =====================================================================
   Rendu d'un chapitre
   ===================================================================== */
function selectChapter(id, push = true) {
  const c = CH.find(x => x.id === id);
  if (!c) return;
  current = c;
  renderSide();
  renderChapter(c);
  if (push) { try { history.replaceState(null, '', '#' + id); } catch (e) {} }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderChapter(c) {
  const present = SECTIONS.filter(s => hasSection(c, s.key));
  let html = headHTML(c);
  html += `<div class="tabbar">` + present.map(s =>
    `<button class="tab" data-go="sec-${s.key}">${s.icon} ${s.label}</button>`).join('') + `</div>`;
  present.forEach(s => { html += `<section class="panel" id="sec-${s.key}">${sectionHTML(c, s)}</section>`; });
  if (Array.isArray(c.refs) && c.refs.length) {
    html += `<div class="refbox"><strong>📚 Références du chapitre.</strong><ul class="clean">` +
      c.refs.map(r => `<li>${esc(r)}</li>`).join('') + `</ul></div>`;
  }
  const m = $('#content'); m.innerHTML = html;
  wireChapter(m, c);
}

function hasSection(c, key) {
  const v = c[key];
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'object') return Object.keys(v).length > 0;
  return true;
}

function headHTML(c) {
  const srs = srsLoad()[c.id];
  const srsTxt = srs ? `Révisé le ${srs.last} · prochaine ${srs.next || '—'} (palier ${srs.stage}/4)` : 'Jamais révisé';
  let badges = '';
  if (c.sonde) badges += `<span class="badge teal">🔱 ${esc(c.sonde)}</span>`;
  if (c.niveau) badges += `<span class="badge violet">${esc(c.niveau)}</span>`;
  if (c.duree) badges += `<span class="badge">⏱️ ${esc(c.duree)}</span>`;
  let obj = '';
  if (arr(c.objectifs).length) {
    obj = `<div class="objgrid">` + arr(c.objectifs).map(o => `<div class="o">${esc(o)}</div>`).join('') + `</div>`;
  }
  return `<div class="chapter-head">
    <h2>${c.emoji || ''} ${esc(c.titre)}</h2>
    <div class="badges">${badges}</div>
    ${c.resume ? `<p class="resume">${esc(c.resume)}</p>` : ''}
    ${obj}
    <div class="simbar" style="margin-top:14px">
      <button class="btn primary" id="srsMark">✅ J'ai révisé ce chapitre</button>
      <span class="muted" style="font-size:.82rem">${srsTxt}</span>
    </div>
  </div>`;
}

/* ---------- helpers de rendu ---------- */
function listHTML(items, cls = 'clean') {
  if (!arr(items).length) return '';
  return `<ul class="${cls}">` + arr(items).map(i => `<li>${richText(i)}</li>`).join('') + `</ul>`;
}
function richText(v) {
  if (v && typeof v === 'object' && (v.titre || v.t)) {
    return `<strong>${esc(v.titre || v.t)}</strong>${v.desc || v.d ? ' — ' + esc(v.desc || v.d) : ''}`;
  }
  return esc(v);
}
function figHTML(svg, caption) {
  if (!svg) return '';
  return `<figure class="fig">${svg}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`;
}
function subh(t, icon = '') { return `<div class="subh">${icon} ${esc(t)}</div>`; }

/* ---------- rendu par section ---------- */
function sectionTitle(s) { return `<h3><span class="si">${s.icon}</span> ${s.label}</h3>`; }

function sectionHTML(c, s) {
  const v = c[s.key];
  const head = sectionTitle(s);
  switch (s.key) {
    case 'objectifs': return head + listHTML(v);
    case 'anatomie': return head + anatomieHTML(v);
    case 'physiologie': return head + physioHTML(v);
    case 'physique': return head + physiqueHTML(v);
    case 'reglages': return head + reglagesHTML(v);
    case 'installation': return head + installHTML(v);
    case 'acquisition': return head + acquisitionHTML(v);
    case 'interpretation': return head + interpHTML(v);
    case 'valeurs': return head + valeursHTML(v);
    case 'pathologies': return head + pathosHTML(v);
    case 'algorithme': return head + algoHTML(v);
    case 'cr': return head + crHTML(v);
    case 'cas': return head + casHTML(v);
    case 'pieges': return head + piegesHTML(v);
    case 'flashcards': return head + fcHTML(v);
    case 'qcm': return head + qcmHTML(v);
    default: return head;
  }
}

function block(v) { // v = {texte, svg, caption, ...}
  let h = '';
  if (v.texte) h += `<p class="lead">${richPara(v.texte)}</p>`;
  if (v.svg) h += figHTML(v.svg, v.caption);
  return h;
}
function richPara(t) { return esc(t).replace(/\n/g, '<br>'); }

function anatomieHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = block(v);
  if (v.vascularisation) h += subh('Vascularisation', '🩸') + `<p class="lead">${richPara(v.vascularisation)}</p>`;
  if (arr(v.rapports).length) h += subh('Rapports', '🧭') + listHTML(v.rapports);
  if (arr(v.variantes).length) h += subh('Variantes anatomiques', '🔀') + listHTML(v.variantes);
  if (arr(v.points).length) h += listHTML(v.points);
  return h;
}
function physioHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = block(v);
  if (arr(v.profils).length) {
    h += subh('Profils de flux', '🌊');
    h += `<div class="grid2">` + arr(v.profils).map(p =>
      `<div class="card"><h4>${esc(p.nom || p.titre)}</h4><p style="font-size:.9rem;margin:0">${richPara(p.desc || p.d || '')}</p></div>`).join('') + `</div>`;
  }
  if (arr(v.points).length) h += listHTML(v.points);
  return h;
}
function physiqueHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = block(v);
  if (v.intro) h += `<p class="lead">${richPara(v.intro)}</p>`;
  if (arr(v.points).length) {
    h += arr(v.points).map(p =>
      `<div class="card"><h4>${esc(p.titre || p.t)}</h4><p style="font-size:.9rem;margin:0">${richPara(p.desc || p.d || '')}</p>${p.svg ? figHTML(p.svg, p.caption) : ''}</div>`).join('');
  }
  return h;
}
function reglagesHTML(v) {
  const rows = Array.isArray(v) ? v : (v.lignes || v.table || []);
  let h = (v && v.intro) ? `<p class="lead">${richPara(v.intro)}</p>` : '';
  if (v && v.svg) h += figHTML(v.svg, v.caption);
  if (rows.length) {
    h += `<table class="tbl"><thead><tr><th>Paramètre</th><th>Réglage conseillé</th><th>Pourquoi / astuce</th></tr></thead><tbody>` +
      rows.map(r => `<tr><td><strong>${esc(r.param || r.p)}</strong></td><td>${esc(r.valeur || r.v)}</td><td>${esc(r.note || r.n || '')}</td></tr>`).join('') +
      `</tbody></table>`;
  }
  return h;
}
function installHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = block(v);
  const map = [['patient', '🛏️ Patient'], ['operateur', '🧑‍⚕️ Opérateur'], ['ecran', '🖥️ Écran'],
    ['sonde', '🤚 Prise de sonde'], ['deplacement', '↔️ Déplacement'], ['ergonomie', '🦴 Ergonomie']];
  const kv = map.filter(([k]) => v[k]).map(([k, lab]) =>
    `<div class="kv"><div class="k">${lab}</div><div>${richPara(v[k])}</div></div>`).join('');
  if (kv) h += `<div class="card">${kv}</div>`;
  if (arr(v.points).length) h += listHTML(v.points);
  return h;
}
function acquisitionHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = block(v);
  if (arr(v.etapes).length) {
    h += `<div class="simbar"><button class="btn" data-sim="toggle">🎮 Mode simulation (masquer les réponses)</button><span class="muted" style="font-size:.82rem">Lisez « Que faites-vous ? », réfléchissez, puis révélez.</span></div>`;
    h += `<div data-steps>` + arr(v.etapes).map((e, i) =>
      `<div class="step"><div class="stitle">Étape ${i + 1} — ${esc(e.titre || e.t || '')}</div><div class="sdesc">${richPara(e.desc || e.d || e)}</div></div>`).join('') + `</div>`;
  }
  if (arr(v.reperes).length) h += subh('Repères anatomiques', '📍') + listHTML(v.reperes, 'clean');
  if (arr(v.astuces).length) h += subh('Astuces', '💡') + listHTML(v.astuces, 'chk');
  if (arr(v.erreurs).length) h += subh('Erreurs fréquentes', '⚠️') + listHTML(v.erreurs, 'warn');
  return h;
}
function interpHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = block(v);
  if (arr(v.normal).length || arr(v.pathologique).length) {
    h += `<div class="grid2">
      <div><div class="subh" style="color:var(--green)">✓ Normal</div>${listHTML(v.normal, 'chk')}${v.svgNormal ? figHTML(v.svgNormal, v.capNormal) : ''}</div>
      <div><div class="subh" style="color:var(--red)">✕ Pathologique</div>${listHTML(v.pathologique, 'warn')}${v.svgPatho ? figHTML(v.svgPatho, v.capPatho) : ''}</div>
    </div>`;
  }
  if (arr(v.points).length) h += listHTML(v.points);
  return h;
}
function valeursHTML(v) {
  const rows = Array.isArray(v) ? v : (v.lignes || v.table || []);
  let h = (v && v.intro) ? `<p class="lead">${richPara(v.intro)}</p>` : '';
  if (rows.length) {
    h += `<table class="tbl"><thead><tr><th>Paramètre</th><th>Valeur normale / seuil</th><th>Remarque</th></tr></thead><tbody>` +
      rows.map(r => `<tr><td><strong>${esc(r.param || r.p)}</strong></td><td>${esc(r.valeur || r.v)}</td><td>${esc(r.note || r.n || '')}</td></tr>`).join('') +
      `</tbody></table>`;
  }
  if (v && v.svg) h += figHTML(v.svg, v.caption);
  return h;
}
function pathosHTML(list) {
  return arr(list).map(p => {
    const g = p.gravite ? `<span class="pill ${p.gravite[0] === 'g' || /grav|urg|crit/i.test(p.gravite) ? 'r' : (/modér|inter/i.test(p.gravite) ? 'a' : 'g')}">${esc(p.gravite)}</span>` : '';
    const kv = [['physiopath', 'Physiopath.'], ['bmode', 'B-mode'], ['doppler', 'Doppler'],
      ['ddx', 'Diag. différentiel'], ['pieges', 'Pièges'], ['cat', 'Conduite à tenir']]
      .filter(([k]) => p[k]).map(([k, lab]) =>
        `<div class="kv"><div class="k">${lab}</div><div>${richPara(p[k])}</div></div>`).join('');
    return `<div class="card path"><h4>${esc(p.nom || p.titre)} ${g}</h4>${kv}${p.svg ? figHTML(p.svg, p.caption) : ''}</div>`;
  }).join('');
}
function algoHTML(v) {
  if (typeof v === 'string') return `<p class="lead">${richPara(v)}</p>`;
  let h = (v.titre ? `<p class="lead"><strong>${esc(v.titre)}</strong></p>` : '');
  if (v.svg) h += figHTML(v.svg, v.caption);
  const nodes = v.noeuds || v.etapes || v.arbre || [];
  if (arr(nodes).length) {
    h += `<div class="tree">` + arr(nodes).map(n => {
      if (typeof n === 'string') return `<div class="node"><span class="q">${esc(n)}</span></div>`;
      return `<div class="node"><span class="q">${esc(n.q || n.si || n.titre || '')}</span>${(n.a || n.alors || n.desc) ? `<div class="a">→ ${richPara(n.a || n.alors || n.desc)}</div>` : ''}</div>`;
    }).join('') + `</div>`;
  }
  return h;
}
function crHTML(v) {
  if (typeof v === 'string') return crBox('Compte-rendu', v);
  let h = '';
  if (v.normal) h += crBox('Modèle — examen normal', v.normal);
  if (v.pathologique) h += crBox('Modèle — examen pathologique', v.pathologique);
  if (Array.isArray(v.modeles)) v.modeles.forEach(m => h += crBox(m.titre, m.texte));
  return h;
}
function crBox(titre, texte) {
  return `${subh(titre, '📝')}<div class="cr"><button class="btn copy" data-copy>📋 Copier</button>${esc(texte)}</div>`;
}
function casHTML(list) {
  return arr(list).map((c, i) => {
    const qs = arr(c.questions).length ? `<ul class="clean">` + arr(c.questions).map(q => `<li>${esc(q)}</li>`).join('') + `</ul>` : '';
    const ind = arr(c.indices).length ? `<details><summary>💡 Indices</summary>${listHTML(c.indices)}</details>` : '';
    const rep = c.reponse ? `<details><summary>✅ Voir la correction</summary><div class="reveal">${richPara(c.reponse)}</div></details>` : '';
    return `<div class="cas"><div><span class="num">Cas ${i + 1}.</span> ${esc(c.titre || '')}</div>
      <p class="lead">${richPara(c.enonce || '')}</p>${qs}${ind}${rep}</div>`;
  }).join('');
}
function piegesHTML(list) {
  return `<p class="lead muted">Extrait de « les erreurs qui font perdre un diagnostic » pour ce territoire.</p>` +
    arr(list).map(p => `<div class="danger">${richPara(typeof p === 'string' ? p : (p.titre ? '<strong>' + esc(p.titre) + '</strong> — ' + esc(p.desc) : ''))}</div>`).join('');
}
function fcHTML(list) {
  return `<p class="muted" style="font-size:.86rem">Cliquez une carte pour la retourner.</p><div class="fcgrid">` +
    arr(list).map(f => `<div class="fc"><div class="fc-in"><div class="fc-f">${esc(f.q)}</div><div class="fc-b">${esc(f.r)}</div></div></div>`).join('') + `</div>`;
}
function qcmHTML(list) {
  return arr(list).map((q, qi) => {
    const opts = arr(q.options).map((o, oi) =>
      `<button class="opt" data-q="${qi}" data-o="${oi}">${esc(o)}</button>`).join('');
    return `<div class="qcm" data-correct="${q.correct}"><div class="q">${qi + 1}. ${esc(q.q)}</div>${opts}<div class="exp">${richPara(q.exp || '')}</div></div>`;
  }).join('');
}

/* =====================================================================
   Branchement des interactions après rendu
   ===================================================================== */
function wireChapter(root, c) {
  // tabs -> scroll
  $$('.tab', root).forEach(t => t.addEventListener('click', () => {
    $$('.tab', root).forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const el = $('#' + t.dataset.go, root); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  // SRS mark
  const sm = $('#srsMark', root); if (sm) sm.addEventListener('click', () => { srsMark(c.id); selectChapter(c.id, false); });
  // simulation
  $$('[data-sim="toggle"]', root).forEach(b => b.addEventListener('click', () => {
    const cont = b.closest('section').querySelector('[data-steps]');
    const on = !cont.classList.contains('on');
    cont.classList.toggle('on', on);
    $$('.step', cont).forEach(s => s.classList.toggle('sim', on));
    b.textContent = on ? '👁️ Quitter le mode simulation' : '🎮 Mode simulation (masquer les réponses)';
  }));
  root.addEventListener('click', e => {
    const sd = e.target.closest('.step.sim .sdesc'); if (sd) sd.classList.add('shown');
  });
  // flashcards
  $$('.fc', root).forEach(f => f.addEventListener('click', () => f.classList.toggle('flip')));
  // QCM
  $$('.qcm .opt', root).forEach(o => o.addEventListener('click', () => {
    const box = o.closest('.qcm'); if (box.dataset.done) return;
    box.dataset.done = '1';
    const correct = +box.dataset.correct;
    $$('.opt', box).forEach((b, i) => { if (i === correct) b.classList.add('good'); });
    if (+o.dataset.o !== correct) o.classList.add('bad');
    box.querySelector('.exp').classList.add('show');
  }));
  // copy CR
  $$('[data-copy]', root).forEach(b => b.addEventListener('click', () => {
    const txt = b.parentElement.textContent.replace(/^📋 Copier/, '').trim();
    navigator.clipboard && navigator.clipboard.writeText(txt);
    const old = b.textContent; b.textContent = '✓ Copié'; setTimeout(() => b.textContent = old, 1400);
  }));
  // active first tab
  const t0 = $('.tab', root); if (t0) t0.classList.add('active');
}

/* =====================================================================
   SRS modal
   ===================================================================== */
function renderSrsList() {
  const o = srsLoad();
  const rows = CH.map(c => ({ c, r: o[c.id] }));
  const due = rows.filter(x => srsDue(x.c.id));
  const scheduled = rows.filter(x => x.r && !srsDue(x.c.id));
  let h = '';
  h += `<div class="subh">À revoir aujourd'hui (${due.length})</div>`;
  h += due.length ? due.map(x => srsRow(x.c, x.r, true)).join('') : '<p class="muted" style="font-size:.86rem">Rien à revoir 🎉</p>';
  h += `<div class="subh">Programmés</div>`;
  h += scheduled.length ? scheduled.map(x => srsRow(x.c, x.r, false)).join('') : '<p class="muted" style="font-size:.86rem">Aucun chapitre programmé.</p>';
  $('#srsList').innerHTML = h;
  $$('#srsList [data-open]').forEach(b => b.addEventListener('click', () => { closeSrs(); selectChapter(b.dataset.open); }));
  $$('#srsList [data-reset]').forEach(b => b.addEventListener('click', () => srsReset(b.dataset.reset)));
}
function srsRow(c, r, due) {
  return `<div class="srsrow">
    <div>${c.emoji || ''} <strong>${esc(c.titre)}</strong>
      <span class="tag muted"> · ${due ? 'à revoir' : 'prochaine ' + (r.next || '—')} · palier ${r.stage}/4</span></div>
    <div><button class="btn" data-open="${esc(c.id)}">Ouvrir</button>
      <button class="btn ghost" data-reset="${esc(c.id)}" title="Réinitialiser">↺</button></div>
  </div>`;
}
window.closeSrs = () => $('#overlay').classList.remove('open');

/* =====================================================================
   Boot
   ===================================================================== */
function boot() {
  if (!CH.length) {
    $('#content').innerHTML = '<div class="chapter-head"><h2>⚠️ Données non chargées</h2><p>Les fichiers de chapitres (data/*.js) n\'ont pas pu être lus. Servez le dossier en HTTP (ex. <code>python3 -m http.server</code>).</p></div>';
    return;
  }
  CH.sort((a, b) => (a.num || 0) - (b.num || 0));
  renderSide();
  updateSrsCount();
  $('#search').addEventListener('input', e => { query = e.target.value; renderSide(); });
  $('#btnSrs').addEventListener('click', () => { renderSrsList(); $('#overlay').classList.add('open'); });
  $('#overlay').addEventListener('click', e => { if (e.target.id === 'overlay') closeSrs(); });
  const hash = location.hash.replace('#', '');
  selectChapter(CH.find(c => c.id === hash) ? hash : CH[0].id, false);
}
document.addEventListener('DOMContentLoaded', boot);
