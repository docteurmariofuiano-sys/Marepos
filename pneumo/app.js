const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const safetyLine = "Vérifier posologies, contre-indications, interactions, AMM, technique d'inhalation et remboursement selon le contexte.";

const inhalers = [
  { name: "Salbutamol", cls: "SABA", use: "secours bronchospasme asthme/BPCO", avoid: "tachyarythmie mal tolérée, besoin répété non réévalué", dose: "100 µg/dose, 1-2 bouffées si gêne, à réévaluer" },
  { name: "Terbutaline", cls: "SABA", use: "secours bronchospasme", avoid: "surconsommation, crise sévère non adressée", dose: "selon dispositif et RCP" },
  { name: "Flixotide", cls: "CSI", use: "asthme nécessitant corticoïde inhalé", avoid: "BPCO sans indication claire, monothérapie en crise", dose: "125 µg/dose, 1-2 bouffées matin et soir à adapter" },
  { name: "Innovair", cls: "CSI/LABA", use: "asthme insuffisamment contrôlé par CSI seul, stratégie adaptée au dosage", avoid: "traitement unique sans consignes, BPCO sans indication", dose: "100/6 µg, 1-2 bouffées matin et soir à adapter" },
  { name: "Symbicort", cls: "CSI/LABA", use: "asthme persistant, parfois maintenance et reliever selon dosage/AMM", avoid: "mauvaise technique, diagnostic incertain", dose: "selon dosage, RCP et stratégie" },
  { name: "Seretide", cls: "CSI/LABA", use: "asthme persistant ou BPCO sélectionnée", avoid: "CSI injustifié en BPCO", dose: "selon dosage et RCP" },
  { name: "Relvar", cls: "CSI/LABA", use: "asthme ou BPCO selon indication", avoid: "CSI sans critère, pneumonies répétées", dose: "1 prise/j selon dosage, à vérifier" },
  { name: "Trimbow", cls: "CSI/LABA/LAMA", use: "BPCO avec exacerbations malgré bronchodilatation, asthme sélectionné selon AMM", avoid: "initiation sans indication claire", dose: "selon dosage et RCP" },
  { name: "Spiriva", cls: "LAMA", use: "BPCO symptomatique, asthme add-on selon contexte", avoid: "glaucome angle fermé/rétention urinaire à discuter", dose: "selon dispositif et RCP" },
  { name: "Ultibro", cls: "LABA/LAMA", use: "BPCO dyspnéique persistante", avoid: "asthme sans CSI", dose: "1 prise/j selon RCP" },
  { name: "Anoro", cls: "LABA/LAMA", use: "BPCO symptomatique", avoid: "asthme sans CSI", dose: "1 prise/j selon RCP" },
  { name: "Trelegy", cls: "CSI/LABA/LAMA", use: "BPCO avec exacerbations malgré LABA/LAMA ou asthme selon AMM", avoid: "trithérapie banalisée", dose: "1 prise/j selon RCP" },
  { name: "Atrovent", cls: "SAMA", use: "bronchospasme, souvent associé au SABA en aigu selon contexte", avoid: "glaucome/rétention urinaire, projection oculaire", dose: "selon dispositif et RCP" },
  { name: "Association LABA/LAMA", cls: "double bronchodilatation", use: "BPCO symptomatique malgré monothérapie", avoid: "asthme sans CSI", dose: "selon spécialité" },
  { name: "Association CSI/LABA", cls: "anti-inflammatoire + bronchodilatateur", use: "asthme persistant, BPCO avec critères CSI", avoid: "CSI seul dans BPCO, pneumonie répétée", dose: "selon spécialité" }
];

