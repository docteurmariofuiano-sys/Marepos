/* ============================================================================
 * Données de référence : allergies et antécédents (médicaux / chirurgicaux),
 * regroupés par spécialité. Utilisé par le module « Informations patient ».
 * ========================================================================== */
window.ANTECEDENTS = {
  allergies: [
    "Pénicilline / amoxicilline", "Céphalosporines", "Macrolides", "AINS",
    "Aspirine", "Iode / produit de contraste iodé", "Gadolinium", "Latex",
    "Anesthésiques locaux", "Morphine / opioïdes", "Sulfamides", "Antiseptiques",
    "Nickel", "Allergies alimentaires", "Allergies aux vaccins", "Autre allergie"
  ],

  medicaux: [
    { groupe: "Métabolique / endocrinologie", items: [
      "Diabète de type 1", "Diabète de type 2", "Diabète gestationnel", "Dyslipidémie",
      "Hypercholestérolémie", "Hypertriglycéridémie", "Obésité", "Surpoids",
      "Hypothyroïdie", "Hyperthyroïdie", "Thyroïdite", "Nodules thyroïdiens", "Goitre",
      "Maladie de Basedow", "Hyperparathyroïdie", "Ostéoporose", "Goutte",
      "Syndrome des ovaires polykystiques"
    ] },
    { groupe: "Cardiologie / vasculaire", items: [
      "Hypertension artérielle", "Insuffisance cardiaque", "Infarctus du myocarde",
      "Angor / maladie coronarienne", "Trouble du rythme cardiaque", "Fibrillation auriculaire",
      "Pacemaker", "Défibrillateur implantable", "Valvulopathie", "Souffle cardiaque",
      "Cardiomyopathie", "AVC", "AIT", "Artériopathie des membres inférieurs",
      "Phlébite / thrombose veineuse profonde", "Embolie pulmonaire", "Varices",
      "Anévrisme de l'aorte"
    ] },
    { groupe: "Pneumologie / sommeil", items: [
      "Asthme", "BPCO", "Emphysème", "Bronchite chronique", "Apnée du sommeil",
      "Insuffisance respiratoire", "Embolie pulmonaire ancienne", "Tuberculose ancienne",
      "Pneumopathies répétées", "Fibrose pulmonaire", "Allergies respiratoires", "Rhinite allergique"
    ] },
    { groupe: "Neurologie", items: [
      "Migraine", "Épilepsie", "Maladie de Parkinson", "Sclérose en plaques",
      "Neuropathie périphérique", "Sciatique chronique", "Névralgie", "Tremblements",
      "Démence / troubles cognitifs", "Maladie d'Alzheimer", "AVC ancien", "AIT ancien",
      "Vertiges chroniques"
    ] },
    { groupe: "Psychiatrie / psychologie", items: [
      "Dépression", "Anxiété", "Trouble panique", "Trouble bipolaire", "Schizophrénie",
      "Trouble du sommeil", "Burn-out", "Trouble du comportement alimentaire",
      "Addiction alcool", "Addiction tabac", "Addiction cannabis", "Autre addiction"
    ] },
    { groupe: "Gastro-entérologie / hépatologie", items: [
      "Reflux gastro-œsophagien", "Hernie hiatale", "Ulcère gastrique ou duodénal",
      "Gastrite chronique", "Maladie cœliaque", "Intolérance au gluten",
      "Syndrome de l'intestin irritable", "Maladie de Crohn", "Rectocolite hémorragique",
      "Diverticulose", "Diverticulite", "Polypes du côlon", "Hépatite B", "Hépatite C",
      "Stéatose hépatique", "Cirrhose", "Pancréatite", "Calculs biliaires"
    ] },
    { groupe: "Néphrologie / urologie", items: [
      "Insuffisance rénale chronique", "Calculs rénaux", "Coliques néphrétiques",
      "Infections urinaires répétées", "Prostate augmentée / adénome de prostate",
      "Cancer de la prostate", "Incontinence urinaire", "Malformation rénale", "Rein unique",
      "Dialyse", "Transplantation rénale"
    ] },
    { groupe: "Hématologie", items: [
      "Anémie", "Carence en fer", "Carence en vitamine B12", "Carence en folates",
      "Thrombocytopénie", "Thrombocytose", "Leucopénie", "Trouble de la coagulation",
      "Hémophilie", "Antécédent de phlébite", "Antécédent d'embolie pulmonaire",
      "Leucémie", "Lymphome", "Myélome"
    ] },
    { groupe: "Rhumatologie / orthopédie", items: [
      "Arthrose", "Polyarthrite rhumatoïde", "Spondylarthrite ankylosante", "Lupus",
      "Fibromyalgie", "Lombalgie chronique", "Cervicalgie chronique", "Sciatique",
      "Hernie discale", "Canal lombaire étroit", "Ostéoporose", "Fracture ancienne",
      "Tendinopathie chronique"
    ] },
    { groupe: "Dermatologie", items: [
      "Psoriasis", "Eczéma", "Dermatite atopique", "Urticaire chronique", "Vitiligo",
      "Acné sévère", "Rosacée", "Mélanome", "Carcinome basocellulaire", "Carcinome épidermoïde",
      "Naevus atypiques", "Lichen", "Mycose chronique"
    ] },
    { groupe: "ORL / ophtalmologie", items: [
      "Surdité", "Appareil auditif", "Acouphènes", "Vertiges", "Otites répétées",
      "Sinusites chroniques", "Polypose nasale", "Glaucome", "Cataracte", "DMLA",
      "Décollement de rétine", "Rétinopathie diabétique"
    ] },
    { groupe: "Gynécologie / obstétrique", items: [
      "Endométriose", "Fibrome utérin", "Kystes ovariens", "SOPK", "Ménopause",
      "Cancer du sein", "Cancer de l'utérus", "Cancer de l'ovaire", "HPV / papillomavirus",
      "Frottis anormal", "Grossesse à risque", "Diabète gestationnel", "Pré-éclampsie"
    ] },
    { groupe: "Cancérologie", items: [
      "Cancer du sein", "Cancer du côlon", "Cancer de la prostate", "Cancer du poumon",
      "Cancer de la peau", "Mélanome", "Cancer de la thyroïde", "Cancer de l'utérus",
      "Cancer de l'ovaire", "Cancer de la vessie", "Cancer du rein", "Cancer du pancréas",
      "Lymphome", "Leucémie", "Myélome", "Métastases connues", "Chimiothérapie antérieure",
      "Radiothérapie antérieure", "Immunothérapie antérieure"
    ] },
    { groupe: "Infectiologie", items: [
      "VIH", "Hépatite B", "Hépatite C", "Tuberculose", "Infections urinaires répétées",
      "Infections pulmonaires répétées", "Zona", "Herpès", "HPV", "Covid long",
      "Infection sévère ancienne", "Sepsis ancien"
    ] }
  ],

  chirurgicaux: [
    { groupe: "Chirurgie abdominale / digestive", items: [
      "Appendicectomie", "Cholécystectomie", "Hernie inguinale opérée", "Hernie ombilicale opérée",
      "Cure d'éventration", "Chirurgie de hernie hiatale", "Colectomie", "Résection intestinale",
      "Chirurgie bariatrique", "Sleeve gastrectomie", "Bypass gastrique", "Anneau gastrique",
      "Chirurgie du foie", "Chirurgie du pancréas", "Chirurgie de la rate", "Splénectomie",
      "Stomie / colostomie / iléostomie"
    ] },
    { groupe: "Chirurgie orthopédique", items: [
      "Prothèse totale de hanche", "Prothèse totale de genou", "Prothèse d'épaule",
      "Arthroscopie du genou", "Arthroscopie de l'épaule", "Ligamentoplastie du genou",
      "Chirurgie du ménisque", "Chirurgie du rachis", "Hernie discale opérée",
      "Arthrodèse vertébrale", "Canal lombaire opéré", "Ostéosynthèse après fracture",
      "Plaque / vis / clou orthopédique", "Chirurgie du canal carpien", "Chirurgie du pied",
      "Hallux valgus opéré"
    ] },
    { groupe: "Chirurgie gynécologique / obstétricale", items: [
      "Césarienne", "Hystérectomie", "Myomectomie", "Kystectomie ovarienne", "Ovariectomie",
      "Salpingectomie", "Ligature des trompes", "Chirurgie d'endométriose", "Cure de prolapsus",
      "Conisation du col", "IVG chirurgicale", "Curetage utérin"
    ] },
    { groupe: "Chirurgie urologique", items: [
      "Résection de prostate", "Prostatectomie", "Chirurgie de calculs rénaux", "Pose de sonde JJ",
      "Néphrectomie", "Chirurgie de la vessie", "Circoncision", "Vasectomie", "Cure d'hydrocèle",
      "Cure de varicocèle"
    ] },
    { groupe: "Chirurgie cardiovasculaire", items: [
      "Pontage coronarien", "Angioplastie / stent coronaire", "Remplacement valvulaire",
      "Chirurgie de l'aorte", "Pacemaker", "Défibrillateur implantable",
      "Ablation de trouble du rythme", "Chirurgie des varices", "Endartériectomie carotidienne",
      "Fistule artério-veineuse"
    ] },
    { groupe: "Chirurgie ORL / ophtalmologique", items: [
      "Amygdalectomie", "Adénoïdectomie", "Pose d'aérateurs transtympaniques", "Chirurgie des sinus",
      "Septoplastie", "Rhinoplastie", "Thyroïdectomie", "Parathyroïdectomie",
      "Chirurgie de cataracte", "Chirurgie du glaucome", "Chirurgie de la rétine",
      "Chirurgie réfractive / laser yeux"
    ] },
    { groupe: "Chirurgie thoracique / pneumologique", items: [
      "Lobectomie pulmonaire", "Pneumonectomie", "Chirurgie du pneumothorax", "Drainage pleural",
      "Biopsie pulmonaire chirurgicale", "Chirurgie médiastinale"
    ] },
    { groupe: "Chirurgie dermatologique / plastique", items: [
      "Exérèse de naevus", "Exérèse de mélanome", "Exérèse de carcinome cutané", "Greffe de peau",
      "Chirurgie esthétique", "Reconstruction mammaire", "Mastectomie", "Tumorectomie mammaire"
    ] },
    { groupe: "Neurochirurgie", items: [
      "Chirurgie cérébrale", "Chirurgie d'anévrisme cérébral", "Dérivation ventriculaire",
      "Chirurgie de tumeur cérébrale", "Chirurgie du rachis cervical", "Chirurgie du rachis lombaire"
    ] }
  ]
};
