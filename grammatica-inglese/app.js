/* ===== Grammatica Inglese — logica app ===== */
(function () {
  "use strict";
  const LS_KEY = "grammatica-inglese-done-v1";
  const done = new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));
  const saveDone = () => localStorage.setItem(LS_KEY, JSON.stringify([...done]));

  // DATA arriva da data.js -> window.GRAMMAR = [{cat, icon, topics:[{id,title,lead,html,quiz}]}]
  const DATA = window.GRAMMAR || [];
  const flat = [];
  DATA.forEach((c) => c.topics.forEach((t) => flat.push({ ...t, cat: c.cat, icon: c.icon })));
  const byId = Object.fromEntries(flat.map((t) => [t.id, t]));

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- Sidebar ---------- */
  function buildSidebar() {
    const nav = $("#nav");
    nav.innerHTML = "";
    DATA.forEach((c) => {
      const cat = el("div", "cat");
      const h = el("button", "cat-h", `${c.icon || "📘"} ${c.cat}<span class="chev">▾</span>`);
      const list = el("div", "cat-list");
      c.topics.forEach((t) => {
        const b = el("button", "nav-item" + (done.has(t.id) ? " done" : ""), `<span class="dot"></span><span>${t.title}</span>`);
        b.dataset.id = t.id;
        b.addEventListener("click", () => { openTopic(t.id); closeMobile(); });
        list.appendChild(b);
      });
      h.addEventListener("click", () => cat.classList.toggle("collapsed"));
      cat.append(h, list);
      nav.appendChild(cat);
    });
    updateNavState();
  }

  function updateNavState() {
    document.querySelectorAll(".nav-item").forEach((n) => {
      n.classList.toggle("done", done.has(n.dataset.id));
      n.classList.toggle("active", n.dataset.id === current);
    });
  }

  /* ---------- Progress ---------- */
  function updateProgress() {
    const pct = flat.length ? Math.round((done.size / flat.length) * 100) : 0;
    $("#pfill").style.width = pct + "%";
    $("#plbl").textContent = `${done.size}/${flat.length} • ${pct}%`;
  }

  /* ---------- Quiz rendering ---------- */
  function renderQuiz(quiz) {
    if (!quiz || !quiz.length) return "";
    const wrap = el("div", "card");
    wrap.appendChild(el("h3", null, "📝 Esercizi"));
    const qz = el("div", "quiz");
    quiz.forEach((q, i) => {
      const box = el("div", "q");
      box.appendChild(el("div", "qtext", `${i + 1}. ${q.q}`));
      const opts = el("div", "opts");
      const fb = el("div", "qfb", q.explain || "");
      q.options.forEach((opt, oi) => {
        const b = el("button", "opt", opt);
        b.addEventListener("click", () => {
          [...opts.children].forEach((c) => (c.disabled = true));
          if (oi === q.answer) b.classList.add("correct");
          else { b.classList.add("wrong"); opts.children[q.answer].classList.add("correct"); }
          fb.classList.add("show");
        });
        opts.appendChild(b);
      });
      box.append(opts, fb);
      qz.appendChild(box);
    });
    wrap.appendChild(qz);
    return wrap;
  }

  /* ---------- Topic view ---------- */
  let current = null;
  function openTopic(id) {
    const t = byId[id];
    if (!t) return showHome();
    current = id;
    location.hash = id;
    const c = $("#content");
    c.innerHTML = "";
    c.appendChild(el("div", "crumbs", `${t.icon || "📘"} ${t.cat}`));
    c.appendChild(el("h2", "topic", t.title));
    if (t.lead) c.appendChild(el("p", "lead", t.lead));
    const body = el("div"); body.innerHTML = t.html || "";
    c.appendChild(body);
    const quiz = renderQuiz(t.quiz);
    if (quiz) c.appendChild(quiz);

    // actions
    const actions = el("div", "actions");
    const mark = el("button", "btn primary" + (done.has(id) ? " is-done" : ""), done.has(id) ? "✓ Imparato" : "Segna come imparato");
    mark.addEventListener("click", () => {
      if (done.has(id)) { done.delete(id); mark.classList.remove("is-done"); mark.textContent = "Segna come imparato"; }
      else { done.add(id); mark.classList.add("is-done"); mark.textContent = "✓ Imparato"; }
      saveDone(); updateNavState(); updateProgress();
    });
    const home = el("button", "btn ghost", "← Indice");
    home.addEventListener("click", showHome);
    actions.append(mark, home);
    c.appendChild(actions);

    // pager
    const idx = flat.findIndex((x) => x.id === id);
    const pager = el("div", "pager");
    const prev = el("button", "btn", "‹ Precedente");
    const next = el("button", "btn", "Successivo ›");
    prev.disabled = idx <= 0; next.disabled = idx >= flat.length - 1;
    prev.addEventListener("click", () => idx > 0 && openTopic(flat[idx - 1].id));
    next.addEventListener("click", () => idx < flat.length - 1 && openTopic(flat[idx + 1].id));
    pager.append(prev, next);
    c.appendChild(pager);

    c.appendChild(el("div", "disc", "Contenuti a scopo didattico — inglese americano. Fonti: grammatiche inglesi per italiani (nspeak, ITIS Polistena, Erickson, UniTe)."));

    updateNavState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showHome() {
    current = null;
    if (location.hash) history.replaceState(null, "", location.pathname);
    const c = $("#content");
    c.innerHTML = "";
    const hero = el("div", "home-hero",
      `<div class="flag">🇺🇸</div><h2>Grammatica Inglese Americana</h2>
       <p class="lead">${flat.length} lezioni · spiegazioni in italiano · esempi reali · quiz interattivi.<br>Il tuo progresso viene salvato in questo browser.</p>`);
    c.appendChild(hero);
    const grid = el("div", "home-grid");
    DATA.forEach((cat) => {
      const total = cat.topics.length;
      const dn = cat.topics.filter((t) => done.has(t.id)).length;
      const pct = total ? Math.round((dn / total) * 100) : 0;
      const card = el("div", "home-card",
        `<h3>${cat.icon || "📘"} ${cat.cat}</h3><small>${dn}/${total} lezioni</small>
         <div class="bar"><span style="width:${pct}%"></span></div>`);
      card.addEventListener("click", () => openTopic(cat.topics[0].id));
      grid.appendChild(card);
    });
    c.appendChild(grid);
    updateNavState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Search ---------- */
  function onSearch(v) {
    const q = v.trim().toLowerCase();
    document.querySelectorAll("#nav .cat").forEach((cat) => {
      let any = false;
      cat.querySelectorAll(".nav-item").forEach((n) => {
        const t = byId[n.dataset.id];
        const hit = !q || t.title.toLowerCase().includes(q) || (t.lead || "").toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
        n.style.display = hit ? "" : "none";
        if (hit) any = true;
      });
      cat.style.display = any ? "" : "none";
      if (q) cat.classList.remove("collapsed");
    });
  }

  /* ---------- Mobile ---------- */
  const closeMobile = () => $("#sidebar").classList.remove("open");

  /* ---------- Init ---------- */
  function init() {
    buildSidebar();
    updateProgress();
    $("#search").addEventListener("input", (e) => onSearch(e.target.value));
    $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
    $("#brand").addEventListener("click", showHome);
    window.addEventListener("hashchange", () => {
      const id = location.hash.replace("#", "");
      if (id && byId[id] && id !== current) openTopic(id);
    });
    const start = location.hash.replace("#", "");
    if (start && byId[start]) openTopic(start); else showHome();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
