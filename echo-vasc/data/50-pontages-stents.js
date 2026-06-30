/* ÉCHO-VASC DIU — Surveillance des pontages, stents & endoprothèses (EVAR) */
window.VASC = window.VASC || { chapters: [] };

(function () {

const SVG_PONT_1 = `<svg viewBox="0 0 460 230" role="img" aria-label="Anatomie d'un pontage">
<rect width="460" height="230" fill="#fff"/>
<text x="8" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Anatomie d'un pontage fémoro-poplité</text>
<path d="M40,55 L150,55" fill="none" stroke="#dc2626" stroke-width="12"/>
<text x="50" y="46" font-size="10" fill="#991b1b">Artère donneuse (fémorale)</text>
<circle cx="150" cy="55" r="7" fill="none" stroke="#7c3aed" stroke-width="3"/>
<text x="155" y="44" font-size="10" fill="#7c3aed">Anastomose proximale</text>
<path d="M150,55 C230,80 230,140 200,175" fill="none" stroke="#0d9488" stroke-width="11"/>
<text x="245" y="125" font-size="10" fill="#0f766e">Corps du greffon</text>
<circle cx="200" cy="175" r="7" fill="none" stroke="#7c3aed" stroke-width="3"/>
<text x="210" y="172" font-size="10" fill="#7c3aed">Anastomose distale</text>
<path d="M200,175 L80,205" fill="none" stroke="#dc2626" stroke-width="10"/>
<text x="80" y="225" font-size="10" fill="#991b1b">Artère receveuse (poplitée)</text>
<text x="300" y="60" font-size="10" fill="#0b2f63">Sites de mesure VPS :</text>
<text x="300" y="78" font-size="10" fill="#0b2f63">anastomose prox.,</text>
<text x="300" y="94" font-size="10" fill="#0b2f63">tout le corps,</text>
<text x="300" y="110" font-size="10" fill="#0b2f63">anastomose dist.,</text>
<text x="300" y="126" font-size="10" fill="#0b2f63">artère receveuse.</text>
</svg>`;

const SVG_PONT_2 = `<svg viewBox="0 0 460 210" role="img" aria-label="Sténose de pontage">
<rect width="460" height="210" fill="#fff"/>
<text x="8" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Sténose myo-intimale d'un pontage veineux</text>
<path d="M30,90 L160,90 L185,108 L210,72 L235,108 L260,90 L430,90" fill="none" stroke="#0d9488" stroke-width="3"/>
<path d="M30,130 L160,130 L185,112 L210,148 L235,112 L260,130 L430,130" fill="none" stroke="#0d9488" stroke-width="3"/>
<rect x="185" y="95" width="50" height="30" fill="#fde2e2"/>
<text x="180" y="170" font-size="10" fill="#991b1b">Rétrécissement focal → accélération (VPS &gt; 300 cm/s, Vr &gt; 3,5)</text>
<text x="40" y="84" font-size="10" fill="#0f766e">Amont : VPS normale</text>
<text x="320" y="84" font-size="10" fill="#0f766e">Aval : amorti</text>
<line x1="200" y1="40" x2="210" y2="70" stroke="#dc2626" stroke-width="1.5"/>
<text x="160" y="38" font-size="10" fill="#dc2626">Jet sténotique</text>
</svg>`;

const SVG_EVAR = `<svg viewBox="0 0 460 250" role="img" aria-label="Endofuites EVAR">
<rect width="460" height="250" fill="#fff"/>
<text x="8" y="16" font-size="12" font-weight="bold" fill="#0b2f63">Endoprothèse aortique (EVAR) & endofuites</text>
<path d="M150,30 L150,120 L120,200 M150,120 L185,200" fill="none" stroke="#64748b" stroke-width="3"/>
<ellipse cx="155" cy="120" rx="70" ry="55" fill="#fef3c7" stroke="#d97706" stroke-dasharray="4 3"/>
<text x="120" y="125" font-size="10" fill="#b45309">Sac anévrismal</text>
<rect x="135" y="28" width="30" height="14" fill="#fecaca" stroke="#dc2626"/>
<text x="170" y="40" font-size="10" fill="#991b1b">Type I (collet prox.)</text>
<path d="M225,140 q20,-10 35,5" fill="none" stroke="#2563eb" stroke-width="3"/>
<text x="265" y="140" font-size="10" fill="#1d4ed8">Type II (AMI/lombaire,</text>
<text x="265" y="154" font-size="10" fill="#1d4ed8">va-et-vient — fréquent)</text>
<circle cx="150" cy="120" r="5" fill="#dc2626"/>
<text x="160" y="100" font-size="10" fill="#991b1b">Type III (jonction modules)</text>
<rect x="110" y="195" width="20" height="12" fill="#fecaca" stroke="#dc2626"/>
<text x="40" y="225" font-size="10" fill="#991b1b">Surveiller le sac : croissance = endofuite active / endotension</text>
</svg>`;

window.VASC.chapters.push({
  id: 'pontages-stents', num: 50, groupe: 'Surveillance & dispositifs', emoji: '🔧',
  titre: 'Surveillance pontages, stents & endoprothèses',
  sonde: 'Linéaire + convexe selon site', niveau: 'DIU → expert', duree: '≈2 h 30',
  resume: 'Surveillance échographique des revascularisations : pontages veineux et prothétiques (recherche de sténose myo-intimale et anastomotique), stents artériels (resténose intra-stent) et endoprothèses aortiques (EVAR) avec détection et typage des endofuites. Le suivi protocolisé conditionne la perméabilité à long terme.',
  tags: 'pontage greffon veineux saphène PTFE Dacron anastomose sténose myo-intimale stent resténose intra-stent EVAR endoprothèse endofuite endoleak sac faux anévrisme CEUS surveillance VPS rapport de vitesses',
  objectifs: [
    'Identifier les types de pontages (veineux vs prothétique) et les montages anatomiques courants.',
    'Décrire l\'anatomie d\'un pontage (anastomose proximale, corps, anastomose distale, artère receveuse) et le protocole de surveillance VPS le long du greffon.',
    'Appliquer les critères vélocimétriques de sténose de pontage (VPS focale, rapport de vitesses Vr, VPS basse de corps annonçant le bas débit).',
    'Reconnaître une resténose intra-stent et savoir que les seuils de vitesse diffèrent de l\'artère native.',
    'Détecter et typer une endofuite EVAR (types I à V) et surveiller l\'évolution du sac anévrismal.',
    'Diagnostiquer les complications : thrombose, sténose/faux anévrisme anastomotique, infection de prothèse.',
    'Rédiger un compte-rendu de surveillance de pontage et d\'EVAR.'
  ],
  anatomie: {
    texte: 'Un pontage relie une artère donneuse (proximale) à une artère receveuse (distale) en court-circuitant une lésion. On distingue : l\'anastomose proximale, le corps (conduit), l\'anastomose distale et l\'artère receveuse d\'aval. Le matériel est soit veineux (veine saphène : inversée, ou in situ avec valvulotomie), soit prothétique (PTFE/Dacron). Montages classiques : aorto-bifémoral, fémoro-poplité (sus ou sous-articulaire), fémoro-jambier (tibial/pédieux), axillo-fémoral et fémoro-fémoral croisé (extra-anatomiques), carotido-sous-clavier (TSA). Une endoprothèse aortique (EVAR) est un tube prothétique armé déployé dans l\'anévrisme, exclu de la circulation : le sac résiduel ne doit plus être perfusé.',
    svg: SVG_PONT_1,
    caption: 'Schéma : pontage = anastomose proximale + corps + anastomose distale + artère receveuse. La surveillance VPS se fait en chaque segment, des deux anastomoses (sites préférentiels de sténose) jusqu\'à l\'aval.',
    vascularisation: 'Le pontage prend en charge tout le débit du territoire d\'aval ; l\'artère native pontée est souvent occluse ou très sténosée. Les pontages veineux in situ peuvent garder des collatérales (branches veineuses) à l\'origine de fistules artério-veineuses résiduelles.',
    rapports: ['Pontage fémoro-poplité : suit le canal de Hunter, sous le sartorius (sous-fascial) ou sous-cutané', 'Pontage axillo-fémoral : tunnellisé en sous-cutané latéro-thoracique puis abdominal', 'EVAR : sac anévrismal aortique sous-rénal, modules iliaques aux jambages'],
    variantes: ['Pontage veineux inversé (sens de la veine retourné, valvules sans effet) vs in situ (valvulotomie, branches à lier)', 'Trajets sous-cutanés (faciles à suivre) vs profonds (jambiers, plus difficiles)', 'Prothèses bifurquées vs tubulaires']
  },
  physiologie: {
    texte: 'Un pontage perméable normal présente un flux antérograde régulier dans tout son corps, avec une VPS homogène de segment en segment. Le pontage veineux se surveille +++ : il développe au fil du temps des sténoses myo-intimales (hyperplasie intimale), surtout aux anastomoses et aux sites de valvulotomie/clips, qui peuvent menacer la perméabilité avant tout symptôme. Une chute de la VPS dans le corps du greffon (bas débit) annonce une thrombose imminente. Les prothèses (PTFE/Dacron) se sténosent surtout aux anastomoses (hyperplasie) et peuvent dégénérer en faux anévrisme anastomotique. Un EVAR réussi exclut le sac : absence de flux dans le sac et stabilité/régression de son diamètre.',
    profils: [
      { nom: 'Pontage perméable normal', desc: 'Flux antérograde, VPS homogène le long du corps (typiquement 45–180 cm/s), pas d\'accélération focale, anastomoses sans jet.' },
      { nom: 'Sténose de pontage (myo-intimale/anastomotique)', desc: 'Accélération focale (VPS↑, rapport de vitesses↑) avec turbulence post-sténotique ; siège préférentiel : anastomoses et valvulotomies.' },
      { nom: 'Bas débit de greffon', desc: 'VPS de corps basse (< 45 cm/s) : pontage menacé de thrombose (sténose serrée d\'amont/aval, mauvais run-off).' },
      { nom: 'Endofuite EVAR', desc: 'Persistance d\'un flux dans le sac autour de la prothèse ; flux « va-et-vient » (to-and-fro) typique d\'une endofuite de type II (réalimentation par collatérale).' }
    ]
  },
  physique: {
    intro: 'La surveillance de matériel impose des règles spécifiques : seuils de vitesse différents du vaisseau natif et gestion des artefacts du matériel.',
    points: [
      { titre: 'Sonde selon le site', desc: 'Linéaire 5–9 MHz pour les pontages des membres (sous-cutanés, jambiers) et les stents périphériques/carotidiens ; convexe 2–5 MHz pour les pontages aorto-fémoraux profonds et la surveillance d\'EVAR (sac, jambages).' },
      { titre: 'Seuils de vitesse adaptés au matériel', desc: 'Un stent rigidifie la paroi et modifie la compliance : pour un même % de sténose, la VPS est plus élevée que dans l\'artère native. Les seuils de resténose intra-stent (carotide, fémorale) sont donc relevés : ne pas appliquer les seuils du natif.' },
      { titre: 'Rapport de vitesses (Vr)', desc: 'Vr = VPS au point sténosant / VPS dans un segment sain immédiatement en amont. Indépendant de l\'angle moyen et plus robuste que la VPS absolue pour le pontage : Vr > 2 = sténose modérée, Vr > 3,5 = sténose serrée.', svg: SVG_PONT_2 },
      { titre: 'Artefacts du matériel', desc: 'Le stent et le Dacron tressé génèrent réverbérations et renforcements ; les armatures métalliques d\'EVAR créent des échos linéaires. Multiplier les incidences ; en couleur, attention au « blooming » qui surcomble la lumière.' },
      { titre: 'Mesure du sac (EVAR)', desc: 'Le diamètre maximal du sac (axe antéro-postérieur, perpendiculaire à l\'axe) est LE critère pronostique : croissance ≥ 5 mm = endofuite active jusqu\'à preuve du contraire. Mesurer toujours au même niveau, comparer aux examens antérieurs.' },
      { titre: 'Doppler énergie / CEUS', desc: 'Le mode énergie (PRF et filtre bas) cherche les flux lents dans le sac. L\'écho de contraste (CEUS) est plus sensible que le Doppler couleur pour détecter une endofuite et préciser le sens du flux, utile quand le sac grossit sans fuite couleur évidente.' }
    ]
  },
  reglages: {
    intro: 'Réglages de surveillance pontage / stent / EVAR.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 5–9 MHz (MI) / convexe 2–5 MHz (aorto-fém., EVAR)', note: 'Selon profondeur du segment' },
      { param: 'Profondeur', valeur: 'Segment au ⅔ de l\'écran', note: 'Pontages sous-cutanés superficiels' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi du greffon', note: 'Indispensable pour VPS/Vr fiables' },
      { param: 'Porte', valeur: '⅓ lumière, au point d\'accélération max', note: 'Mesure VPS sténose' },
      { param: 'PRF couleur', valeur: 'Adaptée, ↑ sur l\'aliasing focal', note: 'Repérer la sténose' },
      { param: 'Doppler énergie', valeur: 'PRF/filtre bas pour le sac EVAR', note: 'Flux lents / quasi-occlusion' },
      { param: 'Gain couleur', valeur: 'Juste avant débordement', note: 'Éviter le blooming sur stent' },
      { param: 'CEUS', valeur: 'Si sac croissant sans fuite couleur', note: 'Plus sensible que le Doppler' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal ; pour les pontages des MI, légère rotation externe et flexion du genou pour le segment poplité/jambier. Pour l\'EVAR, patient à jeun (réduction des gaz) et apnée pour le sac.',
    operateur: 'Assis du côté exploré, avant-bras en appui ; suivre le greffon sur tout son trajet sans saut de segment.',
    ecran: 'Dans l\'axe du regard, comparaison aux clichés antérieurs (suivi).',
    sonde: 'Suivre le pontage en coupe transverse pour le repérer, puis longitudinale pour les VPS ; repérer d\'abord les cicatrices/anastomoses.',
    ergonomie: 'Cartographier le trajet (sous-cutané vs profond) avant les mesures pour ne manquer aucun segment.'
  },
  acquisition: {
    etapes: [
      { titre: 'Repérage du montage', desc: 'Identifier le type (veineux/prothétique), le trajet, les deux anastomoses (souvent au niveau des cicatrices). Localiser artère donneuse et receveuse.' },
      { titre: 'Balayage couleur du greffon', desc: 'Suivre tout le corps en couleur à la recherche d\'accélération focale/aliasing (sténose myo-intimale), surtout aux anastomoses et valvulotomies.' },
      { titre: 'VPS systématiques étagées', desc: 'Mesurer la VPS en : artère donneuse, anastomose proximale, corps proximal/moyen/distal, anastomose distale, artère receveuse. Calculer le rapport de vitesses à chaque accélération.' },
      { titre: 'Recherche de fistule AV résiduelle (in situ)', desc: 'Repérer un flux à composante diastolique élevée / une branche perforante avec flux artérialisé (fistule résiduelle d\'un pontage veineux in situ).' },
      { titre: 'Anastomoses & faux anévrisme', desc: 'Inspecter chaque anastomose en B-mode et couleur : collection pulsatile (faux anévrisme), flux to-and-fro dans le collet.' },
      { titre: 'EVAR : sac + endofuite', desc: 'Mesurer le diamètre du sac (comparer aux antérieurs), chercher un flux dans le sac (couleur + énergie ± CEUS), localiser l\'origine (collet, jambages, AMI/lombaires, jonctions de modules).' }
    ],
    reperes: ['Anastomoses = sites préférentiels de sténose et de faux anévrisme', 'Valvulotomies/clips (greffon in situ) = sites d\'hyperplasie', 'Sac EVAR mesuré toujours au même niveau (AP max)'],
    astuces: ['Toujours calculer le rapport de vitesses (Vr) en plus de la VPS absolue.', 'Comparer la VPS de corps d\'un examen à l\'autre : une chute = greffon menacé.', 'Pour le sac EVAR, énergie à PRF basse puis CEUS si doute.'],
    erreurs: ['Appliquer au stent les seuils de vitesse du vaisseau natif (faux % de resténose).', 'Manquer un segment de pontage (sténose non vue).', 'Confondre un faux anévrisme anastomotique avec un hématome (le flux to-and-fro tranche).', 'Banaliser une endofuite II alors que le sac grossit.']
  },
  interpretation: {
    normal: ['Pontage perméable : flux antérograde, VPS de corps homogène (≈ 45–180 cm/s)', 'Anastomoses sans accélération focale (Vr < 2)', 'Stent : lumière libre, VPS dans les seuils relevés du matériel', 'EVAR : pas de flux dans le sac, diamètre stable ou en régression'],
    pathologique: ['Sténose de pontage : VPS focale > 300 cm/s et/ou Vr > 3,5 (serrée) ; Vr > 2 (modérée)', 'Bas débit : VPS de corps < 45 cm/s = greffon menacé de thrombose', 'Thrombose : absence de flux couleur + énergie dans le greffon', 'Faux anévrisme anastomotique : collection pulsatile, flux to-and-fro dans le collet', 'Endofuite EVAR : flux persistant dans le sac (± va-et-vient type II), sac qui grossit'],
    svgPatho: SVG_EVAR,
    capPatho: 'Endofuites EVAR : type I (collet, grave), type II (collatérale AMI/lombaire, va-et-vient, fréquent), type III (jonction de modules). Le diamètre du sac est le critère pronostique majeur.'
  },
  valeurs: {
    intro: 'Critères vélocimétriques de surveillance de pontage et typage des endofuites EVAR. Seuils à adapter au laboratoire et au type de matériel.',
    lignes: [
      { param: 'VPS de corps normale', valeur: '≈ 45–180 cm/s, homogène', note: 'Perméable, flux antérograde régulier' },
      { param: 'Bas débit de greffon', valeur: 'VPS de corps < 45 cm/s', note: 'Menace de thrombose → rechercher sténose serrée / mauvais run-off' },
      { param: 'Sténose modérée', valeur: 'Rapport de vitesses Vr > 2', note: 'À surveiller rapprochée' },
      { param: 'Sténose serrée menaçante', valeur: 'VPS focale > 300 cm/s et/ou Vr > 3,5', note: 'Indication de correction (angioplastie/reprise)' },
      { param: 'Resténose intra-stent', valeur: 'Seuils RELEVÉS vs natif', note: 'Ex. carotide stentée : VPS plus haute pour un même %' },
      { param: 'Sac EVAR — évolution', valeur: 'Croissance ≥ 5 mm = anormal', note: 'Régression = bon signe ; croissance = endofuite/endotension' },
      { param: 'Endofuite type I', valeur: 'Défaut d\'étanchéité proximal/distal (collet/jambage)', note: 'GRAVE — traitement en règle' },
      { param: 'Endofuite type II', valeur: 'Réalimentation par collatérale (AMI, lombaires)', note: 'La PLUS fréquente, flux va-et-vient ; surveiller le sac' },
      { param: 'Endofuite type III', valeur: 'Défaut entre modules / déchirure du tissu', note: 'Grave — réintervention' },
      { param: 'Endofuite type IV', valeur: 'Porosité de la prothèse (précoce, transitoire)', note: 'Habituellement bénigne, résolutive' },
      { param: 'Endofuite type V', valeur: 'Endotension (sac qui grossit sans fuite visible)', note: 'Diagnostic d\'élimination ; CEUS/imagerie en coupe' }
    ]
  },
  pathologies: [
    { nom: 'Sténose de pontage (myo-intimale / anastomotique)', physiopath: 'Hyperplasie myo-intimale (greffon veineux +++), surtout aux anastomoses et valvulotomies ; réduit progressivement la lumière', bmode: 'Rétrécissement focal, épaississement pariétal du greffon', doppler: 'Accélération focale : VPS > 300 cm/s et/ou Vr > 3,5 (serrée) ; Vr > 2 (modérée) ; turbulence post-sténotique', ddx: 'Spasme, compression extrinsèque, tortuosité (faux aliasing)', pieges: 'Manquer un segment ; ne pas calculer le rapport ; confondre accélération de coude et vraie sténose', gravite: 'Menace la perméabilité (≈ avant thrombose) ; serrée = à corriger', cat: 'Confirmer (VPS + Vr), localiser, proposer angioplastie/reprise chirurgicale avant thrombose' },
    { nom: 'Thrombose de pontage', physiopath: 'Occlusion complète du greffon (souvent sur sténose serrée méconnue, bas débit, hypercoagulabilité)', bmode: 'Greffon comblé par du matériel, paroi sans flux', doppler: 'Absence de flux couleur ET énergie dans le corps ; flux d\'amont amorti/pré-occlusif ; aval réalimenté par collatérales', ddx: 'Quasi-occlusion (filet de flux), PRF/filtre trop hauts', pieges: 'Conclure trop vite à PRF haute ; ischémie aiguë associée à reconnaître', gravite: 'Urgence si ischémie aiguë de membre', cat: 'Baisser PRF/filtre + énergie ; avis chirurgical urgent (thrombectomie/thrombolyse/reprise)' },
    { nom: 'Faux anévrisme anastomotique', physiopath: 'Désunion partielle de l\'anastomose (surtout prothétique) → poche pulsatile communiquant avec la lumière par un collet', bmode: 'Collection péri-anastomotique pulsatile, ± thrombus pariétal', doppler: 'Flux tourbillonnant (yin-yang) dans la poche ; flux to-and-fro (va-et-vient) dans le collet', ddx: 'Hématome (non pulsatile, sans flux), abcès péri-prothétique', pieges: 'Confondre avec un hématome ; sous-estimer le risque de rupture/embolie', gravite: 'Risque de rupture, thrombose, embolie', cat: 'Mesurer poche et collet ; avis chirurgical (réparation / endoprothèse couverte)' },
    { nom: 'Resténose intra-stent', physiopath: 'Hyperplasie myo-intimale dans le stent et resténose de bord (edge stenosis)', bmode: 'Matériel hypoéchogène tapissant la maille du stent, réduction de lumière', doppler: 'Accélération focale ; ATTENTION seuils de vitesse RELEVÉS par rapport au natif (le stent majore la VPS à % égal)', ddx: 'Artefact de blooming, sténose de bord vs intra-stent', pieges: 'Appliquer les seuils du vaisseau natif → surestimer le % ; blooming couleur', gravite: 'Risque de thrombose/récidive symptomatique', cat: 'Utiliser des seuils adaptés au stent, comparer aux examens antérieurs, avis selon % et clinique' },
    { nom: 'Endofuite après EVAR', physiopath: 'Persistance d\'une perfusion du sac anévrismal autour de la prothèse (types I à V) → le sac reste sous pression', bmode: 'Flux/échos dans le sac autour des modules ; surveiller le diamètre du sac', doppler: 'Flux dans le sac (couleur/énergie) ; type II = flux va-et-vient (AMI/lombaires) ; CEUS plus sensible', ddx: 'Artefact de mouvement/blooming, thrombus organisé sans flux', pieges: 'Banaliser une type II alors que le sac grossit ; manquer une fuite à flux lent (faire énergie/CEUS)', gravite: 'Type I et III graves (rupture) ; type II à surveiller ; sac croissant = alerte', cat: 'Typer la fuite, mesurer le sac ; sac croissant ou type I/III → angio-TDM + réintervention' }
  ],
  algorithme: {
    titre: 'Surveillance de pontage et d\'EVAR',
    noeuds: [
      { q: 'Pontage : VPS étagées le long du greffon — accélération focale ?', a: 'Oui → calculer le rapport de vitesses (Vr) au point maximal' },
      { q: 'Vr > 3,5 et/ou VPS focale > 300 cm/s ?', a: 'Sténose serrée menaçante → correction (angioplastie/reprise) avant thrombose' },
      { q: 'Vr 2–3,5 ?', a: 'Sténose modérée → surveillance rapprochée' },
      { q: 'VPS de corps < 45 cm/s ?', a: 'Bas débit → greffon menacé : chercher sténose serrée d\'amont/aval, mauvais run-off' },
      { q: 'Aucun flux dans le greffon (couleur + énergie) ?', a: 'Thrombose → avis chirurgical urgent (selon ischémie)' },
      { q: 'EVAR : diamètre du sac stable ou en régression ?', a: 'Oui → surveillance standard ; Non (croissance) → rechercher une endofuite' },
      { q: 'Flux dans le sac : où et quel type ?', a: 'Collet/jambage = type I (grave) ; AMI/lombaire va-et-vient = type II ; jonction modules = type III (grave) ; aucun flux mais sac↑ = endotension (V) → CEUS / angio-TDM' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DE SURVEILLANCE DE PONTAGE

Indication : surveillance systématique de pontage [type / montage], opéré le __.
Technique : sonde linéaire (± convexe), B-mode + Doppler couleur et pulsé.

Anastomose proximale : perméable, sans accélération (Vr < 2).
Corps du greffon : flux antérograde régulier, VPS homogène à __ cm/s (45–180), sans sténose focale sur tout le trajet.
Anastomose distale : perméable, sans accélération.
Artère receveuse / run-off : perméable, flux conservé.

CONCLUSION : Pontage [type] perméable, sans sténose significative (VPS de corps normale, pas d'accélération focale, Vr < 2). Surveillance selon protocole.`,
    pathologique: `ÉCHO-DOPPLER DE SURVEILLANCE DE PONTAGE / EVAR

Indication : surveillance de [pontage __ / endoprothèse aortique].
Technique : sonde linéaire et convexe, B-mode + Doppler couleur, pulsé et énergie (± CEUS).

PONTAGE :
Sténose focale au niveau de [anastomose distale / corps moyen / valvulotomie] : VPS __ cm/s, VPS amont __ cm/s, rapport de vitesses Vr = __ → sténose [modérée Vr>2 / serrée Vr>3,5].
VPS de corps __ cm/s [normale / basse < 45 = bas débit].
[Faux anévrisme anastomotique : poche __ mm, collet __ mm, flux to-and-fro.]

EVAR :
Diamètre du sac : __ mm (antérieur __ mm) → [stable / régression / croissance ≥ 5 mm].
Endofuite : [absente / type I collet / type II AMI-lombaire va-et-vient / type III modules / endotension].

CONCLUSION : [Sténose serrée de pontage menaçante → correction] / [Endofuite type __ avec sac __ → angio-TDM et avis chirurgical].`
  },
  cas: [
    { titre: 'Pontage veineux à 6 mois', enonce: 'Surveillance systématique d\'un pontage fémoro-poplité en veine saphène. Au tiers moyen, VPS focale à 320 cm/s ; VPS du corps en amont 90 cm/s.', questions: ['Calculez le rapport de vitesses.', 'Quel est votre diagnostic et la conduite ?'], indices: ['Vr = VPS sténose / VPS amont', 'Seuil serré'], reponse: 'Vr = 320/90 ≈ 3,6 (> 3,5) et VPS > 300 cm/s → sténose serrée menaçante (hyperplasie myo-intimale). Proposer une correction (angioplastie ou reprise) AVANT la thrombose : c\'est tout l\'intérêt de la surveillance du greffon veineux.' },
    { titre: 'Greffon « calme » mais lent', enonce: 'Pontage fémoro-jambier : pas d\'accélération focale, mais la VPS du corps est à 30 cm/s partout.', questions: ['Le greffon est-il rassurant ?', 'Que cherchez-vous ?'], indices: ['Seuil de bas débit', 'Amont/aval'], reponse: 'Non : VPS de corps < 45 cm/s = bas débit, greffon menacé de thrombose. Rechercher une sténose serrée d\'amont ou d\'aval et évaluer le run-off (mauvais lit d\'aval). Surveillance très rapprochée / avis.' },
    { titre: 'Pas de flux', enonce: 'Aucun flux couleur dans un pontage prothétique ; PRF et filtre réglés haut.', questions: ['Avant de conclure ?', 'Diagnostic probable ?'], reponse: 'Baisser PRF et filtre mural et passer en Doppler énergie pour éliminer une quasi-occlusion. Si confirmé : thrombose du pontage. Évaluer l\'ischémie du membre → avis chirurgical en urgence si aiguë.' },
    { titre: 'Masse battante de l\'aine', enonce: 'Tuméfaction pulsatile au niveau de l\'anastomose proximale d\'un pontage aorto-bifémoral en Dacron, 4 ans après.', questions: ['Diagnostic ?', 'Signe Doppler clé ?'], reponse: 'Faux anévrisme anastomotique (désunion). Signe clé : flux to-and-fro (va-et-vient) dans le collet et tourbillon yin-yang dans la poche. Mesurer poche/collet, avis chirurgical (risque de rupture).' },
    { titre: 'Carotide stentée', enonce: 'Contrôle d\'un stent carotidien : VPS ACI à 200 cm/s. Avec les seuils du vaisseau natif vous concluriez à une sténose 50–69 %.', questions: ['Cette interprétation est-elle correcte ?'], reponse: 'Non : le stent rigidifie la paroi et majore la VPS à % égal. Il faut utiliser des seuils RELEVÉS spécifiques au stent (la VPS est plus haute pour un même %). Comparer aux examens antérieurs ; sinon risque de surestimer la resténose.' },
    { titre: 'EVAR : sac stable, type II', enonce: 'Surveillance d\'EVAR : flux va-et-vient dans le sac alimenté par l\'AMI ; diamètre du sac stable à 52 mm (52 mm l\'an dernier).', questions: ['Quel type d\'endofuite ?', 'Conduite ?'], reponse: 'Endofuite de type II (réalimentation par collatérale, AMI), la plus fréquente, flux to-and-fro. Sac stable → surveillance rapprochée (pas de geste systématique). La décision dépend de l\'évolution du sac.' },
    { titre: 'EVAR : sac qui grossit', enonce: 'Même patient à 6 mois : le sac est passé à 60 mm. La couleur ne montre pas de fuite évidente.', questions: ['Que faites-vous ?', 'Pourquoi ?'], indices: ['Sensibilité', 'Croissance du sac'], reponse: 'Sac croissant = alerte : une endofuite est présente jusqu\'à preuve du contraire. Optimiser énergie/PRF basse et surtout réaliser un CEUS (plus sensible) et/ou un angio-TDM. Ne jamais banaliser un sac qui grossit, même si la couleur est « négative ».' },
    { titre: 'Endofuite proximale', enonce: 'EVAR : flux dans le sac directement au niveau du collet proximal, sac en croissance.', questions: ['Type ?', 'Gravité ?'], reponse: 'Endofuite de type I (défaut d\'étanchéité du collet proximal). Type GRAVE : sac sous pression systémique, risque de rupture. Réintervention en règle (extension/cuff). Angio-TDM et avis chirurgical urgent.' },
    { titre: 'Pontage in situ « hyperdébit »', enonce: 'Pontage veineux in situ : à mi-trajet, branche perforante avec flux artérialisé à forte composante diastolique.', questions: ['De quoi s\'agit-il ?', 'Conséquence ?'], reponse: 'Fistule artério-veineuse résiduelle (branche veineuse non liée lors d\'un pontage in situ). Elle « vole » du débit (steal) et peut compromettre le run-off distal ; la repérer et la signaler (embolisation/ligature si symptomatique).' },
    { titre: 'Anastomose distale accélérée mais stable', enonce: 'Pontage fémoro-poplité : Vr à l\'anastomose distale = 2,3, inchangé depuis 2 examens, patient asymptomatique.', questions: ['Sténose serrée ?', 'Conduite ?'], reponse: 'Non : Vr entre 2 et 3,5 = sténose modérée. Stable et asymptomatique → surveillance rapprochée plutôt que geste immédiat. Réévaluer : c\'est l\'évolution (passage à Vr > 3,5 ou symptômes) qui déclenche la correction.' }
  ],
  pieges: [
    'Appliquer au stent ou à la prothèse les seuils de vitesse du vaisseau natif → faux % de resténose (les seuils sont RELEVÉS sur matériel).',
    'Ne mesurer que la VPS absolue sans calculer le rapport de vitesses (Vr) → manquer une sténose serrée.',
    'Manquer un segment du greffon (sténose myo-intimale non vue) : suivre TOUT le trajet, anastomoses et valvulotomies +++.',
    'Confondre un faux anévrisme anastomotique avec un hématome : le flux to-and-fro dans le collet tranche.',
    'Banaliser une endofuite de type II alors que le diamètre du sac augmente : un sac qui grossit est toujours suspect.',
    'Conclure « occlusion/thrombose » avec PRF et filtre trop hauts (rater une quasi-occlusion ou un bas débit).',
    'Artefacts du matériel (réverbération sur le stent/Dacron, blooming couleur) pris pour du flux/contenu ; multiplier les incidences.',
    'Oublier le CEUS quand le sac grossit sans fuite couleur évidente (endofuite à flux lent / endotension).'
  ],
  flashcards: [
    { q: 'Pourquoi surveiller +++ un pontage veineux ?', r: 'Il développe des sténoses myo-intimales (hyperplasie) qui menacent la perméabilité avant tout symptôme, surtout aux anastomoses et valvulotomies.' },
    { q: 'Critère de sténose serrée menaçante de pontage ?', r: 'VPS focale > 300 cm/s et/ou rapport de vitesses Vr > 3,5.' },
    { q: 'Que signifie une VPS de corps < 45 cm/s ?', r: 'Bas débit du greffon → menace de thrombose (chercher sténose serrée d\'amont/aval, mauvais run-off).' },
    { q: 'Seuils de vitesse d\'un stent vs vaisseau natif ?', r: 'Relevés : pour un même % de sténose la VPS est plus élevée (le stent rigidifie la paroi).' },
    { q: 'Endofuite la plus fréquente et son flux ?', r: 'Type II (réalimentation par collatérale AMI/lombaires), flux va-et-vient (to-and-fro).' },
    { q: 'Critère pronostique majeur d\'un EVAR ?', r: 'Le diamètre du sac : croissance ≥ 5 mm = endofuite active jusqu\'à preuve du contraire.' },
    { q: 'Signe Doppler d\'un faux anévrisme anastomotique ?', r: 'Flux to-and-fro (va-et-vient) dans le collet et tourbillon yin-yang dans la poche.' }
  ],
  qcm: [
    { q: 'Sur un pontage veineux, VPS focale 360 cm/s et VPS amont 90 cm/s. Quelle conclusion ?', options: ['Greffon normal', 'Sténose modérée à surveiller', 'Sténose serrée menaçante', 'Thrombose'], correct: 2, exp: 'Vr = 360/90 = 4 (> 3,5) et VPS > 300 cm/s → sténose serrée menaçante, à corriger avant thrombose.' },
    { q: 'Une endofuite alimentée par l\'artère mésentérique inférieure avec flux va-et-vient est de type :', options: ['Type I', 'Type II', 'Type III', 'Type IV'], correct: 1, exp: 'Type II = réalimentation par une collatérale (AMI, lombaires), la plus fréquente, flux to-and-fro ; surveiller le sac.' },
    { q: 'Devant une carotide stentée, pour quantifier une resténose il faut :', options: ['Utiliser les seuils du vaisseau natif', 'Utiliser des seuils de vitesse relevés spécifiques au stent', 'Ne pas mesurer la VPS', 'Se fier au seul B-mode'], correct: 1, exp: 'Le stent majore la VPS à % égal : appliquer des seuils relevés, sinon on surestime la resténose.' },
    { q: 'Une VPS de corps de greffon à 30 cm/s traduit :', options: ['Un greffon hyperdébit', 'Un bas débit menaçant la perméabilité', 'Une sténose serrée locale', 'Un examen normal'], correct: 1, exp: 'VPS de corps < 45 cm/s = bas débit → greffon menacé de thrombose ; rechercher sténose serrée d\'amont/aval et run-off.' },
    { q: 'Sac d\'EVAR en croissance sans fuite visible en couleur. Le meilleur geste est :', options: ['Conclure à l\'absence d\'endofuite', 'Réaliser un CEUS / angio-TDM', 'Augmenter la PRF', 'Arrêter la surveillance'], correct: 1, exp: 'Un sac qui grossit impose de chercher une endofuite à flux lent : énergie/PRF basse puis CEUS (plus sensible) ± angio-TDM.' }
  ],
  refs: ['DIU Montpellier (surveillance des revascularisations) ; SFMV — recommandations de surveillance des pontages des membres inférieurs ; ESVS Guidelines (peripheral arterial / aortic) ; recommandations de suivi des EVAR (typage des endofuites I–V, surveillance du sac, place du CEUS).']
});

})();
