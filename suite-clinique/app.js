/* Application de consultation — Fiches d'interrogatoire par symptôme
   Données : window.FICHES (généré depuis le PDF du Dr Mario Fuiano). */
(function () {
  "use strict";

  var FICHES = (window.FICHES || []).slice();
  var state = { q: "", specialty: "", urgOnly: false, current: null };

  // ---------- Helpers ----------
  function el(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // strip parentheses suffix like "(URGENCE)" and take first specialty token
  function primarySpecialty(cat) {
    var c = cat.replace(/\(URGENCE\)/i, "").trim();
    var token = c.split(/\s*[\/–-]\s*/)[0].trim();
    return token || "Autres";
  }

  function dewrap(block) {
    return block.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
  }

  function normalize(s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  // highlight query terms in an already HTML-escaped string
  function highlight(html, q) {
    if (!q) return html;
    var terms = q.split(/\s+/).filter(function (t) { return t.length >= 2; });
    terms.forEach(function (term) {
      // build accent-insensitive-ish regex on the escaped text (best effort, case-insensitive)
      var safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      try {
        var re = new RegExp("(" + safe + ")", "gi");
        html = html.replace(re, "<mark>$1</mark>");
      } catch (e) { /* ignore bad regex */ }
    });
    return html;
  }

  // ---------- Section formatters ----------
  function fmtInterrogatoire(text, q) {
    var blocks = text.split(/\n\s*\n/);
    var out = "";
    blocks.forEach(function (b) {
      var d = dewrap(b);
      if (!d) return;
      if (d.indexOf("?") !== -1) {
        // split into questions
        var items = d.split(/(?<=\?)\s+/).map(function (x) { return x.trim(); })
          .filter(Boolean);
        out += "<ul class='q-list'>";
        items.forEach(function (it) {
          out += "<li>" + highlight(escapeHtml(it), q) + "</li>";
        });
        out += "</ul>";
      } else {
        out += "<p class='subhead'>" + highlight(escapeHtml(d), q) + "</p>";
      }
    });
    return out;
  }

  function fmtDifferentiels(text, q) {
    var blocks = text.split(/\n\s*\n/);
    var out = "";
    blocks.forEach(function (b) {
      var d = dewrap(b);
      if (!d) return;
      var words = d.split(/\s+/).length;
      var isTerm = d.length <= 46 && words <= 7 &&
        d.indexOf("→") === -1 && !/[.?]$/.test(d);
      if (isTerm) {
        out += "<p class='dx-term'>" + highlight(escapeHtml(d), q) + "</p>";
      } else {
        out += "<p class='dx-desc'>" + highlight(escapeHtml(d), q) + "</p>";
      }
    });
    return out;
  }

  function fmtParagraph(text, q) {
    var blocks = text.split(/\n\s*\n/);
    return blocks.map(function (b) {
      var d = dewrap(b);
      return d ? "<p>" + highlight(escapeHtml(d), q) + "</p>" : "";
    }).join("");
  }

  function fmtRedFlags(text, q) {
    var lines = text.split(/\n/);
    var merged = [];
    lines.forEach(function (ln) {
      var t = ln.trim();
      if (!t) return;
      // continuation if starts lowercase or with punctuation
      if (merged.length && /^[a-zàâäéèêëîïôöùûüç(]/.test(t)) {
        merged[merged.length - 1] += " " + t;
      } else {
        merged.push(t);
      }
    });
    var out = "<ul class='rf-list'>";
    merged.forEach(function (it) {
      out += "<li>" + highlight(escapeHtml(it), q) + "</li>";
    });
    return out + "</ul>";
  }

  // ---------- Filtering ----------
  function buildSearchText(f) {
    return normalize([f.num, f.title, f.category, f.interrogatoire,
      f.differentiels, f.pathognomonique, f.redflags].join(" "));
  }
  FICHES.forEach(function (f) {
    f._search = buildSearchText(f);
    f._spec = primarySpecialty(f.category);
  });

  function filtered() {
    var nq = normalize(state.q.trim());
    return FICHES.filter(function (f) {
      if (state.urgOnly && !f.urgence) return false;
      if (state.specialty && f._spec !== state.specialty) return false;
      if (nq && f._search.indexOf(nq) === -1) {
        // allow multi-term AND match
        var terms = nq.split(/\s+/);
        if (!terms.every(function (t) { return f._search.indexOf(t) !== -1; }))
          return false;
      }
      return true;
    });
  }

  // ---------- Rendering ----------
  function renderList() {
    var list = el("ficheList");
    var items = filtered();
    el("noResult").hidden = items.length !== 0;
    list.innerHTML = items.map(function (f) {
      var active = state.current === f.num ? " active" : "";
      var urg = f.urgence ? "<span class='urg-tag'>URGENCE</span>" : "";
      return "<li class='fiche-item" + active + "' data-num='" + f.num + "'>" +
        "<span class='fiche-num'>" + escapeHtml(f.num) + "</span>" +
        "<span class='fiche-texts'>" +
        "<span class='fiche-title'>" + highlight(escapeHtml(f.title), state.q) + urg + "</span>" +
        "<span class='fiche-cat'>" + escapeHtml(f.category) + "</span>" +
        "</span></li>";
    }).join("");
    el("countBadge").textContent = items.length + (items.length > 1 ? " fiches" : " fiche");
  }

  function section(cls, dot, label, bodyHtml) {
    return "<div class='section " + cls + "'>" +
      "<div class='section-head'><span class='section-dot'></span>" +
      escapeHtml(label) + "</div>" +
      "<div class='section-body'>" + bodyHtml + "</div></div>";
  }

  function renderDetail(num) {
    var f = FICHES.find(function (x) { return x.num === num; });
    var d = el("ficheDetail");
    if (!f) { d.hidden = true; el("placeholder").hidden = false; return; }
    state.current = num;
    el("placeholder").hidden = true;
    d.hidden = false;
    el("content").classList.add("has-selection");
    var urg = f.urgence ? "<span class='detail-urg'>⚠ URGENCE</span>" : "";
    d.innerHTML =
      "<header class='detail-head'>" +
      "<div class='detail-eyebrow'>" +
      "<span class='detail-num'>Fiche " + escapeHtml(f.num) + "</span>" +
      "<span class='detail-cat'>" + escapeHtml(f.category) + "</span>" + urg +
      "</div>" +
      "<h2 class='detail-title'>" + escapeHtml(f.title) + "</h2>" +
      "</header>" +
      section("sec-interro", "", "Interrogatoire ciblé", fmtInterrogatoire(f.interrogatoire, state.q)) +
      section("sec-diff", "", "Diagnostics différentiels & signes discriminants", fmtDifferentiels(f.differentiels, state.q)) +
      section("sec-patho", "", "Pathognomonique / orientation forte", fmtParagraph(f.pathognomonique, state.q)) +
      section("sec-rf", "", "⚠ Red flags / urgences", fmtRedFlags(f.redflags, state.q));
    // update active state in list and hash
    renderList();
    if (history.replaceState) history.replaceState(null, "", "#fiche-" + num);
    d.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildSpecialtyOptions() {
    var specs = {};
    FICHES.forEach(function (f) { specs[f._spec] = (specs[f._spec] || 0) + 1; });
    var names = Object.keys(specs).sort(function (a, b) { return a.localeCompare(b, "fr"); });
    var sel = el("specialtyFilter");
    names.forEach(function (n) {
      var o = document.createElement("option");
      o.value = n;
      o.textContent = n + " (" + specs[n] + ")";
      sel.appendChild(o);
    });
  }

  // ---------- Events ----------
  function bind() {
    var search = el("search");
    search.addEventListener("input", function () {
      state.q = search.value;
      el("clearSearch").classList.toggle("show", !!search.value);
      renderList();
    });
    el("clearSearch").addEventListener("click", function () {
      search.value = ""; state.q = "";
      el("clearSearch").classList.remove("show");
      renderList(); search.focus();
    });
    el("specialtyFilter").addEventListener("change", function (e) {
      state.specialty = e.target.value; renderList();
    });
    el("urgOnly").addEventListener("change", function (e) {
      state.urgOnly = e.target.checked; renderList();
    });
    el("ficheList").addEventListener("click", function (e) {
      var li = e.target.closest(".fiche-item");
      if (li) renderDetail(li.getAttribute("data-num"));
    });
  }

  // ---------- Init ----------
  function init() {
    if (!FICHES.length) {
      el("ficheList").innerHTML = "<li style='padding:16px;color:#888'>Données indisponibles.</li>";
      return;
    }
    buildSpecialtyOptions();
    bind();
    renderList();
    // deep link
    var m = /#fiche-(\d{2})/.exec(location.hash);
    if (m && FICHES.find(function (f) { return f.num === m[1]; })) {
      renderDetail(m[1]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
