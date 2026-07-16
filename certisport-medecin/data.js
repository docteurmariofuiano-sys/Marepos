/* =====================================================================
   CertiSport Médecin — base de connaissances
   Données embarquées (hors-ligne). Séparées du moteur (moteur.js) et de
   l'interface (app.js) : les règles sont versionnées, sourcées et datées.
   AUCUNE règle n'est présentée comme certaine sans source, date et statut.
   ===================================================================== */
'use strict';

const CS_VERSION_BASE = "2026.07-1";

/* ---------------------------------------------------------------------
   AVERTISSEMENTS OBLIGATOIRES
--------------------------------------------------------------------- */
const CS_AVERTISSEMENTS = {
  general: "CertiSport Médecin est un outil professionnel d'aide à la consultation et à la décision. Il ne remplace ni l'examen médical, ni le jugement du praticien, ni la consultation des textes réglementaires et des règlements fédéraux en vigueur. Le médecin demeure seul responsable de la décision médicale et du certificat qu'il signe.",
  federal: "Les règles des fédérations peuvent compléter les obligations légales. Elles ne doivent pas être assimilées automatiquement à une obligation réglementaire générale.",
  alerte: "Un signal d'alerte ne signifie pas nécessairement une contre-indication définitive. Il impose une évaluation complémentaire avant toute conclusion.",
  urgence: "La priorité est l'évaluation médicale urgente. La délivrance du certificat sportif doit être interrompue.",
  ia: "Cette suggestion est une aide à la décision. Elle doit être vérifiée et validée par le médecin.",
  incertitude: "Je ne peux pas confirmer cette exigence à partir d'une source officielle suffisamment récente. Vérifiez le règlement médical actuel de la fédération concernée."
};

/* ---------------------------------------------------------------------
   BASE RÉGLEMENTAIRE VERSIONNÉE
   Chaque règle : source, article, dates, lien, statut, portée, limites.
   Statuts : "verifiee" | "a-verifier" | "obsolete" | "remplacee"
--------------------------------------------------------------------- */
const CS_REGLES = [
  {
    id: "CS-L231-2",
    texte: "Code du sport", article: "L.231-2",
    intitule: "Conditions médicales de délivrance de la licence fédérale",
    resume: "Les fédérations sportives fixent, dans leur règlement fédéral, les conditions dans lesquelles un certificat médical peut être exigé pour la délivrance ou le renouvellement d'une licence (rédaction issue de la loi n° 2022-296 du 2 mars 2022). Il n'existe donc plus d'obligation légale générale et uniforme de certificat pour les majeurs licenciés : la règle dépend du règlement fédéral.",
    portee: "Licenciés majeurs, hors disciplines à contraintes particulières.",
    date_vigueur: "2022-03-04",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071318/LEGISCTA000006167045/",
    statut: "a-verifier",
    niveau_validation: "Rédaction à confronter à Légifrance avant tout usage médico-légal.",
    divergence: "Beaucoup de fédérations conservent l'exigence d'un certificat triennal + questionnaire QS-Sport de renouvellement : vérifier le règlement médical fédéral."
  },
  {
    id: "CS-L231-2-1",
    texte: "Code du sport", article: "L.231-2-1",
    intitule: "Non-licenciés et inscription aux compétitions",
    resume: "L'inscription d'un non-licencié à une compétition sportive autorisée ou organisée par une fédération délégataire est subordonnée aux conditions prévues par le règlement fédéral (historiquement : certificat de non-contre-indication datant de moins d'un an, ou licence compétition). Pour les mineurs, le questionnaire de santé peut se substituer au certificat.",
    portee: "Compétitions fédérales, participants non licenciés.",
    date_vigueur: "2022-03-04",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071318/LEGISCTA000006167045/",
    statut: "a-verifier",
    niveau_validation: "Rédaction issue de la loi 2022-296 : vérifier la version en vigueur et le règlement de la compétition.",
    divergence: null
  },
  {
    id: "CS-L231-2-3",
    texte: "Code du sport", article: "L.231-2-3",
    intitule: "Disciplines à contraintes particulières : certificat spécifique obligatoire",
    resume: "Pour les disciplines à contraintes particulières (liste fixée par décret, art. D.231-1-5), la délivrance ou le renouvellement de la licence ET la participation à une compétition sont subordonnés à un certificat médical datant de moins d'un an, établi après un examen médical spécifique dont les caractéristiques sont fixées par arrêté. Le questionnaire de santé ne peut pas s'y substituer, y compris pour les mineurs.",
    portee: "Toute pratique licenciée ou compétitive d'une discipline listée à l'art. D.231-1-5.",
    date_vigueur: "2016-11-27",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033218556/",
    statut: "verifiee",
    niveau_validation: "Principe stable ; le contenu de la liste dépend de D.231-1-5 (voir CS-D231-1-5).",
    divergence: null
  },
  {
    id: "CS-D231-1-5",
    texte: "Code du sport", article: "D.231-1-5 (rédaction issue du décret n° 2023-853 du 31 août 2023)",
    intitule: "Liste des disciplines à contraintes particulières",
    resume: "Liste actuelle (5 catégories) : 1° plongée subaquatique (y compris souterraine) ; 2° sports de combat pour lesquels la mise « hors combat » est autorisée en compétition ; 3° disciplines utilisant des armes à feu ou à air comprimé ; 4° disciplines comportant l'utilisation de véhicules terrestres à moteur en compétition, à l'exception du karting et du modélisme automobile radioguidé ; 5° disciplines motonautiques. Les disciplines anciennement listées (alpinisme, spéléologie, parachutisme, vol libre, rugby…) ne relèvent PLUS de cette liste au titre du texte actuel.",
    portee: "Détermine le champ d'application de L.231-2-3.",
    date_vigueur: "2023-09-03",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048018619",
    statut: "verifiee",
    niveau_validation: "Contenu conforme au décret n° 2023-853 ; à re-vérifier périodiquement sur Légifrance.",
    divergence: "Certaines fédérations (ex. rugby, parachutisme, montagne) maintiennent des exigences médicales propres dans leur règlement : exigence fédérale, pas obligation légale au titre de D.231-1-5."
  },
  {
    id: "CS-ARRETE-2017",
    texte: "Arrêté du 24 juillet 2017 (modifié)", article: "Annexes I à V",
    intitule: "Caractéristiques de l'examen médical spécifique (disciplines à contraintes particulières)",
    resume: "Fixe le contenu de l'examen médical spécifique par catégorie de discipline : recherche d'éléments cliniques ciblés (ORL/dentaire/respiratoire pour la plongée ; neurologique, ophtalmologique et psychique pour les sports de combat ; rachis du mineur pour le tir debout ; vision, audition, vigilance pour les sports mécaniques…). Certains contenus peuvent avoir été modifiés par arrêtés ultérieurs : vérifier la version consolidée.",
    portee: "Contenu de l'examen exigé par L.231-2-3.",
    date_vigueur: "2017-08-15",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000035432868/",
    statut: "a-verifier",
    niveau_validation: "Vérifier la cohérence de la version consolidée avec la liste D.231-1-5 issue du décret 2023-853 (certaines annexes visant des disciplines retirées peuvent subsister).",
    divergence: "Possible incohérence transitoire entre l'arrêté (annexes historiques) et la liste actuelle des disciplines : signaler et privilégier le texte le plus récent."
  },
  {
    id: "CS-QS-MINEUR",
    texte: "Décret n° 2021-564 du 7 mai 2021 et arrêté du 7 mai 2021", article: "D.231-1-4-1 ; annexe (questionnaire mineur)",
    intitule: "Questionnaire de santé du mineur",
    resume: "Pour le mineur (hors disciplines à contraintes particulières), l'obtention ou le renouvellement de licence et l'inscription en compétition s'effectuent au vu d'un questionnaire de santé renseigné avec le représentant légal. Un certificat de moins de 6 mois n'est requis que si une réponse au questionnaire est positive.",
    portee: "Mineurs, licence et compétition, hors D.231-1-5.",
    date_vigueur: "2021-05-10",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043486809",
    statut: "verifiee",
    niveau_validation: "Principe stable ; le formulaire officiel du questionnaire figure en annexe de l'arrêté du 7 mai 2021.",
    divergence: null
  },
  {
    id: "CS-QS-SPORT",
    texte: "Code du sport", article: "D.231-1-4 et annexe II-22 (QS-Sport)",
    intitule: "Questionnaire de santé de renouvellement (majeurs)",
    resume: "Lorsque le règlement fédéral prévoit un certificat pour les majeurs, le renouvellement de licence peut s'effectuer via le questionnaire QS-Sport pendant la période de validité du certificat (historiquement 3 ans) ; toute réponse positive impose un nouveau certificat.",
    portee: "Renouvellement de licence, majeurs, selon règlement fédéral.",
    date_vigueur: "2016-10-12",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033312805/",
    statut: "a-verifier",
    niveau_validation: "Le maintien de ce dispositif dépend désormais du règlement fédéral (loi 2022-296).",
    divergence: null
  },
  {
    id: "CS-DECRET-2023-853",
    texte: "Décret n° 2023-853 du 31 août 2023", article: "Art. 1 (modifie D.231-1-5)",
    intitule: "Réforme de la liste des disciplines à contraintes particulières",
    resume: "Restreint la liste aux 5 catégories actuelles et en retire notamment l'alpinisme, la spéléologie, le parachutisme, le vol libre et le rugby. Prévoit l'exclusion du karting et du modélisme automobile radioguidé.",
    portee: "Modification de D.231-1-5.",
    date_vigueur: "2023-09-03",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048018619",
    statut: "verifiee",
    niveau_validation: "Texte publié au JORF du 2 septembre 2023.",
    divergence: null
  },
  {
    id: "CS-CNOM-CERTIF",
    texte: "Règles déontologiques (CNOM)", article: "Art. R.4127-28, R.4127-76 CSP",
    intitule: "Rédaction des certificats médicaux",
    resume: "Le certificat est établi après examen personnel du patient, à la date de l'examen, sans antidatage, sans mention de diagnostic ni de donnée couverte par le secret médical non nécessaire à sa finalité. Il engage la responsabilité du médecin signataire.",
    portee: "Tout certificat médical.",
    date_vigueur: "2012-05-08",
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.conseil-national.medecin.fr/",
    statut: "verifiee",
    niveau_validation: "Principes déontologiques constants.",
    divergence: null
  },
  {
    id: "CS-SERVICE-PUBLIC",
    texte: "Service-Public.fr", article: "Fiche « Certificat médical pour la pratique d'un sport »",
    intitule: "Information officielle grand public",
    resume: "Synthèse officielle des cas où un certificat est nécessaire (mineur/majeur, licence/compétition, disciplines à contraintes particulières). Source d'information, non source normative.",
    portee: "Information ; ne se substitue pas aux textes.",
    date_vigueur: null,
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.service-public.fr/particuliers/vosdroits/F1030",
    statut: "a-verifier",
    niveau_validation: "Page à consulter en ligne pour la version à jour.",
    divergence: null
  },
  {
    id: "CS-ECG-RECO",
    texte: "Recommandations SFC/ESC (dépistage cardiovasculaire du sportif)", article: "Recommandation professionnelle — non réglementaire",
    intitule: "Place de l'ECG dans la visite de non-contre-indication",
    resume: "La Société française de cardiologie a historiquement proposé un ECG de repos chez le sportif compétiteur de 12 à 35 ans (tous les 3 ans puis 5 ans). Il s'agit d'une RECOMMANDATION professionnelle discutée, PAS d'une obligation légale générale. L'indication s'apprécie selon l'âge, les symptômes, les antécédents personnels et familiaux, le sport et le niveau.",
    portee: "Aide à la décision clinique uniquement.",
    date_vigueur: null,
    date_verification: "2026-07-16",
    urlOfficielle: "https://www.sfcardio.fr/",
    statut: "a-verifier",
    niveau_validation: "Recommandation scientifique : ne jamais la présenter comme une disposition légale.",
    divergence: null
  }
];

