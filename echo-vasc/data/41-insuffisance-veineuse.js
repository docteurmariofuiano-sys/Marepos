/* ÉCHO-VASC DIU — Insuffisance veineuse chronique & perforantes (membre inférieur) */
window.VASC = window.VASC || { chapters: [] };

(function () {

const SVG_IV_RESEAU = `<svg viewBox="0 0 460 240" role="img" aria-label="Réseau veineux superficiel du membre inférieur">
<rect width="460" height="240" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Réseau superficiel (face médiale)</text>
<line x1="120" y1="40" x2="120" y2="225" stroke="#0d9488" stroke-width="9"/>
<text x="132" y="120" font-size="11" fill="#0f766e">GVS (grande saphène)</text>
<path d="M120,55 C120,42 132,36 150,36 L210,36" fill="none" stroke="#0d9488" stroke-width="7"/>
<text x="160" y="30" font-size="10" fill="#0f766e">Crosse / JSF</text>
<rect x="208" y="28" width="40" height="170" fill="#fde2e2" stroke="#dc2626"/>
<text x="212" y="190" font-size="9" fill="#991b1b">Veine</text>
<text x="212" y="200" font-size="9" fill="#991b1b">fémorale</text>
<line x1="120" y1="95" x2="208" y2="100" stroke="#7c3aed" stroke-width="4"/>
<text x="135" y="92" font-size="9" fill="#7c3aed">Perforante (Dodd)</text>
<line x1="120" y1="160" x2="208" y2="165" stroke="#7c3aed" stroke-width="4"/>
<text x="130" y="156" font-size="9" fill="#7c3aed">Perforante (Cockett/jambe)</text>
<line x1="118" y1="200" x2="124" y2="200" stroke="#0f766e" stroke-width="2"/>
<text x="14" y="232" font-size="10" fill="#64748b">Flux perforante normal : superficiel → profond (entrant)</text>
</svg>`;

const SVG_IV_OEIL = `<svg viewBox="0 0 460 200" role="img" aria-label="Compartiment saphénien œil égyptien">
<rect width="460" height="200" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">Compartiment saphénien — « œil égyptien »</text>
<path d="M70,120 C70,70 390,70 390,120 C390,150 70,150 70,120 Z" fill="#eef2ff" stroke="#1d4ed8" stroke-width="2"/>
<text x="120" y="95" font-size="10" fill="#1d4ed8">Fascia superficiel (paupière sup.)</text>
<text x="120" y="158" font-size="10" fill="#1d4ed8">Fascia musculaire (paupière inf.)</text>
<ellipse cx="230" cy="120" rx="26" ry="20" fill="none" stroke="#0d9488" stroke-width="3"/>
<text x="218" y="124" font-size="11" fill="#0f766e">GVS</text>
<text x="40" y="190" font-size="10" fill="#64748b">La GVS reste dans son compartiment fascial ; une tributaire « sort » de l'œil.</text>
</svg>`;

const SVG_IV_REFLUX = `<svg viewBox="0 0 460 200" role="img" aria-label="Mesure du reflux veineux au Doppler pulsé">
<rect width="460" height="200" fill="#fff"/>
<text x="10" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Reflux pathologique (patient DEBOUT, manœuvre de chasse)</text>
<line x1="30" y1="100" x2="450" y2="100" stroke="#94a3b8"/>
<text x="4" y="60" font-size="9" fill="#64748b">antérograde</text>
<text x="4" y="150" font-size="9" fill="#64748b">rétrograde</text>
<path d="M30,100 L60,55 L90,100" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="40" y="48" font-size="9" fill="#1d4ed8">chasse</text>
<path d="M90,100 C120,150 200,165 260,150 C300,140 320,120 340,100" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>
<text x="150" y="185" font-size="10" fill="#dc2626">Reflux = flux rétrograde > 0,5 s (superficiel/perforante)</text>
<line x1="90" y1="100" x2="90" y2="175" stroke="#dc2626" stroke-dasharray="3 2"/>
<line x1="340" y1="100" x2="340" y2="175" stroke="#dc2626" stroke-dasharray="3 2"/>
<text x="350" y="60" font-size="10" fill="#0b2f63">> 1 s pour le</text>
<text x="350" y="74" font-size="10" fill="#0b2f63">réseau profond</text>
</svg>`;

window.VASC.chapters.push({
  id: 'insuffisance-veineuse', num: 41, groupe: 'Veineux', emoji: '🦵',
  titre: 'Insuffisance veineuse & perforantes',
  sonde: 'Linéaire 5–9 MHz', niveau: 'DIU → expert', duree: '≈2 h 30',
  resume: 'Exploration de l\'insuffisance veineuse chronique des membres inférieurs : réseaux superficiel (GVS, PVS), jonctions, tributaires et perforantes. Mesure du reflux patient DEBOUT, cartographie pré-opératoire, classification CEAP. Examen technique où l\'installation conditionne le résultat.',
  tags: 'insuffisance veineuse varices reflux GVS PVS crosse JSF JSP perforantes Cockett Dodd Hunter CEAP cartographie débout Valsalva chasse syndrome post-thrombotique récidive',
  objectifs: [
    'Identifier le réseau superficiel (GVS, PVS, crosses/jonctions, tributaires) et le distinguer du réseau profond.',
    'Reconnaître le compartiment saphénien (« œil égyptien ») et mesurer le diamètre de la GVS et de la crosse.',
    'Mesurer correctement le reflux patient DEBOUT et appliquer les seuils de durée (0,5 s superficiel/perforante ; 1 s profond).',
    'Identifier et coter une perforante incontinente (reflux > 0,5 s, diamètre > 3–3,5 mm).',
    'Réaliser une cartographie veineuse pré-opératoire (point de fuite, trajet du reflux, segments compétents/incompétents).',
    'Classer la maladie veineuse selon la classification CEAP (C0–C6).',
    'Reconnaître les principales pathologies : maladie variqueuse essentielle, insuffisance de perforantes, syndrome post-thrombotique, récidive post-opératoire.'
  ],
  anatomie: {
    texte: 'Le réseau veineux du membre inférieur comporte un système PROFOND (sous-aponévrotique : fémorale, poplitée, jambières) et un système SUPERFICIEL (sus-aponévrotique). Les deux sont reliés par les veines PERFORANTES.\nGrande veine saphène (GVS) : naît en avant de la malléole interne, monte sur la face médiale de la jambe et de la cuisse, et se jette dans la veine fémorale commune par la CROSSE (jonction saphéno-fémorale, JSF), au pli inguinal. La GVS chemine dans le COMPARTIMENT SAPHÉNIEN, dédoublure fasciale donnant l\'image en coupe transverse de l\'« œil égyptien ».\nPetite veine saphène (PVS) : naît en arrière de la malléole externe, monte à la face postérieure du mollet et se jette dans la veine poplitée par la jonction saphéno-poplitée (JSP), dont le niveau est variable (piège).\nTributaires : veines superficielles drainant vers les saphènes (souvent extra-fasciales, « hors de l\'œil »).\nPerforantes : traversent l\'aponévrose et relient le superficiel au profond ; flux normal ENTRANT (superficiel → profond). Principales : Dodd (cuisse), Hunter, perforantes de jambe paratibiales et de Cockett (rétro-malléolaires internes, impliquées dans les ulcères).',
    svg: SVG_IV_RESEAU,
    caption: 'Schéma : GVS médiale se jetant dans la fémorale par la crosse (JSF) ; perforantes reliant superficiel et profond (flux normal entrant). La PVS draine vers la poplitée (JSP).',
    vascularisation: 'Le retour veineux se fait du superficiel vers le profond (perforantes) et de la périphérie vers le cœur, sous l\'action de la pompe musculaire du mollet et de valvules anti-reflux. L\'incompétence valvulaire inverse ce sens.',
    rapports: ['GVS dans le compartiment saphénien (œil égyptien), accompagnée du nerf saphène à la jambe', 'PVS accompagnée du nerf sural à la face postérieure du mollet', 'Crosse de la GVS au confluent fémoral (Mickey Mouse inguinal : fémorale commune, GVS, fémorale superficielle/profonde)'],
    variantes: ['Niveau de la JSP très variable (creux poplité, parfois haut situé) — repérage essentiel avant chirurgie', 'Duplication de la GVS dans son compartiment', 'Veine de Giacomini (anastomose PVS → GVS via la face postéro-médiale de cuisse)', 'GVS hypoplasique avec tributaire antérieure de cuisse compensatrice']
  },
  physiologie: {
    texte: 'Le retour veineux normal est antérograde et centripète, assuré par la pompe musculaire et les valvules. L\'INCOMPÉTENCE VALVULAIRE (primitive/dégénérative ou post-thrombotique) autorise un REFLUX rétrograde sous l\'effet de la gravité et des manœuvres augmentant la pression abdominale/distale.\nLe reflux ne s\'évalue de façon fiable qu\'en charge gravitationnelle : patient DEBOUT (ou assis jambe pendante), jamais en décubitus qui sous-estime massivement le reflux (piège majeur).\nProvocation : manœuvre de CHASSE distale (compression manuelle du mollet/pied) puis RELÂCHEMENT, qui démasque un reflux à la décompression ; ou manœuvre de VALSALVA, surtout adaptée à la crosse (JSF) et aux segments hauts.\nSeuils de durée du reflux pathologique : > 0,5 s pour les veines superficielles et les perforantes ; > 1 s pour le réseau profond (fémorale, poplitée).',
    profils: [
      { nom: 'Veine continente (valvules normales)', desc: 'À la chasse-relâchement ou au Valsalva : flux antérograde puis arrêt net (fermeture valvulaire), sans flux rétrograde significatif (< 0,5 s).' },
      { nom: 'Reflux superficiel pathologique', desc: 'Flux rétrograde > 0,5 s dans la GVS, la PVS ou une tributaire après relâchement de la chasse (ou Valsalva pour la crosse).' },
      { nom: 'Perforante incontinente', desc: 'Flux rétrograde (profond → superficiel) > 0,5 s à la chasse/relâchement, diamètre dilaté > 3–3,5 mm.' },
      { nom: 'Reflux profond pathologique', desc: 'Flux rétrograde > 1 s dans la fémorale ou la poplitée ; évoque une atteinte post-thrombotique ou une incompétence valvulaire profonde primitive.' }
    ]
  },
  physique: {
    intro: 'Veines superficielles = territoire très superficiel et flux LENTS : il faut sensibiliser la machine aux basses vélocités tout en gardant l\'évaluation en charge.',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 5–9 MHz : haute fréquence pour le réseau superficiel et les perforantes (mesure de diamètre et de distance à la peau) ; descendre vers 5 MHz pour la crosse profonde ou le sujet obèse.' },
      { titre: 'Réglages flux lents', desc: 'PRF/échelle BASSE, filtre mural BAS, gain couleur sensible : le reflux veineux est lent. Une PRF trop haute fait manquer le reflux (faux négatif).', svg: SVG_IV_REFLUX },
      { titre: 'Angle & mesure du reflux', desc: 'Doppler pulsé, porte large dans la lumière, angle ≤ 60°. Mesurer la DURÉE du reflux sur le tracé spectral (du début à l\'arrêt du flux rétrograde), pas seulement son existence.' },
      { titre: 'Diamètres', desc: 'Mesurer en coupe TRANSVERSE, paroi externe à paroi externe, patient debout : GVS à la crosse et à mi-cuisse/jambe ; perforante au niveau du trajet trans-fascial. Noter aussi la distance à la peau (utile pour l\'ablation).' }
    ]
  },
  reglages: {
    intro: 'Réglages types pour l\'exploration veineuse superficielle / perforantes.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 5–9 MHz', note: '5 MHz si crosse profonde / obésité' },
      { param: 'Profondeur', valeur: '2–4 cm', note: 'Réseau très superficiel' },
      { param: 'Focale', valeur: 'Au niveau de la veine/perforante', note: 'Mesure de diamètre nette' },
      { param: 'PRF couleur', valeur: 'BASSE (flux lents)', note: 'Trop haute = reflux non vu' },
      { param: 'Filtre mural', valeur: 'BAS', note: 'Haut = reflux lent effacé' },
      { param: 'Angle pulsé', valeur: '≤ 60°', note: 'Mesure de la durée du reflux' },
      { param: 'Porte', valeur: 'Large, centrée', note: 'Capter tout le reflux' },
      { param: 'Balayage couleur', valeur: 'Bleu/rouge selon sens', note: 'Inversion couleur = reflux' }
    ]
  },
  installation: {
    texte: 'L\'INSTALLATION EST LA CLÉ de cet examen : le reflux ne s\'évalue qu\'en charge. L\'évaluer en décubitus est le piège n°1 (faux négatif). Prévoir un marchepied/estrade stable.',
    patient: 'DEBOUT, en appui sur la jambe CONTROLATÉRALE, membre exploré en légère rotation externe et relâché (non en appui). À défaut : assis jambe pendante. Le décubitus est réservé au repérage anatomique et à l\'élimination d\'une TVP, pas à la mesure du reflux.',
    operateur: 'Assis ou accroupi face au membre, avant-bras en appui sur la cuisse du patient pour stabiliser la sonde pendant les manœuvres.',
    ecran: 'À hauteur du regard ; main libre disponible pour la manœuvre de chasse manuelle du mollet.',
    sonde: 'Coupe transverse pour le repérage (œil égyptien, perforantes) et les diamètres ; longitudinale pour le Doppler pulsé du reflux.',
    ergonomie: 'Sécuriser le patient debout (barre d\'appui, présence d\'un tiers si malaise) ; alterner les positions pour les longues cartographies.'
  },
  acquisition: {
    etapes: [
      { titre: 'Éliminer une TVP (préalable)', desc: 'En décubitus : compressibilité du réseau profond (fémoral, poplité). Ne jamais traiter un réseau superficiel sans avoir vérifié le profond.' },
      { titre: 'Repérage de la GVS', desc: 'Coupe transverse : identifier l\'« œil égyptien » (GVS dans le compartiment fascial). Suivre de la crosse (confluent fémoral) jusqu\'à la cheville.' },
      { titre: 'Crosse / JSF', desc: 'Patient debout : mesurer le diamètre de la crosse et de la GVS sous-jugulaire ; rechercher le reflux au Valsalva et à la chasse.' },
      { titre: 'GVS sur tout son trajet', desc: 'Chasse distale-relâchement étagée (cuisse, genou, jambe) : localiser le point de fuite et les segments incompétents/compétents.' },
      { titre: 'PVS & JSP', desc: 'Face postérieure du mollet : repérer la JSP (niveau variable), mesurer diamètre et reflux. Rechercher une veine de Giacomini.' },
      { titre: 'Perforantes', desc: 'Repérer les perforantes (Dodd, Hunter, paratibiales, Cockett) : mesurer le diamètre trans-fascial et la direction/durée du flux à la chasse.' },
      { titre: 'Tributaires & cartographie', desc: 'Tracer le trajet du reflux et des varices alimentées ; noter diamètres, distance peau, segments à traiter.' }
    ],
    reperes: ['« Œil égyptien » = GVS dans son compartiment fascial', '« Mickey Mouse » inguinal = fémorale commune + GVS + fémorale profonde au confluent', 'JSP repérée au creux poplité (niveau variable)'],
    astuces: ['Toujours mesurer le reflux DEBOUT (ou assis jambe pendante).', 'La manœuvre de chasse-relâchement est plus sensible que le Valsalva pour les segments distaux ; le Valsalva est meilleur pour la crosse.', 'Marquer la peau (point de fuite, perforantes) pour le chirurgien/l\'opérateur d\'ablation.'],
    erreurs: ['Mesurer le reflux en décubitus → faux négatif majeur.', 'PRF/filtre trop hauts → reflux lent non détecté.', 'Confondre une tributaire (hors œil) avec la GVS.', 'Oublier de vérifier le réseau profond avant de conclure.']
  },
  interpretation: {
    texte: 'Le compte-rendu décrit le siège du reflux (jonctions, troncs saphènes, perforantes), sa durée, les diamètres, le point de fuite et le stade CEAP.',
    normal: ['GVS dans l\'œil égyptien, fine, paroi régulière', 'Pas de reflux (< 0,5 s) en superficiel/perforantes ni > 1 s en profond', 'Perforantes fines (< 3 mm), flux entrant superficiel → profond', 'Réseau profond compressible et perméable'],
    pathologique: ['Reflux GVS/PVS > 0,5 s à la chasse/Valsalva', 'Crosse/GVS dilatée, varices tributaires', 'Perforante incontinente : reflux > 0,5 s, diamètre > 3–3,5 mm', 'Reflux profond > 1 s (post-thrombotique / incompétence profonde)', 'Néovascularisation à la crossectomie (récidive)'],
    svgPatho: SVG_IV_OEIL,
    capPatho: '« Œil égyptien » : la GVS reste dans son compartiment fascial ; une tributaire variqueuse « sort » de l\'œil.'
  },
  valeurs: {
    intro: 'Seuils de reflux et de diamètre en insuffisance veineuse (à adapter au contexte et aux recommandations en vigueur).',
    lignes: [
      { param: 'Reflux superficiel pathologique', valeur: '> 0,5 s', note: 'GVS, PVS, tributaires' },
      { param: 'Reflux perforante pathologique', valeur: '> 0,5 s', note: 'Flux inversé profond → superficiel' },
      { param: 'Reflux profond pathologique', valeur: '> 1 s', note: 'Fémorale, poplitée' },
      { param: 'Perforante incontinente — diamètre', valeur: '> 3–3,5 mm', note: 'Associé au reflux ; rôle dans les ulcères (Cockett)' },
      { param: 'Diamètre GVS / crosse', valeur: 'À mesurer debout, transverse', note: 'Dilatation = argument d\'incompétence ; oriente l\'ablation' },
      { param: 'Position de mesure', valeur: 'DEBOUT (ou assis jambe pendante)', note: 'Le décubitus sous-estime le reflux' },
      { param: 'Provocation', valeur: 'Chasse-relâchement / Valsalva', note: 'Valsalva surtout pour la crosse' }
    ]
  },
  pathologies: [
    { nom: 'Maladie variqueuse essentielle (reflux saphène)', physiopath: 'Incompétence valvulaire primitive de la JSF/JSP et/ou des troncs saphènes → reflux et varices', bmode: 'GVS/PVS dilatées, varices tributaires, crosse élargie', doppler: 'Reflux GVS/PVS > 0,5 s à la chasse-relâchement ou au Valsalva', ddx: 'Insuffisance de perforante isolée, syndrome post-thrombotique', pieges: 'Reflux évalué en décubitus (faux négatif) ; confondre tributaire et tronc', gravite: 'Selon CEAP et retentissement', cat: 'Cartographie debout, point de fuite, CEAP ; orientation chirurgie/ablation thermique/sclérose' },
    { nom: 'Insuffisance de perforante', physiopath: 'Perforante incompétente : reflux inversé (profond → superficiel) alimentant des varices', bmode: 'Perforante dilatée trans-fasciale > 3–3,5 mm', doppler: 'Flux rétrograde > 0,5 s à la chasse/relâchement', ddx: 'Perforante compétente (flux entrant bref), reflux saphène sus-jacent', pieges: 'Coter incontinente une perforante en réalité compétente ; manquer une perforante de jambe (Cockett) sous un ulcère', gravite: 'Rôle clé dans les ulcères de jambe', cat: 'Localiser/marquer ; traitement (ablation, ligature) selon le contexte et l\'ulcère' },
    { nom: 'Syndrome post-thrombotique', physiopath: 'Séquelles de TVP : reflux profond (destruction valvulaire) ± obstruction résiduelle', bmode: 'Paroi épaissie, synéchies, recanalisation partielle, veine incompressible séquellaire', doppler: 'Reflux profond > 1 s ; flux continu non phasique si obstruction', ddx: 'Maladie variqueuse primitive, compression extrinsèque (May-Thurner)', pieges: 'Traiter le superficiel sans reconnaître l\'atteinte profonde sous-jacente', gravite: 'Œdème chronique, troubles trophiques, ulcères', cat: 'Documenter reflux/obstruction profonds ; compression, avis spécialisé' },
    { nom: 'Récidive variqueuse post-opératoire', physiopath: 'Néovascularisation à la crossectomie, moignon de crosse résiduel, reflux par perforante ou tributaire négligée', bmode: 'Lacis veineux au confluent fémoral, moignon de GVS', doppler: 'Reflux au niveau du néo-réseau / moignon', ddx: 'Nouvelle perforante incompétente, GVS antérieure de cuisse', pieges: 'Attribuer la récidive à une « vraie » crosse alors qu\'il s\'agit de néovascularisation', gravite: 'Variable', cat: 'Cartographie précise de la source ; ré-intervention ciblée / sclérose écho-guidée' }
  ],
  algorithme: {
    titre: 'Conduite devant des varices des membres inférieurs',
    noeuds: [
      { q: 'Varices / symptômes veineux ?', a: 'Éliminer une TVP (réseau profond), puis cartographie veineuse DEBOUT' },
      { q: 'Où est le point de fuite ?', a: 'Crosse (JSF), JSP, ou perforante : repérer le départ du reflux' },
      { q: 'Reflux GVS/PVS > 0,5 s ?', a: 'Reflux saphène → tracer trajet, segments incompétents, diamètres' },
      { q: 'Perforante > 3–3,5 mm avec reflux > 0,5 s ?', a: 'Perforante incontinente → localiser/marquer (surtout si ulcère)' },
      { q: 'Reflux profond > 1 s ?', a: 'Évoquer syndrome post-thrombotique / incompétence profonde' },
      { q: 'Stade CEAP ?', a: 'C0–C6 → orientation thérapeutique (compression, ablation thermique, sclérose, chirurgie)' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER VEINEUX SUPERFICIEL DES MEMBRES INFÉRIEURS

Indication : [varices / lourdeurs / bilan].
Technique : sonde linéaire ; réseau profond vérifié en décubitus, reflux évalué DEBOUT (chasse-relâchement, Valsalva pour la crosse).

Réseau profond : compressible, perméable, sans reflux pathologique (< 1 s).
GVS D/G : dans l'œil égyptien, fine, crosse continente, pas de reflux (< 0,5 s).
PVS D/G : JSP continente, pas de reflux.
Perforantes : fines (< 3 mm), flux entrant superficiel → profond, sans reflux.

CONCLUSION : Pas d'insuffisance veineuse superficielle ni de perforante incontinente. CEAP C0–C1.`,
    pathologique: `ÉCHO-DOPPLER VEINEUX — CARTOGRAPHIE PRÉ-OPÉRATOIRE

Indication : varices [côté], bilan avant traitement (chirurgie / ablation thermique / sclérose).
Technique : reflux mesuré DEBOUT, appui controlatéral (chasse-relâchement, Valsalva).

Réseau profond : perméable, compressible, sans reflux significatif [ou : reflux poplité __ s].
Crosse (JSF) : incontinente, diamètre __ mm ; reflux au Valsalva.
GVS : diamètre crosse __ mm / cuisse __ mm / jambe __ mm ; reflux __ s ; point de fuite à __ ; segment incompétent de __ à __ ; distance à la peau __ mm.
Perforante(s) : [Dodd/Hunter/Cockett] incontinente(s), diamètre __ mm, reflux __ s, repérée(s)/marquée(s) à __ cm.
PVS / JSP : __.

CONCLUSION : Insuffisance de la GVS [côté] sur reflux de crosse, avec perforante(s) incontinente(s). CEAP C__.
[Proposition : ablation thermique / crossectomie-stripping / sclérose écho-guidée selon le trajet cartographié.]`
  },
  cas: [
    { titre: 'Reflux « absent »', enonce: 'Patiente avec varices évidentes de la face médiale de cuisse. En décubitus, le Doppler ne retrouve aucun reflux de la GVS.', questions: ['Pourquoi ce résultat est-il suspect ?', 'Que faites-vous ?'], indices: ['Position du patient', 'Charge gravitationnelle'], reponse: 'Le reflux se sous-estime massivement en décubitus. Refaire l\'examen DEBOUT (appui controlatéral) avec chasse-relâchement et Valsalva : le reflux saphène apparaît alors. Piège n°1 de cet examen.' },
    { titre: 'Point de fuite', enonce: 'Reflux de la GVS de cuisse mais crosse (JSF) parfaitement continente au Valsalva.', questions: ['D\'où vient le reflux ?'], indices: ['Perforantes de cuisse', 'Tributaires'], reponse: 'Le point de fuite n\'est pas la crosse : rechercher une perforante de cuisse (Dodd/Hunter) ou une tributaire incompétente alimentant la GVS. La cartographie doit localiser le départ exact du reflux pour cibler le traitement.' },
    { titre: 'Perforante de jambe', enonce: 'Ulcère malléolaire interne ; perforante rétro-malléolaire dilatée à 4 mm avec flux rétrograde de 0,8 s à la chasse.', questions: ['Comment la cotez-vous ?', 'Quel rôle ?'], reponse: 'Perforante de Cockett INCONTINENTE (diamètre > 3–3,5 mm et reflux > 0,5 s). Elle joue un rôle direct dans l\'ulcère ; à marquer et à traiter dans la stratégie de cicatrisation.' },
    { titre: 'Veine non compressible', enonce: 'Lors du bilan veineux, la veine poplitée est partiellement incompressible avec paroi épaissie et reflux profond à 1,5 s.', questions: ['Diagnostic ?'], reponse: 'Syndrome post-thrombotique (séquelles de TVP : obstruction résiduelle + reflux profond > 1 s). Ne pas traiter isolément le superficiel sans intégrer l\'atteinte profonde.' },
    { titre: 'Récidive après chirurgie', enonce: 'Antécédent de crossectomie-stripping ; réapparition de varices inguinales avec petit lacis veineux au confluent fémoral et reflux.', questions: ['Mécanisme le plus probable ?'], reponse: 'Néovascularisation à la crossectomie (et/ou moignon résiduel), cause fréquente de récidive. La cartographie précise la source pour une sclérose écho-guidée ou une reprise ciblée.' },
    { titre: 'JSP introuvable', enonce: 'Reflux net de la PVS au mollet mais vous ne trouvez pas la jonction saphéno-poplitée à l\'endroit attendu.', questions: ['Pourquoi ?'], reponse: 'Le niveau de la JSP est très variable (parfois haut situé, parfois via une veine de Giacomini vers la GVS). Remonter le balayage et chercher une terminaison atypique avant de conclure.' },
    { titre: 'GVS fine mais varices', enonce: 'GVS de calibre normal, continente, mais varices marquées de la face antérieure de cuisse.', questions: ['Quelle source rechercher ?'], reponse: 'Penser à une veine saphène antérieure de cuisse incompétente (tributaire de crosse) : la GVS principale peut être saine. Cartographier la tributaire et son point de fuite.' },
    { titre: 'Perforante compétente', enonce: 'Perforante de 2,5 mm avec bref flux entrant (superficiel → profond) à la chasse, sans reflux.', questions: ['Faut-il la traiter ?'], reponse: 'Non : perforante COMPÉTENTE (diamètre < 3 mm, flux entrant physiologique, pas de reflux > 0,5 s). La coter incontinente serait une erreur.' },
    { titre: 'Œdème unilatéral récent', enonce: 'Avant la cartographie veineuse, vous notez en décubitus une veine fémorale incompressible avec matériel endoluminal.', questions: ['Que faites-vous ?'], reponse: 'Suspicion de TVP aiguë : interrompre la démarche de cartographie de reflux, prendre en charge la TVP. Le bilan d\'insuffisance veineuse vient après avoir éliminé/traité la thrombose.' },
    { titre: 'Crosse dilatée et reflux long', enonce: 'Crosse de la GVS à 9 mm avec reflux de 2 s au Valsalva, GVS incompétente jusqu\'au genou, perforantes continentes.', questions: ['Synthèse et orientation ?'], reponse: 'Insuffisance saphène majeure par reflux de crosse (JSF), tronc incompétent cuisse-genou, perforantes saines. CEAP selon clinique. Orientation : ablation thermique de la GVS ou crossectomie-stripping selon trajet/diamètre.' }
  ],
  pieges: [
    'Évaluer le reflux en DÉCUBITUS → faux négatif majeur (toujours debout ou assis jambe pendante).',
    'PRF/filtre mural trop hauts → reflux lent non détecté.',
    'Confondre une perforante compétente (flux entrant bref, < 3 mm) et incontinente (reflux > 0,5 s, > 3–3,5 mm).',
    'Oublier de vérifier le réseau PROFOND avant de traiter le superficiel (TVP, syndrome post-thrombotique).',
    'Mal mesurer la DURÉE du reflux (seuil 0,5 s / 1 s) en confondant existence et durée.',
    'Manœuvre de provocation inadéquate (chasse trop faible, Valsalva mal réalisé pour la crosse).',
    'Confondre tributaire (hors œil égyptien) et tronc saphène → cartographie et traitement faussés.',
    'Attribuer une récidive à une « vraie » crosse alors qu\'il s\'agit de néovascularisation post-crossectomie.'
  ],
  flashcards: [
    { q: 'Dans quelle position mesure-t-on le reflux veineux ?', r: 'Patient DEBOUT (appui controlatéral) ou assis jambe pendante ; jamais en décubitus (sous-estimation).' },
    { q: 'Seuils de durée du reflux pathologique ?', r: '> 0,5 s en superficiel et perforantes ; > 1 s en profond (fémorale, poplitée).' },
    { q: 'Critères d\'une perforante incontinente ?', r: 'Reflux > 0,5 s (profond → superficiel) et diamètre > 3–3,5 mm.' },
    { q: 'Qu\'est-ce que l\'« œil égyptien » ?', r: 'Image transverse de la GVS dans son compartiment fascial saphénien (entre fascia superficiel et musculaire).' },
    { q: 'Manœuvre privilégiée pour la crosse (JSF) ?', r: 'Le Valsalva (la chasse-relâchement est plus adaptée aux segments distaux).' },
    { q: 'Que vérifier AVANT de traiter le réseau superficiel ?', r: 'Le réseau profond (éliminer TVP et syndrome post-thrombotique).' }
  ],
  qcm: [
    { q: 'Le seuil de durée définissant un reflux pathologique dans une veine superficielle est :', options: ['> 0,2 s', '> 0,5 s', '> 1 s', '> 2 s'], correct: 1, exp: 'Superficiel et perforantes : > 0,5 s. Le réseau profond utilise un seuil de > 1 s.' },
    { q: 'Pour évaluer le reflux veineux, le patient doit être :', options: ['En décubitus dorsal', 'En décubitus, jambe surélevée', 'Debout en appui controlatéral', 'En Trendelenburg'], correct: 2, exp: 'Le reflux se mesure en charge gravitationnelle (debout ou assis jambe pendante) ; le décubitus le sous-estime fortement.' },
    { q: 'Une perforante est dite incontinente si :', options: ['Diamètre > 3–3,5 mm et reflux > 0,5 s', 'Flux entrant superficiel → profond', 'Diamètre < 2 mm', 'Reflux > 1 s uniquement'], correct: 0, exp: 'Perforante incontinente = reflux inversé > 0,5 s avec diamètre > 3–3,5 mm. Le flux entrant superficiel → profond est physiologique.' },
    { q: 'Un reflux profond (poplité) à 1,5 s avec veine partiellement incompressible et paroi épaissie évoque :', options: ['Une maladie variqueuse primitive', 'Un syndrome post-thrombotique', 'Une perforante de Cockett', 'Une néovascularisation de crosse'], correct: 1, exp: 'Reflux profond > 1 s + séquelles pariétales/obstruction = syndrome post-thrombotique (séquelles de TVP).' }
  ],
  refs: ['DIU d\'échographie vasculaire, Montpellier (réseau veineux superficiel et perforantes) ; SFMV — recommandations de cartographie veineuse pré-thérapeutique ; classification CEAP (Eklöf et al.) ; ESVS 2022 — Clinical Practice Guidelines on the Management of Chronic Venous Disease of the Lower Limbs.']
});

})();
