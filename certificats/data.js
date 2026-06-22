/* =====================================================================
   CERTIMED — Données médico-légales (certificats médicaux)
   Chargé en <script> (aucun fetch) → fonctionne hors-ligne sur file://.
   Sources : Code de la santé publique (code de déontologie médicale,
   art. R.4127-x), Code pénal, Code civil, Code du sport, CGCT,
   recommandations du Conseil national de l'Ordre des médecins (CNOM).
   ⚠️ Aide à la rédaction — ne se substitue pas au jugement du médecin
   ni à la vérification des textes en vigueur (Légifrance).
   État du droit : à jour des connaissances 2024-2025 (à revérifier).
   ===================================================================== */
'use strict';

/* ---------------------------------------------------------------------
   1) TEXTES DE LOI — bibliothèque de référence
   --------------------------------------------------------------------- */
const TEXTES = [
  { id:'r4127-76', ref:'Art. R.4127-76 CSP (art. 76 du code de déontologie)',
    titre:'Établissement et forme des certificats',
    texte:`L'exercice de la médecine comporte normalement l'établissement par le médecin, conformément aux constatations médicales qu'il est en mesure de faire, des certificats, attestations et documents dont la production est prescrite par les textes législatifs et réglementaires.
Tout certificat, ordonnance, attestation ou document délivré par un médecin doit être rédigé lisiblement en langue française et daté, permettre l'identification du praticien dont il émane et être signé par lui. Le médecin peut en remettre une traduction au patient dans sa langue.`,
    cle:['forme','obligation','français','signature','date'] },

  { id:'r4127-28', ref:'Art. R.4127-28 CSP (art. 28)',
    titre:'Interdiction du certificat de complaisance',
    texte:`La délivrance d'un rapport tendancieux ou d'un certificat de complaisance est interdite.`,
    cle:['complaisance','interdit','faux'] },

  { id:'r4127-29', ref:'Art. R.4127-29 CSP (art. 29)',
    titre:'Avantage injustifié',
    texte:`Tout procédé de nature à procurer à un patient un avantage matériel injustifié ou illicite est interdit.`,
    cle:['avantage','fraude'] },

  { id:'r4127-50', ref:'Art. R.4127-50 CSP (art. 50)',
    titre:'Faciliter les avantages sociaux (sans abus)',
    texte:`Le médecin doit, sans céder à aucune demande abusive, faciliter l'obtention par le patient des avantages sociaux auxquels son état lui donne droit. À cette fin, il est autorisé, sauf opposition du patient, à communiquer au médecin-conseil nommément désigné de l'organisme de sécurité sociale dont il dépend, ou à un autre médecin relevant d'un organisme public décidant de l'attribution d'avantages sociaux, les renseignements médicaux strictement indispensables.`,
    cle:['avantages sociaux','médecin-conseil','abus'] },

  { id:'r4127-51', ref:'Art. R.4127-51 CSP (art. 51)',
    titre:'Ne pas s\'immiscer dans la vie privée',
    texte:`Le médecin ne doit pas s'immiscer sans raison professionnelle dans les affaires de famille ni dans la vie privée de ses patients.`,
    cle:['vie privée','tiers'] },

  { id:'r4127-4', ref:'Art. R.4127-4 CSP (art. 4)',
    titre:'Secret professionnel',
    texte:`Le secret professionnel, institué dans l'intérêt des patients, s'impose à tout médecin dans les conditions établies par la loi. Le secret couvre tout ce qui est venu à la connaissance du médecin dans l'exercice de sa profession, c'est-à-dire non seulement ce qui lui a été confié, mais aussi ce qu'il a vu, entendu ou compris.`,
    cle:['secret','confidentialité'] },

  { id:'l1110-4', ref:'Art. L.1110-4 CSP',
    titre:'Droit au secret des informations de santé',
    texte:`Toute personne prise en charge par un professionnel de santé… a droit au respect de sa vie privée et du secret des informations la concernant. Le secret peut être levé, après le décès, au profit des ayants droit, du concubin ou du partenaire de PACS, dans la mesure nécessaire pour connaître les causes de la mort, défendre la mémoire du défunt ou faire valoir leurs droits, sauf volonté contraire exprimée par la personne avant son décès.`,
    cle:['secret','ayants droit','décès'] },

  { id:'cp226-13', ref:'Art. 226-13 du Code pénal',
    titre:'Violation du secret professionnel',
    texte:`La révélation d'une information à caractère secret par une personne qui en est dépositaire soit par état ou par profession, soit en raison d'une fonction ou d'une mission temporaire, est punie d'un an d'emprisonnement et de 15 000 euros d'amende.`,
    cle:['secret','sanction'] },

  { id:'cp226-14', ref:'Art. 226-14 du Code pénal',
    titre:'Dérogations au secret (signalement)',
    texte:`L'article 226-13 n'est pas applicable dans les cas où la loi impose ou autorise la révélation du secret. Il n'est pas applicable notamment au médecin qui, avec l'accord de la victime, porte à la connaissance du procureur de la République ou de la cellule de recueil des informations préoccupantes les sévices ou privations constatés, sur le plan physique ou psychique, dans l'exercice de sa profession et qui lui permettent de présumer que des violences physiques, sexuelles ou psychiques ont été commises. Lorsque la victime est un mineur ou une personne qui n'est pas en mesure de se protéger en raison de son âge ou de son incapacité physique ou psychique, son accord n'est pas nécessaire. (…) Le signalement aux autorités compétentes effectué dans ces conditions ne peut engager la responsabilité civile, pénale ou disciplinaire de son auteur, sauf s'il est établi qu'il n'a pas agi de bonne foi.`,
    cle:['signalement','maltraitance','mineur','vulnérable','protection'] },

  { id:'cp441-7', ref:'Art. 441-7 du Code pénal',
    titre:'Faux certificat — faits matériellement inexacts',
    texte:`Indépendamment des cas prévus au présent chapitre, est puni d'un an d'emprisonnement et de 15 000 euros d'amende le fait :
1° D'établir une attestation ou un certificat faisant état de faits matériellement inexacts ;
2° De falsifier une attestation ou un certificat originairement sincère ;
3° De faire usage d'une attestation ou d'un certificat inexact ou falsifié.
Les peines sont portées à trois ans d'emprisonnement et à 45 000 euros d'amende lorsque l'infraction est commise en vue de porter préjudice au Trésor public ou au patrimoine d'autrui.`,
    cle:['faux','inexact','sanction'] },

  { id:'cp441-8', ref:'Art. 441-8 du Code pénal',
    titre:'Faux certificat par un professionnel (sollicitation)',
    texte:`Est puni de deux ans d'emprisonnement et de 30 000 euros d'amende le fait, par une personne agissant dans l'exercice de sa profession, de solliciter ou d'agréer, directement ou indirectement, des offres, promesses, dons, présents ou avantages quelconques pour établir une attestation ou un certificat faisant état de faits matériellement inexacts. (…) Les peines sont portées à cinq ans d'emprisonnement et 75 000 euros d'amende lorsque la personne exerce une profession médicale ou de santé et que l'attestation faisant état de faits inexacts dissimule ou certifie faussement l'existence d'une maladie, d'une infirmité ou d'un état de grossesse, ou fournit des indications mensongères sur l'origine d'une maladie ou d'une infirmité ou sur la cause d'un décès.`,
    cle:['faux','corruption','médecin','sanction'] },

  { id:'cp441-1', ref:'Art. 441-1 du Code pénal',
    titre:'Définition du faux',
    texte:`Constitue un faux toute altération frauduleuse de la vérité, de nature à causer un préjudice et accomplie par quelque moyen que ce soit, dans un écrit ou tout autre support d'expression de la pensée qui a pour objet ou qui peut avoir pour effet d'établir la preuve d'un droit ou d'un fait ayant des conséquences juridiques. Le faux et l'usage de faux sont punis de trois ans d'emprisonnement et de 45 000 euros d'amende.`,
    cle:['faux','preuve'] },

  { id:'cp225-4-10', ref:'Art. 225-4-10 du Code pénal',
    titre:'Certificat de virginité — interdit et pénalement réprimé',
    texte:`Le fait, pour une personne, d'établir ou de délivrer un document attestant de la virginité d'une personne est puni d'un an d'emprisonnement et de 15 000 euros d'amende. Lorsque ces faits sont commis sur un mineur, à l'encontre d'une personne dont la particulière vulnérabilité est apparente ou connue de l'auteur, ou en vue de la réalisation d'un mariage forcé, les peines sont aggravées. (Loi n° 2021-1109 du 24 août 2021.)`,
    cle:['virginité','interdit','sanction'] },

  { id:'cp222-11', ref:'Art. 222-11 & 222-13 du Code pénal',
    titre:'Violences et ITT (incapacité totale de travail)',
    texte:`Les violences ayant entraîné une incapacité totale de travail (ITT) pendant plus de huit jours sont punies de trois ans d'emprisonnement et de 45 000 euros d'amende (art. 222-11). Les violences ayant entraîné une ITT inférieure ou égale à huit jours, ou n'ayant entraîné aucune ITT, sont punies dans les conditions et avec les circonstances aggravantes de l'art. 222-13 (peines portées à 3 ans et 45 000 € en présence de circonstances aggravantes, ex. victime vulnérable, conjoint, mineur de quinze ans).`,
    note:`L'ITT pénale mesure l'incapacité à accomplir les gestes de la vie courante. Elle est distincte de l'arrêt de travail et de l'incapacité professionnelle. Elle qualifie la gravité pénale des violences.`,
    cle:['ITT','violences','pénal'] },

  { id:'csport', ref:'Art. L.231-2, L.231-2-1, L.231-2-3 & D.231-1-5 du Code du sport',
    titre:'Certificat médical de non contre-indication au sport',
    texte:`Le certificat médical attestant l'absence de contre-indication à la pratique du sport reste exigé pour l'obtention ou le renouvellement d'une licence dans les disciplines à contraintes particulières (art. D.231-1-5 : disciplines à environnement spécifique ou à risque, ex. alpinisme, plongée subaquatique, spéléologie, sports utilisant des armes à feu, sports mécaniques, sports aériens, sports de combat avec mise hors de combat autorisée, rugby à XV/XIII/VII). Pour les autres disciplines, le certificat a été remplacé pour les mineurs par un questionnaire relatif à l'état de santé (un certificat n'est requis qu'en cas de réponse positive) ; pour les majeurs, le dispositif repose sur le questionnaire de santé (QS-SPORT) avec présentation d'un certificat selon les cas. La compétition peut requérir un certificat selon les fédérations.`,
    note:`Le droit du certificat sportif a beaucoup évolué (lois 2016, 2020, 2022). TOUJOURS vérifier l'exigence en vigueur de la fédération concernée.`,
    cle:['sport','non contre-indication','compétition','licence'] },

  { id:'cc431', ref:'Art. 431 du Code civil',
    titre:'Certificat médical circonstancié — mesure de protection',
    texte:`La demande [d'ouverture d'une mesure de protection juridique] est accompagnée, à peine d'irrecevabilité, d'un certificat circonstancié rédigé par un médecin choisi sur une liste établie par le procureur de la République. Ce médecin peut solliciter l'avis du médecin traitant de la personne qu'il y a lieu de protéger.`,
    note:`Le médecin doit être inscrit sur la liste du procureur. Le certificat décrit l'altération des facultés, son évolution prévisible, et précise les conséquences sur la nécessité d'une assistance/représentation et l'audition de la personne. Honoraires fixés par décret/arrêté.`,
    cle:['tutelle','curatelle','protection','majeur protégé','certificat circonstancié'] },

  { id:'l3212-1', ref:'Art. L.3212-1 du Code de la santé publique',
    titre:'Soins psychiatriques à la demande d\'un tiers (SDT)',
    texte:`Une personne atteinte de troubles mentaux ne peut faire l'objet de soins psychiatriques à la demande d'un tiers que si ses troubles rendent impossible son consentement et si son état impose des soins immédiats assortis d'une surveillance. L'admission est prononcée au vu de deux certificats médicaux circonstanciés datant de moins de quinze jours ; le premier ne peut être établi que par un médecin n'exerçant pas dans l'établissement d'accueil. En cas de péril imminent pour la santé de la personne, le directeur peut prononcer l'admission au vu d'un seul certificat médical émanant, le cas échéant, d'un médecin exerçant dans l'établissement. Les certificats ne peuvent émaner de médecins parents ou alliés, au quatrième degré inclusivement, du tiers demandeur, de la personne malade ou du directeur.`,
    cle:['SDT','psychiatrie','sans consentement','tiers','péril imminent'] },

  { id:'l3213-1', ref:'Art. L.3213-1 du Code de la santé publique',
    titre:'Soins psychiatriques sur décision du représentant de l\'État (SDRE)',
    texte:`Le représentant de l'État dans le département prononce par arrêté, au vu d'un certificat médical circonstancié ne pouvant émaner d'un psychiatre exerçant dans l'établissement d'accueil, l'admission en soins psychiatriques des personnes dont les troubles mentaux nécessitent des soins et compromettent la sûreté des personnes ou portent atteinte, de façon grave, à l'ordre public. Les arrêtés énoncent avec précision les circonstances qui ont rendu l'admission nécessaire.`,
    cle:['SDRE','psychiatrie','ordre public','préfet'] },

  { id:'cgct-deces', ref:'Art. L.2223-42 CGCT & R.1112-75 / arrêté CertDC',
    titre:'Certificat de décès',
    texte:`L'autorisation de fermeture du cercueil ne peut être délivrée qu'au vu d'un certificat, établi par un médecin, attestant le décès. Ce certificat, conforme à un modèle fixé par arrêté, atteste la réalité et la cause de la mort, et mentionne notamment l'existence éventuelle d'un obstacle médico-légal, d'un obstacle au don du corps, d'une nécessité de mise en bière immédiate, ou d'un risque lié à un appareil fonctionnant à pile. Le certificat de décès est composé d'un volet administratif (nominatif) et d'un volet médical (anonyme, confidentiel, destiné à l'INSERM-CépiDc).`,
    note:`En présence d'un obstacle médico-légal, le médecin coche la case correspondante et ne renseigne pas la cause : il n'établit pas de permis d'inhumer ; l'autorité judiciaire est saisie.`,
    cle:['décès','obstacle médico-légal','mort','CertDC'] },

  { id:'l2132-2', ref:'Art. L.2132-2 & R.2132-1 CSP',
    titre:'Examens obligatoires de l\'enfant — certificats de santé',
    texte:`Tous les enfants bénéficient de mesures de prévention sanitaire et sociale qui comportent notamment des examens obligatoires. À l'issue des examens obligatoires du huitième jour, du neuvième mois et du vingt-quatrième mois, un certificat de santé est établi par le médecin. Ces certificats sont adressés au médecin responsable du service départemental de PMI, dans le respect du secret professionnel.`,
    cle:['nourrisson','PMI','certificat de santé','enfant'] },

  { id:'cpp-requisition', ref:'Art. 60, 77-1 & 156 du Code de procédure pénale',
    titre:'Réquisition / expertise — levée du secret dans la limite de la mission',
    texte:`L'officier de police judiciaire ou le procureur peut requérir toute personne qualifiée (réquisition) ; le juge peut ordonner une expertise. Le médecin requis ou commis prête, s'il n'est pas inscrit sur une liste d'experts, le serment d'apporter son concours à la justice en son honneur et sa conscience. Il est alors délié du secret professionnel dans les strictes limites de la mission qui lui est confiée et répond uniquement aux questions posées.`,
    note:`Hors réquisition/expertise, le médecin reste tenu au secret. Vérifier la régularité de la réquisition (écrite, signée, datée, mission précise).`,
    cle:['réquisition','expertise','secret','justice','garde à vue'] },

  { id:'eviction', ref:'Arrêté du 3 mai 1989 (éviction) & avis HCSP',
    titre:'Éviction scolaire / collectivité',
    texte:`Seules certaines maladies transmissibles justifient une éviction de collectivité pour une durée déterminée (ex. : scarlatine et angine à streptocope A — éviction 2 jours après début de l'antibiothérapie ; coqueluche ; rougeole ; oreillons ; gale ; impétigo étendu ; etc.). Pour ces maladies, un certificat médical attestant la non-contagiosité peut être demandé pour le retour. En dehors de ces situations, l'exigence d'un certificat de non-contagion pour réintégrer une collectivité n'est pas justifiée.`,
    cle:['éviction','collectivité','contagion','crèche','école'] },
];