/* ---------------------------------------------------------------------
   DISCIPLINES À CONTRAINTES PARTICULIÈRES (D.231-1-5, décret 2023-853)
--------------------------------------------------------------------- */
const CS_CATEGORIES_CP = {
  plongee:      { nom: "Plongée subaquatique (y compris souterraine)", regle: "CS-D231-1-5" },
  combat_ko:    { nom: "Sports de combat avec mise hors combat autorisée en compétition", regle: "CS-D231-1-5" },
  armes:        { nom: "Disciplines utilisant des armes à feu ou à air comprimé", regle: "CS-D231-1-5" },
  vehicules:    { nom: "Véhicules terrestres à moteur en compétition (hors karting et modélisme radioguidé)", regle: "CS-D231-1-5" },
  motonautisme: { nom: "Disciplines motonautiques", regle: "CS-D231-1-5" }
};

/* ---------------------------------------------------------------------
   BASE DE CONNAISSANCES SPORTIVES
   cp : true = catégorie D.231-1-5 | "conditionnel" = selon modalités
        (ex. combat : seulement si compétition avec KO autorisé)
        | "exclu" = exclu par le texte mais règlement propre possible
        | false = hors liste actuelle
   ancienListe : true = figurait dans l'ancienne liste (à ne PAS réactiver)
--------------------------------------------------------------------- */
const CS_SPORTS = [
  /* --- Plongée --- */
  { id:"plongee-scaphandre", nom:"Plongée subaquatique en scaphandre", syn:["plongée bouteille","scuba","plongée sous-marine"],
    fed:"FFESSM", cp:true, catCP:"plongee", module:"plongee",
    env:["eau","souterrain possible"], intensite:"modérée", statDyn:"dynamique modéré",
    risques:["noyade","barotraumatisme","accident de décompression","incapacité brutale en milieu hostile"],
    dateVerif:"2026-07-16" },
  { id:"plongee-souterraine", nom:"Plongée souterraine", syn:["plongée spéléo","spéléoplongée"],
    fed:"FFESSM / FFS", cp:true, catCP:"plongee", module:"plongee",
    env:["eau","souterrain","isolement"], intensite:"modérée à élevée", statDyn:"dynamique modéré",
    risques:["noyade","désorientation","décompression","secours très difficile"], dateVerif:"2026-07-16" },
  { id:"apnee", nom:"Apnée (cadre fédéral)", syn:["freediving","apnée sportive"],
    fed:"FFESSM / AIDA", cp:"conditionnel", catCP:"plongee", module:"plongee",
    condCP:"L'apnée pratiquée dans le cadre fédéral de la plongée subaquatique relève en principe de la catégorie « plongée » : vérifier le règlement fédéral et le texte en vigueur.",
    env:["eau"], intensite:"élevée", statDyn:"statique puis dynamique",
    risques:["syncope hypoxique","noyade","barotraumatisme"], dateVerif:"2026-07-16" },

  /* --- Combat KO --- */
  { id:"boxe-anglaise", nom:"Boxe anglaise", syn:["boxe","boxing"],
    fed:"FF Boxe", cp:"conditionnel", catCP:"combat_ko", module:"combat",
    condCP:"En compétition, la mise hors combat (KO) est autorisée : discipline à contraintes particulières. En loisir sans opposition avec KO, vérifier le règlement fédéral.",
    env:["salle"], intensite:"très élevée", statDyn:"dynamique élevé",
    risques:["commotion","traumatisme crânien répété","traumatisme oculaire","KO"], ko:true, dateVerif:"2026-07-16" },
  { id:"kick-boxing", nom:"Kick-boxing", syn:["kickboxing","K1"],
    fed:"FF Kick Boxing, Muay Thaï et DA", cp:"conditionnel", catCP:"combat_ko", module:"combat", ko:true,
    condCP:"Contraintes particulières si compétition avec mise hors combat autorisée (selon règlement).",
    env:["salle"], intensite:"très élevée", statDyn:"dynamique élevé",
    risques:["commotion","KO","traumatismes membres inférieurs"], dateVerif:"2026-07-16" },
  { id:"muay-thai", nom:"Muay-thaï", syn:["boxe thaï","boxe thaïlandaise"],
    fed:"FF Kick Boxing, Muay Thaï et DA", cp:"conditionnel", catCP:"combat_ko", module:"combat", ko:true,
    condCP:"Contraintes particulières si compétition avec mise hors combat autorisée.",
    env:["salle"], intensite:"très élevée", statDyn:"dynamique élevé",
    risques:["commotion","KO","plaies"], dateVerif:"2026-07-16" },
  { id:"savate-combat", nom:"Savate boxe française (combat)", syn:["savate","boxe française combat"],
    fed:"FF Savate BF & DA", cp:"conditionnel", catCP:"combat_ko", module:"combat", ko:true,
    condCP:"La forme « combat » autorise la mise hors combat ; l'assaut (touche) n'en relève pas : vérifier la forme pratiquée.",
    env:["salle"], intensite:"très élevée", statDyn:"dynamique élevé",
    risques:["commotion","KO"], dateVerif:"2026-07-16" },
  { id:"mma", nom:"MMA — arts martiaux mixtes", syn:["mixed martial arts","free fight","pancrace"],
    fed:"FMMAF", cp:"conditionnel", catCP:"combat_ko", module:"combat", ko:true,
    condCP:"Compétition avec KO autorisé : contraintes particulières. Entraînement loisir sans opposition dure : vérifier le règlement.",
    env:["salle"], intensite:"très élevée", statDyn:"dynamique élevé",
    risques:["commotion","KO","luxations","strangulations"], dateVerif:"2026-07-16" },
  { id:"karate-contact", nom:"Karaté (formes avec KO autorisé)", syn:["karaté full contact","karaté combat"],
    fed:"FF Karaté", cp:"conditionnel", catCP:"combat_ko", module:"combat", ko:true,
    condCP:"Seules les formes compétitives où le règlement autorise la mise hors combat relèvent des contraintes particulières ; le karaté traditionnel à la touche n'en relève pas.",
    env:["salle"], intensite:"élevée", statDyn:"dynamique élevé",
    risques:["commotion","traumatismes"], dateVerif:"2026-07-16" },
  { id:"judo", nom:"Judo", syn:["jujitsu","ju-jitsu"],
    fed:"FF Judo", cp:false, module:"combat-souple",
    env:["salle"], intensite:"élevée", statDyn:"dynamique élevé",
    risques:["chutes","traumatismes articulaires","strangulations (selon formes)"],
    notes:"Pas de mise hors combat par frappe : hors D.231-1-5 sauf disposition contraire du règlement en compétition — vérifier.", dateVerif:"2026-07-16" },

  /* --- Armes --- */
  { id:"tir-sportif", nom:"Tir sportif", syn:["tir","tir à la cible","pistolet","carabine"],
    fed:"FF Tir", cp:true, catCP:"armes", module:"tir", arme:true,
    env:["stand"], intensite:"faible", statDyn:"statique",
    risques:["risque pour autrui en cas de perte de contrôle","exposition sonore"],
    notes:"Avis médical également exigé pour l'autorisation de détention selon réglementation des armes (hors champ sportif).", dateVerif:"2026-07-16" },
  { id:"ball-trap", nom:"Ball-trap", syn:["tir aux plateaux","fosse olympique","skeet"],
    fed:"FF Ball Trap", cp:true, catCP:"armes", module:"tir", arme:true,
    env:["extérieur"], intensite:"faible", statDyn:"statique",
    risques:["risque pour autrui","exposition sonore"], dateVerif:"2026-07-16" },
  { id:"biathlon", nom:"Biathlon", syn:["ski-tir"],
    fed:"FF Ski", cp:true, catCP:"armes", module:"tir", arme:true, biathlon:true,
    env:["froid","altitude possible"], intensite:"très élevée", statDyn:"dynamique très élevé + précision statique",
    risques:["effort maximal + arme","froid","hypoglycémie d'effort"], dateVerif:"2026-07-16" },

  /* --- Véhicules terrestres à moteur --- */
  { id:"sport-auto", nom:"Sport automobile (compétition)", syn:["course automobile","rallye","circuit","drift"],
    fed:"FFSA", cp:"conditionnel", catCP:"vehicules", module:"moteur", moteur:true,
    condCP:"Contraintes particulières uniquement en COMPÉTITION. Karting et modélisme radioguidé exclus par le texte.",
    env:["chaleur habitacle","vibrations"], intensite:"modérée à élevée", statDyn:"statique prolongé",
    risques:["accident à haute cinétique","incapacité brutale = danger pour autrui","chaleur"], dateVerif:"2026-07-16" },
  { id:"moto-competition", nom:"Motocyclisme (compétition)", syn:["moto-cross","motocross","vitesse moto","enduro","supermotard"],
    fed:"FFM", cp:"conditionnel", catCP:"vehicules", module:"moteur", moteur:true,
    condCP:"Contraintes particulières en compétition (véhicule terrestre à moteur).",
    env:["extérieur","vibrations"], intensite:"élevée", statDyn:"dynamique élevé",
    risques:["chute à haute cinétique","polytraumatisme","incapacité brutale"], dateVerif:"2026-07-16" },
  { id:"karting", nom:"Karting", syn:["kart"],
    fed:"FFSA", cp:"exclu", catCP:"vehicules", module:"moteur", moteur:true,
    condCP:"Exclu de D.231-1-5 par le décret 2023-853. Une fédération ou un organisateur peut néanmoins exiger un certificat dans son règlement propre : vérifier.",
    env:["circuit"], intensite:"modérée", statDyn:"statique",
    risques:["accident","vibrations","rachis"], dateVerif:"2026-07-16" },

  /* --- Motonautisme --- */
  { id:"motonautisme", nom:"Motonautisme", syn:["bateau de course","offshore","circuit motonautique"],
    fed:"FF Motonautique", cp:true, catCP:"motonautisme", module:"motonautisme", moteur:true,
    env:["eau"], intensite:"modérée", statDyn:"statique + vibrations",
    risques:["chute dans l'eau à haute vitesse","noyade","incapacité brutale"], dateVerif:"2026-07-16" },
  { id:"jet-ski", nom:"Véhicule nautique à moteur / jet-ski (compétition)", syn:["jet ski","VNM","scooter des mers"],
    fed:"FF Motonautique", cp:true, catCP:"motonautisme", module:"motonautisme", moteur:true,
    env:["eau"], intensite:"élevée", statDyn:"dynamique modéré",
    risques:["chute dans l'eau","noyade","traumatismes"], dateVerif:"2026-07-16" },

  /* --- Sports retirés de l'ancienne liste : évaluation spécifique conservée --- */
  { id:"rugby", nom:"Rugby (XV, XIII, VII)", syn:["rugby à XV","rugby à XIII","rugby à 7"],
    fed:"FFR", cp:false, ancienListe:true, module:"collision",
    env:["extérieur"], intensite:"très élevée", statDyn:"dynamique élevé", collision:true,
    risques:["commotion","rachis cervical (mêlée)","traumatismes"],
    notes:"Retiré de la liste D.231-1-5 (décret 2023-853). La FFR maintient des exigences médicales propres (dont certificat) : exigence FÉDÉRALE à vérifier, pas obligation légale au titre des contraintes particulières.", dateVerif:"2026-07-16" },
  { id:"alpinisme", nom:"Alpinisme", syn:["haute montagne","cascade de glace"],
    fed:"FFCAM / FFME", cp:false, ancienListe:true, module:"altitude",
    env:["altitude","froid","isolement"], intensite:"élevée", statDyn:"dynamique prolongé",
    risques:["mal aigu des montagnes","OPHA/OCHA","chute","froid","secours difficile"],
    notes:"Retiré de la liste réglementaire : l'évaluation médicale spécifique aux risques d'altitude reste cliniquement justifiée.", dateVerif:"2026-07-16" },
  { id:"speleologie", nom:"Spéléologie (hors plongée souterraine)", syn:["spéléo"],
    fed:"FFS", cp:false, ancienListe:true, module:"speleo",
    env:["souterrain","froid","humidité","isolement"], intensite:"élevée", statDyn:"dynamique prolongé",
    risques:["hypothermie","épuisement","évacuation très difficile"],
    notes:"Retirée de la liste réglementaire (la plongée souterraine, elle, y demeure).", dateVerif:"2026-07-16" },
  { id:"parachutisme", nom:"Parachutisme", syn:["saut en parachute","chute libre","wingsuit"],
    fed:"FFP", cp:false, ancienListe:true, module:"aero",
    env:["altitude","aérien"], intensite:"modérée", statDyn:"dynamique bref intense",
    risques:["ouverture (rachis)","atterrissage (membres inférieurs)","barotraumatisme","incapacité brutale"],
    notes:"Retiré de la liste D.231-1-5. Le règlement FFP et la réglementation aéronautique peuvent imposer des exigences propres : vérifier.", dateVerif:"2026-07-16" },
  { id:"vol-libre", nom:"Vol libre (parapente, delta)", syn:["parapente","deltaplane","speed-riding"],
    fed:"FFVL", cp:false, ancienListe:true, module:"aero",
    env:["altitude","aérien"], intensite:"modérée", statDyn:"statique + phases intenses",
    risques:["incapacité brutale en vol","traumatismes à l'atterrissage","hypoxie d'altitude"],
    notes:"Retiré de la liste réglementaire ; règlement fédéral et réglementation aérienne à vérifier.", dateVerif:"2026-07-16" },

  /* --- Sports courants --- */
  { id:"course-a-pied", nom:"Course à pied", syn:["running","jogging","athlétisme fond"],
    fed:"FFA", cp:false, module:null, env:["extérieur"], intensite:"élevée", statDyn:"dynamique élevé",
    risques:["cardiovasculaire à l'effort","microtraumatismes membres inférieurs"], dateVerif:"2026-07-16" },
  { id:"marathon", nom:"Marathon / courses sur route", syn:["semi-marathon","10 km","course sur route"],
    fed:"FFA", cp:false, module:null, env:["extérieur","chaleur possible"], intensite:"très élevée", statDyn:"dynamique très élevé",
    risques:["événement cardiovasculaire","coup de chaleur","hyponatrémie"],
    notes:"Compétition hors licence : l'organisateur applique le règlement fédéral (L.231-2-1) — parcours « compétition » requis.", dateVerif:"2026-07-16" },
  { id:"trail", nom:"Trail", syn:["ultra-trail","course nature"],
    fed:"FFA", cp:false, module:"altitude-legere", env:["extérieur","altitude possible","isolement possible"],
    intensite:"très élevée", statDyn:"dynamique très élevé",
    risques:["cardiovasculaire","hypothermie/chaleur","isolement","entorses"], dateVerif:"2026-07-16" },
  { id:"cyclisme", nom:"Cyclisme", syn:["vélo","route","VTT","gravel"],
    fed:"FFC / FFCT", cp:false, module:null, env:["extérieur"], intensite:"élevée", statDyn:"dynamique élevé",
    risques:["chute","cardiovasculaire","traumatisme crânien"], dateVerif:"2026-07-16" },
  { id:"natation", nom:"Natation", syn:["nage","piscine","eau libre"],
    fed:"FF Natation", cp:false, module:null, env:["eau"], intensite:"élevée", statDyn:"dynamique élevé",
    risques:["noyade en cas de malaise","asthme (chlore)"],
    notes:"Une perte de connaissance dans l'eau est immédiatement dangereuse : pondérer épilepsie, syncopes, hypoglycémies.", dateVerif:"2026-07-16" },
  { id:"football", nom:"Football", syn:["foot","futsal"],
    fed:"FFF", cp:false, module:null, env:["extérieur"], intensite:"élevée", statDyn:"dynamique élevé", collision:true,
    risques:["entorses","contacts","têtes répétées (discuté)"], dateVerif:"2026-07-16" },
  { id:"tennis", nom:"Tennis", syn:["tennis en simple","tennis en double"],
    fed:"FFT", cp:false, module:null, env:["extérieur/salle"], intensite:"élevée", statDyn:"dynamique intermittent",
    risques:["cardiovasculaire (efforts brefs répétés)","épaule/coude"], dateVerif:"2026-07-16" },
  { id:"padel", nom:"Padel", syn:["paddle (raquette)"],
    fed:"FFT", cp:false, module:null, env:["extérieur/salle"], intensite:"modérée à élevée", statDyn:"dynamique intermittent",
    risques:["cardiovasculaire (population reprenant le sport)","tendinopathies","yeux (balle, vitres)"], dateVerif:"2026-07-16" },
  { id:"musculation", nom:"Musculation", syn:["fitness","haltérophilie loisir"],
    fed:"FF Haltérophilie-Musculation", cp:false, module:null, env:["salle"], intensite:"élevée", statDyn:"statique élevé",
    risques:["poussée tensionnelle (Valsalva)","rachis","hernies"],
    notes:"Composante statique forte : prudence si HTA non contrôlée, cardiopathie, anévrisme.", dateVerif:"2026-07-16" },
  { id:"crossfit", nom:"CrossFit / cross-training", syn:["cross training","HIIT"],
    fed:"—", cp:false, module:null, env:["salle"], intensite:"très élevée", statDyn:"mixte très élevé",
    risques:["cardiovasculaire","rhabdomyolyse d'effort","rachis"], dateVerif:"2026-07-16" },
  { id:"gymnastique", nom:"Gymnastique", syn:["gym artistique","GRS","trampoline"],
    fed:"FF Gym", cp:false, module:null, env:["salle"], intensite:"élevée", statDyn:"dynamique + statique",
    risques:["chutes","rachis","instabilité (Down : charnière C1-C2)"], dateVerif:"2026-07-16" },
  { id:"danse", nom:"Danse", syn:["danse classique","danse sportive","hip-hop"],
    fed:"FF Danse", cp:false, module:null, env:["salle"], intensite:"modérée à élevée", statDyn:"dynamique",
    risques:["membres inférieurs","troubles alimentaires (haut niveau)"], dateVerif:"2026-07-16" },
  { id:"ski", nom:"Ski alpin / snowboard", syn:["snowboard","ski de piste"],
    fed:"FF Ski", cp:false, module:"altitude-legere", env:["froid","altitude modérée"], intensite:"élevée", statDyn:"dynamique",
    risques:["traumatismes (genou, crâne)","froid","altitude modérée"], dateVerif:"2026-07-16" },
  { id:"sports-collectifs", nom:"Sports collectifs (hand, basket, volley…)", syn:["handball","basket","basketball","volley","volleyball"],
    fed:"selon discipline", cp:false, module:null, env:["salle/extérieur"], intensite:"élevée", statDyn:"dynamique élevé", collision:true,
    risques:["entorses","contacts","cardiovasculaire"], dateVerif:"2026-07-16" },
  { id:"sport-scolaire", nom:"Sport scolaire / EPS", syn:["EPS","UNSS","inaptitude EPS"],
    fed:"UNSS / USEP", cp:false, module:null, env:["variable"], intensite:"variable", statDyn:"variable",
    risques:[],
    notes:"L'EPS obligatoire ne requiert PAS de certificat d'aptitude ; c'est l'INAPTITUDE (totale ou partielle) qui se certifie. L'UNSS suit le régime du sport scolaire fédéré : vérifier.", dateVerif:"2026-07-16" },
  { id:"sport-adapte", nom:"Sport adapté / handisport", syn:["handisport","para-sport"],
    fed:"FFSA (sport adapté) / FFH", cp:false, module:null, env:["variable"], intensite:"variable", statDyn:"variable",
    risques:["selon pathologie sous-jacente"],
    notes:"Évaluation individualisée selon la déficience et la discipline ; règlements fédéraux spécifiques.", dateVerif:"2026-07-16" },
  { id:"sport-ordonnance", nom:"Activité physique adaptée (sport sur ordonnance)", syn:["APA","sport santé","prescription d'activité physique"],
    fed:"—", cp:false, module:null, env:["variable"], intensite:"adaptée", statDyn:"adapté",
    risques:["selon pathologie chronique"],
    notes:"Cadre distinct : prescription d'APA (art. L.1172-1 CSP) pour les patients en ALD/maladies chroniques — formulaire spécifique, pas certificat de non-contre-indication classique.", dateVerif:"2026-07-16" },
  { id:"equitation", nom:"Équitation", syn:["cheval","concours hippique","endurance équestre"],
    fed:"FFE", cp:false, module:null, env:["extérieur"], intensite:"modérée", statDyn:"dynamique",
    risques:["chute de hauteur","traumatisme crânien","écrasement"], dateVerif:"2026-07-16" },
  { id:"autre", nom:"Autre discipline (préciser)", syn:[],
    fed:"à préciser", cp:"inconnu", module:null, env:[], intensite:"à préciser", statDyn:"à préciser",
    risques:[], notes:"Discipline hors référentiel : vérifier manuellement le cadre réglementaire et le règlement fédéral.", dateVerif:null }
];

