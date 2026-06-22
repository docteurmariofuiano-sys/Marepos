/* ============================================================================
 * Module « Informations patient et antécédents ».
 * Rendu dynamique (identité, allergies, ATCD médicaux/chirurgicaux par
 * spécialité, repliables + recherche), export JSON et résumé médical.
 * Expose window.Antecedents : render(root,{onValidate}), getData(), getSummary(),
 * clear(), isValid().
 * ========================================================================== */
(function () {
  "use strict";

  var DATA = window.ANTECEDENTS || { allergies: [], medicaux: [], chirurgicaux: [] };
  var root = null, onValidate = null, getIdentity = null;
  function identity() {
    var id = getIdentity ? getIdentity() : null;
    return { nom: (id && id.nom) || "", prenom: (id && id.prenom) || "" };
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function norm(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function q(sel) { return root.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  // ----------------------------------------------------------------- gabarits
  function checkboxHtml(label, sectionCls) {
    return "<label class='atcd-chk " + sectionCls + "'>" +
      "<input type='checkbox' data-label=\"" + esc(label) + "\">" +
      "<span>" + esc(label) + "</span></label>";
  }

  function groupsHtml(groups, sectionCls) {
    return groups.map(function (g) {
      return "<details class='atcd-group'>" +
        "<summary><span class='ag-title'>" + esc(g.groupe) + "</span>" +
        "<span class='ag-count' data-grp=\"" + esc(g.groupe) + "\"></span></summary>" +
        "<div class='atcd-grid'>" +
        g.items.map(function (it) { return checkboxHtml(it, sectionCls); }).join("") +
        "</div></details>";
    }).join("");
  }

  function template() {
    return "" +
    "<p class='atcd-intro muted'>Renseignez les allergies et les antécédents (facultatif). " +
    "Données conservées localement, non transmises.</p>" +

    // 1. Allergies
    "<fieldset class='atcd-sec'><legend>1 · Allergies connues</legend>" +
      "<label class='field check none-box'><input type='checkbox' id='atcd-allergie-none'><span><strong>Pas d'allergie connue</strong></span></label>" +
      "<div class='atcd-grid' id='atcd-allergie-list'>" +
        DATA.allergies.map(function (a) { return checkboxHtml(a, "al"); }).join("") +
      "</div>" +
      "<label class='field'><span>Allergies connues / détails (Autre : préciser)</span>" +
        "<textarea id='atcd-allergie-details' rows='2' placeholder='Préciser les allergies (molécule, réaction…)'></textarea></label>" +
    "</fieldset>" +

    // recherche
    "<div class='atcd-searchwrap'><span aria-hidden='true'>🔎</span>" +
      "<input type='search' id='atcd-search' placeholder='Rechercher un antécédent (ex. diabète, prothèse, asthme…)' autocomplete='off'></div>" +

    // 3. ATCD médicaux
    "<fieldset class='atcd-sec'><legend>2 · Antécédents médicaux</legend>" +
      "<label class='field check none-box'><input type='checkbox' id='atcd-med-none'><span><strong>Pas d'antécédent médical connu</strong></span></label>" +
      "<div id='atcd-med-groups'>" + groupsHtml(DATA.medicaux, "med") + "</div>" +
      "<label class='field'><span>Autres antécédents médicaux à préciser</span>" +
        "<textarea id='atcd-med-autres' rows='2' placeholder='Autres antécédents médicaux à préciser'></textarea></label>" +
    "</fieldset>" +

    // 4. ATCD chirurgicaux
    "<fieldset class='atcd-sec'><legend>3 · Antécédents chirurgicaux</legend>" +
      "<label class='field check none-box'><input type='checkbox' id='atcd-chir-none'><span><strong>Pas d'antécédent chirurgical connu</strong></span></label>" +
      "<div id='atcd-chir-groups'>" + groupsHtml(DATA.chirurgicaux, "chir") + "</div>" +
      "<label class='field'><span>Autres antécédents chirurgicaux à préciser</span>" +
        "<textarea id='atcd-chir-autres' rows='2' placeholder='Autres antécédents chirurgicaux à préciser'></textarea></label>" +
    "</fieldset>" +

    // boutons
    "<div class='atcd-actions'>" +
      "<button type='button' class='btn ghost' id='atcd-clear'>🗑 Tout effacer</button>" +
      "<button type='button' class='btn ghost' id='atcd-export'>⬇ Exporter en JSON</button>" +
      "<button type='button' class='btn ghost' id='atcd-copy'>📋 Copier le résumé médical</button>" +
      "<button type='button' class='btn primary' id='atcd-validate'>Valider et continuer</button>" +
    "</div>" +
    "<p class='atcd-msg' id='atcd-msg' role='status'></p>";
  }

  // -------------------------------------------------------------- état / lecture
  function checkedLabels(containerSel) {
    return qa(containerSel + " input[type=checkbox]:checked").map(function (c) { return c.dataset.label; });
  }

  function getData() {
    var pasAllergie = q("#atcd-allergie-none").checked;
    var pasMed = q("#atcd-med-none").checked;
    var pasChir = q("#atcd-chir-none").checked;
    return {
      patient: identity(),
      allergies: {
        pas_allergie_connue: pasAllergie,
        liste: pasAllergie ? [] : checkedLabels("#atcd-allergie-list"),
        details: pasAllergie ? "" : q("#atcd-allergie-details").value.trim()
      },
      pas_antecedent_medical: pasMed,
      antecedents_medicaux: pasMed ? [] : checkedLabels("#atcd-med-groups"),
      antecedents_medicaux_autres: pasMed ? "" : q("#atcd-med-autres").value.trim(),
      pas_antecedent_chirurgical: pasChir,
      antecedents_chirurgicaux: pasChir ? [] : checkedLabels("#atcd-chir-groups"),
      antecedents_chirurgicaux_autres: pasChir ? "" : q("#atcd-chir-autres").value.trim()
    };
  }

  function getSummary() {
    var d = getData();
    var L = [];
    var name = (d.patient.prenom + " " + d.patient.nom).trim();
    L.push("Patient : " + (name || "(non renseigné)"));
    L.push("");
    L.push("Allergies :");
    if (d.allergies.pas_allergie_connue) {
      L.push("Pas d'allergie connue.");
    } else {
      var al = d.allergies.liste.slice();
      if (d.allergies.details) al.push(d.allergies.details);
      if (al.length) al.forEach(function (a) { L.push("- " + a); });
      else L.push("Non renseignées.");
    }
    L.push("");
    L.push("Antécédents médicaux :");
    if (d.pas_antecedent_medical) {
      L.push("Aucun antécédent médical connu.");
    } else {
      var med = d.antecedents_medicaux.slice();
      if (d.antecedents_medicaux_autres) med.push(d.antecedents_medicaux_autres);
      if (med.length) med.forEach(function (a) { L.push("- " + a); });
      else L.push("Non renseignés.");
    }
    L.push("");
    L.push("Antécédents chirurgicaux :");
    if (d.pas_antecedent_chirurgical) {
      L.push("Aucun antécédent chirurgical connu.");
    } else {
      var chir = d.antecedents_chirurgicaux.slice();
      if (d.antecedents_chirurgicaux_autres) chir.push(d.antecedents_chirurgicaux_autres);
      if (chir.length) chir.forEach(function (a) { L.push("- " + a); });
      else L.push("Non renseignés.");
    }
    return L.join("\n");
  }

  function isValid() {
    var id = identity();
    return !!(id.nom && id.prenom);
  }

  // ------------------------------------------------------------------- actions
  function clearAll() {
    qa("input[type=checkbox]").forEach(function (c) { c.checked = false; });
    qa("input[type=text], textarea, input[type=search]").forEach(function (i) { i.value = ""; });
    applyNoneToggles();
    runSearch("");
    updateCounts();
    message("");
  }

  function flash(msg, ok) {
    message(msg, ok);
    setTimeout(function () { message(""); }, 2600);
  }
  function message(msg, ok) {
    var m = q("#atcd-msg");
    m.textContent = msg || "";
    m.className = "atcd-msg" + (msg ? (ok ? " ok" : " err") : "");
  }

  function copyText(text, okMsg) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand("copy"); flash(okMsg, true); }
      catch (e) { flash("Copie impossible — sélectionnez le texte manuellement.", false); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flash(okMsg, true); }, fallback);
    } else { fallback(); }
  }

  function exportJson() {
    var json = JSON.stringify(getData(), null, 2);
    try {
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      var name = (getData().patient.nom || "patient").replace(/[^\w-]+/g, "_");
      a.href = url; a.download = "antecedents_" + name + ".json";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      flash("Fichier JSON exporté.", true);
    } catch (e) {
      copyText(json, "JSON copié dans le presse-papiers.");
    }
  }

  // --------------------------------------------------- « pas de … » + compteurs
  function applyNoneToggles() {
    toggleSection("#atcd-allergie-none", ["#atcd-allergie-list", "#atcd-allergie-details"]);
    toggleSection("#atcd-med-none", ["#atcd-med-groups", "#atcd-med-autres"]);
    toggleSection("#atcd-chir-none", ["#atcd-chir-groups", "#atcd-chir-autres"]);
  }
  function toggleSection(noneSel, targetSels) {
    var none = q(noneSel).checked;
    targetSels.forEach(function (sel) {
      var c = q(sel);
      var inputs = c.tagName === "TEXTAREA" ? [c] : qa(sel + " input, " + sel + " textarea");
      inputs.forEach(function (i) {
        i.disabled = none;
        if (none) { if (i.type === "checkbox") i.checked = false; else i.value = ""; }
      });
      c.classList.toggle("is-disabled", none);
    });
    updateCounts();
  }

  function updateCounts() {
    qa(".ag-count").forEach(function (badge) {
      var det = badge.closest("details");
      var n = det.querySelectorAll("input[type=checkbox]:checked").length;
      badge.textContent = n ? n : "";
      badge.classList.toggle("on", !!n);
    });
  }

  // ------------------------------------------------------------------ recherche
  function runSearch(term) {
    var t = norm(term || "");
    ["#atcd-med-groups", "#atcd-chir-groups", "#atcd-allergie-list"].forEach(function (sel) {
      qa(sel + " .atcd-chk").forEach(function (lab) {
        var match = !t || norm(lab.textContent).indexOf(t) !== -1;
        lab.classList.toggle("hide", !match);
      });
    });
    // ouvrir/masquer les groupes selon les correspondances
    qa(".atcd-group").forEach(function (det) {
      var visible = det.querySelectorAll(".atcd-chk:not(.hide)").length;
      det.classList.toggle("hide", visible === 0);
      if (t) det.open = visible > 0; // déplier pendant la recherche
    });
  }

  // ------------------------------------------------------------------- montage
  function render(rootEl, opts) {
    root = rootEl;
    onValidate = (opts && opts.onValidate) || null;
    getIdentity = (opts && opts.getIdentity) || null;
    root.innerHTML = template();

    q("#atcd-allergie-none").addEventListener("change", applyNoneToggles);
    q("#atcd-med-none").addEventListener("change", applyNoneToggles);
    q("#atcd-chir-none").addEventListener("change", applyNoneToggles);
    root.addEventListener("change", function (e) {
      if (e.target.matches("input[type=checkbox]")) updateCounts();
    });
    q("#atcd-search").addEventListener("input", function (e) { runSearch(e.target.value); });
    q("#atcd-clear").addEventListener("click", clearAll);
    q("#atcd-export").addEventListener("click", exportJson);
    q("#atcd-copy").addEventListener("click", function () { copyText(getSummary(), "Résumé médical copié."); });
    q("#atcd-validate").addEventListener("click", function () {
      if (!isValid()) { flash("Le nom et le prénom sont obligatoires (1re page).", false); return; }
      if (onValidate) onValidate(getData());
    });
    updateCounts();
  }

  window.Antecedents = {
    render: render, getData: getData, getSummary: getSummary, isValid: isValid, clear: clearAll
  };
})();
