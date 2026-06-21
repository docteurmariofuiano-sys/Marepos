/* ============================================================
   FICHES CLINIQUES DÉCISIONNELLES (20)
   Structure : interrogatoire, drapeauxRouges, examenMinimal,
   examenOriente, hypotheses, examens, orientation, traitement, courrier, pourquoi
   Orientation type : samu | urg | specialiste | domicile
   Sources : HAS, CEN, SFN, SFMU, ESC, ICHD-3, reco sommeil. Contenu original.
   ============================================================ */

window.FICHES = {

/* ---------------- A. CÉPHALÉE ---------------- */
"cephalee":{
 lettre:"A", titre:"Céphalée", sousTitre:"Orientation d'une céphalée aiguë ou chronique",
 urgence:true,
 interrogatoire:[
  "Mode d'installation : brutale (coup de tonnerre) vs progressive",
  "Ancienneté : céphalée habituelle vs nouvelle ou inhabituelle",
  "Profil temporel : épisodique, quotidienne, en salves",
  "Caractéristiques : pulsatile, en étau, péri-orbitaire",
  "Signes accompagnateurs : nausées, photo/phonophobie, aura visuelle",
  "Facteurs déclenchants : effort, Valsalva, coït, position, médicaments",
  "Consommation d'antalgiques (≥10–15 j/mois = abus médicamenteux)",
  "Âge de début (1ère céphalée après 50 ans = drapeau)",
  "Contexte : fièvre, traumatisme, grossesse/post-partum, cancer, immunodépression"
 ],
 drapeauxRouges:[
  "Céphalée brutale en coup de tonnerre (max < 1 min) → hémorragie méningée",
  "Céphalée fébrile avec raideur de nuque → méningite",
  "Céphalée + déficit neurologique focal ou trouble de conscience",
  "Première céphalée après 50 ans → artérite de Horton, tumeur",
  "Céphalée d'aggravation progressive, matinale, réveil nocturne, majorée au Valsalva → HTIC",
  "Céphalée chez immunodéprimé / cancer / anticoagulé / grossesse-post-partum",
  "Céphalée orthostatique (debout) → hypotension du LCR",
  "Œdème papillaire au fond d'œil"
 ],
 examenMinimal:[
  "Constantes : TA, FC, température, SpO2",
  "Recherche de raideur méningée, purpura",
  "Examen neurologique : conscience, déficit focal, langage",
  "Palpation des artères temporales si > 50 ans"
 ],
 examenOriente:[
  "Fond d'œil ou recherche de flou visuel / œdème papillaire",
  "Champ visuel par confrontation, oculomotricité, pupilles",
  "Recherche d'un syndrome cérébelleux, d'un déficit moteur/sensitif",
  "Examen cervical (raideur, douleur, Horner)"
 ],
 hypotheses:[
  "Urgentes : hémorragie méningée, méningite, thrombose veineuse cérébrale, dissection, artérite de Horton, HTIC/tumeur, pré-éclampsie",
  "Primaires : migraine (avec/sans aura), céphalée de tension, algie vasculaire de la face",
  "Secondaires fréquentes : abus médicamenteux, sinusite, cervicalgie"
 ],
 examens:[
  "TDM cérébrale sans injection en URGENCE si coup de tonnerre, déficit, trouble de conscience, trauma",
  "Si TDM normale et coup de tonnerre : ponction lombaire (recherche de sang/xanthochromie) en milieu hospitalier",
  "Angio-TDM / angio-IRM si suspicion dissection, anévrisme, thrombose veineuse",
  "IRM cérébrale (non urgente) si céphalée inhabituelle persistante sans red flag",
  "VS + CRP en urgence si suspicion d'artérite de Horton (> 50 ans)"
 ],
 orientation:[
  {type:"samu", texte:"Coup de tonnerre, déficit focal, trouble de conscience, syndrome méningé fébrile → 15 / urgences"},
  {type:"urg", texte:"Suspicion artérite de Horton avec signes visuels → urgence (corticothérapie sans délai après VS/CRP)"},
  {type:"specialiste", texte:"Céphalée inhabituelle sans red flag, ou primaire réfractaire → neurologue / consultation céphalées"},
  {type:"domicile", texte:"Migraine ou céphalée de tension typique, examen normal → traitement et suivi MG"}
 ],
 traitement:[
  "Crise migraineuse : AINS (si pas de CI) ± triptan ; antiémétique (métoclopramide/dompéridone)",
  "Céphalée de tension : antalgiques de palier 1, éviter la surconsommation",
  "Algie vasculaire de la face : oxygène 12–15 L/min au masque, sumatriptan SC (avis neuro)",
  "NE PAS débuter de corticoïdes à l'aveugle ; si Horton, après bilan inflammatoire et avis",
  "Éducation : limiter antalgiques < 10–15 j/mois (prévention abus médicamenteux)"
 ],
 courrier:"neuro_standard",
 pourquoi:"La céphalée brutale maximale d'emblée traduit une rupture vasculaire (anévrisme) jusqu'à preuve du contraire : la sensibilité de la TDM décroît avec le temps, d'où l'urgence. Après 50 ans, toute céphalée nouvelle impose d'éliminer une artérite de Horton (cécité évitable) et une lésion expansive."
},

/* ---------------- P. AVC / AIT ---------------- */
"avc":{
 lettre:"P", titre:"Suspicion AVC / AIT", sousTitre:"Fiche ultra-rapide — chaque minute compte",
 urgence:true, prioritaire:true,
 interrogatoire:[
  "HEURE DE DÉBUT précise / dernier moment vu sans symptôme (last known well)",
  "FAST : Face (asymétrie), Arm (chute de bras), Speech (trouble du langage), Time (heure)",
  "Symptômes : hémiparésie, hémihypoesthésie, aphasie/dysarthrie, déviation, trouble visuel (HLH, cécité monoculaire), vertige + diplopie",
  "Déficit fluctuant ou déjà régressif (AIT) ?",
  "Anticoagulant / antiagrégant en cours ?",
  "ATCD : FA, HTA, diabète, AVC, cardiopathie"
 ],
 drapeauxRouges:[
  "TOUT déficit neurologique focal d'apparition brutale = AVC jusqu'à preuve du contraire",
  "Même si symptômes RÉGRESSIFS / disparus (AIT) → risque élevé d'AVC constitué à court terme",
  "Trouble de conscience, céphalée brutale associée (évoquer hémorragie)",
  "Déficit dans un contexte de dissection (cervicalgie, Horner, trauma)"
 ],
 examenMinimal:[
  "GLYCÉMIE CAPILLAIRE (hypoglycémie = grand simulateur d'AVC)",
  "TA, FC (rechercher FA), SpO2, température",
  "FAST + score NIHSS simplifié (voir module dédié)",
  "Heure de début documentée"
 ],
 examenOriente:[
  "Score NIHSS simplifié MG : vigilance, langage, paralysie faciale, motricité bras/jambe, sensibilité, négligence, champ visuel",
  "Recherche de souffle cervical, auscultation cardiaque",
  "Recherche de signes de dissection (Horner, cervicalgie)"
 ],
 hypotheses:[
  "AVC ischémique (≈ 80 %)",
  "AVC hémorragique (≈ 20 %)",
  "AIT (déficit transitoire < 24 h, souvent < 1 h)",
  "Diagnostics différentiels : hypoglycémie, crise/déficit post-critique (Todd), migraine avec aura, vertige périphérique"
 ],
 examens:[
  "NE PAS attendre d'examen en ville : transfert immédiat vers unité neurovasculaire (UNV)",
  "À l'hôpital : imagerie cérébrale urgente (TDM ± angio-TDM ou IRM) pour fenêtre de thrombolyse/thrombectomie",
  "Glycémie capillaire en ville (seul examen à faire avant l'appel)"
 ],
 orientation:[
  {type:"samu", texte:"APPEL 15 SYSTÉMATIQUE pour tout déficit aigu OU AIT récent — transport UNV, fenêtre thérapeutique"},
  {type:"urg", texte:"AIT vu à distance : avis neurovasculaire urgent (bilan étiologique rapide, prévention secondaire)"}
 ],
 traitement:[
  "NE PAS donner d'aspirine ni d'anticoagulant avant l'imagerie (risque d'aggraver une hémorragie)",
  "NE PAS faire baisser la TA en phase aiguë sauf consigne du neurovasculaire",
  "Position demi-assise, VVP si possible, à jeun (risque de fausse route), O2 si SpO2 < 94 %",
  "Noter l'heure exacte de début et la transmettre au SAMU/UNV"
 ],
 courrier:"urgences_avc",
 pourquoi:"La fenêtre de thrombolyse (≤ 4h30) et de thrombectomie (jusqu'à 24 h sur sélection) impose un transfert immédiat : « time is brain », ~2 millions de neurones perdus par minute. Un AIT est une urgence car le risque d'AVC constitué est maximal dans les 48 premières heures."
},

/* ---------------- B. VERTIGE ---------------- */
"vertige":{
 lettre:"B", titre:"Vertige / trouble de l'équilibre", sousTitre:"Distinguer périphérique vs central",
 urgence:true,
 interrogatoire:[
  "Vrai vertige rotatoire vs instabilité vs malaise/lipothymie",
  "Mode d'installation et durée : secondes (VPPB), minutes-heures (Ménière), heures-jours (névrite)",
  "Déclenchement positionnel (lever, retournement dans le lit)",
  "Signes auditifs : hypoacousie, acouphènes, plénitude de l'oreille",
  "Signes neuro : céphalée, diplopie, dysarthrie, dysphagie, déficit, ataxie sévère",
  "Facteurs vasculaires : âge, HTA, diabète, AC/FA, tabac"
 ],
 drapeauxRouges:[
  "Signes neurologiques centraux associés (diplopie, dysarthrie, dysphagie, déficit, ataxie ne permettant pas la station debout)",
  "Céphalée ou cervicalgie brutale associée (dissection vertébrale, AVC cérébelleux)",
  "Nystagmus vertical, multidirectionnel ou ne diminuant pas à la fixation",
  "HINTS « central » (Head Impulse normal, nystagmus changeant, skew présent)",
  "Vertige + facteurs de risque vasculaires majeurs"
 ],
 examenMinimal:[
  "Recherche de nystagmus (sens, position, fixation)",
  "Romberg, marche, recherche d'ataxie",
  "Examen des paires crâniennes (oculomotricité, face, déglutition)",
  "TA couché/debout, auscultation"
 ],
 examenOriente:[
  "Head Impulse Test (HIT) — médecin formé",
  "Test of Skew (cover test alterné) — recherche de déviation verticale",
  "HINTS (HIT + Nystagmus + Skew) UNIQUEMENT si syndrome vestibulaire aigu CONTINU et médecin formé",
  "Manœuvre de Dix-Hallpike si suspicion de VPPB"
 ],
 hypotheses:[
  "Périphérique : VPPB (positionnel, bref), névrite vestibulaire (aigu prolongé sans signe auditif), maladie de Ménière (+ signes auditifs)",
  "Central : AVC/AIT vertébro-basilaire, AVC cérébelleux, SEP",
  "Autres : vertige multifactoriel du sujet âgé, iatrogène, vestibulopathie"
 ],
 examens:[
  "Aucun examen systématique pour un VPPB typique",
  "IRM cérébrale + TOF/angio en urgence si suspicion centrale",
  "Bilan ORL (audiométrie, VNG) si signes auditifs / suspicion de Ménière",
  "Ne pas se contenter d'un TDM (mauvaise sensibilité en fosse postérieure)"
 ],
 orientation:[
  {type:"samu", texte:"Signes centraux ou HINTS central → urgences neurovasculaires (15)"},
  {type:"specialiste", texte:"Signes auditifs / suspicion Ménière → ORL ; vertige central probable → neurologue"},
  {type:"domicile", texte:"VPPB typique → manœuvre libératrice (Epley) + kiné vestibulaire ; névrite → traitement symptomatique court + rééducation"}
 ],
 traitement:[
  "VPPB : manœuvre d'Epley/Semont, rééducation vestibulaire (kiné)",
  "Névrite vestibulaire : antivertigineux (ex. acétylleucine) en cure COURTE (≤ 3 j) puis rééducation précoce — éviter la chronicisation",
  "Hydratation, antiémétique si vomissements",
  "Ne pas prolonger les sédatifs vestibulaires (retarde la compensation)"
 ],
 courrier:"orl_vestibulaire",
 pourquoi:"Un syndrome vestibulaire aigu continu peut cacher un AVC cérébelleux/du tronc (jusqu'à 25 % des cas avec HINTS central). HINTS, fait correctement, est plus sensible qu'une IRM précoce pour détecter l'AVC. Le VPPB, lui, se diagnostique et se traite au cabinet sans imagerie."
},

/* ---------------- C. MALAISE / SYNCOPE ---------------- */
"syncope":{
 lettre:"C", titre:"Malaise / perte de connaissance / syncope", sousTitre:"Syncope vs crise vs lipothymie",
 urgence:true,
 interrogatoire:[
  "Description par un témoin +++ (durée, mouvements, coloration, reprise de conscience)",
  "Prodromes : sueurs, nausées, vision trouble (vagal) vs aucun (cardiaque)",
  "Circonstances : effort (alarme !), changement de position, douleur/émotion, miction",
  "Palpitations, douleur thoracique, dyspnée",
  "Morsure de langue LATÉRALE, perte d'urine, confusion post-critique (orientent crise)",
  "ATCD cardiaques, mort subite familiale, traitements (QT long, hypotenseurs)"
 ],
 drapeauxRouges:[
  "Syncope À L'EFFORT ou en décubitus",
  "Palpitations ou douleur thoracique précédant la syncope",
  "ECG anormal (BAV, QT long, Brugada, signes d'ischémie, bradycardie)",
  "ATCD de cardiopathie ou mort subite familiale précoce",
  "Traumatisme grave, absence totale de prodrome"
 ],
 examenMinimal:[
  "ECG 12 dérivations SYSTÉMATIQUE",
  "TA couché-debout (hypotension orthostatique), FC",
  "Glycémie capillaire",
  "Examen neurologique et cardiovasculaire (souffle)"
 ],
 examenOriente:[
  "Recherche de signes de crise (morsure latérale, confusion post-critique prolongée)",
  "Recherche de déficit neurologique focal",
  "Massage sino-carotidien : en milieu surveillé uniquement"
 ],
 hypotheses:[
  "Syncope réflexe / vagale (la plus fréquente, bénigne)",
  "Hypotension orthostatique (iatrogène, hypovolémie, dysautonomie)",
  "Syncope cardiaque (trouble du rythme/conduction, obstacle) — la plus grave",
  "Crise épileptique (diagnostic différentiel)",
  "Causes neuro rares (vol sous-clavier, drop-attack)"
 ],
 examens:[
  "ECG pour tous",
  "Si red flag cardiaque : avis cardiologique, Holter ECG, ETT, parfois Holter implantable",
  "Bilan biologique selon contexte (NFS, iono, glycémie)",
  "EEG/imagerie cérébrale seulement si arguments pour une crise ou un déficit neuro"
 ],
 orientation:[
  {type:"samu", texte:"Syncope d'effort, douleur thoracique, ECG menaçant → urgences / 15"},
  {type:"urg", texte:"Critères de gravité ou doute → hospitalisation pour surveillance et bilan"},
  {type:"specialiste", texte:"Suspicion cardiaque sans gravité immédiate → cardiologue rapide ; suspicion de crise → neurologue"},
  {type:"domicile", texte:"Syncope vagale typique, ECG et examen normaux → réassurance, mesures hygiéno-diététiques"}
 ],
 traitement:[
  "Syncope vagale : éducation (manœuvres de contre-pression, hydratation, éviter facteurs déclenchants)",
  "Hypotension orthostatique : revoir les traitements hypotenseurs, lever progressif, bas de contention",
  "Aucun traitement antiarythmique sans diagnostic précis",
  "Conseils conduite/poste à risque selon contexte"
 ],
 courrier:"cardio_syncope",
 pourquoi:"L'enjeu est de séparer la syncope vagale (bénigne) de la syncope cardiaque (risque de mort subite). L'ECG est l'examen clé. Une syncope à l'effort ou sans prodrome avec ATCD cardiaque doit être considérée comme cardiaque jusqu'à preuve du contraire (reco ESC)."
},

/* ---------------- D. CRISE / ÉPILEPSIE ---------------- */
"epilepsie":{
 lettre:"D", titre:"Crise convulsive / 1ère crise", sousTitre:"Première crise et indication d'EEG",
 urgence:true,
 interrogatoire:[
  "Description par témoin : début focal vs généralisé d'emblée",
  "Prodromes / aura, perte de connaissance, mouvements tonico-cloniques",
  "Morsure latérale de langue, perte d'urines, durée",
  "Confusion post-critique (phase post-critique = argument fort)",
  "Fièvre, toxiques, alcool (intoxication ou SEVRAGE), privation de sommeil",
  "Médicaments abaissant le seuil épileptogène, ATCD neuro, traumatisme, grossesse"
 ],
 drapeauxRouges:[
  "Crise > 5 min ou crises répétées sans reprise de conscience = ÉTAT DE MAL → 15",
  "Déficit post-critique persistant, trouble de conscience prolongé",
  "Fièvre + crise (méningo-encéphalite)",
  "Première crise avec déficit focal, trauma, anticoagulant, cancer, immunodépression",
  "Crise chez la femme enceinte (éclampsie)"
 ],
 examenMinimal:[
  "Constantes, GLYCÉMIE CAPILLAIRE (hypoglycémie)",
  "Examen neurologique complet (déficit focal, syndrome méningé)",
  "Recherche de morsure de langue, traumatisme",
  "ECG (diagnostic différentiel avec syncope convulsivante)"
 ],
 examenOriente:[
  "Recherche de déficit focal post-critique (paralysie de Todd)",
  "Évaluation de la vigilance et de la reprise de contact",
  "Recherche de signes d'intoxication / sevrage"
 ],
 hypotheses:[
  "Crise épileptique provoquée (métabolique, toxique, sevrage, fébrile)",
  "Crise révélatrice d'une lésion (tumeur, séquelle, MAV, AVC)",
  "Épilepsie idiopathique/génétique",
  "Diagnostic différentiel : syncope convulsivante, crise psychogène non épileptique"
 ],
 examens:[
  "Bilan biologique : NFS, ionogramme, calcémie, glycémie, fonction rénale, CRP, ± toxiques/alcoolémie selon contexte",
  "Imagerie cérébrale URGENTE si : déficit focal, trauma, anticoagulant, cancer, immunodépression, céphalée inhabituelle, âge élevé, 1ère crise atypique",
  "EEG : non systématique en urgence, à PROGRAMMER (idéalement < 24–48 h) — voir module « Quand prescrire un EEG ? »",
  "EEG en urgence si suspicion d'état de mal NON convulsif / confusion persistante inexpliquée"
 ],
 orientation:[
  {type:"samu", texte:"État de mal (> 5 min/répétée), trouble de conscience persistant, fièvre → 15"},
  {type:"urg", texte:"1ère crise avec red flag (déficit, trauma, terrain) → urgences pour imagerie/bilan"},
  {type:"specialiste", texte:"1ère crise non compliquée, examen normal → neurologue rapide + EEG programmé (ne pas conduire en attendant)"}
 ],
 traitement:[
  "Crise en cours : protéger (PLS après la crise), ne rien mettre en bouche, chronométrer",
  "Si > 5 min et disponible : benzodiazépine (ex. diazépam/midazolam) selon protocole, puis 15",
  "NE PAS débuter d'antiépileptique de fond après une 1ère crise sans avis neurologique",
  "Conseils : pas de conduite, éviter privation de sommeil/alcool, sécurité (hauteur, baignade)"
 ],
 courrier:"eeg",
 pourquoi:"La phase post-critique (confusion, déficit de Todd) et la morsure latérale de langue distinguent la crise de la syncope. Un EEG normal n'élimine PAS une épilepsie (sensibilité ~30–50 % en intercritique) ; il aide à classer le syndrome. L'imagerie cherche une cause structurale."
},

/* ---------------- E. DÉFICIT MOTEUR ---------------- */
"deficit_moteur":{
 lettre:"E", titre:"Déficit moteur aigu ou progressif", sousTitre:"Localiser : central, médullaire, périphérique",
 urgence:true,
 interrogatoire:[
  "Mode : brutal (vasculaire), rapidement progressif (heures-jours), chronique",
  "Topographie : hémicorps, paraparésie, mono-membre, distal/proximal",
  "Signes associés : sensitifs, sphinctériens, douleur rachidienne, troubles visuels",
  "Contexte : fièvre, néoplasie, trauma, vaccination/infection récente (GBS)",
  "Fatigabilité fluctuante (myasthénie), dyspnée"
 ],
 drapeauxRouges:[
  "Déficit brutal hémicorporel → AVC (cf. fiche AVC, appel 15)",
  "Paraparésie + niveau sensitif + troubles sphinctériens → compression médullaire (IRM urgente)",
  "Déficit ascendant rapide + aréflexie → Guillain-Barré (surveiller respiration/déglutition)",
  "Déficit + fièvre + douleur rachidienne → spondylodiscite / épidurite"
 ],
 examenMinimal:[
  "Force segmentaire cotée MRC 0–5, Barré / Mingazzini",
  "ROT, recherche de Babinski, tonus",
  "Niveau sensitif, examen périnéal si suspicion médullaire",
  "Recherche d'amyotrophie, fasciculations"
 ],
 examenOriente:[
  "Distinguer syndrome pyramidal (ROT vifs, Babinski, spasticité) vs périphérique (ROT abolis, amyotrophie, fasciculations)",
  "Rechercher un niveau médullaire et un syndrome sous-lésionnel",
  "Tester la fatigabilité (myasthénie) et la fonction respiratoire (toux, parole)"
 ],
 hypotheses:[
  "Central : AVC, SEP, tumeur, compression médullaire",
  "Corne antérieure / racine : SLA, radiculopathie",
  "Nerf : polyradiculonévrite (GBS), neuropathie",
  "Jonction : myasthénie ; Muscle : myopathie/myosite"
 ],
 examens:[
  "Imagerie ciblée : IRM cérébrale (central) ou IRM médullaire URGENTE (syndrome médullaire)",
  "ENMG (orientation périphérique, programmé)",
  "Biologie : CPK, NFS, iono, glycémie, bilan inflammatoire/auto-immun selon contexte",
  "PL en milieu spécialisé si GBS (dissociation albumino-cytologique) ou inflammation"
 ],
 orientation:[
  {type:"samu", texte:"Déficit brutal (AVC), GBS avec atteinte respiratoire/bulbaire, compression médullaire aiguë → 15 / urgences"},
  {type:"urg", texte:"Suspicion compression médullaire ou GBS → urgences pour IRM/PL"},
  {type:"specialiste", texte:"Déficit progressif sans urgence → neurologue (± ENMG)"}
 ],
 traitement:[
  "Pas de traitement spécifique en ville hors prise en charge de l'urgence",
  "Surveillance respiratoire et déglutition si suspicion neuromusculaire",
  "Antalgie de la douleur rachidienne sans retarder l'imagerie"
 ],
 courrier:"neuro_urgent",
 pourquoi:"Localiser la lésion oriente toute la prise en charge : un syndrome pyramidal (ROT vifs + Babinski) signe une atteinte centrale, l'aréflexie une atteinte périphérique. La compression médullaire et le GBS sont des urgences car le pronostic fonctionnel/vital dépend de la rapidité."
},

/* ---------------- F. TROUBLE SENSITIF ---------------- */
"sensitif":{
 lettre:"F", titre:"Trouble sensitif / paresthésies", sousTitre:"Topographie et profil temporel",
 urgence:false,
 interrogatoire:[
  "Type : engourdissement, fourmillements, brûlures, décharges, douleur",
  "Topographie : longueur-dépendante (chaussettes/gants), radiculaire, tronculaire, hémicorporelle, suspendue",
  "Profil : aigu, intermittent, chronique progressif",
  "Contexte : diabète, alcool, carences, chimiothérapie, lombalgie/cervicalgie",
  "Signes associés : déficit moteur, troubles sphinctériens, signes centraux"
 ],
 drapeauxRouges:[
  "Trouble sensitif hémicorporel brutal → AVC/AIT",
  "Niveau sensitif tronculaire + troubles sphinctériens → atteinte médullaire",
  "Anesthésie en selle → queue de cheval (urgence)",
  "Installation rapide ascendante → GBS"
 ],
 examenMinimal:[
  "Cartographie sensitive : tact, douleur (piqûre), ± température",
  "Sensibilité profonde : vibration (diapason), sens de position",
  "ROT, recherche de déficit moteur associé",
  "Recherche d'un niveau médullaire"
 ],
 examenOriente:[
  "Distinguer atteinte longueur-dépendante (polyneuropathie) vs radiculaire vs centrale",
  "Signe de Tinel/Phalen si suspicion de canal carpien",
  "Romberg (atteinte cordonale postérieure)"
 ],
 hypotheses:[
  "Polyneuropathie longueur-dépendante (diabète, alcool, carences)",
  "Syndrome canalaire (canal carpien, ulnaire au coude)",
  "Radiculopathie (hernie discale)",
  "Atteinte centrale (AVC, SEP), atteinte cordonale (carence B12)"
 ],
 examens:[
  "Biologie : glycémie/HbA1c, B12-folates, TSH, NFS, fonction rénale, ± électrophorèse selon contexte",
  "ENMG si déficit, atteinte motrice, doute diagnostique (programmé)",
  "IRM (cérébrale ou médullaire) si suspicion centrale/médullaire"
 ],
 orientation:[
  {type:"samu", texte:"Trouble sensitif brutal hémicorporel (AVC) ou anesthésie en selle → 15 / urgences"},
  {type:"specialiste", texte:"Polyneuropathie ou syndrome canalaire → neurologue / ENMG programmé"},
  {type:"domicile", texte:"Paresthésies isolées avec bilan initial normal → surveillance, correction des facteurs (glycémie, alcool, carences)"}
 ],
 traitement:[
  "Traiter la cause (équilibre du diabète, sevrage alcool, supplémentation B12)",
  "Douleur neuropathique : voir fiche dédiée (gabapentine, prégabaline, duloxétine, amitriptyline)",
  "Canal carpien : attelle nocturne, avis si déficit/amyotrophie"
 ],
 courrier:"enmg",
 pourquoi:"La topographie est diagnostique : « chaussettes-gants » = polyneuropathie longueur-dépendante ; un territoire radiculaire évoque une compression ; une atteinte hémicorporelle, une lésion centrale. La sensibilité profonde (vibration, position) explore les grosses fibres et les cordons postérieurs."
},

/* ---------------- G. TROUBLE DE LA MARCHE ---------------- */
"marche":{
 lettre:"G", titre:"Trouble de la marche", sousTitre:"Reconnaître le type de marche pathologique",
 urgence:false,
 interrogatoire:[
  "Mode d'installation et évolution, chutes",
  "Douleur, déficit moteur, troubles sensitifs associés",
  "Troubles sphinctériens, troubles cognitifs (triade Hakim)",
  "Vertiges, signes parkinsoniens (lenteur, tremblement)",
  "Traitements (sédatifs, neuroleptiques), alcool"
 ],
 drapeauxRouges:[
  "Installation brutale (AVC, compression médullaire)",
  "Troubles sphinctériens + déficit MI bilatéral (myélopathie, queue de cheval)",
  "Marche + fièvre + douleur rachidienne (infection)",
  "Chutes répétées avec troubles cognitifs récents"
 ],
 examenMinimal:[
  "Observer la marche spontanée, demi-tour, talons/pointes, tandem",
  "Romberg, force et ROT des membres inférieurs, Babinski",
  "Recherche d'un syndrome cérébelleux, parkinsonien, déficitaire"
 ],
 examenOriente:[
  "Reconnaître : steppage (déficit releveurs), fauchage (pyramidal), marche à petits pas/freezing (parkinsonien/frontal), ataxie (cérébelleuse/proprioceptive), dandinante (myopathie)",
  "Pull-test si syndrome parkinsonien",
  "Timed Up and Go chez le sujet âgé"
 ],
 hypotheses:[
  "Marche neurologique : pyramidale, cérébelleuse, parkinsonienne, ataxie proprioceptive, steppage",
  "Hydrocéphalie à pression normale (triade : marche + cognition + sphincters)",
  "Causes ostéo-articulaires, sensorielles, iatrogènes",
  "Myélopathie cervicarthrosique"
 ],
 examens:[
  "IRM cérébrale/médullaire selon orientation",
  "Bilan métabolique (B12, TSH, glycémie)",
  "ENMG si suspicion neuropathie",
  "Avis gériatrique/rééducation si chutes du sujet âgé"
 ],
 orientation:[
  {type:"urg", texte:"Installation brutale ou syndrome médullaire → urgences"},
  {type:"specialiste", texte:"Trouble progressif → neurologue ; suspicion HPN → neurologie/neurochirurgie"},
  {type:"domicile", texte:"Trouble multifactoriel du sujet âgé → kiné, adaptation domicile, révision traitements"}
 ],
 traitement:[
  "Rééducation (kiné neurologique), aides techniques",
  "Prévention des chutes, révision de l'ordonnance",
  "Traitement de la cause spécifique"
 ],
 courrier:"kine_neuro",
 pourquoi:"Le type de marche localise la lésion : le fauchage traduit la spasticité pyramidale, le steppage un déficit des releveurs (nerf fibulaire/L5), la marche ataxique aggravée à la fermeture des yeux une atteinte proprioceptive. La triade de Hakim doit faire évoquer une hydrocéphalie chronique curable."
},

/* ---------------- H. TREMBLEMENT ---------------- */
"tremblement":{
 lettre:"H", titre:"Tremblement / mouvements anormaux", sousTitre:"Repos vs action ; distinguer Parkinson",
 urgence:false,
 interrogatoire:[
  "Circonstances : repos, attitude (posture), action/intention",
  "Topographie, symétrie, retentissement fonctionnel",
  "ATCD familiaux, consommation d'alcool (amélioration ?), caféine, stress",
  "Médicaments tremblogènes (β2, lithium, valproate, neuroleptiques)",
  "Signes associés : lenteur, rigidité, troubles de l'écriture, de la voix"
 ],
 drapeauxRouges:[
  "Installation brutale ou unilatérale rapide",
  "Mouvements anormaux fébriles ou avec confusion (encéphalite, sevrage)",
  "Syndrome cérébelleux aigu associé",
  "Sujet jeune avec tremblement + troubles hépatiques/psy (maladie de Wilson)"
 ],
 examenMinimal:[
  "Observer au repos (mains sur les cuisses), en attitude (bras tendus), à l'action (doigt-nez, verre)",
  "Recherche de rigidité, roue dentée, bradykinésie",
  "Écriture (micrographie), voix"
 ],
 examenOriente:[
  "Tremblement de repos asymétrique + akinésie + rigidité → syndrome parkinsonien",
  "Tremblement d'attitude/action bilatéral, familial → tremblement essentiel",
  "Tremblement intentionnel + dysmétrie → cérébelleux"
 ],
 hypotheses:[
  "Tremblement essentiel (le plus fréquent, action/attitude, familial, amélioré par l'alcool)",
  "Maladie de Parkinson (repos, asymétrique, akinéto-rigide)",
  "Tremblement iatrogène / physiologique exagéré",
  "Tremblement cérébelleux, dystonique ; maladie de Wilson (sujet jeune)"
 ],
 examens:[
  "Diagnostic essentiellement clinique",
  "TSH, bilan hépatique, cuprémie/céruloplasmine si sujet jeune (Wilson)",
  "DaTSCAN / avis spécialisé si doute Parkinson vs tremblement essentiel",
  "Revoir les médicaments tremblogènes"
 ],
 orientation:[
  {type:"specialiste", texte:"Suspicion de Parkinson ou doute diagnostique → neurologue (mouvements anormaux)"},
  {type:"domicile", texte:"Tremblement essentiel gênant → information, propranolol ou primidone selon terrain"}
 ],
 traitement:[
  "Tremblement essentiel : propranolol (si pas de CI) ou primidone",
  "Parkinson : ne pas initier de dopathérapie sans avis neurologique",
  "Supprimer/diminuer les facteurs tremblogènes (caféine, médicaments)"
 ],
 courrier:"parkinson",
 pourquoi:"Le moment d'apparition oriente le diagnostic : repos → parkinsonien, attitude/action → essentiel, intention → cérébelleux. Le tremblement essentiel est typiquement bilatéral, familial et amélioré par l'alcool ; le tremblement parkinsonien est asymétrique, de repos, avec akinésie et rigidité."
},

/* ---------------- I. TROUBLE COGNITIF ---------------- */
"cognitif":{
 lettre:"I", titre:"Trouble cognitif / confusion / mémoire", sousTitre:"Confusion aiguë vs déclin chronique",
 urgence:true,
 interrogatoire:[
  "Aigu (confusion/délirium) vs chronique (déclin progressif)",
  "Fluctuations, hallucinations, inversion du rythme nycthéméral",
  "Retentissement sur les activités, anosognosie, plainte de l'entourage",
  "Médicaments (anticholinergiques, benzodiazépines), alcool, fièvre, douleur, globe, fécalome",
  "Signes neuro focaux, céphalées, fièvre, traumatisme"
 ],
 drapeauxRouges:[
  "Confusion aiguë fébrile → méningo-encéphalite",
  "Confusion + déficit focal / céphalée → cause structurale (AVC, hématome, tumeur)",
  "Confusion + signes de sevrage (alcool) → delirium tremens",
  "Trouble de conscience, début brutal"
 ],
 examenMinimal:[
  "Évaluer la vigilance et l'orientation temps/espace/personne",
  "Constantes, glycémie capillaire, SpO2, recherche de globe/fécalome/douleur",
  "Examen neurologique focal, syndrome méningé"
 ],
 examenOriente:[
  "Test cognitif rapide : MMSE ou MoCA (en dehors de l'urgence)",
  "Recherche de syndrome frontal, aphasie, apraxie",
  "CAM (Confusion Assessment Method) pour le délirium"
 ],
 hypotheses:[
  "Confusion aiguë : cause organique (infection, métabolique, médicamenteuse, neuro)",
  "Démences : Alzheimer, vasculaire, à corps de Lewy, fronto-temporale",
  "Causes curables : hypothyroïdie, carence B12, HPN, dépression (pseudo-démence), iatrogène"
 ],
 examens:[
  "Confusion aiguë : bilan large (NFS, iono, calcémie, glycémie, CRP, BU/ECBU, fonction rénale/hépatique, ± toxiques), ECG, imagerie selon contexte",
  "Bilan de démence : TSH, B12, folates, ± sérologies, IRM cérébrale, bilan neuropsychologique",
  "PL si suspicion d'encéphalite (hospitalier)"
 ],
 orientation:[
  {type:"samu", texte:"Confusion fébrile, déficit focal, trouble de conscience → urgences"},
  {type:"specialiste", texte:"Déclin cognitif chronique → consultation mémoire / neurologue / gériatre"},
  {type:"domicile", texte:"Après élimination des causes aiguës : bilan ambulatoire et suivi"}
 ],
 traitement:[
  "Confusion : traiter la cause, supprimer les médicaments délirogènes, réafférentation, environnement calme",
  "Démence : prise en charge globale, pas d'initiation de traitement spécifique sans bilan",
  "Corriger les facteurs aggravants (déshydratation, douleur, sensoriel)"
 ],
 courrier:"neuro_standard",
 pourquoi:"Une confusion AIGUË est d'abord une urgence médicale : il faut chercher une cause organique (infection, métabolique, médicamenteuse) avant d'évoquer une démence. Beaucoup de causes de déclin cognitif sont réversibles (hypothyroïdie, B12, HPN, iatrogénie), d'où l'intérêt d'un bilan systématique."
},

/* ---------------- J. DIPLOPIE / NEURO-OPHTALMO ---------------- */
"diplopie":{
 lettre:"J", titre:"Diplopie / trouble visuel", sousTitre:"Neuro-ophtalmologie de premier recours",
 urgence:true,
 interrogatoire:[
  "Diplopie mono- ou binoculaire (disparaît en fermant un œil = binoculaire = neuro)",
  "Horizontale / verticale, permanente / intermittente / fatigable",
  "Baisse d'acuité, amputation du champ visuel, douleur oculaire",
  "Céphalée associée, signes neuro, facteurs vasculaires",
  "Fatigabilité (myasthénie), poussée antérieure (SEP)"
 ],
 drapeauxRouges:[
  "Diplopie brutale + céphalée → anévrisme (III douloureux), apoplexie",
  "Paralysie du III avec mydriase → compression anévrismale (urgence)",
  "Baisse d'acuité brutale (NORB, NOIA artéritique de Horton, OACR)",
  "Diplopie + autres signes du tronc → AVC vertébro-basilaire"
 ],
 examenMinimal:[
  "Acuité visuelle, champ visuel par confrontation",
  "Oculomotricité dans les 9 positions, recherche de ptosis, anisocorie",
  "Réflexe photomoteur (direct/consensuel), fond d'œil si possible"
 ],
 examenOriente:[
  "Identifier le nerf atteint : III (ptosis, mydriase, œil en bas-dehors), IV (vertical), VI (déficit abduction)",
  "Test de fatigabilité (regard soutenu vers le haut) si suspicion myasthénie",
  "Recherche de signes centraux associés"
 ],
 hypotheses:[
  "Atteinte des nerfs oculomoteurs (III, IV, VI) : microvasculaire (diabète/HTA), anévrismale, tumorale",
  "Myasthénie (diplopie/ptosis fluctuants)",
  "Névrite optique (SEP), NOIA (Horton), AVC du tronc",
  "Causes orbitaires (Basedow)"
 ],
 examens:[
  "VS/CRP en URGENCE si > 50 ans (Horton)",
  "IRM cérébrale + angio si III douloureux, signes centraux, NORB",
  "Glycémie/HbA1c, anticorps anti-RACh si suspicion myasthénie",
  "Avis ophtalmologique (fond d'œil, champ visuel)"
 ],
 orientation:[
  {type:"samu", texte:"III douloureux/avec mydriase, baisse d'acuité brutale, signes centraux → urgences"},
  {type:"urg", texte:"Suspicion de Horton avec signe visuel → urgence (corticothérapie)"},
  {type:"specialiste", texte:"Diplopie isolée stable → neurologue/ophtalmologue rapproché"}
 ],
 traitement:[
  "Pas de traitement en ville hors urgence",
  "Si Horton fortement suspecté avec atteinte visuelle : corticothérapie urgente après bilan (milieu spécialisé)",
  "Occlusion alternée pour le confort en attendant le bilan"
 ],
 courrier:"neuro_urgent",
 pourquoi:"Une paralysie du III avec atteinte pupillaire (mydriase) est une urgence : elle évoque une compression anévrismale (les fibres pupillaires sont périphériques). La diplopie fatigable oriente vers la myasthénie. Après 50 ans, toute atteinte visuelle impose d'éliminer une artérite de Horton."
},

/* ---------------- K. DOULEUR NEUROPATHIQUE ---------------- */
"neuropathique":{
 lettre:"K", titre:"Douleur neuropathique / névralgie", sousTitre:"Reconnaître et traiter la douleur neuropathique",
 urgence:false,
 interrogatoire:[
  "Caractère : brûlure, décharges électriques, fourmillements, étau",
  "Territoire systématisé (nerf, racine), allodynie (douleur au frôlement)",
  "Questionnaire DN4 (≥ 4/10 = probable douleur neuropathique)",
  "Cause : zona, diabète, post-chirurgie, radiculopathie, névralgie du trijumeau",
  "Retentissement (sommeil, humeur)"
 ],
 drapeauxRouges:[
  "Névralgie du trijumeau chez sujet jeune ou bilatérale → IRM (SEP, lésion)",
  "Névralgie avec déficit neurologique associé",
  "Douleur + signes de compression médullaire/queue de cheval",
  "Zona ophtalmique (atteinte cornéenne) ou immunodéprimé"
 ],
 examenMinimal:[
  "Cartographie sensitive du territoire douloureux (DN4)",
  "Recherche d'allodynie, d'hypoesthésie",
  "Examen moteur et ROT du territoire concerné"
 ],
 examenOriente:[
  "Identifier le territoire (tronculaire, radiculaire, trijumeau)",
  "Recherche de zone gâchette (névralgie du trijumeau)"
 ],
 hypotheses:[
  "Polyneuropathie douloureuse (diabète +++)",
  "Névralgie du trijumeau, douleur post-zostérienne",
  "Radiculopathie, syndrome canalaire douloureux",
  "Douleur centrale (post-AVC, SEP)"
 ],
 examens:[
  "Diagnostic clinique (DN4)",
  "Bilan de la cause (glycémie/HbA1c, ENMG si besoin)",
  "IRM si névralgie atypique du trijumeau ou suspicion centrale"
 ],
 orientation:[
  {type:"specialiste", texte:"Névralgie réfractaire, atypique ou avec red flag → neurologue / centre douleur"},
  {type:"domicile", texte:"Douleur neuropathique typique → traitement de 1ère intention en MG et suivi"}
 ],
 traitement:[
  "1ère intention : gabapentine ou prégabaline, ou duloxétine, ou amitriptyline (selon terrain)",
  "Névralgie du trijumeau : carbamazépine (ou oxcarbazépine) en 1ère intention",
  "Douleur localisée : emplâtres de lidocaïne ; topiques",
  "Éviter les opioïdes en 1ère intention ; réévaluer l'efficacité/tolérance"
 ],
 courrier:"neuro_standard",
 pourquoi:"La douleur neuropathique ne répond pas aux antalgiques usuels : elle relève des antiépileptiques (gabapentinoïdes, carbamazépine pour le trijumeau) et antidépresseurs (tricycliques, IRSNa). Le DN4 ≥ 4 la rend probable. Une névralgie du trijumeau chez un sujet jeune doit faire éliminer une SEP."
},

/* ---------------- L. LOMBOSCIATIQUE / QUEUE DE CHEVAL ---------------- */
"lombosciatique":{
 lettre:"L", titre:"Lombosciatique / queue de cheval", sousTitre:"Repérer l'urgence chirurgicale",
 urgence:true,
 interrogatoire:[
  "Topographie de la douleur (L5 : face externe jambe, dos du pied ; S1 : mollet, talon, plante)",
  "Facteur mécanique vs inflammatoire (réveil nocturne, raideur matinale)",
  "Déficit moteur, troubles sphinctériens, anesthésie en selle",
  "Notion de trauma, contexte néoplasique, fièvre, AEG",
  "Impulsivité à la toux, durée d'évolution"
 ],
 drapeauxRouges:[
  "SYNDROME DE LA QUEUE DE CHEVAL : anesthésie en selle, troubles sphinctériens (rétention/incontinence), déficit bilatéral → URGENCE NEUROCHIRURGICALE",
  "Déficit moteur progressif ou sévère (sciatique paralysante, MRC ≤ 3)",
  "Fièvre + douleur rachidienne (spondylodiscite, épidurite)",
  "Contexte néoplasique, AEG, douleur inflammatoire nocturne (métastase)"
 ],
 examenMinimal:[
  "Lasègue (et Lasègue controlatéral), signe de la sonnette",
  "Force des releveurs/fléchisseurs du pied (L5/S1), réflexe achilléen (S1)",
  "Examen périnéal : tonus anal, sensibilité en selle si suspicion (avec accord)",
  "Recherche de globe vésical"
 ],
 examenOriente:[
  "Testing radiculaire L5 (releveur du gros orteil) et S1 (marche sur pointes, achilléen)",
  "Cruralgie : Léri (Lasègue inversé), réflexe rotulien (L4)",
  "Recherche de déficit moteur coté MRC"
 ],
 hypotheses:[
  "Lombosciatique commune par hernie discale (la plus fréquente)",
  "Syndrome de la queue de cheval (urgence)",
  "Sciatique symptomatique : tumeur, infection, fracture",
  "Cruralgie (L3-L4)"
 ],
 examens:[
  "Lombosciatique commune non compliquée : PAS d'imagerie avant 6–8 semaines",
  "IRM lombaire EN URGENCE si : queue de cheval, déficit moteur, fièvre, néoplasie, douleur inflammatoire",
  "Bilan inflammatoire si suspicion infectieuse/tumorale"
 ],
 orientation:[
  {type:"samu", texte:"Syndrome de queue de cheval → urgences / neurochirurgie sans délai (IRM + décompression < 48 h)"},
  {type:"urg", texte:"Sciatique paralysante, fièvre, suspicion tumorale → urgences pour imagerie"},
  {type:"domicile", texte:"Lombosciatique commune : antalgie, maintien d'activité, réévaluation à 4–6 semaines"}
 ],
 traitement:[
  "Lombosciatique commune : antalgiques (palier 1-2), AINS courte durée si pas de CI, maintien de l'activité (éviter le repos strict)",
  "Information, kiné si besoin, éviter l'imagerie précoce",
  "AUCUN délai si red flag : IRM et avis chirurgical en urgence"
 ],
 courrier:"queue_cheval",
 pourquoi:"Le syndrome de la queue de cheval est une urgence chirurgicale absolue : une décompression retardée laisse des séquelles sphinctériennes et sexuelles définitives. À l'inverse, la lombosciatique commune guérit le plus souvent sans imagerie ; l'IRM précoce n'est utile qu'en présence de drapeaux rouges."
},

/* ---------------- M. SOMMEIL ---------------- */
"sommeil":{
 lettre:"M", titre:"Trouble du sommeil neurologique", sousTitre:"SAHOS, hypersomnie, narcolepsie, parasomnies",
 urgence:false,
 interrogatoire:[
  "Insomnie vs hypersomnolence diurne (à distinguer de la fatigue)",
  "Ronflements, apnées rapportées, sommeil non réparateur, céphalées matinales (SAHOS)",
  "Somnolence : score d'EPWORTH ; STOP-Bang pour le risque de SAHOS",
  "Cataplexie (perte du tonus déclenchée par l'émotion), hallucinations hypnagogiques, paralysie du sommeil (narcolepsie)",
  "Comportements nocturnes : parasomnies vs crises nocturnes (stéréotypées, brèves, en sommeil lent)",
  "Impatiences/jambes sans repos, mouvements périodiques",
  "Maladie neuro associée (Parkinson, AVC, SEP, démence)"
 ],
 drapeauxRouges:[
  "Somnolence sévère avec conduite/poste à risque (sécurité)",
  "Comportements nocturnes violents ou stéréotypés évoquant une épilepsie nocturne",
  "Troubles du comportement en sommeil paradoxal (TCSP) → risque de maladie neurodégénérative",
  "SAHOS sévère avec comorbidités cardiovasculaires"
 ],
 examenMinimal:[
  "IMC, périmètre cervical, examen ORL (oropharynx, Mallampati)",
  "TA, recherche de comorbidités cardiovasculaires",
  "Questionnaires : Epworth, STOP-Bang, agenda du sommeil"
 ],
 examenOriente:[
  "Recherche de signes de maladie neurologique (Parkinson, etc.)",
  "Évaluation de la vigilance, examen neurologique orienté"
 ],
 hypotheses:[
  "SAHOS (ronflements, apnées, somnolence, surpoids)",
  "Insomnie chronique",
  "Hypersomnolence centrale / narcolepsie (± cataplexie)",
  "Parasomnies (somnambulisme, terreurs, TCSP), SJSR/mouvements périodiques",
  "Épilepsie nocturne (diagnostic différentiel des parasomnies)"
 ],
 examens:[
  "Polygraphie ventilatoire si SAHOS probable (1ère intention)",
  "Polysomnographie si doute, parasomnie atypique, suspicion d'épilepsie nocturne, hypersomnolence centrale",
  "TILE/MSLT si suspicion de narcolepsie/hypersomnie centrale (après avis spécialisé)",
  "EEG ou vidéo-EEG si suspicion de crise nocturne",
  "Bilan martial (ferritine) si SJSR"
 ],
 orientation:[
  {type:"specialiste", texte:"Centre du sommeil pour PSG/MSLT, ORL/pneumo pour SAHOS, neurologue si narcolepsie/épilepsie nocturne/TCSP"},
  {type:"domicile", texte:"Insomnie chronique → mesures d'hygiène du sommeil, TCC-i ; SJSR → correction d'une carence martiale"}
 ],
 traitement:[
  "Hygiène du sommeil, TCC de l'insomnie en 1ère intention (éviter les hypnotiques au long cours)",
  "SAHOS : règles hygiéno-diététiques, PPC selon sévérité (après enregistrement)",
  "SJSR : corriger la carence martiale (cible ferritine), éviter les facteurs aggravants",
  "Ne pas initier de psychostimulant/traitement de la narcolepsie sans avis spécialisé"
 ],
 courrier:"sommeil",
 pourquoi:"Il faut d'abord distinguer somnolence (s'endort), fatigue (épuisement sans endormissement) et hypersomnie. Le SAHOS est fréquent et sous-diagnostiqué (risque cardiovasculaire). La cataplexie est quasi pathognomonique de la narcolepsie de type 1. Les parasomnies de l'adulte, surtout le TCSP, peuvent annoncer une maladie de Parkinson."
},

/* ---------------- N. PARALYSIE FACIALE ---------------- */
"paralysie_faciale":{
 lettre:"N", titre:"Paralysie faciale", sousTitre:"Centrale vs périphérique — la question clé",
 urgence:true,
 interrogatoire:[
  "Installation, douleur rétro-auriculaire, contexte viral",
  "Atteinte du front (clé centrale/périphérique)",
  "Signes associés : déficit d'un membre, troubles du langage (central)",
  "Hyperacousie, agueusie, larmoiement, vésicules (zona = Ramsay-Hunt)",
  "Notion de morsure de tique / érythème migrant (Lyme), diabète"
 ],
 drapeauxRouges:[
  "Atteinte ÉPARGNANT le front + déficit/aphasie associés → paralysie faciale CENTRALE → AVC (15)",
  "Paralysie faciale bilatérale (Lyme, GBS, sarcoïdose)",
  "Vésicules dans le conduit auditif (zona, Ramsay-Hunt)",
  "Contexte fébrile, otite, masse parotidienne"
 ],
 examenMinimal:[
  "Faire relever les sourcils, fermer les yeux, montrer les dents",
  "Périphérique = TOUT l'hémiface (front compris) ; Central = épargne relative du front",
  "Recherche de signe de Charles Bell (l'œil se révulse), occlusion palpébrale",
  "Examen neurologique complet (membres, langage)"
 ],
 examenOriente:[
  "Examen otoscopique (vésicules, otite)",
  "Recherche d'autres atteintes de nerfs crâniens",
  "Évaluation de l'occlusion oculaire (protection cornéenne)"
 ],
 hypotheses:[
  "Paralysie faciale périphérique idiopathique (a frigore, paralysie de Bell) — la plus fréquente",
  "Zona du ganglion géniculé (Ramsay-Hunt)",
  "Lyme, diabète, post-otitique, tumeur (parotide, angle ponto-cérébelleux)",
  "Paralysie faciale CENTRALE (AVC) si front épargné + autres signes"
 ],
 examens:[
  "Paralysie faciale périphérique isolée typique : pas d'imagerie en urgence",
  "Sérologie de Lyme si contexte ; glycémie",
  "IRM si atypie, absence de récupération à 1 mois, atteinte d'autres paires crâniennes",
  "Imagerie cérébrale en urgence si suspicion de forme centrale"
 ],
 orientation:[
  {type:"samu", texte:"Paralysie faciale centrale (front épargné + déficit/aphasie) → 15 (AVC)"},
  {type:"specialiste", texte:"Ramsay-Hunt, formes atypiques, non-récupération → ORL/neurologue"},
  {type:"domicile", texte:"Paralysie de Bell typique → corticothérapie précoce + protection oculaire + suivi"}
 ],
 traitement:[
  "Paralysie de Bell : corticothérapie orale précoce (< 72 h) si pas de CI (ex. prednisolone 1 mg/kg, ~7 j)",
  "PROTECTION OCULAIRE +++ : larmes artificielles, occlusion nocturne (risque de kératite)",
  "Antiviral à associer si zona (Ramsay-Hunt) ou forme sévère, avis spécialisé",
  "Antibiothérapie si maladie de Lyme confirmée"
 ],
 courrier:"neuro_urgent",
 pourquoi:"La distinction est anatomique : le territoire facial supérieur (front) reçoit une innervation corticale bilatérale, donc il est ÉPARGNÉ dans une atteinte centrale (AVC) et ATTEINT dans une atteinte périphérique. Une paralysie faciale centrale = AVC jusqu'à preuve du contraire. Dans la paralysie de Bell, la protection cornéenne et la corticothérapie précoce conditionnent le pronostic."
},

/* ---------------- O. APHASIE / DYSARTHRIE ---------------- */
"langage":{
 lettre:"O", titre:"Trouble du langage / aphasie / dysarthrie", sousTitre:"Distinguer aphasie et dysarthrie",
 urgence:true,
 interrogatoire:[
  "Installation : brutale (AVC) vs progressive (dégénératif, tumeur)",
  "Manque du mot, paraphasies, trouble de la compréhension (aphasie)",
  "Élocution pâteuse/scandée avec langage normal (dysarthrie)",
  "Signes associés : déficit moteur, trouble de déglutition",
  "Contexte vasculaire, néoplasique"
 ],
 drapeauxRouges:[
  "Aphasie ou dysarthrie d'apparition BRUTALE → AVC (15)",
  "Trouble du langage + déficit moteur / facial",
  "Trouble de déglutition associé (fausses routes)",
  "Installation rapide avec céphalée/fièvre"
 ],
 examenMinimal:[
  "Langage spontané (fluence), compréhension (ordres simples), répétition, dénomination",
  "Articulation (dysarthrie) vs structure du langage (aphasie)",
  "Examen neurologique : face, membres, déglutition"
 ],
 examenOriente:[
  "Aphasie de Broca (non fluente, compréhension préservée, conscience du trouble) vs Wernicke (fluente, jargon, compréhension altérée)",
  "Dysarthrie : cérébelleuse (scandée), paralytique, extrapyramidale",
  "Recherche d'une apraxie bucco-faciale"
 ],
 hypotheses:[
  "AVC (cause aiguë la plus fréquente)",
  "Tumeur, abcès (installation progressive)",
  "Aphasie progressive primaire (dégénératif)",
  "Dysarthrie : AVC du tronc, SEP, SLA, Parkinson, cérébelleux"
 ],
 examens:[
  "Aigu : prise en charge AVC (imagerie cérébrale urgente)",
  "Progressif : IRM cérébrale, bilan orthophonique, avis neurologique",
  "Bilan de déglutition si fausses routes"
 ],
 orientation:[
  {type:"samu", texte:"Trouble du langage brutal → 15 (AVC)"},
  {type:"specialiste", texte:"Trouble progressif → neurologue + orthophoniste"}
 ],
 traitement:[
  "Aigu : filière AVC",
  "Rééducation orthophonique",
  "Prévention des fausses routes (adaptation des textures)"
 ],
 courrier:"urgences_avc",
 pourquoi:"L'aphasie est un trouble du langage (manque du mot, paraphasies, trouble de compréhension) ; la dysarthrie est un trouble de l'articulation, le langage restant normal. Une aphasie brutale localise une lésion de l'hémisphère dominant (sylvienne gauche) : c'est un signe d'AVC à part entière du FAST."
},

/* ---------------- Q. SEP ---------------- */
"sep":{
 lettre:"Q", titre:"Suspicion SEP / poussée", sousTitre:"Reconnaître une poussée démyélinisante",
 urgence:true,
 interrogatoire:[
  "Sujet jeune (20–40 ans), symptômes installés en heures-jours, durant > 24 h",
  "Névrite optique (baisse d'acuité douloureuse unilatérale), diplopie",
  "Troubles sensitifs, déficit moteur, troubles de l'équilibre",
  "Signe de Lhermitte (décharge à la flexion du cou), troubles sphinctériens",
  "ATCD d'épisodes neurologiques régressifs (dissémination temporelle)"
 ],
 drapeauxRouges:[
  "Poussée sévère (déficit invalidant, atteinte médullaire) → avis neuro urgent",
  "Névrite optique avec baisse d'acuité importante",
  "Fièvre associée (éliminer une infection)",
  "Troubles sphinctériens aigus"
 ],
 examenMinimal:[
  "Acuité visuelle, oculomotricité (ophtalmoplégie internucléaire), réflexe photomoteur (déficit pupillaire afférent)",
  "Force, ROT (vifs), Babinski, sensibilité, signe de Lhermitte",
  "Coordination, marche, Romberg"
 ],
 examenOriente:[
  "Recherche d'une atteinte multifocale (dissémination spatiale)",
  "Recherche de syndrome pyramidal, cérébelleux, cordonal postérieur",
  "Fond d'œil (névrite optique : papille normale ou œdématiée)"
 ],
 hypotheses:[
  "Poussée de SEP / syndrome cliniquement isolé",
  "Névrite optique rétrobulbaire",
  "Diagnostics différentiels : NMOSD, autres causes inflammatoires/vasculaires"
 ],
 examens:[
  "IRM cérébrale ET médullaire avec injection (lésions de la substance blanche, critères de dissémination)",
  "Ponction lombaire (bandes oligoclonales) — milieu spécialisé",
  "Bilan biologique pour éliminer les diagnostics différentiels (selon neuro)"
 ],
 orientation:[
  {type:"urg", texte:"Poussée sévère / névrite optique marquée → avis neurologique rapide (corticothérapie en milieu spécialisé)"},
  {type:"specialiste", texte:"Suspicion de SEP → consultation de neurologie / centre SEP pour bilan complet"}
 ],
 traitement:[
  "Poussée : corticothérapie en bolus (méthylprednisolone IV) DÉCIDÉE et réalisée en milieu spécialisé, après avoir éliminé une infection",
  "Ne pas initier de corticoïdes oraux seul en ville pour une poussée",
  "Traitement de fond : du ressort du neurologue"
 ],
 courrier:"sep",
 pourquoi:"La SEP repose sur la dissémination dans le temps et l'espace de lésions inflammatoires démyélinisantes. La névrite optique (baisse d'acuité douloureuse + déficit pupillaire afférent) et l'ophtalmoplégie internucléaire sont très évocatrices chez le sujet jeune. La poussée se traite par corticoïdes en bolus, après exclusion d'une infection."
},

/* ---------------- R. NEUROPATHIE PÉRIPHÉRIQUE ---------------- */
"neuropathie":{
 lettre:"R", titre:"Neuropathie périphérique / polynévrite", sousTitre:"Polyneuropathie longueur-dépendante et urgences",
 urgence:true,
 interrogatoire:[
  "Topographie : longueur-dépendante (chaussettes-gants) vs multinévrite (asymétrique) vs polyradiculonévrite (diffuse)",
  "Profil : chronique (diabète, alcool) vs aigu/subaigu (GBS, vascularite, toxique)",
  "Signes : paresthésies, douleurs, déficit moteur, troubles de l'équilibre",
  "Cause : diabète, alcool, carences (B1, B12), médicaments/chimio, infection, dysglobulinémie",
  "Atteinte respiratoire/déglutition (GBS)"
 ],
 drapeauxRouges:[
  "Déficit ascendant rapide + aréflexie → SYNDROME DE GUILLAIN-BARRÉ (urgence : surveillance respiratoire/déglutition, dysautonomie)",
  "Multinévrite douloureuse (vascularite) — urgence diagnostique",
  "Déficit moteur sévère/progressif",
  "Atteinte bulbaire ou respiratoire"
 ],
 examenMinimal:[
  "Sensibilité (tact, douleur, vibration, position), ROT (souvent abolis)",
  "Force segmentaire, recherche d'amyotrophie",
  "Marche, Romberg",
  "Recherche de signes d'atteinte respiratoire (GBS)"
 ],
 examenOriente:[
  "Caractériser : longueur-dépendante symétrique vs multinévrite asymétrique",
  "Évaluer la progression (rapidité = gravité)",
  "Tester la déglutition et la fonction respiratoire si suspicion de GBS"
 ],
 hypotheses:[
  "Polyneuropathie longueur-dépendante (diabétique, alcoolo-carentielle) — chronique",
  "Polyradiculonévrite aiguë (GBS) — urgence",
  "Multinévrite (vascularite, diabète)",
  "Neuropathies toxiques/médicamenteuses, dysimmunitaires (PIDC)"
 ],
 examens:[
  "Biologie : glycémie/HbA1c, B12-folates, TSH, NFS, créatinine, électrophorèse des protéines, ± sérologies",
  "ENMG (caractérisation : axonale/démyélinisante, programmé)",
  "GBS : PL (dissociation albumino-cytologique) en milieu hospitalier",
  "Bilan de vascularite si multinévrite"
 ],
 orientation:[
  {type:"samu", texte:"Suspicion de Guillain-Barré (déficit ascendant + aréflexie, a fortiori dyspnée/dysphagie) → urgences"},
  {type:"specialiste", texte:"Polyneuropathie chronique → neurologue + ENMG ; multinévrite → avis urgent"},
  {type:"domicile", texte:"Polyneuropathie diabétique/carentielle stable → traiter la cause et suivi"}
 ],
 traitement:[
  "Traiter la cause (équilibre glycémique, sevrage alcool, supplémentation vitaminique)",
  "GBS : prise en charge hospitalière (immunoglobulines/échanges plasmatiques, surveillance)",
  "Douleur neuropathique : cf. fiche dédiée"
 ],
 courrier:"enmg",
 pourquoi:"La grande urgence des neuropathies est le Guillain-Barré : un déficit moteur ascendant avec aréflexie peut évoluer vers une paralysie respiratoire en quelques jours. À l'inverse, les polyneuropathies longueur-dépendantes (diabète, alcool) sont chroniques et relèvent d'un bilan ambulatoire et du traitement de la cause."
},

/* ---------------- S. MYASTHÉNIE ---------------- */
"myasthenie":{
 lettre:"S", titre:"Myasthénie / fatigabilité", sousTitre:"Fatigabilité fluctuante et crise myasthénique",
 urgence:true,
 interrogatoire:[
  "Fatigabilité à l'effort, fluctuante, aggravée en fin de journée, améliorée au repos",
  "Atteinte oculaire (ptosis, diplopie variables) souvent inaugurale",
  "Atteinte bulbaire : voix nasonnée, troubles de déglutition, mastication",
  "Faiblesse des membres à prédominance proximale",
  "Facteurs déclenchants : infection, médicaments contre-indiqués, chaleur, stress"
 ],
 drapeauxRouges:[
  "CRISE MYASTHÉNIQUE : dyspnée, encombrement, troubles de déglutition majeurs → urgence vitale (15)",
  "Aggravation rapide de l'atteinte bulbaire",
  "Prise d'un médicament contre-indiqué (certains ATB, β-bloquants, magnésium…)",
  "Première décompensation"
 ],
 examenMinimal:[
  "Recherche de ptosis et de sa majoration au regard soutenu vers le haut",
  "Test de fatigabilité (abduction des bras répétée, accroupissements)",
  "Évaluation de la voix, de la déglutition, de la toux",
  "Examen respiratoire"
 ],
 examenOriente:[
  "Test du glaçon sur la paupière (amélioration du ptosis) — orientation",
  "Recherche d'une fatigabilité segmentaire reproductible",
  "Évaluation de la fonction respiratoire (capacité à compter en une expiration)"
 ],
 hypotheses:[
  "Myasthénie auto-immune (anticorps anti-RACh, anti-MuSK)",
  "Syndrome myasthénique de Lambert-Eaton (paranéoplasique)",
  "Diagnostics différentiels : myopathie, atteinte du tronc"
 ],
 examens:[
  "Anticorps anti-récepteurs de l'acétylcholine (± anti-MuSK)",
  "ENMG avec stimulation répétitive / fibre unique (spécialisé)",
  "TDM thoracique (recherche de thymome)",
  "TSH (association auto-immune)"
 ],
 orientation:[
  {type:"samu", texte:"Crise myasthénique (détresse respiratoire, troubles de déglutition) → 15 / réanimation"},
  {type:"specialiste", texte:"Suspicion de myasthénie → neurologue (centre de référence neuromusculaire)"}
 ],
 traitement:[
  "Ne pas initier de traitement sans diagnostic : anticholinestérasiques et immunosuppresseurs du ressort spécialisé",
  "VÉRIFIER les médicaments contre-indiqués avant toute prescription",
  "Crise : prise en charge respiratoire en urgence"
 ],
 courrier:"neuro_urgent",
 pourquoi:"La fatigabilité fluctuante, à recrudescence vespérale et améliorée par le repos, est la signature de la myasthénie (atteinte de la jonction neuromusculaire). L'atteinte bulbaire et respiratoire fait toute la gravité (crise myasthénique). De nombreux médicaments courants peuvent aggraver une myasthénie : toujours vérifier avant de prescrire."
},

/* ---------------- T. SYNDROME PARKINSONIEN ---------------- */
"parkinson":{
 lettre:"T", titre:"Syndrome parkinsonien", sousTitre:"Triade akinéto-hypertonique et drapeaux atypiques",
 urgence:false,
 interrogatoire:[
  "Lenteur (bradykinésie), tremblement de repos, raideur, micrographie",
  "Asymétrie des symptômes, troubles de la marche, perte du ballant du bras",
  "Signes non moteurs : anosmie, constipation, TCSP, dépression",
  "Médicaments (neuroleptiques cachés : certains antiémétiques, antivertigineux !)",
  "Chutes précoces, signes atypiques"
 ],
 drapeauxRouges:[
  "Chutes précoces, atteinte oculomotrice (regard vertical), dysautonomie sévère, signes cérébelleux → syndrome parkinsonien ATYPIQUE (PSP, AMS…)",
  "Installation rapide, symétrique d'emblée (cause iatrogène ?)",
  "Absence de réponse à la dopathérapie",
  "Sujet jeune (Wilson)"
 ],
 examenMinimal:[
  "Recherche de la triade : akinésie (mouvements alternatifs rapides), rigidité (roue dentée), tremblement de repos",
  "Marche : petits pas, freezing, demi-tour décomposé, ballant",
  "Pull-test (instabilité posturale), écriture, voix"
 ],
 examenOriente:[
  "Évaluer l'asymétrie (Parkinson typique = asymétrique)",
  "Rechercher des signes atypiques (oculomotricité, cervelet, pyramidal, dysautonomie)",
  "Revoir l'ordonnance (parkinsonisme iatrogène)"
 ],
 hypotheses:[
  "Maladie de Parkinson idiopathique (asymétrique, dopa-sensible)",
  "Parkinsonisme iatrogène (neuroleptiques, certains antiémétiques/antivertigineux)",
  "Syndromes parkinsoniens atypiques (PSP, AMS, DCB)",
  "Tremblement essentiel (diagnostic différentiel)"
 ],
 examens:[
  "Diagnostic clinique",
  "Arrêt des médicaments parkinsoniens si parkinsonisme iatrogène suspecté",
  "IRM cérébrale si signes atypiques",
  "DaTSCAN / avis spécialisé si doute"
 ],
 orientation:[
  {type:"specialiste", texte:"Suspicion de syndrome parkinsonien → neurologue (mouvements anormaux) pour diagnostic et traitement"},
  {type:"domicile", texte:"Parkinsonisme iatrogène : arrêt/adaptation du médicament en cause et réévaluation"}
 ],
 traitement:[
  "Ne pas initier de dopathérapie sans diagnostic neurologique",
  "Identifier et arrêter un médicament parkinsonisant",
  "Kinésithérapie, activité physique, prise en charge des signes non moteurs"
 ],
 courrier:"parkinson",
 pourquoi:"Le diagnostic repose sur la bradykinésie associée à au moins un signe parmi rigidité et tremblement de repos. L'asymétrie et la dopa-sensibilité plaident pour une maladie de Parkinson ; chutes précoces, troubles oculomoteurs ou dysautonomie sévère orientent vers un syndrome atypique. Toujours éliminer une cause iatrogène (neuroleptiques, antiémétiques)."
}

};