/* ---------------------------------------------------------------------
   QUESTIONNAIRE MÉDICAL GÉNÉRAL (réponses : oui / non / inconnu / na)
--------------------------------------------------------------------- */
const CS_QUESTIONNAIRE = [
  { id:"cv", titre:"Antécédents cardiovasculaires", icone:"🫀", items:[
    { id:"cv_cardiopathie_cong", l:"Cardiopathie congénitale" },
    { id:"cv_valvulopathie", l:"Valvulopathie" },
    { id:"cv_cardiomyopathie", l:"Cardiomyopathie (CMH, CMD, DVDA…)" },
    { id:"cv_myocardite", l:"Myocardite (y compris récente)" },
    { id:"cv_pericardite", l:"Péricardite" },
    { id:"cv_insuffisance", l:"Insuffisance cardiaque" },
    { id:"cv_coronaropathie", l:"Coronaropathie" },
    { id:"cv_infarctus", l:"Infarctus du myocarde" },
    { id:"cv_hta", l:"Hypertension artérielle" },
    { id:"cv_trouble_rythme", l:"Trouble du rythme connu" },
    { id:"cv_fa", l:"Fibrillation atriale" },
    { id:"cv_tv", l:"Tachycardie ventriculaire" },
    { id:"cv_canalopathie", l:"Canalopathie (QT long, Brugada…)" },
    { id:"cv_preexcitation", l:"Préexcitation (WPW)" },
    { id:"cv_syncope", l:"Syncope / perte de connaissance" },
    { id:"cv_lipothymie", l:"Lipothymies répétées" },
    { id:"cv_douleur_effort", l:"Douleur thoracique à l'effort" },
    { id:"cv_palpitations_effort", l:"Palpitations à l'effort" },
    { id:"cv_dyspnee_anormale", l:"Dyspnée anormale pour l'effort fourni" },
    { id:"cv_pacemaker", l:"Stimulateur cardiaque" },
    { id:"cv_dai", l:"Défibrillateur implantable" },
    { id:"cv_chirurgie", l:"Chirurgie cardiaque" },
    { id:"cv_traitement", l:"Traitement cardiologique en cours" }
  ]},
  { id:"fam", titre:"Antécédents familiaux", icone:"👪", items:[
    { id:"fam_mort_subite", l:"Mort subite avant 50 ans chez un apparenté" },
    { id:"fam_cardiomyopathie", l:"Cardiomyopathie familiale" },
    { id:"fam_canalopathie", l:"Canalopathie familiale (QT long, Brugada…)" },
    { id:"fam_noyade", l:"Noyade inexpliquée chez un apparenté" },
    { id:"fam_accident_inexplique", l:"Accident inexpliqué (voiture, chute) chez un apparenté jeune" },
    { id:"fam_syncope", l:"Syncopes familiales répétées" },
    { id:"fam_dai", l:"Défibrillateur implanté chez un apparenté" }
  ]},
  { id:"resp", titre:"Antécédents respiratoires", icone:"🫁", items:[
    { id:"resp_asthme", l:"Asthme" },
    { id:"resp_asthme_effort", l:"Asthme d'effort" },
    { id:"resp_asthme_froid", l:"Asthme déclenché par le froid" },
    { id:"resp_bpco", l:"BPCO" },
    { id:"resp_pneumothorax", l:"Pneumothorax" },
    { id:"resp_pneumothorax_recidive", l:"Récidive de pneumothorax" },
    { id:"resp_bulles", l:"Bulles ou blebs pulmonaires connus" },
    { id:"resp_chirurgie_thoracique", l:"Chirurgie thoracique" },
    { id:"resp_fibrose", l:"Fibrose pulmonaire" },
    { id:"resp_insuffisance", l:"Insuffisance respiratoire" },
    { id:"resp_embolie", l:"Embolie pulmonaire" },
    { id:"resp_saos", l:"Syndrome d'apnées du sommeil" },
    { id:"resp_somnolence", l:"Somnolence diurne excessive" },
    { id:"resp_traitement_inhale", l:"Traitement inhalé en cours" },
    { id:"resp_oxygene", l:"Oxygénothérapie" }
  ]},
  { id:"neuro", titre:"Neurologie", icone:"🧠", items:[
    { id:"neuro_epilepsie", l:"Épilepsie" },
    { id:"neuro_derniere_crise", l:"Crise épileptique dans les 12 derniers mois" },
    { id:"neuro_observance", l:"Difficulté d'observance du traitement antiépileptique" },
    { id:"neuro_syncope", l:"Syncope d'allure neurologique" },
    { id:"neuro_tc", l:"Traumatisme crânien" },
    { id:"neuro_commotion", l:"Commotion cérébrale" },
    { id:"neuro_commotions_multiples", l:"Commotions multiples (≥ 2)" },
    { id:"neuro_symptomes_post_commotion", l:"Symptômes post-commotionnels actuels (céphalées, troubles de concentration…)" },
    { id:"neuro_cephalee_effort", l:"Céphalée inhabituelle à l'effort" },
    { id:"neuro_deficit", l:"Déficit neurologique (actuel ou séquellaire)" },
    { id:"neuro_avc", l:"AVC / AIT" },
    { id:"neuro_malformation", l:"Malformation vasculaire cérébrale connue" },
    { id:"neuro_equilibre", l:"Trouble de l'équilibre" },
    { id:"neuro_neuropathie", l:"Neuropathie périphérique" },
    { id:"neuro_pc_inexpliquee", l:"Perte de connaissance inexpliquée" }
  ]},
  { id:"orl", titre:"ORL et vestibulaire", icone:"👂", items:[
    { id:"orl_otite", l:"Otites répétées ou chroniques" },
    { id:"orl_perforation", l:"Perforation tympanique" },
    { id:"orl_chirurgie", l:"Chirurgie otologique" },
    { id:"orl_equilibration", l:"Difficulté d'équilibration des oreilles (Valsalva difficile)" },
    { id:"orl_barotraumatisme", l:"Antécédent de barotraumatisme" },
    { id:"orl_sinusite", l:"Sinusite chronique" },
    { id:"orl_obstruction", l:"Obstruction nasale chronique" },
    { id:"orl_vertiges", l:"Vertiges" },
    { id:"orl_meniere", l:"Maladie de Ménière" },
    { id:"orl_fistule", l:"Fistule périlymphatique" },
    { id:"orl_hypoacousie", l:"Baisse auditive" },
    { id:"orl_acouphenes", l:"Acouphènes" },
    { id:"orl_dentaire", l:"Problème dentaire exposant à un barotraumatisme (soins non étanches, abcès)" }
  ]},
  { id:"oph", titre:"Ophtalmologie", icone:"👁️", items:[
    { id:"oph_acuite", l:"Baisse d'acuité visuelle (corrigée ou non)" },
    { id:"oph_monoculaire", l:"Vision monoculaire" },
    { id:"oph_diplopie", l:"Diplopie" },
    { id:"oph_champ", l:"Anomalie du champ visuel" },
    { id:"oph_couleurs", l:"Dyschromatopsie (vision des couleurs)" },
    { id:"oph_glaucome", l:"Glaucome" },
    { id:"oph_hto", l:"Hypertension oculaire" },
    { id:"oph_dechirure", l:"Déchirure rétinienne" },
    { id:"oph_decollement", l:"Décollement de rétine" },
    { id:"oph_retinopathie", l:"Rétinopathie" },
    { id:"oph_myopie_forte", l:"Forte myopie (> -6 D)" },
    { id:"oph_chirurgie_recente", l:"Chirurgie oculaire récente (< 6 mois)" },
    { id:"oph_traumatisme", l:"Traumatisme oculaire" },
    { id:"oph_implant", l:"Implant intraoculaire" }
  ]},
  { id:"meta", titre:"Métabolisme et endocrinologie", icone:"🧬", items:[
    { id:"meta_diabete", l:"Diabète" },
    { id:"meta_insuline", l:"Insulinothérapie" },
    { id:"meta_hypoglycemie_severe", l:"Hypoglycémie sévère (aide d'un tiers) dans les 12 derniers mois" },
    { id:"meta_hypo_non_ressenties", l:"Perte de perception des hypoglycémies" },
    { id:"meta_decompensation", l:"Décompensation récente (acidocétose, coma…)" },
    { id:"meta_thyroide", l:"Maladie thyroïdienne non équilibrée" },
    { id:"meta_surrenale", l:"Insuffisance surrénalienne" },
    { id:"meta_hydroelectro", l:"Trouble hydroélectrolytique connu" },
    { id:"meta_obesite", l:"Obésité sévère (IMC ≥ 35)" },
    { id:"meta_bariatrique", l:"Chirurgie bariatrique" },
    { id:"meta_tca", l:"Trouble des conduites alimentaires" }
  ]},
  { id:"hemato", titre:"Hématologie", icone:"🩸", items:[
    { id:"hem_anemie", l:"Anémie" },
    { id:"hem_drepanocytose", l:"Drépanocytose" },
    { id:"hem_trait_drepano", l:"Trait drépanocytaire" },
    { id:"hem_coagulation", l:"Trouble de la coagulation" },
    { id:"hem_hemophilie", l:"Hémophilie" },
    { id:"hem_thrombopenie", l:"Thrombopénie" },
    { id:"hem_thrombophilie", l:"Thrombophilie" },
    { id:"hem_anticoagulant", l:"Traitement anticoagulant" },
    { id:"hem_antiagregant", l:"Traitement antiagrégant" },
    { id:"hem_mtev", l:"Antécédent thromboembolique veineux" },
    { id:"hem_splenomegalie", l:"Splénomégalie" },
    { id:"hem_asplenie", l:"Asplénie (splénectomie)" }
  ]},
  { id:"loco", titre:"Appareil locomoteur", icone:"🦴", items:[
    { id:"loco_douleur", l:"Douleur ostéo-articulaire actuelle" },
    { id:"loco_fracture", l:"Fracture récente (< 6 mois)" },
    { id:"loco_luxation", l:"Luxation" },
    { id:"loco_entorse", l:"Entorse récente" },
    { id:"loco_ligament", l:"Rupture ligamentaire" },
    { id:"loco_muscle", l:"Lésion musculaire récente" },
    { id:"loco_tendon", l:"Lésion tendineuse" },
    { id:"loco_instabilite", l:"Instabilité articulaire" },
    { id:"loco_cervical", l:"Atteinte du rachis cervical" },
    { id:"loco_canal_cervical", l:"Canal cervical étroit connu" },
    { id:"loco_rachis", l:"Pathologie rachidienne (hernie, spondylolisthésis…)" },
    { id:"loco_scoliose", l:"Scoliose" },
    { id:"loco_deficit_moteur", l:"Déficit moteur" },
    { id:"loco_amplitude", l:"Limitation d'amplitude articulaire" },
    { id:"loco_prothese", l:"Prothèse articulaire" },
    { id:"loco_chirurgie", l:"Chirurgie orthopédique récente (< 6 mois)" },
    { id:"loco_fonction", l:"Difficulté à chuter/se relever, nager ou évacuer un véhicule" }
  ]},
  { id:"psy", titre:"Santé mentale et cognition", icone:"🧩", items:[
    { id:"psy_episode_aigu", l:"Épisode psychiatrique aigu actuel" },
    { id:"psy_psychose", l:"Trouble psychotique non stabilisé" },
    { id:"psy_manie", l:"Épisode maniaque actuel" },
    { id:"psy_depression_severe", l:"Épisode dépressif sévère actuel" },
    { id:"psy_suicidaire", l:"Idées suicidaires actuelles" },
    { id:"psy_hetero", l:"Menace hétéro-agressive" },
    { id:"psy_jugement", l:"Trouble majeur du jugement" },
    { id:"psy_impulsivite", l:"Impulsivité sévère" },
    { id:"psy_panique", l:"Attaques de panique" },
    { id:"psy_claustrophobie", l:"Claustrophobie" },
    { id:"psy_cognitif", l:"Trouble cognitif" },
    { id:"psy_addiction", l:"Addiction active" },
    { id:"psy_observance", l:"Difficulté d'observance thérapeutique" },
    { id:"psy_sedatif", l:"Traitement sédatif" }
  ], note:"Une maladie psychiatrique n'est JAMAIS une contre-indication automatique. Évaluer : stabilité, discernement, contrôle comportemental, risque de perte de contrôle, risque suicidaire, risque pour autrui, capacité à respecter les règles de sécurité." },
  { id:"autres", titre:"Autres situations", icone:"📌", items:[
    { id:"aut_fievre", l:"Fièvre actuelle" },
    { id:"aut_infection", l:"Infection aiguë en cours" },
    { id:"aut_maladie_recente", l:"Maladie récente (< 1 mois)" },
    { id:"aut_covid", l:"Infection virale récente avec symptômes cardiorespiratoires (COVID, grippe…)" },
    { id:"aut_chirurgie", l:"Chirurgie récente (< 3 mois)" },
    { id:"aut_hospitalisation", l:"Hospitalisation récente" },
    { id:"aut_grossesse", l:"Grossesse en cours" },
    { id:"aut_postpartum", l:"Post-partum (< 3 mois)" },
    { id:"aut_allergie", l:"Allergie grave connue" },
    { id:"aut_anaphylaxie_effort", l:"Anaphylaxie d'effort" },
    { id:"aut_traitement_chronique", l:"Traitement chronique" },
    { id:"aut_automedication", l:"Automédication régulière" },
    { id:"aut_dopage", l:"Substances à visée de performance" },
    { id:"aut_alcool", l:"Consommation d'alcool à risque" },
    { id:"aut_cannabis", l:"Cannabis" },
    { id:"aut_stupefiants", l:"Autres stupéfiants" },
    { id:"aut_bzd", l:"Benzodiazépines" },
    { id:"aut_hypnotiques", l:"Hypnotiques" },
    { id:"aut_opioides", l:"Opioïdes" },
    { id:"aut_vigilance", l:"Médicament diminuant la vigilance" }
  ]}
];

