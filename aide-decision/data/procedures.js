/* ============================================================================
 * PROCÉDURES & PRÉVENTION — aide-mémoire médecin (NON diagnostique).
 * Pour les motifs administratifs / préventifs / développementaux : check-lists,
 * points clés et signaux d'escalade. À adapter aux recommandations en vigueur
 * (HAS, calendrier vaccinal, Assurance Maladie) et au contexte local.
 *
 * Format : catégories -> items { id, titre, points:[...], alerte:[...]? }
 * ========================================================================== */
window.PROCEDURES = [
  {
    cat: "Certificats & aptitude", icone: "📜",
    items: [
      { id: "certificat_medical", titre: "Certificat médical",
        points: ["Ne certifier que des faits médicaux personnellement constatés", "Remis en main propre à l'intéressé (jamais à un tiers, sauf exceptions légales)", "Daté, signé, identité du médecin ; pas d'antidate", "Pas de mention diagnostique non nécessaire ; rester factuel"],
        alerte: ["Refuser tout certificat de complaisance ou tendancieux (responsabilité ordinale)"] },
      { id: "certificat_sport", titre: "Certificat de non contre-indication au sport",
        points: ["Interrogatoire (auto-questionnaire selon l'âge), antécédents familiaux de mort subite", "Examen cardiovasculaire (auscultation, TA, pouls), appareil locomoteur", "ECG de repos selon l'âge/le niveau et les recommandations", "Validité réglementaire variable (renouvellement par questionnaire possible)"],
        alerte: ["Douleur thoracique/syncope à l'effort, souffle, ATCD familial de mort subite → bilan cardio avant"] },
      { id: "aptitude", titre: "Certificat d'aptitude / inaptitude",
        points: ["Distinguer aptitude scolaire/sportive et avis (la médecine du travail relève du médecin du travail)", "Fonder l'avis sur l'examen et les exigences de l'activité", "Formuler en termes de capacités/limitations, sans divulguer le diagnostic"] },
      { id: "ci_voyage", titre: "Contre-indication / préparation au voyage",
        points: ["Vaccins selon destination (fièvre jaune, hépatites, typhoïde, rage…)", "Prophylaxie antipaludique adaptée à la zone", "Trousse, conseils (eau, alimentation, moustiques), assurance rapatriement", "Adapter selon terrain (grossesse, immunodépression, maladies chroniques)"] },
      { id: "pai", titre: "PAI (projet d'accueil individualisé) scolaire",
        points: ["Pour maladie chronique (asthme, allergie/anaphylaxie, diabète, épilepsie…)", "Protocole d'urgence + traitements à l'école (ex. stylo d'adrénaline, glucagon)", "Coordination médecin traitant – médecin scolaire – famille – établissement"] }
    ]
  },
  {
    cat: "Arrêt de travail & dossiers sociaux", icone: "🗂️",
    items: [
      { id: "arret_travail", titre: "Arrêt de travail",
        points: ["Durée adaptée à la pathologie et au poste (référentiels indicatifs Assurance Maladie)", "Téléservice / formulaire ; respecter les heures de sortie", "Réévaluer ; anticiper la reprise (temps partiel thérapeutique, visite de pré-reprise)"] },
      { id: "accident_travail", titre: "Accident du travail / maladie professionnelle",
        points: ["Certificat médical initial (CMI) décrivant les lésions, sans interprétation de l'imputabilité", "Remettre les volets au patient ; certificats de prolongation/final ensuite", "Distinguer AT (fait accidentel) et MP (tableaux)"] },
      { id: "ald", titre: "Reconnaissance ALD (affection de longue durée)",
        points: ["Protocole de soins (PIRES) précisant les soins en rapport avec l'ALD", "Exonération du ticket modérateur pour les soins liés", "Liste ALD30 + ALD hors liste / polypathologie selon critères"] },
      { id: "mdph", titre: "Dossier MDPH",
        points: ["Certificat médical MDPH détaillé (retentissement fonctionnel, autonomie)", "Décrire les limitations d'activité et besoins (AAH, PCH, RQTH, AEEH, orientation)", "Coordination avec les intervenants (kiné, ergo, écoles…)"] }
    ]
  },
  {
    cat: "Renouvellements & suivi", icone: "🔁",
    items: [
      { id: "renouvellement", titre: "Renouvellement d'ordonnance / traitement chronique",
        points: ["Vérifier tolérance, observance, effets indésirables, interactions", "Contrôles biologiques périodiques selon le traitement", "Déprescription / révision si polymédication, surtout chez le sujet âgé"],
        alerte: ["Tout effet indésirable grave ou signe d'alarme → réévaluation clinique"] },
      { id: "bilan_annuel", titre: "Bilan de santé / consultation annuelle",
        points: ["Mise à jour des dépistages selon l'âge et le sexe", "Facteurs de risque CV (TA, IMC, tabac, lipides, glycémie)", "Vaccinations à jour, mode de vie (activité, alcool, sommeil)"] },
      { id: "suivi_anticoagulant", titre: "Suivi d'un traitement anticoagulant",
        points: ["AVK : INR dans la cible selon l'indication ; carnet de suivi", "AOD : fonction rénale (DFG), pas d'INR ; vigilance interactions", "Éducation : signes de saignement, conduite en cas d'oubli, gestes/chirurgies"],
        alerte: ["Saignement actif, INR très élevé, traumatisme crânien sous anticoagulant → urgence"] },
      { id: "suivi_pa", titre: "Suivi de la personne âgée / autonomie",
        points: ["Évaluation gériatrique : cognition (MMSE), thymie, nutrition (MNA), marche/équilibre", "Autonomie (ADL/IADL), iatrogénie, sensoriel (vue, audition)", "Repérer la fragilité ; coordination médico-sociale"],
        alerte: ["Confusion récente, chutes répétées, dénutrition, syndrome de glissement → évaluation"] }
    ]
  },
  {
    cat: "Prévention & dépistage", icone: "🛡️",
    items: [
      { id: "vaccination", titre: "Vaccination",
        points: ["Mettre à jour selon le calendrier vaccinal en vigueur", "Rattrapages ; vaccins du voyageur et selon le terrain (immunodépression, grossesse)", "Tracer dans le carnet / dossier ; contre-indications et différés"] },
      { id: "depistage_hta", titre: "Dépistage de l'HTA",
        points: ["Mesure standardisée au repos ; confirmer (automesure / MAPA) avant diagnostic", "Évaluer le risque CV global et le retentissement", "Ne pas étiqueter sur une seule mesure"] },
      { id: "frottis_hpv", titre: "Dépistage du cancer du col (frottis / test HPV)",
        points: ["Selon l'organisation nationale : cytologie puis test HPV selon l'âge", "Suivre l'intervalle recommandé ; relancer les non-participantes", "Vaccination HPV en prévention primaire"] },
      { id: "conseil_nutritionnel", titre: "Conseil nutritionnel",
        points: ["Évaluer habitudes, IMC, tour de taille, activité physique", "Objectifs réalistes et progressifs ; éducation thérapeutique", "Orientation diététique si besoin (obésité, diabète, dénutrition)"] }
    ]
  },
  {
    cat: "Pédiatrie : développement & croissance", icone: "🧒",
    items: [
      { id: "suivi_croissance", titre: "Suivi de croissance / examens obligatoires",
        points: ["Reporter poids/taille/PC sur les courbes ; rechercher une cassure", "Examens de santé obligatoires aux âges clés (carnet de santé)", "Développement psychomoteur, vue, audition, vaccinations"],
        alerte: ["Cassure de la courbe, retard psychomoteur → bilan / avis spécialisé"] },
      { id: "retard_langage", titre: "Retard de langage",
        points: ["Vérifier l'audition en premier (otite séreuse, surdité)", "Repères du langage par âge ; contexte (bilinguisme, environnement)", "Orientation ORL / orthophonie / CAMSP selon l'évaluation"],
        alerte: ["Régression des acquis, absence de communication → avis spécialisé"] },
      { id: "troubles_comportement_enfant", titre: "Troubles du comportement / difficultés scolaires",
        points: ["Évaluer contexte familial, scolaire, sommeil, écrans", "Dépister TDAH, troubles « dys », troubles du spectre autistique, anxiété/dépression", "Coordination école – médecin scolaire – professionnels (psychologue, CMP)"],
        alerte: ["Idées suicidaires, mise en danger, signes de maltraitance → prise en charge urgente"] }
    ]
  },
  {
    cat: "Vigilance & signalement", icone: "⚠️",
    items: [
      { id: "maltraitance", titre: "Maltraitance suspectée (enfant, personne vulnérable)",
        points: ["Repérer : incohérence du récit, lésions d'âges différents, retard de recours, comportement", "Protéger l'enfant/la personne d'abord ; tracer factuellement", "Information préoccupante (CRIP) ou signalement (procureur) selon la gravité"],
        alerte: ["Danger immédiat → signalement sans délai (le secret médical ne s'oppose pas à la protection)"] },
      { id: "effet_indesirable", titre: "Effet indésirable médicamenteux (pharmacovigilance)",
        points: ["Évaluer l'imputabilité (chronologie, sémiologie) ; arrêter/adapter si besoin", "Déclarer à la pharmacovigilance (effets graves ou inattendus)", "Vigilance accrue : anticoagulants, psychotropes, AINS, antibiotiques"],
        alerte: ["Toxidermie grave, anaphylaxie, atteinte d'organe → urgence + déclaration"] }
    ]
  },
  {
    cat: "Petite chirurgie / dermatologie courante", icone: "🩹",
    items: [
      { id: "ongle_incarne", titre: "Ongle incarné",
        points: ["Soins locaux (bains, désinfection, méchage) aux stades débutants", "Antibiotiques rarement nécessaires (sauf cellulite associée)", "Avis chirurgical si récidive / granulome (résection partielle de matrice)"],
        alerte: ["Diabétique / artériopathe : risque de surinfection → vigilance, avis"] },
      { id: "verrue", titre: "Verrue",
        points: ["Souvent régression spontanée ; traitements kératolytiques / cryothérapie", "Information : contagiosité, récidives possibles", "Ne pas traiter agressivement chez l'immunodéprimé sans avis"] },
      { id: "kyste_cutane", titre: "Kyste cutané (kyste épidermoïde)",
        points: ["Abstention si asymptomatique ; exérèse à froid si gênant/récidivant", "Si inflammé/abcédé : incision-drainage, exérèse différée à distance"],
        alerte: ["Doute sur la nature de la lésion → avis / histologie"] },
      { id: "corps_etranger_orl", titre: "Corps étranger ORL (nez / oreille)",
        points: ["Nasal unilatéral fétide de l'enfant = corps étranger jusqu'à preuve du contraire", "Extraction prudente si accessible et matériel adapté, sinon avis ORL", "Pile bouton (nez/oreille) = urgence (lésion caustique)"],
        alerte: ["Corps étranger inhalé/laryngé, pile bouton, échec d'extraction → ORL urgent"] }
    ]
  }
];
