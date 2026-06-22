/* Procédures & prévention — aide-mémoire médecin (lecture seule, NON diagnostique). */
(function () {
  "use strict";
  var CATS = (window.PROCEDURES || []).slice();
  var el = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var norm = function (s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  };
  var state = { q: "", current: null };

  // index plat des items + recherche
  var ITEMS = [];
  CATS.forEach(function (c) {
    (c.items || []).forEach(function (it) {
      it._cat = c.cat; it._ico = c.icone;
      it._search = norm([it.titre, c.cat, (it.points || []).join(" "),
        (it.alerte || []).join(" ")].join(" "));
      ITEMS.push(it);
    });
  });

  function matches(it) {
    var nq = norm(state.q.trim());
    if (!nq) return true;
    if (it._search.indexOf(nq) !== -1) return true;
    return nq.split(/\s+/).every(function (t) { return it._search.indexOf(t) !== -1; });
  }

  function renderList() {
    var shown = 0, html = "";
    CATS.forEach(function (c) {
      var its = (c.items || []).filter(matches);
      if (!its.length) return;
      shown += its.length;
      html += "<li class='cat-head'><span class='cat-ico'>" + esc(c.icone || "•") +
        "</span>" + esc(c.cat) + "</li>";
      html += its.map(function (it) {
        var active = state.current === it.id ? " active" : "";
        var alert = it.alerte && it.alerte.length ? "<span class='proc-flag' title='Comporte un signal de vigilance'>⚠</span>" : "";
        return "<li class='proc-item" + active + "' data-id='" + it.id + "'>" +
          "<span class='proc-title'>" + esc(it.titre) + "</span>" + alert + "</li>";
      }).join("");
    });
    el("procList").innerHTML = html;
    el("noResult").hidden = shown !== 0;
    el("countBadge").textContent = shown + " / " + ITEMS.length;
  }

  function ul(cls, arr) {
    return "<ul class='" + cls + "'>" + arr.map(function (x) {
      return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }

  function block(cls, title, html) {
    return "<section class='blk " + cls + "'><h3>" + esc(title) + "</h3>" + html + "</section>";
  }

  function renderDetail(id) {
    var it = ITEMS.find(function (x) { return x.id === id; });
    if (!it) return;
    state.current = id;
    el("placeholder").hidden = true;
    var d = el("detail"); d.hidden = false;
    var html =
      "<header class='detail-head'>" +
        "<div class='detail-eyebrow'><span class='detail-ico'>" + esc(it._ico || "•") + "</span>" +
        "<span class='detail-cat'>" + esc(it._cat) + "</span></div>" +
        "<h2>" + esc(it.titre) + "</h2>" +
      "</header>" +
      block("sec-pts", "Points clés / check-list", ul("pts", it.points || []));
    if (it.alerte && it.alerte.length) {
      html += block("sec-rf", "⚠ Vigilance / escalade", ul("rf", it.alerte));
    }
    d.innerHTML = html;
    renderList();
    if (history.replaceState) history.replaceState(null, "", "#" + id);
    d.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function init() {
    if (!ITEMS.length) { el("procList").innerHTML = "<li style='padding:14px;color:#888'>Données indisponibles.</li>"; return; }
    el("search").addEventListener("input", function (e) { state.q = e.target.value; renderList(); });
    el("procList").addEventListener("click", function (e) {
      var li = e.target.closest(".proc-item");
      if (li) renderDetail(li.getAttribute("data-id"));
    });
    renderList();
    var m = /#([a-z_]+)/.exec(location.hash);
    if (m && ITEMS.find(function (it) { return it.id === m[1]; })) renderDetail(m[1]);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