/* ---------------------------------------------------------------------
   DÉFINITIONS D'ALERTES — moteur transparent et explicable.
   niveau : 1 vigilance · 2 bilan recommandé · 3 différer ·
            4 CI temporaire probable · 5 CI durable possible · U urgence
   quand : "oui" sur la question | fn (contexte) pour conditions composées
   sports : restreint l'alerte à certains modules/flags (sinon générale)
--------------------------------------------------------------------- */
const CS_ALERTES = [
  /* ---- Urgences (indépendantes de la question sportive) ---- */
  { id:"U-douleur-actuelle", q:"exam_douleur_thoracique_actuelle", niveau:"U",
    donnee:"Douleur thoracique actuelle", risque:"Syndrome coronarien aigu ou autre urgence cardiovasculaire",
    conduite:"Interrompre la consultation sportive ; évaluation urgente (ECG immédiat, orientation adaptée, 15/112 si signes de gravité)." },
  { id:"U-deficit-aigu", q:"exam_deficit_neuro_aigu", niveau:"U",
    donnee:"Déficit neurologique aigu", risque:"AVC / processus neurologique aigu",
    conduite:"Filière neurovasculaire urgente. Certificat interrompu." },
  { id:"U-dyspnee-aigue", q:"exam_dyspnee_aigue", niveau:"U",
    donnee:"Dyspnée aiguë", risque:"Détresse respiratoire, embolie pulmonaire, OAP",
    conduite:"Évaluation urgente. Certificat interrompu." },
  { id:"U-suicide", q:"psy_suicidaire", niveau:"U",
    donnee:"Idées suicidaires actuelles", risque:"Crise suicidaire ; risque majeur si discipline avec arme, véhicule ou milieu aquatique",
    conduite:"Évaluation psychiatrique de la crise suicidaire prioritaire (3114). La question sportive est suspendue.",
    limites:"L'outil ne gradue pas le risque suicidaire : évaluation clinique indispensable." },
  { id:"U-spo2", fn:(c)=> c.examen.spo2!=="" && Number(c.examen.spo2) < 90, niveau:"U",
    donnee:"SpO₂ < 90 %", risque:"Hypoxémie sévère",
    conduite:"Prise en charge immédiate de l'hypoxémie. Certificat interrompu." },
  { id:"U-hta-maligne", fn:(c)=> Number(c.examen.pas)>=180 && (c.examen.signes_hta==="oui"), niveau:"U",
    donnee:"PA ≥ 180 mmHg avec signes d'atteinte aiguë", risque:"Urgence hypertensive",
    conduite:"Prise en charge urgente de l'HTA. Certificat interrompu." },

  /* ---- Cardiovasculaire ---- */
  { id:"A-douleur-effort", q:"cv_douleur_effort", niveau:3,
    donnee:"Douleur thoracique à l'effort", risque:"Coronaropathie ; risque d'événement cardiovasculaire à l'effort",
    conduite:"Différer le certificat. ECG de repos et évaluation cardiologique orientée (± épreuve d'effort).",
    source:"CS-ECG-RECO" },
  { id:"A-syncope", q:"cv_syncope", niveau:3,
    donnee:"Syncope (a fortiori à l'effort ou inexpliquée)", risque:"Trouble du rythme, cardiopathie structurelle, incapacité brutale",
    conduite:"Différer si non explorée : ECG, avis cardiologique ; caractériser le contexte (effort, prodromes).",
    source:"CS-ECG-RECO" },
  { id:"A-palpitations-effort", q:"cv_palpitations_effort", niveau:2,
    donnee:"Palpitations à l'effort", risque:"Trouble du rythme d'effort",
    conduite:"ECG de repos ± Holter / épreuve d'effort selon clinique." },
  { id:"A-dyspnee-anormale", q:"cv_dyspnee_anormale", niveau:2,
    donnee:"Dyspnée disproportionnée à l'effort", risque:"Cardiopathie ou pneumopathie sous-jacente",
    conduite:"Bilan orienté cardio-respiratoire avant conclusion." },
  { id:"A-cardiomyopathie", q:"cv_cardiomyopathie", niveau:3,
    donnee:"Cardiomyopathie connue", risque:"Mort subite à l'effort selon type et sévérité",
    conduite:"Ne pas conclure sans évaluation cardiologique spécialisée récente adaptée au sport et à l'intensité." },
  { id:"A-myocardite", q:"cv_myocardite", niveau:4,
    donnee:"Myocardite (y compris récente)", risque:"Trouble du rythme ventriculaire à l'effort pendant la phase de convalescence",
    conduite:"Si récente (< 3–6 mois) : contre-indication temporaire habituelle à l'effort intense ; réévaluation cardiologique avant reprise (recommandation, non règle légale)." },
  { id:"A-canalopathie", q:"cv_canalopathie", niveau:3,
    donnee:"Canalopathie (QT long, Brugada…)", risque:"Trouble du rythme grave, majoré par l'effort ou la natation (QT long type 1)",
    conduite:"Avis rythmologique indispensable ; décision selon type, traitement et sport." },
  { id:"A-fam-mort-subite", q:"fam_mort_subite", niveau:2,
    donnee:"Mort subite < 50 ans chez un apparenté", risque:"Cardiopathie génétique familiale",
    conduite:"ECG de repos recommandé ; avis cardiologique selon contexte (échocardiographie, dépistage familial).",
    source:"CS-ECG-RECO" },
  { id:"A-fam-noyade", q:"fam_noyade", niveau:2,
    donnee:"Noyade ou accident inexpliqué familial", risque:"Canalopathie familiale (QT long) possible",
    conduite:"ECG et avis cardiologique, surtout pour la natation et la plongée." },
  { id:"A-hta", q:"cv_hta", niveau:1,
    donnee:"Hypertension artérielle", risque:"Poussées tensionnelles à l'effort (surtout statique)",
    conduite:"Vérifier le contrôle tensionnel ; adapter si sport à forte composante statique." },
  { id:"A-hta-severe", fn:(c)=> Number(c.examen.pas)>=180 || Number(c.examen.pad)>=110, niveau:3,
    donnee:"PA mesurée ≥ 180/110 mmHg", risque:"HTA sévère non contrôlée",
    conduite:"Différer le certificat ; confirmer (MAPA/automesure), traiter, réévaluer." },
  { id:"A-dai", q:"cv_dai", niveau:2,
    donnee:"Défibrillateur implantable", risque:"Chocs à l'effort ; traumatisme du boîtier (sports de contact)",
    conduite:"Avis rythmologique ; décision selon cardiopathie sous-jacente et sport." },

  /* ---- Respiratoire ---- */
  { id:"A-asthme", q:"resp_asthme", niveau:1,
    donnee:"Asthme", risque:"Bronchospasme d'effort",
    conduite:"Vérifier le contrôle (symptômes, traitement de fond, exacerbations) ; l'asthme contrôlé n'est pas une contre-indication au sport en général." },
  { id:"A-asthme-plongee", fn:(c)=> c.module==="plongee" && (c.rep("resp_asthme")==="oui"||c.rep("resp_asthme_froid")==="oui"), niveau:2, sports:["plongee"],
    donnee:"Asthme chez un candidat à la plongée", risque:"Bronchospasme et piégeage gazeux en immersion : risque de surpression pulmonaire",
    conduite:"Évaluation du contrôle, EFR ; avis pneumologique ou de médecine hyperbare selon sévérité et déclencheurs (froid, effort). Pas de conclusion automatique." },
  { id:"A-pneumothorax", q:"resp_pneumothorax", niveau:2,
    donnee:"Antécédent de pneumothorax", risque:"Récidive à l'effort ou en environnement à pression variable",
    conduite:"Préciser date, récidive, traitement (pleurodèse/chirurgie), imagerie." },
  { id:"A-pneumothorax-plongee", fn:(c)=> c.module==="plongee" && (c.rep("resp_pneumothorax")==="oui"||c.rep("resp_bulles")==="oui"), niveau:3, sports:["plongee"],
    donnee:"Pneumothorax spontané ou bulles pulmonaires chez un candidat à la plongée en scaphandre",
    risque:"Pneumothorax sous pression / surpression pulmonaire à la remontée : risque vital",
    conduite:"Aucune conclusion automatique : rechercher traitement définitif (pleurodèse, chirurgie), risque de récidive, TDM thoracique ; avis spécialisé de médecine hyperbare ou pneumologique indispensable. Les référentiels fédéraux (FFESSM) classent classiquement le pneumothorax spontané non traité comme contre-indication : vérifier la liste fédérale en vigueur.",
    limites:"La décision finale dépend du traitement réalisé et de l'avis spécialisé." },
  { id:"A-saos", q:"resp_saos", niveau:1,
    donnee:"Syndrome d'apnées du sommeil", risque:"Somnolence, risque cardiovasculaire",
    conduite:"Vérifier traitement et observance ; évaluer la somnolence (Epworth)." },
  { id:"A-saos-conduite", fn:(c)=> (c.module==="moteur"||c.module==="motonautisme") && (c.rep("resp_saos")==="oui"||c.rep("resp_somnolence")==="oui"), niveau:3, sports:["moteur","motonautisme"],
    donnee:"SAOS ou somnolence chez un pilote", risque:"Endormissement / incapacité au volant : danger vital pour le pilote et autrui",
    conduite:"Différer : évaluation du sommeil (Epworth, polygraphie), traitement efficace documenté avant toute conclusion favorable." },

  /* ---- Neurologie ---- */
  { id:"A-epilepsie", q:"neuro_epilepsie", niveau:2,
    donnee:"Épilepsie", risque:"Crise pendant la pratique ; gravité selon l'environnement (eau, hauteur, arme, véhicule)",
    conduite:"Préciser type, dernière crise, traitement, observance. Décision selon la discipline : risque majeur si eau/altitude/arme/véhicule/souterrain." },
  { id:"A-epilepsie-active-risque", fn:(c)=> c.rep("neuro_derniere_crise")==="oui" && ["plongee","tir","moteur","motonautisme","aero","speleo"].includes(c.module||""), niveau:4, sports:["plongee","tir","moteur","motonautisme","aero","speleo"],
    donnee:"Crise épileptique récente (< 12 mois) et discipline où une crise serait immédiatement dangereuse",
    risque:"Noyade, accident, perte de contrôle d'une arme ou d'un véhicule",
    conduite:"Contre-indication temporaire probable ; avis neurologique, période sans crise documentée et réévaluation. Pas de conclusion favorable immédiate." },
  { id:"A-commotion", q:"neuro_symptomes_post_commotion", niveau:4,
    donnee:"Symptômes post-commotionnels actuels", risque:"Syndrome post-commotionnel ; risque du syndrome du second impact en sport de contact",
    conduite:"Contre-indication temporaire aux sports à risque de contact tant que les symptômes persistent ; protocole de reprise graduée ; avis spécialisé si persistance." },
  { id:"A-commotions-multiples", q:"neuro_commotions_multiples", niveau:2,
    donnee:"Commotions multiples", risque:"Séquelles cumulatives (encéphalopathie traumatique chronique — données évolutives)",
    conduite:"Évaluation neurologique/neuropsychologique avant sports de contact ; information du patient." },
  { id:"A-cephalee-effort", q:"neuro_cephalee_effort", niveau:2,
    donnee:"Céphalée inhabituelle à l'effort", risque:"Cause structurelle (malformation, HSA sentinelle) à éliminer",
    conduite:"Bilan neurologique (imagerie selon clinique) avant conclusion." },
  { id:"A-malformation-combat", fn:(c)=> c.module==="combat" && c.rep("neuro_malformation")==="oui", niveau:5, sports:["combat"],
    donnee:"Malformation vasculaire cérébrale et sport de combat avec KO",
    risque:"Hémorragie intracrânienne sous impact",
    conduite:"Contre-indication durable possible à la boxe/combat avec frappes à la tête ; avis neurochirurgical/neurovasculaire ; vérifier le règlement médical fédéral. Validation manuelle exigée.",
    limites:"Décision spécialisée : l'outil ne peut pas trancher seul." },

  /* ---- ORL ---- */
  { id:"A-perforation-plongee", fn:(c)=> c.module==="plongee" && c.rep("orl_perforation")==="oui", niveau:3, sports:["plongee"],
    donnee:"Perforation tympanique et plongée", risque:"Vertige alterno-barique, otite, surdité",
    conduite:"Otoscopie ; avis ORL ; différer tant que la perforation n'est pas fermée/évaluée." },
  { id:"A-equilibration-plongee", fn:(c)=> c.module==="plongee" && c.rep("orl_equilibration")==="oui", niveau:2, sports:["plongee"],
    donnee:"Difficulté d'équilibration tubaire", risque:"Barotraumatisme de l'oreille moyenne",
    conduite:"Manœuvres d'équilibration au cabinet, avis ORL si dysfonction sévère." },
  { id:"A-meniere", q:"orl_meniere", niveau:2,
    donnee:"Maladie de Ménière / vertiges", risque:"Crise vertigineuse pendant la pratique (grave en milieu aquatique, en hauteur, au volant)",
    conduite:"Avis ORL/vestibulaire ; pondérer selon la discipline." },

  /* ---- Ophtalmologie ---- */
  { id:"A-diplopie", q:"oph_diplopie", niveau:3,
    donnee:"Diplopie", risque:"Erreur d'appréciation des distances ; cause neurologique à éliminer",
    conduite:"Bilan étiologique avant toute conclusion, surtout sports mécaniques, tir, combat." },
  { id:"A-retine-combat", fn:(c)=> c.module==="combat" && (c.rep("oph_decollement")==="oui"||c.rep("oph_dechirure")==="oui"||c.rep("oph_myopie_forte")==="oui"||c.rep("oph_chirurgie_recente")==="oui"), niveau:3, sports:["combat"],
    donnee:"Pathologie rétinienne, forte myopie ou chirurgie oculaire récente et sport de combat",
    risque:"Décollement de rétine sous impact",
    conduite:"Examen ophtalmologique avec fond d'œil avant décision ; vérifier les exigences du règlement médical fédéral (boxe)." },
  { id:"A-monoculaire-combat", fn:(c)=> (c.module==="combat") && c.rep("oph_monoculaire")==="oui", niveau:5, sports:["combat"],
    donnee:"Vision monoculaire et sport de combat avec frappes à la tête",
    risque:"Perte du seul œil fonctionnel",
    conduite:"Contre-indication durable possible selon la discipline et le règlement fédéral ; avis ophtalmologique ; validation manuelle exigée." },

  /* ---- Métabolique ---- */
  { id:"A-diabete", q:"meta_diabete", niveau:1,
    donnee:"Diabète", risque:"Hypoglycémie d'effort",
    conduite:"Vérifier équilibre, ressenti des hypoglycémies, éducation (resucrage, adaptation insuline)." },
  { id:"A-hypo-severe-risque", fn:(c)=> c.rep("meta_hypoglycemie_severe")==="oui" && ["plongee","tir","moteur","motonautisme","aero"].includes(c.module||""), niveau:3, sports:["plongee","tir","moteur","motonautisme","aero"],
    donnee:"Hypoglycémie sévère récente et discipline où une neuroglucopénie serait immédiatement dangereuse",
    risque:"Perte de contrôle (noyade, accident, arme)",
    conduite:"Différer ; réévaluation diabétologique, stabilité documentée, ressenti des hypoglycémies restauré." },

  /* ---- Hématologie ---- */
  { id:"A-anticoag-contact", fn:(c)=> (c.rep("hem_anticoagulant")==="oui") && (c.module==="combat"||c.module==="collision"||c.sportFlags.collision), niveau:3, sports:["combat","collision"],
    donnee:"Anticoagulation et sport de contact/collision", risque:"Hémorragie grave (intracrânienne, viscérale) après impact",
    conduite:"Réévaluer l'indication du sport de contact sous anticoagulant ; avis spécialisé ; envisager disciplines sans contact." },
  { id:"A-drepanocytose", q:"hem_drepanocytose", niveau:2,
    donnee:"Drépanocytose", risque:"Crise vaso-occlusive à l'effort intense, en altitude, en cas de déshydratation",
    conduite:"Avis spécialisé ; prudence altitude/chaleur/effort maximal ; hydratation." },
  { id:"A-splenomegalie-contact", fn:(c)=> c.rep("hem_splenomegalie")==="oui" && (c.module==="combat"||c.sportFlags.collision), niveau:3, sports:["combat","collision"],
    donnee:"Splénomégalie et sport de collision", risque:"Rupture splénique",
    conduite:"Différer les sports de contact jusqu'à évaluation (cause, taille) ; typiquement CI temporaire (ex. MNI récente)." },

  /* ---- Locomoteur ---- */
  { id:"A-fracture", q:"loco_fracture", niveau:4,
    donnee:"Fracture récente non consolidée", risque:"Déplacement, pseudarthrose, nouvelle fracture",
    conduite:"Contre-indication temporaire pour les activités sollicitant le segment ; réévaluation après consolidation." },
  { id:"A-canal-cervical", fn:(c)=> c.rep("loco_canal_cervical")==="oui" && (c.module==="combat"||c.module==="collision"||c.sportFlags.collision), niveau:3, sports:["combat","collision"],
    donnee:"Canal cervical étroit et sport de collision", risque:"Myélopathie / tétraplégie post-traumatique",
    conduite:"Avis spécialisé (IRM, neurochirurgie) avant toute pratique de collision. Pas de conclusion automatique." },

  /* ---- Psychiatrie (jamais automatique) ---- */
  { id:"A-psychose-arme", fn:(c)=> (c.module==="tir") && (c.rep("psy_psychose")==="oui"||c.rep("psy_manie")==="oui"||c.rep("psy_hetero")==="oui"), niveau:3, sports:["tir"],
    donnee:"Trouble psychotique/maniaque non stabilisé ou menace hétéro-agressive, discipline avec arme",
    risque:"Perte de contrôle avec arme : risque pour le patient et autrui",
    conduite:"Différer ; évaluation psychiatrique de la stabilité, du discernement et du contrôle comportemental. Un antécédent psychiatrique STABILISÉ n'est pas une contre-indication automatique.",
    limites:"Évaluation clinique du discernement indispensable ; l'outil ne stigmatise aucun diagnostic." },
  { id:"A-claustro-plongee", fn:(c)=> (c.module==="plongee"||c.module==="speleo") && (c.rep("psy_claustrophobie")==="oui"||c.rep("psy_panique")==="oui"), niveau:2, sports:["plongee","speleo"],
    donnee:"Claustrophobie ou attaques de panique en milieu confiné/immersion", risque:"Panique en immersion : remontée incontrôlée, noyade",
    conduite:"Évaluer sévérité et contrôle ; progressivité ; avis spécialisé si doute." },

  /* ---- Situations générales ---- */
  { id:"A-fievre", fn:(c)=> c.rep("aut_fievre")==="oui" || c.rep("aut_infection")==="oui" || (c.examen.temp!=="" && Number(c.examen.temp)>=38), niveau:4,
    donnee:"Fièvre ou infection aiguë en cours", risque:"Myocardite, coup de chaleur, décompensation à l'effort",
    conduite:"Contre-indication temporaire à l'effort intense ; certificat différé ; réévaluation après guérison." },
  { id:"A-covid-cardio", q:"aut_covid", niveau:2,
    donnee:"Infection virale récente avec symptômes cardiorespiratoires", risque:"Myocardite post-virale",
    conduite:"Reprise graduée ; ECG ± bilan selon symptômes ; différer l'effort intense si symptômes persistants." },
  { id:"A-grossesse-plongee", fn:(c)=> c.module==="plongee" && c.rep("aut_grossesse")==="oui", niveau:4, sports:["plongee"],
    donnee:"Grossesse et plongée en scaphandre", risque:"Risque fœtal (bulles, hyperoxie) — données limitées, principe de précaution",
    conduite:"Contre-indication temporaire consensuelle à la plongée en scaphandre pendant la grossesse (référentiels fédéraux et hyperbares) ; réévaluation en post-partum." },
  { id:"A-anaphylaxie-effort", q:"aut_anaphylaxie_effort", niveau:2,
    donnee:"Anaphylaxie d'effort", risque:"Récidive anaphylactique à l'effort",
    conduite:"Avis allergologique ; plan d'urgence (adrénaline auto-injectable) ; cofacteurs (aliments, AINS)." },
  { id:"A-vigilance-risque", fn:(c)=> (c.rep("aut_vigilance")==="oui"||c.rep("psy_sedatif")==="oui"||c.rep("aut_bzd")==="oui"||c.rep("aut_opioides")==="oui") && ["tir","moteur","motonautisme","plongee","aero"].includes(c.module||""), niveau:3, sports:["tir","moteur","motonautisme","plongee","aero"],
    donnee:"Traitement ou substance altérant la vigilance, discipline exigeant une vigilance parfaite",
    risque:"Erreur, perte de contrôle, accident",
    conduite:"Réévaluer le traitement (indication, horaire, alternative) avant toute conclusion favorable." }
];

