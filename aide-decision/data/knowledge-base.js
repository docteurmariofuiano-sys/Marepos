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
  }
};
