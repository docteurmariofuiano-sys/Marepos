/* ÉCHO-VASC DIU — Aorte abdominale & artères iliaques */
window.VASC = window.VASC || { chapters: [] };

(function () {

const SVG_AORTE_1 = `<svg viewBox="0 0 460 260" role="img" aria-label="Anatomie de l'aorte abdominale et de ses branches">
<rect width="460" height="260" fill="#fff"/>
<path d="M210,10 L210,200" stroke="#dc2626" stroke-width="20" fill="none"/>
<text x="120" y="20" font-size="11" fill="#991b1b">Aorte sous-diaphragmatique</text>
<path d="M210,55 q-40,-6 -80,-2" stroke="#f59e0b" stroke-width="7" fill="none"/>
<text x="40" y="50" font-size="10" fill="#b45309">Tronc cœliaque</text>
<path d="M210,80 q-50,6 -90,18" stroke="#f59e0b" stroke-width="7" fill="none"/>
<text x="30" y="92" font-size="10" fill="#b45309">AMS (a. mésent. sup.)</text>
<path d="M210,105 q-55,4 -100,2" stroke="#0d9488" stroke-width="6" fill="none"/>
<path d="M210,105 q55,4 100,2" stroke="#0d9488" stroke-width="6" fill="none"/>
<text x="10" y="118" font-size="10" fill="#0f766e">A. rénale G</text>
<text x="330" y="118" font-size="10" fill="#0f766e">A. rénale D</text>
<path d="M210,150 q40,8 80,16" stroke="#f59e0b" stroke-width="5" fill="none"/>
<text x="300" y="170" font-size="10" fill="#b45309">AMI</text>
<text x="220" y="190" font-size="10" fill="#991b1b">Bifurcation (L4)</text>
<path d="M210,200 L160,250" stroke="#dc2626" stroke-width="13" fill="none"/>
<path d="M210,200 L260,250" stroke="#dc2626" stroke-width="13" fill="none"/>
<text x="120" y="250" font-size="10" fill="#991b1b">A. iliaque primitive G</text>
<text x="265" y="250" font-size="10" fill="#991b1b">D</text>
<rect x="240" y="40" width="22" height="160" rx="10" fill="#bfdbfe" stroke="#2563eb"/>
<text x="266" y="130" font-size="10" fill="#1d4ed8">VCI (à droite,</text>
<text x="266" y="144" font-size="10" fill="#1d4ed8">compressible,</text>
<text x="266" y="158" font-size="10" fill="#1d4ed8">ovalaire)</text>
</svg>`;

const SVG_AORTE_2 = `<svg viewBox="0 0 460 220" role="img" aria-label="Mesure du diamètre aortique et anévrisme">
<rect width="460" height="220" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Coupe transverse — mesure paroi externe à paroi externe</text>
<circle cx="120" cy="110" r="40" fill="#fde2e2" stroke="#dc2626" stroke-width="3"/>
<line x1="80" y1="110" x2="160" y2="110" stroke="#111" stroke-dasharray="3 2"/>
<text x="92" y="105" font-size="10" fill="#111">AP (antéro-post.)</text>
<text x="70" y="170" font-size="10" fill="#0b2f63">Normal &lt; 30 mm</text>
<text x="280" y="16" font-size="11" font-weight="bold" fill="#991b1b">Anévrisme fusiforme + thrombus mural</text>
<ellipse cx="350" cy="115" rx="70" ry="55" fill="#fde2e2" stroke="#dc2626" stroke-width="3"/>
<ellipse cx="350" cy="115" rx="38" ry="28" fill="#fbcfe8" stroke="#9d174d" stroke-dasharray="3 2"/>
<path d="M312,115 a38,28 0 0 1 76,0 a70,55 0 0 0 -76,0" fill="#cbd5e1" opacity="0.7"/>
<text x="300" y="118" font-size="10" fill="#0f172a">lumière</text>
<text x="290" y="185" font-size="10" fill="#991b1b">≥ 30 mm = AAA ; thrombus en croissant</text>
</svg>`;

const SVG_ILIAQUES = `<svg viewBox="0 0 460 230" role="img" aria-label="Anatomie des artères iliaques">
<rect width="460" height="230" fill="#fff"/>
<text x="160" y="18" font-size="11" font-weight="bold" fill="#0b2f63">Carrefour aorto-iliaque</text>
<path d="M230,25 L230,60" stroke="#dc2626" stroke-width="16" fill="none"/>
<text x="240" y="40" font-size="10" fill="#991b1b">Aorte</text>
<path d="M230,60 L150,120" stroke="#dc2626" stroke-width="12" fill="none"/>
<path d="M230,60 L310,120" stroke="#dc2626" stroke-width="12" fill="none"/>
<text x="60" y="105" font-size="10" fill="#991b1b">Iliaque primitive G</text>
<path d="M150,120 L110,180" stroke="#dc2626" stroke-width="10" fill="none"/>
<text x="20" y="175" font-size="10" fill="#991b1b">Iliaque externe</text>
<path d="M150,120 L185,165" stroke="#f59e0b" stroke-width="7" fill="none"/>
<text x="185" y="160" font-size="10" fill="#b45309">Iliaque interne (hypogastrique)</text>
<path d="M110,180 L95,215" stroke="#dc2626" stroke-width="9" fill="none"/>
<text x="30" y="212" font-size="10" fill="#991b1b">→ fémorale commune</text>
<path d="M310,120 L350,180" stroke="#dc2626" stroke-width="10" fill="none"/>
<text x="330" y="205" font-size="10" fill="#991b1b">externe D → fémorale</text>
</svg>`;

const SVG_TRIPHASIQUE = `<svg viewBox="0 0 460 200" role="img" aria-label="Spectres iliaques normal et pathologique">
<rect width="460" height="200" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Iliaque normale : triphasique (haute résistance)</text>
<line x1="20" y1="60" x2="220" y2="60" stroke="#cbd5e1"/>
<path d="M20,60 L40,22 L60,60 L70,74 L82,60 L102,52 L122,60 L142,22 L162,60 L172,74 L184,60" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="8" y="118" font-size="11" font-weight="bold" fill="#0b2f63">Sténose serrée : aliasing + élargissement</text>
<line x1="20" y1="160" x2="220" y2="160" stroke="#cbd5e1"/>
<path d="M20,160 L40,98 L70,160 M70,160 L92,98 L122,160" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="250" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Aval (fémorale commune) : parvus-tardus</text>
<line x1="250" y1="70" x2="450" y2="70" stroke="#cbd5e1"/>
<path d="M250,70 C290,48 320,46 360,50 C400,54 420,66 450,68" fill="none" stroke="#d97706" stroke-width="1.8"/>
<text x="250" y="118" font-size="11" font-weight="bold" fill="#0b2f63">Anévrisme iliaque (≥ 25–30 mm)</text>
<line x1="250" y1="160" x2="450" y2="160" stroke="#cbd5e1"/>
<ellipse cx="350" cy="158" rx="55" ry="22" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
</svg>`;

/* ============================ CHAPITRE 1 : AORTE ABDOMINALE ============================ */
window.VASC.chapters.push({
  id: 'aorte', num: 20, groupe: 'Artériel — Aorte & branches', emoji: '🫀',
  titre: 'Aorte abdominale',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈2 h',
  resume: 'Exploration de l\'aorte abdominale sous-diaphragmatique : dépistage et surveillance de l\'anévrisme (AAA), mesure rigoureuse du diamètre, recherche de thrombus mural, de rupture/fissuration et de dissection. Examen de dépistage simple, rapide et à fort enjeu vital.',
  tags: 'aorte abdominale anévrisme AAA diamètre antéro-postérieur thrombus rupture dissection tronc cœliaque AMS rénales AMI bifurcation L4 VCI dépistage',
  objectifs: [
    'Identifier l\'aorte abdominale sous-diaphragmatique, ses collatérales (tronc cœliaque, AMS, rénales, AMI) et la bifurcation à L4, et la différencier de la VCI.',
    'Mesurer le diamètre aortique de façon reproductible : antéro-postérieur, paroi externe à paroi externe, en coupe transverse strictement perpendiculaire.',
    'Définir l\'anévrisme de l\'aorte abdominale (≥ 30 mm ou > 1,5× le segment sus-jacent) et distinguer formes fusiforme et sacculaire.',
    'Énoncer les seuils de surveillance et de prise en charge chirurgicale (≈ 50 mm femme / 55 mm homme, croissance > 10 mm/an).',
    'Reconnaître le thrombus mural, l\'anévrisme rompu/fissuré (urgence vitale) et la dissection aortique (flap, vraie/fausse lumière).',
    'Rédiger un compte-rendu aortique standardisé et organiser la surveillance selon le diamètre.'
  ],
  anatomie: {
    texte: 'L\'aorte abdominale fait suite à l\'aorte thoracique en franchissant le hiatus diaphragmatique (T12). Elle descend en avant et légèrement à gauche du rachis, jusqu\'à sa bifurcation en deux artères iliaques primitives au niveau de L4 (à hauteur de l\'ombilic). Elle se rétrécit progressivement de haut en bas (effilement physiologique) : son diamètre normal diminue du segment cœliaque vers la bifurcation. Ses collatérales antérieures et latérales sont des repères essentiels : tronc cœliaque (premier, antérieur, donnant le « signe de la mouette »), artère mésentérique supérieure (AMS, antérieure, parallèle à l\'aorte), artères rénales (latérales, ~L1-L2), puis artère mésentérique inférieure (AMI, antéro-gauche, plus bas).',
    svg: SVG_AORTE_1,
    caption: 'Schéma : aorte sous-diaphragmatique et ses branches (tronc cœliaque, AMS, rénales, AMI), bifurcation à L4. La VCI chemine à droite de l\'aorte : ovalaire, à parois fines, compressible, à flux respiro-dépendant.',
    vascularisation: 'L\'aorte vascularise les viscères abdominaux (tronc cœliaque → foie/rate/estomac ; AMS et AMI → intestin ; rénales → reins) et, via les iliaques, le pelvis et les membres inférieurs.',
    rapports: [
      'VCI à DROITE de l\'aorte : structure ovalaire, à parois fines, compressible, calibre variable avec la respiration (à ne pas confondre avec l\'aorte, ronde, pulsatile et non compressible).',
      'Rachis lombaire en arrière (repère acoustique constant : « mur » hyperéchogène avec cône d\'ombre).',
      'En avant : lobe gauche du foie (fenêtre acoustique), estomac et anses digestives (gaz gênants), pancréas, veine splénique.',
      'Piliers du diaphragme à l\'origine ; chaîne ganglionnaire para-aortique.'
    ],
    variantes: [
      'Aorte tortueuse/déroulée du sujet âgé ou hypertendu (gêne la coupe perpendiculaire → risque de surestimation).',
      'Variantes des artères rénales (artères polaires multiples) — utile pour le bilan pré-thérapeutique.',
      'Aorte calcifiée (cône d\'ombre pariétal) gênant la mesure de la paroi externe.'
    ]
  },
  physiologie: {
    texte: 'L\'aorte est une artère élastique conductrice : elle amortit l\'onde de pouls (fonction Windkessel) et présente un flux pulsatile à composante systolique nette. En amont des collatérales viscérales à basse résistance (rénales, post-prandial digestif), le profil est plutôt monophasique à diastole remplie ; sous les rénales (aorte sous-rénale, qui alimente surtout les membres inférieurs à jeun) le profil devient plus résistif, voire triphasique. Le diamètre aortique augmente lentement avec l\'âge, la taille, le sexe masculin et la pression artérielle.',
    profils: [
      { nom: 'Aorte sus-rénale / cœliaque', desc: 'Profil à composante diastolique présente (lits viscéraux de basse résistance en aval), monophasique à modérément résistif.' },
      { nom: 'Aorte sous-rénale', desc: 'Profil plus résistif (alimente les MI) ; tend vers le triphasique chez le sujet sans AOMI, à jeun.' },
      { nom: 'Aorte anévrismale', desc: 'Flux tourbillonnaire/ralenti dans le sac, parfois aspect « yin-yang » au sein d\'un anévrisme sacculaire ; thrombus mural laminaire.' }
    ]
  },
  physique: {
    intro: 'Territoire PROFOND : la basse fréquence et l\'optimisation de la pénétration priment, l\'harmonique et le balayage patient sont déterminants.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Convexe 2–5 MHz : compromis pénétration/résolution pour atteindre l\'aorte (souvent 6–12 cm de profondeur). Descendre en fréquence sur les patients corpulents.' },
      { titre: 'Imagerie harmonique', desc: 'THI ON chez le patient difficile : réduit le bruit de champ proche et les artefacts de réverbération liés aux gaz, améliore le contraste paroi/lumière.', svg: SVG_AORTE_2 },
      { titre: 'Plan de mesure', desc: 'La mesure du diamètre doit être faite en coupe TRANSVERSE strictement perpendiculaire à l\'axe du vaisseau. Une coupe oblique « coupe » une ellipse et SURESTIME le diamètre (piège majeur de l\'aorte tortueuse).' },
      { titre: 'Convention de mesure', desc: 'Diamètre antéro-postérieur, de paroi externe à paroi externe (outer-to-outer). C\'est la convention la plus reproductible pour le dépistage et la surveillance de l\'AAA.' }
    ]
  },
  reglages: {
    intro: 'Réglages aortiques types (sonde convexe abdominale).',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Basse fréquence pour la profondeur' },
      { param: 'Profondeur', valeur: 'Aorte au centre, rachis visible', note: 'Souvent 8–14 cm' },
      { param: 'Focale', valeur: 'Au niveau de l\'aorte', note: 'Améliore la résolution latérale du diamètre' },
      { param: 'Harmonique', valeur: 'ON si patient difficile', note: 'Réduit le bruit lié aux gaz' },
      { param: 'Gain', valeur: 'Lumière bien noire', note: 'Trop = faux thrombus' },
      { param: 'PRF couleur', valeur: 'Adaptée au flux aortique', note: 'Repérer flux résiduel dans le sac' },
      { param: 'Compound', valeur: 'Modéré', note: 'Lisse la paroi sans masquer le calcium' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, abdomen découvert, à jeun si possible (≥ 6 h) pour limiter les gaz digestifs. Décubitus latéral gauche utile pour contourner les gaz.',
    operateur: 'Assis ou debout au côté droit du patient, avant-bras en appui, autre main sur les molettes (profondeur, gain, PRF).',
    ecran: 'Dans l\'axe du regard ; convention abdominale (tête du patient à gauche de l\'écran en coupe sagittale).',
    sonde: 'Convexe, balayage transverse de l\'épigastre à l\'ombilic, puis bascule sagittale pour la longueur et l\'effilement.',
    ergonomie: 'Compression douce et progressive pour refouler les gaz ; demander une apnée en inspiration ou expiration selon le segment ; profiter du lobe gauche du foie comme fenêtre.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérage transverse haut', desc: 'Sonde transverse en épigastre : repérer l\'aorte (ronde, pulsatile, à gauche, antérieure au rachis) et la VCI (ovalaire, à droite, compressible). Identifier le tronc cœliaque (signe de la mouette) et l\'AMS.' },
      { titre: 'Descente segmentaire', desc: 'Suivre l\'aorte vers le bas : segment cœliaque, inter-rénal, sous-rénal, jusqu\'à la bifurcation (L4). Repérer le calibre maximal.' },
      { titre: 'Mesure transverse du diamètre', desc: 'En coupe perpendiculaire, mesurer le diamètre antéro-postérieur, paroi externe à paroi externe, au point le plus large. Noter le siège (sous-rénal le plus souvent).' },
      { titre: 'Contrôle sagittal', desc: 'Bascule longitudinale : confirmer le diamètre AP, apprécier la longueur, l\'effilement, le collet d\'un éventuel anévrisme et le thrombus mural.' },
      { titre: 'Couleur / pulsé', desc: 'Couleur pour le flux résiduel dans le sac et le thrombus laminaire ; pulsé pour le profil et la recherche de dissection (flap, deux lumières).' },
      { titre: 'Extension iliaque', desc: 'Compléter systématiquement par les iliaques (anévrisme iliaque associé fréquent) — voir chapitre dédié.' }
    ],
    reperes: ['Aorte = ronde, pulsatile, antérieure et à gauche du rachis, NON compressible', 'VCI = ovalaire, à droite, compressible, respiro-dépendante', 'Signe de la mouette (tronc cœliaque), AMS parallèle à l\'aorte', 'Bifurcation à L4, en regard de l\'ombilic'],
    astuces: ['Mesurer toujours perpendiculairement à l\'axe pour éviter la surestimation des aortes tortueuses.', 'Compression progressive + décubitus latéral pour chasser les gaz.', 'Comparer la mesure transverse et sagittale (cohérence du diamètre AP).', 'Repérer le calibre maximal en balayant TOUTE la longueur avant de mesurer.'],
    erreurs: ['Mesurer en coupe oblique → surestimation du diamètre.', 'Mesurer paroi interne à interne ou inclure le thrombus de façon incohérente → discordance dans le suivi.', 'Confondre aorte et VCI (test de compression + pulsatilité).', 'Conclure « aorte normale » sans avoir vu la bifurcation (l\'AAA est sous-rénal dans > 90 % des cas).']
  },
  interpretation: {
    normal: ['Aorte de calibre régulier, s\'effilant de haut en bas, paroi fine', 'Diamètre AP < 30 mm (souvent < 25 mm en sous-rénal)', 'Lumière anéchogène, flux pulsatile, pas de thrombus', 'Branches viscérales perméables'],
    pathologique: ['Dilatation focale ≥ 30 mm ou > 1,5× le segment sus-jacent = anévrisme', 'Thrombus mural en croissant tapissant le sac', 'Aspect fusiforme (dilatation circonférentielle) ou sacculaire (poche latérale)', 'Flap intimal mobile + double lumière = dissection', 'Contour aortique flou + hématome péri-aortique/rétropéritonéal = rupture/fissuration (URGENCE)'],
    svgPatho: SVG_AORTE_2,
    capPatho: 'Mesure paroi externe à paroi externe ; anévrisme fusiforme avec thrombus mural en croissant et lumière circulante centrale.'
  },
  valeurs: {
    intro: 'Diamètres et seuils de référence (dépistage et surveillance de l\'AAA — adapter au sexe et au contexte). Convention : diamètre antéro-postérieur, paroi externe à paroi externe.',
    lignes: [
      { param: 'Aorte normale (sous-rénale)', valeur: '< 30 mm (souvent 15–25 mm)', note: 'S\'effile de haut en bas' },
      { param: 'Ectasie', valeur: '25–29 mm', note: 'Dilatation infra-anévrismale, à surveiller' },
      { param: 'Anévrisme (AAA)', valeur: '≥ 30 mm OU > 1,5× segment sus-jacent', note: 'Définition consensuelle' },
      { param: 'Surveillance 30–39 mm', valeur: 'Contrôle ~ tous les 2–3 ans', note: 'Croissance lente' },
      { param: 'Surveillance 40–49 mm', valeur: 'Contrôle ~ tous les 6–12 mois', note: 'Rythme selon diamètre/croissance' },
      { param: 'Seuil chirurgical', valeur: '≈ 55 mm (homme) / 50 mm (femme)', note: 'Ou croissance > 10 mm/an, ou symptomatique' },
      { param: 'Croissance rapide', valeur: '> 10 mm/an', note: 'Indication d\'intervention quel que soit le diamètre' },
      { param: 'Reproductibilité inter-observateur', valeur: '± 3–5 mm', note: 'Mesurer toujours de la même façon dans le suivi' }
    ]
  },
  pathologies: [
    { nom: 'Anévrisme de l\'aorte abdominale (AAA)', physiopath: 'Dégénérescence pariétale (athérome, élastolyse) → dilatation, le plus souvent fusiforme et sous-rénale ; FRCV : tabac, homme, âge > 65 ans, ATCD familiaux, HTA.', bmode: 'Dilatation focale ≥ 30 mm, paroi externe à paroi externe ; thrombus mural en croissant fréquent.', doppler: 'Flux tourbillonnaire/ralenti dans le sac ; lumière circulante au sein du thrombus.', ddx: 'Aorte tortueuse mesurée en oblique (fausse dilatation), masse péri-aortique, adénopathie.', pieges: 'Surestimation en coupe oblique ; oublier de descendre jusqu\'à la bifurcation ; ne pas mesurer le calibre maximal.', gravite: 'Risque de rupture croissant avec le diamètre (faible < 40 mm, élevé ≥ 55 mm).', cat: 'Mesurer/typer ; surveillance échographique selon diamètre ; avis chirurgical/angio-TDM au seuil (≈ 55 mm H / 50 mm F) ou croissance > 10 mm/an.' },
    { nom: 'Anévrisme rompu / fissuré', physiopath: 'Rupture de la paroi anévrismale → hémorragie rétropéritonéale (fissuration = rupture contenue, sub-aiguë).', bmode: 'Contour aortique flou/interrompu, collection/hématome péri-aortique ou rétropéritonéal, épanchement.', doppler: 'Fuite extravasculaire parfois visible ; flux désorganisé.', ddx: 'Hématome d\'autre origine, colique néphrétique (triade trompeuse : douleur, masse, hypotension).', pieges: 'Tableau atypique pris pour une colique néphrétique ; l\'écho au lit confirme l\'AAA mais ne doit PAS retarder le bloc.', gravite: 'URGENCE VITALE absolue.', cat: 'Appel chirurgie vasculaire en urgence ; ne pas retarder ; angio-TDM si patient stable, sinon bloc d\'emblée.' },
    { nom: 'Dissection aortique', physiopath: 'Clivage pariétal créant une vraie et une fausse lumière séparées par un flap intimal (extension d\'une dissection thoracique le plus souvent).', bmode: 'Flap intimal mobile, double lumière.', doppler: 'Flux distinct dans les deux lumières (vraie : systolique franc ; fausse : ralenti/différé) ; recherche de l\'atteinte des branches.', ddx: 'Artefact de réverbération (faux flap), thrombus mural.', pieges: 'Confondre un artefact linéaire avec un vrai flap ; manquer la malperfusion d\'une branche (rénale, mésentérique).', gravite: 'URGENCE (malperfusion d\'organe, rupture).', cat: 'Angio-TDM en urgence, avis chirurgical ; rechercher l\'atteinte des collatérales.' },
    { nom: 'Thrombus mural', physiopath: 'Dépôt fibrino-cruorique laminaire dans un sac anévrismal ou une aorte ectasique.', bmode: 'Matériel en croissant, échogénicité variable, tapissant la paroi, réduisant la lumière circulante.', doppler: 'Pas de flux dans le thrombus ; flux dans la lumière résiduelle centrale.', ddx: 'Artefact de gain (faux thrombus dans une lumière en réalité libre).', pieges: 'Mesurer le diamètre lumière au lieu de paroi externe à externe → sous-estimation du diamètre réel de l\'anévrisme ; surestimer le thrombus par excès de gain.', gravite: 'Source embolique possible ; n\'enlève pas le risque de rupture.', cat: 'Toujours mesurer paroi externe à externe ; décrire le thrombus ; surveiller selon le diamètre total.' }
  ],
  algorithme: {
    titre: 'Conduite devant une aorte abdominale',
    noeuds: [
      { q: 'Diamètre AP (paroi externe) mesuré en coupe perpendiculaire ?', a: 'Indispensable : sinon risque de surestimation (oblique) ou de discordance de suivi' },
      { q: 'Diamètre < 30 mm ?', a: 'Pas d\'anévrisme ; si 25–29 mm = ectasie → surveiller' },
      { q: 'Diamètre 30–54 mm (homme) / 30–49 mm (femme) ?', a: 'AAA → surveillance échographique selon diamètre, contrôle FRCV (arrêt tabac)' },
      { q: 'Diamètre ≥ 55 mm (H) / 50 mm (F) ou croissance > 10 mm/an ou symptomatique ?', a: 'Avis chirurgical + angio-TDM (réparation ouverte/endovasculaire)' },
      { q: 'Douleur abdo/lombaire + AAA + instabilité ?', a: 'Suspicion de rupture → URGENCE chirurgicale, ne pas retarder' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DE L'AORTE ABDOMINALE

Indication : [dépistage AAA / FRCV / contrôle].
Technique : sonde convexe, patient à jeun, mode B + Doppler couleur et pulsé.

Aorte abdominale explorée du segment cœliaque à la bifurcation.
Calibre régulier, s'effilant de haut en bas, paroi fine sans thrombus.
Diamètre antéro-postérieur maximal (sous-rénal) : __ mm (paroi externe à externe) — < 30 mm.
Tronc cœliaque, AMS et artères rénales d'aspect perméable.
Bifurcation et iliaques primitives non dilatées.
Pas d'épanchement ni d'hématome péri-aortique.

CONCLUSION : Aorte abdominale de calibre normal (__ mm), sans anévrisme ni thrombus. Bifurcation libre.`,
    pathologique: `ÉCHO-DOPPLER DE L'AORTE ABDOMINALE

Indication : [dépistage / surveillance AAA / douleur].
Technique : sonde convexe, mode B + Doppler couleur et pulsé.

Anévrisme [fusiforme/sacculaire] de l'aorte abdominale [sous-rénale].
Diamètre antéro-postérieur maximal : __ mm (paroi externe à externe), sur __ mm de longueur ; collet sous-rénal à __ mm de l'origine des rénales.
Thrombus mural [circonférentiel/en croissant], épaisseur __ mm ; lumière circulante __ mm.
[Iliaques : __ ]. Pas d'argument pour une rupture (pas d'hématome péri-aortique) / [hématome rétropéritonéal présent → URGENCE].

CONCLUSION : AAA sous-rénal mesuré à __ mm.
[Comparaison à l'examen du __ : croissance de __ mm.]
[Proposition : surveillance à __ / angio-TDM + avis chirurgical vasculaire car ≥ seuil.]`
  },
  cas: [
    { titre: 'Aorte ou VCI ?', enonce: 'Au bilan d\'un souffle abdominal, vous repérez deux vaisseaux para-rachidiens. L\'un, à droite, est ovalaire et s\'aplatit à la compression.', questions: ['Lequel est l\'aorte ?', 'Quels critères les distinguent ?'], indices: ['Forme et pulsatilité', 'Compressibilité'], reponse: 'L\'aorte est le vaisseau gauche, rond, pulsatile et NON compressible. La structure droite, ovalaire et compressible, est la VCI. La pulsatilité et la non-compressibilité signent l\'aorte.' },
    { titre: 'Dépistage chez un fumeur de 70 ans', enonce: 'Homme, 70 ans, tabagique. Aorte sous-rénale à 32 mm, paroi externe à externe, en coupe perpendiculaire.', questions: ['Est-ce un anévrisme ?', 'Quelle surveillance ?'], indices: ['Seuil de définition', 'Rythme selon diamètre'], reponse: 'Oui : ≥ 30 mm = AAA. À 30–39 mm, surveillance échographique espacée (~ tous les 2–3 ans) et contrôle strict des FRCV (arrêt du tabac surtout).' },
    { titre: 'Mesure douteuse', enonce: 'Sur une aorte tortueuse, vous mesurez 38 mm en coupe oblique, mais 30 mm en coupe strictement perpendiculaire.', questions: ['Quelle valeur retenir ?', 'Pourquoi la différence ?'], reponse: 'Retenir 30 mm : la coupe oblique sectionne une ellipse et surestime le diamètre. Toujours mesurer perpendiculairement à l\'axe du vaisseau, surtout sur une aorte déroulée.' },
    { titre: 'Quel diamètre dans un anévrisme thrombosé ?', enonce: 'AAA avec épais thrombus mural : la lumière circulante mesure 28 mm, le diamètre paroi externe à externe 52 mm.', questions: ['Quelle valeur reflète le risque de rupture ?'], reponse: 'Le diamètre total paroi externe à externe (52 mm). Le risque de rupture dépend du diamètre externe, pas de la lumière résiduelle. Mesurer toujours outer-to-outer.' },
    { titre: 'Surveillance à 12 mois', enonce: 'AAA passé de 46 mm à 49 mm en un an chez une femme de 68 ans.', questions: ['Croissance préoccupante ?', 'Conduite ?'], reponse: 'Croissance de 3 mm/an, non rapide (< 10 mm/an). Mais à 49 mm chez une femme on approche du seuil (≈ 50 mm). Rapprocher la surveillance (6 mois) et anticiper l\'avis chirurgical/angio-TDM.' },
    { titre: 'Indication opératoire', enonce: 'Homme de 72 ans, AAA sous-rénal à 56 mm, asymptomatique.', questions: ['Faut-il opérer ?', 'Quel examen avant ?'], reponse: 'Oui : ≥ 55 mm chez l\'homme = seuil chirurgical. Angio-TDM aorto-iliaque pour cartographie (collet, iliaques, faisabilité endovasculaire) et avis chirurgie vasculaire.' },
    { titre: 'Douleur lombaire brutale', enonce: 'Homme de 75 ans, AAA connu à 60 mm, douleur lombaire brutale et hypotension.', questions: ['Diagnostic à éliminer en urgence ?', 'Conduite ?'], indices: ['AAA + douleur + hypotension'], reponse: 'Rupture/fissuration d\'AAA jusqu\'à preuve du contraire. URGENCE chirurgicale : appel immédiat de la chirurgie vasculaire ; angio-TDM seulement si stable, sinon bloc d\'emblée. Ne PAS retarder.' },
    { titre: 'Triade trompeuse', enonce: 'Homme de 73 ans adressé pour « colique néphrétique » : douleur de flanc, masse battante, hypotension.', questions: ['Quel piège ?', 'Que faire à l\'écho ?'], reponse: 'Une rupture d\'AAA peut mimer une colique néphrétique (douleur, masse, hypotension). Toujours examiner l\'aorte chez un homme âgé avec ce tableau : un AAA + hématome rétropéritonéal impose la chirurgie urgente.' },
    { titre: 'Double lumière', enonce: 'Aorte abdominale avec une structure linéaire mobile la traversant et deux flux de cinétique différente de part et d\'autre.', questions: ['Diagnostic ?', 'Examen complémentaire et risque ?'], reponse: 'Dissection aortique (flap intimal, vraie/fausse lumière). Angio-TDM en urgence pour l\'extension et l\'atteinte des branches (rénales, mésentériques) ; avis chirurgical. Risque de malperfusion d\'organe et de rupture.' },
    { titre: 'Faux thrombus', enonce: 'Vous croyez voir un matériel échogène tapissant l\'aorte, mais en baissant le gain la lumière redevient parfaitement noire.', questions: ['Vrai thrombus ou artefact ?', 'Comment trancher ?'], reponse: 'Artefact de gain : un gain trop élevé « remplit » la lumière. Baisser le gain et confirmer en couleur/énergie que la lumière est entièrement circulante. Un vrai thrombus persiste à bas gain et n\'a pas de flux.' }
  ],
  pieges: [
    'Mesurer en coupe oblique → surestimation du diamètre (surtout aorte tortueuse) : toujours perpendiculaire.',
    'Mesurer la lumière au lieu de la paroi externe à externe → sous-estimation du diamètre réel d\'un AAA thrombosé.',
    'Gain trop élevé → faux thrombus dans une lumière en réalité libre.',
    'Confondre aorte (ronde, pulsatile, non compressible) et VCI (ovalaire, compressible, à droite).',
    'Conclure « aorte normale » sans descendre jusqu\'à la bifurcation (AAA sous-rénal dans > 90 % des cas).',
    'Gaz digestifs masquant l\'aorte : ne pas conclure faute de fenêtre (patient à jeun, compression, décubitus latéral).',
    'Changer de convention de mesure entre deux examens → fausse croissance dans le suivi.',
    'Prendre une rupture d\'AAA pour une colique néphrétique chez l\'homme âgé.'
  ],
  flashcards: [
    { q: 'Définition d\'un anévrisme de l\'aorte abdominale ?', r: 'Diamètre ≥ 30 mm OU > 1,5× le segment sus-jacent.' },
    { q: 'Comment mesure-t-on le diamètre aortique ?', r: 'Antéro-postérieur, paroi externe à paroi externe, en coupe transverse perpendiculaire.' },
    { q: 'Seuils chirurgicaux de l\'AAA ?', r: '≈ 55 mm chez l\'homme, 50 mm chez la femme ; ou croissance > 10 mm/an ; ou symptomatique.' },
    { q: 'Comment distinguer l\'aorte de la VCI ?', r: 'Aorte : ronde, pulsatile, à gauche, NON compressible. VCI : ovalaire, à droite, compressible, respiro-dépendante.' },
    { q: 'Pourquoi une coupe oblique fausse-t-elle la mesure ?', r: 'Elle sectionne une ellipse et surestime le diamètre.' },
    { q: 'Quel diamètre reflète le risque de rupture dans un AAA thrombosé ?', r: 'Le diamètre total paroi externe à externe, pas la lumière circulante.' },
    { q: 'Triade trompeuse de la rupture d\'AAA ?', r: 'Douleur de flanc + masse battante + hypotension (mime une colique néphrétique).' }
  ],
  qcm: [
    { q: 'Un anévrisme de l\'aorte abdominale est défini par un diamètre :', options: ['≥ 20 mm', '≥ 25 mm', '≥ 30 mm ou > 1,5× le segment sus-jacent', '≥ 40 mm'], correct: 2, exp: '≥ 30 mm ou > 1,5× le segment d\'aorte sus-jacent = anévrisme (définition consensuelle).' },
    { q: 'La mesure de référence du diamètre aortique est :', options: ['Latéro-latérale, lumière à lumière', 'Antéro-postérieure, paroi externe à externe, coupe perpendiculaire', 'En coupe oblique pour voir le calibre maximal', 'Sur la lumière circulante uniquement'], correct: 1, exp: 'AP, paroi externe à externe, en coupe perpendiculaire : la convention la plus reproductible pour le suivi.' },
    { q: 'Le seuil chirurgical habituel d\'un AAA asymptomatique chez l\'homme est :', options: ['40 mm', '45 mm', '≈ 55 mm', '70 mm'], correct: 2, exp: '≈ 55 mm chez l\'homme (50 mm chez la femme), ou croissance > 10 mm/an, ou symptomatique.' },
    { q: 'Devant un homme âgé avec douleur de flanc, masse battante et hypotension, il faut évoquer :', options: ['Une colique néphrétique simple', 'Une rupture d\'AAA', 'Une lombosciatique', 'Une pancréatite'], correct: 1, exp: 'Cette triade évoque une rupture d\'AAA : urgence chirurgicale, ne pas retarder par des examens.' }
  ],
  refs: ['DIU Montpellier (aorte abdominale) ; ESVS 2024 Clinical Practice Guidelines on the Management of Abdominal Aorto-Iliac Artery Aneurysms ; HAS — dépistage de l\'anévrisme de l\'aorte abdominale ; SFMV (recommandations écho-Doppler aortique).']
});

/* ============================ CHAPITRE 2 : ARTÈRES ILIAQUES ============================ */
window.VASC.chapters.push({
  id: 'iliaques', num: 21, groupe: 'Artériel — Aorte & branches', emoji: '🦴',
  titre: 'Artères iliaques',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈90 min',
  resume: 'Exploration des artères iliaques (primitive, externe, interne) : recherche de sténose/occlusion (retentissement sur le membre inférieur), d\'anévrisme iliaque et bilan d\'amont de l\'AOMI. Territoire profond et difficile (gaz, croisement, profondeur) où les signes indirects d\'aval sont précieux.',
  tags: 'iliaque primitive externe interne hypogastrique sténose occlusion anévrisme iliaque triphasique parvus-tardus fémoral commun AOMI TASC claudication fessière',
  objectifs: [
    'Identifier les artères iliaques primitive, externe et interne (hypogastrique) et le carrefour aorto-iliaque.',
    'Reconnaître les difficultés techniques (profondeur, gaz, croisement des vaisseaux) et les contourner.',
    'Décrire le flux triphasique normal et le différencier d\'un spectre sténosant ou d\'aval amorti.',
    'Quantifier une sténose iliaque (vitesses, rapport) et reconnaître une occlusion et le parvus-tardus fémoral comme signe indirect d\'amont.',
    'Reconnaître un anévrisme iliaque (seuil ≈ 25–30 mm) et le situer dans le bilan d\'AOMI (classification TASC).',
    'Rédiger un compte-rendu iliaque standardisé intégrant le retentissement d\'aval.'
  ],
  anatomie: {
    texte: 'L\'aorte se divise à L4 en deux artères iliaques primitives (communes). Chaque iliaque primitive se divise, en regard de l\'articulation sacro-iliaque, en iliaque interne (hypogastrique, qui plonge dans le pelvis et vascularise les organes pelviens et la fesse) et iliaque externe (qui descend vers l\'arcade crurale et devient l\'artère fémorale commune après le ligament inguinal). L\'iliaque externe ne donne pas de collatérale majeure dans son trajet pelvien (elle donne l\'épigastrique inférieure et la circonflexe iliaque profonde près de l\'arcade).',
    svg: SVG_ILIAQUES,
    caption: 'Schéma : bifurcation aortique (L4) → iliaques primitives → iliaque interne (hypogastrique, pelvis/fesse) et iliaque externe (→ fémorale commune). L\'iliaque externe croise en avant la veine iliaque.',
    vascularisation: 'Iliaque interne → pelvis, organes génitaux, fesse (claudication fessière si atteinte). Iliaque externe → membre inférieur via la fémorale commune.',
    rapports: [
      'Veines iliaques satellites (en arrière/en dedans) : la veine iliaque commune gauche est croisée par l\'artère iliaque primitive droite (syndrome de May-Thurner).',
      'Uretères croisant la bifurcation iliaque (repère chirurgical).',
      'Anses digestives et gaz en avant (obstacle acoustique majeur).',
      'Trajet profond et oblique, plongeant dans le pelvis (difficulté d\'angle).'
    ],
    variantes: [
      'Trajets tortueux/calcifiés du sujet âgé (cônes d\'ombre gênant l\'analyse).',
      'Anévrisme iliaque isolé ou associé à un AAA (fréquent).',
      'Variantes de division ; iliaque interne parfois difficile à suivre dans le pelvis.'
    ]
  },
  physiologie: {
    texte: 'Les artères iliaques alimentent un lit de HAUTE résistance (membre inférieur et pelvis au repos) : le spectre normal est triphasique (pic systolique aigu, reflux protodiastolique, faible flux antérograde télédiastolique). Toute amputation de ce profil (perte du reflux, démodulation, parvus-tardus) traduit une lésion. Le parvus-tardus enregistré plus en aval (fémorale commune) est un précieux signe INDIRECT d\'une sténose serrée ou d\'une occlusion iliaque d\'amont.',
    profils: [
      { nom: 'Iliaque normale', desc: 'Triphasique, haute résistance, fenêtre spectrale claire, VPS modérée (≈ 80–120 cm/s en iliaque externe).' },
      { nom: 'Sténose iliaque', desc: 'Accélération focale (VPS↑), aliasing, élargissement spectral et turbulence post-sténotique ; rapport de vitesses élevé.' },
      { nom: 'Aval d\'une lésion iliaque (fémoral commun)', desc: 'Parvus-tardus : montée systolique lente, pic émoussé, démodulation, perte du reflux → signe indirect d\'obstacle d\'amont.' }
    ]
  },
  physique: {
    intro: 'Territoire PROFOND et difficile : pénétration, contournement des gaz et correction d\'angle sur un vaisseau oblique sont les enjeux.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Convexe 2–5 MHz (profondeur 6–12 cm). La fenêtre est souvent gênée par les gaz : compression et patient à jeun aident.' },
      { titre: 'Angle sur vaisseau oblique', desc: 'L\'iliaque plonge dans le pelvis : aligner le curseur d\'angle sur la PAROI réelle (≤ 60°), au besoin en inclinant la boîte couleur (steering) ; un angle mal réglé fausse les vitesses.', svg: SVG_TRIPHASIQUE },
      { titre: 'Signes indirects', desc: 'Quand l\'iliaque est inaccessible (gaz), s\'appuyer sur l\'analyse du fémoral commun : un parvus-tardus fémoral signe une lésion iliaque d\'amont même non vue.' }
    ]
  },
  reglages: {
    intro: 'Réglages iliaques types (sonde convexe).',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Profondeur du carrefour pelvien' },
      { param: 'Profondeur', valeur: 'Vaisseau centré, 8–12 cm', note: 'Adapter à la corpulence' },
      { param: 'Harmonique', valeur: 'ON si patient difficile', note: 'Réduit le bruit lié aux gaz' },
      { param: 'PRF couleur', valeur: 'Adaptée, ↑ sur sténose', note: 'Repérer l\'aliasing focal' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi (steering)', note: 'Critique sur vaisseau oblique' },
      { param: 'Porte', valeur: '⅓ lumière, au point de VPS max', note: 'Dans la zone d\'accélération' },
      { param: 'Filtre mural', valeur: 'Bas si flux d\'aval amorti', note: 'Ne pas effacer une diastole basse' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, abdomen et plis inguinaux découverts, à jeun si possible pour limiter les gaz.',
    operateur: 'Au côté du patient, avant-bras en appui, main libre sur les molettes (PRF, gain, baseline).',
    ecran: 'Dans l\'axe du regard, convention abdominale.',
    sonde: 'Convexe ; suivre l\'aorte jusqu\'à la bifurcation puis chaque iliaque vers le pli inguinal ; compléter par la fémorale commune.',
    ergonomie: 'Compression progressive pour chasser les gaz ; décubitus latéral controlatéral utile ; profiter de la vessie pleine comme fenêtre pelvienne pour l\'iliaque interne.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérer la bifurcation', desc: 'Partir de l\'aorte sous-rénale, descendre jusqu\'à la bifurcation (L4) et suivre chaque iliaque primitive.' },
      { titre: 'Suivre les segments', desc: 'Iliaque primitive → bifurcation interne/externe → iliaque externe jusqu\'au pli inguinal (continuité avec la fémorale commune).' },
      { titre: 'Couleur sur tout le trajet', desc: 'Repérer les zones d\'accélération, l\'aliasing focal, les ruptures de flux, le thrombus ; identifier les calcifications (cône d\'ombre).' },
      { titre: 'Pulsé segmentaire', desc: 'VPS/VTD en iliaque primitive, externe et au point sténosant ; calculer le rapport de vitesses (sténose/amont).' },
      { titre: 'Analyse du fémoral commun', desc: 'Systématique : un parvus-tardus fémoral est un signe indirect de lésion iliaque d\'amont, surtout si l\'iliaque est mal vue.' },
      { titre: 'Mesure des diamètres', desc: 'Mesurer le diamètre iliaque (paroi externe à externe) à la recherche d\'un anévrisme (≥ 25–30 mm).' }
    ],
    reperes: ['Bifurcation aortique à L4', 'Iliaque interne plongeant dans le pelvis (vers la vessie)', 'Iliaque externe rejoignant le pli inguinal → fémorale commune', 'Veine iliaque satellite (compressible)'],
    astuces: ['Si l\'iliaque est masquée par les gaz : analyser le fémoral commun (parvus-tardus = obstacle d\'amont).', 'Vessie pleine = bonne fenêtre pour l\'iliaque interne.', 'Incliner la boîte couleur (steering) pour garder un angle ≤ 60° sur ce vaisseau oblique.', 'Comparer les deux côtés (asymétrie de profil ou de vitesses).'],
    erreurs: ['Angle > 60° sur l\'iliaque oblique → vitesses faussées.', 'Conclure « iliaques normales » sans analyser le fémoral commun (signe indirect manqué).', 'Prendre une calcification avec cône d\'ombre pour une occlusion (vérifier en énergie/aval).', 'Ne pas mesurer le diamètre iliaque → anévrisme iliaque méconnu.']
  },
  interpretation: {
    normal: ['Iliaques perméables, calibre régulier (primitive < ~16 mm, externe < ~10 mm)', 'Spectre triphasique, haute résistance, fenêtre claire', 'VPS modérée et symétrique, fémoral commun triphasique d\'aval'],
    pathologique: ['Accélération focale + aliasing = sténose (rapport de vitesses ≥ 2–2,5)', 'Absence de flux couleur + énergie = occlusion (reprise par collatérales en aval)', 'Parvus-tardus fémoral = signe indirect de lésion iliaque d\'amont', 'Dilatation focale ≥ 25–30 mm = anévrisme iliaque', 'Démodulation/perte du reflux = retentissement hémodynamique'],
    svgPatho: SVG_TRIPHASIQUE,
    capPatho: 'Iliaque normale triphasique ; sténose serrée (aliasing/élargissement) ; aval fémoral en parvus-tardus ; anévrisme iliaque.'
  },
  valeurs: {
    intro: 'Critères vélocimétriques et seuils iliaques (à adapter au laboratoire). Le rapport de vitesses (sténose / segment d\'amont) est le critère le plus robuste.',
    lignes: [
      { param: 'Iliaque externe normale', valeur: 'VPS ≈ 80–120 cm/s', note: 'Triphasique, haute résistance' },
      { param: 'Sténose < 50 %', valeur: 'Rapport de vitesses < 2', note: 'VPS focale modérément augmentée' },
      { param: 'Sténose ≥ 50 %', valeur: 'Rapport de vitesses ≥ 2–2,5 (VPS ≈ > 200 cm/s)', note: 'Aliasing, élargissement spectral' },
      { param: 'Sténose serrée / pré-occlusive', valeur: 'Rapport ≥ 4 ± parvus-tardus d\'aval', note: 'Retentissement hémodynamique net' },
      { param: 'Occlusion', valeur: 'Absence de flux (couleur + énergie)', note: 'Reprise distale par collatérales' },
      { param: 'Diamètre iliaque primitive normal', valeur: '< ~16 mm', note: 'Externe < ~10 mm' },
      { param: 'Anévrisme iliaque', valeur: '≥ 25–30 mm', note: 'Seuil de prise en charge ≈ 30–35 mm' },
      { param: 'Parvus-tardus fémoral', valeur: 'Temps de montée allongé, pic émoussé', note: 'Signe indirect d\'amont (iliaque/aorte)' }
    ]
  },
  pathologies: [
    { nom: 'Sténose iliaque', physiopath: 'Plaque athéromateuse réduisant la lumière (carrefour aorto-iliaque, origine de l\'iliaque externe surtout) ; FRCV : tabac, diabète, HTA.', bmode: 'Plaque, réduction de calibre, ± calcium (cône d\'ombre).', doppler: 'Accélération focale (VPS↑), aliasing, élargissement spectral, rapport de vitesses ≥ 2–2,5 ; parvus-tardus fémoral d\'aval si serrée.', ddx: 'Tortuosité (faux aliasing), hyperdébit (controlatéral occlus).', pieges: 'Angle > 60° ; mesure hors pic ; calcium masquant ; oublier le fémoral commun.', gravite: 'Claudication (fessière/cuisse si haute), risque d\'aggravation.', cat: 'Quantifier (rapport de vitesses), corréler clinique/IPS ; classer TASC ; avis pour angioplastie/stent selon retentissement.' },
    { nom: 'Occlusion iliaque', physiopath: 'Thrombose/embolie complète d\'un segment iliaque, souvent sur athérome ; reprise par collatérales (hypogastriques, lombaires).', bmode: 'Lumière comblée, matériel endoluminal, parfois calcifiée.', doppler: 'Absence de flux couleur ET énergie sur le segment ; reprise distale amortie (parvus-tardus marqué au fémoral commun).', ddx: 'Quasi-occlusion (filet de flux à PRF/filtre bas).', pieges: 'PRF/filtre trop hauts → fausse occlusion ; ne pas confondre cône d\'ombre calcaire et absence de flux.', gravite: 'Claudication invalidante, ischémie selon collatéralité.', cat: 'Confirmer en énergie à PRF basse ; bilan d\'aval (fémoral, MI) ; angio-TDM/avis pour revascularisation.' },
    { nom: 'Anévrisme iliaque', physiopath: 'Dilatation dégénérative d\'une iliaque (souvent primitive), fréquemment associée à un AAA.', bmode: 'Dilatation focale ≥ 25–30 mm, paroi externe à externe ; thrombus mural possible.', doppler: 'Flux ralenti/tourbillonnaire dans le sac.', ddx: 'Iliaque tortueuse mesurée en oblique, masse pelvienne.', pieges: 'Méconnaître l\'anévrisme iliaque en ne mesurant pas le diamètre ; mesure oblique surestimante.', gravite: 'Risque de rupture/embolie ; souvent silencieux.', cat: 'Mesurer outer-to-outer ; rechercher un AAA associé ; surveiller, avis chirurgical au seuil (≈ 30–35 mm).' },
    { nom: 'Atteinte aorto-iliaque (lésion de jonction, type Leriche)', physiopath: 'Athérome du carrefour aorto-iliaque ; forme étendue = syndrome de Leriche (occlusion aorto-iliaque).', bmode: 'Plaques/occlusion du carrefour, ± thrombus.', doppler: 'Amputation bilatérale des profils fémoraux (parvus-tardus des deux côtés), perte du reflux.', ddx: 'Atteinte fémoro-poplitée isolée (profils fémoraux conservés en proximal).', pieges: 'Attribuer une claudication à l\'aval alors que l\'obstacle est haut situé.', gravite: 'Claudication des deux MI, voire fessière, dysfonction érectile (Leriche).', cat: 'Reconnaître via les signes indirects fémoraux bilatéraux ; angio-TDM ; avis chirurgical/endovasculaire.' }
  ],
  algorithme: {
    titre: 'Conduite devant un axe iliaque',
    noeuds: [
      { q: 'Iliaque correctement visualisée (gaz, profondeur) ?', a: 'Si non visible : analyser le fémoral commun (parvus-tardus = obstacle d\'amont)' },
      { q: 'Spectre triphasique, VPS symétrique, pas d\'accélération ?', a: 'Iliaque normale → corréler clinique/IPS' },
      { q: 'Accélération focale + rapport de vitesses ≥ 2–2,5 ?', a: 'Sténose ≥ 50 % → quantifier, classer TASC, avis selon retentissement' },
      { q: 'Pas de flux (couleur + énergie) ?', a: 'Occlusion → confirmer à PRF/filtre bas, bilan d\'aval, angio-TDM' },
      { q: 'Diamètre ≥ 25–30 mm (outer-to-outer) ?', a: 'Anévrisme iliaque → chercher un AAA associé, surveillance/avis' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES ARTÈRES ILIAQUES

Indication : [claudication / bilan AOMI / dépistage].
Technique : sonde convexe, mode B + Doppler couleur et pulsé.

Carrefour aorto-iliaque et iliaques explorés des deux côtés.
Iliaques primitives, externes et internes perméables, parois fines, calibre régulier.
Spectre triphasique, haute résistance, sans accélération significative ; VPS symétriques.
Artères fémorales communes : flux triphasique normal d'aval (pas de parvus-tardus).
Pas d'anévrisme iliaque (diamètres dans les limites).

CONCLUSION : Axes iliaques perméables, sans sténose significative ni anévrisme. Profils d'aval normaux.`,
    pathologique: `ÉCHO-DOPPLER DES ARTÈRES ILIAQUES

Indication : [claudication fessière/cuisse / AOMI].
Technique : sonde convexe, mode B + Doppler couleur et pulsé.

Iliaque [primitive/externe] [côté] : plaque [calcifiée/hypoéchogène], accélération focale VPS __ cm/s, rapport de vitesses __ → sténose estimée [≥ 50 % / serrée].
[Occlusion du segment __ : absence de flux, reprise distale par collatérales.]
Artère fémorale commune [côté] : [parvus-tardus / démodulation] → retentissement d'une lésion iliaque d'amont.
[Anévrisme iliaque __ : diamètre __ mm, paroi externe à externe, ± thrombus.]
Aorte abdominale : [normale / AAA associé __ mm].

CONCLUSION : [Sténose serrée / occlusion] de l'iliaque [côté] avec retentissement d'aval (parvus-tardus fémoral). Classification TASC [__].
[Proposition : corrélation IPS, angio-TDM et avis pour revascularisation.]`
  },
  cas: [
    { titre: 'Iliaque ou veine ?', enonce: 'Au carrefour, deux vaisseaux côte à côte ; l\'un s\'aplatit à la compression et n\'est pas pulsatile.', questions: ['Lequel est l\'artère ?', 'Quels critères ?'], indices: ['Compressibilité', 'Pulsatilité/spectre'], reponse: 'L\'artère iliaque est pulsatile, non compressible et présente un spectre triphasique ; la veine iliaque satellite est compressible, à flux phasique respiratoire.' },
    { titre: 'Claudication fessière', enonce: 'Homme de 65 ans, claudication de la fesse et de la cuisse. Vous suspectez une atteinte iliaque interne/primitive.', questions: ['Quel territoire évoque la claudication fessière ?', 'Que rechercher ?'], reponse: 'La claudication fessière oriente vers l\'iliaque interne (hypogastrique) ou une lésion haute (iliaque primitive/aorto-iliaque). Rechercher sténose/occlusion proximale et analyser les profils fémoraux d\'aval.' },
    { titre: 'Iliaque masquée par les gaz', enonce: 'Impossible de voir l\'iliaque (gaz), mais le fémoral commun montre une montée systolique lente et un pic émoussé.', questions: ['Que conclure ?', 'Quelle suite ?'], indices: ['Signe indirect d\'amont'], reponse: 'Le parvus-tardus fémoral signe une lésion iliaque (ou aortique) d\'amont, même non visualisée. Compléter par angio-TDM pour localiser/quantifier la lésion.' },
    { titre: 'Quantifier une sténose', enonce: 'Iliaque externe : VPS amont 90 cm/s, VPS au point sténosant 230 cm/s.', questions: ['Quel est le rapport de vitesses ?', 'Quelle sévérité ?'], reponse: 'Rapport = 230/90 ≈ 2,6 → sténose ≥ 50 % (rapport ≥ 2–2,5). Corréler aux symptômes, à l\'IPS et au profil fémoral d\'aval.' },
    { titre: 'Pas de flux', enonce: 'Aucun flux couleur sur l\'iliaque externe ; PRF et filtre sont réglés haut.', questions: ['Avant de conclure à une occlusion, que faites-vous ?'], reponse: 'Baisser PRF et filtre mural, passer en Doppler énergie : rechercher un filet de flux (quasi-occlusion). Confirmer la reprise distale et l\'amortissement fémoral.' },
    { titre: 'Anévrisme iliaque', enonce: 'Lors d\'un contrôle d\'AAA, l\'iliaque primitive droite mesure 32 mm (paroi externe à externe).', questions: ['Anévrisme ?', 'Conduite ?'], reponse: 'Oui : ≥ 25–30 mm = anévrisme iliaque. Souvent associé à l\'AAA. Mesurer le diamètre maximal, rechercher un thrombus, surveiller et avis chirurgical au seuil (≈ 30–35 mm).' },
    { titre: 'Claudication bilatérale', enonce: 'Homme de 60 ans, claudication des deux MI et dysfonction érectile. Profils fémoraux amortis des deux côtés.', questions: ['Quel diagnostic ?', 'Mécanisme ?'], indices: ['Signes indirects bilatéraux'], reponse: 'Syndrome de Leriche (occlusion aorto-iliaque) : claudication bilatérale + impuissance + abolition des pouls fémoraux. Les parvus-tardus fémoraux bilatéraux signent l\'obstacle haut. Angio-TDM + avis.' },
    { titre: 'Calcium trompeur', enonce: 'Sur l\'iliaque, une calcification étendue projette un cône d\'ombre et la couleur disparaît en regard.', questions: ['Occlusion ou artefact ?', 'Comment trancher ?'], reponse: 'Le cône d\'ombre calcaire peut faire disparaître la couleur sans occlusion. Multiplier les fenêtres, utiliser l\'énergie, et surtout vérifier le flux d\'aval (fémoral) : un flux triphasique d\'aval exclut une occlusion serrée d\'amont.' },
    { titre: 'Classer pour la décision', enonce: 'Sténose courte (< 3 cm) isolée de l\'iliaque primitive, peu calcifiée.', questions: ['Quel intérêt de la classification TASC ?'], reponse: 'La classification TASC (selon longueur, nombre et siège des lésions aorto-iliaques) oriente le choix thérapeutique : les lésions courtes/focales (TASC A-B) sont plutôt traitées par voie endovasculaire (angioplastie/stent), les lésions étendues (C-D) plutôt chirurgicalement.' },
    { titre: 'Asymétrie de profil', enonce: 'Fémoral commun droit triphasique normal ; fémoral commun gauche démodulé.', questions: ['Que suspectez-vous à gauche ?'], reponse: 'Une lésion iliaque (ou aorto-iliaque) gauche d\'amont. L\'asymétrie des profils fémoraux est un excellent signe indirect ; cibler l\'exploration iliaque gauche et compléter par angio-TDM si besoin.' }
  ],
  pieges: [
    'Angle > 60° sur l\'iliaque oblique → vitesses faussées : aligner sur la paroi, incliner la boîte couleur.',
    'Conclure « iliaques normales » sans analyser le fémoral commun (parvus-tardus = obstacle d\'amont manqué).',
    'PRF/filtre trop hauts → fausse occlusion sur un flux lent.',
    'Calcium avec cône d\'ombre pris pour une occlusion → vérifier l\'énergie et le flux d\'aval.',
    'Gaz digestifs masquant l\'iliaque : ne pas conclure sans s\'appuyer sur les signes indirects.',
    'Oublier de mesurer le diamètre iliaque → anévrisme iliaque méconnu.',
    'Attribuer une claudication à l\'aval alors que l\'obstacle est aorto-iliaque (signes fémoraux bilatéraux).'
  ],
  flashcards: [
    { q: 'Quel est le profil normal d\'une artère iliaque ?', r: 'Triphasique, haute résistance (pic systolique aigu, reflux protodiastolique, faible flux télédiastolique).' },
    { q: 'Quel signe indirect trahit une lésion iliaque d\'amont ?', r: 'Un parvus-tardus du fémoral commun d\'aval (montée lente, pic émoussé).' },
    { q: 'Critère robuste de sténose iliaque ≥ 50 % ?', r: 'Rapport de vitesses (sténose/amont) ≥ 2–2,5 ± parvus-tardus d\'aval.' },
    { q: 'Seuil de l\'anévrisme iliaque ?', r: '≈ 25–30 mm (paroi externe à externe), souvent associé à un AAA.' },
    { q: 'Quelle claudication évoque l\'iliaque interne ?', r: 'La claudication fessière (territoire hypogastrique).' },
    { q: 'Qu\'est-ce que le syndrome de Leriche ?', r: 'Occlusion aorto-iliaque : claudication bilatérale + impuissance + abolition des pouls fémoraux.' }
  ],
  qcm: [
    { q: 'Le spectre normal d\'une artère iliaque est :', options: ['Monophasique à basse résistance', 'Triphasique à haute résistance', 'Parvus-tardus', 'Démodulé'], correct: 1, exp: 'L\'iliaque alimente un lit de haute résistance (MI/pelvis au repos) : spectre triphasique normal.' },
    { q: 'Un parvus-tardus enregistré au fémoral commun signifie :', options: ['Une lésion fémorale isolée', 'Une lésion iliaque/aortique d\'amont', 'Une veine compressible', 'Un anévrisme iliaque'], correct: 1, exp: 'Le parvus-tardus d\'aval est un signe indirect d\'un obstacle serré d\'amont (iliaque ou aorto-iliaque).' },
    { q: 'Une sténose iliaque ≥ 50 % est évoquée pour un rapport de vitesses :', options: ['< 1', '≈ 1,5', '≥ 2–2,5', 'Non mesurable'], correct: 2, exp: 'Le rapport de vitesses (VPS sténose / VPS amont) ≥ 2–2,5 oriente vers une sténose ≥ 50 %.' },
    { q: 'Devant une iliaque masquée par les gaz, le meilleur recours est :', options: ['Conclure à une occlusion', 'Analyser le fémoral commun (signe indirect)', 'Augmenter l\'angle au-delà de 60°', 'Renoncer à l\'examen'], correct: 1, exp: 'Quand l\'iliaque n\'est pas vue, le profil du fémoral commun (parvus-tardus) renseigne sur une lésion d\'amont.' }
  ],
  refs: ['DIU Montpellier (axes iliaques et AOMI) ; ESVS 2024 (anévrismes aorto-iliaques) ; classification TASC II (lésions aorto-iliaques) ; SFMV (recommandations écho-Doppler artériel des MI).']
});

})();
