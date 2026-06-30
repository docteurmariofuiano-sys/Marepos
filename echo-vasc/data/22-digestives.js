/* ÉCHO-VASC DIU — Artères digestives (tronc cœliaque, AMS, AMI) */
window.VASC = window.VASC || { chapters: [] };

(function(){

const SVG_DIG_1 = `<svg viewBox="0 0 460 260" role="img" aria-label="Anatomie des branches digestives de l'aorte">
<rect width="460" height="260" fill="#fff"/>
<rect x="60" y="10" width="34" height="240" fill="#fde2e2" stroke="#dc2626"/>
<text x="36" y="135" font-size="11" fill="#991b1b" transform="rotate(-90 36 135)">Aorte abdominale</text>
<line x1="94" y1="40" x2="240" y2="40" stroke="#dc2626" stroke-width="9"/>
<text x="150" y="32" font-size="11" fill="#991b1b">Tronc cœliaque (T12)</text>
<path d="M240,40 q24,-22 46,-10" fill="none" stroke="#f59e0b" stroke-width="6"/>
<text x="290" y="22" font-size="10" fill="#b45309">Hép. commune</text>
<path d="M240,40 q24,22 46,30" fill="none" stroke="#7c3aed" stroke-width="6"/>
<text x="290" y="82" font-size="10" fill="#6d28d9">Splénique</text>
<path d="M240,40 l8,-26" fill="none" stroke="#0d9488" stroke-width="5"/>
<text x="250" y="12" font-size="10" fill="#0f766e">Gastrique g.</text>
<line x1="94" y1="78" x2="250" y2="120" stroke="#dc2626" stroke-width="8"/>
<text x="170" y="115" font-size="11" fill="#991b1b">AMS (// VMS)</text>
<line x1="120" y1="120" x2="120" y2="230" stroke="#2563eb" stroke-width="6" stroke-dasharray="3 3"/>
<text x="126" y="200" font-size="10" fill="#1d4ed8">VMS</text>
<line x1="94" y1="200" x2="210" y2="218" stroke="#dc2626" stroke-width="5"/>
<text x="150" y="240" font-size="11" fill="#991b1b">AMI (basse, gauche, petite)</text>
<text x="250" y="160" font-size="10" fill="#475569">Graisse mésentérique</text>
<text x="250" y="174" font-size="10" fill="#475569">échogène autour AMS</text>
</svg>`;

const SVG_DIG_2 = `<svg viewBox="0 0 460 250" role="img" aria-label="Signe de la mouette - tronc coeliaque et AMS en coupe transverse">
<rect width="460" height="250" fill="#fff"/>
<text x="10" y="20" font-size="12" font-weight="bold" fill="#0b2f63">Coupe transverse épigastrique</text>
<ellipse cx="200" cy="150" rx="34" ry="34" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<text x="180" y="200" font-size="10" fill="#991b1b">Aorte</text>
<path d="M170,140 q-60,-10 -90,-2" fill="none" stroke="#dc2626" stroke-width="7"/>
<path d="M230,140 q60,-10 90,-2" fill="none" stroke="#dc2626" stroke-width="7"/>
<text x="60" y="120" font-size="11" fill="#b45309">Hép. commune (D)</text>
<text x="300" y="120" font-size="11" fill="#6d28d9">Splénique (G)</text>
<text x="120" y="60" font-size="13" font-weight="bold" fill="#0b2f63">« Signe de la mouette »</text>
<text x="120" y="78" font-size="10" fill="#475569">tronc cœliaque = corps, les 2 branches = ailes</text>
<path d="M150,235 q50,16 100,0" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
<text x="150" y="248" font-size="9" fill="#64748b">AMS = point rond séparé, juste en dessous, cernée de graisse</text>
</svg>`;

const SVG_DIG_3 = `<svg viewBox="0 0 460 220" role="img" aria-label="Spectre AMS a jeun versus post-prandial">
<rect width="460" height="220" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">AMS À JEUN — haute résistance (triphasique, diastole basse)</text>
<line x1="20" y1="60" x2="220" y2="60" stroke="#cbd5e1"/>
<path d="M20,60 L40,22 L60,60 L70,74 L80,60 L100,55 L120,60 L140,22 L160,60 L170,74 L180,60 L200,55" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="8" y="135" font-size="11" font-weight="bold" fill="#0b2f63">AMS POST-PRANDIAL — basse résistance (diastole comblée, VPS↑)</text>
<line x1="20" y1="190" x2="220" y2="190" stroke="#cbd5e1"/>
<path d="M20,190 L38,120 C58,135 75,150 100,150 C125,150 135,158 155,128 C175,148 190,158 210,160" fill="#dbeafe" stroke="#0d9488" stroke-width="1.8"/>
<text x="250" y="40" font-size="11" fill="#0b2f63">Repas test :</text>
<text x="250" y="58" font-size="11" fill="#0b2f63">mesure 45–90 min après.</text>
<text x="250" y="84" font-size="11" fill="#0b2f63">Normal : VTD ↑ nette,</text>
<text x="250" y="102" font-size="11" fill="#0b2f63">débit ↑, IR ↓.</text>
<text x="250" y="128" font-size="11" fill="#991b1b">Absence de réponse</text>
<text x="250" y="146" font-size="11" fill="#991b1b">post-prandiale = suspect</text>
<text x="250" y="164" font-size="11" fill="#991b1b">(ischémie chronique).</text>
</svg>`;

const SVG_DIG_4 = `<svg viewBox="0 0 460 220" role="img" aria-label="Ligament arque median - effet respiratoire sur le tronc coeliaque">
<rect width="460" height="220" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Syndrome du ligament arqué médian (tronc cœliaque)</text>
<rect x="30" y="40" width="20" height="160" fill="#fde2e2" stroke="#dc2626"/>
<text x="20" y="215" font-size="10" fill="#991b1b">Aorte</text>
<path d="M50,70 q70,4 130,2" fill="none" stroke="#dc2626" stroke-width="8"/>
<path d="M105,55 q10,12 0,24" fill="none" stroke="#475569" stroke-width="3"/>
<text x="60" y="40" font-size="11" fill="#475569">EXPIRATION : ligament comprime</text>
<text x="95" y="100" font-size="10" fill="#991b1b">crochet/encoche, VPS ↑↑↑</text>
<rect x="270" y="40" width="20" height="160" fill="#fde2e2" stroke="#dc2626"/>
<path d="M290,150 q70,2 130,0" fill="none" stroke="#dc2626" stroke-width="8"/>
<text x="295" y="125" font-size="11" fill="#0f766e">INSPIRATION profonde :</text>
<text x="305" y="180" font-size="11" fill="#0f766e">le ligament descend,</text>
<text x="305" y="196" font-size="11" fill="#0f766e">VPS régresse</text>
<line x1="230" y1="120" x2="262" y2="120" stroke="#111" stroke-dasharray="4 3"/>
</svg>`;

window.VASC.chapters.push({
  id: 'digestives', num: 23, groupe: 'Artériel — Aorte & branches', emoji: '🍽️',
  titre: 'Artères digestives (tronc cœliaque, AMS, AMI)',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈2 h 30',
  resume: 'Exploration Doppler des trois axes digestifs (tronc cœliaque, artère mésentérique supérieure, artère mésentérique inférieure) : dépistage de l\'ischémie mésentérique chronique (« angor abdominal »), reconnaissance du syndrome du ligament arqué médian, et compréhension de l\'hémodynamique post-prandiale, clé de l\'interprétation de l\'AMS.',
  tags: 'tronc coeliaque AMS AMI mesenterique ischemie angor abdominal ligament arque median post-prandial repas test mouette VPS Riolan Buhler',
  objectifs: [
    'Repérer et différencier de façon fiable le tronc cœliaque, l\'AMS et l\'AMI sur l\'aorte abdominale.',
    'Décrire l\'anatomie des trois axes, leurs branches et les arcades de suppléance (Riolan, Bühler).',
    'Distinguer le profil hémodynamique de haute résistance (AMS à jeun) du profil de basse résistance (tronc cœliaque, AMS post-prandiale).',
    'Réaliser et interpréter un test de repas pour étudier la réponse post-prandiale de l\'AMS.',
    'Appliquer les critères vélocimétriques de sténose des trois axes et le diagnostic d\'ischémie mésentérique chronique (≥ 2 axes atteints).',
    'Reconnaître le syndrome du ligament arqué médian grâce aux manœuvres respiratoires.',
    'Rédiger un compte-rendu digestif standardisé et savoir orienter vers l\'imagerie en coupe.'
  ],
  anatomie: {
    texte: 'Trois branches viscérales ventrales naissent de l\'aorte abdominale. Le tronc cœliaque naît au niveau de T12, juste sous le hiatus diaphragmatique : c\'est un tronc court (1–2 cm) qui se divise classiquement en trois (trépied de Haller) — artère hépatique commune (à droite), artère splénique (à gauche, sinueuse) et artère gastrique gauche (ascendante, fine). L\'AMS naît juste en dessous (~1 cm), avec un angle aigu par rapport à l\'aorte ; elle est cernée par un manchon de graisse échogène et descend parallèlement à la veine mésentérique supérieure (VMS). L\'AMI naît plus bas (~L3), plus à gauche, de petit calibre, et est la plus difficile à voir.',
    svg: SVG_DIG_1,
    caption: 'Schéma : tronc cœliaque (T12) avec ses branches hépatique commune / splénique / gastrique gauche ; AMS naissant juste en dessous à angle aigu, longeant la VMS, entourée de graisse échogène ; AMI plus basse, gauche et de petit calibre.',
    vascularisation: 'Tronc cœliaque → foie, rate, estomac, duodénum proximal (lit de basse résistance permanent : foie + rate). AMS → intestin grêle jusqu\'à l\'angle colique gauche (lit variable : haute résistance à jeun, basse résistance après repas). AMI → côlon gauche + rectum supérieur.',
    rapports: ['Aorte abdominale en arrière, VMS et veine porte à proximité de l\'AMS', 'Pancréas (corps/queue) le long de l\'artère splénique', 'Ligament arqué médian du diaphragme cravatant le tronc cœliaque à son origine', 'Graisse rétropéritonéale échogène autour de l\'AMS (repère utile)'],
    variantes: ['Tronc cœlio-mésentérique (origine commune cœliaque + AMS) — rare', 'Artère hépatique droite naissant de l\'AMS (variante fréquente)', 'Arcade de Riolan et arcade de Bühler : anastomoses entre les axes, qui se développent et deviennent visibles en cas de sténose/occlusion d\'un axe (suppléance)', 'Origine de l\'AMI parfois introuvable chez le sujet maigre comme obèse']
  },
  physiologie: {
    texte: 'La forme du spectre dépend de la résistance du lit d\'aval, qui varie au cours du nycthémère pour l\'AMS.\nTronc cœliaque : lit de basse résistance EN PERMANENCE (foie et rate ont une demande continue) → spectre monophasique, diastole bien remplie, IR bas, et ce À JEUN comme en post-prandial.\nAMS À JEUN : intestin au repos → HAUTE résistance → spectre triphasique avec reflux protodiastolique et diastole basse.\nAMS EN POST-PRANDIAL : l\'hyperémie digestive (45–90 min après un repas test) abaisse la résistance d\'aval → le spectre devient monophasique à BASSE résistance, la diastole se comble, la VPS et surtout la VTD augmentent fortement, le débit augmente. Cette réponse post-prandiale est le test fonctionnel clé : son absence évoque une atteinte significative.\nAMI : profil de haute résistance à jeun, peu étudiée fonctionnellement.',
    profils: [
      { nom: 'Tronc cœliaque', desc: 'Basse résistance permanente (foie + rate) : monophasique, diastole remplie, IR bas, à jeun comme après repas.' },
      { nom: 'AMS à jeun', desc: 'Haute résistance : triphasique, reflux protodiastolique, diastole basse. C\'est le profil normal à jeun.' },
      { nom: 'AMS post-prandiale', desc: 'Basse résistance : diastole comblée, VTD et VPS en nette augmentation, IR abaissé. Réponse normale au repas test.' },
      { nom: 'AMI', desc: 'Haute résistance (côlon au repos) ; petite, souvent difficile à analyser.' },
      { nom: 'Suppléance (arcades)', desc: 'En cas de sténose d\'un axe, le développement des arcades de Riolan/Bühler peut inverser ou majorer le flux dans un autre axe (collatéralité) — indice indirect d\'atteinte.' }
    ]
  },
  physique: {
    intro: 'Territoire profond et mobile (respiration, gaz) : basse fréquence, harmonique, apnée et patience sont les clés.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Convexe 2–5 MHz pour atteindre l\'aorte et ses branches (8–12 cm de profondeur). Descendre la fréquence et activer l\'harmonique tissulaire chez le patient difficile.' },
      { titre: 'Angle', desc: 'Les branches digestives naissent souvent à angle aigu, favorable : curseur d\'angle aligné sur l\'axe du vaisseau, ≤ 60°, au point de vitesse maximale (ostium pour l\'athérome).' },
      { titre: 'Apnée & respiration', desc: 'Apnée en expiration douce pour stabiliser l\'image ; mais pour le ligament arqué, comparer EXPIRATION (compression maximale) et INSPIRATION profonde (levée). La manœuvre respiratoire est diagnostique.' },
      { titre: 'PRF & ligne de base', desc: 'PRF adaptée à des vitesses potentiellement élevées (sténose ostiale, ligament arqué) ; ne pas confondre l\'aliasing d\'une accélération réelle avec un réglage trop bas.' }
    ]
  },
  reglages: {
    intro: 'Réglages digestifs types (sonde convexe abdominale).',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Harmonique ON si difficile' },
      { param: 'Profondeur', valeur: '8–14 cm', note: 'Aorte au ⅔ de l\'écran' },
      { param: 'Focale', valeur: 'Sur l\'ostium de la branche', note: 'Là où se forme l\'athérome' },
      { param: 'PRF couleur', valeur: 'Moyenne→haute', note: '↑ sur accélération ostiale' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // axe du vaisseau', note: 'Au point de VPS max' },
      { param: 'Porte', valeur: '⅓ lumière, centrée', note: 'À l\'ostium pour l\'AMS / tronc cœliaque' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Pour voir la diastole (post-prandial)' },
      { param: 'Respiration', valeur: 'Apnée + manœuvres', note: 'Expiration/inspiration pour ligament arqué' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, à JEUN strict (≥ 6 h), abdomen découvert ; éventuellement décubitus latéral pour fuir les gaz.',
    operateur: 'Assis ou debout au côté droit, avant-bras en appui, main libre sur PRF/baseline.',
    ecran: 'Dans l\'axe du regard, lumière tamisée.',
    sonde: 'Convexe en coupe SAGITTALE médiane (épigastre) pour l\'aorte longitudinale, puis TRANSVERSE pour le signe de la mouette.',
    ergonomie: 'Exploiter l\'apnée du patient ; prévoir un examen un peu long (gaz) et le temps du repas test pour l\'AMS.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérage de l\'aorte (sagittal)', desc: 'Coupe sagittale médiane épigastrique : identifier l\'aorte abdominale antérieure au rachis. Suivre sa face antérieure de haut en bas pour voir naître les branches.' },
      { titre: 'Tronc cœliaque (sagittal puis transverse)', desc: 'Première branche ventrale (~T12), tronc court horizontal. Bascule en TRANSVERSE : on obtient le « signe de la mouette/seagull » — le tronc cœliaque forme le corps, l\'artère hépatique commune (vers la droite) et l\'artère splénique (vers la gauche) forment les ailes.' },
      { titre: 'AMS', desc: 'Juste en dessous du tronc cœliaque (~1 cm) : en sagittal elle plonge à angle aigu et descend parallèlement à l\'aorte ; cernée de graisse échogène. En transverse, c\'est un point rond séparé, en avant de l\'aorte, à proximité de la VMS.' },
      { titre: 'AMI', desc: 'Descendre vers L3, légèrement à gauche : petite branche, souvent au prix de patience et d\'apnée ; le Doppler couleur aide à la repérer.' },
      { titre: 'Doppler pulsé systématique', desc: 'Mesurer VPS/VTD à l\'ostium et en post-ostial de chaque axe accessible ; identifier le profil (haute vs basse résistance). Rechercher l\'accélération ostiale (athérome).' },
      { titre: 'Manœuvres respiratoires (tronc cœliaque)', desc: 'Mesurer la VPS du tronc cœliaque en EXPIRATION puis en INSPIRATION profonde : une VPS élevée en expiration régressant en inspiration signe le ligament arqué médian.' },
      { titre: 'Test de repas (AMS)', desc: 'Si AMS suspecte : mesurer à jeun, faire ingérer un repas test calibré, puis remesurer 45–90 min après. Comparer la réponse (comblement diastolique, VTD↑).' }
    ],
    reperes: ['Tronc cœliaque = 1ʳᵉ branche ventrale, « signe de la mouette » en transverse', 'AMS = juste sous le tronc cœliaque, cernée de graisse, longe la VMS', 'AMI = basse (L3), gauche, petite'],
    astuces: ['Le manchon de graisse échogène autour de l\'AMS est un repère fiable pour ne pas la confondre avec le tronc cœliaque.', 'Pour le ligament arqué, filmer/mesurer pendant tout le cycle respiratoire.', 'En cas de gaz, décubitus latéral, compression douce, ou repasser après quelques minutes.', 'Repérer l\'AMI au Doppler couleur d\'abord, puis poser la porte.'],
    erreurs: ['Confondre le tronc cœliaque et l\'AMS (erreur de seuil majeure).', 'Oublier les manœuvres respiratoires → manquer un ligament arqué.', 'Appliquer les seuils « à jeun » sur une mesure post-prandiale (ou inversement).', 'Conclure sans repas test sur une AMS limite.', 'Angle > 60° ou prise hors du point de vitesse maximale.']
  },
  interpretation: {
    normal: ['Tronc cœliaque : monophasique basse résistance, VPS < 200 cm/s', 'AMS à jeun : triphasique haute résistance, VPS < 275 cm/s', 'AMS post-prandiale : comblement diastolique net (VTD↑), réponse présente', 'AMI perméable quand visible ; pas d\'accélération ostiale', 'Pas de crochet ni de variation respiratoire pathologique du tronc cœliaque'],
    pathologique: ['Accélération ostiale focale + aliasing = sténose (athérome ostial)', 'Atteinte d\'au moins 2 des 3 axes → ischémie mésentérique chronique', 'VPS tronc cœliaque élevée en EXPIRATION régressant en INSPIRATION = ligament arqué médian', 'Absence de réponse post-prandiale de l\'AMS = significatif', 'Absence de flux (couleur + énergie) = occlusion (urgence si AMS aiguë)', 'Développement d\'arcades de suppléance (Riolan/Bühler) = atteinte chronique d\'un axe'],
    svgPatho: SVG_DIG_3,
    capPatho: 'Réponse post-prandiale normale de l\'AMS (haute résistance à jeun → basse résistance après repas). Son absence oriente vers une ischémie mésentérique chronique.'
  },
  valeurs: {
    intro: 'Critères vélocimétriques des axes digestifs (seuils variables selon les laboratoires ; à adapter au contexte clinique). Les seuils de l\'AMS sont définis À JEUN.',
    lignes: [
      { param: 'Tronc cœliaque normal', valeur: 'VPS < 200 cm/s, monophasique', note: 'Basse résistance permanente' },
      { param: 'AMS normale à jeun', valeur: 'VPS < 275 cm/s, triphasique', note: 'Haute résistance à jeun' },
      { param: 'Sténose tronc cœliaque ≥ 70 %', valeur: 'VPS > 200 cm/s', note: 'Seuil variable (≈ 200 cm/s)' },
      { param: 'Sténose AMS ≥ 70 %', valeur: 'VPS > 275 cm/s', note: 'Seuil variable ; VTD > 45 cm/s évocateur' },
      { param: 'AMS post-prandiale (normale)', valeur: 'VTD↑ nette, comblement diastolique', note: 'Mesure 45–90 min après repas test' },
      { param: 'Absence de réponse post-prandiale', valeur: 'Pas de comblement diastolique', note: 'Évoque une sténose significative de l\'AMS' },
      { param: 'Ligament arqué médian', valeur: 'VPS expiratoire ↑, régressant en inspiration', note: 'Manœuvre respiratoire indispensable' },
      { param: 'Rapport AMS/aorte', valeur: '> 3–3,5 si sténose serrée', note: 'Appoint si vitesses ambiguës' },
      { param: 'Occlusion (tout axe)', valeur: 'Absence de flux couleur + énergie', note: 'Vérifier PRF/filtre bas ; suppléance' }
    ]
  },
  pathologies: [
    { nom: 'Ischémie mésentérique chronique (« angor abdominal »)', physiopath: 'Athérome ostial sténosant ≥ 2 des 3 axes digestifs ; la riche collatéralité explique qu\'une atteinte d\'un seul axe soit souvent asymptomatique. Triade clinique : douleur post-prandiale, amaigrissement, peur de manger (sitophobie).', bmode: 'Plaque/calcium ostial, réduction de calibre', doppler: 'VPS ostiale élevée (AMS > 275 cm/s, tronc cœliaque > 200 cm/s), aliasing, turbulence post-sténotique ; absence de réponse post-prandiale de l\'AMS ; arcades de suppléance', ddx: 'Ligament arqué médian (compression du seul tronc cœliaque, variation respiratoire), pathologie digestive non vasculaire', pieges: 'Conclure sur un seul axe ; seuils à jeun vs post-prandial ; gaz masquant l\'ostium', gravite: 'Risque d\'évolution vers l\'ischémie aiguë ; retentissement nutritionnel', cat: 'Quantifier les 3 axes, angio-TDM de confirmation, avis chirurgical/endovasculaire (revascularisation)' },
    { nom: 'Syndrome du ligament arqué médian', physiopath: 'Compression EXTRINSÈQUE du tronc cœliaque par le ligament arqué médian du diaphragme, accentuée en EXPIRATION et levée en INSPIRATION profonde. Sujet souvent jeune, mince. Atteinte du seul tronc cœliaque.', bmode: 'Crochet/encoche caractéristique sur le bord supérieur du tronc cœliaque, courbure « en hameçon »', doppler: 'VPS expiratoire très élevée (souvent > 200 cm/s) avec déviation/crochet, régressant nettement en INSPIRATION profonde ; flux dans l\'artère hépatique pouvant être affecté', ddx: 'Sténose athéromateuse (fixe, ostiale, ne varie pas avec la respiration ; sujet plus âgé)', pieges: 'Ne pas faire les manœuvres respiratoires → diagnostic manqué ou confondu avec un athérome', gravite: 'Variable, parfois symptomatique (douleur post-prandiale)', cat: 'Confirmer la variation respiratoire ; angio-TDM/IRM en expiration ; avis chirurgical (section du ligament) si symptomatique' },
    { nom: 'Ischémie mésentérique aiguë', physiopath: 'Occlusion brutale de l\'AMS (embolie cardiaque le plus souvent, ou thrombose sur athérome), entraînant une nécrose intestinale. Urgence vitale.', bmode: 'Matériel endoluminal de l\'AMS, parfois anses dilatées', doppler: 'Absence de flux dans l\'AMS (couleur + énergie), arrêt brutal du flux', ddx: 'Ischémie chronique décompensée, thrombose veineuse mésentérique', pieges: 'L\'échographie peut être prise en défaut (gaz, état de choc) — ne pas retarder l\'angio-TDM', gravite: 'Urgence chirurgicale absolue', cat: 'Angio-TDM en urgence, revascularisation/résection ; le Doppler ne doit jamais retarder la prise en charge' },
    { nom: 'Sténose isolée d\'un seul axe (asymptomatique)', physiopath: 'Sténose/occlusion athéromateuse d\'un seul axe (souvent tronc cœliaque) bien suppléée par la collatéralité.', bmode: 'Plaque ostiale isolée', doppler: 'Accélération ostiale d\'un seul axe, autres axes normaux, réponse post-prandiale AMS conservée', ddx: 'Ligament arqué (si tronc cœliaque)', pieges: 'Surinterpréter une atteinte d\'un seul axe comme « ischémie mésentérique »', gravite: 'Généralement bénin si asymptomatique', cat: 'Souvent surveillance ; corréler à la clinique avant toute décision' }
  ],
  algorithme: {
    titre: 'Douleur abdominale post-prandiale : démarche Doppler digestive',
    noeuds: [
      { q: 'Triade évocatrice (douleur post-prandiale + amaigrissement + peur de manger) ?', a: 'Oui → explorer les 3 axes (tronc cœliaque, AMS, AMI) à jeun' },
      { q: 'Accélération ostiale sur AMS et/ou tronc cœliaque ?', a: 'AMS VPS > 275 cm/s et/ou tronc cœliaque VPS > 200 cm/s → suspecter une sténose' },
      { q: 'Au moins 2 des 3 axes atteints ?', a: 'Oui → ischémie mésentérique chronique probable → angio-TDM + avis revascularisation' },
      { q: 'Atteinte du SEUL tronc cœliaque ?', a: 'Faire les manœuvres respiratoires : VPS qui ↑ en expiration et régresse en inspiration → ligament arqué (et non athérome)' },
      { q: 'AMS limite mais clinique évocatrice ?', a: 'Test de repas : absence de réponse post-prandiale → significatif' },
      { q: 'Tableau aigu, absence de flux AMS ?', a: 'Urgence → angio-TDM immédiate (ischémie mésentérique aiguë), ne pas retarder' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES ARTÈRES DIGESTIVES

Indication : [douleur abdominale post-prandiale / amaigrissement / bilan].
Technique : patient à jeun, sonde convexe, mode B + Doppler couleur et pulsé.

Tronc cœliaque : perméable, ostium libre, flux monophasique de basse résistance, VPS __ cm/s (< 200). Pas de crochet ni de variation respiratoire pathologique.
AMS : perméable, ostium libre, flux triphasique de haute résistance à jeun, VPS __ cm/s (< 275). [Réponse post-prandiale présente si test réalisé.]
AMI : perméable quand visualisée, sans accélération ostiale.

CONCLUSION : Axes digestifs perméables, sans sténose significative. Pas d'argument pour une ischémie mésentérique ni un syndrome du ligament arqué.`,
    pathologique: `ÉCHO-DOPPLER DES ARTÈRES DIGESTIVES

Indication : [angor abdominal / amaigrissement / peur de manger].
Technique : patient à jeun, sonde convexe, mode B + Doppler couleur et pulsé, manœuvres respiratoires [± test de repas].

Tronc cœliaque : plaque/accélération ostiale, VPS __ cm/s (> 200) → sténose estimée significative. [Variation respiratoire : __ → en faveur de athérome / ligament arqué.]
AMS : accélération ostiale, VPS __ cm/s (> 275), VTD __ cm/s, turbulence post-sténotique → sténose ≥ 70 %. [Réponse post-prandiale absente.]
AMI : __. Arcades de suppléance : __.

CONCLUSION : Atteinte de [nombre] des 3 axes digestifs (__ et __) → ischémie mésentérique chronique probable.
[OU : Compression du tronc cœliaque variable avec la respiration → syndrome du ligament arqué médian.]
[Proposition : confirmation angio-TDM et avis chirurgical/endovasculaire.]`
  },
  cas: [
    { titre: 'Tronc cœliaque ou AMS ?', enonce: 'Sur la face antérieure de l\'aorte, vous repérez une branche ventrale qui, en coupe transverse, se divise en deux et donne une image en « ailes ».', questions: ['Quel axe est-ce ?', 'Comment confirmer l\'AMS juste en dessous ?'], indices: ['Signe de la mouette', 'Manchon graisseux'], reponse: 'C\'est le tronc cœliaque (signe de la mouette : corps + 2 ailes = hépatique commune et splénique). L\'AMS se situe ~1 cm en dessous, c\'est un point rond cerné de graisse échogène longeant la VMS.' },
    { titre: 'AMS à jeun « inquiétante »', enonce: 'À jeun, l\'AMS présente un spectre triphasique avec diastole basse, VPS à 180 cm/s.', questions: ['Est-ce pathologique ?'], indices: ['Profil normal à jeun ?', 'Seuil de sténose'], reponse: 'Non : le profil triphasique de haute résistance est NORMAL pour l\'AMS à jeun, et 180 cm/s reste sous le seuil de 275 cm/s. La diastole basse à jeun est physiologique.' },
    { titre: 'Réponse au repas', enonce: 'AMS limite à jeun. Après un repas test, 60 min plus tard, la diastole se comble nettement et la VTD augmente franchement.', questions: ['Que conclure ?'], reponse: 'La réponse post-prandiale est présente et normale (passage à un profil de basse résistance) : argument fort CONTRE une sténose significative de l\'AMS.' },
    { titre: 'Jeune femme mince, douleur post-prandiale', enonce: 'Tronc cœliaque : VPS à 280 cm/s avec crochet du bord supérieur en EXPIRATION ; en INSPIRATION profonde, la VPS chute à 140 cm/s. AMS et AMI normales.', questions: ['Diagnostic ?', 'Pourquoi ce n\'est pas un athérome ?'], reponse: 'Syndrome du ligament arqué médian : compression extrinsèque variable avec la respiration (maximale en expiration, levée en inspiration). Un athérome ostial serait fixe et ne varierait pas ; le terrain (jeune, mince, axe unique) renforce le diagnostic.' },
    { titre: 'Deux axes atteints', enonce: 'Tronc cœliaque VPS 230 cm/s et AMS VPS 320 cm/s, toutes deux avec accélération ostiale fixe ; patient de 70 ans amaigri, douleurs post-prandiales.', questions: ['Diagnostic ?', 'Conduite ?'], reponse: 'Ischémie mésentérique chronique (atteinte de ≥ 2 axes + clinique typique). Confirmer par angio-TDM et orienter vers une revascularisation (avis chirurgical/endovasculaire).' },
    { titre: 'Un seul axe atteint, asymptomatique', enonce: 'Occlusion du tronc cœliaque découverte fortuitement ; AMS et AMI normales, patient asymptomatique, arcades de suppléance visibles.', questions: ['Est-ce une ischémie mésentérique ?'], reponse: 'Non : l\'atteinte d\'un seul axe est habituellement bien suppléée (collatéralité) et asymptomatique. Surveillance et corrélation clinique, pas de revascularisation systématique.' },
    { titre: 'Absence de flux AMS, tableau aigu', enonce: 'Patient en fibrillation auriculaire, douleur abdominale brutale intense, lactates élevés. Pas de flux décelable dans l\'AMS au Doppler.', questions: ['Diagnostic à évoquer ?', 'Que faire immédiatement ?'], reponse: 'Ischémie mésentérique aiguë (probable embolie de l\'AMS sur FA). URGENCE : angio-TDM immédiate et avis chirurgical ; le Doppler ne doit jamais retarder la prise en charge.' },
    { titre: 'Pas de flux… ou flux lent ?', enonce: 'Vous ne voyez aucun flux couleur dans l\'AMI ; PRF et filtre mural sont réglés haut.', questions: ['Avant de conclure à une occlusion, que faites-vous ?'], reponse: 'Baisser la PRF et le filtre mural, passer en Doppler énergie : l\'AMI est petite et son flux peut être lent ; ne pas conclure à une occlusion sur des réglages inadaptés.' },
    { titre: 'Tortuosité de la splénique', enonce: 'En suivant la branche gauche du tronc cœliaque, vous notez de multiples aliasing couleur sur un trajet très sinueux.', questions: ['Sténose ou artefact ?'], reponse: 'L\'artère splénique est physiologiquement tortueuse : les aliasing sont liés aux changements d\'angle/trajet, pas à une sténose. Mesurer la VPS dans les segments rectilignes et ne pas surinterpréter la mosaïque de tortuosité.' },
    { titre: 'Patient ballonné', enonce: 'Examen demandé mais l\'aorte et ses branches sont masquées par d\'abondants gaz digestifs.', questions: ['Quelles solutions ?'], reponse: 'Patient à jeun strict, compression douce et progressive, décubitus latéral, fenêtres alternatives, voire report/repassage après quelques minutes ; si échec, proposer l\'angio-TDM, examen de référence du territoire digestif.' }
  ],
  pieges: [
    'Confondre le tronc cœliaque et l\'AMS → application du mauvais seuil (200 vs 275 cm/s).',
    'Oublier les manœuvres respiratoires → manquer un syndrome du ligament arqué médian.',
    'Interpréter une mesure post-prandiale avec les seuils « à jeun » (ou inversement) → faux positif/négatif.',
    'Conclure à une ischémie mésentérique sur l\'atteinte d\'un SEUL axe (oublier la suppléance / la règle des ≥ 2 axes).',
    'Surinterpréter la mosaïque de l\'artère splénique tortueuse comme une sténose.',
    'Conclure à une occlusion avec PRF/filtre trop hauts (AMI petite à flux lent).',
    'Se laisser arrêter par les gaz et ne pas proposer l\'angio-TDM en cas d\'examen non contributif.',
    'Angle > 60° ou prise hors du point de vitesse maximale → surestimation/sous-estimation du %.',
    'Retarder la prise en charge d\'une ischémie mésentérique aiguë par excès d\'investigation Doppler.'
  ],
  flashcards: [
    { q: 'Profil normal de l\'AMS à jeun ?', r: 'Haute résistance : triphasique, reflux protodiastolique, diastole basse.' },
    { q: 'Que devient l\'AMS en post-prandial (45–90 min) ?', r: 'Basse résistance : diastole comblée, VTD et VPS en nette augmentation, IR abaissé.' },
    { q: 'Profil du tronc cœliaque ?', r: 'Basse résistance EN PERMANENCE (foie + rate), à jeun comme après repas.' },
    { q: 'Seuils de sténose ≥ 70 % AMS et tronc cœliaque ?', r: 'AMS VPS > 275 cm/s ; tronc cœliaque VPS > 200 cm/s (seuils variables selon labo).' },
    { q: 'Combien d\'axes atteints pour parler d\'ischémie mésentérique chronique ?', r: 'Au moins 2 des 3 axes (riche collatéralité), avec clinique compatible.' },
    { q: 'Comment reconnaître le syndrome du ligament arqué médian ?', r: 'VPS du tronc cœliaque élevée + crochet en EXPIRATION, régressant en INSPIRATION profonde (manœuvre respiratoire +++).' },
    { q: 'Quel est le « signe de la mouette » ?', r: 'En coupe transverse, le tronc cœliaque (corps) et ses branches hépatique commune et splénique (ailes) dessinent une mouette.' }
  ],
  qcm: [
    { q: 'À jeun, le profil NORMAL de l\'AMS est :', options: ['Basse résistance (diastole remplie)', 'Haute résistance (triphasique, diastole basse)', 'Parvus-tardus', 'Bidirectionnel'], correct: 1, exp: 'À jeun l\'intestin est au repos → haute résistance (triphasique). Le profil devient basse résistance après le repas.' },
    { q: 'Une VPS du tronc cœliaque élevée en expiration qui régresse en inspiration profonde évoque :', options: ['Une sténose athéromateuse ostiale', 'Un syndrome du ligament arqué médian', 'Une ischémie aiguë', 'Une réponse post-prandiale'], correct: 1, exp: 'La variation respiratoire (compression extrinsèque maximale en expiration, levée en inspiration) signe le ligament arqué médian, contrairement à l\'athérome qui est fixe.' },
    { q: 'Le diagnostic d\'ischémie mésentérique chronique repose typiquement sur :', options: ['L\'atteinte d\'un seul axe', 'L\'atteinte d\'au moins 2 des 3 axes + clinique', 'Une VPS basse de l\'AMS', 'L\'absence de tronc cœliaque'], correct: 1, exp: 'La riche collatéralité fait qu\'une atteinte isolée est souvent asymptomatique : il faut ≥ 2 axes atteints avec une clinique compatible (angor abdominal).' },
    { q: 'Le seuil vélocimétrique évocateur d\'une sténose serrée de l\'AMS (à jeun) est de l\'ordre de :', options: ['VPS > 125 cm/s', 'VPS > 200 cm/s', 'VPS > 275 cm/s', 'VPS > 400 cm/s'], correct: 2, exp: 'AMS ≈ 275 cm/s, tronc cœliaque ≈ 200 cm/s (seuils variables selon les laboratoires).' }
  ],
  refs: ['DIU Montpellier (artères digestives) ; recommandations SFMV (écho-Doppler digestif) ; ESVS 2017 Clinical Practice Guidelines on the Management of the Diseases of Mesenteric Arteries and Veins ; Moneta GL et al. (critères vélocimétriques mésentériques).']
});

})();
