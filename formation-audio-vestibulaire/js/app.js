/* =====================================================================
   FORMATION AUDIO-VESTIBULAIRE — moteur de l'application
   Rendu de la navigation, recherche, thème, impression.
   Dépend de FORMATION (défini dans contenu.js).
   ===================================================================== */
'use strict';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const norm = t => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

let FLAT = [];      // liste plate des sections {id, cat, ico, titre, niveau, html}
let CUR = null;

/* ---------- Construction de la liste plate ---------- */
function buildFlat() {
  FLAT = [];
  FORMATION.forEach(grp => {
    grp.sections.forEach(s => {
      FLAT.push({ ...s, cat: grp.cat, catIco: grp.ico });
    });
  });
}

/* ---------- Sidebar ---------- */
function buildSidebar() {
  const nav = $("#nav");
  let html = "";
  FORMATION.forEach(grp => {
    html += `<div class="nav-group"><div class="nav-group-title">${grp.ico || ""} ${grp.cat}</div>`;
    grp.sections.forEach(s => {
      html += `<button class="nav-link" data-id="${s.id}">
        <span class="nl-ico">${s.ico || "•"}</span>${s.titre}</button>`;
    });
    html += `</div>`;
  });
  nav.innerHTML = html;
  $$(".nav-link", nav).forEach(b => b.addEventListener("click", () => {
    show(b.dataset.id);
    document.body.classList.remove("nav-open");
  }));
}

/* ---------- Rendu d'une section ---------- */
function renderSection(s) {
  const niv = s.niveau ? `<span class="tag-niv ${s.niveau.cls}">${s.niveau.txt}</span>` : "";
  return `<section class="section" id="sec-${s.id}">
    <div class="crumb">${s.catIco || ""} ${s.cat}</div>
    <h2>${s.titre} ${niv}</h2>
    ${s.html}
    ${renderSectionNav(s.id)}
    <p class="disclaimer">⚠️ Support de <strong>formation</strong> et d'aide au raisonnement.
    Il ne remplace ni l'examen clinique, ni le jugement médical, ni les recommandations en vigueur.
    Les seuils, valeurs et protocoles cités sont indicatifs et doivent être confrontés aux
    <strong>référentiels en cours et aux protocoles locaux</strong>. Urgence vitale : <strong>15 / 112</strong>.</p>
  </section>`;
}

function renderSectionNav(id) {
  const i = FLAT.findIndex(x => x.id === id);
  const prev = FLAT[i - 1], next = FLAT[i + 1];
  let h = `<div class="section-nav">`;
  h += prev ? `<button data-go="${prev.id}"><small>← Précédent</small>${prev.titre}</button>` : `<span></span>`;
  h += next ? `<button data-go="${next.id}" style="text-align:right;margin-left:auto"><small>Suivant →</small>${next.titre}</button>` : `<span></span>`;
  h += `</div>`;
  return h;
}

function renderAll() {
  $("#content").innerHTML = FLAT.map(renderSection).join("");
  // wire QCM, accordéons internes, boutons prev/next
  $$(".section-nav button[data-go]").forEach(b =>
    b.addEventListener("click", () => show(b.dataset.go)));
  wireQcm();
}

/* ---------- QCM interactif ---------- */
function wireQcm() {
  $$(".qcm").forEach(q => {
    const opts = $$(".opt", q);
    opts.forEach(o => o.addEventListener("click", () => {
      if (q.classList.contains("revealed")) return;
      opts.forEach(x => {
        if (x.dataset.good === "1") x.classList.add("good");
        else if (x === o) x.classList.add("bad");
      });
      q.classList.add("revealed");
    }));
  });
}

/* ---------- Navigation ---------- */
function show(id) {
  const target = FLAT.find(x => x.id === id) ? id : (FLAT[0] && FLAT[0].id);
  $$(".section").forEach(s => s.classList.remove("active"));
  const el = $("#sec-" + target);
  if (el) el.classList.add("active");
  $$(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.id === target));
  CUR = target;
  clearSearch();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  try { history.replaceState(null, "", "#" + target); } catch (e) {}
}

/* ---------- Recherche ---------- */
function doSearch(q) {
  const nq = norm(q).trim();
  const res = $("#results");
  if (!nq) { clearSearch(); return; }
  $("#content").style.display = "none";
  res.style.display = "block";
  const hits = FLAT.map(s => {
    const text = norm(s.titre + " " + s.html.replace(/<[^>]+>/g, " "));
    let score = 0;
    nq.split(/\s+/).forEach(w => { if (text.includes(w)) score++; });
    return { s, score };
  }).filter(h => h.score > 0).sort((a, b) => b.score - a.score);

  if (!hits.length) {
    res.innerHTML = `<div class="search-empty"><strong>Aucun résultat pour « ${q} ».</strong><br>Essayez un autre terme (ex. « HINTS », « Ménière », « masquage », « VEMP »).</div>`;
    return;
  }
  res.innerHTML = `<p class="crumb">${hits.length} section(s) trouvée(s)</p>` +
    hits.map(({ s }) => `<button class="nav-link" style="border:1px solid var(--line);margin:6px 0;width:100%;padding:12px"
        data-id="${s.id}"><strong>${s.ico || ""} ${s.titre}</strong>
        <div class="crumb" style="margin:4px 0 0">${s.catIco || ""} ${s.cat}</div></button>`).join("");
  $$(".nav-link", res).forEach(b => b.addEventListener("click", () => { show(b.dataset.id); }));
}
function clearSearch() {
  $("#results").style.display = "none";
  $("#content").style.display = "block";
}

/* ---------- Thème ---------- */
function initTheme() {
  const saved = localStorage.getItem("av-theme");
  if (saved) document.documentElement.dataset.theme = saved;
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = cur;
    localStorage.setItem("av-theme", cur);
    $("#themeBtn").textContent = cur === "dark" ? "☀️" : "🌙";
  });
  $("#themeBtn").textContent = document.documentElement.dataset.theme === "dark" ? "☀️" : "🌙";
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildFlat();
  buildSidebar();
  renderAll();
  initTheme();

  const fromHash = (location.hash || "").replace("#", "");
  show(FLAT.find(x => x.id === fromHash) ? fromHash : FLAT[0].id);

  const search = $("#search");
  let t;
  search.addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => doSearch(e.target.value), 120); });
  search.addEventListener("keydown", e => { if (e.key === "Escape") { search.value = ""; clearSearch(); } });

  $("#menuBtn").addEventListener("click", () => document.body.classList.toggle("nav-open"));
  $("#scrim").addEventListener("click", () => document.body.classList.remove("nav-open"));
  $("#printBtn").addEventListener("click", () => window.print());
});
