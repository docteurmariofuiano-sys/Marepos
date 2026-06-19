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
        message_patient: "Un ganglion volumineux et durable mérite un avis médical pour exploration." }
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
                    { label: "ganglion fixé", w: 1, when: { q: "ad_fixe", eq: true } }],
        examens_a_discuter: ["NFS-plaquettes, LDH", "Sérologies VIH/EBV/CMV/toxoplasmose", "Biopsie ganglionnaire (exérèse)"] },
      { id: "ad_metastase", diagnostic: "Métastase ganglionnaire",
        arguments: [{ label: "ganglion dur et fixé", w: 3, when: { q: "ad_fixe", eq: true } },
                    { label: "tabac/alcool (si cervical)", w: 1, when: { all: [{ q: "ad_tabac", eq: true }, { q: "ad_loc", eq: "Cou" }] } }],
        examens_a_discuter: ["Examen ORL complet (si cervical)", "Recherche du primitif", "Biopsie"] },
      { id: "ad_infectieux", diagnostic: "Causes infectieuses générales (MNI, toxo, VIH, BK)",
        arguments: [{ label: "fièvre", w: 2, when: { q: "ad_fievre", eq: true } }],
        examens_a_discuter: ["MNI-test / sérologies", "Sérologie VIH", "IDR / test IGRA si suspicion tuberculose"] }
    ],
    examens_clinique: [
      "Palpation de TOUTES les aires ganglionnaires",
      "Caractérisation : taille, consistance, mobilité, sensibilité",
      "Examen ORL si adénopathie cervicale",
      "Palpation hépatique et splénique",
      "Recherche de la porte d'entrée dans le territoire de drainage"
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
  }
};