/* ---------------------------------------------------------------------
   2) RÈGLES D'OR — principes de rédaction médico-légale (CNOM)
   --------------------------------------------------------------------- */
const REGLES_OR = [
  { t:'Un certificat n\'est dû que s\'il est prévu par un texte ou réellement utile',
    d:`Le médecin n'est pas tenu de rédiger tout certificat demandé. Il établit ceux dont la production est prescrite par la loi/le règlement (art. R.4127-76) ou réellement utiles au patient. Il peut refuser une demande abusive (art. R.4127-50) — un refus motivé n'est pas une faute.` },
  { t:'N\'attester que ce que l\'on a personnellement constaté',
    d:`Le certificat ne relate que des faits médicaux objectifs constatés par le médecin lui-même, au cours d'un examen. On n'atteste jamais un fait que l'on n'a pas vu (ex. un accident, le comportement d'un tiers).` },
  { t:'Distinguer les faits constatés des dires du patient',
    d:`Les déclarations du patient sont rapportées entre guillemets, au conditionnel ou précédées de « déclare », « selon ses dires », « il/elle rapporte que ». Elles ne doivent jamais être présentées comme des constatations du médecin.` },
  { t:'Ne pas établir de lien de causalité non démontrable',
    d:`Ne jamais imputer une lésion à une cause, un événement ou une personne déterminés. On décrit les lésions ; on ne se prononce pas sur leur origine (sauf mission d'expertise/réquisition).` },
  { t:'Ne jamais nommer ni mettre en cause un tiers',
    d:`Le médecin ne s'immisce pas dans la vie privée ni les conflits familiaux (art. R.4127-51). Pas de nom de tiers, pas d'accusation. Cela protège le médecin d'une plainte du tiers mis en cause.` },
  { t:'Remettre le certificat en main propre au patient',
    d:`Le certificat est remis au patient lui-même (ou à son représentant légal), pour faire valoir ce que de droit. Il n'est jamais remis à un tiers (employeur, conjoint, avocat) sauf exceptions légales (réquisition, certificats destinés à une autorité, ayants droit après décès dans les conditions de l'art. L.1110-4).` },
  { t:'Dater du jour de rédaction — ne jamais antidater ni postdater',
    d:`La date est celle de la rédaction effective. Antidater/postdater constitue un faux (art. 441-7 CP). Un arrêt peut être prescrit pour l'avenir, mais le certificat est daté du jour.` },
  { t:'Respecter la forme : français, lisible, identifiable, signé',
    d:`Identité et qualité du médecin, coordonnées, date, signature manuscrite (art. R.4127-76). Conserver un double dans le dossier du patient.` },
  { t:'Respecter le secret professionnel',
    d:`Ne mentionner que les éléments strictement nécessaires à la finalité du certificat. Le secret s'impose même vis-à-vis de la famille, des assurances, de l'employeur (art. R.4127-4 ; art. 226-13 CP).` },
  { t:'Refuser les certificats de complaisance',
    d:`Tout certificat tendancieux ou de complaisance est interdit (art. R.4127-28) et expose à des sanctions ordinales et pénales (faux : art. 441-7 et 441-8 CP). En cas de doute, mieux vaut un refus motivé.` },
];

