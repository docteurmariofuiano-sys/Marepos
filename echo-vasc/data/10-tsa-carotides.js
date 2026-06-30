/* ÉCHO-VASC DIU — TSA / Carotides (chapitre de référence) */
window.VASC = window.VASC || { chapters: [] };

const SVG_CAROTID = `<svg viewBox="0 0 460 220" role="img" aria-label="Anatomie des troncs supra-aortiques">
<rect width="460" height="220" fill="#fff"/>
<rect x="200" y="10" width="60" height="200" fill="#fde2e2" stroke="#dc2626"/>
<text x="205" y="205" font-size="10" fill="#991b1b">ACP</text>
<path d="M230,80 C230,55 250,40 280,40 L420,40" fill="none" stroke="#dc2626" stroke-width="14"/>
<text x="350" y="32" font-size="11" fill="#991b1b">ACI (lisse, post.)</text>
<path d="M230,80 C232,60 245,52 270,50 C320,48 360,60 410,75" fill="none" stroke="#f59e0b" stroke-width="9"/>
<text x="350" y="98" font-size="11" fill="#b45309">ACE (collat., ant.)</text>
<ellipse cx="226" cy="92" rx="26" ry="20" fill="none" stroke="#7c3aed" stroke-width="3"/>
<text x="120" y="92" font-size="11" fill="#7c3aed">Bulbe (élargissement)</text>
<text x="120" y="150" font-size="11" fill="#dc2626">ACC</text>
<line x1="40" y1="190" x2="120" y2="190" stroke="#0d9488" stroke-width="8"/>
<text x="40" y="210" font-size="10" fill="#0f766e">Jugulaire interne (compressible)</text>
</svg>`;

