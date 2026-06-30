/* ÉCHO-VASC DIU — Membres inférieurs artériel (AOMI) */
window.VASC = window.VASC || { chapters: [] };

(function () {
  const SVG_MIA_1 = `<svg viewBox="0 0 460 280" role="img" aria-label="Cartographie artérielle du membre inférieur">
<rect width="460" height="280" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Axe artériel du membre inférieur</text>
<line x1="140" y1="30" x2="140" y2="60" stroke="#dc2626" stroke-width="10"/>
<text x="160" y="44" font-size="10" fill="#991b1b">Iliaque externe</text>
<line x1="140" y1="60" x2="140" y2="95" stroke="#dc2626" stroke-width="11"/>
<text x="160" y="80" font-size="10" fill="#991b1b">Fémorale commune (AFC)</text>
<circle cx="140" cy="95" r="4" fill="#7c3aed"/>
<text x="160" y="98" font-size="9" fill="#7c3aed">Bifurcation fémorale</text>
<line x1="140" y1="95" x2="120" y2="160" stroke="#dc2626" stroke-width="6"/>
<text x="20" y="135" font-size="10" fill="#991b1b">Fémorale profonde</text>
<line x1="140" y1="95" x2="160" y2="170" stroke="#dc2626" stroke-width="8"/>
<text x="180" y="135" font-size="10" fill="#991b1b">Fémorale superficielle (AFS)</text>
<text x="180" y="150" font-size="9" fill="#b45309">→ canal de Hunter (adducteur)</text>
<line x1="160" y1="170" x2="155" y2="205" stroke="#dc2626" stroke-width="8"/>
<text x="180" y="190" font-size="10" fill="#991b1b">Poplitée</text>
<circle cx="155" cy="205" r="3" fill="#7c3aed"/>
<text x="180" y="208" font-size="9" fill="#7c3aed">Trépied jambier</text>
<line x1="155" y1="205" x2="120" y2="265" stroke="#dc2626" stroke-width="5"/>
<text x="20" y="240" font-size="9" fill="#991b1b">Tibiale ant.</text>
<text x="20" y="252" font-size="8" fill="#b45309">(avant membrane interosseuse)</text>
<line x1="155" y1="205" x2="155" y2="265" stroke="#dc2626" stroke-width="5"/>
<text x="135" y="278" font-size="9" fill="#991b1b">Fibulaire</text>
<line x1="155" y1="205" x2="195" y2="265" stroke="#dc2626" stroke-width="5"/>
<text x="200" y="252" font-size="9" fill="#991b1b">Tibiale post.</text>
<text x="290" y="60" font-size="10" fill="#0b2f63">Trépied =</text>
<text x="290" y="76" font-size="9" fill="#0b2f63">tronc tibio-péronier →</text>
<text x="290" y="90" font-size="9" fill="#0b2f63">tibiale post. + fibulaire,</text>
<text x="290" y="104" font-size="9" fill="#0b2f63">tibiale ant. séparée.</text>
<text x="290" y="130" font-size="9" fill="#0f766e">Pédieuse = prolongement</text>
<text x="290" y="144" font-size="9" fill="#0f766e">de la tibiale ant. au pied.</text>
</svg>`;

  const SVG_MIA_2 = `<svg viewBox="0 0 460 210" role="img" aria-label="Profils spectraux artériels du membre inférieur">
<rect width="460" height="210" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Triphasique (normal, repos — haute résistance)</text>
<line x1="20" y1="55" x2="220" y2="55" stroke="#cbd5e1"/>
<path d="M20,55 L40,18 L60,55 L70,70 L80,55 L100,49 L120,55 L140,18 L160,55 L170,70 L180,55" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="8" y="100" font-size="11" font-weight="bold" fill="#0b2f63">Monophasique amorti (aval de sténose serrée)</text>
<line x1="20" y1="150" x2="220" y2="150" stroke="#cbd5e1"/>
<path d="M20,150 C55,120 90,118 130,124 C170,130 195,142 215,148" fill="none" stroke="#d97706" stroke-width="1.8"/>
<text x="250" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Sténose serrée (aliasing, VPS↑↑)</text>
<line x1="250" y1="95" x2="450" y2="95" stroke="#cbd5e1"/>
<path d="M250,95 L272,22 L300,95 M300,95 L322,22 L350,95" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="250" y="135" font-size="11" font-weight="bold" fill="#0b2f63">Parvus-tardus (montée lente, pic émoussé)</text>
<line x1="250" y1="190" x2="450" y2="190" stroke="#cbd5e1"/>
<path d="M250,190 C290,172 320,170 360,172 C400,174 425,186 450,188" fill="none" stroke="#7c3aed" stroke-width="1.8"/>
</svg>`;

  window.VASC.chapters.push({
    id: 'mi-arteriel', num: 30, groupe: 'Artériel — Membres', emoji: '🦵',
    titre: 'Membres inférieurs — artériel (AOMI)',
    sonde: 'Linéaire 5–9 MHz superficiel + convexe pour iliaque/proximal', niveau: 'DIU → expert', duree: '≈3 h',
    resume: 'Cartographie hémodynamique de l\'axe artériel du membre inférieur, de la fémorale commune au trépied jambier et à la pédieuse : dépistage et quantification de l\'AOMI athéromateuse, recherche d\'occlusion de l\'AFS, d\'anévrisme poplité et de causes non athéromateuses. Examen guidé par la clinique (claudication, ischémie critique) et complété par l\'IPS.',
    tags: 'AOMI fémorale AFS poplitée trépied jambier triphasique monophasique parvus-tardus rapport de vitesses PVR IPS ABI anévrisme poplité endofibrose Buerger piège poplité ischémie critique claudication',
    objectifs: [
      'Décrire la cartographie artérielle complète du membre inférieur (AFC, bifurcation, AFS au canal de Hunter, fémorale profonde, poplitée, trépied jambier, pédieuse).',
      'Reconnaître le profil triphasique normal de repos et son passage en monophasique en aval d\'une sténose serrée ou à l\'effort.',
      'Identifier les profils d\'aval de sténose : parvus-tardus, monophasique amorti, démodulé.',
      'Quantifier une sténose par la VPS au site et le rapport de vitesses (PVR) et distinguer sténose serrée d\'une occlusion.',
      'Diagnostiquer les principales pathologies : AOMI athéromateuse, occlusion de l\'AFS, anévrisme poplité, endofibrose iliaque, maladie de Buerger, embolie, piège poplité.',
      'Interpréter l\'IPS/ABI et le TBI en complément, et reconnaître la médiacalcose.',
      'Rédiger un compte-rendu de cartographie AOMI standardisé (normal et pathologique).'
    ],
    anatomie: {
      texte: 'L\'iliaque externe se poursuit sous l\'arcade crurale par la fémorale commune (AFC), courte, qui se divise en fémorale profonde (artère de la cuisse, principale collatérale en cas d\'occlusion de l\'AFS) et fémorale superficielle (AFS). L\'AFS descend à la cuisse et traverse le canal des adducteurs (canal de Hunter), site privilégié de sténose/occlusion, pour devenir la poplitée. La poplitée se divise en trépied jambier : tronc tibio-péronier (donnant la tibiale postérieure et la fibulaire/péronière) et tibiale antérieure, qui passe en avant de la membrane interosseuse vers la loge antérieure et se prolonge en pédieuse au dos du pied.',
      svg: SVG_MIA_1,
      caption: 'Schéma : AFC → bifurcation en fémorale profonde et AFS → canal de Hunter → poplitée → trépied jambier (tronc tibio-péronier donnant tibiale postérieure et fibulaire ; tibiale antérieure séparée passant en avant de la membrane interosseuse) → pédieuse.',
      vascularisation: 'Le membre inférieur est un lit de haute résistance au repos (muscle). La fémorale profonde est la grande voie de suppléance : en cas d\'occlusion de l\'AFS, elle réalimente la poplitée par des collatérales (réseau du genou).',
      rapports: ['AFC : sous l\'arcade crurale, latérale à la veine fémorale commune (NAVL : nerf-artère-veine-lymphatiques, de dehors en dedans)', 'AFS : dans le canal des adducteurs (Hunter) au tiers inférieur de la cuisse, profonde, sous le sartorius', 'Poplitée : creux poplité, profonde, accolée à la veine poplitée (abord en décubitus ventral)', 'Trépied jambier : tibiale postérieure rétro-malléolaire interne ; pédieuse en regard du 1er espace intermétatarsien'],
      variantes: ['Bifurcation fémorale haute ou basse', 'Trifurcation jambière vraie (absence de tronc tibio-péronier)', 'Pédieuse hypoplasique ou absente (suppléance par la tibiale postérieure)', 'Origine haute de la tibiale antérieure']
    },
    physiologie: {
      texte: 'Au repos, le lit musculaire du membre inférieur est à HAUTE RÉSISTANCE : le spectre artériel est triphasique (pic systolique aigu, reflux protodiastolique inversé, faible flux antérograde télédiastolique). À l\'effort, la vasodilatation musculaire abaisse la résistance d\'aval : le flux devient monophasique avec montée de la diastole — c\'est physiologique. En PATHOLOGIE, le passage en monophasique amorti au repos signe une sténose serrée d\'amont ou une occlusion réalimentée par collatérales.',
      profils: [
        { nom: 'Triphasique (normal de repos)', desc: 'Haute résistance : systole aiguë + reflux protodiastolique + faible flux télédiastolique. Présent sur tout l\'axe sain au repos.' },
        { nom: 'Monophasique à l\'effort (physiologique)', desc: 'Après exercice, la vasodilatation efface le reflux et remplit la diastole : monophasique normal. Ne pas confondre avec un monophasique pathologique de repos.' },
        { nom: 'Monophasique amorti (pathologique)', desc: 'Au repos : perte du reflux, flux antérograde permanent, pic arrondi → sténose serrée d\'amont ou aval d\'occlusion collatéralisée.' },
        { nom: 'Parvus-tardus', desc: 'Amorti avec ascension systolique lente (temps de montée allongé) et pic émoussé : signe une sténose serrée d\'AMONT (ex. aval d\'une occlusion iliaque ou de l\'AFS).' },
        { nom: 'Démodulé', desc: 'Flux très amorti, quasi continu, sans modulation : axe gravement compromis (occlusions étagées, ischémie).' }
      ]
    },
    physique: {
      intro: 'Territoire mixte : superficiel à la cuisse et au mollet, profond pour l\'iliaque et la poplitée. Adapter sonde, PRF et angle à chaque segment.',
      points: [
        { titre: 'Sonde & fréquence', desc: 'Linéaire 5–9 MHz pour l\'AFC, l\'AFS, la poplitée et le trépied jambier. Convexe 2–5 MHz pour l\'iliaque, le carrefour aorto-iliaque et les sujets obèses ou la poplitée profonde.' },
        { titre: 'Angle & PRF', desc: 'Angle ≤ 60° aligné sur la paroi pour les vitesses. PRF élevée sur sténose (vitesses majorées), PRF/filtre bas sur le trépied jambier (flux lents) et pour confirmer une occlusion.' },
        { titre: 'Reflux protodiastolique', desc: 'Régler la ligne de base pour bien afficher la composante inversée du triphasique : sa disparition est un signe diagnostique majeur, ne pas la masquer par un filtre trop haut.' }
      ]
    },
    reglages: {
      intro: 'Réglages types pour la cartographie AOMI.',
      lignes: [
        { param: 'Sonde', valeur: 'Linéaire 5–9 MHz ; convexe iliaque/profond', note: 'Convexe si obèse ou poplitée profonde' },
        { param: 'Profondeur', valeur: 'Adaptée segment par segment', note: 'Iliaque/poplitée plus profondes' },
        { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Critique pour VPS et rapport' },
        { param: 'PRF / échelle', valeur: 'Haute sur sténose, basse au trépied', note: 'Flux lents distaux' },
        { param: 'Ligne de base', valeur: 'Afficher le reflux protodiastolique', note: 'Sa perte = signe d\'aval de sténose' },
        { param: 'Filtre mural', valeur: 'Bas pour flux lents distaux', note: 'Haut = fausse occlusion jambière' },
        { param: 'Mode énergie', valeur: 'Trépied, recherche d\'occlusion', note: 'Sensible, peu angle-dépendant' }
      ]
    },
    installation: {
      patient: 'Décubitus dorsal, membre en légère rotation externe et genou un peu fléchi pour l\'AFC, l\'AFS et le trépied antérieur. Poplitée : décubitus ventral, ou genou fléchi/décubitus latéral. Trépied postérieur : rotation externe, sonde rétro-malléolaire interne.',
      operateur: 'Assis au côté du patient, avant-bras en appui ; régler la hauteur du lit pour chaque segment.',
      ecran: 'Dans l\'axe du regard, lumière tamisée.',
      sonde: 'Balayage transverse pour suivre l\'axe, puis longitudinal pour les mesures de vitesse.',
      ergonomie: 'Stabiliser la sonde avec l\'auriculaire en appui ; alterner les positions pour la poplitée et le trépied afin de ne pas forcer l\'épaule.'
    },
    acquisition: {
      etapes: [
        { titre: 'AFC et bifurcation', desc: 'Sous l\'arcade crurale : repérer l\'AFC (médiale, profonde par rapport à la veine), B-mode + couleur, VPS de référence. Identifier la bifurcation en fémorale profonde et AFS.' },
        { titre: 'AFS à la cuisse jusqu\'au canal de Hunter', desc: 'Suivre l\'AFS de haut en bas, couleur pour repérer accélération/aliasing ; insister sur le canal des adducteurs (Hunter), site fréquent de sténose/occlusion souvent manqué.' },
        { titre: 'Fémorale profonde', desc: 'Contrôler son origine (collatérale majeure) : sa perméabilité conditionne la suppléance en cas d\'occlusion de l\'AFS.' },
        { titre: 'Poplitée', desc: 'En décubitus ventral ou genou fléchi : suivre la poplitée, mesurer son diamètre (recherche d\'anévrisme), couleur + pulsé.' },
        { titre: 'Trépied jambier', desc: 'Tronc tibio-péronier puis tibiale postérieure (rétro-malléolaire interne), fibulaire et tibiale antérieure (loge antérieure) ; PRF/filtre bas, mode énergie si besoin.' },
        { titre: 'Pédieuse + segment par segment', desc: 'Pédieuse au dos du pied. Documenter VPS et profil spectral à chaque étage (de proximal à distal) pour localiser le niveau lésionnel.' }
      ],
      reperes: ['AFC médiale et profonde par rapport à la veine fémorale (NAVL)', 'Canal de Hunter au tiers inférieur de la cuisse, sous le sartorius', 'Poplitée accolée à la veine poplitée dans le creux', 'Tibiale postérieure rétro-malléolaire interne ; pédieuse au 1er espace intermétatarsien'],
      astuces: ['Cartographier toujours de PROXIMAL à DISTAL, segment par segment, en notant le profil spectral à chaque étage.', 'Un parvus-tardus en un point oblige à remonter chercher la lésion d\'amont.', 'Mesurer le diamètre de la poplitée systématiquement (anévrisme souvent silencieux et bilatéral).', 'Coupler à l\'IPS et, si médiacalcose, à la pression d\'orteil/TBI.'],
      erreurs: ['Manquer une sténose de l\'AFS au canal de Hunter (segment souvent survolé).', 'Ne pas faire le rapport de vitesses (PVR) et se contenter de la VPS absolue.', 'Filtre/PRF trop hauts au trépied → fausse occlusion d\'un flux lent.', 'Confondre veine et artère (mode pulsé : artère pulsatile, veine phasique respiratoire).', 'Oublier de mesurer le diamètre poplité.']
    },
    interpretation: {
      normal: ['Parois fines, lumière anéchogène, flux laminaire', 'Profil TRIPHASIQUE de repos sur tout l\'axe', 'VPS homogènes décroissant de proximal à distal, pas d\'accélération focale', 'Poplitée de calibre normal (< ~10 mm)'],
      pathologique: ['Accélération focale + aliasing avec VPS↑ et PVR > 2 = sténose ; PVR > 4 = serrée', 'Monophasique amorti / parvus-tardus en aval = sténose serrée ou occlusion d\'amont', 'Absence de flux (couleur + énergie) avec reprise collatérale = occlusion', 'Dilatation focale de la poplitée ≥ 2x le segment d\'amont ou > 10–15 mm = anévrisme', 'Flux démodulé étagé = atteinte plurifocale sévère'],
      svgPatho: SVG_MIA_2,
      capPatho: 'Profils types AOMI : triphasique normal, monophasique amorti d\'aval, sténose serrée (aliasing/VPS↑↑), parvus-tardus.'
    },
    valeurs: {
      intro: 'Repères vélocimétriques et indices de pression. Le rapport de vitesses (PVR = VPS au site / VPS en amont normal) est le critère de quantification clé ; les seuils sont à adapter au laboratoire.',
      lignes: [
        { param: 'Profil normal de repos', valeur: 'Triphasique', note: 'Haute résistance ; reflux protodiastolique présent' },
        { param: 'Sténose < 50 %', valeur: 'PVR < 2, pas d\'accélération marquée', note: 'VPS quasi inchangée, profil conservé' },
        { param: 'Sténose > 50 %', valeur: 'PVR > 2 (doublement de la VPS)', note: 'Aliasing, élargissement spectral' },
        { param: 'Sténose serrée', valeur: 'PVR > 4', note: 'VPS très élevée + parvus-tardus d\'aval' },
        { param: 'Occlusion', valeur: 'Absence de flux + reprise collatérale', note: 'Vérifier à PRF/filtre bas + énergie' },
        { param: 'Anévrisme poplité', valeur: '≥ 2x le segment normal ou > 10–15 mm', note: 'Souvent bilatéral, associé à AAA ; risque thrombo-embolique' },
        { param: 'IPS/ABI normal', valeur: '0,90–1,30', note: 'PA cheville / PA bras la plus élevée' },
        { param: 'IPS < 0,90', valeur: 'AOMI', note: '< 0,40 : ischémie sévère/critique' },
        { param: 'IPS > 1,30', valeur: 'Médiacalcose', note: 'Incompressibilité (diabète, IRC) → mesurer le TBI' },
        { param: 'TBI (orteil/bras)', valeur: 'Normal > 0,70', note: 'Pression d\'orteil utile si médiacalcose' }
      ]
    },
    pathologies: [
      { nom: 'AOMI athéromateuse', physiopath: 'Plaques athéromateuses sténosantes/occlusives, souvent étagées, terrain de FRCV', bmode: 'Plaques, calcifications, réduction de calibre', doppler: 'VPS↑ focale + PVR > 2 (> 4 si serrée), aliasing ; monophasique amorti / parvus-tardus d\'aval', ddx: 'Causes non athéromateuses (Buerger, endofibrose, piège poplité)', pieges: 'Manquer une sténose de l\'AFS au Hunter ; ne pas faire le PVR ; médiacalcose faussant l\'IPS', gravite: 'Claudication intermittente (Leriche-Fontaine II / Rutherford) → ischémie critique chronique (douleur de décubitus, troubles trophiques, gangrène) = urgence de revascularisation', cat: 'Cartographie complète + PVR + IPS/TBI ; corréler au stade clinique ; angio-TDM/IRM et avis si revascularisation envisagée' },
      { nom: 'Occlusion de l\'AFS (canal de Hunter)', physiopath: 'Localisation très fréquente de l\'AOMI ; thrombose sur plaque au canal des adducteurs', bmode: 'Lumière comblée, parfois recanalisée', doppler: 'Absence de flux dans l\'AFS, reprise de la poplitée par les collatérales de la fémorale profonde, poplitée à profil amorti/parvus-tardus', ddx: 'Sténose serrée pré-occlusive', pieges: 'Segment souvent survolé ; conclure occlusion sans PRF/filtre bas', gravite: 'Souvent bien tolérée (collatéralité profonde) → claudication ; mal tolérée si profonde altérée', cat: 'Vérifier la fémorale profonde (suppléance), cartographier l\'aval, IPS ; avis selon retentissement' },
      { nom: 'Anévrisme poplité', physiopath: 'Dilatation focale de la poplitée (≥ 2x le segment normal ou > 10–15 mm)', bmode: 'Dilatation, thrombus mural fréquent', doppler: 'Flux tourbillonnaire, ± réduction de la lumière circulante', ddx: 'Kyste de Baker (anéchogène, sans flux)', pieges: 'Souvent BILATÉRAL et associé à un anévrisme de l\'aorte (AAA) — toujours explorer l\'autre côté et l\'aorte ; risque principal THROMBO-EMBOLIQUE (pas la rupture)', gravite: 'Risque d\'ischémie aiguë par thrombose/embolie distale', cat: 'Mesurer diamètre, rechercher thrombus, explorer poplitée controlatérale + aorte ; avis chirurgical selon taille/thrombus/symptômes' },
      { nom: 'Endofibrose iliaque externe', physiopath: 'Épaississement fibreux non athéromateux de l\'iliaque externe chez le cycliste de haut niveau (microtraumatismes répétés)', bmode: 'Épaississement pariétal, parfois allongement/plicature de l\'artère', doppler: 'Sténose hémodynamique surtout démasquée à l\'effort / en flexion de hanche ; chute de l\'IPS post-effort', ddx: 'AOMI athéromateuse (terrain différent : sujet jeune sportif sans FRCV)', pieges: 'Examen de repos souvent normal → tester après effort et en position de course/flexion', gravite: 'Limite la performance ; rarement menaçante', cat: 'Doppler + IPS de repos ET d\'effort, manœuvres positionnelles ; avis spécialisé (chirurgie du sportif)' },
      { nom: 'Maladie de Buerger (thromboangéite oblitérante)', physiopath: 'Vascularite inflammatoire non athéromateuse des artères distales, homme jeune gros fumeur', bmode: 'Artères distales (jambe/pied, membres sup. aussi) ; segments proximaux sains', doppler: 'Occlusions distales segmentaires, collatérales « en tire-bouchon », axes proximaux normaux', ddx: 'Embolies, AOMI athéromateuse, sclérodermie', pieges: 'Atteinte distale et des membres supérieurs ; lien majeur au tabac', gravite: 'Ischémie distale, troubles trophiques, risque d\'amputation', cat: 'Sevrage tabagique impératif ; cartographie distale ; avis spécialisé' },
      { nom: 'Ischémie aiguë (embolie/thrombose)', physiopath: 'Occlusion brutale (embolie cardiaque/anévrismale ou thrombose aiguë sur plaque ou anévrisme poplité)', bmode: 'Matériel endoluminal, arrêt net du flux', doppler: 'Absence de flux d\'aval, flux pré-occlusif en « coup de bélier » ; aval démodulé/absent', ddx: 'Thrombose veineuse (phlegmatia), ischémie chronique décompensée', pieges: 'Urgence : ne pas retarder par l\'imagerie ; chercher la source (anévrisme poplité, cœur)', gravite: 'Urgence absolue — les 6 P : Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poïkilothermie (froideur)', cat: 'Revascularisation urgente (héparine, avis chir/radio interventionnelle) ; rechercher la source embolique' },
      { nom: 'Piège poplité (artère poplitée piégée)', physiopath: 'Compression de la poplitée par une anomalie d\'insertion musculo-tendineuse (gastrocnémien médial), sujet JEUNE sportif', bmode: 'Trajet anormal de la poplitée, parfois lésion pariétale chronique', doppler: 'Flux normal au repos mais sténose/occlusion DYNAMIQUE lors de la flexion plantaire active / extension dorsale contrariée', ddx: 'Anévrisme poplité, endofibrose, AOMI', pieges: 'Examen de repos normal → réaliser des MANŒUVRES DYNAMIQUES (flexion/extension dorsale contre résistance)', gravite: 'Lésion artérielle chronique possible (sténose, anévrisme post-sténotique, thrombose)', cat: 'Doppler dynamique avec manœuvres ; angio-TDM/IRM en position provoquée ; avis chirurgical' }
    ],
    algorithme: {
      titre: 'Conduite devant une claudication intermittente',
      noeuds: [
        { q: 'Claudication + abolition de pouls ?', a: 'Cartographie artérielle complète de proximal à distal + IPS' },
        { q: 'IPS < 0,90 ?', a: 'AOMI confirmée → localiser le niveau (parvus-tardus = lésion d\'amont)' },
        { q: 'Accélération focale ?', a: 'Mesurer VPS + rapport de vitesses (PVR) : > 2 = sténose > 50 %, > 4 = serrée' },
        { q: 'Absence de flux + reprise collatérale ?', a: 'Occlusion → vérifier à PRF/filtre bas, énergie ; contrôler la fémorale profonde' },
        { q: 'IPS > 1,30 (médiacalcose) ?', a: 'Mesurer la pression d\'orteil / TBI (normal > 0,70)' },
        { q: 'Douleur de décubitus / troubles trophiques ?', a: 'Ischémie critique chronique → urgence de revascularisation (angio-TDM/IRM + avis)' }
      ]
    },
    cr: {
      normal: `ÉCHO-DOPPLER ARTÉRIEL DES MEMBRES INFÉRIEURS

Indication : [claudication / abolition de pouls / bilan FRCV / surveillance].
Technique : sonde linéaire (± convexe pour l'iliaque), mode B + Doppler couleur et pulsé, cartographie de proximal à distal.

Axes iliaques : perméables, flux triphasique.
Fémorales communes : parois fines, flux triphasique, VPS D __ / G __ cm/s.
Fémorales profondes et superficielles (jusqu'au canal de Hunter) : perméables, sans sténose, flux triphasique.
Poplitées : perméables, calibre normal (< 10 mm), flux triphasique.
Trépieds jambiers (tibiale ant., tibiale post., fibulaire) et pédieuses : perméables, flux conservé.
IPS : D __ / G __ (normal 0,90–1,30).

CONCLUSION : Axes artériels des membres inférieurs perméables, flux triphasique sur tout l'axe, sans sténose significative ni anévrisme. IPS normal.`,
      pathologique: `ÉCHO-DOPPLER ARTÉRIEL DES MEMBRES INFÉRIEURS

Indication : [claudication __ mètres / douleur de décubitus / trouble trophique].
Technique : sonde linéaire (± convexe), mode B + Doppler couleur et pulsé, cartographie segmentaire.

Iliaques : __.
Fémorale commune [côté] : __.
AFS [côté] : sténose au canal de Hunter, VPS __ cm/s, rapport de vitesses (PVR) __ → sténose estimée > __ % ; OU occlusion avec reprise de la poplitée par collatérales de la fémorale profonde.
Poplitée [côté] : flux monophasique amorti / parvus-tardus en aval ; diamètre __ mm [anévrisme si dilaté].
Trépied jambier : __ axe(s) perméable(s) jusqu'à la cheville.
IPS : D __ / G __ ; [TBI __ si médiacalcose (IPS > 1,30)].

CONCLUSION : AOMI [côté] avec [sténose serrée / occlusion] de [segment], retentissement d'aval [monophasique/parvus-tardus]. Stade clinique : [Leriche-Fontaine __ / Rutherford __].
[Proposition : angio-TDM/IRM et avis chirurgical vasculaire selon stade et retentissement ; contrôle des FRCV, marche, traitement médical.]`
    },
    cas: [
      { titre: 'Claudication du mollet', enonce: 'Homme 64 ans, tabagique, claudication du mollet à 200 m. AFC triphasique, AFS triphasique jusqu\'au tiers inférieur de cuisse.', questions: ['Où concentrer l\'examen ?', 'Quel signe d\'aval chercher ?'], indices: ['Site fréquent de l\'AOMI', 'Profil de la poplitée'], reponse: 'Insister sur l\'AFS au canal de Hunter (site fréquent souvent manqué) puis la poplitée : chercher un monophasique amorti / parvus-tardus en aval, qui localise la sténose/occlusion d\'amont.' },
      { titre: 'Rapport de vitesses', enonce: 'Au canal de Hunter, accélération focale avec aliasing. VPS amont normale 80 cm/s, VPS au site 200 cm/s.', questions: ['Calculez le PVR.', 'Quelle sévérité ?'], reponse: 'PVR = 200/80 = 2,5 → > 2 donc sténose > 50 %. Au-delà de 4 elle serait serrée. Toujours rapporter la VPS au site à la VPS amont, pas seulement la valeur absolue.' },
      { titre: 'AFS occluse bien tolérée', enonce: 'Pas de flux dans l\'AFS sur toute la cuisse ; la poplitée présente un flux amorti reconstitué.', questions: ['Quelle structure assure la suppléance ?', 'Que vérifier ?'], reponse: 'La fémorale profonde via ses collatérales (réseau du genou) réalimente la poplitée. Vérifier sa perméabilité : c\'est elle qui explique la tolérance (claudication plutôt qu\'ischémie critique).' },
      { titre: 'Faux « pas de flux » jambier', enonce: 'Aucun flux couleur dans la tibiale postérieure ; PRF et filtre sont réglés haut.', questions: ['Avant de conclure à une occlusion, que faites-vous ?'], reponse: 'Baisser PRF et filtre mural, passer en Doppler énergie : les flux jambiers sont lents et facilement effacés par des réglages trop hauts (fausse occlusion).' },
      { titre: 'Masse poplitée pulsatile', enonce: 'Dilatation focale de la poplitée à 18 mm avec thrombus mural.', questions: ['Diagnostic ?', 'Quels examens associés ?', 'Risque principal ?'], indices: ['Bilatéralité', 'Aorte'], reponse: 'Anévrisme poplité. Explorer la poplitée controlatérale (souvent bilatéral) ET l\'aorte abdominale (association AAA). Risque principal : thrombo-embolique (ischémie aiguë), pas la rupture.' },
      { titre: 'Cycliste à la cuisse', enonce: 'Cycliste de 28 ans, douleur de cuisse/fesse à l\'effort intense, examen de repos normal.', questions: ['Diagnostic à évoquer ?', 'Comment le démasquer ?'], reponse: 'Endofibrose de l\'iliaque externe. Examen de repos souvent normal : tester après effort et en flexion de hanche / position de course, mesurer la chute de l\'IPS post-effort.' },
      { titre: 'IPS « rassurant » chez un diabétique', enonce: 'Diabétique avec ulcère du pied, pouls non perçus, mais IPS à 1,4.', questions: ['Comment interpréter l\'IPS ?', 'Quelle mesure faire ?'], reponse: 'IPS > 1,30 = médiacalcose (artères incompressibles) → IPS non fiable, faussement rassurant. Mesurer la pression d\'orteil et le TBI (normal > 0,70), explorer la cartographie distale.' },
      { titre: 'Pied froid et blanc brutal', enonce: 'Apparition brutale d\'un pied froid, pâle, douloureux, sans pouls, chez un patient en AC/FA.', questions: ['Diagnostic ?', 'Quels signes sémiologiques ?', 'Conduite ?'], reponse: 'Ischémie aiguë embolique (source cardiaque, FA). Les 6 P : Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poïkilothermie. Urgence : héparine, avis chir/radiologie interventionnelle ; ne pas retarder par l\'imagerie.' },
      { titre: 'Sportif jeune, claudication du mollet', enonce: 'Coureur de 24 ans, claudication du mollet ; poplitée normale au repos mais flux qui s\'effondre en flexion plantaire active.', questions: ['Diagnostic ?', 'Quelle manœuvre l\'a révélé ?'], reponse: 'Piège poplité (artère poplitée piégée). Le Doppler dynamique (flexion plantaire active / extension dorsale contrariée) démasque la sténose/occlusion positionnelle, absente au repos.' },
      { titre: 'Douleur de décubitus', enonce: 'Patient avec douleur du pied la nuit calmée jambe pendante, et un orteil noir. Occlusions étagées au Doppler, flux distal démodulé.', questions: ['À quel stade est-on ?', 'Quel degré d\'urgence ?'], reponse: 'Ischémie critique chronique (douleur de décubitus + trouble trophique, Leriche-Fontaine III–IV / Rutherford 4–6). Urgence de revascularisation : angio-TDM/IRM et avis chirurgical sans délai.' }
    ],
    pieges: [
      'Manquer une sténose de l\'AFS au canal de Hunter (segment souvent survolé).',
      'Ne pas faire le rapport de vitesses (PVR) et se contenter de la VPS absolue.',
      'Médiacalcose : IPS faussement normal ou élevé (> 1,30) chez le diabétique/IRC → mesurer la pression d\'orteil/TBI.',
      'Filtre/PRF trop hauts au trépied jambier → fausse occlusion d\'un flux lent.',
      'Confondre veine et artère (vérifier la pulsatilité au pulsé).',
      'Angle > 60° → vitesses et PVR surestimés.',
      'Oublier de mesurer le diamètre de la poplitée (anévrisme silencieux, bilatéral, associé à AAA).',
      'Ne pas explorer la poplitée controlatérale et l\'aorte devant un anévrisme poplité.',
      'Conclure à une AOMI athéromateuse chez un sujet jeune sportif sans tester les causes non athéromateuses (endofibrose, piège poplité) avec manœuvres/effort.',
      'Interpréter un monophasique d\'effort comme pathologique (il est physiologique).'
    ],
    flashcards: [
      { q: 'Profil artériel normal du membre inférieur au repos ?', r: 'Triphasique (haute résistance) : systole + reflux protodiastolique + faible flux télédiastolique.' },
      { q: 'Que signifie un PVR (rapport de vitesses) > 2 ? > 4 ?', r: '> 2 = sténose > 50 % (doublement de la VPS) ; > 4 = sténose serrée.' },
      { q: 'Valeurs de l\'IPS : normal, AOMI, médiacalcose ?', r: 'Normal 0,90–1,30 ; < 0,90 = AOMI ; > 1,30 = médiacalcose → mesurer le TBI.' },
      { q: 'Site fréquent de l\'occlusion fémorale superficielle ?', r: 'Le canal des adducteurs (canal de Hunter) ; suppléance par la fémorale profonde.' },
      { q: 'Risque principal de l\'anévrisme poplité ?', r: 'Thrombo-embolique (ischémie aiguë), PAS la rupture ; souvent bilatéral et associé à un AAA.' },
      { q: 'Les 6 P de l\'ischémie aiguë ?', r: 'Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poïkilothermie (froideur).' },
      { q: 'Comment démasquer un piège poplité ?', r: 'Doppler dynamique : manœuvres de flexion plantaire active / extension dorsale contrariée.' }
    ],
    qcm: [
      { q: 'Au canal de Hunter, VPS amont 90 cm/s et VPS au site 380 cm/s. Le rapport de vitesses correspond à :', options: ['Sténose < 50 %', 'Sténose > 50 % non serrée', 'Sténose serrée', 'Occlusion'], correct: 2, exp: 'PVR = 380/90 ≈ 4,2 > 4 → sténose serrée. Chercher un parvus-tardus d\'aval pour confirmer le retentissement.' },
      { q: 'Un IPS à 1,4 chez un diabétique avec ulcère signifie :', options: ['Pas d\'AOMI, rassurant', 'AOMI sévère', 'Médiacalcose, IPS non fiable → mesurer le TBI', 'Anévrisme'], correct: 2, exp: 'IPS > 1,30 = incompressibilité artérielle (médiacalcose) ; l\'IPS est faussement rassurant, mesurer la pression d\'orteil/TBI.' },
      { q: 'Devant un anévrisme poplité, il faut systématiquement :', options: ['Conclure à un risque de rupture', 'Explorer la poplitée controlatérale et l\'aorte', 'Mesurer l\'IMT carotidien', 'Ne rien ajouter'], correct: 1, exp: 'L\'anévrisme poplité est souvent bilatéral et associé à un AAA ; le risque principal est thrombo-embolique.' },
      { q: 'Un flux triphasique devient monophasique au repos en aval d\'une lésion. Cela traduit :', options: ['Un examen normal', 'Une sténose serrée ou une occlusion d\'amont', 'Une médiacalcose', 'Un artefact de PRF'], correct: 1, exp: 'La perte du reflux protodiastolique avec monophasique amorti de repos signe une lésion sténosante/occlusive d\'amont (à distinguer du monophasique physiologique d\'effort).' }
    ],
    refs: ['DIU Montpellier (artériel des membres inférieurs) ; recommandations SFMV ; ESC/ESVS 2024 Guidelines on Peripheral Arterial and Aortic Diseases (PAD) ; HAS — prise en charge de l\'AOMI.']
  });
})();