const templates = [
  {
    key: "bpco-exac",
    label: "Exacerbation BPCO - ordonnance",
    body: ({ duration }) => `Ordonnance type - exacerbation BPCO\n\nSALBUTAMOL 100 µg/dose aérosol-doseur\n2 bouffées si gêne respiratoire, à renouveler si besoin selon protocole médical.\nUtiliser avec chambre d'inhalation si possible.\n\nPREDNISOLONE 20 mg\n2 comprimés le matin pendant ${duration || "5 jours"}.\nÀ adapter selon terrain, diabète, infection, contre-indications.\n\nSi critères d'antibiothérapie :\nAMOXICILLINE/ACIDE CLAVULANIQUE 1 g/125 mg\n1 comprimé matin, midi et soir pendant 5 jours.\nAlternative selon allergie, contexte, recommandations locales et résistance.\n\nAlerte : aggravation rapide, SpO2 basse, confusion, cyanose, douleur thoracique ou absence d'amélioration = réévaluation urgente.\n\n${safetyLine}`
  },
  {
    key: "innovair",
    label: "Innovair - asthme adulte",
    body: () => `INNOVAIR 100/6 µg solution pour inhalation\n1 à 2 bouffées matin et soir selon sévérité et contrôle.\nRincer la bouche après chaque prise.\nVérifier technique inhalatoire et observance.\n\nIndication pratique : adulte asthmatique nécessitant CSI/LABA, asthme insuffisamment contrôlé par CSI seul, symptômes fréquents ou exacerbations.\nAdapter au dosage disponible, à l'AMM, au profil patient et à la stratégie choisie. Ne pas utiliser comme traitement unique sans consignes claires.\n\n${safetyLine}`
  },
  {
    key: "flixotide",
    label: "Flixotide - CSI",
    body: () => `FLIXOTIDE 125 µg/dose aérosol-doseur\n1 à 2 bouffées matin et soir.\nRincer la bouche après utilisation.\nÀ utiliser avec chambre d'inhalation si difficulté technique.\n\nIndication pratique : asthme léger à modéré nécessitant corticoïde inhalé, symptômes récurrents ou exacerbations.\n\n${safetyLine}`
  },
  {
    key: "pulmicort1",
    label: "Pulmicort 1 mg nébulisation",
    body: ({ duration }) => `PULMICORT 1 mg/2 ml suspension pour inhalation par nébuliseur\n1 dose en nébulisation matin et soir pendant ${duration || "X jours"}.\nRincer la bouche après utilisation.\nNe pas avaler.\nÀ utiliser avec nébuliseur pneumatique adapté.\n\nPulmicort = budésonide nébulisé. Ne remplace pas une prise en charge urgente si détresse respiratoire.\n\n${safetyLine}`
  },
  {
    key: "pulmicort05",
    label: "Pulmicort 0,5 mg nébulisation",
    body: ({ duration }) => `PULMICORT 0,5 mg/2 ml suspension pour inhalation par nébuliseur\n1 dose en nébulisation matin et soir pendant ${duration || "X jours"}.\nRincer la bouche après utilisation.\nNe pas avaler.\n\n${safetyLine}`
  },
  {
    key: "ventoline-neb",
    label: "Ventoline nébulisation",
    body: () => `VENTOLINE 5 mg/2,5 ml solution pour inhalation par nébuliseur\n1 dose en nébulisation selon protocole médical en cas de bronchospasme.\nRéévaluation médicale si besoin répété ou absence d'amélioration.\n\nSurveiller FC, tremblements, tolérance et gravité clinique.\n\n${safetyLine}`
  },
  {
    key: "atrovent-neb",
    label: "Atrovent nébulisation",
    body: () => `ATROVENT 0,5 mg/2 ml solution pour inhalation par nébuliseur\n1 dose en nébulisation, éventuellement associée au salbutamol selon contexte.\nÉviter projection oculaire. Prudence glaucome à angle fermé/rétention urinaire.\n\n${safetyLine}`
  },
  {
    key: "nebulizer-rent",
    label: "Location nébuliseur",
    body: ({ duration, context }) => `Location d'un nébuliseur pneumatique avec compresseur pour aérosolthérapie à domicile\nAvec kit de nébulisation, tubulure, masque adulte ou embout buccal.\nDurée : ${duration || "1 mois"}, renouvelable si nécessaire.\nIndication : ${context || "traitement inhalé par nébulisation prescrit"}.\nÉducation du patient à l'utilisation, nettoyage et entretien du matériel.\n\nFiche patient : se laver les mains, préparer la dose, utiliser embout buccal si possible, respirer calmement, nettoyer après chaque utilisation, ne pas partager le matériel, consulter si aggravation.`
  },
  {
    key: "oxygen-transient",
    label: "Oxygène transitoire",
    body: ({ dose, duration }) => `Oxygénothérapie à domicile par concentrateur ou bouteille selon disponibilité\nDébit : ${dose || "X L/min"} au repos, à adapter pour maintenir la SpO2 cible selon contexte.\nDurée : ${duration || "X jours"}, réévaluation médicale obligatoire.\nObjectif SpO2 : 92-96 % sauf BPCO/hypercapnie suspectée : 88-92 %.\nMatériel : lunettes nasales, tubulure, humidification si nécessaire.\nSurveillance : SpO2, dyspnée, fréquence respiratoire, tolérance.\n\nL'oxygène est un médicament. Toute hypoxémie significative, désaturation persistante ou détresse respiratoire nécessite une évaluation clinique urgente.\n\n${safetyLine}`
  },
  {
    key: "oxygen-ltot",
    label: "Évaluation oxygène longue durée",
    body: ({ context }) => `Demande d'évaluation pour oxygénothérapie longue durée\nIndication suspectée : ${context || "hypoxémie chronique / désaturation persistante"}.\nÀ confirmer par gazométrie artérielle et évaluation pneumologique.\nPrescription initiale spécialisée recommandée selon réglementation et critères de remboursement.\n\nNe pas banaliser une désaturation. Réévaluer rapidement si aggravation clinique.`
  },
  {
    key: "oxygen-effort",
    label: "Oxygène d'effort - demande",
    body: ({ context }) => `Demande d'évaluation d'une oxygénothérapie d'effort\nContexte : ${context || "désaturation à l'effort suspectée ou documentée"}.\nProposition : test de marche avec SpO2, titration du débit si indication, avis pneumologique/prestataire selon organisation locale.\n\nVérifier indication, bénéfice fonctionnel et critères de prise en charge.`
  },
  {
    key: "oxygen-palliative",
    label: "Oxygène palliatif",
    body: ({ dose, duration }) => `Oxygénothérapie à visée symptomatique/palliative\nDébit : ${dose || "X L/min"} selon confort, tolérance et objectif partagé.\nDurée : ${duration || "à réévaluer"}.\nAssocier mesures non médicamenteuses et prise en charge de la dyspnée selon contexte.\n\nRéévaluer bénéfice, sécheresse, anxiété, encombrement, sécurité incendie et souhaits du patient.`
  },
  {
    key: "pneumo-letter",
    label: "Courrier pneumologue",
    body: ({ patient, context }) => `Cher confrère, chère consœur,\n\nJe vous adresse ${patient || "ce patient"} pour avis pneumologique.\n\nMotif : ${context || "dyspnée / toux / trouble ventilatoire / suspicion BPCO-asthme-SAOS"}.\nSynthèse clinique : ${shortClinicalLine()}.\nSpirométrie : ${shortSpiroLine()}.\n\nQuestions : confirmation diagnostique, optimisation thérapeutique, indication EFR complète, imagerie, réhabilitation respiratoire ou exploration du sommeil selon contexte.\n\nBien confraternellement.`
  },
  {
    key: "urgent-letter",
    label: "Courrier urgences",
    body: ({ patient, context }) => `Adressage urgent\n\nPatient : ${patient || "patient"}.\nMotif : ${context || "situation respiratoire potentiellement grave"}.\nConstantes : SpO2 ${val("spo2") || "?"} %, FR ${val("rr") || "?"}/min, FC ${val("hr") || "?"}/min, T ${val("temp") || "?"} °C, TA ${val("sbp") || "?"}/${val("dbp") || "?"}.\nRed flags : ${selected("#redFlagChecks").join(", ") || "à préciser"}.\n\nDiagnostics à ne pas manquer : EP, pneumonie grave, asthme aigu sévère, exacerbation BPCO hypercapnique, pneumothorax, SCA selon clinique.\n\nMerci pour prise en charge.`
  },
  {
    key: "efr-full",
    label: "Demande EFR complète",
    body: ({ patient, context }) => `Demande d'EFR complète\n\nPatient : ${patient || "patient"}.\nContexte : ${context || "dyspnée/toux chronique ou spirométrie anormale"}.\nDemande : spirométrie pré/post-bronchodilatateur, volumes pulmonaires, DLCO si indication, interprétation pneumologique.\nObjectif : distinguer obstruction, restriction vraie, distension, atteinte diffusion et guider prise en charge.`
  },
  {
    key: "sleep-study",
    label: "Demande polygraphie ventilatoire",
    body: ({ patient, context }) => `Demande de polygraphie ventilatoire nocturne\n\nPatient : ${patient || "patient"}.\nContexte : ${context || "suspicion de SAOS"}.\nSTOP-Bang : ${scoreStopBang()} / 8. Epworth : ${scoreEpworth()} / 24.\nSignes : ${selected("#stopBang").concat(selected("#sleepRisks")).join(", ") || "à préciser"}.\n\nMerci d'évaluer indication de polygraphie/polysomnographie et prise en charge.`
  },
  {
    key: "imaging",
    label: "Demande imagerie thoracique",
    body: ({ patient, context }) => `Demande d'imagerie thoracique\n\nPatient : ${patient || "patient"}.\nExamen demandé : radio thorax ou scanner thoracique selon indication clinique.\nContexte : ${context || "dyspnée, toux chronique, douleur thoracique, hémoptysie, pneumonie ou symptôme atypique"}.\nPoints de vigilance : cancer, pneumonie, pneumothorax, séquelles, pneumopathie interstitielle, EP si stratégie dédiée.`
  },
  {
    key: "rehab",
    label: "Demande réhabilitation respiratoire",
    body: ({ patient, context }) => `Demande de réhabilitation respiratoire\n\nPatient : ${patient || "patient"}.\nContexte : ${context || "BPCO/dyspnée chronique avec limitation fonctionnelle"}.\nObjectifs : réentraînement à l'effort, éducation thérapeutique, optimisation inhalateurs, sevrage tabagique, activité physique adaptée et autonomie.`
  },
  {
    key: "provider",
    label: "Demande prestataire O2/aérosol",
    body: ({ patient, context }) => `Demande de mise en place prestataire\n\nPatient : ${patient || "patient"}.\nMatériel : ${context || "oxygénothérapie / aérosolthérapie à domicile"}.\nMerci d'assurer installation, éducation, sécurité, entretien et traçabilité selon prescription médicale.\nRéévaluation médicale obligatoire selon évolution.`
  }
];

