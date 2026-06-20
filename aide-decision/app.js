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
  var norm = function (s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };

  // État de la consultation en cours
  // selected : { motifId -> {label, fkey} } ; symptomKeys : fiches uniques dérivées
  var session = { ctx: {}, patient: null, selected: {}, symptomKeys: [], answers: {}, results: null, niveau: 1 };

  // ----------- Catalogue patient : motifs reliés à une fiche décisionnelle ----
  // Construit à partir de window.MOTIFS (catalogue), groupé par spécialité.
  // Seuls les motifs cliniques (m.f existant dans KB) sont proposés au patient.
  var PATIENT_CATS = [];
  (function buildCatalog() {
    var uid = 0;
    (window.MOTIFS || []).forEach(function (c) {
      var items = [];
      ["frequents", "urgences"].forEach(function (grp) {
        (c[grp] || []).forEach(function (m) {
          if (m.f && KB[m.f]) {
            items.push({ id: "m" + (uid++), label: m.l, fkey: m.f, urg: grp === "urgences" });
          }
        });
      });
      if (items.length) PATIENT_CATS.push({ n: c.n, titre: c.titre, icone: c.icone, items: items });
    });
  })();

  // Repli si le catalogue n'est pas chargé : liste plate des fiches
  if (!PATIENT_CATS.length) {
    var items = Object.keys(KB).filter(function (k) { return k !== "meta"; })
      .sort(function (a, b) { return KB[a].symptome.localeCompare(KB[b].symptome, "fr"); })
      .map(function (k, i) { return { id: "m" + i, label: KB[k].symptome, fkey: k, urg: !!KB[k].urgence }; });
    PATIENT_CATS.push({ n: 0, titre: "Tous les motifs", icone: "🩺", items: items });
  }

  function countChecked() { return Object.keys(session.selected).length; }

  function deriveSymptomKeys() {
    var keys = [];
    Object.keys(session.selected).forEach(function (id) {
      var f = session.selected[id].fkey;
      if (keys.indexOf(f) === -1) keys.push(f);
    });
    session.symptomKeys = keys;
  }

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

  // ------------------------------- catalogue des motifs (groupé, multi-sélection)
  function renderSymptomGrid(filter) {
    var q = norm(filter || "");
    var grid = el("symptomGrid");
    var full = countChecked() >= MAX_SELECT;
    grid.innerHTML = "";
    PATIENT_CATS.forEach(function (c) {
      var items = c.items.filter(function (it) { return !q || norm(it.label).indexOf(q) !== -1; });
      if (!items.length) return;
      var sec = document.createElement("section");
      sec.className = "cat-group";
      var h = document.createElement("h3");
      h.className = "cat-group-title";
      h.innerHTML = "<span class='cat-ico' aria-hidden='true'>" + esc(c.icone || "•") + "</span> " + esc(c.titre);
      sec.appendChild(h);
      var box = document.createElement("div");
      box.className = "motif-chips";
      items.forEach(function (it) {
        var selected = !!session.selected[it.id];
        var b = document.createElement("button");
        b.type = "button";
        b.className = "motif-chip" + (it.urg ? " is-urg" : "") +
          (selected ? " sel" : "") + (!selected && full ? " disabled" : "");
        b.innerHTML = "<span class='mc-check' aria-hidden='true'>" + (selected ? "✓" : "") + "</span>" +
          "<span class='mc-label'>" + esc(it.label) + "</span>" +
          (it.urg ? "<span class='sc-urg'>URGENCE</span>" : "");
        b.setAttribute("aria-pressed", selected ? "true" : "false");
        b.onclick = function () { toggleMotif(it); };
        box.appendChild(b);
      });
      sec.appendChild(box);
      grid.appendChild(sec);
    });
    if (!grid.children.length) {
      grid.innerHTML = "<p class='muted'>Aucun motif ne correspond à votre recherche.</p>";
    }
  }

  function toggleMotif(it) {
    if (session.selected[it.id]) {
      delete session.selected[it.id];
    } else {
      if (countChecked() >= MAX_SELECT) { flashLimit(); return; }
      session.selected[it.id] = { label: it.label, fkey: it.fkey };
    }
    deriveSymptomKeys();
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
    var n = countChecked();
    var c = el("selectCount");
    if (!c.classList.contains("limit")) {
      c.textContent = n === 0
        ? "Aucun motif coché (idéalement 3 à 5)"
        : n + (n > 1 ? " motifs cochés" : " motif coché") + " · " + (MAX_SELECT - n) + " possible(s) en plus";
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

        patientInfoHtml() +

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

  // Bloc « Informations patient » (identité, allergies mises en avant, ATCD)
  function patientInfoHtml() {
    var p = session.patient;
    if (!p) return "";
    var name = (p.patient.prenom + " " + p.patient.nom).trim();

    var allergHtml;
    if (p.allergies.pas_allergie_connue) {
      allergHtml = "<p class='ok'>Pas d'allergie connue.</p>";
    } else {
      var al = (p.allergies.liste || []).slice();
      if (p.allergies.details) al.push(p.allergies.details);
      allergHtml = al.length
        ? "<p class='allerg-warn'>⚠ Allergies : " + al.map(esc).join(" · ") + "</p>"
        : "<p class='muted'>Allergies non renseignées.</p>";
    }

    function listLine(labelTxt, none, arr, autres) {
      if (none) return "<p><strong>" + labelTxt + " :</strong> aucun connu.</p>";
      var a = (arr || []).slice();
      if (autres) a.push(autres);
      return "<p><strong>" + labelTxt + " :</strong> " + (a.length ? a.map(esc).join(" · ") : "non renseignés") + "</p>";
    }

    return block("Informations patient",
      (name ? "<p class='pat-name'>" + esc(name) + "</p>" : "") +
      allergHtml +
      listLine("Antécédents médicaux", p.pas_antecedent_medical, p.antecedents_medicaux, p.antecedents_medicaux_autres) +
      listLine("Antécédents chirurgicaux", p.pas_antecedent_chirurgical, p.antecedents_chirurgicaux, p.antecedents_chirurgicaux_autres));
  }

  // ----------------------------------------------------------------- navigation
  function show(stepId) {
    ["step-intro", "step-antecedents", "step-symptom", "step-quiz", "step-patient-result"].forEach(function (s) {
      el(s).hidden = s !== stepId;
    });
  }

  // Dérive des indicateurs de contexte (pour les règles) à partir des antécédents
  function deriveCtxFromAntecedents() {
    var p = session.patient; if (!p) return;
    var all = (p.antecedents_medicaux || []).concat(p.antecedents_chirurgicaux || []);
    var add = session.ctx.antecedents || [];
    function has(x) { return all.indexOf(x) !== -1; }
    function some(list) { return list.some(has); }
    function flag(name, cond) { if (cond && add.indexOf(name) === -1) add.push(name); }
    flag("immunodépression", some(["VIH", "Leucémie", "Lymphome", "Myélome",
      "Chimiothérapie antérieure", "Immunothérapie antérieure", "Transplantation rénale", "Splénectomie"]));
    flag("terrain cardiovasculaire", some(["Hypertension artérielle", "Insuffisance cardiaque",
      "Infarctus du myocarde", "Angor / maladie coronarienne", "Fibrillation auriculaire",
      "Valvulopathie", "Cardiomyopathie", "AVC", "AIT", "Artériopathie des membres inférieurs"]));
    flag("diabète", some(["Diabète de type 1", "Diabète de type 2"]));
    flag("cancer connu", has("Métastases connues") || all.some(function (l) { return /^Cancer /.test(l) || l === "Mélanome"; }));
    session.ctx.antecedents = add;
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
      readContext(); show("step-antecedents");
    });
    // Module « Informations patient et antécédents »
    if (window.Antecedents) {
      window.Antecedents.render(el("antecedents-root"), {
        onValidate: function (data) {
          session.patient = data;
          deriveCtxFromAntecedents();
          renderSymptomGrid(""); updateSelectBar(); show("step-symptom");
        }
      });
    }
    el("symptomSearch").addEventListener("input", function (e) { renderSymptomGrid(e.target.value); });
    el("toQuiz").addEventListener("click", startQuiz);
    el("backToSymptom").addEventListener("click", function () {
      renderSymptomGrid(el("symptomSearch").value); updateSelectBar(); show("step-symptom");
    });
    el("submitQuiz").addEventListener("click", function (e) { e.preventDefault(); showPatientResult(); });
    el("goMedecin").addEventListener("click", function () { setMode("medecin"); });
    el("restart").addEventListener("click", function () {
      session = { ctx: {}, patient: null, selected: {}, symptomKeys: [], answers: {}, results: null, niveau: 1 };
      el("ctx-consent").checked = false;
      el("ctx-temp").value = ""; el("ctx-temp-nonmesuree").checked = false;
      el("symptomSearch").value = "";
      if (window.Antecedents) window.Antecedents.clear();
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