window.VASC.chapters.push({
  id: 'tsa-carotides', num: 10, groupe: 'Artériel — TSA', emoji: '🧠',
  titre: 'Troncs supra-aortiques & carotides',
  sonde: 'Linéaire 5–12 MHz', niveau: 'DIU → expert', duree: '≈3 h',
  resume: 'Exploration des carotides communes, bifurcations, internes et externes : dépistage et quantification de la sténose athéromateuse, mesure de l\'IMT, recherche de dissection et d\'occlusion. Examen le plus fréquent et le plus codifié.',
  tags: 'carotide ACI ACE ACC bulbe IMT plaque sténose NASCET VPS rapport ACI/ACC dissection occlusion',
  objectifs: [
    'Identifier ACC, bulbe, ACI et ACE et les différencier de façon fiable.',
    'Mesurer l\'IMT et caractériser une plaque (échogénicité, surface, sténose).',
    'Quantifier une sténose ACI selon les critères vélocimétriques (consensus SRU/critères NASCET).',
    'Reconnaître occlusion, quasi-occlusion, dissection et sténose serrée.',
    'Rédiger un compte-rendu carotidien standardisé.'
  ],
  anatomie: {
    texte: 'La carotide commune (ACC) monte sans collatérale et se divise (bifurcation, ~C3-C4) en carotide interne (ACI) et externe (ACE). Le bulbe carotidien est l\'élargissement à l\'origine de l\'ACI, siège préférentiel de l\'athérome.',
    svg: SVG_CAROTID,
    caption: 'Schéma : ACC se divisant en ACI (postéro-latérale, sans collatérale, basse résistance) et ACE (antéro-médiale, collatérales, haute résistance). La jugulaire interne, compressible, est en dehors.',
    vascularisation: 'ACI → circulation cérébrale antérieure (basse résistance). ACE → face et cuir chevelu (haute résistance), donne des collatérales (1ʳᵉ : thyroïdienne supérieure).',
    rapports: ['Jugulaire interne (latérale, compressible) et nerf vague dans la gaine vasculaire', 'Muscle sterno-cléido-mastoïdien en avant', 'Glande thyroïde en dedans à la base du cou'],
    variantes: ['Bifurcation haute (gêne l\'analyse de l\'ACI distale)', 'Boucles et plicatures (kinking/coiling) sources de faux aliasing', 'Trajets tortueux gênant la correction d\'angle']
  },
  physiologie: {
    texte: 'L\'ACI alimente un lit de basse résistance (cerveau) : spectre monophasique, diastole bien remplie. L\'ACE alimente un lit de haute résistance (face) : pic systolique aigu, diastole basse. L\'ACC a un profil intermédiaire (mix, plutôt basse résistance).',
    profils: [
      { nom: 'ACI', desc: 'Basse résistance, diastole remplie, pas de collatérale. Postéro-latérale, plus grosse, sans branche.' },
      { nom: 'ACE', desc: 'Haute résistance, diastole basse, collatérales visibles. Test du « temporal tap » : la percussion de l\'artère temporale superficielle imprime des ondulations sur le spectre de l\'ACE.' },
      { nom: 'ACC', desc: 'Profil intermédiaire ; sert de référence pour le rapport ACI/ACC.' }
    ]
  },
  physique: {
    intro: 'Carotide = territoire superficiel : privilégier la haute fréquence et l\'angle ≤ 60° rigoureux.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 7–12 MHz pour l\'IMT/la paroi ; descendre à 5 MHz pour les cous épais ou l\'ACI distale haute.' },
      { titre: 'Angle', desc: 'Curseur d\'angle aligné sur la PAROI, ≤ 60°, identique d\'un côté à l\'autre pour comparer. C\'est la clé de la fiabilité des vitesses (et donc du %).' },
      { titre: 'IMT', desc: 'Mesuré sur la paroi postérieure de l\'ACC distale, en B-mode haute résolution, zone sans plaque, en télédiastole.' }
    ]
  },
  reglages: {
    intro: 'Réglages carotidiens types.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 7–12 MHz', note: '5 MHz si cou épais / ACI haute' },
      { param: 'Profondeur', valeur: '3–4 cm', note: 'Vaisseau au ⅔ supérieur' },
      { param: 'Focale', valeur: 'Sur la paroi postérieure', note: 'Pour l\'IMT' },
      { param: 'PRF couleur', valeur: 'Moyenne, ↑ sur sténose', note: 'Repérer l\'aliasing focal' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Reproductible D/G' },
      { param: 'Porte', valeur: '⅓ lumière, centrée', note: 'Au point de VPS max dans la sténose' },
      { param: 'Dynamique', valeur: 'Étroite', note: 'Mieux voir la plaque' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, tête en légère extension et tournée du côté opposé (~45°), cou dégagé.',
    operateur: 'Assis à la tête ou au côté du patient, avant-bras en appui.',
    ecran: 'Dans l\'axe du regard, droite du patient à gauche de l\'écran (convention).',
    sonde: 'Linéaire en coupe transverse pour le balayage, puis longitudinale pour mesures.',
    ergonomie: 'Stabiliser la sonde avec l\'auriculaire en appui sur la clavicule/mandibule.'
  },
  acquisition: {
    etapes: [
      { titre: 'Balayage transverse ascendant', desc: 'De la base du cou vers la mandibule : suivre l\'ACC, repérer la bifurcation, l\'ACI (postéro-latérale, plus grosse, sans branche) et l\'ACE (antéro-médiale, avec collatérale).' },
      { titre: 'Confirmer ACI vs ACE', desc: 'ACI : grosse, postérieure, basse résistance, sans collatérale. ACE : collatérale + haute résistance + temporal tap positif. En cas de doute, le temporal tap tranche.' },
      { titre: 'Bascule longitudinale', desc: 'Aligner le vaisseau, optimiser la paroi, mesurer l\'IMT sur ACC distale (paroi postérieure, zone saine).' },
      { titre: 'Couleur', desc: 'Repérer plaques et zones d\'accélération/aliasing tout le long ACC → bulbe → ACI.' },
      { titre: 'Pulsé systématique', desc: 'VPS/VTD en ACC, ACI (proximale et au point le plus sténosant), ACE. Calculer le rapport ACI/ACC.' },
      { titre: 'Vertébrales', desc: 'Compléter par les artères vertébrales (sens, flux) — voir chapitre dédié.' }
    ],
    reperes: ['Bifurcation = élargissement bulbaire', 'ACI postéro-latérale sans collatérale', 'ACE antéro-médiale avec 1ʳᵉ collatérale (thyroïdienne sup.)'],
    astuces: ['Temporal tap pour identifier l\'ACE.', 'Multiplier les fenêtres (antérieure, latérale, postérieure) pour contourner une plaque calcifiée.', 'Mesurer la VPS exactement au point de vitesse maximale (là où la couleur est la plus turbulente).'],
    erreurs: ['Prendre l\'ACE pour l\'ACI (erreur de quantification majeure).', 'Mesurer la VPS hors du point maximal → sous-estimation.', 'Angle > 60° → surestimation du %.', 'IMT mesuré sur une plaque ou en systole.']
  },
  interpretation: {
    normal: ['Paroi fine, triple ligne, IMT < 0,9 mm', 'Lumière anéchogène, flux laminaire', 'ACI basse résistance, ACE haute résistance, VPS ACI < 125 cm/s'],
    pathologique: ['Plaque (focal, IMT ≥ 1,5 mm ou saillie ≥ 0,5 mm)', 'Accélération focale + aliasing = sténose', 'Plaque hypoéchogène/hétérogène/ulcérée = à risque', 'Parvus-tardus ACC = sténose serrée d\'amont (ostium / TABC)', 'Absence de flux = occlusion'],
    svgPatho: SVG_CAROTID
  },
  valeurs: {
    intro: 'Critères vélocimétriques de sténose ACI (consensus type Society of Radiologists in Ultrasound, % NASCET). Les seuils doivent être adaptés au laboratoire et au contexte.',
    lignes: [
      { param: 'IMT normal', valeur: '< 0,9 mm', note: '≥ 0,9 mm = épaississement ; plaque si ≥ 1,5 mm' },
      { param: 'ACI normale', valeur: 'VPS < 125 cm/s, pas de plaque', note: 'Sténose < 50 %' },
      { param: 'Sténose 50–69 %', valeur: 'VPS 125–230 cm/s', note: 'VTD 40–100 ; rapport ACI/ACC 2–4' },
      { param: 'Sténose ≥ 70 %', valeur: 'VPS > 230 cm/s', note: 'VTD > 100 ; rapport ACI/ACC > 4' },
      { param: 'Quasi-occlusion', valeur: 'Vitesses variables (parfois basses)', note: 'Filet de flux, lumière effondrée — ne pas se fier qu\'aux vitesses' },
      { param: 'Occlusion', valeur: 'Absence de flux (couleur + énergie)', note: 'Vérifier à PRF/filtre bas' },
      { param: 'Rapport ACI/ACC', valeur: '> 4 si ≥ 70 %', note: 'Utile si vitesses ambiguës (FAV, cardiopathie)' }
    ]
  },
  pathologies: [
    { nom: 'Sténose athéromateuse de l\'ACI', physiopath: 'Plaque athéromateuse au bulbe/ACI proximale réduisant la lumière', bmode: 'Plaque, réduction de calibre, ± calcium (cône d\'ombre)', doppler: 'VPS↑ focale, aliasing, élargissement spectral, rapport ACI/ACC↑', ddx: 'Tortuosité, hyperdébit controlatéral (occlusion de l\'autre côté → vitesses majorées)', pieges: 'Angle > 60°, mesure hors pic, confusion ACE/ACI, calcium masquant', gravite: 'Symptomatique ≥ 50 % ou asymptomatique ≥ 70 % = enjeu thérapeutique', cat: 'Quantifier (vitesses + rapport), caractériser la plaque, avis chirurgical/angio-TDM selon % et symptômes' },
    { nom: 'Occlusion de l\'ACI', physiopath: 'Thrombose complète', bmode: 'Lumière comblée, ACI non pulsatile', doppler: 'Absence de flux couleur ET énergie ; ACC homolatérale à haute résistance (« stump »), ACE qui « internalise »', ddx: 'Quasi-occlusion (filet de flux)', pieges: 'PRF/filtre trop hauts → fausse occlusion', gravite: 'Sévère', cat: 'Confirmer par énergie à PRF basse ± angio-TDM/IRM' },
    { nom: 'Dissection carotidienne', physiopath: 'Clivage pariétal (souvent ACI distale, sujet jeune, post-traumatique/spontanée)', bmode: 'Flap intimal, double lumière, hématome de paroi (lumière effilée)', doppler: 'Flux à haute résistance/bidirectionnel, amorti d\'aval', ddx: 'Athérome, occlusion', pieges: 'Souvent distale, au-delà de la fenêtre échographique', gravite: 'Urgence (AVC)', cat: 'Imagerie en coupe (angio-IRM/TDM), avis neurovasculaire' },
    { nom: 'Plaque vulnérable', physiopath: 'Plaque hypoéchogène, hétérogène, à cape fine, ulcérée', bmode: 'Hypoéchogène/hétérogène, surface irrégulière/ulcérée, hémorragie intraplaque', doppler: 'Peut être peu sténosante mais emboligène', ddx: 'Plaque stable calcifiée', pieges: 'Sous-estimer le risque d\'une plaque peu sténosante mais instable', gravite: 'Risque embolique', cat: 'Décrire échostructure/surface ; corréler à la clinique (AIT/AVC)' }
  ],
  algorithme: {
    titre: 'Conduite devant une plaque carotidienne',
    noeuds: [
      { q: 'Plaque détectée en B-mode/couleur ?', a: 'Oui → mesurer VPS au point maximal + VTD + rapport ACI/ACC' },
      { q: 'VPS < 125 cm/s, rapport < 2 ?', a: 'Sténose < 50 % → surveillance, caractériser la plaque' },
      { q: 'VPS 125–230, rapport 2–4 ?', a: 'Sténose 50–69 % → corréler symptômes, avis' },
      { q: 'VPS > 230, VTD > 100, rapport > 4 ?', a: 'Sténose ≥ 70 % → angio-TDM/IRM + avis chirurgical (endartériectomie/stent)' },
      { q: 'Pas de flux ?', a: 'Énergie à PRF basse → occlusion vs quasi-occlusion' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES TRONCS SUPRA-AORTIQUES

Indication : [dépistage / souffle / bilan FRCV].
Technique : sonde linéaire, mode B + Doppler couleur et pulsé.

Carotides communes : parois fines et régulières, IMT < 0,9 mm ddc, flux laminaire.
Bifurcations et carotides internes : libres, sans plaque, VPS ACI D __ / G __ cm/s (< 125), profil de basse résistance normal.
Carotides externes : perméables, haute résistance.
Artères vertébrales : perméables, flux antérograde et symétrique.

CONCLUSION : Axes carotidiens et vertébraux perméables, sans plaque ni sténose significative. IMT normal.`,
    pathologique: `ÉCHO-DOPPLER DES TRONCS SUPRA-AORTIQUES

Indication : [AIT / AVC / souffle].
Technique : sonde linéaire, mode B + Doppler couleur et pulsé.

ACC : IMT épaissi à __ mm ; plaques athéromateuses étagées.
ACI droite : plaque [hypoéchogène/calcifiée, surface __] du bulbe, VPS __ cm/s, VTD __ cm/s, rapport ACI/ACC __ → sténose estimée à __ % (NASCET).
ACI gauche : __.
ACE : perméables. Vertébrales : __.

CONCLUSION : Sténose de l'ACI [côté] estimée à __ % (critères vélocimétriques), plaque [stable/à risque].
[Proposition : confirmation angio-TDM/IRM et avis chirurgical vasculaire selon symptômes et seuil.]`
  },
  cas: [
    { titre: 'ACI ou ACE ?', enonce: 'À la bifurcation, vous hésitez entre les deux branches. L\'une a une collatérale précoce et un spectre à diastole basse.', questions: ['Laquelle est l\'ACE ?', 'Quel test confirme ?'], indices: ['Collatérales', 'Résistance du lit d\'aval'], reponse: 'Celle à collatérale précoce + haute résistance est l\'ACE. Le temporal tap (percussion de la temporale superficielle) confirme : ondulations transmises sur l\'ACE.' },
    { titre: 'Vitesses élevées des deux côtés', enonce: 'VPS élevées sur l\'ACI droite ; l\'ACI gauche est occluse.', questions: ['Le % à droite est-il forcément sous-estimé ou surestimé ?'], reponse: 'L\'occlusion controlatérale crée un hyperdébit compensateur qui MAJORE les vitesses à droite → risque de SUResitmation du %. S\'appuyer davantage sur le rapport ACI/ACC et l\'imagerie en coupe.' },
    { titre: 'Pas de flux', enonce: 'Aucun flux couleur dans l\'ACI ; PRF et filtre sont réglés haut.', questions: ['Avant de conclure à une occlusion, que faites-vous ?'], reponse: 'Baisser PRF et filtre mural, passer en Doppler énergie : rechercher un filet de flux (quasi-occlusion), qui change radicalement la prise en charge.' },
    { titre: 'Jeune femme céphalées + Claude-Bernard-Horner', enonce: 'Cervicalgie, céphalée, ptosis-myosis. ACI distale : double lumière et flux amorti.', questions: ['Diagnostic ?', 'Examen complémentaire ?'], reponse: 'Dissection carotidienne. Confirmer par angio-IRM/TDM (la lésion est souvent distale, hors fenêtre écho), avis neurovasculaire urgent.' }
  ],
  pieges: [
    'Confondre ACE et ACI → quantification fausse (toujours vérifier collatérale + résistance + temporal tap).',
    'Angle > 60° → surestimation du % de sténose.',
    'Mesurer la VPS hors du point de vitesse maximale → sous-estimation.',
    'Calcium avec cône d\'ombre → s\'appuyer sur l\'aval (parvus-tardus) et les multiples fenêtres.',
    'Conclure « occlusion » avec PRF/filtre trop hauts (rater une quasi-occlusion).',
    'Oublier l\'hyperdébit controlatéral (occlusion de l\'autre ACI) qui majore les vitesses.',
    'Mesurer l\'IMT sur une plaque ou en systole.'
  ],
  flashcards: [
    { q: 'Comment distinguer l\'ACI de l\'ACE ?', r: 'ACI : grosse, postéro-latérale, sans collatérale, basse résistance. ACE : collatérales, haute résistance, temporal tap +.' },
    { q: 'VPS ACI seuil de sténose ≥ 70 % ?', r: 'VPS > 230 cm/s (VTD > 100, rapport ACI/ACC > 4).' },
    { q: 'Où mesure-t-on l\'IMT ?', r: 'Paroi postérieure de l\'ACC distale, zone saine, en télédiastole (normal < 0,9 mm).' },
    { q: 'Signe d\'une occlusion d\'ACI sur l\'ACC ?', r: 'ACC homolatérale à haute résistance (« stump ») + absence de flux ACI.' },
    { q: 'Piège des vitesses si ACI controlatérale occluse ?', r: 'Hyperdébit compensateur → surestimation du % ; se fier au rapport et à l\'imagerie en coupe.' }
  ],
  qcm: [
    { q: 'Une VPS ACI à 260 cm/s avec rapport ACI/ACC à 5 correspond à :', options: ['Sténose < 50 %', 'Sténose 50–69 %', 'Sténose ≥ 70 %', 'Occlusion'], correct: 2, exp: 'VPS > 230 et rapport > 4 → ≥ 70 % (NASCET). Confirmer par angio-TDM/IRM et avis.' },
    { q: 'Le temporal tap sert à :', options: ['Mesurer l\'IMT', 'Identifier l\'artère externe', 'Calculer l\'IR', 'Détecter une dissection'], correct: 1, exp: 'La percussion de la temporale superficielle transmet des ondulations à l\'ACE → l\'identifie.' },
    { q: 'Devant une absence de flux couleur dans l\'ACI, la 1ʳᵉ chose à faire est :', options: ['Conclure à une occlusion', 'Baisser PRF/filtre + énergie', 'Augmenter l\'angle', 'Mesurer l\'IMT'], correct: 1, exp: 'Optimiser pour les flux lents (PRF/filtre bas, énergie) pour ne pas rater une quasi-occlusion.' },
    { q: 'L\'IMT se mesure :', options: ['Sur une plaque', 'En systole sur l\'ACI', 'Paroi postérieure ACC, zone saine, télédiastole', 'Sur l\'ACE'], correct: 2, exp: 'IMT = paroi postérieure de l\'ACC distale, hors plaque, en télédiastole ; normal < 0,9 mm.' }
  ],
  refs: ['DIU Montpellier (carotides) ; Grant EG et al., consensus SRU 2003 (critères vélocimétriques) ; ESVS 2023 carotid guidelines ; HAS/SFMV.']
});