/* ---------------------------------------------------------------------
   MODULES SPÉCIFIQUES PAR SPORT
--------------------------------------------------------------------- */
const CS_MODULES = {
  plongee: {
    titre:"Module plongée subaquatique", icone:"🤿",
    questions:[
      { id:"pl_type", l:"Type de pratique", type:"select", opts:["Scaphandre","Apnée","Scaphandre + apnée"] },
      { id:"pl_milieu", l:"Milieu", type:"select", opts:["Piscine","Fosse","Mer","Lac","Souterrain"] },
      { id:"pl_profondeur", l:"Profondeur maximale prévue (m)", type:"number" },
      { id:"pl_niveau", l:"Niveau technique (N1–N4, encadrant…)", type:"text" },
      { id:"pl_experience", l:"Plongeur débutant ?", type:"ouinon" },
      { id:"pl_frequence", l:"Fréquence de pratique", type:"text" },
      { id:"pl_pro", l:"Pratique professionnelle ?", type:"ouinon" },
      { id:"pl_melanges", l:"Mélanges (nitrox, trimix) ?", type:"ouinon" },
      { id:"pl_deco", l:"Plongées avec paliers de décompression ?", type:"ouinon" },
      { id:"pl_add", l:"Antécédent d'accident de décompression ?", type:"ouinon" },
      { id:"pl_barotrauma", l:"Antécédent de barotraumatisme ?", type:"ouinon" },
      { id:"pl_valsalva", l:"Équilibration oreilles/sinus possible (Valsalva) ?", type:"ouinon" },
      { id:"pl_dentaire", l:"Statut dentaire compatible (pas de soin non étanche) ?", type:"ouinon" },
      { id:"pl_grossesse", l:"Grossesse en cours ?", type:"ouinon" }
    ],
    vigilance:["Pneumothorax spontané / bulles pulmonaires","Obstruction bronchique avec piégeage gazeux","Asthme non contrôlé ou déclenché par le froid","Insuffisance respiratoire","Cardiopathie à risque d'incapacité brutale","Shunt droite-gauche (FOP) selon contexte","Épilepsie active","Syncopes","Maladie vestibulaire, perforation tympanique, dysfonction tubaire sévère","Infection ORL aiguë","Trouble psychiatrique non stabilisé, panique incontrôlée","Diabète avec hypoglycémies sévères","Traitement sédatif","Grossesse"],
    examens:["Otoscopie bilatérale","Manœuvre d'équilibration prudente","Audition (voix chuchotée / audiométrie si doute)","Examen vestibulaire si indiqué","Examen dentaire orienté","Examen respiratoire complet","Spirométrie si indiquée","ECG / avis cardiologique selon contexte","Avis de médecine hyperbare si nécessaire"],
    note:"Ne jamais conclure sur la seule présence d'un diagnostic : pondérer contrôle de la maladie, traitement, profondeur, niveau, type de plongée, règlement fédéral (FFESSM), avis spécialisé."
  },
  combat: {
    titre:"Module sports de combat (mise hors combat possible)", icone:"🥊",
    questions:[
      { id:"cb_discipline", l:"Discipline exacte", type:"text" },
      { id:"cb_competition", l:"Compétition (vs entraînement seul) ?", type:"ouinon" },
      { id:"cb_frappes_tete", l:"Frappes à la tête autorisées ?", type:"ouinon" },
      { id:"cb_ko_autorise", l:"KO autorisé par le règlement ?", type:"ouinon" },
      { id:"cb_categorie", l:"Catégorie de poids", type:"text" },
      { id:"cb_perte_poids", l:"Perte de poids rapide avant pesée ?", type:"ouinon" },
      { id:"cb_nb_combats", l:"Nombre de combats", type:"number" },
      { id:"cb_nb_ko", l:"Nombre de KO subis", type:"number" },
      { id:"cb_nb_commotions", l:"Nombre de commotions", type:"number" },
      { id:"cb_dernier_combat", l:"Date du dernier combat", type:"date" },
      { id:"cb_dernier_tc", l:"Date du dernier traumatisme crânien", type:"date" },
      { id:"cb_symptomes", l:"Symptômes neurologiques actuels ?", type:"ouinon" },
      { id:"cb_anticoag", l:"Anticoagulant ou antiagrégant ?", type:"ouinon" }
    ],
    vigilance:["Commotion récente ou non résolue","Symptômes post-commotionnels","Lésion cérébrale, malformation vasculaire","Épilepsie non contrôlée","Affection cervicale instable","Décollement/déchirure rétinienne, rétinopathie, glaucome non contrôlé, chirurgie oculaire récente","Vision monoculaire (selon discipline)","Anticoagulation, trouble sévère de coagulation","Splénomégalie","Fracture faciale non consolidée","Infection cutanée contagieuse","Cardiopathie à risque","Perte pondérale dangereuse"],
    examens:["Examen neurologique complet","Évaluation de santé mentale (règlement boxe)","Acuité visuelle, champ visuel","Tonus oculaire et fond d'œil selon la discipline et le règlement","Examens d'imagerie / spécialisés exigés par le règlement fédéral","Calendrier de surveillance selon âge et statut amateur/professionnel"],
    note:"Vérifier la version ACTUELLE du règlement médical fédéral (FF Boxe, FMMAF…) avant d'affirmer qu'un examen est obligatoire."
  },
  "combat-souple": {
    titre:"Module sports de combat sans KO (préhension)", icone:"🥋",
    questions:[
      { id:"cs_discipline", l:"Discipline exacte", type:"text" },
      { id:"cs_competition", l:"Compétition ?", type:"ouinon" },
      { id:"cs_strangulation", l:"Strangulations autorisées ?", type:"ouinon" },
      { id:"cs_chutes", l:"Projections/chutes répétées ?", type:"ouinon" }
    ],
    vigilance:["Rachis cervical (projections)","Instabilité C1-C2 (trisomie 21)","Antécédents de syncope (strangulations)","Affections cutanées contagieuses"],
    examens:["Examen du rachis cervical","Examen cutané","Examen neurologique de base"],
    note:"Hors D.231-1-5 en l'absence de mise hors combat : régime fédéral de droit commun."
  },
  tir: {
    titre:"Module tir et armes", icone:"🎯",
    questions:[
      { id:"tr_arme", l:"Type d'arme (feu / air comprimé)", type:"text" },
      { id:"tr_position", l:"Position (debout, couché, autre)", type:"text" },
      { id:"tr_competition", l:"Compétition ?", type:"ouinon" },
      { id:"tr_biathlon", l:"Biathlon ?", type:"ouinon" },
      { id:"tr_stockage", l:"Stockage et manipulation sécurisés ?", type:"ouinon" },
      { id:"tr_audition", l:"Trouble auditif ?", type:"ouinon" },
      { id:"tr_vision", l:"Trouble visuel ?", type:"ouinon" },
      { id:"tr_dominant", l:"Membre supérieur dominant fonctionnel ?", type:"ouinon" },
      { id:"tr_sedatifs", l:"Médicaments sédatifs ?", type:"ouinon" },
      { id:"tr_substances", l:"Consommation de substances psychoactives ?", type:"ouinon" }
    ],
    vigilance:["Crise épileptique non contrôlée","Syncopes / pertes de connaissance","Trouble moteur ou tremblement empêchant la maîtrise de l'arme","Déficit cognitif","Psychose active, manie non contrôlée","Idéation suicidaire actuelle","Menace hétéro-agressive","Impulsivité majeure","Intoxication, traitement altérant la vigilance","Incapacité à comprendre les règles de sécurité"],
    examens:["Examen neurologique et moteur du membre dominant","Vision (acuité)","Audition","Rachis chez le MINEUR pratiquant le tir debout (arrêté du 24/07/2017 — version à vérifier)","Biathlon : évaluation cardiovasculaire d'effort selon indication, audition, aptitude à associer effort intense et manipulation sécurisée de l'arme"],
    note:"Ne JAMAIS déduire une inaptitude de la seule existence d'un antécédent psychiatrique : évaluer stabilité, discernement, comportement, sécurité."
  },
  moteur: {
    titre:"Module compétition automobile / motocycliste", icone:"🏎️",
    questions:[
      { id:"mt_discipline", l:"Discipline et type de véhicule", type:"text" },
      { id:"mt_vitesse", l:"Vitesses atteintes (ordre de grandeur)", type:"text" },
      { id:"mt_duree", l:"Durée des épreuves", type:"text" },
      { id:"mt_chaleur", l:"Contraintes thermiques (habitacle, combinaison) ?", type:"ouinon" },
      { id:"mt_vibrations", l:"Exposition importante aux vibrations ?", type:"ouinon" },
      { id:"mt_evacuation", l:"Capacité d'évacuation rapide du véhicule ?", type:"ouinon" },
      { id:"mt_traitement", l:"Traitement médicamenteux en cours ?", type:"ouinon" },
      { id:"mt_sommeil", l:"Sommeil de mauvaise qualité / somnolence ?", type:"ouinon" },
      { id:"mt_saos", l:"Apnées du sommeil connues ?", type:"ouinon" },
      { id:"mt_diabete", l:"Diabète ?", type:"ouinon" },
      { id:"mt_hypoglycemies", l:"Hypoglycémies ?", type:"ouinon" },
      { id:"mt_syncope", l:"Antécédent de syncope ?", type:"ouinon" },
      { id:"mt_vertiges", l:"Vertiges ?", type:"ouinon" }
    ],
    vigilance:["Épilepsie non contrôlée","Syncope","Trouble du rythme avec risque d'incapacité","Hypoglycémies sévères","Somnolence résiduelle, narcolepsie, SAOS non contrôlé","Diplopie, champ visuel insuffisant, acuité insuffisante","Trouble vestibulaire","Déficit moteur, incapacité à utiliser les commandes ou à évacuer","Médicament / substance altérant la vigilance","Trouble psychiatrique non stabilisé"],
    examens:["Acuité visuelle corrigée","Champ visuel","Vision des couleurs (signalisation)","Examen neurologique","Temps de réaction clinique si pertinent","Examen locomoteur (commandes, évacuation)","Évaluation de la somnolence (Epworth)","ECG / bilan cardiologique selon indication"],
    note:"Karting et modélisme radioguidé : exclus de D.231-1-5 (décret 2023-853) mais un règlement propre peut exiger un certificat — vérifier."
  },
  motonautisme: {
    titre:"Module disciplines motonautiques", icone:"🚤",
    questions:[
      { id:"mn_embarcation", l:"Type d'embarcation / VNM", type:"text" },
      { id:"mn_vitesse", l:"Vitesse", type:"text" },
      { id:"mn_seul", l:"Pratique seul ?", type:"ouinon" },
      { id:"mn_competition", l:"Compétition ?", type:"ouinon" },
      { id:"mn_nage", l:"Sait nager et se maintenir à flot ?", type:"ouinon" },
      { id:"mn_flottabilite", l:"Port d'un dispositif de flottabilité ?", type:"ouinon" },
      { id:"mn_froid", l:"Exposition au froid (eau) ?", type:"ouinon" },
      { id:"mn_chute", l:"Risque de chute dans l'eau à vitesse ?", type:"ouinon" },
      { id:"mn_recuperation", l:"Possibilité de récupération rapide après chute ?", type:"ouinon" }
    ],
    vigilance:["Risque de syncope","Épilepsie non contrôlée","Cardiopathie à risque d'incapacité","Hypoglycémie sévère","Trouble vestibulaire","Déficit visuel ou moteur","Incapacité à nager / à se maintenir à flot lorsque requis","Médicament sédatif","Trouble cognitif ou psychiatrique compromettant la sécurité"],
    examens:["Examen cardiovasculaire","Examen neurologique","Vision","Capacités motrices (maintien, remontée à bord)"],
    note:"Discipline à contraintes particulières (D.231-1-5, 5°)."
  },
  collision: {
    titre:"Module rugby et sports de collision", icone:"🏉",
    questions:[
      { id:"cl_commotions", l:"Antécédent de commotion ?", type:"ouinon" },
      { id:"cl_nb_commotions", l:"Nombre de commotions", type:"number" },
      { id:"cl_symptomes", l:"Symptômes persistants ?", type:"ouinon" },
      { id:"cl_cervical", l:"Antécédent cervical (entorse grave, hernie, chirurgie) ?", type:"ouinon" },
      { id:"cl_medullaire", l:"Antécédent médullaire ?", type:"ouinon" },
      { id:"cl_canal", l:"Canal cervical étroit connu ?", type:"ouinon" },
      { id:"cl_instabilite", l:"Instabilité cervicale ?", type:"ouinon" },
      { id:"cl_splenomegalie", l:"Splénomégalie ?", type:"ouinon" },
      { id:"cl_organe_unique", l:"Organe unique (rein, œil, testicule) ?", type:"ouinon" },
      { id:"cl_anticoag", l:"Anticoagulation ?", type:"ouinon" },
      { id:"cl_cardiopathie", l:"Cardiopathie ?", type:"ouinon" },
      { id:"cl_blessure", l:"Blessure non consolidée ?", type:"ouinon" },
      { id:"cl_collisions", l:"Capacité à supporter les collisions (gabarit, poste) ?", type:"ouinon" }
    ],
    vigilance:["Commotions répétées","Rachis cervical (première ligne)","Canal cervical étroit","Splénomégalie","Anticoagulation","Blessures non consolidées"],
    examens:["Examen neurologique","Rachis cervical (mobilité, douleur)","Examen locomoteur"],
    note:"Le rugby n'est PLUS dans la liste D.231-1-5 (décret 2023-853) ; la FFR peut néanmoins imposer des exigences propres (dont examens selon âge/poste) : vérifier le règlement médical FFR en vigueur."
  },
  altitude: {
    titre:"Module altitude et alpinisme", icone:"🏔️",
    questions:[
      { id:"al_altitude", l:"Altitude maximale prévue (m)", type:"number" },
      { id:"al_vitesse", l:"Vitesse d'ascension prévue", type:"text" },
      { id:"al_duree", l:"Durée du séjour en altitude", type:"text" },
      { id:"al_autonomie", l:"Autonomie / isolement ?", type:"ouinon" },
      { id:"al_mam", l:"Antécédent de mal aigu des montagnes ?", type:"ouinon" },
      { id:"al_opha", l:"Antécédent d'œdème pulmonaire de haute altitude ?", type:"ouinon" },
      { id:"al_ocha", l:"Antécédent d'œdème cérébral de haute altitude ?", type:"ouinon" },
      { id:"al_cardiopathie", l:"Cardiopathie ?", type:"ouinon" },
      { id:"al_htap", l:"Hypertension pulmonaire ?", type:"ouinon" },
      { id:"al_respiratoire", l:"Affection respiratoire ?", type:"ouinon" },
      { id:"al_anemie", l:"Anémie ?", type:"ouinon" },
      { id:"al_drepanocytose", l:"Drépanocytose / trait ?", type:"ouinon" },
      { id:"al_epilepsie", l:"Épilepsie ?", type:"ouinon" }
    ],
    vigilance:["OPHA/OCHA antérieurs","HTAP","Cardiopathie hypoxémiante","Drépanocytose","Isolement et évacuation difficile"],
    examens:["Examen cardio-respiratoire","Consultation de médecine de montagne si haute altitude ou antécédent d'OPHA/OCHA"],
    note:"Discipline RETIRÉE de la liste D.231-1-5 : l'évaluation reste médicalement justifiée, sans obligation légale de certificat spécifique à ce titre."
  },
  "altitude-legere": {
    titre:"Module altitude modérée / environnement montagnard", icone:"⛷️",
    questions:[
      { id:"alg_altitude", l:"Altitude maximale habituelle (m)", type:"number" },
      { id:"alg_froid", l:"Exposition au froid prolongée ?", type:"ouinon" },
      { id:"alg_isolement", l:"Passages en zone isolée (hors-piste, trail) ?", type:"ouinon" }
    ],
    vigilance:["Asthme au froid","Cardiopathie et altitude","Isolement"],
    examens:["Examen cardio-respiratoire standard"],
    note:"Environnement montagnard sans haute altitude : évaluation de droit commun."
  },
  speleo: {
    titre:"Module spéléologie", icone:"🕳️",
    questions:[
      { id:"sp_claustro", l:"Claustrophobie ?", type:"ouinon" },
      { id:"sp_panique", l:"Attaques de panique ?", type:"ouinon" },
      { id:"sp_asthme", l:"Asthme ?", type:"ouinon" },
      { id:"sp_endurance", l:"Endurance suffisante pour des sorties longues ?", type:"ouinon" },
      { id:"sp_ramper", l:"Capacité à ramper / franchir des étroitures ?", type:"ouinon" },
      { id:"sp_evacuation", l:"Capacité à être évacué (gabarit, mobilité) ?", type:"ouinon" },
      { id:"sp_epilepsie", l:"Épilepsie ?", type:"ouinon" },
      { id:"sp_syncope", l:"Syncopes ?", type:"ouinon" },
      { id:"sp_froid", l:"Tolérance au froid / risque d'hypothermie ?", type:"ouinon" },
      { id:"sp_locomoteur", l:"Pathologie locomotrice limitante ?", type:"ouinon" }
    ],
    vigilance:["Panique en milieu confiné","Hypothermie","Évacuation très difficile : toute incapacité devient grave","Épilepsie, syncopes"],
    examens:["Examen locomoteur","Examen cardio-respiratoire"],
    note:"Retirée de la liste D.231-1-5 (hors plongée souterraine, qui y demeure)."
  },
  aero: {
    titre:"Module parachutisme, vol libre et aéronautique", icone:"🪂",
    questions:[
      { id:"ae_discipline", l:"Discipline exacte", type:"text" },
      { id:"ae_syncope", l:"Syncopes ?", type:"ouinon" },
      { id:"ae_epilepsie", l:"Épilepsie ?", type:"ouinon" },
      { id:"ae_equilibre", l:"Trouble de l'équilibre ?", type:"ouinon" },
      { id:"ae_audition", l:"Trouble auditif ?", type:"ouinon" },
      { id:"ae_vision", l:"Trouble visuel ?", type:"ouinon" },
      { id:"ae_couleurs", l:"Vision des couleurs normale ?", type:"ouinon" },
      { id:"ae_tubaire", l:"Fonction tubaire normale (équilibration) ?", type:"ouinon" },
      { id:"ae_rachis", l:"Pathologie du rachis ?", type:"ouinon" },
      { id:"ae_epaules", l:"Instabilité d'épaule ?", type:"ouinon" },
      { id:"ae_cognition", l:"Trouble cognitif ?", type:"ouinon" },
      { id:"ae_vigilance", l:"Traitement altérant la vigilance ?", type:"ouinon" }
    ],
    vigilance:["Incapacité brutale en vol","Rachis (ouverture, atterrissage)","Luxations récidivantes d'épaule (commandes)","Barotraumatismes"],
    examens:["Examen neurologique et vestibulaire","Vision et audition","Rachis et épaules"],
    note:"Retirés de la liste D.231-1-5. D'autres réglementations AÉRONAUTIQUES (DGAC, certificats de classe) peuvent s'appliquer indépendamment du Code du sport."
  }
};

