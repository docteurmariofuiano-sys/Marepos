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
      { l: "Fièvre", f: "fievre_adulte" }, { l: "Fatigue / asthénie", f: "asthenie" }, { l: "Malaise", f: "malaise_pc" },
      { l: "Vertiges", f: "vertige" }, { l: "Perte de poids", f: "asthenie" }, { l: "Sueurs nocturnes", f: "hyperhidrose" },
      { l: "Frissons" }, { l: "Douleurs diffuses" }, { l: "Courbatures", f: "crampes" },
      { l: "Altération de l'état général", f: "asthenie" }, { l: "Déshydratation" },
      { l: "Chute chez la personne âgée", f: "chute_personne_agee" }, { l: "Confusion aiguë", f: "confusion" }, { l: "Somnolence inhabituelle" },
      { l: "Anxiété aiguë / crise de panique", f: "anxiete" }, { l: "Demande de certificat médical" },
      { l: "Renouvellement d'ordonnance" }, { l: "Bilan biologique perturbé", b: "anemie" },
      { l: "Effet indésirable médicamenteux" }
    ],
    urgences: []
  },
  {
    n: 2, titre: "ORL / infectieux", icone: "👂",
    frequents: [
      { l: "Mal de gorge", f: "angine" }, { l: "Angine", f: "angine" }, { l: "Rhinopharyngite", f: "rhinopharyngite" }, { l: "Rhume", f: "rhinopharyngite" },
      { l: "Nez bouché", f: "rhinopharyngite" }, { l: "Écoulement nasal", f: "rhinopharyngite" }, { l: "Toux", f: "toux_aigue" }, { l: "Otalgie", f: "otite" }, { l: "Otite", f: "otite" },
      { l: "Baisse d'audition", f: "baisse_audition" }, { l: "Bouchon de cérumen", f: "baisse_audition" }, { l: "Acouphènes", f: "acouphene" },
      { l: "Vertiges positionnels", f: "vertige" }, { l: "Sinusite", f: "sinusite" }, { l: "Douleur faciale", f: "algie_faciale" },
      { l: "Épistaxis", f: "epistaxis" }, { l: "Aphonie / dysphonie", f: "dysphonie" },
      { l: "Ganglion cervical", f: "adenopathie" }, { l: "Plaie buccale / aphte", f: "aphte" },
      { l: "Douleur dentaire", f: "douleur_dentaire" }, { l: "Infection dentaire", f: "douleur_dentaire" }, { l: "Fièvre avec symptômes ORL" }
    ],
    urgences: [
      { l: "Dyspnée laryngée", f: "dysphonie" }, { l: "Stridor" }, { l: "Épistaxis abondante", f: "epistaxis" },
      { l: "Abcès amygdalien" }, { l: "Corps étranger ORL" }, { l: "Traumatisme facial" },
      { l: "Vertige aigu invalidant" }, { l: "Paralysie faciale périphérique", f: "paralysie_faciale" }, { l: "Surdité brutale", f: "acouphene" }
    ]
  },
  {
    n: 3, titre: "Respiratoire / thoracique", icone: "🫁",
    frequents: [
      { l: "Toux aiguë", f: "toux_aigue" }, { l: "Toux chronique", f: "toux_chronique" }, { l: "Essoufflement", f: "dyspnee_chronique" },
      { l: "Dyspnée d'effort", f: "dyspnee_chronique" }, { l: "Sifflements respiratoires", f: "dyspnee_chronique" },
      { l: "Crise d'asthme", f: "dyspnee_aigue" }, { l: "Bronchite", f: "pneumonie" }, { l: "Pneumonie suspectée", f: "pneumonie" },
      { l: "Douleur thoracique", f: "douleur_thoracique" }, { l: "Oppression thoracique", f: "douleur_thoracique" },
      { l: "Exacerbation BPCO", f: "dyspnee_chronique" }, { l: "Hémoptysie", f: "hemoptysie" },
      { l: "Suspicion COVID / grippe", f: "syndrome_grippal" }, { l: "Apnée du sommeil (ronflements, somnolence, pauses)", f: "apnee_sommeil" }
    ],
    urgences: [
      { l: "Dyspnée aiguë", f: "dyspnee_aigue" }, { l: "Saturation basse", f: "dyspnee_aigue" },
      { l: "Douleur thoracique constrictive", f: "douleur_thoracique" }, { l: "Suspicion embolie pulmonaire", f: "douleur_thoracique" },
      { l: "Pneumothorax", f: "dyspnee_aigue" }, { l: "Crise d'asthme sévère", f: "dyspnee_aigue" },
      { l: "Œdème aigu pulmonaire", f: "dyspnee_aigue" }, { l: "Hémoptysie abondante", f: "hemoptysie" },
      { l: "Sepsis respiratoire", f: "pneumonie" }
    ]
  },
  {
    n: 4, titre: "Cardiovasculaire", icone: "❤️",
    frequents: [
      { l: "Palpitations", f: "palpitations" }, { l: "Douleur thoracique atypique", f: "douleur_thoracique" }, { l: "HTA découverte", f: "hta" },
      { l: "Poussée hypertensive", f: "hta" }, { l: "Œdèmes des jambes", f: "oedemes" }, { l: "Douleur de mollet", f: "douleur_mi" },
      { l: "Varices", f: "varices" }, { l: "Malaise vagal", f: "malaise_pc" }, { l: "Lipothymie", f: "malaise_pc" },
      { l: "Syncope", f: "malaise_pc" }, { l: "Essoufflement à l'effort", f: "dyspnee_chronique" },
      { l: "Suivi insuffisance cardiaque" }, { l: "Suivi anticoagulant" }, { l: "Anomalie ECG" }
    ],
    urgences: [
      { l: "Syndrome coronarien aigu", f: "douleur_thoracique" }, { l: "Trouble du rythme mal toléré", f: "malaise_pc" },
      { l: "Syncope inexpliquée", f: "malaise_pc" }, { l: "AVC / AIT", f: "deficit_neuro" },
      { l: "Embolie pulmonaire", f: "douleur_thoracique" }, { l: "Thrombose veineuse profonde", f: "douleur_mi" },
      { l: "Dissection aortique", f: "douleur_thoracique" }, { l: "Poussée hypertensive compliquée", f: "hta" },
      { l: "Décompensation cardiaque aiguë", f: "dyspnee_aigue" }
    ]
  },
  {
    n: 5, titre: "Digestif", icone: "🩻",
    frequents: [
      { l: "Douleur abdominale", f: "douleur_abdominale" }, { l: "Nausées", f: "nausees_vomissements" }, { l: "Vomissements", f: "nausees_vomissements" }, { l: "Diarrhée aiguë", f: "diarrhee_aigue" },
      { l: "Constipation", f: "constipation" }, { l: "Reflux gastro-œsophagien", f: "rgo" }, { l: "Douleur épigastrique", f: "dyspepsie" },
      { l: "Ballonnements", f: "dyspepsie" }, { l: "Troubles du transit", f: "diarrhee_chronique" }, { l: "Rectorragies", f: "rectorragie" },
      { l: "Hémorroïdes", f: "rectorragie" }, { l: "Fissure anale", f: "rectorragie" }, { l: "Sang dans les selles", f: "hematemese_melena" },
      { l: "Perte d'appétit", f: "asthenie" }, { l: "Dysphagie", f: "dysphagie" }, { l: "Ictère", f: "ictere" },
      { l: "Colique hépatique", f: "douleur_abdominale" }, { l: "Suspicion gastro-entérite", f: "diarrhee_aigue" },
      { l: "Intolérance alimentaire", f: "dyspepsie" }, { l: "Douleur post-prandiale", f: "dyspepsie" }
    ],
    urgences: [
      { l: "Abdomen aigu", f: "douleur_abdominale" }, { l: "Appendicite", f: "douleur_abdominale" }, { l: "Cholécystite", f: "douleur_abdominale" }, { l: "Pancréatite" },
      { l: "Occlusion intestinale", f: "constipation" }, { l: "Hémorragie digestive", f: "hematemese_melena" },
      { l: "Vomissements incoercibles", f: "nausees_vomissements" }, { l: "Déshydratation sévère", f: "diarrhee_aigue" }, { l: "Péritonite" },
      { l: "Douleur abdominale du sujet âgé", f: "douleur_abdominale" }, { l: "Suspicion ischémie mésentérique" }
    ]
  },
  {
    n: 6, titre: "Urologie / néphrologie", icone: "🚽",
    frequents: [
      { l: "Brûlures urinaires", f: "cystite" }, { l: "Pollakiurie" }, { l: "Cystite", f: "cystite" }, { l: "Douleur lombaire", f: "lombalgie" },
      { l: "Colique néphrétique", f: "hematurie" }, { l: "Hématurie", f: "hematurie" }, { l: "Incontinence urinaire", f: "incontinence_urinaire" },
      { l: "Rétention urinaire", f: "retention_urinaire" }, { l: "Trouble de l'érection", f: "difficultes_sexuelles" }, { l: "Douleur testiculaire", f: "grosse_bourse" },
      { l: "Infection urinaire récidivante", f: "cystite" }, { l: "Prostatite", f: "prostatite" }, { l: "Bilan rénal perturbé", b: "hyperkaliemie" },
      { l: "Œdèmes", f: "oedemes" }, { l: "Protéinurie", b: "hyperkaliemie" }, { l: "Sang dans le sperme", f: "hemospermie" }
    ],
    urgences: [
      { l: "Pyélonéphrite fébrile", f: "cystite" }, { l: "Colique néphrétique hyperalgique", f: "hematurie" }, { l: "Anurie", f: "retention_urinaire" },
      { l: "Rétention aiguë d'urine", f: "retention_urinaire" }, { l: "Hématurie avec caillots", f: "hematurie" },
      { l: "Torsion testiculaire", f: "grosse_bourse" }, { l: "Insuffisance rénale aiguë", b: "hyperkaliemie" }, { l: "Sepsis urinaire" }
    ]
  },
  {
    n: 7, titre: "Gynécologie / obstétrique", icone: "🤰",
    frequents: [
      { l: "Douleurs pelviennes", f: "algie_pelvienne" }, { l: "Saignements gynécologiques", f: "metrorragies" }, { l: "Retard de règles" },
      { l: "Contraception", f: "contraception" }, { l: "Suivi grossesse", f: "suivi_grossesse" }, { l: "Nausées de grossesse", f: "nausees_grossesse" }, { l: "Mycose vaginale", f: "leucorrhees" },
      { l: "Leucorrhées", f: "leucorrhees" }, { l: "Douleur mammaire", f: "galactorrhee" }, { l: "Masse mammaire", f: "masse_mammaire" },
      { l: "Infection urinaire chez la femme enceinte", f: "cystite" }, { l: "Ménopause", f: "bouffees_chaleur" }, { l: "Bouffées de chaleur", f: "bouffees_chaleur" },
      { l: "Trouble du cycle", f: "trouble_cycle" }, { l: "Dysménorrhée", f: "dysmenorrhee" }, { l: "Dyspareunie", f: "dysmenorrhee" },
      { l: "Demande d'IVG", f: "contraception" }, { l: "Dépistage IST", f: "ecoulement_uretral" }
    ],
    urgences: [
      { l: "Grossesse extra-utérine", f: "algie_pelvienne" }, { l: "Métrorragies abondantes", f: "metrorragies" }, { l: "Douleur pelvienne aiguë", f: "algie_pelvienne" },
      { l: "Torsion d'annexe", f: "algie_pelvienne" }, { l: "Fausse couche", f: "fausse_couche" }, { l: "Fièvre en post-partum", f: "fievre_postpartum" },
      { l: "Pré-éclampsie suspectée", f: "preeclampsie" }, { l: "Diminution des mouvements fœtaux", f: "diminution_mvt_foetaux" }, { l: "Douleur abdominale chez la femme enceinte", f: "fausse_couche" },
      { l: "Infection pelvienne sévère", f: "algie_pelvienne" }
    ]
  },
  {
    n: 8, titre: "Dermatologie", icone: "🧴",
    frequents: [
      { l: "Éruption cutanée", f: "eruption_urticaire" }, { l: "Urticaire", f: "eruption_urticaire" }, { l: "Eczéma", f: "eczema" }, { l: "Psoriasis", f: "psoriasis" }, { l: "Acné", f: "acne" },
      { l: "Mycose cutanée", f: "mycose_cutanee" }, { l: "Intertrigo", f: "mycose_cutanee" }, { l: "Zona", f: "zona" }, { l: "Herpès", f: "herpes" }, { l: "Impétigo", f: "impetigo" },
      { l: "Érysipèle", f: "grosse_jambe_rouge" }, { l: "Abcès", f: "abces_cutane" }, { l: "Plaie infectée", f: "plaie" }, { l: "Piqûre d'insecte", f: "piqure_insecte" },
      { l: "Prurit", f: "eruption_urticaire" }, { l: "Chute de cheveux", f: "alopecie" }, { l: "Ongle incarné" }, { l: "Verrue" },
      { l: "Grain de beauté suspect", f: "grain_beaute" }, { l: "Surveillance nævus", f: "grain_beaute" },
      { l: "Lésion pigmentée", f: "grain_beaute" }, { l: "Kyste cutané" }, { l: "Brûlure", f: "brulure" }
    ],
    urgences: [
      { l: "Urticaire avec angio-œdème", f: "eruption_urticaire" }, { l: "Anaphylaxie", f: "eruption_urticaire" }, { l: "Érysipèle fébrile", f: "grosse_jambe_rouge" },
      { l: "Fasciite nécrosante suspectée", f: "grosse_jambe_rouge" }, { l: "Purpura fébrile", f: "eruption_urticaire" },
      { l: "Stevens-Johnson / Lyell suspecté", f: "eruption_urticaire" }, { l: "Brûlure étendue", f: "brulure" }, { l: "Morsure infectée", f: "plaie" },
      { l: "Abcès profond", f: "abces_cutane" }, { l: "Cellulite orbitaire", f: "orgelet_chalazion" }
    ]
  },
  {
    n: 9, titre: "Neurologie", icone: "🧠",
    frequents: [
      { l: "Céphalée", f: "cephalee" }, { l: "Migraine", f: "cephalee" }, { l: "Vertiges", f: "vertige" },
      { l: "Troubles de l'équilibre" }, { l: "Paresthésies", f: "paresthesies" }, { l: "Douleur neuropathique", f: "paresthesies" }, { l: "Tremblements", f: "tremblements" },
      { l: "Troubles de la mémoire", f: "troubles_memoire" }, { l: "Troubles du sommeil", f: "insomnie" }, { l: "Sciatique", f: "lombalgie" },
      { l: "Cervicalgie avec irradiation", f: "cervicalgie" }, { l: "Névralgie faciale", f: "algie_faciale" },
      { l: "Paralysie faciale périphérique", f: "paralysie_faciale" }, { l: "Syndrome des jambes sans repos" }, { l: "Malaise", f: "malaise_pc" },
      { l: "Épilepsie connue", f: "epilepsie" }, { l: "Suivi post-AVC" }
    ],
    urgences: [
      { l: "AVC / AIT", f: "deficit_neuro" }, { l: "Céphalée brutale « coup de tonnerre »", f: "cephalee" },
      { l: "Crise convulsive", f: "epilepsie" }, { l: "Déficit neurologique brutal", f: "deficit_neuro" },
      { l: "Confusion aiguë", f: "confusion" }, { l: "Méningite suspectée", f: "cervicalgie" }, { l: "Traumatisme crânien", f: "traumatisme_cranien" },
      { l: "Compression médullaire", f: "lombalgie" }, { l: "Guillain-Barré suspecté" }, { l: "Vertige aigu avec signes neurologiques", f: "deficit_neuro" }
    ]
  },
  {
    n: 10, titre: "Rhumatologie / traumatologie", icone: "🦴",
    frequents: [
      { l: "Lombalgie", f: "lombalgie" }, { l: "Cervicalgie", f: "cervicalgie" }, { l: "Dorsalgie", f: "dorsalgie" },
      { l: "Sciatique", f: "lombalgie" }, { l: "Douleur d'épaule", f: "douleur_ms" }, { l: "Tendinite" },
      { l: "Douleur de genou", f: "douleur_mi" }, { l: "Entorse", f: "traumatisme_membre" }, { l: "Douleur de hanche", f: "douleur_mi" },
      { l: "Arthrose" }, { l: "Gonalgie", f: "douleur_mi" }, { l: "Douleur du poignet", f: "douleur_ms" },
      { l: "Syndrome du canal carpien", f: "douleur_ms" }, { l: "Crise de goutte", f: "arthrite" }, { l: "Douleurs articulaires inflammatoires", f: "arthrite" },
      { l: "Fibromyalgie" }, { l: "Chute sans gravité apparente", f: "chute_personne_agee" }, { l: "Plaie simple", f: "plaie" }, { l: "Contusion", f: "traumatisme_membre" },
      { l: "Fracture suspectée", f: "traumatisme_membre" }
    ],
    urgences: [
      { l: "Fracture", f: "traumatisme_membre" }, { l: "Luxation", f: "traumatisme_membre" }, { l: "Plaie profonde", f: "plaie" }, { l: "Traumatisme crânien", f: "traumatisme_cranien" },
      { l: "Traumatisme thoracique ou abdominal" }, { l: "Chute chez la personne âgée", f: "chute_personne_agee" },
      { l: "Douleur rachidienne avec déficit", f: "lombalgie" }, { l: "Syndrome de la queue de cheval", f: "lombalgie" },
      { l: "Arthrite septique", f: "arthrite" }, { l: "Ischémie aiguë de membre", f: "douleur_mi" }, { l: "Accident de la voie publique" }
    ]
  },
  {
    n: 11, titre: "Pédiatrie", icone: "🧒",
    frequents: [
      { l: "Fièvre de l'enfant", f: "fievre_enfant" }, { l: "Toux", f: "toux_aigue" }, { l: "Rhinopharyngite", f: "rhinopharyngite" }, { l: "Otite", f: "otite" }, { l: "Angine", f: "angine" },
      { l: "Gastro-entérite", f: "diarrhee_aigue" }, { l: "Vomissements", f: "nausees_vomissements" }, { l: "Diarrhée", f: "diarrhee_aigue" },
      { l: "Éruption cutanée", f: "eruption_urticaire" }, { l: "Varicelle", f: "varicelle" }, { l: "Bronchiolite", f: "bronchiolite" }, { l: "Asthme de l'enfant", f: "asthme_enfant" },
      { l: "Douleur abdominale", f: "douleur_abdominale" }, { l: "Constipation", f: "constipation" }, { l: "Pleurs du nourrisson", f: "pleurs_nourrisson" },
      { l: "Troubles du sommeil", f: "insomnie" }, { l: "Retard de langage" }, { l: "Troubles du comportement" },
      { l: "Difficultés scolaires" }, { l: "Vaccination" }, { l: "Certificat sport" }, { l: "Suivi de croissance" },
      { l: "Suspicion infection urinaire", f: "cystite" }
    ],
    urgences: [
      { l: "Fièvre du nourrisson < 3 mois" }, { l: "Détresse respiratoire", f: "dyspnee_aigue" }, { l: "Bronchiolite sévère", f: "bronchiolite" },
      { l: "Déshydratation" }, { l: "Convulsion fébrile", f: "convulsion_febrile" }, { l: "Purpura fébrile", f: "eruption_urticaire" }, { l: "Traumatisme crânien", f: "traumatisme_cranien" },
      { l: "Douleur abdominale aiguë", f: "douleur_abdominale" }, { l: "Boiterie fébrile", f: "boiterie_enfant" }, { l: "Ingestion toxique", f: "ingestion_toxique" },
      { l: "Corps étranger inhalé ou ingéré", f: "ingestion_toxique" }, { l: "Maltraitance suspectée" }
    ]
  },
  {
    n: 12, titre: "Psychiatrie / santé mentale", icone: "🧩",
    frequents: [
      { l: "Anxiété", f: "anxiete" }, { l: "Crise d'angoisse", f: "anxiete" }, { l: "Dépression", f: "depression" }, { l: "Burn-out", f: "depression" }, { l: "Insomnie", f: "insomnie" },
      { l: "Stress professionnel", f: "depression" }, { l: "Trouble de l'adaptation", f: "depression" }, { l: "Deuil", f: "depression" }, { l: "Irritabilité", f: "depression" },
      { l: "Trouble alimentaire", f: "trouble_alimentaire" }, { l: "Addiction alcool", f: "sevrage_alcool" }, { l: "Addiction cannabis", f: "conduite_addictive" }, { l: "Sevrage tabagique", f: "conduite_addictive" },
      { l: "Trouble du comportement de l'adolescent" }, { l: "Demande d'arrêt de travail" }, { l: "Idées noires", f: "anxiete" },
      { l: "Effet indésirable d'un psychotrope" }
    ],
    urgences: [
      { l: "Risque suicidaire", f: "anxiete" }, { l: "Tentative de suicide", f: "depression" }, { l: "Agitation aiguë", f: "agitation" }, { l: "Bouffée délirante", f: "agitation" },
      { l: "Confusion", f: "confusion" }, { l: "Sevrage alcoolique sévère", f: "sevrage_alcool" }, { l: "Intoxication médicamenteuse", f: "ingestion_toxique" },
      { l: "Mise en danger de soi ou d'autrui", f: "agitation" }
    ]
  },
  {
    n: 13, titre: "Endocrino / métabolique", icone: "⚗️",
    frequents: [
      { l: "Diabète déséquilibré", b: "hyperglycemie" }, { l: "Hypoglycémies", f: "hypoglycemie" }, { l: "Hyperglycémie", b: "hyperglycemie" },
      { l: "Découverte de diabète", b: "hyperglycemie" }, { l: "Obésité", f: "obesite" }, { l: "Perte de poids", f: "asthenie" },
      { l: "Prise de poids", f: "obesite" }, { l: "Dyslipidémie", b: "dyslipidemie" }, { l: "Trouble thyroïdien", f: "goitre" },
      { l: "Nodule thyroïdien", f: "goitre" }, { l: "Fatigue inexpliquée", f: "asthenie" }, { l: "SOPK", f: "sopk" },
      { l: "Hirsutisme", f: "sopk" }, { l: "Aménorrhée", f: "trouble_cycle" }, { l: "Ostéoporose" }, { l: "Carence en vitamine D" },
      { l: "Carence en B12", b: "anemie" }, { l: "Anémie", b: "anemie" }, { l: "Hyperferritinémie", b: "cytolyse" }
    ],
    urgences: [
      { l: "Acidocétose diabétique", b: "hyperglycemie" }, { l: "Hyperglycémie sévère avec déshydratation", b: "hyperglycemie" },
      { l: "Hypoglycémie sévère", f: "hypoglycemie" }, { l: "Crise thyréotoxique", f: "goitre" }, { l: "Insuffisance surrénale aiguë", f: "asthenie" },
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
      { l: "Œil rouge", f: "oeil_rouge" }, { l: "Conjonctivite", f: "conjonctivite" }, { l: "Douleur oculaire" }, { l: "Baisse de vision" },
      { l: "Corps étranger oculaire", f: "corps_etranger_oeil" }, { l: "Orgelet", f: "orgelet_chalazion" }, { l: "Chalazion", f: "orgelet_chalazion" }, { l: "Sécheresse oculaire", f: "secheresse_oculaire" },
      { l: "Traumatisme oculaire léger" }, { l: "Vision floue", f: "diplopie" }, { l: "Céphalée avec gêne visuelle", f: "algie_faciale" }
    ],
    urgences: [
      { l: "Baisse brutale de vision", f: "diplopie" }, { l: "Douleur oculaire intense" }, { l: "Glaucome aigu" },
      { l: "Kératite" }, { l: "Traumatisme oculaire" }, { l: "Corps étranger métallique", f: "corps_etranger_oeil" }, { l: "Brûlure chimique", f: "corps_etranger_oeil" },
      { l: "Décollement de rétine suspecté" }, { l: "Diplopie aiguë", f: "diplopie" }, { l: "Œil rouge douloureux chez porteur de lentilles", f: "oeil_rouge" }
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
      { l: "Dépistage diabète", b: "hyperglycemie" }, { l: "Dépistage HTA" }, { l: "Dépistage apnée du sommeil", f: "apnee_sommeil" },
      { l: "Suivi de la personne âgée" }, { l: "Évaluation de l'autonomie" }, { l: "Prévention des chutes" },
      { l: "Conseil nutritionnel" }, { l: "Sevrage tabagique", f: "conduite_addictive" }
    ],
    urgences: []
  }
];