const pathologies = [
  {
    key: "toux-aigue",
    title: "Toux aiguë",
    essentials: ["bronchite aiguë", "pneumonie", "asthme/exacerbation BPCO", "Covid/grippe", "coqueluche", "EP si dyspnée brutale/douleur/hémoptysie/risques"],
    actions: ["constantes, SpO2, auscultation", "pas d'antibiotique systématique si bronchite aiguë simple", "radio thorax si suspicion pneumonie ou atypie", "réévaluation si fièvre persistante, dyspnée, douleur thoracique, SpO2 basse"]
  },
  {
    key: "toux-chronique",
    title: "Toux chronique",
    essentials: ["asthme", "rhinite/post-nasal drip", "RGO", "IEC", "BPCO/tabac", "cancer bronchique", "bronchectasies", "tuberculose selon contexte"],
    actions: ["durée, tabac, médicaments, signes généraux", "radio thorax souvent utile", "spirométrie si sibilants, dyspnée, tabac ou récidive", "avis si hémoptysie, amaigrissement, anomalie radio, immunodépression"]
  },
  {
    key: "dyspnee-aigue",
    title: "Dyspnée aiguë",
    essentials: ["asthme aigu", "exacerbation BPCO", "pneumonie", "EP", "insuffisance cardiaque", "pneumothorax", "anémie", "anxiété seulement après exclusion causes graves"],
    actions: ["SpO2, FR, FC, TA, T, signes de lutte", "ECG si douleur/terrain", "urgence si SpO2 < 90, confusion, cyanose, épuisement, silence auscultatoire", "oxygène prudent si hypoxémie, cible 88-92 % si risque hypercapnie"]
  },
  {
    key: "douleur-thoracique",
    title: "Douleur thoracique respiratoire",
    essentials: ["EP", "pneumonie/pleurésie", "pneumothorax", "douleur pariétale", "syndrome coronarien à ne jamais oublier"],
    actions: ["ECG et constantes selon contexte", "probabilité EP avant D-dimères/imagerie", "urgence si douleur constrictive, malaise, désaturation, tachycardie, hypotension"]
  },
  {
    key: "hemoptysie",
    title: "Hémoptysie",
    essentials: ["EP", "cancer", "infection", "bronchectasies", "anticoagulants", "tuberculose selon contexte"],
    actions: ["abondante = urgence", "quantifier, anticoagulants, constantes, SpO2", "imagerie thoracique et avis selon abondance/terrain", "ne pas banaliser chez fumeur ou cancer connu"]
  },
  {
    key: "pneumonie",
    title: "Pneumonie communautaire",
    essentials: ["âge", "FR", "SpO2", "TA", "confusion", "comorbidités", "CRB-65", "radio thorax selon contexte"],
    actions: ["antibiothérapie probabiliste selon recommandations françaises", "contrôle clinique 48-72 h", "urgence si sepsis, hypoxémie, confusion, FR élevée, terrain fragile"]
  },
  {
    key: "bronchite",
    title: "Bronchite aiguë",
    essentials: ["toux récente", "souvent virale", "pas d'antibiotique systématique", "rechercher asthme/BPCO si sibilants ou récidive"],
    actions: ["traitement symptomatique", "éducation reconsultation", "alerte si fièvre persistante, dyspnée, douleur thoracique, SpO2 basse"]
  },
  {
    key: "asthme-aigu",
    title: "Asthme aigu",
    essentials: ["léger", "modéré", "sévère", "menace vitale"],
    actions: ["salbutamol répété selon protocole et gravité", "corticoïde oral si exacerbation modérée/sévère", "urgence si silence, cyanose, épuisement, confusion, SpO2 basse, impossibilité de parler, DEP < 50 %"]
  },
  {
    key: "ep",
    title: "Embolie pulmonaire",
    essentials: ["la clinique seule ne confirme ni n'exclut l'EP", "probabilité clinique guide D-dimères ou imagerie", "forte probabilité = imagerie urgente", "signes de gravité = SAMU/urgences"],
    actions: ["Wells/Genève simplifié", "D-dimères si probabilité faible/intermédiaire", "angioscanner ou stratégie adaptée si probabilité forte", "urgence si syncope, hypotension, désaturation, douleur intense, comorbidité sévère"]
  },
  {
    key: "pneumothorax",
    title: "Pneumothorax suspecté",
    essentials: ["douleur latéralisée brutale", "dyspnée", "asymétrie auscultatoire", "terrain BPCO/emphysème"],
    actions: ["SpO2, constantes, radio/urgence selon gravité", "urgence si détresse, hypotension, cyanose, pneumothorax compressif suspecté"]
  }
];

