/* ÉCHO-VASC DIU — Socle : physique, hémodynamique-Doppler, machine & ergonomie
   Schémas SVG originaux (non issus du site source). */
window.VASC = window.VASC || { chapters: [] };

/* ---------- SVG réutilisables (originaux) ---------- */
const SVG_WAVE = `<svg viewBox="0 0 460 150" role="img" aria-label="Fréquence et longueur d'onde">
<rect width="460" height="150" fill="#fff"/>
<text x="10" y="20" font-size="12" fill="#0b2f63" font-weight="bold">Haute fréquence (ex. 12 MHz) — résolution +, pénétration −</text>
<path d="M10,55 q11,-22 22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0" fill="none" stroke="#2563eb" stroke-width="2"/>
<text x="10" y="100" font-size="12" fill="#0b2f63" font-weight="bold">Basse fréquence (ex. 3 MHz) — pénétration +, résolution −</text>
<path d="M10,128 q33,-30 66,0 t66,0 t66,0 t66,0 t66,0" fill="none" stroke="#0d9488" stroke-width="2.5"/>
</svg>`;

const SVG_ANGLE = `<svg viewBox="0 0 460 180" role="img" aria-label="Angle Doppler">
<rect width="460" height="180" fill="#fff"/>
<rect x="40" y="120" width="380" height="34" fill="#fde2e2" stroke="#dc2626"/>
<text x="44" y="142" font-size="11" fill="#991b1b">Vaisseau — flux →</text>
<polygon points="50,10 110,10 250,118 190,118" fill="#dbeafe" stroke="#2563eb"/>
<text x="60" y="28" font-size="11" fill="#1d4ed8">Faisceau US</text>
<line x1="220" y1="118" x2="420" y2="118" stroke="#111" stroke-dasharray="4 3"/>
<path d="M250,118 A40,40 0 0,1 232,84" fill="none" stroke="#7c3aed" stroke-width="2"/>
<text x="255" y="100" font-size="13" fill="#7c3aed" font-weight="bold">θ</text>
<text x="120" y="172" font-size="11" fill="#0b2f63">V = (Δf·c) / (2·f₀·cos θ) — viser θ ≤ 60° ; à 90° cos θ = 0 → pas de signal</text>
</svg>`;

const SVG_ALIAS = `<svg viewBox="0 0 460 160" role="img" aria-label="Aliasing">
<rect width="460" height="160" fill="#fff"/>
<line x1="40" y1="80" x2="440" y2="80" stroke="#94a3b8"/>
<text x="6" y="40" font-size="10" fill="#64748b">+Vmax</text>
<text x="6" y="128" font-size="10" fill="#64748b">−Vmax</text>
<path d="M40,80 C80,20 120,20 150,80" fill="none" stroke="#2563eb" stroke-width="2"/>
<path d="M150,80 C175,150 175,150 175,80" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
<path d="M175,80 C205,20 245,20 285,80" fill="none" stroke="#2563eb" stroke-width="2"/>
<text x="150" y="150" font-size="11" fill="#dc2626">Repli (aliasing) : le pic dépasse la PRF/2 (limite de Nyquist)</text>
<text x="300" y="40" font-size="11" fill="#0b2f63">Corriger :↑PRF/échelle,</text>
<text x="300" y="56" font-size="11" fill="#0b2f63">↓fréquence, ↑angle,</text>
<text x="300" y="72" font-size="11" fill="#0b2f63">baisse ligne de base</text>
</svg>`;