/* ---------------------------------------------------------------------
   3) CATÉGORIES
   --------------------------------------------------------------------- */
const CATS = {
  travail:   { t:'Arrêt & aptitude au travail', e:'🧑‍⚕️' },
  violences: { t:'Violences & médico-légal',     e:'⚖️' },
  sport:     { t:'Sport',                        e:'🏃' },
  collectivite:{ t:'Scolarité & collectivité',   e:'🏫' },
  vie:       { t:'Naissance, décès & état civil',e:'📜' },
  protection:{ t:'Protection des personnes',     e:'🛡️' },
  psy:       { t:'Psychiatrie sans consentement',e:'🧩' },
  admin:     { t:'Assurances & administratif',   e:'🗂️' },
  handicap:  { t:'Handicap & ALD',               e:'♿' },
  sensible:  { t:'Interdits & sensibles',        e:'⛔' },
};

/* Statuts (badge) */
const STATUTS = {
  'légal':      { t:'Prévu par la loi',  c:'#16794c', bg:'#e8f9ee' },
  'usuel':      { t:'Usuel / utile',     c:'#0b63b6', bg:'#e7f2fb' },
  'encadré':    { t:'Strictement encadré',c:'#b76b00', bg:'#fff5e6' },
  'déconseillé':{ t:'À manier avec prudence',c:'#b76b00',bg:'#fff5e6' },
  'interdit':   { t:'INTERDIT',          c:'#b42318', bg:'#feecec' },
};

