/* ÉCHO-VASC DIU — Doppler viscéral : hépatique, portal, splénique */
window.VASC = window.VASC || { chapters: [] };

(function () {

/* ====================================================================== */
/* CHAPITRE 60 — DOPPLER HÉPATIQUE                                          */
/* ====================================================================== */

const SVG_HEP_1 = `<svg viewBox="0 0 460 230" role="img" aria-label="Anatomie vasculaire du foie">
<rect width="460" height="230" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Foie — afférences et efférences</text>
<path d="M60,40 C40,90 40,160 80,200 L300,200 C360,160 360,80 320,45 C260,30 120,30 60,40 Z" fill="#fbe9d2" stroke="#c2935a"/>
<path d="M340,170 C300,150 230,120 180,115" fill="none" stroke="#7c3aed" stroke-width="9"/>
<text x="250" y="150" font-size="10" fill="#5b21b6">Veine porte (hépatopète →)</text>
<path d="M345,185 C300,180 230,175 175,150" fill="none" stroke="#dc2626" stroke-width="6"/>
<text x="240" y="200" font-size="10" fill="#991b1b">Artère hépatique (basse résistance)</text>
<path d="M150,40 L120,90" fill="none" stroke="#0d9488" stroke-width="8"/>
<path d="M205,40 L195,95" fill="none" stroke="#0d9488" stroke-width="8"/>
<path d="M260,42 L260,95" fill="none" stroke="#0d9488" stroke-width="8"/>
<text x="110" y="36" font-size="10" fill="#0f766e">Veines sus-hépatiques → VCI / OD</text>
<rect x="150" y="18" width="120" height="14" fill="#cffafe" stroke="#0d9488"/>
<text x="160" y="29" font-size="9" fill="#0f766e">VCI / oreillette droite</text>
</svg>`;

const SVG_HEP_2 = `<svg viewBox="0 0 460 220" role="img" aria-label="Spectres des veines sus-hepatiques">
<rect width="460" height="220" fill="#fff"/>
<text x="8" y="14" font-size="10" font-weight="bold" fill="#0b2f63">Normal : triphasique (S, D antérogrades ; a rétrograde)</text>
<line x1="20" y1="55" x2="220" y2="55" stroke="#cbd5e1"/>
<path d="M20,55 C30,30 45,30 55,55 C65,78 80,78 92,58 C105,40 118,42 128,55 C140,72 150,72 160,55 C170,30 185,30 195,55 C205,78 215,78 220,60" fill="none" stroke="#0d9488" stroke-width="1.8"/>
<text x="40" y="26" font-size="9" fill="#0f766e">S</text><text x="118" y="36" font-size="9" fill="#0f766e">D</text><text x="84" y="92" font-size="9" fill="#991b1b">a</text>
<text x="250" y="14" font-size="10" font-weight="bold" fill="#0b2f63">Pseudo-portal : aplati / monophasique (cirrhose)</text>
<line x1="250" y1="55" x2="450" y2="55" stroke="#cbd5e1"/>
<path d="M250,52 C290,48 330,50 370,49 C410,51 430,50 450,50" fill="none" stroke="#d97706" stroke-width="1.8"/>
<text x="8" y="135" font-size="10" font-weight="bold" fill="#0b2f63">Congestion / ICD : onde S réduite, reflux systolique</text>
<line x1="20" y1="175" x2="220" y2="175" stroke="#cbd5e1"/>
<path d="M20,175 C30,160 45,200 60,175 C75,150 90,150 105,175 C120,200 135,160 150,175 C165,150 180,150 195,175 C205,190 215,178 220,178" fill="none" stroke="#dc2626" stroke-width="1.8"/>
<text x="250" y="135" font-size="10" font-weight="bold" fill="#0b2f63">Budd-Chiari : flux absent / inversé, veines non vues</text>
<line x1="250" y1="175" x2="450" y2="175" stroke="#cbd5e1"/>
<path d="M250,175 L450,175" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="300" y="168" font-size="9" fill="#64748b">absence de signal</text>
</svg>`;

window.VASC.chapters.push({
  id: 'doppler-hepatique', num: 60, groupe: 'Doppler viscéral', emoji: '🫁',
  titre: 'Doppler hépatique (artère & veines sus-hépatiques)',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈2 h',
  resume: 'Exploration de l\'artère hépatique (lit de basse résistance), des veines sus-hépatiques (flux triphasique reflet de l\'oreillette droite) et leur intégration dans le bilan d\'une hépatopathie ou d\'un greffon. Examen clé de l\'insuffisance cardiaque droite, de la cirrhose et du suivi de transplantation.',
  tags: 'foie artère hépatique veines sus-hépatiques triphasique IR parvus-tardus transplantation Budd-Chiari congestion cirrhose',
  objectifs: [
    'Identifier l\'artère hépatique, la veine porte et les trois veines sus-hépatiques et reconnaître leurs profils respectifs.',
    'Interpréter l\'IR de l\'artère hépatique (normal 0,55–0,70) et reconnaître un IR très bas (post-prandial, aval de sténose, fistule).',
    'Reconnaître le profil triphasique normal des veines sus-hépatiques et ses dégradations (pseudo-portal, reflux systolique).',
    'Diagnostiquer un syndrome de Budd-Chiari et une thrombose / sténose artérielle de greffon hépatique.',
    'Coupler systématiquement le Doppler au B-mode hépatique et rédiger un compte-rendu structuré.',
    'Reconnaître les pièges d\'angle, de filtre et d\'apnée propres à l\'abdomen profond.'
  ],
  anatomie: {
    texte: 'Le foie reçoit un double apport : la veine porte (≈75 % du débit, sang veineux digestif) et l\'artère hépatique (≈25 %, sang artériel). Le drainage se fait par les trois veines sus-hépatiques (droite, médiane, gauche) qui convergent vers la veine cave inférieure juste sous le diaphragme, puis l\'oreillette droite. L\'artère hépatique commune naît du tronc cœliaque, donne l\'artère gastro-duodénale puis devient artère hépatique propre dans le pédicule (triade portale : veine porte en arrière, voie biliaire et artère en avant).',
    svg: SVG_HEP_1,
    caption: 'Schéma : afférences (veine porte hépatopète, artère hépatique de basse résistance) et efférences (veines sus-hépatiques drainant vers la VCI / oreillette droite). Le profil sus-hépatique reflète la dynamique cardiaque droite.',
    vascularisation: 'Artère hépatique → parenchyme et voies biliaires (lit de basse résistance, demande continue). Veines sus-hépatiques → retour vers l\'oreillette droite : leur spectre transmet les variations de pression de l\'OD (d\'où la triphasicité).',
    rapports: ['Pédicule hépatique : veine porte postérieure, artère et cholédoque antérieurs (signe de Mickey)', 'Veines sus-hépatiques abouchées dans la VCI rétro-hépatique sous le diaphragme', 'Tronc cœliaque et artère mésentérique supérieure naissant de l\'aorte juste au-dessus'],
    variantes: ['Artère hépatique droite naissant de l\'AMS (≈15 %)', 'Artère hépatique gauche naissant de la gastrique gauche', 'Trifurcation ou veine sus-hépatique accessoire inférieure droite']
  },
  physiologie: {
    texte: 'L\'artère hépatique alimente un organe à forte demande continue → profil de BASSE RÉSISTANCE : flux antérograde permanent, diastole bien remplie, IR 0,55–0,70.\nLes veines sus-hépatiques transmettent les variations de pression de l\'oreillette droite → profil TRIPHASIQUE (multiphasique) : onde S (systole ventriculaire, antérograde), onde D (remplissage diastolique, antérograde) et onde a (contraction atriale, brève inversion rétrograde).\nLa veine porte (détaillée au chapitre suivant) a un flux antérograde continu, peu pulsatile, hépatopète.',
    profils: [
      { nom: 'Artère hépatique (normale)', desc: 'Basse résistance : montée systolique rapide, diastole soutenue, IR 0,55–0,70. La diastole est bien remplie car le lit hépatique réclame du flux en permanence.' },
      { nom: 'Veines sus-hépatiques (normales)', desc: 'Triphasique / multiphasique : S et D antérogrades, onde a rétrograde (reflet de la contraction atriale). C\'est le marqueur d\'un retour cave-cardiaque normal.' },
      { nom: 'Pseudo-portal (aplati)', desc: 'Perte de la triphasicité → spectre monophasique amorti, proche du flux portal. Témoigne d\'une cirrhose (compression par la fibrose / nodules) ou d\'une perte de compliance.' },
      { nom: 'Reflux systolique (congestion / ICD)', desc: 'Insuffisance tricuspide / insuffisance cardiaque droite : l\'onde S s\'inverse (reflux systolique), le spectre devient pulsatile « en W » avec composante rétrograde marquée.' },
      { nom: 'Artère hépatique « parvus-tardus » (greffon)', desc: 'En aval d\'une sténose anastomotique post-transplant : montée systolique lente (temps de montée systolique allongé > 0,08 s), pic émoussé, IR bas (< 0,5).' }
    ]
  },
  physique: {
    intro: 'Le foie est un territoire profond : basse fréquence, apnée et correction d\'angle rigoureuse sont déterminantes.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Convexe 2–5 MHz pour la pénétration ; l\'imagerie harmonique aide chez le patient difficile (stéatose, ascite). Descendre la fréquence si le foie est profond/échogène.' },
      { titre: 'Angle d\'insonation', desc: 'Curseur ≤ 60° aligné sur la paroi vasculaire. L\'artère hépatique et les veines sus-hépatiques sont souvent perpendiculaires au faisceau dans l\'abord sous-costal → privilégier une fenêtre intercostale ou incliner la sonde pour obtenir un angle exploitable.' },
      { titre: 'Filtre mural & PRF', desc: 'Les veines sus-hépatiques et le flux diastolique artériel sont des flux lents : baisser le filtre mural et la PRF pour ne pas amputer l\'onde D ni l\'onde a, et ne pas créer un faux IR élevé.' },
      { titre: 'Mouvements respiratoires', desc: 'Le foie se déplace de plusieurs centimètres en respiration : acquérir en apnée douce (téléexpiration) pour stabiliser la porte et limiter le bruit de mouvement sur le spectre sus-hépatique.' },
      { titre: 'Doppler énergie', desc: 'Utile pour confirmer la perméabilité artérielle d\'un greffon (flux lent, parvus-tardus) ou rechercher un filet de flux résiduel avant de conclure à une thrombose.' }
    ]
  },
  reglages: {
    intro: 'Réglages Doppler hépatique types.',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Harmonique ON si patient difficile' },
      { param: 'Profondeur', valeur: 'Foie au ⅔ de l\'écran', note: 'Veines sus-hépatiques sous le diaphragme' },
      { param: 'Fenêtre', valeur: 'Sous-costale + intercostale', note: 'Intercostale pour un meilleur angle artériel' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Critique pour l\'IR et les vitesses' },
      { param: 'Porte', valeur: '⅓ de la lumière, centrée', note: 'Centrer dans l\'artère / la sus-hépatique' },
      { param: 'PRF', valeur: 'Basse (flux lents)', note: 'Adapter : porte rapide, sus-hépatiques lentes' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Haut = perte de l\'onde D / onde a' },
      { param: 'Respiration', valeur: 'Apnée téléexpiratoire', note: 'Stabilise le spectre' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, bras droit relevé derrière la tête pour ouvrir les espaces intercostaux ; décubitus latéral gauche pour dégager le foie et le pédicule. Examen à jeun (≥ 6 h) pour standardiser l\'IR artériel et le flux portal.',
    operateur: 'Assis à droite du patient, avant-bras en appui, main libre sur PRF/baseline.',
    ecran: 'Dans l\'axe du regard, lumière tamisée.',
    sonde: 'Convexe en abord sous-costal récurrent (oblique vers l\'épaule) pour les veines sus-hépatiques, intercostal droit pour le pédicule et l\'artère.',
    ergonomie: 'Coordonner l\'apnée du patient avec la capture ; éviter l\'appui prolongé en intercostal.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérage B-mode du foie', desc: 'Évaluer échostructure, contours, taille ; repérer le pédicule hépatique (signe de Mickey), la VCI et la confluence des veines sus-hépatiques sous le diaphragme.' },
      { titre: 'Artère hépatique', desc: 'Repérer l\'artère hépatique propre dans le pédicule (en avant de la porte), placer la porte, corriger l\'angle, mesurer VPS, VTD et calculer l\'IR (cible 0,55–0,70) et le temps de montée systolique.' },
      { titre: 'Veines sus-hépatiques', desc: 'Abord sous-costal récurrent ; échantillonner une veine sus-hépatique (médiane ou droite) à distance de la VCI ; caractériser la phasicité (triphasique vs aplati vs reflux).' },
      { titre: 'Veine cave inférieure', desc: 'Vérifier la perméabilité et la compliance respiratoire de la VCI (dilatée et peu compliante dans la congestion).' },
      { titre: 'Couplage clinique', desc: 'Intégrer les données portales (chapitre 61), l\'aspect du foie et le contexte (cirrhose, ICD, greffon) pour conclure.' }
    ],
    reperes: ['Pédicule = signe de Mickey (porte + artère + cholédoque)', 'Confluent des sus-hépatiques en patte d\'oie sous le diaphragme', 'Artère hépatique propre en avant de la veine porte'],
    astuces: ['Fenêtre intercostale pour obtenir un angle ≤ 60° sur l\'artère.', 'Vérifier le profil sus-hépatique sur plusieurs cycles respiratoires.', 'Chez le transplanté, mesurer systématiquement IR et temps de montée systolique de l\'artère hépatique.', 'Comparer les sus-hépatiques entre elles : une seule veine atteinte oriente vers une obstruction localisée.'],
    erreurs: ['Filtre/PRF trop hauts → onde a / onde D amputées (faux pseudo-portal ou faux IR élevé).', 'Angle > 60° → IR et vitesses non fiables.', 'Examen non à jeun → IR artériel abaissé (post-prandial) interprété à tort.', 'Confondre VCI et veine sus-hépatique près du confluent.']
  },
  interpretation: {
    texte: 'Lire ensemble l\'artère (résistance), les veines sus-hépatiques (phasicité) et le foie (échostructure).',
    normal: ['Artère hépatique : basse résistance, IR 0,55–0,70, montée systolique rapide', 'Veines sus-hépatiques : triphasiques (S, D antérogrades ; a rétrograde)', 'Veine porte hépatopète (cf. chapitre portal)', 'VCI compliante avec la respiration'],
    pathologique: ['IR artériel très bas (< 0,5) ou parvus-tardus : sténose d\'amont / fistule / aval de sténose (greffon)', 'IR artériel très élevé / diastole nulle : résistance hépatique majeure (rejet, hyperpression)', 'Sus-hépatiques aplaties / pseudo-portales : cirrhose, perte de compliance', 'Reflux systolique sur les sus-hépatiques : insuffisance cardiaque droite / insuffisance tricuspide', 'Absence / inversion de flux sus-hépatique, veines non visibles : Budd-Chiari', 'Absence de flux artériel chez un greffon : thrombose artérielle (urgence)'],
    svgPatho: SVG_HEP_2,
    capPatho: 'Spectres des veines sus-hépatiques : normal triphasique, pseudo-portal (cirrhose), reflux systolique (congestion / ICD), Budd-Chiari (absence de signal).'
  },
  valeurs: {
    intro: 'Valeurs de référence du Doppler hépatique (à adapter au laboratoire et au contexte).',
    lignes: [
      { param: 'IR artère hépatique (normal)', valeur: '0,55–0,70', note: 'À jeun ; baisse en post-prandial' },
      { param: 'IR artériel bas', valeur: '< 0,5', note: 'Greffon : évoquer sténose anastomotique / fistule' },
      { param: 'Temps de montée systolique (TMS)', valeur: '< 0,08 s (normal)', note: 'Allongé = parvus-tardus (sténose d\'amont)' },
      { param: 'VPS artère hépatique', valeur: '≈ 30–60 cm/s', note: 'Accélération focale > 200 cm/s = sténose anastomotique (greffon)' },
      { param: 'Phasicité sus-hépatique', valeur: 'Triphasique normal', note: 'Monophasique = pseudo-portal (cirrhose)' },
      { param: 'Reflux systolique sus-hépatique', valeur: 'Pathologique', note: 'Insuffisance tricuspide / ICD' },
      { param: 'Flux sus-hépatique', valeur: 'Présent, antérograde', note: 'Absent / inversé = Budd-Chiari' }
    ]
  },
  pathologies: [
    { nom: 'Sténose de l\'artère hépatique du greffon', physiopath: 'Sténose de l\'anastomose artérielle après transplantation hépatique (ischémie biliaire/parenchymateuse à terme)', bmode: 'Foie de greffe, anastomose parfois rétrécie', doppler: 'En aval : parvus-tardus, IR bas (< 0,5), TMS allongé (> 0,08 s) ; au site : accélération focale (> 200 cm/s)', ddx: 'IR bas post-prandial physiologique, fistule artério-portale', pieges: 'Examen non à jeun, angle > 60°', gravite: 'Risque de cholangiopathie ischémique', cat: 'Confirmer par angio-TDM/angiographie, avis équipe de transplantation' },
    { nom: 'Thrombose de l\'artère hépatique du greffon', physiopath: 'Occlusion artérielle précoce post-transplant — urgence (le greffon dépend de l\'artère pour les voies biliaires)', bmode: 'Absence de pulsatilité artérielle au pédicule', doppler: 'Absence totale de flux artériel (couleur + énergie) ; rechercher une artérialisation collatérale tardive', ddx: 'Artère très ralentie (parvus-tardus extrême), fenêtre technique insuffisante', pieges: 'Conclure à tort à une thrombose avec PRF/filtre trop hauts', gravite: 'Urgence — risque de perte du greffon', cat: 'Confirmation en urgence (angio-TDM), revascularisation / retransplantation' },
    { nom: 'Syndrome de Budd-Chiari', physiopath: 'Obstruction du drainage veineux sus-hépatique (thrombose des veines sus-hépatiques ± VCI, syndrome myéloprolifératif, thrombophilie)', bmode: 'Veines sus-hépatiques non visibles, fibrosées ou comblées ; ascite ; hypertrophie du lobe caudé', doppler: 'Absence ou inversion du flux sus-hépatique, collatérales intra-hépatiques (flux en « toile d\'araignée »), VCI parfois thrombosée', ddx: 'Cirrhose avec sus-hépatiques aplaties, insuffisance cardiaque', pieges: 'Sus-hépatiques difficiles à voir techniquement', gravite: 'Sévère (hypertension portale, insuffisance hépatique)', cat: 'Confirmer par imagerie en coupe, bilan de thrombophilie, avis hépatologique' },
    { nom: 'Congestion hépatique (insuffisance cardiaque droite)', physiopath: 'Transmission rétrograde de la surcharge des cavités droites / insuffisance tricuspide vers le foie', bmode: 'VCI et veines sus-hépatiques dilatées, peu compliantes, foie congestif', doppler: 'Reflux systolique sur les sus-hépatiques (inversion de l\'onde S), porte parfois pulsatile', ddx: 'Budd-Chiari, cirrhose', pieges: 'Confondre pulsatilité portale de congestion et flux normal', gravite: 'Reflète la sévérité cardiaque droite', cat: 'Corréler à l\'échocardiographie, traitement de la cardiopathie' },
    { nom: 'Cirrhose (retentissement vasculaire)', physiopath: 'Fibrose et nodules de régénération altérant la compliance hépatique et la dynamique veineuse', bmode: 'Foie dysmorphique, contours bosselés, signes d\'hypertension portale', doppler: 'Sus-hépatiques aplaties / pseudo-portales ; porte ralentie voire hépatofuge (cf. chapitre portal)', ddx: 'Congestion, Budd-Chiari', pieges: 'Aplatissement des sus-hépatiques iatrogène (filtre haut)', gravite: 'Selon le stade (Child, hypertension portale)', cat: 'Bilan complet d\'hypertension portale, dépistage du CHC' }
  ],
  algorithme: {
    titre: 'Conduite devant un Doppler hépatique anormal',
    noeuds: [
      { q: 'Veines sus-hépatiques aplaties / monophasiques ?', a: 'Vérifier le filtre (artefact) ; sinon cirrhose / perte de compliance' },
      { q: 'Reflux systolique sur les sus-hépatiques + VCI dilatée ?', a: 'Insuffisance cardiaque droite / tricuspide → échocardiographie' },
      { q: 'Flux sus-hépatique absent / inversé, veines non vues ?', a: 'Budd-Chiari → imagerie en coupe + bilan de thrombophilie' },
      { q: 'Greffon : artère parvus-tardus, IR < 0,5, TMS allongé ?', a: 'Sténose anastomotique → angio-TDM, avis transplantation' },
      { q: 'Greffon : aucun flux artériel (couleur + énergie) ?', a: 'Thrombose artérielle = URGENCE → confirmation et revascularisation' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER HÉPATIQUE

Indication : [bilan hépatopathie / suivi].
Technique : sonde convexe, mode B + Doppler couleur et pulsé, à jeun.

Foie de taille et d'échostructure normales, contours réguliers.
Artère hépatique : perméable, profil de basse résistance, IR __ (0,55–0,70), montée systolique normale.
Veines sus-hépatiques : perméables, flux triphasique normal.
Veine porte : perméable, flux hépatopète (cf. Doppler portal).
VCI : perméable, compliante en respiration.

CONCLUSION : Doppler hépatique normal. Artère hépatique de basse résistance, veines sus-hépatiques triphasiques.`,
    pathologique: `ÉCHO-DOPPLER HÉPATIQUE

Indication : [suivi de greffon / insuffisance cardiaque / hépatopathie].
Technique : sonde convexe, mode B + Doppler couleur et pulsé, à jeun.

Foie : [dysmorphique / congestif / de greffe], __.
Artère hépatique : [IR __ ; profil parvus-tardus, TMS __ s ; accélération focale __ cm/s à l'anastomose].
Veines sus-hépatiques : [aplaties/pseudo-portales / reflux systolique / absence de flux].
Veine porte : __ . VCI : [dilatée, peu compliante].

CONCLUSION : [Sténose/thrombose artérielle de greffon — urgence / Syndrome de Budd-Chiari / Congestion hépatique sur ICD / Cirrhose].
[Proposition : angio-TDM, échocardiographie, avis spécialisé selon le contexte.]`
  },
  cas: [
    { titre: 'IR bas après repas', enonce: 'Vous mesurez un IR de l\'artère hépatique à 0,48 chez un patient venu juste après le déjeuner.', questions: ['Est-ce forcément pathologique ?', 'Que faites-vous ?'], indices: ['Conditions de l\'examen', 'Variation physiologique'], reponse: 'Non : l\'IR hépatique baisse physiologiquement en post-prandial (hyperdébit splanchnique). Refaire l\'examen à jeun (≥ 6 h) avant d\'évoquer une cause pathologique.' },
    { titre: 'Greffon récent', enonce: 'J3 d\'une transplantation hépatique : l\'artère hépatique montre une montée systolique lente, un pic émoussé, IR 0,42 et TMS allongé.', questions: ['Quel diagnostic ?', 'Quelle conduite ?'], indices: ['Parvus-tardus', 'Anastomose'], reponse: 'Parvus-tardus en aval d\'une sténose anastomotique de l\'artère du greffon. Confirmer par angio-TDM et alerter l\'équipe de transplantation (risque biliaire ischémique).' },
    { titre: 'Pas de flux artériel sur greffon', enonce: 'Chez un transplanté, aucun flux artériel n\'est retrouvé au pédicule en couleur ; PRF et filtre sont réglés haut.', questions: ['Quelle est l\'étape suivante avant de conclure ?', 'Quelle est l\'urgence ?'], reponse: 'Baisser PRF et filtre, passer en Doppler énergie pour ne pas rater un flux parvus-tardus très lent. Si l\'absence est confirmée : thrombose artérielle du greffon = urgence (angio-TDM, revascularisation/retransplantation).' },
    { titre: 'Sus-hépatiques plates', enonce: 'Foie dysmorphique, contours bosselés ; les veines sus-hépatiques sont monophasiques aplaties.', questions: ['Que traduit la perte de triphasicité ?'], reponse: 'Une perte de compliance hépatique typique de la cirrhose (les nodules/fibrose amortissent la transmission des pressions atriales). Vérifier d\'abord que le filtre n\'est pas trop haut, puis compléter par le bilan d\'hypertension portale.' },
    { titre: 'Onde S inversée', enonce: 'Dyspnée, œdèmes des membres inférieurs ; les sus-hépatiques montrent un reflux systolique et la VCI est dilatée et peu compliante.', questions: ['Diagnostic ?', 'Examen clé ?'], reponse: 'Congestion hépatique sur insuffisance cardiaque droite / insuffisance tricuspide. Échocardiographie pour évaluer les cavités droites et la valve tricuspide.' },
    { titre: 'Veines invisibles + ascite', enonce: 'Patiente avec syndrome myéloprolifératif, douleurs de l\'hypochondre droit, ascite ; les veines sus-hépatiques ne sont pas visibles et l\'on voit des collatérales intra-hépatiques.', questions: ['Diagnostic ?', 'Bilan ?'], reponse: 'Syndrome de Budd-Chiari (obstruction du drainage sus-hépatique). Confirmer par imagerie en coupe, rechercher une thrombophilie et adresser en hépatologie.' },
    { titre: 'Porte pulsatile', enonce: 'Chez un patient en insuffisance cardiaque droite, le flux portal apparaît anormalement pulsatile.', questions: ['Comment l\'expliquer ?'], reponse: 'La surcharge des cavités droites se transmet en rétrograde à travers le foie congestif jusqu\'à la veine porte, qui devient pulsatile. Ce n\'est pas une hypertension portale au sens classique mais un signe de congestion.' },
    { titre: 'IR très élevé', enonce: 'Chez un greffon, l\'artère hépatique montre un IR à 0,95 avec diastole quasi nulle en post-opératoire immédiat.', questions: ['Quelles hypothèses ?'], reponse: 'IR élevé transitoire (œdème de reperfusion, hypothermie) ou résistance hépatique pathologique (rejet, hyperpression). Interpréter dans le temps et le contexte ; recontrôler et corréler à la biologie.' },
    { titre: 'Une seule veine atteinte', enonce: 'La veine sus-hépatique droite est non visible alors que la médiane et la gauche sont triphasiques normales.', questions: ['Que suspecter ?'], reponse: 'Une obstruction localisée d\'une seule veine sus-hépatique (Budd-Chiari segmentaire ou compression par une lésion). Une atteinte isolée n\'exclut pas le diagnostic ; explorer les trois veines et compléter par l\'imagerie.' },
    { titre: 'Fistule après biopsie', enonce: 'Après ponction-biopsie hépatique, vous notez une zone d\'IR artériel très bas localisé et une « artérialisation » d\'une branche portale.', questions: ['Diagnostic ?'], reponse: 'Fistule artério-portale post-biopsie : shunt à bas IR artériel local et flux pulsatile artérialisé dans la branche portale adjacente. Souvent spontanément résolutive ; surveiller, embolisation si symptomatique.' }
  ],
  pieges: [
    'Examen non à jeun → IR artériel abaissé (post-prandial) interprété comme pathologique.',
    'Filtre mural / PRF trop hauts → onde a / onde D amputées (faux pseudo-portal, faux IR élevé).',
    'Angle > 60° sur l\'artère hépatique → IR et vitesses non fiables.',
    'Conclure « thrombose artérielle » de greffon sans avoir baissé PRF/filtre ni utilisé l\'énergie (rater un parvus-tardus extrême).',
    'Confondre la VCI et une veine sus-hépatique près du confluent.',
    'Oublier que la pulsatilité portale peut être un signe de congestion cardiaque droite, pas d\'hypertension portale.',
    'Attribuer l\'aplatissement des sus-hépatiques à une cirrhose alors qu\'il est iatrogène (réglages).'
  ],
  flashcards: [
    { q: 'IR normal de l\'artère hépatique ?', r: '0,55–0,70 (profil de basse résistance) ; abaissé en post-prandial.' },
    { q: 'Profil normal des veines sus-hépatiques ?', r: 'Triphasique : S et D antérogrades, onde a rétrograde (reflet de l\'oreillette droite).' },
    { q: 'Signe Doppler d\'une sténose artérielle de greffon hépatique ?', r: 'Parvus-tardus en aval : IR bas (< 0,5), TMS allongé (> 0,08 s) ± accélération focale au site.' },
    { q: 'Que traduit un reflux systolique sur les veines sus-hépatiques ?', r: 'Insuffisance cardiaque droite / insuffisance tricuspide (congestion).' },
    { q: 'Définition Doppler du syndrome de Budd-Chiari ?', r: 'Absence / inversion de flux sus-hépatique, veines non visibles, collatérales intra-hépatiques.' },
    { q: 'Pourquoi explorer le foie à jeun ?', r: 'Pour standardiser l\'IR artériel et le flux portal (l\'hyperdébit post-prandial les modifie).' }
  ],
  qcm: [
    { q: 'Un IR de l\'artère hépatique à 0,45 avec montée systolique lente chez un transplanté évoque :', options: ['Un examen normal', 'Une sténose anastomotique (parvus-tardus)', 'Une congestion cardiaque', 'Un Budd-Chiari'], correct: 1, exp: 'IR bas (< 0,5) + parvus-tardus + TMS allongé en aval = sténose anastomotique de l\'artère du greffon.' },
    { q: 'Le profil triphasique des veines sus-hépatiques reflète :', options: ['La résistance hépatique', 'La dynamique de l\'oreillette droite', 'Le débit portal', 'L\'IR artériel'], correct: 1, exp: 'Les veines sus-hépatiques transmettent les variations de pression de l\'OD (ondes S, D, a).' },
    { q: 'Une inversion de l\'onde S des sus-hépatiques avec VCI dilatée signe :', options: ['Une cirrhose', 'Une insuffisance cardiaque droite', 'Une thrombose porte', 'Un examen post-prandial'], correct: 1, exp: 'Le reflux systolique + VCI dilatée et peu compliante traduit la congestion (ICD / insuffisance tricuspide).' },
    { q: 'Devant l\'absence de flux artériel sur un greffon, la 1ʳᵉ chose à faire est :', options: ['Conclure à une thrombose', 'Baisser PRF/filtre + Doppler énergie', 'Augmenter l\'angle', 'Faire manger le patient'], correct: 1, exp: 'Optimiser pour les flux lents avant de conclure : un parvus-tardus extrême peut mimer une absence de flux.' }
  ],
  refs: ['DIU Montpellier (Doppler abdominal) ; SFMV ; WFUMB/EFSUMB guidelines on abdominal Doppler ; recommandations sur le suivi Doppler de la transplantation hépatique.']
});

/* ====================================================================== */
/* CHAPITRE 61 — DOPPLER PORTAL                                             */
/* ====================================================================== */

const SVG_PORT_1 = `<svg viewBox="0 0 460 230" role="img" aria-label="Systeme porte">
<rect width="460" height="230" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Confluent porto-spléno-mésentérique</text>
<path d="M70,60 C40,110 40,170 90,200 L260,200 C320,170 320,90 280,60 C200,45 130,45 70,60 Z" fill="#fbe9d2" stroke="#c2935a"/>
<path d="M300,150 L180,150" fill="none" stroke="#7c3aed" stroke-width="11"/>
<text x="200" y="140" font-size="10" fill="#5b21b6">Veine porte (hépatopète →)</text>
<path d="M300,150 L380,120" fill="none" stroke="#7c3aed" stroke-width="9"/>
<text x="330" y="110" font-size="9" fill="#5b21b6">Veine splénique</text>
<path d="M300,150 L370,200" fill="none" stroke="#2563eb" stroke-width="9"/>
<text x="320" y="218" font-size="9" fill="#1d4ed8">Veine mésentérique sup.</text>
<circle cx="300" cy="150" r="6" fill="#5b21b6"/>
<text x="300" y="178" font-size="9" fill="#5b21b6">Tronc porte</text>
<text x="120" y="120" font-size="9" fill="#64748b">Foie</text>
</svg>`;

const SVG_PORT_2 = `<svg viewBox="0 0 460 210" role="img" aria-label="Flux portal normal vs pathologique">
<rect width="460" height="210" fill="#fff"/>
<text x="8" y="14" font-size="10" font-weight="bold" fill="#0b2f63">Normal : hépatopète, continu, légèrement modulé</text>
<line x1="20" y1="60" x2="220" y2="60" stroke="#cbd5e1"/>
<path d="M20,60 C50,45 70,52 100,48 C130,44 150,52 180,49 C200,47 215,50 220,49" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.8"/>
<text x="30" y="40" font-size="9" fill="#5b21b6">+ Vmoy 15–25 cm/s, ⌀ < 13 mm</text>
<text x="250" y="14" font-size="10" font-weight="bold" fill="#0b2f63">HTP : ralenti, modulation perdue (&lt; 15 cm/s)</text>
<line x1="250" y1="60" x2="450" y2="60" stroke="#cbd5e1"/>
<path d="M250,58 C300,55 350,57 400,56 C430,57 445,56 450,56" fill="none" stroke="#d97706" stroke-width="1.8"/>
<text x="8" y="130" font-size="10" font-weight="bold" fill="#0b2f63">HTP sévère : flux HÉPATOFUGE (inversé ←)</text>
<line x1="20" y1="155" x2="220" y2="155" stroke="#cbd5e1"/>
<path d="M20,155 C50,168 70,162 100,166 C130,170 150,162 180,165 C200,167 215,164 220,165" fill="#fecaca" stroke="#dc2626" stroke-width="1.8"/>
<text x="30" y="190" font-size="9" fill="#991b1b">− composante sous la ligne de base</text>
<text x="250" y="130" font-size="10" font-weight="bold" fill="#0b2f63">Cavernome : multiples canaux serpigineux</text>
<line x1="250" y1="155" x2="450" y2="155" stroke="#cbd5e1"/>
<path d="M255,155 q10,-12 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0" fill="none" stroke="#7c3aed" stroke-width="1.6"/>
</svg>`;

window.VASC.chapters.push({
  id: 'doppler-portal', num: 61, groupe: 'Doppler viscéral', emoji: '🩸',
  titre: 'Doppler portal (hypertension portale)',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈2 h',
  resume: 'Étude de la veine porte et de ses afférences : sens et vitesse du flux, diamètre, modulation respiratoire, voies de dérivation, thrombose et cavernome, surveillance des TIPS. Pierre angulaire du diagnostic non invasif d\'hypertension portale.',
  tags: 'veine porte hépatopète hépatofuge hypertension portale cavernome thrombose TIPS varices dérivation Baveno',
  objectifs: [
    'Identifier la veine porte et son confluent (splénique + mésentérique supérieure) et mesurer le flux portal.',
    'Reconnaître un flux portal normal (hépatopète, continu, Vmoy ~15–25 cm/s, diamètre < 13 mm).',
    'Diagnostiquer une hypertension portale (ralentissement, inversion hépatofuge, dilatation, perte de modulation, dérivations).',
    'Reconnaître une thrombose porte, un cavernome portal et une thrombose tumorale.',
    'Assurer la surveillance Doppler d\'un TIPS (vitesses dans le shunt, sténose).',
    'Rédiger un compte-rendu portal structuré et intégrer les critères de Baveno.'
  ],
  anatomie: {
    texte: 'La veine porte naît de la confluence de la veine splénique et de la veine mésentérique supérieure en arrière de l\'isthme pancréatique. Elle monte dans le pédicule hépatique (en arrière de l\'artère et du cholédoque) jusqu\'au hile où elle se divise en branches droite et gauche. Elle draine le sang veineux du tube digestif, de la rate et du pancréas vers le foie (système porte = capillaires digestifs → foie → veines sus-hépatiques → VCI).',
    svg: SVG_PORT_1,
    caption: 'Schéma : confluent spléno-mésentérique formant le tronc porte, qui se dirige vers le foie (flux hépatopète). La veine splénique et la mésentérique supérieure sont les afférents principaux.',
    vascularisation: 'Système à basse pression (≈ 5–10 mmHg). En cas de bloc (intra-hépatique le plus souvent, cirrhose), la pression monte et le sang cherche des voies de dérivation porto-systémiques (varices œsophagiennes, gastriques, ombilicale recanalisée, spléno-rénales).',
    rapports: ['En arrière de l\'artère hépatique et du cholédoque dans le pédicule (signe de Mickey)', 'Confluent en arrière du col du pancréas', 'Branche gauche reliée au ligament rond (veine ombilicale potentielle)'],
    variantes: ['Variations de division portale (trifurcation)', 'Veine ombilicale perméable/recanalisée en cas d\'HTP', 'Cavernome (réseau de suppléance après thrombose ancienne)']
  },
  physiologie: {
    texte: 'Le flux portal normal est HÉPATOPÈTE (vers le foie), antérograde en continu, peu pulsatile, avec une légère modulation respiratoire (et cardiaque) ; vitesse moyenne ≈ 15–25 cm/s, diamètre du tronc porte < 13 mm.\nDans l\'hypertension portale, le flux ralentit (< 15 cm/s), perd sa modulation respiratoire, le tronc se dilate (> 13 mm), puis le flux peut s\'inverser et devenir HÉPATOFUGE (du foie vers la périphérie) — signe majeur d\'HTP sévère avec voies de dérivation.',
    profils: [
      { nom: 'Portal normal', desc: 'Hépatopète, continu, légèrement ondulé par la respiration ; Vmoy ~15–25 cm/s ; tronc < 13 mm.' },
      { nom: 'HTP débutante', desc: 'Ralentissement (< 15 cm/s), perte de la modulation respiratoire (flux « monotone »), dilatation > 13 mm.' },
      { nom: 'Flux hépatofuge', desc: 'Inversion du sens (vers la périphérie) : signe majeur d\'HTP sévère, souvent associé à des dérivations actives.' },
      { nom: 'Flux pulsatile', desc: 'Pulsatilité portale anormale : congestion cardiaque droite (transmise) ou fistule artério-portale (à distinguer).' },
      { nom: 'Cavernome', desc: 'Absence de tronc porte normal remplacé par un lacis de petits canaux serpigineux (recanalisation après thrombose ancienne).' }
    ]
  },
  physique: {
    intro: 'Le flux portal est lent : la sensibilité aux flux lents prime sur la mesure des hautes vitesses.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Convexe 2–5 MHz ; harmonique utile. Abord sous-costal ou intercostal droit pour aligner le tronc porte.' },
      { titre: 'PRF & filtre bas', desc: 'Le flux portal est lent (< 25 cm/s) : baisser la PRF et le filtre mural pour le détecter ; une PRF trop haute fait croire à une absence de flux (fausse thrombose).' },
      { titre: 'Angle & sens', desc: 'Corriger l\'angle ≤ 60° et VÉRIFIER LE SENS : c\'est l\'information clé (hépatopète vs hépatofuge). Bien orienter la ligne de base et le code couleur pour ne pas inverser à tort.' },
      { titre: 'Doppler énergie', desc: 'Sensible aux flux lents et au sens via le power directionnel : confirme la perméabilité avant de conclure à une thrombose ; aide à cartographier un cavernome.' },
      { titre: 'Mesure du diamètre', desc: 'Mesurer le tronc porte en inspiration calme, perpendiculairement, au niveau du croisement avec l\'artère hépatique (seuil 13 mm).' }
    ]
  },
  reglages: {
    intro: 'Réglages Doppler portal types.',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Harmonique ON si difficile' },
      { param: 'PRF', valeur: 'Basse (flux lent)', note: 'Trop haute = fausse thrombose' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Ne pas effacer le flux lent' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Pour Vmoy fiable' },
      { param: 'Code couleur / baseline', valeur: 'Réglé pour le sens', note: 'Distinguer hépatopète/hépatofuge' },
      { param: 'Porte', valeur: '⅓ lumière, centrée', note: 'Dans le tronc porte' },
      { param: 'Énergie directionnelle', valeur: 'Si flux ambigu', note: 'Perméabilité + sens' },
      { param: 'Respiration', valeur: 'Apnée calme', note: 'Stabilise la mesure' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal puis latéral gauche ; à jeun (≥ 6 h) car le repas augmente le débit portal. Bras droit relevé pour les abords intercostaux.',
    operateur: 'À droite du patient, main libre sur PRF/baseline/échelle.',
    ecran: 'Dans l\'axe du regard, lumière tamisée.',
    sonde: 'Convexe en abord sous-costal/intercostal droit pour aligner le tronc porte au mieux (angle ≤ 60°).',
    ergonomie: 'Coordonner l\'apnée pour stabiliser le tronc porte et la mesure de diamètre.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérage du tronc porte', desc: 'Identifier le pédicule (signe de Mickey), suivre le tronc porte du confluent au hile ; mesurer le diamètre (seuil 13 mm).' },
      { titre: 'Sens et vitesse', desc: 'Couleur pour le sens (hépatopète vs hépatofuge), puis pulsé pour la vitesse moyenne (Vmoy ~15–25 cm/s) et la modulation respiratoire.' },
      { titre: 'Afférents', desc: 'Explorer la veine splénique et la mésentérique supérieure (perméabilité, sens, dilatation).' },
      { titre: 'Recherche de dérivations', desc: 'Veine ombilicale recanalisée (dans le ligament rond), varices gastro-œsophagiennes, shunts spléno-rénaux, splénomégalie.' },
      { titre: 'Recherche de thrombose / cavernome', desc: 'Matériel endoluminal, absence de flux, lacis serpigineux ; en cas de thrombus, chercher un flux artériel intra-thrombus (tumoral).' },
      { titre: 'TIPS si présent', desc: 'Mesurer les vitesses dans le shunt (extrémités portale et cave) et rechercher une sténose (cf. valeurs).' }
    ],
    reperes: ['Tronc porte dans le pédicule (signe de Mickey)', 'Confluent spléno-mésentérique en arrière du col pancréatique', 'Ligament rond pour la veine ombilicale'],
    astuces: ['Toujours commencer par confirmer le SENS du flux (information clé).', 'Baisser PRF et filtre avant de conclure à une absence de flux.', 'Comparer le flux portal au flux artériel adjacent pour vérifier le codage couleur.', 'Mesurer la vitesse sur plusieurs cycles, en apnée.'],
    erreurs: ['PRF/filtre trop hauts → fausse thrombose porte.', 'Inversion du code couleur mal réglée → faux flux hépatofuge.', 'Mesure non à jeun → vitesses majorées (faux normal).', 'Oublier de chercher le flux artériel dans un thrombus (tumoral vs cruorique).']
  },
  interpretation: {
    texte: 'Le sens, la vitesse, le diamètre et la présence de dérivations résument l\'essentiel.',
    normal: ['Flux hépatopète, continu, légèrement modulé', 'Vmoy ~15–25 cm/s', 'Tronc porte < 13 mm', 'Pas de dérivation, rate de taille normale'],
    pathologique: ['Ralentissement (< 15 cm/s) + perte de modulation = HTP', 'Flux hépatofuge (inversé) = HTP sévère (signe majeur)', 'Tronc dilaté > 13 mm, splénomégalie, ascite', 'Voies de dérivation : veine ombilicale recanalisée, varices, shunts spléno-rénaux', 'Matériel endoluminal + absence de flux = thrombose porte ; lacis serpigineux = cavernome', 'Flux artériel dans le thrombus = thrombose tumorale (CHC)'],
    svgPatho: SVG_PORT_2,
    capPatho: 'Flux portal : normal hépatopète, HTP ralentie (modulation perdue), HTP sévère hépatofuge (inversion), cavernome (lacis serpigineux).'
  },
  valeurs: {
    intro: 'Valeurs de référence du Doppler portal et critères de surveillance TIPS (à adapter au laboratoire).',
    lignes: [
      { param: 'Diamètre tronc porte (normal)', valeur: '< 13 mm', note: '> 13 mm = évocateur d\'HTP' },
      { param: 'Vitesse moyenne portale (normale)', valeur: '≈ 15–25 cm/s', note: 'Hépatopète, légèrement modulée' },
      { param: 'Ralentissement portal', valeur: '< 15 cm/s', note: 'HTP (avec perte de modulation respiratoire)' },
      { param: 'Sens du flux', valeur: 'Hépatopète (normal)', note: 'Hépatofuge = HTP sévère (signe majeur)' },
      { param: 'Modulation respiratoire', valeur: 'Présente (normale)', note: 'Perdue dans l\'HTP' },
      { param: 'TIPS — vitesse dans le shunt', valeur: '≈ 90–190 cm/s', note: 'Vitesses cibles selon protocole local' },
      { param: 'TIPS — sténose', valeur: 'Vitesse intra-shunt < 50–60 cm/s ou > 190 cm/s ; chute > 50 cm/s vs référence', note: 'Aussi : reprise d\'un flux portal hépatofuge ou Δ vitesse anormale' }
    ]
  },
  pathologies: [
    { nom: 'Hypertension portale (cirrhose)', physiopath: 'Bloc intra-hépatique (fibrose) augmentant la pression porte → ralentissement puis inversion et dérivations', bmode: 'Foie dysmorphique, splénomégalie, ascite, tronc porte dilaté', doppler: 'Vmoy < 15 cm/s, perte de modulation, puis flux hépatofuge ; voies de dérivation', ddx: 'Bloc pré-hépatique (thrombose) ou post-hépatique (Budd-Chiari, ICD)', pieges: 'PRF haute simulant une thrombose, examen non à jeun', gravite: 'Risque hémorragique (varices)', cat: 'Bilan complet (endoscopie selon Baveno), avis hépatologique' },
    { nom: 'Thrombose de la veine porte', physiopath: 'Thrombus cruorique du tronc porte (cirrhose, thrombophilie, inflammation, post-chirurgie)', bmode: 'Matériel endoluminal, tronc parfois élargi', doppler: 'Absence de flux dans le segment thrombosé (couleur + énergie) ; flux ralenti en amont', ddx: 'Fausse thrombose (PRF/filtre hauts), cavernome (ancien), thrombose tumorale', pieges: 'Conclure sans baisser PRF/filtre ni utiliser l\'énergie', gravite: 'Selon extension et cause', cat: 'Confirmer (énergie, imagerie en coupe), anticoaguler selon contexte' },
    { nom: 'Cavernome portal', physiopath: 'Recanalisation/collatéralisation après thrombose porte ancienne (HTP pré-hépatique)', bmode: 'Tronc porte non identifiable, remplacé par un lacis de petits vaisseaux dans le pédicule', doppler: 'Multiples canaux serpigineux à flux veineux hépatopète', ddx: 'Thrombose porte récente, malformation', pieges: 'Méconnaître le cavernome et chercher en vain un tronc unique', gravite: 'HTP pré-hépatique chronique', cat: 'Imagerie en coupe, prise en charge de l\'HTP' },
    { nom: 'Thrombose tumorale porte', physiopath: 'Envahissement portal par un carcinome hépatocellulaire (CHC)', bmode: 'Thrombus expansif élargissant la veine, parfois contigu à une tumeur', doppler: 'Flux ARTÉRIEL pulsatile à l\'intérieur du thrombus (néovascularisation) — signe clé', ddx: 'Thrombose cruorique (pas de flux interne)', pieges: 'Ne pas chercher le flux intra-thrombus → manquer la nature tumorale', gravite: 'Pronostic du CHC', cat: 'Bilan oncologique (TDM/IRM, AFP), avis RCP hépatique' },
    { nom: 'Dysfonction de TIPS', physiopath: 'Sténose / thrombose du shunt porto-cave intra-hépatique au cours du suivi', bmode: 'Endoprothèse parfois rétrécie/comblée', doppler: 'Vitesse intra-shunt anormale (trop basse < 50–60 ou trop haute > 190 cm/s), variation > 50 cm/s vs référence, ré-inversion du flux portal hépatofuge', ddx: 'Variations physiologiques, fenêtre technique', pieges: 'Pas de Doppler de référence post-pose pour comparer', gravite: 'Récidive d\'HTP/hémorragie', cat: 'Référer pour révision/angioplastie du TIPS' }
  ],
  algorithme: {
    titre: 'Conduite devant un Doppler portal anormal',
    noeuds: [
      { q: 'Flux hépatopète ralenti (< 15 cm/s), modulation perdue ?', a: 'HTP → chercher dérivations, splénomégalie, bilan hépatologique' },
      { q: 'Flux hépatofuge (inversé) ?', a: 'HTP sévère → bilan complet, endoscopie selon Baveno' },
      { q: 'Absence de flux dans le tronc ?', a: 'Baisser PRF/filtre + énergie ; si confirmée : thrombose porte' },
      { q: 'Thrombus présent : flux artériel à l\'intérieur ?', a: 'Oui → thrombose tumorale (CHC) ; Non → cruorique' },
      { q: 'Tronc remplacé par un lacis serpigineux ?', a: 'Cavernome (thrombose ancienne) → imagerie en coupe' },
      { q: 'TIPS : vitesse anormale / flux portal ré-inversé ?', a: 'Dysfonction de TIPS → révision/angioplastie' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER PORTAL

Indication : [bilan hépatopathie / HTP / suivi].
Technique : sonde convexe, mode B + Doppler couleur et pulsé, à jeun.

Tronc porte : perméable, diamètre __ mm (< 13), flux hépatopète, continu, légèrement modulé, Vmoy __ cm/s (15–25).
Veine splénique et veine mésentérique supérieure : perméables, hépatopètes.
Pas de voie de dérivation. Rate de taille normale. Pas d'ascite.

CONCLUSION : Système porte perméable, flux hépatopète normal. Pas de signe d'hypertension portale.`,
    pathologique: `ÉCHO-DOPPLER PORTAL

Indication : [cirrhose / HTP / thrombose / suivi TIPS].
Technique : sonde convexe, mode B + Doppler couleur et pulsé, à jeun.

Tronc porte : diamètre __ mm, flux [ralenti Vmoy __ cm/s, modulation perdue / HÉPATOFUGE].
[Thrombose : matériel endoluminal, absence de flux ± flux artériel intra-thrombus (tumoral). / Cavernome : lacis serpigineux remplaçant le tronc.]
Dérivations : [veine ombilicale recanalisée / varices / shunt spléno-rénal]. Splénomégalie __ . Ascite __ .
[TIPS : vitesse intra-shunt __ cm/s.]

CONCLUSION : [Hypertension portale (flux hépatofuge / ralenti) / Thrombose porte cruorique ou tumorale / Cavernome / Dysfonction de TIPS].
[Proposition : imagerie en coupe, endoscopie (Baveno), avis hépatologique / radiologie interventionnelle.]`
  },
  cas: [
    { titre: 'Flux inversé', enonce: 'Chez un cirrhotique, le flux du tronc porte est dirigé vers la périphérie (sous la ligne de base), tronc à 15 mm, splénomégalie.', questions: ['Comment qualifier ce flux ?', 'Que signifie-t-il ?'], indices: ['Sens du flux', 'Sévérité'], reponse: 'Flux hépatofuge (inversé) : signe majeur d\'hypertension portale sévère, généralement avec voies de dérivation actives. Compléter le bilan (endoscopie selon Baveno) et avis hépatologique.' },
    { titre: 'Fausse thrombose', enonce: 'Aucun flux couleur dans le tronc porte ; PRF et filtre sont réglés haut.', questions: ['Avant de conclure à une thrombose, que faites-vous ?'], reponse: 'Baisser PRF et filtre mural, passer en Doppler énergie directionnel : le flux portal étant lent (< 25 cm/s), des réglages inadaptés simulent facilement une thrombose.' },
    { titre: 'Thrombus qui « bat »', enonce: 'Tronc porte élargi rempli de matériel ; en couleur, un flux pulsatile apparaît à l\'intérieur du thrombus chez un patient cirrhotique.', questions: ['Quelle est la nature du thrombus ?', 'Quel bilan ?'], indices: ['Flux artériel intra-thrombus'], reponse: 'Thrombose tumorale (néovascularisation artérielle dans le thrombus) évoquant un CHC envahissant. Bilan oncologique (TDM/IRM, AFP) et avis RCP hépatique.' },
    { titre: 'Pas de tronc porte', enonce: 'Vous ne retrouvez pas le tronc porte normal mais un lacis de petits vaisseaux serpigineux dans le pédicule, à flux veineux hépatopète.', questions: ['Diagnostic ?'], reponse: 'Cavernome portal : réseau de suppléance après thrombose porte ancienne (HTP pré-hépatique). Confirmer par imagerie en coupe.' },
    { titre: 'Veine ombilicale', enonce: 'Vous repérez un vaisseau perméable dans le ligament rond reliant la branche porte gauche à la paroi abdominale.', questions: ['De quoi s\'agit-il ?', 'Que traduit-il ?'], reponse: 'Veine ombilicale (para-ombilicale) recanalisée : voie de dérivation porto-systémique témoignant d\'une hypertension portale.' },
    { titre: 'Suivi de TIPS', enonce: 'Patient porteur d\'un TIPS ; la vitesse intra-shunt est passée de 140 cm/s (référence post-pose) à 45 cm/s et le flux portal redevient hépatofuge.', questions: ['Que suspecter ?', 'Conduite ?'], reponse: 'Dysfonction (sténose) du TIPS : chute marquée de la vitesse intra-shunt et ré-inversion du flux portal. Référer pour angiographie / angioplastie du shunt.' },
    { titre: 'Vitesses normales mais repas', enonce: 'Vmoy portale à 28 cm/s chez un patient venu après un repas copieux.', questions: ['Interprétation ?'], reponse: 'Le repas augmente le débit splanchnique et donc la vitesse portale : un examen non à jeun peut masquer un ralentissement. Recontrôler à jeun.' },
    { titre: 'Porte pulsatile', enonce: 'Flux portal anormalement pulsatile chez un patient sans cirrhose mais en insuffisance cardiaque droite.', questions: ['Cause ?'], reponse: 'Transmission rétrograde de la congestion cardiaque droite à travers le foie (à distinguer d\'une fistule artério-portale, qui artérialise localement la porte).' },
    { titre: 'Tronc à 14 mm isolé', enonce: 'Tronc porte mesuré à 14 mm mais flux hépatopète normal, pas de splénomégalie ni d\'ascite.', questions: ['Conclusion ?'], reponse: 'Un diamètre limite isolé n\'affirme pas l\'HTP : il faut un faisceau d\'arguments (vitesse, sens, dérivations, splénomégalie). Interpréter dans le contexte et au besoin recontrôler.' },
    { titre: 'Thrombose post-opératoire', enonce: 'Douleurs abdominales, J5 d\'une chirurgie digestive ; absence de flux dans la veine mésentérique supérieure et le tronc porte avec matériel endoluminal, sans flux interne.', questions: ['Diagnostic ?', 'Conduite ?'], reponse: 'Thrombose porto-mésentérique cruorique (absence de flux artériel intra-thrombus). Confirmer par angio-TDM et anticoaguler selon le contexte chirurgical.' }
  ],
  pieges: [
    'PRF / filtre trop hauts → fausse thrombose porte (le flux portal est lent).',
    'Code couleur / ligne de base mal réglés → faux flux hépatofuge.',
    'Examen non à jeun → vitesses portales majorées (faux normal).',
    'Ne pas chercher le flux artériel dans un thrombus → manquer la thrombose tumorale (CHC).',
    'Confondre cavernome (lacis serpigineux) et thrombose récente du tronc.',
    'Se fier à un diamètre limite isolé pour affirmer l\'HTP (faisceau d\'arguments nécessaire).',
    'Pas de Doppler de référence après pose de TIPS → suivi non comparable.'
  ],
  flashcards: [
    { q: 'Sens normal du flux portal ?', r: 'Hépatopète (vers le foie), continu, légèrement modulé par la respiration.' },
    { q: 'Valeurs portales normales ?', r: 'Vmoy ~15–25 cm/s, diamètre du tronc < 13 mm.' },
    { q: 'Signe majeur d\'HTP sévère au Doppler portal ?', r: 'Flux hépatofuge (inversé), vers la périphérie.' },
    { q: 'Comment différencier thrombose cruorique et tumorale ?', r: 'Flux artériel pulsatile DANS le thrombus = tumoral (CHC) ; aucun flux interne = cruorique.' },
    { q: 'Qu\'est-ce qu\'un cavernome portal ?', r: 'Lacis de petits canaux serpigineux remplaçant le tronc porte après thrombose ancienne (HTP pré-hépatique).' },
    { q: 'Avant de conclure à une thrombose porte, que régler ?', r: 'Baisser PRF et filtre mural, utiliser le Doppler énergie (flux portal lent).' }
  ],
  qcm: [
    { q: 'Un flux portal hépatofuge avec splénomégalie traduit :', options: ['Un examen normal', 'Une hypertension portale sévère', 'Une thrombose porte', 'Une congestion cardiaque'], correct: 1, exp: 'L\'inversion du flux portal (hépatofuge) est un signe majeur d\'HTP sévère, souvent avec dérivations.' },
    { q: 'Le diamètre du tronc porte est considéré comme anormal au-delà de :', options: ['8 mm', '10 mm', '13 mm', '20 mm'], correct: 2, exp: 'Un tronc porte > 13 mm est évocateur d\'hypertension portale (à intégrer aux autres signes).' },
    { q: 'La présence d\'un flux artériel pulsatile à l\'intérieur d\'un thrombus portal évoque :', options: ['Une thrombose cruorique', 'Une thrombose tumorale (CHC)', 'Un cavernome', 'Un TIPS'], correct: 1, exp: 'La néovascularisation artérielle intra-thrombus signe l\'envahissement tumoral (carcinome hépatocellulaire).' },
    { q: 'Devant une absence de flux portal, la 1ʳᵉ chose à faire est :', options: ['Conclure à une thrombose', 'Baisser PRF/filtre + Doppler énergie', 'Augmenter la fréquence', 'Faire manger le patient'], correct: 1, exp: 'Le flux portal est lent : des réglages inadaptés simulent une thrombose ; optimiser avant de conclure.' }
  ],
  refs: ['DIU Montpellier (Doppler abdominal) ; SFMV ; WFUMB/EFSUMB guidelines on abdominal Doppler ; consensus Baveno (hypertension portale).']
});

/* ====================================================================== */
/* CHAPITRE 62 — DOPPLER SPLÉNIQUE                                          */
/* ====================================================================== */

const SVG_SPLEN_1 = `<svg viewBox="0 0 460 220" role="img" aria-label="Rate et vaisseaux spleniques">
<rect width="460" height="220" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Hile splénique : artère & veine</text>
<path d="M330,40 C400,70 400,160 330,190 C300,160 300,70 330,40 Z" fill="#e9d5ff" stroke="#7c3aed"/>
<text x="335" y="118" font-size="10" fill="#5b21b6">Rate</text>
<path d="M40,120 C140,110 240,118 320,118" fill="none" stroke="#dc2626" stroke-width="7"/>
<text x="60" y="108" font-size="10" fill="#991b1b">Artère splénique (tortueuse, basse résistance)</text>
<path d="M320,140 C240,142 140,138 40,150" fill="none" stroke="#7c3aed" stroke-width="9"/>
<text x="60" y="172" font-size="10" fill="#5b21b6">Veine splénique → confluent portal</text>
<circle cx="320" cy="118" r="4" fill="#dc2626"/>
<circle cx="320" cy="140" r="5" fill="#7c3aed"/>
<text x="40" y="200" font-size="9" fill="#64748b">Tronc cœliaque → artère splénique</text>
</svg>`;

const SVG_SPLEN_2 = `<svg viewBox="0 0 460 150" role="img" aria-label="Anevrisme de l'artere splenique">
<rect width="460" height="150" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Anévrisme de l'artère splénique</text>
<path d="M30,90 C120,86 160,88 195,88" fill="none" stroke="#dc2626" stroke-width="7"/>
<ellipse cx="235" cy="88" rx="40" ry="34" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>
<path d="M275,88 C320,88 380,86 430,90" fill="none" stroke="#dc2626" stroke-width="7"/>
<text x="200" y="140" font-size="10" fill="#991b1b">Dilatation sacciforme — risque de rupture (femme enceinte)</text>
</svg>`;

window.VASC.chapters.push({
  id: 'doppler-splenique', num: 62, groupe: 'Doppler viscéral', emoji: '🟣',
  titre: 'Doppler splénique',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈1 h 30',
  resume: 'Étude de l\'artère splénique (basse résistance), de la veine splénique (afférent portal), de la splénomégalie et de l\'hypertension portale segmentaire, ainsi que de l\'anévrisme de l\'artère splénique (le plus fréquent des anévrismes viscéraux) et de la thrombose de la veine splénique.',
  tags: 'rate artère splénique veine splénique splénomégalie anévrisme viscéral hypertension portale segmentaire varices gastriques thrombose',
  objectifs: [
    'Identifier l\'artère et la veine splénique au hile et reconnaître leurs profils (artère basse résistance, veine afférent portal).',
    'Mesurer la rate et reconnaître une splénomégalie et ses causes (HTP notamment).',
    'Diagnostiquer un anévrisme de l\'artère splénique et en connaître le risque (femme enceinte).',
    'Reconnaître une thrombose de la veine splénique et l\'hypertension portale segmentaire (varices gastriques).',
    'Intégrer les données spléniques au bilan d\'hypertension portale et rédiger un compte-rendu structuré.'
  ],
  anatomie: {
    texte: 'L\'artère splénique naît du tronc cœliaque, chemine de façon souvent tortueuse au bord supérieur du pancréas jusqu\'au hile splénique où elle se divise. La veine splénique chemine en arrière du corps/queue du pancréas et rejoint la veine mésentérique supérieure pour former le tronc porte : c\'est un afférent portal majeur. La rate est en position sous-phrénique gauche, abord intercostal gauche postérieur.',
    svg: SVG_SPLEN_1,
    caption: 'Schéma : artère splénique (tortueuse, basse résistance) et veine splénique (afférent portal) au hile de la rate. La veine splénique rejoint la mésentérique supérieure pour former le tronc porte.',
    vascularisation: 'Artère splénique → rate (lit de basse résistance, demande continue). Veine splénique → confluent portal : une thrombose isolée crée une HTP segmentaire (gauche), avec dérivation vers des varices gastriques.',
    rapports: ['Artère splénique au bord supérieur du pancréas (tortuosité fréquente)', 'Veine splénique en arrière du corps/queue du pancréas', 'Rate sous-phrénique gauche, en arrière de l\'estomac'],
    variantes: ['Tortuosité marquée de l\'artère splénique (sujet âgé)', 'Rate accessoire (nodule au hile)', 'Variations de division hilaire']
  },
  physiologie: {
    texte: 'L\'artère splénique alimente un organe richement vascularisé à forte demande continue → profil de BASSE RÉSISTANCE (flux antérograde permanent, diastole bien remplie, IR ≈ 0,5–0,7).\nLa veine splénique a un flux veineux continu, peu pulsatile, dirigé vers le confluent portal (afférent portal).',
    profils: [
      { nom: 'Artère splénique (normale)', desc: 'Basse résistance, diastole remplie, IR ≈ 0,5–0,7 ; tracé parfois irrégulier du fait de la tortuosité.' },
      { nom: 'Veine splénique (normale)', desc: 'Flux veineux continu vers le confluent portal, légère modulation respiratoire.' },
      { nom: 'HTP : veine splénique dilatée', desc: 'Dilatation et ralentissement, parfois inversion ; splénomégalie congestive.' },
      { nom: 'Thrombose veineuse splénique', desc: 'Absence de flux veineux splénique → HTP segmentaire gauche, varices gastriques de dérivation.' }
    ]
  },
  physique: {
    intro: 'La rate est un excellent fenêtre acoustique, mais l\'artère splénique tortueuse complique la correction d\'angle.',
    points: [
      { titre: 'Sonde & fenêtre', desc: 'Convexe 2–5 MHz, abord intercostal gauche postérieur, patient en décubitus latéral droit ; la rate sert de fenêtre pour le hile.' },
      { titre: 'Angle sur artère tortueuse', desc: 'L\'artère splénique est sinueuse : l\'angle varie le long du trajet → choisir un segment rectiligne pour la correction ≤ 60° (sinon faux aliasing/fausse accélération de tortuosité).' },
      { titre: 'PRF & filtre bas (veine)', desc: 'La veine splénique a un flux lent : baisser PRF et filtre pour la détecter et juger du sens ; ne pas conclure trop vite à une thrombose.' },
      { titre: 'Doppler énergie', desc: 'Utile pour confirmer la perméabilité veineuse splénique (flux lent) et pour la vascularisation parenchymateuse (infarctus).' },
      { titre: 'Mesure de la rate', desc: 'Plus grand diamètre bipolaire ; splénomégalie au-delà de ≈ 12–13 cm (à corréler au gabarit).' }
    ]
  },
  reglages: {
    intro: 'Réglages Doppler splénique types.',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Abord intercostal gauche' },
      { param: 'Position', valeur: 'Décubitus latéral droit', note: 'Dégage la rate' },
      { param: 'Angle pulsé', valeur: '≤ 60° sur segment rectiligne', note: 'Artère tortueuse = piège d\'angle' },
      { param: 'PRF', valeur: 'Basse pour la veine', note: 'Trop haute = fausse thrombose' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Détecter le flux veineux lent' },
      { param: 'Porte', valeur: '⅓ lumière, centrée', note: 'Au hile' },
      { param: 'Énergie', valeur: 'Si flux ambigu / infarctus', note: 'Perméabilité + parenchyme' }
    ]
  },
  installation: {
    patient: 'Décubitus latéral droit (ou dorsal), bras gauche relevé ; à jeun pour le contexte d\'HTP. L\'apnée en inspiration abaisse la rate sous les côtes.',
    operateur: 'Du côté droit ou à la tête, avant-bras en appui.',
    ecran: 'Dans l\'axe du regard, lumière tamisée.',
    sonde: 'Convexe en intercostal gauche postérieur, en utilisant la rate comme fenêtre acoustique vers le hile.',
    ergonomie: 'Adapter l\'espace intercostal à la respiration ; éviter l\'appui prolongé.'
  },
  acquisition: {
    etapes: [
      { titre: 'Mesure de la rate', desc: 'Mesurer le plus grand axe bipolaire ; rechercher une splénomégalie (> ≈ 12–13 cm).' },
      { titre: 'Hile splénique', desc: 'Repérer en couleur l\'artère et la veine au hile ; différencier (artère pulsatile, veine continue).' },
      { titre: 'Artère splénique', desc: 'Sur un segment rectiligne, porte centrée, angle ≤ 60°, mesurer le profil (basse résistance, IR) ; rechercher une dilatation anévrismale sur le trajet.' },
      { titre: 'Veine splénique', desc: 'Vérifier perméabilité, sens (vers le confluent portal), diamètre ; chercher une thrombose et des varices gastriques de dérivation.' },
      { titre: 'Intégration HTP', desc: 'Coupler aux données portales (chapitre 61) : splénomégalie, dérivations, sens des flux.' }
    ],
    reperes: ['Hile splénique (artère + veine)', 'Artère au bord supérieur du pancréas', 'Veine splénique en arrière du pancréas vers le confluent portal'],
    astuces: ['Utiliser la rate comme fenêtre pour le hile.', 'Choisir un segment artériel rectiligne pour l\'angle (tortuosité).', 'Baisser PRF/filtre pour la veine avant de conclure à une thrombose.', 'En cas d\'anévrisme, mesurer le diamètre maximal et rechercher un thrombus pariétal.'],
    erreurs: ['Angle pris sur un segment tortueux → fausse accélération/aliasing.', 'PRF/filtre trop hauts → fausse thrombose veineuse.', 'Confondre une boucle artérielle tortueuse et un anévrisme.', 'Oublier les varices gastriques en cas de thrombose veineuse splénique.']
  },
  interpretation: {
    texte: 'Lire la rate (taille), l\'artère (résistance, anévrisme) et la veine (perméabilité, sens) ensemble.',
    normal: ['Rate de taille normale (< ≈ 12–13 cm)', 'Artère splénique : basse résistance, IR ≈ 0,5–0,7', 'Veine splénique perméable, flux continu vers le confluent portal', 'Pas d\'anévrisme ni de varice'],
    pathologique: ['Splénomégalie (congestive si HTP)', 'Dilatation sacciforme de l\'artère splénique = anévrisme (le plus fréquent des anévrismes viscéraux)', 'Absence de flux veineux splénique = thrombose → HTP segmentaire, varices gastriques', 'Veine splénique dilatée / ralentie = HTP', 'Zone parenchymateuse avasculaire = infarctus splénique'],
    svgPatho: SVG_SPLEN_2,
    capPatho: 'Anévrisme de l\'artère splénique : dilatation sacciforme sur le trajet artériel, à risque de rupture (notamment chez la femme enceinte).'
  },
  valeurs: {
    intro: 'Valeurs de référence du Doppler splénique (à adapter au laboratoire et au gabarit).',
    lignes: [
      { param: 'Taille de la rate (normale)', valeur: '< ≈ 12–13 cm (grand axe)', note: 'Au-delà = splénomégalie' },
      { param: 'IR artère splénique', valeur: '≈ 0,5–0,7', note: 'Profil de basse résistance' },
      { param: 'Veine splénique (sens)', valeur: 'Vers le confluent portal', note: 'Inversion / dilatation = HTP' },
      { param: 'Anévrisme artère splénique', valeur: 'Dilatation focale (> ≈ 2 cm)', note: 'Le plus fréquent des anévrismes viscéraux' },
      { param: 'Risque de rupture d\'anévrisme', valeur: 'Majoré chez la femme enceinte', note: 'Indication opératoire plus large dans ce contexte' },
      { param: 'Thrombose veine splénique', valeur: 'Absence de flux veineux', note: 'HTP segmentaire gauche + varices gastriques' }
    ]
  },
  pathologies: [
    { nom: 'Anévrisme de l\'artère splénique', physiopath: 'Dilatation focale de l\'artère splénique (le plus fréquent des anévrismes viscéraux) ; favorisé par la multiparité, l\'HTP, la dysplasie', bmode: 'Dilatation sacciforme/fusiforme sur le trajet, ± calcifications pariétales, ± thrombus pariétal', doppler: 'Flux tourbillonnaire (yin-yang) dans le sac, flux artériel afférent/efférent', ddx: 'Boucle/tortuosité artérielle, kyste, pseudo-kyste pancréatique', pieges: 'Confondre une boucle tortueuse et un anévrisme (Doppler tranche)', gravite: 'Risque de rupture (catastrophique chez la femme enceinte)', cat: 'Confirmer/mesurer (angio-TDM), avis chirurgical/embolisation selon taille et terrain (grossesse)' },
    { nom: 'Thrombose de la veine splénique', physiopath: 'Thrombose veineuse splénique (pancréatite, cancer du pancréas, post-chirurgie) → hypertension portale segmentaire (« gauche »)', bmode: 'Veine splénique comblée/non visible, splénomégalie, varices au hile et péri-gastriques', doppler: 'Absence de flux veineux splénique, dérivation vers des varices gastriques (collatérales)', ddx: 'PRF/filtre trop hauts, compression extrinsèque', pieges: 'Méconnaître les varices gastriques (risque hémorragique)', gravite: 'Risque hémorragique digestif (varices gastriques)', cat: 'Imagerie en coupe, rechercher la cause pancréatique, avis spécialisé' },
    { nom: 'Splénomégalie congestive (HTP)', physiopath: 'Stase splénique secondaire à l\'hypertension portale', bmode: 'Rate augmentée (> ≈ 12–13 cm), parfois homogène', doppler: 'Veine splénique dilatée/ralentie, signes portaux associés', ddx: 'Splénomégalie hématologique/infectieuse', pieges: 'Attribuer toute splénomégalie à l\'HTP', gravite: 'Reflète l\'HTP sous-jacente', cat: 'Bilan d\'HTP (chapitres portal/hépatique), corréler à la cause' },
    { nom: 'Infarctus splénique', physiopath: 'Occlusion d\'une branche artérielle splénique (embolie, thrombose, drépanocytose)', bmode: 'Zone parenchymateuse hypoéchogène, souvent triangulaire à base périphérique', doppler: 'Absence de vascularisation dans la zone (couleur + énergie)', ddx: 'Tumeur, abcès, contusion', pieges: 'Petits infarctus difficiles à voir sans énergie', gravite: 'Selon étiologie et étendue', cat: 'Énergie pour confirmer l\'avascularité, rechercher la cause embolique' }
  ],
  algorithme: {
    titre: 'Conduite devant une anomalie splénique au Doppler',
    noeuds: [
      { q: 'Dilatation focale sur le trajet artériel ?', a: 'Doppler : flux tourbillonnaire = anévrisme → angio-TDM, avis (urgent si grossesse)' },
      { q: 'Absence de flux veineux splénique ?', a: 'Baisser PRF/filtre + énergie ; si confirmée : thrombose → chercher varices gastriques et cause pancréatique' },
      { q: 'Rate augmentée + signes portaux ?', a: 'Splénomégalie congestive → bilan d\'HTP' },
      { q: 'Zone parenchymateuse avasculaire ?', a: 'Infarctus splénique → confirmer en énergie, rechercher l\'embolie' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER SPLÉNIQUE

Indication : [bilan HTP / douleur HCG / suivi].
Technique : sonde convexe, abord intercostal gauche, mode B + Doppler couleur et pulsé.

Rate de taille normale (__ cm), échostructure homogène.
Artère splénique : perméable, profil de basse résistance, IR __ , sans dilatation anévrismale.
Veine splénique : perméable, flux continu dirigé vers le confluent portal.
Pas de varice ni d'infarctus.

CONCLUSION : Doppler splénique normal. Pas d'anévrisme, pas de thrombose veineuse, pas de splénomégalie.`,
    pathologique: `ÉCHO-DOPPLER SPLÉNIQUE

Indication : [HTP / pancréatite / douleur / grossesse].
Technique : sonde convexe, abord intercostal gauche, mode B + Doppler couleur et pulsé.

Rate : [splénomégalie __ cm].
Artère splénique : [anévrisme __ mm avec flux tourbillonnaire / thrombus pariétal __].
Veine splénique : [absence de flux = thrombose ; varices gastriques de dérivation / dilatée, ralentie].
[Infarctus splénique : zone avasculaire __].

CONCLUSION : [Anévrisme de l'artère splénique (risque accru si grossesse) / Thrombose de la veine splénique avec HTP segmentaire et varices gastriques / Splénomégalie congestive / Infarctus splénique].
[Proposition : angio-TDM, avis chirurgical/radiologie interventionnelle, recherche étiologique pancréatique.]`
  },
  cas: [
    { titre: 'Dilatation au hile', enonce: 'Femme de 40 ans, multipare ; vous découvrez une structure arrondie de 25 mm sur le trajet de l\'artère splénique, avec un flux tourbillonnaire en couleur.', questions: ['Diagnostic ?', 'Pourquoi le terrain compte-t-il ?'], indices: ['Flux yin-yang', 'Grossesse'], reponse: 'Anévrisme de l\'artère splénique (le plus fréquent des anévrismes viscéraux). Le risque de rupture est majoré chez la femme enceinte → indication opératoire/embolisation plus large dans ce contexte ; confirmer par angio-TDM.' },
    { titre: 'Boucle ou anévrisme ?', enonce: 'Sur l\'artère splénique tortueuse, une image arrondie fait évoquer un anévrisme.', questions: ['Comment trancher ?'], reponse: 'Le Doppler couleur : une boucle/tortuosité montre un flux artériel canalisé qui « entre et sort » en suivant le trajet, alors qu\'un anévrisme montre un flux tourbillonnaire (yin-yang) dans un sac dilaté. En cas de doute, angio-TDM.' },
    { titre: 'Pas de flux veineux', enonce: 'Antécédent de pancréatite ; la veine splénique ne montre aucun flux et l\'on voit des varices au hile et autour de l\'estomac.', questions: ['Diagnostic ?', 'Quel risque ?'], reponse: 'Thrombose de la veine splénique responsable d\'une hypertension portale segmentaire (gauche) avec varices gastriques de dérivation — risque d\'hémorragie digestive. Rechercher la cause pancréatique, avis spécialisé.' },
    { titre: 'Grosse rate', enonce: 'Rate à 16 cm avec veine splénique dilatée et signes portaux associés.', questions: ['Cause la plus probable ?'], reponse: 'Splénomégalie congestive sur hypertension portale. Compléter le bilan d\'HTP (Doppler portal et hépatique) ; ne pas oublier les causes hématologiques si le contexte diffère.' },
    { titre: 'Zone triangulaire', enonce: 'Douleur de l\'hypochondre gauche ; zone parenchymateuse splénique triangulaire hypoéchogène à base périphérique, sans vascularisation en énergie.', questions: ['Diagnostic ?', 'Étiologie à rechercher ?'], reponse: 'Infarctus splénique (territoire avasculaire à base périphérique). Rechercher une cause embolique (fibrillation atriale, endocardite) ou une thrombophilie/drépanocytose.' },
    { titre: 'Faux thrombus veineux', enonce: 'Aucun flux dans la veine splénique ; PRF et filtre sont réglés haut.', questions: ['Que faites-vous avant de conclure ?'], reponse: 'Baisser PRF et filtre mural, utiliser le Doppler énergie : la veine splénique a un flux lent qui peut disparaître avec des réglages inadaptés.' },
    { titre: 'Angle sur tortuosité', enonce: 'Vous mesurez une vitesse « élevée » avec aliasing sur l\'artère splénique, mais la porte est placée sur un segment très sinueux.', questions: ['La mesure est-elle fiable ?'], reponse: 'Non : sur un segment tortueux, l\'angle réel est imprévisible et l\'aliasing peut être artéfactuel. Reprendre sur un segment rectiligne, angle ≤ 60°.' },
    { titre: 'Thrombus dans l\'anévrisme', enonce: 'Anévrisme splénique de 30 mm avec un matériel hypoéchogène périphérique dans le sac.', questions: ['De quoi s\'agit-il ?'], reponse: 'Thrombus pariétal (mural) dans le sac anévrismal : la lumière circulante (yin-yang) est réduite. Le mesurer et l\'intégrer au risque ; angio-TDM pour le bilan.' },
    { titre: 'Rate accessoire', enonce: 'Nodule arrondi de 12 mm au hile splénique, d\'échostructure identique à la rate et vascularisé.', questions: ['Diagnostic ?'], reponse: 'Rate accessoire (splénule) : structure normale au hile, à ne pas confondre avec une adénopathie ou une masse. Échostructure et vascularisation identiques à la rate.' },
    { titre: 'HTP segmentaire isolée', enonce: 'Varices gastriques isolées sans varices œsophagiennes, foie normal, veine splénique thrombosée.', questions: ['Comment l\'expliquer ?'], reponse: 'Hypertension portale segmentaire (« gauche ») par thrombose isolée de la veine splénique : le sang splénique se dérive vers des varices gastriques, sans HTP globale (foie normal). Cause souvent pancréatique.' }
  ],
  pieges: [
    'Prendre une boucle/tortuosité artérielle pour un anévrisme (le Doppler tranche : yin-yang vs flux canalisé).',
    'Angle pris sur un segment artériel tortueux → fausse accélération/aliasing.',
    'PRF / filtre trop hauts → fausse thrombose de la veine splénique (flux lent).',
    'Oublier les varices gastriques en cas de thrombose veineuse splénique (risque hémorragique).',
    'Attribuer toute splénomégalie à l\'HTP (penser aux causes hématologiques/infectieuses).',
    'Méconnaître un petit infarctus sans Doppler énergie.',
    'Sous-estimer le risque d\'un anévrisme splénique chez la femme enceinte.'
  ],
  flashcards: [
    { q: 'Profil normal de l\'artère splénique ?', r: 'Basse résistance (diastole remplie, IR ≈ 0,5–0,7).' },
    { q: 'Quel est le plus fréquent des anévrismes viscéraux ?', r: 'L\'anévrisme de l\'artère splénique.' },
    { q: 'Pourquoi l\'anévrisme splénique est-il préoccupant chez la femme enceinte ?', r: 'Risque accru de rupture (catastrophique) → indication thérapeutique plus large.' },
    { q: 'Conséquence d\'une thrombose isolée de la veine splénique ?', r: 'Hypertension portale segmentaire (gauche) avec varices gastriques de dérivation.' },
    { q: 'Comment distinguer un anévrisme d\'une boucle artérielle splénique ?', r: 'Doppler couleur : flux tourbillonnaire (yin-yang) dans un sac = anévrisme ; flux canalisé suivant le trajet = tortuosité.' }
  ],
  qcm: [
    { q: 'Le plus fréquent des anévrismes artériels viscéraux est celui de :', options: ['L\'artère hépatique', 'L\'artère splénique', 'L\'artère mésentérique supérieure', 'L\'artère rénale'], correct: 1, exp: 'L\'anévrisme de l\'artère splénique est le plus fréquent des anévrismes viscéraux ; risque de rupture notamment chez la femme enceinte.' },
    { q: 'Une thrombose isolée de la veine splénique entraîne typiquement :', options: ['Des varices œsophagiennes pures', 'Une hypertension portale segmentaire avec varices gastriques', 'Un Budd-Chiari', 'Un cavernome portal'], correct: 1, exp: 'La thrombose splénique isolée crée une HTP « gauche » segmentaire drainée par des varices gastriques.' },
    { q: 'Le profil normal de l\'artère splénique est :', options: ['Haute résistance (triphasique)', 'Basse résistance', 'Démodulé', 'Parvus-tardus'], correct: 1, exp: 'La rate est un lit de basse résistance : diastole bien remplie, IR ≈ 0,5–0,7.' },
    { q: 'Devant une absence de flux dans la veine splénique avec PRF élevée, il faut d\'abord :', options: ['Conclure à une thrombose', 'Baisser PRF/filtre + énergie', 'Augmenter l\'angle', 'Mesurer la rate'], correct: 1, exp: 'Le flux veineux splénique est lent : optimiser les réglages avant de conclure à une thrombose.' }
  ],
  refs: ['DIU Montpellier (Doppler abdominal) ; SFMV ; WFUMB/EFSUMB guidelines on abdominal Doppler ; recommandations sur les anévrismes viscéraux et l\'hypertension portale (Baveno).']
});

})();