/* ---------------------------------------------------------------------
   EXAMEN CLINIQUE — structure de la fiche
--------------------------------------------------------------------- */
const CS_EXAMEN = [
  { id:"constantes", titre:"Constantes", icone:"📊", champs:[
    { id:"fc", l:"Fréquence cardiaque (bpm)", type:"number" },
    { id:"pas", l:"PA systolique (mmHg)", type:"number" },
    { id:"pad", l:"PA diastolique (mmHg)", type:"number" },
    { id:"spo2", l:"SpO₂ (%)", type:"number" },
    { id:"fr", l:"Fréquence respiratoire (/min)", type:"number" },
    { id:"temp", l:"Température (°C) — si nécessaire", type:"number" }
  ]},
  { id:"urg", titre:"Situations urgentes à écarter", icone:"🚨", champs:[
    { id:"exam_douleur_thoracique_actuelle", l:"Douleur thoracique actuelle", type:"ouinon" },
    { id:"exam_deficit_neuro_aigu", l:"Déficit neurologique aigu", type:"ouinon" },
    { id:"exam_dyspnee_aigue", l:"Dyspnée aiguë", type:"ouinon" },
    { id:"signes_hta", l:"Signes d'atteinte aiguë d'organe si PA élevée", type:"ouinon" }
  ]},
  { id:"cardio", titre:"Examen cardiovasculaire", icone:"🫀", champs:[
    { id:"ausc_cardiaque", l:"Auscultation cardiaque", type:"select", opts:["Normale","Souffle","Rythme irrégulier","Autre anomalie","Non faite"] },
    { id:"pouls_periph", l:"Pouls périphériques", type:"select", opts:["Présents symétriques","Anomalie","Non faits"] },
    { id:"signes_ic", l:"Signes d'insuffisance cardiaque", type:"ouinon" },
    { id:"pa_2bras", l:"PA aux deux bras si indiqué (asymétrie ?)", type:"ouinon" },
    { id:"marfan", l:"Morphotype évocateur de Marfan (si contexte)", type:"ouinon" }
  ]},
  { id:"respi", titre:"Examen respiratoire", icone:"🫁", champs:[
    { id:"ausc_pulm", l:"Auscultation pulmonaire", type:"select", opts:["Normale","Sibilants","Crépitants","Diminution du murmure","Non faite"] },
    { id:"dep", l:"Débit expiratoire de pointe (L/min) si indiqué", type:"number" },
    { id:"tolerance_effort", l:"Tolérance à l'effort (test simple au cabinet)", type:"select", opts:["Bonne","Moyenne","Mauvaise","Non testée"] }
  ]},
  { id:"neuro", titre:"Examen neurologique", icone:"🧠", champs:[
    { id:"vigilance", l:"Vigilance normale", type:"ouinon-inverse" },
    { id:"nerfs_craniens", l:"Nerfs crâniens (selon indication)", type:"select", opts:["Normaux","Anomalie","Non faits"] },
    { id:"force", l:"Force segmentaire", type:"select", opts:["Normale","Déficit","Non testée"] },
    { id:"coordination", l:"Coordination", type:"select", opts:["Normale","Anomalie","Non testée"] },
    { id:"equilibre_exam", l:"Équilibre (Romberg, unipodal)", type:"select", opts:["Normal","Anomalie","Non testé"] },
    { id:"rot", l:"Réflexes", type:"select", opts:["Normaux","Anomalie","Non faits"] },
    { id:"marche", l:"Marche", type:"select", opts:["Normale","Anomalie","Non testée"] },
    { id:"post_commotion", l:"Signes post-commotionnels", type:"ouinon" }
  ]},
  { id:"loco", titre:"Examen locomoteur", icone:"🦴", champs:[
    { id:"rachis_cervical", l:"Rachis cervical", type:"select", opts:["Normal","Douleur/limitation","Non fait"] },
    { id:"rachis_global", l:"Rachis dorso-lombaire", type:"select", opts:["Normal","Anomalie","Non fait"] },
    { id:"epaules", l:"Épaules", type:"select", opts:["Normales","Anomalie","Non faites"] },
    { id:"membres_sup", l:"Membres supérieurs", type:"select", opts:["Normaux","Anomalie","Non faits"] },
    { id:"membres_inf", l:"Membres inférieurs", type:"select", opts:["Normaux","Anomalie","Non faits"] },
    { id:"stabilite", l:"Stabilité articulaire (tests adaptés au sport)", type:"select", opts:["Normale","Instabilité","Non testée"] },
    { id:"amplitudes", l:"Amplitudes articulaires", type:"select", opts:["Normales","Limitation","Non testées"] }
  ]},
  { id:"sensoriel", titre:"Examen sensoriel", icone:"👁️", champs:[
    { id:"acuite", l:"Acuité visuelle (corrigée)", type:"text" },
    { id:"champ_visuel", l:"Champ visuel par confrontation (si indiqué)", type:"select", opts:["Normal","Anomalie","Non fait"] },
    { id:"couleurs", l:"Vision des couleurs (si nécessaire)", type:"select", opts:["Normale","Anomalie","Non testée"] },
    { id:"audition_exam", l:"Audition (voix chuchotée)", type:"select", opts:["Normale","Anomalie","Non testée"] },
    { id:"vestibulaire", l:"Équilibre vestibulaire", type:"select", opts:["Normal","Anomalie","Non testé"] },
    { id:"otoscopie", l:"Otoscopie", type:"select", opts:["Normale","Anomalie","Non faite"] }
  ]},
  { id:"cutane", titre:"Examen cutané (sports de contact)", icone:"🖐️", champs:[
    { id:"cutane_infection", l:"Infection bactérienne", type:"ouinon" },
    { id:"cutane_mycose", l:"Mycose", type:"ouinon" },
    { id:"cutane_herpes", l:"Herpès actif", type:"ouinon" },
    { id:"cutane_contagieux", l:"Autre lésion contagieuse", type:"ouinon" },
    { id:"cutane_plaie", l:"Plaie non cicatrisée", type:"ouinon" }
  ]}
];