const trainingData = {
  spirometry: [
    ["Faire une spirométrie correcte", "Pince-nez, inspiration maximale, embout étanche, départ explosif, expiration forte rapide et prolongée, encouragement jusqu'au plateau."],
    ["Erreurs fréquentes", "Fuite, départ lent, toux précoce, expiration trop courte, effort variable, inspiration incomplète, mauvaise reproductibilité."],
    ["Courbe obstructive", "Pic expiratoire réduit, concavité de la courbe débit-volume, VEMS/CVF abaissé. Confirmer selon LLN ou seuil fixe avec prudence."],
    ["Restriction suspecte", "CVF basse avec rapport normal ou élevé. Ne pas conclure sur spirométrie seule : volumes pulmonaires nécessaires."],
    ["Compte rendu utile", "Qualité, VEMS, CVF, VEMS/CVF, % théoriques, post-bronchodilatateur, conclusion courte et conduite."],
  ],
  inhalers: [
    ["Aérosol-doseur", "Expirer, mettre l'embout, déclencher au début d'une inspiration lente, inspirer profondément, apnée 5-10 s. Chambre si coordination difficile."],
    ["Chambre d'inhalation", "Agiter, une bouffée dans la chambre, inspiration lente ou plusieurs respirations calmes, nettoyer régulièrement."],
    ["Poudre sèche", "Charger la dose, expirer loin du dispositif, inspiration rapide et profonde, apnée, ne pas souffler dans l'appareil."],
    ["Respimat", "Charger, expirer, déclencher pendant inspiration lente et profonde, apnée, vérifier manipulation."],
    ["Nébuliseur", "Dose prescrite, embout buccal si possible, respiration calme, nettoyage après chaque séance, pas de partage."],
  ],
  flashcards: [
    ["Asthme", "Symptômes variables, déclencheurs, réversibilité/variabilité. Éviter SABA seul si possible, CSI au cœur du traitement."],
    ["BPCO", "TVO persistant post-bronchodilatateur, symptômes et exposition. Sevrage, vaccins, activité, bronchodilatateurs."],
    ["Exacerbation BPCO", "Dyspnée, expectoration, purulence, désaturation. Bronchodilatateur, corticoïde court si modérée/sévère, antibiotique si critères."],
    ["Pneumonie", "Fièvre, toux, foyer, altération. SpO2/FR/TA/confusion/âge guident gravité, contrôle 48-72 h."],
    ["EP", "Probabilité clinique avant examens. D-dimères si faible/intermédiaire, imagerie si forte, urgence si gravité."],
    ["Pneumothorax", "Douleur brutale, dyspnée, asymétrie. Urgence si détresse ou compressif suspecté."],
    ["Toux chronique", "Asthme, rhinite, RGO, IEC, tabac/BPCO, cancer, bronchectasies."],
    ["Hémoptysie", "Abondante = urgence. Penser EP, cancer, infection, anticoagulants, tuberculose."],
    ["SAOS", "STOP-Bang, Epworth, comorbidités CV, conduite professionnelle, polygraphie."],
    ["Oxygène", "Médicament. Cible 92-96 %, 88-92 % si risque hypercapnie. GDS pour longue durée."],
    ["Aérosolthérapie", "Utile si bronchospasme et inhalateur impossible. Souvent inutile pour toux isolée sans obstruction."],
  ],
  quiz: [
    ["VEMS/CVF post-BD 0,58, VEMS 62 %, fumeur 35 PA", "TVO modéré compatible BPCO si qualité correcte et contexte. Sevrage, vaccins, bronchodilatateur longue durée, avis selon dyspnée/exacerbations/désaturation."],
    ["CVF 68 %, VEMS/CVF normal", "Restriction seulement suspectée. Demander volumes pulmonaires, DLCO selon contexte."],
    ["Asthme avec réveils nocturnes et secours quotidiens", "Non contrôlé. Vérifier diagnostic, technique, observance, facteurs associés puis escalade CSI/LABA selon stratégie."],
    ["SpO2 88 % BPCO somnolent", "Urgence. Oxygène prudent cible 88-92 %, GDS/prise en charge hospitalière, hypercapnie possible."],
    ["Ronflement, pauses observées, HTA, IMC 36", "Forte probabilité SAOS. STOP-Bang élevé, polygraphie/polysomnographie, conseils conduite si somnolence."],
  ]
};

const clinicalCases = [
  "Patient fumeur dyspnéique",
  "Asthme mal contrôlé",
  "Toux chronique sous IEC",
  "Exacerbation BPCO",
  "Pneumonie du sujet âgé",
  "Suspicion embolie pulmonaire",
  "Désaturation inexpliquée",
  "Ronflement + HTA",
  "Obésité + somnolence",
  "Hémoptysie sous anticoagulant",
  "Bronchite aiguë simple",
  "Asthme aigu sévère",
  "Douleur thoracique pleurale",
  "Pneumothorax suspecté",
  "Toux chronique du fumeur",
  "BPCO avec exacerbations répétées",
  "Asthme d'effort",
  "Rhinite + toux nocturne",
  "RGO + toux chronique",
  "Désaturation d'effort",
  "BPCO + suspicion SAOS",
  "Dyspnée anxieuse apparente",
  "Cancer connu + dyspnée",
  "Immunodépression + fièvre",
  "Coqueluche suspectée",
  "Covid/grippe avec dyspnée",
  "Bronchectasies suspectées",
  "Exposition professionnelle",
  "Oxygène à domicile demandé",
  "Aérosol demandé pour toux isolée"
];

