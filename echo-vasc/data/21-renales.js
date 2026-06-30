/* ÉCHO-VASC DIU — Artères rénales & Doppler rénal */
window.VASC = window.VASC || { chapters: [] };

(function(){

const SVG_RENAL_1 = `<svg viewBox="0 0 460 240" role="img" aria-label="Anatomie des artères rénales">
<rect width="460" height="240" fill="#fff"/>
<rect x="210" y="10" width="40" height="220" fill="#fde2e2" stroke="#dc2626"/>
<text x="214" y="225" font-size="10" fill="#991b1b">Aorte</text>
<path d="M250,55 C300,55 330,50 360,40" fill="none" stroke="#dc2626" stroke-width="9"/>
<text x="300" y="30" font-size="11" fill="#b45309">AMS (repère)</text>
<path d="M250,80 C300,82 340,90 400,100" fill="none" stroke="#dc2626" stroke-width="10"/>
<text x="350" y="120" font-size="11" fill="#991b1b">A. rénale droite (longue, rétro-cave)</text>
<path d="M210,90 C160,92 120,98 60,108" fill="none" stroke="#dc2626" stroke-width="10"/>
<text x="40" y="128" font-size="11" fill="#991b1b">A. rénale gauche (courte)</text>
<ellipse cx="415" cy="105" rx="30" ry="48" fill="#fee2e2" stroke="#dc2626"/>
<text x="392" y="160" font-size="10" fill="#991b1b">Rein D</text>
<ellipse cx="45" cy="113" rx="30" ry="48" fill="#fee2e2" stroke="#dc2626"/>
<text x="28" y="170" font-size="10" fill="#991b1b">Rein G</text>
<path d="M250,120 C280,140 300,165 320,185" fill="none" stroke="#f59e0b" stroke-width="6"/>
<text x="280" y="205" font-size="10" fill="#b45309">A. polaire accessoire (piège)</text>
</svg>`;

const SVG_RENAL_2 = `<svg viewBox="0 0 460 210" role="img" aria-label="Spectres Doppler rénaux normal et parvus-tardus">
<rect width="460" height="210" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Tronc rénal normal (basse résistance)</text>
<line x1="20" y1="70" x2="220" y2="70" stroke="#cbd5e1"/>
<path d="M20,70 L34,28 C50,40 60,52 80,54 C110,57 120,62 150,30 C172,48 185,58 205,60" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="22" y="90" font-size="9" fill="#1d4ed8">Pic systolique précoce net, diastole bien remplie</text>
<text x="250" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Parvus-tardus (aval de sténose)</text>
<line x1="250" y1="70" x2="450" y2="70" stroke="#cbd5e1"/>
<path d="M250,70 C285,52 315,48 350,50 C390,52 415,60 450,62" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
<text x="252" y="90" font-size="9" fill="#b45309">Montée lente (TA > 0,07 s), pic émoussé, perte du pic précoce</text>
<text x="8" y="130" font-size="11" font-weight="bold" fill="#0b2f63">Néphropathie d'aval (IR élevé > 0,80)</text>
<line x1="20" y1="185" x2="220" y2="185" stroke="#cbd5e1"/>
<path d="M20,185 L34,128 L48,150 C70,178 90,182 120,183 C150,184 175,184 205,184" fill="none" stroke="#dc2626" stroke-width="1.8"/>
<text x="22" y="200" font-size="9" fill="#dc2626">Pic élevé, diastole quasi nulle</text>
<text x="250" y="130" font-size="11" font-weight="bold" fill="#0b2f63">Sténose ostiale (VPS élevée + aliasing)</text>
<line x1="250" y1="185" x2="450" y2="185" stroke="#cbd5e1"/>
<path d="M250,185 L275,118 L300,185 M300,185 L325,118 L350,185" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="252" y="200" font-size="9" fill="#dc2626">VPS > 180–200 cm/s, élargissement spectral</text>
</svg>`;

window.VASC.chapters.push({
  id: 'renales', num: 22, groupe: 'Artériel — Aorte & branches', emoji: '🫘',
  titre: 'Artères rénales & Doppler rénal',
  sonde: 'Convexe 2–5 MHz', niveau: 'DIU → expert', duree: '≈3 h',
  resume: 'Exploration des artères rénales et du parenchyme rénal : dépistage et quantification de la sténose de l\'artère rénale (athéromateuse ostiale vs fibrodysplasique médio-distale), analyse des critères directs (VPS, rapport réno-aortique) et indirects intra-rénaux (parvus-tardus), mesure de l\'index de résistance. Examen difficile, opérateur-dépendant, mais décisif dans l\'HTA secondaire et la néphropathie ischémique.',
  tags: 'rénale SAR sténose artère rénale RAR parvus-tardus IR index résistance fibrodysplasie ostiale HTA secondaire artère polaire néphroangiosclérose infarctus rénal',
  objectifs: [
    'Identifier l\'origine des artères rénales sur l\'aorte et reconnaître les variantes (artères polaires/accessoires).',
    'Réaliser un Doppler du tronc rénal et un Doppler intra-rénal parenchymateux (interlobaires/arquées).',
    'Quantifier une sténose de l\'artère rénale par les critères directs (VPS, rapport réno-aortique).',
    'Appliquer les critères indirects intra-rénaux (parvus-tardus : temps d\'ascension, accélération) et en connaître l\'intérêt et les limites.',
    'Mesurer et interpréter l\'index de résistance intra-rénal (pronostic, néphropathie d\'aval, asymétrie).',
    'Distinguer SAR athéromateuse et fibrodysplasie, et reconnaître thrombose/infarctus rénal.',
    'Poser les indications d\'un Doppler rénal et rédiger un compte-rendu standardisé.'
  ],
  anatomie: {
    texte: 'Les artères rénales naissent de la face latérale de l\'aorte abdominale, juste sous l\'origine de l\'artère mésentérique supérieure (AMS), à hauteur de L1-L2. L\'artère rénale droite est plus longue et naît un peu plus bas, passant en arrière de la veine cave inférieure (trajet rétro-cave). L\'artère rénale gauche est plus courte et plus horizontale. Chaque artère se divise en branches segmentaires, puis interlobaires (le long des pyramides), arquées (à la jonction cortico-médullaire) et interlobulaires. Les artères polaires ou accessoires (rénales surnuméraires) sont FRÉQUENTES (≈ 20-30 % des reins) et naissent souvent directement de l\'aorte : c\'est un piège majeur car elles peuvent porter la sténose et être manquées.',
    svg: SVG_RENAL_1,
    caption: 'Schéma : origines rénales sur la face latérale de l\'aorte, sous l\'AMS. Artère rénale droite longue et rétro-cave, gauche courte. Présence fréquente d\'une artère polaire accessoire (en orange) naissant de l\'aorte — peut porter la sténose.',
    vascularisation: 'Le rein est un organe de BASSE résistance (forte demande de perfusion continue) : spectre monophasique, diastole bien remplie, IR normal 0,55-0,70. La perfusion corticale (filtration) est dominante.',
    rapports: ['Veine cave inférieure (l\'artère rénale droite passe en arrière)', 'Veine rénale gauche (passe entre l\'aorte et l\'AMS — pince aorto-mésentérique)', 'AMS et tronc cœliaque, repères en amont sur l\'aorte', 'Pédicule rénal : artère, veine et bassinet au hile'],
    variantes: ['Artères polaires/accessoires très fréquentes (peuvent porter la sténose — piège majeur)', 'Origine multiple (deux ou trois artères pour un même rein)', 'Rein unique, en fer à cheval ou ectopique (origine artérielle aberrante)', 'Naissance basse ou haute de l\'artère rénale modifiant la fenêtre d\'abord']
  },
  physiologie: {
    texte: 'Le rein est un lit vasculaire de BASSE résistance : la diastole est bien remplie et l\'index de résistance (IR = (VPS − VTD)/VPS) est normalement compris entre 0,55 et 0,70.\nEn amont d\'une sténose serrée, le tronc rénal accélère (VPS élevée, turbulence, aliasing) : ce sont les critères DIRECTS.\nEn aval d\'une sténose serrée, le flux intra-rénal s\'amortit : ascension systolique lente, perte du pic systolique précoce, pic émoussé — c\'est le PARVUS-TARDUS, base des critères INDIRECTS.\nL\'IR intra-rénal reflète la résistance du parenchyme : un IR > 0,80 traduit une néphropathie d\'aval (néphroangiosclérose, fibrose, atteinte parenchymateuse) et est de mauvais pronostic, notamment pour la réponse à une revascularisation.',
    profils: [
      { nom: 'Tronc rénal normal', desc: 'Basse résistance : pic systolique précoce net, diastole bien remplie. VPS normale ≈ 60-100 cm/s. Repère par rapport à l\'aorte (rapport réno-aortique < 3,5).' },
      { nom: 'Intra-rénal normal (interlobaires/arquées)', desc: 'Spectre monophasique de basse résistance, pic systolique précoce conservé, IR 0,55-0,70, temps d\'ascension systolique < 0,07 s.' },
      { nom: 'Parvus-tardus (aval de SAR)', desc: 'Amorti : ascension systolique lente (temps de montée > 0,07 s), accélération systolique abaissée (< 3 m/s²), perte du pic systolique précoce, pic émoussé. Signe une sténose serrée d\'amont.' },
      { nom: 'Néphropathie d\'aval (IR élevé)', desc: 'IR > 0,80 : diastole effondrée, pic systolique haut. Atteinte parenchymateuse (néphroangiosclérose, fibrose, rejet) — mauvais pronostic.' }
    ]
  },
  physique: {
    intro: 'Le Doppler rénal est l\'un des examens vasculaires les plus difficiles : profondeur, gaz digestifs, mouvements respiratoires et angle imposent rigueur et patience.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Convexe basse fréquence 2-5 MHz pour atteindre l\'aorte et le hile rénal (profondeur 8-15 cm). Descendre en fréquence et utiliser l\'harmonique chez le patient corpulent ou difficile.' },
      { titre: 'Angle d\'insonation', desc: 'Le tronc rénal naît perpendiculairement à l\'aorte (abord antérieur) : l\'angle ≤ 60° est souvent difficile à obtenir. Privilégier les abords par les flancs (coupe coronale) où l\'artère est davantage dans l\'axe du faisceau. C\'est le facteur n°1 de fiabilité de la VPS.' },
      { titre: 'PRF & filtre', desc: 'PRF adaptée : haute sur le tronc (vitesses élevées en cas de sténose), plus basse en intra-rénal (flux lents). Filtre mural bas en intra-rénal pour ne pas effacer la diastole et fausser l\'IR.' },
      { titre: 'Doppler énergie', desc: 'Très utile pour la cartographie de la perfusion parenchymateuse (recherche d\'infarctus segmentaire, plage avasculaire) et pour repérer les flux lents distaux, peu angle-dépendant.' },
      { titre: 'Apnée & respiration', desc: 'Acquérir en apnée (souvent inspiration) pour stabiliser le rein et le pédicule, réduire le flou de mouvement et fixer l\'angle.' }
    ]
  },
  reglages: {
    intro: 'Réglages rénaux types — adapter en permanence entre tronc (profond, rapide) et intra-rénal (flux lents).',
    lignes: [
      { param: 'Sonde', valeur: 'Convexe 2–5 MHz', note: 'Harmonique ON si patient difficile' },
      { param: 'Profondeur', valeur: '8–15 cm', note: 'Aorte/hile au ⅔ de l\'écran' },
      { param: 'Focale', valeur: 'Au niveau de l\'artère cible', note: 'Tronc ostial ou hile' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // artère', note: 'Souvent meilleur par les flancs (coronal)' },
      { param: 'Porte', valeur: '⅓ lumière, centrée', note: 'Au point de VPS max dans la sténose' },
      { param: 'PRF tronc', valeur: 'Haute (sténose)', note: 'Vitesses élevées sans aliasing' },
      { param: 'PRF intra-rénal', valeur: 'Basse (flux lents)', note: 'Sensible à la diastole' },
      { param: 'Filtre mural', valeur: 'Bas en intra-rénal', note: 'Préserve la diastole / IR juste' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal puis décubitus latéral droit/gauche selon le rein ; à jeun (≥ 6 h) pour limiter les gaz digestifs ; examen le matin de préférence.',
    operateur: 'Assis au côté du patient, avant-bras en appui, main libre sur les molettes PRF/baseline.',
    ecran: 'Dans l\'axe du regard, lumière tamisée.',
    sonde: 'Convexe, coupe transverse pour repérer l\'aorte et les ostiums, coupe coronale/longitudinale par les flancs pour le tronc et le hile, abord intercostal pour le rein.',
    ergonomie: 'Faire respirer le patient et travailler en apnée ; alterner les abords (antérieur, flancs, intercostal, postérieur) pour contourner les gaz.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérage de l\'aorte', desc: 'Coupe transverse abdominale : identifier l\'aorte, le tronc cœliaque puis l\'AMS ; les artères rénales naissent juste SOUS l\'AMS, sur la face latérale de l\'aorte.' },
      { titre: 'Mesure de la VPS aortique', desc: 'Mesurer la VPS dans l\'aorte au niveau des ostiums rénaux (porte centrée, angle ≤ 60°) : c\'est le dénominateur du rapport réno-aortique (RAR).' },
      { titre: 'Tronc rénal (direct)', desc: 'Suivre chaque artère de l\'ostium au hile, en couleur puis en pulsé. Mesurer la VPS à l\'ostium et sur le tronc, rechercher accélération focale, aliasing, élargissement spectral.' },
      { titre: 'Abord par les flancs', desc: 'Décubitus latéral, coupe coronale : meilleur alignement de l\'angle, visualisation du hile et du parenchyme ; utile quand l\'abord antérieur échoue (gaz).' },
      { titre: 'Doppler intra-rénal (indirect)', desc: 'Échantillonner les artères interlobaires/arquées au pôle supérieur, moyen et inférieur de CHAQUE rein : mesurer IR, temps d\'ascension systolique, accélération ; rechercher un parvus-tardus.' },
      { titre: 'Recherche d\'artère polaire', desc: 'Balayer largement l\'aorte (au-dessus et en dessous de l\'origine principale) et le parenchyme en énergie : une artère polaire peut porter la sténose et expliquer un parvus-tardus segmentaire.' }
    ],
    reperes: ['AMS = repère immédiatement au-dessus des origines rénales', 'Artère rénale droite rétro-cave (passe derrière la VCI)', 'Hile rénal : artère + veine + bassinet', 'Interlobaires le long des pyramides, arquées à la jonction cortico-médullaire'],
    astuces: ['Privilégier l\'abord coronal par les flancs pour un meilleur angle sur le tronc.', 'Travailler en apnée pour stabiliser et fixer l\'angle.', 'Comparer les deux reins (taille, IR, profil) : l\'asymétrie est un signal fort.', 'Baisser PRF et filtre en intra-rénal pour ne pas fausser l\'IR.', 'Penser à l\'artère polaire devant un parvus-tardus segmentaire malgré un tronc principal normal.'],
    erreurs: ['Confondre tronc cœliaque/AMS avec l\'artère rénale (repère erroné des origines).', 'Manquer une artère polaire portant la sténose.', 'Angle > 60° sur le tronc → VPS surestimée (fausse sténose).', 'Filtre/PRF trop hauts en intra-rénal → fausse perte de diastole, IR faussement élevé.', 'IR mal interprété en cas de tachycardie/bradycardie ou d\'arythmie.']
  },
  interpretation: {
    normal: ['Origines rénales libres, tronc sans accélération focale', 'VPS du tronc rénal < 180 cm/s, rapport réno-aortique (RAR) < 3,5', 'Intra-rénal : profil de basse résistance, pic systolique précoce conservé, IR 0,55-0,70', 'Symétrie des deux reins (taille, IR, profil), temps d\'ascension systolique < 0,07 s'],
    pathologique: ['Accélération focale du tronc : VPS > 180-200 cm/s, aliasing, élargissement spectral, RAR > 3,5 = sténose directe', 'Parvus-tardus intra-rénal (temps d\'ascension > 0,07 s, accélération < 3 m/s², perte du pic précoce) = critère indirect de sténose serrée d\'amont', 'IR intra-rénal > 0,80 = néphropathie d\'aval, mauvais pronostic ; asymétrie d\'IR significative', 'Absence de flux segmentaire/parenchymateux (énergie) = infarctus/thrombose'],
    svgPatho: SVG_RENAL_2,
    capPatho: 'Spectres rénaux : tronc normal (basse résistance), parvus-tardus d\'aval, néphropathie d\'aval (IR élevé), sténose ostiale (VPS élevée + aliasing).'
  },
  valeurs: {
    intro: 'Critères vélocimétriques de SAR (critères directs + indirects) et indices intra-rénaux. Les seuils doivent être adaptés au laboratoire et au contexte clinique.',
    lignes: [
      { param: 'IR intra-rénal normal', valeur: '0,55–0,70', note: 'Basse résistance ; > 0,80 = néphropathie d\'aval' },
      { param: 'VPS tronc rénal normale', valeur: '≈ 60–100 cm/s', note: '< 180 cm/s' },
      { param: 'VPS seuil de sténose', valeur: '> 180–200 cm/s', note: 'À l\'ostium/tronc, avec aliasing/turbulence' },
      { param: 'Rapport réno-aortique (RAR)', valeur: '> 3,5', note: 'VPS rénale / VPS aortique → sténose ≥ 60 %' },
      { param: 'Temps d\'ascension systolique', valeur: '> 0,07 s', note: 'Critère indirect (parvus-tardus)' },
      { param: 'Accélération systolique', valeur: '< 3 m/s² (< 300 cm/s²)', note: 'Critère indirect (parvus-tardus)' },
      { param: 'Asymétrie d\'IR', valeur: '> 0,05–0,08', note: 'Évoque une atteinte unilatérale' },
      { param: 'Taille rénale', valeur: 'Asymétrie > 1,5–2 cm', note: 'Petit rein homolatéral = sténose ancienne' }
    ]
  },
  pathologies: [
    { nom: 'SAR athéromateuse (ostiale)', physiopath: 'Plaque athéromateuse à l\'ostium / tronc proximal, débordant souvent de l\'aorte ; sujet âgé, polyvasculaire, FRCV', bmode: 'Calcifications ostiales, plaque aortique, parfois petit rein homolatéral', doppler: 'VPS ostiale > 180-200 cm/s, aliasing, RAR > 3,5 ; en aval parvus-tardus (TA > 0,07 s, accélération < 3 m/s²)', ddx: 'Fibrodysplasie (médio-distale), tortuosité (faux aliasing), hyperdébit', pieges: 'Origine ostiale parfois courte/difficile, calcium masquant, artère polaire portant la sténose, angle > 60°', gravite: 'HTA secondaire, OAP flash, néphropathie ischémique ; revascularisation discutée si retentissement', cat: 'Quantifier (VPS, RAR + indirects), évaluer l\'IR (pronostic), corréler clinique, angio-TDM/IRM et avis spécialisé' },
    { nom: 'Fibrodysplasie de l\'artère rénale', physiopath: 'Dysplasie fibromusculaire de la média, segment médio-distal du tronc ; femme jeune, HTA précoce', bmode: 'Tronc souvent normal en B-mode (lésion distale, hors fenêtre)', doppler: 'Accélération médio-distale, aspect en « collier de perles » (sténoses étagées), turbulence ; parvus-tardus d\'aval possible', ddx: 'SAR athéromateuse (ostiale, âgé), tronc normal', pieges: 'Lésion distale souvent au-delà de la fenêtre échographique → faux négatif fréquent', gravite: 'HTA curable (angioplastie), bon pronostic si traitée tôt', cat: 'Évoquer chez la femme jeune hypertendue ; angio-TDM/IRM ou artériographie si suspicion forte, avis spécialisé (angioplastie)' },
    { nom: 'Néphroangiosclérose / néphropathie d\'aval', physiopath: 'Atteinte parenchymateuse diffuse (HTA chronique, diabète, âge) augmentant la résistance intra-rénale', bmode: 'Reins souvent petits, dédifférenciés, cortex aminci', doppler: 'IR intra-rénal élevé > 0,80, diastole effondrée, tronc sans sténose significative', ddx: 'SAR (asymétrie + parvus-tardus), obstruction (dilatation pyélique)', pieges: 'IR faussé par tachycardie/arythmie/filtre haut ; IR élevé bilatéral = mauvais pronostic de revascularisation', gravite: 'Mauvais pronostic rénal, prédit une faible réponse à la revascularisation', cat: 'Mesurer l\'IR ddc, corréler à la fonction rénale, néphroprotection ; ne pas attendre de bénéfice d\'une revascularisation si IR élevé bilatéral' },
    { nom: 'Thrombose / infarctus rénal', physiopath: 'Occlusion artérielle (embolie cardiaque/FA, dissection, thrombose) → ischémie segmentaire ou totale', bmode: 'Rein normal ou zone hypoéchogène ; parfois rien au début', doppler: 'Absence de flux segmentaire ou complet (couleur ET énergie), plage parenchymateuse avasculaire, défaut de perfusion triangulaire', ddx: 'Néphropathie, kyste avasculaire, artère polaire occluse', pieges: 'Réglages PRF/filtre trop hauts (fausse occlusion) ; ne pas manquer une atteinte segmentaire isolée', gravite: 'Urgence (douleur lombaire, LDH↑) ; risque de perte néphronique', cat: 'Confirmer par angio-TDM, mode énergie à PRF basse, contexte embolique (FA) ; avis urgent' },
    { nom: 'Anévrisme de l\'artère rénale', physiopath: 'Dilatation localisée (souvent au hile/bifurcation), congénital, dysplasique ou athéromateux', bmode: 'Image anéchogène arrondie au hile, ± calcification pariétale', doppler: 'Flux tourbillonnaire (yin-yang), parfois thrombus pariétal', ddx: 'Kyste para-pyélique, dilatation pyélique, ectasie', pieges: 'Confondre avec un kyste (faire le Doppler couleur), sous-estimer si calcifié', gravite: 'Risque de rupture/dissection si > 2 cm ou grossesse', cat: 'Mesurer le diamètre, Doppler couleur ; angio-TDM et avis selon taille/contexte' }
  ],
  algorithme: {
    titre: 'Conduite devant une suspicion de SAR (HTA secondaire)',
    noeuds: [
      { q: 'Quand suspecter une SAR ?', a: 'HTA résistante ou du sujet jeune, OAP flash récidivant, dégradation de la fonction rénale sous IEC/ARA2, asymétrie de taille rénale, souffle abdominal' },
      { q: 'Critères DIRECTS (tronc) présents ?', a: 'VPS ostiale > 180-200 cm/s + aliasing + RAR > 3,5 → sténose significative' },
      { q: 'Tronc inaccessible (gaz, obésité) ?', a: 'S\'appuyer sur les critères INDIRECTS intra-rénaux : parvus-tardus (TA > 0,07 s, accélération < 3 m/s², perte du pic précoce)' },
      { q: 'Parvus-tardus segmentaire malgré tronc normal ?', a: 'Rechercher une artère polaire portant la sténose (balayer l\'aorte + énergie parenchymateuse)' },
      { q: 'IR intra-rénal > 0,80 bilatéral ?', a: 'Néphropathie d\'aval → mauvais pronostic, faible bénéfice attendu d\'une revascularisation' },
      { q: 'Sténose confirmée + retentissement ?', a: 'Angio-TDM/IRM + avis spécialisé : néphroprotection, angioplastie/stent selon contexte (fibrodysplasie ++)' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES ARTÈRES RÉNALES

Indication : [HTA / surveillance / dégradation fonction rénale].
Technique : sonde convexe, à jeun, mode B + Doppler couleur et pulsé ; abords antérieur et flancs.

Aorte abdominale : calibre normal, VPS __ cm/s.
Artère rénale droite : origine libre, tronc sans accélération, VPS __ cm/s, RAR __ (< 3,5).
Artère rénale gauche : origine libre, tronc sans accélération, VPS __ cm/s, RAR __ (< 3,5).
Doppler intra-rénal : profil de basse résistance ddc, pic systolique précoce conservé, IR D __ / G __ (0,55-0,70), temps d'ascension < 0,07 s, pas de parvus-tardus.
Reins : taille symétrique (D __ / G __ mm), bonne différenciation cortico-médullaire.

CONCLUSION : Artères rénales perméables, sans sténose significative. IR intra-rénaux normaux et symétriques.`,
    pathologique: `ÉCHO-DOPPLER DES ARTÈRES RÉNALES

Indication : [HTA résistante / OAP flash / fonction rénale dégradée sous IEC].
Technique : sonde convexe, à jeun, mode B + Doppler couleur et pulsé ; abords antérieur et flancs.

Aorte abdominale : VPS __ cm/s.
Artère rénale [côté] : accélération [ostiale/médio-distale] avec aliasing, VPS __ cm/s, RAR __ (> 3,5) → sténose estimée significative.
Doppler intra-rénal homolatéral : parvus-tardus (temps d'ascension __ s > 0,07, accélération __ m/s² < 3, perte du pic systolique précoce).
IR intra-rénaux : D __ / G __ ; [asymétrie / IR > 0,80 témoignant d'une néphropathie d'aval].
Reins : asymétrie de taille (D __ / G __ mm) ; [recherche d'artère polaire].

CONCLUSION : Sténose de l'artère rénale [côté] [athéromateuse ostiale / fibrodysplasique médio-distale] avec retentissement d'aval (parvus-tardus).
[Proposition : confirmation angio-TDM/IRM et avis spécialisé ; tenir compte de l'IR pour la décision de revascularisation.]`
  },
  cas: [
    { titre: 'Repérage des origines', enonce: 'En coupe transverse aortique, vous repérez une grosse branche antérieure descendante que vous prenez pour l\'artère rénale.', questions: ['Quel est le risque ?', 'Comment vous repérer ?'], indices: ['Quelle artère naît juste au-dessus des rénales ?', 'Trajet et profil'], reponse: 'Risque de confondre l\'AMS (antérieure, descendante, profil variable jeun/post-prandial) avec une artère rénale. Les artères rénales naissent SOUS l\'AMS, sur la face LATÉRALE de l\'aorte, et se dirigent vers les hiles. Identifier d\'abord tronc cœliaque puis AMS, puis descendre.' },
    { titre: 'HTA résistante du sujet âgé', enonce: 'Homme 72 ans, polyvasculaire, HTA résistante. VPS ostiale rénale droite à 240 cm/s avec aliasing, VPS aortique 60 cm/s.', questions: ['Calculez le RAR.', 'Quel type de SAR ?'], reponse: 'RAR = 240/60 = 4 (> 3,5) avec VPS > 180-200 cm/s → sténose significative, vraisemblablement athéromateuse ostiale (terrain, localisation). Compléter par les critères indirects et l\'IR, puis angio-TDM/avis.' },
    { titre: 'Femme jeune hypertendue', enonce: 'Femme 32 ans, HTA récente. Tronc rénal proximal normal en B-mode, mais accélération médio-distale et parvus-tardus intra-rénal.', questions: ['Diagnostic à évoquer ?', 'Examen complémentaire ?'], reponse: 'Fibrodysplasie de l\'artère rénale (lésion médio-distale, « collier de perles », femme jeune). Souvent au-delà de la fenêtre écho → angio-TDM/IRM ou artériographie ; avis pour angioplastie (HTA curable).' },
    { titre: 'Tronc inaccessible', enonce: 'Patient obèse, gaz digestifs abondants : impossible de mesurer le tronc rénal. Vous accédez aux artères interlobaires.', questions: ['Sur quoi vous appuyer ?'], reponse: 'Sur les critères INDIRECTS intra-rénaux : parvus-tardus (temps d\'ascension > 0,07 s, accélération < 3 m/s², perte du pic systolique précoce). Leur présence évoque une sténose serrée d\'amont même tronc non vu.' },
    { titre: 'Le piège de l\'artère polaire', enonce: 'Tronc rénal principal normal, mais parvus-tardus localisé au pôle inférieur d\'un rein.', questions: ['Comment l\'expliquer ?', 'Que faites-vous ?'], reponse: 'Une artère polaire/accessoire (naissant souvent de l\'aorte) peut porter la sténose et n\'irriguer qu\'un pôle → parvus-tardus segmentaire malgré un tronc principal normal. Balayer largement l\'aorte, cartographier la perfusion en énergie, et signaler à l\'imagerie en coupe.' },
    { titre: 'Diastole effondrée bilatérale', enonce: 'IR intra-rénaux à 0,85 des deux côtés, troncs sans sténose, reins petits chez un diabétique hypertendu ancien.', questions: ['Interprétation ?', 'Conséquence thérapeutique ?'], reponse: 'Néphroangiosclérose / néphropathie d\'aval (IR > 0,80 bilatéral). Mauvais pronostic rénal et faible bénéfice attendu d\'une revascularisation même en cas de sténose associée : néphroprotection.' },
    { titre: 'Douleur lombaire brutale', enonce: 'Patient en FA, douleur lombaire aiguë, LDH élevés. Zone parenchymateuse triangulaire sans flux couleur ni énergie.', questions: ['Diagnostic ?', 'Confirmation ?'], reponse: 'Infarctus rénal (embolie sur FA) : plage avasculaire triangulaire. Baisser PRF/filtre et passer en énergie pour confirmer l\'absence de flux, puis angio-TDM en urgence.' },
    { titre: 'Faux IR élevé', enonce: 'IR mesuré à 0,90 mais le patient est tachycarde à 120/min et le filtre mural réglé haut.', questions: ['La mesure est-elle fiable ?'], reponse: 'Non : la tachycardie/arythmie et un filtre mural trop élevé altèrent l\'IR (la diastole est tronquée). Baisser le filtre, attendre un rythme stable, remesurer sur plusieurs cycles avant d\'interpréter.' },
    { titre: 'Aliasing du tronc', enonce: 'Mosaïque couleur diffuse le long de tout le tronc rénal, sans foyer net.', questions: ['Sténose ou réglage ?'], reponse: 'Une mosaïque DIFFUSE sur tout le vaisseau évoque une PRF trop basse (réglage), à corriger en montant l\'échelle. Une vraie sténose donne une accélération FOCALE avec aliasing localisé et VPS élevée au pulsé.' },
    { titre: 'Masse anéchogène du hile', enonce: 'Image anéchogène arrondie de 18 mm au hile rénal ; vous hésitez avec un kyste para-pyélique.', questions: ['Comment trancher ?'], reponse: 'Doppler couleur : un anévrisme de l\'artère rénale montre un flux tourbillonnaire (yin-yang) et se raccorde au pédicule, alors qu\'un kyste est avasculaire. Mesurer le diamètre, angio-TDM et avis selon la taille.' }
  ],
  pieges: [
    'Artère polaire/accessoire portant la sténose et manquée → parvus-tardus segmentaire inexpliqué.',
    'Confondre tronc cœliaque ou AMS avec l\'artère rénale (repère des origines erroné).',
    'Angle > 60° sur le tronc → VPS surestimée (fausse sténose) ; privilégier l\'abord coronal par les flancs.',
    'Gaz digestifs/obésité → tronc non vu : ne pas conclure « normal », s\'appuyer sur les critères indirects.',
    'Filtre mural / PRF trop hauts en intra-rénal → diastole tronquée, IR faussement élevé.',
    'IR faussé par tachycardie, bradycardie ou arythmie → remesurer sur rythme stable, plusieurs cycles.',
    'Sous-estimer une fibrodysplasie médio-distale, souvent hors fenêtre échographique (faux négatif).',
    'Conclure « occlusion/infarctus » avec PRF/filtre trop hauts (rater un flux lent) → vérifier en énergie à PRF basse.'
  ],
  flashcards: [
    { q: 'Où naissent les artères rénales ?', r: 'Sur la face latérale de l\'aorte, juste sous l\'AMS (L1-L2). La droite est plus longue et rétro-cave.' },
    { q: 'IR intra-rénal normal ?', r: '0,55-0,70 (basse résistance). > 0,80 = néphropathie d\'aval, mauvais pronostic.' },
    { q: 'Critères DIRECTS de SAR ?', r: 'VPS ostiale/tronc > 180-200 cm/s avec aliasing et rapport réno-aortique (RAR) > 3,5.' },
    { q: 'Critères INDIRECTS de SAR ?', r: 'Parvus-tardus intra-rénal : temps d\'ascension > 0,07 s, accélération < 3 m/s², perte du pic systolique précoce.' },
    { q: 'SAR athéromateuse vs fibrodysplasie ?', r: 'Athéromateuse : ostiale, sujet âgé polyvasculaire. Fibrodysplasie : médio-distale, « collier de perles », femme jeune.' },
    { q: 'Piège majeur du Doppler rénal ?', r: 'L\'artère polaire/accessoire qui porte la sténose et n\'est pas vue (parvus-tardus segmentaire).' },
    { q: 'Quand suspecter une SAR ?', r: 'HTA résistante/jeune, OAP flash, dégradation rénale sous IEC/ARA2, asymétrie de taille rénale.' }
  ],
  qcm: [
    { q: 'Le rapport réno-aortique (RAR) en faveur d\'une sténose significative est :', options: ['> 1,5', '> 2', '> 3,5', '> 6'], correct: 2, exp: 'RAR = VPS rénale / VPS aortique > 3,5 (avec VPS > 180-200 cm/s) évoque une sténose ≥ 60 %.' },
    { q: 'Un IR intra-rénal à 0,85 bilatéral signifie :', options: ['Reins normaux', 'Sténose bilatérale certaine', 'Néphropathie d\'aval, mauvais pronostic', 'Artefact de filtre obligatoire'], correct: 2, exp: 'IR > 0,80 traduit une néphropathie d\'aval (néphroangiosclérose, fibrose) : mauvais pronostic et faible bénéfice d\'une revascularisation (après avoir éliminé un artefact).' },
    { q: 'Le parvus-tardus intra-rénal correspond à :', options: ['Une sténose serrée d\'amont', 'Une occlusion veineuse', 'Un rein normal', 'Une hyperdébit'], correct: 0, exp: 'Parvus-tardus = montée systolique lente (TA > 0,07 s), accélération < 3 m/s², perte du pic précoce → critère indirect de sténose serrée d\'amont.' },
    { q: 'Une fibrodysplasie de l\'artère rénale est typiquement :', options: ['Ostiale chez le sujet âgé', 'Médio-distale chez la femme jeune', 'Veineuse', 'Toujours bilatérale et calcifiée'], correct: 1, exp: 'Dysplasie fibromusculaire : segment médio-distal, aspect en « collier de perles », femme jeune hypertendue ; HTA curable par angioplastie.' },
    { q: 'Devant un tronc rénal inaccessible (gaz/obésité), il faut :', options: ['Conclure à la normalité', 'S\'appuyer sur les critères indirects intra-rénaux', 'Augmenter l\'angle au-delà de 60°', 'Arrêter l\'examen'], correct: 1, exp: 'On utilise les critères indirects (parvus-tardus : TA, accélération, perte du pic précoce) quand le tronc n\'est pas analysable.' }
  ],
  refs: ['DIU Montpellier (artères rénales / Doppler rénal) ; recommandations SFMV ; recommandations HTA secondaire (ESH/ESC, SFHTA) ; AIUM Practice Parameter — renal artery Doppler ; Radermacher J et al. (IR intra-rénal et pronostic).']
});

})();
