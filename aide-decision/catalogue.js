/* Catalogue des motifs de consultation — navigation + liens vers les fiches. */
(function () {
  "use strict";
  var CATS = window.MOTIFS || [];
  var el = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var norm = function (s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
  var state = { q: "", urgOnly: false, ficheOnly: false };

  // total motifs & coverage
  var TOTAL = 0, MAPPED = 0;
  CATS.forEach(function (c) {
    ["frequents", "urgences"].forEach(function (k) {
      (c[k] || []).forEach(function (m) { TOTAL++; if (m.f || m.b) MAPPED++; });
    });
  });

  function linkFor(m) {
    if (m.f) return { href: "index.html#s=" + m.f, cls: "clin", title: "Ouvrir la fiche décisionnelle" };
    if (m.b) return { href: "biologie.html#" + m.b, cls: "bio", title: "Ouvrir l'interprétation biologique" };
    return null;
  }

  function motifMatches(m, isUrg) {
    if (state.urgOnly && !isUrg) return false;
    if (state.ficheOnly && !(m.f || m.b)) return false;
    if (state.q && norm(m.l).indexOf(norm(state.q)) === -1) return false;
    return true;
  }

  function motifHtml(m, isUrg) {
    var lk = linkFor(m);
    var dot = "<span class='dot " + (m.f ? "dot-clin" : m.b ? "dot-bio" : "dot-ref") + "'></span>";
    var urg = isUrg ? "<span class='urgchip'>⚠</span>" : "";
    var label = esc(m.l);
    if (lk) {
      return "<a class='motif " + lk.cls + "' href='" + lk.href + "' title='" + lk.title + "'>" +
        dot + "<span class='m-label'>" + label + "</span>" + urg + "<span class='go'>→</span></a>";
    }
    return "<span class='motif ref'>" + dot + "<span class='m-label'>" + label + "</span>" + urg + "</span>";
  }

  function render() {
    var html = "", shown = 0;
    CATS.forEach(function (c) {
      var fr = (c.frequents || []).filter(function (m) { return motifMatches(m, false); });
      var ur = (c.urgences || []).filter(function (m) { return motifMatches(m, true); });
      if (!fr.length && !ur.length) return;
      shown += fr.length + ur.length;
      html += "<section class='cat'>" +
        "<h2><span class='cat-ico'>" + esc(c.icone || "•") + "</span>" +
        "<span class='cat-n'>" + c.n + "</span> " + esc(c.titre) +
        "<span class='cat-count'>" + (fr.length + ur.length) + "</span></h2>";
      if (fr.length) html += "<div class='grp'><h3>Motifs fréquents</h3><div class='motifs'>" +
        fr.map(function (m) { return motifHtml(m, false); }).join("") + "</div></div>";
      if (ur.length) html += "<div class='grp urg'><h3>⚠ Aux urgences</h3><div class='motifs'>" +
        ur.map(function (m) { return motifHtml(m, true); }).join("") + "</div></div>";
      html += "</section>";
    });
    el("cats").innerHTML = html || "<p class='empty'>Aucun motif ne correspond.</p>";
    el("countBadge").textContent = shown + " motifs affichés · " + MAPPED + "/" + TOTAL + " reliés à une fiche";
  }

  function init() {
    if (!CATS.length) { el("cats").innerHTML = "<p class='empty'>Données indisponibles.</p>"; return; }
    el("search").addEventListener("input", function (e) { state.q = e.target.value; render(); });
    el("urgOnly").addEventListener("change", function (e) { state.urgOnly = e.target.checked; render(); });
    el("ficheOnly").addEventListener("change", function (e) { state.ficheOnly = e.target.checked; render(); });
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
