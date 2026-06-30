/* ÉCHO-VASC DIU — Membres inférieurs veineux : recherche de TVP (chapitre de référence) */
window.VASC = window.VASC || { chapters: [] };

(function () {

const SVG_TVP_1 = `<svg viewBox="0 0 460 260" role="img" aria-label="Anatomie veineuse profonde du membre inférieur">
<rect width="460" height="260" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Réseau veineux profond (vue d'ensemble)</text>
<line x1="120" y1="30" x2="120" y2="55" stroke="#1d4ed8" stroke-width="11"/>
<text x="135" y="40" font-size="10" fill="#1d4ed8">VCI</text>
<line x1="120" y1="55" x2="95" y2="80" stroke="#1d4ed8" stroke-width="9"/>
<text x="10" y="72" font-size="10" fill="#1d4ed8">V. iliaque commune</text>
<line x1="95" y1="80" x2="90" y2="110" stroke="#1d4ed8" stroke-width="8"/>
<text x="115" y="98" font-size="10" fill="#1d4ed8">V. iliaque ext.</text>
<line x1="90" y1="110" x2="90" y2="135" stroke="#2563eb" stroke-width="8"/>
<text x="105" y="125" font-size="10" fill="#2563eb">V. fémorale commune</text>
<circle cx="118" cy="120" r="6" fill="none" stroke="#0d9488" stroke-width="2"/>
<text x="128" y="123" font-size="9" fill="#0f766e">crosse GVS (JSF)</text>
<line x1="90" y1="135" x2="86" y2="180" stroke="#2563eb" stroke-width="6"/>
<text x="100" y="160" font-size="10" fill="#2563eb">V. fémorale (profonde)</text>
<text x="100" y="173" font-size="8" fill="#64748b">ex « fémorale superficielle »</text>
<line x1="86" y1="180" x2="86" y2="205" stroke="#2563eb" stroke-width="6"/>
<text x="100" y="195" font-size="9" fill="#2563eb">canal de Hunter</text>
<line x1="86" y1="205" x2="86" y2="225" stroke="#7c3aed" stroke-width="6"/>
<text x="100" y="218" font-size="10" fill="#7c3aed">V. poplitée</text>
<circle cx="60" cy="218" r="5" fill="none" stroke="#0d9488" stroke-width="2"/>
<text x="6" y="221" font-size="8" fill="#0f766e">JSP (PVS)</text>
<line x1="86" y1="225" x2="72" y2="252" stroke="#dc2626" stroke-width="3"/>
<line x1="86" y1="225" x2="100" y2="252" stroke="#dc2626" stroke-width="3"/>
<text x="105" y="248" font-size="9" fill="#991b1b">V. tibiales post. / fibulaires</text>
<text x="240" y="40" font-size="11" font-weight="bold" fill="#0b2f63">Coupe transverse cuisse</text>
<ellipse cx="320" cy="90" rx="34" ry="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="300" y="94" font-size="10" fill="#1d4ed8">V (compressible)</text>
<circle cx="385" cy="92" r="15" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<text x="375" y="96" font-size="10" fill="#991b1b">A</text>
<text x="240" y="135" font-size="10" fill="#0b2f63">L'artère pulse, ne s'écrase pas ;</text>
<text x="240" y="150" font-size="10" fill="#0b2f63">la veine normale s'écrase paroi à paroi.</text>
<text x="240" y="180" font-size="11" font-weight="bold" fill="#0b2f63">V. musculaires</text>
<text x="240" y="198" font-size="10" fill="#64748b">soléaires + gastrocnémiennes</text>
<text x="240" y="212" font-size="10" fill="#64748b">(siège fréquent de TVP distale)</text>
</svg>`;

const SVG_TVP_2 = `<svg viewBox="0 0 460 200" role="img" aria-label="Test de compressibilité veineuse">
<rect width="460" height="200" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Test de compressibilité (coupe transverse)</text>
<text x="40" y="45" font-size="11" fill="#0f766e" font-weight="bold">Veine NORMALE</text>
<ellipse cx="90" cy="80" rx="32" ry="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="70" y="84" font-size="10" fill="#1d4ed8">repos</text>
<text x="155" y="84" font-size="22" fill="#475569">→</text>
<path d="M210,68 q32,12 0,24" fill="none" stroke="#2563eb" stroke-width="2.5"/>
<path d="M212,68 q-10,12 0,24" fill="none" stroke="#2563eb" stroke-width="2.5"/>
<text x="195" y="115" font-size="10" fill="#1d4ed8">écrasée (paroi à paroi)</text>
<text x="195" y="40" font-size="10" fill="#475569">pression sonde douce ↓</text>
<text x="40" y="150" font-size="11" fill="#991b1b" font-weight="bold">Veine THROMBOSÉE</text>
<ellipse cx="90" cy="178" rx="32" ry="22" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<ellipse cx="90" cy="178" rx="20" ry="13" fill="#fca5a5" stroke="#dc2626"/>
<text x="155" y="182" font-size="22" fill="#475569">→</text>
<ellipse cx="240" cy="178" rx="32" ry="22" fill="#fde2e2" stroke="#dc2626" stroke-width="2"/>
<ellipse cx="240" cy="178" rx="20" ry="13" fill="#fca5a5" stroke="#dc2626"/>
<text x="285" y="174" font-size="11" fill="#991b1b" font-weight="bold">NON compressible</text>
<text x="285" y="190" font-size="10" fill="#991b1b">= signe majeur de TVP</text>
</svg>`;

const SVG_TVP_3 = `<svg viewBox="0 0 460 170" role="img" aria-label="Phasicité respiratoire et augmentation">
<rect width="460" height="170" fill="#fff"/>
<text x="10" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Flux veineux normal : spontané, phasique, augmentable</text>
<line x1="20" y1="60" x2="230" y2="60" stroke="#cbd5e1"/>
<path d="M20,60 C50,45 70,50 90,60 C110,72 130,52 150,60 C170,70 190,50 210,60" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="20" y="90" font-size="9" fill="#64748b">phasicité respiratoire (ondulations)</text>
<line x1="240" y1="60" x2="450" y2="60" stroke="#cbd5e1"/>
<path d="M240,60 L300,60 C310,60 312,20 330,20 C360,20 380,55 410,60 L450,60" fill="#dbeafe" stroke="#0d9488" stroke-width="1.8"/>
<text x="300" y="95" font-size="9" fill="#0f766e">augmentation = chasse manuelle distale</text>
<text x="10" y="125" font-size="11" font-weight="bold" fill="#991b1b">TVP : perte du flux / perte de phasicité (« continu »)</text>
<line x1="20" y1="150" x2="450" y2="150" stroke="#cbd5e1"/>
<path d="M20,150 L450,150" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
<text x="200" y="166" font-size="9" fill="#991b1b">absence de flux (occlusion) ou flux continu non augmentable</text>
</svg>`;

window.VASC.chapters.push({
  id: 'tvp', num: 40, groupe: 'Veineux', emoji: '🩸',
  titre: 'Membres inférieurs veineux — TVP',
  sonde: 'Linéaire 5–9 MHz (+ convexe pour obèses/veine iliaque)', niveau: 'DIU → expert', duree: '≈3 h',
  resume: 'Recherche de thrombose veineuse profonde (TVP) des membres inférieurs : technique de référence par test de compressibilité segmentaire, complétée par le Doppler (flux, augmentation, phasicité). Examen urgent, fréquent et très codifié, au cœur de l\'algorithme thrombo-embolique (score de Wells, D-dimères).',
  tags: 'TVP thrombose veineuse profonde compressibilité fémorale poplitée saphène TVS Wells D-dimères embolie pulmonaire syndrome post-thrombotique augmentation phasicité',
  objectifs: [
    'Nommer et identifier les veines profondes des MI (VCI, iliaques, fémorale commune, fémorale, poplitée, jambières, musculaires) et les crosses saphènes.',
    'Réaliser et interpréter le test de compressibilité segmentaire en coupe transverse, technique de référence du diagnostic de TVP.',
    'Compléter par l\'analyse du flux : spontanéité, phasicité respiratoire, augmentation, Valsalva.',
    'Reconnaître les signes de TVP (veine non compressible, matériel endoluminal, augmentation de calibre, perte de flux/phasicité) et dater le thrombus (récent vs séquellaire).',
    'Distinguer TVP proximale, TVP distale et thrombophlébite superficielle (TVS), et en tirer les conséquences thérapeutiques.',
    'Intégrer l\'échographie dans l\'algorithme (Wells + D-dimères → écho compression 2 points vs complète) et rédiger un compte-rendu standardisé.',
    'Identifier les diagnostics différentiels d\'une « grosse jambe » et les pièges techniques majeurs (dénomination « fémorale superficielle », thrombus anéchogène manqué, TVP iliaque/VCI).'
  ],
  anatomie: {
    texte: 'Le réseau profond accompagne les artères. De haut en bas : veine cave inférieure (VCI) ; veines iliaques commune, externe et interne ; veine fémorale commune (VFC, au pli inguinal, où se jette la crosse de la grande veine saphène) ; veine fémorale — anciennement « fémorale superficielle », dénomination TROMPEUSE car c\'est une veine PROFONDE à traiter comme telle ; veine profonde de cuisse (fémorale profonde) ; veine poplitée (creux poplité, où se jette la petite veine saphène) ; puis les veines jambières par paires (tibiales postérieures, fibulaires, tibiales antérieures) et les veines musculaires (soléaires, gastrocnémiennes), siège fréquent des TVP distales.',
    svg: SVG_TVP_1,
    caption: 'Schéma : axe veineux profond VCI → iliaques → fémorale commune → fémorale (« profonde ») → poplitée → jambières/musculaires. Crosse de la grande saphène (jonction saphéno-fémorale, JSF) et petite saphène (jonction saphéno-poplitée, JSP). En transverse, la veine s\'écrase ; l\'artère pulse et résiste.',
    vascularisation: 'Le sang remonte de la périphérie vers la VCI grâce à la pompe musculaire du mollet et aux valvules anti-reflux. Le réseau superficiel (grande et petite saphènes) se draine dans le réseau profond par les crosses et les perforantes.',
    rapports: ['Veine accolée à l\'artère homonyme (paquet vasculo-nerveux) — repère constant pour identifier chaque segment', 'VFC au pli inguinal, médiale par rapport à l\'artère fémorale', 'Veine poplitée SUPERFICIELLE par rapport à l\'artère dans le creux poplité (plus proche de la sonde)', 'Veines jambières satellites par paires de chaque artère'],
    variantes: ['Veine fémorale DUPLIQUÉE (fréquente) : un canal peut être thrombosé et l\'autre libre → piège classique', 'Duplication poplitée', 'Crosse saphène haute ou multiple', 'Veine cave gauche / anomalies de retour (rares)']
  },
  physiologie: {
    texte: 'Le flux veineux profond normal a quatre qualités à vérifier : SPONTANÉ (présent au repos sur les gros troncs), PHASIQUE (module avec la respiration : il diminue à l\'inspiration profonde par augmentation de la pression abdominale, augmente à l\'expiration), AUGMENTABLE (la compression musculaire distale chasse le sang et majore brutalement le flux), et MODULABLE par le Valsalva (qui interrompt/inverse transitoirement le flux proximal si les valvules sont continentes). La perte de ces qualités oriente vers une obstruction.',
    profils: [
      { nom: 'Phasicité respiratoire', desc: 'Flux ondulant rythmé par la respiration. Une perte de phasicité (flux « continu », non modulé) en aval signe une obstruction d\'AMONT (TVP iliaque/cave ou compression pelvienne) — signe précieux pour les segments non accessibles à la compression.' },
      { nom: 'Augmentation', desc: 'La compression manuelle du mollet (ou du segment distal) provoque une augmentation franche et brève du flux. Une augmentation absente ou amortie évoque une obstruction entre le point de compression et la sonde.' },
      { nom: 'Spontanéité', desc: 'Le flux est spontané sur les gros troncs (fémoral, poplité). Sur les veines jambières fines, il peut nécessiter une manœuvre d\'augmentation pour être révélé.' },
      { nom: 'Valsalva', desc: 'À la VFC : un flux antérograde qui s\'interrompt au Valsalva atteste la perméabilité et la continence du segment proximal ; un reflux prolongé traduit une incontinence valvulaire.' }
    ]
  },
  physique: {
    intro: 'Territoire superficiel à moyennement profond : haute fréquence pour la qualité d\'image, mais sonde convexe indispensable chez l\'obèse et pour l\'étage iliaque/cave.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 5–9 MHz pour l\'axe fémoro-poplité et jambier. Passer à une sonde convexe 2–5 MHz pour la VCI, les veines iliaques et chez le patient obèse (pénétration).' },
      { titre: 'Le mode de référence est le B-MODE', desc: 'Le diagnostic repose d\'abord sur le test de compressibilité en B-mode transverse, PAS sur le Doppler. Un thrombus récent peut être quasi anéchogène et INVISIBLE en B-mode : seule l\'absence d\'écrasement le démasque.' },
      { titre: 'Gain', desc: 'Un gain trop élevé « remplit » la lumière et crée un faux thrombus ; un gain trop bas peut masquer un thrombus échogène. Régler une lumière bien noire en l\'absence de thrombus.' },
      { titre: 'Réglages Doppler veineux', desc: 'PRF basse (flux lents), filtre mural bas, angle ≤ 60° pour le spectre. La couleur sert à confirmer le remplissage de la lumière et à repérer un défaut de remplissage (thrombus).' },
      { titre: 'Pression de compression', desc: 'Une pression DOUCE doit suffire à écraser une veine normale paroi à paroi ; le repère de pression adéquate est la déformation légère de l\'artère adjacente. Une compression insuffisante fait conclure à tort à une TVP.' }
    ]
  },
  reglages: {
    intro: 'Réglages types pour la recherche de TVP.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 5–9 MHz', note: 'Convexe 2–5 MHz si obèse / iliaque-VCI' },
      { param: 'Mode principal', valeur: 'B-mode transverse', note: 'Compressibilité = diagnostic' },
      { param: 'Profondeur', valeur: 'Veine au ⅔ supérieur', note: 'Plus profond à la cuisse / Hunter' },
      { param: 'Gain B-mode', valeur: 'Lumière bien noire', note: 'Trop = faux thrombus' },
      { param: 'PRF / échelle', valeur: 'Basse (flux veineux lents)', note: 'Trop haute = faux « pas de flux »' },
      { param: 'Filtre mural', valeur: 'Bas', note: 'Haut = fausse occlusion' },
      { param: 'Couleur', valeur: 'PRF basse, boîte large', note: 'Confirme le remplissage / le défaut' },
      { param: 'Angle pulsé', valeur: '≤ 60°', note: 'Pour phasicité / augmentation' }
    ]
  },
  installation: {
    patient: 'Décubitus dorsal, jambe examinée en légère rotation externe et genou un peu fléchi pour dégager le paquet vasculaire. Proclive (tête relevée 15–30°) pour distendre les veines et faciliter l\'analyse ; pour le creux poplité et le mollet : décubitus latéral, procubitus, ou patient assis jambes pendantes.',
    operateur: 'Assis au côté du patient, avant-bras en appui ; main libre disponible pour les manœuvres d\'augmentation (compression du mollet).',
    ecran: 'Dans l\'axe du regard ; convention transverse maintenue tout le long pour suivre la veine de proche en proche.',
    sonde: 'Coupe TRANSVERSE pour la compression segmentaire (technique de référence) ; coupe longitudinale ponctuelle pour le Doppler spectral (phasicité, augmentation, Valsalva).',
    ergonomie: 'Stabiliser la sonde, exercer une pression progressive et douce ; alterner les positions selon le segment (proclive pour la cuisse, jambe pendante/procubitus pour le mollet).'
  },
  acquisition: {
    etapes: [
      { titre: 'Veine fémorale commune (pli inguinal)', desc: 'Coupe transverse : repérer VFC médiale à l\'artère, et la crosse de la grande saphène. Test de compressibilité. Doppler : flux spontané, phasique, Valsalva (perméabilité proximale/iliaque).' },
      { titre: 'Compression segmentaire descendante', desc: 'Descendre en transverse le long de la cuisse en comprimant TOUS LES 1–2 cm : VFC → bifurcation fémorale profonde/fémorale → veine fémorale dans le canal de Hunter. La veine normale s\'écrase totalement paroi à paroi sous pression douce.' },
      { titre: 'Veine poplitée', desc: 'Creux poplité (jambe pendante/procubitus) : la veine est SUPERFICIELLE par rapport à l\'artère. Compression + repérage de la jonction saphéno-poplitée (petite saphène).' },
      { titre: 'Veines jambières et musculaires', desc: 'Si protocole complet : tibiales postérieures et fibulaires (au mollet), veines musculaires (soléaires, gastrocnémiennes). Compression + augmentation pour révéler le flux des fines veines.' },
      { titre: 'Manœuvres Doppler', desc: 'Phasicité respiratoire (segment proximal), augmentation par chasse manuelle distale, Valsalva à la VFC. Compléter par la couleur (défaut de remplissage).' },
      { titre: 'Choisir le protocole', desc: 'Examen COMPLET (proximal + distal) ou PROXIMAL « 2 points » (VFC + poplitée) selon la probabilité clinique (Wells) et les D-dimères ; en cas d\'écho proximale négative à probabilité forte, recontrôler à J5–J7 ou compléter en distal.' }
    ],
    reperes: ['VFC médiale à l\'artère + crosse de la grande saphène (« Mickey » au pli inguinal)', 'Veine poplitée superficielle à l\'artère dans le creux poplité', 'Veines jambières par paires satellites des artères', '« Fémorale superficielle » = veine PROFONDE (ne pas se laisser piéger par le nom)'],
    astuces: ['Toujours travailler en TRANSVERSE pour comprimer : c\'est le plan qui démasque un thrombus anéchogène.', 'Régler une pression juste suffisante pour déformer légèrement l\'artère voisine.', 'Devant un œdème de TOUTE la jambe avec compression fémoro-poplitée normale : explorer l\'étage iliaque/VCI (phasicité, Valsalva, sonde convexe).', 'Compresser tous les 1–2 cm sans « sauter » de segment (un thrombus court se rate facilement).'],
    erreurs: ['Comprimer en longitudinal (la veine glisse hors du plan → fausse non-compressibilité ou faux écrasement).', 'Pression insuffisante → fausse TVP ; pression brutale → inconfort, artère écrasée.', 'Oublier la veine fémorale dupliquée (un canal thrombosé manqué).', 'Conclure « pas de flux » avec PRF/filtre trop hauts.', 'Ne pas explorer l\'iliaque/VCI devant un gros œdème global.']
  },
  interpretation: {
    texte: 'Le critère diagnostique central est la NON-COMPRESSIBILITÉ. Le Doppler est un complément, surtout utile là où la compression est impossible (iliaque, VCI).',
    normal: ['Veine s\'écrasant totalement, paroi à paroi, sous pression douce', 'Lumière anéchogène', 'Flux spontané, phasique avec la respiration, augmentable, modulé par le Valsalva'],
    pathologique: ['Veine NON compressible (signe majeur de TVP)', 'Matériel endoluminal (thrombus) — peut être anéchogène/invisible en B-mode → la compression tranche', 'Augmentation de calibre de la veine (veine thrombosée dilatée)', 'Absence de flux / perte de phasicité / absence d\'augmentation', 'Défaut de remplissage couleur'],
    svgPatho: SVG_TVP_2,
    capPatho: 'Test de compressibilité : la veine normale s\'écrase paroi à paroi ; la veine thrombosée reste ronde et non compressible (signe majeur de TVP).'
  },
  valeurs: {
    intro: 'Critères diagnostiques et de datation. La recherche de TVP est avant tout QUALITATIVE (compressibilité) ; il n\'y a pas de « seuil de vitesse ».',
    lignes: [
      { param: 'Veine normale', valeur: 'Compressible (s\'écrase totalement)', note: 'Pression douce, paroi à paroi' },
      { param: 'TVP — signe majeur', valeur: 'Veine NON compressible', note: 'Critère diagnostique central' },
      { param: 'Thrombus récent', valeur: 'Anéchogène/peu échogène, veine dilatée, molle', note: 'Peut être invisible en B-mode → comprimer' },
      { param: 'Thrombus ancien/séquellaire', valeur: 'Échogène, rétracté, paroi épaissie', note: 'Recanalisation, reflux séquellaire (SPT)' },
      { param: 'Flux (TVP occlusive)', valeur: 'Absent, non augmentable', note: 'Perte de phasicité possible' },
      { param: 'Perte de phasicité distale', valeur: 'Flux continu non modulé', note: 'Obstruction d\'amont (iliaque/VCI)' },
      { param: 'TVS à risque', valeur: 'Thrombus saphène ≤ 3 cm de la jonction', note: 'Risque d\'extension au réseau profond' },
      { param: 'Protocole 2 points', valeur: 'VFC + poplitée', note: 'Si Wells + D-dimères orientent ; sinon complet' }
    ]
  },
  pathologies: [
    { nom: 'TVP proximale', physiopath: 'Thrombose d\'un tronc profond au-dessus du genou (poplitée et au-dessus : fémorale, fémorale commune, iliaque, VCI). Risque embolique pulmonaire élevé.', bmode: 'Veine non compressible, dilatée, ± matériel endoluminal (parfois anéchogène)', doppler: 'Absence de flux / défaut de remplissage couleur, perte de phasicité, absence d\'augmentation', ddx: 'Compression extrinsèque (masse pelvienne), syndrome de Cockett (May-Thurner) à l\'iliaque', pieges: 'Thrombus anéchogène manqué si on ne comprime pas ; veine fémorale dupliquée ; segment du canal de Hunter difficile', gravite: 'Risque d\'embolie pulmonaire — urgence thérapeutique (anticoagulation)', cat: 'Anticoagulation curative, rechercher étiologie/EP selon clinique ; explorer l\'iliaque/VCI si œdème global' },
    { nom: 'TVP distale (jambière/musculaire)', physiopath: 'Thrombose des veines jambières (tibiales post., fibulaires) ou musculaires (soléaires, gastrocnémiennes). Risque embolique plus faible mais possible extension proximale.', bmode: 'Veine jambière/musculaire non compressible, parfois petite et difficile à voir', doppler: 'Absence de flux dans la veine concernée ; augmentation utile pour révéler les fines veines', ddx: 'Déchirure musculaire, hématome, veine musculaire non thrombosée', pieges: 'TVP distale isolée facilement manquée ; veines fines exigeant l\'augmentation ; segment musculaire pléthorique', gravite: 'Risque d\'extension proximale (surveillance) plus que d\'EP', cat: 'Selon recommandations : anticoagulation ou surveillance échographique rapprochée (recontrôle à J5–J7) ; décision selon contexte/risque' },
    { nom: 'Thrombophlébite superficielle (TVS)', physiopath: 'Thrombose d\'une veine superficielle (grande/petite saphène, collatérales), souvent sur varices. Risque d\'extension à la jonction et au réseau profond.', bmode: 'Veine superficielle non compressible, paroi épaissie, cordon induré palpable ; mesurer la distance thrombus–jonction', doppler: 'Thrombus endoluminal, recherche d\'extension à la crosse', ddx: 'Lymphangite, cellulite, TVP profonde associée (à toujours éliminer)', pieges: 'Sous-estimer le risque : un thrombus à ≥ 3 cm de la jonction saphéno-fémorale/poplitée reste à risque d\'extension', gravite: 'À risque si étendue (≥ 5 cm) ou proche de la jonction (≤ 3 cm)', cat: 'Évaluer distance à la jonction et extension ; anticoagulation préventive/curative selon longueur et proximité jonctionnelle ; toujours vérifier le réseau profond' },
    { nom: 'Syndrome post-thrombotique (séquelle)', physiopath: 'Séquelles d\'une TVP : recanalisation partielle, destruction valvulaire → reflux et hypertension veineuse chronique.', bmode: 'Veine partiellement recanalisée, paroi épaissie, thrombus échogène rétracté, calibre réduit', doppler: 'Reflux pathologique (> 0,5–1 s) à la manœuvre de chasse, flux résiduel hétérogène', ddx: 'TVP récente (thrombus mou anéchogène, veine dilatée) — la datation oriente', pieges: 'Confondre séquelle ancienne et TVP aiguë → erreur de prise en charge (anticoaguler à tort)', gravite: 'Morbidité chronique (œdème, dermite, ulcère)', cat: 'Documenter l\'ancienneté, le reflux et l\'obstruction résiduelle ; prise en charge compressive ; comparer à un examen de référence si disponible' }
  ],
  algorithme: {
    titre: 'Conduite devant une suspicion de TVP',
    noeuds: [
      { q: 'Suspicion clinique de TVP ?', a: 'Évaluer la probabilité par le score de Wells (faible / intermédiaire / forte)' },
      { q: 'Probabilité faible/intermédiaire ?', a: 'D-dimères : si négatifs → TVP exclue ; si positifs → échographie' },
      { q: 'Probabilité forte ?', a: 'Échographie d\'emblée (les D-dimères ne suffisent pas à exclure)' },
      { q: 'Quelle échographie ?', a: 'Compression « 2 points » (VFC + poplitée) ou examen complet selon protocole local et accès au distal' },
      { q: 'Écho proximale négative mais forte probabilité ?', a: 'Recontrôle à J5–J7 ou compléter en distal (ne pas exclure trop vite)' },
      { q: 'Veine non compressible ?', a: 'TVP confirmée → anticoagulation curative ; préciser proximale/distale et étendue' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER VEINEUX DES MEMBRES INFÉRIEURS — RECHERCHE DE TVP

Indication : [suspicion de TVP / douleur-œdème de jambe / Wells __ / D-dimères __].
Technique : sonde linéaire, test de compressibilité segmentaire en coupe transverse + Doppler (flux, phasicité, augmentation, Valsalva).

Membre [droit / gauche] :
Veine fémorale commune, fémorale (« profonde »), poplitée : parfaitement compressibles, lumière anéchogène.
Veines jambières (tibiales postérieures, fibulaires) et musculaires : compressibles [si explorées].
Doppler : flux spontané, phasique avec la respiration, augmentable à la chasse manuelle distale ; modulation au Valsalva à la VFC.
Réseau superficiel (grande/petite saphènes) : perméable, compressible.

CONCLUSION : Pas d'argument échographique pour une thrombose veineuse profonde (ni superficielle). Veines profondes perméables et compressibles.`,
    pathologique: `ÉCHO-DOPPLER VEINEUX DES MEMBRES INFÉRIEURS — RECHERCHE DE TVP

Indication : [douleur + œdème du mollet / suspicion EP / Wells __ / D-dimères positifs].
Technique : sonde linéaire (± convexe), test de compressibilité segmentaire transverse + Doppler.

Membre [côté] :
Veine [fémorale commune / fémorale / poplitée / tibiale postérieure] NON compressible, dilatée, contenant un matériel endoluminal [anéchogène récent / échogène], sur __ cm.
Doppler : absence de flux / défaut de remplissage couleur [± perte de phasicité d'amont].
Limite proximale du thrombus : __ . Caractère : [récent / ancien-séquellaire].
Réseau superficiel : [TVS de la __ saphène à __ cm de la jonction / RAS].

CONCLUSION : Thrombose veineuse profonde [proximale / distale] [côté] intéressant [segments], d'allure [récente].
[Proposition : anticoagulation curative ; recherche d'EP selon clinique ; explorer l'étage iliaque/VCI si œdème global ; recontrôle selon évolution.]`
  },
  cas: [
    { titre: 'La veine ne s\'écrase pas', enonce: 'Douleur du mollet gauche. En transverse à la VFC, la veine reste ronde et ne s\'écrase pas malgré une pression suffisante (l\'artère voisine se déforme). La lumière paraît noire.', questions: ['Quel est le diagnostic ?', 'Pourquoi la lumière noire ne l\'exclut-elle pas ?'], indices: ['Test de référence', 'Échogénicité du thrombus récent'], reponse: 'TVP de la veine fémorale commune : la non-compressibilité est le signe majeur. Un thrombus RÉCENT est souvent anéchogène et invisible en B-mode — d\'où l\'importance de la compression, qui seule le démasque.' },
    { titre: 'Gros œdème, compression normale', enonce: 'Œdème de TOUTE la jambe droite. La compression fémoro-poplitée est normale (veines compressibles), mais à la VFC le flux est continu, sans phasicité respiratoire ni modulation au Valsalva.', questions: ['Où est le problème ?', 'Que faites-vous ?'], reponse: 'La perte de phasicité/de modulation à la VFC signe une obstruction d\'AMONT : TVP iliaque ou cave (non accessible à la compression). Explorer l\'étage iliaque/VCI avec une sonde convexe ; compléter par imagerie en coupe si besoin (May-Thurner).' },
    { titre: 'Fémorale « superficielle »', enonce: 'Un confrère vous dit avoir trouvé une thrombose de la « veine fémorale superficielle » et la considère comme une TVS sans gravité.', questions: ['Est-ce une thrombose superficielle ?', 'Conséquence ?'], reponse: 'NON : malgré son nom, la veine fémorale (« superficielle ») est une veine PROFONDE. Il s\'agit d\'une TVP proximale à anticoaguler. C\'est un piège de dénomination classique et lourd de conséquences.' },
    { titre: 'Faux thrombus', enonce: 'Dans la veine poplitée, un matériel échogène homogène semble remplir la lumière, mais la veine s\'écrase totalement à la compression et le flux est augmentable.', questions: ['TVP ou artefact ?', 'Cause ?'], reponse: 'Artefact : une veine compressible et au flux augmentable n\'est pas thrombosée. Le faux contenu vient d\'un gain trop élevé (ou d\'un effet de volume partiel). Baisser le gain.' },
    { titre: 'Veine dédoublée', enonce: 'À mi-cuisse, vous identifiez une veine fémorale compressible accolée à l\'artère. Pourtant la jambe reste douloureuse et œdématiée.', questions: ['Quel piège anatomique vérifier ?'], reponse: 'La veine fémorale DUPLIQUÉE : il existe deux canaux ; l\'un peut être libre et l\'autre thrombosé. Rechercher et comprimer les deux canaux sur tout le trajet.' },
    { titre: 'Thrombus de saphène', enonce: 'Cordon induré douloureux sur le trajet de la grande saphène à la cuisse. La saphène est non compressible avec thrombus, situé à 2 cm de la jonction saphéno-fémorale.', questions: ['TVS banale ?', 'Décision ?'], reponse: 'TVS à RISQUE : le thrombus est proche de la jonction (≤ 3 cm) → risque d\'extension au réseau profond. Anticoagulation (préventive/curative selon protocole) et surveillance ; toujours vérifier le réseau profond.' },
    { titre: 'Récent ou ancien ?', enonce: 'Veine poplitée non compressible, mais à paroi épaissie, lumière réduite, thrombus échogène rétracté, avec un reflux à la chasse.', questions: ['Thrombus récent ou séquellaire ?', 'Pourquoi ça change tout ?'], reponse: 'Aspect SÉQUELLAIRE (syndrome post-thrombotique) : thrombus rétracté échogène, paroi épaissie, reflux. Le distinguer d\'une TVP aiguë (thrombus mou anéchogène, veine dilatée) évite d\'anticoaguler à tort. Comparer à un examen antérieur si possible.' },
    { titre: 'Pas de flux couleur', enonce: 'Aucun flux couleur dans la veine fémorale ; la PRF et le filtre mural sont réglés haut.', questions: ['Que faites-vous avant de conclure ?'], reponse: 'Baisser la PRF et le filtre mural (flux veineux lents), refaire une manœuvre d\'augmentation et surtout vérifier la COMPRESSIBILITÉ en B-mode, qui reste le critère diagnostique de référence.' },
    { titre: 'Mollet douloureux post-effort', enonce: 'Douleur brutale du mollet après un effort sportif. En transverse, collection anéchogène intramusculaire, veines profondes compressibles, flux normal.', questions: ['TVP ?', 'Diagnostic le plus probable ?'], reponse: 'Pas de TVP (veines compressibles). Il s\'agit probablement d\'une déchirure musculaire avec hématome. Penser aux diagnostics différentiels de la « grosse jambe ».' },
    { titre: 'Kyste poplité', enonce: 'Douleur et tuméfaction du creux poplité, œdème du mollet. Formation kystique anéchogène communiquant avec l\'articulation ; veines compressibles.', questions: ['TVP ?', 'Diagnostic ?'], reponse: 'Veines compressibles → pas de TVP. Il s\'agit d\'un kyste de Baker (poplité), éventuellement rompu, qui mime une TVP. L\'échographie redresse le diagnostic.' }
  ],
  pieges: [
    'Dénomination « fémorale superficielle » : c\'est une veine PROFONDE → une thrombose y est une TVP à traiter, pas une TVS.',
    'Thrombus récent ANÉCHOGÈNE manqué si on ne comprime pas : la lumière noire n\'exclut pas une TVP.',
    'Compression INSUFFISANTE → fausse non-compressibilité (fausse TVP). Repère : déformer légèrement l\'artère voisine.',
    'Comprimer en longitudinal au lieu de transverse → la veine glisse hors du plan.',
    'Veine fémorale DUPLIQUÉE : un canal thrombosé manqué si on ne comprime pas les deux.',
    'Segment du canal de Hunter difficile d\'accès → thrombus fémoral distal manqué.',
    'TVP iliaque/VCI manquée : devant un œdème de TOUTE la jambe, explorer en haut (phasicité, Valsalva, sonde convexe).',
    'Gain trop élevé → faux thrombus dans une veine en réalité compressible et perméable.',
    'TVP distale isolée (jambière/musculaire) facilement manquée si protocole proximal seul.',
    'PRF/filtre trop hauts → faux « pas de flux » ; toujours revenir à la compressibilité B-mode.'
  ],
  flashcards: [
    { q: 'Quel est le signe MAJEUR de TVP en échographie ?', r: 'La veine NON compressible (ne s\'écrase pas paroi à paroi sous pression douce, en coupe transverse).' },
    { q: 'Pourquoi une lumière noire n\'exclut-elle pas une TVP ?', r: 'Un thrombus récent est souvent anéchogène/invisible en B-mode ; seule la compression le démasque.' },
    { q: 'La « veine fémorale superficielle » est-elle superficielle ?', r: 'Non : c\'est une veine PROFONDE ; sa thrombose est une TVP à anticoaguler.' },
    { q: 'Que sont les 4 qualités du flux veineux normal ?', r: 'Spontané, phasique (respiration), augmentable (chasse distale), modulable au Valsalva.' },
    { q: 'Que signifie une perte de phasicité à la VFC avec compression fémoro-poplitée normale ?', r: 'Une obstruction d\'AMONT (TVP iliaque/cave) — explorer l\'étage iliaque/VCI.' },
    { q: 'Quelle TVS est à risque d\'extension ?', r: 'Une thrombose saphène proche de la jonction (≤ 3 cm) ou étendue → risque de passage au réseau profond.' },
    { q: 'Quels sont les 2 points de l\'écho-compression « 2 points » ?', r: 'Veine fémorale commune et veine poplitée.' }
  ],
  qcm: [
    { q: 'Le critère diagnostique central de la TVP en échographie est :', options: ['Une VPS élevée', 'La non-compressibilité de la veine', 'Un aliasing couleur', 'Une diastole nulle'], correct: 1, exp: 'La TVP se diagnostique sur la non-compressibilité en coupe transverse (B-mode), pas sur une vitesse.' },
    { q: 'Une thrombose de la veine fémorale (« superficielle ») est :', options: ['Une TVS sans gravité', 'Une TVP proximale à anticoaguler', 'Un reflux saphène', 'Un artefact de gain'], correct: 1, exp: 'Malgré son nom, la veine fémorale est PROFONDE → TVP proximale, anticoagulation curative.' },
    { q: 'Devant une forte probabilité clinique (Wells), des D-dimères négatifs :', options: ['Excluent la TVP', 'Ne suffisent pas à exclure la TVP → échographie', 'Imposent un scanner', 'Confirment la TVP'], correct: 1, exp: 'En probabilité forte, on réalise l\'échographie d\'emblée ; les D-dimères ne suffisent pas à exclure.' },
    { q: 'Un œdème de toute la jambe avec compression fémoro-poplitée normale doit faire :', options: ['Conclure à l\'absence de TVP', 'Explorer l\'étage iliaque/VCI', 'Mesurer l\'IMT', 'Augmenter le gain'], correct: 1, exp: 'Un thrombus iliaque/cave n\'est pas accessible à la compression : rechercher une perte de phasicité et explorer en haut (sonde convexe).' }
  ],
  refs: ['DIU Montpellier (écho-Doppler veineux des MI) ; SFMV — recommandations sur le diagnostic et la prise en charge de la TVP ; ESVS guidelines (maladie veineuse) ; HAS (TVP / maladie thrombo-embolique veineuse).']
});

})();
