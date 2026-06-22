/* Interprétation biologique — renderer médecin (lecture seule). */
(function () {
  "use strict";
  var BIO = (window.BIOKB || []).slice();
  var el = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var norm = function (s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };
  var state = { q: "", spec: "", current: null };

  BIO.forEach(function (b) {
    b._search = norm([b.anomalie, b.specialite, b.definition,
      b.causes.map(function (c) { return c.cause + " " + c.signe; }).join(" "),
      (b.tableaux || []).map(function (t) {
        return (t.titre || "") + " " + (t.entetes || []).join(" ") + " " +
          (t.lignes || []).map(function (r) { return r.join(" "); }).join(" ");
      }).join(" ")].join(" "));
  });

  function filtered() {
    var nq = norm(state.q.trim());
    return BIO.filter(function (b) {
      if (state.spec && b.specialite !== state.spec) return false;
      if (nq && b._search.indexOf(nq) === -1) {
        return nq.split(/\s+/).every(function (t) { return b._search.indexOf(t) !== -1; });
      }
      return true;
    });
  }

  function renderList() {
    var items = filtered();
    el("noResult").hidden = items.length !== 0;
    el("anomList").innerHTML = items.map(function (b) {
      var active = state.current === b.id ? " active" : "";
      return "<li class='anom-item" + active + "' data-id='" + b.id + "'>" +
        "<span class='anom-num'>" + b.num + "</span>" +
        "<span class='anom-texts'><span class='anom-title'>" + esc(b.anomalie) + "</span>" +
        "<span class='anom-spec'>" + esc(b.specialite) + "</span></span></li>";
    }).join("");
    el("countBadge").textContent = items.length + " / " + BIO.length;
  }

  function ul(cls, arr) {
    return "<ul class='" + cls + "'>" + arr.map(function (x) {
      return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }

  function tableau(t) {
    var head = "<tr>" + (t.entetes || []).map(function (h) {
      return "<th>" + esc(h) + "</th>"; }).join("") + "</tr>";
    var body = (t.lignes || []).map(function (r) {
      return "<tr>" + r.map(function (c, i) {
        return i === 0 ? "<th>" + esc(c) + "</th>" : "<td>" + esc(c) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return "<div class='cmp-wrap'>" +
      (t.titre ? "<h4 class='cmp-title'>" + esc(t.titre) + "</h4>" : "") +
      "<table class='cmp'><thead>" + head + "</thead><tbody>" + body + "</tbody></table></div>";
  }

  function renderDetail(id) {
    var b = BIO.find(function (x) { return x.id === id; });
    if (!b) return;
    state.current = id;
    el("placeholder").hidden = true;
    var d = el("detail"); d.hidden = false;
    var causes = "<table class='causes'><thead><tr><th>Cause</th><th>Signe discriminant</th>" +
      "<th>Examens</th></tr></thead><tbody>" +
      b.causes.map(function (c) {
        return "<tr><td class='c-name'>" + esc(c.cause) + "</td>" +
          "<td>" + esc(c.signe) + "</td>" +
          "<td>" + c.examens.map(function (e) { return "<span class='exam'>" + esc(e) + "</span>"; }).join("") + "</td></tr>";
      }).join("") + "</tbody></table>";

    d.innerHTML =
      "<header class='detail-head'>" +
        "<div class='detail-eyebrow'><span class='detail-num'>Fiche " + b.num + "</span>" +
        "<span class='detail-spec'>" + esc(b.specialite) + "</span></div>" +
        "<h2>" + esc(b.anomalie) + "</h2>" +
        "<p class='definition'>" + esc(b.definition) + "</p>" +
      "</header>" +
      block("sec-pi", "1 · Première intention / démarche", ul("pi", b.premiere_intention)) +
      block("sec-cz", "2 · Causes à explorer & signes discriminants", causes) +
      (b.tableaux && b.tableaux.length
        ? block("sec-tab", "Tableaux comparatifs", b.tableaux.map(tableau).join("")) : "") +
      block("sec-rf", "⚠ Red flags / urgences", ul("rf", b.red_flags)) +
      block("sec-cat", "Conduite à tenir (points clés)", ul("cat", b.conduite));
    renderList();
    if (history.replaceState) history.replaceState(null, "", "#" + id);
    d.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function block(cls, title, html) {
    return "<section class='blk " + cls + "'><h3>" + esc(title) + "</h3>" + html + "</section>";
  }

  function buildSpecOptions() {
    var specs = {};
    BIO.forEach(function (b) { specs[b.specialite] = (specs[b.specialite] || 0) + 1; });
    var sel = el("specFilter");
    Object.keys(specs).sort(function (a, b) { return a.localeCompare(b, "fr"); }).forEach(function (s) {
      var o = document.createElement("option");
      o.value = s; o.textContent = s + " (" + specs[s] + ")";
      sel.appendChild(o);
    });
  }

  function init() {
    if (!BIO.length) { el("anomList").innerHTML = "<li style='padding:14px;color:#888'>Données indisponibles.</li>"; return; }
    buildSpecOptions();
    el("search").addEventListener("input", function (e) { state.q = e.target.value; renderList(); });
    el("specFilter").addEventListener("change", function (e) { state.spec = e.target.value; renderList(); });
    el("anomList").addEventListener("click", function (e) {
      var li = e.target.closest(".anom-item");
      if (li) renderDetail(li.getAttribute("data-id"));
    });
    renderList();
    var m = /#([a-z_]+)/.exec(location.hash);
    if (m && BIO.find(function (b) { return b.id === m[1]; })) renderDetail(m[1]);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
