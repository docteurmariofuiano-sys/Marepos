/* ============================================================================
 * CATALOGUE DES MOTIFS DE CONSULTATION — 16 catégories (médecine générale).
 * Colonne vertébrale de navigation. Chaque motif peut être relié à :
 *   f = clé d'une fiche décisionnelle (window.KB, parcours patient→médecin)
 *   b = id d'une fiche d'interprétation biologique (window.BIOKB)
 * Sinon = entrée « référence » (à approfondir, sources : Manuel du Généraliste,
 * Médecine Générale pour le Praticien, fiches dermato CESU — Drive du Dr Fuiano).
 *
 * Format : { n, titre, icone, frequents:[motif], urgences:[motif] }
 *   motif : { l:libellé, f?:ficheClinique, b?:ficheBio }
 * ========================================================================== */
window.MOTIFS = [
  {
    n: 1, titre: "Motifs généraux très fréquents", icone: "🩺",
    frequents: [
      { l: "Fièvre" }, { l: "Fatigue / asthénie", f: "asthenie" }, { l: "Malaise", f: "malaise_pc" },
      { l: "Vertiges" }, { l: "Perte de poids", f: "asthenie" }, { l: "Sueurs nocturnes", f: "hyperhidrose" },
      { l: "Frissons" }, { l: "Douleurs diffuses" }, { l: "Courbatures", f: "crampes" },
      { l: "Altération de l'état général", f: "asthenie" }, { l: "Déshydratation" },
      { l: "Chute chez la personne âgée" }, { l: "Confusion aiguë" }, { l: "Somnolence inhabituelle" },
      { l: "Anxiété aiguë / crise de panique" }, { l: "Demande de certificat médical" },
      { l: "Renouvellement d'ordonnance" }, { l: "Bilan biologique perturbé", b: "anemie" },
      { l: "Effet indésirable médicamenteux" }
    ],
    urgences: []
  },
  {
    n: 2, titre: "ORL / infectieux", icone: "👂",
    frequents: [
      { l: "Mal de gorge" }, { l: "Angine" }, { l: "Rhinopharyngite" }, { l: "Rhume" },
      { l: "Nez bouché" }, { l: "Écoulement nasal" }, { l: "Toux" }, { l: "Otalgie" }, { l: "Otite" },
      { l: "Baisse d'audition" }, { l: "Bouchon de cérumen" }, { l: "Acouphènes", f: "acouphene" },
      { l: "Vertiges positionnels" }, { l: "Sinusite" }, { l: "Douleur faciale", f: "algie_faciale" },
      { l: "Épistaxis", f: "epistaxis" }, { l: "Aphonie / dysphonie", f: "dysphonie" },
      { l: "Ganglion cervical", f: "adenopathie" }, { l: "Plaie buccale / aphte" },
      { l: "Douleur dentaire" }, { l: "Infection dentaire" }, { l: "Fièvre avec symptômes ORL" }
    ],
    urgences: [
      { l: "Dyspnée laryngée", f: "dysphonie" }, { l: "Stridor" }, { l: "Épistaxis abondante", f: "epistaxis" },
      { l: "Abcès amygdalien" }, { l: "Corps étranger ORL" }, { l: "Traumatisme facial" },
      { l: "Vertige aigu invalidant" }, { l: "Paralysie faciale périphérique" }, { l: "Surdité brutale", f: "acouphene" }
    ]
  },
  {
    n: 3, titre: "Respiratoire / thoracique", icone: "🫁",
    frequents: [
      { l: "Toux aiguë" }, { l: "Toux chronique" }, { l: "Essoufflement", f: "dyspnee_chronique" },
      { l: "Dyspnée d'effort", f: "dyspnee_chronique" }, { l: "Sifflements respiratoires", f: "dyspnee_chronique" },
      { l: "Crise d'asthme", f: "dyspnee_aigue" }, { l: "Bronchite" }, { l: "Pneumonie suspectée" },
      { l: "Douleur thoracique", f: "douleur_thoracique" }, { l: "Oppression thoracique", f: "douleur_thoracique" },
      { l: "Exacerbation BPCO", f: "dyspnee_chronique" }, { l: "Hémoptysie", f: "hemoptysie" },
      { l: "Suspicion COVID / grippe" }, { l: "Apnée du sommeil (ronflements, somnolence, pauses)" }
    ],
    urgences: [
      { l: "Dyspnée aiguë", f: "dyspnee_aigue" }, { l: "Saturation basse", f: "dyspnee_aigue" },
      { l: "Douleur thoracique constrictive", f: "douleur_thoracique" }, { l: "Suspicion embolie pulmonaire", f: "douleur_thoracique" },
      { l: "Pneumothorax", f: "dyspnee_aigue" }, { l: "Crise d'asthme sévère", f: "dyspnee_aigue" },
      { l: "Œdème aigu pulmonaire", f: "dyspnee_aigue" }, { l: "Hémoptysie abondante", f: "hemoptysie" },
      { l: "Sepsis respiratoire" }
    ]
  },
  {
    n: 4, titre: "Cardiovasculaire", icone: "❤️",
    frequents: [
      { l: "Palpitations" }, { l: "Douleur thoracique atypique", f: "douleur_thoracique" }, { l: "HTA découverte" },
      { l: "Poussée hypertensive" }, { l: "Œdèmes des jambes", f: "dyspnee_chronique" }, { l: "Douleur de mollet", f: "douleur_mi" },
      { l: "Varices" }, { l: "Malaise vagal", f: "malaise_pc" }, { l: "Lipothymie", f: "malaise_pc" },
      { l: "Syncope", f: "malaise_pc" }, { l: "Essoufflement à l'effort", f: "dyspnee_chronique" },
      { l: "Suivi insuffisance cardiaque" }, { l: "Suivi anticoagulant" }, { l: "Anomalie ECG" }
    ],
    urgences: [
      { l: "Syndrome coronarien aigu", f: "douleur_thoracique" }, { l: "Trouble du rythme mal toléré", f: "malaise_pc" },
      { l: "Syncope inexpliquée", f: "malaise_pc" }, { l: "AVC / AIT", f: "deficit_neuro" },
      { l: "Embolie pulmonaire", f: "douleur_thoracique" }, { l: "Thrombose veineuse profonde", f: "douleur_mi" },
      { l: "Dissection aortique", f: "douleur_thoracique" }, { l: "Poussée hypertensive compliquée" },
      { l: "Décompensation cardiaque aiguë", f: "dyspnee_aigue" }
    ]
  },
  {
    n: 5, titre: "Digestif", icone: "🩻",
    frequents: [
      { l: "Douleur abdominale" }, { l: "Nausées" }, { l: "Vomissements" }, { l: "Diarrhée aiguë", f: "diarrhee_aigue" },
      { l: "Constipation", f: "constipation" }, { l: "Reflux gastro-œsophagien" }, { l: "Douleur épigastrique" },
      { l: "Ballonnements" }, { l: "Troubles du transit", f: "diarrhee_chronique" }, { l: "Rectorragies" },
      { l: "Hémorroïdes" }, { l: "Fissure anale" }, { l: "Sang dans les selles", f: "hematemese_melena" },
      { l: "Perte d'appétit", f: "asthenie" }, { l: "Dysphagie" }, { l: "Ictère", f: "hepatomegalie" },
      { l: "Colique hépatique" }, { l: "Suspicion gastro-entérite", f: "diarrhee_aigue" },
      { l: "Intolérance alimentaire" }, { l: "Douleur post-prandiale" }
    ],
    urgences: [
      { l: "Abdomen aigu" }, { l: "Appendicite" }, { l: "Cholécystite" }, { l: "Pancréatite" },
      { l: "Occlusion intestinale", f: "constipation" }, { l: "Hémorragie digestive", f: "hematemese_melena" },
      { l: "Vomissements incoercibles" }, { l: "Déshydratation sévère", f: "diarrhee_aigue" }, { l: "Péritonite" },
      { l: "Douleur abdominale du sujet âgé" }, { l: "Suspicion ischémie mésentérique" }
    ]
  },
  {
    n: 6, titre: "Urologie / néphrologie", icone: "🚽",
    frequents: [
      { l: "Brûlures urinaires" }, { l: "Pollakiurie" }, { l: "Cystite" }, { l: "Douleur lombaire", f: "lombalgie" },
      { l: "Colique néphrétique", f: "hematurie" }, { l: "Hématurie", f: "hematurie" }, { l: "Incontinence urinaire" },
      { l: "Rétention urinaire" }, { l: "Trouble de l'érection", f: "difficultes_sexuelles" }, { l: "Douleur testiculaire", f: "grosse_bourse" },
      { l: "Infection urinaire récidivante" }, { l: "Prostatite" }, { l: "Bilan rénal perturbé", b: "hyperkaliemie" },
      { l: "Œdèmes" }, { l: "Protéinurie", b: "hyperkaliemie" }, { l: "Sang dans le sperme", f: "hemospermie" }
    ],
    urgences: [
      { l: "Pyélonéphrite fébrile" }, { l: "Colique néphrétique hyperalgique", f: "hematurie" }, { l: "Anurie" },
      { l: "Rétention aiguë d'urine" }, { l: "Hématurie avec caillots", f: "hematurie" },
      { l: "Torsion testiculaire", f: "grosse_bourse" }, { l: "Insuffisance rénale aiguë", b: "hyperkaliemie" }, { l: "Sepsis urinaire" }
    ]
  },
  {
    n: 7, titre: "Gynécologie / obstétrique", icone: "🤰",
    frequents: [
      { l: "Douleurs pelviennes", f: "algie_pelvienne" }, { l: "Saignements gynécologiques" }, { l: "Retard de règles" },
      { l: "Contraception" }, { l: "Suivi grossesse" }, { l: "Nausées de grossesse" }, { l: "Mycose vaginale", f: "leucorrhees" },
      { l: "Leucorrhées", f: "leucorrhees" }, { l: "Douleur mammaire", f: "galactorrhee" }, { l: "Masse mammaire", f: "galactorrhee" },
      { l: "Infection urinaire chez la femme enceinte" }, { l: "Ménopause", f: "bouffees_chaleur" }, { l: "Bouffées de chaleur", f: "bouffees_chaleur" },
      { l: "Trouble du cycle" }, { l: "Dysménorrhée", f: "dysmenorrhee" }, { l: "Dyspareunie", f: "dysmenorrhee" },
      { l: "Demande d'IVG" }, { l: "Dépistage IST", f: "ecoulement_uretral" }
    ],
    urgences: [
      { l: "Grossesse extra-utérine", f: "algie_pelvienne" }, { l: "Métrorragies abondantes" }, { l: "Douleur pelvienne aiguë", f: "algie_pelvienne" },
      { l: "Torsion d'annexe", f: "algie_pelvienne" }, { l: "Fausse couche" }, { l: "Fièvre en post-partum" },
      { l: "Pré-éclampsie suspectée" }, { l: "Diminution des mouvements fœtaux" }, { l: "Douleur abdominale chez la femme enceinte" },
      { l: "Infection pelvienne sévère", f: "algie_pelvienne" }
    ]
  },
  {
    n: 8, titre: "Dermatologie", icone: "🧴",
    frequents: [
      { l: "Éruption cutanée" }, { l: "Urticaire" }, { l: "Eczéma" }, { l: "Psoriasis" }, { l: "Acné" },
      { l: "Mycose cutanée" }, { l: "Intertrigo" }, { l: "Zona" }, { l: "Herpès" }, { l: "Impétigo" },
      { l: "Érysipèle", f: "grosse_jambe_rouge" }, { l: "Abcès" }, { l: "Plaie infectée" }, { l: "Piqûre d'insecte" },
      { l: "Prurit" }, { l: "Chute de cheveux", f: "alopecie" }, { l: "Ongle incarné" }, { l: "Verrue" },
      { l: "Grain de beauté suspect", f: "grain_beaute" }, { l: "Surveillance nævus", f: "grain_beaute" },
      { l: "Lésion pigmentée", f: "grain_beaute" }, { l: "Kyste cutané" }, { l: "Brûlure" }
    ],
    urgences: [
      { l: "Urticaire avec angio-œdème" }, { l: "Anaphylaxie" }, { l: "Érysipèle fébrile", f: "grosse_jambe_rouge" },
      { l: "Fasciite nécrosante suspectée", f: "grosse_jambe_rouge" }, { l: "Purpura fébrile" },
      { l: "Stevens-Johnson / Lyell suspecté" }, { l: "Brûlure étendue" }, { l: "Morsure infectée" },
      { l: "Abcès profond" }, { l: "Cellulite orbitaire" }
    ]
  },
  {
    n: 9, titre: "Neurologie", icone: "🧠",
    frequents: [
      { l: "Céphalée", f: "algie_faciale" }, { l: "Migraine", f: "algie_faciale" }, { l: "Vertiges" },
      { l: "Troubles de l'équilibre" }, { l: "Paresthésies" }, { l: "Douleur neuropathique" }, { l: "Tremblements" },
      { l: "Troubles de la mémoire" }, { l: "Troubles du sommeil" }, { l: "Sciatique", f: "lombalgie" },
      { l: "Cervicalgie avec irradiation", f: "cervicalgie" }, { l: "Névralgie faciale", f: "algie_faciale" },
      { l: "Paralysie faciale périphérique" }, { l: "Syndrome des jambes sans repos" }, { l: "Malaise", f: "malaise_pc" },
      { l: "Épilepsie connue" }, { l: "Suivi post-AVC" }
    ],
    urgences: [
      { l: "AVC / AIT", f: "deficit_neuro" }, { l: "Céphalée brutale « coup de tonnerre »", f: "algie_faciale" },
      { l: "Crise convulsive", f: "malaise_pc" }, { l: "Déficit neurologique brutal", f: "deficit_neuro" },
      { l: "Confusion aiguë" }, { l: "Méningite suspectée", f: "cervicalgie" }, { l: "Traumatisme crânien" },
      { l: "Compression médullaire", f: "lombalgie" }, { l: "Guillain-Barré suspecté" }, { l: "Vertige aigu avec signes neurologiques", f: "deficit_neuro" }
    ]
  },
  {
    n: 10, titre: "Rhumatologie / traumatologie", icone: "🦴",
    frequents: [
      { l: "Lombalgie", f: "lombalgie" }, { l: "Cervicalgie", f: "cervicalgie" }, { l: "Dorsalgie", f: "dorsalgie" },
      { l: "Sciatique", f: "lombalgie" }, { l: "Douleur d'épaule", f: "douleur_ms" }, { l: "Tendinite" },
      { l: "Douleur de genou", f: "douleur_mi" }, { l: "Entorse" }, { l: "Douleur de hanche", f: "douleur_mi" },
      { l: "Arthrose" }, { l: "Gonalgie", f: "douleur_mi" }, { l: "Douleur du poignet", f: "douleur_ms" },
      { l: "Syndrome du canal carpien", f: "douleur_ms" }, { l: "Crise de goutte" }, { l: "Douleurs articulaires inflammatoires" },
      { l: "Fibromyalgie" }, { l: "Chute sans gravité apparente" }, { l: "Plaie simple" }, { l: "Contusion" },
      { l: "Fracture suspectée" }
    ],
    urgences: [
      { l: "Fracture" }, { l: "Luxation" }, { l: "Plaie profonde" }, { l: "Traumatisme crânien" },
      { l: "Traumatisme thoracique ou abdominal" }, { l: "Chute chez la personne âgée" },
      { l: "Douleur rachidienne avec déficit", f: "lombalgie" }, { l: "Syndrome de la queue de cheval", f: "lombalgie" },
      { l: "Arthrite septique" }, { l: "Ischémie aiguë de membre", f: "douleur_mi" }, { l: "Accident de la voie publique" }
    ]
  },
  {
    n: 11, titre: "Pédiatrie", icone: "🧒",
    frequents: [
      { l: "Fièvre de l'enfant" }, { l: "Toux" }, { l: "Rhinopharyngite" }, { l: "Otite" }, { l: "Angine" },
      { l: "Gastro-entérite", f: "diarrhee_aigue" }, { l: "Vomissements" }, { l: "Diarrhée", f: "diarrhee_aigue" },
      { l: "Éruption cutanée" }, { l: "Varicelle" }, { l: "Bronchiolite" }, { l: "Asthme de l'enfant" },
      { l: "Douleur abdominale" }, { l: "Constipation", f: "constipation" }, { l: "Pleurs du nourrisson" },
      { l: "Troubles du sommeil" }, { l: "Retard de langage" }, { l: "Troubles du comportement" },
      { l: "Difficultés scolaires" }, { l: "Vaccination" }, { l: "Certificat sport" }, { l: "Suivi de croissance" },
      { l: "Suspicion infection urinaire" }
    ],
    urgences: [
      { l: "Fièvre du nourrisson < 3 mois" }, { l: "Détresse respiratoire", f: "dyspnee_aigue" }, { l: "Bronchiolite sévère" },
      { l: "Déshydratation" }, { l: "Convulsion fébrile" }, { l: "Purpura fébrile" }, { l: "Traumatisme crânien" },
      { l: "Douleur abdominale aiguë" }, { l: "Boiterie fébrile" }, { l: "Ingestion toxique" },
      { l: "Corps étranger inhalé ou ingéré" }, { l: "Maltraitance suspectée" }
    ]
  },
  {
    n: 12, titre: "Psychiatrie / santé mentale", icone: "🧩",
    frequents: [
      { l: "Anxiété" }, { l: "Crise d'angoisse" }, { l: "Dépression" }, { l: "Burn-out" }, { l: "Insomnie" },
      { l: "Stress professionnel" }, { l: "Trouble de l'adaptation" }, { l: "Deuil" }, { l: "Irritabilité" },
      { l: "Trouble alimentaire" }, { l: "Addiction alcool" }, { l: "Addiction cannabis" }, { l: "Sevrage tabagique" },
      { l: "Trouble du comportement de l'adolescent" }, { l: "Demande d'arrêt de travail" }, { l: "Idées noires" },
      { l: "Effet indésirable d'un psychotrope" }
    ],
    urgences: [
      { l: "Risque suicidaire" }, { l: "Tentative de suicide" }, { l: "Agitation aiguë" }, { l: "Bouffée délirante" },
      { l: "Confusion" }, { l: "Sevrage alcoolique sévère" }, { l: "Intoxication médicamenteuse" },
      { l: "Mise en danger de soi ou d'autrui" }
    ]
  },
  {
    n: 13, titre: "Endocrino / métabolique", icone: "⚗️",
    frequents: [
      { l: "Diabète déséquilibré", b: "hyperglycemie" }, { l: "Hypoglycémies" }, { l: "Hyperglycémie", b: "hyperglycemie" },
      { l: "Découverte de diabète", b: "hyperglycemie" }, { l: "Obésité" }, { l: "Perte de poids", f: "asthenie" },
      { l: "Prise de poids" }, { l: "Dyslipidémie", b: "dyslipidemie" }, { l: "Trouble thyroïdien", f: "goitre" },
      { l: "Nodule thyroïdien", f: "goitre" }, { l: "Fatigue inexpliquée", f: "asthenie" }, { l: "SOPK" },
      { l: "Hirsutisme" }, { l: "Aménorrhée", f: "galactorrhee" }, { l: "Ostéoporose" }, { l: "Carence en vitamine D" },
      { l: "Carence en B12", b: "anemie" }, { l: "Anémie", b: "anemie" }, { l: "Hyperferritinémie", b: "cytolyse" }
    ],
    urgences: [
      { l: "Acidocétose diabétique", b: "hyperglycemie" }, { l: "Hyperglycémie sévère avec déshydratation", b: "hyperglycemie" },
      { l: "Hypoglycémie sévère" }, { l: "Crise thyréotoxique", f: "goitre" }, { l: "Insuffisance surrénale aiguë", f: "asthenie" },
      { l: "Hypercalcémie symptomatique", b: "hypercalcemie" }, { l: "Hyponatrémie sévère", b: "hyponatremie" }
    ]
  },
  {
    n: 14, titre: "Hématologie / infectieux systémique", icone: "🩸",
    frequents: [
      { l: "Anémie", b: "anemie" }, { l: "Leucopénie", b: "inversion_formule" }, { l: "Thrombopénie", b: "ts_hemostase_primaire" },
      { l: "Hyperleucocytose", b: "inversion_formule" }, { l: "Syndrome inflammatoire", b: "electrophorese" },
      { l: "Fièvre prolongée", f: "fievre_tropiques" }, { l: "Adénopathies", f: "adenopathie" }, { l: "Splénomégalie" },
      { l: "Hématomes faciles", b: "ts_hemostase_primaire" }, { l: "Fatigue avec pâleur", b: "anemie" },
      { l: "Bilan hépatique perturbé", b: "cytolyse" }, { l: "Ferritine élevée", b: "cytolyse" },
      { l: "Carence martiale", b: "anemie" }, { l: "Infection récidivante", b: "electrophorese" }
    ],
    urgences: [
      { l: "Neutropénie fébrile" }, { l: "Purpura extensif" }, { l: "Anémie sévère symptomatique", b: "anemie" },
      { l: "Thrombopénie profonde", b: "ts_hemostase_primaire" }, { l: "Sepsis" }, { l: "Méningococcémie suspectée" },
      { l: "Syndrome hémorragique", b: "tp_bas" }, { l: "Complication de chimiothérapie" }
    ]
  },
  {
    n: 15, titre: "Ophtalmologie", icone: "👁️",
    frequents: [
      { l: "Œil rouge" }, { l: "Conjonctivite" }, { l: "Douleur oculaire" }, { l: "Baisse de vision" },
      { l: "Corps étranger oculaire" }, { l: "Orgelet" }, { l: "Chalazion" }, { l: "Sécheresse oculaire" },
      { l: "Traumatisme oculaire léger" }, { l: "Vision floue", f: "diplopie" }, { l: "Céphalée avec gêne visuelle", f: "algie_faciale" }
    ],
    urgences: [
      { l: "Baisse brutale de vision", f: "diplopie" }, { l: "Douleur oculaire intense" }, { l: "Glaucome aigu" },
      { l: "Kératite" }, { l: "Traumatisme oculaire" }, { l: "Corps étranger métallique" }, { l: "Brûlure chimique" },
      { l: "Décollement de rétine suspecté" }, { l: "Diplopie aiguë", f: "diplopie" }, { l: "Œil rouge douloureux chez porteur de lentilles" }
    ]
  },
  {
    n: 16, titre: "Administratif / prévention", icone: "📋",
    frequents: [
      { l: "Certificat médical" }, { l: "Certificat sport" }, { l: "Arrêt de travail" }, { l: "Accident de travail" },
      { l: "Reconnaissance ALD" }, { l: "Dossier MDPH" }, { l: "PAI scolaire" }, { l: "Contre-indication au voyage" },
      { l: "Certificat d'aptitude / inaptitude" }, { l: "Renouvellement de traitement chronique" }, { l: "Bilan annuel" },
      { l: "Vaccination" }, { l: "Dépistage cancer colorectal", f: "constipation" }, { l: "Frottis / HPV" },
      { l: "Dépistage IST", f: "ecoulement_uretral" }, { l: "Dépistage cardiovasculaire", b: "dyslipidemie" },
      { l: "Dépistage diabète", b: "hyperglycemie" }, { l: "Dépistage HTA" }, { l: "Dépistage apnée du sommeil" },
      { l: "Suivi de la personne âgée" }, { l: "Évaluation de l'autonomie" }, { l: "Prévention des chutes" },
      { l: "Conseil nutritionnel" }, { l: "Sevrage tabagique" }
    ],
    urgences: []
  }
];
