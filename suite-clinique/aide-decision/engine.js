/* ============================================================================
 * MOTEUR DE RAISONNEMENT — règles explicites (pas d'IA pour les red flags).
 * Expose window.Engine : evalPred, run(symptomKey, answers, context).
 *
 * Principe :
 *   1. Red flags = règles explicites codées -> priorité absolue, fixent l'urgence.
 *   2. Diagnostics différentiels = score = somme des poids des arguments validés.
 *   3. Synthèse médecin = agrégation structurée (jamais de diagnostic affirmé).
 * ========================================================================== */
(function () {
  "use strict";

  var URGENCE = {
    1: { libelle: "Non urgent a priori", classe: "u1",
         orientation: "Consultation programmée. Réévaluer selon l'évolution." },
    2: { libelle: "Avis médical rapide", classe: "u2",
         orientation: "Avis médical non différable (jours), examen clinique ciblé indispensable." },
    3: { libelle: "Urgence — avis immédiat", classe: "u3",
         orientation: "Évaluation médicale immédiate / orientation vers les urgences." }
  };

  // ---- Évaluation d'un prédicat ------------------------------------------
  function resolve(pred, ans, ctx) {
    if ("q" in pred) return ans ? ans[pred.q] : undefined;
    if ("ctx" in pred) return ctx ? ctx[pred.ctx] : undefined;
    return undefined;
  }

  function evalPred(pred, ans, ctx) {
    if (!pred || typeof pred !== "object") return false;
    if ("always" in pred) return !!pred.always;
    if (pred.all) return pred.all.every(function (p) { return evalPred(p, ans, ctx); });
    if (pred.any) return pred.any.some(function (p) { return evalPred(p, ans, ctx); });
    if (pred.not) return !evalPred(pred.not, ans, ctx);

    var val = resolve(pred, ans, ctx);
    if ("eq" in pred) return val === pred.eq;
    if ("in" in pred) return pred.in.indexOf(val) !== -1;
    if ("has" in pred) return Array.isArray(val) && val.indexOf(pred.has) !== -1;
    if ("gte" in pred) return typeof val === "number" && val >= pred.gte;
    if ("lte" in pred) return typeof val === "number" && val <= pred.lte;
    if ("truthy" in pred) return !!val === pred.truthy;
    return false;
  }

  // ---- Questions visibles selon le contexte/réponses ----------------------
  function visibleQuestions(fiche, ans, ctx) {
    return fiche.questions.filter(function (qq) {
      return !qq.showIf || evalPred(qq.showIf, ans, ctx);
    });
  }

  // ---- Exécution principale ----------------------------------------------
  function run(fiche, ans, ctx) {
    // 1) Red flags
    var firedFlags = (fiche.red_flags || []).filter(function (rf) {
      return evalPred(rf.when, ans, ctx);
    });
    var niveau = firedFlags.reduce(function (m, rf) { return Math.max(m, rf.niveau); }, 1);

    // 2) Diagnostics différentiels scorés
    var hypotheses = (fiche.diagnostics_differentiels || []).map(function (dx) {
      var matched = [], score = 0, maxScore = 0;
      (dx.arguments || []).forEach(function (a) {
        var w = a.w || 1; maxScore += w;
        if (evalPred(a.when, ans, ctx)) { matched.push(a.label); score += w; }
      });
      return {
        id: dx.id, diagnostic: dx.diagnostic, score: score, maxScore: maxScore,
        arguments_pour: matched, examens_a_discuter: dx.examens_a_discuter || []
      };
    }).filter(function (h) { return h.score > 0; })
      .sort(function (a, b) { return b.score - a.score; });

    // 3) Examens à discuter (union des hypothèses retenues, sans doublon)
    var examens = [];
    hypotheses.slice(0, 4).forEach(function (h) {
      h.examens_a_discuter.forEach(function (e) {
        if (examens.indexOf(e) === -1) examens.push(e);
      });
    });

    return {
      symptome: fiche.symptome,
      specialite: fiche.specialite,
      niveau: niveau,
      urgence: URGENCE[niveau],
      redFlags: firedFlags,
      hypotheses: hypotheses,
      points_a_verifier: fiche.examens_clinique || [],
      examens_a_discuter: examens
    };
  }

  // ---- Synthèse texte côté médecin ---------------------------------------
  function humanizeContext(ctx) {
    var bits = [];
    if (ctx.age != null && ctx.age !== "") bits.push(ctx.age + " ans");
    if (ctx.sexe) bits.push(ctx.sexe.toLowerCase());
    if (ctx.temperature != null) bits.push(ctx.temperature + " °C" + (ctx.fievre ? " (fièvre)" : " (apyrétique)"));
    else if (ctx.temperatureMesuree === false) bits.push("température non prise");
    if (ctx.grossessePossible) bits.push("grossesse possible");
    (ctx.antecedents || []).forEach(function (a) { bits.push(a); });
    return bits.join(", ");
  }

  function recap(fiche, ans, ctx) {
    var lines = [];
    visibleQuestions(fiche, ans, ctx).forEach(function (qq) {
      var v = ans[qq.id];
      if (v === undefined || v === null || v === "") return;
      if (qq.type === "boolean") {
        if (v === "unknown") return;
        lines.push(qq.label + " : " + (v === true ? "oui" : "non"));
      } else {
        lines.push(qq.label + " : " + v);
      }
    });
    return lines;
  }

  window.Engine = {
    URGENCE: URGENCE,
    evalPred: evalPred,
    visibleQuestions: visibleQuestions,
    run: run,
    recap: recap,
    humanizeContext: humanizeContext
  };
})();
