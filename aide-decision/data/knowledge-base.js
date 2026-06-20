/* ============================================================================
 * BASE DE CONNAISSANCES CLINIQUE — Aide au raisonnement (NE POSE PAS DE DIAGNOSTIC)
 * Source : « Manuel du Généraliste — Du Symptôme au Diagnostic » /
 *          « Fiches d'interrogatoire par symptôme » — Dr Mario Fuiano.
 *
 * Format documenté dans docs/modele-de-donnees.md.
 * Prédicats (champ `when` / `showIf` / `w.when`) évalués par engine.js :
 *   { q:"id", eq:val | in:[...] | gte:n | lte:n | truthy:true }
 *   { ctx:"age|sexe|grossessePossible|ageProcreer|antecedent", eq|in|gte|lte|has }
 *   { all:[...] }  (ET)   { any:[...] }  (OU)   { not: pred }
 * Niveaux d'urgence : 1 = non urgent · 2 = avis rapide · 3 = urgence.
 * ========================================================================== */
window.KB = {
  meta: {
    version: "0.1.0",
    source: "Manuel du Généraliste — Dr Mario Fuiano",
    avertissement:
      "Outil d'aide au raisonnement clinique. Ne pose pas de diagnostic. " +
      "Toute conclusion doit être validée par un médecin."
  },

  // -------------------------------------------------------------------------
  // 01 — ACOUPHÈNE
  // -------------------------------------------------------------------------
  acouphene: {
    id: "acouphene",
    symptome: "Acouphène (bruit dans l'oreille)",
    specialite: ["ORL", "Neurologie"],
    questions: [
      { id: "ac_cote", label: "Latéralité", type: "single_choice",
        question: "Le bruit est-il dans une seule oreille ou dans les deux ?",
        options: ["Une seule oreille", "Les deux oreilles", "Je ne sais pas"] },
      { id: "ac_pulsatile", label: "Caractère pulsatile", type: "boolean",
        question: "Le bruit bat-il au rythme de votre cœur (comme un pouls) ?" },
      { id: "ac_hypoacousie", label: "Baisse d'audition", type: "boolean",
        question: "Entendez-vous moins bien de l'oreille concernée ?" },
      { id: "ac_brusque", label: "Surdité brutale", type: "boolean",
        question: "Cette baisse d'audition est-elle apparue brutalement, en quelques heures ou jours ?",
        showIf: { q: "ac_hypoacousie", eq: true } },
      { id: "ac_vertige", label: "Vertiges rotatoires", type: "boolean",
        question: "Avez-vous des vertiges qui tournent ?" },
      { id: "ac_otalgie", label: "Otalgie / écoulement", type: "boolean",
        question: "Avez-vous mal à l'oreille ou un écoulement ?" },
      { id: "ac_trauma", label: "Traumatisme sonore", type: "boolean",
        question: "Avez-vous été exposé récemment à un bruit très fort (concert, explosion, tir) ?" },
      { id: "ac_ototox", label: "Médicaments ototoxiques", type: "boolean",
        question: "Prenez-vous certains médicaments : aspirine à forte dose, anti-inflammatoires, certains antibiotiques, ou une chimiothérapie ?" },
      { id: "ac_neuro", label: "Signes neurologiques", type: "boolean",
        question: "Avez-vous des signes neurologiques : trouble de l'équilibre marqué, vision double, faiblesse d'un côté, troubles de la parole ?" }
    ],
    red_flags: [
      { id: "ac_rf_pulsatile", niveau: 2,
        when: { all: [{ q: "ac_pulsatile", eq: true }, { q: "ac_cote", eq: "Une seule oreille" }] },
        message_medecin: "Acouphène pulsatile unilatéral : cause vasculaire ou tumorale à éliminer (auscultation cervicale, imagerie vasculaire, avis ORL).",
        message_patient: "La nature du bruit décrit nécessite un avis médical rapide pour vérification." },
      { id: "ac_rf_surdite_brusque", niveau: 3,
        when: { all: [{ q: "ac_hypoacousie", eq: true }, { q: "ac_brusque", eq: true }] },
        message_medecin: "Surdité brusque associée : urgence ORL (corticothérapie d'autant plus efficace qu'elle est précoce).",
        message_patient: "Une baisse d'audition brutale nécessite une évaluation médicale sans attendre." },
      { id: "ac_rf_neuro", niveau: 3,
        when: { q: "ac_neuro", eq: true },
        message_medecin: "Signes neurologiques centraux associés : avis neurologique urgent (éliminer une cause centrale).",
        message_patient: "Les signes neurologiques décrits nécessitent une évaluation médicale sans attendre." }
    ],
    diagnostics_differentiels: [
      { id: "ac_vasc", diagnostic: "Cause vasculaire (acouphène pulsatile)",
        arguments: [{ label: "synchrone du pouls", w: 3, when: { q: "ac_pulsatile", eq: true } },
                    { label: "unilatéral", w: 1, when: { q: "ac_cote", eq: "Une seule oreille" } }],
        examens_a_discuter: ["Auscultation cervicale (souffle)", "Imagerie vasculaire selon contexte", "Avis ORL"] },
      { id: "ac_neurinome", diagnostic: "Neurinome de l'acoustique (à éliminer)",
        arguments: [{ label: "unilatéral + hypoacousie de perception", w: 3, when: { all: [{ q: "ac_cote", eq: "Une seule oreille" }, { q: "ac_hypoacousie", eq: true }] } },
                    { label: "non pulsatile", w: 1, when: { q: "ac_pulsatile", eq: false } }],
        examens_a_discuter: ["Audiométrie tonale et vocale", "IRM des conduits auditifs internes"] },
      { id: "ac_meniere", diagnostic: "Maladie de Ménière",
        arguments: [{ label: "vertige rotatoire", w: 2, when: { q: "ac_vertige", eq: true } },
                    { label: "surdité fluctuante associée", w: 1, when: { q: "ac_hypoacousie", eq: true } }],
        examens_a_discuter: ["Audiométrie", "Avis ORL"] },
      { id: "ac_trauma_presby", diagnostic: "Traumatisme sonore / presbyacousie",
        arguments: [{ label: "exposition au bruit", w: 3, when: { q: "ac_trauma", eq: true } },
                    { label: "bilatéral", w: 1, when: { q: "ac_cote", eq: "Les deux oreilles" } }],
        examens_a_discuter: ["Audiométrie (scotome sur 4 kHz)"] },
      { id: "ac_ototox", diagnostic: "Cause ototoxique (iatrogène)",
        arguments: [{ label: "prise de médicaments ototoxiques", w: 2, when: { q: "ac_ototox", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance", "Audiométrie de référence"] }
    ],
    examens_clinique: [
      "Otoscopie (rechercher bouchon de cérumen, otite)",
      "Acoumétrie (Weber / Rinne)",
      "Auscultation des trajets carotidiens",
      "Tension artérielle",
      "Examen neurologique simple (équilibre, paires crâniennes)"
    ]
  },

  // -------------------------------------------------------------------------
  // 02 — ADÉNOPATHIE SUPERFICIELLE
  // -------------------------------------------------------------------------
  adenopathie: {
    id: "adenopathie",
    symptome: "Ganglion gonflé (adénopathie superficielle)",
    specialite: ["Hématologie", "Infectiologie", "ORL"],
    questions: [
      { id: "ad_loc", label: "Localisation", type: "single_choice",
        question: "Où se situe le ganglion gonflé ?",
        options: ["Cou", "Au-dessus de la clavicule", "Aisselle", "Aine", "Plusieurs endroits"] },
      { id: "ad_taille", label: "Taille", type: "single_choice",
        question: "Quelle est sa taille approximative ?",
        options: ["Moins de 1 cm", "1 à 2 cm", "Plus de 2 cm"] },
      { id: "ad_duree", label: "Évolution", type: "single_choice",
        question: "Depuis combien de temps est-il présent ?",
        options: ["Moins d'une semaine", "1 à 4 semaines", "Plus d'un mois"] },
      { id: "ad_douleur", label: "Douleur", type: "boolean",
        question: "Le ganglion est-il douloureux ?" },
      { id: "ad_fixe", label: "Dur et fixé", type: "boolean",
        question: "Est-il dur et fixé (il ne roule pas sous les doigts) ?" },
      { id: "ad_consist", label: "Consistance", type: "single_choice",
        question: "Quelle est sa consistance au toucher ?",
        options: ["Dur, pierreux", "Ferme et élastique (caoutchouc)", "Mou ou fluctuant", "Je ne sais pas"] },
      { id: "ad_fievre", label: "Fièvre", type: "boolean",
        question: "Avez-vous de la fièvre ?" },
      { id: "ad_sueurs", label: "Sueurs nocturnes", type: "boolean",
        question: "Avez-vous des sueurs la nuit, au point de tremper les draps ?" },
      { id: "ad_amaigr", label: "Amaigrissement", type: "boolean",
        question: "Avez-vous maigri sans le vouloir récemment ?" },
      { id: "ad_prurit", label: "Prurit", type: "boolean",
        question: "Avez-vous des démangeaisons de tout le corps ?" },
      { id: "ad_porte", label: "Porte d'entrée", type: "boolean",
        question: "Y a-t-il une plaie, un bouton ou une infection près du ganglion ?" },
      { id: "ad_chat", label: "Griffure de chat", type: "boolean",
        question: "Avez-vous été griffé ou mordu par un chat récemment ?" },
      { id: "ad_tabac", label: "Tabac / alcool", type: "boolean",
        question: "Fumez-vous ou consommez-vous de l'alcool régulièrement ?" }
    ],
    red_flags: [
      { id: "ad_rf_susclav", niveau: 2,
        when: { q: "ad_loc", eq: "Au-dessus de la clavicule" },
        message_medecin: "Adénopathie sus-claviculaire : localisation TOUJOURS suspecte (Troisier à gauche → néo digestif/pelvien ; à droite → médiastin/poumon). Évaluation rapide.",
        message_patient: "La localisation décrite nécessite un avis médical rapide." },
      { id: "ad_rf_dure_b", niveau: 2,
        when: { all: [{ q: "ad_fixe", eq: true }, { any: [{ q: "ad_sueurs", eq: true }, { q: "ad_amaigr", eq: true }] }] },
        message_medecin: "Adénopathie dure/fixée avec signes généraux (sueurs/amaigrissement) : suspicion de lymphome ou de métastase → biopsie ganglionnaire à discuter (pas la ponction seule).",
        message_patient: "L'association décrite nécessite un avis médical rapide pour des examens complémentaires." },
      { id: "ad_rf_persistante", niveau: 2,
        when: { all: [{ q: "ad_duree", eq: "Plus d'un mois" }, { q: "ad_taille", eq: "Plus de 2 cm" }] },
        message_medecin: "ADP > 2 cm persistant > 3-4 semaines sans cause : biopsie ganglionnaire à discuter.",
        message_patient: "Un ganglion volumineux et durable mérite un avis médical pour exploration." },
      { id: "ad_rf_dur_indolore", niveau: 2,
        when: { all: [{ q: "ad_consist", eq: "Dur, pierreux" }, { q: "ad_douleur", eq: false }] },
        message_medecin: "Adénopathie dure, pierreuse et indolore : profil carcinomateux (métastase ganglionnaire) → rechercher le primitif (ORL si cervical), biopsie-exérèse pour histologie.",
        message_patient: "Les caractéristiques décrites justifient un avis médical pour des examens complémentaires." }
    ],
    diagnostics_differentiels: [
      { id: "ad_reactionnelle", diagnostic: "Adénite réactionnelle (infectieuse)",
        arguments: [{ label: "chaude/douloureuse", w: 2, when: { q: "ad_douleur", eq: true } },
                    { label: "porte d'entrée dans le territoire", w: 2, when: { q: "ad_porte", eq: true } },
                    { label: "contage félin (maladie des griffes du chat)", w: 1, when: { q: "ad_chat", eq: true } },
                    { label: "évolution courte", w: 1, when: { q: "ad_duree", eq: "Moins d'une semaine" } }],
        examens_a_discuter: ["Traitement de la porte d'entrée", "Réévaluation à 2-4 semaines", "Sérologie bartonellose si contage chat"] },
      { id: "ad_neo_susclav", diagnostic: "Néoplasie viscérale/médiastinale (ADP sus-claviculaire)",
        arguments: [{ label: "siège sus-claviculaire", w: 3, when: { q: "ad_loc", eq: "Au-dessus de la clavicule" } }],
        examens_a_discuter: ["Imagerie thoraco-abdomino-pelvienne", "Endoscopies selon contexte", "Avis spécialisé"] },
      { id: "ad_lymphome", diagnostic: "Lymphome / hémopathie",
        arguments: [{ label: "polyadénopathie", w: 2, when: { q: "ad_loc", eq: "Plusieurs endroits" } },
                    { label: "signes B (sueurs)", w: 1, when: { q: "ad_sueurs", eq: true } },
                    { label: "signes B (amaigrissement)", w: 1, when: { q: "ad_amaigr", eq: true } },
                    { label: "prurit", w: 1, when: { q: "ad_prurit", eq: true } },
                    { label: "consistance ferme et élastique (caoutchouc)", w: 2, when: { q: "ad_consist", eq: "Ferme et élastique (caoutchouc)" } },
                    { label: "ganglion fixé", w: 1, when: { q: "ad_fixe", eq: true } }],
        examens_a_discuter: ["NFS-plaquettes, LDH", "Sérologies VIH/EBV/CMV/toxoplasmose", "Biopsie ganglionnaire (exérèse) — pas la cytoponction seule"] },
      { id: "ad_metastase", diagnostic: "Métastase ganglionnaire",
        arguments: [{ label: "ganglion dur et fixé", w: 3, when: { q: "ad_fixe", eq: true } },
                    { label: "consistance dure, pierreuse", w: 2, when: { q: "ad_consist", eq: "Dur, pierreux" } },
                    { label: "tabac/alcool (si cervical)", w: 1, when: { all: [{ q: "ad_tabac", eq: true }, { q: "ad_loc", eq: "Cou" }] } }],
        examens_a_discuter: ["Examen ORL complet (si cervical)", "Recherche du primitif", "Biopsie"] },
      { id: "ad_suppuree", diagnostic: "Adénite suppurée / abcès ganglionnaire",
        arguments: [{ label: "ganglion mou ou fluctuant", w: 3, when: { q: "ad_consist", eq: "Mou ou fluctuant" } },
                    { label: "douloureux", w: 1, when: { q: "ad_douleur", eq: true } },
                    { label: "fièvre", w: 1, when: { q: "ad_fievre", eq: true } },
                    { label: "porte d'entrée", w: 1, when: { q: "ad_porte", eq: true } }],
        examens_a_discuter: ["Échographie (collection)", "Drainage chirurgical + prélèvement bactériologique", "Antibiothérapie ciblée"] },
      { id: "ad_pseudo", diagnostic: "Tuméfaction non ganglionnaire (pseudo-adénopathie)",
        arguments: [{ label: "à évoquer si la nature ganglionnaire est incertaine (lipome, kyste, tumeur salivaire/parotide, kyste du tractus thyréoglosse, neurinome)", w: 1, when: { q: "ad_consist", eq: "Je ne sais pas" } }],
        examens_a_discuter: ["Échographie de la tuméfaction (confirme la nature ganglionnaire)", "Ne pas biopsier une masse vasculaire (anévrisme/glomus carotidien) sans imagerie préalable"] },
      { id: "ad_infectieux", diagnostic: "Causes infectieuses générales (MNI, toxo, VIH, BK)",
        arguments: [{ label: "fièvre", w: 2, when: { q: "ad_fievre", eq: true } }],
        examens_a_discuter: ["MNI-test / sérologies", "Sérologie VIH", "IDR / test IGRA si suspicion tuberculose"] }
    ],
    examens_clinique: [
      "Palpation de TOUTES les aires ganglionnaires (cervicales, axillaires, sus-épitrochléennes, inguinales)",
      "Caractérisation : taille, consistance, mobilité, sensibilité (consigner sur un schéma daté)",
      "Examen ORL si adénopathie cervicale ; examen cutané du territoire de drainage",
      "Palpation hépatique et splénique, recherche d'une hypertrophie amygdalienne",
      "Recherche de la porte d'entrée dans le territoire de drainage",
      "Échographie ganglionnaire si doute sur la nature ganglionnaire ou pour guider le prélèvement",
      "Cytoponction / microbiopsie en 1re approche ; biopsie-exérèse pour l'histologie si suspicion de lymphome ou ADP inexpliquée persistante"
    ]
  },

  // -------------------------------------------------------------------------
  // 03 — ALGIE FACIALE
  // -------------------------------------------------------------------------
  algie_faciale: {
    id: "algie_faciale",
    symptome: "Douleur de la face (algie faciale)",
    specialite: ["Neurologie", "ORL", "Ophtalmologie"],
    questions: [
      { id: "af_duree_acces", label: "Durée des accès", type: "single_choice",
        question: "Combien de temps dure chaque crise de douleur ?",
        options: ["Quelques secondes", "15 minutes à 3 heures", "Plusieurs heures"] },
      { id: "af_type", label: "Type de douleur", type: "single_choice",
        question: "Comment décririez-vous la douleur ?",
        options: ["Décharge électrique brève", "Douleur atroce autour de l'œil", "Douleur qui pulse (qui bat)", "Douleur en étau / pression"] },
      { id: "af_gachette", label: "Zone gâchette", type: "boolean",
        question: "La douleur est-elle déclenchée en touchant le visage, en mâchant ou en parlant ?" },
      { id: "af_dysauto", label: "Signes dysautonomiques", type: "boolean",
        question: "Pendant la crise, avez-vous d'un seul côté : œil rouge ou larmoyant, nez bouché ou qui coule, paupière tombante ?" },
      { id: "af_migraine", label: "Photo/phonophobie, nausées", type: "boolean",
        question: "La douleur s'accompagne-t-elle d'une gêne à la lumière ou au bruit, de nausées ?" },
      { id: "af_temporal", label: "Signes de Horton", type: "boolean",
        question: "Avez-vous mal au niveau de la tempe, avec une artère dure ou douloureuse, ou une douleur de la mâchoire en mangeant ?" },
      { id: "af_visuel", label: "Troubles visuels", type: "boolean",
        question: "Avez-vous des troubles de la vue (baisse de vision, vision double, voile) ?" },
      { id: "af_deficit", label: "Déficit neurologique", type: "boolean",
        question: "Avez-vous une faiblesse, un engourdissement du visage, ou d'autres signes neurologiques ?" },
      { id: "af_fievre", label: "Fièvre / AEG", type: "boolean",
        question: "Avez-vous de la fièvre ou une altération récente de l'état général ?" }
    ],
    red_flags: [
      { id: "af_rf_horton", niveau: 3,
        when: { all: [{ ctx: "age", gte: 50 }, { any: [{ q: "af_temporal", eq: true }, { q: "af_visuel", eq: true }] }] },
        message_medecin: "Suspicion de maladie de Horton (> 50 ans, signes temporaux/visuels) : risque de cécité → VS/CRP en urgence ; corticothérapie sans délai si forte suspicion (avant la BAT).",
        message_patient: "Certains éléments nécessitent une évaluation médicale sans attendre." },
      { id: "af_rf_deficit", niveau: 2,
        when: { q: "af_deficit", eq: true },
        message_medecin: "Algie faciale + déficit neurologique : forme symptomatique → imagerie (IRM).",
        message_patient: "Les signes neurologiques décrits nécessitent un avis médical rapide." },
      { id: "af_rf_fievre", niveau: 2,
        when: { q: "af_fievre", eq: true },
        message_medecin: "Algie faciale fébrile / AEG : éliminer une cause secondaire (sinusienne, infectieuse, inflammatoire).",
        message_patient: "La présence de fièvre nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "af_nevralgie", diagnostic: "Névralgie du trijumeau essentielle",
        arguments: [{ label: "décharges électriques", w: 3, when: { q: "af_type", eq: "Décharge électrique brève" } },
                    { label: "zone gâchette", w: 2, when: { q: "af_gachette", eq: true } },
                    { label: "accès de quelques secondes", w: 2, when: { q: "af_duree_acces", eq: "Quelques secondes" } }],
        examens_a_discuter: ["Examen neurologique (V) — normal si essentielle", "IRM si déficit ou présentation atypique"] },
      { id: "af_avf", diagnostic: "Algie vasculaire de la face",
        arguments: [{ label: "douleur périorbitaire atroce", w: 3, when: { q: "af_type", eq: "Douleur atroce autour de l'œil" } },
                    { label: "signes dysautonomiques homolatéraux", w: 3, when: { q: "af_dysauto", eq: true } },
                    { label: "accès de 15-180 min", w: 2, when: { q: "af_duree_acces", eq: "15 minutes à 3 heures" } }],
        examens_a_discuter: ["Avis neurologique", "Traitement de crise (oxygène, triptan)"] },
      { id: "af_migraine", diagnostic: "Migraine",
        arguments: [{ label: "photo/phonophobie, nausées", w: 3, when: { q: "af_migraine", eq: true } },
                    { label: "douleur pulsatile", w: 2, when: { q: "af_type", eq: "Douleur qui pulse (qui bat)" } },
                    { label: "accès de plusieurs heures", w: 1, when: { q: "af_duree_acces", eq: "Plusieurs heures" } }],
        examens_a_discuter: ["Agenda des crises", "Pas d'imagerie si examen normal et critères typiques"] },
      { id: "af_horton", diagnostic: "Maladie de Horton (artérite à cellules géantes)",
        arguments: [{ label: "âge > 50 ans", w: 2, when: { ctx: "age", gte: 50 } },
                    { label: "céphalée temporale / artère indurée", w: 3, when: { q: "af_temporal", eq: true } },
                    { label: "signes visuels", w: 2, when: { q: "af_visuel", eq: true } }],
        examens_a_discuter: ["VS / CRP en urgence", "Écho-doppler des temporales / biopsie", "Avis spécialisé"] }
    ],
    examens_clinique: [
      "Examen des paires crâniennes (territoire du V)",
      "Palpation des artères temporales (induration, pouls)",
      "Examen ophtalmologique / acuité visuelle",
      "Recherche de signes dysautonomiques pendant la crise",
      "Tension artérielle, palpation des sinus et de l'ATM"
    ]
  },

  // -------------------------------------------------------------------------
  // 04 — ALGIES PELVIENNES
  // -------------------------------------------------------------------------
  algie_pelvienne: {
    id: "algie_pelvienne",
    symptome: "Douleur du bas-ventre (algie pelvienne)",
    specialite: ["Gynécologie", "Digestif", "Urologie"],
    questions: [
      { id: "ap_cote", label: "Localisation", type: "single_choice",
        question: "La douleur est-elle d'un côté ou au milieu ?",
        options: ["Un côté", "Au milieu", "Les deux côtés"] },
      { id: "ap_debut", label: "Mode d'apparition", type: "single_choice",
        question: "Comment la douleur a-t-elle commencé ?",
        options: ["Brutalement", "Progressivement"] },
      { id: "ap_metrorragie", label: "Saignements anormaux", type: "boolean",
        question: "Avez-vous des saignements en dehors des règles ?",
        showIf: { ctx: "sexe", eq: "Femme" } },
      { id: "ap_leucorrhee", label: "Pertes anormales", type: "boolean",
        question: "Avez-vous des pertes vaginales anormales (couleur, odeur) ?",
        showIf: { ctx: "sexe", eq: "Femme" } },
      { id: "ap_cyclique", label: "Douleur cataméniale", type: "boolean",
        question: "La douleur survient-elle surtout au moment des règles ?",
        showIf: { ctx: "sexe", eq: "Femme" } },
      { id: "ap_dyspareunie", label: "Dyspareunie profonde", type: "boolean",
        question: "Avez-vous des douleurs profondes pendant les rapports ?",
        showIf: { ctx: "sexe", eq: "Femme" } },
      { id: "ap_fievre", label: "Fièvre", type: "boolean",
        question: "Avez-vous de la fièvre ?" },
      { id: "ap_vomit", label: "Vomissements", type: "boolean",
        question: "Avez-vous des vomissements ?" },
      { id: "ap_urinaire", label: "Signes urinaires", type: "boolean",
        question: "Avez-vous des brûlures en urinant ou des envies fréquentes ?" },
      { id: "ap_irradiation", label: "Irradiation type colique", type: "boolean",
        question: "La douleur descend-elle vers les organes génitaux ou le dos, par vagues, avec une agitation (impossible de rester en place) ?" },
      { id: "ap_defense", label: "Défense abdominale", type: "boolean",
        question: "Votre ventre est-il dur et très douloureux quand on appuie ?" }
    ],
    red_flags: [
      { id: "ap_rf_geu", niveau: 3,
        when: { all: [{ ctx: "grossessePossible", eq: true }, { q: "ap_metrorragie", eq: true }] },
        message_medecin: "Douleur pelvienne + métrorragies + grossesse possible : GROSSESSE EXTRA-UTÉRINE à éliminer en URGENCE → β-hCG + échographie sans délai.",
        message_patient: "Cette association nécessite une évaluation médicale urgente." },
      { id: "ap_rf_torsion", niveau: 3,
        when: { all: [{ q: "ap_debut", eq: "Brutalement" }, { q: "ap_cote", eq: "Un côté" }, { q: "ap_vomit", eq: true }] },
        message_medecin: "Douleur brutale unilatérale + vomissements : torsion d'annexe possible → avis gynéco-chirurgical urgent (échographie-doppler).",
        message_patient: "La douleur décrite nécessite une évaluation médicale urgente." },
      { id: "ap_rf_perito", niveau: 3,
        when: { all: [{ q: "ap_fievre", eq: true }, { q: "ap_defense", eq: true }] },
        message_medecin: "Douleur + fièvre + défense : urgence chirurgicale/infectieuse (pelvipéritonite, appendicite) → avis chirurgical.",
        message_patient: "Cette association nécessite une évaluation médicale urgente." },
      { id: "ap_rf_salpingite", niveau: 2,
        when: { all: [{ q: "ap_fievre", eq: true }, { q: "ap_leucorrhee", eq: true }] },
        message_medecin: "Douleur + fièvre + leucorrhées : salpingite (PID) probable → avis gynéco rapide, prélèvements, antibiothérapie.",
        message_patient: "Cette association nécessite un avis médical rapide." },
      { id: "ap_rf_bhcg", niveau: 2,
        when: { all: [{ ctx: "grossessePossible", eq: true }] },
        message_medecin: "Femme en âge de procréer avec algie pelvienne : β-hCG D'EMBLÉE (règle de sécurité — éliminer une GEU).",
        message_patient: "Un test de grossesse sera nécessaire dans le cadre du bilan." }
    ],
    diagnostics_differentiels: [
      { id: "ap_geu", diagnostic: "Grossesse extra-utérine (GEU)",
        arguments: [{ label: "grossesse possible", w: 3, when: { ctx: "grossessePossible", eq: true } },
                    { label: "métrorragies", w: 2, when: { q: "ap_metrorragie", eq: true } },
                    { label: "douleur unilatérale", w: 1, when: { q: "ap_cote", eq: "Un côté" } }],
        examens_a_discuter: ["β-hCG quantitatif", "Échographie pelvienne", "Avis gynécologique urgent"] },
      { id: "ap_salpingite", diagnostic: "Salpingite (infection génitale haute)",
        arguments: [{ label: "fièvre", w: 2, when: { q: "ap_fievre", eq: true } },
                    { label: "leucorrhées", w: 2, when: { q: "ap_leucorrhee", eq: true } },
                    { label: "douleur bilatérale", w: 1, when: { q: "ap_cote", eq: "Les deux côtés" } }],
        examens_a_discuter: ["Prélèvements vaginaux + IST", "β-hCG", "Échographie pelvienne", "Avis gynécologique"] },
      { id: "ap_torsion", diagnostic: "Torsion d'annexe / kyste compliqué",
        arguments: [{ label: "début brutal", w: 2, when: { q: "ap_debut", eq: "Brutalement" } },
                    { label: "unilatérale", w: 2, when: { q: "ap_cote", eq: "Un côté" } },
                    { label: "vomissements", w: 2, when: { q: "ap_vomit", eq: true } }],
        examens_a_discuter: ["Échographie pelvienne avec doppler", "Avis gynéco-chirurgical urgent"] },
      { id: "ap_endometriose", diagnostic: "Endométriose",
        arguments: [{ label: "douleur cataméniale", w: 3, when: { q: "ap_cyclique", eq: true } },
                    { label: "dyspareunie profonde", w: 2, when: { q: "ap_dyspareunie", eq: true } }],
        examens_a_discuter: ["Échographie / IRM pelvienne", "Avis gynécologique"] },
      { id: "ap_colique", diagnostic: "Colique néphrétique",
        arguments: [{ label: "irradiation OGE + agitation", w: 3, when: { q: "ap_irradiation", eq: true } },
                    { label: "unilatérale", w: 1, when: { q: "ap_cote", eq: "Un côté" } }],
        examens_a_discuter: ["Bandelette urinaire (hématurie)", "Échographie / uro-scanner", "Antalgiques (AINS)"] },
      { id: "ap_urinaire", diagnostic: "Infection urinaire (cystite / pyélonéphrite)",
        arguments: [{ label: "signes urinaires", w: 2, when: { q: "ap_urinaire", eq: true } },
                    { label: "fièvre (si haute)", w: 1, when: { q: "ap_fievre", eq: true } }],
        examens_a_discuter: ["Bandelette urinaire / ECBU"] }
    ],
    examens_clinique: [
      "Température, fréquence cardiaque, pression artérielle",
      "Palpation abdominale (défense, contracture)",
      "Examen gynécologique : douleur à la mobilisation utérine, masse latéro-utérine",
      "Bandelette urinaire",
      "β-hCG chez toute femme en âge de procréer"
    ]
  },

  // -------------------------------------------------------------------------
  // 06 — ASTHÉNIE
  // -------------------------------------------------------------------------
  asthenie: {
    id: "asthenie",
    symptome: "Fatigue (asthénie)",
    specialite: ["Médecine interne", "Endocrinologie", "Psychiatrie"],
    questions: [
      { id: "as_horaire", label: "Profil horaire", type: "single_choice",
        question: "Quand êtes-vous le plus fatigué ?",
        options: ["Le matin au réveil, ça s'améliore dans la journée", "Ça s'aggrave au fil de la journée", "Fatigué toute la journée"] },
      { id: "as_duree", label: "Durée", type: "single_choice",
        question: "Depuis combien de temps êtes-vous fatigué ?",
        options: ["Moins d'un mois", "Plus d'un mois"] },
      { id: "as_amaigr", label: "Amaigrissement", type: "boolean",
        question: "Avez-vous maigri sans le vouloir ?" },
      { id: "as_anorexie", label: "Perte d'appétit", type: "boolean",
        question: "Avez-vous perdu l'appétit ?" },
      { id: "as_fievre", label: "Fièvre / sueurs", type: "boolean",
        question: "Avez-vous de la fièvre ou des sueurs qui durent ?" },
      { id: "as_paleur", label: "Pâleur / dyspnée", type: "boolean",
        question: "Êtes-vous pâle et essoufflé à l'effort ?" },
      { id: "as_soif", label: "Syndrome polyuro-polydipsique", type: "boolean",
        question: "Avez-vous très soif et urinez-vous beaucoup ?" },
      { id: "as_froid", label: "Signes d'hypothyroïdie", type: "boolean",
        question: "Êtes-vous frileux, constipé, avec une peau sèche ou une prise de poids ?" },
      { id: "as_melano", label: "Signes surrénaliens", type: "boolean",
        question: "Avez-vous remarqué un bronzage anormal de la peau et des malaises en vous levant ?" },
      { id: "as_humeur", label: "Contexte thymique", type: "boolean",
        question: "Avez-vous perdu le plaisir et l'envie, avec tristesse ou anxiété et troubles du sommeil ?" },
      { id: "as_medic", label: "Iatrogénie", type: "boolean",
        question: "Avez-vous commencé un nouveau médicament récemment (cœur/tension, sommeil, allergies) ?" }
    ],
    red_flags: [
      { id: "as_rf_aeg", niveau: 2,
        when: { all: [{ q: "as_amaigr", eq: true }, { q: "as_anorexie", eq: true }] },
        message_medecin: "Altération de l'état général (asthénie + anorexie + amaigrissement) : bilan organique / néoplasique à ne pas retarder.",
        message_patient: "Cette association nécessite un avis médical pour réaliser un bilan." },
      { id: "as_rf_fievre", niveau: 2,
        when: { q: "as_fievre", eq: true },
        message_medecin: "Asthénie + fièvre/sueurs prolongées : éliminer infection chronique, tuberculose, hémopathie.",
        message_patient: "La présence de fièvre prolongée nécessite un avis médical." },
      { id: "as_rf_surrenale", niveau: 2,
        when: { q: "as_melano", eq: true },
        message_medecin: "Mélanodermie + hypotension/malaises orthostatiques : évoquer une insuffisance surrénale → ionogramme (hypoNa/hyperK), cortisol 8h.",
        message_patient: "Les signes décrits nécessitent un avis médical pour vérification." }
    ],
    diagnostics_differentiels: [
      { id: "as_organique", diagnostic: "Asthénie organique",
        arguments: [{ label: "s'aggrave au fil de la journée", w: 3, when: { q: "as_horaire", eq: "Ça s'aggrave au fil de la journée" } },
                    { label: "amaigrissement", w: 1, when: { q: "as_amaigr", eq: true } },
                    { label: "évolue depuis > 1 mois", w: 1, when: { q: "as_duree", eq: "Plus d'un mois" } }],
        examens_a_discuter: ["NFS, VS/CRP", "TSH", "Glycémie à jeun", "Ionogramme, calcémie", "Ferritine"] },
      { id: "as_anemie", diagnostic: "Anémie",
        arguments: [{ label: "pâleur + dyspnée d'effort", w: 3, when: { q: "as_paleur", eq: true } }],
        examens_a_discuter: ["NFS-plaquettes", "Ferritine, bilan martial"] },
      { id: "as_hypothyroidie", diagnostic: "Hypothyroïdie",
        arguments: [{ label: "frilosité, constipation, peau sèche", w: 3, when: { q: "as_froid", eq: true } }],
        examens_a_discuter: ["TSH (± T4L)"] },
      { id: "as_diabete", diagnostic: "Diabète",
        arguments: [{ label: "syndrome polyuro-polydipsique", w: 3, when: { q: "as_soif", eq: true } }],
        examens_a_discuter: ["Glycémie à jeun", "HbA1c"] },
      { id: "as_surrenale", diagnostic: "Insuffisance surrénale",
        arguments: [{ label: "mélanodermie + orthostatisme", w: 3, when: { q: "as_melano", eq: true } }],
        examens_a_discuter: ["Ionogramme (hypoNa/hyperK)", "Cortisol 8h ± test au Synacthène"] },
      { id: "as_psy", diagnostic: "Asthénie psychogène / dépression",
        arguments: [{ label: "maximale le matin, s'améliore", w: 3, when: { q: "as_horaire", eq: "Le matin au réveil, ça s'améliore dans la journée" } },
                    { label: "contexte anxiodépressif", w: 3, when: { q: "as_humeur", eq: true } }],
        examens_a_discuter: ["Évaluation thymique (anhédonie, sommeil)", "Bilan organique de débrouillage si doute"] },
      { id: "as_iatrogene", diagnostic: "Asthénie iatrogène / réactionnelle",
        arguments: [{ label: "médicament récent", w: 2, when: { q: "as_medic", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance (β-bloquants, hypnotiques, antihistaminiques)"] }
    ],
    examens_clinique: [
      "Poids, IMC, courbe de poids",
      "Température, pression artérielle couché/debout",
      "Recherche de pâleur (conjonctives)",
      "Palpation thyroïdienne et des aires ganglionnaires",
      "Examen général orienté par les réponses"
    ]
  },

  // -------------------------------------------------------------------------
  // 18 — DOULEURS THORACIQUES (URGENCE)
  // -------------------------------------------------------------------------
  douleur_thoracique: {
    id: "douleur_thoracique",
    symptome: "Douleur dans la poitrine",
    specialite: ["Cardiologie", "Pneumologie"],
    urgence: true,
    questions: [
      { id: "dt_type", label: "Type de douleur", type: "single_choice",
        question: "Comment décririez-vous la douleur ?",
        options: ["Serrement / étau dans la poitrine", "Pointe qui augmente en respirant", "Déchirure intense qui passe dans le dos", "Brûlure qui remonte derrière le sternum"] },
      { id: "dt_duree", label: "Durée", type: "single_choice",
        question: "Depuis combien de temps et comment évolue-t-elle ?",
        options: ["Plus de 20 minutes sans s'arrêter", "Quelques minutes, par crises", "Permanente depuis des heures ou des jours"] },
      { id: "dt_effort", label: "Liée à l'effort", type: "boolean",
        question: "Est-elle apparue ou aggravée par un effort ?" },
      { id: "dt_irrad", label: "Irradiation", type: "boolean",
        question: "Se propage-t-elle vers la mâchoire, le bras gauche ou le dos ?" },
      { id: "dt_brutal", label: "Début brutal", type: "boolean",
        question: "Est-elle apparue brutalement, d'un seul coup ?" },
      { id: "dt_dyspnee", label: "Essoufflement associé", type: "boolean",
        question: "Êtes-vous essoufflé en même temps ?" },
      { id: "dt_anteflexion", label: "Soulagée penché en avant", type: "boolean",
        question: "Est-elle soulagée lorsque vous vous penchez en avant ?" },
      { id: "dt_palpation", label: "Reproduite à la palpation", type: "boolean",
        question: "Pouvez-vous reproduire la douleur en appuyant sur la poitrine ou en bougeant le bras ?" },
      { id: "dt_thrombo", label: "Contexte thrombo-embolique", type: "boolean",
        question: "Avez-vous récemment été alité, opéré, plâtré, fait un long voyage, ou eu une phlébite ?" },
      { id: "dt_fdr", label: "Facteurs de risque CV", type: "boolean",
        question: "Avez-vous des facteurs de risque cardiovasculaire (tabac, diabète, cholestérol, hypertension, antécédent cardiaque) ?" }
    ],
    red_flags: [
      { id: "dt_rf_sca", niveau: 3,
        when: { all: [{ q: "dt_type", eq: "Serrement / étau dans la poitrine" }, { any: [{ q: "dt_effort", eq: true }, { q: "dt_duree", eq: "Plus de 20 minutes sans s'arrêter" }] }] },
        message_medecin: "Suspicion de SCA (douleur constrictive d'effort/prolongée) : ECG + troponine en urgence, appeler le 15.",
        message_patient: "Cette douleur nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "dt_rf_dissection", niveau: 3,
        when: { q: "dt_type", eq: "Déchirure intense qui passe dans le dos" },
        message_medecin: "Douleur transfixiante migratrice : dissection aortique à éliminer (asymétrie tensionnelle, angioscanner urgent).",
        message_patient: "Cette douleur nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "dt_rf_ep_pno", niveau: 3,
        when: { all: [{ q: "dt_brutal", eq: true }, { q: "dt_dyspnee", eq: true }] },
        message_medecin: "Douleur brutale + dyspnée : embolie pulmonaire ou pneumothorax à éliminer en urgence.",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "dt_sca", diagnostic: "Syndrome coronarien aigu (SCA)",
        arguments: [{ label: "douleur en étau", w: 3, when: { q: "dt_type", eq: "Serrement / étau dans la poitrine" } },
                    { label: "déclenchée à l'effort", w: 2, when: { q: "dt_effort", eq: true } },
                    { label: "> 20 min", w: 2, when: { q: "dt_duree", eq: "Plus de 20 minutes sans s'arrêter" } },
                    { label: "irradiation mâchoire/bras", w: 2, when: { q: "dt_irrad", eq: true } },
                    { label: "facteurs de risque CV", w: 1, when: { q: "dt_fdr", eq: true } }],
        examens_a_discuter: ["ECG immédiat", "Troponine", "Appel SAMU / avis cardiologique"] },
      { id: "dt_ep", diagnostic: "Embolie pulmonaire",
        arguments: [{ label: "début brutal", w: 2, when: { q: "dt_brutal", eq: true } },
                    { label: "dyspnée", w: 2, when: { q: "dt_dyspnee", eq: true } },
                    { label: "douleur pleurale", w: 1, when: { q: "dt_type", eq: "Pointe qui augmente en respirant" } },
                    { label: "contexte thrombo-embolique", w: 2, when: { q: "dt_thrombo", eq: true } }],
        examens_a_discuter: ["Score de probabilité clinique", "D-dimères / angio-TDM thoracique"] },
      { id: "dt_dissection", diagnostic: "Dissection aortique",
        arguments: [{ label: "douleur transfixiante dorsale", w: 3, when: { q: "dt_type", eq: "Déchirure intense qui passe dans le dos" } },
                    { label: "début brutal", w: 1, when: { q: "dt_brutal", eq: true } }],
        examens_a_discuter: ["TA aux deux bras (asymétrie)", "Angioscanner aortique en urgence"] },
      { id: "dt_pericardite", diagnostic: "Péricardite",
        arguments: [{ label: "soulagée en antéflexion", w: 3, when: { q: "dt_anteflexion", eq: true } },
                    { label: "douleur respiro-dépendante", w: 1, when: { q: "dt_type", eq: "Pointe qui augmente en respirant" } }],
        examens_a_discuter: ["ECG (sus-décalage diffus concave)", "Auscultation (frottement péricardique)"] },
      { id: "dt_parietal", diagnostic: "Cause pariétale / œsophagienne (élimination)",
        arguments: [{ label: "reproduite à la palpation", w: 3, when: { q: "dt_palpation", eq: true } },
                    { label: "brûlure type RGO", w: 2, when: { q: "dt_type", eq: "Brûlure qui remonte derrière le sternum" } }],
        examens_a_discuter: ["Diagnostic d'élimination APRÈS avoir écarté les 5 urgences"] }
    ],
    examens_clinique: [
      "ECG 12 dérivations immédiat",
      "Pression artérielle aux DEUX bras",
      "Auscultation cardiaque et pulmonaire",
      "SpO2, fréquence cardiaque et respiratoire",
      "Palpation pariétale, recherche de signes de TVP aux membres inférieurs"
    ]
  },

  // -------------------------------------------------------------------------
  // 21 — DYSPNÉE AIGUË (URGENCE)
  // -------------------------------------------------------------------------
  dyspnee_aigue: {
    id: "dyspnee_aigue",
    symptome: "Essoufflement soudain (dyspnée aiguë)",
    specialite: ["Pneumologie", "Cardiologie"],
    urgence: true,
    questions: [
      { id: "dy_vitesse", label: "Vitesse d'installation", type: "single_choice",
        question: "En combien de temps l'essoufflement est-il apparu ?",
        options: ["En quelques minutes", "En quelques heures", "En quelques jours"] },
      { id: "dy_gravite", label: "Signes de gravité", type: "boolean",
        question: "Avez-vous les lèvres ou extrémités bleues, des sueurs, du mal à finir vos phrases, ou somnolez-vous ?" },
      { id: "dy_orthopnee", label: "Orthopnée", type: "boolean",
        question: "Êtes-vous plus gêné allongé, obligé de vous redresser pour respirer ?" },
      { id: "dy_bruit", label: "Bruit respiratoire", type: "single_choice",
        question: "Entendez-vous un bruit quand vous respirez ?",
        options: ["Sifflement (comme l'asthme)", "Bruit aigu en inspirant (gorge)", "Aucun bruit particulier"] },
      { id: "dy_douleur", label: "Douleur thoracique", type: "boolean",
        question: "Avez-vous une douleur dans la poitrine ?" },
      { id: "dy_fievre", label: "Fièvre / expectoration", type: "boolean",
        question: "Avez-vous de la fièvre et/ou crachez-vous ?" },
      { id: "dy_allergie", label: "Contexte allergique / fausse route", type: "boolean",
        question: "Y a-t-il un contexte d'allergie, de piqûre, un gonflement du visage/de la gorge, ou une fausse route ?" },
      { id: "dy_terrain", label: "Terrain cardio-respiratoire", type: "boolean",
        question: "Avez-vous une maladie du cœur, de l'asthme ou une BPCO connue ?" }
    ],
    red_flags: [
      { id: "dy_rf_gravite", niveau: 3,
        when: { any: [{ q: "dy_gravite", eq: true }, { q: "dy_vitesse", eq: "En quelques minutes" }] },
        message_medecin: "Détresse respiratoire / installation suraiguë : urgence vitale (SpO2, oxygène, 15). Les signes de gravité priment sur le diagnostic.",
        message_patient: "Cet essoufflement nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "dy_rf_anaphylaxie", niveau: 3,
        when: { q: "dy_allergie", eq: true },
        message_medecin: "Angio-œdème / anaphylaxie ou corps étranger : urgence (adrénaline IM si anaphylaxie, manœuvres si obstruction).",
        message_patient: "Ce contexte nécessite une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "dy_oap", diagnostic: "OAP cardiogénique",
        arguments: [{ label: "orthopnée", w: 3, when: { q: "dy_orthopnee", eq: true } },
                    { label: "terrain cardiaque", w: 1, when: { q: "dy_terrain", eq: true } }],
        examens_a_discuter: ["Auscultation (crépitants bilatéraux)", "ECG, BNP", "Radiographie thoracique"] },
      { id: "dy_ep", diagnostic: "Embolie pulmonaire",
        arguments: [{ label: "installation en minutes", w: 2, when: { q: "dy_vitesse", eq: "En quelques minutes" } },
                    { label: "douleur thoracique", w: 2, when: { q: "dy_douleur", eq: true } }],
        examens_a_discuter: ["Score clinique", "D-dimères / angio-TDM"] },
      { id: "dy_asthme", diagnostic: "Crise d'asthme / BPCO",
        arguments: [{ label: "sibilants", w: 3, when: { q: "dy_bruit", eq: "Sifflement (comme l'asthme)" } },
                    { label: "terrain asthme/BPCO", w: 1, when: { q: "dy_terrain", eq: true } }],
        examens_a_discuter: ["Débit expiratoire de pointe", "Auscultation", "Aérosols bronchodilatateurs"] },
      { id: "dy_pno", diagnostic: "Pneumothorax",
        arguments: [{ label: "installation en minutes", w: 2, when: { q: "dy_vitesse", eq: "En quelques minutes" } },
                    { label: "douleur thoracique", w: 2, when: { q: "dy_douleur", eq: true } }],
        examens_a_discuter: ["Auscultation (abolition unilatérale)", "Radiographie / échographie thoracique"] },
      { id: "dy_pneumopathie", diagnostic: "Pneumopathie",
        arguments: [{ label: "fièvre + expectoration", w: 3, when: { q: "dy_fievre", eq: true } }],
        examens_a_discuter: ["Auscultation (foyer)", "Radiographie thoracique, CRP"] },
      { id: "dy_obstacle", diagnostic: "Obstacle laryngé / anaphylaxie",
        arguments: [{ label: "stridor inspiratoire", w: 2, when: { q: "dy_bruit", eq: "Bruit aigu en inspirant (gorge)" } },
                    { label: "contexte allergique", w: 2, when: { q: "dy_allergie", eq: true } }],
        examens_a_discuter: ["Urgence : avis ORL / réanimation", "Adrénaline si anaphylaxie"] }
    ],
    examens_clinique: [
      "SpO2, fréquence respiratoire, signes de lutte",
      "Auscultation pulmonaire (crépitants, sibilants, abolition)",
      "Auscultation cardiaque, TA, fréquence cardiaque",
      "Recherche de cyanose, marbrures",
      "Recherche de signes de TVP aux membres inférieurs"
    ]
  },

  // -------------------------------------------------------------------------
  // 23 — DÉFICIT NEUROLOGIQUE TRANSITOIRE (URGENCE)
  // -------------------------------------------------------------------------
  deficit_neuro: {
    id: "deficit_neuro",
    symptome: "Trouble neurologique passager (déficit transitoire)",
    specialite: ["Neurologie"],
    urgence: true,
    questions: [
      { id: "dn_install", label: "Mode d'installation", type: "single_choice",
        question: "Comment les troubles sont-ils apparus ?",
        options: ["D'un coup, maximum d'emblée", "Progressivement en quelques minutes, en s'étendant"] },
      { id: "dn_type", label: "Type de symptômes", type: "single_choice",
        question: "De quel type de trouble s'agissait-il ?",
        options: ["Perte de force, de la parole ou de la vue (signes « en moins »)", "Picotements qui montent, taches lumineuses (signes « en plus »)"] },
      { id: "dn_territoire", label: "Territoire", type: "single_choice",
        question: "Quels signes principalement ?",
        options: ["Faiblesse d'un côté, parole difficile, perte de vue d'un œil", "Vision double, vertige, perte d'équilibre, parole pâteuse", "Autre / je ne sais pas"] },
      { id: "dn_duree", label: "Régression < 1 h", type: "boolean",
        question: "Tout est-il rentré dans l'ordre en moins d'une heure ?" },
      { id: "dn_diabete", label: "Diabète traité", type: "boolean",
        question: "Êtes-vous diabétique sous traitement (insuline ou comprimés) ?" },
      { id: "dn_sueurs", label: "Signes d'hypoglycémie", type: "boolean",
        question: "Aviez-vous des sueurs, tremblements, une faim, soulagés en mangeant ou en vous resucrant ?" },
      { id: "dn_cephalee", label: "Aura migraineuse", type: "boolean",
        question: "Avez-vous une migraine connue avec une aura visuelle scintillante ?" },
      { id: "dn_epilepsie", label: "Signes post-critiques", type: "boolean",
        question: "Y a-t-il eu morsure de la langue, perte d'urine, ou confusion après l'épisode ?" },
      { id: "dn_fdr", label: "Risque vasculaire / ACFA", type: "boolean",
        question: "Avez-vous des facteurs de risque vasculaire ou une arythmie cardiaque (ACFA) ?" }
    ],
    red_flags: [
      { id: "dn_rf_ait", niveau: 3,
        when: { all: [{ q: "dn_type", eq: "Perte de force, de la parole ou de la vue (signes « en moins »)" }, { q: "dn_install", eq: "D'un coup, maximum d'emblée" }] },
        message_medecin: "Déficit focal brutal régressif = AIT : URGENCE (risque d'AVC à court terme). Glycémie capillaire d'abord, puis bilan neurovasculaire immédiat (15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "dn_rf_hypo", niveau: 2,
        when: { all: [{ q: "dn_diabete", eq: true }, { q: "dn_sueurs", eq: true }] },
        message_medecin: "Hypoglycémie possible (mime tout déficit) : à éliminer EN PREMIER (glycémie capillaire, resucrage).",
        message_patient: "Vérifiez votre glycémie et resucrez-vous ; un avis médical est nécessaire." }
    ],
    diagnostics_differentiels: [
      { id: "dn_ait", diagnostic: "Accident ischémique transitoire (AIT)",
        arguments: [{ label: "début brutal d'emblée maximal", w: 3, when: { q: "dn_install", eq: "D'un coup, maximum d'emblée" } },
                    { label: "déficit « en moins »", w: 2, when: { q: "dn_type", eq: "Perte de force, de la parole ou de la vue (signes « en moins »)" } },
                    { label: "régression < 1 h", w: 1, when: { q: "dn_duree", eq: true } },
                    { label: "facteurs de risque / ACFA", w: 1, when: { q: "dn_fdr", eq: true } }],
        examens_a_discuter: ["Glycémie capillaire", "Imagerie cérébrale + vaisseaux en urgence", "ECG (ACFA), avis neurovasculaire (score ABCD2)"] },
      { id: "dn_aura", diagnostic: "Aura migraineuse",
        arguments: [{ label: "marche progressive", w: 3, when: { q: "dn_install", eq: "Progressivement en quelques minutes, en s'étendant" } },
                    { label: "symptômes « en plus »", w: 2, when: { q: "dn_type", eq: "Picotements qui montent, taches lumineuses (signes « en plus »)" } },
                    { label: "migraine connue", w: 2, when: { q: "dn_cephalee", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique si typique", "Imagerie si atypie / premier épisode"] },
      { id: "dn_epilepsie", diagnostic: "Crise épileptique focale",
        arguments: [{ label: "symptômes « positifs »", w: 2, when: { q: "dn_type", eq: "Picotements qui montent, taches lumineuses (signes « en plus »)" } },
                    { label: "phase post-critique", w: 3, when: { q: "dn_epilepsie", eq: true } }],
        examens_a_discuter: ["Avis neurologique", "EEG, imagerie cérébrale"] },
      { id: "dn_hypoglycemie", diagnostic: "Hypoglycémie",
        arguments: [{ label: "diabète traité", w: 2, when: { q: "dn_diabete", eq: true } },
                    { label: "signes neurovégétatifs résolutifs au resucrage", w: 3, when: { q: "dn_sueurs", eq: true } }],
        examens_a_discuter: ["Glycémie capillaire", "Resucrage", "Revue du traitement"] }
    ],
    examens_clinique: [
      "Glycémie capillaire SYSTÉMATIQUE (en premier)",
      "Examen neurologique complet (score ABCD2)",
      "Auscultation cardiaque et des carotides",
      "Pression artérielle, ECG (rechercher une ACFA)",
      "Recherche de morsure de langue / signes post-critiques"
    ]
  },

  // -------------------------------------------------------------------------
  // 27 — FIÈVRE AU RETOUR DES TROPIQUES (URGENCE)
  // -------------------------------------------------------------------------
  fievre_tropiques: {
    id: "fievre_tropiques",
    symptome: "Fièvre au retour d'un pays tropical",
    specialite: ["Infectiologie"],
    urgence: true,
    questions: [
      { id: "ft_delai", label: "Délai retour-fièvre", type: "single_choice",
        question: "Combien de temps après le retour la fièvre est-elle apparue ?",
        options: ["Moins de 3 mois", "Plus de 3 mois"] },
      { id: "ft_prophylaxie", label: "Prophylaxie antipaludique", type: "boolean",
        question: "Aviez-vous pris un traitement préventif du paludisme, bien suivi ?" },
      { id: "ft_eruption", label: "Éruption + myalgies", type: "boolean",
        question: "Avez-vous une éruption sur la peau et des douleurs musculaires ?" },
      { id: "ft_digestif", label: "Signes digestifs", type: "boolean",
        question: "Avez-vous des troubles digestifs (diarrhée) ou des douleurs au ventre ?" },
      { id: "ft_ictere", label: "Ictère / urines foncées", type: "boolean",
        question: "Avez-vous les yeux ou la peau jaunes, ou des urines très foncées ?" },
      { id: "ft_gravite", label: "Signes de gravité", type: "boolean",
        question: "Avez-vous : confusion, taches violacées (purpura), urines rares, ou difficulté à respirer ?" }
    ],
    red_flags: [
      { id: "ft_rf_palu", niveau: 3,
        when: { always: true },
        message_medecin: "RÈGLE ABSOLUE : toute fièvre au retour des tropiques = ÉLIMINER UN PALUDISME en urgence (frottis-goutte épaisse / test antigénique). Le P. falciparum peut tuer en quelques jours.",
        message_patient: "Une fièvre au retour d'un pays tropical doit être évaluée par un médecin sans tarder." },
      { id: "ft_rf_gravite", niveau: 3,
        when: { q: "ft_gravite", eq: true },
        message_medecin: "Signes de gravité (neuropaludisme, sepsis, purpura fébrile, défaillance d'organe) : urgence vitale ; isolement si fièvre hémorragique virale suspectée.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "ft_palu", diagnostic: "Paludisme (à éliminer EN PREMIER)",
        arguments: [{ label: "retour récent de zone d'endémie", w: 3, when: { q: "ft_delai", eq: "Moins de 3 mois" } },
                    { label: "absence de prophylaxie efficace", w: 1, when: { q: "ft_prophylaxie", eq: false } }],
        examens_a_discuter: ["Frottis sanguin + goutte épaisse EN URGENCE", "Test de diagnostic rapide antigénique"] },
      { id: "ft_arbovirose", diagnostic: "Arbovirose (dengue, chikungunya, Zika)",
        arguments: [{ label: "fièvre + myalgies + éruption", w: 3, when: { q: "ft_eruption", eq: true } }],
        examens_a_discuter: ["NFS (thrombopénie)", "Sérologies / PCR ciblées"] },
      { id: "ft_typhoide", diagnostic: "Fièvre typhoïde",
        arguments: [{ label: "fièvre + troubles digestifs", w: 2, when: { q: "ft_digestif", eq: true } }],
        examens_a_discuter: ["Hémocultures", "Coproculture"] },
      { id: "ft_hepatite", diagnostic: "Hépatite virale / leptospirose / amibiase / primo-VIH",
        arguments: [{ label: "ictère / urines foncées", w: 2, when: { q: "ft_ictere", eq: true } }],
        examens_a_discuter: ["Bilan hépatique", "Sérologies selon expositions"] }
    ],
    examens_clinique: [
      "Température, recherche de purpura, état de conscience",
      "Palpation splénique (splénomégalie)",
      "État d'hydratation, diurèse",
      "SpO2, pression artérielle, fréquence cardiaque (sepsis)",
      "Recherche d'une porte d'entrée / escarre d'inoculation"
    ]
  },

  // -------------------------------------------------------------------------
  // 31 — GROSSE BOURSE (URGENCE)
  // -------------------------------------------------------------------------
  grosse_bourse: {
    id: "grosse_bourse",
    symptome: "Grosse bourse / douleur testiculaire",
    specialite: ["Urologie"],
    urgence: true,
    questions: [
      { id: "gb_debut", label: "Mode d'apparition", type: "single_choice",
        question: "Comment cela a-t-il commencé ?",
        options: ["Brutalement, d'un seul coup", "Progressivement"] },
      { id: "gb_fievre", label: "Fièvre", type: "boolean",
        question: "Avez-vous de la fièvre ?" },
      { id: "gb_urinaire", label: "Signes urinaires / IST", type: "boolean",
        question: "Avez-vous des brûlures urinaires ou un écoulement ?" },
      { id: "gb_masse", label: "Masse palpable", type: "boolean",
        question: "Sentez-vous une boule ou une masse dure dans la bourse ?" },
      { id: "gb_indolore", label: "Masse indolore", type: "boolean",
        question: "Cette masse est-elle indolore ?",
        showIf: { q: "gb_masse", eq: true } },
      { id: "gb_transillum", label: "Aspect liquidien", type: "boolean",
        question: "La bourse est-elle augmentée de volume, molle et indolore (comme une poche de liquide) ?" },
      { id: "gb_sepsis", label: "Signes de Fournier", type: "boolean",
        question: "Avez-vous une douleur/rougeur du périnée avec fièvre importante ou une sensation de crépitements sous la peau ?" }
    ],
    red_flags: [
      { id: "gb_rf_torsion", niveau: 3,
        when: { q: "gb_debut", eq: "Brutalement, d'un seul coup" },
        message_medecin: "Douleur scrotale brutale = torsion du cordon jusqu'à preuve du contraire : URGENCE chirurgicale (< 6 h). Ne pas attendre l'imagerie en cas de doute.",
        message_patient: "Une douleur testiculaire brutale nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "gb_rf_tumeur", niveau: 2,
        when: { all: [{ q: "gb_masse", eq: true }, { q: "gb_indolore", eq: true }] },
        message_medecin: "Masse intratesticulaire dure indolore = tumeur jusqu'à preuve du contraire (échographie + marqueurs).",
        message_patient: "Cette masse nécessite un avis médical rapide pour des examens." },
      { id: "gb_rf_fournier", niveau: 3,
        when: { q: "gb_sepsis", eq: true },
        message_medecin: "Gangrène de Fournier (sepsis + crépitants périnéaux) : urgence chirurgicale.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "gb_torsion", diagnostic: "Torsion du cordon spermatique",
        arguments: [{ label: "douleur brutale", w: 3, when: { q: "gb_debut", eq: "Brutalement, d'un seul coup" } },
                    { label: "sujet jeune", w: 2, when: { ctx: "age", lte: 30 } }],
        examens_a_discuter: ["Exploration chirurgicale urgente (< 6 h)", "Réflexe crémastérien aboli, testicule ascensionné"] },
      { id: "gb_orchiepididymite", diagnostic: "Orchi-épididymite",
        arguments: [{ label: "fièvre", w: 2, when: { q: "gb_fievre", eq: true } },
                    { label: "signes urinaires / IST", w: 2, when: { q: "gb_urinaire", eq: true } },
                    { label: "début progressif", w: 1, when: { q: "gb_debut", eq: "Progressivement" } }],
        examens_a_discuter: ["ECBU / prélèvement IST", "Échographie-doppler", "Antibiothérapie"] },
      { id: "gb_tumeur", diagnostic: "Tumeur du testicule",
        arguments: [{ label: "masse dure", w: 2, when: { q: "gb_masse", eq: true } },
                    { label: "indolore", w: 2, when: { q: "gb_indolore", eq: true } }],
        examens_a_discuter: ["Échographie scrotale", "Marqueurs (AFP, β-hCG, LDH)"] },
      { id: "gb_hydrocele", diagnostic: "Hydrocèle",
        arguments: [{ label: "masse transilluminable", w: 3, when: { q: "gb_transillum", eq: true } }],
        examens_a_discuter: ["Échographie scrotale"] }
    ],
    examens_clinique: [
      "Palpation comparative des deux bourses",
      "Recherche du réflexe crémastérien",
      "Signe de Prehn (soulagement à la surélévation)",
      "Transillumination",
      "Recherche de sepsis / atteinte périnéale (Fournier)"
    ]
  },

  // -------------------------------------------------------------------------
  // 32 — GROSSE JAMBE ROUGE AIGUË (URGENCE)
  // -------------------------------------------------------------------------
  grosse_jambe_rouge: {
    id: "grosse_jambe_rouge",
    symptome: "Grosse jambe rouge aiguë",
    specialite: ["Infectiologie", "Vasculaire"],
    urgence: true,
    questions: [
      { id: "gj_cote", label: "Côté", type: "single_choice",
        question: "Une seule jambe ou les deux ?",
        options: ["Une seule", "Les deux"] },
      { id: "gj_fievre", label: "Fièvre", type: "boolean",
        question: "Avez-vous de la fièvre ?" },
      { id: "gj_porte", label: "Porte d'entrée", type: "boolean",
        question: "Y a-t-il une plaie, une fissure entre les orteils, ou un ulcère ?" },
      { id: "gj_dlrdispro", label: "Douleur disproportionnée", type: "boolean",
        question: "La douleur est-elle beaucoup plus intense que ce que montre l'aspect de la peau ?" },
      { id: "gj_necrose", label: "Bulles / nécrose / crépitation", type: "boolean",
        question: "Y a-t-il des cloques (bulles), des zones noires ou violacées, ou des crépitements sous la peau ?" },
      { id: "gj_sepsis", label: "Signes généraux de sepsis", type: "boolean",
        question: "Avez-vous des frissons, un malaise, une confusion, ou le cœur qui bat très vite ?" },
      { id: "gj_mollet", label: "Tableau de TVP", type: "boolean",
        question: "Avez-vous surtout un gonflement et une douleur du mollet, sans grand placard rouge ?" },
      { id: "gj_prurit", label: "Dermite de stase", type: "boolean",
        question: "Est-ce surtout des démangeaisons, sur les deux jambes, sans fièvre ?" },
      { id: "gj_terrain", label: "Terrain à risque", type: "boolean",
        question: "Êtes-vous diabétique, immunodéprimé, ou avez-vous une mauvaise circulation des jambes ?" }
    ],
    red_flags: [
      { id: "gj_rf_fasciite", niveau: 3,
        when: { any: [{ q: "gj_dlrdispro", eq: true }, { q: "gj_necrose", eq: true }, { q: "gj_sepsis", eq: true }] },
        message_medecin: "Signes de fasciite nécrosante (douleur disproportionnée, bulles/nécrose/crépitation, sepsis) : URGENCE chirurgicale, ne pas temporiser.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "gj_rf_tvp", niveau: 2,
        when: { all: [{ q: "gj_mollet", eq: true }, { not: { q: "gj_fievre", eq: true } }] },
        message_medecin: "Tableau évocateur de TVP (œdème/douleur du mollet sans placard fébrile) : écho-doppler veineux (risque d'embolie pulmonaire).",
        message_patient: "Ce tableau nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "gj_erysipele", diagnostic: "Érysipèle / dermohypodermite bactérienne",
        arguments: [{ label: "unilatéral", w: 1, when: { q: "gj_cote", eq: "Une seule" } },
                    { label: "fièvre", w: 2, when: { q: "gj_fievre", eq: true } },
                    { label: "porte d'entrée", w: 2, when: { q: "gj_porte", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique", "Antibiothérapie", "Traitement de la porte d'entrée"] },
      { id: "gj_fasciite", diagnostic: "Fasciite nécrosante",
        arguments: [{ label: "douleur disproportionnée", w: 3, when: { q: "gj_dlrdispro", eq: true } },
                    { label: "nécrose / bulles / crépitation", w: 3, when: { q: "gj_necrose", eq: true } },
                    { label: "sepsis", w: 2, when: { q: "gj_sepsis", eq: true } }],
        examens_a_discuter: ["Avis chirurgical URGENT", "Ne pas retarder l'exploration"] },
      { id: "gj_tvp", diagnostic: "Thrombose veineuse profonde (TVP)",
        arguments: [{ label: "œdème/douleur du mollet isolés", w: 3, when: { q: "gj_mollet", eq: true } }],
        examens_a_discuter: ["Score clinique", "D-dimères / écho-doppler veineux"] },
      { id: "gj_stase", diagnostic: "Eczéma / dermite de stase",
        arguments: [{ label: "bilatéral", w: 2, when: { q: "gj_cote", eq: "Les deux" } },
                    { label: "prurit sans fièvre", w: 2, when: { q: "gj_prurit", eq: true } }],
        examens_a_discuter: ["Traitement local", "Prise en charge de l'insuffisance veineuse"] }
    ],
    examens_clinique: [
      "Température, signes de sepsis (FC, TA, conscience)",
      "Délimiter le placard au stylo (suivi de l'évolution)",
      "Rechercher bulles, nécrose, crépitation, hypoesthésie",
      "Palpation du mollet (signes de TVP)",
      "Recherche de la porte d'entrée"
    ]
  },

  // -------------------------------------------------------------------------
  // 33 — HÉMATÉMÈSE / MÉLÉNA (URGENCE)
  // -------------------------------------------------------------------------
  hematemese_melena: {
    id: "hematemese_melena",
    symptome: "Vomissement de sang ou selles noires (hémorragie digestive)",
    specialite: ["Hépato-gastro-entérologie"],
    urgence: true,
    questions: [
      { id: "he_type", label: "Type de saignement", type: "single_choice",
        question: "Que constatez-vous ?",
        options: ["Du sang (rouge ou « marc de café ») en vomissant", "Des selles noires, collantes et très malodorantes", "Les deux"] },
      { id: "he_abondance", label: "Abondance / récidive", type: "boolean",
        question: "Est-ce abondant ou répété ?" },
      { id: "he_choc", label: "Signes de choc", type: "boolean",
        question: "Avez-vous des vertiges/malaise en vous levant, une grande soif, le cœur qui bat vite ?" },
      { id: "he_ains", label: "AINS / anticoagulants", type: "boolean",
        question: "Prenez-vous de l'aspirine, des anti-inflammatoires ou des anticoagulants ?" },
      { id: "he_ulcere", label: "Antécédent ulcéreux", type: "boolean",
        question: "Avez-vous des douleurs au creux de l'estomac ou un antécédent d'ulcère ?" },
      { id: "he_alcool", label: "Hépatopathie / alcool", type: "boolean",
        question: "Avez-vous une maladie du foie ou une consommation d'alcool importante ?" },
      { id: "he_vomiss", label: "Vomissements préalables", type: "boolean",
        question: "Le sang est-il apparu APRÈS plusieurs vomissements alimentaires ?" },
      { id: "he_aeg", label: "AEG / dysphagie", type: "boolean",
        question: "Avez-vous maigri ou des difficultés à avaler ?" }
    ],
    red_flags: [
      { id: "he_rf_choc", niveau: 3,
        when: { any: [{ q: "he_choc", eq: true }, { q: "he_abondance", eq: true }] },
        message_medecin: "Hémorragie digestive abondante / signes de choc : URGENCE — priorité hémodynamique avant l'étiologie (15, voie veineuse, groupe + hémostase).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "he_rf_varices", niveau: 3,
        when: { all: [{ q: "he_alcool", eq: true }, { q: "he_type", in: ["Du sang (rouge ou « marc de café ») en vomissant", "Les deux"] }] },
        message_medecin: "Hépatopathie + hématémèse : rupture de varices œsophagiennes possible → urgence (terlipressine, endoscopie).",
        message_patient: "Ce contexte nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "he_rf_anticoag", niveau: 2,
        when: { q: "he_ains", eq: true },
        message_medecin: "Hémorragie sous AINS / anticoagulant : évaluer la gravité et corriger l'hémostase.",
        message_patient: "Ce saignement nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "he_ulcere", diagnostic: "Ulcère gastro-duodénal",
        arguments: [{ label: "prise d'AINS/aspirine", w: 2, when: { q: "he_ains", eq: true } },
                    { label: "épigastralgies / antécédent ulcéreux", w: 3, when: { q: "he_ulcere", eq: true } }],
        examens_a_discuter: ["Endoscopie œso-gastro-duodénale", "Recherche H. pylori", "IPP IV"] },
      { id: "he_varices", diagnostic: "Rupture de varices œsophagiennes",
        arguments: [{ label: "hépatopathie / HTP", w: 3, when: { q: "he_alcool", eq: true } },
                    { label: "hématémèse abondante", w: 1, when: { q: "he_abondance", eq: true } }],
        examens_a_discuter: ["Terlipressine", "Endoscopie urgente (ligature)"] },
      { id: "he_mallory", diagnostic: "Syndrome de Mallory-Weiss",
        arguments: [{ label: "hématémèse après efforts de vomissement", w: 3, when: { q: "he_vomiss", eq: true } }],
        examens_a_discuter: ["Endoscopie (souvent résolutif spontanément)"] },
      { id: "he_cancer", diagnostic: "Cancer gastro-œsophagien",
        arguments: [{ label: "AEG / dysphagie", w: 3, when: { q: "he_aeg", eq: true } }],
        examens_a_discuter: ["Endoscopie + biopsies"] }
    ],
    examens_clinique: [
      "Pouls, pression artérielle couché/debout (recherche de choc)",
      "Recherche de pâleur, marbrures",
      "Toucher rectal (méléna)",
      "Stigmates d'hépatopathie chronique",
      "Voie veineuse + bilan (NFS, groupe, hémostase)"
    ]
  },

  // -------------------------------------------------------------------------
  // 35 — HÉMOPTYSIE (URGENCE)
  // -------------------------------------------------------------------------
  hemoptysie: {
    id: "hemoptysie",
    symptome: "Crachats de sang (hémoptysie)",
    specialite: ["Pneumologie"],
    urgence: true,
    questions: [
      { id: "hm_confirm", label: "Sang à la toux", type: "boolean",
        question: "Le sang vient-il en toussant (et non vomi ou venant du nez) ?" },
      { id: "hm_aspect", label: "Sang rouge spumeux", type: "boolean",
        question: "Est-ce du sang rouge, aéré, mousseux ?" },
      { id: "hm_abondance", label: "Abondance", type: "single_choice",
        question: "Quelle quantité de sang ?",
        options: ["Quelques crachats striés de sang", "Un verre ou plus, ou saignements répétés"] },
      { id: "hm_detresse", label: "Détresse respiratoire", type: "boolean",
        question: "Êtes-vous très essoufflé, les lèvres bleues ?" },
      { id: "hm_tabac", label: "Tabac + AEG", type: "boolean",
        question: "Fumez-vous, et avez-vous maigri récemment ?" },
      { id: "hm_fievre", label: "Fièvre / sueurs nocturnes", type: "boolean",
        question: "Avez-vous de la fièvre, des crachats, ou des sueurs nocturnes ?" },
      { id: "hm_thrombo", label: "Contexte d'EP", type: "boolean",
        question: "Avez-vous une douleur dans la poitrine avec essoufflement, ou un contexte de phlébite ?" },
      { id: "hm_anticoag", label: "Anticoagulants", type: "boolean",
        question: "Prenez-vous des anticoagulants ?" }
    ],
    red_flags: [
      { id: "hm_rf_abondance", niveau: 3,
        when: { any: [{ q: "hm_abondance", eq: "Un verre ou plus, ou saignements répétés" }, { q: "hm_detresse", eq: true }] },
        message_medecin: "Hémoptysie de grande abondance / détresse respiratoire : menace d'ASPHYXIE → urgence (position assise, O2, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "hm_rf_cancer", niveau: 2,
        when: { q: "hm_tabac", eq: true },
        message_medecin: "Hémoptysie chez un fumeur (± AEG) : cancer bronchique à éliminer → fibroscopie + TDM thoracique.",
        message_patient: "Ce symptôme nécessite un avis médical rapide et des examens." },
      { id: "hm_rf_tb", niveau: 2,
        when: { q: "hm_fievre", eq: true },
        message_medecin: "Hémoptysie fébrile + sueurs nocturnes : éliminer une tuberculose active (contagiosité).",
        message_patient: "Ce symptôme nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "hm_cancer", diagnostic: "Cancer bronchique",
        arguments: [{ label: "tabac + AEG", w: 3, when: { q: "hm_tabac", eq: true } }],
        examens_a_discuter: ["TDM thoracique", "Fibroscopie bronchique"] },
      { id: "hm_tb", diagnostic: "Tuberculose",
        arguments: [{ label: "fièvre + sueurs nocturnes", w: 3, when: { q: "hm_fievre", eq: true } }],
        examens_a_discuter: ["Radiographie / TDM", "Recherche de BK (crachats)", "Isolement respiratoire"] },
      { id: "hm_ep", diagnostic: "Embolie pulmonaire (avec infarctus)",
        arguments: [{ label: "douleur pleurale + dyspnée + contexte", w: 3, when: { q: "hm_thrombo", eq: true } }],
        examens_a_discuter: ["Angio-TDM thoracique", "D-dimères"] },
      { id: "hm_ddb", diagnostic: "Dilatation des bronches",
        arguments: [{ label: "hémoptysies répétées", w: 2, when: { q: "hm_abondance", eq: "Un verre ou plus, ou saignements répétés" } }],
        examens_a_discuter: ["TDM thoracique"] }
    ],
    examens_clinique: [
      "SpO2, fréquence respiratoire",
      "Auscultation pulmonaire",
      "Quantifier l'abondance (mL/24 h)",
      "Pression artérielle, fréquence cardiaque",
      "Recherche de signes de TVP"
    ]
  },

  // -------------------------------------------------------------------------
  // 42 — MALAISE ET PERTE DE CONNAISSANCE (URGENCE)
  // -------------------------------------------------------------------------
  malaise_pc: {
    id: "malaise_pc",
    symptome: "Malaise / perte de connaissance",
    specialite: ["Cardiologie", "Neurologie"],
    urgence: true,
    questions: [
      { id: "mp_pc", label: "Vraie perte de connaissance", type: "boolean",
        question: "Y a-t-il eu une vraie perte de connaissance (et pas seulement une sensation de malaise) ?" },
      { id: "mp_prodrome", label: "Prodromes végétatifs", type: "boolean",
        question: "Juste avant : sueurs, voile devant les yeux, nausées, chaleur ?" },
      { id: "mp_effort", label: "Survenue à l'effort / décubitus", type: "boolean",
        question: "Est-ce survenu pendant un effort, ou en étant allongé ?" },
      { id: "mp_palpitations", label: "Signes cardiaques", type: "boolean",
        question: "Aviez-vous des palpitations, une douleur dans la poitrine ou un essoufflement ?" },
      { id: "mp_recup", label: "Récupération", type: "single_choice",
        question: "Comment s'est passé le réveil ?",
        options: ["Immédiat, tout de suite normal", "Confus / désorienté pendant un moment"] },
      { id: "mp_langue", label: "Signes de crise", type: "boolean",
        question: "Y a-t-il eu une morsure sur le côté de la langue, une perte d'urine, des mouvements saccadés ?" },
      { id: "mp_orthostatique", label: "Au lever", type: "boolean",
        question: "Est-ce survenu en vous levant rapidement ?" },
      { id: "mp_atcd", label: "Cardiopathie / mort subite familiale", type: "boolean",
        question: "Avez-vous une maladie du cœur connue, ou des morts subites dans la famille ?" },
      { id: "mp_medic", label: "Médicaments récents", type: "boolean",
        question: "Avez-vous changé de médicaments récemment (tension, cœur, diabète) ?" }
    ],
    red_flags: [
      { id: "mp_rf_cardiaque", niveau: 3,
        when: { any: [{ q: "mp_effort", eq: true }, { q: "mp_palpitations", eq: true }, { all: [{ q: "mp_atcd", eq: true }, { not: { q: "mp_prodrome", eq: true } }] }] },
        message_medecin: "Syncope d'effort / sans prodrome / sur cardiopathie : cause rythmique ou obstructive (risque de mort subite) → ECG systématique, avis cardiologique urgent.",
        message_patient: "Ce malaise nécessite une évaluation médicale rapide avec un électrocardiogramme." }
    ],
    diagnostics_differentiels: [
      { id: "mp_vagale", diagnostic: "Syncope vagale (bénigne)",
        arguments: [{ label: "prodromes neurovégétatifs", w: 3, when: { q: "mp_prodrome", eq: true } },
                    { label: "récupération immédiate", w: 2, when: { q: "mp_recup", eq: "Immédiat, tout de suite normal" } }],
        examens_a_discuter: ["Diagnostic clinique", "Mesures hygiéno-diététiques, hydratation"] },
      { id: "mp_cardiaque", diagnostic: "Syncope cardiaque",
        arguments: [{ label: "à l'effort / décubitus", w: 3, when: { q: "mp_effort", eq: true } },
                    { label: "palpitations / douleur thoracique", w: 2, when: { q: "mp_palpitations", eq: true } },
                    { label: "cardiopathie / mort subite familiale", w: 2, when: { q: "mp_atcd", eq: true } }],
        examens_a_discuter: ["ECG (QT long, BAV, pré-excitation, Brugada)", "Avis cardiologique, Holter, échocardiographie"] },
      { id: "mp_orthostatique", diagnostic: "Hypotension orthostatique",
        arguments: [{ label: "survenue au lever", w: 3, when: { q: "mp_orthostatique", eq: true } },
                    { label: "médicament récent", w: 1, when: { q: "mp_medic", eq: true } }],
        examens_a_discuter: ["TA couché/debout", "Revue de l'ordonnance"] },
      { id: "mp_epilepsie", diagnostic: "Crise d'épilepsie",
        arguments: [{ label: "morsure latérale de langue / mouvements", w: 3, when: { q: "mp_langue", eq: true } },
                    { label: "confusion post-critique", w: 2, when: { q: "mp_recup", eq: "Confus / désorienté pendant un moment" } }],
        examens_a_discuter: ["Avis neurologique", "EEG"] }
    ],
    examens_clinique: [
      "ECG 12 dérivations SYSTÉMATIQUE",
      "Pression artérielle couché / debout",
      "Auscultation cardiaque (souffle de rétrécissement aortique)",
      "Glycémie capillaire",
      "Examen neurologique"
    ]
  },

  // -------------------------------------------------------------------------
  // 64 — ÉPANCHEMENT PLEURAL (CAT)
  // -------------------------------------------------------------------------
  epanchement_pleural: {
    id: "epanchement_pleural",
    symptome: "Épanchement pleural (eau / liquide autour du poumon)",
    specialite: ["Pneumologie"],
    urgence: false,
    questions: [
      { id: "ep_dyspnee", label: "Dyspnée", type: "boolean",
        question: "Êtes-vous essoufflé ?" },
      { id: "ep_tolerance", label: "Mauvaise tolérance", type: "boolean",
        question: "Êtes-vous très essoufflé au moindre effort ou au repos ?" },
      { id: "ep_douleur", label: "Douleur basithoracique", type: "boolean",
        question: "Avez-vous une douleur sur le côté du thorax en respirant ?" },
      { id: "ep_fievre", label: "Fièvre", type: "boolean",
        question: "Avez-vous de la fièvre ?" },
      { id: "ep_cardiaque", label: "Cause systémique (transsudat)", type: "boolean",
        question: "Avez-vous une insuffisance cardiaque, une cirrhose, ou une maladie des reins connue ?" },
      { id: "ep_neo", label: "Contexte néoplasique", type: "boolean",
        question: "Avez-vous un cancer connu, ou avez-vous maigri / une altération de l'état général ?" },
      { id: "ep_amiante", label: "Tabac / amiante", type: "boolean",
        question: "Fumez-vous ou avez-vous été exposé à l'amiante ?" }
    ],
    red_flags: [
      { id: "ep_rf_purulent", niveau: 3,
        when: { all: [{ q: "ep_fievre", eq: true }, { q: "ep_dyspnee", eq: true }] },
        message_medecin: "Épanchement fébrile : pleurésie purulente possible → ponction ; drainage en urgence si liquide purulent.",
        message_patient: "Cette association nécessite une évaluation médicale rapide." },
      { id: "ep_rf_compressif", niveau: 3,
        when: { q: "ep_tolerance", eq: true },
        message_medecin: "Épanchement compressif mal toléré : évacuation / avis pneumologique urgent.",
        message_patient: "Cet essoufflement important nécessite une évaluation médicale rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ep_transsudat", diagnostic: "Transsudat (cause systémique)",
        arguments: [{ label: "insuffisance cardiaque / cirrhose / néphrotique", w: 3, when: { q: "ep_cardiaque", eq: true } }],
        examens_a_discuter: ["Critères de Light (si ponction)", "Traiter la cause systémique"] },
      { id: "ep_exsudat_inf", diagnostic: "Pleurésie infectieuse / purulente",
        arguments: [{ label: "fièvre", w: 3, when: { q: "ep_fievre", eq: true } }],
        examens_a_discuter: ["Ponction pleurale (cytologie, biochimie, bactériologie)", "Drainage si liquide purulent"] },
      { id: "ep_neo", diagnostic: "Pleurésie néoplasique",
        arguments: [{ label: "contexte néoplasique / AEG", w: 3, when: { q: "ep_neo", eq: true } },
                    { label: "tabac / amiante (mésothéliome)", w: 1, when: { q: "ep_amiante", eq: true } }],
        examens_a_discuter: ["Ponction (cytologie, exsudat souvent hémorragique)", "Imagerie, avis spécialisé"] },
      { id: "ep_ep", diagnostic: "Embolie pulmonaire",
        arguments: [{ label: "douleur basithoracique", w: 2, when: { q: "ep_douleur", eq: true } }],
        examens_a_discuter: ["Angio-TDM si contexte évocateur"] }
    ],
    examens_clinique: [
      "Auscultation (matité, abolition du murmure vésiculaire)",
      "SpO2, fréquence respiratoire (tolérance)",
      "Radiographie thoracique",
      "Critères de Light sur le liquide de ponction",
      "Recherche d'une cause systémique vs locale"
    ]
  },

  // -------------------------------------------------------------------------
  // 41 — LOMBALGIES
  // -------------------------------------------------------------------------
  lombalgie: {
    id: "lombalgie",
    symptome: "Mal de dos (lombalgie)",
    specialite: ["Rhumatologie"],
    questions: [
      { id: "lo_horaire", label: "Rythme de la douleur", type: "single_choice",
        question: "Quand la douleur est-elle la plus forte ?",
        options: ["À l'effort, le soir (soulagée par le repos)", "La nuit ou au réveil, avec une raideur matinale prolongée"] },
      { id: "lo_effort", label: "Effort déclenchant", type: "boolean",
        question: "Est-elle apparue après un effort ou le port d'une charge ?" },
      { id: "lo_radiculaire", label: "Irradiation dans la jambe", type: "boolean",
        question: "La douleur descend-elle dans la jambe (fesse, cuisse, mollet) ?" },
      { id: "lo_selle", label: "Anesthésie en selle", type: "boolean",
        question: "Avez-vous une perte de sensibilité autour de l'anus ou des organes génitaux ?" },
      { id: "lo_sphincter", label: "Troubles sphinctériens", type: "boolean",
        question: "Avez-vous du mal à uriner, ou des fuites d'urines/de selles depuis le début des douleurs ?" },
      { id: "lo_deficit", label: "Déficit moteur", type: "boolean",
        question: "Avez-vous une faiblesse d'une jambe ou du pied ?" },
      { id: "lo_aeg", label: "Fièvre / AEG / cancer", type: "boolean",
        question: "Avez-vous de la fièvre, ou avez-vous maigri / un cancer connu ?" },
      { id: "lo_nocturne", label: "Douleur non mécanique", type: "boolean",
        question: "La douleur est-elle permanente, présente la nuit, non soulagée par le repos ?" },
      { id: "lo_trauma", label: "Contexte fracturaire", type: "boolean",
        question: "Y a-t-il eu un traumatisme, ou avez-vous de l'ostéoporose / une corticothérapie ?" }
    ],
    red_flags: [
      { id: "lo_rf_queue", niveau: 3,
        when: { any: [{ q: "lo_selle", eq: true }, { q: "lo_sphincter", eq: true }] },
        message_medecin: "Syndrome de la queue de cheval (anesthésie en selle / troubles sphinctériens) : URGENCE — IRM et décompression chirurgicale sans délai.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "lo_rf_infect", niveau: 2,
        when: { all: [{ q: "lo_aeg", eq: true }, { q: "lo_horaire", eq: "La nuit ou au réveil, avec une raideur matinale prolongée" }] },
        message_medecin: "Lombalgie inflammatoire fébrile / AEG : spondylodiscite, tumeur ou métastase à éliminer (VS/CRP, imagerie).",
        message_patient: "Ces éléments nécessitent un avis médical rapide." },
      { id: "lo_rf_deficit", niveau: 2,
        when: { q: "lo_deficit", eq: true },
        message_medecin: "Déficit moteur radiculaire : avis spécialisé (risque de déficit progressif).",
        message_patient: "Une faiblesse de la jambe nécessite un avis médical rapide." },
      { id: "lo_rf_fracture", niveau: 2,
        when: { q: "lo_trauma", eq: true },
        message_medecin: "Contexte fracturaire (traumatisme, ostéoporose, corticoïdes) : radiographie / imagerie.",
        message_patient: "Ce contexte nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "lo_commune", diagnostic: "Lombalgie commune",
        arguments: [{ label: "rythme mécanique", w: 2, when: { q: "lo_horaire", eq: "À l'effort, le soir (soulagée par le repos)" } },
                    { label: "effort déclenchant", w: 2, when: { q: "lo_effort", eq: true } }],
        examens_a_discuter: ["Pas d'imagerie d'emblée (en l'absence de drapeau rouge)", "Traitement symptomatique, maintien de l'activité"] },
      { id: "lo_sciatique", diagnostic: "Lombosciatique / lombocruralgie discale",
        arguments: [{ label: "douleur radiculaire systématisée", w: 3, when: { q: "lo_radiculaire", eq: true } },
                    { label: "déficit moteur", w: 1, when: { q: "lo_deficit", eq: true } }],
        examens_a_discuter: ["Examen neurologique (Lasègue)", "Imagerie si déficit ou résistance au traitement"] },
      { id: "lo_symptomatique", diagnostic: "Lombalgie symptomatique (spondylodiscite, tumeur, fracture)",
        arguments: [{ label: "rythme inflammatoire", w: 2, when: { q: "lo_horaire", eq: "La nuit ou au réveil, avec une raideur matinale prolongée" } },
                    { label: "fièvre / AEG / cancer", w: 3, when: { q: "lo_aeg", eq: true } },
                    { label: "douleur nocturne non mécanique", w: 2, when: { q: "lo_nocturne", eq: true } }],
        examens_a_discuter: ["VS / CRP", "Imagerie (IRM rachidienne)"] },
      { id: "lo_queue", diagnostic: "Syndrome de la queue de cheval",
        arguments: [{ label: "anesthésie en selle", w: 3, when: { q: "lo_selle", eq: true } },
                    { label: "troubles sphinctériens", w: 3, when: { q: "lo_sphincter", eq: true } }],
        examens_a_discuter: ["IRM en urgence", "Avis neurochirurgical"] }
    ],
    examens_clinique: [
      "Examen neurologique des membres inférieurs (force, réflexes, sensibilité)",
      "Manœuvre de Lasègue",
      "Sensibilité périnéale et tonus sphinctérien si suspicion de queue de cheval",
      "Palpation / percussion du rachis",
      "Température"
    ]
  },

  // -------------------------------------------------------------------------
  // 11 — DIARRHÉE AIGUË
  // -------------------------------------------------------------------------
  diarrhee_aigue: {
    id: "diarrhee_aigue",
    symptome: "Diarrhée aiguë",
    specialite: ["Digestif", "Infectiologie"],
    questions: [
      { id: "da_duree", label: "Durée", type: "single_choice",
        question: "Depuis combien de temps ?",
        options: ["Moins de 14 jours", "Plus de 14 jours"] },
      { id: "da_sang", label: "Selles glairo-sanglantes", type: "boolean",
        question: "Y a-t-il du sang ou des glaires dans les selles ?" },
      { id: "da_fievre", label: "Fièvre", type: "boolean",
        question: "Avez-vous de la fièvre ?" },
      { id: "da_deshyd", label: "Déshydratation", type: "boolean",
        question: "Avez-vous très soif, peu d'urines, des vertiges en vous levant ?" },
      { id: "da_collectif", label: "Toxi-infection collective", type: "boolean",
        question: "D'autres personnes ayant mangé la même chose sont-elles malades ?" },
      { id: "da_voyage", label: "Voyage récent", type: "boolean",
        question: "Revenez-vous d'un voyage récent à l'étranger ?" },
      { id: "da_atb", label: "Antibiotiques récents", type: "boolean",
        question: "Avez-vous pris des antibiotiques dans les semaines précédentes ?" },
      { id: "da_terrain", label: "Terrain fragile", type: "boolean",
        question: "Êtes-vous âgé, immunodéprimé, ou avez-vous des maladies chroniques importantes ?" }
    ],
    red_flags: [
      { id: "da_rf_deshyd", niveau: 3,
        when: { q: "da_deshyd", eq: true },
        message_medecin: "Déshydratation sévère / choc : urgence (réhydratation). La gravité tient à la déshydratation et au terrain, pas au nombre de selles.",
        message_patient: "Ces signes nécessitent une évaluation médicale sans attendre." },
      { id: "da_rf_palu", niveau: 3,
        when: { all: [{ q: "da_voyage", eq: true }, { q: "da_fievre", eq: true }] },
        message_medecin: "Retour de zone d'endémie + fièvre : éliminer un paludisme (frottis-goutte épaisse) en plus de la cause digestive.",
        message_patient: "Une fièvre au retour de voyage nécessite un avis médical rapide." },
      { id: "da_rf_dysenterie", niveau: 2,
        when: { all: [{ q: "da_sang", eq: true }, { q: "da_fievre", eq: true }] },
        message_medecin: "Syndrome dysentérique fébrile (bactérie invasive) : coproculture ; avis rapide surtout si terrain fragile.",
        message_patient: "Cette association nécessite un avis médical rapide." },
      { id: "da_rf_cdiff", niveau: 2,
        when: { q: "da_atb", eq: true },
        message_medecin: "Diarrhée post-antibiotique : évoquer une colite à C. difficile (recherche de toxines).",
        message_patient: "Ce contexte nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "da_virale", diagnostic: "Diarrhée hydrique virale / toxinique",
        arguments: [{ label: "contexte épidémique / collectif", w: 2, when: { q: "da_collectif", eq: true } },
                    { label: "pas de sang", w: 1, when: { q: "da_sang", eq: false } }],
        examens_a_discuter: ["Réhydratation orale", "Pas de coproculture systématique"] },
      { id: "da_dysenterie", diagnostic: "Syndrome dysentérique (bactérie invasive)",
        arguments: [{ label: "selles glairo-sanglantes", w: 3, when: { q: "da_sang", eq: true } },
                    { label: "fièvre", w: 2, when: { q: "da_fievre", eq: true } }],
        examens_a_discuter: ["Coproculture", "Antibiothérapie selon terrain"] },
      { id: "da_cdiff", diagnostic: "Colite à C. difficile",
        arguments: [{ label: "diarrhée post-antibiotique", w: 3, when: { q: "da_atb", eq: true } }],
        examens_a_discuter: ["Recherche de toxines de C. difficile"] },
      { id: "da_non_inf", diagnostic: "Cause non infectieuse (médicament, MICI)",
        arguments: [{ label: "durée > 14 jours", w: 2, when: { q: "da_duree", eq: "Plus de 14 jours" } }],
        examens_a_discuter: ["Revue des médicaments", "Avis spécialisé si persistance"] }
    ],
    examens_clinique: [
      "Poids, signes de déshydratation (pli cutané, TA couché/debout)",
      "Température",
      "Palpation abdominale",
      "Toucher rectal si selles glairo-sanglantes",
      "Évaluation du terrain (âge, comorbidités)"
    ]
  },

  // -------------------------------------------------------------------------
  // 08 — CERVICALGIES
  // -------------------------------------------------------------------------
  cervicalgie: {
    id: "cervicalgie",
    symptome: "Douleur du cou (cervicalgie)",
    specialite: ["Rhumatologie", "Neurologie"],
    questions: [
      { id: "ce_horaire", label: "Rythme", type: "single_choice",
        question: "Quand est-ce le plus douloureux ?",
        options: ["À l'effort / le soir (mécanique)", "La nuit / au réveil avec raideur (inflammatoire)"] },
      { id: "ce_trauma", label: "Traumatisme", type: "boolean",
        question: "Y a-t-il eu un traumatisme ou un faux mouvement ?" },
      { id: "ce_radiculaire", label: "Irradiation dans le bras", type: "boolean",
        question: "La douleur descend-elle dans le bras ?" },
      { id: "ce_deficit", label: "Déficit / paresthésies MS", type: "boolean",
        question: "Avez-vous une faiblesse ou des fourmillements dans le bras ou la main ?" },
      { id: "ce_medullaire", label: "Syndrome médullaire", type: "boolean",
        question: "Avez-vous des troubles de la marche, des décharges électriques en penchant la tête, ou des troubles pour uriner ?" },
      { id: "ce_fievre", label: "Fièvre / AEG / cancer", type: "boolean",
        question: "Avez-vous de la fièvre, ou un cancer connu / un amaigrissement ?" },
      { id: "ce_meninge", label: "Syndrome méningé", type: "boolean",
        question: "Avez-vous une raideur de la nuque avec fièvre et mal de tête ?" }
    ],
    red_flags: [
      { id: "ce_rf_myelo", niveau: 3,
        when: { q: "ce_medullaire", eq: true },
        message_medecin: "Syndrome médullaire (troubles de la marche, Lhermitte, troubles sphinctériens) : myélopathie → IRM urgente.",
        message_patient: "Ces signes nécessitent une évaluation médicale sans attendre." },
      { id: "ce_rf_meningite", niveau: 3,
        when: { q: "ce_meninge", eq: true },
        message_medecin: "Raideur de nuque fébrile : éliminer une méningite (urgence).",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ce_rf_infect", niveau: 2,
        when: { q: "ce_fievre", eq: true },
        message_medecin: "Cervicalgie fébrile / AEG : spondylodiscite ou tumeur à éliminer.",
        message_patient: "Ces éléments nécessitent un avis médical rapide." },
      { id: "ce_rf_trauma", niveau: 2,
        when: { q: "ce_trauma", eq: true },
        message_medecin: "Cervicalgie post-traumatique : rechercher une instabilité (imagerie).",
        message_patient: "Un traumatisme du cou nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ce_commune", diagnostic: "Cervicalgie commune",
        arguments: [{ label: "rythme mécanique", w: 3, when: { q: "ce_horaire", eq: "À l'effort / le soir (mécanique)" } }],
        examens_a_discuter: ["Traitement symptomatique", "Pas d'imagerie d'emblée sans drapeau"] },
      { id: "ce_ncb", diagnostic: "Névralgie cervico-brachiale",
        arguments: [{ label: "irradiation radiculaire dans le bras", w: 3, when: { q: "ce_radiculaire", eq: true } },
                    { label: "déficit / paresthésies", w: 1, when: { q: "ce_deficit", eq: true } }],
        examens_a_discuter: ["Examen neurologique du membre supérieur", "Imagerie si déficit"] },
      { id: "ce_myelopathie", diagnostic: "Myélopathie cervicarthrosique",
        arguments: [{ label: "signes médullaires", w: 3, when: { q: "ce_medullaire", eq: true } }],
        examens_a_discuter: ["IRM médullaire", "Avis neurochirurgical"] },
      { id: "ce_symptomatique", diagnostic: "Cervicalgie symptomatique (infection / tumeur)",
        arguments: [{ label: "fièvre / AEG", w: 3, when: { q: "ce_fievre", eq: true } },
                    { label: "rythme inflammatoire", w: 1, when: { q: "ce_horaire", eq: "La nuit / au réveil avec raideur (inflammatoire)" } }],
        examens_a_discuter: ["VS / CRP", "Imagerie"] }
    ],
    examens_clinique: [
      "Mobilité cervicale",
      "Examen neurologique des membres supérieurs ET inférieurs (syndrome pyramidal)",
      "Recherche du signe de Lhermitte",
      "Recherche d'une raideur méningée",
      "Température"
    ]
  },

  // -------------------------------------------------------------------------
  // 09 — CONSTIPATION
  // -------------------------------------------------------------------------
  constipation: {
    id: "constipation",
    symptome: "Constipation",
    specialite: ["Digestif"],
    questions: [
      { id: "co_anciennete", label: "Ancienneté", type: "single_choice",
        question: "Depuis quand ?",
        options: ["Récente (changement récent du transit)", "Ancienne / chronique"] },
      { id: "co_sang", label: "Rectorragies / méléna", type: "boolean",
        question: "Avez-vous du sang dans les selles ou des selles noires ?" },
      { id: "co_anemie", label: "Anémie", type: "boolean",
        question: "Êtes-vous pâle/fatigué, ou a-t-on trouvé une anémie ?" },
      { id: "co_amaigr", label: "Amaigrissement", type: "boolean",
        question: "Avez-vous maigri sans le vouloir ?" },
      { id: "co_atcdfam", label: "ATCD familial CCR", type: "boolean",
        question: "Avez-vous des antécédents familiaux de cancer du côlon ?" },
      { id: "co_occlusion", label: "Syndrome occlusif", type: "boolean",
        question: "Avez-vous des douleurs du ventre, des vomissements et un arrêt des gaz et des selles ?" },
      { id: "co_medic", label: "Cause médicamenteuse", type: "boolean",
        question: "Prenez-vous des opioïdes (codéine, morphine), du fer, ou certains traitements de la tension ?" },
      { id: "co_thyro", label: "Hypothyroïdie", type: "boolean",
        question: "Êtes-vous frileux et fatigué (hypothyroïdie possible) ?" }
    ],
    red_flags: [
      { id: "co_rf_cancer", niveau: 2,
        when: { all: [{ q: "co_anciennete", eq: "Récente (changement récent du transit)" }, { any: [{ ctx: "age", gte: 50 }, { q: "co_sang", eq: true }, { q: "co_anemie", eq: true }, { q: "co_amaigr", eq: true }] }] },
        message_medecin: "Constipation récente après 50 ans ou avec rectorragie/anémie/amaigrissement : coloscopie (cancer colorectal).",
        message_patient: "Ce changement nécessite un avis médical et des examens." },
      { id: "co_rf_occlusion", niveau: 3,
        when: { q: "co_occlusion", eq: true },
        message_medecin: "Syndrome occlusif (douleur + vomissements + arrêt des gaz) : urgence chirurgicale.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "co_fonctionnelle", diagnostic: "Constipation fonctionnelle",
        arguments: [{ label: "ancienne, sans signe d'alarme", w: 3, when: { q: "co_anciennete", eq: "Ancienne / chronique" } }],
        examens_a_discuter: ["Mesures hygiéno-diététiques (fibres, hydratation)", "Laxatifs osmotiques"] },
      { id: "co_cancer", diagnostic: "Cancer colorectal",
        arguments: [{ label: "constipation récente", w: 2, when: { q: "co_anciennete", eq: "Récente (changement récent du transit)" } },
                    { label: "rectorragies", w: 2, when: { q: "co_sang", eq: true } },
                    { label: "anémie", w: 2, when: { q: "co_anemie", eq: true } },
                    { label: "âge > 50 ans", w: 1, when: { ctx: "age", gte: 50 } }],
        examens_a_discuter: ["Coloscopie"] },
      { id: "co_secondaire", diagnostic: "Cause métabolique / médicamenteuse",
        arguments: [{ label: "médicament constipant", w: 2, when: { q: "co_medic", eq: true } },
                    { label: "signes d'hypothyroïdie", w: 2, when: { q: "co_thyro", eq: true } }],
        examens_a_discuter: ["TSH, calcémie, kaliémie", "Revue de l'ordonnance"] },
      { id: "co_occlusion", diagnostic: "Occlusion",
        arguments: [{ label: "douleur + vomissements + arrêt des gaz", w: 3, when: { q: "co_occlusion", eq: true } }],
        examens_a_discuter: ["Imagerie abdominale", "Avis chirurgical"] }
    ],
    examens_clinique: [
      "Palpation abdominale",
      "Toucher rectal (masse, sang, fécalome)",
      "Recherche de pâleur (anémie)",
      "TSH / calcémie / kaliémie selon le contexte"
    ]
  },

  // -------------------------------------------------------------------------
  // 34 — HÉMATURIE
  // -------------------------------------------------------------------------
  hematurie: {
    id: "hematurie",
    symptome: "Sang dans les urines (hématurie)",
    specialite: ["Urologie", "Néphrologie"],
    questions: [
      { id: "ha_visible", label: "Macroscopique", type: "boolean",
        question: "Voyez-vous du sang dans les urines à l'œil nu ?" },
      { id: "ha_chrono", label: "Chronologie", type: "single_choice",
        question: "À quel moment de la miction le sang apparaît-il ?",
        options: ["Au début", "À la fin", "Pendant toute la miction / je ne sais pas"] },
      { id: "ha_caillots", label: "Caillots", type: "boolean",
        question: "Y a-t-il des caillots de sang ?" },
      { id: "ha_douleur", label: "Douleur", type: "boolean",
        question: "Est-ce douloureux (brûlures urinaires, douleur du flanc) ?" },
      { id: "ha_tabac", label: "Tabac / exposition pro", type: "boolean",
        question: "Fumez-vous, ou avez-vous une exposition professionnelle (peintures, colorants, caoutchouc) ?" },
      { id: "ha_irritatif", label: "Signes infectieux", type: "boolean",
        question: "Avez-vous des brûlures urinaires, des envies fréquentes ou de la fièvre ?" },
      { id: "ha_colique", label: "Colique néphrétique", type: "boolean",
        question: "Avez-vous une douleur du flanc qui irradie vers le bas, par vagues ?" },
      { id: "ha_oedeme", label: "Syndrome néphrologique", type: "boolean",
        question: "Avez-vous des œdèmes, de l'hypertension, ou des urines mousseuses ?" }
    ],
    red_flags: [
      { id: "ha_rf_cancer", niveau: 2,
        when: { all: [{ q: "ha_visible", eq: true }, { not: { q: "ha_douleur", eq: true } }] },
        message_medecin: "Hématurie macroscopique INDOLORE = cancer urologique jusqu'à preuve du contraire (surtout fumeur > 50 ans) : bilan complet même si épisode unique (cystoscopie + uro-TDM).",
        message_patient: "Du sang dans les urines, même sans douleur, nécessite un bilan médical." },
      { id: "ha_rf_retention", niveau: 2,
        when: { q: "ha_caillots", eq: true },
        message_medecin: "Hématurie avec caillots : risque de rétention/caillotage vésical → avis urologique.",
        message_patient: "La présence de caillots nécessite un avis médical rapide." },
      { id: "ha_rf_gn", niveau: 2,
        when: { q: "ha_oedeme", eq: true },
        message_medecin: "Hématurie + œdèmes / HTA / protéinurie : glomérulonéphrite (possiblement rapidement progressive) → avis néphrologique.",
        message_patient: "Ces signes nécessitent un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ha_tumeur", diagnostic: "Tumeur urothéliale / rénale",
        arguments: [{ label: "hématurie macroscopique indolore", w: 3, when: { all: [{ q: "ha_visible", eq: true }, { not: { q: "ha_douleur", eq: true } }] } },
                    { label: "tabac / exposition", w: 2, when: { q: "ha_tabac", eq: true } }],
        examens_a_discuter: ["Cystoscopie", "Uro-TDM", "Cytologie urinaire"] },
      { id: "ha_lithiase", diagnostic: "Lithiase urinaire",
        arguments: [{ label: "colique néphrétique", w: 3, when: { q: "ha_colique", eq: true } },
                    { label: "douleur", w: 1, when: { q: "ha_douleur", eq: true } }],
        examens_a_discuter: ["Bandelette urinaire", "Échographie / uro-scanner"] },
      { id: "ha_infection", diagnostic: "Infection urinaire",
        arguments: [{ label: "signes irritatifs / fièvre", w: 3, when: { q: "ha_irritatif", eq: true } }],
        examens_a_discuter: ["ECBU"] },
      { id: "ha_gn", diagnostic: "Glomérulonéphrite",
        arguments: [{ label: "œdèmes / HTA / protéinurie", w: 3, when: { q: "ha_oedeme", eq: true } }],
        examens_a_discuter: ["Protéinurie, créatinine", "Avis néphrologique"] }
    ],
    examens_clinique: [
      "Bandelette urinaire / ECBU",
      "Pression artérielle",
      "Palpation des fosses lombaires",
      "Toucher rectal (prostate) chez l'homme",
      "Recherche d'œdèmes"
    ]
  },

  // -------------------------------------------------------------------------
  // 40 — LEUCORRHÉES
  // -------------------------------------------------------------------------
  leucorrhees: {
    id: "leucorrhees",
    symptome: "Pertes vaginales anormales (leucorrhées)",
    specialite: ["Gynécologie"],
    questions: [
      { id: "le_aspect", label: "Aspect des pertes", type: "single_choice",
        question: "Quel est l'aspect des pertes ?",
        options: ["Blanches, épaisses (comme du lait caillé)", "Grises, liquides, avec une odeur de poisson", "Verdâtres, mousseuses", "Autre / je ne sais pas"] },
      { id: "le_prurit", label: "Prurit / brûlures", type: "boolean",
        question: "Avez-vous des démangeaisons ou des brûlures de la vulve ?" },
      { id: "le_odeur", label: "Mauvaise odeur", type: "boolean",
        question: "Y a-t-il une mauvaise odeur ?" },
      { id: "le_douleur", label: "Douleur pelvienne / fièvre", type: "boolean",
        question: "Avez-vous des douleurs du bas-ventre et/ou de la fièvre ?" },
      { id: "le_ist", label: "Risque d'IST", type: "boolean",
        question: "Avez-vous un risque d'infection sexuellement transmissible (nouveau partenaire, rapports non protégés) ?" },
      { id: "le_terrain", label: "Terrain à candidose", type: "boolean",
        question: "Avez-vous pris des antibiotiques récemment, êtes-vous diabétique ou enceinte ?" }
    ],
    red_flags: [
      { id: "le_rf_salpingite", niveau: 2,
        when: { q: "le_douleur", eq: true },
        message_medecin: "Leucorrhées + douleurs pelviennes / fièvre : salpingite (infection génitale haute) → avis gynéco rapide (risque d'infertilité).",
        message_patient: "Cette association nécessite un avis médical rapide." },
      { id: "le_rf_grossesse", niveau: 2,
        when: { all: [{ ctx: "grossessePossible", eq: true }, { q: "le_aspect", eq: "Grises, liquides, avec une odeur de poisson" }] },
        message_medecin: "Vaginose pendant une grossesse possible : risque d'accouchement prématuré → confirmer et traiter.",
        message_patient: "Un avis médical est recommandé pour ces pertes." }
    ],
    diagnostics_differentiels: [
      { id: "le_candidose", diagnostic: "Candidose vulvo-vaginale",
        arguments: [{ label: "pertes blanches caillebottées", w: 3, when: { q: "le_aspect", eq: "Blanches, épaisses (comme du lait caillé)" } },
                    { label: "prurit intense", w: 2, when: { q: "le_prurit", eq: true } },
                    { label: "terrain favorisant", w: 1, when: { q: "le_terrain", eq: true } }],
        examens_a_discuter: ["Examen au spéculum, pH < 4,5", "Antifongique local"] },
      { id: "le_vaginose", diagnostic: "Vaginose bactérienne",
        arguments: [{ label: "pertes grises homogènes", w: 3, when: { q: "le_aspect", eq: "Grises, liquides, avec une odeur de poisson" } },
                    { label: "odeur de poisson", w: 2, when: { q: "le_odeur", eq: true } }],
        examens_a_discuter: ["pH > 4,5, sniff-test à la potasse", "Métronidazole"] },
      { id: "le_trichomonas", diagnostic: "Trichomonase (IST)",
        arguments: [{ label: "pertes verdâtres spumeuses", w: 3, when: { q: "le_aspect", eq: "Verdâtres, mousseuses" } },
                    { label: "risque d'IST", w: 1, when: { q: "le_ist", eq: true } }],
        examens_a_discuter: ["Prélèvement vaginal", "Traitement des partenaires, dépistage IST"] },
      { id: "le_cervicite", diagnostic: "Cervicite (Chlamydia / gonocoque)",
        arguments: [{ label: "risque d'IST", w: 2, when: { q: "le_ist", eq: true } },
                    { label: "douleur pelvienne", w: 1, when: { q: "le_douleur", eq: true } }],
        examens_a_discuter: ["PCR Chlamydia / gonocoque", "Dépistage IST complet"] }
    ],
    examens_clinique: [
      "Examen au spéculum",
      "Mesure du pH vaginal",
      "Sniff-test (test à la potasse)",
      "Prélèvements vaginaux",
      "Recherche de douleur à la mobilisation utérine"
    ]
  },

  // -------------------------------------------------------------------------
  // 25 — ÉPISTAXIS
  // -------------------------------------------------------------------------
  epistaxis: {
    id: "epistaxis",
    symptome: "Saignement de nez (épistaxis)",
    specialite: ["ORL"],
    questions: [
      { id: "ep2_cote", label: "Côté", type: "single_choice",
        question: "Le saignement vient-il d'une narine ou des deux ?",
        options: ["Une narine", "Les deux"] },
      { id: "ep2_post", label: "Saignement postérieur", type: "boolean",
        question: "Le sang coule-t-il beaucoup dans la gorge (vous devez l'avaler) ?" },
      { id: "ep2_abondance", label: "Abondance / retentissement", type: "boolean",
        question: "Est-ce abondant ou répété, avec pâleur ou malaise ?" },
      { id: "ep2_trauma", label: "Traumatisme / grattage", type: "boolean",
        question: "Y a-t-il eu un grattage ou un traumatisme du nez ?" },
      { id: "ep2_hta", label: "HTA", type: "boolean",
        question: "Avez-vous de l'hypertension artérielle ?" },
      { id: "ep2_anticoag", label: "Anticoagulants / AINS", type: "boolean",
        question: "Prenez-vous des anticoagulants, de l'aspirine ou des anti-inflammatoires ?" },
      { id: "ep2_unilat_recid", label: "Unilatéral récidivant + obstruction", type: "boolean",
        question: "Avez-vous des saignements répétés toujours de la même narine, avec le nez bouché de ce côté ?" },
      { id: "ep2_telangiec", label: "Rendu-Osler", type: "boolean",
        question: "Avez-vous de petites taches rouges (vaisseaux dilatés) sur les lèvres/la langue/les doigts, ou des cas familiaux de saignements de nez ?" }
    ],
    red_flags: [
      { id: "ep2_rf_hemorr", niveau: 3,
        when: { any: [{ q: "ep2_post", eq: true }, { q: "ep2_abondance", eq: true }] },
        message_medecin: "Épistaxis postérieure / abondante avec retentissement : urgence (méchage, contrôle hémodynamique, avis ORL).",
        message_patient: "Un saignement de nez abondant nécessite une évaluation médicale sans attendre." },
      { id: "ep2_rf_hemostase", niveau: 2,
        when: { q: "ep2_anticoag", eq: true },
        message_medecin: "Épistaxis sous anticoagulant / antiagrégant : évaluer l'hémostase, rechercher un surdosage.",
        message_patient: "Ce contexte nécessite un avis médical." },
      { id: "ep2_rf_tumeur", niveau: 2,
        when: { q: "ep2_unilat_recid", eq: true },
        message_medecin: "Épistaxis unilatérales répétées + obstruction nasale : éliminer une cause tumorale (avis ORL, nasofibroscopie).",
        message_patient: "Des saignements répétés du même côté nécessitent un avis ORL." }
    ],
    diagnostics_differentiels: [
      { id: "ep2_benigne", diagnostic: "Épistaxis bénigne antérieure (tache vasculaire)",
        arguments: [{ label: "traumatisme / grattage", w: 2, when: { q: "ep2_trauma", eq: true } },
                    { label: "unilatérale", w: 1, when: { q: "ep2_cote", eq: "Une narine" } }],
        examens_a_discuter: ["Compression bidigitale", "Cautérisation de la tache vasculaire"] },
      { id: "ep2_hemostase", diagnostic: "Épistaxis sur trouble de l'hémostase",
        arguments: [{ label: "anticoagulant / antiagrégant", w: 3, when: { q: "ep2_anticoag", eq: true } }],
        examens_a_discuter: ["Bilan d'hémostase", "NFS-plaquettes, INR si AVK"] },
      { id: "ep2_posterieure", diagnostic: "Épistaxis postérieure",
        arguments: [{ label: "saignement postérieur", w: 3, when: { q: "ep2_post", eq: true } },
                    { label: "HTA", w: 1, when: { q: "ep2_hta", eq: true } }],
        examens_a_discuter: ["Méchage postérieur", "Avis ORL, contrôle tensionnel"] },
      { id: "ep2_tumeur", diagnostic: "Cause tumorale",
        arguments: [{ label: "unilatérale récidivante + obstruction", w: 3, when: { q: "ep2_unilat_recid", eq: true } }],
        examens_a_discuter: ["Nasofibroscopie", "Imagerie"] }
    ],
    examens_clinique: [
      "Rhinoscopie antérieure (rechercher la tache vasculaire)",
      "Pression artérielle",
      "Recherche de pâleur / retentissement",
      "Examen cutanéo-muqueux (télangiectasies)"
    ]
  },

  // -------------------------------------------------------------------------
  // 30 — GRAIN DE BEAUTÉ (LÉSION MÉLANOCYTAIRE)
  // -------------------------------------------------------------------------
  grain_beaute: {
    id: "grain_beaute",
    symptome: "Grain de beauté suspect (lésion de la peau)",
    specialite: ["Dermatologie"],
    questions: [
      { id: "gr_nouveau", label: "Vilain petit canard", type: "boolean",
        question: "La lésion est-elle apparue récemment ou est-elle différente de vos autres grains de beauté ?" },
      { id: "gr_evolution", label: "Évolutivité (E)", type: "boolean",
        question: "A-t-elle changé récemment (taille, couleur, relief) ?" },
      { id: "gr_asymetrie", label: "ABCD", type: "boolean",
        question: "Est-elle asymétrique, avec des bords irréguliers et plusieurs couleurs ?" },
      { id: "gr_taille", label: "Diamètre > 6 mm", type: "boolean",
        question: "Mesure-t-elle plus de 6 mm (plus large qu'une gomme de crayon) ?" },
      { id: "gr_saignement", label: "Saignement / nodule", type: "boolean",
        question: "Saigne-t-elle spontanément, ou est-elle devenue un relief / une plaie ?" },
      { id: "gr_atcd", label: "ATCD de mélanome", type: "boolean",
        question: "Avez-vous des antécédents personnels ou familiaux de mélanome ?" },
      { id: "gr_phototype", label: "Phototype à risque", type: "boolean",
        question: "Avez-vous la peau claire, des coups de soleil, de nombreux grains de beauté ?" }
    ],
    red_flags: [
      { id: "gr_rf_melanome", niveau: 2,
        when: { any: [{ q: "gr_evolution", eq: true }, { q: "gr_asymetrie", eq: true }, { q: "gr_nouveau", eq: true }, { q: "gr_saignement", eq: true }] },
        message_medecin: "Lésion mélanocytaire évolutive/asymétrique (règle ABCDE) ou « vilain petit canard » : suspicion de mélanome → exérèse + histologie au moindre doute (ne pas faire de biopsie partielle).",
        message_patient: "Cette lésion mérite d'être montrée rapidement à un médecin pour examen." }
    ],
    diagnostics_differentiels: [
      { id: "gr_melanome", diagnostic: "Mélanome (à éliminer)",
        arguments: [{ label: "asymétrie / bords / couleurs (ABCD)", w: 3, when: { q: "gr_asymetrie", eq: true } },
                    { label: "évolutivité (E)", w: 3, when: { q: "gr_evolution", eq: true } },
                    { label: "« vilain petit canard »", w: 2, when: { q: "gr_nouveau", eq: true } },
                    { label: "diamètre > 6 mm", w: 1, when: { q: "gr_taille", eq: true } },
                    { label: "saignement / nodule", w: 2, when: { q: "gr_saignement", eq: true } }],
        examens_a_discuter: ["Dermoscopie", "Exérèse complète + examen histologique"] },
      { id: "gr_nevus", diagnostic: "Nævus banal",
        arguments: [{ label: "lésion stable et symétrique", w: 2, when: { all: [{ not: { q: "gr_evolution", eq: true } }, { not: { q: "gr_asymetrie", eq: true } }] } }],
        examens_a_discuter: ["Surveillance, photographie de suivi", "Réévaluation en cas de changement"] }
    ],
    examens_clinique: [
      "Examen de TOUTE la peau (règle ABCDE)",
      "Dermoscopie",
      "Comparaison aux autres nævus (« vilain petit canard »)",
      "Palpation des aires ganglionnaires de drainage"
    ]
  },

  // -------------------------------------------------------------------------
  // 16 — DOULEURS DU MEMBRE INFÉRIEUR
  // -------------------------------------------------------------------------
  douleur_mi: {
    id: "douleur_mi",
    symptome: "Douleur de la jambe (membre inférieur)",
    specialite: ["Vasculaire", "Rhumatologie", "Neurologie"],
    questions: [
      { id: "mi_type", label: "Circonstances", type: "single_choice",
        question: "Quand la douleur survient-elle ?",
        options: ["À la marche, soulagée à l'arrêt", "Permanente / brutale", "En position assise ou penché en avant elle est soulagée"] },
      { id: "mi_brutal", label: "Ischémie aiguë", type: "boolean",
        question: "Est-elle apparue brutalement, avec une jambe froide, pâle, sans pouls ?" },
      { id: "mi_froid", label: "Froideur / pâleur", type: "boolean",
        question: "La jambe est-elle froide ou pâle ?" },
      { id: "mi_mollet", label: "Signes de TVP", type: "boolean",
        question: "Avez-vous un mollet gonflé, chaud et douloureux d'un seul côté ?" },
      { id: "mi_radiculaire", label: "Trajet radiculaire", type: "boolean",
        question: "La douleur suit-elle un trajet (fesse → cuisse → mollet ou pied) ?" },
      { id: "mi_fdr", label: "Facteurs de risque", type: "boolean",
        question: "Avez-vous des facteurs de risque (tabac, diabète) ou un contexte récent (immobilisation, chirurgie, cancer) ?" },
      { id: "mi_dispro", label: "Douleur disproportionnée + sepsis", type: "boolean",
        question: "La douleur est-elle énorme par rapport à l'aspect de la peau, avec fièvre ou malaise ?" }
    ],
    red_flags: [
      { id: "mi_rf_ischemie", niveau: 3,
        when: { any: [{ q: "mi_brutal", eq: true }, { q: "mi_froid", eq: true }] },
        message_medecin: "Ischémie aiguë de membre (5 P : douleur, pâleur, abolition des pouls, paresthésies, paralysie) : URGENCE de revascularisation (appeler le 15).",
        message_patient: "Une jambe brutalement froide et douloureuse nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "mi_rf_fasciite", niveau: 3,
        when: { q: "mi_dispro", eq: true },
        message_medecin: "Douleur disproportionnée + sepsis : fasciite nécrosante à éliminer (urgence chirurgicale).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "mi_rf_tvp", niveau: 2,
        when: { q: "mi_mollet", eq: true },
        message_medecin: "Tableau de TVP (mollet gonflé, chaud, douloureux) : écho-doppler (risque d'embolie pulmonaire).",
        message_patient: "Ce tableau nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "mi_ischemie", diagnostic: "Ischémie aiguë de membre",
        arguments: [{ label: "début brutal", w: 3, when: { q: "mi_brutal", eq: true } },
                    { label: "froideur / pâleur", w: 2, when: { q: "mi_froid", eq: true } }],
        examens_a_discuter: ["Palpation des pouls", "Avis chirurgical vasculaire urgent"] },
      { id: "mi_tvp", diagnostic: "Thrombose veineuse profonde (TVP)",
        arguments: [{ label: "mollet gonflé/chaud/douloureux", w: 3, when: { q: "mi_mollet", eq: true } },
                    { label: "facteurs de risque", w: 1, when: { q: "mi_fdr", eq: true } }],
        examens_a_discuter: ["Score de Wells", "D-dimères / écho-doppler veineux"] },
      { id: "mi_aomi", diagnostic: "AOMI / claudication artérielle",
        arguments: [{ label: "douleur à la marche, périmètre fixe", w: 3, when: { q: "mi_type", eq: "À la marche, soulagée à l'arrêt" } },
                    { label: "facteurs de risque vasculaire", w: 1, when: { q: "mi_fdr", eq: true } }],
        examens_a_discuter: ["Palpation des pouls périphériques", "Index de pression systolique (IPS)"] },
      { id: "mi_radiculalgie", diagnostic: "Sciatique / cruralgie",
        arguments: [{ label: "trajet radiculaire", w: 3, when: { q: "mi_radiculaire", eq: true } }],
        examens_a_discuter: ["Examen neurologique (Lasègue)"] },
      { id: "mi_canal", diagnostic: "Canal lombaire étroit (claudication neurogène)",
        arguments: [{ label: "soulagée à la flexion / assis", w: 3, when: { q: "mi_type", eq: "En position assise ou penché en avant elle est soulagée" } }],
        examens_a_discuter: ["Imagerie rachidienne (IRM)"] }
    ],
    examens_clinique: [
      "Palpation des pouls périphériques",
      "Température et coloration du membre",
      "Mesure comparative des mollets",
      "Manœuvre de Lasègue",
      "Index de pression systolique si claudication"
    ]
  },

  // -------------------------------------------------------------------------
  // 22 — DYSPNÉE CHRONIQUE
  // -------------------------------------------------------------------------
  dyspnee_chronique: {
    id: "dyspnee_chronique",
    symptome: "Essoufflement chronique (dyspnée chronique)",
    specialite: ["Pneumologie", "Cardiologie"],
    questions: [
      { id: "dc_effort", label: "Niveau d'effort", type: "single_choice",
        question: "À quel moment êtes-vous essoufflé ?",
        options: ["Pour des efforts importants", "Pour des efforts modérés (marche, escaliers)", "Au moindre effort ou au repos"] },
      { id: "dc_orthopnee", label: "Orthopnée / DPN", type: "boolean",
        question: "Êtes-vous gêné pour respirer allongé, ou réveillé la nuit par un essoufflement ?" },
      { id: "dc_oedeme", label: "Œdèmes / prise de poids", type: "boolean",
        question: "Avez-vous les jambes gonflées (œdèmes) ou pris du poids récemment ?" },
      { id: "dc_tabac", label: "Tabac + toux chronique", type: "boolean",
        question: "Fumez-vous, avec une toux et des crachats chroniques ?" },
      { id: "dc_sibilants", label: "Sibilants variables", type: "boolean",
        question: "Avez-vous des sifflements respiratoires variables (parfois mieux, parfois moins bien) ?" },
      { id: "dc_crepitants", label: "Toux sèche progressive", type: "boolean",
        question: "Avez-vous une toux sèche persistante qui s'aggrave progressivement ?" },
      { id: "dc_anemie", label: "Anémie / autre", type: "boolean",
        question: "Êtes-vous pâle et fatigué ?" },
      { id: "dc_progression", label: "Aggravation rapide", type: "boolean",
        question: "L'essoufflement s'aggrave-t-il rapidement ces dernières semaines ?" }
    ],
    red_flags: [
      { id: "dc_rf_progression", niveau: 2,
        when: { any: [{ q: "dc_progression", eq: true }, { q: "dc_effort", eq: "Au moindre effort ou au repos" }] },
        message_medecin: "Dyspnée chronique rapidement progressive ou au repos : éliminer fibrose, néoplasie, HTAP ou décompensation cardiaque → avis rapide.",
        message_patient: "Un essoufflement qui s'aggrave nécessite un avis médical rapide." },
      { id: "dc_rf_ic", niveau: 2,
        when: { all: [{ q: "dc_orthopnee", eq: true }, { q: "dc_oedeme", eq: true }] },
        message_medecin: "Signes d'insuffisance cardiaque (orthopnée + œdèmes) : évaluation cardiologique (BNP, échocardiographie).",
        message_patient: "Ces signes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "dc_ic", diagnostic: "Insuffisance cardiaque",
        arguments: [{ label: "orthopnée / dyspnée paroxystique nocturne", w: 3, when: { q: "dc_orthopnee", eq: true } },
                    { label: "œdèmes des membres inférieurs", w: 2, when: { q: "dc_oedeme", eq: true } }],
        examens_a_discuter: ["BNP / NT-proBNP", "ECG, échocardiographie"] },
      { id: "dc_bpco", diagnostic: "BPCO",
        arguments: [{ label: "tabac + toux/expectoration chronique", w: 3, when: { q: "dc_tabac", eq: true } }],
        examens_a_discuter: ["EFR (trouble ventilatoire obstructif non réversible)", "Radiographie thoracique"] },
      { id: "dc_asthme", diagnostic: "Asthme",
        arguments: [{ label: "sibilants variables", w: 3, when: { q: "dc_sibilants", eq: true } }],
        examens_a_discuter: ["EFR avec test de réversibilité"] },
      { id: "dc_pid", diagnostic: "Pneumopathie interstitielle / fibrose",
        arguments: [{ label: "toux sèche progressive", w: 3, when: { q: "dc_crepitants", eq: true } }],
        examens_a_discuter: ["TDM thoracique", "EFR, auscultation (crépitants velcro)"] },
      { id: "dc_autre", diagnostic: "Cause non cardio-pulmonaire (anémie, thyroïde, déconditionnement)",
        arguments: [{ label: "pâleur / fatigue", w: 2, when: { q: "dc_anemie", eq: true } }],
        examens_a_discuter: ["NFS", "TSH"] }
    ],
    examens_clinique: [
      "Auscultation cardiaque et pulmonaire (crépitants, sibilants)",
      "Recherche d'œdèmes des membres inférieurs",
      "SpO2",
      "Recherche d'un hippocratisme digital",
      "Poids, fréquence cardiaque et respiratoire"
    ]
  },

  // -------------------------------------------------------------------------
  // 15 — DORSALGIES
  // -------------------------------------------------------------------------
  dorsalgie: {
    id: "dorsalgie",
    symptome: "Douleur du milieu du dos (dorsalgie)",
    specialite: ["Rhumatologie"],
    questions: [
      { id: "do_horaire", label: "Rythme", type: "single_choice",
        question: "Quand la douleur est-elle la plus forte ?",
        options: ["À l'effort, le soir (mécanique)", "La nuit / au réveil avec raideur (inflammatoire)"] },
      { id: "do_transfixiante", label: "Douleur transfixiante", type: "boolean",
        question: "Avez-vous une douleur intense qui traverse vers la poitrine ou le ventre, ou un essoufflement ?" },
      { id: "do_neuro", label: "Compression médullaire", type: "boolean",
        question: "Avez-vous une faiblesse des jambes ou des troubles pour uriner ?" },
      { id: "do_fievre", label: "Fièvre / AEG / cancer", type: "boolean",
        question: "Avez-vous de la fièvre, ou un cancer connu / un amaigrissement ?" },
      { id: "do_repas", label: "Douleur viscérale projetée", type: "boolean",
        question: "La douleur est-elle liée aux repas ou à la position (estomac, pancréas) ?" },
      { id: "do_permanente", label: "Douleur non mécanique", type: "boolean",
        question: "Est-elle permanente, non soulagée par le repos ?" },
      { id: "do_trauma", label: "Contexte fracturaire", type: "boolean",
        question: "Y a-t-il eu un traumatisme, ou avez-vous de l'ostéoporose ?" }
    ],
    red_flags: [
      { id: "do_rf_vital", niveau: 3,
        when: { q: "do_transfixiante", eq: true },
        message_medecin: "Dorsalgie transfixiante : éliminer un IDM, une dissection aortique, une pancréatite (urgence).",
        message_patient: "Cette douleur nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "do_rf_medullaire", niveau: 3,
        when: { q: "do_neuro", eq: true },
        message_medecin: "Signes de compression médullaire dorsale : urgence (IRM).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "do_rf_infect", niveau: 2,
        when: { all: [{ q: "do_fievre", eq: true }, { q: "do_horaire", eq: "La nuit / au réveil avec raideur (inflammatoire)" }] },
        message_medecin: "Dorsalgie inflammatoire fébrile / AEG : spondylodiscite ou tumeur à éliminer.",
        message_patient: "Ces éléments nécessitent un avis médical rapide." },
      { id: "do_rf_tassement", niveau: 2,
        when: { q: "do_trauma", eq: true },
        message_medecin: "Contexte de tassement vertébral (traumatisme, ostéoporose) : imagerie.",
        message_patient: "Ce contexte nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "do_fonctionnelle", diagnostic: "Dorsalgie statique / fonctionnelle",
        arguments: [{ label: "rythme mécanique", w: 3, when: { q: "do_horaire", eq: "À l'effort, le soir (mécanique)" } }],
        examens_a_discuter: ["Correction posturale", "Traitement symptomatique"] },
      { id: "do_tassement", diagnostic: "Tassement vertébral",
        arguments: [{ label: "contexte traumatique / ostéoporose", w: 3, when: { q: "do_trauma", eq: true } }],
        examens_a_discuter: ["Radiographie du rachis dorsal"] },
      { id: "do_symptomatique", diagnostic: "Dorsalgie symptomatique (spondylodiscite, tumeur)",
        arguments: [{ label: "fièvre / AEG", w: 3, when: { q: "do_fievre", eq: true } },
                    { label: "douleur permanente non mécanique", w: 2, when: { q: "do_permanente", eq: true } }],
        examens_a_discuter: ["VS / CRP", "IRM rachidienne"] },
      { id: "do_viscerale", diagnostic: "Douleur projetée viscérale (cardiaque, aortique, pancréatique)",
        arguments: [{ label: "douleur transfixiante", w: 3, when: { q: "do_transfixiante", eq: true } },
                    { label: "lien avec les repas / position", w: 2, when: { q: "do_repas", eq: true } }],
        examens_a_discuter: ["ECG, lipase", "Angioscanner aortique selon contexte"] }
    ],
    examens_clinique: [
      "ECG si suspicion de cause cardiaque",
      "Palpation / percussion du rachis dorsal",
      "Examen neurologique des membres inférieurs",
      "Palpation abdominale",
      "Pression artérielle aux deux bras"
    ]
  },

  // -------------------------------------------------------------------------
  // 17 — DOULEURS DU MEMBRE SUPÉRIEUR
  // -------------------------------------------------------------------------
  douleur_ms: {
    id: "douleur_ms",
    symptome: "Douleur du bras (membre supérieur)",
    specialite: ["Rhumatologie", "Neurologie", "Vasculaire"],
    questions: [
      { id: "ms_cardiaque", label: "Douleur cardiaque projetée", type: "boolean",
        question: "La douleur touche-t-elle le bras gauche, à l'effort, avec un serrement ou une oppression ?" },
      { id: "ms_epaule", label: "Pathologie d'épaule", type: "boolean",
        question: "La douleur est-elle dans l'épaule, gênant les mouvements, parfois la nuit ?" },
      { id: "ms_radiculaire", label: "Névralgie cervico-brachiale", type: "boolean",
        question: "La douleur suit-elle un trajet du cou vers la main ?" },
      { id: "ms_canal", label: "Canal carpien", type: "boolean",
        question: "Avez-vous des fourmillements des 3 premiers doigts qui vous réveillent la nuit ?" },
      { id: "ms_oedeme", label: "TVP du membre supérieur", type: "boolean",
        question: "Avez-vous le bras gonflé, lourd, avec des veines apparentes ?" },
      { id: "ms_deficit", label: "Déficit moteur", type: "boolean",
        question: "Avez-vous une faiblesse de la main ou du bras ?" }
    ],
    red_flags: [
      { id: "ms_rf_sca", niveau: 3,
        when: { q: "ms_cardiaque", eq: true },
        message_medecin: "Douleur du bras gauche d'effort / constrictive : éliminer un syndrome coronarien (ECG, troponine).",
        message_patient: "Cette douleur nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ms_rf_tvp", niveau: 2,
        when: { q: "ms_oedeme", eq: true },
        message_medecin: "Œdème du membre supérieur : TVP (cathéter, effort) → écho-doppler (risque d'embolie pulmonaire).",
        message_patient: "Ce gonflement du bras nécessite un avis médical rapide." },
      { id: "ms_rf_deficit", niveau: 2,
        when: { q: "ms_deficit", eq: true },
        message_medecin: "Déficit moteur : avis (atteinte radiculaire / médullaire).",
        message_patient: "Une faiblesse du bras nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ms_epaule", diagnostic: "Pathologie d'épaule (tendinopathie, capsulite)",
        arguments: [{ label: "douleur d'épaule mécanique/nocturne", w: 3, when: { q: "ms_epaule", eq: true } }],
        examens_a_discuter: ["Examen de l'épaule", "Échographie / radiographie"] },
      { id: "ms_ncb", diagnostic: "Névralgie cervico-brachiale",
        arguments: [{ label: "douleur radiculaire", w: 3, when: { q: "ms_radiculaire", eq: true } },
                    { label: "déficit", w: 1, when: { q: "ms_deficit", eq: true } }],
        examens_a_discuter: ["Examen neurologique du membre supérieur"] },
      { id: "ms_canal", diagnostic: "Syndrome du canal carpien",
        arguments: [{ label: "paresthésies nocturnes des 3 premiers doigts", w: 3, when: { q: "ms_canal", eq: true } }],
        examens_a_discuter: ["Tinel / Phalen", "EMG"] },
      { id: "ms_cardiaque", diagnostic: "Douleur cardiaque projetée (SCA)",
        arguments: [{ label: "bras gauche + effort + constriction", w: 3, when: { q: "ms_cardiaque", eq: true } }],
        examens_a_discuter: ["ECG", "Troponine"] },
      { id: "ms_tvp", diagnostic: "TVP du membre supérieur",
        arguments: [{ label: "œdème + circulation collatérale", w: 3, when: { q: "ms_oedeme", eq: true } }],
        examens_a_discuter: ["Écho-doppler veineux"] }
    ],
    examens_clinique: [
      "Examen de l'épaule (mobilité, manœuvres de la coiffe)",
      "Examen neurologique du membre supérieur",
      "Manœuvres de Tinel / Phalen",
      "Palpation comparative des deux bras (œdème, chaleur)",
      "ECG en cas de doute cardiaque"
    ]
  },

  // -------------------------------------------------------------------------
  // 14 — DIPLOPIE
  // -------------------------------------------------------------------------
  diplopie: {
    id: "diplopie",
    symptome: "Vision double (diplopie)",
    specialite: ["Neurologie", "Ophtalmologie"],
    questions: [
      { id: "di_binoc", label: "Binoculaire", type: "boolean",
        question: "La vision double disparaît-elle quand vous fermez un œil ?" },
      { id: "di_install", label: "Installation", type: "single_choice",
        question: "Comment est-ce apparu ?",
        options: ["Brutalement", "Progressivement"] },
      { id: "di_fluctuant", label: "Fluctuation (myasthénie)", type: "boolean",
        question: "La gêne varie-t-elle, plus marquée le soir ou à la fatigue ?" },
      { id: "di_douleur", label: "Douleur péri-orbitaire", type: "boolean",
        question: "Avez-vous une douleur autour de l'œil ou des maux de tête ?" },
      { id: "di_ptosis", label: "Ptosis / mydriase (III)", type: "boolean",
        question: "Avez-vous une paupière tombante et/ou une pupille dilatée d'un côté ?" },
      { id: "di_neuro", label: "Signes du tronc", type: "boolean",
        question: "Avez-vous d'autres signes neurologiques (vertige, faiblesse, trouble de la parole) ?" },
      { id: "di_horton", label: "Horton", type: "boolean",
        question: "Avez-vous plus de 50 ans avec une douleur de la tempe/mâchoire ou une altération de l'état général ?" },
      { id: "di_thyroide", label: "Orbitopathie", type: "boolean",
        question: "Avez-vous les yeux globuleux (qui sortent) ou des signes thyroïdiens ?" }
    ],
    red_flags: [
      { id: "di_rf_anevrisme", niveau: 3,
        when: { all: [{ q: "di_douleur", eq: true }, { q: "di_ptosis", eq: true }] },
        message_medecin: "Paralysie du III douloureuse avec mydriase : anévrisme (communicante postérieure) jusqu'à preuve du contraire → imagerie cérébrale urgente.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "di_rf_horton", niveau: 3,
        when: { q: "di_horton", eq: true },
        message_medecin: "Diplopie + céphalée / AEG après 50 ans : maladie de Horton (risque de cécité) → VS/CRP en urgence, corticothérapie si forte suspicion.",
        message_patient: "Ces signes nécessitent une évaluation médicale sans attendre." },
      { id: "di_rf_avc", niveau: 3,
        when: { q: "di_neuro", eq: true },
        message_medecin: "Diplopie + autres signes du tronc cérébral : AVC à éliminer (urgence).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "di_iii", diagnostic: "Paralysie du III (oculomoteur)",
        arguments: [{ label: "ptosis + mydriase", w: 3, when: { q: "di_ptosis", eq: true } },
                    { label: "douleur (anévrisme)", w: 1, when: { q: "di_douleur", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale (anévrisme si douloureux/mydriase)", "Glycémie (cause ischémique si mydriase respectée)"] },
      { id: "di_oculo", diagnostic: "Paralysie oculomotrice (IV / VI)",
        arguments: [{ label: "diplopie binoculaire", w: 2, when: { q: "di_binoc", eq: true } },
                    { label: "installation brutale", w: 1, when: { q: "di_install", eq: "Brutalement" } }],
        examens_a_discuter: ["Recherche d'HTIC", "Imagerie cérébrale"] },
      { id: "di_myasthenie", diagnostic: "Myasthénie",
        arguments: [{ label: "diplopie fluctuante à la fatigue", w: 3, when: { q: "di_fluctuant", eq: true } }],
        examens_a_discuter: ["Test au glaçon", "Anticorps anti-RACh, avis neurologique"] },
      { id: "di_thyroide", diagnostic: "Orbitopathie dysthyroïdienne",
        arguments: [{ label: "exophtalmie / signes thyroïdiens", w: 3, when: { q: "di_thyroide", eq: true } }],
        examens_a_discuter: ["TSH, anticorps", "Imagerie orbitaire"] }
    ],
    examens_clinique: [
      "Test d'occlusion alternée (mono- vs binoculaire)",
      "Examen des paires crâniennes (III, IV, VI)",
      "Recherche d'un ptosis / d'une mydriase",
      "Palpation des artères temporales",
      "Examen thyroïdien et oculaire (exophtalmie)"
    ]
  },

  // -------------------------------------------------------------------------
  // 20 — DYSPHONIE
  // -------------------------------------------------------------------------
  dysphonie: {
    id: "dysphonie",
    symptome: "Voix enrouée (dysphonie)",
    specialite: ["ORL"],
    questions: [
      { id: "dp_duree", label: "Ancienneté", type: "single_choice",
        question: "Depuis combien de temps ?",
        options: ["Moins de 3 semaines", "Plus de 3 semaines"] },
      { id: "dp_tabac", label: "Tabac / alcool", type: "boolean",
        question: "Fumez-vous et/ou buvez-vous de l'alcool régulièrement ?" },
      { id: "dp_fievre", label: "Contexte infectieux", type: "boolean",
        question: "Y a-t-il eu un rhume ou une laryngite récente ?" },
      { id: "dp_chirurgie", label: "Chirurgie cervico-thoracique / goitre", type: "boolean",
        question: "Avez-vous eu une chirurgie du cou ou du thorax récente, ou un goitre ?" },
      { id: "dp_faussesroutes", label: "Voix bitonale / fausses routes", type: "boolean",
        question: "Avez-vous des fausses routes (vous avalez de travers) ou une voix « bitonale » ?" },
      { id: "dp_dyspnee", label: "Dyspnée laryngée", type: "boolean",
        question: "Avez-vous une gêne respiratoire associée ?" },
      { id: "dp_forcage", label: "Forçage vocal", type: "boolean",
        question: "Forcez-vous beaucoup sur votre voix (métier de la voix) ?" }
    ],
    red_flags: [
      { id: "dp_rf_dyspnee", niveau: 3,
        when: { q: "dp_dyspnee", eq: true },
        message_medecin: "Dyspnée laryngée associée à la dysphonie : urgence (obstruction des voies aériennes).",
        message_patient: "Une gêne respiratoire nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "dp_rf_cancer", niveau: 2,
        when: { all: [{ q: "dp_duree", eq: "Plus de 3 semaines" }, { q: "dp_tabac", eq: true }] },
        message_medecin: "Dysphonie > 3 semaines chez un fumeur/buveur : cancer du larynx → laryngoscopie IMPÉRATIVE.",
        message_patient: "Une voix enrouée qui dure nécessite un examen ORL." },
      { id: "dp_rf_recurrentielle", niveau: 2,
        when: { q: "dp_faussesroutes", eq: true },
        message_medecin: "Voix bitonale + fausses routes : paralysie récurrentielle (cause médiastinale / thyroïdienne / néoplasique) → exploration.",
        message_patient: "Ces signes nécessitent un avis ORL." }
    ],
    diagnostics_differentiels: [
      { id: "dp_laryngite", diagnostic: "Laryngite aiguë",
        arguments: [{ label: "contexte infectieux", w: 3, when: { q: "dp_fievre", eq: true } },
                    { label: "durée < 3 semaines", w: 1, when: { q: "dp_duree", eq: "Moins de 3 semaines" } }],
        examens_a_discuter: ["Régression attendue < 1 semaine", "Repos vocal, traitement symptomatique"] },
      { id: "dp_cancer", diagnostic: "Cancer du larynx",
        arguments: [{ label: "tabac / alcool", w: 3, when: { q: "dp_tabac", eq: true } },
                    { label: "durée > 3 semaines", w: 2, when: { q: "dp_duree", eq: "Plus de 3 semaines" } }],
        examens_a_discuter: ["Laryngoscopie impérative"] },
      { id: "dp_recurrentielle", diagnostic: "Paralysie récurrentielle",
        arguments: [{ label: "voix bitonale / fausses routes", w: 3, when: { q: "dp_faussesroutes", eq: true } },
                    { label: "chirurgie cervico-thoracique / goitre", w: 2, when: { q: "dp_chirurgie", eq: true } }],
        examens_a_discuter: ["Laryngoscopie", "Imagerie du trajet récurrentiel"] },
      { id: "dp_forcage", diagnostic: "Forçage vocal / nodules",
        arguments: [{ label: "malmenage vocal", w: 3, when: { q: "dp_forcage", eq: true } }],
        examens_a_discuter: ["Laryngoscopie", "Rééducation vocale (orthophonie)"] }
    ],
    examens_clinique: [
      "Laryngoscopie (impérative si > 3 semaines)",
      "Palpation cervicale (goitre, adénopathies)",
      "Examen de la déglutition",
      "Recherche de dyspnée laryngée"
    ]
  },

  // -------------------------------------------------------------------------
  // 24 — ÉCOULEMENT URÉTRAL MASCULIN
  // -------------------------------------------------------------------------
  ecoulement_uretral: {
    id: "ecoulement_uretral",
    symptome: "Écoulement par la verge (urétrite)",
    specialite: ["Urologie", "IST"],
    questions: [
      { id: "eu_aspect", label: "Aspect", type: "single_choice",
        question: "Quel est l'aspect de l'écoulement ?",
        options: ["Purulent, jaune-verdâtre, abondant", "Clair ou peu abondant", "Je ne sais pas"] },
      { id: "eu_brulures", label: "Dysurie", type: "boolean",
        question: "Avez-vous des brûlures en urinant ?" },
      { id: "eu_partenaire", label: "Rapport à risque", type: "boolean",
        question: "Avez-vous eu des rapports non protégés ou un nouveau partenaire récemment ?" },
      { id: "eu_arthrite", label: "Sd de Fiessinger-Leroy-Reiter", type: "boolean",
        question: "Avez-vous des douleurs articulaires ou une conjonctivite associées ?" },
      { id: "eu_testicule", label: "Complication", type: "boolean",
        question: "Avez-vous une douleur ou un gonflement d'un testicule, ou de la fièvre ?" }
    ],
    red_flags: [
      { id: "eu_rf_complication", niveau: 2,
        when: { q: "eu_testicule", eq: true },
        message_medecin: "Orchi-épididymite / prostatite associée : avis rapide, antibiothérapie adaptée.",
        message_patient: "Ces signes nécessitent un avis médical rapide." },
      { id: "eu_rf_dissemination", niveau: 2,
        when: { q: "eu_arthrite", eq: true },
        message_medecin: "Dissémination gonococcique (arthrite, dermatite) : avis spécialisé.",
        message_patient: "Ces signes nécessitent un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "eu_gono", diagnostic: "Urétrite gonococcique",
        arguments: [{ label: "écoulement purulent abondant", w: 3, when: { q: "eu_aspect", eq: "Purulent, jaune-verdâtre, abondant" } }],
        examens_a_discuter: ["PCR / culture gonocoque", "Traitement minute (ceftriaxone)"] },
      { id: "eu_chlam", diagnostic: "Urétrite à Chlamydia / mycoplasme",
        arguments: [{ label: "écoulement clair / modéré", w: 3, when: { q: "eu_aspect", eq: "Clair ou peu abondant" } }],
        examens_a_discuter: ["PCR Chlamydia / mycoplasme", "Doxycycline"] },
      { id: "eu_coinf", diagnostic: "Co-infection (traitement probabiliste)",
        arguments: [{ label: "rapport à risque", w: 2, when: { q: "eu_partenaire", eq: true } }],
        examens_a_discuter: ["Traiter gonocoque + Chlamydia", "Dépistage des partenaires + IST (VIH, syphilis)"] }
    ],
    examens_clinique: [
      "Examen des organes génitaux externes",
      "Prélèvement urétral / PCR sur 1er jet d'urine",
      "Dépistage des autres IST",
      "Examen articulaire et cutané si signes de dissémination"
    ]
  },

  // -------------------------------------------------------------------------
  // 29 — GOITRE
  // -------------------------------------------------------------------------
  goitre: {
    id: "goitre",
    symptome: "Goitre / nodule de la thyroïde",
    specialite: ["Endocrinologie"],
    questions: [
      { id: "go_nodulaire", label: "Nodulaire vs diffus", type: "boolean",
        question: "Sentez-vous un nodule dur, plutôt qu'un gonflement diffus du cou ?" },
      { id: "go_croissance", label: "Croissance rapide", type: "boolean",
        question: "Augmente-t-il rapidement de taille ?" },
      { id: "go_compressif", label: "Signes compressifs", type: "boolean",
        question: "Avez-vous une gêne pour avaler, pour respirer, ou une voix modifiée ?" },
      { id: "go_hyper", label: "Hyperthyroïdie", type: "boolean",
        question: "Avez-vous : amaigrissement, cœur rapide, tremblements, intolérance à la chaleur ?" },
      { id: "go_hypo", label: "Hypothyroïdie", type: "boolean",
        question: "Avez-vous : frilosité, prise de poids, fatigue, constipation ?" },
      { id: "go_exophtalmie", label: "Exophtalmie (Basedow)", type: "boolean",
        question: "Avez-vous les yeux globuleux (qui sortent) ?" },
      { id: "go_adp", label: "Adénopathie", type: "boolean",
        question: "Avez-vous un ganglion dur dans le cou ?" },
      { id: "go_dur_fixe", label: "Nodule dur fixé", type: "boolean",
        question: "Le nodule est-il dur et fixé (il ne bouge pas) ?" }
    ],
    red_flags: [
      { id: "go_rf_compressif", niveau: 2,
        when: { q: "go_compressif", eq: true },
        message_medecin: "Goitre compressif (dyspnée, dysphagie, dysphonie) : avis rapide + imagerie.",
        message_patient: "Une gêne pour avaler ou respirer nécessite un avis médical rapide." },
      { id: "go_rf_cancer", niveau: 2,
        when: { any: [{ all: [{ q: "go_dur_fixe", eq: true }, { q: "go_adp", eq: true }] }, { all: [{ q: "go_nodulaire", eq: true }, { q: "go_croissance", eq: true }] }] },
        message_medecin: "Signes d'orientation maligne (nodule dur fixé, ADP, croissance rapide, dysphonie) : échographie EU-TIRADS + cytoponction.",
        message_patient: "Ces caractéristiques nécessitent un avis médical et des examens." },
      { id: "go_rf_cardiothyreose", niveau: 2,
        when: { q: "go_hyper", eq: true },
        message_medecin: "Hyperthyroïdie (risque de cardiothyréose) : bilan thyroïdien (TSH), ECG.",
        message_patient: "Ces signes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "go_simple", diagnostic: "Goitre simple / multinodulaire euthyroïdien",
        arguments: [{ label: "diffus, sans dysthyroïdie", w: 2, when: { all: [{ not: { q: "go_hyper", eq: true } }, { not: { q: "go_hypo", eq: true } }] } }],
        examens_a_discuter: ["TSH", "Échographie thyroïdienne"] },
      { id: "go_basedow", diagnostic: "Maladie de Basedow",
        arguments: [{ label: "exophtalmie", w: 3, when: { q: "go_exophtalmie", eq: true } },
                    { label: "hyperthyroïdie", w: 2, when: { q: "go_hyper", eq: true } }],
        examens_a_discuter: ["TSH basse, T4L", "Anticorps anti-récepteur de la TSH"] },
      { id: "go_hashimoto", diagnostic: "Thyroïdite de Hashimoto",
        arguments: [{ label: "hypothyroïdie", w: 3, when: { q: "go_hypo", eq: true } }],
        examens_a_discuter: ["TSH élevée", "Anticorps anti-TPO"] },
      { id: "go_cancer", diagnostic: "Cancer thyroïdien",
        arguments: [{ label: "nodule dur fixé", w: 3, when: { q: "go_dur_fixe", eq: true } },
                    { label: "adénopathie", w: 2, when: { q: "go_adp", eq: true } },
                    { label: "croissance rapide", w: 1, when: { q: "go_croissance", eq: true } }],
        examens_a_discuter: ["Échographie EU-TIRADS", "Cytoponction"] }
    ],
    examens_clinique: [
      "Palpation thyroïdienne (consistance, nodules, mobilité)",
      "Auscultation thyroïdienne (souffle / thrill)",
      "Recherche d'adénopathies cervicales",
      "Recherche de signes de dysthyroïdie",
      "TSH"
    ]
  },

  // -------------------------------------------------------------------------
  // 12 — DIARRHÉE CHRONIQUE
  // -------------------------------------------------------------------------
  diarrhee_chronique: {
    id: "diarrhee_chronique",
    symptome: "Diarrhée qui dure (diarrhée chronique)",
    specialite: ["Digestif"],
    questions: [
      { id: "dch_grasses", label: "Stéatorrhée", type: "boolean",
        question: "Les selles sont-elles grasses, mastic, et flottent / collent ?" },
      { id: "dch_sang", label: "Glairo-sanglantes", type: "boolean",
        question: "Y a-t-il du sang ou des glaires dans les selles ?" },
      { id: "dch_nocturne", label: "Organique / sécrétoire", type: "boolean",
        question: "La diarrhée vous réveille-t-elle la nuit, ou persiste-t-elle même en ne mangeant pas ?" },
      { id: "dch_amaigr", label: "AEG / carences", type: "boolean",
        question: "Avez-vous maigri, ou êtes-vous pâle / fatigué (carences) ?" },
      { id: "dch_thyroide", label: "Diarrhée motrice", type: "boolean",
        question: "Avez-vous un cœur rapide, des tremblements, ou des bouffées de chaleur ?" },
      { id: "dch_medic", label: "Médicaments / alcool", type: "boolean",
        question: "Prenez-vous des médicaments, ou buvez-vous de l'alcool de façon importante ?" },
      { id: "dch_postprandial", label: "Post-prandiale impérieuse", type: "boolean",
        question: "La diarrhée survient-elle surtout juste après les repas, de façon impérieuse ?" }
    ],
    red_flags: [
      { id: "dch_rf_aeg", niveau: 2,
        when: { q: "dch_amaigr", eq: true },
        message_medecin: "Diarrhée chronique + amaigrissement / syndrome carentiel : bilan organique (néoplasie, malabsorption).",
        message_patient: "Cette association nécessite un avis médical et un bilan." },
      { id: "dch_rf_sang", niveau: 2,
        when: { q: "dch_sang", eq: true },
        message_medecin: "Diarrhée glairo-sanglante chronique : MICI ou cancer à éliminer (coloscopie).",
        message_patient: "La présence de sang nécessite un avis médical et des examens." },
      { id: "dch_rf_organique", niveau: 2,
        when: { q: "dch_nocturne", eq: true },
        message_medecin: "Diarrhée nocturne persistant au jeûne : cause organique / sécrétoire à explorer.",
        message_patient: "Ce profil nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "dch_malabsorption", diagnostic: "Malabsorption (cœliaque, insuffisance pancréatique)",
        arguments: [{ label: "stéatorrhée", w: 3, when: { q: "dch_grasses", eq: true } },
                    { label: "amaigrissement / carences", w: 1, when: { q: "dch_amaigr", eq: true } }],
        examens_a_discuter: ["Sérologie maladie cœliaque", "Élastase fécale", "Bilan carentiel"] },
      { id: "dch_mici", diagnostic: "MICI (maladie inflammatoire de l'intestin)",
        arguments: [{ label: "diarrhée glairo-sanglante", w: 3, when: { q: "dch_sang", eq: true } }],
        examens_a_discuter: ["Calprotectine fécale", "Coloscopie + biopsies"] },
      { id: "dch_motrice", diagnostic: "Diarrhée motrice",
        arguments: [{ label: "post-prandiale impérieuse", w: 3, when: { q: "dch_postprandial", eq: true } },
                    { label: "signes d'hyperthyroïdie", w: 1, when: { q: "dch_thyroide", eq: true } }],
        examens_a_discuter: ["TSH", "Traitement symptomatique"] },
      { id: "dch_secretoire", diagnostic: "Cause sécrétoire / tumorale",
        arguments: [{ label: "persiste au jeûne / nocturne", w: 3, when: { q: "dch_nocturne", eq: true } }],
        examens_a_discuter: ["Bilan spécialisé (hormones)", "Coloscopie + biopsies étagées (colite microscopique)"] }
    ],
    examens_clinique: [
      "Poids, IMC, courbe de poids",
      "Recherche de carences (pâleur, œdèmes)",
      "Palpation abdominale",
      "Toucher rectal",
      "TSH"
    ]
  },

  // -------------------------------------------------------------------------
  // 37 — HÉPATOMÉGALIE
  // -------------------------------------------------------------------------
  hepatomegalie: {
    id: "hepatomegalie",
    symptome: "Gros foie (hépatomégalie)",
    specialite: ["Digestif", "Hépatologie"],
    questions: [
      { id: "hep_alcool", label: "Alcool / hépatite", type: "boolean",
        question: "Avez-vous une consommation d'alcool importante ou une hépatite connue ?" },
      { id: "hep_cardiaque", label: "Foie cardiaque", type: "boolean",
        question: "Avez-vous une insuffisance cardiaque, des jambes gonflées, ou un foie douloureux ?" },
      { id: "hep_cancer", label: "Contexte tumoral", type: "boolean",
        question: "Avez-vous un cancer connu, ou un amaigrissement / une altération de l'état général ?" },
      { id: "hep_ictere", label: "Ictère", type: "boolean",
        question: "Avez-vous la peau ou les yeux jaunes, ou des démangeaisons ?" },
      { id: "hep_htp", label: "Hypertension portale", type: "boolean",
        question: "Avez-vous le ventre gonflé (liquide) ou des vaisseaux visibles sur l'abdomen ?" },
      { id: "hep_metabolique", label: "Stéatose", type: "boolean",
        question: "Êtes-vous en surpoids, diabétique, ou avez-vous un excès de cholestérol ?" },
      { id: "hep_encephalo", label: "Encéphalopathie", type: "boolean",
        question: "Avez-vous une confusion ou une somnolence inhabituelle ?" }
    ],
    red_flags: [
      { id: "hep_rf_fulminante", niveau: 3,
        when: { all: [{ q: "hep_ictere", eq: true }, { q: "hep_encephalo", eq: true }] },
        message_medecin: "Ictère + encéphalopathie : hépatite fulminante possible → urgence (TP / facteur V).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "hep_rf_tumeur", niveau: 2,
        when: { q: "hep_cancer", eq: true },
        message_medecin: "Foie tumoral (CHC / métastases) à évoquer : imagerie + avis spécialisé.",
        message_patient: "Ce contexte nécessite un avis médical et des examens." },
      { id: "hep_rf_cardiaque", niveau: 2,
        when: { q: "hep_cardiaque", eq: true },
        message_medecin: "Foie cardiaque (insuffisance cardiaque droite) : évaluation cardiologique.",
        message_patient: "Ces signes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "hep_cirrhose", diagnostic: "Foie de cirrhose",
        arguments: [{ label: "signes d'hypertension portale", w: 3, when: { q: "hep_htp", eq: true } },
                    { label: "alcool / hépatite", w: 2, when: { q: "hep_alcool", eq: true } },
                    { label: "ictère", w: 1, when: { q: "hep_ictere", eq: true } }],
        examens_a_discuter: ["Bilan hépatique", "Échographie + élastométrie"] },
      { id: "hep_cardiaque", diagnostic: "Foie cardiaque",
        arguments: [{ label: "insuffisance cardiaque droite / reflux hépato-jugulaire", w: 3, when: { q: "hep_cardiaque", eq: true } }],
        examens_a_discuter: ["BNP, échocardiographie"] },
      { id: "hep_tumoral", diagnostic: "Foie tumoral (métastases / CHC)",
        arguments: [{ label: "contexte néoplasique / AEG", w: 3, when: { q: "hep_cancer", eq: true } }],
        examens_a_discuter: ["Imagerie (échographie / TDM)", "Alpha-fœtoprotéine"] },
      { id: "hep_steatose", diagnostic: "Stéatose hépatique",
        arguments: [{ label: "contexte métabolique", w: 3, when: { q: "hep_metabolique", eq: true } }],
        examens_a_discuter: ["Échographie", "Bilan métabolique"] }
    ],
    examens_clinique: [
      "Palpation hépatique (bord, consistance, surface)",
      "Recherche d'un reflux hépato-jugulaire",
      "Recherche d'ascite et de signes d'hypertension portale",
      "Recherche d'un ictère",
      "Bilan hépatique"
    ]
  },

  // -------------------------------------------------------------------------
  // 19 — DYSMÉNORRHÉE
  // -------------------------------------------------------------------------
  dysmenorrhee: {
    id: "dysmenorrhee",
    symptome: "Règles douloureuses (dysménorrhée)",
    specialite: ["Gynécologie"],
    questions: [
      { id: "dm_type", label: "Primaire vs secondaire", type: "single_choice",
        question: "Depuis quand avez-vous des règles douloureuses ?",
        options: ["Depuis les premières règles (adolescence)", "Apparues plus tard (secondairement)"] },
      { id: "dm_invalidante", label: "Invalidante", type: "boolean",
        question: "La douleur est-elle invalidante (arrêt d'activité, absentéisme) ?" },
      { id: "dm_dyspareunie", label: "Dyspareunie profonde", type: "boolean",
        question: "Avez-vous des douleurs profondes pendant les rapports ?" },
      { id: "dm_menorragies", label: "Ménorragies", type: "boolean",
        question: "Avez-vous des règles très abondantes ?" },
      { id: "dm_infertilite", label: "Infertilité", type: "boolean",
        question: "Avez-vous des difficultés à concevoir ?" },
      { id: "dm_ist", label: "Risque IST / DIU", type: "boolean",
        question: "Avez-vous un risque d'IST ou un stérilet (DIU) ?" }
    ],
    red_flags: [
      { id: "dm_rf_endometriose", niveau: 2,
        when: { all: [{ q: "dm_type", eq: "Apparues plus tard (secondairement)" }, { any: [{ q: "dm_dyspareunie", eq: true }, { q: "dm_infertilite", eq: true }] }] },
        message_medecin: "Dysménorrhée secondaire invalidante + dyspareunie / infertilité : endométriose jusqu'à preuve du contraire → avis gynécologique.",
        message_patient: "Ces éléments justifient un avis gynécologique." }
    ],
    diagnostics_differentiels: [
      { id: "dm_primaire", diagnostic: "Dysménorrhée primaire essentielle",
        arguments: [{ label: "début à l'adolescence", w: 3, when: { q: "dm_type", eq: "Depuis les premières règles (adolescence)" } }],
        examens_a_discuter: ["AINS, contraception œstroprogestative", "Réassurance"] },
      { id: "dm_endometriose", diagnostic: "Endométriose",
        arguments: [{ label: "dyspareunie profonde", w: 3, when: { q: "dm_dyspareunie", eq: true } },
                    { label: "douleur invalidante", w: 2, when: { q: "dm_invalidante", eq: true } },
                    { label: "infertilité", w: 2, when: { q: "dm_infertilite", eq: true } },
                    { label: "dysménorrhée secondaire", w: 1, when: { q: "dm_type", eq: "Apparues plus tard (secondairement)" } }],
        examens_a_discuter: ["Échographie / IRM pelvienne", "Avis gynécologique"] },
      { id: "dm_adenomyose", diagnostic: "Adénomyose / fibrome",
        arguments: [{ label: "ménorragies associées", w: 3, when: { q: "dm_menorragies", eq: true } }],
        examens_a_discuter: ["Échographie pelvienne"] },
      { id: "dm_infectieuse", diagnostic: "Cause infectieuse (salpingite chronique)",
        arguments: [{ label: "risque d'IST / DIU", w: 2, when: { q: "dm_ist", eq: true } }],
        examens_a_discuter: ["Prélèvements", "Échographie pelvienne"] }
    ],
    examens_clinique: [
      "Examen gynécologique",
      "Échographie pelvienne",
      "Recherche de nodules du cul-de-sac de Douglas (endométriose)",
      "Recherche d'un utérus augmenté de volume"
    ]
  },

  // -------------------------------------------------------------------------
  // 10 — CRAMPES
  // -------------------------------------------------------------------------
  crampes: {
    id: "crampes",
    symptome: "Crampes musculaires",
    specialite: ["Neuro-musculaire"],
    questions: [
      { id: "cr_nocturne", label: "Crampe essentielle", type: "boolean",
        question: "Les crampes surviennent-elles surtout la nuit, au mollet ?" },
      { id: "cr_medic", label: "Iatrogène", type: "boolean",
        question: "Prenez-vous des diurétiques, des statines, ou d'autres médicaments récents ?" },
      { id: "cr_deshyd", label: "Déshydratation / dialyse", type: "boolean",
        question: "Y a-t-il un contexte de déshydratation, de sueurs importantes, ou de dialyse ?" },
      { id: "cr_fascic", label: "Atteinte neuromusculaire", type: "boolean",
        question: "Avez-vous des secousses musculaires, une fonte musculaire, ou une faiblesse ?" },
      { id: "cr_tetanie", label: "Tétanie / spasmophilie", type: "boolean",
        question: "Avez-vous des fourmillements autour de la bouche et des mains, ou des contractures ?" },
      { id: "cr_claudication", label: "Claudication artérielle", type: "boolean",
        question: "Avez-vous mal aux jambes à la marche, soulagé à l'arrêt ?" }
    ],
    red_flags: [
      { id: "cr_rf_sla", niveau: 2,
        when: { q: "cr_fascic", eq: true },
        message_medecin: "Crampes + fasciculations + amyotrophie / déficit : signal d'alarme (SLA) → avis neurologique.",
        message_patient: "Ces signes nécessitent un avis médical." },
      { id: "cr_rf_rhabdo", niveau: 2,
        when: { q: "cr_medic", eq: true },
        message_medecin: "Crampes / myalgies sous statine ou trouble ionique iatrogène : éliminer une rhabdomyolyse (CPK), contrôler le ionogramme.",
        message_patient: "Ce contexte médicamenteux nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "cr_essentielle", diagnostic: "Crampe essentielle / idiopathique",
        arguments: [{ label: "nocturne, mollet, examen normal", w: 3, when: { q: "cr_nocturne", eq: true } }],
        examens_a_discuter: ["Réassurance, étirements", "Hydratation"] },
      { id: "cr_metabolique", diagnostic: "Crampe métabolique / iatrogène",
        arguments: [{ label: "médicament (diurétique, statine)", w: 2, when: { q: "cr_medic", eq: true } },
                    { label: "déshydratation / dialyse", w: 2, when: { q: "cr_deshyd", eq: true } }],
        examens_a_discuter: ["Ionogramme (Ca, Mg, K, Na)", "CPK", "Revue de l'ordonnance"] },
      { id: "cr_neuromusculaire", diagnostic: "Pathologie neuromusculaire (SLA, myopathie)",
        arguments: [{ label: "fasciculations / amyotrophie", w: 3, when: { q: "cr_fascic", eq: true } }],
        examens_a_discuter: ["Avis neurologique, EMG", "CPK"] },
      { id: "cr_tetanie", diagnostic: "Tétanie / spasmophilie",
        arguments: [{ label: "paresthésies péribuccales, contractures", w: 3, when: { q: "cr_tetanie", eq: true } }],
        examens_a_discuter: ["Calcémie, magnésémie", "Signes de Chvostek / Trousseau"] }
    ],
    examens_clinique: [
      "Examen neuro-musculaire (force, amyotrophie, fasciculations, réflexes)",
      "Signes de Chvostek / Trousseau",
      "Ionogramme, calcémie, magnésémie",
      "CPK si myalgies",
      "Palpation des pouls si claudication"
    ]
  },

  // -------------------------------------------------------------------------
  // 05 — ALOPÉCIE
  // -------------------------------------------------------------------------
  alopecie: {
    id: "alopecie",
    symptome: "Chute de cheveux (alopécie)",
    specialite: ["Dermatologie"],
    questions: [
      { id: "al_type", label: "Type de chute", type: "single_choice",
        question: "Comment se présente la perte de cheveux ?",
        options: ["En plaques bien limitées", "Diffuse (sur tout le cuir chevelu)", "Golfes / dessus du crâne, progressive"] },
      { id: "al_cicatricielle", label: "Cicatricielle", type: "boolean",
        question: "Sur les zones dégarnies, la peau est-elle lisse et brillante (les pores des cheveux ont disparu) ?" },
      { id: "al_facteur", label: "Effluvium télogène", type: "boolean",
        question: "Y a-t-il eu, 2 à 3 mois avant, un accouchement, une forte fièvre, une chirurgie, un régime ou un stress important ?" },
      { id: "al_medic", label: "Iatrogène", type: "boolean",
        question: "Avez-vous commencé un médicament (anticoagulant, rétinoïde, chimiothérapie, lithium) ?" },
      { id: "al_squames", label: "Teigne / inflammation", type: "boolean",
        question: "Y a-t-il des démangeaisons, des squames, ou des cheveux cassés courts (surtout chez l'enfant) ?" },
      { id: "al_lupus", label: "Signes de lupus", type: "boolean",
        question: "Avez-vous une éruption du visage, des douleurs articulaires, une sensibilité au soleil ?" },
      { id: "al_carence", label: "Carence / dysthyroïdie", type: "boolean",
        question: "Avez-vous une carence en fer ou un problème de thyroïde connu ?" }
    ],
    red_flags: [
      { id: "al_rf_cicatricielle", niveau: 2,
        when: { q: "al_cicatricielle", eq: true },
        message_medecin: "Alopécie cicatricielle (lichen plan, lupus, pseudo-pelade) : biopsie indispensable pour ne pas perdre le capital pilaire.",
        message_patient: "Ce type de chute mérite un avis dermatologique." },
      { id: "al_rf_lupus", niveau: 2,
        when: { q: "al_lupus", eq: true },
        message_medecin: "Signes de lupus systémique associés : bilan auto-immun, avis spécialisé.",
        message_patient: "Ces signes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "al_pelade", diagnostic: "Pelade",
        arguments: [{ label: "plaques alopéciques nettes", w: 3, when: { q: "al_type", eq: "En plaques bien limitées" } }],
        examens_a_discuter: ["Recherche de cheveux en point d'exclamation", "Test de traction"] },
      { id: "al_effluvium", diagnostic: "Effluvium télogène",
        arguments: [{ label: "chute diffuse", w: 2, when: { q: "al_type", eq: "Diffuse (sur tout le cuir chevelu)" } },
                    { label: "facteur déclenchant 2-3 mois avant", w: 3, when: { q: "al_facteur", eq: true } }],
        examens_a_discuter: ["Réversible", "Ferritine, TSH"] },
      { id: "al_androgenetique", diagnostic: "Alopécie androgénétique",
        arguments: [{ label: "golfes / vertex, progressive", w: 3, when: { q: "al_type", eq: "Golfes / dessus du crâne, progressive" } }],
        examens_a_discuter: ["Diagnostic clinique"] },
      { id: "al_teigne", diagnostic: "Teigne",
        arguments: [{ label: "plaque squameuse + cheveux cassés", w: 3, when: { q: "al_squames", eq: true } }],
        examens_a_discuter: ["Prélèvement mycologique"] },
      { id: "al_cicatricielle", diagnostic: "Alopécie cicatricielle",
        arguments: [{ label: "disparition des orifices pilaires", w: 3, when: { q: "al_cicatricielle", eq: true } }],
        examens_a_discuter: ["Biopsie du cuir chevelu"] }
    ],
    examens_clinique: [
      "Examen du cuir chevelu (présence/absence des orifices pilaires)",
      "Test de traction",
      "Recherche de cheveux en point d'exclamation (pelade)",
      "Ferritine, TSH"
    ]
  },

  // -------------------------------------------------------------------------
  // 07 — BOUFFÉES DE CHALEUR
  // -------------------------------------------------------------------------
  bouffees_chaleur: {
    id: "bouffees_chaleur",
    symptome: "Bouffées de chaleur",
    specialite: ["Endocrinologie", "Gynécologie"],
    questions: [
      { id: "bc_meno", label: "Contexte ménopausique", type: "boolean",
        question: "Êtes-vous une femme d'environ 50 ans avec des règles espacées ou arrêtées ?" },
      { id: "bc_climaterique", label: "Signes climatériques", type: "boolean",
        question: "Avez-vous d'autres signes : sécheresse vaginale, troubles de l'humeur ou du sommeil ?" },
      { id: "bc_diarrhee", label: "Syndrome carcinoïde", type: "boolean",
        question: "Avez-vous un flush accompagné de diarrhée et/ou de sifflements respiratoires ?" },
      { id: "bc_phaeo", label: "Phéochromocytome", type: "boolean",
        question: "Avez-vous des accès de maux de tête + palpitations + sueurs avec des poussées de tension ?" },
      { id: "bc_medic", label: "Iatrogène", type: "boolean",
        question: "Prenez-vous un traitement hormonal (tamoxifène, anti-aromatase, analogues LHRH) ou des vasodilatateurs ?" }
    ],
    red_flags: [
      { id: "bc_rf_carcinoide", niveau: 2,
        when: { q: "bc_diarrhee", eq: true },
        message_medecin: "Flush + diarrhée (± valvulopathie) : syndrome carcinoïde → 5-HIAA urinaire.",
        message_patient: "Cette association nécessite un avis médical et un bilan." },
      { id: "bc_rf_phaeo", niveau: 2,
        when: { q: "bc_phaeo", eq: true },
        message_medecin: "Triade céphalées-palpitations-sueurs + HTA paroxystique : phéochromocytome → métanéphrines.",
        message_patient: "Ces signes nécessitent un avis médical et un bilan." }
    ],
    diagnostics_differentiels: [
      { id: "bc_menopause", diagnostic: "Ménopause / périménopause",
        arguments: [{ label: "femme ~50 ans + aménorrhée", w: 3, when: { q: "bc_meno", eq: true } },
                    { label: "signes climatériques", w: 2, when: { q: "bc_climaterique", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique"] },
      { id: "bc_carcinoide", diagnostic: "Syndrome carcinoïde",
        arguments: [{ label: "flush + diarrhée + bronchospasme", w: 3, when: { q: "bc_diarrhee", eq: true } }],
        examens_a_discuter: ["5-HIAA urinaire", "Imagerie"] },
      { id: "bc_phaeo", diagnostic: "Phéochromocytome",
        arguments: [{ label: "triade + HTA paroxystique", w: 3, when: { q: "bc_phaeo", eq: true } }],
        examens_a_discuter: ["Métanéphrines", "Imagerie surrénale"] },
      { id: "bc_iatrogene", diagnostic: "Cause iatrogène",
        arguments: [{ label: "traitement hormonal / vasodilatateur", w: 2, when: { q: "bc_medic", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance"] }
    ],
    examens_clinique: [
      "Pression artérielle (recherche de poussées)",
      "Recherche de signes climatériques",
      "Auscultation cardiaque (valvulopathie)",
      "Bilan orienté selon les signes atypiques"
    ]
  },

  // -------------------------------------------------------------------------
  // 13 — DIFFICULTÉS SEXUELLES
  // -------------------------------------------------------------------------
  difficultes_sexuelles: {
    id: "difficultes_sexuelles",
    symptome: "Difficultés sexuelles",
    specialite: ["Andrologie", "Sexologie"],
    questions: [
      { id: "ds_debut", label: "Profil", type: "single_choice",
        question: "Comment le trouble est-il apparu ?",
        options: ["Brutalement / seulement dans certaines situations", "Progressivement / dans toutes les situations"] },
      { id: "ds_nocturne", label: "Érections spontanées", type: "boolean",
        question: "Les érections nocturnes ou matinales spontanées sont-elles conservées ?" },
      { id: "ds_fdr", label: "Facteurs de risque CV", type: "boolean",
        question: "Avez-vous des facteurs de risque cardiovasculaire (tabac, diabète, hypertension, cholestérol) ?" },
      { id: "ds_medic", label: "Iatrogène", type: "boolean",
        question: "Prenez-vous des traitements (tension, antidépresseurs, neuroleptiques) ?" },
      { id: "ds_libido", label: "Hypogonadisme / prolactine", type: "boolean",
        question: "Avez-vous une baisse du désir, et/ou un écoulement de lait / une augmentation de la poitrine ?" },
      { id: "ds_psy", label: "Contexte psychologique", type: "boolean",
        question: "Y a-t-il un contexte d'anxiété, de dépression, ou de difficultés dans le couple ?" }
    ],
    red_flags: [
      { id: "ds_rf_coronarien", niveau: 2,
        when: { all: [{ q: "ds_debut", eq: "Progressivement / dans toutes les situations" }, { q: "ds_fdr", eq: true }] },
        message_medecin: "Dysfonction érectile organique progressive + facteurs de risque CV : la DE est un marqueur précoce d'athérome → bilan cardiovasculaire.",
        message_patient: "Un bilan médical est recommandé, notamment cardiovasculaire." },
      { id: "ds_rf_prolactine", niveau: 2,
        when: { q: "ds_libido", eq: true },
        message_medecin: "Baisse de libido + galactorrhée / gynécomastie : hyperprolactinémie (adénome) ou hypogonadisme à éliminer (prolactine, testostérone).",
        message_patient: "Ces signes nécessitent un avis médical et un bilan hormonal." }
    ],
    diagnostics_differentiels: [
      { id: "ds_organique", diagnostic: "Dysfonction érectile organique (vasculaire)",
        arguments: [{ label: "installation progressive", w: 2, when: { q: "ds_debut", eq: "Progressivement / dans toutes les situations" } },
                    { label: "érections spontanées abolies", w: 2, when: { q: "ds_nocturne", eq: false } },
                    { label: "facteurs de risque CV", w: 2, when: { q: "ds_fdr", eq: true } }],
        examens_a_discuter: ["Bilan cardiovasculaire", "Glycémie, lipides, testostérone"] },
      { id: "ds_psychogene", diagnostic: "Dysfonction érectile psychogène",
        arguments: [{ label: "début brutal / situationnel", w: 3, when: { q: "ds_debut", eq: "Brutalement / seulement dans certaines situations" } },
                    { label: "érections spontanées conservées", w: 2, when: { q: "ds_nocturne", eq: true } },
                    { label: "contexte psychologique", w: 1, when: { q: "ds_psy", eq: true } }],
        examens_a_discuter: ["Prise en charge psycho-sexologique"] },
      { id: "ds_endocrinienne", diagnostic: "Cause endocrinienne",
        arguments: [{ label: "baisse de libido / galactorrhée", w: 3, when: { q: "ds_libido", eq: true } }],
        examens_a_discuter: ["Testostérone, prolactine, TSH"] },
      { id: "ds_iatrogene", diagnostic: "Cause iatrogène",
        arguments: [{ label: "médicament (antiHTA, psychotrope)", w: 2, when: { q: "ds_medic", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance"] }
    ],
    examens_clinique: [
      "Interrogatoire ciblé (érections spontanées conservées ou non)",
      "Bilan cardiovasculaire (TA, glycémie, lipides)",
      "Testostérone matinale",
      "Prolactine, TSH selon le contexte"
    ]
  },

  // -------------------------------------------------------------------------
  // 26 — ÉRYTHERMALGIE
  // -------------------------------------------------------------------------
  erythermalgie: {
    id: "erythermalgie",
    symptome: "Crises de brûlure rouge des extrémités (érythermalgie)",
    specialite: ["Vasculaire", "Hématologie"],
    questions: [
      { id: "er_crises", label: "Tableau typique", type: "boolean",
        question: "Avez-vous des crises de rougeur + chaleur + brûlure des extrémités (surtout les pieds) ?" },
      { id: "er_chaleur", label: "Déclenchement", type: "boolean",
        question: "Sont-elles déclenchées par la chaleur ou l'effort, et calmées par le froid ?" },
      { id: "er_aspirine", label: "Test à l'aspirine", type: "boolean",
        question: "La douleur est-elle spectaculairement soulagée par l'aspirine ?" },
      { id: "er_smp", label: "Syndrome myéloprolifératif", type: "boolean",
        question: "Avez-vous un syndrome myéloprolifératif connu, des démangeaisons, une grosse rate, ou des thromboses ?" },
      { id: "er_medic", label: "Iatrogène", type: "boolean",
        question: "Prenez-vous des inhibiteurs calciques ou de la bromocriptine ?" }
    ],
    red_flags: [
      { id: "er_rf_smp", niveau: 2,
        when: { any: [{ q: "er_aspirine", eq: true }, { q: "er_smp", eq: true }] },
        message_medecin: "Sensibilité spectaculaire à l'aspirine / contexte myéloprolifératif : thrombocytémie essentielle ou maladie de Vaquez (risque thrombotique) → NFS-plaquettes.",
        message_patient: "Ces éléments nécessitent un avis médical et une prise de sang." }
    ],
    diagnostics_differentiels: [
      { id: "er_smp", diagnostic: "Érythromélalgie des syndromes myéloprolifératifs",
        arguments: [{ label: "sensibilité à l'aspirine", w: 3, when: { q: "er_aspirine", eq: true } },
                    { label: "contexte myéloprolifératif", w: 2, when: { q: "er_smp", eq: true } }],
        examens_a_discuter: ["NFS-plaquettes", "Recherche JAK2"] },
      { id: "er_primitive", diagnostic: "Forme primitive / héréditaire",
        arguments: [{ label: "sujet jeune", w: 2, when: { ctx: "age", lte: 30 } },
                    { label: "tableau typique", w: 1, when: { q: "er_crises", eq: true } }],
        examens_a_discuter: ["Avis spécialisé (mutation SCN9A)"] },
      { id: "er_secondaire", diagnostic: "Formes secondaires",
        arguments: [{ label: "médicament", w: 2, when: { q: "er_medic", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance", "Recherche de neuropathie / connectivite"] }
    ],
    examens_clinique: [
      "NFS-plaquettes systématique",
      "Examen des extrémités pendant la crise",
      "Recherche d'une splénomégalie"
    ]
  },

  // -------------------------------------------------------------------------
  // 28 — GALACTORRHÉE
  // -------------------------------------------------------------------------
  galactorrhee: {
    id: "galactorrhee",
    symptome: "Écoulement de lait par le mamelon (galactorrhée)",
    specialite: ["Endocrinologie"],
    questions: [
      { id: "ga_bilateral", label: "Galactorrhée vraie", type: "boolean",
        question: "L'écoulement est-il laiteux et présent des deux seins ?" },
      { id: "ga_sanglant", label: "Écoulement suspect", type: "boolean",
        question: "L'écoulement est-il d'un seul sein, par un seul orifice, ou teinté de sang ?" },
      { id: "ga_amenorrhee", label: "Hyperprolactinémie", type: "boolean",
        question: "Avez-vous des règles espacées/absentes, une infertilité, ou une baisse de libido ?" },
      { id: "ga_visuel", label: "Syndrome tumoral", type: "boolean",
        question: "Avez-vous des maux de tête ou des troubles de la vue (sur les côtés du champ visuel) ?" },
      { id: "ga_medic", label: "Iatrogène", type: "boolean",
        question: "Prenez-vous des neuroleptiques, des antiémétiques (métoclopramide, dompéridone), des antidépresseurs, ou des opiacés ?" },
      { id: "ga_thyroide", label: "Hypothyroïdie", type: "boolean",
        question: "Avez-vous des signes d'hypothyroïdie (frilosité, fatigue, prise de poids) ?" }
    ],
    red_flags: [
      { id: "ga_rf_sein", niveau: 2,
        when: { q: "ga_sanglant", eq: true },
        message_medecin: "Écoulement unilatéral, uniporal ou sanglant = PAS une galactorrhée : bilan mammaire (cancer du sein).",
        message_patient: "Ce type d'écoulement nécessite un bilan du sein." },
      { id: "ga_rf_adenome", niveau: 2,
        when: { q: "ga_visuel", eq: true },
        message_medecin: "Galactorrhée + syndrome tumoral (céphalées, troubles du champ visuel) : macroadénome hypophysaire → IRM.",
        message_patient: "Ces signes nécessitent un avis médical et une imagerie." }
    ],
    diagnostics_differentiels: [
      { id: "ga_medic", diagnostic: "Hyperprolactinémie médicamenteuse",
        arguments: [{ label: "médicament hyperprolactinémiant", w: 3, when: { q: "ga_medic", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance", "Prolactine"] },
      { id: "ga_adenome", diagnostic: "Adénome à prolactine",
        arguments: [{ label: "aménorrhée / infertilité / baisse de libido", w: 2, when: { q: "ga_amenorrhee", eq: true } },
                    { label: "syndrome tumoral", w: 2, when: { q: "ga_visuel", eq: true } },
                    { label: "galactorrhée bilatérale", w: 1, when: { q: "ga_bilateral", eq: true } }],
        examens_a_discuter: ["Prolactine", "IRM hypophysaire"] },
      { id: "ga_thyroide", diagnostic: "Hypothyroïdie",
        arguments: [{ label: "signes d'hypothyroïdie", w: 3, when: { q: "ga_thyroide", eq: true } }],
        examens_a_discuter: ["TSH"] },
      { id: "ga_mammaire", diagnostic: "Pathologie mammaire (écoulement sanglant)",
        arguments: [{ label: "écoulement unilatéral / sanglant", w: 3, when: { q: "ga_sanglant", eq: true } }],
        examens_a_discuter: ["Mammographie / échographie", "Avis sénologique"] }
    ],
    examens_clinique: [
      "Caractériser l'écoulement (bilatéral/laiteux vs unilatéral/sanglant)",
      "Prolactine",
      "TSH, β-hCG",
      "Champ visuel si suspicion d'adénome"
    ]
  },

  // -------------------------------------------------------------------------
  // 36 — HÉMOSPERMIE
  // -------------------------------------------------------------------------
  hemospermie: {
    id: "hemospermie",
    symptome: "Sang dans le sperme (hémospermie)",
    specialite: ["Urologie"],
    questions: [
      { id: "hs_recidive", label: "Récidivante", type: "boolean",
        question: "Est-ce récidivant (plusieurs épisodes) ?" },
      { id: "hs_hematurie", label: "Hématurie associée", type: "boolean",
        question: "Y a-t-il aussi du sang dans les urines ?" },
      { id: "hs_geste", label: "Post-geste", type: "boolean",
        question: "Avez-vous eu récemment une biopsie de prostate ou une vasectomie ?" },
      { id: "hs_infection", label: "Infection / IST", type: "boolean",
        question: "Avez-vous des brûlures urinaires, de la fièvre, ou un contexte d'IST ?" },
      { id: "hs_prostate", label: "Cause prostatique", type: "boolean",
        question: "Avez-vous des troubles urinaires (jet faible, envies nocturnes) ou un PSA élevé connu ?" }
    ],
    red_flags: [
      { id: "hs_rf_prostate", niveau: 2,
        when: { all: [{ ctx: "age", gte: 40 }, { any: [{ q: "hs_recidive", eq: true }, { q: "hs_prostate", eq: true }] }] },
        message_medecin: "Hémospermie après 40 ans ou persistante : bilan prostatique (toucher rectal, PSA) pour ne pas méconnaître un cancer.",
        message_patient: "À votre âge, ce signe mérite un bilan urologique." },
      { id: "hs_rf_urinaire", niveau: 2,
        when: { q: "hs_hematurie", eq: true },
        message_medecin: "Hémospermie + hématurie : origine urologique → bilan (ECBU, imagerie).",
        message_patient: "L'association avec du sang dans les urines nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "hs_benigne", diagnostic: "Hémospermie idiopathique / bénigne",
        arguments: [{ label: "sujet jeune, épisode isolé", w: 3, when: { all: [{ ctx: "age", lte: 40 }, { q: "hs_recidive", eq: false }] } }],
        examens_a_discuter: ["Réassurance", "Surveillance"] },
      { id: "hs_infection", diagnostic: "Infection (prostatite, vésiculite, IST)",
        arguments: [{ label: "contexte infectieux", w: 3, when: { q: "hs_infection", eq: true } }],
        examens_a_discuter: ["ECBU", "Dépistage IST"] },
      { id: "hs_prostate", diagnostic: "Cause prostatique (> 40 ans)",
        arguments: [{ label: "troubles urinaires / PSA", w: 2, when: { q: "hs_prostate", eq: true } },
                    { label: "âge > 40 ans", w: 1, when: { ctx: "age", gte: 40 } }],
        examens_a_discuter: ["Toucher rectal, PSA", "Échographie"] },
      { id: "hs_postgeste", diagnostic: "Post-geste (biopsie prostatique)",
        arguments: [{ label: "geste récent", w: 3, when: { q: "hs_geste", eq: true } }],
        examens_a_discuter: ["Réassurance (banal après biopsie)"] }
    ],
    examens_clinique: [
      "Toucher rectal (prostate)",
      "PSA si âge > 40 ans",
      "ECBU",
      "Recherche d'une hématurie associée"
    ]
  },

  // -------------------------------------------------------------------------
  // 38 — HOQUET CHRONIQUE
  // -------------------------------------------------------------------------
  hoquet_chronique: {
    id: "hoquet_chronique",
    symptome: "Hoquet qui dure (hoquet chronique)",
    specialite: ["Digestif", "Neurologie"],
    questions: [
      { id: "ho_duree", label: "> 48 heures", type: "boolean",
        question: "Le hoquet dure-t-il depuis plus de 48 heures ?" },
      { id: "ho_nuit", label: "Persiste la nuit (organique)", type: "boolean",
        question: "Persiste-t-il pendant le sommeil (la nuit) ?" },
      { id: "ho_digestif", label: "Cause digestive", type: "boolean",
        question: "Avez-vous des remontées acides, un ulcère, ou des troubles digestifs ?" },
      { id: "ho_neuro", label: "Cause centrale", type: "boolean",
        question: "Avez-vous des signes neurologiques (trouble de l'équilibre, de la vision, de la parole, faiblesse) ?" },
      { id: "ho_thoracique", label: "Cause thoracique", type: "boolean",
        question: "Avez-vous une douleur thoracique, une toux, ou un cancer thoracique connu ?" },
      { id: "ho_metabolique", label: "Cause métabolique / iatrogène", type: "boolean",
        question: "Avez-vous une insuffisance rénale, ou prenez-vous des corticoïdes ?" },
      { id: "ho_retentissement", label: "Retentissement", type: "boolean",
        question: "Cela perturbe-t-il votre sommeil et votre alimentation, avec un amaigrissement ?" }
    ],
    red_flags: [
      { id: "ho_rf_central", niveau: 2,
        when: { q: "ho_neuro", eq: true },
        message_medecin: "Hoquet + signes neurologiques : cause centrale (AVC, tumeur du tronc, SEP) → IRM.",
        message_patient: "Ces signes nécessitent un avis médical." },
      { id: "ho_rf_organique", niveau: 2,
        when: { all: [{ q: "ho_nuit", eq: true }, { q: "ho_duree", eq: true }] },
        message_medecin: "Hoquet chronique persistant la nuit (organique) : explorer tout le trajet phréno-vagal (du tronc cérébral à l'abdomen).",
        message_patient: "Un hoquet qui dure et persiste la nuit nécessite un bilan médical." }
    ],
    diagnostics_differentiels: [
      { id: "ho_digestif", diagnostic: "Hoquet digestif",
        arguments: [{ label: "RGO / distension gastrique", w: 3, when: { q: "ho_digestif", eq: true } }],
        examens_a_discuter: ["Traiter le RGO", "Endoscopie si besoin"] },
      { id: "ho_central", diagnostic: "Hoquet central",
        arguments: [{ label: "signes neurologiques", w: 3, when: { q: "ho_neuro", eq: true } }],
        examens_a_discuter: ["IRM cérébrale"] },
      { id: "ho_metabolique", diagnostic: "Hoquet métabolique / iatrogène",
        arguments: [{ label: "urémie / corticoïdes", w: 3, when: { q: "ho_metabolique", eq: true } }],
        examens_a_discuter: ["Ionogramme, urée/créatinine", "Revue des médicaments"] },
      { id: "ho_tumoral", diagnostic: "Hoquet tumoral médiastinal / sous-phrénique",
        arguments: [{ label: "contexte thoracique", w: 2, when: { q: "ho_thoracique", eq: true } },
                    { label: "retentissement / amaigrissement", w: 1, when: { q: "ho_retentissement", eq: true } }],
        examens_a_discuter: ["Imagerie thoraco-abdominale"] }
    ],
    examens_clinique: [
      "Examen neurologique",
      "Examen abdominal",
      "Bilan métabolique (ionogramme, calcémie, urée)",
      "Imagerie selon l'orientation"
    ]
  },

  // -------------------------------------------------------------------------
  // 39 — HYPERHIDROSE
  // -------------------------------------------------------------------------
  hyperhidrose: {
    id: "hyperhidrose",
    symptome: "Transpiration excessive (hyperhidrose)",
    specialite: ["Endocrinologie", "Neurologie"],
    questions: [
      { id: "hy_localisee", label: "Localisée et symétrique", type: "boolean",
        question: "La transpiration excessive est-elle localisée et symétrique (mains, pieds, aisselles) ?" },
      { id: "hy_emotion", label: "Diurne, émotionnelle", type: "boolean",
        question: "Est-elle déclenchée par l'émotion, présente le jour, et absente la nuit ?" },
      { id: "hy_nocturne", label: "Sueurs nocturnes B", type: "boolean",
        question: "Avez-vous des sueurs nocturnes abondantes avec fièvre et/ou amaigrissement ?" },
      { id: "hy_hyperthyroidie", label: "Hyperthyroïdie", type: "boolean",
        question: "Avez-vous un cœur rapide, une intolérance à la chaleur, un amaigrissement ?" },
      { id: "hy_phaeo", label: "Phéochromocytome", type: "boolean",
        question: "Avez-vous des accès de maux de tête + palpitations + sueurs avec des poussées de tension ?" },
      { id: "hy_meno", label: "Ménopause", type: "boolean",
        question: "Êtes-vous en période de ménopause (bouffées de chaleur) ?" }
    ],
    red_flags: [
      { id: "hy_rf_b", niveau: 2,
        when: { q: "hy_nocturne", eq: true },
        message_medecin: "Sueurs nocturnes profuses + AEG : lymphome, tuberculose ou néoplasie à éliminer → bilan.",
        message_patient: "Des sueurs nocturnes avec amaigrissement nécessitent un bilan médical." },
      { id: "hy_rf_phaeo", niveau: 2,
        when: { q: "hy_phaeo", eq: true },
        message_medecin: "Triade céphalées-palpitations-sueurs + HTA paroxystique : phéochromocytome → métanéphrines.",
        message_patient: "Ces signes nécessitent un avis médical et un bilan." }
    ],
    diagnostics_differentiels: [
      { id: "hy_primaire", diagnostic: "Hyperhidrose primaire (essentielle)",
        arguments: [{ label: "localisée et symétrique", w: 3, when: { q: "hy_localisee", eq: true } },
                    { label: "diurne, émotionnelle, jamais nocturne", w: 2, when: { q: "hy_emotion", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique", "Traitements topiques / spécialisés"] },
      { id: "hy_b", diagnostic: "Sueurs nocturnes « B » (lymphome, tuberculose, néoplasie)",
        arguments: [{ label: "sueurs nocturnes + signes généraux", w: 3, when: { q: "hy_nocturne", eq: true } }],
        examens_a_discuter: ["NFS, VS/CRP", "Radiographie thoracique, recherche de TB / lymphome"] },
      { id: "hy_hyperthyroidie", diagnostic: "Hyperthyroïdie",
        arguments: [{ label: "thermophobie + tachycardie + amaigrissement", w: 3, when: { q: "hy_hyperthyroidie", eq: true } }],
        examens_a_discuter: ["TSH"] },
      { id: "hy_phaeo", diagnostic: "Phéochromocytome",
        arguments: [{ label: "triade + HTA paroxystique", w: 3, when: { q: "hy_phaeo", eq: true } }],
        examens_a_discuter: ["Métanéphrines"] }
    ],
    examens_clinique: [
      "Caractériser (localisée/diurne vs généralisée/nocturne)",
      "Pression artérielle",
      "Palpation thyroïdienne",
      "Recherche d'adénopathies / d'altération de l'état général"
    ]
  },

  // -------------------------------------------------------------------------
  // CÉPHALÉE
  // -------------------------------------------------------------------------
  cephalee: {
    id: "cephalee", symptome: "Mal de tête (céphalée)", specialite: ["Neurologie"], urgence: true,
    questions: [
      { id: "ce2_brutal", label: "Coup de tonnerre", type: "boolean",
        question: "La douleur est-elle apparue brutalement, atteignant son maximum en quelques secondes ?" },
      { id: "ce2_fievre_raideur", label: "Fièvre + raideur de nuque", type: "boolean",
        question: "Avez-vous de la fièvre avec une raideur de la nuque ?" },
      { id: "ce2_deficit", label: "Signes neurologiques", type: "boolean",
        question: "Avez-vous des signes neurologiques (faiblesse, troubles de la parole, de la vision, confusion) ?" },
      { id: "ce2_horton", label: "Horton", type: "boolean",
        question: "Avez-vous plus de 50 ans avec une douleur de la tempe, une douleur de la mâchoire en mangeant, ou des troubles visuels ?" },
      { id: "ce2_pulsatile", label: "Profil migraineux", type: "boolean",
        question: "Est-ce une douleur pulsatile d'un côté, avec gêne à la lumière/au bruit et nausées ?" },
      { id: "ce2_etau", label: "Céphalée de tension", type: "boolean",
        question: "Est-ce un serrement « en casque » des deux côtés, sans nausée ?" },
      { id: "ce2_matin", label: "HTIC", type: "boolean",
        question: "Est-elle présente le matin au réveil avec des vomissements, ou déclenchée par l'effort/la toux ?" },
      { id: "ce2_recent", label: "Céphalée inhabituelle/récente", type: "boolean",
        question: "Est-ce une céphalée inhabituelle, récente, ou qui s'aggrave progressivement ?" }
    ],
    red_flags: [
      { id: "ce2_rf_thunderclap", niveau: 3, when: { q: "ce2_brutal", eq: true },
        message_medecin: "Céphalée en coup de tonnerre : hémorragie méningée à éliminer (TDM sans injection ± PL) — urgence (15).",
        message_patient: "Une douleur aussi brutale nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ce2_rf_meningite", niveau: 3, when: { q: "ce2_fievre_raideur", eq: true },
        message_medecin: "Céphalée fébrile + raideur de nuque : méningite → urgence.",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ce2_rf_deficit", niveau: 3, when: { q: "ce2_deficit", eq: true },
        message_medecin: "Céphalée + signes neurologiques : cause secondaire (AVC, processus expansif) → imagerie urgente.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ce2_rf_horton", niveau: 3, when: { q: "ce2_horton", eq: true },
        message_medecin: "Suspicion de maladie de Horton (> 50 ans) : VS/CRP en urgence, risque de cécité.",
        message_patient: "Ces signes nécessitent une évaluation médicale sans attendre." },
      { id: "ce2_rf_htic", niveau: 2, when: { q: "ce2_matin", eq: true },
        message_medecin: "Céphalée matinale avec vomissements / déclenchée à l'effort : suspicion d'HTIC → imagerie.",
        message_patient: "Ce profil nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ce2_hsa", diagnostic: "Hémorragie méningée", arguments: [{ label: "début en coup de tonnerre", w: 3, when: { q: "ce2_brutal", eq: true } }],
        examens_a_discuter: ["TDM cérébrale sans injection", "PL si TDM normale"] },
      { id: "ce2_meningite", diagnostic: "Méningite", arguments: [{ label: "fièvre + raideur de nuque", w: 3, when: { q: "ce2_fievre_raideur", eq: true } }],
        examens_a_discuter: ["Ponction lombaire", "Hémocultures"] },
      { id: "ce2_migraine", diagnostic: "Migraine", arguments: [{ label: "pulsatile + photo/phonophobie + nausées", w: 3, when: { q: "ce2_pulsatile", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique", "Agenda des crises"] },
      { id: "ce2_tension", diagnostic: "Céphalée de tension", arguments: [{ label: "serrement « en casque » bilatéral", w: 3, when: { q: "ce2_etau", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique"] },
      { id: "ce2_horton", diagnostic: "Maladie de Horton", arguments: [{ label: "> 50 ans, signes temporaux/visuels", w: 3, when: { q: "ce2_horton", eq: true } }],
        examens_a_discuter: ["VS / CRP en urgence", "Biopsie de l'artère temporale"] },
      { id: "ce2_secondaire", diagnostic: "Céphalée secondaire / HTIC", arguments: [{ label: "récente/inhabituelle, évolutive", w: 2, when: { q: "ce2_recent", eq: true } }, { label: "matinale + vomissements / effort", w: 2, when: { q: "ce2_matin", eq: true } }, { label: "signes neurologiques", w: 2, when: { q: "ce2_deficit", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale"] }
    ],
    examens_clinique: ["Examen neurologique complet", "Recherche d'une raideur méningée", "Fond d'œil (œdème papillaire)", "Palpation des artères temporales", "Pression artérielle, température"]
  },

  // -------------------------------------------------------------------------
  // VERTIGES
  // -------------------------------------------------------------------------
  vertige: {
    id: "vertige", symptome: "Vertiges", specialite: ["ORL", "Neurologie"], urgence: true,
    questions: [
      { id: "ve_rotatoire", label: "Vrai vertige rotatoire", type: "boolean",
        question: "Avez-vous l'impression que tout tourne autour de vous ?" },
      { id: "ve_position", label: "Positionnel bref", type: "boolean",
        question: "Est-ce déclenché par les changements de position de la tête, par brèves crises de moins d'une minute ?" },
      { id: "ve_audition", label: "Signes cochléaires", type: "boolean",
        question: "Y a-t-il une baisse d'audition ou des acouphènes associés ?" },
      { id: "ve_neuro", label: "Signes centraux", type: "boolean",
        question: "Avez-vous des signes neurologiques : vision double, troubles de la parole, faiblesse, troubles de la marche marqués ?" },
      { id: "ve_cephalee", label: "Céphalée associée", type: "boolean",
        question: "Avez-vous une céphalée brutale ou inhabituelle associée ?" },
      { id: "ve_duree", label: "Durée", type: "single_choice",
        question: "Combien de temps durent les vertiges ?",
        options: ["Quelques secondes à 1 minute", "Plusieurs minutes à heures", "En continu, plusieurs jours"] },
      { id: "ve_instable", label: "Instabilité non rotatoire", type: "boolean",
        question: "Est-ce plutôt une instabilité ou un déséquilibre, sans sensation de rotation ?" }
    ],
    red_flags: [
      { id: "ve_rf_central", niveau: 3, when: { any: [{ q: "ve_neuro", eq: true }, { q: "ve_cephalee", eq: true }] },
        message_medecin: "Vertige + signes neurologiques ou céphalée : cause centrale (AVC du tronc/cervelet) → urgence (test HINTS, imagerie).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "ve_vppb", diagnostic: "Vertige positionnel paroxystique bénin (VPPB)", arguments: [{ label: "déclenché par la position", w: 3, when: { q: "ve_position", eq: true } }, { label: "accès de quelques secondes", w: 2, when: { q: "ve_duree", eq: "Quelques secondes à 1 minute" } }],
        examens_a_discuter: ["Manœuvre de Dix-Hallpike", "Manœuvre libératrice (Epley)"] },
      { id: "ve_meniere", diagnostic: "Maladie de Ménière", arguments: [{ label: "signes cochléaires", w: 2, when: { q: "ve_audition", eq: true } }, { label: "crises de minutes à heures", w: 2, when: { q: "ve_duree", eq: "Plusieurs minutes à heures" } }],
        examens_a_discuter: ["Audiométrie", "Avis ORL"] },
      { id: "ve_nevrite", diagnostic: "Névrite vestibulaire", arguments: [{ label: "vertige continu plusieurs jours", w: 3, when: { q: "ve_duree", eq: "En continu, plusieurs jours" } }, { label: "rotatoire sans signe cochléaire", w: 1, when: { q: "ve_rotatoire", eq: true } }],
        examens_a_discuter: ["Examen vestibulaire, test HINTS", "Traitement symptomatique"] },
      { id: "ve_central", diagnostic: "Cause centrale (AVC)", arguments: [{ label: "signes neurologiques", w: 3, when: { q: "ve_neuro", eq: true } }, { label: "céphalée associée", w: 2, when: { q: "ve_cephalee", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale", "Avis neurologique urgent"] },
      { id: "ve_instabilite", diagnostic: "Instabilité non vertigineuse", arguments: [{ label: "déséquilibre sans rotation", w: 3, when: { q: "ve_instable", eq: true } }],
        examens_a_discuter: ["Examen neurologique", "TA couché/debout, revue des médicaments"] }
    ],
    examens_clinique: ["Recherche d'un nystagmus", "Manœuvre de Dix-Hallpike", "Test HINTS (différencier périphérique/central)", "Examen neurologique et de la marche", "TA couché/debout"]
  },

  // -------------------------------------------------------------------------
  // TOUX AIGUË
  // -------------------------------------------------------------------------
  toux_aigue: {
    id: "toux_aigue", symptome: "Toux aiguë (moins de 3 semaines)", specialite: ["Pneumologie", "ORL"], urgence: true,
    questions: [
      { id: "ta_gravite", label: "Détresse respiratoire", type: "boolean",
        question: "Avez-vous une difficulté à respirer marquée, les lèvres bleues, ou somnolez-vous ?" },
      { id: "ta_fievre", label: "Fièvre", type: "boolean", question: "Avez-vous de la fièvre ?" },
      { id: "ta_dyspnee", label: "Dyspnée / douleur thoracique", type: "boolean",
        question: "Êtes-vous essoufflé ou avez-vous une douleur dans la poitrine ?" },
      { id: "ta_expecto", label: "Expectoration", type: "boolean", question: "Crachez-vous (crachats colorés) ?" },
      { id: "ta_fausse_route", label: "Inhalation", type: "boolean",
        question: "Y a-t-il eu une fausse route ou l'inhalation possible d'un corps étranger ?" },
      { id: "ta_hemopt", label: "Hémoptysie", type: "boolean", question: "Crachez-vous du sang ?" },
      { id: "ta_contage", label: "Contexte épidémique", type: "boolean", question: "Y a-t-il un contexte de grippe / COVID / rhume ?" }
    ],
    red_flags: [
      { id: "ta_rf_detresse", niveau: 3, when: { q: "ta_gravite", eq: true },
        message_medecin: "Détresse respiratoire : urgence (SpO2, oxygène, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ta_rf_corps", niveau: 3, when: { q: "ta_fausse_route", eq: true },
        message_medecin: "Suspicion d'inhalation de corps étranger : urgence (manœuvres, endoscopie).",
        message_patient: "Une fausse route avec gêne nécessite une évaluation immédiate — appelez le 15." },
      { id: "ta_rf_pneumonie", niveau: 2, when: { all: [{ q: "ta_fievre", eq: true }, { q: "ta_dyspnee", eq: true }] },
        message_medecin: "Fièvre + dyspnée : pneumonie / complication → examen, radiographie thoracique.",
        message_patient: "Cette association nécessite un avis médical rapide." },
      { id: "ta_rf_hemopt", niveau: 2, when: { q: "ta_hemopt", eq: true },
        message_medecin: "Hémoptysie : explorer (voir fiche dédiée).",
        message_patient: "Cracher du sang nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ta_virale", diagnostic: "Infection virale des voies aériennes", arguments: [{ label: "contexte épidémique", w: 2, when: { q: "ta_contage", eq: true } }, { label: "pas de dyspnée", w: 1, when: { q: "ta_dyspnee", eq: false } }],
        examens_a_discuter: ["Traitement symptomatique"] },
      { id: "ta_pneumonie", diagnostic: "Pneumonie", arguments: [{ label: "fièvre", w: 2, when: { q: "ta_fievre", eq: true } }, { label: "dyspnée", w: 2, when: { q: "ta_dyspnee", eq: true } }, { label: "expectoration", w: 1, when: { q: "ta_expecto", eq: true } }],
        examens_a_discuter: ["Auscultation", "Radiographie thoracique, CRP"] },
      { id: "ta_bronchite", diagnostic: "Bronchite aiguë", arguments: [{ label: "expectoration sans foyer", w: 2, when: { q: "ta_expecto", eq: true } }],
        examens_a_discuter: ["Traitement symptomatique (pas d'antibiotique systématique)"] }
    ],
    examens_clinique: ["SpO2, fréquence respiratoire", "Auscultation pulmonaire", "Température", "Examen ORL"]
  },

  // -------------------------------------------------------------------------
  // TOUX CHRONIQUE
  // -------------------------------------------------------------------------
  toux_chronique: {
    id: "toux_chronique", symptome: "Toux chronique (plus de 8 semaines)", specialite: ["Pneumologie"],
    questions: [
      { id: "tc_tabac", label: "Tabac + signaux", type: "boolean",
        question: "Fumez-vous, avec une modification récente de la toux ou un amaigrissement ?" },
      { id: "tc_hemopt", label: "Hémoptysie", type: "boolean", question: "Crachez-vous du sang ?" },
      { id: "tc_rgo", label: "RGO", type: "boolean", question: "Avez-vous des remontées acides ou des brûlures derrière le sternum ?" },
      { id: "tc_ecoulement", label: "Écoulement postérieur", type: "boolean", question: "Avez-vous un écoulement nasal qui coule dans la gorge ou une sinusite chronique ?" },
      { id: "tc_asthme", label: "Asthme/équivalent", type: "boolean", question: "La toux est-elle nocturne, avec sifflements, ou déclenchée à l'effort ?" },
      { id: "tc_iec", label: "IEC", type: "boolean", question: "Prenez-vous un médicament pour la tension dont le nom finit par « -pril » (IEC) ?" },
      { id: "tc_dyspnee", label: "Dyspnée progressive", type: "boolean", question: "Êtes-vous essoufflé de façon progressive ?" }
    ],
    red_flags: [
      { id: "tc_rf_cancer", niveau: 2, when: { q: "tc_tabac", eq: true },
        message_medecin: "Toux chronique du fumeur (± modification récente / amaigrissement) : éliminer un cancer bronchique → radiographie/TDM, avis.",
        message_patient: "Une toux qui dure chez un fumeur nécessite un avis médical et des examens." },
      { id: "tc_rf_hemopt", niveau: 2, when: { q: "tc_hemopt", eq: true },
        message_medecin: "Hémoptysie : explorer (TDM, fibroscopie).",
        message_patient: "Cracher du sang nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "tc_tabac", diagnostic: "Toux du fumeur / BPCO / cancer bronchique", arguments: [{ label: "tabac ± signaux d'alarme", w: 3, when: { q: "tc_tabac", eq: true } }, { label: "dyspnée progressive", w: 1, when: { q: "tc_dyspnee", eq: true } }],
        examens_a_discuter: ["Radiographie thoracique, EFR", "TDM si signaux d'alarme"] },
      { id: "tc_rgo", diagnostic: "Reflux gastro-œsophagien", arguments: [{ label: "pyrosis / remontées", w: 3, when: { q: "tc_rgo", eq: true } }],
        examens_a_discuter: ["Épreuve thérapeutique par IPP"] },
      { id: "tc_orl", diagnostic: "Écoulement postérieur / pathologie ORL", arguments: [{ label: "rhinorrhée postérieure / sinusite", w: 3, when: { q: "tc_ecoulement", eq: true } }],
        examens_a_discuter: ["Avis ORL", "Traitement local"] },
      { id: "tc_asthme", diagnostic: "Asthme / toux équivalent d'asthme", arguments: [{ label: "toux nocturne, sifflements, effort", w: 3, when: { q: "tc_asthme", eq: true } }],
        examens_a_discuter: ["EFR avec test de réversibilité"] },
      { id: "tc_iec", diagnostic: "Toux iatrogène (IEC)", arguments: [{ label: "prise d'un IEC", w: 3, when: { q: "tc_iec", eq: true } }],
        examens_a_discuter: ["Arrêt / substitution de l'IEC (test d'épreuve)"] }
    ],
    examens_clinique: ["Auscultation pulmonaire", "Examen ORL", "Radiographie thoracique"]
  },

  // -------------------------------------------------------------------------
  // DOULEUR ABDOMINALE
  // -------------------------------------------------------------------------
  douleur_abdominale: {
    id: "douleur_abdominale", symptome: "Douleur du ventre (douleur abdominale)", specialite: ["Digestif", "Chirurgie"], urgence: true,
    questions: [
      { id: "ab_siege", label: "Siège", type: "single_choice", question: "Où la douleur est-elle principalement ?",
        options: ["En haut à droite (sous les côtes)", "Au creux de l'estomac", "En bas à droite", "En bas (pelvis)", "Diffuse / tout le ventre"] },
      { id: "ab_defense", label: "Défense / contracture", type: "boolean", question: "Le ventre est-il dur et très douloureux quand on appuie ?" },
      { id: "ab_brutal", label: "Début brutal intense", type: "boolean", question: "La douleur est-elle apparue brutalement, très intense d'emblée ?" },
      { id: "ab_vomit", label: "Occlusion", type: "boolean", question: "Avez-vous des vomissements avec un arrêt des gaz et des selles ?" },
      { id: "ab_fievre", label: "Fièvre", type: "boolean", question: "Avez-vous de la fièvre ?" },
      { id: "ab_sang", label: "Saignement digestif", type: "boolean", question: "Avez-vous du sang dans les selles ou des selles noires ?" },
      { id: "ab_cardiaque", label: "Signes cardiaques", type: "boolean", question: "Avez-vous une douleur en haut du ventre avec essoufflement, sueurs, ou des antécédents cardiaques ?" }
    ],
    red_flags: [
      { id: "ab_rf_chir", niveau: 3, when: { any: [{ q: "ab_defense", eq: true }, { q: "ab_vomit", eq: true }] },
        message_medecin: "Défense abdominale ou occlusion (vomissements + arrêt du transit) : urgence chirurgicale.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ab_rf_vasculaire", niveau: 3, when: { all: [{ q: "ab_brutal", eq: true }, { ctx: "age", gte: 65 }] },
        message_medecin: "Douleur brutale intense chez le sujet âgé : éliminer une ischémie mésentérique, un anévrisme rompu.",
        message_patient: "Cette douleur nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ab_rf_geu", niveau: 3, when: { ctx: "grossessePossible", eq: true },
        message_medecin: "Femme en âge de procréer : β-hCG d'emblée (grossesse extra-utérine — voir fiche algie pelvienne).",
        message_patient: "Un test de grossesse fera partie du bilan ; consultez sans tarder." },
      { id: "ab_rf_cardiaque", niveau: 3, when: { q: "ab_cardiaque", eq: true },
        message_medecin: "Douleur épigastrique + signes cardiaques : éliminer un syndrome coronarien (ECG).",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "ab_appendicite", diagnostic: "Appendicite", arguments: [{ label: "fosse iliaque droite", w: 3, when: { q: "ab_siege", eq: "En bas à droite" } }, { label: "fièvre", w: 1, when: { q: "ab_fievre", eq: true } }, { label: "défense", w: 1, when: { q: "ab_defense", eq: true } }],
        examens_a_discuter: ["NFS/CRP", "Échographie / TDM", "Avis chirurgical"] },
      { id: "ab_biliaire", diagnostic: "Pathologie biliaire (colique hépatique / cholécystite)", arguments: [{ label: "hypochondre droit", w: 3, when: { q: "ab_siege", eq: "En haut à droite (sous les côtes)" } }, { label: "fièvre", w: 1, when: { q: "ab_fievre", eq: true } }],
        examens_a_discuter: ["Échographie hépato-biliaire", "Bilan hépatique"] },
      { id: "ab_gastrique", diagnostic: "Ulcère / gastrite", arguments: [{ label: "épigastrique", w: 3, when: { q: "ab_siege", eq: "Au creux de l'estomac" } }],
        examens_a_discuter: ["IPP, recherche H. pylori", "Endoscopie si signes d'alarme"] },
      { id: "ab_occlusion", diagnostic: "Occlusion intestinale", arguments: [{ label: "vomissements + arrêt du transit", w: 3, when: { q: "ab_vomit", eq: true } }],
        examens_a_discuter: ["Imagerie abdominale", "Avis chirurgical"] },
      { id: "ab_pelvien", diagnostic: "Cause pelvienne / gynécologique", arguments: [{ label: "douleur pelvienne", w: 2, when: { q: "ab_siege", eq: "En bas (pelvis)" } }, { label: "grossesse possible", w: 1, when: { ctx: "grossessePossible", eq: true } }],
        examens_a_discuter: ["β-hCG, échographie pelvienne (voir fiche algie pelvienne)"] },
      { id: "ab_vasculaire", diagnostic: "Cause vasculaire (ischémie mésentérique, anévrisme)", arguments: [{ label: "début brutal", w: 2, when: { q: "ab_brutal", eq: true } }, { label: "sujet âgé", w: 2, when: { ctx: "age", gte: 65 } }],
        examens_a_discuter: ["Angio-TDM abdominale", "Lactates"] }
    ],
    examens_clinique: ["Palpation abdominale (défense, contracture)", "Toucher rectal", "β-hCG chez la femme en âge de procréer", "ECG si douleur épigastrique", "Bandelette urinaire, température"]
  },

  // -------------------------------------------------------------------------
  // NAUSÉES / VOMISSEMENTS
  // -------------------------------------------------------------------------
  nausees_vomissements: {
    id: "nausees_vomissements", symptome: "Nausées et vomissements", specialite: ["Digestif"], urgence: true,
    questions: [
      { id: "nv_neuro", label: "Cause neurologique", type: "boolean", question: "Avez-vous des maux de tête intenses, une raideur de nuque, ou des signes neurologiques ?" },
      { id: "nv_abdo", label: "Cause chirurgicale", type: "boolean", question: "Avez-vous une douleur abdominale importante, un ventre dur, ou un arrêt des selles ?" },
      { id: "nv_sang", label: "Hématémèse", type: "boolean", question: "Vomissez-vous du sang ?" },
      { id: "nv_cardiaque", label: "Signes cardiaques", type: "boolean", question: "Avez-vous une douleur thoracique ou des sueurs associées ?" },
      { id: "nv_deshyd", label: "Déshydratation", type: "boolean", question: "N'arrivez-vous plus à boire, avec une déshydratation ?" },
      { id: "nv_vertige", label: "Cause vestibulaire", type: "boolean", question: "Y a-t-il des vertiges associés ?" },
      { id: "nv_medic", label: "Iatrogène / toxique", type: "boolean", question: "Avez-vous commencé un médicament, une chimiothérapie, ou bu de l'alcool en excès ?" }
    ],
    red_flags: [
      { id: "nv_rf_neuro", niveau: 3, when: { q: "nv_neuro", eq: true },
        message_medecin: "Vomissements + céphalée/raideur/signes neuro : cause neurologique (HTIC, méningite, hémorragie) → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "nv_rf_abdo", niveau: 3, when: { q: "nv_abdo", eq: true },
        message_medecin: "Vomissements + douleur abdominale / arrêt du transit : urgence chirurgicale (occlusion).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "nv_rf_sang", niveau: 3, when: { q: "nv_sang", eq: true },
        message_medecin: "Hématémèse : urgence (voir fiche dédiée).",
        message_patient: "Vomir du sang nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "nv_rf_cardiaque", niveau: 3, when: { q: "nv_cardiaque", eq: true },
        message_medecin: "Nausées + douleur thoracique/sueurs : éliminer un syndrome coronarien (ECG).",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "nv_rf_deshyd", niveau: 2, when: { q: "nv_deshyd", eq: true },
        message_medecin: "Intolérance alimentaire totale / déshydratation : réhydratation, surveillance.",
        message_patient: "Ne plus pouvoir boire nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "nv_neuro", diagnostic: "Cause neurologique", arguments: [{ label: "céphalée/raideur/signes neuro", w: 3, when: { q: "nv_neuro", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale, PL selon contexte"] },
      { id: "nv_chir", diagnostic: "Cause digestive chirurgicale (occlusion)", arguments: [{ label: "douleur abdo / arrêt du transit", w: 3, when: { q: "nv_abdo", eq: true } }],
        examens_a_discuter: ["Imagerie abdominale, avis chirurgical"] },
      { id: "nv_vestibulaire", diagnostic: "Cause vestibulaire", arguments: [{ label: "vertiges associés", w: 3, when: { q: "nv_vertige", eq: true } }],
        examens_a_discuter: ["Examen vestibulaire (voir fiche vertiges)"] },
      { id: "nv_iatrogene", diagnostic: "Cause iatrogène / toxique", arguments: [{ label: "médicament / alcool", w: 3, when: { q: "nv_medic", eq: true } }],
        examens_a_discuter: ["Revue de l'ordonnance"] },
      { id: "nv_digestive", diagnostic: "Cause digestive bénigne (gastro-entérite)", arguments: [{ label: "sans signe d'alarme", w: 2, when: { all: [{ q: "nv_neuro", eq: false }, { q: "nv_abdo", eq: false }] } }],
        examens_a_discuter: ["Réhydratation, surveillance"] }
    ],
    examens_clinique: ["Recherche de signes de déshydratation", "Palpation abdominale", "Examen neurologique", "β-hCG chez la femme en âge de procréer", "ECG si signes cardiaques"]
  },

  // -------------------------------------------------------------------------
  // PALPITATIONS
  // -------------------------------------------------------------------------
  palpitations: {
    id: "palpitations", symptome: "Palpitations", specialite: ["Cardiologie"], urgence: true,
    questions: [
      { id: "pa_syncope", label: "Signes de gravité", type: "boolean", question: "Pendant les palpitations, avez-vous un malaise, une perte de connaissance ou une douleur thoracique ?" },
      { id: "pa_regulier", label: "Type de rythme", type: "single_choice", question: "Comment ressentez-vous le rythme ?",
        options: ["Rapide et régulier", "Rapide et irrégulier", "À-coups isolés (extrasystoles)"] },
      { id: "pa_effort", label: "À l'effort", type: "boolean", question: "Surviennent-elles à l'effort ?" },
      { id: "pa_cardiopathie", label: "Cardiopathie / mort subite", type: "boolean", question: "Avez-vous une maladie cardiaque connue ou des morts subites dans la famille ?" },
      { id: "pa_thyroide", label: "Hyperthyroïdie", type: "boolean", question: "Avez-vous un amaigrissement, des tremblements, une intolérance à la chaleur ?" },
      { id: "pa_anxiete", label: "Contexte anxieux", type: "boolean", question: "Surviennent-elles dans un contexte de stress, avec fourmillements et oppression ?" },
      { id: "pa_excitants", label: "Excitants", type: "boolean", question: "Consommez-vous café, alcool, tabac, ou des excitants ?" }
    ],
    red_flags: [
      { id: "pa_rf_grave", niveau: 3, when: { any: [{ q: "pa_syncope", eq: true }, { all: [{ q: "pa_effort", eq: true }, { q: "pa_cardiopathie", eq: true }] }] },
        message_medecin: "Palpitations + syncope/douleur thoracique, ou à l'effort sur cardiopathie : trouble du rythme grave possible → ECG, avis cardiologique urgent.",
        message_patient: "Ces signes nécessitent une évaluation médicale rapide avec un électrocardiogramme." }
    ],
    diagnostics_differentiels: [
      { id: "pa_rythme", diagnostic: "Trouble du rythme (FA, tachycardie)", arguments: [{ label: "rapide irrégulier", w: 2, when: { q: "pa_regulier", eq: "Rapide et irrégulier" } }, { label: "rapide régulier", w: 2, when: { q: "pa_regulier", eq: "Rapide et régulier" } }, { label: "cardiopathie", w: 1, when: { q: "pa_cardiopathie", eq: true } }],
        examens_a_discuter: ["ECG (idéalement pendant les palpitations)", "Holter ECG"] },
      { id: "pa_thyroide", diagnostic: "Hyperthyroïdie", arguments: [{ label: "amaigrissement, tremblements, thermophobie", w: 3, when: { q: "pa_thyroide", eq: true } }],
        examens_a_discuter: ["TSH"] },
      { id: "pa_benin", diagnostic: "Palpitations bénignes / extrasystoles", arguments: [{ label: "à-coups isolés", w: 3, when: { q: "pa_regulier", eq: "À-coups isolés (extrasystoles)" } }, { label: "excitants", w: 1, when: { q: "pa_excitants", eq: true } }],
        examens_a_discuter: ["ECG (souvent normal), réassurance"] },
      { id: "pa_anxiete", diagnostic: "Anxiété", arguments: [{ label: "contexte anxieux", w: 3, when: { q: "pa_anxiete", eq: true } }],
        examens_a_discuter: ["Évaluation, après élimination de l'organique"] }
    ],
    examens_clinique: ["ECG", "Fréquence et régularité du pouls", "Pression artérielle", "TSH", "Auscultation cardiaque"]
  },

  // -------------------------------------------------------------------------
  // HTA / POUSSÉE HYPERTENSIVE
  // -------------------------------------------------------------------------
  hta: {
    id: "hta", symptome: "Hypertension artérielle / poussée tensionnelle", specialite: ["Cardiologie"], urgence: true,
    questions: [
      { id: "ht_signes", label: "Souffrance d'organe", type: "boolean", question: "Avez-vous : douleur thoracique, essoufflement, maux de tête intenses, troubles visuels, ou signes neurologiques ?" },
      { id: "ht_chiffres", label: "Chiffres très élevés", type: "boolean", question: "La tension est-elle très élevée (≥ 180/110) ?" },
      { id: "ht_contexte", label: "Découverte fortuite", type: "boolean", question: "Est-ce une découverte fortuite, sans aucun symptôme ?" },
      { id: "ht_renal", label: "Comorbidités", type: "boolean", question: "Avez-vous une maladie rénale, un diabète, ou des œdèmes ?" },
      { id: "ht_secondaire_indice", label: "Indices d'HTA secondaire", type: "boolean", question: "Avez-vous : un taux de potassium bas, des poussées avec sueurs/palpitations/maux de tête, un ronflement avec apnées, ou une HTA résistant à 3 médicaments ?" }
    ],
    red_flags: [
      { id: "ht_rf_urgence", niveau: 3, when: { all: [{ q: "ht_chiffres", eq: true }, { q: "ht_signes", eq: true }] },
        message_medecin: "Élévation tensionnelle avec souffrance d'organe (neuro/thoracique/visuelle/rénale) = URGENCE hypertensive → prise en charge immédiate, baisse contrôlée en milieu hospitalier.",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ht_rf_grossesse", niveau: 3, when: { all: [{ ctx: "grossessePossible", eq: true }, { q: "ht_chiffres", eq: true }] },
        message_medecin: "HTA + grossesse possible : éliminer une pré-éclampsie → avis obstétrical urgent.",
        message_patient: "Cette association nécessite une évaluation médicale sans attendre." },
      { id: "ht_rf_poussee_isolee", niveau: 1, when: { all: [{ q: "ht_chiffres", eq: true }, { q: "ht_signes", eq: false }] },
        message_medecin: "Élévation tensionnelle sévère SANS souffrance d'organe = poussée hypertensive simple, PAS une urgence : repos, ne pas faire baisser brutalement la TA (risque ischémique), rechercher un facteur (douleur, anxiété, arrêt de traitement), réévaluer et organiser le suivi.",
        message_patient: "Une tension élevée sans autre signe n'est pas une urgence : restez au calme et consultez votre médecin pour adapter le suivi." }
    ],
    diagnostics_differentiels: [
      { id: "ht_essentielle", diagnostic: "HTA essentielle (à confirmer)", arguments: [{ label: "découverte fortuite asymptomatique", w: 3, when: { q: "ht_contexte", eq: true } }],
        examens_a_discuter: ["Confirmer le diagnostic en dehors du cabinet (MAPA ou automesure) — écarter l'effet blouse blanche ; grades : 1 (140-159/90-99), 2 (160-179/100-109), 3 (≥ 180/110)", "Bilan initial : iono-créatinine-DFG, glycémie, bilan lipidique, bandelette urinaire (protéinurie), ECG ; évaluation du risque cardiovasculaire global", "Mesures hygiéno-diététiques (sel, poids, activité, alcool) ; traitement médicamenteux selon le risque"] },
      { id: "ht_urgence", diagnostic: "Urgence / poussée hypertensive", arguments: [{ label: "souffrance d'organe", w: 3, when: { q: "ht_signes", eq: true } }, { label: "chiffres très élevés", w: 1, when: { q: "ht_chiffres", eq: true } }],
        examens_a_discuter: ["Distinguer urgence hypertensive (AVEC souffrance d'organe) vs poussée simple (sans)", "Recherche de souffrance d'organe (fond d'œil, ECG, créatinine, troponine, BNP)"] },
      { id: "ht_secondaire", diagnostic: "HTA secondaire", arguments: [{ label: "indices évocateurs (hypokaliémie, paroxysmes, SAOS, résistance)", w: 3, when: { q: "ht_secondaire_indice", eq: true } }, { label: "sujet jeune", w: 2, when: { ctx: "age", lte: 35 } }, { label: "atteinte rénale / comorbidités", w: 1, when: { q: "ht_renal", eq: true } }],
        examens_a_discuter: ["Hyperaldostéronisme (rapport aldostérone/rénine si hypokaliémie) ; sténose de l'artère rénale (souffle, écho-doppler) ; phéochromocytome (métanéphrines si paroxysmes) ; SAOS ; causes rénales/médicamenteuses (AINS, corticoïdes, réglisse, vasoconstricteurs)", "Avis spécialisé"] }
    ],
    examens_clinique: ["Confirmer la TA au repos, aux deux bras, avec un brassard adapté (puis MAPA/automesure)", "Recherche d'une souffrance d'organe (fond d'œil, ECG, bandelette urinaire)", "Examen neurologique", "Auscultation cardiaque et des trajets vasculaires (souffle abdominal/fémoral) ; palpation des pouls"]
  },

  // -------------------------------------------------------------------------
  // ŒIL ROUGE
  // -------------------------------------------------------------------------
  oeil_rouge: {
    id: "oeil_rouge", symptome: "Œil rouge", specialite: ["Ophtalmologie"], urgence: true,
    questions: [
      { id: "or_douleur", label: "Douleur vraie", type: "boolean", question: "Avez-vous une douleur oculaire importante (et non une simple gêne) ?" },
      { id: "or_vision", label: "Baisse de vision", type: "boolean", question: "Avez-vous une baisse de la vision ?" },
      { id: "or_lentilles", label: "Port de lentilles", type: "boolean", question: "Portez-vous des lentilles de contact ?" },
      { id: "or_trauma", label: "Traumatisme / projection", type: "boolean", question: "Y a-t-il eu un traumatisme ou une projection (produit chimique, corps étranger) ?" },
      { id: "or_halos", label: "Glaucome aigu", type: "boolean", question: "Voyez-vous des halos autour des lumières, avec un œil dur et des maux de tête/nausées ?" },
      { id: "or_secretions", label: "Sécrétions", type: "boolean", question: "Avez-vous des sécrétions (yeux collés le matin) ?" },
      { id: "or_localise", label: "Hémorragie sous-conjonctivale", type: "boolean", question: "La rougeur est-elle localisée, indolore, sans baisse de vision ?" }
    ],
    red_flags: [
      { id: "or_rf_grave", niveau: 3, when: { any: [{ q: "or_douleur", eq: true }, { q: "or_vision", eq: true }, { q: "or_halos", eq: true }, { q: "or_lentilles", eq: true }] },
        message_medecin: "Œil rouge DOULOUREUX et/ou baisse de vision, halos, ou sous lentilles (kératite, uvéite, glaucome aigu) : avis ophtalmologique urgent.",
        message_patient: "Ces signes nécessitent une évaluation ophtalmologique urgente." },
      { id: "or_rf_chimique", niveau: 3, when: { q: "or_trauma", eq: true },
        message_medecin: "Traumatisme / brûlure chimique oculaire : rinçage abondant immédiat, avis urgent.",
        message_patient: "Rincez abondamment à l'eau et consultez en urgence." }
    ],
    diagnostics_differentiels: [
      { id: "or_conjonctivite", diagnostic: "Conjonctivite", arguments: [{ label: "sécrétions sans douleur vraie", w: 3, when: { q: "or_secretions", eq: true } }, { label: "pas de douleur", w: 1, when: { q: "or_douleur", eq: false } }],
        examens_a_discuter: ["Hygiène, traitement local"] },
      { id: "or_hemorragie", diagnostic: "Hémorragie sous-conjonctivale (bénigne)", arguments: [{ label: "rougeur localisée indolore", w: 3, when: { q: "or_localise", eq: true } }],
        examens_a_discuter: ["Réassurance", "Vérifier la TA / l'hémostase si récidive"] },
      { id: "or_keratite", diagnostic: "Kératite (notamment sous lentilles)", arguments: [{ label: "port de lentilles", w: 2, when: { q: "or_lentilles", eq: true } }, { label: "douleur", w: 2, when: { q: "or_douleur", eq: true } }],
        examens_a_discuter: ["Examen à la fluorescéine", "Avis ophtalmologique urgent"] },
      { id: "or_glaucome", diagnostic: "Glaucome aigu par fermeture de l'angle", arguments: [{ label: "halos + œil dur + nausées", w: 3, when: { q: "or_halos", eq: true } }],
        examens_a_discuter: ["Mesure du tonus oculaire", "Urgence ophtalmologique"] },
      { id: "or_uveite", diagnostic: "Uvéite", arguments: [{ label: "douleur + baisse de vision", w: 2, when: { all: [{ q: "or_douleur", eq: true }, { q: "or_vision", eq: true }] } }],
        examens_a_discuter: ["Avis ophtalmologique"] }
    ],
    examens_clinique: ["Acuité visuelle", "Examen à la fluorescéine", "Examen des pupilles", "Palpation du tonus oculaire", "Recherche d'un corps étranger"]
  },

  // -------------------------------------------------------------------------
  // CYSTITE / BRÛLURES URINAIRES
  // -------------------------------------------------------------------------
  cystite: {
    id: "cystite", symptome: "Brûlures urinaires / infection urinaire", specialite: ["Urologie", "Néphrologie"],
    questions: [
      { id: "cy_fievre", label: "Fièvre / douleur lombaire", type: "boolean", question: "Avez-vous de la fièvre, des frissons, ou une douleur du dos / du flanc ?" },
      { id: "cy_brulures", label: "Signes de cystite", type: "boolean", question: "Avez-vous des brûlures en urinant et des envies fréquentes ?" },
      { id: "cy_recidive", label: "Récidivante", type: "boolean", question: "Est-ce récidivant (au moins 4 épisodes par an) ?" },
      { id: "cy_terrain", label: "Terrain à risque", type: "boolean", question: "Êtes-vous diabétique, immunodéprimé, ou avez-vous une anomalie des voies urinaires ?" },
      { id: "cy_hematurie", label: "Hématurie", type: "boolean", question: "Y a-t-il du sang dans les urines ?" }
    ],
    red_flags: [
      { id: "cy_rf_pna", niveau: 2, when: { q: "cy_fievre", eq: true },
        message_medecin: "Fièvre / douleur lombaire : pyélonéphrite (infection urinaire haute) → ECBU, antibiothérapie ; signes de gravité (sepsis) = urgence.",
        message_patient: "De la fièvre avec une infection urinaire nécessite un avis médical rapide." },
      { id: "cy_rf_grossesse", niveau: 2, when: { ctx: "grossessePossible", eq: true },
        message_medecin: "Infection urinaire + grossesse possible : ECBU systématique et traitement (risque obstétrical).",
        message_patient: "En cas de grossesse possible, une analyse d'urines est nécessaire." },
      { id: "cy_rf_homme", niveau: 2, when: { ctx: "sexe", eq: "Homme" },
        message_medecin: "Infection urinaire de l'homme : prostatite à évoquer → ECBU, jamais « cystite simple ».",
        message_patient: "Chez l'homme, ce symptôme nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "cy_simple", diagnostic: "Cystite simple", arguments: [{ label: "signes de cystite isolés", w: 3, when: { q: "cy_brulures", eq: true } }, { label: "pas de fièvre", w: 1, when: { q: "cy_fievre", eq: false } }],
        examens_a_discuter: ["Bandelette urinaire", "ECBU si compliquée ou récidivante"] },
      { id: "cy_pna", diagnostic: "Pyélonéphrite aiguë", arguments: [{ label: "fièvre / douleur lombaire", w: 3, when: { q: "cy_fievre", eq: true } }],
        examens_a_discuter: ["ECBU, NFS/CRP", "Échographie si signes de gravité ou doute"] },
      { id: "cy_compliquee", diagnostic: "Cystite à risque de complication", arguments: [{ label: "grossesse possible", w: 2, when: { ctx: "grossessePossible", eq: true } }, { label: "terrain à risque", w: 2, when: { q: "cy_terrain", eq: true } }, { label: "récidivante", w: 1, when: { q: "cy_recidive", eq: true } }],
        examens_a_discuter: ["ECBU systématique"] },
      { id: "cy_prostatite", diagnostic: "Prostatite (homme)", arguments: [{ label: "homme", w: 3, when: { ctx: "sexe", eq: "Homme" } }],
        examens_a_discuter: ["ECBU", "Avis urologique"] }
    ],
    examens_clinique: ["Bandelette urinaire / ECBU", "Température", "Palpation lombaire (signe de Giordano)", "Toucher rectal si homme (prostate)"]
  },

  // -------------------------------------------------------------------------
  // ÉRUPTION CUTANÉE / URTICAIRE
  // -------------------------------------------------------------------------
  eruption_urticaire: {
    id: "eruption_urticaire", symptome: "Éruption cutanée / urticaire", specialite: ["Dermatologie"], urgence: true,
    questions: [
      { id: "er2_anaphylaxie", label: "Anaphylaxie / Quincke", type: "boolean", question: "Avez-vous un gonflement du visage, des lèvres ou de la gorge, une gêne respiratoire, ou un malaise ?" },
      { id: "er2_purpura", label: "Purpura", type: "boolean", question: "Y a-t-il des taches rouges ou violacées qui ne s'effacent PAS à la pression ?" },
      { id: "er2_fievre", label: "Fièvre", type: "boolean", question: "Avez-vous de la fièvre ?" },
      { id: "er2_muqueuses", label: "Atteinte muqueuse / bulles", type: "boolean", question: "Y a-t-il des bulles, un décollement de la peau, ou une atteinte de la bouche / des yeux ?" },
      { id: "er2_urticaire", label: "Urticaire typique", type: "boolean", question: "Est-ce des plaques rouges qui démangent et changent de place en quelques heures ?" },
      { id: "er2_medic", label: "Médicament récent", type: "boolean", question: "Avez-vous pris un nouveau médicament récemment ?" },
      { id: "er2_prurit", label: "Prurit / eczéma", type: "boolean", question: "Est-ce surtout des démangeaisons, avec une peau sèche ou un eczéma ?" }
    ],
    red_flags: [
      { id: "er2_rf_anaphylaxie", niveau: 3, when: { q: "er2_anaphylaxie", eq: true },
        message_medecin: "Œdème de Quincke / anaphylaxie : urgence vitale (adrénaline IM, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "er2_rf_purpura", niveau: 3, when: { all: [{ q: "er2_purpura", eq: true }, { q: "er2_fievre", eq: true }] },
        message_medecin: "Purpura fébrile : purpura fulminans à éliminer → antibiotique immédiat, 15.",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "er2_rf_grave", niveau: 3, when: { q: "er2_muqueuses", eq: true },
        message_medecin: "Atteinte muqueuse / bulles / décollement : toxidermie grave (Stevens-Johnson, Lyell) → urgence, arrêt du médicament suspect.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "er2_urticaire", diagnostic: "Urticaire", arguments: [{ label: "plaques mobiles et prurigineuses", w: 3, when: { q: "er2_urticaire", eq: true } }],
        examens_a_discuter: ["Éviction du facteur déclenchant", "Antihistaminiques"] },
      { id: "er2_toxidermie", diagnostic: "Toxidermie médicamenteuse", arguments: [{ label: "médicament récent", w: 3, when: { q: "er2_medic", eq: true } }, { label: "atteinte muqueuse", w: 1, when: { q: "er2_muqueuses", eq: true } }],
        examens_a_discuter: ["Arrêt du médicament", "Surveillance (signes de gravité)"] },
      { id: "er2_purpura", diagnostic: "Purpura", arguments: [{ label: "taches ne s'effaçant pas à la pression", w: 3, when: { q: "er2_purpura", eq: true } }],
        examens_a_discuter: ["NFS-plaquettes", "Urgence si fébrile"] },
      { id: "er2_eczema", diagnostic: "Eczéma / dermatite", arguments: [{ label: "prurit, peau sèche", w: 2, when: { q: "er2_prurit", eq: true } }],
        examens_a_discuter: ["Dermocorticoïdes, émollients, éviction"] }
    ],
    examens_clinique: ["Examiner toute la peau ET les muqueuses", "Vitropression (purpura ?)", "Recherche d'un signe de Nikolsky", "Constantes (TA, FC, SpO2) si signe de gravité"]
  },

  // -------------------------------------------------------------------------
  // ANXIÉTÉ / CRISE D'ANGOISSE
  // -------------------------------------------------------------------------
  anxiete: {
    id: "anxiete", symptome: "Anxiété / crise d'angoisse", specialite: ["Psychiatrie"], urgence: true,
    questions: [
      { id: "an_suicide", label: "Risque suicidaire", type: "boolean", question: "Avez-vous des idées noires ou des pensées de mort ?" },
      { id: "an_cardiaque", label: "Symptômes organiques", type: "boolean", question: "Pendant les crises : douleur thoracique, essoufflement marqué ou malaise, surtout si vous avez des facteurs de risque cardiaque ?" },
      { id: "an_panique", label: "Trouble panique", type: "boolean", question: "Avez-vous des crises brutales de peur intense avec palpitations, fourmillements, sensation de mort imminente ?" },
      { id: "an_thyroide", label: "Hyperthyroïdie", type: "boolean", question: "Avez-vous un amaigrissement, des tremblements, un cœur rapide en permanence ?" },
      { id: "an_depression", label: "Dépression associée", type: "boolean", question: "Avez-vous une tristesse, une perte d'intérêt, des troubles du sommeil persistants ?" },
      { id: "an_substance", label: "Substance / sevrage", type: "boolean", question: "Consommez-vous des excitants, ou êtes-vous en sevrage (alcool, médicaments) ?" }
    ],
    red_flags: [
      { id: "an_rf_suicide", niveau: 3, when: { q: "an_suicide", eq: true },
        message_medecin: "Idées suicidaires : évaluer le risque suicidaire (RUD) — ne pas laisser seul, avis psychiatrique urgent si risque élevé.",
        message_patient: "Si vous avez des idées noires, parlez-en immédiatement à un médecin ou appelez le 3114 (numéro national prévention suicide)." },
      { id: "an_rf_cardiaque", niveau: 2, when: { q: "an_cardiaque", eq: true },
        message_medecin: "Symptômes pouvant mimer une cause organique (cardiaque, EP) : éliminer l'organique avant de retenir l'anxiété (ECG selon contexte).",
        message_patient: "Ces symptômes méritent un examen médical pour écarter une cause physique." },
      { id: "an_rf_thyroide", niveau: 2, when: { q: "an_thyroide", eq: true },
        message_medecin: "Éliminer une hyperthyroïdie (TSH).",
        message_patient: "Un bilan thyroïdien pourra être proposé." }
    ],
    diagnostics_differentiels: [
      { id: "an_panique", diagnostic: "Trouble panique / anxiété", arguments: [{ label: "crises de panique typiques", w: 3, when: { q: "an_panique", eq: true } }],
        examens_a_discuter: ["Après élimination de l'organique : TCC, suivi"] },
      { id: "an_depression", diagnostic: "Épisode dépressif associé", arguments: [{ label: "tristesse, anhédonie, sommeil", w: 3, when: { q: "an_depression", eq: true } }],
        examens_a_discuter: ["Évaluation thymique, suivi"] },
      { id: "an_organique", diagnostic: "Cause organique (cardiaque, thyroïdienne, substance)", arguments: [{ label: "symptômes cardiaques", w: 2, when: { q: "an_cardiaque", eq: true } }, { label: "signes d'hyperthyroïdie", w: 2, when: { q: "an_thyroide", eq: true } }, { label: "substance / sevrage", w: 1, when: { q: "an_substance", eq: true } }],
        examens_a_discuter: ["ECG, TSH selon le contexte"] }
    ],
    examens_clinique: ["Évaluation du risque suicidaire", "Constantes (FC, TA, SpO2)", "ECG / TSH si doute organique"]
  },

  // -------------------------------------------------------------------------
  // CONFUSION AIGUË
  // -------------------------------------------------------------------------
  confusion: {
    id: "confusion", symptome: "Confusion aiguë", specialite: ["Neurologie", "Médecine interne"], urgence: true,
    questions: [
      { id: "co2_diabete", label: "Hypoglycémie", type: "boolean", question: "La personne est-elle diabétique (sous insuline ou comprimés) ?" },
      { id: "co2_fievre", label: "Fièvre", type: "boolean", question: "Y a-t-il de la fièvre ?" },
      { id: "co2_deficit", label: "Signes neurologiques", type: "boolean", question: "Y a-t-il des signes neurologiques (faiblesse, troubles de la parole, céphalée) ?" },
      { id: "co2_brutal", label: "Début brutal", type: "boolean", question: "Est-ce apparu brutalement (en heures ou jours) ?" },
      { id: "co2_medic", label: "Iatrogène / sevrage", type: "boolean", question: "Y a-t-il eu un changement de médicament, un sevrage (alcool), ou une intoxication ?" },
      { id: "co2_globe", label: "Facteur déclenchant", type: "boolean", question: "Y a-t-il une rétention d'urine, une constipation, une déshydratation, ou une infection (urinaire, pulmonaire) ?" }
    ],
    red_flags: [
      { id: "co2_rf_neuro", niveau: 3, when: { any: [{ q: "co2_deficit", eq: true }, { q: "co2_fievre", eq: true }] },
        message_medecin: "Confusion fébrile ou avec signes neurologiques : méningo-encéphalite / AVC → urgence (imagerie, PL).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "co2_rf_hypo", niveau: 3, when: { q: "co2_diabete", eq: true },
        message_medecin: "Glycémie capillaire immédiate (hypoglycémie = cause réversible à éliminer en premier).",
        message_patient: "Une vérification de la glycémie est nécessaire sans délai." },
      { id: "co2_rf_global", niveau: 2, when: { always: true },
        message_medecin: "Toute confusion aiguë est organique jusqu'à preuve du contraire : bilan étiologique (métabolique, infectieux, médicamenteux, neurologique).",
        message_patient: "Une confusion récente nécessite une évaluation médicale." }
    ],
    diagnostics_differentiels: [
      { id: "co2_neuro", diagnostic: "Cause neurologique (AVC, hémorragie)", arguments: [{ label: "signes neurologiques", w: 3, when: { q: "co2_deficit", eq: true } }, { label: "début brutal", w: 1, when: { q: "co2_brutal", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale"] },
      { id: "co2_infectieuse", diagnostic: "Cause infectieuse", arguments: [{ label: "fièvre", w: 3, when: { q: "co2_fievre", eq: true } }, { label: "facteur déclenchant (infection)", w: 1, when: { q: "co2_globe", eq: true } }],
        examens_a_discuter: ["Hémocultures, ECBU, radiographie", "PL si suspicion méningée"] },
      { id: "co2_metabolique", diagnostic: "Cause métabolique / iatrogène", arguments: [{ label: "médicament / sevrage", w: 2, when: { q: "co2_medic", eq: true } }, { label: "diabète (hypoglycémie)", w: 2, when: { q: "co2_diabete", eq: true } }],
        examens_a_discuter: ["Glycémie, ionogramme, calcémie", "Revue de l'ordonnance"] },
      { id: "co2_age", diagnostic: "Syndrome confusionnel du sujet âgé", arguments: [{ label: "sujet âgé", w: 2, when: { ctx: "age", gte: 75 } }, { label: "facteur déclenchant (globe, fécalome, infection)", w: 2, when: { q: "co2_globe", eq: true } }],
        examens_a_discuter: ["Rechercher : globe vésical, fécalome, infection, déshydratation"] }
    ],
    examens_clinique: ["Glycémie capillaire (en premier)", "Constantes (température, SpO2, TA)", "Examen neurologique", "Recherche d'un globe vésical / fécalome", "Bilan métabolique et infectieux"]
  },

  // -------------------------------------------------------------------------
  // PARALYSIE FACIALE
  // -------------------------------------------------------------------------
  paralysie_faciale: {
    id: "paralysie_faciale", symptome: "Paralysie faciale", specialite: ["Neurologie", "ORL"], urgence: true,
    questions: [
      { id: "pf_central", label: "Front épargné (central)", type: "boolean", question: "Pouvez-vous encore plisser le front et fermer fort l'œil du côté atteint (le haut du visage est-il épargné) ?" },
      { id: "pf_autres", label: "Autres signes neuro", type: "boolean", question: "Avez-vous d'autres signes : faiblesse d'un membre, troubles de la parole, de la vision ?" },
      { id: "pf_otalgie", label: "Zona auriculaire", type: "boolean", question: "Avez-vous des douleurs ou des vésicules dans l'oreille, ou une éruption ?" },
      { id: "pf_fievre", label: "Contexte infectieux / Lyme", type: "boolean", question: "Avez-vous de la fièvre, ou un contexte de piqûre de tique / maladie de Lyme ?" },
      { id: "pf_complet", label: "Inocclusion palpébrale", type: "boolean", question: "La fermeture de l'œil est-elle impossible de ce côté ?" }
    ],
    red_flags: [
      { id: "pf_rf_central", niveau: 3, when: { any: [{ q: "pf_central", eq: true }, { q: "pf_autres", eq: true }] },
        message_medecin: "Atteinte respectant le front ou autres signes neurologiques : paralysie faciale CENTRALE (AVC) → urgence (imagerie).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "pf_rf_zona", niveau: 2, when: { q: "pf_otalgie", eq: true },
        message_medecin: "Zona auriculaire (syndrome de Ramsay-Hunt) : antiviral précoce, avis ORL.",
        message_patient: "Ces signes nécessitent un avis médical rapide." },
      { id: "pf_rf_oeil", niveau: 2, when: { q: "pf_complet", eq: true },
        message_medecin: "Inocclusion palpébrale : protection cornéenne (larmes artificielles, occlusion nocturne).",
        message_patient: "Protégez votre œil (larmes artificielles) et consultez rapidement." }
    ],
    diagnostics_differentiels: [
      { id: "pf_bell", diagnostic: "Paralysie faciale périphérique a frigore (de Bell)", arguments: [{ label: "front non épargné, isolée", w: 2, when: { q: "pf_central", eq: false } }, { label: "pas d'autre signe neurologique", w: 2, when: { q: "pf_autres", eq: false } }],
        examens_a_discuter: ["Corticothérapie précoce", "Protection oculaire"] },
      { id: "pf_centrale", diagnostic: "Paralysie faciale centrale (AVC)", arguments: [{ label: "front épargné", w: 3, when: { q: "pf_central", eq: true } }, { label: "autres signes neuro", w: 2, when: { q: "pf_autres", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale urgente"] },
      { id: "pf_zona", diagnostic: "Zona auriculaire (Ramsay-Hunt)", arguments: [{ label: "douleur / vésicules de l'oreille", w: 3, when: { q: "pf_otalgie", eq: true } }],
        examens_a_discuter: ["Antiviral, avis ORL"] },
      { id: "pf_lyme", diagnostic: "Cause infectieuse (Lyme)", arguments: [{ label: "fièvre / contexte de Lyme", w: 2, when: { q: "pf_fievre", eq: true } }],
        examens_a_discuter: ["Sérologie de Lyme selon le contexte"] }
    ],
    examens_clinique: ["Tester le front (différencier central / périphérique)", "Tester la fermeture de l'œil", "Examen neurologique complet", "Otoscopie (vésicules)", "Recherche d'une morsure de tique"]
  },

  // -------------------------------------------------------------------------
  // ICTÈRE
  // -------------------------------------------------------------------------
  ictere: {
    id: "ictere", symptome: "Jaunisse (ictère)", specialite: ["Hépato-gastro-entérologie"], urgence: true,
    questions: [
      { id: "ic_douleur", label: "Angiocholite", type: "boolean", question: "Avez-vous une douleur sous les côtes à droite avec de la fièvre et des frissons ?" },
      { id: "ic_encephalo", label: "Encéphalopathie", type: "boolean", question: "Avez-vous une confusion ou une somnolence inhabituelle ?" },
      { id: "ic_urines", label: "Cholestase", type: "boolean", question: "Vos urines sont-elles foncées et vos selles décolorées ?" },
      { id: "ic_aeg", label: "AEG / amaigrissement", type: "boolean", question: "Avez-vous maigri ou une altération de l'état général ?" },
      { id: "ic_alcool", label: "Alcool / hépatite", type: "boolean", question: "Avez-vous une consommation d'alcool importante ou une hépatite connue ?" },
      { id: "ic_medic", label: "Hépatotoxique", type: "boolean", question: "Avez-vous pris un médicament hépatotoxique (paracétamol en excès) récemment ?" },
      { id: "ic_prurit", label: "Prurit", type: "boolean", question: "Avez-vous des démangeaisons ?" },
      { id: "ic_jeune", label: "Profil Gilbert", type: "boolean", question: "L'ictère est-il léger (surtout les yeux), apparu lors d'un jeûne ou d'une infection banale, avec des urines CLAIRES et aucun autre signe ?" },
      { id: "ic_anemie", label: "Hémolyse", type: "boolean", question: "Avez-vous une pâleur, une fatigue intense ou un essoufflement (anémie) ?" }
    ],
    red_flags: [
      { id: "ic_rf_angiocholite", niveau: 3, when: { q: "ic_douleur", eq: true },
        message_medecin: "Ictère + douleur + fièvre/frissons : angiocholite (obstacle biliaire infecté) → urgence.",
        message_patient: "Cette association nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ic_rf_fulminante", niveau: 3, when: { q: "ic_encephalo", eq: true },
        message_medecin: "Ictère + confusion : insuffisance hépatique aiguë (TP / facteur V) → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "ic_obstacle", diagnostic: "Ictère cholestatique / obstacle (lithiase, cancer)", arguments: [{ label: "urines foncées + selles décolorées", w: 2, when: { q: "ic_urines", eq: true } }, { label: "douleur biliaire", w: 2, when: { q: "ic_douleur", eq: true } }, { label: "prurit", w: 1, when: { q: "ic_prurit", eq: true } }],
        examens_a_discuter: ["Bilan hépatique (PAL/GGT, bilirubine conjuguée)", "Échographie des voies biliaires"] },
      { id: "ic_hepatite", diagnostic: "Hépatite (virale, alcoolique, médicamenteuse)", arguments: [{ label: "alcool / hépatite connue", w: 2, when: { q: "ic_alcool", eq: true } }, { label: "médicament hépatotoxique", w: 2, when: { q: "ic_medic", eq: true } }],
        examens_a_discuter: ["Transaminases, TP/facteur V", "Sérologies virales, paracétamolémie"] },
      { id: "ic_cancer", diagnostic: "Cancer (pancréas, voies biliaires)", arguments: [{ label: "AEG / amaigrissement", w: 2, when: { q: "ic_aeg", eq: true } }, { label: "ictère + urines foncées", w: 1, when: { q: "ic_urines", eq: true } }],
        examens_a_discuter: ["Imagerie (échographie / TDM)", "Avis spécialisé"] },
      { id: "ic_gilbert", diagnostic: "Syndrome de Gilbert (bilirubine non conjuguée, bénin)", arguments: [{ label: "ictère isolé déclenché par le jeûne/une infection, urines claires", w: 3, when: { q: "ic_jeune", eq: true } }],
        examens_a_discuter: ["Bilirubine non conjuguée modérément ↑ (< 80 µmol/L), fluctuante", "Tests hépatiques normaux, pas d'hémolyse (NFS, réticulocytes, haptoglobine normaux)", "Touche > 5 % de la population — aucun traitement, simple réassurance ; test génétique inutile sauf avant irinotécan"] },
      { id: "ic_hemolyse", diagnostic: "Ictère hémolytique (bilirubine non conjuguée)", arguments: [{ label: "signes d'anémie", w: 2, when: { q: "ic_anemie", eq: true } }, { label: "urines claires (pas de cholestase)", w: 1, when: { q: "ic_urines", eq: false } }],
        examens_a_discuter: ["NFS-réticulocytes, haptoglobine, LDH, bilirubine non conjuguée", "Test de Coombs, frottis sanguin"] }
    ],
    examens_clinique: ["Examen de la peau et des conjonctives", "Palpation hépatique + recherche d'une grosse vésicule", "Recherche d'ascite et de signes d'encéphalopathie", "Bilan hépatique : d'abord distinguer bilirubine NON conjuguée (Gilbert, hémolyse) vs CONJUGUÉE (cholestase, hépatite)", "Si cholestase (bili conjuguée + PAL/GGT ↑) : échographie des voies biliaires pour dilatation"]
  },

  // -------------------------------------------------------------------------
  // ECZÉMA / DERMATITE
  // -------------------------------------------------------------------------
  eczema: {
    id: "eczema", symptome: "Eczéma / dermatite", specialite: ["Dermatologie"],
    questions: [
      { id: "ec_prurit", label: "Prurit", type: "boolean", question: "Avez-vous des démangeaisons importantes ?" },
      { id: "ec_atopie", label: "Terrain atopique", type: "boolean", question: "Avez-vous un terrain atopique (asthme, rhinite, eczéma ancien) ?" },
      { id: "ec_contact", label: "Eczéma de contact", type: "boolean", question: "Les lésions sont-elles localisées à une zone de contact (bijou, cosmétique, produit professionnel) ?" },
      { id: "ec_suintant", label: "Surinfection", type: "boolean", question: "Les lésions sont-elles très rouges, suintantes, croûteuses, avec de la fièvre ?" },
      { id: "ec_herpes", label: "Eczéma herpétisé", type: "boolean", question: "Y a-t-il une aggravation brutale avec des vésicules creusées (ombiliquées), de la fièvre et une altération de l'état général ?" },
      { id: "ec_etendu", label: "Érythrodermie", type: "boolean", question: "L'éruption est-elle généralisée à presque tout le corps ?" }
    ],
    red_flags: [
      { id: "ec_rf_herpes", niveau: 3, when: { q: "ec_herpes", eq: true },
        message_medecin: "Suspicion d'eczéma herpétisé (syndrome de Kaposi-Juliusberg) : urgence (aciclovir IV).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ec_rf_erythro", niveau: 2, when: { q: "ec_etendu", eq: true },
        message_medecin: "Érythrodermie : avis dermatologique, recherche de complications (déshydratation, infection).",
        message_patient: "Une éruption généralisée nécessite un avis médical rapide." },
      { id: "ec_rf_surinfection", niveau: 2, when: { q: "ec_suintant", eq: true },
        message_medecin: "Eczéma impétiginisé (surinfection) : antibiothérapie adaptée.",
        message_patient: "Une surinfection nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ec_atopique", diagnostic: "Dermatite atopique", arguments: [{ label: "terrain atopique", w: 3, when: { q: "ec_atopie", eq: true } }, { label: "prurit", w: 1, when: { q: "ec_prurit", eq: true } }],
        examens_a_discuter: ["Émollients, dermocorticoïdes", "Éviction des irritants"] },
      { id: "ec_contact", diagnostic: "Eczéma de contact", arguments: [{ label: "zone de contact d'un allergène", w: 3, when: { q: "ec_contact", eq: true } }],
        examens_a_discuter: ["Éviction, dermocorticoïdes", "Tests épicutanés si récidive"] },
      { id: "ec_surinfecte", diagnostic: "Eczéma surinfecté", arguments: [{ label: "suintant, croûteux, fébrile", w: 3, when: { q: "ec_suintant", eq: true } }],
        examens_a_discuter: ["Antibiothérapie"] }
    ],
    examens_clinique: ["Topographie et morphologie des lésions", "Recherche de signes de surinfection", "Recherche d'un terrain atopique", "Recherche de vésicules ombiliquées (Kaposi-Juliusberg)", "Évaluer le retentissement : boucle prurit-grattage, sommeil, qualité de vie, anxiété/dépression (sur-risque dans les dermatoses chroniques)", "Si grattage/excoriations sans lésion d'eczéma typique : évoquer un prurit psychogène ou une dermatose factice (dermatillomanie)"]
  },

  // -------------------------------------------------------------------------
  // PSORIASIS
  // -------------------------------------------------------------------------
  psoriasis: {
    id: "psoriasis", symptome: "Psoriasis", specialite: ["Dermatologie"],
    questions: [
      { id: "ps_plaques", label: "Plaques typiques", type: "boolean", question: "Avez-vous des plaques rouges bien limitées avec des squames épaisses (coudes, genoux, cuir chevelu) ?" },
      { id: "ps_ongles", label: "Atteinte unguéale", type: "boolean", question: "Avez-vous des ongles abîmés (piquetés, décollés) ?" },
      { id: "ps_articulaire", label: "Rhumatisme psoriasique", type: "boolean", question: "Avez-vous des douleurs articulaires inflammatoires (raideur le matin) ?" },
      { id: "ps_pustules", label: "Forme pustuleuse", type: "boolean", question: "Avez-vous une poussée de pustules avec fièvre et altération de l'état général ?" },
      { id: "ps_etendu", label: "Érythrodermie", type: "boolean", question: "L'éruption est-elle généralisée à presque tout le corps ?" },
      { id: "ps_retentissement", label: "Retentissement moral", type: "boolean", question: "La maladie a-t-elle un fort retentissement moral (honte, évitement, anxiété, idées noires) ou touche-t-elle une zone très visible/gênante (visage, mains, organes génitaux) ?" }
    ],
    red_flags: [
      { id: "ps_rf_grave", niveau: 2, when: { any: [{ q: "ps_pustules", eq: true }, { q: "ps_etendu", eq: true }] },
        message_medecin: "Psoriasis pustuleux généralisé ou érythrodermique : forme grave → avis dermatologique urgent.",
        message_patient: "Cette forme nécessite un avis médical rapide." },
      { id: "ps_rf_psy", niveau: 2, when: { q: "ps_retentissement", eq: true },
        message_medecin: "Retentissement psychoaffectif majeur : le psoriasis comporte un sur-risque de dépression, d'anxiété et d'idéation suicidaire (d'autant plus que prurit, stigmatisation, atteinte visible). Dépister la souffrance psychique et la majorer la prise en charge (sévérité ressentie ≠ surface atteinte).",
        message_patient: "Le retentissement moral d'un psoriasis se soigne aussi — parlez-en à votre médecin." }
    ],
    diagnostics_differentiels: [
      { id: "ps_plaques", diagnostic: "Psoriasis en plaques", arguments: [{ label: "plaques squameuses typiques", w: 3, when: { q: "ps_plaques", eq: true } }, { label: "atteinte unguéale", w: 1, when: { q: "ps_ongles", eq: true } }],
        examens_a_discuter: ["Dermocorticoïdes, analogues de la vitamine D", "Avis dermatologique si étendu"] },
      { id: "ps_rhumatisme", diagnostic: "Rhumatisme psoriasique", arguments: [{ label: "arthralgies inflammatoires", w: 3, when: { q: "ps_articulaire", eq: true } }],
        examens_a_discuter: ["Avis rhumatologique"] },
      { id: "ps_grave", diagnostic: "Forme grave (pustuleuse / érythrodermique)", arguments: [{ label: "pustules + fièvre", w: 3, when: { q: "ps_pustules", eq: true } }, { label: "érythrodermie", w: 2, when: { q: "ps_etendu", eq: true } }],
        examens_a_discuter: ["Avis dermatologique urgent"] }
    ],
    examens_clinique: ["Topographie (coudes, genoux, cuir chevelu, ongles)", "Signe de la tache de bougie", "Examen articulaire (rhumatisme psoriasique : 20-30 % des cas)", "Évaluation du retentissement psychoaffectif et de la qualité de vie (anxiété, dépression, idées suicidaires — fréquence accrue)", "Dépistage des comorbidités associées (syndrome métabolique, obésité, HTA, risque cardiovasculaire)"]
  },

  // -------------------------------------------------------------------------
  // ZONA
  // -------------------------------------------------------------------------
  zona: {
    id: "zona", symptome: "Zona", specialite: ["Dermatologie", "Infectiologie"],
    questions: [
      { id: "zo_topo", label: "Topographie métamérique", type: "boolean", question: "L'éruption (vésicules en bouquet) est-elle limitée à une bande, d'un seul côté du corps ?" },
      { id: "zo_oeil", label: "Zona ophtalmique", type: "boolean", question: "L'éruption touche-t-elle le front, le nez ou l'œil ?" },
      { id: "zo_oreille", label: "Ramsay-Hunt", type: "boolean", question: "Y a-t-il une atteinte de l'oreille avec une paralysie du visage ?" },
      { id: "zo_immuno", label: "Immunodépression", type: "boolean", question: "Êtes-vous immunodéprimé, ou l'éruption est-elle très étendue ?" },
      { id: "zo_douleur", label: "Douleur", type: "boolean", question: "Avez-vous des douleurs importantes dans la zone ?" }
    ],
    red_flags: [
      { id: "zo_rf_ophtalmique", niveau: 2, when: { q: "zo_oeil", eq: true },
        message_medecin: "Zona ophtalmique (V1) : risque oculaire → avis ophtalmologique + antiviral en urgence (idéalement < 72 h).",
        message_patient: "Un zona près de l'œil nécessite un avis médical rapide." },
      { id: "zo_rf_ramsayhunt", niveau: 2, when: { q: "zo_oreille", eq: true },
        message_medecin: "Zona auriculaire (Ramsay-Hunt) : antiviral précoce, avis ORL.",
        message_patient: "Ces signes nécessitent un avis médical rapide." },
      { id: "zo_rf_immuno", niveau: 2, when: { q: "zo_immuno", eq: true },
        message_medecin: "Zona chez l'immunodéprimé / extensif : risque de dissémination → avis, antiviral (parfois IV).",
        message_patient: "Ce contexte nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "zo_zona", diagnostic: "Zona", arguments: [{ label: "éruption métamérique unilatérale", w: 3, when: { q: "zo_topo", eq: true } }, { label: "douleur", w: 1, when: { q: "zo_douleur", eq: true } }],
        examens_a_discuter: ["Antiviral précoce (< 72 h) si indication", "Antalgiques ; prévention des algies post-zostériennes"] },
      { id: "zo_ophtalmique", diagnostic: "Zona ophtalmique", arguments: [{ label: "atteinte du territoire V1", w: 3, when: { q: "zo_oeil", eq: true } }],
        examens_a_discuter: ["Avis ophtalmologique", "Antiviral en urgence"] },
      { id: "zo_complique", diagnostic: "Zona compliqué (immunodéprimé)", arguments: [{ label: "immunodépression / extensif", w: 3, when: { q: "zo_immuno", eq: true } }],
        examens_a_discuter: ["Avis spécialisé", "Antiviral (IV si grave)"] }
    ],
    examens_clinique: ["Topographie métamérique", "Recherche d'une atteinte V1 (signe de Hutchinson sur le nez)", "Examen oculaire / ORL selon la zone", "Recherche d'une immunodépression"]
  },

  // -------------------------------------------------------------------------
  // HERPÈS
  // -------------------------------------------------------------------------
  herpes: {
    id: "herpes", symptome: "Herpès", specialite: ["Dermatologie", "Infectiologie"],
    questions: [
      { id: "he2_recidive", label: "Récidivant au même endroit", type: "boolean", question: "Est-ce récidivant, toujours au même endroit (bouton de fièvre / herpès génital) ?" },
      { id: "he2_genital", label: "Localisation génitale", type: "boolean", question: "Les lésions sont-elles génitales ?" },
      { id: "he2_oeil", label: "Atteinte oculaire", type: "boolean", question: "Y a-t-il une atteinte de l'œil (rougeur, douleur, baisse de vision) ?" },
      { id: "he2_immuno", label: "Immunodépression / extension", type: "boolean", question: "Êtes-vous immunodéprimé, ou les lésions sont-elles très étendues ?" },
      { id: "he2_eczema", label: "Eczéma herpétisé", type: "boolean", question: "Avez-vous un eczéma avec une aggravation brutale et de la fièvre ?" }
    ],
    red_flags: [
      { id: "he2_rf_oeil", niveau: 2, when: { q: "he2_oeil", eq: true },
        message_medecin: "Herpès oculaire (kératite herpétique) : avis ophtalmologique urgent (NE PAS appliquer de corticoïdes).",
        message_patient: "Une atteinte de l'œil nécessite un avis ophtalmologique rapide." },
      { id: "he2_rf_grossesse", niveau: 2, when: { all: [{ q: "he2_genital", eq: true }, { ctx: "grossessePossible", eq: true }] },
        message_medecin: "Herpès génital + grossesse possible : risque néonatal → avis obstétrical.",
        message_patient: "Ce contexte nécessite un avis médical." },
      { id: "he2_rf_grave", niveau: 2, when: { any: [{ q: "he2_immuno", eq: true }, { q: "he2_eczema", eq: true }] },
        message_medecin: "Herpès de l'immunodéprimé / eczéma herpétisé : forme grave → antiviral, avis.",
        message_patient: "Ce contexte nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "he2_recidivant", diagnostic: "Herpès labial / génital récidivant", arguments: [{ label: "récidives au même endroit", w: 3, when: { q: "he2_recidive", eq: true } }, { label: "localisation génitale", w: 1, when: { q: "he2_genital", eq: true } }],
        examens_a_discuter: ["Antiviral si gênant / fréquent", "Mesures de prévention de la transmission"] },
      { id: "he2_oculaire", diagnostic: "Herpès oculaire", arguments: [{ label: "atteinte de l'œil", w: 3, when: { q: "he2_oeil", eq: true } }],
        examens_a_discuter: ["Avis ophtalmologique urgent"] },
      { id: "he2_grave", diagnostic: "Forme grave (immunodéprimé / eczéma herpétisé)", arguments: [{ label: "immunodépression / extension", w: 3, when: { q: "he2_immuno", eq: true } }, { label: "eczéma herpétisé", w: 2, when: { q: "he2_eczema", eq: true } }],
        examens_a_discuter: ["Aciclovir, avis spécialisé"] }
    ],
    examens_clinique: ["Morphologie vésiculeuse en bouquet", "Localisation (labiale, génitale, oculaire)", "Examen oculaire si atteinte faciale", "Recherche d'un terrain à risque"]
  },

  // -------------------------------------------------------------------------
  // MYCOSE CUTANÉE
  // -------------------------------------------------------------------------
  mycose_cutanee: {
    id: "mycose_cutanee", symptome: "Mycose cutanée / intertrigo", specialite: ["Dermatologie"],
    questions: [
      { id: "my_intertrigo", label: "Intertrigo", type: "boolean", question: "Est-ce dans un pli (aine, sous les seins, entre les orteils), rouge avec des démangeaisons ?" },
      { id: "my_anneau", label: "Dermatophytie", type: "boolean", question: "Est-ce une plaque ronde qui s'étend en anneau, avec une bordure active ?" },
      { id: "my_ongle", label: "Onychomycose", type: "boolean", question: "Un ongle est-il épaissi, jauni, décollé ?" },
      { id: "my_muqueuse", label: "Candidose", type: "boolean", question: "Y a-t-il une atteinte de la bouche (enduit blanc) ou génitale ?" },
      { id: "my_teigne", label: "Teigne", type: "boolean", question: "S'agit-il d'un enfant avec une ou plusieurs plaques du cuir chevelu, squameuses, avec chute des cheveux ?" },
      { id: "my_versicolor", label: "Pityriasis versicolor", type: "boolean", question: "Y a-t-il des petites taches du tronc/dos, plus claires ou plus foncées, fines squames, surtout après le soleil ?" },
      { id: "my_corticoide", label: "Corticoïde local", type: "boolean", question: "Avez-vous appliqué une crème à la cortisone sur la lésion (avec aggravation/extension) ?" },
      { id: "my_diabete", label: "Terrain favorisant", type: "boolean", question: "Êtes-vous diabétique, immunodéprimé, ou sous antibiotiques/corticoïdes ?" }
    ],
    red_flags: [
      { id: "my_rf_immuno", niveau: 2, when: { q: "my_muqueuse", eq: true },
        message_medecin: "Candidose buccale / récidivante : rechercher un facteur favorisant (diabète, immunodépression, VIH, corticoïdes inhalés).",
        message_patient: "Une mycose de la bouche peut nécessiter de rechercher une cause favorisante." },
      { id: "my_rf_teigne", niveau: 2, when: { q: "my_teigne", eq: true },
        message_medecin: "Teigne du cuir chevelu (enfant +++) : prélèvement mycologique AVANT traitement, traitement antifongique SYSTÉMIQUE obligatoire (un traitement local seul est insuffisant), éviction scolaire jusqu'à preuve de prise en charge, dépistage de l'entourage (familial/collectivité) et de l'animal.",
        message_patient: "Une mycose du cuir chevelu de l'enfant nécessite une consultation : le traitement passe par voie orale et un contrôle de l'entourage." },
      { id: "my_rf_pied_diab", niveau: 2, when: { all: [{ q: "my_intertrigo", eq: true }, { q: "my_diabete", eq: true }] },
        message_medecin: "Intertrigo inter-orteils chez un diabétique/immunodéprimé : porte d'entrée d'érysipèle/dermohypodermite — traiter la mycose et surveiller les signes d'infection bactérienne.",
        message_patient: "Chez une personne diabétique, une mycose entre les orteils doit être soignée car elle peut favoriser une infection de la peau." }
    ],
    diagnostics_differentiels: [
      { id: "my_dd_intertrigo", diagnostic: "Intertrigo (dermatophyte / candida)", arguments: [{ label: "atteinte d'un pli", w: 3, when: { q: "my_intertrigo", eq: true } }],
        examens_a_discuter: ["Prélèvement mycologique si doute", "Antifongique local", "Assécher les plis (dermatophyte : grands plis/inter-orteils ; candida : fond du pli, pustules satellites)"] },
      { id: "my_dermatophytie", diagnostic: "Dermatophytie (herpès circiné)", arguments: [{ label: "plaque annulaire à bordure active", w: 3, when: { q: "my_anneau", eq: true } }],
        examens_a_discuter: ["Antifongique local", "Prélèvement mycologique si lésions multiples / résistance"] },
      { id: "my_teigne_dd", diagnostic: "Teigne (Tinea capitis / barbae)", arguments: [{ label: "plaque alopécique squameuse du cuir chevelu (enfant)", w: 3, when: { q: "my_teigne", eq: true } }],
        examens_a_discuter: ["Prélèvement mycologique AVANT traitement", "Examen en lumière de Wood (fluorescence des teignes microsporiques)", "Antifongique systémique (griséofulvine/terbinafine) + local adjuvant", "Éviction et dépistage de l'entourage / de l'animal"] },
      { id: "my_onychomycose", diagnostic: "Onychomycose", arguments: [{ label: "ongle épaissi / décollé", w: 3, when: { q: "my_ongle", eq: true } }],
        examens_a_discuter: ["Prélèvement mycologique AVANT traitement (long)"] },
      { id: "my_versicolor_dd", diagnostic: "Pityriasis versicolor (Malassezia)", arguments: [{ label: "macules dyschromiques du tronc, fines squames", w: 3, when: { q: "my_versicolor", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique (signe du copeau)", "Antifongique local (kétoconazole) ; récidives fréquentes ; la dépigmentation persiste après guérison"] },
      { id: "my_candidose", diagnostic: "Candidose", arguments: [{ label: "atteinte muqueuse", w: 3, when: { q: "my_muqueuse", eq: true } }, { label: "terrain favorisant", w: 1, when: { q: "my_diabete", eq: true } }],
        examens_a_discuter: ["Antifongique", "Recherche d'un facteur favorisant"] },
      { id: "my_incognito", diagnostic: "Dermatophytie modifiée par les corticoïdes (tinea incognito)", arguments: [{ label: "lésion aggravée/atypique après dermocorticoïde", w: 2, when: { q: "my_corticoide", eq: true } }],
        examens_a_discuter: ["Arrêt du dermocorticoïde", "Prélèvement mycologique (aspect trompeur)", "Antifongique adapté"] }
    ],
    examens_clinique: ["Examen des plis, des ongles, des muqueuses et du cuir chevelu", "Prélèvement mycologique si doute, lésion résistante, ou avant tout traitement systémique (ongle, cuir chevelu)", "Examen en lumière de Wood si suspicion de teigne", "Recherche d'un terrain favorisant (diabète, immunodépression, macération, antibiotiques/corticoïdes)"]
  },

  // -------------------------------------------------------------------------
  // IMPÉTIGO
  // -------------------------------------------------------------------------
  impetigo: {
    id: "impetigo", symptome: "Impétigo", specialite: ["Dermatologie", "Pédiatrie"],
    questions: [
      { id: "im_croutes", label: "Croûtes mélicériques / bulles", type: "boolean", question: "Avez-vous des croûtes jaunâtres couleur miel ou des bulles, souvent autour du nez/de la bouche ?" },
      { id: "im_fievre", label: "Fièvre / extension", type: "boolean", question: "Avez-vous de la fièvre ou une extension rapide des lésions ?" },
      { id: "im_etendu", label: "Lésions étendues", type: "boolean", question: "Les lésions sont-elles nombreuses ou étendues ?" },
      { id: "im_glomerulo", label: "Glomérulonéphrite post-strepto", type: "boolean", question: "Avez-vous, après l'infection, des urines foncées/mousseuses ou des œdèmes ?" },
      { id: "im_ssss", label: "Décollement cutané (nourrisson)", type: "boolean", question: "S'agit-il d'un nourrisson/jeune enfant avec fièvre, peau rouge douloureuse et décollement en lambeaux (comme une brûlure) ?" },
      { id: "im_sousjacent", label: "Dermatose sous-jacente", type: "boolean", question: "Les lésions surviennent-elles sur un eczéma, une gale, ou des lésions de grattage préexistantes ?" }
    ],
    red_flags: [
      { id: "im_rf_ssss", niveau: 3, when: { q: "im_ssss", eq: true },
        message_medecin: "Décollement cutané étendu fébrile du jeune enfant : épidermolyse staphylococcique aiguë (SSSS / syndrome de Ritter) → hospitalisation, antibiothérapie antistaphylococcique IV, prise en charge type brûlé.",
        message_patient: "Une peau qui se décolle avec de la fièvre chez un enfant est une urgence — consultez sans attendre." },
      { id: "im_rf_extensif", niveau: 2, when: { any: [{ q: "im_fievre", eq: true }, { q: "im_etendu", eq: true }] },
        message_medecin: "Impétigo étendu / fébrile : antibiothérapie générale (antistaphylococcique/antistreptococcique), éviction.",
        message_patient: "Une forme étendue nécessite un avis médical." },
      { id: "im_rf_gn", niveau: 2, when: { q: "im_glomerulo", eq: true },
        message_medecin: "Signes de glomérulonéphrite post-streptococcique : avis (protéinurie, créatinine, TA).",
        message_patient: "Ces signes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "im_impetigo", diagnostic: "Impétigo", arguments: [{ label: "croûtes mélicériques / bulles", w: 3, when: { q: "im_croutes", eq: true } }],
        examens_a_discuter: ["Forme peu étendue : antibiothérapie locale (mupirocine) + hygiène ; forme étendue/multiple : antibiothérapie générale", "Éviction scolaire jusqu'à guérison (ou 72 h après le début du traitement) ; mesures d'hygiène, lavage, ongles courts"] },
      { id: "im_impetiginisation", diagnostic: "Impétiginisation d'une dermatose sous-jacente", arguments: [{ label: "sur eczéma, gale, lésions de grattage", w: 3, when: { q: "im_sousjacent", eq: true } }],
        examens_a_discuter: ["Traiter l'impétigo ET la dermatose causale (eczéma, gale, pédiculose) sinon récidive", "Rechercher et traiter l'entourage (gale, portage)"] }
    ],
    examens_clinique: ["Morphologie (croûtes mélicériques, bulles ; décollement = forme bulleuse/SSSS)", "Étendue des lésions", "Recherche d'une porte d'entrée et d'une dermatose sous-jacente (eczéma, gale)", "Bandelette urinaire si suspicion de GN post-streptococcique"]
  },

  // -------------------------------------------------------------------------
  // ACNÉ
  // -------------------------------------------------------------------------
  acne: {
    id: "acne", symptome: "Acné", specialite: ["Dermatologie"],
    questions: [
      { id: "ac2_comedons", label: "Acné commune", type: "boolean", question: "Avez-vous des points noirs/blancs (comédons) et des boutons du visage ou du dos ?" },
      { id: "ac2_nodules", label: "Forme sévère", type: "boolean", question: "Avez-vous des nodules profonds, douloureux, laissant des cicatrices ?" },
      { id: "ac2_sopk", label: "Hyperandrogénie", type: "boolean", question: "Avez-vous des règles irrégulières et une pilosité excessive ?" },
      { id: "ac2_medic", label: "Iatrogène", type: "boolean", question: "Prenez-vous des médicaments (corticoïdes, androgènes, certains) ?" },
      { id: "ac2_fulminans", label: "Acné fulminans", type: "boolean", question: "L'aggravation est-elle brutale, très inflammatoire/ulcérée, avec fièvre, douleurs articulaires ou malaise général ?" },
      { id: "ac2_rosacee", label: "Profil rosacée", type: "boolean", question: "Êtes-vous un adulte avec des rougeurs du visage, des bouffées vasomotrices (flush) et des petits vaisseaux, MAIS sans points noirs (comédons) ?" }
    ],
    red_flags: [
      { id: "ac2_rf_fulminans", niveau: 2, when: { q: "ac2_fulminans", eq: true },
        message_medecin: "Acné fulminans (début brutal, lésions ulcéro-nécrotiques, fièvre, arthralgies, AEG) : forme rare et grave → avis dermatologique urgent (corticothérapie, prudence avec l'isotrétinoïne).",
        message_patient: "Une acné brutale avec fièvre et douleurs nécessite un avis médical rapide." },
      { id: "ac2_rf_severe", niveau: 2, when: { q: "ac2_nodules", eq: true },
        message_medecin: "Acné nodulaire / conglobata sévère : risque cicatriciel → avis dermatologique (isotrétinoïne). Sous isotrétinoïne : contraception efficace obligatoire (tératogène, programme de prévention de la grossesse), surveillance hépatique/lipidique, vigilance sur l'humeur.",
        message_patient: "Une acné sévère mérite un avis dermatologique pour éviter les cicatrices." }
    ],
    diagnostics_differentiels: [
      { id: "ac2_commune", diagnostic: "Acné commune", arguments: [{ label: "comédons + lésions inflammatoires", w: 3, when: { q: "ac2_comedons", eq: true } }],
        examens_a_discuter: ["Traitements topiques (rétinoïdes, peroxyde de benzoyle) ± antibiotique ; éviter l'antibiothérapie prolongée en monothérapie", "Diagnostic clinique, pas de bilan hormonal si acné isolée typique"] },
      { id: "ac2_severe", diagnostic: "Acné sévère (nodulaire / conglobata)", arguments: [{ label: "nodules / cicatrices", w: 3, when: { q: "ac2_nodules", eq: true } }],
        examens_a_discuter: ["Avis dermatologique (isotrétinoïne : contraception, bilan hépatique/lipidique, humeur)"] },
      { id: "ac2_rosacee", diagnostic: "Rosacée (diagnostic différentiel chez l'adulte)", arguments: [{ label: "érythème/flush/télangiectasies sans comédons", w: 3, when: { q: "ac2_rosacee", eq: true } }],
        examens_a_discuter: ["Pas de comédons (≠ acné) ; éviction des facteurs déclenchants (soleil, alcool, épices)", "Métronidazole/ivermectine topique, doxycycline ; avis si rosacée oculaire"] },
      { id: "ac2_hormonale", diagnostic: "Acné d'origine hormonale (SOPK)", arguments: [{ label: "signes d'hyperandrogénie", w: 3, when: { q: "ac2_sopk", eq: true } }],
        examens_a_discuter: ["Bilan hormonal", "Avis gynéco / endocrino"] }
    ],
    examens_clinique: ["Type et sévérité des lésions (comédons, papulo-pustules, nodules, cicatrices)", "Retentissement psychologique (qualité de vie)", "Recherche de signes d'hyperandrogénie ; distinguer une rosacée (adulte, pas de comédons)"]
  },

  // -------------------------------------------------------------------------
  // PIQÛRE D'INSECTE
  // -------------------------------------------------------------------------
  piqure_insecte: {
    id: "piqure_insecte", symptome: "Piqûre d'insecte / morsure d'arthropode", specialite: ["Dermatologie", "Urgences"], urgence: true,
    questions: [
      { id: "pi_anaphylaxie", label: "Anaphylaxie", type: "boolean", question: "Avez-vous un gonflement du visage/de la gorge, une gêne respiratoire, ou un malaise ?" },
      { id: "pi_tique", label: "Tique / érythème migrant", type: "boolean", question: "S'agit-il d'une piqûre de tique, ou avez-vous une plaque rouge qui s'étend en anneau (jours/semaines après) ?" },
      { id: "pi_cellulite", label: "Surinfection", type: "boolean", question: "La zone est-elle très rouge, chaude, étendue, avec de la fièvre ?" },
      { id: "pi_venimeux", label: "Animal venimeux / multiples", type: "boolean", question: "Y a-t-il de nombreuses piqûres ou un animal venimeux (frelon, scorpion, serpent) ?" }
    ],
    red_flags: [
      { id: "pi_rf_anaphylaxie", niveau: 3, when: { q: "pi_anaphylaxie", eq: true },
        message_medecin: "Réaction anaphylactique : urgence vitale (adrénaline IM, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "pi_rf_venimeux", niveau: 3, when: { q: "pi_venimeux", eq: true },
        message_medecin: "Envenimation / piqûres multiples : surveillance, avis (centre antipoison).",
        message_patient: "Ce contexte nécessite une évaluation médicale urgente." },
      { id: "pi_rf_lyme", niveau: 2, when: { q: "pi_tique", eq: true },
        message_medecin: "Piqûre de tique / érythème migrant : maladie de Lyme → antibiothérapie ; retrait précoce de la tique.",
        message_patient: "Une piqûre de tique avec rougeur qui s'étend nécessite un avis médical." },
      { id: "pi_rf_cellulite", niveau: 2, when: { q: "pi_cellulite", eq: true },
        message_medecin: "Surinfection (dermohypodermite) : antibiothérapie.",
        message_patient: "Une zone très rouge et chaude avec fièvre nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "pi_locale", diagnostic: "Réaction locale banale", arguments: [{ label: "sans signe général ni surinfection", w: 2, when: { all: [{ q: "pi_anaphylaxie", eq: false }, { q: "pi_cellulite", eq: false }] } }],
        examens_a_discuter: ["Antihistaminique, dermocorticoïde", "Glace, surveillance"] },
      { id: "pi_anaphylaxie", diagnostic: "Anaphylaxie", arguments: [{ label: "signes généraux / respiratoires", w: 3, when: { q: "pi_anaphylaxie", eq: true } }],
        examens_a_discuter: ["Adrénaline IM"] },
      { id: "pi_lyme", diagnostic: "Maladie de Lyme (érythème migrant)", arguments: [{ label: "tique / érythème migrant", w: 3, when: { q: "pi_tique", eq: true } }],
        examens_a_discuter: ["Antibiothérapie (amoxicilline/doxycycline)"] },
      { id: "pi_surinfection", diagnostic: "Surinfection (dermohypodermite)", arguments: [{ label: "rouge, chaud, fébrile", w: 3, when: { q: "pi_cellulite", eq: true } }],
        examens_a_discuter: ["Antibiothérapie"] }
    ],
    examens_clinique: ["Examen de la lésion et signes généraux", "Recherche d'un érythème migrant", "Retrait d'une tique le cas échéant", "Statut vaccinal antitétanique"]
  },

  // -------------------------------------------------------------------------
  // BRÛLURE
  // -------------------------------------------------------------------------
  brulure: {
    id: "brulure", symptome: "Brûlure", specialite: ["Dermatologie", "Urgences"], urgence: true,
    questions: [
      { id: "br_etendue", label: "Étendue", type: "boolean", question: "La brûlure est-elle étendue (plus grande que la paume de la main) ou touche-t-elle plusieurs zones ?" },
      { id: "br_profonde", label: "Profondeur", type: "boolean", question: "La peau est-elle blanche, cartonnée ou noire, ou la zone est-elle indolore (brûlure profonde) ?" },
      { id: "br_zone", label: "Zone fonctionnelle", type: "boolean", question: "Touche-t-elle le visage, les mains, les pieds, les organes génitaux, ou une articulation ?" },
      { id: "br_inhalation", label: "Inhalation / voies aériennes", type: "boolean", question: "Y a-t-il eu inhalation de fumée, brûlure de la face, ou une voix rauque ?" },
      { id: "br_electrique", label: "Électrique / chimique", type: "boolean", question: "Est-ce une brûlure électrique ou chimique ?" }
    ],
    red_flags: [
      { id: "br_rf_grave", niveau: 3, when: { any: [{ q: "br_etendue", eq: true }, { q: "br_profonde", eq: true }, { q: "br_inhalation", eq: true }, { q: "br_electrique", eq: true }] },
        message_medecin: "Brûlure étendue / profonde / des voies aériennes / électrique ou chimique : urgence (centre des brûlés, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "br_rf_zone", niveau: 2, when: { q: "br_zone", eq: true },
        message_medecin: "Brûlure de zone fonctionnelle (visage, mains, périnée, articulations) : avis spécialisé.",
        message_patient: "Une brûlure de ces zones nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "br_superficielle", diagnostic: "Brûlure superficielle peu étendue", arguments: [{ label: "ni étendue ni profonde", w: 2, when: { all: [{ q: "br_etendue", eq: false }, { q: "br_profonde", eq: false }] } }],
        examens_a_discuter: ["Refroidir, pansement, antalgiques", "Mise à jour antitétanique"] },
      { id: "br_grave", diagnostic: "Brûlure grave", arguments: [{ label: "étendue", w: 2, when: { q: "br_etendue", eq: true } }, { label: "profonde", w: 2, when: { q: "br_profonde", eq: true } }, { label: "inhalation", w: 2, when: { q: "br_inhalation", eq: true } }, { label: "électrique / chimique", w: 1, when: { q: "br_electrique", eq: true } }],
        examens_a_discuter: ["Réanimation (remplissage)", "Orientation vers un centre des brûlés"] }
    ],
    examens_clinique: ["Estimer la surface brûlée (% de surface corporelle)", "Évaluer la profondeur", "Repérer les zones fonctionnelles", "Rechercher des signes d'inhalation", "Statut antitétanique"]
  },

  // -------------------------------------------------------------------------
  // PLAIE
  // -------------------------------------------------------------------------
  plaie: {
    id: "plaie", symptome: "Plaie", specialite: ["Urgences", "Chirurgie"],
    questions: [
      { id: "pl_morsure", label: "Morsure", type: "boolean", question: "S'agit-il d'une morsure (animale ou humaine) ?" },
      { id: "pl_profonde", label: "Plaie profonde / complexe", type: "boolean", question: "La plaie est-elle profonde, souillée, avec un corps étranger, ou une perte de mobilité/sensibilité (tendon/nerf) ?" },
      { id: "pl_infectee", label: "Plaie infectée", type: "boolean", question: "La plaie est-elle rouge, chaude, gonflée, avec du pus ou de la fièvre ?" },
      { id: "pl_tetanos", label: "Tétanos non à jour", type: "boolean", question: "Votre vaccination contre le tétanos date-t-elle de plus de 10-20 ans, ou ne le savez-vous pas ?" }
    ],
    red_flags: [
      { id: "pl_rf_profonde", niveau: 2, when: { q: "pl_profonde", eq: true },
        message_medecin: "Plaie profonde / atteinte tendineuse-nerveuse / corps étranger : exploration, avis chirurgical.",
        message_patient: "Cette plaie nécessite un avis médical rapide." },
      { id: "pl_rf_morsure", niveau: 2, when: { q: "pl_morsure", eq: true },
        message_medecin: "Morsure : risque infectieux (pas de suture d'emblée selon les cas), antibioprophylaxie au besoin, vérifier tétanos et rage.",
        message_patient: "Une morsure nécessite un avis médical." },
      { id: "pl_rf_infectee", niveau: 2, when: { q: "pl_infectee", eq: true },
        message_medecin: "Plaie infectée : parage, antibiothérapie, recherche de complications.",
        message_patient: "Une plaie infectée nécessite un avis médical." },
      { id: "pl_rf_tetanos", niveau: 2, when: { q: "pl_tetanos", eq: true },
        message_medecin: "Couverture antitétanique incertaine : mise à jour (VAT ± immunoglobulines selon le risque).",
        message_patient: "Votre vaccination contre le tétanos devra être vérifiée." }
    ],
    diagnostics_differentiels: [
      { id: "pl_simple", diagnostic: "Plaie simple", arguments: [{ label: "superficielle, propre, non mordue", w: 2, when: { all: [{ q: "pl_profonde", eq: false }, { q: "pl_infectee", eq: false }, { q: "pl_morsure", eq: false }] } }],
        examens_a_discuter: ["Nettoyage, parage, suture si récente et propre", "Mise à jour antitétanique"] },
      { id: "pl_morsure", diagnostic: "Morsure", arguments: [{ label: "morsure", w: 3, when: { q: "pl_morsure", eq: true } }],
        examens_a_discuter: ["Lavage abondant, avis", "Antibioprophylaxie, tétanos / rage"] },
      { id: "pl_compliquee", diagnostic: "Plaie compliquée (profonde / infectée)", arguments: [{ label: "profonde / corps étranger", w: 3, when: { q: "pl_profonde", eq: true } }, { label: "infectée", w: 2, when: { q: "pl_infectee", eq: true } }],
        examens_a_discuter: ["Exploration chirurgicale"] }
    ],
    examens_clinique: ["Explorer la plaie (profondeur, tendons, nerfs, vaisseaux, corps étranger)", "Statut antitétanique", "Recherche de signes d'infection", "Évaluation fonctionnelle en aval"]
  },

  // -------------------------------------------------------------------------
  // FIÈVRE DE L'ENFANT
  // -------------------------------------------------------------------------
  fievre_enfant: {
    id: "fievre_enfant", symptome: "Fièvre de l'enfant", specialite: ["Pédiatrie"], urgence: true,
    questions: [
      { id: "fe_age3m", label: "Nourrisson < 3 mois", type: "boolean", question: "L'enfant a-t-il moins de 3 mois ?" },
      { id: "fe_purpura", label: "Purpura", type: "boolean", question: "Y a-t-il des taches rouges ou violacées qui ne s'effacent PAS à la pression ?" },
      { id: "fe_conscience", label: "Signes de gravité", type: "boolean", question: "L'enfant est-il anormalement somnolent, geignard, difficile à réveiller, ou a-t-il un teint gris/marbré ?" },
      { id: "fe_respi", label: "Détresse respiratoire", type: "boolean", question: "Respire-t-il vite, avec des signes de lutte, ou des lèvres bleues ?" },
      { id: "fe_raideur", label: "Syndrome méningé", type: "boolean", question: "Y a-t-il une raideur de la nuque, des maux de tête, ou des vomissements en jet ?" },
      { id: "fe_hydratation", label: "Déshydratation", type: "boolean", question: "Refuse-t-il de boire, avec une bouche sèche et des couches sèches ?" },
      { id: "fe_duree", label: "Fièvre prolongée", type: "boolean", question: "La fièvre dure-t-elle depuis plus de 5 jours ?" },
      { id: "fe_eruption", label: "Éruption", type: "boolean", question: "Y a-t-il une éruption cutanée ?" }
    ],
    red_flags: [
      { id: "fe_rf_nourrisson", niveau: 3, when: { q: "fe_age3m", eq: true },
        message_medecin: "Fièvre du nourrisson < 3 mois : risque d'infection bactérienne sévère → avis pédiatrique et bilan en urgence.",
        message_patient: "Une fièvre chez un bébé de moins de 3 mois nécessite une évaluation médicale immédiate." },
      { id: "fe_rf_purpura", niveau: 3, when: { q: "fe_purpura", eq: true },
        message_medecin: "Purpura fébrile : purpura fulminans → antibiotique immédiat, 15.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "fe_rf_sepsis", niveau: 3, when: { any: [{ q: "fe_conscience", eq: true }, { q: "fe_respi", eq: true }, { q: "fe_raideur", eq: true }] },
        message_medecin: "Signes de gravité (conscience, détresse respiratoire, teint gris/marbré, syndrome méningé) : sepsis / méningite → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "fe_rf_deshyd", niveau: 2, when: { q: "fe_hydratation", eq: true },
        message_medecin: "Refus de boire / déshydratation : évaluation, réhydratation.",
        message_patient: "Un enfant qui ne boit plus nécessite un avis médical rapide." },
      { id: "fe_rf_prolongee", niveau: 2, when: { q: "fe_duree", eq: true },
        message_medecin: "Fièvre > 5 jours : rechercher un foyer, penser à la maladie de Kawasaki → avis.",
        message_patient: "Une fièvre qui dure plus de 5 jours nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "fe_virale", diagnostic: "Infection virale bénigne", arguments: [{ label: "sans signe de gravité", w: 2, when: { all: [{ q: "fe_conscience", eq: false }, { q: "fe_respi", eq: false }, { q: "fe_purpura", eq: false }] } }],
        examens_a_discuter: ["Traitement symptomatique, surveillance", "Consignes de reconsultation"] },
      { id: "fe_sepsis", diagnostic: "Infection bactérienne sévère / sepsis", arguments: [{ label: "troubles de conscience / teint gris", w: 2, when: { q: "fe_conscience", eq: true } }, { label: "détresse respiratoire", w: 2, when: { q: "fe_respi", eq: true } }, { label: "purpura", w: 2, when: { q: "fe_purpura", eq: true } }],
        examens_a_discuter: ["Bilan infectieux, hospitalisation"] },
      { id: "fe_meningite", diagnostic: "Méningite", arguments: [{ label: "syndrome méningé", w: 3, when: { q: "fe_raideur", eq: true } }],
        examens_a_discuter: ["Ponction lombaire"] },
      { id: "fe_foyer", diagnostic: "Foyer infectieux (ORL, pulmonaire, urinaire)", arguments: [{ label: "fièvre prolongée", w: 1, when: { q: "fe_duree", eq: true } }, { label: "signes respiratoires", w: 1, when: { q: "fe_respi", eq: true } }],
        examens_a_discuter: ["Examen complet (ORL, pulmonaire)", "Bandelette urinaire / ECBU systématique chez le petit"] },
      { id: "fe_kawasaki", diagnostic: "Maladie de Kawasaki", arguments: [{ label: "fièvre > 5 jours", w: 2, when: { q: "fe_duree", eq: true } }, { label: "éruption", w: 1, when: { q: "fe_eruption", eq: true } }],
        examens_a_discuter: ["Avis pédiatrique (critères de Kawasaki)"] }
    ],
    examens_clinique: ["Constantes (FC, FR, SpO2, temps de recoloration cutané)", "Recherche d'un purpura", "État de conscience et tonus", "Recherche d'un foyer (ORL, pulmonaire, BU)", "Évaluation de l'hydratation"]
  },

  // -------------------------------------------------------------------------
  // BRONCHIOLITE
  // -------------------------------------------------------------------------
  bronchiolite: {
    id: "bronchiolite", symptome: "Bronchiolite du nourrisson", specialite: ["Pédiatrie", "Pneumologie"], urgence: true,
    questions: [
      { id: "bo_age", label: "Tableau typique", type: "boolean", question: "L'enfant a-t-il moins de 2 ans, avec un rhume puis une toux et des sifflements ?" },
      { id: "bo_cyanose", label: "Signes de gravité", type: "boolean", question: "A-t-il les lèvres bleues, un teint gris, une somnolence inhabituelle, ou des pauses respiratoires ?" },
      { id: "bo_lutte", label: "Détresse respiratoire", type: "boolean", question: "A-t-il des signes de lutte (creusement entre/sous les côtes) ou respire-t-il très vite ?" },
      { id: "bo_alimentation", label: "Difficultés alimentaires", type: "boolean", question: "Mange/boit-il moins de la moitié de ses biberons habituels ?" },
      { id: "bo_terrain", label: "Terrain à risque", type: "boolean", question: "Est-il prématuré, âgé de moins de 6 semaines, ou a-t-il une maladie cardiaque/pulmonaire ?" }
    ],
    red_flags: [
      { id: "bo_rf_grave", niveau: 3, when: { any: [{ q: "bo_cyanose", eq: true }, { q: "bo_lutte", eq: true }] },
        message_medecin: "Bronchiolite avec signes de gravité (détresse respiratoire, apnées, cyanose) : urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "bo_rf_alim", niveau: 2, when: { q: "bo_alimentation", eq: true },
        message_medecin: "Prise alimentaire < 50 % : critère d'hospitalisation à évaluer.",
        message_patient: "Un bébé qui mange moins de la moitié nécessite un avis médical rapide." },
      { id: "bo_rf_terrain", niveau: 2, when: { q: "bo_terrain", eq: true },
        message_medecin: "Terrain à risque (prématuré, < 6 semaines, cardiopathie) : surveillance rapprochée.",
        message_patient: "Ce contexte nécessite une surveillance médicale rapprochée." }
    ],
    diagnostics_differentiels: [
      { id: "bo_bronchiolite", diagnostic: "Bronchiolite", arguments: [{ label: "tableau typique du nourrisson", w: 3, when: { q: "bo_age", eq: true } }],
        examens_a_discuter: ["Désobstruction nasale, fractionnement des repas", "Surveillance (ni antibiotique ni kiné systématiques)"] },
      { id: "bo_grave", diagnostic: "Bronchiolite grave", arguments: [{ label: "signes de lutte", w: 2, when: { q: "bo_lutte", eq: true } }, { label: "cyanose / apnées", w: 2, when: { q: "bo_cyanose", eq: true } }, { label: "difficultés alimentaires", w: 1, when: { q: "bo_alimentation", eq: true } }],
        examens_a_discuter: ["Hospitalisation, oxygénothérapie"] }
    ],
    examens_clinique: ["Fréquence respiratoire, SpO2", "Signes de lutte", "Auscultation pulmonaire", "Évaluation de la prise alimentaire et de l'hydratation"]
  },

  // -------------------------------------------------------------------------
  // OTITE
  // -------------------------------------------------------------------------
  otite: {
    id: "otite", symptome: "Otite / otalgie", specialite: ["ORL", "Pédiatrie"],
    questions: [
      { id: "ot_douleur", label: "Otalgie", type: "boolean", question: "L'oreille est-elle douloureuse (ou l'enfant se touche l'oreille, pleure, a de la fièvre) ?" },
      { id: "ot_ecoulement", label: "Otorrhée", type: "boolean", question: "Y a-t-il un écoulement de l'oreille ?" },
      { id: "ot_baignade", label: "Otite externe", type: "boolean", question: "La douleur est-elle déclenchée en tirant le pavillon/appuyant sur le tragus, après baignade ou manipulation du conduit ?" },
      { id: "ot_hypoacousie", label: "Hypoacousie sans douleur", type: "boolean", question: "Y a-t-il une baisse d'audition ou une sensation d'oreille bouchée SANS douleur ni fièvre (enfant inattentif) ?" },
      { id: "ot_otoscopie_normale", label: "Otalgie à otoscopie normale", type: "boolean", question: "L'oreille semble-t-elle normale à l'examen alors qu'elle fait mal (douleur projetée) ?" },
      { id: "ot_vesicules", label: "Zona auriculaire", type: "boolean", question: "Y a-t-il des vésicules dans/autour de l'oreille, surtout si la moitié du visage est paralysée ?" },
      { id: "ot_complication", label: "Mastoïdite", type: "boolean", question: "Y a-t-il un gonflement rouge et douloureux derrière l'oreille, ou un enfant très abattu ?" }
    ],
    red_flags: [
      { id: "ot_rf_mastoidite", niveau: 2, when: { q: "ot_complication", eq: true },
        message_medecin: "Tuméfaction rétro-auriculaire (décollement du pavillon) / signes généraux : mastoïdite → avis ORL urgent.",
        message_patient: "Ces signes nécessitent un avis médical rapide." },
      { id: "ot_rf_ramsayhunt", niveau: 2, when: { q: "ot_vesicules", eq: true },
        message_medecin: "Vésicules de la zone de Ramsay-Hunt ± paralysie faciale périphérique : zona auriculaire (VII bis) → antiviral précoce + corticothérapie, avis ORL ; risque de séquelles auditives/faciales.",
        message_patient: "Des vésicules dans l'oreille avec une paralysie du visage nécessitent une prise en charge rapide." },
      { id: "ot_rf_projetee", niveau: 1, when: { q: "ot_otoscopie_normale", eq: true },
        message_medecin: "Otalgie à otoscopie normale = douleur projetée : examiner dents/ATM, pharynx (angine), rachis cervical ; chez un fumeur/buveur > 50 ans, une otalgie persistante doit faire éliminer un cancer ORL (examen pharyngolaryngé).",
        message_patient: "Une douleur d'oreille avec un examen normal peut venir d'ailleurs (dents, gorge) et mérite un examen complet." }
    ],
    diagnostics_differentiels: [
      { id: "ot_oma", diagnostic: "Otite moyenne aiguë", arguments: [{ label: "otalgie fébrile", w: 3, when: { q: "ot_douleur", eq: true } }],
        examens_a_discuter: ["Otoscopie : tympan congestif ET bombé (ou perforé/otorrhée) = OMA purulente", "Antibiothérapie d'emblée si < 2 ans, otorrhée, ou symptômes intenses ; sinon antalgiques + réévaluation à 48-72 h"] },
      { id: "ot_externe", diagnostic: "Otite externe", arguments: [{ label: "douleur à la traction du pavillon / tragus", w: 3, when: { q: "ot_baignade", eq: true } }, { label: "écoulement", w: 1, when: { q: "ot_ecoulement", eq: true } }],
        examens_a_discuter: ["Otoscopie (conduit inflammatoire, tympan normal)", "Traitement local antibio-corticoïde, éviction de l'eau ; antifongique si otomycose"] },
      { id: "ot_osm", diagnostic: "Otite séreuse (OSM)", arguments: [{ label: "hypoacousie / oreille bouchée sans douleur", w: 3, when: { q: "ot_hypoacousie", eq: true } }],
        examens_a_discuter: ["Otoscopie (tympan rétracté, épanchement rétrotympanique, niveau)", "Audiométrie/tympanométrie ; avis ORL si persistance > 3 mois ou retentissement (langage) ; chez l'adulte unilatérale : examiner le cavum"] },
      { id: "ot_projetee", diagnostic: "Otalgie projetée (otoscopie normale)", arguments: [{ label: "douleur sans anomalie otoscopique", w: 3, when: { q: "ot_otoscopie_normale", eq: true } }],
        examens_a_discuter: ["Examen dentaire/ATM, pharynx, rachis cervical", "Chez le fumeur > 50 ans : nasofibroscopie (éliminer un cancer ORL)"] },
      { id: "ot_zona", diagnostic: "Zona auriculaire (Ramsay-Hunt)", arguments: [{ label: "vésicules ± paralysie faciale", w: 3, when: { q: "ot_vesicules", eq: true } }],
        examens_a_discuter: ["Antiviral précoce + corticoïde, avis ORL"] },
      { id: "ot_mastoidite", diagnostic: "Mastoïdite", arguments: [{ label: "tuméfaction rétro-auriculaire", w: 3, when: { q: "ot_complication", eq: true } }],
        examens_a_discuter: ["Avis ORL, imagerie"] }
    ],
    examens_clinique: ["Otoscopie des deux tympans (congestion, bombement, rétraction, épanchement, perforation)", "Manœuvre de traction du pavillon / pression du tragus (otite externe)", "Température", "Si otoscopie normale : examen dentaire, pharyngé et cervical (otalgie projetée)", "Recherche d'une complication (mastoïdite, paralysie faciale)"]
  },

  // -------------------------------------------------------------------------
  // ANGINE
  // -------------------------------------------------------------------------
  angine: {
    id: "angine", symptome: "Angine / mal de gorge", specialite: ["ORL"], urgence: true,
    questions: [
      { id: "ag_dysphagie", label: "Détresse / hypersialorrhée", type: "boolean", question: "L'enfant ne peut plus avaler sa salive, bave, a une voix étouffée ou une difficulté à respirer ?" },
      { id: "ag_unilateral", label: "Phlegmon", type: "boolean", question: "Y a-t-il un gonflement d'un seul côté de la gorge avec une difficulté à ouvrir la bouche (trismus) ?" },
      { id: "ag_viral", label: "Signes viraux", type: "boolean", question: "Y a-t-il une toux, un rhume, une voix enrouée (signes plutôt viraux) ?" },
      { id: "ag_scarlatine", label: "Scarlatine", type: "boolean", question: "Y a-t-il une éruption rouge râpeuse et une langue framboisée ?" },
      { id: "ag_age", label: "Âge < 3 ans", type: "boolean", question: "L'enfant a-t-il moins de 3 ans ?" }
    ],
    red_flags: [
      { id: "ag_rf_respi", niveau: 3, when: { q: "ag_dysphagie", eq: true },
        message_medecin: "Dysphagie majeure / hypersialorrhée / dyspnée : phlegmon ou épiglottite → urgence (ne pas allonger, ne pas examiner à l'abaisse-langue, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ag_rf_phlegmon", niveau: 2, when: { q: "ag_unilateral", eq: true },
        message_medecin: "Tuméfaction unilatérale + trismus : phlegmon péri-amygdalien → avis ORL.",
        message_patient: "Ces signes nécessitent un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ag_virale", diagnostic: "Angine virale", arguments: [{ label: "signes viraux", w: 3, when: { q: "ag_viral", eq: true } }, { label: "âge < 3 ans", w: 1, when: { q: "ag_age", eq: true } }],
        examens_a_discuter: ["TDR (test rapide) négatif", "Traitement symptomatique"] },
      { id: "ag_strepto", diagnostic: "Angine à streptocoque", arguments: [{ label: "absence de signes viraux", w: 2, when: { q: "ag_viral", eq: false } }, { label: "scarlatine associée", w: 1, when: { q: "ag_scarlatine", eq: true } }],
        examens_a_discuter: ["TDR streptococcique", "Antibiothérapie si positif"] },
      { id: "ag_scarlatine", diagnostic: "Scarlatine", arguments: [{ label: "éruption + langue framboisée", w: 3, when: { q: "ag_scarlatine", eq: true } }],
        examens_a_discuter: ["TDR, antibiothérapie", "Éviction"] },
      { id: "ag_complication", diagnostic: "Complication (phlegmon / épiglottite)", arguments: [{ label: "dysphagie / dyspnée", w: 3, when: { q: "ag_dysphagie", eq: true } }, { label: "tuméfaction unilatérale", w: 2, when: { q: "ag_unilateral", eq: true } }],
        examens_a_discuter: ["Avis ORL urgent"] }
    ],
    examens_clinique: ["Examen de la gorge (PAS d'abaisse-langue si suspicion d'épiglottite)", "TDR streptococcique", "Recherche d'une éruption", "Palpation des adénopathies cervicales"]
  },

  // -------------------------------------------------------------------------
  // VARICELLE
  // -------------------------------------------------------------------------
  varicelle: {
    id: "varicelle", symptome: "Varicelle", specialite: ["Pédiatrie", "Dermatologie"],
    questions: [
      { id: "va_typique", label: "Tableau typique", type: "boolean", question: "Y a-t-il des boutons à différents stades (vésicules, croûtes) qui démangent, avec un peu de fièvre ?" },
      { id: "va_respi", label: "Pneumopathie", type: "boolean", question: "Y a-t-il une gêne respiratoire ou une toux importante ?" },
      { id: "va_neuro", label: "Atteinte neurologique", type: "boolean", question: "Y a-t-il des troubles de l'équilibre, une somnolence, ou des convulsions ?" },
      { id: "va_surinfection", label: "Surinfection", type: "boolean", question: "Certaines lésions sont-elles très rouges, chaudes, avec du pus ou une fièvre élevée ?" },
      { id: "va_immuno", label: "Terrain à risque", type: "boolean", question: "La personne est-elle immunodéprimée, un nouveau-né, ou une femme enceinte ?" }
    ],
    red_flags: [
      { id: "va_rf_grave", niveau: 3, when: { any: [{ q: "va_respi", eq: true }, { q: "va_neuro", eq: true }] },
        message_medecin: "Varicelle compliquée (pneumopathie varicelleuse, atteinte neurologique) : urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "va_rf_immuno", niveau: 2, when: { q: "va_immuno", eq: true },
        message_medecin: "Varicelle chez l'immunodéprimé / nouveau-né / femme enceinte : risque de forme grave → avis, antiviral.",
        message_patient: "Ce contexte nécessite un avis médical rapide." },
      { id: "va_rf_surinfection", niveau: 2, when: { q: "va_surinfection", eq: true },
        message_medecin: "Surinfection cutanée (impétiginisation, dermohypodermite) : antibiothérapie ; éliminer une fasciite. Éviter les AINS.",
        message_patient: "Une surinfection nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "va_commune", diagnostic: "Varicelle commune", arguments: [{ label: "éruption d'âges différents prurigineuse", w: 3, when: { q: "va_typique", eq: true } }],
        examens_a_discuter: ["Traitement symptomatique (PAS d'AINS ni d'aspirine)", "Soins locaux, éviction"] },
      { id: "va_compliquee", diagnostic: "Forme compliquée", arguments: [{ label: "atteinte respiratoire", w: 3, when: { q: "va_respi", eq: true } }, { label: "atteinte neurologique", w: 2, when: { q: "va_neuro", eq: true } }],
        examens_a_discuter: ["Avis, hospitalisation"] },
      { id: "va_risque", diagnostic: "Forme à risque (immunodéprimé / grossesse)", arguments: [{ label: "terrain à risque", w: 3, when: { q: "va_immuno", eq: true } }],
        examens_a_discuter: ["Aciclovir, avis spécialisé"] }
    ],
    examens_clinique: ["Morphologie (lésions d'âges différents)", "Recherche de surinfection", "État général, respiratoire et neurologique"]
  },

  // -------------------------------------------------------------------------
  // CONVULSION FÉBRILE
  // -------------------------------------------------------------------------
  convulsion_febrile: {
    id: "convulsion_febrile", symptome: "Convulsion fébrile de l'enfant", specialite: ["Pédiatrie", "Neurologie"], urgence: true,
    questions: [
      { id: "cf_age", label: "Tranche d'âge typique", type: "boolean", question: "L'enfant a-t-il entre 6 mois et 5 ans, avec de la fièvre ?" },
      { id: "cf_typique", label: "Crise simple", type: "boolean", question: "La crise a-t-elle été brève (moins de 15 min), généralisée, unique, avec un retour rapide à la normale ?" },
      { id: "cf_meningite", label: "Signes méningés / gravité", type: "boolean", question: "Y a-t-il une raideur de la nuque, des troubles de la conscience persistants, un purpura, ou un mauvais état général ?" },
      { id: "cf_prolongee", label: "Crise complexe", type: "boolean", question: "La crise a-t-elle duré plus de 15 minutes, s'est-elle répétée, ou n'a-t-elle touché qu'une partie du corps ?" },
      { id: "cf_deficit", label: "Récupération anormale", type: "boolean", question: "L'enfant récupère-t-il mal, ou un déficit persiste-t-il ?" }
    ],
    red_flags: [
      { id: "cf_rf_meningite", niveau: 3, when: { any: [{ q: "cf_meningite", eq: true }, { q: "cf_deficit", eq: true }] },
        message_medecin: "Convulsion fébrile + signes méningés / mauvais état / déficit : éliminer une méningo-encéphalite → urgence (PL).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "cf_rf_atypique", niveau: 2, when: { q: "cf_prolongee", eq: true },
        message_medecin: "Convulsion fébrile complexe (> 15 min, répétée ou focale) : avis, explorations.",
        message_patient: "Ce type de crise nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "cf_simple", diagnostic: "Convulsion fébrile simple", arguments: [{ label: "tranche d'âge typique", w: 2, when: { q: "cf_age", eq: true } }, { label: "crise brève généralisée unique", w: 3, when: { q: "cf_typique", eq: true } }],
        examens_a_discuter: ["Traiter la fièvre, rassurer, surveillance", "Ni EEG ni imagerie systématiques"] },
      { id: "cf_complexe", diagnostic: "Convulsion fébrile complexe", arguments: [{ label: "crise prolongée / répétée / focale", w: 3, when: { q: "cf_prolongee", eq: true } }],
        examens_a_discuter: ["Avis neuropédiatrique"] },
      { id: "cf_meningoencephalite", diagnostic: "Méningo-encéphalite", arguments: [{ label: "signes méningés / mauvais état", w: 3, when: { q: "cf_meningite", eq: true } }],
        examens_a_discuter: ["Ponction lombaire, imagerie"] }
    ],
    examens_clinique: ["État neurologique et de conscience", "Recherche d'une raideur méningée et d'un purpura", "Recherche d'un foyer infectieux", "Glycémie capillaire"]
  },

  // -------------------------------------------------------------------------
  // BOITERIE DE L'ENFANT
  // -------------------------------------------------------------------------
  boiterie_enfant: {
    id: "boiterie_enfant", symptome: "Boiterie de l'enfant", specialite: ["Pédiatrie", "Orthopédie"], urgence: true,
    questions: [
      { id: "be_fievre", label: "Boiterie fébrile", type: "boolean", question: "L'enfant a-t-il de la fièvre, refuse-t-il de marcher ou de bouger la hanche, ou semble-t-il très douloureux ?" },
      { id: "be_aeg", label: "AEG / douleurs nocturnes", type: "boolean", question: "Y a-t-il une altération de l'état général, des douleurs nocturnes, ou un amaigrissement ?" },
      { id: "be_age_epiphys", label: "Épiphysiolyse", type: "boolean", question: "Est-ce un adolescent (souvent en surpoids) avec une douleur de hanche ou de genou ?" },
      { id: "be_trauma", label: "Traumatisme", type: "boolean", question: "Y a-t-il eu un traumatisme ?" },
      { id: "be_virose", label: "Rhume de hanche", type: "boolean", question: "Y a-t-il eu une virose récente, avec une boiterie peu douloureuse et sans fièvre ?" }
    ],
    red_flags: [
      { id: "be_rf_septique", niveau: 3, when: { q: "be_fievre", eq: true },
        message_medecin: "Boiterie fébrile : arthrite septique / ostéomyélite jusqu'à preuve du contraire → urgence (NFS/CRP, échographie, avis chirurgical).",
        message_patient: "Une boiterie avec fièvre nécessite une évaluation médicale immédiate." },
      { id: "be_rf_tumeur", niveau: 2, when: { q: "be_aeg", eq: true },
        message_medecin: "AEG / douleurs nocturnes : éliminer une cause tumorale ou hématologique (leucémie, tumeur osseuse).",
        message_patient: "Ces signes nécessitent un avis médical et un bilan." },
      { id: "be_rf_epiphysiolyse", niveau: 2, when: { q: "be_age_epiphys", eq: true },
        message_medecin: "Adolescent + douleur hanche/genou : épiphysiolyse → radiographie, mise en décharge, avis orthopédique.",
        message_patient: "Ce tableau nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "be_septique", diagnostic: "Arthrite septique / ostéomyélite", arguments: [{ label: "boiterie fébrile", w: 3, when: { q: "be_fievre", eq: true } }],
        examens_a_discuter: ["NFS/CRP, hémocultures", "Échographie, avis chirurgical"] },
      { id: "be_synovite", diagnostic: "Synovite aiguë transitoire (rhume de hanche)", arguments: [{ label: "virose récente, apyrétique", w: 3, when: { q: "be_virose", eq: true } }],
        examens_a_discuter: ["Diagnostic d'élimination, surveillance"] },
      { id: "be_epiphysiolyse", diagnostic: "Épiphysiolyse fémorale supérieure", arguments: [{ label: "adolescent, douleur hanche/genou", w: 3, when: { q: "be_age_epiphys", eq: true } }],
        examens_a_discuter: ["Radiographie de hanche (face + profil)"] },
      { id: "be_trauma", diagnostic: "Traumatisme / fracture", arguments: [{ label: "notion de traumatisme", w: 3, when: { q: "be_trauma", eq: true } }],
        examens_a_discuter: ["Radiographie"] },
      { id: "be_tumeur", diagnostic: "Cause tumorale / hématologique", arguments: [{ label: "AEG / douleurs nocturnes", w: 3, when: { q: "be_aeg", eq: true } }],
        examens_a_discuter: ["NFS, imagerie, avis spécialisé"] }
    ],
    examens_clinique: ["Examen de la hanche et du membre (mobilité, douleur)", "Température, NFS/CRP si fièvre", "Radiographie selon le contexte", "Recherche de signes généraux"]
  },

  // -------------------------------------------------------------------------
  // PLEURS DU NOURRISSON
  // -------------------------------------------------------------------------
  pleurs_nourrisson: {
    id: "pleurs_nourrisson", symptome: "Pleurs du nourrisson", specialite: ["Pédiatrie"], urgence: true,
    questions: [
      { id: "pn_invagination", label: "Invagination", type: "boolean", question: "Y a-t-il des crises de pleurs avec pâleur ou refus de boire, des vomissements, ou du sang dans les selles ?" },
      { id: "pn_aigu", label: "Geignard / abattu", type: "boolean", question: "Les pleurs sont-ils inhabituels, intenses, inconsolables, ou l'enfant est-il anormalement abattu entre les crises ?" },
      { id: "pn_fievre", label: "Fièvre / infection", type: "boolean", question: "Y a-t-il de la fièvre ou des signes d'infection ?" },
      { id: "pn_traumatisme", label: "Point d'appel traumatique", type: "boolean", question: "Y a-t-il eu une chute, un traumatisme, ou un membre qui ne bouge pas / un gonflement ?" },
      { id: "pn_alimentation", label: "Difficultés alimentaires", type: "boolean", question: "L'enfant mange-t-il mal ou prend-il mal du poids ?" }
    ],
    red_flags: [
      { id: "pn_rf_invagination", niveau: 3, when: { q: "pn_invagination", eq: true },
        message_medecin: "Crises de pleurs + pâleur/vomissements/rectorragies : invagination intestinale aiguë → urgence (échographie).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "pn_rf_grave", niveau: 3, when: { any: [{ q: "pn_aigu", eq: true }, { q: "pn_fievre", eq: true }] },
        message_medecin: "Nourrisson geignard / abattu ou fébrile : éliminer une infection sévère ou une cause organique → examen complet, avis.",
        message_patient: "Ces signes nécessitent une évaluation médicale rapide." },
      { id: "pn_rf_trauma", niveau: 2, when: { q: "pn_traumatisme", eq: true },
        message_medecin: "Point d'appel traumatique : examiner (fracture ?) et rester vigilant sur une maltraitance.",
        message_patient: "Ce contexte nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "pn_organique", diagnostic: "Cause organique à rechercher", arguments: [{ label: "nourrisson abattu", w: 2, when: { q: "pn_aigu", eq: true } }, { label: "fièvre / infection", w: 2, when: { q: "pn_fievre", eq: true } }],
        examens_a_discuter: ["Examen complet déshabillé (ORL, abdomen, peau, urines, membres, yeux)"] },
      { id: "pn_invagination", diagnostic: "Invagination intestinale aiguë", arguments: [{ label: "pleurs + pâleur + vomissements / rectorragies", w: 3, when: { q: "pn_invagination", eq: true } }],
        examens_a_discuter: ["Échographie abdominale, avis chirurgical"] },
      { id: "pn_coliques", diagnostic: "Coliques du nourrisson (diagnostic d'élimination)", arguments: [{ label: "examen normal, sans signe d'alarme", w: 2, when: { all: [{ q: "pn_aigu", eq: false }, { q: "pn_fievre", eq: false }, { q: "pn_invagination", eq: false }] } }],
        examens_a_discuter: ["Réassurance après examen complet normal"] }
    ],
    examens_clinique: ["Examen complet déshabillé (ORL, abdomen, fontanelle, peau/purpura, BU, membres, yeux)", "Courbe de poids", "Recherche d'un point d'appel"]
  },

  // -------------------------------------------------------------------------
  // ASTHME DE L'ENFANT (crise)
  // -------------------------------------------------------------------------
  asthme_enfant: {
    id: "asthme_enfant", symptome: "Crise d'asthme de l'enfant", specialite: ["Pédiatrie", "Pneumologie"], urgence: true,
    questions: [
      { id: "ae_siffle", label: "Sifflements / gêne", type: "boolean", question: "L'enfant a-t-il des sifflements, une toux, une gêne pour respirer ?" },
      { id: "ae_cyanose", label: "Cyanose", type: "boolean", question: "A-t-il les lèvres bleues ?" },
      { id: "ae_lutte", label: "Signes de lutte / épuisement", type: "boolean", question: "A-t-il des signes de lutte (creusement des côtes), respire-t-il très vite, ou est-il épuisé/somnolent ?" },
      { id: "ae_parle", label: "Difficulté à parler / téter", type: "boolean", question: "A-t-il du mal à parler/finir ses phrases, ou à téter/manger à cause de l'essoufflement ?" },
      { id: "ae_connu", label: "Asthme connu, traitement inefficace", type: "boolean", question: "Est-il asthmatique connu, et son traitement de crise est-il inefficace ?" }
    ],
    red_flags: [
      { id: "ae_rf_grave", niveau: 3, when: { any: [{ q: "ae_cyanose", eq: true }, { q: "ae_lutte", eq: true }, { q: "ae_parle", eq: true }] },
        message_medecin: "Crise d'asthme sévère (parole difficile, signes de lutte, cyanose, épuisement) : urgence (bronchodilatateurs, oxygène, 15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "ae_crise", diagnostic: "Crise d'asthme", arguments: [{ label: "sifflements / gêne", w: 3, when: { q: "ae_siffle", eq: true } }, { label: "asthme connu", w: 1, when: { q: "ae_connu", eq: true } }],
        examens_a_discuter: ["Bronchodilatateurs (chambre d'inhalation)", "Corticoïdes oraux si besoin, réévaluation"] },
      { id: "ae_severe", diagnostic: "Crise sévère", arguments: [{ label: "signes de lutte / épuisement", w: 2, when: { q: "ae_lutte", eq: true } }, { label: "difficulté à parler", w: 2, when: { q: "ae_parle", eq: true } }, { label: "cyanose", w: 2, when: { q: "ae_cyanose", eq: true } }],
        examens_a_discuter: ["Urgence : bronchodilatateurs continus, oxygène"] }
    ],
    examens_clinique: ["Fréquence respiratoire, SpO2", "Signes de lutte", "Auscultation (sibilants, silence auscultatoire = gravité)", "Capacité à parler / s'alimenter", "DEP si l'âge le permet", "À distance de la crise : rechercher et réduire les facteurs déclenchants — tabagisme passif, allergènes, infections virales, et pics de pollution atmosphérique / trafic routier / particules fines (limiter l'effort extérieur lors des pics, populations sensibles)"]
  },

  // -------------------------------------------------------------------------
  // INGESTION TOXIQUE
  // -------------------------------------------------------------------------
  ingestion_toxique: {
    id: "ingestion_toxique", symptome: "Ingestion accidentelle (toxique / corps étranger)", specialite: ["Pédiatrie", "Urgences"], urgence: true,
    questions: [
      { id: "it_symptomes", label: "Signes de gravité", type: "boolean", question: "La personne a-t-elle des troubles de la conscience, des vomissements, ou des difficultés à respirer ?" },
      { id: "it_caustique", label: "Caustique", type: "boolean", question: "S'agit-il d'un produit caustique (déboucheur, soude, acide) avec brûlures de la bouche, bave ou douleur ?" },
      { id: "it_pile", label: "Pile bouton / aimants", type: "boolean", question: "S'agit-il d'une pile bouton ou de plusieurs aimants ?" },
      { id: "it_petrole", label: "Produit pétrolier", type: "boolean", question: "S'agit-il d'un produit pétrolier (white-spirit, essence) avec une toux ?" },
      { id: "it_produit", label: "Médicament / produit", type: "boolean", question: "A-t-elle avalé un médicament, un produit ménager, une plante ou un objet ?" }
    ],
    red_flags: [
      { id: "it_rf_grave", niveau: 3, when: { q: "it_symptomes", eq: true },
        message_medecin: "Signes de gravité (conscience, respiration) après ingestion : urgence (15, centre antipoison).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "it_rf_caustique", niveau: 3, when: { q: "it_caustique", eq: true },
        message_medecin: "Ingestion de caustique : NE PAS faire vomir ni faire boire → urgence (endoscopie).",
        message_patient: "Ne faites pas vomir, ne donnez rien à boire, et consultez en urgence — appelez le 15." },
      { id: "it_rf_pile", niveau: 3, when: { q: "it_pile", eq: true },
        message_medecin: "Pile bouton / aimants multiples : urgence (risque de perforation) → radiographie, avis.",
        message_patient: "Cette situation nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "it_rf_petrole", niveau: 2, when: { q: "it_petrole", eq: true },
        message_medecin: "Produit pétrolier : risque d'inhalation (ne pas faire vomir) → avis.",
        message_patient: "Ne faites pas vomir et demandez un avis médical (centre antipoison)." },
      { id: "it_rf_general", niveau: 2, when: { q: "it_produit", eq: true },
        message_medecin: "Toute ingestion suspecte : contacter le centre antipoison, ne rien administrer sans avis.",
        message_patient: "Contactez un centre antipoison ou un médecin avant de donner quoi que ce soit." }
    ],
    diagnostics_differentiels: [
      { id: "it_toxique", diagnostic: "Ingestion à risque toxique", arguments: [{ label: "produit / médicament", w: 2, when: { q: "it_produit", eq: true } }, { label: "signes de gravité", w: 2, when: { q: "it_symptomes", eq: true } }],
        examens_a_discuter: ["Identifier produit, dose, heure", "Centre antipoison"] },
      { id: "it_caustique", diagnostic: "Ingestion de caustique", arguments: [{ label: "produit caustique", w: 3, when: { q: "it_caustique", eq: true } }],
        examens_a_discuter: ["À jeun, endoscopie", "Ne pas faire vomir"] },
      { id: "it_corps", diagnostic: "Corps étranger dangereux (pile / aimants)", arguments: [{ label: "pile bouton / aimants", w: 3, when: { q: "it_pile", eq: true } }],
        examens_a_discuter: ["Radiographie, avis (extraction)"] }
    ],
    examens_clinique: ["Identifier le produit, la quantité, l'heure", "État de conscience et constantes", "Examen de la bouche (caustique)", "Contacter le centre antipoison"]
  },

  // -------------------------------------------------------------------------
  // FIÈVRE DE L'ADULTE
  // -------------------------------------------------------------------------
  fievre_adulte: {
    id: "fievre_adulte", symptome: "Fièvre de l'adulte", specialite: ["Médecine interne", "Infectiologie"], urgence: true,
    questions: [
      { id: "fa_sepsis", label: "Signes de gravité (sepsis)", type: "boolean", question: "Avez-vous : confusion, malaise/tension basse en vous levant, marbrures, ou une respiration rapide ?" },
      { id: "fa_purpura", label: "Purpura", type: "boolean", question: "Avez-vous des taches rouges/violacées qui ne s'effacent PAS à la pression ?" },
      { id: "fa_raideur", label: "Syndrome méningé", type: "boolean", question: "Avez-vous une raideur de la nuque avec maux de tête et gêne à la lumière ?" },
      { id: "fa_immuno", label: "Terrain à risque", type: "boolean", question: "Êtes-vous immunodéprimé, sous chimiothérapie, ou sans rate ?" },
      { id: "fa_voyage", label: "Retour des tropiques", type: "boolean", question: "Revenez-vous d'un pays tropical (moins de 3 mois) ?" },
      { id: "fa_duree", label: "Fièvre prolongée", type: "boolean", question: "La fièvre dure-t-elle depuis plus de 3 semaines ?" },
      { id: "fa_localisation", label: "Point d'appel", type: "boolean", question: "Avez-vous un point d'appel (urinaire, pulmonaire, ORL, cutané, digestif) ?" }
    ],
    red_flags: [
      { id: "fa_rf_sepsis", niveau: 3, when: { any: [{ q: "fa_sepsis", eq: true }, { q: "fa_purpura", eq: true }, { q: "fa_raideur", eq: true }] },
        message_medecin: "Sepsis / purpura fébrile / syndrome méningé : urgence vitale (15).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "fa_rf_neutropenie", niveau: 3, when: { q: "fa_immuno", eq: true },
        message_medecin: "Fièvre chez l'immunodéprimé / neutropénique / asplénique : urgence (antibiothérapie sans délai).",
        message_patient: "Une fièvre sur ce terrain nécessite une évaluation médicale immédiate." },
      { id: "fa_rf_voyage", niveau: 3, when: { q: "fa_voyage", eq: true },
        message_medecin: "Fièvre au retour des tropiques : éliminer un paludisme en urgence (voir fiche dédiée).",
        message_patient: "Une fièvre au retour de voyage nécessite une évaluation médicale rapide." },
      { id: "fa_rf_prolongee", niveau: 2, when: { q: "fa_duree", eq: true },
        message_medecin: "Fièvre prolongée > 3 semaines : démarche structurée (infection, néoplasie, maladie inflammatoire).",
        message_patient: "Une fièvre qui dure nécessite un bilan médical." }
    ],
    diagnostics_differentiels: [
      { id: "fa_foyer", diagnostic: "Infection avec foyer identifié", arguments: [{ label: "point d'appel", w: 3, when: { q: "fa_localisation", eq: true } }],
        examens_a_discuter: ["Examen orienté", "BU/ECBU, radiographie, prélèvements ciblés"] },
      { id: "fa_sepsis", diagnostic: "Sepsis", arguments: [{ label: "signes de gravité", w: 3, when: { q: "fa_sepsis", eq: true } }, { label: "purpura", w: 1, when: { q: "fa_purpura", eq: true } }],
        examens_a_discuter: ["Lactates, hémocultures", "Hospitalisation"] },
      { id: "fa_voyage", diagnostic: "Fièvre du voyageur (paludisme)", arguments: [{ label: "retour des tropiques", w: 3, when: { q: "fa_voyage", eq: true } }],
        examens_a_discuter: ["Frottis sanguin + goutte épaisse en urgence"] },
      { id: "fa_prolongee", diagnostic: "Fièvre prolongée inexpliquée", arguments: [{ label: "durée > 3 semaines", w: 3, when: { q: "fa_duree", eq: true } }],
        examens_a_discuter: ["Bilan structuré (infectieux, néoplasique, inflammatoire)"] }
    ],
    examens_clinique: ["Constantes complètes (TA, FC, FR, SpO2, TRC)", "Recherche d'un purpura et d'une raideur méningée", "Recherche d'un foyer (ORL, pulmonaire, urinaire, cutané, abdominal)", "Examen orienté par le terrain"]
  },

  // -------------------------------------------------------------------------
  // REFLUX GASTRO-ŒSOPHAGIEN
  // -------------------------------------------------------------------------
  rgo: {
    id: "rgo", symptome: "Reflux gastro-œsophagien (brûlures d'estomac)", specialite: ["Digestif"],
    questions: [
      { id: "rg_pyrosis", label: "Pyrosis", type: "boolean", question: "Avez-vous des brûlures qui remontent derrière le sternum, surtout après les repas ou allongé ?" },
      { id: "rg_dysphagie", label: "Dysphagie", type: "boolean", question: "Avez-vous du mal à avaler, une sensation de blocage (surtout pour les solides) ?" },
      { id: "rg_aeg", label: "Signes d'alarme", type: "boolean", question: "Avez-vous maigri, une anémie, ou des vomissements de sang / selles noires ?" },
      { id: "rg_age50", label: "Âge > 50 + récent", type: "boolean", question: "Avez-vous plus de 50 ans avec des symptômes récents ?" },
      { id: "rg_cardiaque", label: "Cause cardiaque", type: "boolean", question: "Les douleurs surviennent-elles à l'effort, ou avez-vous des facteurs de risque cardiaque ?" }
    ],
    red_flags: [
      { id: "rg_rf_alarme", niveau: 2, when: { any: [{ q: "rg_dysphagie", eq: true }, { q: "rg_aeg", eq: true }] },
        message_medecin: "Signes d'alarme digestifs (dysphagie, amaigrissement, anémie, hémorragie) : endoscopie haute (éliminer un cancer).",
        message_patient: "Ces signes nécessitent un avis médical et une endoscopie." },
      { id: "rg_rf_cardiaque", niveau: 2, when: { q: "rg_cardiaque", eq: true },
        message_medecin: "Douleur d'effort : éliminer une cause cardiaque avant d'étiqueter « RGO » (ECG).",
        message_patient: "Une douleur à l'effort doit être évaluée par un médecin." }
    ],
    diagnostics_differentiels: [
      { id: "rg_simple", diagnostic: "RGO non compliqué", arguments: [{ label: "pyrosis typique", w: 3, when: { q: "rg_pyrosis", eq: true } }, { label: "sans dysphagie", w: 1, when: { q: "rg_dysphagie", eq: false } }],
        examens_a_discuter: ["Règles hygiéno-diététiques", "Épreuve par IPP"] },
      { id: "rg_complique", diagnostic: "Œsophagite / complication / cancer", arguments: [{ label: "dysphagie", w: 2, when: { q: "rg_dysphagie", eq: true } }, { label: "signes d'alarme", w: 2, when: { q: "rg_aeg", eq: true } }, { label: "> 50 ans récent", w: 1, when: { q: "rg_age50", eq: true } }],
        examens_a_discuter: ["Endoscopie œso-gastro-duodénale"] },
      { id: "rg_cardiaque", diagnostic: "Cause cardiaque à éliminer", arguments: [{ label: "douleur d'effort / FdR CV", w: 3, when: { q: "rg_cardiaque", eq: true } }],
        examens_a_discuter: ["ECG"] }
    ],
    examens_clinique: ["Recherche de signes d'alarme digestifs", "ECG si doute cardiaque", "Poids"]
  },

  // -------------------------------------------------------------------------
  // RECTORRAGIES
  // -------------------------------------------------------------------------
  rectorragie: {
    id: "rectorragie", symptome: "Sang rouge par l'anus (rectorragie)", specialite: ["Digestif", "Proctologie"], urgence: true,
    questions: [
      { id: "re_choc", label: "Abondance / choc", type: "boolean", question: "Le saignement est-il abondant, avec malaise, pâleur, ou cœur rapide ?" },
      { id: "re_age50", label: "Cancer (>50 / transit)", type: "boolean", question: "Avez-vous plus de 50 ans, ou un changement récent du transit / un amaigrissement ?" },
      { id: "re_anemie", label: "Anémie", type: "boolean", question: "Êtes-vous pâle/fatigué, ou a-t-on trouvé une anémie ?" },
      { id: "re_hemorroides", label: "Origine proctologique", type: "boolean", question: "Le sang est-il rouge vif, sur le papier ou autour des selles, avec douleur anale / hémorroïdes connues ?" },
      { id: "re_mici", label: "MICI", type: "boolean", question: "Y a-t-il des glaires, des diarrhées chroniques, des douleurs abdominales ?" },
      { id: "re_atcdfam", label: "ATCD familial CCR", type: "boolean", question: "Avez-vous des antécédents familiaux de cancer du côlon ?" }
    ],
    red_flags: [
      { id: "re_rf_choc", niveau: 3, when: { q: "re_choc", eq: true },
        message_medecin: "Rectorragie abondante / signes de choc : urgence (voir aussi hémorragie digestive).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "re_rf_cancer", niveau: 2, when: { any: [{ q: "re_age50", eq: true }, { q: "re_anemie", eq: true }] },
        message_medecin: "Rectorragie après 50 ans / avec anémie / changement du transit : coloscopie (cancer colorectal).",
        message_patient: "Ce saignement nécessite un avis médical et une coloscopie." }
    ],
    diagnostics_differentiels: [
      { id: "re_procto", diagnostic: "Hémorroïdes / fissure anale", arguments: [{ label: "sang rouge vif, douleur anale", w: 3, when: { q: "re_hemorroides", eq: true } }],
        examens_a_discuter: ["Examen proctologique, anuscopie", "Traitement local"] },
      { id: "re_cancer", diagnostic: "Cancer colorectal", arguments: [{ label: "> 50 ans / transit modifié", w: 2, when: { q: "re_age50", eq: true } }, { label: "anémie", w: 2, when: { q: "re_anemie", eq: true } }, { label: "ATCD familial", w: 1, when: { q: "re_atcdfam", eq: true } }],
        examens_a_discuter: ["Coloscopie"] },
      { id: "re_mici", diagnostic: "MICI", arguments: [{ label: "glaires, diarrhée chronique, douleurs", w: 3, when: { q: "re_mici", eq: true } }],
        examens_a_discuter: ["Calprotectine, coloscopie + biopsies"] },
      { id: "re_choc", diagnostic: "Hémorragie abondante", arguments: [{ label: "signes de choc", w: 3, when: { q: "re_choc", eq: true } }],
        examens_a_discuter: ["Prise en charge urgente (voir hémorragie digestive)"] }
    ],
    examens_clinique: ["Examen anal, toucher rectal, anuscopie", "Recherche d'anémie", "Pouls, pression artérielle si abondant"]
  },

  // -------------------------------------------------------------------------
  // DYSPHAGIE
  // -------------------------------------------------------------------------
  dysphagie: {
    id: "dysphagie", symptome: "Difficulté à avaler (dysphagie)", specialite: ["Digestif", "ORL"], urgence: true,
    questions: [
      { id: "dy2_aphagie", label: "Aphagie / blocage aigu", type: "boolean", question: "N'arrivez-vous plus du tout à avaler (même votre salive), ou avez-vous un blocage alimentaire aigu ?" },
      { id: "dy2_solide_progressif", label: "Solides progressif", type: "boolean", question: "Le blocage est-il surtout pour les solides et s'aggrave-t-il progressivement ?" },
      { id: "dy2_aeg", label: "AEG / tabac-alcool", type: "boolean", question: "Avez-vous maigri, ou êtes-vous fumeur/buveur ?" },
      { id: "dy2_neuro", label: "Trouble de déglutition", type: "boolean", question: "Avez-vous des fausses routes, une voix nasonnée, ou d'autres signes neurologiques ?" },
      { id: "dy2_douleur", label: "Odynophagie infectieuse", type: "boolean", question: "Est-ce douloureux à la déglutition, avec un contexte infectieux ?" }
    ],
    red_flags: [
      { id: "dy2_rf_aphagie", niveau: 3, when: { q: "dy2_aphagie", eq: true },
        message_medecin: "Aphagie / blocage alimentaire aigu : urgence (corps étranger, endoscopie).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "dy2_rf_cancer", niveau: 2, when: { any: [{ q: "dy2_solide_progressif", eq: true }, { q: "dy2_aeg", eq: true }] },
        message_medecin: "Dysphagie aux solides progressive (± fumeur/amaigrissement) : cancer œsophagien à éliminer → endoscopie.",
        message_patient: "Une difficulté à avaler qui s'aggrave nécessite un avis médical et une endoscopie." },
      { id: "dy2_rf_neuro", niveau: 2, when: { q: "dy2_neuro", eq: true },
        message_medecin: "Dysphagie avec fausses routes / signes neuro : trouble de la déglutition (cause neurologique) → avis.",
        message_patient: "Des fausses routes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "dy2_cancer", diagnostic: "Cancer de l'œsophage", arguments: [{ label: "dysphagie solides progressive", w: 3, when: { q: "dy2_solide_progressif", eq: true } }, { label: "AEG / tabac-alcool", w: 2, when: { q: "dy2_aeg", eq: true } }],
        examens_a_discuter: ["Endoscopie œso-gastro-duodénale"] },
      { id: "dy2_neuro", diagnostic: "Trouble moteur / neurologique de la déglutition", arguments: [{ label: "fausses routes / signes neuro", w: 3, when: { q: "dy2_neuro", eq: true } }],
        examens_a_discuter: ["Avis neurologique / ORL", "Exploration de la déglutition"] },
      { id: "dy2_oesophagite", diagnostic: "Œsophagite (infectieuse / RGO)", arguments: [{ label: "odynophagie", w: 3, when: { q: "dy2_douleur", eq: true } }],
        examens_a_discuter: ["Traitement, endoscopie si persistance"] },
      { id: "dy2_corps", diagnostic: "Corps étranger / blocage aigu", arguments: [{ label: "aphagie aiguë", w: 3, when: { q: "dy2_aphagie", eq: true } }],
        examens_a_discuter: ["Endoscopie en urgence"] }
    ],
    examens_clinique: ["Examen ORL", "État nutritionnel (poids)", "Examen neurologique", "Recherche d'adénopathies cervicales"]
  },

  // -------------------------------------------------------------------------
  // ARTHRITE / DOULEUR ARTICULAIRE AIGUË
  // -------------------------------------------------------------------------
  arthrite: {
    id: "arthrite", symptome: "Articulation douloureuse / gonflée (arthrite)", specialite: ["Rhumatologie"], urgence: true,
    questions: [
      { id: "ar_septique", label: "Monoarthrite fébrile", type: "boolean", question: "Une seule articulation est-elle brutalement gonflée, rouge, chaude et très douloureuse, avec de la fièvre ?" },
      { id: "ar_porte", label: "Porte d'entrée / prothèse", type: "boolean", question: "Y a-t-il une plaie, une infection récente, ou une prothèse articulaire ?" },
      { id: "ar_goutte", label: "Microcristalline", type: "boolean", question: "Est-ce une crise brutale très douloureuse du gros orteil ou du genou, récidivante ?" },
      { id: "ar_inflammatoire", label: "Rhumatisme inflammatoire", type: "boolean", question: "Avez-vous plusieurs articulations douloureuses avec une raideur matinale prolongée (> 30 min) ?" },
      { id: "ar_traumatisme", label: "Traumatisme", type: "boolean", question: "Y a-t-il eu un traumatisme ?" }
    ],
    red_flags: [
      { id: "ar_rf_septique", niveau: 3, when: { q: "ar_septique", eq: true },
        message_medecin: "Monoarthrite aiguë fébrile : arthrite septique jusqu'à preuve du contraire → ponction articulaire en URGENCE (avant antibiotiques).",
        message_patient: "Une articulation chaude et douloureuse avec fièvre nécessite une évaluation médicale immédiate." },
      { id: "ar_rf_prothese", niveau: 2, when: { q: "ar_porte", eq: true },
        message_medecin: "Porte d'entrée / prothèse : risque d'arthrite septique → avis.",
        message_patient: "Ce contexte nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ar_septique", diagnostic: "Arthrite septique", arguments: [{ label: "monoarthrite fébrile", w: 3, when: { q: "ar_septique", eq: true } }, { label: "porte d'entrée / prothèse", w: 1, when: { q: "ar_porte", eq: true } }],
        examens_a_discuter: ["Ponction articulaire en urgence", "Hémocultures"] },
      { id: "ar_goutte", diagnostic: "Arthrite microcristalline (goutte)", arguments: [{ label: "crise du gros orteil récidivante", w: 3, when: { q: "ar_goutte", eq: true } }],
        examens_a_discuter: ["Uricémie (à distance), ponction si doute", "AINS / colchicine"] },
      { id: "ar_inflammatoire", diagnostic: "Rhumatisme inflammatoire (PR…)", arguments: [{ label: "polyarthrite + raideur matinale", w: 3, when: { q: "ar_inflammatoire", eq: true } }],
        examens_a_discuter: ["VS/CRP, facteur rhumatoïde, anti-CCP", "Avis rhumatologique"] },
      { id: "ar_trauma", diagnostic: "Cause traumatique", arguments: [{ label: "traumatisme", w: 3, when: { q: "ar_traumatisme", eq: true } }],
        examens_a_discuter: ["Radiographie"] }
    ],
    examens_clinique: ["Examen articulaire (épanchement, chaleur, rougeur)", "Température", "Recherche d'une porte d'entrée", "Ponction articulaire si monoarthrite fébrile"]
  },

  // -------------------------------------------------------------------------
  // INCONTINENCE URINAIRE
  // -------------------------------------------------------------------------
  incontinence_urinaire: {
    id: "incontinence_urinaire", symptome: "Fuites urinaires (incontinence)", specialite: ["Urologie", "Gynécologie"],
    questions: [
      { id: "in_neuro", label: "Cause neurologique", type: "boolean", question: "L'incontinence est-elle récente, avec des troubles neurologiques (faiblesse des jambes, perte de sensibilité autour de l'anus) ?" },
      { id: "in_retention", label: "Regorgement", type: "boolean", question: "Avez-vous des fuites avec l'impression de ne jamais bien vider la vessie (mictions par regorgement) ?" },
      { id: "in_infection", label: "Hématurie / infection", type: "boolean", question: "Y a-t-il des brûlures, du sang dans les urines, ou de la fièvre ?" },
      { id: "in_effort", label: "Incontinence d'effort", type: "boolean", question: "Les fuites surviennent-elles à l'effort (toux, rire, port de charge) ?" },
      { id: "in_urgenturie", label: "Hyperactivité vésicale", type: "boolean", question: "Avez-vous des envies pressantes et soudaines avec fuites avant d'arriver aux toilettes ?" }
    ],
    red_flags: [
      { id: "in_rf_neuro", niveau: 3, when: { q: "in_neuro", eq: true },
        message_medecin: "Incontinence récente + signes neurologiques (sensibilité périnéale) : syndrome de la queue de cheval / atteinte médullaire → urgence (IRM).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "in_rf_retention", niveau: 2, when: { q: "in_retention", eq: true },
        message_medecin: "Incontinence par regorgement : rechercher une rétention chronique / un globe → échographie post-mictionnelle, avis.",
        message_patient: "Ce type de fuite nécessite un avis médical." },
      { id: "in_rf_infection", niveau: 2, when: { q: "in_infection", eq: true },
        message_medecin: "Hématurie / signes infectieux : explorer (ECBU ; voir hématurie/cystite).",
        message_patient: "Ces signes nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "in_effort", diagnostic: "Incontinence urinaire d'effort", arguments: [{ label: "fuites à l'effort", w: 3, when: { q: "in_effort", eq: true } }],
        examens_a_discuter: ["Rééducation périnéale", "Avis spécialisé"] },
      { id: "in_urgenturie", diagnostic: "Incontinence par urgenturie (hyperactivité vésicale)", arguments: [{ label: "urgenturies", w: 3, when: { q: "in_urgenturie", eq: true } }],
        examens_a_discuter: ["Bandelette urinaire, mesures comportementales"] },
      { id: "in_regorgement", diagnostic: "Incontinence par regorgement (rétention)", arguments: [{ label: "mauvaise vidange", w: 3, when: { q: "in_retention", eq: true } }],
        examens_a_discuter: ["Échographie post-mictionnelle"] },
      { id: "in_neuro", diagnostic: "Cause neurologique", arguments: [{ label: "signes neurologiques", w: 3, when: { q: "in_neuro", eq: true } }],
        examens_a_discuter: ["IRM, avis neurologique"] }
    ],
    examens_clinique: ["Bandelette urinaire", "Recherche d'un globe vésical", "Examen neurologique périnéal", "Caractériser le type d'incontinence"]
  },

  // -------------------------------------------------------------------------
  // RÉTENTION URINAIRE
  // -------------------------------------------------------------------------
  retention_urinaire: {
    id: "retention_urinaire", symptome: "Impossibilité d'uriner (rétention)", specialite: ["Urologie"], urgence: true,
    questions: [
      { id: "rt_aigue", label: "Globe douloureux", type: "boolean", question: "N'arrivez-vous plus du tout à uriner, avec une envie douloureuse et un ventre tendu en bas ?" },
      { id: "rt_neuro", label: "Cause neurologique", type: "boolean", question: "Avez-vous des troubles neurologiques (faiblesse des jambes, perte de sensibilité autour de l'anus) ?" },
      { id: "rt_anurie", label: "Anurie (IRA)", type: "boolean", question: "Est-ce plutôt une absence totale d'urines SANS envie ni ventre tendu (les reins ne produisent plus) ?" },
      { id: "rt_fievre", label: "Prostatite", type: "boolean", question: "Avez-vous de la fièvre (prostatite, infection) ?" },
      { id: "rt_medic", label: "Iatrogène", type: "boolean", question: "Avez-vous pris un nouveau médicament (anticholinergique, opiacé) ?" }
    ],
    red_flags: [
      { id: "rt_rf_aigue", niveau: 3, when: { q: "rt_aigue", eq: true },
        message_medecin: "Rétention aiguë d'urine (globe douloureux) : urgence (sondage / cathéter sus-pubien).",
        message_patient: "Ne plus pouvoir uriner avec un ventre tendu et douloureux nécessite une évaluation médicale immédiate." },
      { id: "rt_rf_neuro", niveau: 3, when: { q: "rt_neuro", eq: true },
        message_medecin: "Rétention + signes neurologiques : syndrome de la queue de cheval / atteinte médullaire → urgence (IRM).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "rt_rf_anurie", niveau: 3, when: { q: "rt_anurie", eq: true },
        message_medecin: "Anurie (pas d'urine sans globe) : insuffisance rénale aiguë → urgence (créatinine, échographie).",
        message_patient: "Cette situation nécessite une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "rt_aigue", diagnostic: "Rétention aiguë d'urine", arguments: [{ label: "globe douloureux", w: 3, when: { q: "rt_aigue", eq: true } }, { label: "médicament favorisant", w: 1, when: { q: "rt_medic", eq: true } }],
        examens_a_discuter: ["Sondage / cathéter sus-pubien en urgence", "Rechercher la cause (prostate, fécalome, médicament)"] },
      { id: "rt_neuro", diagnostic: "Cause neurologique", arguments: [{ label: "signes neurologiques", w: 3, when: { q: "rt_neuro", eq: true } }],
        examens_a_discuter: ["IRM médullaire"] },
      { id: "rt_anurie", diagnostic: "Anurie (insuffisance rénale aiguë)", arguments: [{ label: "absence d'urine sans globe", w: 3, when: { q: "rt_anurie", eq: true } }],
        examens_a_discuter: ["Créatinine, échographie rénale"] },
      { id: "rt_prostatite", diagnostic: "Prostatite (rétention fébrile)", arguments: [{ label: "fièvre", w: 2, when: { q: "rt_fievre", eq: true } }],
        examens_a_discuter: ["ECBU, avis urologique"] }
    ],
    examens_clinique: ["Palpation/percussion sus-pubienne (globe)", "Toucher rectal (prostate)", "Examen neurologique périnéal", "Créatinine, bandelette urinaire"]
  },

  // -------------------------------------------------------------------------
  // MÉTRORRAGIES
  // -------------------------------------------------------------------------
  metrorragies: {
    id: "metrorragies", symptome: "Saignements gynécologiques (métrorragies)", specialite: ["Gynécologie"], urgence: true,
    questions: [
      { id: "me_choc", label: "Abondance / choc", type: "boolean", question: "Le saignement est-il très abondant, avec malaise, pâleur, ou cœur rapide ?" },
      { id: "me_douleur", label: "Douleur pelvienne", type: "boolean", question: "Y a-t-il une douleur du bas-ventre associée ?" },
      { id: "me_menopause", label: "Post-ménopause", type: "boolean", question: "Êtes-vous ménopausée (saignement après l'arrêt définitif des règles) ?" },
      { id: "me_postcoital", label: "Post-coïtal", type: "boolean", question: "Le saignement survient-il surtout après les rapports ?" },
      { id: "me_contraception", label: "Iatrogène / DIU", type: "boolean", question: "Avez-vous un changement récent de contraception, ou un stérilet ?" }
    ],
    red_flags: [
      { id: "me_rf_geu", niveau: 3, when: { all: [{ ctx: "grossessePossible", eq: true }, { q: "me_douleur", eq: true }] },
        message_medecin: "Saignement + douleur + grossesse possible : grossesse extra-utérine → urgence (β-hCG, échographie ; voir algie pelvienne).",
        message_patient: "Cette association nécessite une évaluation médicale urgente." },
      { id: "me_rf_choc", niveau: 3, when: { q: "me_choc", eq: true },
        message_medecin: "Métrorragies abondantes / signes de choc : urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "me_rf_menopause", niveau: 2, when: { q: "me_menopause", eq: true },
        message_medecin: "Saignement post-ménopausique : cancer de l'endomètre jusqu'à preuve du contraire → échographie endovaginale + avis gynéco.",
        message_patient: "Un saignement après la ménopause nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "me_obstetrical", diagnostic: "Cause obstétricale (grossesse / GEU)", arguments: [{ label: "grossesse possible", w: 3, when: { ctx: "grossessePossible", eq: true } }, { label: "douleur associée", w: 1, when: { q: "me_douleur", eq: true } }],
        examens_a_discuter: ["β-hCG, échographie pelvienne"] },
      { id: "me_endometre", diagnostic: "Cancer de l'endomètre (post-ménopause)", arguments: [{ label: "saignement post-ménopausique", w: 3, when: { q: "me_menopause", eq: true } }],
        examens_a_discuter: ["Échographie endovaginale", "Biopsie d'endomètre"] },
      { id: "me_cervical", diagnostic: "Cause cervicale (cervicite, polype, cancer du col)", arguments: [{ label: "saignement post-coïtal", w: 3, when: { q: "me_postcoital", eq: true } }],
        examens_a_discuter: ["Examen au spéculum, frottis"] },
      { id: "me_fonctionnel", diagnostic: "Cause fonctionnelle / iatrogène", arguments: [{ label: "contraception / DIU", w: 2, when: { q: "me_contraception", eq: true } }],
        examens_a_discuter: ["Réévaluation, échographie"] }
    ],
    examens_clinique: ["Examen au spéculum", "β-hCG", "Échographie pelvienne", "Pouls et pression artérielle si abondant"]
  },

  // -------------------------------------------------------------------------
  // INSOMNIE
  // -------------------------------------------------------------------------
  insomnie: {
    id: "insomnie", symptome: "Insomnie / troubles du sommeil", specialite: ["Médecine générale", "Psychiatrie"],
    questions: [
      { id: "is_humeur", label: "Dépression", type: "boolean", question: "Avez-vous une tristesse, une perte d'intérêt, ou des idées noires ?" },
      { id: "is_apnee", label: "Apnées du sommeil", type: "boolean", question: "Ronflez-vous avec des pauses respiratoires et une somnolence dans la journée ?" },
      { id: "is_organique", label: "Cause organique", type: "boolean", question: "L'insomnie est-elle liée à des douleurs, des envies fréquentes d'uriner, ou une gêne respiratoire nocturne ?" },
      { id: "is_substance", label: "Substances / hygiène", type: "boolean", question: "Consommez-vous excitants (café), alcool, écrans tardifs, ou des médicaments stimulants ?" },
      { id: "is_anxiete", label: "Anxiété", type: "boolean", question: "Est-ce lié à un stress, une anxiété, des ruminations ?" }
    ],
    red_flags: [
      { id: "is_rf_depression", niveau: 2, when: { q: "is_humeur", eq: true },
        message_medecin: "Insomnie + symptômes dépressifs / idées noires : évaluer une dépression et le risque suicidaire (voir fiche anxiété).",
        message_patient: "Si vous avez des idées noires, parlez-en à un médecin (ou appelez le 3114)." },
      { id: "is_rf_apnee", niveau: 2, when: { q: "is_apnee", eq: true },
        message_medecin: "Ronflements + pauses + somnolence : syndrome d'apnées du sommeil → dépistage (polygraphie).",
        message_patient: "Ces signes méritent un dépistage du sommeil." }
    ],
    diagnostics_differentiels: [
      { id: "is_psychophysio", diagnostic: "Insomnie psychophysiologique / anxieuse", arguments: [{ label: "stress, ruminations", w: 3, when: { q: "is_anxiete", eq: true } }],
        examens_a_discuter: ["Hygiène du sommeil, TCC de l'insomnie"] },
      { id: "is_depression", diagnostic: "Dépression", arguments: [{ label: "symptômes dépressifs", w: 3, when: { q: "is_humeur", eq: true } }],
        examens_a_discuter: ["Évaluation thymique, suivi"] },
      { id: "is_apnee", diagnostic: "Syndrome d'apnées du sommeil", arguments: [{ label: "ronflements + pauses + somnolence", w: 3, when: { q: "is_apnee", eq: true } }],
        examens_a_discuter: ["Polygraphie ventilatoire"] },
      { id: "is_organique", diagnostic: "Cause organique / iatrogène", arguments: [{ label: "douleurs/nycturie/dyspnée", w: 2, when: { q: "is_organique", eq: true } }, { label: "excitants / substances", w: 2, when: { q: "is_substance", eq: true } }],
        examens_a_discuter: ["Traiter la cause, revue des excitants et médicaments"] }
    ],
    examens_clinique: ["Agenda du sommeil", "Dépistage d'une dépression", "Signes d'apnées (IMC, tour de cou)", "Revue des substances et médicaments"]
  },

  // -------------------------------------------------------------------------
  // SEVRAGE ALCOOLIQUE
  // -------------------------------------------------------------------------
  sevrage_alcool: {
    id: "sevrage_alcool", symptome: "Sevrage / dépendance à l'alcool", specialite: ["Addictologie", "Psychiatrie"], urgence: true,
    questions: [
      { id: "se_dt", label: "Delirium tremens", type: "boolean", question: "Y a-t-il une confusion, des tremblements importants, des hallucinations, de la fièvre ou des sueurs profuses après l'arrêt de l'alcool ?" },
      { id: "se_convulsion", label: "Crise convulsive", type: "boolean", question: "Y a-t-il eu une crise convulsive ?" },
      { id: "se_tremblements", label: "Sevrage simple", type: "boolean", question: "Avez-vous des tremblements, de l'anxiété, des sueurs ou des nausées le matin, soulagés par l'alcool ?" },
      { id: "se_comorbid", label: "Comorbidités", type: "boolean", question: "Y a-t-il une maladie du foie, une dénutrition, ou d'autres pathologies ?" },
      { id: "se_demande", label: "Demande d'aide", type: "boolean", question: "Êtes-vous demandeur d'aide pour réduire ou arrêter votre consommation ?" }
    ],
    red_flags: [
      { id: "se_rf_dt", niveau: 3, when: { any: [{ q: "se_dt", eq: true }, { q: "se_convulsion", eq: true }] },
        message_medecin: "Delirium tremens / crise convulsive de sevrage : urgence vitale (hospitalisation, benzodiazépines, hydratation, vitamine B1).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "se_simple", diagnostic: "Syndrome de sevrage simple", arguments: [{ label: "tremblements / sueurs matinales", w: 3, when: { q: "se_tremblements", eq: true } }],
        examens_a_discuter: ["Benzodiazépines, hydratation", "Vitamine B1 (thiamine) AVANT tout apport glucosé"] },
      { id: "se_complique", diagnostic: "Sevrage compliqué (DT, convulsions)", arguments: [{ label: "delirium tremens", w: 3, when: { q: "se_dt", eq: true } }, { label: "convulsions", w: 2, when: { q: "se_convulsion", eq: true } }],
        examens_a_discuter: ["Hospitalisation"] },
      { id: "se_programme", diagnostic: "Sevrage programmé / accompagnement", arguments: [{ label: "demande d'aide", w: 2, when: { q: "se_demande", eq: true } }, { label: "comorbidités", w: 1, when: { q: "se_comorbid", eq: true } }],
        examens_a_discuter: ["Évaluation, sevrage encadré", "Vitamine B1, accompagnement addictologique"] }
    ],
    examens_clinique: ["Évaluation de la sévérité (score de Cushman)", "Recherche de comorbidités (foie, dénutrition)", "Vitamine B1 systématique avant tout apport glucosé"]
  },

  // -------------------------------------------------------------------------
  // RHINOPHARYNGITE / RHUME
  // -------------------------------------------------------------------------
  rhinopharyngite: {
    id: "rhinopharyngite", symptome: "Rhume / rhinopharyngite (nez qui coule, bouché)", specialite: ["ORL"],
    questions: [
      { id: "rh_simple", label: "Tableau viral banal", type: "boolean", question: "S'agit-il d'un nez qui coule, bouché, avec éternuements et un mal de gorge léger ?" },
      { id: "rh_duree", label: "Persistance / aggravation", type: "boolean", question: "Les symptômes durent-ils plus de 10 jours sans amélioration, ou s'aggravent-ils après une amélioration ?" },
      { id: "rh_fievre", label: "Fièvre prolongée", type: "boolean", question: "Avez-vous une fièvre élevée persistante (plus de 3 jours) ?" },
      { id: "rh_unilateral", label: "Corps étranger (enfant)", type: "boolean", question: "Y a-t-il un écoulement d'une seule narine, purulent ou sanglant, persistant (surtout chez l'enfant) ?" },
      { id: "rh_dyspnee", label: "Gêne respiratoire", type: "boolean", question: "Avez-vous une gêne respiratoire, ou un nourrisson qui respire/mange mal ?" }
    ],
    red_flags: [
      { id: "rh_rf_dyspnee", niveau: 3, when: { q: "rh_dyspnee", eq: true },
        message_medecin: "Gêne respiratoire (nourrisson qui mange mal) : évaluer (bronchiolite, détresse).",
        message_patient: "Une gêne respiratoire nécessite une évaluation médicale rapide." },
      { id: "rh_rf_complication", niveau: 2, when: { any: [{ q: "rh_duree", eq: true }, { q: "rh_fievre", eq: true }] },
        message_medecin: "Persistance > 10 j / aggravation / fièvre prolongée : complication (sinusite, otite, surinfection) → réévaluer.",
        message_patient: "Des symptômes qui durent ou s'aggravent nécessitent une réévaluation." },
      { id: "rh_rf_corps", niveau: 2, when: { q: "rh_unilateral", eq: true },
        message_medecin: "Écoulement nasal unilatéral persistant (enfant) : corps étranger → avis ORL.",
        message_patient: "Un écoulement d'une seule narine chez l'enfant nécessite un avis ORL." }
    ],
    diagnostics_differentiels: [
      { id: "rh_virale", diagnostic: "Rhinopharyngite virale", arguments: [{ label: "tableau viral banal", w: 3, when: { q: "rh_simple", eq: true } }],
        examens_a_discuter: ["Traitement symptomatique (pas d'antibiotique)"] },
      { id: "rh_surinfection", diagnostic: "Surinfection / sinusite", arguments: [{ label: "persistance / aggravation", w: 3, when: { q: "rh_duree", eq: true } }, { label: "fièvre prolongée", w: 1, when: { q: "rh_fievre", eq: true } }],
        examens_a_discuter: ["Réévaluation clinique"] },
      { id: "rh_corps", diagnostic: "Corps étranger nasal", arguments: [{ label: "écoulement unilatéral persistant", w: 3, when: { q: "rh_unilateral", eq: true } }],
        examens_a_discuter: ["Avis ORL"] }
    ],
    examens_clinique: ["Examen ORL", "Température", "Auscultation chez le nourrisson"]
  },

  // -------------------------------------------------------------------------
  // SINUSITE
  // -------------------------------------------------------------------------
  sinusite: {
    id: "sinusite", symptome: "Sinusite", specialite: ["ORL"], urgence: true,
    questions: [
      { id: "si_unilaterale", label: "Sinusite aiguë typique", type: "boolean", question: "Avez-vous une douleur de la face d'un côté, qui augmente en se penchant en avant, avec un écoulement purulent ?" },
      { id: "si_double", label: "Évolution en deux temps", type: "boolean", question: "Après un rhume qui s'améliorait, y a-t-il eu une ré-aggravation (fièvre, douleur) ?" },
      { id: "si_complication", label: "Complication orbitaire/neuro", type: "boolean", question: "Avez-vous un gonflement/rougeur autour de l'œil, des troubles visuels, des maux de tête intenses, ou des signes neurologiques ?" },
      { id: "si_dentaire", label: "Origine dentaire", type: "boolean", question: "Y a-t-il eu un soin dentaire récent (côté supérieur) ?" },
      { id: "si_chronique", label: "Chronique / récidivante", type: "boolean", question: "Est-ce récidivant ou chronique (plus de 12 semaines) ?" }
    ],
    red_flags: [
      { id: "si_rf_complication", niveau: 3, when: { q: "si_complication", eq: true },
        message_medecin: "Signes de complication (cellulite orbitaire, atteinte neuro-méningée, sinusite frontale hyperalgique) : urgence (imagerie, avis).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "si_aigue", diagnostic: "Sinusite maxillaire aiguë", arguments: [{ label: "douleur unilatérale + écoulement purulent", w: 3, when: { q: "si_unilaterale", eq: true } }, { label: "évolution en deux temps", w: 2, when: { q: "si_double", eq: true } }],
        examens_a_discuter: ["Traitement symptomatique", "Antibiothérapie si critères"] },
      { id: "si_compliquee", diagnostic: "Sinusite compliquée", arguments: [{ label: "signes orbitaires / neuro", w: 3, when: { q: "si_complication", eq: true } }],
        examens_a_discuter: ["TDM, avis ORL, urgence"] },
      { id: "si_dentaire", diagnostic: "Sinusite maxillaire d'origine dentaire", arguments: [{ label: "contexte dentaire", w: 3, when: { q: "si_dentaire", eq: true } }],
        examens_a_discuter: ["Avis ORL + dentaire"] },
      { id: "si_chronique", diagnostic: "Sinusite chronique", arguments: [{ label: "évolution chronique / récidivante", w: 3, when: { q: "si_chronique", eq: true } }],
        examens_a_discuter: ["Avis ORL, imagerie (TDM)"] }
    ],
    examens_clinique: ["Palpation des points sinusiens", "Examen ORL (rhinoscopie)", "Recherche de signes orbitaires / neurologiques"]
  },

  // -------------------------------------------------------------------------
  // BAISSE D'AUDITION
  // -------------------------------------------------------------------------
  baisse_audition: {
    id: "baisse_audition", symptome: "Baisse d'audition", specialite: ["ORL"], urgence: true,
    questions: [
      { id: "ba_brusque", label: "Surdité brusque", type: "boolean", question: "La baisse d'audition est-elle apparue brutalement, d'un seul côté ?" },
      { id: "ba_bouchon", label: "Bouchon de cérumen", type: "boolean", question: "Avez-vous une sensation d'oreille bouchée, après un bain ou un nettoyage ?" },
      { id: "ba_otite", label: "Otite", type: "boolean", question: "Y a-t-il une douleur, un écoulement, ou un contexte d'otite ?" },
      { id: "ba_neuro", label: "Signes associés", type: "boolean", question: "Y a-t-il des vertiges, des acouphènes d'un seul côté, ou des signes neurologiques ?" },
      { id: "ba_progressive", label: "Presbyacousie", type: "boolean", question: "Est-ce progressif, des deux côtés, avec l'âge ou une exposition au bruit ?" }
    ],
    red_flags: [
      { id: "ba_rf_brusque", niveau: 3, when: { q: "ba_brusque", eq: true },
        message_medecin: "Surdité brusque : urgence ORL (corticothérapie d'autant plus efficace qu'elle est précoce).",
        message_patient: "Une perte d'audition brutale nécessite une évaluation médicale sans attendre." },
      { id: "ba_rf_neuro", niveau: 2, when: { q: "ba_neuro", eq: true },
        message_medecin: "Surdité unilatérale + acouphène / vertige : explorer (IRM, neurinome — voir fiche acouphène).",
        message_patient: "Ces signes nécessitent un avis ORL." }
    ],
    diagnostics_differentiels: [
      { id: "ba_bouchon", diagnostic: "Bouchon de cérumen", arguments: [{ label: "oreille bouchée après bain/nettoyage", w: 3, when: { q: "ba_bouchon", eq: true } }],
        examens_a_discuter: ["Otoscopie", "Lavage / extraction"] },
      { id: "ba_otite", diagnostic: "Otite", arguments: [{ label: "douleur / écoulement", w: 3, when: { q: "ba_otite", eq: true } }],
        examens_a_discuter: ["Otoscopie (voir fiche otite)"] },
      { id: "ba_brusque", diagnostic: "Surdité brusque (de perception)", arguments: [{ label: "installation brutale unilatérale", w: 3, when: { q: "ba_brusque", eq: true } }],
        examens_a_discuter: ["Avis ORL urgent, audiométrie"] },
      { id: "ba_presbyacousie", diagnostic: "Presbyacousie / surdité de perception", arguments: [{ label: "progressive, bilatérale", w: 3, when: { q: "ba_progressive", eq: true } }],
        examens_a_discuter: ["Audiométrie"] }
    ],
    examens_clinique: ["Otoscopie", "Acoumétrie (Weber / Rinne)", "Audiométrie"]
  },

  // -------------------------------------------------------------------------
  // DOULEUR DENTAIRE
  // -------------------------------------------------------------------------
  douleur_dentaire: {
    id: "douleur_dentaire", symptome: "Douleur dentaire / infection dentaire", specialite: ["Odontologie"], urgence: true,
    questions: [
      { id: "de_plancher", label: "Cellulite cervicale extensive", type: "boolean", question: "Le gonflement touche-t-il le plancher de la bouche ou le cou, avec une gêne pour avaler ou respirer ?" },
      { id: "de_cellulite", label: "Cellulite faciale / fièvre", type: "boolean", question: "Avez-vous un gonflement de la joue/du visage, de la fièvre, ou une difficulté à ouvrir la bouche ?" },
      { id: "de_abces", label: "Abcès", type: "boolean", question: "Y a-t-il un abcès (gonflement de la gencive, pus, dent qui « sonne ») ?" },
      { id: "de_pulpite", label: "Pulpite (rage de dent)", type: "boolean", question: "La douleur est-elle intense, spontanée, augmentée par le chaud/froid, irradiante ?" }
    ],
    red_flags: [
      { id: "de_rf_grave", niveau: 3, when: { q: "de_plancher", eq: true },
        message_medecin: "Cellulite cervico-faciale extensive / dyspnée / dysphagie : urgence (risque vital, drainage, antibiothérapie IV).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "de_rf_cellulite", niveau: 2, when: { q: "de_cellulite", eq: true },
        message_medecin: "Cellulite faciale / fièvre / trismus : antibiothérapie + avis dentaire/stomatologique rapide.",
        message_patient: "Un gonflement du visage avec fièvre nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "de_pulpite", diagnostic: "Carie / pulpite", arguments: [{ label: "rage de dent (chaud/froid)", w: 3, when: { q: "de_pulpite", eq: true } }],
        examens_a_discuter: ["Avis dentaire", "Antalgiques"] },
      { id: "de_abces", diagnostic: "Abcès dentaire", arguments: [{ label: "abcès / dent qui sonne", w: 3, when: { q: "de_abces", eq: true } }],
        examens_a_discuter: ["Avis dentaire (drainage)", "Antibiothérapie si signes généraux"] },
      { id: "de_cellulite", diagnostic: "Cellulite faciale d'origine dentaire", arguments: [{ label: "gonflement facial / fièvre", w: 3, when: { q: "de_cellulite", eq: true } }, { label: "extension cervicale", w: 2, when: { q: "de_plancher", eq: true } }],
        examens_a_discuter: ["Antibiothérapie, avis ; urgence si extensive"] }
    ],
    examens_clinique: ["Examen de la cavité buccale et des dents", "Recherche d'une cellulite, d'un trismus, d'une dysphagie", "Température"]
  },

  // -------------------------------------------------------------------------
  // APHTE / ULCÉRATION BUCCALE
  // -------------------------------------------------------------------------
  aphte: {
    id: "aphte", symptome: "Aphte / plaie de la bouche", specialite: ["Stomatologie"],
    questions: [
      { id: "ap2_persistant", label: "Ulcération persistante (cancer)", type: "boolean", question: "Une lésion de la bouche persiste-t-elle plus de 2-3 semaines, indurée, peu douloureuse (surtout fumeur/buveur) ?" },
      { id: "ap2_genital", label: "Aphtose bipolaire (Behçet)", type: "boolean", question: "Y a-t-il aussi des aphtes génitaux, ou des atteintes des yeux/des articulations ?" },
      { id: "ap2_recidivant", label: "Aphtose banale", type: "boolean", question: "Est-ce récidivant (aphtes qui reviennent régulièrement) ?" },
      { id: "ap2_aeg", label: "AEG / nombreux", type: "boolean", question: "Y a-t-il une fièvre, une altération de l'état général, ou des aphtes très nombreux ?" }
    ],
    red_flags: [
      { id: "ap2_rf_cancer", niveau: 2, when: { q: "ap2_persistant", eq: true },
        message_medecin: "Ulcération buccale persistante > 3 semaines (fumeur/buveur) : cancer à éliminer → avis, biopsie.",
        message_patient: "Une plaie de la bouche qui ne guérit pas nécessite un avis médical." },
      { id: "ap2_rf_behcet", niveau: 2, when: { q: "ap2_genital", eq: true },
        message_medecin: "Aphtose bipolaire / atteinte oculaire-articulaire : évoquer une maladie de Behçet ou systémique → avis.",
        message_patient: "Cette association nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ap2_banal", diagnostic: "Aphtose banale", arguments: [{ label: "récidivant, isolé", w: 3, when: { q: "ap2_recidivant", eq: true } }],
        examens_a_discuter: ["Traitement local, réassurance"] },
      { id: "ap2_cancer", diagnostic: "Carcinome (ulcération persistante)", arguments: [{ label: "lésion persistante indurée", w: 3, when: { q: "ap2_persistant", eq: true } }],
        examens_a_discuter: ["Biopsie"] },
      { id: "ap2_systemique", diagnostic: "Aphtose d'une maladie systémique (Behçet, MICI)", arguments: [{ label: "aphtose bipolaire / atteintes associées", w: 3, when: { q: "ap2_genital", eq: true } }, { label: "AEG", w: 1, when: { q: "ap2_aeg", eq: true } }],
        examens_a_discuter: ["Avis spécialisé"] }
    ],
    examens_clinique: ["Examen de la cavité buccale", "Caractère de la lésion (taille, induration, durée)", "Recherche d'atteintes associées"]
  },

  // -------------------------------------------------------------------------
  // CONJONCTIVITE
  // -------------------------------------------------------------------------
  conjonctivite: {
    id: "conjonctivite", symptome: "Conjonctivite (œil rouge qui colle)", specialite: ["Ophtalmologie"], urgence: true,
    questions: [
      { id: "cj_douleur", label: "Signes de gravité", type: "boolean", question: "Avez-vous une douleur importante, une baisse de vision, ou une forte sensibilité à la lumière ?" },
      { id: "cj_lentilles", label: "Port de lentilles", type: "boolean", question: "Portez-vous des lentilles de contact ?" },
      { id: "cj_secretions", label: "Conjonctivite infectieuse", type: "boolean", question: "Avez-vous des sécrétions (yeux collés le matin), des deux yeux, sans baisse de vision ?" },
      { id: "cj_allergie", label: "Conjonctivite allergique", type: "boolean", question: "Y a-t-il des démangeaisons, un contexte allergique, des deux yeux ?" },
      { id: "cj_purulent", label: "Sécrétions purulentes", type: "boolean", question: "Les sécrétions sont-elles franchement purulentes (jaunes/vertes, abondantes) ?" },
      { id: "cj_viral", label: "Contexte viral", type: "boolean", question: "Y a-t-il un rhume/contage récent, des sécrétions plutôt claires, un œil très rouge, parfois un ganglion devant l'oreille (très contagieux) ?" },
      { id: "cj_nourrisson", label: "Nouveau-né", type: "boolean", question: "S'agit-il d'un nouveau-né (moins de 28 jours) ?" }
    ],
    red_flags: [
      { id: "cj_rf_grave", niveau: 3, when: { any: [{ q: "cj_douleur", eq: true }, { q: "cj_lentilles", eq: true }] },
        message_medecin: "Œil rouge douloureux / baisse de vision / photophobie / port de lentilles : ce n'est pas une simple conjonctivite (kératite, abcès de cornée sous lentilles, uvéite, glaucome aigu) → avis ophtalmologique urgent.",
        message_patient: "Ces signes nécessitent une évaluation ophtalmologique urgente." },
      { id: "cj_rf_neonat", niveau: 3, when: { q: "cj_nourrisson", eq: true },
        message_medecin: "Conjonctivite du nouveau-né (ophtalmie néonatale) : urgence — gonocoque (purulence majeure précoce, risque de perforation) ou Chlamydia → prélèvements et traitement spécifique en urgence, avis ophtalmologique/pédiatrique.",
        message_patient: "Un œil rouge/qui coule chez un nouveau-né nécessite une consultation en urgence." }
    ],
    diagnostics_differentiels: [
      { id: "cj_bacterienne", diagnostic: "Conjonctivite bactérienne", arguments: [{ label: "sécrétions purulentes, yeux collés", w: 3, when: { q: "cj_purulent", eq: true } }, { label: "sécrétions, yeux collés", w: 1, when: { q: "cj_secretions", eq: true } }],
        examens_a_discuter: ["Hygiène, lavage au sérum physiologique", "Le plus souvent spontanément résolutive ; collyre antibiotique si purulente/traînante ou terrain à risque"] },
      { id: "cj_virale", diagnostic: "Conjonctivite virale (adénovirus)", arguments: [{ label: "contexte viral, sécrétions claires, ADP prétragienne", w: 3, when: { q: "cj_viral", eq: true } }, { label: "sécrétions, yeux collés", w: 1, when: { q: "cj_secretions", eq: true } }],
        examens_a_discuter: ["TRÈS contagieuse : lavage des mains, ne pas partager serviettes, éviction", "Traitement symptomatique (sérum physiologique) ; pas d'antibiotique ; consulter si baisse de vision (kératite)"] },
      { id: "cj_allergique", diagnostic: "Conjonctivite allergique", arguments: [{ label: "démangeaisons, contexte allergique", w: 3, when: { q: "cj_allergie", eq: true } }],
        examens_a_discuter: ["Éviction, antihistaminiques / collyre antiallergique"] }
    ],
    examens_clinique: ["Acuité visuelle (toute baisse = signe d'alerte)", "Examen à la fluorescéine si doute (ulcère/kératite)", "Examen des pupilles, recherche d'un cercle périkératique (sclérite/uvéite/glaucome)", "Palpation d'une adénopathie prétragienne (oriente vers l'origine virale)"]
  },

  // -------------------------------------------------------------------------
  // ORGELET / CHALAZION
  // -------------------------------------------------------------------------
  orgelet_chalazion: {
    id: "orgelet_chalazion", symptome: "Bouton / boule de la paupière (orgelet, chalazion)", specialite: ["Ophtalmologie"], urgence: true,
    questions: [
      { id: "og_cellulite", label: "Cellulite orbitaire", type: "boolean", question: "Y a-t-il un gonflement rouge et chaud de toute la paupière / du pourtour de l'œil, avec fièvre, douleur aux mouvements de l'œil, ou vision double ?" },
      { id: "og_orgelet", label: "Orgelet", type: "boolean", question: "Avez-vous un petit bouton rouge et douloureux au bord de la paupière ?" },
      { id: "og_chalazion", label: "Chalazion", type: "boolean", question: "Avez-vous une boule indolore dans l'épaisseur de la paupière, persistante ?" }
    ],
    red_flags: [
      { id: "og_rf_cellulite", niveau: 3, when: { q: "og_cellulite", eq: true },
        message_medecin: "Cellulite orbitaire (paupière très inflammatoire, fièvre, douleur aux mouvements oculaires, diplopie) : urgence (imagerie, antibiothérapie IV).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "og_orgelet", diagnostic: "Orgelet", arguments: [{ label: "bouton rouge douloureux du bord palpébral", w: 3, when: { q: "og_orgelet", eq: true } }],
        examens_a_discuter: ["Soins locaux chauds, hygiène des paupières"] },
      { id: "og_chalazion", diagnostic: "Chalazion", arguments: [{ label: "boule indolore persistante", w: 3, when: { q: "og_chalazion", eq: true } }],
        examens_a_discuter: ["Soins locaux (compresses chaudes, massage), hygiène des paupières ; traiter une blépharite associée", "Avis si persistant (incision/curetage) ; un chalazion RÉCIDIVANT toujours au même endroit chez l'adulte doit faire envisager un carcinome sébacé (avis + examen anatomopathologique)"] },
      { id: "og_cellulite", diagnostic: "Cellulite orbitaire", arguments: [{ label: "inflammation orbitaire + fièvre", w: 3, when: { q: "og_cellulite", eq: true } }],
        examens_a_discuter: ["Urgence : imagerie (TDM), antibiothérapie IV ; distinguer la cellulite préseptale (plus bénigne) de l'orbitaire (exophtalmie, ophtalmoplégie, baisse de vision)"] }
    ],
    examens_clinique: ["Examen de la paupière (bord palpébral, blépharite) et caractère récidivant", "Mobilité oculaire, acuité visuelle", "Recherche de signes orbitaires (exophtalmie, douleur aux mouvements, fièvre)"]
  },

  // -------------------------------------------------------------------------
  // SÉCHERESSE OCULAIRE
  // -------------------------------------------------------------------------
  secheresse_oculaire: {
    id: "secheresse_oculaire", symptome: "Sécheresse oculaire / yeux irrités", specialite: ["Ophtalmologie"],
    questions: [
      { id: "so_grave", label: "Signes de gravité", type: "boolean", question: "Avez-vous une douleur importante, une baisse de vision, ou une rougeur marquée ?" },
      { id: "so_systemique", label: "Syndrome sec", type: "boolean", question: "Avez-vous aussi une bouche sèche et des douleurs articulaires ?" },
      { id: "so_typique", label: "Sécheresse banale", type: "boolean", question: "Avez-vous une sensation de sable, des yeux secs, une gêne fluctuante dans la journée ?" },
      { id: "so_medic", label: "Facteurs favorisants", type: "boolean", question: "Prenez-vous des médicaments asséchants (antihistaminiques, antidépresseurs) ou passez-vous beaucoup de temps sur écran ?" }
    ],
    red_flags: [
      { id: "so_rf_grave", niveau: 2, when: { q: "so_grave", eq: true },
        message_medecin: "Douleur / baisse de vision : ce n'est pas une simple sécheresse → avis ophtalmologique.",
        message_patient: "Ces signes nécessitent un avis ophtalmologique." },
      { id: "so_rf_systemique", niveau: 2, when: { q: "so_systemique", eq: true },
        message_medecin: "Syndrome sec (oculaire + buccal + articulaire) : évoquer un syndrome de Gougerot-Sjögren → avis.",
        message_patient: "Cette association nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "so_secheresse", diagnostic: "Sécheresse oculaire", arguments: [{ label: "sensation de sable, gêne fluctuante", w: 3, when: { q: "so_typique", eq: true } }, { label: "facteurs favorisants", w: 1, when: { q: "so_medic", eq: true } }],
        examens_a_discuter: ["Larmes artificielles (sans conservateur si usage fréquent)", "Hygiène des écrans (clignements, pauses), revue des médicaments asséchants"] },
      { id: "so_blepharite", diagnostic: "Blépharite / dysfonction des glandes de Meibomius", arguments: [{ label: "irritation chronique, bords des paupières (souvent associée à la sécheresse)", w: 2, when: { q: "so_typique", eq: true } }],
        examens_a_discuter: ["Hygiène des paupières, compresses chaudes, massage palpébral", "Cause très fréquente de sécheresse/irritation ; souvent associée à une rosacée"] },
      { id: "so_sjogren", diagnostic: "Syndrome de Gougerot-Sjögren", arguments: [{ label: "syndrome sec systémique", w: 3, when: { q: "so_systemique", eq: true } }],
        examens_a_discuter: ["Avis spécialisé, auto-anticorps (anti-SSA/SSB)"] }
    ],
    examens_clinique: ["Examen oculaire et des bords palpébraux (blépharite)", "Test de Schirmer si besoin", "Recherche d'un syndrome sec systémique et revue des médicaments asséchants"]
  },

  // -------------------------------------------------------------------------
  // CORPS ÉTRANGER OCULAIRE
  // -------------------------------------------------------------------------
  corps_etranger_oeil: {
    id: "corps_etranger_oeil", symptome: "Corps étranger dans l'œil / projection", specialite: ["Ophtalmologie"], urgence: true,
    questions: [
      { id: "co3_chimique", label: "Brûlure chimique", type: "boolean", question: "S'agit-il d'une projection de produit chimique (acide, base, ciment) ?" },
      { id: "co3_metal_vitesse", label: "Corps étranger intra-oculaire", type: "boolean", question: "Le corps étranger est-il métallique ou projeté à grande vitesse (meulage, marteau) ?" },
      { id: "co3_vision", label: "Baisse de vision / douleur", type: "boolean", question: "Y a-t-il une baisse de vision ou une douleur intense persistante ?" },
      { id: "co3_superficiel", label: "Superficiel", type: "boolean", question: "S'agit-il d'une poussière ou d'un cil sous la paupière, avec gêne mais vision conservée ?" }
    ],
    red_flags: [
      { id: "co3_rf_chimique", niveau: 3, when: { q: "co3_chimique", eq: true },
        message_medecin: "Brûlure chimique oculaire : RINÇAGE abondant immédiat (15-30 min) → urgence ophtalmologique.",
        message_patient: "Rincez abondamment à l'eau pendant 15 minutes et consultez en urgence." },
      { id: "co3_rf_intra", niveau: 3, when: { any: [{ q: "co3_metal_vitesse", eq: true }, { q: "co3_vision", eq: true }] },
        message_medecin: "Projection à grande vitesse / métallique / baisse de vision : corps étranger intra-oculaire ou plaie pénétrante → urgence (ne pas appuyer, imagerie).",
        message_patient: "Ces signes nécessitent une évaluation ophtalmologique urgente — ne frottez pas l'œil." }
    ],
    diagnostics_differentiels: [
      { id: "co3_superficiel", diagnostic: "Corps étranger superficiel", arguments: [{ label: "poussière/cil, vision conservée", w: 3, when: { q: "co3_superficiel", eq: true } }],
        examens_a_discuter: ["Éversion de la paupière, ablation", "Fluorescéine"] },
      { id: "co3_intra", diagnostic: "Corps étranger intra-oculaire / plaie pénétrante", arguments: [{ label: "projection à grande vitesse / métallique", w: 3, when: { q: "co3_metal_vitesse", eq: true } }, { label: "baisse de vision", w: 1, when: { q: "co3_vision", eq: true } }],
        examens_a_discuter: ["Urgence, imagerie (ne pas appuyer)"] },
      { id: "co3_chimique", diagnostic: "Brûlure chimique", arguments: [{ label: "projection chimique", w: 3, when: { q: "co3_chimique", eq: true } }],
        examens_a_discuter: ["Rinçage prolongé, urgence"] }
    ],
    examens_clinique: ["Acuité visuelle", "Éversion de la paupière", "Examen à la fluorescéine", "NE PAS appuyer si suspicion de plaie pénétrante"]
  },

  // -------------------------------------------------------------------------
  // TRAUMATISME DE MEMBRE
  // -------------------------------------------------------------------------
  traumatisme_membre: {
    id: "traumatisme_membre", symptome: "Traumatisme de membre (entorse, contusion, fracture)", specialite: ["Traumatologie"], urgence: true,
    questions: [
      { id: "tm_vasculonerveux", label: "Atteinte vasculo-nerveuse", type: "boolean", question: "Le membre est-il froid, pâle, sans pouls, ou y a-t-il une perte de sensibilité/mobilité en aval ?" },
      { id: "tm_deformation", label: "Déformation / impotence totale", type: "boolean", question: "Y a-t-il une déformation visible, un os déplacé, ou une impossibilité totale de bouger / de prendre appui ?" },
      { id: "tm_ouverte", label: "Fracture ouverte", type: "boolean", question: "Y a-t-il une plaie en regard de l'os ?" },
      { id: "tm_oedeme", label: "Entorse / contusion", type: "boolean", question: "Y a-t-il un gonflement et une douleur sans déformation ?" },
      { id: "tm_appui", label: "Appui possible", type: "boolean", question: "Pouvez-vous prendre appui / faire quelques pas (ou mobiliser l'articulation) ?" }
    ],
    red_flags: [
      { id: "tm_rf_grave", niveau: 3, when: { any: [{ q: "tm_vasculonerveux", eq: true }, { q: "tm_deformation", eq: true }, { q: "tm_ouverte", eq: true }] },
        message_medecin: "Déformation / fracture ouverte / atteinte vasculo-nerveuse : urgence (immobilisation, avis chirurgical).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "tm_fracture", diagnostic: "Fracture / luxation", arguments: [{ label: "déformation / impotence totale", w: 3, when: { q: "tm_deformation", eq: true } }, { label: "appui impossible", w: 1, when: { q: "tm_appui", eq: false } }],
        examens_a_discuter: ["Radiographie", "Immobilisation"] },
      { id: "tm_complique", diagnostic: "Fracture ouverte / atteinte vasculo-nerveuse", arguments: [{ label: "plaie en regard de l'os", w: 3, when: { q: "tm_ouverte", eq: true } }, { label: "atteinte vasculo-nerveuse", w: 2, when: { q: "tm_vasculonerveux", eq: true } }],
        examens_a_discuter: ["Urgence chirurgicale"] },
      { id: "tm_entorse", diagnostic: "Entorse / contusion", arguments: [{ label: "gonflement/douleur sans déformation", w: 3, when: { q: "tm_oedeme", eq: true } }, { label: "appui possible", w: 1, when: { q: "tm_appui", eq: true } }],
        examens_a_discuter: ["Critères d'Ottawa", "Repos/glace/contention, radiographie selon critères"] }
    ],
    examens_clinique: ["Recherche d'une déformation", "Pouls et sensibilité en aval", "Capacité d'appui", "Application des critères d'Ottawa, radiographie selon critères"]
  },

  // -------------------------------------------------------------------------
  // HYPOGLYCÉMIE
  // -------------------------------------------------------------------------
  hypoglycemie: {
    id: "hypoglycemie", symptome: "Hypoglycémie / malaise hypoglycémique", specialite: ["Endocrinologie"], urgence: true,
    questions: [
      { id: "hy2_neuro", label: "Neuroglucopénie", type: "boolean", question: "Y a-t-il une confusion, des troubles du comportement, des convulsions, ou une perte de connaissance ?" },
      { id: "hy2_diabete", label: "Diabétique traité", type: "boolean", question: "Êtes-vous diabétique sous insuline ou comprimés (sulfamides/glinides) ?" },
      { id: "hy2_adrenergique", label: "Signes adrénergiques", type: "boolean", question: "Avez-vous des sueurs, tremblements, palpitations, une faim brutale, soulagés en vous resucrant ?" },
      { id: "hy2_jeun", label: "Hypoglycémie organique", type: "boolean", question: "Survient-elle à jeun / à distance des repas chez une personne non diabétique ?" },
      { id: "hy2_alcool", label: "Terrain favorisant", type: "boolean", question: "Y a-t-il une consommation d'alcool, une dénutrition, ou une insuffisance hépatique/rénale ?" }
    ],
    red_flags: [
      { id: "hy2_rf_grave", niveau: 3, when: { q: "hy2_neuro", eq: true },
        message_medecin: "Hypoglycémie avec troubles neurologiques : urgence (resucrage ; glucagon ou G30 % si troubles de conscience, 15).",
        message_patient: "Ces signes nécessitent un resucrage immédiat et un appel au 15 si la personne ne réagit pas." },
      { id: "hy2_rf_sulfamide", niveau: 2, when: { q: "hy2_diabete", eq: true },
        message_medecin: "Hypoglycémie sous sulfamide/insuline : risque de récidive prolongée → surveillance, adaptation du traitement.",
        message_patient: "Une hypoglycémie sous traitement du diabète nécessite une surveillance et un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "hy2_iatrogene", diagnostic: "Hypoglycémie iatrogène (diabétique)", arguments: [{ label: "diabète traité", w: 3, when: { q: "hy2_diabete", eq: true } }, { label: "signes adrénergiques", w: 1, when: { q: "hy2_adrenergique", eq: true } }],
        examens_a_discuter: ["Glycémie capillaire, resucrage", "Réévaluer le traitement"] },
      { id: "hy2_organique", diagnostic: "Hypoglycémie organique (non diabétique)", arguments: [{ label: "à jeun / à distance des repas", w: 3, when: { q: "hy2_jeun", eq: true } }],
        examens_a_discuter: ["Confirmer la triade de Whipple", "Bilan spécialisé (insulinome…)"] },
      { id: "hy2_toxique", diagnostic: "Hypoglycémie alcoolique / dénutrition", arguments: [{ label: "alcool / dénutrition / insuffisance d'organe", w: 2, when: { q: "hy2_alcool", eq: true } }],
        examens_a_discuter: ["Resucrage, vitamine B1 si alcool"] }
    ],
    examens_clinique: ["Glycémie capillaire (confirmer)", "Resucrage", "Recherche de la cause", "Surveillance prolongée si sulfamide hypoglycémiant"]
  },

  // -------------------------------------------------------------------------
  // OBÉSITÉ / PRISE DE POIDS
  // -------------------------------------------------------------------------
  obesite: {
    id: "obesite", symptome: "Obésité / prise de poids", specialite: ["Endocrinologie", "Médecine générale"],
    questions: [
      { id: "ob_imc", label: "IMC ≥ 30", type: "boolean", question: "Votre IMC est-il supérieur ou égal à 30 ?" },
      { id: "ob_complications", label: "Complications", type: "boolean", question: "Avez-vous des complications (diabète, hypertension, apnées du sommeil, douleurs articulaires) ?" },
      { id: "ob_secondaire", label: "Cause secondaire", type: "boolean", question: "La prise de poids est-elle rapide/inexpliquée, avec des signes hormonaux (vergetures pourpres, frilosité, médicament récent) ?" },
      { id: "ob_tcaf", label: "Trouble du comportement alimentaire", type: "boolean", question: "Y a-t-il des compulsions alimentaires ou une hyperphagie ?" }
    ],
    red_flags: [
      { id: "ob_rf_secondaire", niveau: 2, when: { q: "ob_secondaire", eq: true },
        message_medecin: "Prise de poids rapide/inexpliquée + signes hormonaux : éliminer une cause secondaire (hypothyroïdie, Cushing, iatrogène).",
        message_patient: "Une prise de poids rapide et inexpliquée mérite un bilan médical." }
    ],
    diagnostics_differentiels: [
      { id: "ob_commune", diagnostic: "Obésité commune", arguments: [{ label: "IMC ≥ 30", w: 3, when: { q: "ob_imc", eq: true } }, { label: "complications", w: 1, when: { q: "ob_complications", eq: true } }],
        examens_a_discuter: ["Bilan des complications (glycémie, lipides, foie, TA)", "Prise en charge hygiéno-diététique et activité physique"] },
      { id: "ob_secondaire", diagnostic: "Obésité / prise de poids secondaire", arguments: [{ label: "signes hormonaux / iatrogène", w: 3, when: { q: "ob_secondaire", eq: true } }],
        examens_a_discuter: ["TSH, cortisol selon contexte", "Revue de l'ordonnance"] },
      { id: "ob_tca", diagnostic: "Trouble du comportement alimentaire associé", arguments: [{ label: "compulsions / hyperphagie", w: 3, when: { q: "ob_tcaf", eq: true } }],
        examens_a_discuter: ["Avis spécialisé"] }
    ],
    examens_clinique: ["IMC, tour de taille", "Pression artérielle", "Bilan des complications", "Recherche d'une cause secondaire"]
  },

  // -------------------------------------------------------------------------
  // DÉPRESSION
  // -------------------------------------------------------------------------
  depression: {
    id: "depression", symptome: "Dépression / mal-être (tristesse, burn-out)", specialite: ["Psychiatrie"], urgence: true,
    questions: [
      { id: "dp2_suicide", label: "Risque suicidaire", type: "boolean", question: "Avez-vous des idées noires, des pensées de mort, ou un projet de suicide ?" },
      { id: "dp2_melancolie", label: "Dépression sévère", type: "boolean", question: "Y a-t-il un refus de s'alimenter/de boire, une incurie, ou un état très sévère ?" },
      { id: "dp2_humeur", label: "Humeur dépressive", type: "boolean", question: "Avez-vous depuis au moins 2 semaines une tristesse et/ou une perte d'intérêt presque tous les jours ?" },
      { id: "dp2_somatique", label: "Symptômes associés", type: "boolean", question: "Avez-vous des troubles du sommeil, de l'appétit, une fatigue, des difficultés de concentration ?" },
      { id: "dp2_bipolaire", label: "Antécédent maniaque", type: "boolean", question: "Avez-vous déjà eu des périodes d'excitation, d'euphorie, de dépenses excessives, avec peu de sommeil sans fatigue ?" },
      { id: "dp2_organique", label: "Cause organique", type: "boolean", question: "Y a-t-il une cause physique possible (hypothyroïdie, médicament, après un AVC) ?" },
      { id: "dp2_plan", label: "Scénario / moyen létal", type: "boolean", question: "Avez-vous un plan précis pour passer à l'acte, ou un accès facile à un moyen (médicaments, arme) ?" },
      { id: "dp2_atcd_ts", label: "ATCD de tentative", type: "boolean", question: "Avez-vous déjà fait une tentative de suicide, ou un proche s'est-il suicidé / l'a tenté récemment ?" },
      { id: "dp2_rupture", label: "Rupture / précipitant", type: "boolean", question: "Y a-t-il eu récemment une rupture, un deuil, une humiliation, un échec, ou un isolement marqué ?" }
    ],
    red_flags: [
      { id: "dp2_rf_imminent", niveau: 3, when: { all: [{ q: "dp2_suicide", eq: true }, { q: "dp2_plan", eq: true }] },
        message_medecin: "Idées suicidaires AVEC scénario et/ou accès à un moyen létal : danger imminent → avis psychiatrique en urgence, NE PAS laisser seul, retirer les moyens, hospitalisation à organiser.",
        message_patient: "C'est une urgence : restez accompagné et appelez le 15 ou le 3114 (numéro national prévention suicide, 24h/24)." },
      { id: "dp2_rf_suicide", niveau: 3, when: { q: "dp2_suicide", eq: true },
        message_medecin: "Idées suicidaires : évaluation structurée du risque/urgence/dangerosité (RUD ; mnémo AERO-MINI). Rechercher ATCD de TS (récidive ~40 %, dont la moitié dans l'année ; risque relatif × 20), accès aux moyens, intentionnalité. Avis psychiatrique urgent si élevé, ne pas laisser seul.",
        message_patient: "Si vous avez des idées noires, parlez-en immédiatement à un médecin ou appelez le 3114." },
      { id: "dp2_rf_atcd", niveau: 2, when: { q: "dp2_atcd_ts", eq: true },
        message_medecin: "Antécédent de tentative de suicide (personnel ou proche récent) : facteur de risque majeur de récidive (RR ≈ 20 ; contagion possible) → renforcer le suivi et l'évaluation du risque même si l'humeur semble s'améliorer.",
        message_patient: "Un antécédent de tentative justifie un suivi rapproché ; n'hésitez pas à reconsulter." },
      { id: "dp2_rf_melancolie", niveau: 2, when: { q: "dp2_melancolie", eq: true },
        message_medecin: "Dépression sévère / mélancolique (refus alimentaire, incurie) : avis psychiatrique rapide (hospitalisation à discuter).",
        message_patient: "Cet état nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "dp2_edc", diagnostic: "Épisode dépressif caractérisé", arguments: [{ label: "humeur dépressive / anhédonie > 2 sem", w: 3, when: { q: "dp2_humeur", eq: true } }, { label: "symptômes associés", w: 1, when: { q: "dp2_somatique", eq: true } }],
        examens_a_discuter: ["Évaluation, psychothérapie ± antidépresseur, suivi"] },
      { id: "dp2_bipolaire", diagnostic: "Trouble bipolaire (épisode dépressif)", arguments: [{ label: "antécédent d'épisode maniaque", w: 3, when: { q: "dp2_bipolaire", eq: true } }],
        examens_a_discuter: ["Avis psychiatrique (prudence avec les antidépresseurs seuls)"] },
      { id: "dp2_organique", diagnostic: "Dépression secondaire / organique", arguments: [{ label: "cause organique possible", w: 2, when: { q: "dp2_organique", eq: true } }],
        examens_a_discuter: ["TSH, revue des médicaments"] },
      { id: "dp2_crise", diagnostic: "Crise suicidaire (urgence à évaluer)", arguments: [{ label: "idées suicidaires", w: 2, when: { q: "dp2_suicide", eq: true } }, { label: "scénario / accès à un moyen", w: 2, when: { q: "dp2_plan", eq: true } }, { label: "ATCD de TS / proche", w: 1, when: { q: "dp2_atcd_ts", eq: true } }, { label: "rupture / précipitant récent", w: 1, when: { q: "dp2_rupture", eq: true } }],
        examens_a_discuter: ["Évaluation RUD (Risque/Urgence/Dangerosité)", "Avis psychiatrique ; hospitalisation si risque imminent ; retrait des moyens", "Numéro national 3114 (24h/24)"] }
    ],
    examens_clinique: ["Évaluation structurée du risque suicidaire — RUD ; mnémo AERO-MINI : Antécédents (perso/familiaux), Enfance/maltraitance, Ruptures/précipitants, Optimisme/facteurs protecteurs — Moyens létaux, Impulsivité, Niveau de souffrance, Intentionnalité", "Chez l'adolescent : rechercher des « équivalents suicidaires » (automutilations, conduites à risque, addictions qui s'aggravent rapidement)", "Recherche d'antécédents de virage maniaque", "Élimination d'une cause organique (TSH)"]
  },

  // -------------------------------------------------------------------------
  // TROUBLE DU COMPORTEMENT ALIMENTAIRE
  // -------------------------------------------------------------------------
  trouble_alimentaire: {
    id: "trouble_alimentaire", symptome: "Trouble du comportement alimentaire", specialite: ["Psychiatrie", "Nutrition"], urgence: true,
    questions: [
      { id: "ta2_gravite", label: "Signes de gravité", type: "boolean", question: "Y a-t-il des signes de gravité : malaises, cœur lent, IMC très bas, troubles ioniques connus, ou refus total de s'alimenter ?" },
      { id: "ta2_restriction", label: "Anorexie", type: "boolean", question: "Y a-t-il une restriction alimentaire avec un poids très bas / un amaigrissement important et une peur de grossir ?" },
      { id: "ta2_crises", label: "Boulimie / hyperphagie", type: "boolean", question: "Y a-t-il des crises de boulimie avec vomissements provoqués/laxatifs, ou des accès d'hyperphagie ?" },
      { id: "ta2_amenorrhee", label: "Retentissement", type: "boolean", question: "Y a-t-il une aménorrhée, une fatigue, ou des malaises ?" },
      { id: "ta2_organique", label: "Cause organique ?", type: "boolean", question: "L'amaigrissement s'accompagne-t-il de signes évoquant une maladie (fièvre, diarrhée, soif/urines abondantes, accélération du cœur, ganglions) SANS peur de grossir ni image du corps perturbée ?" }
    ],
    red_flags: [
      { id: "ta2_rf_grave", niveau: 3, when: { q: "ta2_gravite", eq: true },
        message_medecin: "Signes de gravité d'un TCA (IMC très bas/< 14, bradycardie < 40, hypokaliémie, hypotension/hypothermie, malaises, refus alimentaire, vomissements incoercibles) : urgence (risque vital) → avis spécialisé / hospitalisation. À la renutrition : prévenir le SYNDROME DE RENUTRITION INAPPROPRIÉE (hypophosphatémie) — réintroduction progressive, supplémentation phosphore/vitamines, surveillance ionique.",
        message_patient: "Ces signes nécessitent une évaluation médicale rapide." }
    ],
    diagnostics_differentiels: [
      { id: "ta2_anorexie", diagnostic: "Anorexie mentale", arguments: [{ label: "restriction + poids bas + peur de grossir", w: 3, when: { q: "ta2_restriction", eq: true } }, { label: "aménorrhée / retentissement", w: 1, when: { q: "ta2_amenorrhee", eq: true } }],
        examens_a_discuter: ["Repérage : questionnaire SCOFF (≥ 2 « oui » évocateur)", "Poids/IMC, courbe de poids, ionogramme (dont phosphore), ECG (QT, bradycardie), bilan nutritionnel", "Prise en charge pluridisciplinaire (somatique + psychiatrique + nutritionnelle) ; surveillance de la renutrition"] },
      { id: "ta2_boulimie", diagnostic: "Boulimie / hyperphagie boulimique", arguments: [{ label: "crises + comportements compensatoires", w: 3, when: { q: "ta2_crises", eq: true } }],
        examens_a_discuter: ["Ionogramme (hypokaliémie des vomissements → risque de troubles du rythme)", "Signes de purge : érosions dentaires, hypertrophie parotidienne, signe de Russell (callosités des doigts)", "TCC, prise en charge nutritionnelle et psychiatrique"] },
      { id: "ta2_organique", diagnostic: "Amaigrissement d'origine organique (à éliminer)", arguments: [{ label: "signes organiques sans distorsion de l'image du corps", w: 3, when: { q: "ta2_organique", eq: true } }],
        examens_a_discuter: ["Selon le contexte : hyperthyroïdie (TSH), diabète (glycémie), maladie cœliaque, MICI, cancer, infection (VIH, tuberculose)", "NFS, VS/CRP, bilan selon orientation"] }
    ],
    examens_clinique: ["Poids / IMC, courbe de poids, taille (enfant/ado)", "Fréquence cardiaque, pression artérielle, température (bradycardie/hypotension/hypothermie)", "Ionogramme dont phosphore et potassium (vomissements ; renutrition)", "ECG (QT, bradycardie)", "Évaluation psychiatrique et de l'image du corps (vs cause organique)"]
  },

  // -------------------------------------------------------------------------
  // CONDUITE ADDICTIVE
  // -------------------------------------------------------------------------
  conduite_addictive: {
    id: "conduite_addictive", symptome: "Addiction / conduite addictive (tabac, cannabis, alcool)", specialite: ["Addictologie"], urgence: true,
    questions: [
      { id: "ca_sevrage_alcool", label: "Sevrage alcoolique compliqué", type: "boolean", question: "S'agit-il d'un sevrage d'alcool avec tremblements importants, confusion ou convulsions ?" },
      { id: "ca_psy", label: "Souffrance psychique", type: "boolean", question: "Y a-t-il une souffrance psychique, des idées noires, ou un autre trouble psychiatrique associé ?" },
      { id: "ca_retentissement", label: "Retentissement / dépendance", type: "boolean", question: "Y a-t-il une perte de contrôle, un besoin irrépressible (craving), ou un retentissement (santé, travail, famille) ?" },
      { id: "ca_demande", label: "Demande d'aide", type: "boolean", question: "Êtes-vous demandeur d'aide pour réduire ou arrêter ?" },
      { id: "ca_overdose", label: "Intoxication aiguë", type: "boolean", question: "Y a-t-il actuellement une somnolence profonde, une respiration lente, des pupilles en pointe (opioïdes), ou un coma / des difficultés à réveiller la personne ?" },
      { id: "ca_injection", label: "Usage injectable / à risque", type: "boolean", question: "Y a-t-il un usage par injection, ou des conduites à risque (partage de matériel, rapports non protégés) ?" }
    ],
    red_flags: [
      { id: "ca_rf_overdose", niveau: 3, when: { q: "ca_overdose", eq: true },
        message_medecin: "Intoxication aiguë / overdose (dépression respiratoire, coma, myosis serré = opioïdes) : URGENCE vitale → 15, libération des voies aériennes, naloxone si opioïdes ; coma éthylique = surveillance, position latérale de sécurité.",
        message_patient: "C'est une urgence vitale : appelez le 15 immédiatement et mettez la personne sur le côté." },
      { id: "ca_rf_sevrage", niveau: 3, when: { q: "ca_sevrage_alcool", eq: true },
        message_medecin: "Sevrage alcoolique compliqué (delirium tremens, convulsions) : urgence (voir fiche sevrage alcoolique).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ca_rf_psy", niveau: 2, when: { q: "ca_psy", eq: true },
        message_medecin: "Souffrance psychique / idées noires associées : évaluer le risque suicidaire, avis (les addictions augmentent le risque suicidaire).",
        message_patient: "Si vous avez des idées noires, parlez-en à un médecin (ou appelez le 3114)." }
    ],
    diagnostics_differentiels: [
      { id: "ca_addiction", diagnostic: "Conduite addictive (tabac / cannabis / alcool / autres)", arguments: [{ label: "retentissement / dépendance", w: 2, when: { q: "ca_retentissement", eq: true } }, { label: "demande d'aide", w: 1, when: { q: "ca_demande", eq: true } }],
        examens_a_discuter: ["Repérage (AUDIT/AUDIT-C alcool, Fagerström tabac, CAST cannabis), évaluer la poly-consommation", "Intervention brève / entretien motivationnel ; accompagnement, substituts nicotiniques, orientation addictologie (CSAPA)"] },
      { id: "ca_risque_infx", diagnostic: "Complications infectieuses de l'usage à risque", arguments: [{ label: "usage injectable / conduites à risque", w: 2, when: { q: "ca_injection", eq: true } }],
        examens_a_discuter: ["Dépistage VIH, VHC, VHB ; vaccination VHB ; matériel de réduction des risques", "Rechercher abcès/endocardite au point d'injection"] },
      { id: "ca_sevrage", diagnostic: "Sevrage alcoolique", arguments: [{ label: "signes de sevrage", w: 3, when: { q: "ca_sevrage_alcool", eq: true } }],
        examens_a_discuter: ["Voir fiche sevrage alcoolique (vitamine B1, benzodiazépines)"] }
    ],
    examens_clinique: ["Repérage du niveau de consommation et de la dépendance (questionnaires validés)", "Évaluation du retentissement et des comorbidités psychiatriques (dont risque suicidaire)", "Si usage à risque : proposer un dépistage VIH/VHC/VHB", "Orientation vers une prise en charge addictologique (CSAPA, consultation dédiée)"]
  },

  // -------------------------------------------------------------------------
  // AGITATION AIGUË
  // -------------------------------------------------------------------------
  agitation: {
    id: "agitation", symptome: "Agitation aiguë / trouble du comportement", specialite: ["Psychiatrie", "Urgences"], urgence: true,
    questions: [
      { id: "ag2_organique", label: "Cause organique", type: "boolean", question: "Y a-t-il une cause physique possible : fièvre, confusion, diabète, intoxication, traumatisme crânien, ou personne âgée ?" },
      { id: "ag2_danger", label: "Danger", type: "boolean", question: "La personne est-elle dangereuse pour elle-même ou autrui, ou a-t-elle des idées suicidaires ?" },
      { id: "ag2_delire", label: "Trouble psychiatrique aigu", type: "boolean", question: "Y a-t-il des hallucinations, un délire, ou une bouffée délirante aiguë ?" },
      { id: "ag2_substance", label: "Toxiques / sevrage", type: "boolean", question: "Y a-t-il une prise de toxiques, ou un sevrage (alcool, drogues) ?" }
    ],
    red_flags: [
      { id: "ag2_rf_organique", niveau: 3, when: { q: "ag2_organique", eq: true },
        message_medecin: "Agitation avec cause organique possible (confusion fébrile, hypoglycémie, intoxication, post-traumatique) : urgence — éliminer l'organique AVANT le psychiatrique (glycémie, constantes).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ag2_rf_danger", niveau: 3, when: { q: "ag2_danger", eq: true },
        message_medecin: "Danger pour soi / autrui : urgence (mise en sécurité, avis psychiatrique, cadre légal si besoin).",
        message_patient: "Cette situation nécessite une intervention immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "ag2_organique", diagnostic: "Cause organique (confusion)", arguments: [{ label: "contexte organique", w: 3, when: { q: "ag2_organique", eq: true } }],
        examens_a_discuter: ["Glycémie, constantes, bilan (voir fiche confusion)"] },
      { id: "ag2_psychiatrique", diagnostic: "Trouble psychiatrique aigu (bouffée délirante, manie)", arguments: [{ label: "délire / hallucinations", w: 3, when: { q: "ag2_delire", eq: true } }],
        examens_a_discuter: ["Avis psychiatrique"] },
      { id: "ag2_substance", diagnostic: "Intoxication / sevrage", arguments: [{ label: "toxiques / sevrage", w: 3, when: { q: "ag2_substance", eq: true } }],
        examens_a_discuter: ["Recherche de toxiques, contexte"] }
    ],
    examens_clinique: ["Sécuriser la personne et l'entourage", "Glycémie capillaire", "Constantes (température, SpO2, TA)", "Examen neurologique, recherche de toxiques"]
  },

  // -------------------------------------------------------------------------
  // CHUTE DE LA PERSONNE ÂGÉE
  // -------------------------------------------------------------------------
  chute_personne_agee: {
    id: "chute_personne_agee", symptome: "Chute de la personne âgée", specialite: ["Gériatrie"], urgence: true,
    questions: [
      { id: "ch_gravite", label: "Traumatisme grave", type: "boolean", question: "Y a-t-il un traumatisme grave (tête, hanche, impossibilité de se relever, plaie importante), ou une prise d'anticoagulants ?" },
      { id: "ch_malaise", label: "Malaise / PC", type: "boolean", question: "La chute a-t-elle été précédée d'un malaise, d'une perte de connaissance, ou de palpitations ?" },
      { id: "ch_temps_sol", label: "Séjour au sol", type: "boolean", question: "La personne est-elle restée longtemps au sol (plus d'une heure) ?" },
      { id: "ch_iatrogene", label: "Polymédication", type: "boolean", question: "Prend-elle des médicaments (somnifères, traitements de la tension, plusieurs médicaments) ?" },
      { id: "ch_repetition", label: "Chutes répétées", type: "boolean", question: "Les chutes sont-elles répétées ?" }
    ],
    red_flags: [
      { id: "ch_rf_trauma", niveau: 2, when: { q: "ch_gravite", eq: true },
        message_medecin: "Traumatisme grave / anticoagulants : rechercher une fracture (col du fémur), un hématome (TDM cérébrale si choc à la tête sous anticoagulant).",
        message_patient: "Ces signes nécessitent une évaluation médicale rapide." },
      { id: "ch_rf_syncope", niveau: 2, when: { q: "ch_malaise", eq: true },
        message_medecin: "Chute avec malaise / PC : éliminer une cause cardiaque ou neurologique (ECG ; voir fiche malaise).",
        message_patient: "Une chute précédée d'un malaise nécessite un avis médical." },
      { id: "ch_rf_sol", niveau: 2, when: { q: "ch_temps_sol", eq: true },
        message_medecin: "Séjour prolongé au sol : rechercher une rhabdomyolyse, une déshydratation, une hypothermie.",
        message_patient: "Un séjour prolongé au sol nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ch_mecanique", diagnostic: "Chute mécanique / multifactorielle", arguments: [{ label: "chutes répétées", w: 2, when: { q: "ch_repetition", eq: true } }, { label: "polymédication", w: 2, when: { q: "ch_iatrogene", eq: true } }],
        examens_a_discuter: ["Évaluation des facteurs de risque (vue, équilibre, environnement, médicaments)", "Prévention des chutes"] },
      { id: "ch_syncope", diagnostic: "Cause cardiaque / neurologique (malaise)", arguments: [{ label: "malaise / perte de connaissance", w: 3, when: { q: "ch_malaise", eq: true } }],
        examens_a_discuter: ["ECG (voir fiche malaise / perte de connaissance)"] },
      { id: "ch_trauma", diagnostic: "Complication traumatique", arguments: [{ label: "traumatisme grave", w: 3, when: { q: "ch_gravite", eq: true } }],
        examens_a_discuter: ["Imagerie (hanche, crâne si anticoagulant)"] }
    ],
    examens_clinique: ["Recherche d'une fracture (raccourcissement/rotation du membre = col du fémur)", "Examen neurologique", "TA couché/debout, ECG", "Revue de l'ordonnance", "Évaluation de l'équilibre et de la marche"]
  },

  // -------------------------------------------------------------------------
  // PARESTHÉSIES / FOURMILLEMENTS
  // -------------------------------------------------------------------------
  paresthesies: {
    id: "paresthesies", symptome: "Fourmillements / engourdissements (paresthésies)", specialite: ["Neurologie"], urgence: true,
    questions: [
      { id: "pe_brutal", label: "Installation brutale", type: "boolean", question: "Sont-elles apparues brutalement, d'un seul côté, avec une faiblesse ou des troubles de la parole ?" },
      { id: "pe_medullaire", label: "Atteinte médullaire", type: "boolean", question: "Y a-t-il un niveau (à partir d'une zone du corps), des troubles pour uriner, ou une faiblesse des deux jambes ?" },
      { id: "pe_distribution", label: "Distribution", type: "single_choice", question: "Où ressentez-vous les fourmillements ?",
        options: ["Aux extrémités des 4 membres (gants / chaussettes)", "Dans un trajet précis (un nerf)", "D'un seul côté du corps"] },
      { id: "pe_diabete", label: "Polyneuropathie", type: "boolean", question: "Êtes-vous diabétique, ou avez-vous une consommation d'alcool importante ?" },
      { id: "pe_canal", label: "Canal carpien", type: "boolean", question: "Est-ce surtout les 3 premiers doigts, la nuit ?" }
    ],
    red_flags: [
      { id: "pe_rf_avc", niveau: 3, when: { any: [{ q: "pe_brutal", eq: true }, { q: "pe_distribution", eq: "D'un seul côté du corps" }] },
        message_medecin: "Paresthésies brutales unilatérales (± déficit) : AVC / AIT à éliminer → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "pe_rf_medullaire", niveau: 3, when: { q: "pe_medullaire", eq: true },
        message_medecin: "Niveau sensitif / troubles sphinctériens / paraparésie : compression médullaire ou Guillain-Barré → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "pe_avc", diagnostic: "AVC / AIT", arguments: [{ label: "installation brutale", w: 3, when: { q: "pe_brutal", eq: true } }],
        examens_a_discuter: ["Imagerie cérébrale en urgence"] },
      { id: "pe_polyneuropathie", diagnostic: "Polyneuropathie (diabète, alcool)", arguments: [{ label: "atteinte des 4 membres (gants/chaussettes)", w: 3, when: { q: "pe_distribution", eq: "Aux extrémités des 4 membres (gants / chaussettes)" } }, { label: "diabète / alcool", w: 2, when: { q: "pe_diabete", eq: true } }],
        examens_a_discuter: ["Glycémie / HbA1c, bilan", "Avis si besoin"] },
      { id: "pe_canal", diagnostic: "Syndrome canalaire (canal carpien)", arguments: [{ label: "3 premiers doigts la nuit", w: 3, when: { q: "pe_canal", eq: true } }, { label: "trajet d'un nerf", w: 1, when: { q: "pe_distribution", eq: "Dans un trajet précis (un nerf)" } }],
        examens_a_discuter: ["EMG"] },
      { id: "pe_medullaire", diagnostic: "Cause médullaire / radiculaire", arguments: [{ label: "niveau sensitif / atteinte des 2 jambes", w: 3, when: { q: "pe_medullaire", eq: true } }],
        examens_a_discuter: ["IRM médullaire"] }
    ],
    examens_clinique: ["Examen neurologique (sensibilité, force, réflexes)", "Recherche d'un niveau sensitif", "Glycémie", "Manœuvres de Tinel / Phalen"]
  },

  // -------------------------------------------------------------------------
  // TREMBLEMENTS
  // -------------------------------------------------------------------------
  tremblements: {
    id: "tremblements", symptome: "Tremblements", specialite: ["Neurologie"],
    questions: [
      { id: "tr_repos", label: "Tremblement de repos (Parkinson)", type: "boolean", question: "Le tremblement est-il présent au repos, d'un côté, avec une lenteur ou une raideur ?" },
      { id: "tr_action", label: "Tremblement d'action (essentiel)", type: "boolean", question: "Apparaît-il quand vous tendez les mains ou agissez (boire, écrire), souvent familial, amélioré par l'alcool ?" },
      { id: "tr_thyroide", label: "Hyperthyroïdie", type: "boolean", question: "Avez-vous un amaigrissement, un cœur rapide, une intolérance à la chaleur ?" },
      { id: "tr_substance", label: "Substance / iatrogène", type: "boolean", question: "Y a-t-il une prise de café/excitants, un sevrage (alcool), ou un médicament récent ?" },
      { id: "tr_aigu", label: "Aigu + signes neuro", type: "boolean", question: "Est-ce apparu brutalement avec d'autres signes neurologiques ?" }
    ],
    red_flags: [
      { id: "tr_rf_aigu", niveau: 2, when: { q: "tr_aigu", eq: true },
        message_medecin: "Tremblement aigu + signes neurologiques : avis (cause centrale, sevrage sévère).",
        message_patient: "Un tremblement d'apparition brutale avec d'autres signes nécessite un avis médical." },
      { id: "tr_rf_thyroide", niveau: 2, when: { q: "tr_thyroide", eq: true },
        message_medecin: "Signes d'hyperthyroïdie : doser la TSH.",
        message_patient: "Ces signes nécessitent un bilan thyroïdien." }
    ],
    diagnostics_differentiels: [
      { id: "tr_essentiel", diagnostic: "Tremblement essentiel", arguments: [{ label: "tremblement d'action", w: 3, when: { q: "tr_action", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique, traitement si gênant"] },
      { id: "tr_parkinson", diagnostic: "Maladie de Parkinson", arguments: [{ label: "tremblement de repos + lenteur/raideur", w: 3, when: { q: "tr_repos", eq: true } }],
        examens_a_discuter: ["Avis neurologique"] },
      { id: "tr_secondaire", diagnostic: "Tremblement métabolique / iatrogène", arguments: [{ label: "signes d'hyperthyroïdie", w: 2, when: { q: "tr_thyroide", eq: true } }, { label: "substance / médicament", w: 2, when: { q: "tr_substance", eq: true } }],
        examens_a_discuter: ["TSH, revue des médicaments"] }
    ],
    examens_clinique: ["Caractériser (repos / action / intention)", "Recherche d'une rigidité, d'une akinésie", "Signes thyroïdiens", "Revue des médicaments"]
  },

  // -------------------------------------------------------------------------
  // TROUBLES DE LA MÉMOIRE
  // -------------------------------------------------------------------------
  troubles_memoire: {
    id: "troubles_memoire", symptome: "Troubles de la mémoire", specialite: ["Neurologie", "Gériatrie"], urgence: true,
    questions: [
      { id: "me2_brutal", label: "Brutal / signes neuro (AVC)", type: "boolean", question: "Les troubles sont-ils apparus brutalement, ou avec d'autres signes neurologiques (parole, force) ?" },
      { id: "me2_confusion", label: "Confusion aiguë", type: "boolean", question: "Y a-t-il une confusion récente, fluctuante, avec désorientation (et non un trouble installé lentement) ?" },
      { id: "me2_progressif", label: "Syndrome démentiel", type: "boolean", question: "Les troubles s'installent-ils progressivement, avec un retentissement sur l'autonomie ?" },
      { id: "me2_depression", label: "Dépression", type: "boolean", question: "Y a-t-il une tristesse, un ralentissement, avec une plainte de mémoire au premier plan ?" },
      { id: "me2_curable", label: "Cause curable", type: "boolean", question: "Y a-t-il une cause potentiellement réversible : hypothyroïdie, carence en B12, médicaments, alcool ?" }
    ],
    red_flags: [
      { id: "me2_rf_avc", niveau: 3, when: { q: "me2_brutal", eq: true },
        message_medecin: "Trouble cognitif brutal / signes neurologiques : AVC → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "me2_rf_confusion", niveau: 2, when: { q: "me2_confusion", eq: true },
        message_medecin: "Confusion récente fluctuante : syndrome confusionnel (organique) à explorer (voir fiche confusion).",
        message_patient: "Une confusion récente nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "me2_demence", diagnostic: "Syndrome démentiel (Alzheimer…)", arguments: [{ label: "installation progressive + perte d'autonomie", w: 3, when: { q: "me2_progressif", eq: true } }],
        examens_a_discuter: ["Évaluation cognitive (MMSE)", "Bilan (TSH, B12, imagerie cérébrale), consultation mémoire"] },
      { id: "me2_confusion", diagnostic: "Confusion aiguë", arguments: [{ label: "confusion fluctuante récente", w: 3, when: { q: "me2_confusion", eq: true } }],
        examens_a_discuter: ["Bilan étiologique (voir fiche confusion)"] },
      { id: "me2_depression", diagnostic: "Dépression (pseudo-démence)", arguments: [{ label: "contexte dépressif", w: 3, when: { q: "me2_depression", eq: true } }],
        examens_a_discuter: ["Évaluation thymique"] },
      { id: "me2_curable", diagnostic: "Cause curable", arguments: [{ label: "hypothyroïdie / carence / iatrogène", w: 3, when: { q: "me2_curable", eq: true } }],
        examens_a_discuter: ["TSH, B12/folates, revue des médicaments"] }
    ],
    examens_clinique: ["Évaluation cognitive (MMSE, test de l'horloge)", "Bilan biologique (TSH, B12, calcémie)", "Imagerie cérébrale", "Recherche d'une dépression"]
  },

  // -------------------------------------------------------------------------
  // PNEUMONIE / BRONCHITE
  // -------------------------------------------------------------------------
  pneumonie: {
    id: "pneumonie", symptome: "Pneumonie / bronchite (toux fébrile)", specialite: ["Pneumologie", "Infectiologie"], urgence: true,
    questions: [
      { id: "pn2_gravite", label: "Signes de gravité", type: "boolean", question: "Avez-vous une difficulté à respirer marquée, une confusion, une tension basse, ou des lèvres bleues ?" },
      { id: "pn2_foyer", label: "Foyer pulmonaire", type: "boolean", question: "Avez-vous une fièvre avec toux, crachats, et une douleur thoracique ?" },
      { id: "pn2_dyspnee", label: "Dyspnée", type: "boolean", question: "Êtes-vous essoufflé ?" },
      { id: "pn2_terrain", label: "Terrain à risque", type: "boolean", question: "Êtes-vous âgé, BPCO, immunodéprimé, ou avez-vous des comorbidités importantes ?" },
      { id: "pn2_viral", label: "Bronchite virale", type: "boolean", question: "S'agit-il plutôt d'une toux avec courbatures dans un contexte épidémique, sans foyer ?" }
    ],
    red_flags: [
      { id: "pn2_rf_grave", niveau: 3, when: { q: "pn2_gravite", eq: true },
        message_medecin: "Signes de gravité (détresse respiratoire, confusion, hypotension) : pneumonie grave / sepsis → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "pn2_rf_terrain", niveau: 2, when: { q: "pn2_terrain", eq: true },
        message_medecin: "Pneumonie sur terrain à risque : évaluer une hospitalisation (score CRB65).",
        message_patient: "Ce contexte nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "pn2_pneumonie", diagnostic: "Pneumonie", arguments: [{ label: "fièvre + foyer + douleur", w: 3, when: { q: "pn2_foyer", eq: true } }, { label: "dyspnée", w: 1, when: { q: "pn2_dyspnee", eq: true } }],
        examens_a_discuter: ["Auscultation, radiographie thoracique, CRP", "Antibiothérapie"] },
      { id: "pn2_bronchite", diagnostic: "Bronchite aiguë virale", arguments: [{ label: "contexte viral sans foyer", w: 3, when: { q: "pn2_viral", eq: true } }],
        examens_a_discuter: ["Traitement symptomatique (pas d'antibiotique)"] },
      { id: "pn2_grave", diagnostic: "Pneumonie grave", arguments: [{ label: "signes de gravité", w: 3, when: { q: "pn2_gravite", eq: true } }, { label: "terrain à risque", w: 1, when: { q: "pn2_terrain", eq: true } }],
        examens_a_discuter: ["Hospitalisation (CRB65)"] }
    ],
    examens_clinique: ["SpO2, fréquence respiratoire", "Auscultation pulmonaire (foyer)", "Pression artérielle, conscience", "Score CRB65"]
  },

  // -------------------------------------------------------------------------
  // SYNDROME GRIPPAL (grippe / COVID)
  // -------------------------------------------------------------------------
  syndrome_grippal: {
    id: "syndrome_grippal", symptome: "Syndrome grippal (grippe / COVID)", specialite: ["Infectiologie"], urgence: true,
    questions: [
      { id: "sg_gravite", label: "Signes de gravité", type: "boolean", question: "Avez-vous une gêne respiratoire, une douleur thoracique, ou une confusion ?" },
      { id: "sg_terrain", label: "Terrain à risque", type: "boolean", question: "Êtes-vous à risque (âgé, femme enceinte, BPCO, immunodéprimé, nourrisson) ?" },
      { id: "sg_typique", label: "Tableau typique", type: "boolean", question: "Avez-vous fièvre, courbatures, maux de tête et fatigue, dans un contexte épidémique ?" },
      { id: "sg_prolonge", label: "Surinfection", type: "boolean", question: "Les symptômes durent-ils plus de 7 jours ou s'aggravent-ils ?" }
    ],
    red_flags: [
      { id: "sg_rf_grave", niveau: 3, when: { q: "sg_gravite", eq: true },
        message_medecin: "Signes de gravité respiratoire / neurologique : grippe ou COVID compliqué → urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "sg_rf_terrain", niveau: 2, when: { q: "sg_terrain", eq: true },
        message_medecin: "Terrain à risque : surveillance, traitement antiviral à discuter, isolement.",
        message_patient: "Ce contexte nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "sg_grippal", diagnostic: "Syndrome grippal (grippe / COVID)", arguments: [{ label: "tableau typique épidémique", w: 3, when: { q: "sg_typique", eq: true } }],
        examens_a_discuter: ["Traitement symptomatique, isolement, hydratation ; test antigénique/PCR selon le contexte", "Antiviral (oseltamivir) précoce si terrain à risque/forme grave ; prévention par la vaccination annuelle des sujets à risque"] },
      { id: "sg_surinfection", diagnostic: "Surinfection bactérienne (pneumonie post-grippale)", arguments: [{ label: "aggravation ou reprise de la fièvre après amélioration (évolution biphasique)", w: 3, when: { q: "sg_prolonge", eq: true } }],
        examens_a_discuter: ["Reprise fébrile / foyer auscultatoire après une amélioration = pneumonie bactérienne (pneumocoque, S. aureus) → radiographie, antibiothérapie", "CRP selon le contexte"] },
      { id: "sg_complique", diagnostic: "Forme grave / décompensation", arguments: [{ label: "signes de gravité", w: 3, when: { q: "sg_gravite", eq: true } }, { label: "terrain à risque", w: 1, when: { q: "sg_terrain", eq: true } }],
        examens_a_discuter: ["Radiographie thoracique, gaz du sang/SpO2 ; rechercher une décompensation de comorbidité (BPCO, insuffisance cardiaque, diabète)"] }
    ],
    examens_clinique: ["SpO2", "Auscultation pulmonaire (foyer = surinfection)", "Température (évolution biphasique ?)", "Recherche de signes de gravité et de décompensation d'une maladie chronique"]
  },

  // -------------------------------------------------------------------------
  // APNÉE DU SOMMEIL
  // -------------------------------------------------------------------------
  apnee_sommeil: {
    id: "apnee_sommeil", symptome: "Apnée du sommeil (ronflements, somnolence)", specialite: ["Pneumologie", "ORL"],
    questions: [
      { id: "as2_triade", label: "Triade évocatrice", type: "boolean", question: "Ronflez-vous fort, avec des pauses respiratoires constatées et une somnolence excessive en journée ?" },
      { id: "as2_somnolence_danger", label: "Somnolence dangereuse", type: "boolean", question: "La somnolence est-elle dangereuse (endormissements au volant, accidents évités de justesse) ?" },
      { id: "as2_comorbid", label: "Comorbidités", type: "boolean", question: "Avez-vous une HTA résistante, un diabète, ou une maladie cardiaque ?" },
      { id: "as2_morpho", label: "Morphologie", type: "boolean", question: "Êtes-vous en surpoids, avec un cou large ?" },
      { id: "as2_nocturnes", label: "Signes nocturnes/matinaux", type: "boolean", question: "Avez-vous un sommeil non réparateur, des réveils en sursaut/étouffement, des levers pour uriner la nuit, ou des maux de tête au réveil ?" },
      { id: "as2_conducteur", label: "Conducteur professionnel", type: "boolean", question: "Conduisez-vous pour votre travail (poids lourd, transport, VTC) ou utilisez-vous des machines dangereuses ?" },
      { id: "as2_autre_cause", label: "Autre cause de somnolence", type: "boolean", question: "Votre somnolence peut-elle s'expliquer autrement (manque de sommeil, travail de nuit, dépression, médicaments sédatifs, alcool) ?" }
    ],
    red_flags: [
      { id: "as2_rf_danger", niveau: 2, when: { q: "as2_somnolence_danger", eq: true },
        message_medecin: "Somnolence dangereuse (conduite) : conseils de prévention, dépistage rapide, éviter la conduite.",
        message_patient: "Une somnolence dangereuse au volant nécessite un avis médical rapide ; évitez de conduire." },
      { id: "as2_rf_conducteur", niveau: 2, when: { all: [{ q: "as2_conducteur", eq: true }, { any: [{ q: "as2_triade", eq: true }, { q: "as2_somnolence_danger", eq: true }] }] },
        message_medecin: "SAOS suspecté chez un conducteur professionnel : enjeu d'aptitude (arrêté permis de conduire) — orienter vers un diagnostic et un traitement avant reprise de la conduite professionnelle.",
        message_patient: "Pour les conducteurs professionnels, une somnolence avec ronflements doit être évaluée avant de reprendre le volant." }
    ],
    diagnostics_differentiels: [
      { id: "as2_saos", diagnostic: "Syndrome d'apnées obstructives du sommeil", arguments: [{ label: "ronflements + pauses + somnolence", w: 3, when: { q: "as2_triade", eq: true } }, { label: "signes nocturnes/matinaux", w: 1, when: { q: "as2_nocturnes", eq: true } }, { label: "morphologie", w: 1, when: { q: "as2_morpho", eq: true } }, { label: "comorbidités CV", w: 1, when: { q: "as2_comorbid", eq: true } }],
        examens_a_discuter: ["Échelle d'Epworth, questionnaire STOP-BANG", "Polygraphie ventilatoire nocturne / polysomnographie (IAH)", "PPC (CPAP) en 1re intention si SAOS sévère ; orthèse d'avancée mandibulaire / mesures (perte de poids, alcool, position) selon les cas"] },
      { id: "as2_central", diagnostic: "Apnées centrales (non obstructives)", arguments: [{ label: "comorbidité cardiaque (insuffisance cardiaque)", w: 1, when: { q: "as2_comorbid", eq: true } }],
        examens_a_discuter: ["Évoquer si insuffisance cardiaque, AVC, opioïdes (respiration de Cheyne-Stokes)", "Polysomnographie (différencie central vs obstructif)"] },
      { id: "as2_autre_somnolence", diagnostic: "Autre cause de somnolence diurne", arguments: [{ label: "explication alternative (dette de sommeil, dépression, médicaments)", w: 2, when: { q: "as2_autre_cause", eq: true } }],
        examens_a_discuter: ["Agenda du sommeil ; revue des médicaments sédatifs ; dépistage d'une dépression", "Évoquer une narcolepsie si somnolence sévère sans SAOS (avis spécialisé)"] }
    ],
    examens_clinique: ["IMC, tour de cou", "Score d'Epworth, STOP-BANG", "Examen ORL des voies aériennes supérieures (obstacle nasal, rétrognathie, hypertrophie amygdalienne)", "Pression artérielle (rechercher une HTA résistante)"]
  },

  // -------------------------------------------------------------------------
  // DYSPEPSIE / DOULEUR ÉPIGASTRIQUE
  // -------------------------------------------------------------------------
  dyspepsie: {
    id: "dyspepsie", symptome: "Douleur du creux de l'estomac / digestion difficile (dyspepsie)", specialite: ["Digestif"],
    questions: [
      { id: "dd_alarme", label: "Signes d'alarme", type: "boolean", question: "Avez-vous une dysphagie, un amaigrissement, une anémie, des vomissements de sang/selles noires, ou une masse ?" },
      { id: "dd_cardiaque", label: "Cause cardiaque", type: "boolean", question: "La gêne survient-elle à l'effort, ou avez-vous des facteurs de risque cardiaque ?" },
      { id: "dd_epigastrique", label: "Dyspepsie typique", type: "boolean", question: "Avez-vous une gêne du creux de l'estomac, des ballonnements, surtout après les repas ?" },
      { id: "dd_age50", label: "Âge > 50 récent", type: "boolean", question: "Avez-vous plus de 50 ans avec des symptômes récents ?" },
      { id: "dd_ains", label: "AINS", type: "boolean", question: "Prenez-vous de l'aspirine ou des anti-inflammatoires ?" }
    ],
    red_flags: [
      { id: "dd_rf_alarme", niveau: 2, when: { any: [{ q: "dd_alarme", eq: true }, { q: "dd_age50", eq: true }] },
        message_medecin: "Signes d'alarme / dyspepsie récente après 50 ans : endoscopie haute (éliminer ulcère/cancer).",
        message_patient: "Ces éléments nécessitent un avis médical et une endoscopie." },
      { id: "dd_rf_cardiaque", niveau: 2, when: { q: "dd_cardiaque", eq: true },
        message_medecin: "Douleur d'effort : éliminer une cause cardiaque (ECG) avant d'étiqueter une dyspepsie.",
        message_patient: "Une douleur à l'effort doit être évaluée par un médecin." }
    ],
    diagnostics_differentiels: [
      { id: "dd_fonctionnelle", diagnostic: "Dyspepsie fonctionnelle / RGO", arguments: [{ label: "gêne épigastrique post-prandiale", w: 3, when: { q: "dd_epigastrique", eq: true } }],
        examens_a_discuter: ["Règles hygiéno-diététiques, IPP", "Recherche d'H. pylori"] },
      { id: "dd_ulcere", diagnostic: "Ulcère / cause organique", arguments: [{ label: "AINS", w: 2, when: { q: "dd_ains", eq: true } }, { label: "signes d'alarme", w: 2, when: { q: "dd_alarme", eq: true } }, { label: "> 50 ans récent", w: 1, when: { q: "dd_age50", eq: true } }],
        examens_a_discuter: ["Endoscopie, recherche d'H. pylori"] },
      { id: "dd_cardiaque", diagnostic: "Cause cardiaque à éliminer", arguments: [{ label: "douleur d'effort / FdR CV", w: 3, when: { q: "dd_cardiaque", eq: true } }],
        examens_a_discuter: ["ECG"] }
    ],
    examens_clinique: ["Palpation abdominale", "Recherche de signes d'alarme", "ECG si doute cardiaque"]
  },

  // -------------------------------------------------------------------------
  // PROSTATITE
  // -------------------------------------------------------------------------
  prostatite: {
    id: "prostatite", symptome: "Prostatite (infection de la prostate)", specialite: ["Urologie"], urgence: true,
    questions: [
      { id: "pr_sepsis", label: "Signes de gravité", type: "boolean", question: "Avez-vous des signes de gravité (malaise, confusion, tension basse, frissons intenses) ?" },
      { id: "pr_retention", label: "Rétention", type: "boolean", question: "N'arrivez-vous plus à uriner (rétention) ?" },
      { id: "pr_aigue", label: "Prostatite aiguë", type: "boolean", question: "Avez-vous de la fièvre avec des brûlures urinaires, des difficultés à uriner, et des douleurs du périnée ?" },
      { id: "pr_chronique", label: "Forme chronique", type: "boolean", question: "Est-ce une gêne pelvienne/urinaire chronique, récidivante, sans fièvre ?" },
      { id: "pr_bourse", label: "Atteinte scrotale", type: "boolean", question: "Avez-vous une douleur/un gonflement d'une bourse, ou un écoulement par le méat (urétrite) ?" },
      { id: "pr_geste", label: "Geste urologique", type: "boolean", question: "Avez-vous eu récemment un sondage, une biopsie de prostate, ou des rapports à risque d'IST ?" }
    ],
    red_flags: [
      { id: "pr_rf_sepsis", niveau: 3, when: { any: [{ q: "pr_sepsis", eq: true }, { q: "pr_retention", eq: true }] },
        message_medecin: "Prostatite aiguë avec sepsis / rétention aiguë d'urine : urgence (ECBU + hémocultures, antibiothérapie urgente, drainage par cathéter sus-pubien si rétention — éviter le sondage urétral). Pas de toucher rectal appuyé ni de massage prostatique (risque de bactériémie).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." }
    ],
    diagnostics_differentiels: [
      { id: "pr_aigue", diagnostic: "Prostatite aiguë (infection urinaire masculine fébrile)", arguments: [{ label: "fièvre + signes urinaires + douleur périnéale", w: 3, when: { q: "pr_aigue", eq: true } }, { label: "après geste urologique", w: 1, when: { q: "pr_geste", eq: true } }],
        examens_a_discuter: ["ECBU (± hémocultures si fièvre) AVANT antibiotique", "Antibiothérapie active sur la prostate, prolongée (≈ 2-3 semaines ; fluoroquinolone ou C3G) — pas de massage prostatique", "Ne pas doser le PSA en phase aiguë (faussement élevé)"] },
      { id: "pr_chronique", diagnostic: "Prostatite chronique / douleur pelvienne chronique", arguments: [{ label: "gêne chronique récidivante", w: 3, when: { q: "pr_chronique", eq: true } }],
        examens_a_discuter: ["ECBU ; avis urologique ; après 2 épisodes ou récidive, explorer une anomalie sous-jacente (résidu post-mictionnel, HBP, sténose, lithiase)", "Distinguer la prostatite chronique bactérienne du syndrome douloureux pelvien chronique (ECBU souvent négatif)"] },
      { id: "pr_scrotale", diagnostic: "Orchi-épididymite / urétrite associée", arguments: [{ label: "douleur scrotale ou écoulement urétral", w: 3, when: { q: "pr_bourse", eq: true } }],
        examens_a_discuter: ["Échographie scrotale si doute (éliminer une torsion chez le sujet jeune)", "Si IST probable (sujet jeune, écoulement) : PCR gonocoque/Chlamydia, traitement adapté au(x) partenaire(s)"] }
    ],
    examens_clinique: ["Température, recherche de sepsis (FC, TA, marbrures)", "Toucher rectal (prostate douloureuse, augmentée — sans massage)", "Palpation des bourses (épididymite associée), recherche d'un écoulement urétral", "ECBU ± hémocultures ; recherche d'un globe vésical (rétention)"]
  },

  // -------------------------------------------------------------------------
  // ŒDÈMES DES MEMBRES INFÉRIEURS
  // -------------------------------------------------------------------------
  oedemes: {
    id: "oedemes", symptome: "Œdèmes / jambes gonflées", specialite: ["Cardiologie", "Néphrologie", "Vasculaire"], urgence: true,
    questions: [
      { id: "oe_quincke", label: "Angio-œdème", type: "boolean", question: "Y a-t-il un gonflement brutal du visage/des lèvres/de la gorge avec gêne respiratoire ?" },
      { id: "oe_unilateral", label: "TVP", type: "boolean", question: "L'œdème touche-t-il une seule jambe, chaude et douloureuse ?" },
      { id: "oe_dyspnee", label: "Insuffisance cardiaque", type: "boolean", question: "Avez-vous un essoufflement, ou une gêne pour respirer allongé ?" },
      { id: "oe_renal", label: "Cause rénale", type: "boolean", question: "Avez-vous des urines mousseuses, une hypertension, ou une maladie rénale ?" },
      { id: "oe_anasarque", label: "Anasarque", type: "boolean", question: "Y a-t-il une prise de poids rapide et un gonflement généralisé (visage, abdomen) ?" },
      { id: "oe_veineux", label: "Insuffisance veineuse", type: "boolean", question: "Est-ce les deux jambes, en fin de journée, avec des varices ?" }
    ],
    red_flags: [
      { id: "oe_rf_quincke", niveau: 3, when: { q: "oe_quincke", eq: true },
        message_medecin: "Œdème de Quincke / anaphylaxie : urgence (voir fiche urticaire).",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "oe_rf_tvp", niveau: 2, when: { q: "oe_unilateral", eq: true },
        message_medecin: "Œdème unilatéral chaud/douloureux : TVP → écho-doppler (voir douleur de jambe).",
        message_patient: "Un gonflement d'une seule jambe nécessite un avis médical rapide." },
      { id: "oe_rf_oap", niveau: 2, when: { q: "oe_dyspnee", eq: true },
        message_medecin: "Œdèmes + dyspnée/orthopnée : insuffisance cardiaque → évaluation (BNP, ETT).",
        message_patient: "Des œdèmes avec essoufflement nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "oe_cardiaque", diagnostic: "Insuffisance cardiaque", arguments: [{ label: "dyspnée / orthopnée", w: 3, when: { q: "oe_dyspnee", eq: true } }, { label: "anasarque", w: 1, when: { q: "oe_anasarque", eq: true } }],
        examens_a_discuter: ["BNP, ECG, échocardiographie"] },
      { id: "oe_renal", diagnostic: "Cause rénale (syndrome néphrotique)", arguments: [{ label: "protéinurie / HTA / maladie rénale", w: 3, when: { q: "oe_renal", eq: true } }, { label: "anasarque", w: 1, when: { q: "oe_anasarque", eq: true } }],
        examens_a_discuter: ["Protéinurie, créatinine"] },
      { id: "oe_veineux", diagnostic: "Insuffisance veineuse", arguments: [{ label: "bilatéral, vespéral, varices", w: 3, when: { q: "oe_veineux", eq: true } }],
        examens_a_discuter: ["Contention veineuse, mesures"] },
      { id: "oe_tvp", diagnostic: "Thrombose veineuse profonde", arguments: [{ label: "œdème unilatéral", w: 3, when: { q: "oe_unilateral", eq: true } }],
        examens_a_discuter: ["Écho-doppler veineux"] }
    ],
    examens_clinique: ["Caractère uni/bilatéral, signe du godet", "Recherche de signes de TVP", "Auscultation cardio-pulmonaire", "Bandelette urinaire, pression artérielle"]
  },

  // -------------------------------------------------------------------------
  // TRAUMATISME CRÂNIEN
  // -------------------------------------------------------------------------
  traumatisme_cranien: {
    id: "traumatisme_cranien", symptome: "Traumatisme crânien", specialite: ["Urgences", "Neurologie"], urgence: true,
    questions: [
      { id: "tc2_grave", label: "Signes de gravité", type: "boolean", question: "Y a-t-il eu une perte de connaissance, des vomissements répétés, une confusion/somnolence, une convulsion, ou un déficit neurologique ?" },
      { id: "tc2_ecoulement", label: "Signes de fracture", type: "boolean", question: "Y a-t-il un écoulement de sang ou de liquide clair par le nez/l'oreille, ou des ecchymoses autour des yeux ?" },
      { id: "tc2_anticoag", label: "Anticoagulants / âge", type: "boolean", question: "La personne prend-elle des anticoagulants/antiagrégants, ou est-elle âgée ?" },
      { id: "tc2_mecanisme", label: "Mécanisme violent", type: "boolean", question: "Le choc a-t-il été violent (chute de hauteur, accident, projection) ?" },
      { id: "tc2_amnesie", label: "Amnésie / céphalées", type: "boolean", question: "Y a-t-il une amnésie de l'accident, ou des maux de tête persistants ?" }
    ],
    red_flags: [
      { id: "tc2_rf_grave", niveau: 3, when: { any: [{ q: "tc2_grave", eq: true }, { q: "tc2_ecoulement", eq: true }] },
        message_medecin: "Signes de gravité (PC, vomissements, confusion, déficit, écoulement, fracture) : TDM cérébrale en urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "tc2_rf_anticoag", niveau: 2, when: { q: "tc2_anticoag", eq: true },
        message_medecin: "Traumatisme crânien sous anticoagulant / sujet âgé : TDM cérébrale (risque d'hématome, parfois différé), surveillance.",
        message_patient: "Un choc à la tête sous anticoagulant nécessite un avis médical et une surveillance." }
    ],
    diagnostics_differentiels: [
      { id: "tc2_grave", diagnostic: "TC grave (lésion intracrânienne)", arguments: [{ label: "signes de gravité", w: 3, when: { q: "tc2_grave", eq: true } }, { label: "mécanisme violent", w: 1, when: { q: "tc2_mecanisme", eq: true } }],
        examens_a_discuter: ["TDM cérébrale"] },
      { id: "tc2_risque", diagnostic: "TC à risque (anticoagulant / âgé)", arguments: [{ label: "anticoagulant / âge", w: 3, when: { q: "tc2_anticoag", eq: true } }],
        examens_a_discuter: ["TDM cérébrale, surveillance"] },
      { id: "tc2_leger", diagnostic: "TC léger", arguments: [{ label: "amnésie / céphalées sans signe de gravité", w: 2, when: { all: [{ q: "tc2_amnesie", eq: true }, { q: "tc2_grave", eq: false }] } }],
        examens_a_discuter: ["Surveillance, consignes de reconsultation"] }
    ],
    examens_clinique: ["Score de Glasgow", "Examen neurologique et des pupilles", "Recherche de signes de fracture / écoulement", "Statut anticoagulant"]
  },

  // -------------------------------------------------------------------------
  // ABCÈS CUTANÉ
  // -------------------------------------------------------------------------
  abces_cutane: {
    id: "abces_cutane", symptome: "Abcès cutané", specialite: ["Dermatologie", "Chirurgie"],
    questions: [
      { id: "ab2_collection", label: "Collection", type: "boolean", question: "Y a-t-il une boule rouge, chaude, douloureuse, avec du pus ?" },
      { id: "ab2_fievre", label: "Fièvre / extension", type: "boolean", question: "Avez-vous de la fièvre ou une extension rapide de la rougeur ?" },
      { id: "ab2_face", label: "Localisation à risque", type: "boolean", question: "L'abcès est-il sur le visage (zone médiane / nez), ou y a-t-il des signes de gravité ?" },
      { id: "ab2_terrain", label: "Terrain à risque", type: "boolean", question: "Êtes-vous diabétique ou immunodéprimé ?" },
      { id: "ab2_necrose", label: "Signes de nécrose/sepsis", type: "boolean", question: "La douleur est-elle disproportionnée/intense, avec une peau violacée, des taches noires, des bulles, une zone insensible, des crépitations sous la peau, ou un malaise général ?" },
      { id: "ab2_recidive", label: "Récidive / plis", type: "boolean", question: "Est-ce récidivant, notamment au niveau des aisselles, de l'aine ou des fesses ?" }
    ],
    red_flags: [
      { id: "ab2_rf_necro", niveau: 3, when: { q: "ab2_necrose", eq: true },
        message_medecin: "Douleur disproportionnée, nécrose/bulles, crépitation, zone insensible, sepsis : suspicion de DERMOHYPODERMITE NÉCROSANTE / fasciite nécrosante → URGENCE médico-chirurgicale (réanimation, exploration et débridement, antibiothérapie large), ne pas se contenter d'un drainage.",
        message_patient: "Ces signes nécessitent un appel au 15 immédiat." },
      { id: "ab2_rf_face", niveau: 2, when: { q: "ab2_face", eq: true },
        message_medecin: "Abcès/furoncle de la zone médio-faciale (nez, lèvre supérieure) : risque de thrombophlébite du sinus caverneux — ne pas manipuler/presser, antibiothérapie antistaphylococcique, avis.",
        message_patient: "Un abcès sur le centre du visage ne doit pas être manipulé et nécessite un avis médical." },
      { id: "ab2_rf_grave", niveau: 2, when: { any: [{ q: "ab2_fievre", eq: true }, { q: "ab2_terrain", eq: true }] },
        message_medecin: "Abcès fébrile / extensif / terrain à risque (diabète, immunodépression) : incision-drainage + antibiothérapie, surveillance rapprochée.",
        message_patient: "Un abcès avec fièvre ou sur terrain fragile nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ab2_abces", diagnostic: "Abcès cutané / furoncle", arguments: [{ label: "collection fluctuante", w: 3, when: { q: "ab2_collection", eq: true } }],
        examens_a_discuter: ["Incision-drainage = traitement de référence (l'antibiotique seul ne traite pas une collection)", "Antibiothérapie surtout si signes généraux, cellulite extensive, terrain à risque ou localisation à risque", "Furoncle de la face : ne pas manipuler"] },
      { id: "ab2_hidradenite", diagnostic: "Hidradénite suppurée (maladie de Verneuil)", arguments: [{ label: "abcès récidivants des plis (aisselles, aine, fesses)", w: 3, when: { q: "ab2_recidive", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique (nodules/abcès/fistules récidivants des grands plis)", "Avis dermatologique (prise en charge au long cours, arrêt du tabac, antibiothérapie/anti-TNF, chirurgie)"] },
      { id: "ab2_complique", diagnostic: "Abcès compliqué", arguments: [{ label: "fièvre / extension", w: 2, when: { q: "ab2_fievre", eq: true } }, { label: "terrain à risque", w: 2, when: { q: "ab2_terrain", eq: true } }, { label: "localisation faciale", w: 1, when: { q: "ab2_face", eq: true } }],
        examens_a_discuter: ["Avis, antibiothérapie"] }
    ],
    examens_clinique: ["Caractériser la collection (fluctuation) — un abcès collecté se draine", "Signes locaux et généraux ; rechercher des signes de nécrose (douleur disproportionnée, crépitation, bulles, hypoesthésie)", "Recherche d'une porte d'entrée ; caractère récidivant (Verneuil)", "Évaluation du terrain (diabète, immunodépression)"]
  },

  // -------------------------------------------------------------------------
  // ÉPILEPSIE / CRISE CONVULSIVE
  // -------------------------------------------------------------------------
  epilepsie: {
    id: "epilepsie", symptome: "Crise convulsive / épilepsie", specialite: ["Neurologie"], urgence: true,
    questions: [
      { id: "ep3_status", label: "État de mal", type: "boolean", question: "La crise dure-t-elle plus de 5 minutes, ou les crises s'enchaînent-elles sans reprise de conscience ?" },
      { id: "ep3_fievre", label: "Crise symptomatique aiguë", type: "boolean", question: "Y a-t-il de la fièvre, des maux de tête, ou des signes neurologiques persistants ?" },
      { id: "ep3_premiere", label: "Première crise", type: "boolean", question: "Est-ce une PREMIÈRE crise (jamais eu auparavant) ?" },
      { id: "ep3_connu", label: "Épilepsie connue", type: "boolean", question: "Est-ce une personne épileptique connue, avec une crise habituelle qui s'est résolue ?" },
      { id: "ep3_facteur", label: "Facteur déclenchant", type: "boolean", question: "Y a-t-il un facteur déclenchant (oubli de traitement, manque de sommeil, alcool) ?" }
    ],
    red_flags: [
      { id: "ep3_rf_status", niveau: 3, when: { q: "ep3_status", eq: true },
        message_medecin: "État de mal épileptique (> 5 min ou crises répétées) : urgence vitale (15, benzodiazépines).",
        message_patient: "Une crise qui dure ou se répète nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "ep3_rf_premiere", niveau: 2, when: { any: [{ q: "ep3_premiere", eq: true }, { q: "ep3_fievre", eq: true }] },
        message_medecin: "Première crise / crise fébrile : bilan (imagerie, recherche de cause, PL si fièvre) → avis neurologique.",
        message_patient: "Une première crise nécessite un avis médical et des examens." }
    ],
    diagnostics_differentiels: [
      { id: "ep3_connu", diagnostic: "Crise sur épilepsie connue", arguments: [{ label: "épileptique connu, crise résolutive", w: 3, when: { q: "ep3_connu", eq: true } }, { label: "facteur déclenchant", w: 1, when: { q: "ep3_facteur", eq: true } }],
        examens_a_discuter: ["Vérifier l'observance / le facteur déclenchant", "Adapter le traitement"] },
      { id: "ep3_premiere", diagnostic: "Première crise", arguments: [{ label: "premier épisode", w: 3, when: { q: "ep3_premiere", eq: true } }],
        examens_a_discuter: ["Bilan étiologique, imagerie cérébrale, EEG"] },
      { id: "ep3_status", diagnostic: "État de mal épileptique", arguments: [{ label: "crise prolongée / répétée", w: 3, when: { q: "ep3_status", eq: true } }],
        examens_a_discuter: ["Urgence (benzodiazépines)"] },
      { id: "ep3_symptomatique", diagnostic: "Crise symptomatique aiguë", arguments: [{ label: "fièvre / signes neuro", w: 2, when: { q: "ep3_fievre", eq: true } }],
        examens_a_discuter: ["Rechercher la cause (méningite, métabolique, toxique)"] }
    ],
    examens_clinique: ["Examen neurologique post-critique", "Glycémie capillaire, température", "Recherche d'une morsure de langue / d'un facteur déclenchant"]
  },

  // -------------------------------------------------------------------------
  // VARICES / INSUFFISANCE VEINEUSE
  // -------------------------------------------------------------------------
  varices: {
    id: "varices", symptome: "Varices / jambes lourdes (insuffisance veineuse)", specialite: ["Vasculaire"],
    questions: [
      { id: "va2_phlebite", label: "Paraphlébite / TVP", type: "boolean", question: "Une veine est-elle rouge, chaude, dure et douloureuse, ou une jambe est-elle gonflée et douloureuse ?" },
      { id: "va2_ulcere", label: "Troubles trophiques", type: "boolean", question: "Y a-t-il une plaie qui ne cicatrise pas (ulcère), ou un durcissement / changement de couleur de la peau de la cheville ?" },
      { id: "va2_hemorragie", label: "Hémorragie", type: "boolean", question: "Une varice a-t-elle saigné abondamment ?" },
      { id: "va2_gene", label: "Symptômes veineux", type: "boolean", question: "Avez-vous des jambes lourdes, des varices visibles, gonflées en fin de journée ?" }
    ],
    red_flags: [
      { id: "va2_rf_phlebite", niveau: 2, when: { q: "va2_phlebite", eq: true },
        message_medecin: "Cordon induré inflammatoire / jambe gonflée et douloureuse : paraphlébite ou TVP → écho-doppler.",
        message_patient: "Ces signes nécessitent un avis médical rapide." },
      { id: "va2_rf_ulcere", niveau: 2, when: { q: "va2_ulcere", eq: true },
        message_medecin: "Ulcère / troubles trophiques : prise en charge spécialisée (contention, soins de plaie).",
        message_patient: "Une plaie de jambe qui ne cicatrise pas nécessite un avis médical." },
      { id: "va2_rf_hemorragie", niveau: 2, when: { q: "va2_hemorragie", eq: true },
        message_medecin: "Hémorragie sur varice : compression + surélévation ; avis.",
        message_patient: "Comprimez et surélevez la jambe ; consultez." }
    ],
    diagnostics_differentiels: [
      { id: "va2_iv", diagnostic: "Insuffisance veineuse / varices", arguments: [{ label: "jambes lourdes, varices, œdème vespéral", w: 3, when: { q: "va2_gene", eq: true } }],
        examens_a_discuter: ["Contention veineuse, mesures", "Avis vasculaire si gênant"] },
      { id: "va2_phlebite", diagnostic: "Complication (paraphlébite / TVP)", arguments: [{ label: "cordon induré / jambe gonflée", w: 3, when: { q: "va2_phlebite", eq: true } }],
        examens_a_discuter: ["Écho-doppler veineux"] },
      { id: "va2_ulcere", diagnostic: "Ulcère veineux / troubles trophiques", arguments: [{ label: "ulcère / dermite ocre", w: 3, when: { q: "va2_ulcere", eq: true } }],
        examens_a_discuter: ["IPS avant contention, soins de plaie"] }
    ],
    examens_clinique: ["Examen des membres inférieurs (varices, œdème, troubles trophiques)", "Recherche de signes de TVP", "Palpation des pouls (IPS avant contention)"]
  },

  // -------------------------------------------------------------------------
  // PRÉ-ÉCLAMPSIE
  // -------------------------------------------------------------------------
  preeclampsie: {
    id: "preeclampsie", symptome: "Pré-éclampsie (HTA de la grossesse)", specialite: ["Obstétrique"], urgence: true,
    questions: [
      { id: "pe2_convulsion", label: "Éclampsie", type: "boolean", question: "Y a-t-il eu une convulsion ou une perte de connaissance ?" },
      { id: "pe2_signes", label: "Signes fonctionnels", type: "boolean", question: "Êtes-vous enceinte (2e moitié) avec maux de tête, troubles visuels (mouches, voile), douleur en barre sous les côtes, ou vomissements ?" },
      { id: "pe2_ta", label: "HTA / protéinurie", type: "boolean", question: "Votre tension est-elle élevée, ou a-t-on trouvé des protéines dans les urines ?" },
      { id: "pe2_oedeme", label: "Œdèmes brutaux", type: "boolean", question: "Avez-vous des œdèmes brutaux du visage/des mains, ou une prise de poids rapide ?" }
    ],
    red_flags: [
      { id: "pe2_rf_eclampsie", niveau: 3, when: { q: "pe2_convulsion", eq: true },
        message_medecin: "Éclampsie (convulsion) : urgence vitale (15, maternité).",
        message_patient: "Cette situation nécessite une évaluation médicale immédiate — appelez le 15." },
      { id: "pe2_rf_severe", niveau: 3, when: { any: [{ q: "pe2_signes", eq: true }, { q: "pe2_ta", eq: true }] },
        message_medecin: "Pré-éclampsie (HTA gravidique + signes fonctionnels / protéinurie) : urgence obstétricale.",
        message_patient: "Ces signes nécessitent une évaluation médicale sans attendre (maternité ou 15)." }
    ],
    diagnostics_differentiels: [
      { id: "pe2_preeclampsie", diagnostic: "Pré-éclampsie", arguments: [{ label: "HTA / protéinurie", w: 3, when: { q: "pe2_ta", eq: true } }, { label: "signes fonctionnels", w: 2, when: { q: "pe2_signes", eq: true } }, { label: "œdèmes brutaux", w: 1, when: { q: "pe2_oedeme", eq: true } }],
        examens_a_discuter: ["TA, protéinurie", "NFS-plaquettes, transaminases, uricémie", "Avis obstétrical urgent"] },
      { id: "pe2_eclampsie", diagnostic: "Éclampsie", arguments: [{ label: "convulsion", w: 3, when: { q: "pe2_convulsion", eq: true } }],
        examens_a_discuter: ["Urgence vitale, maternité"] }
    ],
    examens_clinique: ["Pression artérielle", "Bandelette urinaire (protéinurie)", "Recherche de signes fonctionnels et des réflexes", "Avis obstétrical"]
  },

  // -------------------------------------------------------------------------
  // SAIGNEMENT / FAUSSE COUCHE PENDANT LA GROSSESSE
  // -------------------------------------------------------------------------
  fausse_couche: {
    id: "fausse_couche", symptome: "Saignement / douleur pendant la grossesse", specialite: ["Obstétrique"], urgence: true,
    questions: [
      { id: "fc_choc", label: "Abondance / choc", type: "boolean", question: "Le saignement est-il très abondant, avec malaise ou pâleur ?" },
      { id: "fc_douleur", label: "Douleur (GEU)", type: "boolean", question: "Avez-vous une douleur pelvienne, surtout d'un côté ?" },
      { id: "fc_terme", label: "Terme", type: "single_choice", question: "À quel stade de la grossesse ?",
        options: ["Début (1er trimestre)", "Plus tard (2e/3e trimestre)", "Je ne sais pas"] },
      { id: "fc_fievre", label: "Fièvre", type: "boolean", question: "Avez-vous de la fièvre (notamment après une fausse couche / une manœuvre) ?" }
    ],
    red_flags: [
      { id: "fc_rf_geu", niveau: 3, when: { q: "fc_douleur", eq: true },
        message_medecin: "Saignement + douleur en début de grossesse : grossesse extra-utérine à éliminer → urgence (β-hCG, échographie).",
        message_patient: "Cette association nécessite une évaluation médicale urgente." },
      { id: "fc_rf_choc", niveau: 3, when: { q: "fc_choc", eq: true },
        message_medecin: "Saignement abondant / signes de choc : urgence.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "fc_rf_tardif", niveau: 3, when: { q: "fc_terme", eq: "Plus tard (2e/3e trimestre)" },
        message_medecin: "Saignement au 2e/3e trimestre : urgence obstétricale (placenta praevia, hématome rétroplacentaire) — pas de TV avant échographie.",
        message_patient: "Un saignement en fin de grossesse nécessite une évaluation médicale immédiate — maternité / 15." },
      { id: "fc_rf_infection", niveau: 2, when: { q: "fc_fievre", eq: true },
        message_medecin: "Fièvre + saignement : endométrite / rétention infectée → avis.",
        message_patient: "De la fièvre avec un saignement nécessite un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "fc_fausse_couche", diagnostic: "Fausse couche (1er trimestre)", arguments: [{ label: "saignement de début de grossesse", w: 3, when: { q: "fc_terme", eq: "Début (1er trimestre)" } }],
        examens_a_discuter: ["β-hCG, échographie", "Avis gynécologique"] },
      { id: "fc_geu", diagnostic: "Grossesse extra-utérine", arguments: [{ label: "douleur pelvienne", w: 3, when: { q: "fc_douleur", eq: true } }],
        examens_a_discuter: ["β-hCG, échographie en urgence"] },
      { id: "fc_tardif", diagnostic: "Saignement du 2e/3e trimestre", arguments: [{ label: "terme avancé", w: 3, when: { q: "fc_terme", eq: "Plus tard (2e/3e trimestre)" } }],
        examens_a_discuter: ["Maternité urgente (échographie, pas de TV avant)"] }
    ],
    examens_clinique: ["β-hCG, échographie", "Pouls et pression artérielle", "Examen au spéculum (sauf 3e trimestre avant échographie)"]
  },

  // -------------------------------------------------------------------------
  // DIMINUTION DES MOUVEMENTS FŒTAUX
  // -------------------------------------------------------------------------
  diminution_mvt_foetaux: {
    id: "diminution_mvt_foetaux", symptome: "Diminution des mouvements du bébé", specialite: ["Obstétrique"], urgence: true,
    questions: [
      { id: "mf_arret", label: "Arrêt des mouvements", type: "boolean", question: "Ne sentez-vous plus du tout bouger le bébé depuis plusieurs heures ?" },
      { id: "mf_diminution", label: "Diminution", type: "boolean", question: "Sentez-vous votre bébé bouger nettement moins que d'habitude ?" },
      { id: "mf_autres", label: "Signes associés", type: "boolean", question: "Y a-t-il aussi des saignements, des contractions douloureuses, une perte de liquide, ou des signes de pré-éclampsie ?" }
    ],
    red_flags: [
      { id: "mf_rf", niveau: 3, when: { any: [{ q: "mf_arret", eq: true }, { q: "mf_diminution", eq: true }, { q: "mf_autres", eq: true }] },
        message_medecin: "Diminution / arrêt des mouvements fœtaux : urgence obstétricale → enregistrement du rythme cardiaque fœtal sans délai.",
        message_patient: "Une baisse des mouvements du bébé nécessite de se rendre à la maternité sans attendre." }
    ],
    diagnostics_differentiels: [
      { id: "mf_mvt", diagnostic: "Diminution des mouvements actifs fœtaux", arguments: [{ label: "diminution", w: 3, when: { q: "mf_diminution", eq: true } }, { label: "arrêt", w: 2, when: { q: "mf_arret", eq: true } }],
        examens_a_discuter: ["Maternité urgente : monitoring (RCF), échographie"] }
    ],
    examens_clinique: ["Orientation immédiate vers la maternité (RCF / monitoring)", "Ne pas temporiser"]
  },

  // -------------------------------------------------------------------------
  // FIÈVRE DU POST-PARTUM
  // -------------------------------------------------------------------------
  fievre_postpartum: {
    id: "fievre_postpartum", symptome: "Fièvre après l'accouchement (post-partum)", specialite: ["Obstétrique"], urgence: true,
    questions: [
      { id: "fp_sepsis", label: "Signes de gravité", type: "boolean", question: "Avez-vous des signes de gravité (malaise, confusion, tension basse) ?" },
      { id: "fp_jambe", label: "Thrombose / EP", type: "boolean", question: "Avez-vous une jambe gonflée/douloureuse, ou un essoufflement / une douleur thoracique ?" },
      { id: "fp_endometrite", label: "Endométrite", type: "boolean", question: "Avez-vous des douleurs du bas-ventre et des pertes malodorantes ?" },
      { id: "fp_sein", label: "Mastite", type: "boolean", question: "Avez-vous un sein rouge, chaud, douloureux ?" }
    ],
    red_flags: [
      { id: "fp_rf_sepsis", niveau: 3, when: { any: [{ q: "fp_sepsis", eq: true }, { q: "fp_jambe", eq: true }] },
        message_medecin: "Sepsis du post-partum / suspicion d'embolie pulmonaire : urgence vitale.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "fp_rf_endometrite", niveau: 2, when: { q: "fp_endometrite", eq: true },
        message_medecin: "Endométrite du post-partum : prélèvements, antibiothérapie, avis.",
        message_patient: "Ces signes nécessitent un avis médical rapide." }
    ],
    diagnostics_differentiels: [
      { id: "fp_endometrite", diagnostic: "Endométrite du post-partum", arguments: [{ label: "douleurs + pertes malodorantes", w: 3, when: { q: "fp_endometrite", eq: true } }],
        examens_a_discuter: ["Prélèvements, antibiothérapie"] },
      { id: "fp_mastite", diagnostic: "Mastite / abcès du sein", arguments: [{ label: "sein rouge, chaud, douloureux", w: 3, when: { q: "fp_sein", eq: true } }],
        examens_a_discuter: ["Poursuite de l'allaitement, antibiothérapie si besoin"] },
      { id: "fp_mte", diagnostic: "Maladie thrombo-embolique", arguments: [{ label: "jambe gonflée / dyspnée", w: 3, when: { q: "fp_jambe", eq: true } }],
        examens_a_discuter: ["Écho-doppler, angio-TDM"] }
    ],
    examens_clinique: ["Température, constantes", "Examen utérin (involution, douleur)", "Examen des seins", "Recherche de signes de TVP / EP"]
  },

  // -------------------------------------------------------------------------
  // NAUSÉES DE LA GROSSESSE
  // -------------------------------------------------------------------------
  nausees_grossesse: {
    id: "nausees_grossesse", symptome: "Nausées / vomissements de la grossesse", specialite: ["Obstétrique"],
    questions: [
      { id: "ng_hyperemesis", label: "Hyperemesis", type: "boolean", question: "Vomissez-vous au point de ne plus rien garder, avec une perte de poids et une déshydratation ?" },
      { id: "ng_tardif", label: "Tardif / atypique", type: "boolean", question: "Apparaissent-ils tardivement (2e moitié de grossesse) ou avec une douleur abdominale / des maux de tête ?" },
      { id: "ng_typique", label: "1er trimestre banal", type: "boolean", question: "S'agit-il de nausées du 1er trimestre, modérées, sans signe de gravité ?" }
    ],
    red_flags: [
      { id: "ng_rf_hyperemesis", niveau: 2, when: { q: "ng_hyperemesis", eq: true },
        message_medecin: "Vomissements incoercibles gravidiques (hyperemesis) : déshydratation, cétose, troubles ioniques → avis, réhydratation IV. IMPORTANT : supplémenter en vitamine B1 (thiamine) AVANT toute perfusion de sérum glucosé (prévention de l'encéphalopathie de Gayet-Wernicke). Évoquer une môle/grossesse multiple si hCG très élevée.",
        message_patient: "Ne plus rien garder pendant la grossesse nécessite un avis médical rapide." },
      { id: "ng_rf_tardif", niveau: 2, when: { q: "ng_tardif", eq: true },
        message_medecin: "Nausées/vomissements tardifs ou avec douleur/céphalées : éliminer une cause (pré-éclampsie/HELLP, stéatose hépatique aiguë gravidique, cause digestive, neurologique).",
        message_patient: "Ces éléments nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ng_physio", diagnostic: "Nausées du 1er trimestre (physiologiques)", arguments: [{ label: "1er trimestre, modérées", w: 3, when: { q: "ng_typique", eq: true } }],
        examens_a_discuter: ["Mesures hygiéno-diététiques ; antiémétiques autorisés (doxylamine-pyridoxine en 1re intention, puis métoclopramide/ondansétron selon avis)"] },
      { id: "ng_hyperemesis", diagnostic: "Hyperemesis gravidarum", arguments: [{ label: "vomissements incoercibles + perte de poids", w: 3, when: { q: "ng_hyperemesis", eq: true } }],
        examens_a_discuter: ["Ionogramme, cétonurie, fonction rénale, bilan hépatique ; vitamine B1 avant le glucosé", "Réhydratation IV ; échographie (môle hydatiforme, grossesse multiple) ; TSH (thyrotoxicose gestationnelle)"] },
      { id: "ng_tardif", diagnostic: "Cause tardive à explorer (pré-éclampsie, hépatique, digestive)", arguments: [{ label: "tardif / atypique", w: 3, when: { q: "ng_tardif", eq: true } }],
        examens_a_discuter: ["TA, bandelette urinaire (protéinurie), bilan hépatique (HELLP/SHAG), NFS-plaquettes"] }
    ],
    examens_clinique: ["Poids, signes de déshydratation", "Pression artérielle, bandelette urinaire (cétonurie, protéinurie)", "Hauteur utérine / échographie si suspicion de môle ou de grossesse multiple"]
  },

  // -------------------------------------------------------------------------
  // CONTRACEPTION
  // -------------------------------------------------------------------------
  contraception: {
    id: "contraception", symptome: "Contraception (demande, oubli, urgence)", specialite: ["Gynécologie"], urgence: true,
    questions: [
      { id: "ct_signes_thrombose", label: "Signes de thrombose", type: "boolean", question: "Sous pilule, avez-vous une douleur/gonflement d'une jambe, une douleur thoracique, ou des maux de tête inhabituels ?" },
      { id: "ct_oubli", label: "Oubli / contraception d'urgence", type: "boolean", question: "S'agit-il d'un oubli de pilule ou d'un rapport à risque nécessitant une contraception d'urgence ?" },
      { id: "ct_cv", label: "Contre-indication œstrogènes", type: "boolean", question: "Avez-vous des facteurs de risque (tabac après 35 ans, HTA, migraine avec aura, antécédent de thrombose) ?" },
      { id: "ct_demande", label: "Demande d'information", type: "boolean", question: "Souhaitez-vous une information ou un choix de contraception ?" },
      { id: "ct_geu", label: "Suspicion de grossesse / GEU", type: "boolean", question: "Avez-vous un retard de règles ou un doute sur une grossesse, avec une douleur du bas-ventre et/ou des saignements ?" }
    ],
    red_flags: [
      { id: "ct_rf_thrombose", niveau: 3, when: { q: "ct_signes_thrombose", eq: true },
        message_medecin: "Sous contraception œstroprogestative : signes de thrombose veineuse / EP / AVC → urgence (15), arrêt de la pilule.",
        message_patient: "Ces signes nécessitent une évaluation médicale immédiate — appelez le 15." },
      { id: "ct_rf_geu", niveau: 3, when: { q: "ct_geu", eq: true },
        message_medecin: "Douleur pelvienne + retard de règles/saignement (y compris sous contraception, surtout DIU ou microprogestatif) : éliminer une grossesse extra-utérine → test de grossesse, β-hCG, échographie en urgence.",
        message_patient: "Une douleur du ventre avec un retard de règles nécessite une évaluation médicale rapide." },
      { id: "ct_rf_ci", niveau: 2, when: { q: "ct_cv", eq: true },
        message_medecin: "Facteurs de risque CV (tabac > 35 ans, HTA, migraine avec aura, ATCD thrombo-embolique) : contre-indication aux œstrogènes → privilégier une méthode sans œstrogène (microprogestatif, DIU, implant).",
        message_patient: "Ce contexte nécessite d'adapter la contraception avec un médecin." },
      { id: "ct_rf_urgence", niveau: 2, when: { q: "ct_oubli", eq: true },
        message_medecin: "Oubli / rapport à risque : contraception d'urgence selon le délai — lévonorgestrel ≤ 72 h, ulipristal ≤ 120 h, DIU au cuivre ≤ 5 j (le plus efficace). Ne protège pas les rapports suivants ; test de grossesse si retard ; proposer un dépistage IST.",
        message_patient: "Un oubli / rapport à risque nécessite une contraception d'urgence rapidement (au plus tôt)." }
    ],
    diagnostics_differentiels: [
      { id: "ct_demande", diagnostic: "Demande de contraception", arguments: [{ label: "information / choix", w: 2, when: { q: "ct_demande", eq: true } }],
        examens_a_discuter: ["Choix selon le profil (contre-indications, préférences, observance) ; éliminer une grossesse en cours avant de débuter", "Méthodes les plus efficaces (LARC) : DIU, implant ; pas de bilan systématique avant une pilule chez une femme jeune sans facteur de risque (interrogatoire + TA + bilan lipidique/glycémie selon recommandations)"] },
      { id: "ct_urgence", diagnostic: "Contraception d'urgence", arguments: [{ label: "oubli / rapport à risque", w: 3, when: { q: "ct_oubli", eq: true } }],
        examens_a_discuter: ["Lévonorgestrel (≤ 72 h) / ulipristal acétate (≤ 120 h) / DIU au cuivre (≤ 5 j, le plus efficace)", "Reprise/poursuite d'une contraception ensuite ; dépistage IST ; test de grossesse si retard"] }
    ],
    examens_clinique: ["Recherche des contre-indications (TA, antécédents personnels/familiaux thrombo-emboliques, migraine avec aura, tabac)", "Éliminer une grossesse en cours / une GEU si signe d'appel", "Conseil contraceptif adapté et information sur la conduite à tenir en cas d'oubli", "Dépistage IST si besoin"]
  },

  // -------------------------------------------------------------------------
  // TROUBLE DU CYCLE / AMÉNORRHÉE
  // -------------------------------------------------------------------------
  trouble_cycle: {
    id: "trouble_cycle", symptome: "Trouble du cycle / aménorrhée", specialite: ["Gynécologie"],
    questions: [
      { id: "tcy_post_menopause", label: "Saignement post-ménopausique", type: "boolean", question: "Avez-vous des saignements APRÈS la ménopause ?" },
      { id: "tcy_amenorrhee", label: "Aménorrhée", type: "boolean", question: "Avez-vous une absence de règles (en dehors d'une grossesse) ?" },
      { id: "tcy_sopk", label: "SOPK", type: "boolean", question: "Avez-vous des règles espacées avec une pilosité excessive, de l'acné, ou un surpoids ?" },
      { id: "tcy_abondant", label: "Ménorragies", type: "boolean", question: "Avez-vous des règles très abondantes ou prolongées ?" }
    ],
    red_flags: [
      { id: "tcy_rf_grossesse", niveau: 2, when: { all: [{ ctx: "grossessePossible", eq: true }, { q: "tcy_amenorrhee", eq: true }] },
        message_medecin: "Aménorrhée + grossesse possible : test de grossesse en premier.",
        message_patient: "Un test de grossesse est la première étape." },
      { id: "tcy_rf_postmeno", niveau: 2, when: { q: "tcy_post_menopause", eq: true },
        message_medecin: "Saignement post-ménopausique : cancer de l'endomètre à éliminer (échographie, avis — voir métrorragies).",
        message_patient: "Un saignement après la ménopause nécessite un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "tcy_amenorrhee", diagnostic: "Aménorrhée (hors grossesse)", arguments: [{ label: "absence de règles", w: 3, when: { q: "tcy_amenorrhee", eq: true } }],
        examens_a_discuter: ["β-hCG, TSH, prolactine", "Bilan selon le contexte"] },
      { id: "tcy_sopk", diagnostic: "Syndrome des ovaires polykystiques", arguments: [{ label: "cycles espacés + hyperandrogénie", w: 3, when: { q: "tcy_sopk", eq: true } }],
        examens_a_discuter: ["Bilan hormonal, échographie pelvienne"] },
      { id: "tcy_menorragies", diagnostic: "Ménorragies", arguments: [{ label: "règles abondantes / prolongées", w: 3, when: { q: "tcy_abondant", eq: true } }],
        examens_a_discuter: ["NFS (anémie), échographie pelvienne"] },
      { id: "tcy_postmeno", diagnostic: "Saignement post-ménopausique", arguments: [{ label: "après la ménopause", w: 3, when: { q: "tcy_post_menopause", eq: true } }],
        examens_a_discuter: ["Échographie endovaginale, avis"] }
    ],
    examens_clinique: ["β-hCG", "Examen gynécologique", "Échographie pelvienne", "Bilan hormonal selon l'orientation"]
  },

  // -------------------------------------------------------------------------
  // MASSE MAMMAIRE
  // -------------------------------------------------------------------------
  masse_mammaire: {
    id: "masse_mammaire", symptome: "Boule / masse dans le sein", specialite: ["Sénologie", "Gynécologie"],
    questions: [
      { id: "mm_suspecte", label: "Masse suspecte", type: "boolean", question: "La masse est-elle dure, fixée, irrégulière, avec une rétraction de la peau/du mamelon, ou un ganglion sous le bras ?" },
      { id: "mm_inflammatoire", label: "Sein inflammatoire", type: "boolean", question: "Le sein est-il rouge, chaud, gonflé, avec une peau d'orange (en dehors de l'allaitement) ?" },
      { id: "mm_ecoulement", label: "Écoulement sanglant", type: "boolean", question: "Y a-t-il un écoulement du mamelon, surtout sanglant et d'un seul côté ?" },
      { id: "mm_kyste", label: "Lésion bénigne", type: "boolean", question: "La masse est-elle ronde, mobile, parfois douloureuse, variant avec le cycle ?" },
      { id: "mm_paget", label: "Eczéma du mamelon", type: "boolean", question: "Y a-t-il une lésion type eczéma/croûte du mamelon, d'un seul côté, qui ne guérit pas malgré les crèmes ?" }
    ],
    red_flags: [
      { id: "mm_rf_cancer", niveau: 2, when: { any: [{ q: "mm_suspecte", eq: true }, { q: "mm_ecoulement", eq: true }] },
        message_medecin: "Masse dure/fixée/rétraction ou écoulement sanglant unipore : cancer à éliminer → mammographie + échographie + avis (triple test : clinique + imagerie + biopsie). Toute masse persistante justifie une imagerie même d'allure bénigne.",
        message_patient: "Ces caractéristiques nécessitent un avis médical et des examens du sein." },
      { id: "mm_rf_inflammatoire", niveau: 2, when: { q: "mm_inflammatoire", eq: true },
        message_medecin: "Sein inflammatoire hors allaitement (ou mastite ne régressant pas sous antibiotiques en 48-72 h) : éliminer un CANCER INFLAMMATOIRE → mammographie/échographie + biopsie sans délai (ne pas se contenter d'antibiotiques).",
        message_patient: "Un sein rouge et gonflé en dehors de l'allaitement nécessite un avis médical." },
      { id: "mm_rf_paget", niveau: 2, when: { q: "mm_paget", eq: true },
        message_medecin: "Lésion eczématiforme unilatérale du mamelon persistante : évoquer une maladie de Paget du mamelon (cancer) → avis et biopsie, ne pas traiter indéfiniment comme un eczéma.",
        message_patient: "Une lésion du mamelon qui ne guérit pas nécessite un avis spécialisé." }
    ],
    diagnostics_differentiels: [
      { id: "mm_cancer", diagnostic: "Lésion suspecte (cancer du sein)", arguments: [{ label: "masse dure/fixée/rétraction", w: 3, when: { q: "mm_suspecte", eq: true } }, { label: "sein inflammatoire", w: 2, when: { q: "mm_inflammatoire", eq: true } }, { label: "écoulement sanglant unipore", w: 1, when: { q: "mm_ecoulement", eq: true } }, { label: "eczéma du mamelon (Paget)", w: 1, when: { q: "mm_paget", eq: true } }],
        examens_a_discuter: ["Mammographie + échographie", "Avis, biopsie (triple test)"] },
      { id: "mm_inflammatoire_dd", diagnostic: "Sein inflammatoire (mastite/abcès vs cancer inflammatoire)", arguments: [{ label: "sein rouge, chaud, gonflé", w: 3, when: { q: "mm_inflammatoire", eq: true } }],
        examens_a_discuter: ["Mastite d'allaitement : antibiothérapie + poursuite de l'allaitement/drainage", "Si hors allaitement ou pas d'amélioration sous antibiotiques : imagerie + biopsie (cancer inflammatoire)"] },
      { id: "mm_benin", diagnostic: "Lésion bénigne (kyste / adénofibrome)", arguments: [{ label: "masse mobile, variant avec le cycle", w: 3, when: { q: "mm_kyste", eq: true } }],
        examens_a_discuter: ["Échographie (± mammographie selon l'âge) ; cytoponction d'un kyste symptomatique ; surveillance"] }
    ],
    examens_clinique: ["Palpation des seins et des aires ganglionnaires (axillaires, sus-claviculaires)", "Caractériser la masse (taille, mobilité, consistance), examiner peau et mamelon (rétraction, Paget)", "Imagerie selon l'âge (échographie avant 30 ans, mammographie + échographie après) ; biopsie si suspicion"]
  },

  // -------------------------------------------------------------------------
  // SOPK / HIRSUTISME
  // -------------------------------------------------------------------------
  sopk: {
    id: "sopk", symptome: "Pilosité excessive / SOPK", specialite: ["Endocrinologie", "Gynécologie"],
    questions: [
      { id: "so2_brutal", label: "Hyperandrogénie tumorale", type: "boolean", question: "La pilosité / les signes masculins sont-ils apparus rapidement et de façon marquée (voix grave, masse) ?" },
      { id: "so2_triade", label: "Triade SOPK", type: "boolean", question: "Avez-vous des règles espacées/absentes, une pilosité excessive, et/ou de l'acné ?" },
      { id: "so2_metabolique", label: "Syndrome métabolique", type: "boolean", question: "Avez-vous un surpoids ou des anomalies du sucre (prédiabète/diabète) ?" },
      { id: "so2_infertilite", label: "Infertilité", type: "boolean", question: "Avez-vous des difficultés à concevoir ?" },
      { id: "so2_amenorrhee", label: "Aménorrhée prolongée", type: "boolean", question: "Passez-vous de longues périodes (plusieurs mois) sans règles ?" }
    ],
    red_flags: [
      { id: "so2_rf_tumeur", niveau: 2, when: { q: "so2_brutal", eq: true },
        message_medecin: "Hyperandrogénie d'installation rapide / sévère (virilisation : voix grave, clitoromégalie) : éliminer une cause TUMORALE (ovaire, surrénale) → testostérone (élevée), imagerie ; ce n'est pas un SOPK.",
        message_patient: "Une pilosité d'apparition rapide nécessite un avis médical et un bilan." },
      { id: "so2_rf_endometre", niveau: 1, when: { q: "so2_amenorrhee", eq: true },
        message_medecin: "Aménorrhée/spanioménorrhée prolongée du SOPK : l'anovulation chronique expose à l'hyperplasie et au cancer de l'endomètre → assurer une protection endométriale (progestatif cyclique ou contraception), surveiller.",
        message_patient: "Des règles très espacées au long cours doivent être suivies médicalement." }
    ],
    diagnostics_differentiels: [
      { id: "so2_sopk", diagnostic: "Syndrome des ovaires polykystiques", arguments: [{ label: "cycles espacés + hyperandrogénie", w: 3, when: { q: "so2_triade", eq: true } }, { label: "syndrome métabolique", w: 1, when: { q: "so2_metabolique", eq: true } }, { label: "infertilité", w: 1, when: { q: "so2_infertilite", eq: true } }],
        examens_a_discuter: ["Diagnostic de Rotterdam (2 critères sur 3 : oligo-anovulation, hyperandrogénie clinique/biologique, aspect échographique d'ovaires polykystiques) APRÈS exclusion des autres causes", "Bilan : testostérone, SDHEA, 17-OH-progestérone, prolactine, TSH ; échographie ovarienne", "Bilan métabolique (HGPO/glycémie, lipides) ; mode de vie ; protection endométriale ; prise en charge de l'infertilité si désir de grossesse"] },
      { id: "so2_autres", diagnostic: "Autres causes d'hyperandrogénie / d'aménorrhée (à éliminer)", arguments: [{ label: "à exclure avant de retenir un SOPK", w: 1, when: { q: "so2_triade", eq: true } }],
        examens_a_discuter: ["Hyperplasie congénitale des surrénales à révélation tardive (17-OH-progestérone), hyperprolactinémie, dysthyroïdie, syndrome de Cushing", "Orienter selon les anomalies"] },
      { id: "so2_tumeur", diagnostic: "Hyperandrogénie tumorale", arguments: [{ label: "installation rapide / sévère", w: 3, when: { q: "so2_brutal", eq: true } }],
        examens_a_discuter: ["Testostérone (très élevée), SDHEA, imagerie surrénale/ovarienne"] }
    ],
    examens_clinique: ["Recherche de signes d'hyperandrogénie (score de Ferriman-Gallwey) et de virilisation", "IMC, tour de taille, pression artérielle (syndrome métabolique)", "Bilan hormonal (testostérone, SDHEA, 17-OHP, prolactine, TSH)", "Échographie pelvienne, bilan métabolique (glycémie/HGPO, lipides)"]
  },

  // -------------------------------------------------------------------------
  // SUIVI DE GROSSESSE
  // -------------------------------------------------------------------------
  suivi_grossesse: {
    id: "suivi_grossesse", symptome: "Suivi de grossesse", specialite: ["Obstétrique"], urgence: true,
    questions: [
      { id: "sg2_alerte", label: "Signe d'alerte", type: "boolean", question: "Avez-vous un signe d'alerte : saignement, perte de liquide, contractions douloureuses, fièvre, maux de tête/troubles visuels, ou diminution des mouvements du bébé ?" },
      { id: "sg2_terme", label: "Terme", type: "single_choice", question: "À quel stade ?", options: ["1er trimestre", "2e trimestre", "3e trimestre"] },
      { id: "sg2_routine", label: "Suivi de routine", type: "boolean", question: "S'agit-il d'un suivi de routine, sans symptôme ?" },
      { id: "sg2_immunite", label: "Statut immunitaire", type: "boolean", question: "Votre statut toxoplasmose / rubéole est-il NON immun (ou inconnu) ?" },
      { id: "sg2_contage", label: "Fièvre / éruption / contage", type: "boolean", question: "Avez-vous eu de la fièvre, une éruption, ou un contact avec une personne ayant une maladie éruptive (ou un jeune enfant malade) ?" }
    ],
    red_flags: [
      { id: "sg2_rf_alerte", niveau: 3, when: { q: "sg2_alerte", eq: true },
        message_medecin: "Signe d'alerte pendant la grossesse (saignement, perte de liquide, contractions, fièvre, signes de pré-éclampsie, baisse des mouvements) : avis obstétrical sans délai.",
        message_patient: "Ces signes nécessitent de contacter la maternité sans attendre." },
      { id: "sg2_rf_fievre_eruption", niveau: 2, when: { q: "sg2_contage", eq: true },
        message_medecin: "Fièvre/éruption ou contage maternel : évoquer une embryofœtopathie infectieuse → sérologies (toxoplasmose, rubéole, CMV, parvovirus B19, varicelle si contage), avis obstétrical. Toute fièvre isolée = penser à la listériose (hémocultures, β-lactamine).",
        message_patient: "Une fièvre ou une éruption pendant la grossesse doit être signalée rapidement pour des examens." }
    ],
    diagnostics_differentiels: [
      { id: "sg2_normal", diagnostic: "Grossesse normale (suivi)", arguments: [{ label: "suivi de routine sans symptôme", w: 3, when: { q: "sg2_routine", eq: true } }],
        examens_a_discuter: ["Suivi recommandé : consultations, échographies, biologie et dépistages selon le terme"] },
      { id: "sg2_prevention_infx", diagnostic: "Prévention des fœtopathies infectieuses", arguments: [{ label: "statut toxoplasmose/rubéole non immun ou inconnu", w: 2, when: { q: "sg2_immunite", eq: true } }],
        examens_a_discuter: ["Toxoplasmose non immune : sérologie mensuelle + mesures hygiéno-diététiques (viande bien cuite, lavage fruits/légumes, éviter litière du chat)", "Rubéole non immune : éviter les contages, vaccination en post-partum (vaccin vivant contre-indiqué pendant la grossesse)", "CMV : mesures d'hygiène (lavage des mains après contact avec urines/larmes/sécrétions des jeunes enfants, ne pas partager couverts) — divisent le risque par 4", "Listériose : éviter fromages au lait cru, charcuterie, produits de la mer crus"] },
      { id: "sg2_dd_alerte", diagnostic: "Situation d'alerte", arguments: [{ label: "présence d'un signe d'alerte", w: 3, when: { q: "sg2_alerte", eq: true } }],
        examens_a_discuter: ["Orientation vers la maternité"] }
    ],
    examens_clinique: ["Pression artérielle, bandelette urinaire (protéinurie, glycosurie)", "Hauteur utérine, bruits du cœur fœtal selon le terme", "Sérologies réglementaires : toxoplasmose et rubéole (mensuelles si non immune), syphilis (TPHA-VDRL), Ag HBs, VIH proposé ; groupe-Rhésus-RAI", "Orientation vers le suivi recommandé"]
  },

  // -------------------------------------------------------------------------
  // ARTHROSE
  // -------------------------------------------------------------------------
  arthrose: {
    id: "arthrose", symptome: "Arthrose / douleur articulaire mécanique", specialite: ["Rhumatologie"], urgence: true,
    questions: [
      { id: "ar2_fievre", label: "Arthrite septique", type: "boolean", question: "Y a-t-il une articulation chaude et très douloureuse avec de la fièvre ?" },
      { id: "ar2_inflammatoire", label: "Rhumatisme inflammatoire", type: "boolean", question: "Y a-t-il une raideur matinale prolongée (> 30 min), un gonflement, ou plusieurs articulations atteintes ?" },
      { id: "ar2_mecanique", label: "Douleur mécanique", type: "boolean", question: "La douleur est-elle déclenchée par l'effort/la marche et calmée par le repos, sur une articulation (genou, hanche, main) ?" },
      { id: "ar2_blocage", label: "Blocage / instabilité", type: "boolean", question: "Y a-t-il un blocage articulaire, une instabilité, ou un épanchement important ?" },
      { id: "ar2_cristaux", label: "Crise microcristalline", type: "boolean", question: "Avez-vous eu une crise aiguë très douloureuse, rouge et chaude (gros orteil, genou), apparue en quelques heures et régressive ?" },
      { id: "ar2_periarticulaire", label: "Douleur péri-articulaire", type: "boolean", question: "La douleur est-elle localisée à un point précis (tendon, à côté de l'articulation) et réveillée par un mouvement particulier, sans gonflement de l'articulation ?" }
    ],
    red_flags: [
      { id: "ar2_rf_septique", niveau: 3, when: { q: "ar2_fievre", eq: true },
        message_medecin: "Articulation chaude + fièvre : arthrite septique à éliminer en URGENCE (voir fiche arthrite) → ponction articulaire avant toute antibiothérapie. Une monoarthrite aiguë fébrile est septique jusqu'à preuve du contraire.",
        message_patient: "Une articulation chaude et douloureuse avec fièvre nécessite une évaluation médicale immédiate." },
      { id: "ar2_rf_inflammatoire", niveau: 2, when: { q: "ar2_inflammatoire", eq: true },
        message_medecin: "Caractères inflammatoires (raideur matinale > 30 min, gonflement, polyarticulaire) : évoquer un rhumatisme inflammatoire (voir fiche arthrite) plutôt qu'une arthrose → VS/CRP, avis rhumatologique.",
        message_patient: "Ces caractéristiques nécessitent un avis médical." }
    ],
    diagnostics_differentiels: [
      { id: "ar2_arthrose", diagnostic: "Arthrose", arguments: [{ label: "douleur mécanique", w: 3, when: { q: "ar2_mecanique", eq: true } }, { label: "blocage / épanchement", w: 1, when: { q: "ar2_blocage", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique pour une gonarthrose/coxarthrose typique ; radiographie (pincement, ostéophytes, en charge) utile mais non systématique", "Traitement : activité physique adaptée et perte de poids (genou/hanche) en 1re ligne, antalgiques, AINS topiques ; pas de corrélation stricte douleur–radiographie"] },
      { id: "ar2_microcristalline", diagnostic: "Arthropathie microcristalline (goutte, chondrocalcinose)", arguments: [{ label: "crise aiguë rouge/chaude régressive", w: 3, when: { q: "ar2_cristaux", eq: true } }],
        examens_a_discuter: ["Ponction articulaire (cristaux d'urate ou de pyrophosphate) — élimine aussi une arthrite septique", "Uricémie (à distance de la crise), radiographie (liseré de chondrocalcinose)", "Colchicine/AINS en crise ; hypo-uricémiant à distance dans la goutte"] },
      { id: "ar2_periarticulaire", diagnostic: "Atteinte péri-articulaire (tendinopathie, bursite)", arguments: [{ label: "douleur localisée, mouvement contrarié, sans épanchement", w: 3, when: { q: "ar2_periarticulaire", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique (palpation, manœuvres tendineuses) ; échographie si doute", "Repos relatif, AINS topiques, rééducation"] },
      { id: "ar2_inflammatoire", diagnostic: "Cause inflammatoire / septique (voir arthrite)", arguments: [{ label: "caractères inflammatoires", w: 2, when: { q: "ar2_inflammatoire", eq: true } }, { label: "fièvre", w: 2, when: { q: "ar2_fievre", eq: true } }],
        examens_a_discuter: ["Voir fiche arthrite (VS/CRP, ponction)"] }
    ],
    examens_clinique: ["Examen articulaire (mobilité, épanchement, chaleur, déformation, douleur à la palpation)", "Distinguer douleur articulaire vraie vs péri-articulaire (tendon/bourse)", "Radiographie en charge si besoin (genou/hanche)", "Recherche de signes inflammatoires/généraux"]
  },

  // -------------------------------------------------------------------------
  // FIBROMYALGIE / DOULEURS DIFFUSES
  // -------------------------------------------------------------------------
  fibromyalgie: {
    id: "fibromyalgie", symptome: "Douleurs diffuses chroniques / fibromyalgie", specialite: ["Rhumatologie"],
    questions: [
      { id: "fi_organique", label: "Signes d'alarme", type: "boolean", question: "Y a-t-il des signes d'alarme : fièvre, amaigrissement, gonflement articulaire, faiblesse musculaire vraie, anomalies biologiques ?" },
      { id: "fi_diffus", label: "Tableau typique", type: "boolean", question: "Avez-vous des douleurs diffuses chroniques (plus de 3 mois), avec fatigue, sommeil non réparateur et troubles de la concentration (« brouillard ») ?" },
      { id: "fi_thyroide", label: "Hypothyroïdie / statine", type: "boolean", question: "Avez-vous des signes d'hypothyroïdie, ou prenez-vous une statine ?" },
      { id: "fi_ppr", label: "Pseudopolyarthrite", type: "boolean", question: "Avez-vous plus de 50 ans, avec des douleurs et une raideur des épaules et des hanches (ceintures), prédominant le matin, d'apparition récente ?" }
    ],
    red_flags: [
      { id: "fi_rf_organique", niveau: 2, when: { q: "fi_organique", eq: true },
        message_medecin: "Signes d'alarme : éliminer une cause organique (inflammatoire, endocrinienne, musculaire, néoplasique) avant de retenir une fibromyalgie.",
        message_patient: "Ces signes nécessitent un bilan médical." },
      { id: "fi_rf_ppr", niveau: 2, when: { q: "fi_ppr", eq: true },
        message_medecin: "Sujet > 50 ans, douleurs/raideur des ceintures d'apparition récente : évoquer une pseudopolyarthrite rhizomélique (VS/CRP élevées) — NE PAS étiqueter fibromyalgie. Rechercher des signes de maladie de Horton associée (céphalées, signes visuels, claudication de la mâchoire) = urgence (corticothérapie, risque de cécité).",
        message_patient: "Après 50 ans, des douleurs récentes des épaules/hanches nécessitent un bilan rapide." }
    ],
    diagnostics_differentiels: [
      { id: "fi_fibromyalgie", diagnostic: "Fibromyalgie", arguments: [{ label: "douleurs diffuses > 3 mois + fatigue + sommeil + cognition", w: 3, when: { q: "fi_diffus", eq: true } }],
        examens_a_discuter: ["Diagnostic clinique positif (douleurs diffuses + symptômes associés), après élimination raisonnable de l'organique — éviter la surenchère d'examens", "Prise en charge globale : éducation, activité physique adaptée régulière (pierre angulaire), TCC, traitement du sommeil ; antalgiques de palier 1"] },
      { id: "fi_ppr", diagnostic: "Pseudopolyarthrite rhizomélique / Horton", arguments: [{ label: "douleurs des ceintures > 50 ans", w: 3, when: { q: "fi_ppr", eq: true } }],
        examens_a_discuter: ["VS/CRP (syndrome inflammatoire franc)", "Corticothérapie ; avis spécialisé ; biopsie d'artère temporale si suspicion de Horton"] },
      { id: "fi_organique", diagnostic: "Cause organique à éliminer", arguments: [{ label: "signes d'alarme", w: 3, when: { q: "fi_organique", eq: true } }, { label: "hypothyroïdie / statine", w: 1, when: { q: "fi_thyroide", eq: true } }],
        examens_a_discuter: ["VS/CRP, TSH, CPK, calcémie, glycémie selon le contexte", "Myalgies sous statine : doser les CPK, réévaluer le traitement"] }
    ],
    examens_clinique: ["Examen général et articulaire (absence de synovite vraie dans la fibromyalgie)", "Recherche de signes d'alarme et de douleurs des ceintures (> 50 ans)", "Bilan de débrouillage limité (VS/CRP, TSH, CPK) — un bilan normal soutient le diagnostic positif"]
  },

  // -------------------------------------------------------------------------
  // OSTÉOPOROSE
  // -------------------------------------------------------------------------
  osteoporose: {
    id: "osteoporose", symptome: "Ostéoporose / fracture de fragilité", specialite: ["Rhumatologie", "Endocrinologie"],
    questions: [
      { id: "os_fracture", label: "Fracture de fragilité", type: "boolean", question: "Avez-vous eu une fracture pour un traumatisme mineur (chute de sa hauteur), notamment poignet, hanche, ou un tassement vertébral ?" },
      { id: "os_dos", label: "Tassement vertébral", type: "boolean", question: "Avez-vous une douleur dorsale aiguë ou une perte de taille ?" },
      { id: "os_facteurs", label: "Facteurs de risque", type: "boolean", question: "Avez-vous des facteurs de risque (ménopause, corticothérapie prolongée, antécédents familiaux, faible poids, tabac/alcool) ?" },
      { id: "os_secondaire", label: "Cause secondaire", type: "boolean", question: "Y a-t-il une cause secondaire possible (hyperthyroïdie, hyperparathyroïdie, malabsorption) ?" },
      { id: "os_drapeau", label: "Drapeau rouge tumoral", type: "boolean", question: "Le tassement/la douleur s'accompagne-t-il d'altération de l'état général, de douleur permanente y compris la nuit/au repos, d'un cancer connu, ou de signes neurologiques (faiblesse/troubles sphinctériens) ?" }
    ],
    red_flags: [
      { id: "os_rf_neuro", niveau: 3, when: { q: "os_drapeau", eq: true },
        message_medecin: "Tassement vertébral avec drapeaux rouges (AEG, douleur nocturne/permanente, cancer connu, signes neurologiques) : évoquer une fracture MALIGNE (métastase, myélome) ou une compression médullaire → imagerie (IRM) en urgence, ne pas étiqueter « ostéoporose » d'emblée.",
        message_patient: "Ces signes nécessitent une évaluation médicale rapide et une imagerie." },
      { id: "os_rf_fracture", niveau: 2, when: { any: [{ q: "os_fracture", eq: true }, { q: "os_dos", eq: true }] },
        message_medecin: "Fracture de fragilité / tassement vertébral : confirmer (imagerie), bilan d'ostéoporose, traitement (une fracture de fragilité justifie souvent un traitement même sans DXA effondrée), prévention des chutes.",
        message_patient: "Une fracture pour un choc mineur nécessite un avis médical et un bilan." }
    ],
    diagnostics_differentiels: [
      { id: "os_osteoporose", diagnostic: "Ostéoporose", arguments: [{ label: "facteurs de risque", w: 2, when: { q: "os_facteurs", eq: true } }, { label: "fracture de fragilité", w: 2, when: { q: "os_fracture", eq: true } }],
        examens_a_discuter: ["Ostéodensitométrie (T-score ≤ -2,5) ; score FRAX pour le risque fracturaire", "Bilan phosphocalcique, 25-OH-vitamine D ; supplémentation calcium/vitamine D, traitement anti-ostéoporotique (bisphosphonates…), activité physique"] },
      { id: "os_maligne", diagnostic: "Fracture pathologique maligne (métastase, myélome)", arguments: [{ label: "drapeaux rouges (AEG, douleur nocturne, cancer, neuro)", w: 3, when: { q: "os_drapeau", eq: true } }],
        examens_a_discuter: ["IRM rachidienne ; recherche d'un primitif ; EPP/immunofixation, calcémie (myélome)", "Avis spécialisé urgent si signes neurologiques"] },
      { id: "os_secondaire", diagnostic: "Ostéoporose secondaire", arguments: [{ label: "cause secondaire possible", w: 3, when: { q: "os_secondaire", eq: true } }],
        examens_a_discuter: ["Bilan étiologique (TSH, PTH, calcium, vitamine D, cortisol, testostérone, etc.)", "Penser à l'ostéoporose cortisonique (corticothérapie ≥ 3 mois)"] }
    ],
    examens_clinique: ["Taille / poids (perte de taille ≥ 3-4 cm)", "Recherche d'un tassement et de drapeaux rouges (douleur nocturne, AEG, neuro)", "Facteurs de risque (ménopause, corticoïdes, antécédent familial, IMC bas, tabac/alcool)", "Ostéodensitométrie, bilan phosphocalcique, évaluation du risque de chute"]
  },

  // -------------------------------------------------------------------------
  // DÉSHYDRATATION
  // -------------------------------------------------------------------------
  deshydratation: {
    id: "deshydratation", symptome: "Déshydratation", specialite: ["Médecine générale", "Gériatrie"], urgence: true,
    questions: [
      { id: "de2_choc", label: "Signes de gravité", type: "boolean", question: "Y a-t-il des signes de gravité : malaise/tension basse en se levant, confusion, marbrures, cœur rapide ?" },
      { id: "de2_terrain", label: "Terrain à risque", type: "boolean", question: "S'agit-il d'un nourrisson ou d'une personne âgée ?" },
      { id: "de2_pertes", label: "Pertes importantes", type: "boolean", question: "Y a-t-il des pertes importantes (diarrhée, vomissements, fièvre, forte chaleur, diabète déséquilibré) ?" },
      { id: "de2_clinique", label: "Signes cliniques", type: "boolean", question: "Y a-t-il une soif intense, une bouche sèche, des urines rares/foncées, un pli cutané ?" }
    ],
    red_flags: [
      { id: "de2_rf_grave", niveau: 3, when: { any: [{ q: "de2_choc", eq: true }, { all: [{ q: "de2_terrain", eq: true }, { q: "de2_pertes", eq: true }] }] },
        message_medecin: "Déshydratation sévère / signes de choc (ou nourrisson / sujet âgé avec pertes) : urgence (réhydratation, parfois IV).",
        message_patient: "Ces signes nécessitent une évaluation médicale rapide." }
    ],
    diagnostics_differentiels: [
      { id: "de2_deshy", diagnostic: "Déshydratation", arguments: [{ label: "signes cliniques de déshydratation", w: 3, when: { q: "de2_clinique", eq: true } }, { label: "pertes importantes", w: 1, when: { q: "de2_pertes", eq: true } }],
        examens_a_discuter: ["Réhydratation : soluté de réhydratation orale (SRO) chez le nourrisson/personne âgée (ne pas donner que de l'eau pure) ; voie IV si échec/sévérité", "Traiter la cause ; ionogramme, créatinine, glycémie capillaire si sévère"] },
      { id: "de2_grave", diagnostic: "Déshydratation grave", arguments: [{ label: "signes de choc", w: 3, when: { q: "de2_choc", eq: true } }, { label: "terrain à risque", w: 1, when: { q: "de2_terrain", eq: true } }],
        examens_a_discuter: ["Hospitalisation, réhydratation IV ; rechercher une décompensation diabétique (coma hyperosmolaire/acidocétose : glycémie, cétonurie) et une hypernatrémie chez le sujet âgé"] }
    ],
    examens_clinique: ["Pression artérielle couché/debout, fréquence cardiaque", "Pli cutané, état des muqueuses, poids (référence)", "Diurèse, glycémie capillaire", "Ionogramme (natrémie), créatinine si sévère"]
  },

  // -------------------------------------------------------------------------
  // CARENCES NUTRITIONNELLES
  // -------------------------------------------------------------------------
  carences: {
    id: "carences", symptome: "Carence (fer, B12, vitamine D)", specialite: ["Nutrition", "Hématologie"],
    questions: [
      { id: "ca2_martiale", label: "Carence martiale", type: "boolean", question: "Êtes-vous pâle/fatigué, avec une carence en fer connue ou des saignements (règles abondantes, digestif) ?" },
      { id: "ca2_b12", label: "Carence B12", type: "boolean", question: "Avez-vous des fourmillements, des troubles de l'équilibre/de la mémoire, ou un régime végétalien ?" },
      { id: "ca2_vitd", label: "Carence vitamine D", type: "boolean", question: "Avez-vous peu d'exposition au soleil, des douleurs osseuses/musculaires diffuses ?" },
      { id: "ca2_digestif", label: "Malabsorption", type: "boolean", question: "Avez-vous une maladie digestive (cœliaque, MICI, chirurgie), un alcoolisme, ou une dénutrition ?" }
    ],
    red_flags: [
      { id: "ca2_rf_digestive", niveau: 2, when: { q: "ca2_digestif", eq: true },
        message_medecin: "Carences / contexte de malabsorption : bilan global, rechercher la cause (cœliaque, MICI, dénutrition).",
        message_patient: "Ce contexte nécessite un bilan médical." },
      { id: "ca2_rf_b12", niveau: 2, when: { q: "ca2_b12", eq: true },
        message_medecin: "Carence en B12 avec signes neurologiques : corriger sans retard (risque de séquelles), rechercher la cause (Biermer, régime, malabsorption).",
        message_patient: "Ces signes nécessitent un avis médical et un dosage." }
    ],
    diagnostics_differentiels: [
      { id: "ca2_martiale", diagnostic: "Carence martiale", arguments: [{ label: "pâleur / fer bas / saignements", w: 3, when: { q: "ca2_martiale", eq: true } }],
        examens_a_discuter: ["Ferritine, bilan martial", "CHERCHER le saignement (voir anémie)"] },
      { id: "ca2_b12", diagnostic: "Carence en B12 / folates", arguments: [{ label: "signes neuro / régime", w: 3, when: { q: "ca2_b12", eq: true } }],
        examens_a_discuter: ["B12, folates, recherche de la cause"] },
      { id: "ca2_vitd", diagnostic: "Carence en vitamine D", arguments: [{ label: "peu de soleil / douleurs diffuses", w: 3, when: { q: "ca2_vitd", eq: true } }],
        examens_a_discuter: ["25-OH vitamine D, supplémentation"] },
      { id: "ca2_malabsorption", diagnostic: "Malabsorption / dénutrition", arguments: [{ label: "contexte digestif / dénutrition", w: 3, when: { q: "ca2_digestif", eq: true } }],
        examens_a_discuter: ["Bilan nutritionnel, sérologie cœliaque"] }
    ],
    examens_clinique: ["Poids / IMC, pâleur", "Examen neurologique (B12)", "Bilan ciblé (ferritine, B12/folates, vitamine D, calcémie)"]
  }
};
