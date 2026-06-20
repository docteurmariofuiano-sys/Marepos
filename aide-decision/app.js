/* ============================================================================
 * CONTRÔLEUR UI — parcours patient (sélection multi-motifs) -> moteur -> synthèse.
 * Le patient coche 1 à 5 motifs ; les questions sont regroupées par motif ;
 * la synthèse médecin agrège red flags et diagnostics différentiels.
 * Aucune donnée n'est transmise (mode local / prototype).
 * ========================================================================== */
(function () {
  "use strict";

  var KB = window.KB, Engine = window.Engine;
  var MAX_SELECT = 5;
  var el = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  // État de la consultation en cours
  var session = { ctx: {}, symptomKeys: [], answers: {}, results: null, niveau: 1 };

  // Liste des symptômes (clé interne -> fiche), triée par libellé
  var SYMPTOMS = Object.keys(KB).filter(function (k) { return k !== "meta"; })
    .sort(function (a, b) { return KB[a].symptome.localeCompare(KB[b].symptome, "fr"); });

  var FIEVRE_SEUIL = 38.5;

  // Lit une température (accepte la virgule), renvoie un nombre °C plausible ou null
  function parseTemp(s) {
    if (s == null) return null;
    s = String(s).replace(",", ".").trim();
    if (s === "") return null;
    var n = parseFloat(s);
    if (isNaN(n) || n < 30 || n > 45) return null;
    return n;
  }

  // ---------------------------------------------------------------- contexte
  function readContext() {
    var atcd = [];
    el("ctx-atcd").querySelectorAll("input:checked").forEach(function (c) { atcd.push(c.value); });
    var age = parseInt(el("ctx-age").value, 10);
    var sexe = el("ctx-sexe").value;
    var grossesse = el("ctx-grossesse").checked && sexe === "Femme";
    var ageProcreer = sexe === "Femme" && !isNaN(age) && age >= 12 && age <= 51;
    var nonMesuree = el("ctx-temp-nonmesuree").checked;
    var temp = nonMesuree ? null : parseTemp(el("ctx-temp").value);
    session.ctx = {
      age: isNaN(age) ? null : age,
      sexe: sexe || null,
      grossessePossible: grossesse || (ageProcreer && sexe === "Femme" && el("ctx-grossesse").checked),
      ageProcreer: ageProcreer,
      temperature: temp,
      temperatureMesuree: !nonMesuree,
      fievre: temp != null && temp >= FIEVRE_SEUIL,
      antecedents: atcd
    };
    if (ageProcreer && el("ctx-grossesse").checked) session.ctx.grossessePossible = true;
  }

  function refreshIntroValidity() {
    var sexe = el("ctx-sexe").value;
    el("ctx-grossesse-wrap").hidden = sexe !== "Femme";
    var nonMesuree = el("ctx-temp-nonmesuree").checked;
    el("ctx-temp").disabled = nonMesuree;
    if (nonMesuree) el("ctx-temp").value = "";
    var tempOk = nonMesuree || parseTemp(el("ctx-temp").value) != null;
    el("toSymptom").disabled = !(el("ctx-consent").checked && tempOk);
  }

  // Règles d'orientation explicites liées à la fièvre (indépendantes du motif)
  function feverOrientation(ctx) {
    var out = [];
    var t = ctx.temperature, atcd = ctx.antecedents || [];
    if (t == null) return out;
    if (t >= 41) {
      out.push({ niveau: 3, message: "Hyperpyrexie ≥ 41 °C : urgence (sepsis, coup de chaleur) — évaluation immédiate." });
    }
    if (t >= FIEVRE_SEUIL && atcd.indexOf("immunodépression") !== -1) {
      out.push({ niveau: 3, message: "Fièvre chez un patient immunodéprimé : neutropénie fébrile / infection grave à éliminer en URGENCE (NFS, hémocultures, avis sans délai)." });
    }
    if (t >= FIEVRE_SEUIL && ctx.grossessePossible) {
      out.push({ niveau: 2, message: "Fièvre avec grossesse possible : éliminer une listériose, une pyélonéphrite, une chorioamniotite — avis rapide (hémocultures, ECBU)." });
    }
    if (t >= FIEVRE_SEUIL && atcd.indexOf("terrain cardiovasculaire") !== -1) {
      out.push({ niveau: 2, message: "Fièvre prolongée sur valvulopathie/prothèse possible : penser à l'endocardite (hémocultures avant antibiotiques)." });
    }
    return out;
  }

  // ----------------------------------------------------- grille des motifs (multi)
  function renderSymptomGrid(filter) {
    var q = (filter || "").toLowerCase();
    var grid = el("symptomGrid");
    var full = session.symptomKeys.length >= MAX_SELECT;
    grid.innerHTML = "";
    SYMPTOMS.forEach(function (key) {
      var f = KB[key];
      var hay = (f.symptome + " " + f.specialite.join(" ")).toLowerCase();
      if (q && hay.indexOf(q) === -1) return;
      var selected = session.symptomKeys.indexOf(key) !== -1;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "symptom-card" + (f.urgence ? " is-urg" : "") +
        (selected ? " sel" : "") + (!selected && full ? " disabled" : "");
      var urgTag = f.urgence ? "<span class='sc-urg'>URGENCE</span>" : "";
      var check = "<span class='sc-check' aria-hidden='true'>" + (selected ? "✓" : "") + "</span>";
      b.innerHTML = check + "<span class='sc-title'>" + esc(f.symptome) + urgTag + "</span>" +
        "<span class='sc-spec'>" + esc(f.specialite.join(" · ")) + "</span>";
      b.setAttribute("aria-pressed", selected ? "true" : "false");
      b.onclick = function () { toggleSymptom(key); };
      grid.appendChild(b);
    });
    if (!grid.children.length) {
      grid.innerHTML = "<p class='muted'>Aucun motif ne correspond à votre recherche.</p>";
    }
  }

  function toggleSymptom(key) {
    var i = session.symptomKeys.indexOf(key);
    if (i !== -1) {
      session.symptomKeys.splice(i, 1);
    } else {
      if (session.symptomKeys.length >= MAX_SELECT) { flashLimit(); return; }
      session.symptomKeys.push(key);
    }
    renderSymptomGrid(el("symptomSearch").value);
    updateSelectBar();
  }

  function flashLimit() {
    var c = el("selectCount");
    c.classList.add("limit");
    c.textContent = "Maximum " + MAX_SELECT + " motifs — décochez-en un pour en ajouter un autre";
    setTimeout(function () { c.classList.remove("limit"); updateSelectBar(); }, 1800);
  }

  function updateSelectBar() {
    var n = session.symptomKeys.length;
    var c = el("selectCount");
    if (!c.classList.contains("limit")) {
      c.textContent = n === 0
        ? "Aucun motif sélectionné (idéalement 3 à 5)"
        : n + (n > 1 ? " motifs sélectionnés" : " motif sélectionné") + " · " + (MAX_SELECT - n) + " possible(s) en plus";
    }
    el("toQuiz").disabled = n < 1;
  }

  // -------------------------------------------------------------- questionnaire
  function startQuiz() {
    if (!session.symptomKeys.length) return;
    session.results = null;
    renderQuiz();
    show("step-quiz");
  }

  function renderQuiz() {
    var form = el("quizForm");
    form.innerHTML = "";
    var totalVisible = [];
    session.symptomKeys.forEach(function (key) {
      var f = KB[key];
      var visible = Engine.visibleQuestions(f, session.answers, session.ctx);
      if (!visible.length) return;
      var sec = document.createElement("section");
      sec.className = "quiz-section";
      var h = document.createElement("h3");
      h.className = "quiz-sec-title";
      h.innerHTML = esc(f.symptome) + (f.urgence ? " <span class='sc-urg'>URGENCE</span>" : "");
      sec.appendChild(h);
      visible.forEach(function (qq) {
        sec.appendChild(renderQuestion(qq));
        totalVisible.push(qq);
      });
      form.appendChild(sec);
    });
    updateProgress(totalVisible);
  }

  function renderQuestion(qq) {
    var wrap = document.createElement("div");
    wrap.className = "q";
    var label = document.createElement("p");
    label.className = "q-text";
    label.textContent = qq.question;
    wrap.appendChild(label);

    var val = session.answers[qq.id];

    if (qq.type === "boolean") {
      wrap.appendChild(choiceButtons([
        { v: true, t: "Oui" }, { v: false, t: "Non" }, { v: "unknown", t: "Je ne sais pas" }
      ], val, function (v) { setAnswer(qq.id, v); }));
    } else if (qq.type === "single_choice") {
      wrap.appendChild(choiceButtons(
        qq.options.map(function (o) { return { v: o, t: o }; }), val,
        function (v) { setAnswer(qq.id, v); }));
    } else if (qq.type === "scale") {
      var rng = document.createElement("input");
      rng.type = "range"; rng.min = 0; rng.max = 10; rng.value = val != null ? val : 5;
      var out = document.createElement("span"); out.className = "scale-out"; out.textContent = rng.value + "/10";
      rng.oninput = function () { out.textContent = rng.value + "/10"; setAnswer(qq.id, parseInt(rng.value, 10), true); };
      wrap.appendChild(rng); wrap.appendChild(out);
    } else { // text
      var ta = document.createElement("input");
      ta.type = "text"; ta.value = val || "";
      ta.oninput = function () { setAnswer(qq.id, ta.value, true); };
      wrap.appendChild(ta);
    }
    return wrap;
  }

  function choiceButtons(opts, current, onPick) {
    var box = document.createElement("div");
    box.className = "choices";
    opts.forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "choice" + (current === o.v ? " sel" : "");
      b.textContent = o.t;
      b.onclick = function () { onPick(o.v); };
      box.appendChild(b);
    });
    return box;
  }

  // noRerender : true pour les champs continus (texte/échelle) afin de ne pas perdre le focus
  function setAnswer(id, v, noRerender) {
    session.answers[id] = v;
    if (!noRerender) renderQuiz(); // re-render pour gérer les questions conditionnelles + sélection
  }

  function updateProgress(visible) {
    var answered = visible.filter(function (qq) {
      return session.answers[qq.id] !== undefined;
    }).length;
    el("quizProgress").textContent = answered + " / " + visible.length + " questions";
  }

  // ------------------------------------------------------------------ résultats
  function compute() {
    session.results = session.symptomKeys.map(function (key) {
      return { key: key, fiche: KB[key], result: Engine.run(KB[key], session.answers, session.ctx) };
    });
    session.feverFlags = feverOrientation(session.ctx);
    session.niveau = session.results.reduce(function (m, r) {
      return Math.max(m, r.result.niveau);
    }, 1);
    session.feverFlags.forEach(function (x) { session.niveau = Math.max(session.niveau, x.niveau); });
    return session.results;
  }

  function showPatientResult() {
    compute();
    var msg = el("patientMessage");
    var prudent;
    if (session.niveau >= 3) {
      prudent = "<p class='alert u3'>Certains éléments de vos réponses nécessitent une " +
        "<strong>évaluation médicale sans attendre</strong>. Contactez votre médecin, une " +
        "structure de soins, ou le 15 si vous vous sentez mal.</p>";
    } else if (session.niveau === 2) {
      prudent = "<p class='alert u2'>Certains éléments nécessitent un <strong>avis médical " +
        "rapide</strong> afin d'éliminer une cause à ne pas négliger. Prenez rendez-vous prochainement.</p>";
    } else {
      prudent = "<p class='alert u1'>Vos réponses ne montrent pas de signe d'alerte immédiat. " +
        "Une consultation permettra de faire le point.</p>";
    }
    msg.innerHTML = prudent +
      "<p class='muted'>Cette information reste indicative et <strong>ne constitue pas un " +
      "diagnostic</strong>. Seul le médecin pourra conclure après vous avoir examiné.</p>";
    show("step-patient-result");
  }

  // ------------------------------------------------------------- synthèse médecin
  function dedup(arr) {
    var out = [];
    arr.forEach(function (x) { if (out.indexOf(x) === -1) out.push(x); });
    return out;
  }

  function renderSynthese() {
    if (!session.results || !session.results.length) {
      el("medecinEmpty").hidden = false; el("medecinSynthese").hidden = true; return;
    }
    el("medecinEmpty").hidden = true;
    var box = el("medecinSynthese");
    box.hidden = false;

    var ctx = session.ctx;
    var ctxLine = Engine.humanizeContext(ctx);
    var urg = Engine.URGENCE[session.niveau];

    // Motifs
    var motifs = session.results.map(function (r) { return esc(r.fiche.symptome); }).join(" · ");

    // Éléments importants (recap agrégé, dédupliqué) — la température en tête
    var recapAll = [];
    if (ctx.temperature != null) {
      recapAll.push("Température : " + ctx.temperature + " °C" + (ctx.fievre ? " — fièvre (≥ 38,5)" : " — apyrétique"));
    } else if (ctx.temperatureMesuree === false) {
      recapAll.push("Température non prise");
    }
    session.results.forEach(function (r) {
      Engine.recap(r.fiche, session.answers, ctx).forEach(function (l) { recapAll.push(l); });
    });
    recapAll = dedup(recapAll);

    // Red flags agrégés (union, triés par niveau décroissant, tagués par motif)
    var allFlags = [];
    session.results.forEach(function (r) {
      r.result.redFlags.forEach(function (x) {
        allFlags.push({ niveau: x.niveau, message: x.message_medecin, symptome: r.fiche.symptome });
      });
    });
    // Orientation liée à la fièvre (contexte, indépendante du motif)
    (session.feverFlags || []).forEach(function (x) {
      allFlags.push({ niveau: x.niveau, message: x.message, symptome: "Fièvre" });
    });
    allFlags.sort(function (a, b) { return b.niveau - a.niveau; });

    var rfHtml = allFlags.length
      ? "<ul class='rf'>" + allFlags.map(function (x) {
          return "<li><span class='u-tag " + Engine.URGENCE[x.niveau].classe + "'>N" + x.niveau +
            "</span> <span class='rf-tag'>" + esc(x.symptome) + "</span> " + esc(x.message) + "</li>";
        }).join("") + "</ul>"
      : "<p class='ok'>Pas de red flag vital immédiat détecté sur les éléments déclarés. " +
        "La vigilance clinique reste de mise.</p>";

    // Hypothèses par motif
    var hypBlocks = session.results.map(function (r) {
      var hyp = r.result.hypotheses.length
        ? "<ol class='hyp'>" + r.result.hypotheses.slice(0, 4).map(function (h) {
            var args = h.arguments_pour.length
              ? " <span class='args'>(" + h.arguments_pour.map(esc).join(" · ") + ")</span>" : "";
            return "<li><strong>" + esc(h.diagnostic) + "</strong>" + args +
              " <span class='score'>score " + h.score + "/" + h.maxScore + "</span></li>";
          }).join("") + "</ol>"
        : "<p class='muted'>Pas d'orientation différentielle marquée : compléter l'interrogatoire et l'examen.</p>";
      var tag = r.result.niveau >= 2
        ? " <span class='u-tag " + r.result.urgence.classe + "'>N" + r.result.niveau + "</span>" : "";
      return "<div class='syn-motif'><h4>" + esc(r.fiche.symptome) + tag +
        " <small>" + esc(r.fiche.specialite.join(" · ")) + "</small></h4>" + hyp + "</div>";
    }).join("");

    // À vérifier à l'examen clinique (union dédupliquée)
    var verifAll = [];
    session.results.forEach(function (r) {
      r.result.points_a_verifier.forEach(function (p) { verifAll.push(p); });
    });
    verifAll = dedup(verifAll);

    // Examens complémentaires (union dédupliquée)
    var examAll = [];
    session.results.forEach(function (r) {
      r.result.examens_a_discuter.forEach(function (e) { examAll.push(e); });
    });
    examAll = dedup(examAll);

    var n = session.results.length;
    box.innerHTML =
      "<div class='card synthese'>" +
        "<div class='syn-head " + urg.classe + "'>" +
          "<div><h2>Synthèse clinique — " + n + (n > 1 ? " motifs" : " motif") + "</h2>" +
            "<p class='syn-sub'>" + motifs + (ctxLine ? " — " + esc(ctxLine) : "") + "</p></div>" +
          "<div class='urg-badge'>Niveau " + session.niveau + "<small>" + esc(urg.libelle) + "</small></div>" +
        "</div>" +

        block("Motifs déclarés (patient)", "<p>" + motifs + "</p>") +

        block("Éléments importants (déclaratif patient)",
          recapAll.length ? "<ul class='recap'>" + recapAll.map(function (l) {
            return "<li>" + esc(l) + "</li>"; }).join("") + "</ul>"
            : "<p class='muted'>Questionnaire incomplet.</p>") +

        block("⚠ Red flags / signes d'alerte (tous motifs)", rfHtml) +

        block("Hypothèses à envisager — par motif", hypBlocks) +

        block("À vérifier à l'examen clinique",
          "<ul class='verif'>" + verifAll.map(function (p) {
            return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>") +

        block("Examens complémentaires à discuter",
          examAll.length
            ? "<ul class='exam'>" + examAll.map(function (e) {
                return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>"
            : "<p class='muted'>Selon l'examen clinique.</p>") +

        block("Orientation proposée",
          "<p class='orient " + urg.classe + "'>" + esc(urg.orientation) + "</p>") +

        "<div class='doctor-notes'>" +
          "<label><span>Conclusion / notes du médecin (modifiable)</span>" +
          "<textarea id='docNotes' rows='3' placeholder='Hypothèse retenue, décision, orientation…'></textarea></label>" +
        "</div>" +

        "<div class='syn-actions'>" +
          "<button class='btn primary' onclick='window.print()'>🖨 Exporter / Imprimer (PDF)</button>" +
          "<span class='disclaimer'>Aide au raisonnement — conclusion à valider par le médecin. " +
          "Ne dispense pas de l'examen clinique ni des recommandations en vigueur.</span>" +
        "</div>" +
      "</div>";
  }

  function block(title, html) {
    return "<section class='syn-block'><h3>" + esc(title) + "</h3>" + html + "</section>";
  }

  // ----------------------------------------------------------------- navigation
  function show(stepId) {
    ["step-intro", "step-symptom", "step-quiz", "step-patient-result"].forEach(function (s) {
      el(s).hidden = s !== stepId;
    });
  }

  function setMode(mode) {
    el("view-patient").hidden = mode !== "patient";
    el("view-medecin").hidden = mode !== "medecin";
    el("modeSwitch").querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.mode === mode);
    });
    if (mode === "medecin") renderSynthese();
  }

  // --------------------------------------------------------------------- démo
  function loadDemo() {
    session.ctx = { age: 38, sexe: "Homme", grossessePossible: false, ageProcreer: false,
      temperature: 37.0, temperatureMesuree: true, fievre: false, antecedents: [] };
    session.symptomKeys = ["acouphene"];
    session.answers = {
      ac_cote: "Une seule oreille", ac_pulsatile: false, ac_hypoacousie: true,
      ac_brusque: false, ac_vertige: false, ac_otalgie: false,
      ac_trauma: true, ac_ototox: false, ac_neuro: false
    };
    compute();
    setMode("medecin");
  }

  // ------------------------------------------------------------------- listeners
  function init() {
    ["ctx-sexe", "ctx-consent", "ctx-temp-nonmesuree"].forEach(function (id) {
      el(id).addEventListener("change", refreshIntroValidity);
    });
    el("ctx-temp").addEventListener("input", refreshIntroValidity);
    el("toSymptom").addEventListener("click", function () {
      readContext(); renderSymptomGrid(""); updateSelectBar(); show("step-symptom");
    });
    el("symptomSearch").addEventListener("input", function (e) { renderSymptomGrid(e.target.value); });
    el("toQuiz").addEventListener("click", startQuiz);
    el("backToSymptom").addEventListener("click", function () {
      renderSymptomGrid(el("symptomSearch").value); updateSelectBar(); show("step-symptom");
    });
    el("submitQuiz").addEventListener("click", function (e) { e.preventDefault(); showPatientResult(); });
    el("goMedecin").addEventListener("click", function () { setMode("medecin"); });
    el("restart").addEventListener("click", function () {
      session = { ctx: {}, symptomKeys: [], answers: {}, results: null, niveau: 1 };
      el("ctx-consent").checked = false;
      el("ctx-temp").value = ""; el("ctx-temp-nonmesuree").checked = false;
      refreshIntroValidity(); show("step-intro");
    });
    el("loadDemo").addEventListener("click", loadDemo);
    el("modeSwitch").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-mode]");
      if (b) setMode(b.dataset.mode);
    });
    refreshIntroValidity();
    renderSymptomGrid("");
    updateSelectBar();
    // Accès direct à un motif depuis le catalogue : index.html#s=<clé>
    var m = /#s=([a-z_]+)/.exec(location.hash);
    if (m && KB[m[1]]) { session.symptomKeys = [m[1]]; startQuiz(); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