function num(id) {
  const raw = $(id)?.value;
  if (raw === undefined || raw === null || String(raw).trim() === "") return null;
  const n = Number(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function val(id) {
  return $(id)?.value?.trim() || "";
}

function selected(selector) {
  return $$(`${selector} input[type="checkbox"]:checked`).map((box) => box.value);
}

function setStatus(el, label, level) {
  if (!el) return;
  el.textContent = label;
  el.classList.remove("status-green", "status-orange", "status-red");
  if (level) el.classList.add(`status-${level}`);
}

function joinOr(items, empty = "non renseigné") {
  return items.length ? items.join(", ") : empty;
}

function bmi() {
  const w = num("#weight");
  const h = num("#height");
  if (!w || !h) return null;
  return w / Math.pow(h / 100, 2);
}

function shortClinicalLine() {
  const parts = [];
  const age = val("#age");
  const sex = val("#sex");
  const tobacco = val("#tobacco");
  const py = val("#packYears");
  if (age) parts.push(`${age} ans`);
  if (sex) parts.push(sex === "m" ? "homme" : sex === "f" ? "femme" : "sexe non binaire/autre");
  if (tobacco) parts.push(`tabac ${tobacco}${py ? ` ${py} PA` : ""}`);
  parts.push(`symptômes: ${joinOr(selected("#symptomChecks"))}`);
  parts.push(`SpO2 ${val("#spo2") || "?"} %, FR ${val("#rr") || "?"}/min`);
  return parts.join(", ");
}

function shortSpiroLine() {
  const ratio = num("#ratio");
  const fevPct = num("#fev1pct");
  const dMl = num("#deltaFev1Ml");
  const dPct = num("#deltaFev1Pct");
  const bits = [];
  if (ratio !== null) bits.push(`VEMS/CVF ${ratio.toFixed(2)}`);
  if (fevPct !== null) bits.push(`VEMS ${Math.round(fevPct)} % théo`);
  if (dMl !== null || dPct !== null) bits.push(`réversibilité VEMS ${dMl ?? "?"} ml / ${dPct ?? "?"} %`);
  return bits.length ? bits.join(", ") : "non renseignée";
}

function updateDashboard() {
  if (!$("#bmiLine")) return;
  const currentBmi = bmi();
  $("#bmiLine").textContent = currentBmi ? `IMC ${currentBmi.toFixed(1)} kg/m².` : "IMC non calculé.";

  const spo2 = num("#spo2");
  const rr = num("#rr");
  const redFlags = selected("#redFlagChecks");
  const severeByConst = (spo2 !== null && spo2 < 90) || (rr !== null && rr > 30);
  const orangeByConst = (spo2 !== null && spo2 >= 90 && spo2 <= 91) || (spo2 !== null && spo2 < 92 && redFlags.length);
  let status = ["Suivi MG possible", "green"];
  if (redFlags.length || severeByConst) status = ["Urgence / SAMU / hospitalisation", "red"];
  else if (orangeByConst || (spo2 !== null && spo2 >= 92 && spo2 <= 94)) status = ["Avis spécialisé rapide / surveillance", "orange"];

  setStatus($("#globalStatus"), status[0], status[1]);
  setStatus($("#urgentStatus"), status[0], status[1]);

  const redText = status[1] === "red"
    ? "Situation potentiellement grave. Ne pas gérer uniquement en ambulatoire. Appeler le 15 ou adresser aux urgences selon contexte."
    : status[1] === "orange"
      ? "Situation à surveiller de près. Rechercher signes de gravité, terrain fragile et diagnostic à ne pas manquer."
      : "Pas de critère rouge saisi. Rester vigilant si évolution rapide ou terrain fragile.";

  $("#consultOutput").value = [
    "1. Synthèse clinique",
    shortClinicalLine(),
    `Expositions/antécédents : ${joinOr(selected("#riskChecks"))}.`,
    currentBmi ? `IMC : ${currentBmi.toFixed(1)} kg/m².` : "IMC : non calculé.",
    "",
    "2. Niveau de gravité",
    `${status[0]}. ${redText}`,
    "",
    "3. Hypothèses principales",
    suggestMainHypotheses().join("\n"),
    "",
    "4. Diagnostics à ne pas manquer",
    "EP, pneumonie grave, asthme aigu sévère, exacerbation BPCO hypercapnique, pneumothorax, SCA si douleur thoracique, cancer si hémoptysie/amaigrissement/tabac.",
    "",
    "5. Examens utiles",
    suggestExams().join("\n"),
    "",
    "6. Traitement possible en MG",
    "Selon diagnostic : bronchodilatateur de secours si bronchospasme, traitement de fond asthme/BPCO si indication, antibiothérapie seulement si critères, oxygène prudent si hypoxémie.",
    "",
    "7. Ordonnance type si nécessaire",
    "Utiliser l'onglet Ordonnances puis adapter au patient.",
    "",
    "8. Conseils patient",
    "Arrêt tabac, technique inhalatoire, hydratation raisonnable, vaccins selon statut, activité adaptée, signes d'alerte expliqués.",
    "",
    "9. Critères de réévaluation",
    "Absence d'amélioration, fièvre persistante, dyspnée progressive, recours répété au traitement de secours, intolérance, doute diagnostique.",
    "",
    "10. Critères d'urgence",
    "SpO2 < 90 %, SpO2 < 92 % avec signes cliniques, FR > 30/min, cyanose, confusion, somnolence inhabituelle, épuisement, silence auscultatoire, douleur constrictive, hémoptysie abondante.",
    "",
    "11. Courrier ou demande spécialisée",
    "Pneumologue si obstruction sévère, désaturation, exacerbations répétées, doute diagnostique, suspicion SAOS sévère, indication oxygène longue durée ou EFR complète.",
    "",
    safetyLine
  ].join("\n");
}

function suggestMainHypotheses() {
  const s = selected("#symptomChecks");
  const risks = selected("#riskChecks");
  const list = [];
  if (s.includes("sifflements") || risks.includes("asthme")) list.push("- Asthme ou bronchospasme.");
  if (s.includes("toux chronique") || risks.includes("BPCO") || val("#tobacco") === "actif" || val("#tobacco") === "sevré") list.push("- BPCO / bronchite chronique si exposition et spirométrie compatible.");
  if (s.includes("fièvre") && (s.includes("toux aiguë") || s.includes("dyspnée"))) list.push("- Infection respiratoire, pneumonie à éliminer selon constantes/examen.");
  if (s.includes("douleur thoracique") || s.includes("hémoptysie") || risks.includes("EP/TVP")) list.push("- Embolie pulmonaire à évaluer par probabilité clinique.");
  if (s.includes("ronflement") || s.includes("somnolence diurne") || risks.includes("SAOS")) list.push("- SAOS possible.");
  if (!list.length) list.push("- À préciser selon interrogatoire, examen clinique et évolution.");
  return list;
}

function suggestExams() {
  const s = selected("#symptomChecks");
  const list = ["- SpO2, FR, FC, TA, température et auscultation."];
  if (s.includes("toux chronique") || s.includes("sifflements") || val("#tobacco")) list.push("- Spirométrie pré/post-bronchodilatateur si état stable.");
  if (s.includes("fièvre") || s.includes("douleur thoracique") || s.includes("hémoptysie")) list.push("- Radio thorax selon contexte ; biologie si infection ou gravité.");
  if (s.includes("douleur thoracique") || s.includes("hémoptysie")) list.push("- Probabilité EP puis D-dimères/imagerie selon stratégie validée.");
  if (s.includes("ronflement") || s.includes("somnolence diurne")) list.push("- STOP-Bang, Epworth, polygraphie ventilatoire si probabilité élevée.");
  return list;
}

function updateBPCO() {
  if (!$("#bpcoStatus")) return;
  if (num("#age") && num("#age") > 40) $("#bpcoScreen input[value='âge > 40 ans']").checked = true;
  if (["actif", "sevré"].includes(val("#tobacco"))) $("#bpcoScreen input[value='tabagisme actif ou sevré']").checked = true;

  let cat = 0;
  $$("[data-cat]").forEach((input) => {
    cat += Number(input.value);
    input.nextElementSibling.textContent = input.value;
  });
  $("#catTotal").textContent = `CAT ${cat} / 40`;

  const screen = selected("#bpcoScreen");
  const mmrc = num("#mmrc");
  const exac = num("#exacYear") ?? 0;
  const hosp = num("#exacHosp") ?? 0;
  const symptomatic = cat >= 10 || (mmrc !== null && mmrc >= 2);
  const highRisk = exac >= 2 || hosp >= 1;
  const spiroCompatible = num("#ratio") !== null && num("#ratio") < (num("#ratioLln") ?? 0.70);
  const screenPositive = screen.length >= 3;

  setStatus($("#bpcoStatus"), spiroCompatible ? "BPCO possible si contexte" : screenPositive ? "Spirométrie à proposer" : "Risque faible/intermédiaire", spiroCompatible ? "orange" : screenPositive ? "orange" : "green");

  const treatment = [];
  treatment.push("- Sevrage tabagique, aide pharmacologique si accord, réduction expositions.");
  treatment.push("- Vaccination grippe, pneumocoque, Covid selon recommandations et statut.");
  treatment.push("- Activité physique, réhabilitation respiratoire si dyspnée/limitation.");
  if (!symptomatic) treatment.push("- Peu symptomatique : bronchodilatateur de secours si symptômes intermittents, suivi clinique.");
  if (symptomatic) treatment.push("- Symptomatique : LAMA ou LABA en fond ; LABA/LAMA si dyspnée persistante.");
  if (highRisk) treatment.push("- Exacerbations fréquentes/hospitalisation : avis pneumo ; CSI seulement si exacerbations, asthme associé, éosinophiles élevés ou indication spécialisée.");
  treatment.push("- Éviter corticoïdes inhalés seuls dans la BPCO.");

  $("#bpcoOutput").value = [
    "Dépistage",
    `${screen.length} item(s) positif(s) : ${joinOr(screen)}.`,
    screenPositive ? "Profil justifiant une spirométrie pré/post-bronchodilatateur si non faite." : "Dépistage à interpréter avec contexte clinique.",
    "",
    "Diagnostic BPCO",
    "Le diagnostic repose sur un TVO persistant post-bronchodilatateur, des symptômes compatibles et une exposition à des facteurs de risque.",
    spiroCompatible ? `EFR actuelle : ${shortSpiroLine()} compatible avec TVO si qualité correcte.` : "EFR actuelle : non compatible ou non renseignée.",
    "",
    "Évaluation clinique",
    `mMRC : ${val("#mmrc") || "non renseigné"}. CAT : ${cat}/40. Exacerbations/an : ${exac}. Hospitalisation : ${hosp}. SpO2 repos : ${val("#spo2") || "?"} %. IMC : ${bmi() ? bmi().toFixed(1) : "?"}.`,
    symptomatic ? "BPCO symptomatique." : "BPCO peu symptomatique ou données insuffisantes.",
    highRisk ? "Risque d'exacerbation élevé : avis/optimisation recommandés." : "Pas de signal d'exacerbations répétées saisi.",
    "",
    "Traitement pratique MG",
    treatment.join("\n"),
    "",
    "Exacerbation BPCO",
    "Aggravation dyspnée, volume/purulence expectoration, fièvre, désaturation, lutte, confusion, cyanose ou impossibilité de parler.",
    "Conduite : bronchodilatateur courte durée, corticoïde oral court si modérée/sévère, antibiotique si purulence franche/fièvre/BPCO sévère/signes infectieux, oxygène prudent cible 88-92 % si risque hypercapnie.",
    "Urgence si SpO2 basse persistante, détresse, troubles neuro, épuisement, cyanose, comorbidité sévère.",
    "",
    "Ordonnance type",
    templates.find((t) => t.key === "bpco-exac").body({ duration: "5 jours" })
  ].join("\n");
}

function updateAsthma() {
  if (!$("#asthmaStatus")) return;
  const diag = selected("#asthmaDiag");
  const control = selected("#asthmaControl");
  const likely = diag.length >= 3 || diag.includes("réversibilité spirométrique") || diag.includes("variabilité DEP");
  const uncontrolled = control.filter((x) => !["technique inhalatoire douteuse", "observance insuffisante"].includes(x)).length >= 2 || control.includes("exacerbation récente");
  setStatus($("#asthmaStatus"), likely ? uncontrolled ? "Asthme probable non contrôlé" : "Asthme probable" : "Probabilité à préciser", likely ? uncontrolled ? "orange" : "green" : "orange");

  $("#asthmaOutput").value = [
    "Diagnostic probable d'asthme",
    `${diag.length} élément(s) évocateur(s) : ${joinOr(diag)}.`,
    likely ? "Asthme plausible : confirmer variabilité respiratoire si possible (spirométrie, DEP, réponse thérapeutique documentée)." : "Probabilité insuffisante ou à documenter. Rechercher diagnostics différentiels.",
    "",
    "Contrôle",
    `${control.length} item(s) défavorable(s) : ${joinOr(control)}.`,
    uncontrolled ? "Asthme non contrôlé ou exacerbation récente." : "Contrôle acceptable si symptômes rares et pas d'exacerbation.",
    "",
    "Traitement pratique MG",
    "Asthme intermittent/léger : éviter SABA seul si possible selon recommandations modernes. Proposer faible dose CSI-formotérol à la demande si disponible/adapté, ou CSI faible dose régulier + bronchodilatateur de secours.",
    "Asthme persistant : CSI faible dose quotidien. Si contrôle insuffisant : CSI/LABA.",
    "Avant escalade : vérifier diagnostic, technique inhalatoire, observance, allergènes/tabac, rhinite, RGO, obésité, SAOS, exposition professionnelle.",
    "",
    "Quand prescrire Innovair ?",
    "Innovair = béclométasone + formotérol. Utile chez l'adulte asthmatique nécessitant CSI/LABA : asthme insuffisamment contrôlé par CSI seul, symptômes fréquents, besoin répété de secours, exacerbations, stratégie maintenance ± reliever selon dosage et AMM.",
    templates.find((t) => t.key === "innovair").body({}),
    "",
    "Quand prescrire Flixotide ?",
    "Flixotide = fluticasone, CSI seul. Indications pratiques : asthme léger à modéré nécessitant CSI, prévention des symptômes, symptômes récurrents ou exacerbations.",
    templates.find((t) => t.key === "flixotide").body({}),
    "",
    "Quand passer à CSI/LABA ?",
    "Symptômes persistants malgré bonne observance, réveils nocturnes, recours fréquent au secours, exacerbation sous CSI, VEMS abaissé/variabilité importante, gêne d'effort persistante.",
    safetyLine
  ].join("\n");
}

function scoreStopBang() {
  return selected("#stopBang").length;
}

function scoreEpworth() {
  return $$("#epworthGrid select").reduce((sum, select) => sum + Number(select.value), 0);
}

function updateSleep() {
  if (!$("#sleepStatus")) return;
  if (bmi() && bmi() > 35) $("#stopBmi").checked = true;
  if (num("#age") && num("#age") > 50) $("#stopAge").checked = true;
  $("#stopMale").checked = val("#sex") === "m";

  const sb = scoreStopBang();
  const ep = scoreEpworth();
  const risk = sb >= 5 || (sb >= 3 && ep >= 11) ? ["Forte probabilité SAOS", "red"] : sb >= 3 || ep >= 11 ? ["Probabilité intermédiaire", "orange"] : ["Faible probabilité", "green"];
  setStatus($("#sleepStatus"), risk[0], risk[1]);

  $("#sleepOutput").value = [
    "Suspicion SAOS",
    `STOP-Bang : ${sb} / 8. Epworth : ${ep} / 24.`,
    `Classement : ${risk[0]}.`,
    `Éléments : ${joinOr(selected("#stopBang").concat(selected("#sleepRisks")))}.`,
    "",
    "Conduite pratique MG",
    risk[1] === "red" ? "- Proposer polygraphie ventilatoire ou polysomnographie selon disponibilité." : "- Documenter symptômes et comorbidités ; exploration si retentissement ou risque.",
    "- Rechercher HTA, fibrillation atriale, diabète, obésité, somnolence au volant/profession à risque.",
    "- Conseiller perte de poids si surpoids, éviter alcool/sédatifs le soir, prudence conduite si somnolence.",
    "- Adresser pneumologue/sommeil si forte probabilité, comorbidités, activité à risque, forme sévère ou échec.",
    "",
    "Rapport type",
    `Suspicion clinique de syndrome d'apnées obstructives du sommeil devant ${joinOr(selected("#stopBang"), "symptômes à préciser")}.\nScore STOP-Bang : ${sb} / 8.\nScore Epworth : ${ep} / 24.\nIndication à une polygraphie ventilatoire nocturne ${risk[1] === "green" ? "à discuter selon retentissement" : "à prévoir"}.\nConseils donnés : éviter alcool/sédatifs le soir, décubitus dorsal si aggravant, prudence conduite si somnolence.`
  ].join("\n");
}

function updateOxy() {
  if (!$("#oxyStatus")) return;
  if (val("#spo2") && !val("#oxySpo2")) $("#oxySpo2").value = val("#spo2");
  const spo2 = num("#oxySpo2");
  const hyper = selected("#oxyContext").includes("BPCO ou hypercapnie suspectée");
  let decision = "SpO2 non renseignée.";
  let level = "orange";
  if (spo2 !== null) {
    if (spo2 >= 95) {
      decision = "SpO2 ≥ 95 % : oxygène généralement non nécessaire ; rechercher autre cause de dyspnée si symptômes.";
      level = "green";
    } else if (spo2 >= 92) {
      decision = "SpO2 92-94 % : évaluer contexte, infection/asthme/BPCO/IC/EP ; surveillance rapprochée, avis si terrain fragile.";
      level = "orange";
    } else if (spo2 >= 90) {
      decision = "SpO2 90-91 % : situation potentiellement préoccupante ; évaluer signes de gravité, oxygène possible selon contexte, réévaluation rapide.";
      level = "orange";
    } else {
      decision = "SpO2 < 90 % : hypoxémie significative ; oxygène et évaluation urgente, orientation urgences/SAMU si persistant.";
      level = "red";
    }
  }
  if (hyper) decision += " BPCO/hypercapnie : éviter hyperoxie, cible souvent 88-92 %, bas débit, surveiller conscience/FR, gaz du sang si possible.";
  setStatus($("#oxyStatus"), level === "red" ? "Urgent" : level === "orange" ? "Prudence" : "Stable", level);

  const aero = selected("#aeroContext");
  const useful = aero.some((x) => ["bronchospasme aigu", "exacerbation asthme/BPCO", "incapacité à utiliser inhalateur", "sujet âgé ou coordination limitée"].includes(x));
  const notUseful = aero.some((x) => ["toux isolée sans bronchospasme", "bronchite aiguë non obstructive", "prescription prolongée sans diagnostic clair"].includes(x));
  const aeroLine = useful && !notUseful
    ? "Aérosol possiblement utile si inhalateur impossible ou bronchospasme documenté ; prescription transitoire avec réévaluation."
    : notUseful
      ? "Aérosol souvent inutile ou à éviter dans ce contexte sans bronchospasme/diagnostic clair."
      : "Indication aérosol non renseignée.";

  $("#oxyOutput").value = [
    "Oxygénothérapie",
    "L'oxygène est un médicament. Toute hypoxémie significative, désaturation persistante ou détresse respiratoire nécessite une évaluation clinique urgente. L'oxygène longue durée repose idéalement sur gaz du sang et critères spécialisés.",
    decision,
    "",
    "Ordonnance transitoire type",
    templates.find((t) => t.key === "oxygen-transient").body({ dose: val("#oxyFlow") ? `${val("#oxyFlow")} L/min` : "", duration: val("#oxyDuration") }),
    "",
    "Oxygène longue durée",
    templates.find((t) => t.key === "oxygen-ltot").body({ context: selected("#oxyContext").join(", ") }),
    "",
    "Aérosolthérapie",
    `Contexte : ${joinOr(aero)}.`,
    aeroLine,
    "Médicaments nébulisables : salbutamol, ipratropium, budésonide type Pulmicort, sérum physiologique selon indication.",
    "",
    "Location aérosol",
    templates.find((t) => t.key === "nebulizer-rent").body({ duration: "1 mois", context: "traitement inhalé par nébulisation prescrit" })
  ].join("\n");
}

function updatePathology() {
  if (!$("#pathologySelect") || !$("#pathologyCard")) return;
  const select = $("#pathologySelect");
  if (!select.options.length) {
    pathologies.forEach((p) => select.add(new Option(p.title, p.key)));
  }
  const pathology = pathologies.find((p) => p.key === select.value) || pathologies[0];
  const isRedFlag = (x) => /\b(urgence|alerte|menace vitale|jamais|abondante = urgence)\b/i.test(x);
  const redFlags = pathology.actions.filter(isRedFlag);
  const conduite = pathology.actions.filter((x) => !isRedFlag(x));
  const list = (items) => `<ul class="plain-list">${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;

  $("#pathologyCard").innerHTML = `
    <h3>${pathology.title}</h3>
    <div class="callout callout-advice">
      <p class="callout-title">Diagnostics à évoquer</p>
      ${list(pathology.essentials)}
    </div>
    <div class="callout callout-reco">
      <p class="callout-title">Conduite à tenir (MG)</p>
      ${list(conduite)}
    </div>
    ${redFlags.length ? `
    <div class="callout callout-redflag">
      <p class="callout-title">Signes d'alerte / urgence</p>
      ${list(redFlags)}
    </div>` : ""}
  `;

  const crb = selected("#crb65").length;
  $("#crb65Result").textContent = `CRB-65 : ${crb}. ${crb === 0 ? "ambulatoire possible si contexte rassurant" : crb === 1 ? "surveillance/avis selon terrain" : "hospitalisation à discuter fortement selon clinique"}.`;

  const wellsMap = {
    "signes TVP": 3,
    "EP plus probable": 3,
    "FC > 100": 1.5,
    "immobilisation/chirurgie": 1.5,
    "antécédent EP/TVP": 1.5,
    "hémoptysie": 1,
    "cancer actif": 1
  };
  const wells = selected("#wellsPe").reduce((sum, item) => sum + (wellsMap[item] || 0), 0);
  const wellsText = wells > 6 ? "probabilité forte : imagerie urgente, ne pas se contenter des D-dimères" : wells > 2 ? "probabilité intermédiaire : D-dimères/imagerie selon stratégie" : "probabilité faible : D-dimères possibles si pas de règle d'exclusion applicable";
  $("#wellsResult").textContent = `Wells simplifié : ${wells}. ${wellsText}.`;
}

function updateTemplates() {
  if (!$("#templateSelect") || !$("#templateOutput")) return;
  const select = $("#templateSelect");
  if (!select.options.length) {
    templates.forEach((t) => select.add(new Option(t.label, t.key)));
  }
  const template = templates.find((t) => t.key === select.value) || templates[0];
  const args = {
    patient: val("#patientName"),
    duration: val("#templateDuration"),
    dose: val("#templateDose"),
    context: val("#templateContext")
  };
  $("#templateOutput").value = template.body(args);

  $("#inhalerInfo").innerHTML = inhalers.map((item) => `
    <article class="mini-card">
      <h4>${item.name}</h4>
      <p><strong>${item.cls}</strong></p>
      <p>Indication : ${item.use}.</p>
      <p>Éviter/prudence : ${item.avoid}.</p>
      <p>Posologie : ${item.dose}. ${item.cls.includes("CSI") ? "Rinçage bouche." : ""}</p>
    </article>
  `).join("");
}

function renderTraining() {
  if (!$("#trainingSelect") || !$("#trainingOutput")) return;
  const mode = $("#trainingSelect").value;
  const root = $("#trainingOutput");
  if (mode === "cases") {
    root.innerHTML = `
      <div class="case-grid">
        ${clinicalCases.map((title, index) => `
          <article class="mini-card">
            <h4>${index + 1}. ${title}</h4>
            <p><strong>Hypothèses :</strong> respiratoire fréquent + diagnostic grave à éliminer selon constantes.</p>
            <p><strong>Questions :</strong> début, facteurs de risque, traitements, exposition, signes d'alerte.</p>
            <p><strong>Examen :</strong> SpO2, FR, FC, TA, T, auscultation, signes de lutte.</p>
            <p><strong>Examens :</strong> spirométrie, radio, ECG, D-dimères/imagerie ou polygraphie selon scénario.</p>
            <p><strong>Traitement :</strong> symptomatique ciblé, bronchodilatateur/antibiotique/O2 seulement si critères.</p>
            <p><strong>Adressage :</strong> urgence si red flags ; pneumo si doute, sévérité ou récidive.</p>
          </article>
        `).join("")}
      </div>`;
    return;
  }
  const rows = trainingData[mode] || trainingData.spirometry;
  root.innerHTML = `<div class="training-grid">${rows.map(([title, body]) => `<article class="mini-card"><h4>${title}</h4><p>${body}</p></article>`).join("")}</div>`;
}

function copyText(id) {
  const el = $(`#${id}`);
  if (!el) return;
  el.select();
  const text = el.value;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => document.execCommand("copy"));
  } else {
    document.execCommand("copy");
  }
}

