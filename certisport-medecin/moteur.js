/* =====================================================================
   CertiSport Médecin — moteur de règles
   Moteur transparent et explicable : chaque conclusion est accompagnée
   de sa justification (source, article, date, statut, certitude).
   Aucune sortie binaire « apte / inapte » : uniquement des niveaux
   d'alerte argumentés. La décision finale appartient au médecin.
   Dépend de data.js. Sans dépendance DOM : testable (tests.html).
   ===================================================================== */
'use strict';

const CSM = (() => {

  /* ---------- utilitaires ---------- */
  const sportById = id => CS_SPORTS.find(s => s.id === id) || null;
  const regleById = id => CS_REGLES.find(r => r.id === id) || null;

  function calcAge(ddn, dateRef) {
    if (!ddn) return null;
    const d = new Date(ddn), ref = dateRef ? new Date(dateRef) : new Date();
    if (isNaN(d) || isNaN(ref)) return null;
    let age = ref.getFullYear() - d.getFullYear();
    const m = ref.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && ref.getDate() < d.getDate())) age--;
    return age;
  }

  function calcIMC(poids, taille) {
    const p = Number(poids), t = Number(taille) / 100;
    if (!p || !t) return null;
    return Math.round((p / (t * t)) * 10) / 10;
  }

  function rechercherSports(q) {
    const norm = t => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const n = norm(q);
    if (!n) return CS_SPORTS;
    return CS_SPORTS.filter(s => norm([s.nom, ...(s.syn || []), s.fed].join(" ")).includes(n));
  }

  function citation(regleId) {
    const r = regleById(regleId);
    if (!r) return null;
    return {
      texte: r.texte, article: r.article, date: r.date_vigueur,
      verification: r.date_verification, statut: r.statut, url: r.urlOfficielle,
      niveau_validation: r.niveau_validation
    };
  }

  /* -------------------------------------------------------------------
     1. MOTEUR RÉGLEMENTAIRE — « le certificat est-il nécessaire ? »
     Entrée : { age, sport(id), competition, licencie, premiereLicence,
                questionnaireSantePositif ('oui'|'non'|'inconnu'),
                exigenceFederaleConnue ('oui'|'non'|'inconnu'),
                exigenceClub ('oui'|'non'|'inconnu'),
                dateDernierCertificat }
     Sortie : { code, libelle, certitude, justifications[], avertissements[],
                examenSpecifique, validiteMax, cpActive }
     Codes : OBLIGATOIRE_LOI | EXIGE_FEDERATION | EXIGE_CLUB |
             QUESTIONNAIRE_SUFFIT | NON_SYSTEMATIQUE | INDETERMINE
  ------------------------------------------------------------------- */
  function evaluerCadre(ctx) {
    const sport = sportById(ctx.sportId);
    const just = [], avert = [];
    const mineur = ctx.age !== null && ctx.age < 18;

    if (!sport) {
      return { code: "INDETERMINE", libelle: "Situation indéterminée : discipline non identifiée",
        certitude: "faible", justifications: [], avertissements: ["Préciser la discipline exacte avant tout raisonnement réglementaire."],
        examenSpecifique: false, validiteMax: null, cpActive: false };
    }

    /* Refus du certificat générique « tous sports » */
    if (ctx.tousSports) {
      return { code: "INDETERMINE",
        libelle: "Un certificat générique « pour tous les sports » ne doit pas être délivré",
        certitude: "élevée",
        justifications: [{ regle: citation("CS-CNOM-CERTIF"),
          motif: "Le certificat doit porter sur une ou des disciplines identifiées : l'absence de contre-indication ne peut être appréciée que par rapport aux contraintes d'une pratique précise." }],
        avertissements: ["Demander la ou les disciplines précises et adapter l'évaluation à chacune."],
        examenSpecifique: false, validiteMax: null, cpActive: false };
    }

    /* --- Disciplines à contraintes particulières --- */
    let cpActive = sport.cp === true;
    if (sport.cp === "conditionnel") {
      if (sport.catCP === "combat_ko") {
        cpActive = ctx.competition && (ctx.koAutorise !== "non");
        if (ctx.competition && ctx.koAutorise === "inconnu")
          avert.push("Vérifier si le règlement de la compétition autorise la mise hors combat : la qualification « contraintes particulières » en dépend.");
        if (!ctx.competition)
          avert.push("Pratique hors compétition d'un sport de combat : la catégorie « contraintes particulières » vise la compétition avec mise hors combat — vérifier le règlement fédéral pour l'entraînement/loisir.");
      } else if (sport.catCP === "vehicules") {
        cpActive = !!ctx.competition;
        if (!ctx.competition) avert.push("Véhicules terrestres à moteur : la catégorie « contraintes particulières » vise la COMPÉTITION. En pratique loisir, vérifier le règlement de l'organisateur.");
      } else if (sport.catCP === "plongee") {
        cpActive = true;
        if (sport.condCP) avert.push(sport.condCP);
      }
    }
    if (sport.cp === "exclu") {
      avert.push((sport.condCP || "Discipline exclue de la liste D.231-1-5.") + "");
    }
    if (sport.cp === "inconnu") {
      return { code: "INDETERMINE", libelle: "Situation indéterminée : vérifier le règlement fédéral de cette discipline",
        certitude: "faible",
        justifications: [{ regle: citation("CS-D231-1-5"), motif: "Discipline hors référentiel embarqué : vérifier manuellement si elle relève d'une catégorie à contraintes particulières et ce qu'exige la fédération." }],
        avertissements: avert, examenSpecifique: false, validiteMax: null, cpActive: false };
    }

    if (cpActive && (ctx.licencie || ctx.competition)) {
      just.push({ regle: citation("CS-L231-2-3"),
        motif: "Discipline à contraintes particulières (" + (CS_CATEGORIES_CP[sport.catCP] ? CS_CATEGORIES_CP[sport.catCP].nom : sport.catCP) + ") : certificat médical de moins d'un an obligatoire, établi après l'examen médical spécifique. Le questionnaire de santé ne peut pas s'y substituer, y compris pour un mineur." });
      just.push({ regle: citation("CS-D231-1-5"), motif: "Discipline listée à l'article D.231-1-5 (rédaction issue du décret n° 2023-853 du 31 août 2023)." });
      just.push({ regle: citation("CS-ARRETE-2017"), motif: "Contenu de l'examen spécifique : arrêté du 24 juillet 2017 (version consolidée à vérifier)." });
      return { code: "OBLIGATOIRE_LOI",
        libelle: "Certificat légalement obligatoire (discipline à contraintes particulières)",
        certitude: "élevée", justifications: just, avertissements: avert,
        examenSpecifique: true, validiteMax: "1 an", cpActive: true };
    }
    if (cpActive && !ctx.licencie && !ctx.competition) {
      avert.push("Pratique sans licence ni compétition d'une discipline à contraintes particulières : l'obligation légale (L.231-2-3) vise la licence et la compétition ; la structure d'accueil peut néanmoins exiger un certificat.");
    }

    /* --- Sports retirés de l'ancienne liste --- */
    if (sport.ancienListe) {
      avert.push("⚠️ " + sport.nom + " figurait dans l'ANCIENNE liste des disciplines à contraintes particulières mais en a été retiré (décret n° 2023-853 du 31/08/2023). Ne pas appliquer l'ancien régime ; conserver néanmoins une évaluation médicale adaptée aux risques et vérifier le règlement fédéral (" + sport.fed + ").");
    }

    /* --- Mineur --- */
    if (mineur && (ctx.licencie || ctx.competition)) {
      if (ctx.questionnaireSantePositif === "oui") {
        just.push({ regle: citation("CS-QS-MINEUR"), motif: "Mineur avec réponse positive au questionnaire de santé : un certificat de moins de 6 mois est requis." });
        return { code: "EXIGE_FEDERATION", libelle: "Certificat requis (questionnaire de santé du mineur positif)",
          certitude: "élevée", justifications: just, avertissements: avert,
          examenSpecifique: false, validiteMax: "6 mois (certificat exigé par le dispositif)", cpActive: false };
      }
      just.push({ regle: citation("CS-QS-MINEUR"), motif: "Mineur, hors discipline à contraintes particulières : le questionnaire de santé renseigné avec le représentant légal peut suffire pour la licence et la compétition. Certificat seulement si une réponse est positive." });
      avert.push("Vérifier que le règlement de la fédération (" + sport.fed + ") n'ajoute pas d'exigence propre.");
      return { code: "QUESTIONNAIRE_SUFFIT", libelle: "Questionnaire de santé pouvant suffire (mineur)",
        certitude: ctx.questionnaireSantePositif === "inconnu" ? "moyenne (statut du questionnaire inconnu)" : "élevée",
        justifications: just, avertissements: avert, examenSpecifique: false, validiteMax: null, cpActive: false };
    }

    /* --- Majeur licencié --- */
    if (ctx.licencie) {
      just.push({ regle: citation("CS-L231-2"), motif: "Majeur licencié, hors contraintes particulières : depuis la loi n° 2022-296, les conditions médicales de la licence sont fixées par le règlement fédéral. Il n'existe plus d'obligation légale générale uniforme." });
      if (ctx.exigenceFederaleConnue === "oui") {
        just.push({ regle: citation("CS-QS-SPORT"), motif: "La fédération exige un certificat selon son règlement (le cas échéant avec renouvellement par questionnaire QS-Sport)." });
        return { code: "EXIGE_FEDERATION", libelle: "Certificat exigé par la fédération (règlement fédéral)",
          certitude: "élevée (déclaratif : règlement fourni par le demandeur)", justifications: just, avertissements: avert,
          examenSpecifique: false, validiteMax: "selon règlement fédéral", cpActive: false };
      }
      if (ctx.exigenceFederaleConnue === "non") {
        return { code: "NON_SYSTEMATIQUE", libelle: "Certificat non systématiquement requis (la fédération n'en exige pas)",
          certitude: "moyenne (déclaratif)", justifications: just,
          avertissements: [...avert, "Confirmer sur le règlement médical fédéral en vigueur ; la consultation reste l'occasion d'une évaluation médicale de la pratique."],
          examenSpecifique: false, validiteMax: null, cpActive: false };
      }
      return { code: "INDETERMINE", libelle: "Situation indéterminée : vérifier le règlement fédéral (" + sport.fed + ")",
        certitude: "faible", justifications: just,
        avertissements: [...avert, CS_AVERTISSEMENTS.incertitude],
        examenSpecifique: false, validiteMax: null, cpActive: false };
    }

    /* --- Non licencié, compétition --- */
    if (ctx.competition) {
      just.push({ regle: citation("CS-L231-2-1"), motif: "Non-licencié s'inscrivant à une compétition fédérale : conditions fixées par le règlement fédéral (historiquement certificat de moins d'un an ou licence)." });
      avert.push("Vérifier le règlement de la compétition (organisateur / fédération " + sport.fed + ").");
      return { code: "EXIGE_FEDERATION", libelle: "Certificat en principe exigé pour la compétition (à confirmer sur le règlement)",
        certitude: "moyenne", justifications: just, avertissements: avert,
        examenSpecifique: false, validiteMax: "généralement 1 an (à confirmer)", cpActive: false };
    }

    /* --- Loisir hors fédération --- */
    just.push({ regle: citation("CS-L231-2"), motif: "Pratique de loisir hors licence et hors compétition : aucune obligation légale générale de certificat." });
    if (ctx.exigenceClub === "oui") {
      return { code: "EXIGE_CLUB", libelle: "Certificat exigé par le club ou l'organisateur (exigence contractuelle, non légale)",
        certitude: "élevée (déclaratif)", justifications: just,
        avertissements: [...avert, "Distinguer cette exigence privée d'une obligation réglementaire : le contenu du certificat reste soumis aux règles déontologiques habituelles."],
        examenSpecifique: false, validiteMax: "selon demande", cpActive: false };
    }
    return { code: "NON_SYSTEMATIQUE", libelle: "Certificat non systématiquement requis",
      certitude: "élevée", justifications: just,
      avertissements: [...avert, "La consultation peut être l'occasion d'une évaluation médicale de l'activité physique (utile, sans être exigée)."],
      examenSpecifique: false, validiteMax: null, cpActive: false };
  }

  /* -------------------------------------------------------------------
     2. MOTEUR CLINIQUE — alertes explicables
     ctx : { reponses:{}, examen:{}, module, sportId, sportFlags, moduleReponses:{} }
  ------------------------------------------------------------------- */
  function contexteAlertes(etat) {
    const sport = sportById(etat.sport.sportId) || {};
    return {
      reponses: etat.reponses, examen: etat.examen,
      module: sport.module || null, sportId: sport.id || null,
      sportFlags: { collision: !!sport.collision, ko: !!sport.ko, arme: !!sport.arme, moteur: !!sport.moteur,
        eau: (sport.env || []).some(e => /eau/i.test(e)) },
      moduleReponses: etat.moduleReponses || {},
      rep(id) { return etat.reponses[id] || ""; }
    };
  }

  function evaluerAlertes(etat) {
    const c = contexteAlertes(etat);
    const sport = sportById(etat.sport.sportId);
    const res = [];
    for (const a of CS_ALERTES) {
      let declenchee = false;
      try {
        if (a.q) declenchee = c.rep(a.q) === "oui" || c.examen[a.q] === "oui";
        else if (a.fn) declenchee = !!a.fn(c);
      } catch (e) { declenchee = false; }
      if (!declenchee) continue;
      res.push({
        id: a.id, niveau: a.niveau, donnee: a.donnee, risque: a.risque,
        conduite: a.conduite, sport: sport ? sport.nom : "—",
        source: a.source ? citation(a.source) : null,
        limites: a.limites || "Alerte générée par des règles simples : elle ne dispense ni de l'interrogatoire ni de l'examen ; des situations non prévues par l'outil peuvent exister.",
        maj: CS_VERSION_BASE
      });
    }
    /* module combat : commotion < 3 semaines via date */
    const mr = etat.moduleReponses || {};
    if ((mr.cb_dernier_tc || mr.cb_dernier_combat) && sport && sport.module === "combat") {
      const dt = new Date(mr.cb_dernier_tc || mr.cb_dernier_combat);
      const dc = new Date(etat.patient.dateConsult || Date.now());
      if (!isNaN(dt) && (dc - dt) / 86400000 < 21 && (etat.reponses["neuro_commotion"] === "oui" || mr.cb_symptomes === "oui")) {
        res.push({ id: "A-commotion-recente-combat", niveau: 4,
          donnee: "Traumatisme crânien/commotion datant de moins de 3 semaines (sport de combat)",
          risque: "Syndrome du second impact ; récupération cérébrale incomplète",
          conduite: "Certificat différé ; pas de reprise du combat avant résolution complète des symptômes et protocole de reprise graduée ; avis spécialisé si symptômes persistants.",
          sport: sport.nom, source: null,
          limites: "Le délai de 3 semaines est un repère prudent, non une règle légale ; les protocoles fédéraux peuvent différer.",
          maj: CS_VERSION_BASE });
      }
    }
    /* dédoublonnage simple par id */
    return res.filter((a, i) => res.findIndex(x => x.id === a.id) === i);
  }

  /* Classification globale : niveau max + ventilation */
  function classifier(alertes) {
    const urgences = alertes.filter(a => a.niveau === "U");
    const nums = alertes.filter(a => a.niveau !== "U").map(a => a.niveau);
    const max = nums.length ? Math.max(...nums) : 0;
    return {
      urgence: urgences.length > 0, urgences,
      niveauMax: max,
      parNiveau: [0, 1, 2, 3, 4, 5].map(n => alertes.filter(a => a.niveau === n)),
      bloquantes: alertes.filter(a => a.niveau === "U" || a.niveau >= 3)
    };
  }

  /* -------------------------------------------------------------------
     3. VERROUS MÉDICO-LÉGAUX du certificat
  ------------------------------------------------------------------- */
  function verrousCertificat(etat, alertes, synthese) {
    const v = [];
    if (!etat.patient.dateConsult) v.push("Date d'examen manquante : un certificat sans date d'examen ne peut pas être généré.");
    if (!etat.patient.nom || !etat.patient.prenom) v.push("Identité du patient incomplète.");
    if (!etat.patient.ddn) v.push("Date de naissance manquante.");
    if (!etat.sport.sportId) v.push("Discipline non renseignée : un certificat sans discipline identifiée ne peut pas être généré.");
    if (etat.sport.tousSports) v.push("Formulation « apte à tous les sports » refusée : préciser une ou des disciplines.");
    if (!etat.praticien.nom || !etat.praticien.rpps) v.push("Identité ou n° RPPS du médecin manquant.");
    if (etat.patient.dateConsult) {
      const dc = new Date(etat.patient.dateConsult);
      const now = new Date(); now.setHours(23, 59, 59);
      if (dc > now) v.push("La date d'examen est postérieure à aujourd'hui : vérifier (pas d'antidatage/postdatage).");
    }
    const nonTraitees = (synthese.bloquantes || []).filter(a => {
      const t = etat.alertesTraitees[a.id];
      return !(t && t.statut === "traitee");
    });
    if (nonTraitees.length) v.push(nonTraitees.length + " signal(aux) d'alerte non explicitement évalué(s) par le médecin : chaque alerte de niveau ≥ 3 ou urgente doit être traitée (étape « Alertes ») avant la génération.");
    if (synthese.urgence) v.push("Situation d'urgence potentielle non close : " + CS_AVERTISSEMENTS.urgence);
    if (!etat.decision.conclusionId) v.push("Aucune conclusion médicale sélectionnée.");
    if (!etat.decision.confirme) v.push("Validation médicale manquante : cocher « Je confirme avoir examiné le patient et avoir personnellement évalué la pertinence de cette conclusion. »");
    const ccl = CS_CONCLUSIONS.find(x => x.id === Number(etat.decision.conclusionId));
    if (ccl && ccl.validation_renforcee && !etat.decision.justification)
      v.push("Une contre-indication durable exige une justification clinique écrite (et la vérification du règlement applicable).");
    if (ccl && ccl.favorable && synthese.niveauMax >= 4) {
      const restantes = (synthese.parNiveau[4].concat(synthese.parNiveau[5])).filter(a => {
        const t = etat.alertesTraitees[a.id];
        return !(t && t.statut === "traitee");
      });
      if (restantes.length) v.push("Conclusion favorable incompatible avec des alertes de niveau ≥ 4 non levées et non argumentées.");
    }
    return v;
  }

  /* -------------------------------------------------------------------
     4. GÉNÉRATION DES DOCUMENTS
  ------------------------------------------------------------------- */
  function fmtDate(d) {
    if (!d) return "____";
    const x = new Date(d);
    return isNaN(x) ? String(d) : x.toLocaleDateString("fr-FR");
  }

  function genererCertificat(etat, modele) {
    const p = etat.patient, m = etat.praticien, sport = sportById(etat.sport.sportId);
    const civ = p.sexe === "F" ? "Mme" : p.sexe === "M" ? "M." : "M./Mme";
    const nomPatient = [p.prenom, (p.nom || "").toUpperCase()].filter(Boolean).join(" ");
    const disc = etat.sport.disciplinePrecise || (sport ? sport.nom : "____");
    const entete = `Docteur ${m.nom || "____"}\nN° RPPS : ${m.rpps || "____"}\n${m.adresse || ""}\n\n`;
    const pied = `\n\nFait à ${m.ville || "____"}, le ${fmtDate(p.dateConsult)}\n(certificat établi le jour de l'examen, remis en main propre à l'intéressé(e)${p.age !== null && p.age < 18 ? " / à son représentant légal" : ""})\n\nSignature et cachet :`;
    const mineurRep = (p.age !== null && p.age < 18 && p.representant) ? `, représenté(e) par ${p.representant}` : "";
    const base = `Je soussigné(e), docteur ${m.nom || "____"}, certifie avoir examiné ce jour ${civ} ${nomPatient}${mineurRep}, né(e) le ${fmtDate(p.ddn)}, et n'avoir constaté, à la date de l'examen, aucun signe clinique apparent contre-indiquant la pratique de ${disc}`;

    switch (modele) {
      case "standard":
        return entete + base + ", en loisir." + pied;
      case "competition":
        return entete + base + ", y compris en compétition." + pied;
      case "contraintes":
        return entete + base + (etat.sport.competition ? ", y compris en compétition" : ", en loisir") +
          ".\n\nCe certificat est établi après réalisation de l'examen médical spécifique prévu pour cette discipline à contraintes particulières (art. L.231-2-3 du Code du sport). Validité : un an à compter de la date de l'examen." + pied;
      case "restriction": {
        const r = etat.decision.restrictions || "____";
        const duree = etat.decision.duree ? `\nDurée de la restriction : ${etat.decision.duree}.` : "";
        const reev = etat.decision.dateReeval ? `\nUne réévaluation médicale est prévue le ${fmtDate(etat.decision.dateReeval)}.` : "";
        return entete + base + (etat.sport.competition ? ", y compris en compétition" : ", en loisir") +
          `, sous réserve de la restriction suivante : ${r}.${duree}${reev}` + pied;
      }
      case "ci-temporaire": {
        const duree = etat.decision.duree || "____";
        const reev = etat.decision.dateReeval ? ` Une réévaluation est prévue le ${fmtDate(etat.decision.dateReeval)}.` : "";
        return entete + `Je soussigné(e), docteur ${m.nom || "____"}, certifie avoir examiné ce jour ${civ} ${nomPatient}${mineurRep}, né(e) le ${fmtDate(p.ddn)}, et avoir constaté, à la date de l'examen, une contre-indication TEMPORAIRE à la pratique de ${disc}, pour une durée estimée de ${duree}.${reev}\n\n(Conformément au secret médical, ce certificat ne mentionne aucun motif médical.)` + pied;
      }
      case "eps": {
        const r = etat.decision.restrictions || "____";
        const duree = etat.decision.duree || "____";
        return entete + `Je soussigné(e), docteur ${m.nom || "____"}, certifie avoir examiné ce jour ${civ} ${nomPatient}${mineurRep}, né(e) le ${fmtDate(p.ddn)}, et constate une inaptitude PARTIELLE à l'éducation physique et sportive, pour une durée de ${duree}.\nActivités ou mouvements à aménager (formulation fonctionnelle, sans diagnostic) : ${r}.\nToutes les autres activités restent possibles.` + pied;
      }
      case "reevaluation":
        return entete + `Je soussigné(e), docteur ${m.nom || "____"}, certifie avoir réévalué ce jour ${civ} ${nomPatient}${mineurRep}, né(e) le ${fmtDate(p.ddn)}, dans les suites d'une décision différée ou d'une contre-indication temporaire concernant la pratique de ${disc}.\nConclusion à la date de ce jour : ${etat.decision.texteLibre || "____"}.` + pied;
      case "courrier": {
        const dest = etat.decision.destinataire || "Cher confrère / Chère consœur";
        return entete + `${dest},\n\nJe vous adresse ${civ} ${nomPatient}, né(e) le ${fmtDate(p.ddn)}, vu(e) ce jour en consultation de non-contre-indication à la pratique de ${disc}${etat.sport.competition ? " en compétition" : ""}.\n\nMotif de l'avis demandé : ${etat.decision.motifOrientation || "____"}\n\nÉléments pertinents (avec l'accord du patient) : ${etat.decision.elementsCourrier || "____"}\n\nDans l'attente de votre évaluation, je diffère la délivrance du certificat.\n\nConfraternellement,` + pied;
      }
      default:
        return entete + base + "." + pied;
    }
  }

  function genererNote(etat, cadre, alertes, synthese) {
    const p = etat.patient, s = etat.sport, sport = sportById(s.sportId);
    const ccl = CS_CONCLUSIONS.find(x => x.id === Number(etat.decision.conclusionId));
    const L = [];
    L.push("NOTE CLINIQUE — CONSULTATION DE NON-CONTRE-INDICATION SPORTIVE");
    L.push("(document de dossier médical — NE PAS transmettre au club/fédération)");
    L.push("Générée avec CertiSport Médecin v" + CS_VERSION_BASE + " — outil d'aide, décision médicale personnelle.");
    L.push("");
    L.push("Date de la consultation : " + fmtDate(p.dateConsult));
    L.push("Patient : " + [p.prenom, p.nom].filter(Boolean).join(" ") + " — né(e) le " + fmtDate(p.ddn) +
      (p.age !== null ? " (" + p.age + " ans" + (p.age < 18 ? ", mineur" : "") + ")" : ""));
    if (p.imc) L.push("Taille " + p.taille + " cm, poids " + p.poids + " kg, IMC " + p.imc + " kg/m²");
    if (p.representant) L.push("Représentant légal : " + p.representant);
    L.push("");
    L.push("MOTIF : demande de certificat — " + (s.disciplinePrecise || (sport ? sport.nom : "?")) +
      (s.competition ? " (compétition" + (s.niveau ? ", niveau " + s.niveau : "") + ")" : " (loisir)") +
      (s.federation ? " — fédération : " + s.federation : "") + (s.club ? " — club : " + s.club : ""));
    if (s.frequence || s.duree || s.intensite) L.push("Pratique : " + [s.frequence, s.duree, s.intensite].filter(Boolean).join(" · "));
    L.push("");
    L.push("CADRE RÉGLEMENTAIRE IDENTIFIÉ : " + cadre.libelle + " (certitude : " + cadre.certitude + ")");
    cadre.justifications.forEach(j => {
      if (j.regle) L.push("  · " + j.regle.texte + ", " + j.regle.article + " (vérifié le " + (j.regle.verification || "?") + ", statut : " + j.regle.statut + ")");
    });
    cadre.avertissements.forEach(a => L.push("  ⚠ " + a));
    L.push("");
    const oui = [], inconnus = [];
    CS_QUESTIONNAIRE.forEach(sec => sec.items.forEach(it => {
      const r = etat.reponses[it.id];
      if (r === "oui") oui.push(it.l + (etat.commentaires[it.id] ? " — " + etat.commentaires[it.id] : ""));
      else if (r === "inconnu") inconnus.push(it.l);
    }));
    L.push("INTERROGATOIRE — éléments positifs : " + (oui.length ? "" : "aucun"));
    oui.forEach(x => L.push("  · " + x));
    if (inconnus.length) L.push("Éléments non déterminés : " + inconnus.join(" ; "));
    L.push("");
    const ex = [];
    CS_EXAMEN.forEach(sec => sec.champs.forEach(ch => {
      const v = etat.examen[ch.id];
      if (v !== undefined && v !== "" && v !== null) ex.push(ch.l + " : " + v);
    }));
    L.push("EXAMEN CLINIQUE :" + (ex.length ? "" : " non renseigné"));
    ex.forEach(x => L.push("  · " + x));
    L.push("");
    L.push("SIGNAUX D'ALERTE (" + alertes.length + ") :" + (alertes.length ? "" : " aucun"));
    alertes.forEach(a => {
      const t = etat.alertesTraitees[a.id];
      L.push("  · [" + (a.niveau === "U" ? "URGENCE" : "niveau " + a.niveau) + "] " + a.donnee + " → " + a.conduite +
        (t && t.statut === "traitee" ? " — ÉVALUÉ PAR LE MÉDECIN : " + (t.evaluation || "traité") : " — NON TRAITÉ"));
    });
    L.push("");
    if (etat.examensComp.length) {
      L.push("EXAMENS COMPLÉMENTAIRES :");
      etat.examensComp.forEach(e => L.push("  · " + e.type + " — " + e.statut + (e.resultat ? " — " + e.resultat : "")));
      L.push("");
    }
    L.push("INFORMATION DONNÉE AU PATIENT : " + (etat.decision.information || "information sur les risques liés à la pratique, les signes devant faire interrompre l'effort et consulter."));
    L.push("");
    L.push("DÉCISION : " + (ccl ? ccl.l : "non renseignée"));
    if (etat.decision.justification) L.push("Justification : " + etat.decision.justification);
    if (etat.decision.restrictions) L.push("Restrictions : " + etat.decision.restrictions);
    if (etat.decision.duree) L.push("Durée : " + etat.decision.duree);
    if (etat.decision.dateReeval) L.push("Réévaluation prévue le : " + fmtDate(etat.decision.dateReeval));
    L.push("");
    L.push("Sources consultées : base réglementaire CertiSport v" + CS_VERSION_BASE + " (Code du sport L.231-2 à L.231-2-3, D.231-1-5 issu du décret 2023-853, arrêté du 24/07/2017, décret/arrêté du 07/05/2021)" + (s.federation ? " ; règlement fédéral " + s.federation + " : à vérifier/consulté selon mention ci-dessus" : ""));
    L.push("Médecin validateur : Dr " + (etat.praticien.nom || "____") + " (RPPS " + (etat.praticien.rpps || "____") + ")");
    return L.join("\n");
  }

  return { calcAge, calcIMC, rechercherSports, sportById, regleById, citation,
    evaluerCadre, evaluerAlertes, classifier, verrousCertificat,
    genererCertificat, genererNote };
})();

/* export pour tests éventuels hors navigateur */
if (typeof module !== "undefined" && module.exports) module.exports = { CSM };
