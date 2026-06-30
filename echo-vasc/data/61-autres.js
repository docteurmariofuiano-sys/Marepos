/* ÉCHO-VASC DIU — Doppler superficiel & divers : testicule, thyroïde, tissus mous */
window.VASC = window.VASC || { chapters: [] };

(function () {

/* ================= CHAPITRE 1 — DOPPLER TESTICULAIRE ================= */

const SVG_TESTIS_1 = `<svg viewBox="0 0 460 240" role="img" aria-label="Vascularisation testiculaire">
<rect width="460" height="240" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Vascularisation du testicule &amp; cordon</text>
<ellipse cx="150" cy="150" rx="80" ry="58" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<text x="120" y="155" font-size="11" fill="#991b1b">Testicule</text>
<path d="M150,92 C150,60 150,45 150,30" fill="none" stroke="#7c3aed" stroke-width="6"/>
<text x="158" y="45" font-size="10" fill="#7c3aed">Cordon spermatique</text>
<path d="M150,150 C170,140 195,150 215,135" fill="none" stroke="#dc2626" stroke-width="3"/>
<text x="225" y="135" font-size="10" fill="#991b1b">Artère testiculaire</text>
<path d="M150,160 q40,15 60,5 q15,-5 25,10" fill="none" stroke="#2563eb" stroke-width="2.5"/>
<text x="225" y="185" font-size="10" fill="#1d4ed8">Flux intratesticulaire</text>
<ellipse cx="118" cy="100" rx="22" ry="14" fill="#dbeafe" stroke="#1d4ed8"/>
<text x="60" y="100" font-size="10" fill="#1d4ed8">Épididyme</text>
<g>
<line x1="300" y1="40" x2="300" y2="120" stroke="#0d9488" stroke-width="3"/>
<line x1="312" y1="40" x2="312" y2="120" stroke="#0d9488" stroke-width="3"/>
<line x1="324" y1="40" x2="324" y2="120" stroke="#0d9488" stroke-width="3"/>
<text x="295" y="135" font-size="10" fill="#0f766e">Plexus pampiniforme</text>
<text x="295" y="150" font-size="9" fill="#0f766e">(veines &gt; 2–3 mm = varicocèle)</text>
</g>
<text x="10" y="225" font-size="10" fill="#0b2f63">Flux intratesticulaire = BASSE résistance (IR ~0,5–0,7). Comparatif bilatéral systématique +++.</text>
</svg>`;

const SVG_TESTIS_2 = `<svg viewBox="0 0 460 200" role="img" aria-label="Torsion versus orchi-épididymite">
<rect width="460" height="200" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#991b1b">TORSION : flux intratesticulaire absent/diminué</text>
<ellipse cx="110" cy="80" rx="70" ry="48" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
<text x="80" y="84" font-size="10" fill="#991b1b">testicule</text>
<text x="60" y="120" font-size="9" fill="#dc2626">peu/pas de couleur</text>
<path d="M110,32 q25,15 15,35 q-10,18 8,30" fill="none" stroke="#7c3aed" stroke-width="3"/>
<text x="135" y="40" font-size="9" fill="#7c3aed">« whirlpool »</text>
<text x="8" y="160" font-size="11" font-weight="bold" fill="#0f766e">ORCHI-ÉPIDIDYMITE : HYPERvascularisation</text>
<ellipse cx="350" cy="100" rx="70" ry="48" fill="#ccfbf1" stroke="#0d9488" stroke-width="2"/>
<path d="M310,90 l10,8 m20,-18 l8,10 m18,-6 l10,8 m-50,18 l9,7 m22,-4 l8,8" stroke="#dc2626" stroke-width="2"/>
<text x="320" y="105" font-size="10" fill="#0f766e">couleur ++</text>
</svg>`;

window.VASC.chapters.push({
  id: 'doppler-testiculaire', num: 70, groupe: 'Doppler superficiel & divers', emoji: '🔵',
  titre: 'Doppler testiculaire',
  sonde: 'Linéaire 7–15 MHz', niveau: 'DIU → expert', duree: '≈90 min',
  resume: 'Exploration du scrotum aigu et chronique : la torsion du cordon est une URGENCE chirurgicale reposant sur l\'absence/diminution comparative du flux intratesticulaire. Différencier de l\'orchi-épididymite (hypervascularisation), explorer la varicocèle, les traumatismes et les tumeurs. Le maître-mot : comparatif bilatéral systématique.',
  tags: 'testicule scrotum torsion cordon whirlpool orchi-épididymite varicocèle pampiniforme Valsalva tumeur hydrocèle IR comparatif urgence',
  objectifs: [
    'Identifier la vascularisation testiculaire (artère testiculaire, crémastérienne/déférentielle, plexus pampiniforme) et le profil intratesticulaire de basse résistance.',
    'Reconnaître une torsion du cordon (flux intratesticulaire absent/diminué en comparatif, whirlpool sign) et la distinguer de l\'orchi-épididymite.',
    'Diagnostiquer et grader une varicocèle (plexus > 2–3 mm, reflux au Valsalva/debout).',
    'Caractériser une tumeur testiculaire (hypervascularisée) et reconnaître hématome/hydrocèle.',
    'Comprendre que toute clinique évidente de torsion impose le bloc sans retarder par l\'imagerie.',
    'Rédiger un compte-rendu scrotal standardisé avec mention systématique du comparatif.'
  ],
  anatomie: {
    texte: 'Le testicule est vascularisé par l\'artère testiculaire (spermatique), branche de l\'aorte, qui chemine dans le cordon, perfore l\'albuginée et donne les artères capsulaires puis les branches centripètes intratesticulaires. L\'artère crémastérienne (branche de l\'épigastrique inférieure) et l\'artère déférentielle (branche vésicale/iliaque interne) vascularisent les enveloppes, l\'épididyme et le déférent ; elles peuvent maintenir une perfusion résiduelle des enveloppes en cas de torsion. Le drainage veineux se fait par le plexus pampiniforme, réseau anastomotique qui se draine à gauche dans la veine rénale gauche (à angle droit) et à droite dans la VCI — d\'où la prédominance gauche des varicocèles.',
    svg: SVG_TESTIS_1,
    caption: 'Schéma : artère testiculaire et flux intratesticulaire de basse résistance, plexus pampiniforme (varicocèle si veines > 2–3 mm). Le comparatif bilatéral est systématique.',
    vascularisation: 'Artère testiculaire (spermatique) → parenchyme (basse résistance). Artères crémastérienne et déférentielle → enveloppes, épididyme, déférent. Plexus pampiniforme → drainage veineux (gauche dans la veine rénale gauche).',
    rapports: ['Épididyme coiffant le testicule (tête au pôle supérieur)', 'Cordon spermatique contenant artère, veines pampiniformes et déférent', 'Albuginée (capsule fibreuse) et vaginale (cavité séreuse, siège des hydrocèles)'],
    variantes: ['Appendice testiculaire (hydatide de Morgagni) pouvant se tordre isolément', 'Anomalie de fixation « en battant de cloche » (bell-clapper) prédisposant à la torsion', 'Vascularisation intratesticulaire parfois peu abondante chez l\'enfant prépubère (piège de fausse absence de flux)']
  },
  physiologie: {
    texte: 'Le parenchyme testiculaire est un lit de BASSE résistance : spectre artériel intratesticulaire monophasique, à diastole bien remplie, avec un IR habituellement compris entre 0,5 et 0,7. La vascularisation est symétrique entre les deux côtés : c\'est cette symétrie qui sert de référence. Toute asymétrie de flux (en couleur, en énergie et au pulsé) doit faire suspecter une pathologie, la torsion en premier lieu.',
    profils: [
      { nom: 'Flux intratesticulaire normal', desc: 'Basse résistance, diastole remplie, IR ~0,5–0,7, symétrique des deux côtés. Mesuré au Doppler pulsé sur les branches centripètes.' },
      { nom: 'Torsion (incomplète/partielle)', desc: 'Diminution du flux diastolique puis abolition de la diastole (IR augmenté, voire flux diastolique inversé), puis disparition complète du flux dans les torsions serrées. Toujours interprété en comparatif.' },
      { nom: 'Orchi-épididymite', desc: 'Hypervascularisation (couleur et énergie augmentées), flux conservé voire majoré, IR souvent abaissé. Épididyme augmenté et hypervascularisé.' },
      { nom: 'Détorsion spontanée', desc: 'Hyperhémie réactionnelle après une torsion qui s\'est résolue : aspect d\'hypervascularisation transitoire pouvant simuler une inflammation — d\'où l\'importance du contexte et du contrôle.' }
    ]
  },
  physique: {
    intro: 'Scrotum = structure superficielle : haute fréquence, réglages optimisés pour les flux LENTS (énergie, PRF et filtre bas) car le débit intratesticulaire est faible.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 7–15 MHz : la haute fréquence offre une excellente résolution du parenchyme et de l\'épididyme. Une mauvaise sonde basse fréquence fait rater les flux lents.' },
      { titre: 'Réglages pour flux lents', desc: 'Baisser la PRF et le filtre mural, augmenter le gain couleur juste avant le bruit : indispensable pour ne pas conclure à tort à une absence de flux (faux diagnostic de torsion par sous-réglage).' },
      { titre: 'Doppler énergie', desc: 'Le mode énergie est le plus sensible aux flux lents et le moins angle-dépendant : il est CENTRAL dans le scrotum aigu pour affirmer ou exclure une perfusion intratesticulaire.' },
      { titre: 'Réglages identiques D/G', desc: 'Pour que le comparatif soit valable, les réglages couleur/énergie/PRF/gain doivent être STRICTEMENT identiques des deux côtés (idéalement les deux testicules sur la même coupe).' }
    ]
  },
  reglages: {
    intro: 'Réglages scrotaux types — optimisés flux lents et comparatif.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 7–15 MHz', note: 'Haute résolution superficielle' },
      { param: 'Profondeur', valeur: '3–4 cm', note: 'Testicule au ⅔ de l\'écran' },
      { param: 'Mode', valeur: 'Couleur + énergie', note: 'Énergie pour les flux lents +++' },
      { param: 'PRF couleur', valeur: 'Basse', note: 'Détecter le flux intratesticulaire faible' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Ne pas effacer la perfusion lente' },
      { param: 'Gain couleur', valeur: 'Juste avant le bruit', note: 'Trop bas = fausse absence de flux' },
      { param: 'Vue comparative', valeur: 'Les 2 testicules sur 1 coupe', note: 'Réglages identiques D/G' },
      { param: 'Manœuvre', valeur: 'Valsalva / debout', note: 'Recherche de reflux (varicocèle)' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, verge relevée et maintenue sur l\'abdomen (par le patient ou une compresse), scrotum soutenu par une serviette entre les cuisses. Compléter en position DEBOUT et avec Valsalva pour la varicocèle.',
    operateur: 'Assis sur le côté, avant-bras en appui ; prévenir le patient et respecter l\'intimité (présence d\'un tiers selon les recommandations).',
    ecran: 'Dans l\'axe du regard, gel tiède pour le confort.',
    sonde: 'Linéaire en transverse pour le comparatif des deux testicules sur une même image, puis longitudinale de chaque côté.',
    ergonomie: 'Pression douce (un appui excessif efface les flux lents et peut être douloureux). Comparatif bilatéral SYSTÉMATIQUE.'
  },
  acquisition: {
    etapes: [
      { titre: 'B-mode bilatéral', desc: 'Évaluer taille, échostructure, homogénéité de chaque testicule et de l\'épididyme ; rechercher hydrocèle, masse, hématome.' },
      { titre: 'Coupe transverse comparative', desc: 'Placer les DEUX testicules sur une seule coupe transverse pour comparer échostructure ET vascularisation côte à côte avec des réglages identiques.' },
      { titre: 'Couleur puis énergie', desc: 'Évaluer la symétrie de la vascularisation intratesticulaire ; en énergie pour les flux lents (clé du scrotum aigu).' },
      { titre: 'Doppler pulsé', desc: 'Mesurer le profil intratesticulaire (basse résistance, IR ~0,5–0,7) des deux côtés ; rechercher une augmentation d\'IR / abolition de diastole du côté suspect.' },
      { titre: 'Cordon spermatique', desc: 'Rechercher le « whirlpool sign » (enroulement spiralé du cordon au-dessus du testicule) en couleur, signe direct de torsion.' },
      { titre: 'Plexus pampiniforme', desc: 'Mesurer le calibre des veines au repos puis en Valsalva/debout, rechercher un reflux (varicocèle), surtout à gauche.' }
    ],
    reperes: ['Épididyme (tête au pôle supérieur)', 'Médiastinum testis (ligne échogène)', 'Cordon spermatique au-dessus du testicule', 'Plexus pampiniforme latéral au testicule'],
    astuces: ['Toujours capturer une image comparative des deux testicules sur une seule coupe.', 'Le mode énergie tranche pour la perfusion intratesticulaire.', 'Rechercher activement le whirlpool sign du cordon, signe direct et précoce.', 'Faire l\'examen debout + Valsalva pour la varicocèle.'],
    erreurs: ['PRF/filtre/gain mal réglés → fausse absence de flux (faux diagnostic de torsion).', 'Oublier le comparatif → impossible d\'interpréter une asymétrie.', 'Confondre hyperhémie de détorsion et orchi-épididymite.', 'Retarder le bloc par l\'imagerie quand la clinique de torsion est évidente.']
  },
  interpretation: {
    texte: 'Le raisonnement repose AVANT TOUT sur la comparaison de la vascularisation intratesticulaire entre les deux côtés.',
    normal: ['Testicules symétriques, échostructure homogène', 'Vascularisation intratesticulaire symétrique en couleur/énergie', 'Profil de basse résistance, IR ~0,5–0,7 des deux côtés', 'Plexus pampiniforme fin, sans reflux au Valsalva'],
    pathologique: ['Flux intratesticulaire ABSENT ou DIMINUÉ d\'un côté = torsion jusqu\'à preuve du contraire', 'Whirlpool sign du cordon = torsion (signe direct)', 'Hypervascularisation diffuse testicule + épididyme = orchi-épididymite', 'Veines pampiniformes > 2–3 mm avec reflux au Valsalva = varicocèle', 'Masse intratesticulaire hypervascularisée = tumeur jusqu\'à preuve du contraire', 'Collection anéchogène péri-testiculaire = hydrocèle'],
    svgPatho: SVG_TESTIS_2,
    capPatho: 'Torsion (flux intratesticulaire absent/diminué, whirlpool du cordon) versus orchi-épididymite (hypervascularisation).'
  },
  valeurs: {
    intro: 'Repères vélocimétriques et morphologiques scrotaux.',
    lignes: [
      { param: 'IR intratesticulaire normal', valeur: '≈ 0,5–0,7', note: 'Profil de basse résistance, symétrique' },
      { param: 'Volume testiculaire adulte', valeur: '≈ 15–25 mL', note: '(L × l × H × 0,52)' },
      { param: 'Veines pampiniformes normales', valeur: '< 2 mm', note: 'Varicocèle si > 2–3 mm' },
      { param: 'Varicocèle (calibre)', valeur: '> 2–3 mm', note: 'Avec reflux au Valsalva/debout' },
      { param: 'Reflux pathologique au Valsalva', valeur: '> 1 s (ou continu)', note: 'Grade selon durée/permanence' },
      { param: 'Torsion (flux)', valeur: 'Absent/diminué vs controlatéral', note: 'Comparatif +++' }
    ]
  },
  pathologies: [
    { nom: 'Torsion du cordon spermatique', physiopath: 'Rotation du cordon → striction veineuse puis artérielle → ischémie testiculaire. URGENCE chirurgicale (fenêtre ~6 h).', bmode: 'Testicule augmenté/hétérogène (tardif), enroulement du cordon, ± hydrocèle réactionnelle', doppler: 'Flux intratesticulaire ABSENT ou DIMINUÉ en comparatif ; abolition/inversion de la diastole ; whirlpool sign du cordon', ddx: 'Orchi-épididymite (hypervascularisation), torsion d\'hydatide, détorsion spontanée (hyperhémie)', pieges: 'Faux flux absent par sous-réglage ; détorsion spontanée trompeuse ; flux des enveloppes conservé', gravite: 'URGENCE — ne pas retarder le bloc si clinique évidente', cat: 'Avis chirurgical urgent ; ne pas perdre de temps en imagerie si tableau franc' },
    { nom: 'Orchi-épididymite', physiopath: 'Infection/inflammation de l\'épididyme et/ou du testicule', bmode: 'Épididyme augmenté, testicule hétérogène, ± hydrocèle/épaississement scrotal', doppler: 'HYPERvascularisation diffuse (couleur + énergie), IR souvent abaissé', ddx: 'Torsion (hypovascularisation), abcès, tumeur', pieges: 'Une orchite sévère avec œdème peut comprimer et abaisser le flux → vérifier la perfusion résiduelle', gravite: 'Risque d\'abcès / nécrose', cat: 'Traitement médical (antibiotiques), contrôle ; drainage si abcès' },
    { nom: 'Varicocèle', physiopath: 'Dilatation variqueuse du plexus pampiniforme (reflux veineux), prédominance gauche', bmode: 'Structures tubulaires serpigineuses para-testiculaires > 2–3 mm', doppler: 'Reflux au Valsalva/en position debout (flux veineux inversé prolongé)', ddx: 'Hydrocèle cloisonnée, kyste du cordon', pieges: 'Examen couché seul → sous-estimation ; varicocèle droite isolée → rechercher une cause rétropéritonéale', gravite: 'Cause d\'infertilité/de gêne', cat: 'Bilan d\'infertilité, avis urologique (embolisation/chirurgie selon retentissement)' },
    { nom: 'Tumeur testiculaire', physiopath: 'Tumeur germinale le plus souvent (sujet jeune)', bmode: 'Masse intratesticulaire (souvent hypoéchogène/hétérogène)', doppler: 'Hypervascularisation anarchique de la masse', ddx: 'Orchite focale, hématome, infarctus', pieges: 'Petites tumeurs peu vascularisées ; ne pas confondre avec un foyer d\'orchite', gravite: 'Néoplasique', cat: 'Marqueurs (AFP, βHCG, LDH), TDM d\'extension, avis urologique (orchidectomie)' },
    { nom: 'Traumatisme / hématome', physiopath: 'Contusion, fracture testiculaire, hématocèle', bmode: 'Hétérogénéité, rupture de l\'albuginée, collection hétérogène avasculaire', doppler: 'Zone avasculaire (hématome/contusion), perfusion à comparer au côté sain', ddx: 'Tumeur, abcès', pieges: 'Une fracture de l\'albuginée impose la chirurgie ; ne pas méconnaître une dévascularisation', gravite: 'Selon rupture albuginée / dévascularisation', cat: 'Avis urologique chirurgical si rupture albuginée' }
  ],
  algorithme: {
    titre: 'Conduite devant un scrotum aigu',
    noeuds: [
      { q: 'Clinique de torsion évidente (douleur brutale, abolition réflexe crémastérien) ?', a: 'Oui → BLOC sans retarder par l\'imagerie' },
      { q: 'Flux intratesticulaire absent/diminué vs côté sain ?', a: 'Torsion → urgence chirurgicale' },
      { q: 'Hypervascularisation diffuse testicule + épididyme ?', a: 'Orchi-épididymite → traitement médical' },
      { q: 'Whirlpool sign du cordon ?', a: 'Signe direct de torsion → bloc' },
      { q: 'Doute / flux symétrique mais douleur ?', a: 'Réévaluer (détorsion, torsion d\'hydatide), contrôle / avis chirurgical' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER SCROTAL

Indication : [douleur / bilan / varicocèle / masse].
Technique : sonde linéaire haute fréquence, B-mode + Doppler couleur, énergie et pulsé, comparatif bilatéral.

Testicules : symétriques, taille normale (D __ mL / G __ mL), échostructure homogène.
Vascularisation intratesticulaire : présente et SYMÉTRIQUE, profil de basse résistance (IR ~0,5–0,7 ddc).
Épididymes : fins, non hypervascularisés.
Plexus pampiniforme : fin (< 2 mm), sans reflux au Valsalva debout.
Pas d'hydrocèle ni de masse.

CONCLUSION : Échographie scrotale normale, vascularisation testiculaire symétrique et conservée.`,
    pathologique: `ÉCHO-DOPPLER SCROTAL

Indication : [scrotum aigu].
Technique : sonde linéaire, B-mode + couleur/énergie/pulsé, comparatif bilatéral.

Testicule [côté] : __ ; flux intratesticulaire ABSENT/DIMINUÉ par rapport au côté controlatéral (perfusion normale et symétrique de l'autre côté).
Cordon : [whirlpool sign présent / __].
Épididyme : __.

CONCLUSION : Aspect évocateur de torsion du testicule [côté] (hypovascularisation comparative ± whirlpool sign).
URGENCE CHIRURGICALE — avis urologique immédiat, ne pas retarder la prise en charge.`
  },
  cas: [
    { titre: 'Douleur brutale chez l\'adolescent', enonce: 'Garçon de 15 ans, douleur scrotale brutale depuis 2 h. Le testicule droit semble peu coloré en couleur.', questions: ['Que faites-vous avant de conclure ?', 'Quel signe direct rechercher ?'], indices: ['Réglages flux lents', 'Cordon'], reponse: 'Optimiser pour les flux lents (PRF/filtre bas, énergie) et comparer au côté sain. Une hypovascularisation comparative confirmée + whirlpool sign du cordon = torsion → bloc urgent. Si clinique franche, ne pas retarder le geste.' },
    { titre: 'Testicule chaud et gros', enonce: 'Homme de 30 ans, douleur progressive, fièvre, épididyme augmenté et très coloré au Doppler.', questions: ['Diagnostic ?', 'Comment l\'opposer à une torsion ?'], reponse: 'Orchi-épididymite : hypervascularisation diffuse (couleur + énergie), à l\'opposé de la torsion (hypovascularisation). Traitement médical.' },
    { titre: 'Bilan d\'infertilité', enonce: 'Veines serpigineuses gauches mesurées à 3,5 mm, augmentant au Valsalva.', questions: ['Diagnostic ?', 'Pourquoi à gauche ?'], reponse: 'Varicocèle gauche (drainage de la veine spermatique gauche dans la veine rénale gauche à angle droit). Confirmer le reflux debout/Valsalva, avis urologique.' },
    { titre: 'Faux diagnostic évité', enonce: 'Vous ne voyez aucun flux intratesticulaire mais la PRF est très haute et le filtre élevé.', questions: ['Quel piège ?'], reponse: 'Sous-réglage : la PRF et le filtre trop hauts effacent le flux lent intratesticulaire et simulent une torsion. Baisser PRF/filtre, passer en énergie, comparer au côté sain.' },
    { titre: 'Douleur résolutive', enonce: 'Douleur intense ayant cédé spontanément ; le testicule est maintenant hypervascularisé.', questions: ['Quelle hypothèse ?'], reponse: 'Détorsion spontanée avec hyperhémie réactionnelle (peut simuler une inflammation). Surveillance/avis chirurgical car récidive possible.' },
    { titre: 'Masse découverte', enonce: 'Nodule intratesticulaire hypoéchogène, hypervascularisé de façon anarchique, chez un homme de 28 ans.', questions: ['Diagnostic à évoquer ?', 'Conduite ?'], reponse: 'Tumeur testiculaire (germinale probable). Marqueurs (AFP, βHCG, LDH), TDM d\'extension, avis urologique (orchidectomie).' },
    { titre: 'Traumatisme', enonce: 'Coup direct, scrotum tuméfié, zone testiculaire hétérogène avasculaire avec rupture de contour.', questions: ['Que craindre ?'], reponse: 'Fracture/rupture de l\'albuginée avec hématome et zone dévascularisée : indication chirurgicale, avis urologique en urgence.' },
    { titre: 'Hydrocèle', enonce: 'Collection anéchogène entourant un testicule normalement vascularisé.', questions: ['Diagnostic ?'], reponse: 'Hydrocèle (épanchement de la vaginale). Vérifier que le testicule sous-jacent est normal et bien vascularisé ; rechercher une cause si réactionnelle.' },
    { titre: 'Enfant prépubère', enonce: 'Garçon de 6 ans, vous percevez un flux intratesticulaire très faible des deux côtés.', questions: ['Piège ?'], reponse: 'La vascularisation est physiologiquement peu abondante avant la puberté : le mode énergie et le comparatif sont essentiels pour ne pas conclure à tort à une torsion.' },
    { titre: 'Torsion d\'hydatide', enonce: 'Adolescent, douleur localisée au pôle supérieur, petit nodule hyperéchogène, testicule bien vascularisé.', questions: ['Diagnostic probable ?'], reponse: 'Torsion d\'appendice testiculaire (hydatide de Morgagni) : douleur localisée, testicule normalement perfusé. Traitement le plus souvent médical, mais la torsion du cordon doit être exclue.' }
  ],
  pieges: [
    'PRF/filtre/gain mal réglés → fausse absence de flux et faux diagnostic de torsion.',
    'Oublier le comparatif bilatéral systématique → impossible d\'interpréter une asymétrie.',
    'Confondre l\'hyperhémie de détorsion spontanée avec une orchi-épididymite.',
    'Examiner la varicocèle uniquement en décubitus (sous-estimation) sans Valsalva ni position debout.',
    'Retarder la chirurgie d\'une torsion évidente par des examens d\'imagerie.',
    'Méconnaître qu\'une orchite sévère œdémateuse peut abaisser le flux (perfusion à vérifier finement).',
    'Prendre un flux conservé des enveloppes (crémastérienne/déférentielle) pour une perfusion testiculaire normale dans une torsion.'
  ],
  flashcards: [
    { q: 'Profil Doppler intratesticulaire normal ?', r: 'Basse résistance, diastole remplie, IR ~0,5–0,7, symétrique.' },
    { q: 'Signe Doppler de torsion ?', r: 'Flux intratesticulaire absent/diminué en comparatif ± whirlpool sign du cordon.' },
    { q: 'Comment distinguer torsion et orchi-épididymite ?', r: 'Torsion = hypovascularisation ; orchi-épididymite = HYPERvascularisation.' },
    { q: 'Critère échographique de varicocèle ?', r: 'Veines pampiniformes > 2–3 mm avec reflux au Valsalva/debout, surtout à gauche.' },
    { q: 'Que faire si la clinique de torsion est évidente ?', r: 'Aller au bloc sans retarder par l\'imagerie (urgence chirurgicale).' },
    { q: 'Réglages clés du scrotum aigu ?', r: 'Flux lents : PRF/filtre bas, mode énergie, gain optimisé, réglages identiques D/G.' }
  ],
  qcm: [
    { q: 'Le signe Doppler central d\'une torsion testiculaire est :', options: ['Une hypervascularisation diffuse', 'Un flux intratesticulaire absent/diminué en comparatif', 'Un IR abaissé', 'Une diastole majorée'], correct: 1, exp: 'La torsion entraîne une ischémie : flux intratesticulaire absent/diminué par rapport au côté sain (± whirlpool sign).' },
    { q: 'Une varicocèle se définit par :', options: ['Une masse hypervascularisée', 'Des veines pampiniformes > 2–3 mm avec reflux au Valsalva', 'Une hydrocèle volumineuse', 'Un épididyme hyperhémié'], correct: 1, exp: 'Varicocèle = dilatation du plexus pampiniforme (> 2–3 mm) avec reflux au Valsalva/debout, surtout à gauche.' },
    { q: 'Devant une absence apparente de flux intratesticulaire, la première action est :', options: ['Conclure à une torsion', 'Optimiser les réglages (PRF/filtre bas, énergie) et comparer', 'Augmenter la PRF', 'Mesurer le volume'], correct: 1, exp: 'Un sous-réglage simule une torsion : il faut optimiser pour les flux lents et comparer au côté sain avant de conclure.' },
    { q: 'Une masse intratesticulaire hypervascularisée chez un homme jeune évoque avant tout :', options: ['Une hydrocèle', 'Une tumeur testiculaire', 'Une varicocèle', 'Un kyste de l\'épididyme'], correct: 1, exp: 'Toute masse intratesticulaire hypervascularisée est une tumeur jusqu\'à preuve du contraire (marqueurs, avis urologique).' }
  ],
  refs: ['DIU Montpellier (Doppler scrotal) ; recommandations SFMV ; EFSUMB guidelines ; consensus sur l\'imagerie du scrotum aigu.']
});

/* ================= CHAPITRE 2 — DOPPLER THYROÏDIEN ================= */

const SVG_THYROID_1 = `<svg viewBox="0 0 460 220" role="img" aria-label="Vascularisation thyroïdienne">
<rect width="460" height="220" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Vascularisation de la thyroïde</text>
<path d="M150,60 C120,80 120,150 150,170 C175,185 195,170 200,130 C205,100 185,70 150,60 Z" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<path d="M310,60 C340,80 340,150 310,170 C285,185 265,170 260,130 C255,100 275,70 310,60 Z" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<rect x="200" y="110" width="60" height="22" fill="#fde2e2" stroke="#dc2626"/>
<text x="208" y="125" font-size="9" fill="#991b1b">isthme</text>
<text x="120" y="200" font-size="10" fill="#991b1b">Lobe droit</text>
<text x="285" y="200" font-size="10" fill="#991b1b">Lobe gauche</text>
<rect x="218" y="135" width="24" height="55" fill="#94a3b8"/>
<text x="220" y="160" font-size="8" fill="#fff">trachée</text>
<path d="M150,55 q5,-25 -5,-40" fill="none" stroke="#dc2626" stroke-width="4"/>
<text x="80" y="20" font-size="9" fill="#991b1b">A. thyroïdienne sup.</text>
<path d="M150,172 q-5,20 -15,30" fill="none" stroke="#b45309" stroke-width="4"/>
<text x="70" y="215" font-size="9" fill="#b45309">A. thyroïdienne inf.</text>
<ellipse cx="60" cy="115" rx="14" ry="22" fill="#dbeafe" stroke="#1d4ed8"/>
<text x="20" y="118" font-size="8" fill="#1d4ed8">carotide</text>
</svg>`;

const SVG_THYROID_2 = `<svg viewBox="0 0 460 180" role="img" aria-label="Thyroid inferno de Basedow">
<rect width="460" height="180" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">« Thyroid inferno » (Basedow) : hypervascularisation diffuse</text>
<path d="M150,50 C115,75 115,150 150,165 C180,178 205,160 210,120 C215,85 190,58 150,50 Z" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
<g stroke="#dc2626" stroke-width="2">
<line x1="135" y1="75" x2="142" y2="82"/><line x1="160" y1="70" x2="168" y2="78"/>
<line x1="180" y1="95" x2="188" y2="103"/><line x1="130" y1="110" x2="138" y2="118"/>
<line x1="155" y1="120" x2="163" y2="128"/><line x1="175" y1="135" x2="183" y2="143"/>
<line x1="145" y1="145" x2="153" y2="153"/><line x1="120" y1="130" x2="128" y2="138"/>
</g>
<g stroke="#2563eb" stroke-width="2">
<line x1="125" y1="90" x2="133" y2="98"/><line x1="168" y1="105" x2="176" y2="113"/>
<line x1="140" y1="60" x2="148" y2="68"/><line x1="190" y1="120" x2="198" y2="128"/>
</g>
<text x="250" y="60" font-size="11" fill="#0b2f63">Vitesses artérielles</text>
<text x="250" y="78" font-size="11" fill="#0b2f63">thyroïdiennes inf.</text>
<text x="250" y="96" font-size="11" fill="#dc2626" font-weight="bold">TRÈS élevées</text>
<text x="250" y="125" font-size="10" fill="#64748b">Hashimoto/De Quervain :</text>
<text x="250" y="142" font-size="10" fill="#64748b">vascularisation variable</text>
<text x="250" y="158" font-size="10" fill="#64748b">/hypovascularisée</text>
</svg>`;

window.VASC.chapters.push({
  id: 'doppler-thyroidien', num: 71, groupe: 'Doppler superficiel & divers', emoji: '🦋',
  titre: 'Doppler thyroïdien',
  sonde: 'Linéaire 7–15 MHz', niveau: 'DIU → expert', duree: '≈75 min',
  resume: 'Exploration de la glande thyroïde et de ses nodules. Le Doppler est un APPOINT : le risque de malignité repose d\'abord sur les critères B-mode (EU-TIRADS). Le Doppler est précieux dans les thyroïdites — notamment le « thyroid inferno » de la maladie de Basedow.',
  tags: 'thyroïde nodule EU-TIRADS Doppler vascularisation Basedow thyroid inferno Hashimoto De Quervain thyroïdienne supérieure inférieure',
  objectifs: [
    'Identifier les artères thyroïdiennes supérieures et inférieures et le profil vasculaire normal.',
    'Décrire la vascularisation d\'un nodule (classification de la vascularisation) en sachant que le Doppler est un APPOINT, non le critère principal.',
    'Situer le Doppler dans la stratification EU-TIRADS du risque de malignité (critères B-mode au premier plan).',
    'Reconnaître le « thyroid inferno » de la maladie de Basedow et les vitesses thyroïdiennes inférieures élevées.',
    'Différencier les profils des thyroïdites (Basedow hypervascularisé vs Hashimoto/De Quervain variable/hypovascularisé).',
    'Rédiger un compte-rendu thyroïdien intégrant EU-TIRADS et l\'appoint Doppler.'
  ],
  anatomie: {
    texte: 'La thyroïde comporte deux lobes réunis par l\'isthme, en avant de la trachée, en dedans des axes carotidiens et jugulaires. Elle est vascularisée par l\'artère thyroïdienne supérieure (1ʳᵉ branche de la carotide externe) au pôle supérieur de chaque lobe, et l\'artère thyroïdienne inférieure (branche du tronc thyro-cervical, issu de la sous-clavière) au pôle inférieur. Une artère thyroïdienne moyenne (ima) inconstante peut exister. Le drainage veineux se fait par les veines thyroïdiennes supérieures, moyennes et inférieures.',
    svg: SVG_THYROID_1,
    caption: 'Schéma : lobes thyroïdiens, isthme, artères thyroïdiennes supérieure (de la carotide externe) et inférieure (du tronc thyro-cervical).',
    vascularisation: 'A. thyroïdienne supérieure (CE) → pôle supérieur. A. thyroïdienne inférieure (tronc thyro-cervical) → pôle inférieur ; ses vitesses sont mesurées dans la maladie de Basedow.',
    rapports: ['Trachée en dedans (cône d\'ombre)', 'Axes carotido-jugulaires en dehors', 'Œsophage en arrière à gauche', 'Nerfs récurrents dans l\'angle trachéo-œsophagien', 'Parathyroïdes en arrière des lobes'],
    variantes: ['Lobe pyramidal (lobe de Lalouette) au-dessus de l\'isthme', 'Artère thyroïdienne moyenne (ima) inconstante', 'Thyroïde plongeante (extension rétrosternale gênant l\'analyse)']
  },
  physiologie: {
    texte: 'La thyroïde normale est modérément vascularisée, avec un flux artériel de basse à moyenne résistance. La vascularisation augmente physiologiquement dans l\'hyperfonctionnement (et de façon majeure dans la maladie de Basedow). Le Doppler ne remplace pas l\'analyse B-mode : pour le risque de malignité d\'un nodule, ce sont les critères morphologiques (EU-TIRADS) qui priment, le Doppler n\'étant qu\'un appoint.',
    profils: [
      { nom: 'Thyroïde normale', desc: 'Vascularisation modérée, flux artériel de basse/moyenne résistance, vitesses thyroïdiennes inférieures normales.' },
      { nom: 'Maladie de Basedow', desc: '« Thyroid inferno » : hypervascularisation diffuse intense (couleur en mosaïque), vitesses systoliques de l\'artère thyroïdienne inférieure TRÈS élevées (souvent > 70 cm/s).' },
      { nom: 'Thyroïdite de Hashimoto', desc: 'Glande hétérogène, hypoéchogène, micronodulaire ; vascularisation variable (parfois augmentée, souvent normale/diminuée à un stade évolué).' },
      { nom: 'Thyroïdite de De Quervain (subaiguë)', desc: 'Plages hypoéchogènes mal limitées et douloureuses ; vascularisation typiquement DIMINUÉE dans les zones atteintes (à l\'opposé du Basedow).' }
    ]
  },
  physique: {
    intro: 'Thyroïde = territoire superficiel : haute fréquence, B-mode au premier plan pour le nodule, Doppler en appoint.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 7–15 MHz pour une analyse fine de l\'échostructure, des micro-calcifications et des contours (déterminants EU-TIRADS).' },
      { titre: 'B-mode prioritaire', desc: 'La stratification du risque de malignité repose sur les critères morphologiques (échogénicité, forme plus haute que large, contours, calcifications) : le Doppler ne doit pas s\'y substituer.' },
      { titre: 'Réglages couleur', desc: 'PRF et filtre bas, gain optimisé pour apprécier la vascularisation diffuse (thyroïdites) et la vascularisation nodulaire (centrale vs périphérique).' },
      { titre: 'Doppler pulsé thyroïdien inférieur', desc: 'Mesure de la vitesse systolique de l\'artère thyroïdienne inférieure : utile pour objectiver l\'hyperthyroïdie de Basedow (vitesses très élevées).' }
    ]
  },
  reglages: {
    intro: 'Réglages thyroïdiens types.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 7–15 MHz', note: 'Haute résolution superficielle' },
      { param: 'Profondeur', valeur: '3–4 cm', note: 'Lobe au ⅔ de l\'écran' },
      { param: 'B-mode', valeur: 'Optimisé (focale, dynamique)', note: 'Critères EU-TIRADS prioritaires' },
      { param: 'PRF couleur', valeur: 'Basse', note: 'Apprécier la vascularisation' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Flux parenchymateux lents' },
      { param: 'Gain couleur', valeur: 'Juste avant le bruit', note: 'Quantifier la vascularisation diffuse/nodulaire' },
      { param: 'Pulsé', valeur: 'A. thyroïdienne inférieure', note: 'Vitesse systolique (Basedow)' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, cou en légère extension (coussin sous les épaules), tête médiane ou légèrement tournée.',
    operateur: 'Assis à la tête ou au côté, avant-bras en appui.',
    ecran: 'Dans l\'axe du regard, lumière tamisée.',
    sonde: 'Linéaire en coupes transverses (balayage isthme et lobes) puis longitudinales ; balayage complet de chaque lobe.',
    ergonomie: 'Pression douce ; demander au patient de ne pas déglutir pendant les mesures.'
  },
  acquisition: {
    etapes: [
      { titre: 'B-mode complet', desc: 'Mesurer les lobes et l\'isthme, apprécier l\'échostructure globale, repérer et caractériser les nodules (taille, échogénicité, forme, contours, calcifications).' },
      { titre: 'Caractérisation EU-TIRADS du nodule', desc: 'Appliquer les critères morphologiques (B-mode) pour classer le risque de malignité — c\'est le critère PRINCIPAL.' },
      { titre: 'Doppler du nodule (appoint)', desc: 'Décrire la vascularisation (absente, périphérique, centrale, mixte) ; n\'est qu\'un complément, pas le critère décisionnel.' },
      { titre: 'Vascularisation diffuse', desc: 'Évaluer la vascularisation globale de la glande (thyroïdites) : hypervascularisation (Basedow) vs diminuée/variable (Hashimoto/De Quervain).' },
      { titre: 'Pulsé thyroïdien inférieur', desc: 'Mesurer la vitesse systolique de l\'artère thyroïdienne inférieure en cas de suspicion d\'hyperthyroïdie.' }
    ],
    reperes: ['Trachée (cône d\'ombre, repère médian)', 'Carotide et jugulaire en dehors', 'Muscles pré-thyroïdiens en avant', 'Pôles supérieur et inférieur des lobes'],
    astuces: ['Toujours classer le nodule en EU-TIRADS sur le B-mode AVANT de regarder le Doppler.', 'Mesurer la vitesse de l\'artère thyroïdienne inférieure pour objectiver un Basedow.', 'Comparer la vascularisation du nodule à celle du parenchyme adjacent.'],
    erreurs: ['Surévaluer le risque de malignité sur la seule vascularisation Doppler.', 'Mesurer un nodule sans appliquer rigoureusement EU-TIRADS.', 'Confondre vascularisation diminuée de De Quervain et nodule froid.', 'PRF/filtre trop hauts effaçant la vascularisation parenchymateuse.']
  },
  interpretation: {
    texte: 'Pour un nodule : le risque repose sur l\'EU-TIRADS (B-mode) ; le Doppler complète. Pour le parenchyme : la vascularisation diffuse oriente les thyroïdites.',
    normal: ['Glande homogène, isoéchogène', 'Vascularisation modérée', 'Vitesses thyroïdiennes inférieures normales', 'Pas de nodule suspect (EU-TIRADS bas)'],
    pathologique: ['Hypervascularisation diffuse intense + vitesses thyroïdiennes inférieures très élevées = Basedow (thyroid inferno)', 'Glande hétérogène hypoéchogène micronodulaire = Hashimoto', 'Plages hypoéchogènes douloureuses peu vascularisées = De Quervain', 'Nodule EU-TIRADS élevé (hypoéchogène, plus haut que large, contours irréguliers, microcalcifications) = suspect', 'Vascularisation nodulaire centrale/anarchique = appoint en faveur d\'un nodule à explorer'],
    svgPatho: SVG_THYROID_2,
    capPatho: 'Thyroid inferno de Basedow (hypervascularisation diffuse, vitesses thyroïdiennes inférieures très élevées) ; thyroïdites de Hashimoto/De Quervain à vascularisation variable/diminuée.'
  },
  valeurs: {
    intro: 'Repères thyroïdiens (rappel EU-TIRADS et vélocimétrie).',
    lignes: [
      { param: 'Volume lobaire normal', valeur: '≈ 7–10 mL/lobe', note: 'Variable selon le sujet' },
      { param: 'Vitesse syst. thyroïdienne inf. normale', valeur: '< 30–40 cm/s', note: 'Repère ; varie selon les appareils' },
      { param: 'Basedow (vitesse syst. thyr. inf.)', valeur: 'souvent > 70 cm/s', note: 'Hypervascularisation (thyroid inferno)' },
      { param: 'EU-TIRADS 2 (bénin)', valeur: 'kyste, spongiforme', note: 'Pas de cytoponction' },
      { param: 'EU-TIRADS 3 (bas risque)', valeur: 'isoéchogène/hyperéchogène ovale', note: 'Cytoponction si ≥ 20 mm' },
      { param: 'EU-TIRADS 4 (intermédiaire)', valeur: 'modérément hypoéchogène', note: 'Cytoponction si ≥ 15 mm' },
      { param: 'EU-TIRADS 5 (haut risque)', valeur: '≥ 1 critère majeur (très hypoéchogène, plus haut que large, contours irréguliers, microcalcifications)', note: 'Cytoponction si ≥ 10 mm' }
    ]
  },
  pathologies: [
    { nom: 'Maladie de Basedow', physiopath: 'Hyperthyroïdie auto-immune (anticorps anti-récepteur de la TSH)', bmode: 'Glande globalement augmentée, hypoéchogène hétérogène', doppler: '« Thyroid inferno » : hypervascularisation diffuse intense ; vitesse systolique de l\'artère thyroïdienne inférieure TRÈS élevée', ddx: 'Thyroïdite du post-partum, hashitoxicose', pieges: 'Confondre avec une thyroïdite (la vélocimétrie thyroïdienne inférieure tranche)', gravite: 'Hyperthyroïdie à traiter', cat: 'Bilan biologique (TSH, T4, anticorps), avis endocrinologique' },
    { nom: 'Thyroïdite de Hashimoto', physiopath: 'Thyroïdite auto-immune (anti-TPO)', bmode: 'Glande hétérogène, hypoéchogène, micronodulaire, septa fibreux', doppler: 'Vascularisation variable (parfois augmentée précocement, diminuée à un stade tardif)', ddx: 'Basedow, lymphome thyroïdien (rare)', pieges: 'Aspect pseudonodulaire ; ne pas multiplier les cytoponctions inutiles', gravite: 'Évolution vers l\'hypothyroïdie', cat: 'Bilan auto-immun, suivi endocrinologique' },
    { nom: 'Thyroïdite subaiguë de De Quervain', physiopath: 'Thyroïdite post-virale, douloureuse', bmode: 'Plages hypoéchogènes mal limitées, douloureuses au passage de la sonde', doppler: 'Vascularisation DIMINUÉE dans les zones atteintes', ddx: 'Carcinome, Hashimoto', pieges: 'Plages hypoéchogènes pouvant simuler un nodule suspect', gravite: 'Souvent spontanément résolutive', cat: 'Traitement anti-inflammatoire, contrôle évolutif' },
    { nom: 'Nodule thyroïdien suspect', physiopath: 'Risque de carcinome (papillaire le plus souvent)', bmode: 'Hypoéchogène, plus haut que large, contours irréguliers, microcalcifications (EU-TIRADS 5)', doppler: 'Vascularisation centrale/anarchique possible (APPOINT, non décisif)', ddx: 'Nodule bénin, adénome', pieges: 'Se fier au Doppler plutôt qu\'à l\'EU-TIRADS B-mode', gravite: 'Selon EU-TIRADS et cytologie', cat: 'Cytoponction selon EU-TIRADS et taille, avis spécialisé' }
  ],
  algorithme: {
    titre: 'Place du Doppler dans l\'exploration thyroïdienne',
    noeuds: [
      { q: 'Nodule ?', a: 'Classer en EU-TIRADS sur le B-mode (critère principal) ; Doppler = appoint' },
      { q: 'Hyperthyroïdie clinique/biologique ?', a: 'Mesurer la vitesse thyroïdienne inférieure : très élevée + hypervascularisation diffuse = Basedow' },
      { q: 'Glande hétérogène hypoéchogène micronodulaire ?', a: 'Hashimoto → bilan auto-immun' },
      { q: 'Zone hypoéchogène douloureuse peu vascularisée ?', a: 'De Quervain → traitement anti-inflammatoire' },
      { q: 'Nodule EU-TIRADS 4–5 au-delà du seuil de taille ?', a: 'Cytoponction + avis spécialisé' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER THYROÏDIEN

Indication : [dépistage / nodule / dysthyroïdie].
Technique : sonde linéaire haute fréquence, B-mode + Doppler couleur et pulsé.

Thyroïde : lobes de taille normale (D __ mL / G __ mL), isthme fin, échostructure homogène et isoéchogène.
Vascularisation : modérée, harmonieuse, sans hypervascularisation diffuse.
Pas de nodule suspect ; aspect EU-TIRADS 1–2.
Aires ganglionnaires cervicales : libres.

CONCLUSION : Thyroïde d'aspect normal, sans nodule suspect ni signe de thyroïdite.`,
    pathologique: `ÉCHO-DOPPLER THYROÏDIEN

Indication : [nodule / hyperthyroïdie].
Technique : sonde linéaire, B-mode + Doppler couleur et pulsé.

Thyroïde : __ (taille, échostructure).
Nodule [lobe] : __ mm, [échogénicité, forme, contours, calcifications] → EU-TIRADS __.
Doppler du nodule (appoint) : vascularisation __ (centrale/périphérique/absente).
Vascularisation diffuse : [hypervascularisation « inferno » / diminuée / __] ; vitesse systolique thyroïdienne inférieure __ cm/s.

CONCLUSION : [Nodule EU-TIRADS __ → cytoponction selon taille] / [Aspect évocateur de maladie de Basedow] / [Thyroïdite __].
[Proposition : bilan biologique, cytoponction et avis spécialisé selon le contexte.]`
  },
  cas: [
    { titre: 'Hyperthyroïdie franche', enonce: 'Femme de 35 ans, palpitations, amaigrissement ; glande hypoéchogène avec couleur en mosaïque sur toute la glande, vitesse thyroïdienne inférieure à 95 cm/s.', questions: ['Diagnostic ?', 'Quel signe ?'], indices: ['Vélocimétrie thyroïdienne inférieure'], reponse: 'Maladie de Basedow : « thyroid inferno » (hypervascularisation diffuse) avec vitesses thyroïdiennes inférieures très élevées. Bilan auto-immun, avis endocrinologique.' },
    { titre: 'Nodule à classer', enonce: 'Nodule de 12 mm hypoéchogène, plus haut que large, contours irréguliers, microcalcifications. Le Doppler montre une vascularisation centrale.', questions: ['Comment classer ?', 'Quel rôle du Doppler ?'], reponse: 'EU-TIRADS 5 sur les critères B-mode → cytoponction (≥ 10 mm). Le Doppler n\'est qu\'un appoint et ne modifie pas le classement principal.' },
    { titre: 'Glande hétérogène', enonce: 'Patiente fatiguée, glande hypoéchogène micronodulaire avec septa, anticorps anti-TPO positifs.', questions: ['Diagnostic ?'], reponse: 'Thyroïdite de Hashimoto. Suivi endocrinologique (évolution vers l\'hypothyroïdie).' },
    { titre: 'Cou douloureux', enonce: 'Douleur cervicale fébrile, plages hypoéchogènes mal limitées et peu vascularisées, douloureuses au passage de la sonde.', questions: ['Diagnostic probable ?'], reponse: 'Thyroïdite subaiguë de De Quervain (post-virale) : zones hypoéchogènes douloureuses et hypovascularisées. Traitement anti-inflammatoire.' },
    { titre: 'Piège vasculaire', enonce: 'On vous présente un nodule isoéchogène, ovale, à vascularisation centrale riche, et on conclut « suspect car très vascularisé ».', questions: ['Êtes-vous d\'accord ?'], reponse: 'Non : la vascularisation n\'est qu\'un appoint. Un nodule isoéchogène ovale est EU-TIRADS 3 (bas risque) même richement vascularisé. C\'est le B-mode qui prime.' },
    { titre: 'Spongiforme', enonce: 'Nodule de 18 mm d\'aspect spongiforme (micro-kystes coalescents).', questions: ['EU-TIRADS ? Conduite ?'], reponse: 'Aspect spongiforme = bénin (EU-TIRADS 2), pas de cytoponction indiquée. Surveillance simple.' },
    { titre: 'Vitesse normale', enonce: 'Hyperthyroïdie biologique mais vascularisation diffuse normale et vitesses thyroïdiennes inférieures normales.', questions: ['Cela exclut-il un Basedow ?'], reponse: 'Cela oriente plutôt vers une thyroïdite (passage thyréotoxique) qu\'un Basedow ; corréler à la biologie (anticorps) et au contexte (douleur, post-partum).' },
    { titre: 'Adénopathie associée', enonce: 'Nodule EU-TIRADS 5 + ganglion cervical arrondi avec microcalcifications.', questions: ['Que suspecter ?'], reponse: 'Carcinome papillaire avec adénopathie suspecte. Cytoponction du nodule ET du ganglion, avis spécialisé.' },
    { titre: 'Nodule chaud', enonce: 'Nodule autonome hyperfonctionnel connu à la scintigraphie, richement vascularisé en périphérie.', questions: ['Le Doppler suffit-il ?'], reponse: 'Non : la richesse vasculaire ne fait pas le diagnostic d\'autonomie. Corréler scintigraphie et biologie ; EU-TIRADS reste l\'outil pour le risque de malignité.' },
    { titre: 'Suivi de thyroïdite', enonce: 'Contrôle d\'une thyroïdite : la vascularisation autrefois augmentée est désormais diminuée, glande atrophique.', questions: ['Interprétation ?'], reponse: 'Évolution attendue d\'une thyroïdite chronique (Hashimoto) vers l\'atrophie/l\'hypothyroïdie ; suivi biologique.' }
  ],
  pieges: [
    'Se fier au Doppler plutôt qu\'aux critères B-mode EU-TIRADS pour le risque de malignité.',
    'Confondre une thyroïdite (passage thyréotoxique) et un Basedow : la vélocimétrie thyroïdienne inférieure aide.',
    'Prendre une plage hypoéchogène de De Quervain pour un nodule suspect.',
    'PRF/filtre trop hauts effaçant la vascularisation parenchymateuse (faux « peu vascularisé »).',
    'Multiplier les cytoponctions sur des pseudonodules de Hashimoto.',
    'Oublier d\'explorer les aires ganglionnaires cervicales devant un nodule suspect.'
  ],
  flashcards: [
    { q: 'Quel est le critère PRINCIPAL du risque de malignité d\'un nodule ?', r: 'Les critères B-mode (EU-TIRADS) ; le Doppler n\'est qu\'un appoint.' },
    { q: 'Qu\'est-ce que le « thyroid inferno » ?', r: 'Hypervascularisation diffuse intense de la maladie de Basedow.' },
    { q: 'Signe vélocimétrique du Basedow ?', r: 'Vitesse systolique de l\'artère thyroïdienne inférieure très élevée (souvent > 70 cm/s).' },
    { q: 'Vascularisation de la thyroïdite de De Quervain ?', r: 'Diminuée dans les zones hypoéchogènes douloureuses.' },
    { q: 'Origine des artères thyroïdiennes sup. et inf. ?', r: 'Supérieure = carotide externe ; inférieure = tronc thyro-cervical (sous-clavière).' }
  ],
  qcm: [
    { q: 'Pour estimer le risque de malignité d\'un nodule thyroïdien, on se fonde d\'abord sur :', options: ['La vascularisation Doppler', 'Les critères B-mode EU-TIRADS', 'La vitesse thyroïdienne inférieure', 'La taille seule'], correct: 1, exp: 'Le risque repose sur l\'EU-TIRADS (B-mode) ; le Doppler n\'est qu\'un appoint.' },
    { q: 'Le « thyroid inferno » correspond à :', options: ['Une thyroïdite de De Quervain', 'La maladie de Basedow', 'Un nodule kystique', 'Un cancer papillaire'], correct: 1, exp: 'Hypervascularisation diffuse intense avec vitesses thyroïdiennes inférieures élevées = Basedow.' },
    { q: 'Une plage hypoéchogène douloureuse et HYPOvascularisée évoque :', options: ['Un Basedow', 'Une thyroïdite de De Quervain', 'Un nodule EU-TIRADS 5', 'Un kyste'], correct: 1, exp: 'De Quervain : zones hypoéchogènes douloureuses peu vascularisées, à l\'opposé du Basedow.' },
    { q: 'L\'artère thyroïdienne supérieure naît de :', options: ['La sous-clavière', 'La carotide externe', 'La carotide interne', 'Le tronc thyro-cervical'], correct: 1, exp: 'Thyroïdienne supérieure = 1ʳᵉ branche de la carotide externe ; l\'inférieure naît du tronc thyro-cervical.' }
  ],
  refs: ['DIU Montpellier (thyroïde) ; EU-TIRADS (Russ et al., 2017) ; recommandations SFMV/SFR ; EFSUMB guidelines.']
});

/* ================= CHAPITRE 3 — DOPPLER TISSUS MOUS & DIVERS ================= */

const SVG_SOFT_1 = `<svg viewBox="0 0 460 200" role="img" aria-label="Hile vasculaire bénin versus suspect">
<rect width="460" height="200" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0f766e">Adénopathie bénigne : hile vasculaire central</text>
<ellipse cx="110" cy="100" rx="70" ry="45" fill="#ccfbf1" stroke="#0d9488" stroke-width="2"/>
<path d="M110,100 l-30,-5 m30,5 l25,-10 m-25,10 l5,28 m-5,-28 l-20,18" stroke="#dc2626" stroke-width="2"/>
<circle cx="110" cy="100" r="6" fill="#fff" stroke="#0d9488"/>
<text x="70" y="160" font-size="9" fill="#0f766e">vaisseaux centripètes (hile)</text>
<text x="252" y="16" font-size="11" font-weight="bold" fill="#991b1b">Suspecte : vascularisation périphérique/anarchique</text>
<ellipse cx="350" cy="100" rx="70" ry="45" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
<path d="M300,80 q8,-8 12,2 m40,-12 q10,-2 8,8 m30,20 q10,4 2,12 m-90,18 q-6,8 4,12" stroke="#dc2626" stroke-width="2" fill="none"/>
<text x="300" y="160" font-size="9" fill="#991b1b">flux périphérique/anarchique</text>
</svg>`;

const SVG_SOFT_2 = `<svg viewBox="0 0 460 200" role="img" aria-label="Faux anévrisme yin-yang et flux to-and-fro">
<rect width="460" height="200" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Faux anévrisme : « yin-yang » + collet to-and-fro</text>
<circle cx="120" cy="110" r="55" fill="#fff" stroke="#0b2f63" stroke-width="2"/>
<path d="M120,55 A55,55 0 0,1 120,165 A27,27 0 0,1 120,110 A27,27 0 0,0 120,55 Z" fill="#dc2626"/>
<path d="M120,55 A55,55 0 0,0 120,165 A27,27 0 0,0 120,110 A27,27 0 0,1 120,55 Z" fill="#2563eb"/>
<text x="92" y="185" font-size="9" fill="#0b2f63">poche (yin-yang)</text>
<rect x="175" y="135" width="80" height="22" fill="#fde2e2" stroke="#dc2626"/>
<text x="180" y="150" font-size="9" fill="#991b1b">artère fémorale</text>
<path d="M175,124 l-20,-10" stroke="#7c3aed" stroke-width="6"/>
<text x="150" y="108" font-size="9" fill="#7c3aed">collet</text>
<text x="270" y="60" font-size="10" fill="#0b2f63">Collet : flux</text>
<text x="270" y="78" font-size="10" fill="#0b2f63">« to-and-fro »</text>
<text x="270" y="100" font-size="9" fill="#64748b">(va-et-vient</text>
<text x="270" y="115" font-size="9" fill="#64748b">systole/diastole)</text>
<text x="270" y="145" font-size="9" fill="#64748b">Ttt : compression /</text>
<text x="270" y="160" font-size="9" fill="#64748b">injection de thrombine</text>
</svg>`;

window.VASC.chapters.push({
  id: 'doppler-tissus-mous', num: 72, groupe: 'Doppler superficiel & divers', emoji: '🧩',
  titre: 'Doppler des tissus mous & divers',
  sonde: 'Linéaire 7–15 MHz', niveau: 'DIU → expert', duree: '≈90 min',
  resume: 'Applications variées du Doppler superficiel : caractérisation des masses et adénopathies (hile bénin vs vascularisation anarchique), complications de ponction artérielle (faux anévrisme « yin-yang », fistule artério-veineuse), collections (hématome/abcès), kyste de Baker et malformations vasculaires (haut vs bas débit).',
  tags: 'tissus mous adénopathie hile faux anévrisme yin-yang to-and-fro thrombine fistule artério-veineuse hématome abcès kyste Baker malformation vasculaire haut débit bas débit',
  objectifs: [
    'Caractériser la vascularisation d\'une masse/adénopathie (hile central bénin vs vascularisation périphérique/anarchique suspecte).',
    'Diagnostiquer un faux anévrisme post-ponction (flux to-and-fro au collet, yin-yang dans la poche) et connaître son traitement (compression/thrombine).',
    'Reconnaître une fistule artério-veineuse post-cathétérisme.',
    'Différencier hématome, collection séreuse et abcès grâce à la vascularisation périphérique.',
    'Identifier un kyste de Baker et orienter une malformation vasculaire (haut débit artérioveineux vs bas débit veineux/lymphatique).',
    'Rédiger un compte-rendu adapté à ces situations diverses.'
  ],
  anatomie: {
    texte: 'Ce chapitre regroupe des structures superficielles variées explorées à la sonde linéaire haute fréquence : ganglions (architecture cortico-hilaire), masses des tissus mous, vaisseaux superficiels (notamment le trépied fémoral, site fréquent de ponction), creux poplité (kyste de Baker) et malformations vasculaires. Le corps thyroïde, bien que de tissu superficiel, est traité dans son chapitre dédié et n\'est pas abordé ici.',
    svg: SVG_SOFT_1,
    caption: 'Schéma : adénopathie bénigne à hile vasculaire central (vaisseaux centripètes) versus aspect suspect à vascularisation périphérique/anarchique.',
    vascularisation: 'Ganglion normal/réactionnel : vascularisation hilaire centrale. Ganglion suspect : vascularisation périphérique/capsulaire ou anarchique. Faux anévrisme : communication artérielle via un collet vers une poche.',
    rapports: ['Trépied fémoral (artère/veine fémorales) — site de ponction et de complications', 'Creux poplité (kyste de Baker entre gastrocnémien médial et semi-membraneux)', 'Aires ganglionnaires (cervicales, axillaires, inguinales)'],
    variantes: ['Ganglions au hile graisseux proéminent (bénins)', 'Malformations vasculaires de présentation très variable', 'Kyste de Baker communiquant ou non avec l\'articulation']
  },
  physiologie: {
    texte: 'Le raisonnement repose sur la cartographie de la vascularisation. Une structure liquidienne pure (kyste, hématome simple, séreux) est avasculaire ; une paroi vascularisée évoque une réaction inflammatoire ou un abcès (vascularisation périphérique). Un faux anévrisme présente un flux pulsatile caractéristique ; une malformation vasculaire est classée selon son débit (haut débit artérioveineux vs bas débit veineux/lymphatique).',
    profils: [
      { nom: 'Ganglion bénin/réactionnel', desc: 'Forme ovale, hile graisseux échogène, vascularisation HILAIRE centrale, rapport L/l élevé.' },
      { nom: 'Ganglion suspect', desc: 'Forme arrondie, perte du hile, vascularisation PÉRIPHÉRIQUE/capsulaire ou anarchique, microcalcifications.' },
      { nom: 'Faux anévrisme', desc: 'Poche avec flux tourbillonnant « yin-yang » (rouge/bleu) ; au collet, flux « to-and-fro » (va-et-vient systolo-diastolique).' },
      { nom: 'Fistule artério-veineuse', desc: 'Flux artériel à BASSE résistance (diastole élevée) en amont, veine « artérialisée » pulsatile, turbulence/aliasing au point de fistule.' },
      { nom: 'Malformation vasculaire', desc: 'Haut débit (artérioveineuse) : signal artériel rapide, vaisseaux nourriciers ; bas débit (veineuse/lymphatique) : flux lent veineux ou absence de flux (lymphatique).' }
    ]
  },
  physique: {
    intro: 'Tissus mous superficiels : haute fréquence, réglages adaptables (flux lents des collections/malformations comme flux rapides des faux anévrismes/FAV).',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 7–15 MHz : résolution fine pour l\'architecture ganglionnaire, les parois de collection et les vaisseaux superficiels.' },
      { titre: 'Énergie pour les flux lents', desc: 'Le mode énergie distingue une paroi vascularisée (abcès/tumeur) d\'une collection avasculaire (hématome simple) et aide pour les malformations à bas débit.' },
      { titre: 'PRF haute pour les flux rapides', desc: 'Faux anévrisme et fistule artério-veineuse génèrent des flux rapides/turbulents : adapter la PRF pour analyser le collet et le point de fistule sans aliasing diffus.' },
      { titre: 'Doppler pulsé du collet', desc: 'Le spectre « to-and-fro » au collet d\'un faux anévrisme est pathognomonique : à rechercher au pulsé.' }
    ]
  },
  reglages: {
    intro: 'Réglages adaptés à la situation (lent vs rapide).',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 7–15 MHz', note: 'Haute résolution superficielle' },
      { param: 'Mode', valeur: 'Couleur + énergie', note: 'Énergie pour paroi/flux lents' },
      { param: 'PRF (collection/masse)', valeur: 'Basse', note: 'Détecter une vascularisation pariétale' },
      { param: 'PRF (faux anévrisme/FAV)', valeur: 'Plus haute', note: 'Flux rapides/turbulents' },
      { param: 'Filtre mural', valeur: 'Bas pour flux lents', note: 'Ne pas effacer la vascularisation' },
      { param: 'Pulsé', valeur: 'Sur le collet / la fistule', note: 'To-and-fro, basse résistance' },
      { param: 'Gain couleur', valeur: 'Juste avant le bruit', note: 'Quantifier la vascularisation' }
    ]
  },
  installation: {
    patient: 'Position selon la cible : décubitus pour le trépied fémoral, décubitus ventral ou genou fléchi pour le creux poplité (kyste de Baker), exposition de l\'aire ganglionnaire concernée.',
    operateur: 'Avant-bras en appui, sonde stable pour l\'analyse spectrale du collet.',
    ecran: 'Dans l\'axe du regard.',
    sonde: 'Linéaire ; balayer la masse/collection dans deux plans, repérer un éventuel collet ou point de fistule.',
    ergonomie: 'Pression douce sur les collections et les masses (un appui efface les flux lents) ; attention sur un faux anévrisme (la compression est un geste thérapeutique encadré).'
  },
  acquisition: {
    etapes: [
      { titre: 'B-mode de la lésion', desc: 'Caractériser : solide vs liquidien, contours, échostructure, paroi, contenu (cloisons, débris).' },
      { titre: 'Cartographie couleur/énergie', desc: 'Localiser la vascularisation : hilaire centrale (bénin) vs périphérique/anarchique (suspect) ; paroi vascularisée (abcès) vs avasculaire (hématome simple).' },
      { titre: 'Recherche d\'un collet', desc: 'Devant une masse pulsatile sur un trajet artériel ponctionné : chercher le collet et le flux to-and-fro, le yin-yang dans la poche (faux anévrisme).' },
      { titre: 'Recherche de fistule', desc: 'Devant un thrill/souffle post-ponction : chercher une artérialisation veineuse et une turbulence au point de fistule (FAV).' },
      { titre: 'Caractériser une malformation', desc: 'Déterminer le débit : haut débit artérioveineux (signal artériel rapide, vaisseaux nourriciers) vs bas débit veineux/lymphatique (flux lent ou absent).' }
    ],
    reperes: ['Hile ganglionnaire (graisseux, central)', 'Trajet artériel fémoral et collet d\'un faux anévrisme', 'Creux poplité (kyste de Baker)', 'Point de fistule (turbulence/aliasing focal)'],
    astuces: ['Le flux to-and-fro au collet signe le faux anévrisme.', 'Le mode énergie tranche entre paroi vascularisée (abcès/tumeur) et collection avasculaire.', 'Une veine pulsatile artérialisée doit faire chercher une FAV en amont.', 'Classer une malformation par son débit oriente la prise en charge.'],
    erreurs: ['Comprimer fortement un faux anévrisme sans précaution (geste à encadrer).', 'Conclure « abcès » sur une collection avasculaire (plutôt hématome/séreux).', 'PRF trop haute effaçant un flux lent de malformation veineuse.', 'Méconnaître un collet de faux anévrisme et conclure à un simple hématome.']
  },
  interpretation: {
    texte: 'Le type de vascularisation (centrale vs périphérique/anarchique, pariétale, pulsatile) oriente le diagnostic.',
    normal: ['Ganglion ovale à hile graisseux et vascularisation hilaire', 'Tissus mous sans collection ni masse anormale', 'Vaisseaux superficiels perméables sans communication anormale'],
    pathologique: ['Adénopathie ronde, hile effacé, vascularisation périphérique/anarchique = suspecte', 'Poche avec yin-yang + collet to-and-fro = faux anévrisme', 'Veine artérialisée pulsatile + turbulence focale = fistule artério-veineuse', 'Collection à paroi vascularisée = abcès ; collection avasculaire = hématome/séreux', 'Collection du creux poplité communiquant = kyste de Baker', 'Malformation : haut débit (artérioveineux) vs bas débit (veineux/lymphatique)'],
    svgPatho: SVG_SOFT_2,
    capPatho: 'Faux anévrisme post-ponction : flux tourbillonnant « yin-yang » dans la poche et flux « to-and-fro » au collet.'
  },
  valeurs: {
    intro: 'Repères de caractérisation (qualitatifs, propres à chaque situation).',
    lignes: [
      { param: 'Ganglion bénin', valeur: 'ovale, L/l > 2, hile présent', note: 'Vascularisation hilaire centrale' },
      { param: 'Ganglion suspect', valeur: 'rond, L/l < 2, hile absent', note: 'Vascularisation périphérique/anarchique' },
      { param: 'Faux anévrisme', valeur: 'yin-yang + to-and-fro au collet', note: 'Ttt : compression écho-guidée / thrombine' },
      { param: 'Fistule artério-veineuse', valeur: 'veine artérialisée, basse résistance', note: 'Turbulence au point de fistule' },
      { param: 'Abcès', valeur: 'collection à paroi vascularisée', note: 'Contenu hétérogène ± gaz' },
      { param: 'Hématome / séreux', valeur: 'collection AVASCULAIRE', note: 'Évolution dans le temps' },
      { param: 'Malformation', valeur: 'haut débit (AV) vs bas débit (V/lymph.)', note: 'Détermine la prise en charge' }
    ]
  },
  pathologies: [
    { nom: 'Faux anévrisme (pseudo-anévrisme) post-ponction', physiopath: 'Brèche de la paroi artérielle (souvent fémorale post-cathétérisme) → poche extra-vasculaire communiquant par un collet', bmode: 'Masse pulsatile para-artérielle, poche ± thrombus pariétal', doppler: 'Flux tourbillonnant « yin-yang » dans la poche ; flux « to-and-fro » (va-et-vient) au collet', ddx: 'Hématome (avasculaire), abcès, fistule artério-veineuse', pieges: 'Confondre avec un simple hématome si le collet n\'est pas recherché', gravite: 'Risque de rupture/expansion', cat: 'Compression écho-guidée ou injection de thrombine écho-guidée ; chirurgie si échec/gros collet' },
    { nom: 'Fistule artério-veineuse post-cathétérisme', physiopath: 'Communication directe artère-veine après ponction', bmode: 'Parfois discret ; veine dilatée', doppler: 'Veine « artérialisée » pulsatile, flux artériel à basse résistance en amont, turbulence/aliasing focal au point de fistule', ddx: 'Faux anévrisme, varice', pieges: 'FAV de petit débit passant inaperçue', gravite: 'Selon le débit (retentissement possible)', cat: 'Surveillance si petite ; geste (compression, embolisation, chirurgie) selon retentissement' },
    { nom: 'Adénopathie suspecte', physiopath: 'Envahissement métastatique ou lymphomateux', bmode: 'Ganglion rond, hile effacé, hypoéchogène, ± microcalcifications', doppler: 'Vascularisation périphérique/capsulaire ou anarchique (perte du hile vasculaire)', ddx: 'Adénopathie réactionnelle (hile conservé)', pieges: 'Un ganglion inflammatoire peut être hypervascularisé mais garde un hile central', gravite: 'Selon étiologie', cat: 'Cytoponction/biopsie selon contexte, bilan étiologique' },
    { nom: 'Collection : hématome / abcès', physiopath: 'Hématome (avasculaire) vs abcès (paroi vascularisée, contenu infecté)', bmode: 'Collection à contenu hétérogène ± cloisons ± gaz', doppler: 'Hématome = avasculaire ; abcès = paroi/périphérie vascularisée', ddx: 'Sérome, tumeur nécrosée', pieges: 'Une collection avasculaire n\'exclut pas totalement l\'infection débutante', gravite: 'Selon le contexte (sepsis)', cat: 'Drainage si abcès ; surveillance/évacuation selon l\'hématome' },
    { nom: 'Kyste de Baker', physiopath: 'Distension de la bourse gastrocnémio-semi-membraneuse (souvent secondaire à une pathologie articulaire)', bmode: 'Collection anéchogène du creux poplité avec col entre gastrocnémien médial et semi-membraneux', doppler: 'Avasculaire ; rechercher un kyste rompu (fusée liquidienne dans le mollet)', ddx: 'TVP poplitée (DIAGNOSTIC À EXCLURE), anévrisme poplité', pieges: 'Un kyste rompu simule une TVP cliniquement → toujours explorer les veines', gravite: 'Bénin, mais rupture symptomatique', cat: 'Traiter la cause articulaire ; exclure une TVP associée' },
    { nom: 'Malformation vasculaire', physiopath: 'Malformation à haut débit (artérioveineuse) ou bas débit (veineuse/lymphatique)', bmode: 'Lacis vasculaire, structures kystiques (lymphatique), phlébolithes (veineuse)', doppler: 'Haut débit : signal artériel rapide, vaisseaux nourriciers ; bas débit : flux veineux lent ou absence de flux (lymphatique)', ddx: 'Hémangiome, tumeur des tissus mous', pieges: 'Classer à tort selon l\'aspect B-mode seul ; le débit Doppler oriente la prise en charge', gravite: 'Variable', cat: 'IRM, avis spécialisé (radiologie interventionnelle/chirurgie)' }
  ],
  algorithme: {
    titre: 'Orientation devant une lésion des tissus mous',
    noeuds: [
      { q: 'Masse pulsatile sur un site de ponction artérielle ?', a: 'Chercher collet to-and-fro + yin-yang → faux anévrisme (compression/thrombine)' },
      { q: 'Veine artérialisée pulsatile + turbulence focale ?', a: 'Fistule artério-veineuse' },
      { q: 'Adénopathie : hile central conservé ?', a: 'Oui → bénin/réactionnel ; Non (périph./anarchique) → suspect, biopsie' },
      { q: 'Collection : paroi vascularisée ?', a: 'Oui → abcès (drainage) ; Non → hématome/séreux' },
      { q: 'Collection du creux poplité ?', a: 'Kyste de Baker → EXCLURE une TVP associée' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DES TISSUS MOUS

Indication : [masse / adénopathie / contrôle post-ponction].
Technique : sonde linéaire haute fréquence, B-mode + Doppler couleur, énergie et pulsé.

Aire explorée : __.
Ganglions : d'allure réactionnelle (ovales, hile graisseux et vascularisation hilaire conservés).
Tissus mous : pas de collection ni de masse anormale.
Vaisseaux superficiels : perméables, sans faux anévrisme ni fistule artério-veineuse.

CONCLUSION : Pas de lésion suspecte ni de complication vasculaire des tissus mous explorés.`,
    pathologique: `ÉCHO-DOPPLER DES TISSUS MOUS

Indication : [masse pulsatile post-cathétérisme / adénopathie / collection].
Technique : sonde linéaire, B-mode + couleur/énergie/pulsé.

Description : __ (siège, taille, contenu).
Doppler : [flux yin-yang dans une poche + to-and-fro au collet → faux anévrisme] / [veine artérialisée → fistule artério-veineuse] / [paroi vascularisée → abcès] / [vascularisation périphérique/anarchique → adénopathie suspecte].

CONCLUSION : __.
[Proposition : compression/thrombine écho-guidée (faux anévrisme) / drainage (abcès) / biopsie (adénopathie suspecte) / IRM et avis spécialisé (malformation), selon le cas.]`
  },
  cas: [
    { titre: 'Masse pulsatile à l\'aine', enonce: 'Patient pulsatile au pli inguinal au décours d\'un cathétérisme fémoral ; poche avec flux rouge/bleu tourbillonnant.', questions: ['Diagnostic ?', 'Quel signe au collet ?'], indices: ['Spectre du collet'], reponse: 'Faux anévrisme : yin-yang dans la poche, flux « to-and-fro » au collet. Traitement par compression écho-guidée ou injection de thrombine.' },
    { titre: 'Thrill post-ponction', enonce: 'Souffle continu au pli inguinal ; la veine fémorale est pulsatile et « artérialisée », turbulence focale.', questions: ['Diagnostic ?'], reponse: 'Fistule artério-veineuse post-cathétérisme : veine artérialisée, flux artériel de basse résistance en amont, turbulence au point de fistule.' },
    { titre: 'Ganglion cervical', enonce: 'Ganglion arrondi, hile effacé, vascularisation périphérique anarchique.', questions: ['Bénin ou suspect ?', 'Pourquoi ?'], reponse: 'Suspect : la perte du hile et la vascularisation périphérique/anarchique sont des signes de malignité. Cytoponction/biopsie et bilan.' },
    { titre: 'Collection du mollet', enonce: 'Mollet douloureux, gonflé ; collection anéchogène du creux poplité avec col typique, et fusée liquidienne descendant dans le mollet.', questions: ['Diagnostic ?', 'Que ne pas oublier ?'], reponse: 'Kyste de Baker (rompu). NE PAS oublier d\'explorer les veines : un Baker rompu simule cliniquement une TVP, qu\'il faut exclure.' },
    { titre: 'Collection avasculaire', enonce: 'Collection post-opératoire à contenu hétérogène, sans vascularisation pariétale en énergie.', questions: ['Plutôt abcès ou hématome ?'], reponse: 'Plutôt hématome/sérome (avasculaire). Un abcès présente une paroi/périphérie vascularisée ; corréler à la clinique (fièvre) car une infection débutante reste possible.' },
    { titre: 'Lacis sous-cutané', enonce: 'Masse sous-cutanée molle avec lacis vasculaire et signal artériel rapide, vaisseaux nourriciers.', questions: ['Type de malformation ?'], reponse: 'Malformation à haut débit (artérioveineuse). IRM et avis spécialisé (radiologie interventionnelle).' },
    { titre: 'Masse molle compressible', enonce: 'Masse compressible avec phlébolithes et flux veineux lent, sans signal artériel rapide.', questions: ['Type de malformation ?'], reponse: 'Malformation à bas débit (veineuse). Confirmer par IRM ; prise en charge spécialisée (sclérothérapie possible).' },
    { titre: 'Adénopathie réactionnelle', enonce: 'Ganglion ovale, hile graisseux conservé, vascularisation hilaire centrale, dans un contexte infectieux.', questions: ['Interprétation ?'], reponse: 'Adénopathie réactionnelle bénigne (hile et vascularisation hilaire conservés). Surveillance ; pas de biopsie d\'emblée.' },
    { titre: 'Faux anévrisme thrombosé', enonce: 'Ancienne masse pulsatile désormais sans flux interne en couleur/énergie.', questions: ['Que s\'est-il passé ?'], reponse: 'Thrombose du faux anévrisme (spontanée ou après traitement) : absence de flux dans la poche. Contrôler l\'absence de collet perméable résiduel.' },
    { titre: 'Confusion à éviter', enonce: 'On vous adresse une « masse thyroïdienne » mais la lésion est en réalité dans le creux poplité.', questions: ['Le corps thyroïde est-il traité ici ?'], reponse: 'Non : la thyroïde a son chapitre dédié. Ici, une collection poplitée évoque un kyste de Baker — explorer en conséquence et exclure une TVP.' }
  ],
  pieges: [
    'Méconnaître le collet d\'un faux anévrisme et conclure à un simple hématome.',
    'Comprimer un faux anévrisme sans précaution (la compression est un geste thérapeutique encadré).',
    'Conclure « abcès » sur une collection avasculaire (plutôt hématome/séreux) — corréler à la clinique.',
    'Oublier d\'exclure une TVP devant un kyste de Baker (rupture simulant une phlébite).',
    'Prendre un ganglion réactionnel hypervascularisé à hile conservé pour une adénopathie maligne.',
    'PRF trop haute effaçant le flux lent d\'une malformation veineuse (faux « avasculaire »).'
  ],
  flashcards: [
    { q: 'Signe Doppler du faux anévrisme ?', r: 'Yin-yang dans la poche + flux to-and-fro au collet.' },
    { q: 'Traitement d\'un faux anévrisme ?', r: 'Compression écho-guidée ou injection de thrombine ; chirurgie si échec.' },
    { q: 'Vascularisation d\'un ganglion bénin vs suspect ?', r: 'Bénin = hilaire centrale ; suspect = périphérique/anarchique (hile effacé).' },
    { q: 'Comment distinguer abcès et hématome au Doppler ?', r: 'Abcès = paroi vascularisée ; hématome/séreux = avasculaire.' },
    { q: 'Que ne pas oublier devant un kyste de Baker ?', r: 'Exclure une TVP (rupture simulant une phlébite).' },
    { q: 'Classement Doppler d\'une malformation vasculaire ?', r: 'Haut débit (artérioveineuse) vs bas débit (veineuse/lymphatique).' }
  ],
  qcm: [
    { q: 'Le flux « to-and-fro » au collet caractérise :', options: ['Une fistule artério-veineuse', 'Un faux anévrisme', 'Un abcès', 'Un kyste de Baker'], correct: 1, exp: 'To-and-fro au collet + yin-yang dans la poche = faux anévrisme (pseudo-anévrisme).' },
    { q: 'Une adénopathie suspecte présente typiquement :', options: ['Un hile vasculaire central', 'Une vascularisation périphérique/anarchique', 'Une absence totale de vascularisation', 'Un flux to-and-fro'], correct: 1, exp: 'La perte du hile et la vascularisation périphérique/anarchique orientent vers la malignité.' },
    { q: 'Devant un kyste de Baker, il faut systématiquement :', options: ['Le drainer', 'Exclure une TVP', 'Injecter de la thrombine', 'Faire une biopsie'], correct: 1, exp: 'Un kyste de Baker rompu simule une TVP : il faut explorer les veines pour l\'exclure.' },
    { q: 'Une collection à paroi vascularisée en énergie évoque plutôt :', options: ['Un hématome', 'Un sérome', 'Un abcès', 'Un faux anévrisme'], correct: 2, exp: 'Une paroi/périphérie vascularisée oriente vers un abcès ; un hématome/séreux est avasculaire.' }
  ],
  refs: ['DIU Montpellier (Doppler des tissus mous) ; recommandations SFMV ; EFSUMB guidelines ; littérature sur les complications de ponction (faux anévrisme, FAV).']
});

})();