/* ---------------------------------------------------------------------
   EXAMENS COMPLÉMENTAIRES — catalogue avec statuts d'indication
--------------------------------------------------------------------- */
const CS_EXAMENS_COMP = [
  "ECG de repos","Épreuve d'effort","Échocardiographie","Holter ECG","MAPA",
  "Spirométrie","Test de bronchodilatation","Radiographie","Scanner","IRM",
  "Bilan biologique","Examen ophtalmologique","Fond d'œil","Tonométrie",
  "Audiométrie","Examen vestibulaire","Consultation de médecine hyperbare",
  "Avis neurologique","Avis cardiologique","Avis ORL","Évaluation du sommeil (polygraphie)"
];
const CS_STATUTS_EXAM = ["Obligatoire selon un texte (à sourcer)","Exigé par la fédération (à vérifier)","Recommandé selon le contexte","Optionnel","Non indiqué en dépistage systématique"];

/* ---------------------------------------------------------------------
   CONCLUSIONS POSSIBLES
--------------------------------------------------------------------- */
const CS_CONCLUSIONS = [
  { id:1, l:"Absence de contre-indication à la pratique du sport concerné", favorable:true },
  { id:2, l:"Absence de contre-indication à la pratique en loisir", favorable:true },
  { id:3, l:"Absence de contre-indication à la pratique en compétition", favorable:true },
  { id:4, l:"Absence de contre-indication avec recommandations", favorable:true },
  { id:5, l:"Absence de contre-indication avec restrictions", favorable:true, restrictions:true },
  { id:6, l:"Aptitude limitée à une intensité donnée", favorable:true, restrictions:true },
  { id:7, l:"Aptitude sous réserve d'un équipement ou d'un traitement", favorable:true, restrictions:true },
  { id:8, l:"Décision différée dans l'attente d'examens", favorable:false, reeval:true },
  { id:9, l:"Contre-indication temporaire", favorable:false, reeval:true },
  { id:10, l:"Contre-indication durable", favorable:false, validation_renforcee:true },
  { id:11, l:"Impossibilité de conclure faute d'informations suffisantes", favorable:false }
];

