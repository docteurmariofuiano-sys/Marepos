/* ÉCHO-VASC DIU — FAV d'hémodialyse (Surveillance & dispositifs) */
window.VASC = window.VASC || { chapters: [] };

(function () {
const SVG_FAV_1 = `<svg viewBox="0 0 460 230" role="img" aria-label="Anatomie d'une fistule artério-veineuse">
<rect width="460" height="230" fill="#fff"/>
<text x="10" y="18" font-size="12" font-weight="bold" fill="#0b2f63">FAV radio-céphalique (Cimino) — schéma de principe</text>
<path d="M30,80 C90,80 150,82 200,90" fill="none" stroke="#dc2626" stroke-width="11"/>
<text x="32" y="72" font-size="11" fill="#991b1b">Artère afférente (radiale)</text>
<ellipse cx="205" cy="95" rx="16" ry="13" fill="none" stroke="#7c3aed" stroke-width="3"/>
<text x="150" y="135" font-size="11" fill="#7c3aed">Anastomose</text>
<path d="M205,95 C260,100 320,110 430,108" fill="none" stroke="#0d9488" stroke-width="13"/>
<text x="250" y="92" font-size="11" fill="#0f766e">Veine de drainage (céphalique « artérialisée »)</text>
<rect x="280" y="118" width="90" height="18" fill="#bbf7d0" stroke="#0d9488" stroke-dasharray="3 2"/>
<text x="286" y="131" font-size="10" fill="#0f766e">Zones de ponction</text>
<path d="M30,170 C90,170 150,170 200,170" fill="none" stroke="#dc2626" stroke-width="7"/>
<text x="32" y="162" font-size="10" fill="#991b1b">Artère d'aval (vers la main)</text>
<text x="220" y="200" font-size="10" fill="#0b2f63">Sens du flux : artère → anastomose → veine de drainage → retour veineux</text>
<text x="220" y="216" font-size="10" fill="#0b2f63">Le shunt fait chuter la résistance d'aval de l'artère afférente</text>
</svg>`;

const SVG_FAV_2 = `<svg viewBox="0 0 460 210" role="img" aria-label="Profils hémodynamiques de la FAV">
<rect width="460" height="210" fill="#fff"/>
<text x="8" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Artère afférente AVANT FAV : haute résistance (triphasique)</text>
<line x1="20" y1="55" x2="220" y2="55" stroke="#cbd5e1"/>
<path d="M20,55 L40,22 L60,55 L70,66 L80,55 L100,50 L120,55 L140,22 L160,55 L170,66 L180,55" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="8" y="120" font-size="11" font-weight="bold" fill="#0b2f63">Artère afférente APRÈS FAV : basse résistance (diastole remplie)</text>
<line x1="20" y1="160" x2="220" y2="160" stroke="#cbd5e1"/>
<path d="M20,160 L35,112 C55,124 70,138 95,138 C120,138 130,146 150,114 C170,134 185,142 205,144" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>
<text x="250" y="16" font-size="11" font-weight="bold" fill="#0b2f63">Veine de drainage : flux artérialisé, pulsatile, continu</text>
<line x1="250" y1="60" x2="450" y2="60" stroke="#cbd5e1"/>
<path d="M250,60 C275,40 290,48 310,46 C340,44 350,56 375,42 C400,50 420,46 450,48" fill="#cffafe" stroke="#0d9488" stroke-width="1.8"/>
<text x="250" y="118" font-size="11" font-weight="bold" fill="#0b2f63">Sténose : aliasing + VPS↑ focale + turbulence</text>
<line x1="250" y1="170" x2="450" y2="170" stroke="#cbd5e1"/>
<path d="M250,170 L272,100 L300,170 M300,170 L322,100 L350,170" fill="#fecaca" stroke="#dc2626" stroke-width="1.6"/>
<text x="250" y="190" font-size="10" fill="#991b1b">Débit = TAMV × section ; FAV normale ~600–1200 mL/min</text>
</svg>`;

window.VASC.chapters.push({
  id: 'fav', num: 51, groupe: 'Surveillance & dispositifs', emoji: '🔁',
  titre: 'Fistules artério-veineuses d\'hémodialyse',
  sonde: 'Linéaire 7–12 MHz', niveau: 'DIU → expert', duree: '≈2 h 30',
  resume: 'Exploration de l\'abord vasculaire d\'hémodialyse : cartographie pré-opératoire, surveillance de maturation, mesure du débit de FAV, et diagnostic des complications (sténose, thrombose, sténose veineuse centrale, syndrome de vol, anévrisme, hyperdébit). Examen clé pour la survie de l\'abord et la qualité de la dialyse.',
  tags: 'FAV fistule hémodialyse Cimino radio-céphalique brachio-céphalique brachio-basilique pontage greffon débit TAMV maturation sténose juxta-anastomotique thrombose vol hyperdébit sténose veineuse centrale mapping',
  objectifs: [
    'Décrire l\'anatomie des FAV natives (radio-céphalique, brachio-céphalique, brachio-basilique) et des pontages prothétiques (loop / droit).',
    'Réaliser une cartographie artérielle et veineuse pré-opératoire (mapping) avec les seuils de calibre.',
    'Évaluer la maturation d\'une FAV selon la règle des 6.',
    'Mesurer correctement le débit de FAV (TAMV × section) et l\'interpréter (débit normal, bas, hyperdébit).',
    'Reconnaître le profil hémodynamique d\'une FAV fonctionnelle (artère afférente à basse résistance, veine artérialisée).',
    'Diagnostiquer et localiser les complications : sténose juxta-anastomotique, thrombose, sténose veineuse centrale, syndrome de vol, anévrisme, hyperdébit.',
    'Rédiger un compte-rendu de surveillance de FAV avec débit et cartographie.'
  ],
  anatomie: {
    texte: 'Une FAV crée un court-circuit entre une artère (afférente) et une veine (de drainage), assurant un haut débit et une « artérialisation » de la veine pour permettre les ponctions répétées.\nFAV natives, de la plus distale (à privilégier) à la plus proximale :\n- Radio-céphalique (Cimino-Brescia, poignet) : artère radiale anastomosée à la veine céphalique.\n- Brachio-céphalique (pli du coude) : artère humérale → veine céphalique.\n- Brachio-basilique (avec transposition/superficialisation de la basilique, souvent en 2 temps).\nPontages prothétiques (greffon AV) lorsque le capital veineux est insuffisant : greffon en PTFE en boucle (loop) ou droit, reliant artère et veine profonde.\nComposants à analyser systématiquement : artère afférente, anastomose, veine de drainage (« veine artérialisée »), zones de ponction, retour veineux (jusqu\'aux veines centrales).',
    svg: SVG_FAV_1,
    caption: 'Schéma d\'une FAV radio-céphalique : artère afférente → anastomose → veine de drainage artérialisée (zones de ponction). Le shunt abaisse la résistance d\'aval de l\'artère afférente.',
    vascularisation: 'Le sang court-circuite le lit capillaire de la main : la majorité du débit artériel passe directement dans la veine à basse résistance. La main reste perfusée par l\'artère d\'aval et les collatérales (arcade palmaire) — d\'où le risque de vol si ces apports sont insuffisants.',
    rapports: ['Veine céphalique : trajet latéral de l\'avant-bras puis du bras, se jette dans la veine axillaire (arc céphalique = zone de sténose).', 'Veine basilique : trajet médial, profonde, nécessite transposition/superficialisation pour être ponctionnable.', 'Veines centrales (sous-clavière, tronc innominé, VCS) : sténoses fréquentes après cathéters/pacemakers.'],
    variantes: ['Bifurcation veineuse précoce / veines accessoires « voleuses » de débit (peuvent gêner la maturation).', 'Trajets profonds (obésité) rendant la ponction difficile malgré un bon débit.', 'Boucles de greffon prothétique : repérer le sens artériel vs veineux avant de mesurer.']
  },
  physiologie: {
    texte: 'La création du shunt transforme l\'hémodynamique de l\'artère afférente : le lit d\'aval (la veine) étant à très basse résistance, le spectre artériel passe d\'un profil HAUTE résistance (triphasique, diastole nulle/inversée) à un profil BASSE résistance (diastole bien remplie, antérograde permanente). La veine de drainage devient « artérialisée » : flux continu, pulsatile, à vitesse élevée.\nUne FAV mature et fonctionnelle a un débit élevé (~600–1200 mL/min). Un débit insuffisant compromet la dialyse et favorise la thrombose ; un débit excessif retentit sur le cœur (insuffisance cardiaque à haut débit) et peut provoquer un vol vasculaire.',
    profils: [
      { nom: 'Artère afférente (post-FAV)', desc: 'Basse résistance, diastole bien remplie, flux antérograde permanent. Plus le débit est élevé, plus la diastole est haute. C\'est le site de référence pour la mesure du débit (souvent l\'humérale).' },
      { nom: 'Veine de drainage', desc: 'Flux artérialisé : continu, pulsatile, vitesse élevée. Une perte de pulsatilité / un flux amorti en aval évoque une sténose en aval (drainage, arc céphalique, centrale).' },
      { nom: 'Artère d\'aval (vers la main)', desc: 'Normalement antérograde. Un flux inversé (rétrograde, alimentant l\'anastomose au détriment de la main) signe un vol vasculaire.' }
    ]
  },
  physique: {
    intro: 'Abord superficiel : haute fréquence, et surtout rigueur sur l\'angle et la section pour la mesure du débit (erreur quadratique sur le diamètre).',
    points: [
      { titre: 'Sonde & fréquence', desc: 'Linéaire 7–12 MHz pour l\'avant-bras et le bras. Descendre en fréquence / utiliser une sonde plus pénétrante pour les FAV profondes (obèse) ou les veines centrales (sonde sectorielle/convexe en sus-claviculaire).', svg: SVG_FAV_2 },
      { titre: 'Angle & mesure du débit', desc: 'Débit = TAMV (vitesse moyenne temporelle = moyenne du tracé sur le cycle) × section (π·D²/4). Angle ≤ 60° impératif. La section dépend du CARRÉ du diamètre : une erreur de 10 % sur D fait ~20 % d\'erreur sur le débit. Mesurer le diamètre en B-mode haute résolution, en plusieurs cycles, sur un segment droit non anévrismal.' },
      { titre: 'Site de mesure du débit', desc: 'Préférer l\'artère HUMÉRALE afférente (flux laminaire, calibre stable, reproductible) plutôt que la veine de drainage souvent turbulente/anévrismale. À défaut, segment veineux droit en amont des ponctions.' },
      { titre: 'PRF / échelle', desc: 'Les vitesses sont élevées (shunt) : PRF haute pour éviter l\'aliasing systématique près de l\'anastomose. Adapter en aval (drainage) où les flux peuvent être plus lents.' }
    ]
  },
  reglages: {
    intro: 'Réglages types pour la surveillance de FAV.',
    lignes: [
      { param: 'Sonde', valeur: 'Linéaire 7–12 MHz', note: 'Convexe/sectorielle pour centrales / FAV profonde' },
      { param: 'Profondeur', valeur: '2–4 cm', note: 'Vaisseau aux ⅔ supérieurs' },
      { param: 'Angle pulsé', valeur: '≤ 60°, // paroi', note: 'Critique pour le débit' },
      { param: 'Porte (débit)', valeur: 'Élargie à TOUT le diamètre', note: 'Pour une TAMV représentative (moyenne uniforme)' },
      { param: 'PRF / échelle', valeur: 'Haute au shunt', note: 'Anti-aliasing près de l\'anastomose' },
      { param: 'Diamètre', valeur: 'B-mode HR, segment droit', note: 'Erreur quadratique → mesure soignée' },
      { param: 'Couleur', valeur: 'PRF haute, boîte étroite', note: 'Repérer accélération/aliasing focal (sténose)' }
    ]
  },
  installation: {
    patient: 'Assis ou décubitus, bras en extension et supination, posé sur un accoudoir/coussin. Bras tiède (un bras froid vasoconstricte et abaisse le débit).',
    operateur: 'Assis face au bras, avant-bras en appui ; suivre l\'axe de l\'anastomose vers le retour veineux.',
    ecran: 'Dans l\'axe du regard ; comparer les segments d\'amont en aval.',
    sonde: 'Pression LÉGÈRE : une pression excessive collabe la veine superficielle et fausse diamètre et débit.',
    ergonomie: 'Beaucoup de gel, sonde stable pour un angle constant ; éviter de comprimer pendant la mesure de débit.'
  },
  acquisition: {
    etapes: [
      { titre: 'Identifier le type de FAV', desc: 'Repérer artère afférente, anastomose, veine de drainage (native) ou greffon (prothétique, loop vs droit). Connaître le compte-rendu opératoire aide ++.' },
      { titre: 'Artère afférente', desc: 'B-mode + couleur + pulsé : profil basse résistance, perméabilité, calcifications. Site de mesure du débit (humérale).' },
      { titre: 'Anastomose', desc: 'Zone de turbulence physiologique et d\'aliasing : NE PAS surdiagnostiquer une sténose. Rechercher la sténose juxta-anastomotique (la plus fréquente) juste en aval.' },
      { titre: 'Veine de drainage / greffon', desc: 'Suivre tout le trajet : calibre, profondeur, sténoses, anévrismes/pseudo-anévrismes aux zones de ponction, thrombus.' },
      { titre: 'Mesure du débit', desc: 'Humérale (ou veine en amont) : TAMV × section, sur plusieurs cycles, angle ≤ 60°, porte couvrant le diamètre. Noter le site de mesure.' },
      { titre: 'Retour veineux & centrales', desc: 'Explorer jusqu\'à l\'arc céphalique / sous-clavière. Devant un bras œdématié, suspecter une sténose veineuse centrale (souvent hors fenêtre directe : s\'aider de la perte de modulation respiratoire/cardiaque du flux).' }
    ],
    reperes: ['Anastomose = transition artère→veine avec turbulence/aliasing.', 'Sténose juxta-anastomotique = quelques cm en aval de l\'anastomose +++.', 'Arc céphalique = jonction céphalique-axillaire, site sténosant fréquent.'],
    astuces: ['Mesurer le débit sur l\'humérale : plus reproductible que la veine.', 'Comparer le débit aux examens antérieurs (la TENDANCE compte autant que la valeur absolue).', 'Devant un bras gonflé, explorer EN AMONT (centrales) même si la FAV semble normale.'],
    erreurs: ['Comprimer la sonde → veine collabée, diamètre/débit sous-estimés.', 'Porte trop petite pour la TAMV → moyenne non représentative.', 'Mesurer le diamètre sur un anévrisme/segment dilaté → débit faux.', 'Confondre la turbulence physiologique de l\'anastomose avec une vraie sténose.']
  },
  interpretation: {
    normal: ['Artère afférente perméable, profil basse résistance (diastole remplie).', 'Veine de drainage perméable, artérialisée, sans sténose ni thrombus.', 'Débit de FAV ~600–1200 mL/min (fonctionnel).', 'Maturation : règle des 6 satisfaite.', 'Artère d\'aval (main) à flux antérograde (pas de vol).'],
    pathologique: ['Sténose : accélération focale VPS > ~400 cm/s et/ou rapport > 2–3 au site, aliasing, turbulence post-sténotique.', 'Débit bas (< 500–600 mL/min) : risque de thrombose/sous-dialyse.', 'Hyperdébit (> 1500–2000 mL/min) : retentissement cardiaque / vol.', 'Absence de flux + matériel endoluminal = thrombose.', 'Flux inversé dans l\'artère d\'aval = syndrome de vol.', 'Bras œdématié + perte de modulation du flux veineux = sténose centrale.'],
    svgPatho: SVG_FAV_2,
    capPatho: 'Profils : artère afférente avant/après FAV (haute → basse résistance), veine artérialisée, et signature de sténose (aliasing, VPS↑). Débit = TAMV × section.'
  },
  valeurs: {
    intro: 'Valeurs de référence pour la FAV (à adapter au laboratoire, au type d\'abord et à la tendance évolutive).',
    lignes: [
      { param: 'Débit FAV normal', valeur: '~600–1200 mL/min', note: 'FAV fonctionnelle ; mesure sur l\'humérale +++' },
      { param: 'Débit bas', valeur: '< 500–600 mL/min', note: 'Risque de thrombose / sous-dialyse → alerter' },
      { param: 'Hyperdébit', valeur: '> 1500–2000 mL/min', note: 'Risque cardiaque (haut débit) et vol' },
      { param: 'Sténose (vitesse)', valeur: 'VPS > ~400 cm/s au site', note: 'Réduction de calibre significative' },
      { param: 'Sténose (rapport)', valeur: 'Rapport VPS sténose/amont > 2–3', note: 'Critère clé (≥ 50 % de réduction)' },
      { param: 'Maturation — règle des 6', valeur: '≈6 sem ; débit ≥ 600 ; veine ≥ 6 mm ; profondeur ≤ 6 mm', note: 'FAV ponctionnable/mature' },
      { param: 'Pré-op — veine céphalique', valeur: 'Diamètre ≥ ~2–2,5 mm', note: 'Continuité, distance peau, après garrot' },
      { param: 'Pré-op — artère', valeur: 'Calibre suffisant, Allen, perméabilité', note: 'Radiale pour FAV distale' }
    ]
  },
  pathologies: [
    { nom: 'Sténose juxta-anastomotique', physiopath: 'Hyperplasie myo-intimale sur la veine de drainage juste en aval de l\'anastomose (site n°1), liée aux contraintes de cisaillement', bmode: 'Réduction focale de calibre de la veine quelques cm après l\'anastomose', doppler: 'Accélération focale VPS > ~400 cm/s, rapport > 2–3, aliasing, turbulence post-sténotique ; débit qui chute', ddx: 'Turbulence physiologique de l\'anastomose (ne pas surdiagnostiquer)', pieges: 'Confondre l\'aliasing normal de l\'anastomose avec une sténose ; angle > 60°', gravite: 'Menace l\'abord (thrombose imminente si débit bas)', cat: 'Quantifier (vitesses + rapport + débit), adresser pour angioplastie (fistulographie/PTA)' },
    { nom: 'Thrombose de FAV', physiopath: 'Occlusion (souvent sur sténose préexistante, hypotension, compression)', bmode: 'Matériel endoluminal, veine/greffon non compressible, absence d\'expansion pulsatile', doppler: 'Absence de flux couleur ET énergie ; pas de thrill ; flux pré-occlusif amorti en amont', ddx: 'Débit très bas non thrombosé, sténose serrée', pieges: 'PRF/filtre trop hauts → fausse thrombose d\'un flux résiduel lent', gravite: 'Urgence (perte de l\'abord)', cat: 'Confirmer à PRF/filtre bas + énergie ; thrombectomie/désobstruction urgente, traiter la sténose causale' },
    { nom: 'Sténose veineuse centrale', physiopath: 'Sténose sous-clavière / tronc innominé / VCS, souvent post-cathéter ou pacemaker', bmode: 'Souvent hors fenêtre échographique directe', doppler: 'Perte de la modulation respiratoire/cardiaque du flux veineux, flux continu « démodulé », développement de collatérales ; en amont flux à haute vélocité', ddx: 'Thrombose veineuse centrale', pieges: 'Sténose centrale SOUS-ESTIMÉE car non vue directement : la suspecter devant un bras/membre œdématié malgré une FAV apparemment normale', gravite: 'Œdème du bras, dysfonction de l\'abord', cat: 'Explorer en amont, comparer la modulation du flux côté à côté ; phlébographie/angio-scanner, angioplastie' },
    { nom: 'Syndrome de vol (ischémie de la main)', physiopath: 'Le shunt détourne le flux artériel au détriment de la main ; l\'artère d\'aval s\'inverse pour alimenter l\'anastomose', bmode: 'FAV souvent perméable, parfois hyperdébit', doppler: 'Flux INVERSÉ (rétrograde) dans l\'artère d\'aval ; la compression de la FAV restaure le flux antérograde de la main', ddx: 'Maladie artérielle distale propre, hyperdébit', pieges: 'Méconnaître le vol si l\'on n\'explore pas l\'artère d\'aval / la main', gravite: 'Douleur, froideur, troubles trophiques, risque de nécrose', cat: 'Mesurer le débit, explorer l\'artère d\'aval ; avis chirurgical (banding/DRIL/ligature selon sévérité)' },
    { nom: 'Anévrisme / hyperdébit', physiopath: 'Dilatation anévrismale (vraie) sur la veine artérialisée ou pseudo-anévrisme aux zones de ponction ; hyperdébit par maturation excessive', bmode: 'Dilatation sacculaire, thrombus mural, amincissement cutané (anévrisme à risque de rupture) ; pseudo-anévrisme = collection communicante au site de ponction', doppler: 'Flux tourbillonnant (yin-yang) dans un pseudo-anévrisme, collet ; débit très élevé (> 1500–2000) en cas d\'hyperdébit', ddx: 'Hématome non vascularisé, abcès (prothèse)', pieges: 'Mesurer le débit/diamètre sur le segment dilaté → erreur ; ne pas ponctionner sur un anévrisme à peau fine', gravite: 'Rupture (anévrisme à peau fine), insuffisance cardiaque à haut débit', cat: 'Mesurer débit et collet, surveiller la peau ; avis pour réduction (banding) si hyperdébit/anévrisme menaçant' }
  ],
  algorithme: {
    titre: 'FAV qui dysfonctionne (débit insuffisant en dialyse, pressions anormales, thrill diminué)',
    noeuds: [
      { q: 'Y a-t-il un flux dans la FAV ?', a: 'Non (à PRF/filtre bas + énergie) → THROMBOSE → désobstruction urgente' },
      { q: 'Flux présent : quel est le débit (humérale) ?', a: 'Mesurer TAMV × section ; comparer aux examens antérieurs' },
      { q: 'Débit bas (< 500–600) ?', a: 'Chercher une sténose : juxta-anastomotique +++, veine de drainage, arc céphalique (VPS > 400, rapport > 2–3) → angioplastie' },
      { q: 'Débit très élevé (> 1500–2000) ?', a: 'Hyperdébit : retentissement cardiaque ? main ischémique ? → avis pour réduction de débit' },
      { q: 'Bras œdématié ?', a: 'Suspecter une sténose veineuse CENTRALE (perte de modulation du flux) → explorer en amont, phlébographie' },
      { q: 'Main froide / douloureuse ?', a: 'Explorer l\'artère d\'aval : flux inversé = SYNDROME DE VOL → avis chirurgical' }
    ]
  },
  cr: {
    normal: `ÉCHO-DOPPLER DE FISTULE ARTÉRIO-VEINEUSE D'HÉMODIALYSE

Indication : [surveillance / bilan de maturation].
Abord : FAV [radio-céphalique / brachio-céphalique / brachio-basilique / greffon] du membre [côté].
Technique : sonde linéaire, mode B + Doppler couleur et pulsé.

Artère afférente : perméable, profil de basse résistance (diastole remplie).
Anastomose : perméable, turbulence physiologique, sans sténose significative.
Veine de drainage : perméable, artérialisée, calibre __ mm, profondeur __ mm, sans sténose, sans thrombus, sans anévrisme.
Débit de FAV (mesuré sur l'artère humérale) : __ mL/min.
Artère d'aval (main) : flux antérograde, pas de vol.

CONCLUSION : FAV [type] perméable et fonctionnelle, débit __ mL/min (normal). Pas de sténose, de thrombose ni de signe de vol. [Maturation satisfaisante : règle des 6 respectée.]`,
    pathologique: `ÉCHO-DOPPLER DE FISTULE ARTÉRIO-VEINEUSE D'HÉMODIALYSE

Indication : [débit de dialyse insuffisant / pressions élevées / bras œdématié / main froide].
Abord : FAV [type] du membre [côté].
Technique : sonde linéaire, mode B + Doppler couleur et pulsé.

Artère afférente : perméable, basse résistance.
Sténose [juxta-anastomotique / veine de drainage / arc céphalique] : VPS __ cm/s, rapport __ (> 2–3) → sténose significative (≥ 50 %).
Débit de FAV (humérale) : __ mL/min [bas < 600 / élevé > 1500].
[Thrombose segmentaire : __ ] [Anévrisme : __ mm, peau __ ] [Artère d'aval : flux __ (inversé = vol)] [Flux veineux central : __ (démodulé = sténose centrale)].

CONCLUSION : [Sténose __ menaçant l'abord / Thrombose / Hyperdébit / Vol / Sténose centrale].
[Proposition : fistulographie ± angioplastie / désobstruction / avis chirurgical selon le mécanisme.]`
  },
  cas: [
    { titre: 'Bilan pré-opératoire', enonce: 'Patient en pré-dialyse, vous réalisez le mapping avant création d\'une FAV distale. La veine céphalique au poignet mesure 1,6 mm après garrot.', questions: ['Ce calibre est-il favorable à une FAV radio-céphalique ?', 'Que vérifier en plus ?'], indices: ['Seuil veineux pré-op', 'Versant artériel'], reponse: 'Calibre veineux insuffisant (< ~2–2,5 mm) : une FAV radio-céphalique distale risque de ne pas maturer. Vérifier la continuité veineuse, la distance à la peau, et le versant artériel (calibre radial, test d\'Allen, perméabilité). Envisager un site plus proximal.' },
    { titre: 'FAV qui ne mature pas', enonce: 'Six semaines après création, la veine reste fine et molle, difficilement ponctionnable.', questions: ['Quels critères objectivent la maturation ?', 'Que chercher pour expliquer l\'échec ?'], indices: ['Règle des 6'], reponse: 'Règle des 6 : ~6 semaines, débit ≥ 600 mL/min, diamètre veineux ≥ 6 mm, profondeur ≤ 6 mm. Échec de maturation → chercher une sténose juxta-anastomotique, une veine accessoire « voleuse » de débit, ou une artère afférente insuffisante.' },
    { titre: 'Débit en chute', enonce: 'Surveillance : le débit est passé de 900 à 480 mL/min en 3 mois.', questions: ['Quelle est l\'implication ?', 'Où chercher ?'], reponse: 'Débit bas (< 500–600) avec tendance descendante = risque de thrombose imminente. Chercher une sténose, surtout juxta-anastomotique (VPS > 400, rapport > 2–3). Adresser pour fistulographie/angioplastie préventive.' },
    { titre: 'Aliasing à l\'anastomose', enonce: 'Vous voyez une mosaïque de couleur intense au niveau de l\'anastomose, le débit est à 1000 mL/min, la FAV fonctionne bien en dialyse.', questions: ['Faut-il conclure à une sténose ?'], reponse: 'Non : l\'aliasing/turbulence est PHYSIOLOGIQUE à l\'anastomose (vitesses élevées du shunt). Avec un débit normal et une FAV fonctionnelle, ne pas surdiagnostiquer une sténose. Chercher une accélération FOCALE en aval avec rapport élevé pour affirmer une sténose.' },
    { titre: 'Bras gonflé', enonce: 'Œdème de tout le membre porteur de la FAV ; la FAV elle-même semble perméable avec un bon débit.', questions: ['Quel diagnostic évoquer ?', 'Comment le confirmer en écho ?'], reponse: 'Sténose veineuse CENTRALE (sous-clavière/innominé), souvent post-cathéter. La FAV distale peut paraître normale. Rechercher la perte de modulation respiratoire/cardiaque du flux veineux et des collatérales ; confirmer par phlébographie/angio-scanner.' },
    { titre: 'Main froide et douloureuse', enonce: 'Depuis la création de la FAV, la main est froide, pâle, douloureuse à l\'effort. Débit FAV à 1800 mL/min.', questions: ['Diagnostic ?', 'Quel signe Doppler le confirme ?'], reponse: 'Syndrome de vol. Le flux est INVERSÉ (rétrograde) dans l\'artère d\'aval qui alimente l\'anastomose au détriment de la main ; la compression de la FAV restaure le flux antérograde. Hyperdébit aggravant. Avis chirurgical (banding/DRIL).' },
    { titre: 'Masse pulsatile sur le trajet', enonce: 'Tuméfaction battante sur la veine de drainage, au niveau d\'une zone de ponction itérative.', questions: ['Anévrisme vrai ou pseudo-anévrisme ?', 'Quel signe de gravité ?'], reponse: 'Souvent pseudo-anévrisme (collection communicante via un collet, flux tourbillonnant yin-yang) ou anévrisme vrai de la veine artérialisée. Signe de gravité : amincissement/altération de la peau en regard (risque de rupture) → ne pas ponctionner, avis chirurgical.' },
    { titre: 'Hyperdébit et dyspnée', enonce: 'Patient dialysé chronique, dyspnée d\'effort, cardiomégalie ; débit de FAV à 2300 mL/min.', questions: ['Lien possible ?', 'Conduite ?'], reponse: 'Hyperdébit de FAV (> 1500–2000) pouvant entraîner une insuffisance cardiaque à haut débit. Confirmer la valeur (humérale, plusieurs cycles), avis pour réduction de débit (banding) en concertation néphro-cardio-chirurgicale.' },
    { titre: 'Pas de thrill', enonce: 'Le patient signale que la FAV « ne vibre plus » ; à l\'écho, pas de flux couleur dans la veine de drainage avec PRF haute.', questions: ['Quel piège avant de conclure ?', 'Diagnostic probable ?'], reponse: 'Avant de conclure à une thrombose : baisser PRF et filtre mural, passer en énergie pour ne pas rater un flux résiduel lent. Si réellement aucun flux + matériel endoluminal + veine non compressible = thrombose de FAV → désobstruction urgente.' },
    { titre: 'Greffon prothétique en boucle', enonce: 'FAV sur greffon PTFE en loop à l\'avant-bras ; débit en baisse et pressions de retour élevées en dialyse.', questions: ['Où se situent typiquement les sténoses sur un greffon ?', 'Comment repérer le sens ?'], reponse: 'Les sténoses de greffon siègent surtout à l\'anastomose VEINEUSE (sortie) +++, parfois sur le corps du greffon. Repérer d\'abord le sens (artériel → veineux) avant de mesurer, car la boucle inverse l\'orientation. Quantifier VPS/rapport au site, adresser pour angioplastie.' }
  ],
  pieges: [
    'Comprimer la veine superficielle avec la sonde → diamètre et débit sous-estimés (pression légère, beaucoup de gel).',
    'Mesurer le diamètre/débit sur un segment anévrismal ou dilaté → débit faux (erreur quadratique sur D).',
    'Porte trop petite pour la TAMV → moyenne non représentative (élargir la porte à tout le diamètre).',
    'Confondre la turbulence/aliasing PHYSIOLOGIQUE de l\'anastomose avec une vraie sténose (chercher l\'accélération focale + rapport en aval).',
    'Angle > 60° → vitesses et débit surestimés.',
    'Sténose veineuse centrale SOUS-ESTIMÉE car non vue directement → l\'évoquer devant un bras œdématié (perte de modulation du flux).',
    'Conclure « thrombose » avec PRF/filtre trop hauts → rater un flux résiduel lent.',
    'Oublier d\'explorer l\'artère d\'aval / la main → méconnaître un syndrome de vol.'
  ],
  flashcards: [
    { q: 'Comment calcule-t-on le débit d\'une FAV ?', r: 'Débit = TAMV (vitesse moyenne temporelle) × section (π·D²/4) ; mesure de préférence sur l\'artère humérale, angle ≤ 60°.' },
    { q: 'Débit normal d\'une FAV fonctionnelle ?', r: '~600–1200 mL/min ; < 500–600 = risque de thrombose, > 1500–2000 = hyperdébit (cardiaque/vol).' },
    { q: 'En quoi le profil de l\'artère afférente change-t-il après FAV ?', r: 'De haute résistance (triphasique) à BASSE résistance (diastole bien remplie), à cause du shunt.' },
    { q: 'Quelle est la sténose la plus fréquente ?', r: 'La sténose juxta-anastomotique (veine de drainage juste en aval de l\'anastomose). Critères : VPS > ~400 cm/s, rapport > 2–3.' },
    { q: 'Énoncez la règle des 6 (maturation).', r: '≈6 semaines, débit ≥ 600 mL/min, diamètre veineux ≥ 6 mm, profondeur ≤ 6 mm.' },
    { q: 'Quel signe Doppler affirme un syndrome de vol ?', r: 'Flux INVERSÉ (rétrograde) dans l\'artère d\'aval, restauré antérograde par la compression de la FAV.' },
    { q: 'Comment suspecter une sténose veineuse centrale en écho ?', r: 'Bras œdématié + perte de la modulation respiratoire/cardiaque du flux veineux (flux continu « démodulé »), collatérales ; souvent non vue directement.' }
  ],
  qcm: [
    { q: 'Le débit d\'une FAV se mesure idéalement :', options: ['Au niveau de l\'anastomose', 'Sur l\'artère humérale afférente', 'Sur un anévrisme de la veine', 'Sur l\'artère d\'aval'], correct: 1, exp: 'L\'artère humérale offre un flux laminaire et un calibre stable, plus reproductible que la veine turbulente/anévrismale. Éviter l\'anastomose et les segments dilatés.' },
    { q: 'Un débit de FAV à 400 mL/min en baisse signifie :', options: ['FAV optimale', 'Hyperdébit', 'Risque de thrombose / sous-dialyse', 'Syndrome de vol obligatoire'], correct: 2, exp: 'Un débit bas (< 500–600) et en baisse menace l\'abord (thrombose). Chercher une sténose, surtout juxta-anastomotique, et adresser pour angioplastie.' },
    { q: 'Quel critère affirme une sténose significative sur une FAV ?', options: ['Aliasing à l\'anastomose', 'VPS > 400 cm/s avec rapport > 2–3 au site', 'Diastole remplie de l\'artère afférente', 'Veine artérialisée pulsatile'], correct: 1, exp: 'L\'accélération FOCALE (VPS > ~400) avec un rapport > 2–3 signe la sténose. L\'aliasing de l\'anastomose et la basse résistance afférente sont physiologiques.' },
    { q: 'Devant un membre porteur de FAV globalement œdématié avec une FAV perméable, on évoque :', options: ['Une sténose juxta-anastomotique', 'Un syndrome de vol', 'Une sténose veineuse centrale', 'Un hyperdébit'], correct: 2, exp: 'L\'œdème de tout le membre oriente vers une sténose veineuse centrale (sous-clavière/innominé), souvent post-cathéter, fréquemment non vue directement (perte de modulation du flux).' }
  ],
  refs: ['DIU d\'échographie vasculaire, Montpellier (abord d\'hémodialyse) ; recommandations SFMV et Société de néphrologie (surveillance des abords) ; KDOQI Clinical Practice Guidelines for Vascular Access ; ESVS guidelines on vascular access.']
});
})();
