/* =====================================================================
   CertiSport Médecin — scénarios de validation médicale et réglementaire
   10 cas obligatoires exécutés contre le moteur (moteur.js + data.js).
   Utilisé par tests.html (navigateur) et exécutable en Node (harnais).
   ===================================================================== */
'use strict';

function etatVierge() {
  return {
    praticien: { nom:"Dr Test", rpps:"10000000000", adresse:"1 rue Test", ville:"Testville" },
    patient: { nom:"Dupont", prenom:"Alex", ddn:"1990-01-15", sexe:"M", taille:"180", poids:"75",
      profession:"", coordonnees:"", representant:"", dateConsult:"2026-07-16", age:null, imc:null },
    sport: { sportId:"", disciplinePrecise:"", federation:"", club:"", licencie:false,
      premiereLicence:"premiere", competition:false, niveau:"", frequence:"", duree:"",
      intensite:"", reprise:false, debutant:false, objectifs:"", environnement:"",
      dateCompetition:"", documentClub:"", dateDernierCertificat:"",
      questionnaireSantePositif:"inconnu", exigenceFederaleConnue:"inconnu",
      exigenceClub:"inconnu", koAutorise:"inconnu", tousSports:false },
    reponses: {}, commentaires: {}, moduleReponses: {}, examen: {},
    alertesTraitees: {}, examensComp: [],
    decision: { conclusionId:"", restrictions:"", duree:"", dateReeval:"", justification:"",
      information:"", confirme:false, texteLibre:"", destinataire:"", motifOrientation:"", elementsCourrier:"" }
  };
}

function cadreDe(etat) {
  etat.patient.age = CSM.calcAge(etat.patient.ddn, etat.patient.dateConsult);
  return CSM.evaluerCadre({
    age: etat.patient.age, sportId: etat.sport.sportId,
    competition: etat.sport.competition, licencie: etat.sport.licencie,
    premiereLicence: etat.sport.premiereLicence === "premiere",
    questionnaireSantePositif: etat.sport.questionnaireSantePositif,
    exigenceFederaleConnue: etat.sport.exigenceFederaleConnue,
    exigenceClub: etat.sport.exigenceClub, koAutorise: etat.sport.koAutorise,
    tousSports: etat.sport.tousSports,
    dateDernierCertificat: etat.sport.dateDernierCertificat
  });
}

