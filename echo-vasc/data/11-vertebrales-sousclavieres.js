/* ÉCHO-VASC DIU — Artères vertébrales & sous-clavières / TABC */
window.VASC = window.VASC || { chapters: [] };

(function(){

const SVG_VERT_1 = `<svg viewBox="0 0 460 230" role="img" aria-label="Segments de l'artère vertébrale">
<rect width="460" height="230" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Artère vertébrale : segments V0–V4</text>
<path d="M40,210 C60,180 90,170 120,168" fill="none" stroke="#dc2626" stroke-width="10"/>
<text x="34" y="226" font-size="10" fill="#991b1b">Sous-clavière</text>
<circle cx="120" cy="168" r="7" fill="#7c3aed"/>
<text x="98" y="158" font-size="10" fill="#7c3aed">V0 ostium</text>
<path d="M120,168 C150,150 180,140 205,138" fill="none" stroke="#dc2626" stroke-width="8"/>
<text x="135" y="132" font-size="10" fill="#991b1b">V1 pré-transversaire</text>
<g stroke="#94a3b8" stroke-width="2">
<rect x="210" y="120" width="18" height="14" fill="#e2e8f0"/>
<rect x="244" y="108" width="18" height="14" fill="#e2e8f0"/>
<rect x="278" y="96" width="18" height="14" fill="#e2e8f0"/>
<rect x="312" y="84" width="18" height="14" fill="#e2e8f0"/>
</g>
<text x="210" y="150" font-size="9" fill="#64748b">apophyses transverses (cônes d'ombre)</text>
<path d="M205,138 L236,124 M254,116 L286,104 M304,94 L336,82" fill="none" stroke="#dc2626" stroke-width="7"/>
<text x="240" y="74" font-size="10" fill="#991b1b">V2 intertransversaire</text>
<path d="M336,82 C352,72 360,60 360,48" fill="none" stroke="#dc2626" stroke-width="6"/>
<text x="332" y="44" font-size="10" fill="#991b1b">V3 (C1-C2, boucle)</text>
<path d="M360,48 C360,34 372,26 392,24" fill="none" stroke="#1d4ed8" stroke-width="5" stroke-dasharray="4 3"/>
<text x="368" y="20" font-size="10" fill="#1d4ed8">V4 intracrânien → tronc basilaire</text>
</svg>`;

const SVG_VERT_2 = `<svg viewBox="0 0 460 200" role="img" aria-label="Spectres du vol sous-clavier">
<rect width="460" height="200" fill="#fff"/>
<text x="8" y="14" font-size="10" font-weight="bold" fill="#0b2f63">Évolution du flux vertébral dans le vol sous-clavier</text>
<text x="6" y="40" font-size="9" fill="#0f766e">Normal / pré-vol</text>
<line x1="20" y1="60" x2="150" y2="60" stroke="#cbd5e1"/>
<path d="M20,60 L34,32 C50,42 65,50 90,50 C115,50 130,55 150,40" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.6"/>
<text x="160" y="40" font-size="9" fill="#b45309">Partiel : encoche méso-systolique</text>
<line x1="170" y1="60" x2="300" y2="60" stroke="#cbd5e1"/>
<path d="M170,60 L184,34 L196,52 L206,40 C225,48 245,55 300,50" fill="none" stroke="#d97706" stroke-width="1.6"/>
<text x="200" y="76" font-size="8" fill="#d97706">« bunny rabbit »</text>
<text x="312" y="40" font-size="9" fill="#991b1b">Complet : flux inversé</text>
<line x1="320" y1="60" x2="450" y2="60" stroke="#cbd5e1"/>
<path d="M320,60 C340,86 360,90 390,88 C420,86 435,72 450,66" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="6" y="120" font-size="9" fill="#0b2f63" font-weight="bold">Manœuvre d'hyperémie (brassard) : démasque/accentue l'inversion</text>
<line x1="20" y1="160" x2="220" y2="160" stroke="#cbd5e1"/>
<path d="M20,160 L34,138 C55,146 70,150 95,150 C120,150 135,154 150,148" fill="none" stroke="#1d4ed8" stroke-width="1.4"/>
<text x="40" y="178" font-size="8" fill="#1d4ed8">avant gonflage (latent)</text>
<line x1="240" y1="160" x2="440" y2="160" stroke="#cbd5e1"/>
<path d="M240,160 C262,186 285,190 320,188 C360,186 400,176 440,168" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="290" y="182" font-size="8" fill="#dc2626">après dégonflage : inversion franche</text>
</svg>`;

const SVG_SUBCLAV_1 = `<svg viewBox="0 0 460 220" role="img" aria-label="Anatomie sous-clavière et TABC">
<rect width="460" height="220" fill="#fff"/>
<text x="8" y="14" font-size="11" font-weight="bold" fill="#0b2f63">Crosse aortique et branches</text>
<path d="M60,200 C60,140 90,110 150,110 L420,110" fill="none" stroke="#b91c1c" stroke-width="16"/>
<text x="300" y="104" font-size="10" fill="#7f1d1d">Crosse de l'aorte</text>
<path d="M150,110 C150,80 160,60 175,50" fill="none" stroke="#dc2626" stroke-width="11"/>
<text x="118" y="46" font-size="10" fill="#991b1b">TABC (droite)</text>
<path d="M175,50 C175,40 165,32 150,30" fill="none" stroke="#dc2626" stroke-width="7"/>
<text x="100" y="28" font-size="9" fill="#991b1b">Sous-clav. D</text>
<path d="M175,50 C185,40 195,34 205,30" fill="none" stroke="#f59e0b" stroke-width="7"/>
<text x="200" y="26" font-size="9" fill="#b45309">Carotide commune D</text>
<path d="M250,110 C250,70 252,50 254,34" fill="none" stroke="#f59e0b" stroke-width="7"/>
<text x="256" y="30" font-size="9" fill="#b45309">Carotide commune G</text>
<path d="M300,110 C302,78 305,56 310,40" fill="none" stroke="#dc2626" stroke-width="9"/>
<text x="312" y="36" font-size="9" fill="#991b1b">Sous-clav. G (directe)</text>
<path d="M150,30 C140,22 130,18 120,16" fill="none" stroke="#7c3aed" stroke-width="4"/>
<text x="60" y="14" font-size="8" fill="#7c3aed">Vertébrale</text>
<path d="M155,55 C148,70 145,85 145,100" fill="none" stroke="#0d9488" stroke-width="3"/>
<text x="92" y="92" font-size="8" fill="#0f766e">Mammaire int.</text>
</svg>`;

window.VASC.chapters.push({
  id: 'vertebrales', num: 11, groupe: 'Artériel — TSA', emoji: '🔺',
  titre: 'Artères vertébrales',
  sonde: 'Linéaire 5–9 MHz', niveau: 'DIU → expert', duree: '≈2 h',
  resume: 'Exploration des artères vertébrales : repérage entre les ombres des apophyses transverses, analyse du sens et du profil du flux, dépistage du vol sous-clavier et de la sténose ostiale, distinction hypoplasie / dominance / occlusion, recherche de dissection. Complément indispensable de l\'examen carotidien (circulation postérieure).',
  tags: 'vertébrale V0 V1 V2 V3 V4 vol sous-clavier steal bunny rabbit ostium hypoplasie dominance dissection circulation postérieure',
  objectifs: [
    'Repérer l\'artère vertébrale en coupe longitudinale entre les apophyses transverses et identifier les segments V0 à V4.',
    'Reconnaître le profil normal : flux antérograde (céphalique), basse résistance, symétrie relative des deux côtés.',
    'Diagnostiquer et grader un vol sous-clavier (pré-vol / partiel « bunny rabbit » / complet inversé) et utiliser la manœuvre d\'hyperémie du bras.',
    'Distinguer hypoplasie, dominance physiologique, sténose ostiale et occlusion vertébrale.',
    'Évoquer une dissection vertébrale et orienter vers l\'imagerie en coupe.',
    'Rédiger un compte-rendu vertébral, normal et dans le cadre d\'un vol sous-clavier.'
  ],
  anatomie: {
    texte: 'L\'artère vertébrale naît classiquement de la face supérieure de la première portion de l\'artère sous-clavière homolatérale. Elle se divise en quatre (à cinq) segments : V0 = ostium (origine sur la sous-clavière), V1 = segment pré-transversaire (de l\'ostium jusqu\'à l\'entrée dans le canal transversaire, en général C6), V2 = segment intertransversaire (ascendant dans les foramina transversaires de C6 à C2, visible par fenêtres entre les ombres des apophyses transverses), V3 = segment atloïdo-axoïdien (boucle au-dessus de C2, autour de l\'atlas), V4 = segment intracrânien (après le trou occipital ; les deux V4 fusionnent pour former le tronc basilaire). L\'échographie analyse surtout V1 (ostium / pré-transversaire) et V2.',
    svg: SVG_VERT_1,
    caption: 'Segments V0 (ostium) → V1 (pré-transversaire) → V2 (intertransversaire, exploré entre les cônes d\'ombre des apophyses transverses) → V3 (boucle C1-C2) → V4 (intracrânien, donne le tronc basilaire).',
    vascularisation: 'Les deux vertébrales fusionnent en tronc basilaire et alimentent la circulation cérébrale POSTÉRIEURE (tronc cérébral, cervelet, lobes occipitaux) : lit de basse résistance. La vertébrale donne aussi des branches musculaires cervicales et l\'artère spinale antérieure.',
    rapports: ['Naît de la sous-clavière ; à gauche parfois directement de la crosse aortique (variante fréquente, entre carotide commune G et sous-clavière G)', 'Chemine en arrière de la carotide commune dans le segment V1', 'Engagée dans les foramina transversaires cervicaux (V2), masquée par les ombres osseuses entre lesquelles on l\'explore', 'Veine vertébrale satellite, souvent en avant, flux opposé (caudal) — repère utile'],
    variantes: ['Dominance vertébrale (asymétrie de calibre très fréquente, le plus souvent gauche dominante) : différence de calibre et de débit physiologique', 'Hypoplasie d\'une vertébrale (diamètre < 2–2,5 mm, flux à haute résistance, terminaison souvent dans la PICA sans contribution basilaire)', 'Origine de la vertébrale gauche directement sur l\'arche aortique (≈ 5 % des cas)', 'Entrée dans le canal transversaire à un étage variable (C5, voire C4) au lieu de C6']
  },
  physiologie: {
    texte: 'L\'artère vertébrale alimente un lit de basse résistance (encéphale postérieur) : le spectre normal est antérograde (vers la tête), monophasique, avec une diastole bien remplie, comparable à celui de la carotide interne mais de plus faible amplitude. Le SENS du flux est l\'information clé : un flux antérograde permanent est normal. Une asymétrie de calibre et de vitesses entre les deux côtés est physiologique (dominance). La vertébrale hypoplasique, au contraire, présente un flux de plus haute résistance (diastole basse) car son lit d\'aval est réduit.',
    profils: [
      { nom: 'Vertébrale normale', desc: 'Flux antérograde (céphalique), basse résistance, diastole remplie ; VPS souvent 40–70 cm/s. Comparer systématiquement au côté opposé.' },
      { nom: 'Vertébrale dominante', desc: 'Calibre et débit supérieurs (souvent à gauche) : variante normale, ne pas confondre avec une compensation pathologique.' },
      { nom: 'Vertébrale hypoplasique', desc: 'Petit calibre (< 2–2,5 mm), flux de haute résistance (diastole basse, IR élevé), vitesses faibles ; à distinguer d\'une sténose ostiale d\'amont.' },
      { nom: 'Vol sous-clavier (steal)', desc: 'Spectre déformé puis inversé (rétrograde, vers le bras) traduisant une sténose/occlusion de la sous-clavière en amont de l\'origine vertébrale.' }
    ]
  },
  physique: {
    intro: 'La vertébrale est plus profonde et plus difficile que la carotide : fréquence légèrement plus basse, angle rigoureux et patience pour trouver la fenêtre entre les ombres osseuses.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 5–9 MHz : descendre vers 5–7 MHz car le segment V1/ostium est profond, surtout à droite et chez les cous épais ou les sujets obèses.' },
      { titre: 'Fenêtre acoustique osseuse', desc: 'Le segment V2 n\'est visible qu\'entre les apophyses transverses : chaque apophyse projette un cône d\'ombre, l\'artère apparaît par « segments » successifs entre ces ombres en coupe longitudinale.', svg: SVG_VERT_1 },
      { titre: 'Angle & sens', desc: 'Curseur d\'angle aligné sur la paroi, ≤ 60°. Le sens du flux est ici aussi déterminant que la vitesse : toujours vérifier l\'orientation de la ligne de base et la convention couleur avant de conclure à une inversion.' },
      { titre: 'PRF / flux lents', desc: 'Le flux vertébral est de faible amplitude : adapter la PRF (ni trop haute, qui efface le signal, ni trop basse) et baisser le filtre mural pour ne pas amputer la diastole.' }
    ]
  },
  reglages: {
    intro: 'Réglages vertébraux types.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 5–9 MHz', note: '5–7 MHz si ostium profond / cou épais' },
      { param: 'Profondeur', valeur: '3–5 cm', note: 'Plus profond que la carotide, surtout V0/V1' },
      { param: 'Focale', valeur: 'Au niveau du vaisseau', note: 'Souvent sous la carotide commune' },
      { param: 'PRF couleur', valeur: 'Adaptée au flux lent', note: 'Repérer une inversion de sens' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Reproductible D/G' },
      { param: 'Porte', valeur: '⅓ lumière, centrée', note: 'Dans un segment inter-ombres' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Préserver la diastole (flux lent)' },
      { param: 'Convention couleur', valeur: 'Vérifiée', note: 'Comparer au sens carotidien voisin' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, tête en légère extension et tournée du côté opposé, cou dégagé (même installation que pour les carotides).',
    operateur: 'Assis à la tête ou au côté, avant-bras en appui pour stabiliser un angle constant.',
    ecran: 'Dans l\'axe du regard, convention D du patient à gauche de l\'écran.',
    sonde: 'Coupe longitudinale para-médiane : repérer d\'abord la carotide commune, puis basculer en arrière/en dehors pour trouver la vertébrale entre les apophyses transverses.',
    ergonomie: 'Auriculaire en appui ; prévoir le temps de chercher l\'ostium (V0/V1), plus difficile à droite qu\'à gauche.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérer la carotide commune', desc: 'En coupe longitudinale, partir de l\'ACC, puis incliner la sonde latéralement/postérieurement pour faire apparaître la vertébrale en profondeur.' },
      { titre: 'Identifier le segment V2', desc: 'Reconnaître l\'alternance caractéristique : segments d\'artère visibles entre les cônes d\'ombre réguliers des apophyses transverses. La veine vertébrale satellite (flux opposé) confirme le repérage.' },
      { titre: 'Doppler couleur', desc: 'Confirmer le SENS antérograde (céphalique) et chercher toute zone d\'accélération ou d\'inversion. Comparer la couleur avec celle de la carotide voisine.' },
      { titre: 'Doppler pulsé V2', desc: 'Mesurer VPS/VTD dans un segment inter-ombres, angle ≤ 60° : profil de basse résistance attendu. Noter l\'éventuelle encoche systolique.' },
      { titre: 'Rechercher l\'ostium (V0/V1)', desc: 'Suivre la vertébrale vers le bas jusqu\'à son origine sur la sous-clavière : c\'est le siège préférentiel de la sténose ostiale (accélération focale).' },
      { titre: 'Manœuvre d\'hyperémie si doute de vol', desc: 'En cas d\'encoche ou de flux limite, gonfler un brassard au bras homolatéral au-dessus de la systolique 2–3 min, puis dégonfler brutalement : l\'hyperémie réactionnelle démasque/accentue l\'inversion vertébrale.' }
    ],
    reperes: ['Cônes d\'ombre réguliers des apophyses transverses (V2)', 'Veine vertébrale satellite à flux opposé (caudal)', 'Origine sur la sous-clavière (V0) en suivant le vaisseau vers le bas', 'Profil de basse résistance similaire à l\'ACI mais de plus faible amplitude'],
    astuces: ['Comparer systématiquement les deux côtés (calibre, vitesses, sens) : l\'asymétrie est la clé.', 'Vérifier la convention couleur sur la carotide voisine avant de parler d\'inversion vertébrale.', 'Si le signal manque, baisser la fréquence et le filtre, augmenter le gain couleur.', 'Toujours examiner les sous-clavières quand le flux vertébral est anormal (le vol vient d\'amont).'],
    erreurs: ['Confondre la veine vertébrale (flux opposé) avec une vertébrale inversée.', 'Conclure à une occlusion sur un flux faible (hypoplasie) sans baisser PRF/filtre.', 'Oublier d\'explorer l\'ostium (sténose V0 souvent manquée).', 'Mal régler la convention couleur → faux diagnostic d\'inversion.', 'Ne pas faire la manœuvre d\'hyperémie devant une simple encoche systolique (vol latent manqué).']
  },
  interpretation: {
    normal: ['Flux antérograde (céphalique) permanent, basse résistance, diastole remplie', 'Calibre et vitesses comparables ou avec asymétrie modérée (dominance)', 'Veine vertébrale satellite à flux opposé', 'Pas d\'accélération focale à l\'ostium'],
    pathologique: ['Encoche systolique méso-systolique (« bunny rabbit ») = vol partiel/latent', 'Flux complètement inversé (rétrograde) = vol sous-clavier complet', 'Accélération focale à l\'ostium (V0) = sténose ostiale', 'Flux de haute résistance + petit calibre = hypoplasie', 'Absence de flux (couleur + énergie) = occlusion (rare)', 'Flux amorti d\'aval / double lumière = dissection'],
    svgPatho: SVG_VERT_2,
    capPatho: 'Du flux normal à l\'inversion complète : encoche systolique partielle (« bunny rabbit ») puis flux rétrograde ; la manœuvre d\'hyperémie du bras démasque les formes latentes.'
  },
  valeurs: {
    intro: 'Repères vertébraux (à adapter au laboratoire et au contexte). Le sens du flux prime sur les valeurs absolues.',
    lignes: [
      { param: 'Diamètre normal', valeur: '≈ 3–4,5 mm', note: 'Asymétrie physiologique fréquente (dominance)' },
      { param: 'Hypoplasie', valeur: 'Diamètre < 2–2,5 mm', note: 'Flux haute résistance, vitesses basses' },
      { param: 'VPS normale', valeur: '≈ 40–70 cm/s', note: 'Basse résistance, diastole remplie' },
      { param: 'Sens normal', valeur: 'Antérograde (céphalique)', note: 'Toute inversion = anormale' },
      { param: 'Sténose ostiale', valeur: 'VPS ostiale élevée (souvent > 100–140 cm/s) et rapport V0/V2 > 2', note: 'Accélération focale à l\'origine' },
      { param: 'Asymétrie de débit', valeur: 'Dominance si calibre/débit nettement > controlatéral', note: 'Variante normale, pas une compensation' }
    ]
  },
  pathologies: [
    { nom: 'Vol sous-clavier (subclavian steal)', physiopath: 'Sténose serrée ou occlusion de l\'artère sous-clavière (ou du TABC) EN AMONT de l\'origine de la vertébrale : la chute de pression dans le bras « aspire » le sang du tronc basilaire qui redescend par la vertébrale, à contre-courant, pour vasculariser le membre supérieur.', bmode: 'Souvent peu contributif au niveau vertébral ; chercher la lésion sous-clavière proximale.', doppler: 'Spectre vertébral progressivement déformé : pré-vol (latent) → encoche méso-systolique (« bunny rabbit » = vol partiel/systolique) → inversion complète (flux rétrograde permanent). Démasqué/accentué par la manœuvre d\'hyperémie du bras (brassard).', ddx: 'Hypoplasie (flux antérograde mais haute résistance), artefact de convention couleur', pieges: 'Vol latent manqué sans manœuvre d\'hyperémie ; confondre veine vertébrale et vertébrale inversée', gravite: 'Souvent asymptomatique (bien toléré grâce au polygone de Willis) ; symptômes vertébro-basilaires possibles à l\'effort du bras', cat: 'Confirmer la sténose sous-clavière (asymétrie tensionnelle ≥ 15–20 mmHg), explorer le TABC à droite, corréler clinique ; avis selon symptômes' },
    { nom: 'Sténose ostiale (V0)', physiopath: 'Plaque athéromateuse à l\'origine de la vertébrale sur la sous-clavière (site le plus fréquent de l\'athérome vertébral).', bmode: 'Plaque ostiale, parfois difficile à voir (profondeur, calcium).', doppler: 'Accélération focale (VPS↑) à l\'ostium avec turbulence ; flux d\'aval (V2) parfois amorti (parvus-tardus) si sténose serrée.', ddx: 'Tortuosité ostiale (faux aliasing), hypoplasie', pieges: 'Ostium souvent non exploré → sténose manquée ; angle difficile à l\'origine', gravite: 'Le plus souvent peu symptomatique (suppléance) ; à intégrer au bilan de la circulation postérieure', cat: 'Quantifier (VPS ostiale, rapport V0/V2), corréler clinique vertébro-basilaire, angio-TDM/IRM si symptomatique' },
    { nom: 'Hypoplasie vs occlusion vs dominance', physiopath: 'Hypoplasie : petite vertébrale congénitale à lit d\'aval réduit. Occlusion : thrombose (rare). Dominance : variante de calibre normale.', bmode: 'Hypoplasie : petit calibre (< 2–2,5 mm), lumière fine. Occlusion : lumière comblée.', doppler: 'Hypoplasie : flux antérograde mais HAUTE résistance (diastole basse). Occlusion : absence de flux (couleur ET énergie). Dominance : flux normal de basse résistance, gros calibre.', ddx: 'Sténose ostiale d\'amont (qui amortit le flux d\'aval)', pieges: 'Conclure à une occlusion sur un flux faible d\'hypoplasie (PRF/filtre trop hauts) ; prendre une dominance pour une compensation pathologique', gravite: 'Hypoplasie/dominance = variantes ; occlusion à corréler à la clinique', cat: 'Mesurer le diamètre, baisser PRF/filtre + mode énergie, comparer les deux côtés ; imagerie en coupe si doute' },
    { nom: 'Dissection vertébrale', physiopath: 'Clivage pariétal (souvent V2-V3, sujet jeune, post-traumatique ou spontanée, manipulation cervicale) : cause classique d\'AVC du sujet jeune.', bmode: 'Hématome de paroi, double lumière, lumière effilée ; souvent au-delà de la fenêtre échographique (V3-V4).', doppler: 'Flux amorti / à haute résistance / bidirectionnel ; parfois seul signe indirect en aval.', ddx: 'Hypoplasie, occlusion, vasospasme', pieges: 'Souvent distale (V3-V4), hors champ échographique → écho normale n\'exclut pas', gravite: 'Urgence (AVC vertébro-basilaire)', cat: 'Angio-IRM/TDM cervicale + cérébrale, avis neurovasculaire urgent' }
  ],
  algorithme: {
    titre: 'Conduite devant un flux vertébral anormal',
    noeuds: [
      { q: 'Flux antérograde mais avec encoche systolique ?', a: 'Vol partiel/latent → manœuvre d\'hyperémie du bras + explorer la sous-clavière en amont' },
      { q: 'Flux complètement inversé (rétrograde) ?', a: 'Vol sous-clavier complet → confirmer la sténose/occlusion sous-clavière, asymétrie tensionnelle' },
      { q: 'Flux antérograde mais haute résistance + petit calibre ?', a: 'Hypoplasie (variante) → mesurer le diamètre, comparer l\'autre côté' },
      { q: 'Accélération focale à l\'ostium ?', a: 'Sténose ostiale → VPS V0, rapport V0/V2, corréler clinique' },
      { q: 'Pas de flux ?', a: 'Baisser PRF/filtre + énergie : occlusion vs hypoplasie à flux très lent' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES ARTÈRES VERTÉBRALES

Indication : [bilan TSA / vertiges / circulation postérieure].
Technique : sonde linéaire, mode B + Doppler couleur et pulsé, coupes longitudinales.

Artères vertébrales : visualisées dans leur segment intertransversaire (V2) des deux côtés, flux ANTÉROGRADE (céphalique), de basse résistance, sans encoche systolique. Calibres [symétriques / asymétrie modérée compatible avec une dominance ___]. Origines (V0) sans accélération focale décelable.

CONCLUSION : Artères vertébrales perméables, flux antérograde symétrique, sans argument pour un vol sous-clavier ni une sténose ostiale.`,
    pathologique: `ÉCHO-DOPPLER DES ARTÈRES VERTÉBRALES

Indication : [asymétrie tensionnelle / claudication du bras / vertiges d'effort].
Technique : sonde linéaire, mode B + Doppler couleur et pulsé, manœuvre d'hyperémie du bras.

Vertébrale [côté] : flux présentant [une encoche méso-systolique « bunny rabbit » / une inversion complète], [accentué/démasqué] par la manœuvre d'hyperémie (brassard) → vol sous-clavier [partiel/complet].
Vertébrale controlatérale : flux antérograde normal, de basse résistance.
Sous-clavière [côté] : [sténose serrée / occlusion] proximale ; asymétrie tensionnelle de ___ mmHg.

CONCLUSION : Vol sous-clavier [côté] [partiel/complet] secondaire à une [sténose/occlusion] de la sous-clavière proximale.
[Proposition : confirmation angio-TDM/IRM des TSA et avis vasculaire selon symptômes.]`
  },
  cas: [
    { titre: 'Le sens d\'abord', enonce: 'Vous trouvez un vaisseau entre les apophyses transverses dont le flux est dirigé en sens opposé à la carotide voisine.', questions: ['Est-ce forcément une vertébrale inversée ?', 'Comment trancher ?'], indices: ['Pensez au vaisseau satellite', 'Regardez le spectre veineux vs artériel'], reponse: 'Non : il s\'agit le plus souvent de la VEINE vertébrale satellite, à flux caudal opposé. Trancher sur le spectre (veineux continu peu pulsatile vs artériel pulsatile) et la position ; vérifier la convention couleur sur la carotide.' },
    { titre: 'Asymétrie de calibre', enonce: 'La vertébrale gauche est nettement plus grosse et plus rapide que la droite, qui reste antérograde et de basse résistance.', questions: ['Quel diagnostic ?'], indices: ['Diastole conservée ?', 'Variante fréquente ?'], reponse: 'Dominance vertébrale gauche : variante anatomique normale très fréquente. La droite reste antérograde et de basse résistance : pas de pathologie.' },
    { titre: 'Petite vertébrale résistive', enonce: 'Vertébrale droite de petit calibre (≈ 2 mm), flux antérograde mais à diastole basse (haute résistance).', questions: ['Diagnostic ?', 'Ne pas confondre avec ?'], reponse: 'Hypoplasie de la vertébrale droite (lit d\'aval réduit → haute résistance). Ne pas conclure à une occlusion (flux présent) ni à une sténose ostiale (pas d\'accélération focale en amont).' },
    { titre: 'L\'encoche', enonce: 'Vertébrale gauche : flux antérograde mais avec une nette encoche méso-systolique (« oreilles de lapin »).', questions: ['Que signifie cette encoche ?', 'Quelle manœuvre ?'], reponse: 'Vol sous-clavier partiel/latent. Réaliser la manœuvre d\'hyperémie du bras (brassard gonflé 2–3 min au-dessus de la systolique puis dégonflé) : l\'inversion s\'accentue/se démasque.' },
    { titre: 'Inversion franche', enonce: 'Vertébrale gauche à flux complètement inversé (rétrograde, vers le bras), patient claudiquant du membre supérieur gauche.', questions: ['Diagnostic ?', 'Où chercher la cause ?'], reponse: 'Vol sous-clavier complet. La cause est une sténose serrée ou une occlusion de la sous-clavière gauche EN AMONT de l\'origine vertébrale : explorer la sous-clavière proximale et mesurer l\'asymétrie tensionnelle.' },
    { titre: 'Asymétrie tensionnelle', enonce: 'TA bras droit 145/85, bras gauche 120/75 ; vertébrale gauche à flux inversé.', questions: ['Que confirme l\'écart tensionnel ?'], indices: ['Seuil significatif ?'], reponse: 'Un écart ≥ 15–20 mmHg confirme une sténose sous-clavière proximale gauche, cause du vol. L\'écho-Doppler localise et grade la lésion sous-clavière.' },
    { titre: 'Ostium oublié', enonce: 'Le segment V2 paraît un peu amorti (parvus-tardus) mais antérograde ; vous n\'avez pas exploré l\'origine.', questions: ['Que faut-il rechercher ?'], reponse: 'Une sténose ostiale (V0) d\'amont, site le plus fréquent de l\'athérome vertébral. Suivre le vaisseau jusqu\'à la sous-clavière, chercher l\'accélération focale et calculer le rapport V0/V2.' },
    { titre: 'Pas de flux ?', enonce: 'Aucun flux couleur dans une vertébrale ; PRF et filtre sont réglés haut.', questions: ['Avant de conclure à une occlusion, que faites-vous ?'], reponse: 'Baisser PRF et filtre mural, passer en Doppler énergie : une hypoplasie à flux très lent peut simuler une occlusion. La distinction change l\'interprétation (variante vs thrombose).' },
    { titre: 'Sujet jeune post-manipulation', enonce: 'Cervicalgie et syndrome cérébelleux après manipulation cervicale ; vertébrale V2 à flux amorti, haute résistance.', questions: ['Diagnostic à évoquer ?', 'Examen ?'], reponse: 'Dissection vertébrale (souvent V2-V3-V4). L\'écho peut être normale (lésion distale hors champ). Angio-IRM/TDM cervicale et cérébrale en urgence, avis neurovasculaire.' },
    { titre: 'Vol et symptômes', enonce: 'Vol sous-clavier complet découvert chez un patient totalement asymptomatique.', questions: ['Faut-il forcément traiter ?'], reponse: 'Non : le vol est souvent bien toléré grâce au polygone de Willis et reste fréquemment asymptomatique. Le traitement (de la sous-clavière) est discuté selon les symptômes (ischémie du bras, symptômes vertébro-basilaires d\'effort).' }
  ],
  pieges: [
    'Confondre la veine vertébrale satellite (flux opposé) avec une vertébrale inversée.',
    'Mal régler la convention couleur / la ligne de base → faux diagnostic d\'inversion.',
    'Conclure à une occlusion devant un flux faible d\'hypoplasie (PRF/filtre trop hauts).',
    'Ne pas explorer l\'ostium (V0) → sténose ostiale manquée.',
    'Omettre la manœuvre d\'hyperémie devant une simple encoche systolique (vol latent).',
    'Oublier d\'explorer la sous-clavière/le TABC quand le flux vertébral est anormal (le vol vient d\'amont).',
    'Prendre une dominance physiologique pour une compensation pathologique.',
    'Croire qu\'une écho vertébrale normale exclut une dissection (souvent distale, hors champ).'
  ],
  flashcards: [
    { q: 'Quel est le sens normal du flux vertébral ?', r: 'Antérograde (céphalique), basse résistance, diastole remplie.' },
    { q: 'Que traduit l\'encoche méso-systolique « bunny rabbit » ?', r: 'Un vol sous-clavier partiel/latent (sténose sous-clavière en amont).' },
    { q: 'Comment démasquer un vol latent ?', r: 'Manœuvre d\'hyperémie : brassard gonflé au bras 2–3 min au-dessus de la systolique, puis dégonflé brutalement.' },
    { q: 'Comment distinguer hypoplasie et occlusion vertébrale ?', r: 'Hypoplasie = petit calibre + flux antérograde HAUTE résistance ; occlusion = absence de flux (couleur + énergie, PRF/filtre bas).' },
    { q: 'Où siège le plus souvent l\'athérome vertébral ?', r: 'À l\'ostium (V0), origine sur la sous-clavière.' },
    { q: 'Quel segment vertébral explore-t-on entre les apophyses transverses ?', r: 'Le segment V2 (intertransversaire).' }
  ],
  qcm: [
    { q: 'Un flux vertébral complètement inversé (rétrograde) signe :', options: ['Une hypoplasie', 'Une dominance', 'Un vol sous-clavier complet', 'Une sténose carotidienne'], correct: 2, exp: 'L\'inversion complète traduit un vol sous-clavier complet par sténose/occlusion de la sous-clavière en amont de l\'origine vertébrale.' },
    { q: 'L\'encoche méso-systolique du spectre vertébral correspond à :', options: ['Une occlusion', 'Un vol partiel/latent', 'Une hypoplasie', 'Un artefact de gain'], correct: 1, exp: 'L\'aspect « bunny rabbit » est un vol partiel ; la manœuvre d\'hyperémie du bras l\'accentue ou le convertit en inversion.' },
    { q: 'Devant une vertébrale de petit calibre à flux antérograde mais à diastole basse, on évoque :', options: ['Une occlusion', 'Une hypoplasie', 'Un vol complet', 'Une dissection'], correct: 1, exp: 'Petit calibre + haute résistance + flux antérograde = hypoplasie (lit d\'aval réduit) ; ne pas confondre avec une occlusion ou un vol.' },
    { q: 'La manœuvre d\'hyperémie du bras sert à :', options: ['Mesurer l\'IMT vertébral', 'Démasquer un vol sous-clavier latent', 'Identifier l\'artère externe', 'Quantifier une sténose carotidienne'], correct: 1, exp: 'L\'hyperémie réactionnelle après gonflage/dégonflage du brassard accentue ou révèle l\'inversion vertébrale d\'un vol latent.' }
  ],
  refs: ['DIU Montpellier (TSA / circulation postérieure) ; recommandations SFMV (exploration des troncs supra-aortiques) ; ESVS 2023 (vertebral/subclavian disease) ; Kliewer/Hennerici, Doppler de la circulation postérieure.']
});

window.VASC.chapters.push({
  id: 'sous-clavieres', num: 12, groupe: 'Artériel — TSA', emoji: '💪',
  titre: 'Artères sous-clavières & TABC',
  sonde: 'Linéaire 5–9 MHz ± convexe', niveau: 'DIU → expert', duree: '≈2 h',
  resume: 'Exploration des artères sous-clavières et du tronc artériel brachio-céphalique (TABC) : profil triphasique de haute résistance, sténose proximale (asymétrie tensionnelle, vol sous-clavier d\'aval sur la vertébrale), syndrome du défilé thoracobrachial avec manœuvres dynamiques, et pièges du champ proche (artefact miroir sous la plèvre).',
  tags: 'sous-clavière TABC brachio-céphalique triphasique haute résistance asymétrie tensionnelle vol sous-clavier défilé thoracobrachial Adson hyperabduction artefact miroir plèvre',
  objectifs: [
    'Décrire l\'anatomie des sous-clavières (TABC à droite, sous-clavière directe à gauche) et leurs branches (vertébrale, mammaire interne).',
    'Reconnaître le flux normal triphasique de haute résistance et le repérer dans ses différents segments (pré/rétro/post-scalénique).',
    'Diagnostiquer une sténose sous-clavière proximale et la relier à l\'asymétrie tensionnelle et au vol sous-clavier d\'aval.',
    'Conduire les manœuvres dynamiques du syndrome du défilé thoracobrachial (Adson, hyperabduction).',
    'Reconnaître l\'artefact miroir sous la plèvre et les autres pièges du champ proche.',
    'Rédiger un compte-rendu sous-clavier, normal et pathologique.'
  ],
  anatomie: {
    texte: 'À DROITE, le tronc artériel brachio-céphalique (TABC) naît de la crosse aortique et se divise en artère carotide commune droite et artère sous-clavière droite. À GAUCHE, l\'artère sous-clavière naît DIRECTEMENT de la crosse aortique (pas de TABC à gauche). L\'artère sous-clavière se décrit en trois segments par rapport au muscle scalène antérieur : segment pré-scalénique (proximal, donne la vertébrale et la mammaire interne), segment rétro-scalénique (derrière le scalène antérieur, dans le défilé interscalénique avec le plexus brachial), segment post-scalénique (distal, devient l\'artère axillaire au bord externe de la première côte). Elle se poursuit par l\'axillaire puis l\'humérale.',
    svg: SVG_SUBCLAV_1,
    caption: 'À droite : crosse → TABC → carotide commune D + sous-clavière D. À gauche : crosse → sous-clavière G directe. La vertébrale et la mammaire interne naissent de la sous-clavière proximale (pré-scalénique).',
    vascularisation: 'La sous-clavière vascularise le membre supérieur (via axillaire/humérale) et donne la vertébrale (circulation cérébrale postérieure) et la mammaire interne (artère thoracique interne). Le lit d\'aval (muscle au repos) est de HAUTE résistance.',
    rapports: ['Plèvre/apex pulmonaire juste sous l\'artère (source d\'artefact miroir)', 'Muscle scalène antérieur (sépare segments pré/rétro/post-scalénique) et plexus brachial dans le défilé interscalénique', 'Veine sous-clavière en avant et en dessous (en avant du scalène antérieur)', 'Première côte et clavicule (pince costo-claviculaire) — clé du défilé thoracobrachial'],
    variantes: ['Artère sous-clavière droite rétro-œsophagienne (arteria lusoria) naissant directement de l\'aorte (dysphagia lusoria)', 'Origine de la vertébrale gauche directement sur l\'arche aortique', 'Variations de division du TABC']
  },
  physiologie: {
    texte: 'Le membre supérieur au repos est un lit de haute résistance : le spectre normal de la sous-clavière est TRIPHASIQUE (pic systolique aigu, reflux protodiastolique, faible flux antérograde télédiastolique), identique au profil des artères des membres au repos. Ce profil se monophase et perd son reflux en aval d\'une sténose serrée (parvus-tardus) ou après hyperémie (effort, réchauffement). Toute baisse de pression d\'aval (sténose proximale) retentit sur la vertébrale homolatérale (vol sous-clavier).',
    profils: [
      { nom: 'Sous-clavière normale', desc: 'Triphasique, haute résistance : pic systolique aigu + reflux protodiastolique + flux télédiastolique faible/nul.' },
      { nom: 'Aval de sténose proximale', desc: 'Parvus-tardus : montée systolique lente, pic émoussé, perte du reflux (démodulation) — flux monophasé amorti.' },
      { nom: 'Au niveau d\'une sténose', desc: 'Accélération focale (VPS↑), aliasing, élargissement spectral / turbulence post-sténotique.' },
      { nom: 'Hyperémie (effort/chaleur)', desc: 'Perte transitoire du reflux et flux plus continu : profil physiologiquement modifié, à ne pas confondre avec une sténose.' }
    ]
  },
  physique: {
    intro: 'Région profonde et oblique sous la clavicule : descendre en fréquence si besoin, attention aux artefacts du champ proche (plèvre).',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 5–9 MHz pour les segments accessibles ; une sonde convexe basse fréquence peut aider pour l\'origine (ostium), le TABC et chez les patients difficiles.' },
      { titre: 'Abords', desc: 'Abord sus-claviculaire (segment proximal/rétroscalénique), sous-claviculaire et infraclaviculaire (segment distal/axillaire). Multiplier les fenêtres pour suivre l\'artère.' },
      { titre: 'Artefact miroir', desc: 'La plèvre, très réfléchissante, crée une image « dédoublée » de la sous-clavière plus en profondeur (faux vaisseau, spectre symétrique). Reconnaître la symétrie et changer d\'angle pour ne pas s\'y tromper.' },
      { titre: 'Angle & sens', desc: 'Trajet oblique : aligner soigneusement le curseur d\'angle ≤ 60° sur la paroi ; comparer toujours les deux côtés.' }
    ]
  },
  reglages: {
    intro: 'Réglages sous-claviers types.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 5–9 MHz ± convexe', note: 'Convexe pour l\'ostium / TABC / patient difficile' },
      { param: 'Profondeur', valeur: '4–6 cm', note: 'Plus profond, surtout à l\'origine' },
      { param: 'Abord', valeur: 'Sus- et sous-claviculaire', note: 'Multiplier les fenêtres' },
      { param: 'PRF', valeur: 'Adaptée aux vitesses (parfois élevées)', note: '↑ sur sténose' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Trajet oblique : à corriger soigneusement' },
      { param: 'Filtre mural', valeur: 'Moyen', note: 'Haute résistance : reflux à conserver' },
      { param: 'Attention plèvre', valeur: 'Repérer l\'artefact miroir', note: 'Faux vaisseau dédoublé en profondeur' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, bras le long du corps, tête en légère rotation controlatérale ; épaule abaissée. Pour les manœuvres dynamiques, le bras sera mobilisé.',
    operateur: 'À la tête ou au côté du patient, accès sus- et sous-claviculaire.',
    ecran: 'Dans l\'axe du regard, convention habituelle.',
    sonde: 'Coupe sus-claviculaire oblique pour le segment proximal/rétroscalénique, infraclaviculaire pour le distal/axillaire.',
    ergonomie: 'Prévoir un brassard de tension aux deux bras (asymétrie tensionnelle) et la possibilité de mobiliser le bras (manœuvres dynamiques du défilé).'
  },
  acquisition: {
    etapes: [
      { titre: 'Mesurer la TA aux deux bras', desc: 'Point de départ : une asymétrie tensionnelle ≥ 15–20 mmHg oriente d\'emblée vers une sténose/occlusion sous-clavière du côté de la pression la plus basse.' },
      { titre: 'Repérer la sous-clavière proximale', desc: 'Abord sus-claviculaire : suivre l\'artère depuis son origine (TABC à droite, crosse à gauche) ; identifier la vertébrale et la mammaire interne qui en naissent.' },
      { titre: 'Doppler couleur + pulsé', desc: 'Confirmer le profil triphasique de haute résistance ; chercher accélération focale, aliasing, turbulence post-sténotique. Mesurer VPS au point le plus sténosant.' },
      { titre: 'Analyser la vertébrale homolatérale', desc: 'Une sténose sous-clavière PROXIMALE (en amont de l\'origine vertébrale) provoque un vol sous-clavier sur la vertébrale d\'aval : encoche ou inversion (cf. chapitre vertébrales).' },
      { titre: 'Suivre vers l\'axillaire', desc: 'Abord infraclaviculaire : poursuivre vers l\'axillaire/humérale, vérifier la perméabilité et le profil d\'aval.' },
      { titre: 'Manœuvres dynamiques si suspicion de défilé', desc: 'Enregistrer le flux distal au repos puis en position provocatrice : Adson (tête tournée vers le côté testé, inspiration profonde, bras en bas) et hyperabduction (bras à 90–180°) ; rechercher une atténuation/abolition du flux positionnelle.' }
    ],
    reperes: ['Origine : TABC à droite, crosse directe à gauche', 'Vertébrale et mammaire interne naissant de la sous-clavière proximale', 'Plèvre/apex pulmonaire juste sous l\'artère (artefact miroir)', 'Première côte / pince costo-claviculaire (défilé)'],
    astuces: ['Toujours coupler à la TA des deux bras et à l\'analyse de la vertébrale homolatérale.', 'Une sonde convexe aide pour l\'ostium et le TABC.', 'Pour le défilé, comparer le flux distal au repos et en position provocatrice (atténuation positionnelle).', 'Reconnaître l\'artefact miroir par sa symétrie sous la plèvre.'],
    erreurs: ['Prendre l\'artefact miroir sous la plèvre pour un vrai vaisseau / une dissection.', 'Oublier de mesurer la TA aux deux bras.', 'Ne pas analyser la vertébrale homolatérale (vol d\'aval) devant une sténose sous-clavière.', 'Surdiagnostiquer un défilé sur une simple atténuation positionnelle asymptomatique (fréquente chez le sujet sain).', 'Manquer l\'ostium (lésion proximale) faute de fenêtre adaptée (convexe).']
  },
  interpretation: {
    normal: ['Flux triphasique de haute résistance dans tous les segments', 'Symétrie relative des vitesses et des pressions (TA D/G)', 'Vertébrale homolatérale à flux antérograde normal', 'Pas d\'atténuation significative aux manœuvres dynamiques'],
    pathologique: ['Accélération focale + aliasing + turbulence = sténose', 'Parvus-tardus / démodulation en aval = sténose serrée d\'amont', 'Asymétrie tensionnelle ≥ 15–20 mmHg = sténose proximale du côté hypotendu', 'Vol sous-clavier sur la vertébrale homolatérale = sténose PROXIMALE (avant l\'origine vertébrale)', 'Abolition/atténuation positionnelle du flux distal = syndrome du défilé thoracobrachial', 'Absence de flux = occlusion'],
    svgPatho: SVG_SUBCLAV_1
  },
  valeurs: {
    intro: 'Repères sous-claviers (à adapter au laboratoire et au contexte).',
    lignes: [
      { param: 'Profil normal', valeur: 'Triphasique haute résistance', note: 'Reflux protodiastolique présent' },
      { param: 'Asymétrie tensionnelle significative', valeur: '≥ 15–20 mmHg entre les deux bras', note: 'Oriente vers une sténose sous-clavière du côté hypotendu' },
      { param: 'Sténose (au site)', valeur: 'VPS focale élevée (souvent > 200–240 cm/s) + rapport > 2', note: 'Aliasing, turbulence post-sténotique' },
      { param: 'Aval de sténose', valeur: 'Parvus-tardus, perte du reflux', note: 'Démodulation du spectre' },
      { param: 'Vol sous-clavier', valeur: 'Encoche → inversion vertébrale homolatérale', note: 'Signe une sténose PROXIMALE (pré-vertébrale)' },
      { param: 'Défilé thoracobrachial', valeur: 'Atténuation/abolition positionnelle du flux distal', note: 'À corréler à la clinique (manœuvres asymptomatiques fréquentes)' }
    ]
  },
  pathologies: [
    { nom: 'Sténose sous-clavière proximale', physiopath: 'Plaque athéromateuse de la sous-clavière proximale (ou du TABC à droite), le plus souvent à gauche ; réduit la pression d\'aval au membre supérieur.', bmode: 'Plaque proximale, parfois calcifiée ; origine profonde (intérêt de la sonde convexe).', doppler: 'Accélération focale (VPS↑), aliasing, turbulence post-sténotique au site ; parvus-tardus en aval ; ASYMÉTRIE TENSIONNELLE ≥ 15–20 mmHg ; si proximale à l\'origine vertébrale → VOL sous-clavier sur la vertébrale homolatérale.', ddx: 'Occlusion, artefact miroir, hyperémie physiologique', pieges: 'Manquer l\'ostium (fenêtre), oublier la TA bilatérale et l\'analyse vertébrale', gravite: 'Souvent asymptomatique ; claudication du bras / symptômes vertébro-basilaires d\'effort possibles', cat: 'Quantifier (VPS, rapport), mesurer la TA bilatérale, analyser la vertébrale ; angio-TDM/IRM + avis si symptomatique' },
    { nom: 'Vol sous-clavier (retentissement)', physiopath: 'Sténose/occlusion sous-clavière EN AMONT de l\'origine vertébrale : inversion du flux vertébral homolatéral pour alimenter le bras (cf. chapitre vertébrales).', bmode: 'Lésion sous-clavière proximale.', doppler: 'Spectre vertébral homolatéral : encoche méso-systolique (partiel) → inversion complète, démasqué par la manœuvre d\'hyperémie du bras.', ddx: 'Hypoplasie vertébrale, artefact de convention couleur', pieges: 'Conclure au vol sans localiser la lésion sous-clavière causale ; vol latent manqué sans hyperémie', gravite: 'Le plus souvent bien toléré (polygone de Willis)', cat: 'Localiser/grader la sténose sous-clavière, corréler aux symptômes du bras et vertébro-basilaires' },
    { nom: 'Syndrome du défilé thoracobrachial', physiopath: 'Compression positionnelle du paquet vasculo-nerveux (artère sous-clavière/axillaire, veine, plexus brachial) dans le défilé interscalénique ou la pince costo-claviculaire, lors de certaines positions du bras.', bmode: 'Souvent normal au repos ; rechercher une dilatation post-sténotique/anévrisme en cas de compression chronique sévère.', doppler: 'Atténuation ou ABOLITION du flux distal lors des manœuvres provocatrices (Adson : tête tournée vers le côté testé + inspiration ; hyperabduction du bras), retour à la normale en position neutre.', ddx: 'Atténuation positionnelle physiologique (sujet sain), pathologie nerveuse pure', pieges: 'Surdiagnostic : l\'atténuation positionnelle est fréquente chez l\'asymptomatique → exiger la corrélation clinique', gravite: 'Variable ; forme artérielle (anévrisme/emboles) plus grave', cat: 'Corréler aux symptômes positionnels ; bilan complet (clinique, radio, angio-TDM dynamique) ; avis spécialisé' },
    { nom: 'Occlusion sous-clavière', physiopath: 'Thrombose/occlusion complète (athérome, parfois TABC à droite).', bmode: 'Lumière comblée, artère non pulsatile.', doppler: 'Absence de flux au segment occlus ; réinjection d\'aval par collatérales avec parvus-tardus ; vol vertébral homolatéral si proximale.', ddx: 'Sténose pré-occlusive, artefact miroir', pieges: 'Baisser PRF/filtre + énergie avant de conclure ; ne pas prendre l\'artefact miroir pour une fausse lumière', gravite: 'Souvent bien tolérée (collatéralité, vol) ; ischémie du bras possible', cat: 'Confirmer par énergie ± angio-TDM/IRM ; analyser vertébrale et axillaire d\'aval' }
  ],
  algorithme: {
    titre: 'Conduite devant une suspicion d\'atteinte sous-clavière',
    noeuds: [
      { q: 'Asymétrie tensionnelle ≥ 15–20 mmHg ?', a: 'Oui → sténose/occlusion sous-clavière du côté hypotendu : explorer l\'origine' },
      { q: 'Accélération focale + turbulence à l\'origine ?', a: 'Sténose proximale → VPS, rapport, analyser la vertébrale homolatérale' },
      { q: 'Vertébrale homolatérale inversée / encochée ?', a: 'Vol sous-clavier → la lésion est PROXIMALE (pré-vertébrale)' },
      { q: 'Symptômes positionnels du bras ?', a: 'Manœuvres dynamiques (Adson, hyperabduction) : atténuation positionnelle = défilé (corréler clinique)' },
      { q: 'Pas de flux ?', a: 'Énergie à PRF/filtre bas → occlusion vs flux lent ; attention à l\'artefact miroir' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES ARTÈRES SOUS-CLAVIÈRES

Indication : [asymétrie tensionnelle / bilan TSA / symptômes du membre supérieur].
Technique : sonde linéaire (± convexe), mode B + Doppler couleur et pulsé, abords sus- et sous-claviculaires ; TA mesurée aux deux bras.

TA : bras droit ___ / gauche ___ mmHg (différence ___).
Artères sous-clavières : perméables des deux côtés, flux TRIPHASIQUE de haute résistance, sans accélération focale ni turbulence. TABC [droite] perméable. Vertébrales homolatérales à flux antérograde normal.
[Manœuvres dynamiques : pas d'atténuation significative du flux distal.]

CONCLUSION : Artères sous-clavières et TABC perméables, flux triphasique normal, sans sténose ni vol sous-clavier. Pas d'asymétrie tensionnelle significative.`,
    pathologique: `ÉCHO-DOPPLER DES ARTÈRES SOUS-CLAVIÈRES

Indication : [claudication du bras / asymétrie tensionnelle / vertiges d'effort].
Technique : sonde linéaire (± convexe), mode B + Doppler couleur et pulsé ; TA aux deux bras ; manœuvre d'hyperémie.

TA : bras droit ___ / gauche ___ mmHg (asymétrie de ___ mmHg).
Sous-clavière [côté] : [plaque / sténose serrée / occlusion] proximale, VPS ___ cm/s, turbulence post-sténotique, flux d'aval [parvus-tardus / amorti].
Vertébrale homolatérale : [encoche systolique / flux inversé] → vol sous-clavier [partiel/complet] (lésion proximale, pré-vertébrale).
[Défilé : atténuation/abolition du flux distal en hyperabduction / Adson.]

CONCLUSION : [Sténose/occlusion] de la sous-clavière [côté] proximale avec vol sous-clavier [partiel/complet] et asymétrie tensionnelle de ___ mmHg.
[Proposition : angio-TDM/IRM des TSA et avis vasculaire selon symptômes.]`
  },
  cas: [
    { titre: 'Deux bras, deux pressions', enonce: 'TA bras droit 150/90, bras gauche 118/72. Le patient est asymptomatique.', questions: ['Que suspecter ?', 'Où explorer ?'], indices: ['Seuil d\'asymétrie ?', 'Côté le plus bas ?'], reponse: 'Asymétrie ≥ 15–20 mmHg → sténose/occlusion de la sous-clavière gauche (côté hypotendu). Explorer l\'origine sous-clavière gauche et la vertébrale homolatérale (vol).' },
    { titre: 'Le faux vaisseau', enonce: 'Sous la sous-clavière, vous voyez un deuxième vaisseau plus profond au spectre symétrique, juste sous une interface très brillante.', questions: ['De quoi s\'agit-il ?', 'Comment le confirmer ?'], reponse: 'Artefact en miroir sur la plèvre : le « vaisseau » dédoublé est virtuel (symétrie du spectre). Le confirmer en changeant d\'angle/de fenêtre — l\'image disparaît.' },
    { titre: 'Triphasique perdu', enonce: 'La sous-clavière distale a perdu son reflux et montre un parvus-tardus ; l\'origine n\'a pas été vue.', questions: ['Que rechercher ?'], reponse: 'Une sténose serrée proximale (origine/TABC) en amont. Reprendre l\'origine (sonde convexe), chercher l\'accélération focale et vérifier la vertébrale (vol).' },
    { titre: 'Vol et localisation', enonce: 'Vertébrale gauche inversée. Vous trouvez une sténose serrée de la sous-clavière gauche.', questions: ['La sténose est-elle avant ou après l\'origine vertébrale ?'], reponse: 'Avant (proximale, pré-vertébrale) : seule une sténose en AMONT de l\'origine vertébrale crée un vol. Une sténose distale à l\'origine vertébrale ne donne pas d\'inversion.' },
    { titre: 'Bras qui pâlit', enonce: 'Paresthésies et pâleur du bras en élévation. Au repos, flux axillaire normal.', questions: ['Quelle manœuvre ?', 'Que cherchez-vous ?'], reponse: 'Manœuvres dynamiques du défilé (hyperabduction, Adson) : rechercher une atténuation/abolition positionnelle du flux distal, réversible en position neutre.' },
    { titre: 'Adson positif mais asymptomatique', enonce: 'En manœuvre d\'Adson, le flux distal s\'atténue nettement, mais le patient n\'a aucun symptôme positionnel.', questions: ['Peut-on affirmer un défilé ?'], reponse: 'Non : l\'atténuation positionnelle est fréquente chez le sujet sain. Le diagnostic de défilé exige la corrélation avec des symptômes positionnels concordants.' },
    { titre: 'TABC à droite', enonce: 'À droite, vitesses élevées et turbulence à l\'origine de la carotide commune ET de la sous-clavière droites.', questions: ['Où siège la lésion ?'], reponse: 'Au TABC (tronc brachio-céphalique), qui donne à droite la carotide commune et la sous-clavière : une lésion du TABC retentit sur les deux. À gauche, pas de TABC (sous-clavière directe).' },
    { titre: 'Pas de flux sous-clavier', enonce: 'Aucun flux dans la sous-clavière gauche proximale ; en aval, flux amorti parvus-tardus réinjecté.', questions: ['Diagnostic ?', 'Précaution ?'], reponse: 'Occlusion sous-clavière proximale avec réinjection d\'aval par collatérales (et vol vertébral). Baisser PRF/filtre + énergie pour confirmer l\'absence de flux ; éliminer l\'artefact miroir.' },
    { titre: 'Lusoria', enonce: 'Dysphagie ; à droite, l\'artère sous-clavière naît directement de l\'aorte, en position rétro-œsophagienne.', questions: ['Quel nom ?'], reponse: 'Arteria lusoria (sous-clavière droite rétro-œsophagienne), variante naissant directement de l\'aorte ; peut donner une dysphagia lusoria.' },
    { titre: 'Symptômes vertébro-basilaires d\'effort', enonce: 'Vertiges et flou visuel déclenchés par l\'effort du bras gauche ; vol sous-clavier gauche complet documenté.', questions: ['Lien physiopathologique ?', 'Conduite ?'], reponse: 'L\'effort du bras augmente sa demande, accentue le vol et « détourne » le sang du tronc basilaire → symptômes vertébro-basilaires d\'effort. Conduite : grader la sténose sous-clavière, corréler clinique, avis vasculaire (revascularisation si symptomatique).' }
  ],
  pieges: [
    'Prendre l\'artefact miroir sous la plèvre pour un vrai vaisseau ou une dissection.',
    'Oublier de mesurer la TA aux deux bras (asymétrie ≥ 15–20 mmHg = signe d\'alerte).',
    'Ne pas analyser la vertébrale homolatérale (vol d\'aval) devant une sténose sous-clavière.',
    'Surdiagnostiquer un défilé thoracobrachial sur une atténuation positionnelle asymptomatique.',
    'Manquer l\'ostium / le TABC faute de sonde convexe ou de fenêtre adaptée.',
    'Confondre la perte de reflux après hyperémie (physiologique) avec une sténose.',
    'Oublier qu\'à droite le TABC alimente carotide ET sous-clavière (lésion à double retentissement).',
    'Conclure à une occlusion avec PRF/filtre trop hauts (rater un flux lent réinjecté).'
  ],
  flashcards: [
    { q: 'Quel est le profil normal de l\'artère sous-clavière ?', r: 'Triphasique, de haute résistance (pic systolique + reflux protodiastolique + flux télédiastolique faible).' },
    { q: 'Quelle asymétrie tensionnelle évoque une sténose sous-clavière ?', r: 'Une différence ≥ 15–20 mmHg entre les deux bras (côté hypotendu atteint).' },
    { q: 'Pourquoi une sténose sous-clavière peut-elle provoquer un vol vertébral ?', r: 'Si elle est PROXIMALE (en amont de l\'origine vertébrale), la chute de pression inverse le flux vertébral homolatéral.' },
    { q: 'Quelles manœuvres pour le défilé thoracobrachial ?', r: 'Adson (tête tournée vers le côté testé + inspiration) et hyperabduction du bras : recherche d\'atténuation positionnelle du flux distal.' },
    { q: 'Quel artefact piège sous la sous-clavière ?', r: 'L\'artefact en miroir sur la plèvre (faux vaisseau dédoublé, spectre symétrique).' },
    { q: 'Quelle particularité anatomique distingue droite et gauche ?', r: 'À droite : TABC (→ carotide commune D + sous-clavière D) ; à gauche : sous-clavière directe sur la crosse.' }
  ],
  qcm: [
    { q: 'Le flux normal de l\'artère sous-clavière est :', options: ['Monophasique basse résistance', 'Triphasique haute résistance', 'Inversé', 'Parvus-tardus'], correct: 1, exp: 'Le membre supérieur au repos est un lit de haute résistance → flux triphasique avec reflux protodiastolique.' },
    { q: 'Une asymétrie tensionnelle de 25 mmHg entre les bras évoque :', options: ['Une hypoplasie vertébrale', 'Une sténose sous-clavière du côté hypotendu', 'Un artefact miroir', 'Une dissection carotidienne'], correct: 1, exp: 'Un écart ≥ 15–20 mmHg oriente vers une sténose/occlusion sous-clavière du côté où la pression est la plus basse.' },
    { q: 'Un vol sous-clavier sur la vertébrale signifie que la sténose sous-clavière est :', options: ['Distale à l\'origine vertébrale', 'Proximale à l\'origine vertébrale', 'Au niveau de l\'axillaire', 'Au niveau de l\'humérale'], correct: 1, exp: 'Seule une sténose/occlusion EN AMONT de l\'origine vertébrale inverse le flux vertébral (vol).' },
    { q: 'L\'artefact miroir sous-clavier est dû à :', options: ['La première côte', 'La plèvre (interface très réfléchissante)', 'Le scalène antérieur', 'La veine sous-clavière'], correct: 1, exp: 'La plèvre, très échogène, duplique l\'image de l\'artère plus en profondeur (spectre symétrique) : faux vaisseau.' }
  ],
  refs: ['DIU Montpellier (sous-clavières / défilé thoracobrachial) ; recommandations SFMV ; ESVS 2023 (subclavian/vertebral disease) ; consensus sur le syndrome du défilé thoracobrachial (Society for Vascular Surgery).']
});

})();