const SVG_SPECTRA = `<svg viewBox="0 0 460 200" role="img" aria-label="Spectres Doppler types">
<rect width="460" height="200" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Triphasique (haute résistance — MI normal)</text>
<line x1="20" y1="55" x2="220" y2="55" stroke="#cbd5e1"/>
<path d="M20,55 L40,20 L60,55 L70,68 L80,55 L100,48 L120,55 L140,20 L160,55 L170,68 L180,55" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="8" y="120" font-size="11" font-weight="bold" fill="#0b2f63">Monophasique (basse résistance — carotide interne, rénale)</text>
<line x1="20" y1="170" x2="220" y2="170" stroke="#cbd5e1"/>
<path d="M20,170 L35,120 C55,135 70,150 95,150 C120,150 130,160 150,120 C170,140 185,150 205,152" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="250" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Sténose serrée (aliasing + élargissement)</text>
<line x1="250" y1="95" x2="450" y2="95" stroke="#cbd5e1"/>
<path d="M250,95 L270,25 L300,95 M300,95 L320,25 L350,95" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="250" y="150" font-size="11" font-weight="bold" fill="#0b2f63">Aval de sténose : parvus-tardus</text>
<line x1="250" y1="190" x2="450" y2="190" stroke="#cbd5e1"/>
<path d="M250,190 C290,170 320,168 360,170 C400,172 420,185 450,188" fill="none" stroke="#d97706" stroke-width="1.8"/>
</svg>`;