/* ---------------------------------------------------------------------
   4) CERTIFICATS
   Modèles : champs {{...}} remplacés par le générateur.
   Champs disponibles : medecin, qualite, rpps, adresse, ville,
   patient, ddn, patientAdresse, lieu, date, motif, libre
   --------------------------------------------------------------------- */
const CERTIFICATS = [

  /* ====================== TRAVAIL ====================== */
  {
    id:'arret-travail', cat:'travail', statut:'usuel',
    titre:'Arrêt de travail (avis d\'arrêt) — accompagnement',
    resume:`L'avis d'arrêt de travail se fait sur le formulaire Cerfa officiel (téléservice ou papier sécurisé). Ce modèle est un certificat d'accompagnement ; il ne remplace pas le Cerfa.`,
    bases:['r4127-76','r4127-50','cp441-7'],
    regles:[
      'Utiliser le formulaire Cerfa réglementaire (avis d\'arrêt de travail) ; ce certificat ne s\'y substitue pas.',
      'La durée doit être médicalement justifiée par l\'état constaté, sans céder à une demande abusive (art. R.4127-50).',
      'Ne pas mentionner le diagnostic sur le volet remis à l\'employeur (secret professionnel).',
      'Daté du jour ; un arrêt rétroactif n\'est pas justifié hors situation particulière dûment constatée.'
    ],
    pieges:[
      'Antidater un arrêt = faux (art. 441-7 CP) + sanction ordinale.',
      'Prolonger « par téléphone » sans réexamen expose en cas de litige.',
      'Indiquer le diagnostic à l\'employeur = violation du secret.'
    ],
    remise:'Patient (volets selon réglementation : CPAM + employeur sans diagnostic).',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et avoir constaté un état de santé nécessitant un arrêt de travail.

Cet arrêt, dont la durée est précisée sur l'avis d'arrêt de travail réglementaire (Cerfa) remis ce jour, est médicalement justifié par l'état clinique constaté.

Certificat établi à la demande de l'intéressé(e) et remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'reprise-travail', cat:'travail', statut:'usuel',
    titre:'Certificat de reprise / aptitude à la reprise',
    resume:`Atteste que l'état de santé du patient est compatible avec la reprise. L'aptitude au poste relève en propre du médecin du travail.`,
    bases:['r4127-76'],
    regles:[
      'Le médecin traitant peut attester que l\'état de santé n\'est pas un obstacle à la reprise ; l\'aptitude au poste de travail relève du médecin du travail.',
      'Ne pas se prononcer sur des conditions de poste que l\'on ne connaît pas.'
    ],
    pieges:['Statuer sur l\'« aptitude au poste » empiète sur la mission du médecin du travail.'],
    remise:'Patient.',
    modele:`CERTIFICAT MÉDICAL DE REPRISE

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et que son état de santé ne constitue pas, à la date de cet examen, une contre-indication médicale à la reprise de son activité.

L'avis d'aptitude au poste de travail relève du médecin du travail.

Certificat remis en main propre à l'intéressé(e) pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== VIOLENCES ====================== */
  {
    id:'cmi-violences', cat:'violences', statut:'légal',
    titre:'Certificat médical initial (CMI) de coups et blessures — avec ITT',
    resume:`Certificat descriptif des lésions après violences, avec détermination de l'ITT au sens pénal. Pièce déterminante pour la qualification judiciaire.`,
    bases:['r4127-76','cp222-11','r4127-4','cp226-14'],
    regles:[
      'Décrire précisément chaque lésion (siège, type, dimensions, couleur, stade) ; un schéma daté peut être joint.',
      'Rapporter les déclarations entre guillemets / au conditionnel, distinctes des constatations.',
      'Déterminer l\'ITT (gêne à accomplir les gestes de la vie courante) — distincte de l\'arrêt de travail.',
      'Ne jamais nommer l\'agresseur ni affirmer un lien de causalité avec un fait précis.',
      'Mentionner le retentissement psychologique constaté le cas échéant.'
    ],
    pieges:[
      'Confondre ITT pénale et arrêt de travail : erreur classique aux conséquences judiciaires.',
      'Écrire « lésions consécutives à l\'agression par M. X » = affirmer une causalité et nommer un tiers : à proscrire.',
      'Sous-estimer le retentissement psychique.'
    ],
    remise:'Victime (en main propre). Sur réquisition : à l\'autorité requérante.',
    modele:`CERTIFICAT MÉDICAL INITIAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{date}}, à {{ville}}, {{patient}}, né(e) le {{ddn}}.

L'intéressé(e) déclare : « {{declarations}} » (propos rapportés, sous toute réserve).

À l'examen, je constate :
- {{lesions}}

Retentissement psychologique constaté : {{psy}}

Compte tenu des constatations, l'incapacité totale de travail (ITT), au sens pénal (gêne à accomplir les actes de la vie courante), est évaluée à : {{itt}} jours, sous réserve de complications ou d'éléments ultérieurs.

Certificat établi à la demande de l'intéressé(e) et remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'violences-conjugales', cat:'violences', statut:'légal',
    titre:'Certificat de constatation — violences conjugales / intrafamiliales',
    resume:`Variante du CMI adaptée aux violences au sein du couple/famille. Peut s'accompagner d'un signalement (art. 226-14 CP) selon la situation.`,
    bases:['r4127-76','cp222-11','cp226-14','r4127-4'],
    regles:[
      'Mêmes règles que le CMI : description objective, dires rapportés, ITT, pas de mise en cause nominative.',
      'Évaluer le danger ; informer la victime de ses droits et des dispositifs (3919, dépôt de plainte).',
      'Signalement possible au procureur : avec accord de la victime majeure ; sans accord nécessaire si mineur ou personne hors d\'état de se protéger (art. 226-14).'
    ],
    pieges:[
      'Désigner l\'auteur présumé dans le certificat (« violences commises par son conjoint M. X »).',
      'Oublier de tracer dans le dossier le danger évalué et l\'information délivrée.'
    ],
    remise:'Victime. Signalement éventuel : procureur de la République.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}.

L'intéressé(e) déclare : « {{declarations}} » (propos rapportés, sans que je puisse en attester la matérialité).

Constatations cliniques :
- {{lesions}}

Retentissement psychologique : {{psy}}

ITT (au sens pénal) évaluée à {{itt}} jours, sous réserve.

Certificat remis en main propre à l'intéressé(e) pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== SPORT ====================== */
  {
    id:'sport-loisir', cat:'sport', statut:'encadré',
    titre:'Certificat de non contre-indication — sport (hors compétition)',
    resume:`Atteste l'absence de contre-indication apparente après examen. Pour de nombreuses disciplines il a été remplacé par un questionnaire de santé : vérifier l'exigence en vigueur.`,
    bases:['csport','r4127-76'],
    regles:[
      'Réaliser un examen clinique adapté (cardiovasculaire notamment) le jour de la délivrance.',
      'Vérifier si la discipline relève des « contraintes particulières » (D.231-1-5) imposant le certificat.',
      'Préciser la discipline et, le cas échéant, « y compris en compétition » si l\'examen le permet.'
    ],
    pieges:[
      'Signer sans examen (certificat de complaisance) = faute + risque en cas d\'accident.',
      'Antidater pour une date d\'inscription dépassée.'
    ],
    remise:'Patient (ou représentant légal pour un mineur).',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et n'avoir pas constaté, à la date de cet examen, de contre-indication apparente à la pratique du sport suivant : {{discipline}}.

(Le cas échéant : y compris en compétition.)

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'sport-contraintes', cat:'sport', statut:'encadré',
    titre:'Non contre-indication — disciplines à contraintes particulières',
    resume:`Disciplines à environnement spécifique/risque (plongée, alpinisme, sports mécaniques, armes, sports aériens, combat avec KO, rugby…). Certificat exigé (D.231-1-5).`,
    bases:['csport','r4127-76'],
    regles:[
      'Examen renforcé adapté à la discipline (ex. ORL/respiratoire pour la plongée).',
      'Certificat requis y compris quand le questionnaire suffirait pour d\'autres sports.',
      'Mentionner explicitement la discipline à contraintes particulières.'
    ],
    pieges:['Délivrer pour la plongée sans examen ORL/aptitude spécifique.'],
    remise:'Patient (ou représentant légal).',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et n'avoir pas constaté de contre-indication apparente à la pratique, y compris en compétition, de la discipline à contraintes particulières suivante : {{discipline}}.

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== COLLECTIVITÉ ====================== */
  {
    id:'eviction-retour', cat:'collectivite', statut:'encadré',
    titre:'Certificat de non-contagion / réintégration en collectivité',
    resume:`À ne délivrer que pour les maladies à éviction prévues. En dehors, l'exigence d'un tel certificat n'est pas justifiée (et ne doit pas être créée).`,
    bases:['eviction','r4127-76','r4127-28'],
    regles:[
      'Vérifier que la maladie figure dans la liste des évictions et que la durée est respectée.',
      'Ne pas attester une « non-contagiosité » que l\'on ne peut garantir cliniquement.'
    ],
    pieges:[
      'Délivrer un certificat de complaisance réclamé abusivement par une crèche/école.',
      'Garantir une absence de contagiosité absolue.'
    ],
    remise:'Parent / représentant légal.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et que son état clinique, à la date de cet examen, ne constitue pas une contre-indication à sa réintégration en collectivité, la durée d'éviction réglementaire relative à {{motif}} étant respectée.

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'inaptitude-eps', cat:'collectivite', statut:'usuel',
    titre:'Inaptitude (totale/partielle) à l\'éducation physique et sportive',
    resume:`Inaptitude à l'EPS scolaire, totale ou partielle, de durée limitée. Le modèle officiel (Cerfa EPS) précise les types d'effort contre-indiqués.`,
    bases:['r4127-76'],
    regles:[
      'Préciser inaptitude totale ou partielle et la durée.',
      'Pour l\'inaptitude partielle, indiquer en termes fonctionnels les contre-indications (types de mouvements/efforts), sans diagnostic.',
      'Durée proportionnée à l\'état constaté.'
    ],
    pieges:['Inaptitude « toute l\'année » par confort ; mention du diagnostic (secret).'],
    remise:'Élève / représentant légal (pour l\'établissement).',
    modele:`CERTIFICAT MÉDICAL D'INAPTITUDE À L'EPS

Je soussigné(e) {{medecin}}, {{qualite}}, certifie que l'état de santé de {{patient}}, né(e) le {{ddn}}, examiné(e) ce jour, justifie une inaptitude {{totalePartielle}} à la pratique de l'éducation physique et sportive.

Du {{dateDebut}} au {{dateFin}} inclus.
En cas d'inaptitude partielle, contre-indications fonctionnelles : {{libre}}.

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== VIE / ÉTAT CIVIL ====================== */
  {
    id:'deces', cat:'vie', statut:'légal',
    titre:'Certificat de décès',
    resume:`Constatation de la réalité et de la cause de la mort sur le modèle réglementaire (volet administratif + volet médical confidentiel). Dématérialisé (CertDC).`,
    bases:['cgct-deces','r4127-4'],
    regles:[
      'Constater personnellement le décès et les signes de la mort.',
      'Renseigner le volet administratif (identité, obstacle médico-légal, mise en bière, prélèvements, pile…) et le volet médical confidentiel (causes).',
      'En cas d\'obstacle médico-légal (mort suspecte, violente, indéterminée) : cocher l\'obstacle, ne pas renseigner la cause, prévenir l\'autorité ; pas d\'autorisation d\'opérations funéraires avant levée.'
    ],
    pieges:[
      'Méconnaître un obstacle médico-légal (mort violente/suspecte) et signer un certificat « ordinaire ».',
      'Renseigner les causes sur le volet administratif (volet médical = anonyme, confidentiel).'
    ],
    remise:'Établi sur le modèle officiel (CertDC / Cerfa) ; volet médical confidentiel non remis à la famille.',
    modele:`CERTIFICAT DE DÉCÈS — (utiliser le modèle réglementaire / CertDC)

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir personnellement examiné ce jour, à {{lieu}}, le corps de {{patient}}, né(e) le {{ddn}}, et avoir constaté la réalité de la mort.

Date et heure du décès (constaté/estimé) : {{dateHeureDeces}}.
Obstacle médico-légal : {{obstacle}} (oui / non).
Mise en bière immédiate : {{biere}} (oui / non).
Obstacle au don du corps / prélèvements : {{prelevements}}.
Présence d'une prothèse fonctionnant au moyen d'une pile : {{pile}} (oui / non).

Les causes médicales du décès sont consignées sur le volet médical confidentiel (anonyme, destiné à l'INSERM-CépiDc).

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'grossesse', cat:'vie', statut:'usuel',
    titre:'Certificat de grossesse / déclaration',
    resume:`Atteste l'état de grossesse constaté et le terme estimé. La déclaration de grossesse se fait sur le formulaire dédié.`,
    bases:['r4127-76','r4127-4'],
    regles:[
      'Attester la grossesse constatée et le terme estimé ; la déclaration officielle a son formulaire propre.',
      'Ne mentionner que les éléments nécessaires (secret).'
    ],
    pieges:['Certifier une grossesse non constatée médicalement = faux (441-8 CP, peines aggravées pour les professionnels de santé).'],
    remise:'Patiente.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, née le {{ddn}}, et avoir constaté un état de grossesse. Le terme est estimé au {{terme}} (sous réserve de l'évolution).

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'sante-enfant', cat:'vie', statut:'légal',
    titre:'Certificat de santé de l\'enfant (8e jour / 9e mois / 24e mois)',
    resume:`Certificats obligatoires établis après les examens de l'enfant, adressés à la PMI dans le respect du secret.`,
    bases:['l2132-2','r4127-4'],
    regles:[
      'Établir le certificat (modèle Cerfa) après l\'examen obligatoire correspondant.',
      'Transmettre au médecin de PMI ; finalité de santé publique, confidentialité préservée.'
    ],
    pieges:['Renseigner de façon incomplète ; oublier la transmission à la PMI.'],
    remise:'Médecin responsable de la PMI (transmission), copie au carnet de santé.',
    modele:`CERTIFICAT DE SANTÉ DE L'ENFANT — (utiliser le Cerfa correspondant : 8e jour / 9e mois / 24e mois)

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir réalisé ce jour l'examen obligatoire de {{patient}}, né(e) le {{ddn}}, et avoir renseigné le certificat de santé réglementaire correspondant.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== PROTECTION ====================== */
  {
    id:'protection-juridique', cat:'protection', statut:'encadré',
    titre:'Certificat circonstancié — mesure de protection (tutelle/curatelle/sauvegarde)',
    resume:`Pièce obligatoire de la demande, rédigée par un médecin inscrit sur la liste du procureur (art. 431 Code civil). Décrit l'altération des facultés et ses conséquences.`,
    bases:['cc431','r4127-76'],
    regles:[
      'Être inscrit sur la liste établie par le procureur de la République (condition de validité).',
      'Décrire l\'altération des facultés (mentales/corporelles), son évolution prévisible, le besoin d\'assistance ou de représentation.',
      'Se prononcer sur la capacité de la personne à être auditionnée par le juge.',
      'Possibilité de solliciter l\'avis du médecin traitant.'
    ],
    pieges:[
      'Rédiger sans être inscrit sur la liste = irrecevabilité de la demande.',
      'Le médecin traitant de la personne ne peut pas, en principe, rédiger ce certificat circonstancié.'
    ],
    remise:'Demandeur / juge des contentieux de la protection (sous pli, mention de confidentialité).',
    modele:`CERTIFICAT MÉDICAL CIRCONSTANCIÉ
(article 431 du Code civil — médecin inscrit sur la liste du procureur de la République)

Je soussigné(e) {{medecin}}, {{qualite}}, inscrit(e) sur la liste établie par le procureur de la République près le tribunal judiciaire de {{ville}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, demeurant {{patientAdresse}}.

J'ai constaté une altération {{alteration}} de ses facultés.
Évolution prévisible : {{evolution}}.
Conséquences sur la capacité à pourvoir seul(e) à ses intérêts : {{consequences}}.
Nécessité d'une mesure de : {{mesure}} (assistance / représentation).
Aptitude à être auditionné(e) par le juge : {{audition}}.

Certificat établi à l'attention de l'autorité judiciaire, sous pli confidentiel.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== PSY ====================== */
  {
    id:'sdt', cat:'psy', statut:'encadré',
    titre:'Certificat — soins psychiatriques à la demande d\'un tiers (SDT)',
    resume:`1er certificat circonstancié (< 15 jours) par un médecin n'exerçant pas dans l'établissement d'accueil. Troubles rendant le consentement impossible + soins immédiats nécessaires.`,
    bases:['l3212-1','r4127-76','r4127-4'],
    regles:[
      'Décrire les troubles actuels rendant le consentement impossible et imposant des soins immédiats + surveillance.',
      '1er certificat : médecin n\'exerçant PAS dans l\'établissement d\'accueil ; 2e certificat par un autre médecin (peut exercer dans l\'établissement).',
      'Ne pas être parent/allié (≤ 4e degré) du tiers, du patient, ni du directeur.',
      'Certificat circonstancié, descriptif, daté de moins de 15 jours.'
    ],
    pieges:[
      'Lien de parenté/alliance prohibé non vérifié = nullité.',
      'Établir le 1er certificat alors qu\'on exerce dans l\'établissement d\'accueil.',
      'Rédaction trop vague ne caractérisant pas l\'impossibilité de consentir.'
    ],
    remise:'Directeur de l\'établissement d\'accueil.',
    modele:`CERTIFICAT MÉDICAL
Soins psychiatriques à la demande d'un tiers — article L.3212-1 CSP

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, demeurant {{patientAdresse}}.

Je constate les troubles suivants : {{troubles}}.
Ces troubles rendent impossible son consentement aux soins.
Son état impose des soins immédiats assortis d'une surveillance constante (justification : {{justification}}).

Je déclare ne pas exercer dans l'établissement d'accueil et n'être ni parent ni allié, au quatrième degré inclusivement, du tiers demandeur, du patient ou du directeur de l'établissement.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'sdt-peril', cat:'psy', statut:'encadré',
    titre:'Certificat — péril imminent (SPI / SDTU, certificat unique)',
    resume:`Admission au vu d'un seul certificat en cas de péril imminent pour la santé, en l'absence de tiers. Le certificat peut émaner d'un médecin de l'établissement.`,
    bases:['l3212-1','r4127-76'],
    regles:[
      'Caractériser le péril imminent pour la santé de la personne et l\'impossibilité de recueillir une demande de tiers.',
      'Un seul certificat médical circonstancié récent ; peut émaner d\'un médecin de l\'établissement.',
      'Respecter les interdictions de parenté/alliance.'
    ],
    pieges:['Recourir au péril imminent alors qu\'un tiers est disponible.','Péril imminent non caractérisé.'],
    remise:'Directeur de l\'établissement d\'accueil.',
    modele:`CERTIFICAT MÉDICAL
Soins psychiatriques — péril imminent (article L.3212-1 II 2° CSP)

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, demeurant {{patientAdresse}}.

Troubles constatés : {{troubles}}.
Ces troubles rendent impossible son consentement et imposent des soins immédiats.
Il existe un péril imminent pour la santé de la personne, caractérisé par : {{peril}}.
Il n'a pas été possible de recueillir une demande de tiers (motif : {{motifTiers}}).

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'sdre', cat:'psy', statut:'encadré',
    titre:'Certificat — soins sur décision du représentant de l\'État (SDRE)',
    resume:`Certificat circonstancié pour le préfet : troubles nécessitant des soins et compromettant la sûreté des personnes ou portant gravement atteinte à l'ordre public.`,
    bases:['l3213-1','r4127-76'],
    regles:[
      'Décrire les troubles et en quoi ils nécessitent des soins ET compromettent la sûreté des personnes / l\'ordre public.',
      'Le certificat ne peut émaner d\'un psychiatre exerçant dans l\'établissement d\'accueil.',
      'Énoncer avec précision les circonstances.'
    ],
    pieges:['Invoquer l\'ordre public sans caractériser le trouble mental et le besoin de soins.'],
    remise:'Représentant de l\'État (préfet) — via la procédure.',
    modele:`CERTIFICAT MÉDICAL CIRCONSTANCIÉ
Soins psychiatriques sur décision du représentant de l'État — article L.3213-1 CSP

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}.

Troubles mentaux constatés : {{troubles}}.
Ces troubles nécessitent des soins et compromettent la sûreté des personnes / portent atteinte de façon grave à l'ordre public, du fait des circonstances suivantes : {{circonstances}}.

Je déclare ne pas être psychiatre exerçant dans l'établissement d'accueil.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== ADMIN / ASSURANCES ====================== */
  {
    id:'bonne-sante', cat:'admin', statut:'usuel',
    titre:'Certificat de « bonne santé » / d\'absence de contre-indication',
    resume:`À formuler prudemment : on n'atteste pas une « bonne santé » absolue mais l'absence de contre-indication constatée à une activité précise, à la date de l'examen.`,
    bases:['r4127-76','r4127-28'],
    regles:[
      'Préciser l\'activité visée et la date d\'examen ; éviter toute garantie générale et intemporelle.',
      'Formulation par la négative : « n\'ai pas constaté de contre-indication à… ».'
    ],
    pieges:[
      'Attester une « parfaite santé » : impossible à garantir, engage la responsabilité.',
      'Certificat de complaisance pour un usage indéterminé.'
    ],
    remise:'Patient.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et n'avoir pas constaté, à la date de cet examen, de contre-indication médicale apparente à : {{activite}}.

Ce certificat est établi sous réserve de l'évolution de l'état de santé et ne préjuge pas d'affections non décelables par l'examen pratiqué.

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'assurance', cat:'admin', statut:'déconseillé',
    titre:'Certificat destiné à une compagnie d\'assurance',
    resume:`Prudence maximale : le secret médical s'impose. Le patient transmet lui-même les pièces ; le médecin ne dialogue pas directement avec l'assureur sur l'état de santé.`,
    bases:['r4127-4','l1110-4','cp226-13','r4127-28'],
    regles:[
      'Remettre les éléments au patient, qui décide de les transmettre ; ne pas adresser directement à l\'assureur.',
      'Limiter au strict nécessaire ; pas de diagnostic non indispensable.',
      'Pour les causes d\'un décès, le secret persiste après la mort (dérogation encadrée au profit des ayants droit, art. L.1110-4).'
    ],
    pieges:[
      'Révéler à l\'assureur des informations couvertes par le secret = art. 226-13 CP.',
      'Certificat « post-mortem » indiquant que le décès n\'est pas lié à telle pathologie pour faire jouer un contrat : risque de complaisance/faux.'
    ],
    remise:'Patient (jamais directement l\'assureur, sauf cadre légal).',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, atteste avoir examiné/suivi {{patient}}, né(e) le {{ddn}}.

À la demande de l'intéressé(e), et dans la limite des éléments strictement nécessaires à la finalité indiquée ({{finalite}}), je précise : {{libre}}.

Ce certificat est remis en main propre à l'intéressé(e), seul(e) juge de son usage, pour faire valoir ce que de droit. Il ne saurait délier le médecin du secret professionnel au-delà de ce que la loi autorise.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'voyage-avion', cat:'admin', statut:'usuel',
    titre:'Certificat d\'aptitude / non contre-indication au voyage (avion)',
    resume:`Atteste l'absence de contre-indication constatée au transport aérien à la date de l'examen, le cas échéant avec aménagements.`,
    bases:['r4127-76'],
    regles:['Examen adapté ; préciser les éventuelles précautions (oxygène, mobilité).','Date et durée de validité raisonnable.'],
    pieges:['Garantir l\'aptitude pour une période trop longue ; ignorer une pathologie évolutive.'],
    remise:'Patient.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné ce jour {{patient}}, né(e) le {{ddn}}, et n'avoir pas constaté de contre-indication médicale apparente au voyage en avion à la date prévue ({{dateVoyage}}).
Précautions éventuelles : {{libre}}.

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'dispense', cat:'admin', statut:'usuel',
    titre:'Certificat de dispense / contre-indication (port de charge, ceinture, EPI…)',
    resume:`Atteste une contre-indication médicale à une obligation précise, en termes fonctionnels, sans révéler le diagnostic.`,
    bases:['r4127-76','r4127-4'],
    regles:['Formuler en termes fonctionnels (ce qui est contre-indiqué) sans diagnostic.','Durée limitée et réévaluable.'],
    pieges:['Mentionner la pathologie (secret) ; dispense de confort non justifiée.'],
    remise:'Patient.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, certifie que l'état de santé de {{patient}}, né(e) le {{ddn}}, examiné(e) ce jour, justifie, pour raison médicale et pour une durée de {{duree}}, la contre-indication / dispense suivante : {{objet}}.

Certificat remis en main propre pour faire valoir ce que de droit.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== HANDICAP / ALD ====================== */
  {
    id:'mdph', cat:'handicap', statut:'légal',
    titre:'Certificat médical pour la MDPH (Cerfa)',
    resume:`Certificat sur le formulaire Cerfa MDPH, valable 1 an, décrivant les déficiences et le retentissement fonctionnel pour l'ouverture des droits.`,
    bases:['r4127-76','r4127-50'],
    regles:[
      'Utiliser le Cerfa MDPH en vigueur ; décrire déficiences, limitations d\'activité et retentissement.',
      'Être précis et complet : la qualité du certificat conditionne les droits.',
      'Daté de moins de 1 an au dépôt du dossier.'
    ],
    pieges:['Certificat trop succinct retardant ou compromettant l\'ouverture des droits.'],
    remise:'Patient (pour dépôt MDPH).',
    modele:`CERTIFICAT MÉDICAL POUR LA MDPH — (utiliser le Cerfa en vigueur)

Je soussigné(e) {{medecin}}, {{qualite}}, certifie avoir examiné {{patient}}, né(e) le {{ddn}}, et avoir renseigné le certificat médical Cerfa destiné à la MDPH décrivant les déficiences et leur retentissement fonctionnel.

Synthèse : {{libre}}.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  {
    id:'ald', cat:'handicap', statut:'légal',
    titre:'Demande de prise en charge ALD (protocole de soins)',
    resume:`La demande d'ALD se fait via le protocole de soins (téléservice / Cerfa) adressé au médecin-conseil. Ce certificat l'accompagne le cas échéant.`,
    bases:['r4127-50','r4127-76','r4127-4'],
    regles:[
      'Renseigner le protocole de soins (médecin traitant) ; transmission au médecin-conseil (art. R.4127-50).',
      'Le patient est informé des éléments le concernant.'
    ],
    pieges:['Communiquer des données à un tiers autre que le médecin-conseil désigné.'],
    remise:'Médecin-conseil (protocole) ; patient pour son volet.',
    modele:`CERTIFICAT MÉDICAL

Je soussigné(e) {{medecin}}, {{qualite}}, médecin traitant de {{patient}}, né(e) le {{ddn}}, atteste avoir établi le protocole de soins relatif à une affection de longue durée et l'avoir adressé au médecin-conseil de l'organisme d'assurance maladie, conformément à l'article R.4127-50 du code de la santé publique.

Fait à {{ville}}, le {{date}}.
{{medecin}} — {{qualite}}
{{adresse}}{{rppsLine}}
(signature)`
  },

  /* ====================== SENSIBLES / INTERDITS ====================== */
  {
    id:'virginite', cat:'sensible', statut:'interdit',
    titre:'Certificat de virginité — INTERDIT',
    resume:`Établir ou délivrer un document attestant la virginité est un délit (art. 225-4-10 CP). À refuser systématiquement, en informant et orientant la personne.`,
    bases:['cp225-4-10','r4127-28','r4127-51'],
    regles:[
      'Refuser tout examen et tout document de cette nature.',
      'Informer la personne du caractère illégal de la demande et du risque de contrainte/mariage forcé.',
      'Orienter vers un soutien adapté si vulnérabilité (signalement possible si danger : art. 226-14).'
    ],
    pieges:['Céder à une pression familiale : engagement de la responsabilité pénale du médecin.'],
    remise:'— (aucun document à délivrer)',
    modele:`⛔ CERTIFICAT INTERDIT

Le certificat de virginité ne peut être établi ni délivré : il s'agit d'un délit puni par l'article 225-4-10 du Code pénal (un an d'emprisonnement et 15 000 € d'amende, peines aggravées notamment sur mineur ou en vue d'un mariage forcé).

Conduite à tenir : refuser, informer la personne, évaluer une éventuelle situation de contrainte, orienter vers un accompagnement adapté, envisager un signalement si danger (art. 226-14 CP).`
  },

  {
    id:'complaisance', cat:'sensible', statut:'interdit',
    titre:'Certificat de complaisance — INTERDIT',
    resume:`Tout certificat tendancieux ou de complaisance est interdit (art. R.4127-28) et expose à des sanctions ordinales et pénales (faux : 441-7 / 441-8 CP).`,
    bases:['r4127-28','cp441-7','cp441-8'],
    regles:[
      'Ne certifier que des faits réels, personnellement constatés.',
      'Un refus motivé est licite et protecteur ; expliquer au patient.'
    ],
    pieges:['« Petit service » antidaté ou exagéré : qualification de faux possible.'],
    remise:'— (à refuser)',
    modele:`⛔ CERTIFICAT INTERDIT

La délivrance d'un rapport tendancieux ou d'un certificat de complaisance est interdite (art. R.4127-28 CSP). Un certificat faisant état de faits matériellement inexacts constitue un faux (art. 441-7 et 441-8 du Code pénal), avec peines aggravées pour les professionnels de santé.

Conduite à tenir : refuser, expliquer au patient, ne rédiger que ce qui est médicalement constaté.`
  },

  {
    id:'tiers-absent', cat:'sensible', statut:'déconseillé',
    titre:'Certificat concernant un tiers non examiné — à proscrire',
    resume:`On ne certifie pas l'état d'une personne que l'on n'a pas examinée, ni des faits que l'on n'a pas constatés (ex. « certificat contre » un voisin, un ex-conjoint).`,
    bases:['r4127-76','r4127-51','r4127-28','cp441-7'],
    regles:[
      'Ne jamais décrire l\'état de santé d\'une personne non examinée.',
      'Ne pas se prononcer sur les faits/comportements d\'un tiers.'
    ],
    pieges:['Certificat « à charge » utilisé dans un conflit (divorce, garde, voisinage) : plainte du tiers + sanction.'],
    remise:'— (à refuser)',
    modele:`⚠️ À PROSCRIRE

Le médecin ne peut établir un certificat décrivant l'état de santé ou le comportement d'une personne qu'il n'a pas personnellement examinée, ni s'immiscer dans un conflit privé (art. R.4127-51 CSP). Un tel document expose à une plainte du tiers mis en cause et à la qualification de faux (art. 441-7 CP).

Conduite à tenir : refuser ; au besoin, n'attester que ce qui a été personnellement constaté chez son propre patient, sans désigner de tiers.`
  },
];
