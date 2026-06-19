/* ============================================================================
 * CONTRÔLEUR UI — parcours patient -> moteur -> synthèse médecin.
 * Aucune donnée n'est transmise (mode local / prototype).
 * ========================================================================== */
(function () {
  "use strict";

  var KB = window.KB, Engine = window.Engine;
  var el = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  // État de la consultation en cours
  var session = { ctx: {}, symptomKey: null, answers: {}, result: null };

  // Liste des symptômes (clé interne -> fiche)
  var SYMPTOMS = Object.keys(KB).filter(function (k) { return k !== "meta"; });

  // ---------------------------------------------------------------- contexte
  function readContext() {
    var atcd = [];
    el("ctx-atcd").querySelectorAll("input:checked").forEach(function (c) { atcd.push(c.value); });
    var age = parseInt(el("ctx-age").value, 10);
    var sexe = el("ctx-sexe").value;
    var grossesse = el("ctx-grossesse").checked && sexe === "Femme";
    var ageProcreer = sexe === "Femme" && !isNaN(age) && age >= 12 && age <= 51;
    session.ctx = {
      age: isNaN(age) ? null : age,
      sexe: sexe || null,
      grossessePossible: grossesse || (ageProcreer && sexe === "Femme" && el("ctx-grossesse").checked),
      ageProcreer: ageProcreer,
      antecedents: atcd
    };
    // Si femme en âge de procréer, la grossesse est "possible" par prudence sauf info contraire
    if (ageProcreer && el("ctx-grossesse").checked) session.ctx.grossessePossible = true;
  }

  function refreshIntroValidity() {
    var sexe = el("ctx-sexe").value;
    el("ctx-grossesse-wrap").hidden = sexe !== "Femme";
    el("toSymptom").disabled = !el("ctx-consent").checked;
  }

  // ----------------------------------------------------------- grille symptômes
  function renderSymptomGrid(filter) {
    var q = (filter || "").toLowerCase();
    var grid = el("symptomGrid");
    grid.innerHTML = "";
    SYMPTOMS.forEach(function (key) {
      var f = KB[key];
      var hay = (f.symptome + " " + f.specialite.join(" ")).toLowerCase();
      if (q && hay.indexOf(q) === -1) return;
      var b = document.createElement("button");
      b.className = "symptom-card" + (f.urgence ? " is-urg" : "");
      var urgTag = f.urgence ? "<span class='sc-urg'>URGENCE</span>" : "";
      b.innerHTML = "<span class='sc-title'>" + esc(f.symptome) + urgTag + "</span>" +
        "<span class='sc-spec'>" + esc(f.specialite.join(" · ")) + "</span>";
      b.onclick = function () { startQuiz(key); };
      grid.appendChild(b);
    });
    if (!grid.children.length) {
      grid.innerHTML = "<p class='muted'>Aucun symptôme ne correspond. D'autres fiches seront ajoutées " +
        "(le manuel en compte 64).</p>";
    }
  }

  // -------------------------------------------------------------- questionnaire
  function startQuiz(key) {
    session.symptomKey = key;
    session.answers = {};
    el("quizTitle").textContent = KB[key].symptome;
    renderQuiz();
    show("step-quiz");
  }

  function renderQuiz() {
    var f = KB[session.symptomKey];
    var form = el("quizForm");
    form.innerHTML = "";
    var visible = Engine.visibleQuestions(f, session.answers, session.ctx);
    visible.forEach(function (qq) {
      form.appendChild(renderQuestion(qq));
    });
    updateProgress(visible);
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
    var f = KB[session.symptomKey];
    session.result = Engine.run(f, session.answers, session.ctx);
    return session.result;
  }

  function showPatientResult() {
    var r = compute();
    var msg = el("patientMessage");
    var prudent;
    if (r.niveau >= 3) {
      prudent = "<p class='alert u3'>Certains éléments de vos réponses nécessitent une " +
        "<strong>évaluation médicale sans attendre</strong>. Contactez votre médecin, une " +
        "structure de soins, ou le 15 si vous vous sentez mal.</p>";
    } else if (r.niveau === 2) {
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
  function renderSynthese() {
    if (!session.result) { el("medecinEmpty").hidden = false; el("medecinSynthese").hidden = true; return; }
    var f = KB[session.symptomKey], r = session.result, ctx = session.ctx;
    el("medecinEmpty").hidden = true;
    var box = el("medecinSynthese");
    box.hidden = false;

    var recapLines = Engine.recap(f, session.answers, session.ctx);
    var ctxLine = Engine.humanizeContext(ctx);

    var rf = r.redFlags.length
      ? "<ul class='rf'>" + r.redFlags.map(function (x) {
          return "<li><span class='u-tag " + Engine.URGENCE[x.niveau].classe + "'>N" + x.niveau +
            "</span> " + esc(x.message_medecin) + "</li>"; }).join("") + "</ul>"
      : "<p class='ok'>Pas de red flag vital immédiat détecté sur les éléments déclarés. " +
        "La vigilance clinique reste de mise.</p>";

    var hyp = r.hypotheses.length
      ? "<ol class='hyp'>" + r.hypotheses.slice(0, 4).map(function (h) {
          var args = h.arguments_pour.length
            ? " <span class='args'>(" + h.arguments_pour.map(esc).join(" · ") + ")</span>" : "";
          return "<li><strong>" + esc(h.diagnostic) + "</strong>" + args +
            " <span class='score'>score " + h.score + "/" + h.maxScore + "</span></li>"; }).join("") + "</ol>"
      : "<p class='muted'>Pas d'orientation différentielle marquée : compléter l'interrogatoire et l'examen.</p>";

    box.innerHTML =
      "<div class='card synthese'>" +
        "<div class='syn-head " + r.urgence.classe + "'>" +
          "<div><h2>Synthèse clinique — " + esc(f.symptome) + "</h2>" +
            "<p class='syn-sub'>" + esc(f.specialite.join(" · ")) +
            (ctxLine ? " — " + esc(ctxLine) : "") + "</p></div>" +
          "<div class='urg-badge'>Niveau " + r.niveau + "<small>" + esc(r.urgence.libelle) + "</small></div>" +
        "</div>" +

        block("Motif principal", "<p>" + esc(f.symptome) +
          (ctxLine ? " — " + esc(ctxLine) : "") + "</p>") +

        block("Éléments importants (déclaratif patient)",
          recapLines.length ? "<ul class='recap'>" + recapLines.map(function (l) {
            return "<li>" + esc(l) + "</li>"; }).join("") + "</ul>"
            : "<p class='muted'>Questionnaire incomplet.</p>") +

        block("⚠ Red flags / signes d'alerte", rf) +

        block("Hypothèses à envisager (classées)", hyp) +

        block("À vérifier à l'examen clinique",
          "<ul class='verif'>" + r.points_a_verifier.map(function (p) {
            return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>") +

        block("Examens complémentaires à discuter",
          r.examens_a_discuter.length
            ? "<ul class='exam'>" + r.examens_a_discuter.map(function (e) {
                return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>"
            : "<p class='muted'>Selon l'examen clinique.</p>") +

        block("Orientation proposée",
          "<p class='orient " + r.urgence.classe + "'>" + esc(r.urgence.orientation) + "</p>") +

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
    session.ctx = { age: 38, sexe: "Homme", grossessePossible: false, ageProcreer: false, antecedents: [] };
    session.symptomKey = "acouphene";
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
    ["ctx-sexe", "ctx-consent"].forEach(function (id) {
      el(id).addEventListener("change", refreshIntroValidity);
    });
    el("toSymptom").addEventListener("click", function () {
      readContext(); renderSymptomGrid(""); show("step-symptom");
    });
    el("symptomSearch").addEventListener("input", function (e) { renderSymptomGrid(e.target.value); });
    el("backToSymptom").addEventListener("click", function () { show("step-symptom"); });
    el("submitQuiz").addEventListener("click", function (e) { e.preventDefault(); showPatientResult(); });
    el("goMedecin").addEventListener("click", function () { setMode("medecin"); });
    el("restart").addEventListener("click", function () {
      session = { ctx: {}, symptomKey: null, answers: {}, result: null };
      el("ctx-consent").checked = false; refreshIntroValidity(); show("step-intro");
    });
    el("loadDemo").addEventListener("click", loadDemo);
    el("modeSwitch").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-mode]");
      if (b) setMode(b.dataset.mode);
    });
    refreshIntroValidity();
    renderSymptomGrid("");
    // Accès direct à un symptôme depuis le catalogue : index.html#s=<clé>
    var m = /#s=([a-z_]+)/.exec(location.hash);
    if (m && KB[m[1]]) { startQuiz(m[1]); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