window.VASC.chapters.push({
  id: 'physique', num: 1, groupe: 'Socle — bases', emoji: '📡',
  titre: 'Physique des ultrasons & formation de l\'image',
  sonde: 'Toutes sondes', niveau: 'Fondamental', duree: '≈90 min',
  resume: 'Comprendre l\'onde ultrasonore, la résolution, la profondeur, la focalisation et l\'imagerie harmonique : c\'est le socle qui conditionne tous les réglages et la qualité de tous les examens vasculaires.',
  tags: 'physique ultrasons fréquence résolution focale harmonique gain TGC dynamique',
  objectifs: [
    'Relier fréquence ↔ résolution ↔ pénétration et savoir choisir la sonde.',
    'Distinguer résolution axiale, latérale et en élévation.',
    'Régler profondeur, focale, gain, TGC et plage dynamique de façon raisonnée.',
    'Comprendre l\'intérêt et les limites de l\'imagerie harmonique tissulaire.',
    'Reconnaître les artefacts d\'image (renforcement postérieur, cône d\'ombre, réverbération, miroir).'
  ],
  anatomie: { texte: 'Section transversale : l\'imagerie vasculaire repose sur la connaissance de l\'impédance acoustique des tissus (sang ≪ paroi ≪ calcification). Les interfaces de forte différence d\'impédance (paroi/lumière, calcium) renvoient le plus d\'échos.' },
  physiologie: { texte: 'L\'onde US est une onde mécanique longitudinale. Vitesse moyenne dans les tissus mous c ≈ 1540 m/s (constante utilisée par la machine pour calculer la profondeur via le temps de vol). L\'atténuation augmente avec la fréquence (≈ 0,5 dB/cm/MHz) : d\'où le compromis fréquence/pénétration.' },
  physique: {
    intro: 'Les notions ci-dessous reviennent dans CHAQUE chapitre — maîtrisez-les avant d\'avancer.',
    points: [
      { titre: 'Fréquence / longueur d\'onde', desc: 'Plus la fréquence (f) est élevée, plus la longueur d\'onde est courte → meilleure résolution axiale mais atténuation plus rapide → moindre pénétration. Linéaire 7–15 MHz pour structures superficielles (carotide, MI veineux, FAV) ; convexe 2–5 MHz pour le profond (aorte, rénales, digestives).', svg: SVG_WAVE },
      { titre: 'Résolution axiale', desc: 'Capacité à séparer 2 points alignés dans l\'axe du faisceau. Dépend de la longueur d\'impulsion ≈ 1–2 longueurs d\'onde → meilleure à haute fréquence. C\'est la meilleure résolution disponible : mesurer les diamètres/IMT dans l\'axe.' },
      { titre: 'Résolution latérale', desc: 'Capacité à séparer 2 points côte à côte, perpendiculairement au faisceau. Dépend de la largeur du faisceau, donc de la focalisation : placer la focale à la profondeur de la structure d\'intérêt.' },
      { titre: 'Résolution en élévation', desc: 'Épaisseur de coupe (3ᵉ dimension), source de pseudo-contenu intraluminal (effet de volume partiel) — piège classique faisant croire à un thrombus dans une veine.' },
      { titre: 'Focalisation', desc: 'Zone où le faisceau est le plus fin. Une seule focale = meilleure résolution latérale à ce niveau mais cadence (frame rate) optimale ; plusieurs focales = image plus homogène mais cadence réduite (gênant en dynamique/Doppler).' },
      { titre: 'Gain & TGC', desc: 'Le gain amplifie tous les échos reçus ; la TGC (time-gain compensation) compense l\'atténuation en profondeur, curseur par curseur. Régler la TGC pour une image homogène du haut vers le bas ; un gain trop élevé « remplit » les lumières (faux thrombus, fausse plaque).' },
      { titre: 'Plage dynamique', desc: 'Étendue de gris affichée. Dynamique large = image douce, nombreux niveaux de gris (parenchyme) ; dynamique étroite = image contrastée (recherche de plaque, paroi).' },
      { titre: 'Imagerie harmonique tissulaire (THI)', desc: 'Utilise les harmoniques générées par la propagation non linéaire : améliore le contraste et réduit le bruit de champ proche/les artefacts de réverbération. Utile sur patient difficile (aorte, rénales) ; coûte un peu de pénétration.' },
      { titre: 'Compound imaging / Speckle reduction', desc: 'Le spatial compounding (tirs sous plusieurs angles) lisse l\'image et améliore la paroi mais peut atténuer les cônes d\'ombre (utiles pour repérer le calcium) — à connaître.' }
    ]
  },
  reglages: {
    intro: 'Réglages d\'image (hors Doppler) à maîtriser sur tout appareil.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire HF superficiel / convexe BF profond', note: 'Le 1ᵉʳ déterminant de la qualité' },
      { param: 'Profondeur', valeur: 'Structure occupant ⅔ de l\'écran', note: 'Trop profond = petit + cadence basse' },
      { param: 'Focale', valeur: 'Au niveau de la structure cible', note: 'Une seule focale en dynamique' },
      { param: 'Gain', valeur: 'Lumière vasculaire bien noire', note: 'Trop = faux contenu intraluminal' },
      { param: 'TGC', valeur: 'Homogène haut→bas', note: 'Corrige l\'atténuation' },
      { param: 'Dynamique', valeur: 'Étroite pour la paroi, large pour parenchyme', note: '' },
      { param: 'Harmonique', valeur: 'ON si patient difficile', note: 'Coûte de la pénétration' },
      { param: 'Zoom', valeur: 'Write-zoom (avant capture)', note: 'Préférable au read-zoom (pixellisé)' }
    ]
  },
  installation: {
    texte: 'L\'ergonomie est une compétence d\'examen à part entière : un opérateur mal installé fatigue, tremble et dégrade la reproductibilité.',
    operateur: 'Avant-bras soutenu, épaule basse, dos droit ; appareil et lit à bonne hauteur.',
    ecran: 'Face à l\'opérateur, dans l\'axe du regard, lumière tamisée.',
    sonde: 'Tenue en « stylo », auriculaire/bord cubital en appui sur le patient pour stabiliser.',
    ergonomie: 'Alterner les prises, éviter l\'hyper-abduction d\'épaule ; régler la hauteur du lit pour chaque territoire.'
  },
  interpretation: {
    texte: 'Savoir lire une image = savoir reconnaître les artefacts.',
    normal: ['Lumière vasculaire anéchogène (noire)', 'Paroi : triple ligne en haute résolution (intima-media-adventice)', 'Image homogène du haut vers le bas (TGC bien réglée)'],
    pathologique: ['Renforcement postérieur derrière une structure liquidienne (kyste, lumière) — ne pas confondre avec une plaque', 'Cône d\'ombre derrière une calcification (gêne l\'analyse de la lumière)', 'Réverbération / artefact en miroir (faux vaisseau « dédoublé » sous une interface réfléchissante : ex. sous-clavière/plèvre)', 'Volume partiel : pseudo-matériel dans une veine si la coupe est trop épaisse']
  },
  valeurs: {
    intro: 'Ordres de grandeur physiques utiles.',
    lignes: [
      { param: 'Vitesse des US (tissus mous)', valeur: '≈ 1540 m/s', note: 'Constante de calibration machine' },
      { param: 'Atténuation', valeur: '≈ 0,5 dB/cm/MHz', note: 'Justifie le compromis f/pénétration' },
      { param: 'Sonde linéaire vasculaire', valeur: '7–15 MHz', note: 'Carotide, MI, FAV, testicule, thyroïde' },
      { param: 'Sonde convexe', valeur: '2–5 MHz', note: 'Aorte, rénales, digestif, foie' }
    ]
  },
  pathologies: [
    { nom: 'Artefact de cône d\'ombre', physiopath: 'Forte atténuation/réflexion (calcium, air)', bmode: 'Bande anéchogène sous une calcification', ddx: 'Vraie absence de signal', pieges: 'Masque la lumière en regard d\'une plaque calcifiée → sous-estimation de sténose', cat: 'Multiplier les incidences, s\'aider du Doppler en amont/aval' },
    { nom: 'Artefact en miroir', physiopath: 'Réflexion sur une interface très échogène', bmode: 'Structure « dupliquée » plus profonde', doppler: 'Spectre dupliqué symétrique', ddx: 'Vraie structure', pieges: 'Faux vaisseau sous la sous-clavière (plèvre)', cat: 'Reconnaître la symétrie, changer d\'angle' }
  ],
  algorithme: {
    titre: 'Choisir ses réglages d\'image en 4 questions',
    noeuds: [
      { q: 'Structure superficielle (<4 cm) ?', a: 'Oui → sonde linéaire HF ; Non → convexe BF' },
      { q: 'Image trop sombre en profondeur ?', a: 'Monter la TGC distale / baisser la fréquence / harmonique ON' },
      { q: 'Lumière « sale » (faux contenu) ?', a: 'Baisser le gain global, vérifier la dynamique' },
      { q: 'Paroi/plaque mal vue ?', a: 'Write-zoom + focale au bon niveau + dynamique étroite' }
    ]
  },
  cr: {
    normal: 'Aucun compte-rendu pour ce chapitre socle — voir les chapitres par territoire.'
  },
  cas: [
    { titre: 'Lumière « pleine »', enonce: 'Sur une coupe de veine fémorale, vous voyez un matériel échogène homogène remplissant la lumière, mais la veine reste compressible et le flux est présent au Doppler.', questions: ['Quelle est la cause la plus probable ?', 'Quel réglage corrige le phénomène ?'], indices: ['Pensez aux réglages d\'amplification', 'Pensez à l\'épaisseur de coupe'], reponse: 'Gain trop élevé et/ou effet de volume partiel : la veine est compressible et perméable → il s\'agit d\'un artefact, pas d\'un thrombus. Baisser le gain, optimiser la focale/le plan de coupe.' },
    { titre: 'Ombre gênante', enonce: 'Une plaque carotidienne très calcifiée projette un cône d\'ombre masquant la lumière.', questions: ['Comment estimer la sténose malgré l\'ombre ?'], reponse: 'Analyse multi-incidences, et surtout critères Doppler en amont et en aval (accélération, parvus-tardus), car la mesure directe est impossible sous le calcium.' }
  ],
  pieges: [
    'Gain trop élevé → faux thrombus / fausse plaque dans une lumière en réalité libre.',
    'Focale mal placée → résolution latérale médiocre au niveau de la cible.',
    'Profondeur excessive → structure minuscule, cadence basse, mesures imprécises.',
    'Read-zoom au lieu de write-zoom → image pixellisée, mesures faussées.',
    'Oublier l\'harmonique chez le patient difficile (échec d\'aorte par excès de bruit).'
  ],
  flashcards: [
    { q: 'Pourquoi une sonde haute fréquence pénètre-t-elle moins ?', r: 'L\'atténuation croît avec la fréquence (~0,5 dB/cm/MHz).' },
    { q: 'Quelle résolution est la meilleure ?', r: 'La résolution axiale → mesurer dans l\'axe du faisceau.' },
    { q: 'Rôle de la TGC ?', r: 'Compenser l\'atténuation en profondeur pour une image homogène.' },
    { q: 'Vitesse des US dans les tissus mous ?', r: '≈ 1540 m/s.' },
    { q: 'Effet d\'un gain trop élevé sur une veine ?', r: 'Faux contenu intraluminal (pseudo-thrombus).' }
  ],
  qcm: [
    { q: 'Une sonde linéaire 12 MHz est adaptée à :', options: ['L\'aorte abdominale', 'La carotide', 'Les artères rénales', 'Le tronc cœliaque'], correct: 1, exp: 'Haute fréquence = superficiel : carotide, MI, FAV. Le profond (aorte, rénales, digestif) nécessite une basse fréquence convexe.' },
    { q: 'La résolution axiale dépend principalement de :', options: ['La largeur du faisceau', 'La longueur de l\'impulsion (fréquence)', 'La PRF', 'Le filtre de paroi'], correct: 1, exp: 'Axiale ↔ longueur d\'impulsion ↔ fréquence. La latérale dépend de la largeur du faisceau (focalisation).' },
    { q: 'Un faux contenu dans une veine compressible évoque :', options: ['Une TVP', 'Un gain trop élevé / volume partiel', 'Une calcification', 'Un anévrisme'], correct: 1, exp: 'Veine compressible + flux présent = artefact (gain, épaisseur de coupe), pas un thrombus.' }
  ],
  refs: ['Bases physiques : cours DIU Montpellier ; EFSUMB/WFUMB guidelines on US physics.']
});