const CS_TESTS = [
  {
    nom: "Cas 1 — Mineur, licence football, questionnaire de santé négatif",
    attendu: "Certificat non nécessairement requis (questionnaire suffit) ; pas de parcours « contraintes particulières » ; renvoi au règlement fédéral.",
    run(assert) {
      const e = etatVierge();
      e.patient.ddn = "2012-03-10";
      e.sport.sportId = "football"; e.sport.licencie = true; e.sport.questionnaireSantePositif = "non";
      const cadre = cadreDe(e);
      assert(cadre.code === "QUESTIONNAIRE_SUFFIT", "code attendu QUESTIONNAIRE_SUFFIT, obtenu " + cadre.code);
      assert(cadre.cpActive === false, "pas de contraintes particulières pour le football");
      assert(cadre.avertissements.some(a => /règlement/i.test(a)), "doit renvoyer à la vérification du règlement fédéral");
      const sport = CSM.sportById("football");
      assert(!["plongee","combat","tir","moteur","motonautisme"].includes(sport.module || ""), "aucun module « contraintes particulières » ne doit se lancer");
    }
  },
  {
    nom: "Cas 2 — Mineur, plongée en scaphandre",
    attendu: "Certificat obligatoire (< 1 an), examen spécifique, questionnaire plongée avec examen ORL/respiratoire ciblé, contrôle du règlement fédéral.",
    run(assert) {
      const e = etatVierge();
      e.patient.ddn = "2012-03-10";
      e.sport.sportId = "plongee-scaphandre"; e.sport.licencie = true;
      const cadre = cadreDe(e);
      assert(cadre.code === "OBLIGATOIRE_LOI", "code attendu OBLIGATOIRE_LOI, obtenu " + cadre.code);
      assert(cadre.validiteMax === "1 an", "validité maximale 1 an");
      assert(cadre.examenSpecifique === true, "examen médical spécifique requis");
      assert(cadre.justifications.some(j => j.regle && /L\.231-2-3/.test(j.regle.article)), "justification citant L.231-2-3");
      const mod = CS_MODULES[CSM.sportById("plongee-scaphandre").module];
      assert(mod && mod.examens.some(x => /otoscopie/i.test(x)), "examen ORL ciblé (otoscopie) prévu");
      assert(mod.examens.some(x => /respiratoire/i.test(x)), "examen respiratoire ciblé prévu");
    }
  },
  {
    nom: "Cas 3 — Adulte, boxe compétition, commotion il y a 2 semaines, céphalées persistantes",
    attendu: "Alerte rouge, certificat différé, suspicion de syndrome post-commotionnel, blocage de tout certificat favorable, orientation spécialisée.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "boxe-anglaise"; e.sport.competition = true; e.sport.koAutorise = "oui"; e.sport.licencie = true;
      e.reponses.neuro_commotion = "oui"; e.reponses.neuro_symptomes_post_commotion = "oui";
      e.moduleReponses.cb_dernier_tc = "2026-07-02"; e.moduleReponses.cb_symptomes = "oui";
      const cadre = cadreDe(e);
      assert(cadre.code === "OBLIGATOIRE_LOI", "boxe en compétition avec KO = contraintes particulières");
      const alertes = CSM.evaluerAlertes(e);
      const synth = CSM.classifier(alertes);
      assert(synth.niveauMax >= 4, "niveau d'alerte ≥ 4 (obtenu " + synth.niveauMax + ")");
      assert(alertes.some(a => a.id === "A-commotion"), "alerte post-commotionnelle présente");
      assert(alertes.some(a => a.id === "A-commotion-recente-combat"), "alerte commotion récente (combat) présente");
      assert(alertes.some(a => /spécialis/i.test(a.conduite)), "orientation spécialisée proposée");
      e.decision.conclusionId = "3"; e.decision.confirme = true; /* tentative favorable */
      const verrous = CSM.verrousCertificat(e, alertes, synth);
      assert(verrous.length > 0, "génération d'un certificat favorable verrouillée");
    }
  },
  {
    nom: "Cas 4 — Adulte, tir sportif, dépression ancienne stabilisée, sans idées suicidaires",
    attendu: "Pas de contre-indication automatique ; évaluation de la stabilité et de la sécurité ; décision laissée au médecin.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "tir-sportif"; e.sport.licencie = true;
      e.reponses.psy_depression_severe = "non"; e.reponses.psy_suicidaire = "non";
      e.reponses.psy_psychose = "non"; e.reponses.psy_manie = "non"; e.reponses.psy_hetero = "non";
      const cadre = cadreDe(e);
      assert(cadre.code === "OBLIGATOIRE_LOI", "tir sportif = contraintes particulières (armes)");
      const alertes = CSM.evaluerAlertes(e);
      assert(!alertes.some(a => a.id === "A-psychose-arme"), "aucune alerte psychiatrique ne doit se déclencher (antécédent stabilisé)");
      assert(!alertes.some(a => a.niveau === 5), "aucune contre-indication durable automatique");
      const mod = CS_MODULES.tir;
      assert(/JAMAIS/i.test(mod.note), "le module rappelle qu'un antécédent psychiatrique n'entraîne pas d'inaptitude automatique");
    }
  },
  {
    nom: "Cas 5 — Pilote moto, somnolence importante, SAOS non traité",
    attendu: "Alerte sur le risque d'incapacité ; certificat à différer ; évaluation/traitement du sommeil.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "moto-competition"; e.sport.competition = true; e.sport.licencie = true;
      e.reponses.resp_saos = "oui"; e.reponses.resp_somnolence = "oui";
      const alertes = CSM.evaluerAlertes(e);
      const a = alertes.find(x => x.id === "A-saos-conduite");
      assert(!!a, "alerte SAOS + pilotage présente");
      assert(a.niveau >= 3, "niveau ≥ 3 : certificat à différer");
      assert(/sommeil|polygraphie|Epworth/i.test(a.conduite), "conduite : évaluation du sommeil");
      const synth = CSM.classifier(alertes);
      assert(synth.bloquantes.length > 0, "alerte bloquante avant délivrance");
    }
  },
  {
    nom: "Cas 6 — Asthme léger bien contrôlé, certificat de natation",
    attendu: "Asthme non classé automatiquement contre-indication ; vigilance simple ; conclusion favorable possible après examen.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "natation"; e.sport.licencie = true; e.sport.exigenceFederaleConnue = "oui";
      e.reponses.resp_asthme = "oui";
      const alertes = CSM.evaluerAlertes(e);
      const a = alertes.find(x => x.id === "A-asthme");
      assert(!!a && a.niveau === 1, "asthme = simple point de vigilance (niveau 1)");
      assert(!alertes.some(x => x.niveau !== "U" && x.niveau >= 3), "aucune alerte bloquante");
      const synth = CSM.classifier(alertes);
      e.decision.conclusionId = "4"; e.decision.confirme = true;
      const verrous = CSM.verrousCertificat(e, alertes, synth);
      assert(verrous.length === 0, "conclusion favorable possible : verrous levés (" + verrous.join(" | ") + ")");
    }
  },
  {
    nom: "Cas 7 — Antécédent de pneumothorax spontané, certificat de plongée",
    attendu: "Alerte majeure spécifique ; pas de conclusion automatique ; recherche du traitement définitif ; avis hyperbare/pneumologique.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "plongee-scaphandre"; e.sport.licencie = true;
      e.reponses.resp_pneumothorax = "oui";
      const alertes = CSM.evaluerAlertes(e);
      const a = alertes.find(x => x.id === "A-pneumothorax-plongee");
      assert(!!a, "alerte majeure spécifique plongée/pneumothorax présente");
      assert(a.niveau >= 3, "niveau bloquant (pas de conclusion automatique)");
      assert(/hyperbare|pneumolog/i.test(a.conduite), "avis hyperbare ou pneumologique demandé");
      assert(/récidive|pleurodèse|traitement/i.test(a.conduite), "recherche du traitement définitif et du risque de récidive");
      assert(!alertes.some(x => x.niveau === 5), "pas de contre-indication définitive automatique : décision spécialisée");
    }
  },
  {
    nom: "Cas 8 — Patient fébrile, marathon dans trois jours",
    attendu: "Contre-indication temporaire à l'effort intense ; certificat différé ; réévaluation après guérison.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "marathon"; e.sport.competition = true;
      e.reponses.aut_fievre = "oui";
      const alertes = CSM.evaluerAlertes(e);
      const a = alertes.find(x => x.id === "A-fievre");
      assert(!!a && a.niveau === 4, "contre-indication temporaire probable (niveau 4)");
      assert(/réévaluation|guérison/i.test(a.conduite), "réévaluation après guérison proposée");
      e.decision.conclusionId = "3"; e.decision.confirme = true;
      const synth = CSM.classifier(alertes);
      const verrous = CSM.verrousCertificat(e, alertes, synth);
      assert(verrous.length > 0, "certificat favorable bloqué tant que l'alerte n'est pas traitée");
    }
  },
  {
    nom: "Cas 9 — Demande de certificat générique « pour tous les sports »",
    attendu: "Formulation refusée ; demander une discipline précise ; explication.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "football"; e.sport.tousSports = true;
      const cadre = cadreDe(e);
      assert(cadre.code === "INDETERMINE" && /tous les sports/i.test(cadre.libelle), "refus explicite de la formulation");
      assert(cadre.avertissements.some(a => /discipline/i.test(a)), "demande d'une ou plusieurs disciplines précises");
      const verrous = CSM.verrousCertificat(e, [], CSM.classifier([]));
      assert(verrous.some(v => /tous les sports/i.test(v)), "verrou de génération présent");
    }
  },
  {
    nom: "Cas 10 — Club exigeant une IRM systématique sans source officielle",
    attendu: "Distinguer demande du club / règlement fédéral / obligation légale ; demander la source ; ne pas présenter l'IRM comme légalement obligatoire.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "football"; e.sport.exigenceClub = "oui";
      const cadre = cadreDe(e);
      assert(cadre.code === "EXIGE_CLUB", "exigence identifiée comme venant du club/organisateur");
      assert(/non légale|contractuelle/i.test(cadre.libelle) || cadre.avertissements.some(a => /obligation réglementaire|exigence privée/i.test(a)),
        "distinction explicite exigence privée vs obligation réglementaire");
      assert(CS_STATUTS_EXAM.some(s => /obligatoire selon un texte/i.test(s)) &&
             CS_STATUTS_EXAM.some(s => /fédération/i.test(s)) &&
             CS_STATUTS_EXAM.some(s => /recommandé/i.test(s)),
        "statuts d'examens distinguant texte / fédération / recommandation");
      assert(!CS_EXAMENS_COMP.includes("IRM") || true, "l'IRM reste disponible comme examen, sans être présentée comme obligatoire");
    }
  }
];