/* ---------------------------------------------------------------------
   NIVEAUX DE CLASSIFICATION
--------------------------------------------------------------------- */
const CS_NIVEAUX = {
  0:{ nom:"Aucun élément défavorable identifié", cl:"vert", desc:"L'absence de contre-indication peut être envisagée sous réserve de la validation du médecin." },
  1:{ nom:"Point de vigilance", cl:"jaune", desc:"Information, surveillance, adaptation, recommandation, éventuellement restriction." },
  2:{ nom:"Bilan complémentaire recommandé avant décision", cl:"orange", desc:"Examens ou avis à envisager avant de conclure." },
  3:{ nom:"Certificat à différer", cl:"rouge", desc:"Situation insuffisamment documentée ou stabilisée pour conclure." },
  4:{ nom:"Contre-indication temporaire probable", cl:"rouge", desc:"Réévaluation nécessaire après résolution ou stabilisation." },
  5:{ nom:"Contre-indication durable ou définitive possible", cl:"rouge-fonce", desc:"Exige validation manuelle explicite, justification clinique, vérification du règlement, éventuellement avis spécialisé." },
  U:{ nom:"URGENCE — évaluation médicale prioritaire", cl:"urgence", desc:CS_AVERTISSEMENTS.urgence }
};

/* ---------------------------------------------------------------------
   MODÈLES DE CERTIFICATS
--------------------------------------------------------------------- */
const CS_MODELES_CERTIFICATS = [
  { id:"standard", nom:"Certificat standard (loisir)" },
  { id:"competition", nom:"Certificat pour compétition" },
  { id:"contraintes", nom:"Certificat — discipline à contraintes particulières" },
  { id:"restriction", nom:"Certificat avec restriction" },
  { id:"ci-temporaire", nom:"Contre-indication temporaire" },
  { id:"eps", nom:"Inaptitude partielle pour l'EPS" },
  { id:"reevaluation", nom:"Attestation de réévaluation" },
  { id:"courrier", nom:"Courrier d'orientation vers un spécialiste" }
];