window.VASC.chapters.push({
  id: 'doppler', num: 2, groupe: 'Socle — bases', emoji: '🌊',
  titre: 'Doppler & hémodynamique vasculaire',
  sonde: 'Toutes sondes', niveau: 'Fondamental', duree: '≈120 min',
  resume: 'Effet Doppler, modes couleur / pulsé / énergie, PRF, filtre mural, angle, aliasing, et profils hémodynamiques (haute vs basse résistance, parvus-tardus). Le cœur de l\'examen vasculaire.',
  tags: 'doppler couleur pulsé énergie PRF aliasing angle filtre mural résistance VPS VTD IR IP spectre',
  objectifs: [
    'Énoncer l\'équation Doppler et l\'impact crucial de l\'angle.',
    'Choisir et régler le mode couleur, pulsé et énergie selon la situation.',
    'Reconnaître et corriger l\'aliasing.',
    'Différencier un profil de haute résistance d\'un profil de basse résistance.',
    'Calculer et interpréter VPS, VTD, IR, IP et les rapports de vitesses.'
  ],
  anatomie: { texte: 'Le Doppler n\'« image » pas l\'anatomie mais le mouvement (le sang). Toujours coupler au B-mode : couleur = repérage, pulsé = mesure, B-mode = paroi.' },
  physiologie: {
    texte: 'La résistance du lit d\'aval détermine la forme du spectre.\nHaute résistance : muscle au repos (MI), carotide externe → flux antérograde systolique bref, reflux protodiastolique (composante inversée), faible flux télédiastolique.\nBasse résistance : organes à forte demande continue (cerveau via carotide interne, rein, foie, rate, testicule) → flux antérograde permanent, diastole bien remplie, pas de reflux.',
    profils: [
      { nom: 'Triphasique / haute résistance', desc: 'Pic systolique aigu + reflux protodiastolique + faible flux antérograde. Normal : MI au repos, carotide externe, AMS à jeun, sous-clavière.' },
      { nom: 'Monophasique / basse résistance', desc: 'Flux antérograde continu, diastole remplie, IR bas. Normal : carotide interne, vertébrale, rénale, hépatique, splénique, testicule, AMS en post-prandial.' },
      { nom: 'Parvus-tardus', desc: 'Amorti, ascension systolique lente (temps de montée allongé) et pic émoussé : signe une sténose serrée d\'AMONT (ex. en aval d\'une sténose rénale ou iliaque).' },
      { nom: 'Démodulé / à hautes résistances pathologique', desc: 'Diastole nulle ou inversée : aval très résistant (ischémie aiguë, rejet, hyperpression).' }
    ]
  },
  physique: {
    intro: 'Maîtriser ces réglages = 80 % de la réussite d\'un Doppler.',
    points: [
      { titre: 'Équation Doppler & angle', desc: 'Δf = 2·f₀·V·cos θ / c. La vitesse calculée dépend de cos θ : à 60° l\'erreur est gérable, à 90° cos θ = 0 (aucun signal), au-delà de 60° l\'erreur explose. RÈGLE : angle ≤ 60°, curseur d\'angle (steering) aligné sur la paroi du vaisseau.', svg: SVG_ANGLE },
      { titre: 'Doppler couleur', desc: 'Code couleur la vitesse moyenne et le sens (BART : Blue Away, Red Toward — selon réglage). Sert au REPÉRAGE et à détecter les zones d\'accélération/aliasing. Régler la boîte couleur petite (cadence), la PRF (échelle) et le gain couleur (juste avant le « débordement »).' },
      { titre: 'Doppler pulsé (spectral)', desc: 'Échantillonne UN volume (porte) pour MESURER les vitesses. Placer la porte au centre de la lumière, taille 1/3 du diamètre, avec correction d\'angle ≤ 60°. C\'est le mode de mesure (VPS, VTD).' },
      { titre: 'Doppler énergie (power)', desc: 'Code l\'amplitude du signal (densité d\'hématies en mouvement), pas la vitesse/sens. Très sensible aux flux lents, peu angle-dépendant, mais pas de quantification ni de sens. Idéal : flux lents (rénale distale, testicule, recherche d\'occlusion/quasi-occlusion).' },
      { titre: 'PRF (échelle)', desc: 'Fréquence de répétition des impulsions. PRF haute = mesure de vitesses élevées sans aliasing mais perte des flux lents ; PRF basse = sensible aux flux lents mais aliasing précoce. Adapter à la vitesse attendue.' },
      { titre: 'Aliasing', desc: 'Si la vitesse dépasse la limite de Nyquist (PRF/2), le spectre se « replie ». En couleur : mosaïque/inversion de couleur. Corriger : ↑PRF, baisser la ligne de base, ↓fréquence, ↑angle (avec prudence).', svg: SVG_ALIAS },
      { titre: 'Filtre mural (wall filter)', desc: 'Élimine les basses fréquences (mouvements de paroi). Trop haut → efface la diastole basse (faux IR élevé, fausse occlusion d\'un flux lent). Baisser pour les flux lents (rénale, veineux).' },
      { titre: 'Volume d\'échantillonnage (porte)', desc: 'Petit et centré → spectre net. Trop grand → élargissement spectral artéfactuel (faux remplissage de fenêtre).' }
    ]
  },
  reglages: {
    intro: 'Check-list Doppler — à dérouler à chaque vaisseau.',
    lignes: [
      { param: 'Angle d\'insonation', valeur: '≤ 60°, curseur // paroi', note: 'Le réglage le plus critique pour les vitesses' },
      { param: 'Porte (volume)', valeur: '⅓ du diamètre, centrée', note: 'Évite l\'élargissement spectral' },
      { param: 'PRF / échelle', valeur: 'Juste au-dessus de Vmax attendue', note: 'Trop haute = flux lents perdus' },
      { param: 'Ligne de base', valeur: 'Ajustée au sens dominant', note: 'Récupère de la dynamique anti-aliasing' },
      { param: 'Gain Doppler', valeur: 'Juste avant le bruit de fond', note: 'Trop = faux élargissement' },
      { param: 'Filtre mural', valeur: 'Bas pour flux lents', note: 'Haut = fausse perte de diastole' },
      { param: 'Boîte couleur', valeur: 'Étroite, inclinée (steer)', note: 'Cadence + sensibilité d\'angle' },
      { param: 'Mode énergie', valeur: 'Flux lents / occlusion', note: 'Sensible, sans sens ni quantif.' }
    ]
  },
  installation: { texte: 'Stabiliser la sonde pour un angle constant ; respirer/apnée selon le territoire (abdominal). Main libre sur les molettes PRF/gain/baseline pour optimiser en temps réel.' },
  acquisition: {
    etapes: [
      { titre: 'Repérage B-mode', desc: 'Identifier le vaisseau, optimiser l\'image (profondeur, focale, gain).' },
      { titre: 'Couleur', desc: 'Activer la couleur, régler PRF/gain/boîte ; repérer accélération, turbulence, aliasing, sens du flux.' },
      { titre: 'Pulsé', desc: 'Placer la porte au centre, corriger l\'angle ≤ 60°, geler et mesurer VPS/VTD.' },
      { titre: 'Énergie si besoin', desc: 'Flux lents, recherche d\'occlusion vs quasi-occlusion, vascularisation parenchymateuse.' }
    ],
    astuces: ['Toujours aligner le curseur d\'angle sur la PAROI, pas sur l\'axe supposé.', 'Comparer côté à côté (symétrie) pour les territoires pairs.', 'Mesurer plusieurs cycles, garder le pic reproductible.'],
    erreurs: ['Angle > 60° → vitesses surestimées (fausse sténose).', 'Filtre mural trop haut → fausse occlusion d\'un flux lent.', 'PRF trop haute → flux diastolique/lent invisible.']
  },
  interpretation: {
    normal: ['Spectre net avec fenêtre claire (flux laminaire)', 'Profil adapté au territoire (haute vs basse résistance)', 'Couleur homogène remplissant la lumière sans aliasing focal'],
    pathologique: ['Élargissement spectral + comblement de la fenêtre (turbulence post-sténotique)', 'Accélération focale (VPS↑) avec aliasing couleur = sténose', 'Parvus-tardus en aval = sténose serrée d\'amont', 'Absence de flux couleur + énergie = occlusion'],
    svgPatho: SVG_SPECTRA, capPatho: 'Spectres types : triphasique, monophasique basse résistance, sténose (aliasing/élargissement), parvus-tardus d\'aval.'
  },
  valeurs: {
    intro: 'Indices spectraux fondamentaux (génériques — les seuils par territoire sont dans chaque chapitre).',
    lignes: [
      { param: 'VPS (PSV)', valeur: 'Vitesse maximale systolique', note: 'Critère n°1 de sévérité de sténose' },
      { param: 'VTD (EDV)', valeur: 'Vitesse télédiastolique', note: 'Reflète la résistance d\'aval' },
      { param: 'IR (Pourcelot)', valeur: '(VPS − VTD)/VPS', note: 'Résistance ; rénal normal 0,55–0,70' },
      { param: 'IP (Gosling)', valeur: '(VPS − VTD)/Vmoy', note: 'Pulsatilité' },
      { param: 'Rapport de vitesses', valeur: 'VPS sténose / VPS amont', note: 'Quantifie sténoses (carotide, rénale, pontage)' },
      { param: 'Temps de montée systolique', valeur: 'Allongé si parvus-tardus', note: 'Sténose d\'amont' }
    ]
  },
  pathologies: [
    { nom: 'Sténose (signature Doppler)', physiopath: 'Réduction de lumière → accélération locale + turbulence post-sténotique', bmode: 'Plaque/réduction de calibre', doppler: 'VPS↑ focale, aliasing, élargissement spectral, puis parvus-tardus d\'aval', ddx: 'Tortuosité (faux aliasing), hyperdébit (FAV, controlatéral occlus)', pieges: 'Angle > 60° surestime ; ne pas confondre accélération de tortuosité et vraie sténose', gravite: 'selon % et retentissement d\'aval', cat: 'Quantifier par vitesses + rapport, corréler clinique' },
    { nom: 'Occlusion', physiopath: 'Thrombose/embolie complète', bmode: 'Matériel endoluminal, vaisseau non compressible (veine)', doppler: 'Absence de flux couleur ET énergie, flux pré-occlusif amorti (« coup de bélier »)', ddx: 'Quasi-occlusion (filet de flux en énergie/PRF basse)', pieges: 'PRF/filtre trop hauts font conclure à tort à une occlusion', cat: 'Baisser PRF/filtre, mode énergie avant de conclure' }
  ],
  algorithme: {
    titre: 'Que faire devant une couleur en mosaïque ?',
    noeuds: [
      { q: 'Mosaïque focale + VPS élevée au pulsé ?', a: 'Sténose → quantifier (vitesses, rapport)' },
      { q: 'Mosaïque diffuse sur tout le vaisseau ?', a: 'PRF trop basse → monter l\'échelle' },
      { q: 'Aucun flux couleur ?', a: 'Baisser PRF/filtre + mode énergie : flux lent vs occlusion' },
      { q: 'Spectre dédoublé symétrique ?', a: 'Artefact miroir, pas une vraie lésion' }
    ]
  },
  cr: { normal: 'Voir chapitres par territoire (les CR intègrent VPS/VTD/IR du vaisseau concerné).' },
  cas: [
    { titre: 'Fausse sténose', enonce: 'Sur une carotide interne, vous mesurez une VPS « élevée » mais le curseur d\'angle est à 72°.', questions: ['La mesure est-elle fiable ?', 'Que faites-vous ?'], reponse: 'Non : au-delà de 60° l\'erreur sur la vitesse est majeure (surestimation). Reprendre avec angle ≤ 60°, curseur aligné sur la paroi, éventuellement changer la fenêtre d\'abord.' },
    { titre: 'Diastole « disparue »', enonce: 'Sur une artère rénale, la diastole semble nulle et vous évoquez une résistance majeure ; le filtre mural est réglé très haut.', questions: ['Quel piège ?'], reponse: 'Un filtre mural trop élevé efface le flux diastolique de basse vélocité → faux IR élevé. Baisser le filtre et la PRF avant d\'interpréter.' }
  ],
  pieges: [
    'Angle > 60° : la cause n°1 de fausses sténoses serrées.',
    'Filtre mural trop haut → fausse occlusion / faux IR élevé sur flux lent.',
    'PRF trop haute → flux lent/diastolique invisible (faux « pas de flux »).',
    'Porte trop grande / gain trop fort → élargissement spectral artéfactuel.',
    'Confondre aliasing diffus (réglage PRF) et accélération focale (vraie sténose).',
    'Oublier le mode énergie avant de conclure à une occlusion.'
  ],
  flashcards: [
    { q: 'Angle Doppler maximal acceptable ?', r: '≤ 60° (à 90° aucun signal).' },
    { q: 'Que mesure le Doppler énergie ?', r: 'L\'amplitude/densité du flux (sensible aux flux lents), sans sens ni vitesse.' },
    { q: 'Comment corriger un aliasing ?', r: '↑PRF/échelle, baisser la ligne de base, ↓fréquence, ↑angle (prudence).' },
    { q: 'Profil de la carotide interne ?', r: 'Basse résistance (diastole bien remplie).' },
    { q: 'Signe Doppler d\'une sténose serrée d\'amont ?', r: 'Parvus-tardus en aval (montée lente, pic émoussé).' },
    { q: 'Formule de l\'IR ?', r: '(VPS − VTD) / VPS.' }
  ],
  qcm: [
    { q: 'Le mode le plus adapté pour détecter un flux très lent (quasi-occlusion) est :', options: ['Pulsé à PRF haute', 'Couleur à PRF haute', 'Doppler énergie', 'B-mode harmonique'], correct: 2, exp: 'Le Doppler énergie est le plus sensible aux flux lents et le moins angle-dépendant ; baisser aussi PRF et filtre.' },
    { q: 'Une VPS faussement élevée est typiquement due à :', options: ['Un angle ≤ 60°', 'Un angle > 60°', 'Une porte centrée', 'Un filtre bas'], correct: 1, exp: 'Au-delà de 60°, cos θ chute vite et la vitesse calculée est surestimée.' },
    { q: 'Un profil monophasique à diastole bien remplie est NORMAL dans :', options: ['L\'artère fémorale au repos', 'La carotide interne', 'La sous-clavière', 'L\'AMS à jeun'], correct: 1, exp: 'Carotide interne = basse résistance (cerveau). MI/sous-clavière/AMS à jeun = haute résistance.' }
  ],
  refs: ['Hémodynamique & Doppler : DIU Montpellier ; recommandations SFMV ; Société Française de Radiologie.']
});