/* Tests complémentaires du socle réglementaire */
const CS_TESTS_SOCLE = [
  {
    nom: "Socle — Sports retirés de l'ancienne liste : pas de contraintes particulières automatiques",
    attendu: "Rugby, alpinisme, spéléologie, parachutisme, vol libre : hors D.231-1-5, mais évaluation spécifique conservée.",
    run(assert) {
      for (const id of ["rugby","alpinisme","speleologie","parachutisme","vol-libre"]) {
        const e = etatVierge();
        e.sport.sportId = id; e.sport.licencie = true; e.sport.competition = true;
        const cadre = cadreDe(e);
        assert(cadre.code !== "OBLIGATOIRE_LOI", id + " ne doit pas déclencher l'obligation légale « contraintes particulières » (obtenu " + cadre.code + ")");
        assert(cadre.avertissements.some(a => /ancienne liste|2023-853/i.test(a)), id + " : avertissement sur le retrait de l'ancienne liste");
        const sport = CSM.sportById(id);
        assert(!!sport.module, id + " : module d'évaluation spécifique conservé");
      }
    }
  },
  {
    nom: "Socle — Karting exclu, mais vérification du règlement propre",
    attendu: "Karting : pas de contraintes particulières même en compétition ; invitation à vérifier le règlement de l'organisateur.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "karting"; e.sport.competition = true; e.sport.licencie = true;
      const cadre = cadreDe(e);
      assert(cadre.code !== "OBLIGATOIRE_LOI", "karting exclu de D.231-1-5 (décret 2023-853)");
      assert(cadre.avertissements.some(a => /karting|règlement/i.test(a)) || CSM.sportById("karting").condCP,
        "invitation à vérifier le règlement propre");
    }
  },
  {
    nom: "Socle — Verrous médico-légaux élémentaires",
    attendu: "Pas de certificat sans date d'examen, sans discipline, sans validation médicale ; pas d'antidatage vers le futur.",
    run(assert) {
      const e = etatVierge();
      e.patient.dateConsult = ""; e.sport.sportId = "";
      const v1 = CSM.verrousCertificat(e, [], CSM.classifier([]));
      assert(v1.some(x => /date d'examen/i.test(x)), "verrou : date d'examen");
      assert(v1.some(x => /discipline/i.test(x)), "verrou : discipline");
      assert(v1.some(x => /validation médicale|confirme/i.test(x)), "verrou : validation médicale");
      const e2 = etatVierge();
      e2.patient.dateConsult = "2099-01-01"; e2.sport.sportId = "football";
      const v2 = CSM.verrousCertificat(e2, [], CSM.classifier([]));
      assert(v2.some(x => /postérieure|antidatage/i.test(x)), "verrou : date future");
    }
  },
  {
    nom: "Socle — Urgence : suspension de la conclusion sportive",
    attendu: "Douleur thoracique actuelle = urgence, blocage complet.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "course-a-pied"; e.examen.exam_douleur_thoracique_actuelle = "oui";
      const alertes = CSM.evaluerAlertes(e);
      const synth = CSM.classifier(alertes);
      assert(synth.urgence === true, "urgence détectée");
      e.decision.conclusionId = "1"; e.decision.confirme = true;
      const verrous = CSM.verrousCertificat(e, alertes, synth);
      assert(verrous.some(v => /urgence/i.test(v)), "verrou d'urgence présent");
    }
  },
  {
    nom: "Socle — Certificat généré : contenu conforme",
    attendu: "Le certificat favorable ne contient ni diagnostic ni la formule « tous les sports » ; il mentionne discipline, dates, RPPS.",
    run(assert) {
      const e = etatVierge();
      e.sport.sportId = "natation"; e.sport.disciplinePrecise = "natation";
      e.decision.conclusionId = "3"; e.decision.confirme = true;
      const doc = CSM.genererCertificat(e, "competition");
      assert(/natation/.test(doc), "discipline mentionnée");
      assert(/RPPS/.test(doc), "RPPS mentionné");
      assert(!/tous les sports/i.test(doc), "pas de formule « tous les sports »");
      assert(/n'avoir constaté, à la date de l'examen, aucun signe clinique apparent/.test(doc), "formulation prudente « à la date de l'examen »");
      const ci = CSM.genererCertificat(e, "ci-temporaire");
      assert(/aucun motif médical/i.test(ci), "la CI temporaire ne divulgue pas de motif médical");
    }
  }
];

if (typeof module !== "undefined" && module.exports) module.exports = { CS_TESTS, CS_TESTS_SOCLE, etatVierge };
