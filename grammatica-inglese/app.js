/* ===== Grammatica Inglese — logica app ===== */
(function () {
  "use strict";
  const LS_DONE = "grammatica-inglese-done-v1";
  const LS_SRS = "grammatica-inglese-srs-v1";
  const done = new Set(JSON.parse(localStorage.getItem(LS_DONE) || "[]"));
  const srs = JSON.parse(localStorage.getItem(LS_SRS) || "{}");
  const saveDone = () => localStorage.setItem(LS_DONE, JSON.stringify([...done]));
  const saveSrs = () => localStorage.setItem(LS_SRS, JSON.stringify(srs));

  // DATA da data.js; TRADUZIONI da translations.js
  const DATA = window.GRAMMAR || [];
  const TRANS = window.TRANSLATIONS || {};
  const flat = [];
  DATA.forEach((c) => c.topics.forEach((t) => flat.push({ ...t, cat: c.cat, icon: c.icon, trans: TRANS[t.id] || [] })));
  const byId = Object.fromEntries(flat.map((t) => [t.id, t]));

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const stripHtml = (s) => { const d = document.createElement("div"); d.innerHTML = s; return d.textContent || ""; };

  /* ---------- Spaced repetition (sistema Leitner) ---------- */
  const DAY = 24 * 60 * 60 * 1000;
  const BOX_DAYS = [0, 1, 3, 7, 14, 30]; // box 0 = subito, box 5 = padroneggiata

  function updateSRS(qid, correct) {
    const r = srs[qid] || { box: 0, due: 0, wrong: 0, seen: 0 };
    r.seen++;
    if (correct) r.box = Math.min(r.box + 1, BOX_DAYS.length - 1);
    else { r.box = 0; r.wrong++; }
    r.due = Date.now() + BOX_DAYS[r.box] * DAY;
    srs[qid] = r;
    saveSrs();
    updateDueBadge();
  }

  function dueItems() {
    const now = Date.now(); const out = [];
    flat.forEach((t) => {
      (t.quiz || []).forEach((q, i) => {
        const r = srs[`${t.id}:${i}`];
        if (r && r.due <= now && r.box < BOX_DAYS.length - 1) out.push({ kind: "quiz", t, q, i });
      });
      (t.trans || []).forEach((tr, i) => {
        const r = srs[`tr:${t.id}:${i}`];
        if (r && r.due <= now && r.box < BOX_DAYS.length - 1) out.push({ kind: "trans", t, tr, i });
      });
    });
    return out;
  }

  function updateDueBadge() {
    const b = $("#dueCount");
    if (!b) return;
    const n = dueItems().length;
    b.textContent = n;
    b.style.display = n ? "inline-block" : "none";
  }

  const shuffle = (a) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };

  /* ---------- Pronuncia (Web Speech API, en-US) ---------- */
  let voices = [];
  const loadVoices = () => { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; };
  if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }

  function speak(text) {
    if (!window.speechSynthesis || !text) return;
    const t = text.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
    if (!t) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US"; u.rate = 0.92;
    const v = voices.find((v) => v.lang === "en-US") || voices.find((v) => (v.lang || "").startsWith("en"));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }

  function speakBtn(text) {
    const b = el("button", "speak-btn", "🔊");
    b.title = "Ascolta la pronuncia";
    b.addEventListener("click", (e) => { e.stopPropagation(); speak(text); });
    return b;
  }

  /* ---------- Correttore traduzioni ---------- */
  function normTrans(s, dExp) {
    let x = s.toLowerCase().replace(/[’‘]/g, "'");
    x = x.replace(/won't/g, "will not").replace(/can't/g, "can not").replace(/cannot/g, "can not").replace(/shan't/g, "shall not");
    x = x.replace(/n't\b/g, " not");
    x = x.replace(/'m\b/g, " am").replace(/'re\b/g, " are").replace(/'ll\b/g, " will").replace(/'ve\b/g, " have");
    x = x.replace(/'d\b/g, " " + dExp);
    x = x.replace(/'/g, "");
    x = x.replace(/[.,!?;:"«»]/g, " ").replace(/\s+/g, " ").trim();
    return x;
  }

  // Damerau-Levenshtein (l'inversione di due lettere adiacenti conta 1)
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    const d = Array.from({ length: m + 1 }, (_, i) => { const r = new Array(n + 1); r[0] = i; return r; });
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[m][n];
  }

  // → "correct" | "typo" (piccolo refuso, conta come giusta) | "almost" | "wrong"
  function checkTranslation(tr, input) {
    const userVars = [normTrans(input, "would"), normTrans(input, "had")];
    let best = Infinity;
    for (const acc of tr.en) {
      for (const dExp of ["would", "had"]) {
        const a = normTrans(acc, dExp);
        for (const u of userVars) {
          if (u === a) return "correct";
          best = Math.min(best, lev(u, a));
        }
      }
    }
    if (best <= 1) return "typo";
    const th = tr.en[0].length > 14 ? 3 : 2;
    if (best <= th) return "almost";
    return "wrong";
  }

  /* ---------- Blocco traduzione (usato nelle lezioni e nel ripasso) ---------- */
  function transBlock(t, tr, i, opts = {}) {
    const qid = `tr:${t.id}:${i}`;
    const box = el("div", "q");
    box.appendChild(el("div", "qtext", `${opts.number != null ? opts.number + ". " : ""}🇮🇹 ${tr.it}`));
    const row = el("div", "trans-row");
    const inp = el("input", "trans-input");
    inp.type = "text"; inp.placeholder = "Scrivi la traduzione in inglese…";
    inp.autocapitalize = "off"; inp.autocomplete = "off"; inp.spellcheck = false;
    inp.setAttribute("lang", "en");
    const go = el("button", "btn primary", "Verifica");
    const fb = el("div", "qfb");
    const submit = () => {
      const val = inp.value.trim();
      if (!val || inp.disabled) return;
      inp.disabled = true; go.disabled = true;
      const res = checkTranslation(tr, val);
      const ok = res === "correct" || res === "typo";
      const best = tr.en[0];
      let msg;
      if (res === "correct") msg = `<span class="ok">✅ Corretto!</span> <b>${best}</b>`;
      else if (res === "typo") msg = `<span class="ok">✅ Giusta!</span> Occhio all'ortografia: <b>${best}</b>`;
      else if (res === "almost") msg = `<span class="almost">≈ Ci sei quasi!</span> La forma corretta: <b>${best}</b>`;
      else msg = `<span class="ko">✗ Non ancora.</span> Risposta: <b>${best}</b>`;
      if (tr.en.length > 1) msg += `<br><small>Accettate anche: ${tr.en.slice(1).join(" · ")}</small>`;
      if (tr.note) msg += `<br><small>💡 ${tr.note}</small>`;
      fb.innerHTML = msg;
      fb.prepend(speakBtn(best));
      fb.classList.add("show");
      updateSRS(qid, ok);
      if (!ok && !opts.review) {
        const retry = el("button", "btn retry-btn", "↻ Riprova");
        retry.addEventListener("click", () => { inp.disabled = false; go.disabled = false; inp.value = ""; fb.classList.remove("show"); retry.remove(); inp.focus(); });
        box.appendChild(retry);
      }
      if (opts.onDone) opts.onDone(ok, box);
    };
    go.addEventListener("click", submit);
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
    row.append(inp, go);
    box.append(row, fb);
    return box;
  }

  function renderTrans(t) {
    const list = t.trans;
    if (!list || !list.length) return null;
    const wrap = el("div", "card");
    wrap.appendChild(el("h3", null, "✍️ Traduci (risposta libera)"));
    wrap.appendChild(el("p", "trans-hint", "Scrivi la traduzione e premi Invio. Maiuscole, punteggiatura e contrazioni (don't / do not) non contano."));
    list.forEach((tr, i) => wrap.appendChild(transBlock(t, tr, i, { number: i + 1 })));
    return wrap;
  }

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

  /* ---------- Quiz a scelta multipla (nelle lezioni) ---------- */
  function renderQuiz(t) {
    const quiz = t.quiz;
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
          const ok = oi === q.answer;
          if (ok) b.classList.add("correct");
          else { b.classList.add("wrong"); opts.children[q.answer].classList.add("correct"); }
          updateSRS(`${t.id}:${i}`, ok);
          fb.prepend(speakBtn(stripHtml(q.options[q.answer])));
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
    const quiz = renderQuiz(t);
    if (quiz) c.appendChild(quiz);
    const trans = renderTrans(t);
    if (trans) c.appendChild(trans);

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

    c.appendChild(el("div", "disc", "💡 Clicca su un esempio <i>in corsivo</i> per ascoltarne la pronuncia americana. — Contenuti a scopo didattico (inglese americano). Fonti: grammatiche inglesi per italiani (nspeak/Nardella, ITIS Polistena, Erickson, Quaderni Aracne)."));

    updateNavState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Ripasso (spaced repetition) ---------- */
  function showReview() {
    current = null;
    if (location.hash) history.replaceState(null, "", location.pathname);
    const c = $("#content");
    c.innerHTML = "";
    c.appendChild(el("h2", "topic", "🔁 Ripasso intelligente"));

    const items = shuffle(dueItems());
    if (!items.length) {
      const tracked = Object.keys(srs).length;
      const mastered = Object.values(srs).filter((r) => r.box >= BOX_DAYS.length - 1).length;
      c.appendChild(el("div", "card",
        `<h3>✅ Niente da ripassare adesso</h3>
         <p>${tracked
            ? `Nel sistema di ripetizione ci sono <b>${tracked}</b> esercizi (${mastered} padroneggiati). Gli altri torneranno qui alla scadenza: <b>1 → 3 → 7 → 14 → 30 giorni</b>. Se sbagli, l'esercizio riparte da zero e torna subito.`
            : `Rispondi ai quiz e alle traduzioni nelle lezioni: ogni esercizio entra nel sistema di ripetizione e viene riproposto qui al momento giusto (subito se sbagliato, a distanza crescente se corretto).`}</p>`));
      const b = el("button", "btn primary", "← Torna all'indice");
      b.addEventListener("click", showHome);
      c.appendChild(b);
      updateNavState();
      return;
    }

    const meta = el("div", "review-meta");
    const box = el("div");
    c.append(meta, box);
    let k = 0, score = 0;

    const renderNext = () => {
      if (k >= items.length) {
        const pct = Math.round((score / items.length) * 100);
        meta.textContent = "";
        box.innerHTML = "";
        box.appendChild(el("div", "card",
          `<h3>🎯 Risultato: ${score}/${items.length} (${pct}%)</h3>
           <p>${pct >= 80 ? "Ottimo lavoro! Gli esercizi corretti torneranno tra qualche giorno, a intervalli sempre più lunghi."
             : pct >= 50 ? "Buon ripasso. Gli errori sono di nuovo in coda: torneranno subito."
             : "Non mollare: gli errori verranno riproposti finché non li padroneggi. È così che funziona la memoria a lungo termine."}</p>`));
        const again = dueItems().length;
        const act = el("div", "actions");
        const b1 = el("button", "btn primary", "← Indice");
        b1.addEventListener("click", showHome);
        act.appendChild(b1);
        if (again) {
          const b2 = el("button", "btn", `🔁 Ripassa ancora (${again})`);
          b2.addEventListener("click", showReview);
          act.appendChild(b2);
        }
        box.appendChild(act);
        return;
      }
      const item = items[k];
      const t = item.t;
      const label = item.kind === "trans" ? "traduzione" : "quiz";
      meta.innerHTML = `Domanda <b>${k + 1}</b> di ${items.length} (${label}) — dalla lezione: <b>${t.title}</b>`;
      box.innerHTML = "";

      const goNext = () => {
        const nb = el("button", "btn primary", k < items.length - 1 ? "Avanti ›" : "Vedi risultato");
        nb.style.marginTop = "10px";
        nb.addEventListener("click", () => { k++; renderNext(); });
        return nb;
      };

      if (item.kind === "trans") {
        const blk = transBlock(t, item.tr, item.i, {
          review: true,
          onDone: (ok, boxEl) => { if (ok) score++; boxEl.appendChild(goNext()); }
        });
        box.appendChild(blk);
        const inp = blk.querySelector(".trans-input");
        if (inp) inp.focus();
      } else {
        const q = item.q, i = item.i;
        const qc = el("div", "q");
        qc.appendChild(el("div", "qtext", q.q));
        const opts = el("div", "opts");
        const fb = el("div", "qfb", q.explain || "");
        q.options.forEach((opt, oi) => {
          const b = el("button", "opt", opt);
          b.addEventListener("click", () => {
            [...opts.children].forEach((x) => (x.disabled = true));
            const ok = oi === q.answer;
            if (ok) { b.classList.add("correct"); score++; }
            else { b.classList.add("wrong"); opts.children[q.answer].classList.add("correct"); }
            updateSRS(`${t.id}:${i}`, ok);
            fb.prepend(speakBtn(stripHtml(q.options[q.answer])));
            fb.classList.add("show");
            qc.appendChild(goNext());
          });
          opts.appendChild(b);
        });
        qc.append(opts, fb);
        box.appendChild(qc);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    renderNext();
    updateNavState();
  }

  /* ---------- Home ---------- */
  function showHome() {
    current = null;
    if (location.hash) history.replaceState(null, "", location.pathname);
    const c = $("#content");
    c.innerHTML = "";
    const due = dueItems().length;
    const hero = el("div", "home-hero",
      `<div class="flag">🇺🇸</div><h2>Grammatica Inglese Americana</h2>
       <p class="lead">${flat.length} lezioni · quiz e traduzioni a risposta libera · ripetizione spaziata.<br>
       💡 Clicca su un esempio <i>in corsivo</i> per ascoltarne la pronuncia americana.</p>`);
    c.appendChild(hero);

    if (due) {
      const banner = el("div", "card review-banner",
        `<h3>🔁 Hai <b>${due}</b> esercizi${due === 1 ? "o" : ""} da ripassare</h3>
         <p>Il ripasso al momento giusto è il modo più efficace per fissare la grammatica nella memoria a lungo termine.</p>`);
      const b = el("button", "btn primary", "Inizia il ripasso ›");
      b.addEventListener("click", showReview);
      banner.appendChild(b);
      c.appendChild(banner);
    }

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

    const reset = el("button", "btn ghost reset-btn", "🗑️ Azzera tutti i progressi");
    reset.addEventListener("click", () => {
      if (!confirm("Azzerare progressi e ripetizione spaziata? L'operazione non è reversibile.")) return;
      done.clear(); saveDone();
      for (const k in srs) delete srs[k];
      saveSrs();
      updateProgress(); updateDueBadge(); updateNavState(); showHome();
    });
    c.appendChild(reset);

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
    updateDueBadge();
    $("#search").addEventListener("input", (e) => onSearch(e.target.value));
    $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
    $("#brand").addEventListener("click", showHome);
    $("#brand2").addEventListener("click", showHome);
    $("#reviewBtn").addEventListener("click", showReview);
    // pronuncia: clic su un esempio in corsivo
    $("#content").addEventListener("click", (e) => {
      const it = e.target.closest("i");
      if (it && !e.target.closest("button")) speak(it.textContent);
    });
    window.addEventListener("hashchange", () => {
      const id = location.hash.replace("#", "");
      if (id && byId[id] && id !== current) openTopic(id);
    });
    const start = location.hash.replace("#", "");
    if (start && byId[start]) openTopic(start); else showHome();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
