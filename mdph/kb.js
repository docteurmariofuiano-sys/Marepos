/* =====================================================================
   MDPH Assist — base de connaissances par pathologie (hors-ligne)
   Pour chaque pathologie (clé = libellé exact de la palette) :
     motiv      : formulation pour « Pathologie motivant la demande »
     signs      : 3 signes invalidants {t:titre, d:description fonctionnelle}
     traitement : classes thérapeutiques habituelles (proposition)
     pronostic  : élément de pronostic pour les observations
     besoin     : besoin/compensation à signaler pour les observations
   AIDE À LA RÉDACTION — contenu indicatif à relire et adapter au patient.
   ===================================================================== */
'use strict';
window.KB = {
/* ===================== CARDIO-VASCULAIRE & MÉTABOLIQUE ===================== */
"Hypertension artérielle":{
 motiv:"Hypertension artérielle chronique",
 signs:[
  {t:"HTA non contrôlée / retentissement viscéral",d:"Pression artérielle insuffisamment contrôlée malgré le traitement, avec retentissement cardiaque, rénal ou oculaire et fatigabilité à l'effort."},
  {t:"Céphalées et asthénie",d:"Céphalées, sensations vertigineuses et asthénie limitant la concentration et les activités prolongées."},
  {t:"Limitation à l'effort",d:"Essoufflement et fatigue à l'effort réduisant les déplacements, le port de charges et les tâches physiques."}],
 traitement:"IEC/ARA II, inhibiteur calcique, diurétique thiazidique",
 pronostic:"Pathologie chronique nécessitant un traitement et une surveillance au long cours ; pronostic lié au contrôle tensionnel et à la prévention des complications cardio-neuro-rénales.",
 besoin:"Suivi médical régulier, éducation thérapeutique, aide à l'observance et à la gestion des traitements."},
"Cardiopathie ischémique":{
 motiv:"Cardiopathie ischémique (coronaropathie)",
 signs:[
  {t:"Angor d'effort",d:"Douleurs thoraciques ou oppression à l'effort limitant la marche, la montée des escaliers et le port de charges, imposant des pauses fréquentes."},
  {t:"Dyspnée d'effort",d:"Essoufflement à l'effort réduisant le périmètre de marche et les activités de la vie quotidienne et professionnelle."},
  {t:"Asthénie et limitation fonctionnelle",d:"Fatigabilité importante avec restriction des efforts physiques et nécessité d'adapter le rythme des activités."}],
 traitement:"Antiagrégant plaquettaire, bêtabloquant, statine, dérivé nitré",
 pronostic:"Pathologie chronique à risque d'événements cardiovasculaires ; pronostic dépendant de la fonction ventriculaire et du contrôle des facteurs de risque.",
 besoin:"Réadaptation cardiaque, aménagement des efforts, aide aux déplacements et au maintien dans l'emploi."},
"Insuffisance cardiaque":{
 motiv:"Insuffisance cardiaque chronique",
 signs:[
  {t:"Dyspnée et orthopnée",d:"Essoufflement au moindre effort voire au repos, orthopnée, limitant fortement les déplacements et les actes de la vie quotidienne."},
  {t:"Fatigue et œdèmes",d:"Asthénie marquée et œdèmes des membres inférieurs gênant la marche, la station debout et les tâches domestiques."},
  {t:"Décompensations répétées",d:"Épisodes de décompensation nécessitant des adaptations thérapeutiques et des hospitalisations, avec perte d'autonomie progressive."}],
 traitement:"IEC/ARA II, bêtabloquant, diurétique de l'anse, anti-aldostérone",
 pronostic:"Maladie chronique évolutive à pronostic réservé, marquée par des décompensations et une réduction de l'espérance et de la qualité de vie.",
 besoin:"Suivi cardiologique rapproché, aide à domicile, aménagement du logement, soutien aux déplacements."},
"Trouble du rythme (FA…)":{
 motiv:"Trouble du rythme cardiaque (fibrillation atriale)",
 signs:[
  {t:"Palpitations et malaises",d:"Palpitations, sensations de malaise et lipothymies limitant les efforts et exposant à un risque de chute."},
  {t:"Dyspnée et fatigabilité",d:"Essoufflement et fatigue à l'effort réduisant le périmètre de marche et les activités physiques."},
  {t:"Risque thrombo-embolique",d:"Risque d'accident embolique imposant une anticoagulation au long cours et une surveillance régulière."}],
 traitement:"Anticoagulant oral, ralentisseur (bêtabloquant), antiarythmique",
 pronostic:"Trouble chronique à risque thrombo-embolique ; pronostic lié au contrôle du rythme/de la fréquence et à l'anticoagulation.",
 besoin:"Surveillance de l'anticoagulation, aide à l'observance, prévention des chutes."},
"AVC/AIT (séquelles)":{
 motiv:"Séquelles d'accident vasculaire cérébral",
 signs:[
  {t:"Déficit moteur / hémiparésie",d:"Déficit moteur d'un hémicorps avec troubles de la marche, de l'équilibre et de la préhension, nécessitant aides techniques et/ou aide humaine."},
  {t:"Troubles du langage / cognitifs",d:"Aphasie, troubles de la mémoire, de l'attention et des fonctions exécutives gênant la communication et l'autonomie."},
  {t:"Troubles vésico-sphinctériens / fatigue",d:"Fatigabilité, troubles sphinctériens et de la déglutition retentissant sur la vie quotidienne et sociale."}],
 traitement:"Antiagrégant ou anticoagulant, antihypertenseur, statine",
 pronostic:"Séquelles souvent durables ; pronostic fonctionnel dépendant de la rééducation, avec risque de récidive.",
 besoin:"Rééducation pluridisciplinaire (kiné, orthophonie, ergothérapie), aides techniques, aide humaine, aménagement du logement."},
"Artériopathie des membres inférieurs":{
 motiv:"Artériopathie oblitérante des membres inférieurs",
 signs:[
  {t:"Claudication intermittente",d:"Douleurs de marche (claudication) limitant nettement le périmètre de marche et imposant des arrêts fréquents."},
  {t:"Douleurs de décubitus / troubles trophiques",d:"Douleurs de repos et/ou troubles trophiques (ulcères) retentissant sur le sommeil, la mobilité et l'autonomie."},
  {t:"Limitation des déplacements",d:"Réduction des déplacements extérieurs, des courses et des activités professionnelles physiques."}],
 traitement:"Antiagrégant plaquettaire, statine, antihypertenseur",
 pronostic:"Maladie chronique évolutive avec risque d'ischémie critique et d'amputation ; pronostic lié au contrôle des facteurs de risque.",
 besoin:"Marche encadrée, soins de plaies, aide aux déplacements, parfois appareillage."},
"Diabète":{
 motiv:"Diabète sucré",
 signs:[
  {t:"Complications dégénératives",d:"Atteintes micro/macrovasculaires (rétinopathie, néphropathie, neuropathie) retentissant sur la vision, la marche et l'autonomie."},
  {t:"Neuropathie et troubles trophiques",d:"Neuropathie périphérique avec douleurs, troubles de la sensibilité et risque de plaies du pied limitant la marche."},
  {t:"Asthénie / déséquilibres glycémiques",d:"Fatigabilité et épisodes d'hypo/hyperglycémie nécessitant une autosurveillance et une organisation contraignante au quotidien."}],
 traitement:"Metformine, insuline, iSGLT2 ou analogue du GLP-1",
 pronostic:"Maladie chronique à risque de complications dégénératives ; pronostic lié à l'équilibre glycémique et à la prise en charge des facteurs de risque.",
 besoin:"Éducation thérapeutique, autosurveillance, suivi pluridisciplinaire (ophtalmo, podologie, néphro), aide à la gestion des traitements."},
"Obésité":{
 motiv:"Obésité",
 signs:[
  {t:"Limitation de la mobilité",d:"Réduction du périmètre de marche, dyspnée d'effort et difficultés aux transferts et déplacements."},
  {t:"Retentissement ostéo-articulaire",d:"Douleurs articulaires (genoux, hanches, rachis) majorant la limitation fonctionnelle."},
  {t:"Comorbidités associées",d:"Comorbidités métaboliques et respiratoires (SAOS) aggravant la fatigabilité et le retentissement quotidien."}],
 traitement:"Prise en charge nutritionnelle, activité adaptée, traitement des comorbidités",
 pronostic:"Maladie chronique multifactorielle ; pronostic lié à la prise en charge globale et aux comorbidités.",
 besoin:"Suivi nutritionnel et d'activité physique adaptée, aide aux déplacements, parfois aménagement de poste."},
"Dyslipidémie":{
 motiv:"Dyslipidémie",
 signs:[
  {t:"Facteur de risque cardiovasculaire",d:"Anomalie lipidique participant au risque cardiovasculaire global et au retentissement des autres pathologies."},
  {t:"Retentissement à l'effort",d:"Contribue, en cas d'atteinte vasculaire, à la limitation des efforts et des déplacements."},
  {t:"Contraintes de suivi",d:"Nécessite un traitement et une surveillance biologique réguliers."}],
 traitement:"Statine, ézétimibe, mesures hygiéno-diététiques",
 pronostic:"Facteur de risque modifiable ; pronostic lié au contrôle lipidique et aux autres facteurs de risque.",
 besoin:"Suivi biologique, éducation thérapeutique, aide à l'observance."},
/* ===================== RESPIRATOIRE ===================== */
"BPCO":{
 motiv:"Bronchopneumopathie chronique obstructive",
 signs:[
  {t:"Dyspnée sévère limitant les actes de la vie quotidienne",d:"Dyspnée d'effort importante (stade mMRC 3–4) avec limitation du périmètre de marche, pauses fréquentes, difficulté à monter les escaliers, à faire les courses, le ménage ou les déplacements extérieurs."},
  {t:"Insuffisance respiratoire chronique / hypoxémie",d:"BPCO compliquée d'une insuffisance respiratoire chronique avec désaturation à l'effort ou au repos, nécessité d'oxygénothérapie de longue durée et/ou de ventilation non invasive nocturne."},
  {t:"Exacerbations fréquentes / hospitalisations répétées",d:"Exacerbations répétées malgré traitement optimisé, nécessitant corticothérapie/antibiothérapie fréquentes, passages aux urgences ou hospitalisations, avec aggravation progressive de l'autonomie."}],
 traitement:"Bronchodilatateurs de longue durée (LABA/LAMA), corticoïde inhalé, oxygénothérapie",
 pronostic:"Maladie chronique évolutive et irréversible ; pronostic lié au degré d'obstruction, à l'hypoxémie et à la fréquence des exacerbations.",
 besoin:"Réhabilitation respiratoire, oxygénothérapie/VNI, aide aux déplacements et aux tâches domestiques, aménagement du logement."},
"Asthme sévère":{
 motiv:"Asthme sévère",
 signs:[
  {t:"Crises et exacerbations fréquentes",d:"Crises répétées malgré traitement de fond optimisé, avec recours fréquent aux soins et altération de la qualité de vie."},
  {t:"Dyspnée et limitation à l'effort",d:"Essoufflement limitant les efforts, les déplacements et l'activité professionnelle, majoré par les facteurs environnementaux."},
  {t:"Corticodépendance",d:"Recours fréquent ou prolongé à la corticothérapie systémique, source d'effets indésirables et de retentissement général."}],
 traitement:"Corticoïde inhalé + LABA, biothérapie, corticothérapie au besoin",
 pronostic:"Asthme contrôlable mais à risque d'exacerbations graves ; pronostic lié au contrôle et à l'éviction des facteurs déclenchants.",
 besoin:"Éviction des facteurs déclenchants, éducation thérapeutique, aménagement de l'environnement et du poste de travail."},
"SAOS":{
 motiv:"Syndrome d'apnées obstructives du sommeil",
 signs:[
  {t:"Somnolence diurne",d:"Somnolence diurne excessive retentissant sur la vigilance, la concentration, la conduite et l'activité professionnelle."},
  {t:"Fatigue et troubles cognitifs",d:"Fatigue chronique, troubles de la mémoire et de l'attention gênant les apprentissages et les tâches quotidiennes."},
  {t:"Comorbidités cardio-métaboliques",d:"Association à une HTA et à un risque cardiovasculaire majorant le retentissement global."}],
 traitement:"Ventilation par PPC (CPAP), mesures hygiéno-diététiques",
 pronostic:"Pathologie chronique bien améliorée par l'appareillage ; pronostic lié à l'observance et aux comorbidités.",
 besoin:"Appareillage PPC et suivi de l'observance, aménagement des horaires, prudence pour la conduite."},
"Insuffisance respiratoire / O₂":{
 motiv:"Insuffisance respiratoire chronique",
 signs:[
  {t:"Dyspnée permanente",d:"Essoufflement au moindre effort voire au repos, limitant fortement les déplacements et l'autonomie."},
  {t:"Oxygéno-dépendance",d:"Nécessité d'une oxygénothérapie de longue durée et/ou d'une ventilation, contraignant tous les déplacements."},
  {t:"Fatigabilité majeure",d:"Asthénie importante imposant une aide pour les actes de la vie quotidienne et les tâches domestiques."}],
 traitement:"Oxygénothérapie de longue durée, ventilation, traitement de la cause",
 pronostic:"Pathologie chronique sévère à pronostic réservé, dépendant de la maladie causale et de l'oxygéno/ventilo-dépendance.",
 besoin:"Oxygénothérapie/VNI à domicile, aide humaine, aménagement du logement et des déplacements."},
/* ===================== NEUROLOGIE ===================== */
"Épilepsie":{
 motiv:"Épilepsie",
 signs:[
  {t:"Crises répétées",d:"Crises épileptiques récurrentes malgré le traitement, exposant à un risque de chute, de blessure et limitant l'autonomie."},
  {t:"Restrictions de sécurité",d:"Restrictions liées à la sécurité (conduite, baignade, postes à risque) avec retentissement social et professionnel."},
  {t:"Retentissement cognitif / thymique",d:"Troubles attentionnels, ralentissement ou troubles de l'humeur, parfois liés aux crises ou au traitement."}],
 traitement:"Antiépileptiques (lévétiracétam, lamotrigine, valproate…)",
 pronostic:"Pronostic variable selon le syndrome ; nombreuses formes contrôlées, mais épilepsies pharmacorésistantes possibles.",
 besoin:"Adaptation des activités à risque, soutien à l'insertion professionnelle, suivi neurologique régulier."},
"Maladie de Parkinson":{
 motiv:"Maladie de Parkinson",
 signs:[
  {t:"Akinésie et rigidité",d:"Lenteur et raideur des mouvements gênant la marche, les transferts, l'habillage et l'écriture, avec fluctuations motrices."},
  {t:"Troubles de la marche et chutes",d:"Troubles de l'équilibre, festination et freezing exposant aux chutes et limitant les déplacements."},
  {t:"Troubles non moteurs",d:"Fatigue, troubles du sommeil, cognitifs et thymiques, troubles dysautonomiques retentissant sur l'autonomie."}],
 traitement:"Lévodopa, agonistes dopaminergiques, IMAO-B",
 pronostic:"Maladie neurodégénérative chronique et évolutive ; perte d'autonomie progressive malgré le traitement.",
 besoin:"Rééducation (kiné, orthophonie, ergothérapie), aides techniques, aide humaine, aménagement du domicile."},
"Sclérose en plaques":{
 motiv:"Sclérose en plaques",
 signs:[
  {t:"Déficit moteur et fatigue",d:"Faiblesse, spasticité et fatigue majeure limitant la marche, les efforts et les activités quotidiennes."},
  {t:"Troubles sensitifs et de l'équilibre",d:"Troubles sensitifs, de l'équilibre et de la coordination gênant les déplacements et la préhension."},
  {t:"Troubles vésico-sphinctériens / visuels / cognitifs",d:"Troubles urinaires, visuels et cognitifs retentissant sur la vie quotidienne, sociale et professionnelle."}],
 traitement:"Traitement de fond immunomodulateur, traitements symptomatiques",
 pronostic:"Évolution variable (poussées et/ou progression) ; handicap cumulatif possible au fil du temps.",
 besoin:"Rééducation, aides techniques, gestion de la fatigue, aménagement du poste et du logement."},
"Maladie neurodégénérative":{
 motiv:"Maladie neurodégénérative",
 signs:[
  {t:"Déclin cognitif / fonctionnel",d:"Altération progressive des fonctions cognitives et/ou motrices retentissant sur l'autonomie et la sécurité."},
  {t:"Perte d'autonomie pour les actes quotidiens",d:"Besoin d'aide croissant pour la toilette, l'habillage, les repas et les déplacements."},
  {t:"Troubles du comportement / sécurité",d:"Désorientation, troubles du comportement ou du jugement nécessitant une surveillance."}],
 traitement:"Traitements symptomatiques, prise en charge pluridisciplinaire",
 pronostic:"Maladie chronique évolutive à pronostic défavorable avec perte d'autonomie progressive.",
 besoin:"Aide humaine, surveillance, accompagnement médico-social, aménagement du domicile."},
"Traumatisme crânien (séquelles)":{
 motiv:"Séquelles de traumatisme crânien",
 signs:[
  {t:"Troubles cognitifs",d:"Troubles de la mémoire, de l'attention et des fonctions exécutives gênant les apprentissages, le travail et l'organisation quotidienne."},
  {t:"Troubles du comportement / fatigue",d:"Irritabilité, troubles du comportement et fatigabilité retentissant sur la vie sociale et familiale."},
  {t:"Déficits moteurs / sensoriels",d:"Déficits moteurs, sensoriels ou de l'équilibre selon les lésions, limitant les déplacements et l'autonomie."}],
 traitement:"Rééducation neuropsychologique et motrice, traitements symptomatiques",
 pronostic:"Séquelles souvent durables ; récupération partielle possible avec la rééducation.",
 besoin:"Rééducation cognitive et motrice, aide humaine, accompagnement à la réinsertion sociale et professionnelle."},
"Lésion médullaire (para/tétraplégie)":{
 motiv:"Lésion médullaire (para/tétraplégie)",
 signs:[
  {t:"Déficit moteur des membres",d:"Paralysie des membres inférieurs (et supérieurs si tétraplégie) imposant un fauteuil roulant et une aide aux transferts."},
  {t:"Troubles vésico-sphinctériens",d:"Troubles vésico-sphinctériens et digestifs nécessitant sondages/appareillage et une organisation contraignante."},
  {t:"Complications (escarres, spasticité, douleurs)",d:"Risque d'escarres, spasticité et douleurs neuropathiques retentissant sur l'autonomie et la qualité de vie."}],
 traitement:"Traitements de la spasticité, des douleurs, prise en charge urologique",
 pronostic:"Atteinte définitive ; pronostic fonctionnel selon le niveau lésionnel.",
 besoin:"Fauteuil roulant adapté, aide humaine, aménagement du logement et du véhicule, suivi en MPR."},
"Maladie neuromusculaire (myopathie, SLA…)":{
 motiv:"Maladie neuromusculaire",
 signs:[
  {t:"Déficit musculaire progressif",d:"Faiblesse musculaire évolutive limitant la marche, la préhension, les transferts et le maintien postural."},
  {t:"Atteinte respiratoire / déglutition",d:"Atteinte des muscles respiratoires et de la déglutition pouvant nécessiter ventilation et adaptation de l'alimentation."},
  {t:"Fatigabilité et perte d'autonomie",d:"Fatigabilité majeure avec dépendance croissante pour les actes de la vie quotidienne."}],
 traitement:"Traitement spécifique si disponible, prise en charge symptomatique",
 pronostic:"Pronostic variable selon l'affection, souvent évolutif et sévère (ex. SLA).",
 besoin:"Aides techniques, ventilation, aide humaine importante, aménagement du domicile, suivi pluridisciplinaire."},
"Migraine/céphalées chroniques":{
 motiv:"Migraine / céphalées chroniques",
 signs:[
  {t:"Crises fréquentes et invalidantes",d:"Crises douloureuses fréquentes imposant l'arrêt des activités, l'isolement et un absentéisme professionnel ou scolaire."},
  {t:"Photophobie / signes associés",d:"Photophobie, phonophobie, nausées et signes neurologiques limitant la concentration et les tâches."},
  {t:"Retentissement sur la qualité de vie",d:"Anticipation anxieuse des crises et retentissement sur la vie sociale, familiale et professionnelle."}],
 traitement:"Traitement de crise (triptans), traitement de fond",
 pronostic:"Affection chronique non létale mais potentiellement très invalidante selon la fréquence des crises.",
 besoin:"Aménagement de l'environnement et des horaires, suivi spécialisé, éviction des facteurs déclenchants."},
/* ===================== PSYCHIATRIE & NEURO-DÉVELOPPEMENT ===================== */
"Trouble dépressif":{
 motiv:"Trouble dépressif",
 signs:[
  {t:"Humeur dépressive et ralentissement",d:"Tristesse, perte d'élan vital et ralentissement psychomoteur limitant l'initiative, les démarches et le travail."},
  {t:"Troubles cognitifs et de la concentration",d:"Difficultés de concentration, de mémoire et de décision gênant les apprentissages et les tâches quotidiennes."},
  {t:"Retrait social / risque suicidaire",d:"Repli social, troubles du sommeil et de l'appétit, idées noires nécessitant un suivi rapproché."}],
 traitement:"Antidépresseur (ISRS/IRSNa), psychothérapie",
 pronostic:"Pronostic favorable sous traitement mais risque de rechute ou de chronicisation.",
 besoin:"Suivi psychiatrique/psychologique, soutien à la réinsertion, aménagement professionnel."},
"Trouble anxieux":{
 motiv:"Trouble anxieux",
 signs:[
  {t:"Anxiété invalidante",d:"Anxiété envahissante, attaques de panique ou évitements limitant les déplacements, les démarches et la vie sociale."},
  {t:"Manifestations somatiques",d:"Manifestations physiques (palpitations, tensions, troubles du sommeil) retentissant sur la concentration et l'énergie."},
  {t:"Évitements et restriction des activités",d:"Conduites d'évitement réduisant les activités professionnelles, sociales et les sorties."}],
 traitement:"Psychothérapie (TCC), antidépresseur, anxiolytique si besoin",
 pronostic:"Évolution favorable avec prise en charge adaptée ; chronicisation possible.",
 besoin:"Psychothérapie, soutien social, aménagement des situations anxiogènes."},
"Trouble bipolaire":{
 motiv:"Trouble bipolaire",
 signs:[
  {t:"Alternance d'épisodes thymiques",d:"Épisodes dépressifs et (hypo)maniaques retentissant sur le jugement, les relations et la stabilité professionnelle."},
  {t:"Instabilité fonctionnelle",d:"Variabilité de l'état avec périodes de désorganisation, d'impulsivité ou de retrait limitant l'autonomie."},
  {t:"Risque et besoin de surveillance",d:"Risque suicidaire et de décompensation nécessitant un traitement régulateur et un suivi régulier."}],
 traitement:"Thymorégulateur (lithium…), antipsychotique, suivi spécialisé",
 pronostic:"Maladie chronique évoluant par épisodes ; pronostic lié à l'observance et à la stabilité thymique.",
 besoin:"Suivi psychiatrique, éducation thérapeutique, soutien à l'insertion et aménagement professionnel."},
"Trouble psychotique/schizophrénie":{
 motiv:"Trouble psychotique / schizophrénie",
 signs:[
  {t:"Symptômes positifs",d:"Idées délirantes, hallucinations et désorganisation retentissant sur le contact avec la réalité et la sécurité."},
  {t:"Symptômes négatifs",d:"Retrait, émoussement affectif et perte d'initiative limitant l'autonomie, l'hygiène et la vie sociale."},
  {t:"Troubles cognitifs",d:"Troubles attentionnels et exécutifs gênant les apprentissages, l'organisation et l'insertion professionnelle."}],
 traitement:"Antipsychotique, suivi psychiatrique, réhabilitation psychosociale",
 pronostic:"Maladie chronique à évolution variable ; pronostic amélioré par la continuité des soins.",
 besoin:"Suivi psychiatrique, accompagnement médico-social, soutien au logement et à l'insertion."},
"État de stress post-traumatique":{
 motiv:"État de stress post-traumatique",
 signs:[
  {t:"Reviviscences et évitements",d:"Reviviscences, cauchemars et conduites d'évitement limitant les activités et les déplacements."},
  {t:"Hypervigilance et troubles du sommeil",d:"Hypervigilance, sursauts et insomnie retentissant sur la concentration, l'humeur et l'énergie."},
  {t:"Retentissement social et professionnel",d:"Repli, irritabilité et difficultés relationnelles gênant la vie familiale et le travail."}],
 traitement:"Psychothérapie spécifique (EMDR/TCC), antidépresseur",
 pronostic:"Évolution favorable possible avec prise en charge adaptée ; chronicisation sans traitement.",
 besoin:"Suivi psychothérapeutique, soutien social, aménagement professionnel."},
"Trouble de l'usage/addiction":{
 motiv:"Trouble de l'usage de substances (addiction)",
 signs:[
  {t:"Perte de contrôle et craving",d:"Consommation incontrôlée avec craving et poursuite malgré les conséquences, retentissant sur la vie quotidienne."},
  {t:"Complications somatiques et psychiques",d:"Complications physiques, psychiques et cognitives limitant l'autonomie et l'insertion."},
  {t:"Désinsertion sociale",d:"Retentissement social, familial et professionnel avec risque de marginalisation."}],
 traitement:"Sevrage/substitution, suivi addictologique, accompagnement psychosocial",
 pronostic:"Maladie chronique à rechutes ; pronostic lié à l'accompagnement et au maintien de l'abstinence/stabilisation.",
 besoin:"Suivi addictologique, accompagnement médico-social, soutien à la réinsertion."},
"Trouble du spectre de l'autisme":{
 motiv:"Trouble du spectre de l'autisme",
 signs:[
  {t:"Troubles de la communication sociale",d:"Difficultés de communication et d'interaction sociale retentissant sur la scolarité, le travail et la vie relationnelle."},
  {t:"Comportements répétitifs et intérêts restreints",d:"Comportements répétitifs, intérêts restreints et besoin d'environnement structuré, peu compatibles avec certains cadres."},
  {t:"Particularités sensorielles",d:"Hyper/hyposensibilités sensorielles et difficultés d'adaptation au changement nécessitant des aménagements."}],
 traitement:"Accompagnement éducatif et comportemental, prise en charge pluridisciplinaire",
 pronostic:"Trouble durable ; autonomie variable, améliorée par un accompagnement adapté et précoce.",
 besoin:"Accompagnement (AESH/SESSAD selon l'âge), aménagements scolaires/professionnels, environnement structuré."},
"TDAH":{
 motiv:"Trouble déficit de l'attention avec ou sans hyperactivité",
 signs:[
  {t:"Inattention",d:"Difficultés d'attention et d'organisation retentissant sur les apprentissages, le travail et les tâches quotidiennes."},
  {t:"Impulsivité / hyperactivité",d:"Impulsivité et agitation gênant la concentration, la vie scolaire/professionnelle et les relations."},
  {t:"Retentissement scolaire et fonctionnel",d:"Difficultés d'apprentissage et d'autorégulation nécessitant des aménagements."}],
 traitement:"Méthylphénidate si indiqué, accompagnement éducatif et psychologique",
 pronostic:"Trouble fréquemment durable ; bonne amélioration fonctionnelle avec prise en charge adaptée.",
 besoin:"Aménagements scolaires (tiers-temps, AESH) ou professionnels, soutien éducatif, suivi spécialisé."},
"Trouble du développement intellectuel":{
 motiv:"Trouble du développement intellectuel",
 signs:[
  {t:"Limitation des apprentissages",d:"Limitation des capacités d'apprentissage et de raisonnement retentissant sur l'autonomie et la scolarité/le travail."},
  {t:"Autonomie quotidienne réduite",d:"Besoin d'aide ou de supervision pour les actes complexes de la vie quotidienne et les démarches."},
  {t:"Adaptation sociale",d:"Difficultés d'adaptation sociale et de communication nécessitant un accompagnement."}],
 traitement:"Accompagnement éducatif et médico-social, rééducations",
 pronostic:"Trouble durable ; niveau d'autonomie variable selon l'accompagnement et les comorbidités.",
 besoin:"Orientation médico-sociale adaptée, AESH/établissement, aide humaine, soutien à l'autonomie."},
"Troubles « dys »":{
 motiv:"Troubles spécifiques des apprentissages (« dys »)",
 signs:[
  {t:"Difficultés d'apprentissage spécifiques",d:"Atteinte spécifique (lecture, orthographe, calcul, coordination) retentissant durablement sur la scolarité."},
  {t:"Lenteur et fatigabilité",d:"Lenteur d'exécution et fatigabilité cognitive nécessitant des aménagements et un tiers-temps."},
  {t:"Retentissement scolaire / estime de soi",d:"Difficultés scolaires avec retentissement sur la confiance et la participation."}],
 traitement:"Rééducation (orthophonie, ergothérapie, psychomotricité)",
 pronostic:"Trouble durable mais compensable ; bon pronostic d'insertion avec aménagements.",
 besoin:"Aménagements scolaires et des examens, rééducations, outils de compensation (informatique)."},
/* ===================== OSTÉO-ARTICULAIRE & RHUMATO ===================== */
"Arthrose invalidante":{
 motiv:"Arthrose invalidante",
 signs:[
  {t:"Douleurs mécaniques",d:"Douleurs articulaires à la mobilisation limitant la marche, la station debout et les gestes du quotidien."},
  {t:"Raideur et limitation articulaire",d:"Raideur et perte d'amplitude réduisant la mobilité, la préhension et les transferts."},
  {t:"Réduction du périmètre de marche",d:"Limitation des déplacements, des escaliers et des tâches domestiques avec recours possible à une aide de marche."}],
 traitement:"Antalgiques, AINS au besoin, kinésithérapie",
 pronostic:"Affection chronique évolutive ; aggravation progressive, parfois chirurgie (prothèse).",
 besoin:"Kinésithérapie, aides techniques, aménagement du logement, aide aux tâches lourdes."},
"Rhumatisme inflammatoire (PR…)":{
 motiv:"Rhumatisme inflammatoire chronique",
 signs:[
  {t:"Douleurs et raideur inflammatoires",d:"Douleurs et raideur matinale prolongée limitant la préhension, l'habillage et les gestes fins."},
  {t:"Atteinte articulaire et déformations",d:"Atteinte de plusieurs articulations avec déformations et perte de force réduisant l'autonomie."},
  {t:"Asthénie et poussées",d:"Fatigue importante et poussées évolutives retentissant sur le travail et la vie quotidienne."}],
 traitement:"Traitement de fond (méthotrexate, biothérapie), antalgiques",
 pronostic:"Maladie chronique évolutive ; pronostic amélioré par les traitements de fond, risque de handicap si insuffisamment contrôlée.",
 besoin:"Suivi rhumatologique, rééducation, aides techniques, aménagement de poste."},
"Lombalgie/rachialgie chronique":{
 motiv:"Lombalgie / rachialgie chronique",
 signs:[
  {t:"Douleur rachidienne persistante",d:"Douleurs chroniques du rachis limitant le port de charges, la station assise/debout prolongée et les déplacements."},
  {t:"Limitation des gestes du quotidien",d:"Difficultés pour se baisser, s'habiller, faire le ménage et les tâches physiques."},
  {t:"Retentissement professionnel",d:"Restriction des activités professionnelles physiques avec arrêts répétés ou inaptitude partielle."}],
 traitement:"Antalgiques, kinésithérapie, activité physique adaptée",
 pronostic:"Évolution chronique fluctuante ; pronostic fonctionnel lié à la rééducation et à l'adaptation des activités.",
 besoin:"Rééducation, aménagement de poste, aide aux tâches lourdes, reclassement éventuel."},
"Ostéoporose/fractures":{
 motiv:"Ostéoporose compliquée de fractures",
 signs:[
  {t:"Fractures et douleurs",d:"Antécédents de fractures (vertèbres, hanche…) avec douleurs et perte de mobilité."},
  {t:"Réduction de la mobilité",d:"Limitation des déplacements, des transferts et des activités par crainte de fracture et douleurs."},
  {t:"Risque de chute",d:"Fragilité osseuse exposant à de nouvelles fractures en cas de chute, nécessitant des précautions."}],
 traitement:"Bisphosphonate/dénosumab, calcium-vitamine D, prévention des chutes",
 pronostic:"Pronostic lié au risque fracturaire et à la prévention des chutes ; impact fonctionnel des fractures.",
 besoin:"Prévention des chutes, aides techniques, aménagement du logement, rééducation."},
"Amputation":{
 motiv:"Amputation de membre",
 signs:[
  {t:"Perte fonctionnelle du membre",d:"Perte de la fonction du membre amputé limitant la marche, l'équilibre ou la préhension selon le niveau."},
  {t:"Appareillage et adaptation",d:"Recours à une prothèse nécessitant un apprentissage, avec gêne et limitation des déplacements/gestes."},
  {t:"Douleurs (moignon, fantôme)",d:"Douleurs du moignon ou douleurs fantômes retentissant sur le confort et l'utilisation de l'appareillage."}],
 traitement:"Appareillage prothétique, rééducation, traitement des douleurs",
 pronostic:"Déficit définitif ; autonomie souvent bonne avec appareillage et rééducation adaptés.",
 besoin:"Appareillage et suivi, rééducation, aménagement du logement/véhicule, aide aux déplacements."},
"Prothèse articulaire":{
 motiv:"Port de prothèse articulaire",
 signs:[
  {t:"Limitation articulaire résiduelle",d:"Limitation d'amplitude et gêne fonctionnelle résiduelles selon l'articulation et la récupération."},
  {t:"Douleurs et fatigabilité",d:"Douleurs et fatigabilité limitant la marche prolongée, le port de charges et certaines positions."},
  {t:"Précautions et risque",d:"Précautions à respecter (luxation, descellement) avec restriction de certains gestes/activités."}],
 traitement:"Antalgiques, rééducation, surveillance",
 pronostic:"Pronostic généralement favorable ; gêne résiduelle et durée de vie de la prothèse à considérer.",
 besoin:"Rééducation, aménagement des activités, aides techniques si besoin."},
/* ===================== SENSORIEL ===================== */
"Déficience visuelle/malvoyance":{
 motiv:"Déficience visuelle (malvoyance)",
 signs:[
  {t:"Baisse d'acuité / du champ visuel",d:"Réduction de l'acuité et/ou du champ visuel gênant la lecture, les déplacements et la reconnaissance."},
  {t:"Difficultés de déplacement",d:"Difficultés d'orientation et de déplacement, surtout en extérieur ou en faible luminosité, avec risque de chute."},
  {t:"Retentissement sur les activités",d:"Limitation des tâches visuelles (lecture, écriture, écran) retentissant sur l'autonomie, la scolarité ou le travail."}],
 traitement:"Aides optiques, rééducation basse vision, suivi ophtalmologique",
 pronostic:"Pronostic selon l'affection causale ; retentissement compensable par des aides adaptées.",
 besoin:"Aides techniques (agrandisseur, synthèse vocale), aménagement du poste, accompagnement (locomotion)."},
"Cécité":{
 motiv:"Cécité",
 signs:[
  {t:"Absence de vision fonctionnelle",d:"Perte de la vision fonctionnelle imposant une aide pour les déplacements, la lecture et de nombreux actes quotidiens."},
  {t:"Dépendance pour les déplacements",d:"Déplacements extérieurs nécessitant canne blanche, chien guide et/ou accompagnement."},
  {t:"Adaptation de tous les supports",d:"Nécessité de supports adaptés (braille, audio, synthèse vocale) pour l'information et la communication."}],
 traitement:"Rééducation, aides techniques, accompagnement spécialisé",
 pronostic:"Déficit sévère et durable ; autonomie possible avec apprentissage et aides adaptées.",
 besoin:"Aide humaine, matériel adapté, aménagement du logement/poste, accompagnement à la locomotion."},
"Déficience auditive":{
 motiv:"Déficience auditive",
 signs:[
  {t:"Gêne de communication",d:"Difficultés de compréhension de la parole, surtout en milieu bruyant, retentissant sur les échanges et le travail."},
  {t:"Isolement social",d:"Limitation des interactions et risque d'isolement, fatigue liée à l'effort de compréhension."},
  {t:"Sécurité et alertes",d:"Difficulté à percevoir les signaux sonores d'alerte avec enjeu de sécurité."}],
 traitement:"Appareillage auditif, accompagnement orthophonique",
 pronostic:"Retentissement compensable par l'appareillage ; pronostic selon la cause et le degré.",
 besoin:"Aides auditives, aménagement de la communication (boucle, écrit), aménagement de poste."},
"Surdité":{
 motiv:"Surdité",
 signs:[
  {t:"Perte auditive sévère à profonde",d:"Perte auditive importante limitant fortement la communication orale et l'accès à l'information sonore."},
  {t:"Communication adaptée",d:"Recours nécessaire à la lecture labiale, à la LSF et/ou à l'écrit pour communiquer."},
  {t:"Sécurité et accessibilité",d:"Difficulté de perception des alertes sonores nécessitant des dispositifs adaptés."}],
 traitement:"Appareillage/implant, accompagnement, interprétariat LSF",
 pronostic:"Déficit durable ; communication possible avec adaptations et aides.",
 besoin:"Interprétariat/LSF, dispositifs visuels, aménagement de la scolarité/du poste."},
/* ===================== CANCÉRO / HÉMATO / IMMUNO / INFECTIEUX ===================== */
"Cancer (en cours/antécédent)":{
 motiv:"Pathologie cancéreuse (en cours ou antécédent)",
 signs:[
  {t:"Asthénie liée à la maladie/aux traitements",d:"Fatigue intense liée à la maladie et aux traitements (chimio/radio) limitant les activités et le travail."},
  {t:"Effets des traitements",d:"Effets indésirables (douleurs, neuropathie, troubles digestifs, immunodépression) retentissant sur l'autonomie."},
  {t:"Retentissement psychologique et social",d:"Anxiété, retentissement social et professionnel, contraintes de soins fréquents."}],
 traitement:"Traitements oncologiques spécifiques, soins de support",
 pronostic:"Pronostic très variable selon le type, le stade et la réponse au traitement.",
 besoin:"Soins de support, aménagement/maintien dans l'emploi, aide à domicile, accompagnement social."},
"Hémopathie":{
 motiv:"Hémopathie",
 signs:[
  {t:"Cytopénies et complications",d:"Anémie, risque infectieux et hémorragique limitant les efforts et exposant à des complications."},
  {t:"Asthénie et fatigabilité",d:"Fatigue marquée retentissant sur les activités quotidiennes et professionnelles."},
  {t:"Contraintes de traitement et de suivi",d:"Traitements et surveillance fréquents, parfois immunodépression nécessitant des précautions."}],
 traitement:"Traitement hématologique spécifique, transfusions/soins de support",
 pronostic:"Pronostic variable selon l'hémopathie et la réponse thérapeutique.",
 besoin:"Suivi spécialisé, précautions anti-infectieuses, aménagement professionnel, aide à domicile."},
"Déficit immunitaire/immunosuppression":{
 motiv:"Déficit immunitaire / immunosuppression",
 signs:[
  {t:"Sensibilité aux infections",d:"Susceptibilité accrue aux infections imposant des précautions et limitant les contacts/environnements à risque."},
  {t:"Fatigabilité et contraintes de soins",d:"Asthénie et traitements/surveillance réguliers retentissant sur la vie quotidienne et professionnelle."},
  {t:"Restrictions environnementales",d:"Nécessité d'éviter certaines expositions, avec impact sur la scolarité, le travail et la vie sociale."}],
 traitement:"Traitement de la cause, prophylaxies, vaccinations adaptées",
 pronostic:"Pronostic selon la cause ; risque infectieux à prendre en compte durablement.",
 besoin:"Mesures de protection, aménagement de l'environnement et du poste, suivi spécialisé."},
"Pathologie infectieuse chronique (VIH, hépatite…)":{
 motiv:"Pathologie infectieuse chronique",
 signs:[
  {t:"Retentissement général",d:"Fatigue chronique et retentissement général pouvant limiter les efforts et les activités."},
  {t:"Contraintes thérapeutiques",d:"Traitement et suivi au long cours, avec effets indésirables possibles et besoin d'observance stricte."},
  {t:"Retentissement social",d:"Retentissement psychologique et social, parfois stigmatisation, avec impact professionnel."}],
 traitement:"Traitement antiviral/spécifique au long cours, suivi régulier",
 pronostic:"Pronostic souvent bon sous traitement bien conduit ; dépend de l'observance et des complications.",
 besoin:"Aide à l'observance, suivi spécialisé, accompagnement social et professionnel."},
/* ===================== DIGESTIF / NÉPHRO / URO / RARE ===================== */
"MICI (Crohn, RCH)":{
 motiv:"Maladie inflammatoire chronique de l'intestin",
 signs:[
  {t:"Poussées digestives",d:"Diarrhées, douleurs abdominales et urgences défécatoires limitant les déplacements, le travail et la vie sociale."},
  {t:"Asthénie et dénutrition",d:"Fatigue, amaigrissement et carences retentissant sur l'énergie et l'autonomie."},
  {t:"Complications et chirurgie",d:"Complications possibles (fistules, sténoses, chirurgie, stomie) majorant le retentissement."}],
 traitement:"Anti-inflammatoires intestinaux, immunosuppresseurs, biothérapie",
 pronostic:"Maladie chronique évoluant par poussées ; pronostic amélioré par les traitements, complications possibles.",
 besoin:"Accès aux sanitaires, aménagement des horaires/poste, suivi spécialisé, soutien nutritionnel."},
"Hépatopathie chronique":{
 motiv:"Hépatopathie chronique",
 signs:[
  {t:"Asthénie chronique",d:"Fatigue persistante limitant les efforts et les activités quotidiennes et professionnelles."},
  {t:"Complications de la maladie",d:"Complications possibles (décompensation, encéphalopathie, hypertension portale) retentissant sur l'autonomie."},
  {t:"Contraintes de suivi",d:"Surveillance régulière et précautions médicamenteuses/alimentaires contraignantes."}],
 traitement:"Traitement de la cause, prise en charge des complications",
 pronostic:"Pronostic selon le stade (fibrose/cirrhose) et la cause ; risque de décompensation.",
 besoin:"Suivi hépatologique, adaptation de l'activité, soutien nutritionnel et social."},
"Insuffisance rénale chronique/dialyse":{
 motiv:"Insuffisance rénale chronique (dialyse)",
 signs:[
  {t:"Asthénie et retentissement général",d:"Fatigue importante, anémie et retentissement général limitant les efforts et l'autonomie."},
  {t:"Contraintes de la dialyse",d:"Séances de dialyse pluri-hebdomadaires très contraignantes, limitant la disponibilité et le travail."},
  {t:"Régime et complications",d:"Restrictions hydriques/alimentaires et complications cardio-osseuses majorant le retentissement."}],
 traitement:"Dialyse, traitement de l'anémie/des troubles phosphocalciques",
 pronostic:"Maladie chronique sévère ; pronostic lié au stade, aux comorbidités et à l'accès à la greffe.",
 besoin:"Organisation autour des séances, aménagement professionnel, aide aux déplacements, soutien diététique."},
"Transplantation d'organe":{
 motiv:"Transplantation d'organe",
 signs:[
  {t:"Immunosuppression au long cours",d:"Traitement immunosuppresseur à vie avec risque infectieux et effets indésirables, imposant des précautions."},
  {t:"Surveillance rapprochée",d:"Suivi médical et biologique fréquent, contraignant pour la vie quotidienne et professionnelle."},
  {t:"Fatigabilité et fragilité",d:"Fatigabilité et fragilité résiduelles limitant certains efforts et expositions."}],
 traitement:"Immunosuppresseurs, prophylaxies, suivi spécialisé",
 pronostic:"Pronostic souvent favorable mais dépendant de la fonction du greffon et des complications.",
 besoin:"Précautions anti-infectieuses, aménagement de poste, suivi spécialisé, aide à l'observance."},
"Troubles vésico-sphinctériens":{
 motiv:"Troubles vésico-sphinctériens",
 signs:[
  {t:"Incontinence / impériosités",d:"Fuites urinaires et/ou impériosités limitant les déplacements, la vie sociale et professionnelle."},
  {t:"Recours aux protections / sondages",d:"Nécessité de protections ou d'autosondages, contraignante au quotidien et nécessitant l'accès aux sanitaires."},
  {t:"Retentissement psychosocial",d:"Gêne, anxiété et restriction des activités et sorties."}],
 traitement:"Rééducation périnéale, traitements spécifiques, sondages au besoin",
 pronostic:"Pronostic selon la cause ; retentissement souvent améliorable par la prise en charge.",
 besoin:"Accès aux sanitaires, matériel adapté, aménagement des horaires/poste, suivi spécialisé."},
"Stomie":{
 motiv:"Stomie digestive ou urinaire",
 signs:[
  {t:"Appareillage permanent",d:"Port permanent d'un appareillage de stomie nécessitant des soins réguliers et l'accès aux sanitaires."},
  {t:"Contraintes quotidiennes",d:"Gestion de l'appareillage, risque de fuites et restrictions limitant certaines activités et le travail."},
  {t:"Retentissement psychologique et social",d:"Retentissement sur l'image de soi, la vie sociale, sportive et intime."}],
 traitement:"Soins de stomie, accompagnement (stomathérapeute)",
 pronostic:"Pronostic selon la maladie causale ; bonne autonomie possible avec accompagnement.",
 besoin:"Matériel de stomie, accès aux sanitaires, aménagement du poste, accompagnement spécialisé."},
"Maladie rare/génétique":{
 motiv:"Maladie rare / génétique",
 signs:[
  {t:"Atteintes multiviscérales",d:"Manifestations souvent multiples et spécifiques retentissant sur plusieurs fonctions et sur l'autonomie."},
  {t:"Évolution et complications propres",d:"Évolution et complications spécifiques à la maladie nécessitant un suivi expert."},
  {t:"Retentissement global",d:"Retentissement sur la vie quotidienne, scolaire/professionnelle et sociale variable selon l'atteinte."}],
 traitement:"Prise en charge spécialisée (centre de référence/compétence)",
 pronostic:"Pronostic très variable selon la maladie ; suivi en filière spécialisée recommandé.",
 besoin:"Coordination des soins, aides adaptées aux atteintes, accompagnement médico-social et scolaire/professionnel."}
};