function showTab(tabName, targetSelector = "") {
  const panel = $(`#tab-${tabName}`);
  const button = $(`.tab[data-tab="${tabName}"]`);
  if (!panel) return;
  $$(".tab").forEach((b) => b.classList.remove("is-active"));
  $$(".tab-panel").forEach((item) => item.classList.remove("is-active"));
  if (button) button.classList.add("is-active");
  panel.classList.add("is-active");
  if (targetSelector) {
    const target = $(targetSelector);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function resetApp() {
  $$("input, textarea, select").forEach((el) => {
    if (el.type === "checkbox" || el.type === "radio") el.checked = false;
    else if (el.type === "range") el.value = el.defaultValue || "0";
    else if (el.id !== "quickSearch") el.value = "";
  });
  updateAll();
}

function setupQuickSearch() {
  const input = $("#quickSearch");
  if (!input) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    $$(".quick-card, .motif-card, .surface, .mini-card, .callout").forEach((card) => {
      if (!query) {
        card.classList.remove("is-search-hidden");
        return;
      }
      card.classList.toggle("is-search-hidden", !card.textContent.toLowerCase().includes(query));
    });
  });
}

function updateAll() {
  updateDashboard();
  updateBPCO();
  updateAsthma();
  updateSleep();
  updateOxy();
  updatePathology();
  updateTemplates();
}

function init() {
  $$(".tab").forEach((button) => {
    button.addEventListener("click", () => showTab(button.dataset.tab));
  });
  $$("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => showTab(button.dataset.jump, button.dataset.target || ""));
  });
  $("[data-reset]")?.addEventListener("click", resetApp);
  $("[data-print]")?.addEventListener("click", () => window.print());
  setupQuickSearch();

  document.addEventListener("input", (event) => {
    if (event.target.matches("input, textarea, select")) updateAll();
  });
  document.addEventListener("change", (event) => {
    if (event.target.matches("input, textarea, select")) updateAll();
  });
  $$("[data-copy]").forEach((button) => button.addEventListener("click", () => copyText(button.dataset.copy)));
  $("#pathologySelect")?.addEventListener("change", updatePathology);
  $("#templateSelect")?.addEventListener("change", updateTemplates);
  $("#trainingSelect")?.addEventListener("change", renderTraining);
  updatePathology();
  updateTemplates();
  renderTraining();
  updateAll();
}

init();
