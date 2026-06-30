/* ===== BLOC 1 — TRONC COMMUN AUDIO-VESTIBULAIRE ===== */
FORMATION.push({
  cat: "Bloc 1 — Tronc commun",
  ico: "📘",
  sections: [

  /* ---------------- MODULE 1 : BASES ANATOMO-PHYSIO ---------------- */
  {
    id: "b1-bases", ico: "🧬", titre: "M1 · Bases anatomiques, embryologiques & physiologiques",
    niveau: NIV.base,
    html: `
    <p class="lead">Objectif : comprendre <em>pourquoi</em> telle lésion donne tel signe. L'anatomie n'est pas un
    décor : chaque structure explique un symptôme et oriente un examen.</p>

    <h4>Objectifs pédagogiques</h4>
    <ul>
      <li>Décrire l'organisation de l'oreille externe, moyenne, interne et des voies centrales ;</li>
      <li>Relier embryologie et malformations / surdités congénitales ;</li>
      <li>Expliquer la transduction cochléaire et la transduction vestibulaire ;</li>
      <li>Identifier les vulnérabilités vasculaires et les conséquences du vieillissement.</li>
    </ul>

    <h3>1. Embryologie audio-vestibulaire</h3>
    <p>L'oreille interne (cochlée + vestibule) dérive de la <strong>placode otique</strong> (ectoderme) → vésicule otique,
    formée tôt. L'oreille moyenne (cavité, osselets) dérive des <strong>1er et 2e arcs branchiaux</strong> et de la
    1re poche pharyngée. L'oreille externe (pavillon, conduit) dérive des bourgeons du 1er arc et de la 1re fente.</p>
    ${box("retenir", `Conséquences pratiques : (1) l'<strong>oreille interne se forme avant</strong> l'oreille moyenne/externe,
    donc une malformation de l'oreille externe n'implique pas obligatoirement une atteinte de l'oreille interne (et inversement) ;
    (2) une <strong>agression au 1er trimestre</strong> (CMV, génétique, tératogène) peut toucher la cochlée déjà constituée ;
    (3) les malformations branchiales s'associent à des syndromes (ex. atteintes du 1er/2e arc).`)}
    ${box("piege", `Une atrésie du conduit auditif externe (oreille externe) peut coexister avec une cochlée normale :
    ne pas conclure à une surdité de perception sans explorer la conduction osseuse.`)}

    <h3>2. Oreille externe & moyenne</h3>
    <ul>
      <li><strong>Oreille externe</strong> : pavillon + conduit auditif externe (CAE) → capte et conduit le son jusqu'au tympan.</li>
      <li><strong>Tympan</strong> : membrane vibrante (pars tensa, pars flaccida) ; repère otoscopique majeur.</li>
      <li><strong>Chaîne ossiculaire</strong> : marteau – enclume – étrier. L'étrier s'articule à la fenêtre ovale.
      Rôle = <strong>adaptation d'impédance</strong> air → liquides de l'oreille interne (sinon perte d'énergie majeure).</li>
      <li><strong>Trompe d'Eustache</strong> : ventile et équilibre les pressions de la caisse. Sa dysfonction explique l'otite séreuse.</li>
      <li><strong>Muscle stapédien</strong> : son réflexe protège partiellement de l'intensité (base du réflexe stapédien).</li>
    </ul>
    ${box("retenir", `Toute atteinte de l'oreille externe ou moyenne (bouchon, perforation, OSM, blocage ossiculaire, otospongiose)
    donne une <strong>surdité de transmission</strong> : conduction osseuse normale, conduction aérienne abaissée → <em>Rinne négatif</em>, <em>Weber latéralisé du côté sourd</em>.`)}

    <h3>3. Oreille interne — cochlée</h3>
    <p>La cochlée est un tube enroulé contenant trois rampes (vestibulaire, médiane/canal cochléaire, tympanique).
    L'<strong>organe de Corti</strong> porte les cellules ciliées :</p>
    <ul>
      <li><strong>Cellules ciliées externes (CCE)</strong> : amplificateur cochléaire actif (électromotilité) → sensibilité et
      sélectivité fréquentielle fines. Leur intégrité est explorée par les <strong>OEA</strong>.</li>
      <li><strong>Cellules ciliées internes (CCI)</strong> : véritables récepteurs, transmettent au nerf auditif.</li>
      <li><strong>Tonotopie</strong> : base = aigus, apex = graves. Explique la <strong>presbyacousie</strong> (déficit prédominant sur les aigus, base lésée en premier).</li>
    </ul>
    ${box("retenir", `La <strong>tonotopie</strong> est une clé d'interprétation : l'audiogramme « cartographie » la cochlée.
    Une atteinte des aigus oriente vers la base (bruit, presbyacousie, ototoxicité) ; une atteinte des graves a d'autres causes (ex. hydrops).`)}

    <h3>4. Oreille interne — vestibule</h3>
    <ul>
      <li><strong>3 canaux semi-circulaires</strong> (postérieur, latéral/horizontal, antérieur/supérieur) : détectent les
      <strong>accélérations angulaires</strong> (rotations). Fonctionnent par paires (push-pull).</li>
      <li><strong>Organes otolithiques</strong> : utricule (accélérations horizontales) et saccule (verticales, gravité).
      Explorés par les <strong>VEMP</strong> (oVEMP ≈ utricule/voie supérieure, cVEMP ≈ saccule/voie inférieure).</li>
      <li><strong>Réflexe vestibulo-oculaire (RVO)</strong> : stabilise le regard pendant les mouvements de tête. Sa défaillance =
      base du <strong>Head Impulse Test</strong> et de l'oscillopsie.</li>
    </ul>
    ${box("retenir", `Comprendre le RVO, c'est comprendre l'otoneurologie : un déficit canalaire unilatéral abolit le RVO de ce côté
    → saccade de rattrapage au HIT, nystagmus battant vers le côté <em>sain</em>.`)}

    <h3>5. Voies auditives & vestibulaires, centrales</h3>
    <ul>
      <li><strong>Voie auditive</strong> : cochlée → nerf cochléaire (VIII) → noyaux cochléaires → olive supérieure (1re intégration binaurale) → colliculus inférieur → corps géniculé médian → cortex auditif temporal. Le croisement partiel explique qu'une lésion centrale donne rarement une surdité unilatérale franche.</li>
      <li><strong>Voie vestibulaire</strong> : récepteurs → nerf vestibulaire → noyaux vestibulaires (tronc) → cervelet, moelle (équilibre), noyaux oculomoteurs (RVO), cortex (perception). D'où l'intrication vertige / oculomotricité / posture / cognition.</li>
    </ul>
    ${box("piege", `Une plainte auditive avec audiogramme normal peut relever d'une <strong>atteinte rétrocochléaire ou centrale</strong>
    (cf. Module 7). Audiogramme normal ≠ audition normale.`)}

    <h3>6. Vascularisation & vulnérabilités</h3>
    <p>L'oreille interne est vascularisée par l'<strong>artère labyrinthique</strong> (branche, le plus souvent, de l'AICA — artère
    cérébelleuse antéro-inférieure). C'est une <strong>artère terminale</strong> : pas de suppléance → grande vulnérabilité ischémique.</p>
    ${box("redflag", `Un déficit cochléo-vestibulaire brutal peut être le premier signe d'un <strong>AVC du territoire AICA</strong> :
    une surdité brusque + vertige + signes neuro (dysarthrie, ataxie, paralysie faciale) n'est pas « une oreille » mais une urgence neurovasculaire.`)}

    <h3>7. Développement chez le nourrisson et l'enfant</h3>
    <ul>
      <li>L'audition est fonctionnelle <strong>avant la naissance</strong> ; la cochlée est mature tôt.</li>
      <li>Les <strong>premiers mois</strong> sont une fenêtre critique pour le développement du langage → tout retard de
      diagnostic d'une surdité a un coût développemental (d'où le dépistage néonatal).</li>
      <li>Le système vestibulaire participe au <strong>contrôle postural et moteur</strong> : un déficit vestibulaire complet
      précoce retentit sur la tenue de tête, la marche, parfois le langage.</li>
    </ul>

    <h3>8. Vieillissement audio-vestibulaire</h3>
    <ul>
      <li><strong>Presbyacousie</strong> : perte des CCE/CCI prédominant sur les aigus, baisse de l'intelligibilité surtout dans le bruit.</li>
      <li><strong>Presbyvestibulie</strong> : raréfaction cellulaire vestibulaire → instabilité, majoration du risque de chute.</li>
      <li>Intrication avec vision, proprioception, cognition : l'équilibre du sujet âgé est <strong>multifactoriel</strong>.</li>
    </ul>

    ${box("erreur", `Attribuer toute surdité du sujet âgé à « l'âge » sans audiogramme ni otoscopie : on rate des causes
    réversibles (bouchon, OSM) ou graves (surdité asymétrique → IRM).`)}

    <h4>Liens pathologie / implications consultation</h4>
    ${tbl(["Structure", "Pathologie type", "Signe / examen clé"], [
      ["CAE", "Bouchon, otite externe, exostoses", "Otoscopie ; surdité de transmission"],
      ["Oreille moyenne", "OSM, otospongiose, cholestéatome", "Tympanométrie, Rinne/Weber, scanner"],
      ["CCE cochléaires", "Bruit, ototoxiques, presbyacousie", "OEA abolies, audiogramme aigus"],
      ["Nerf VIII", "Schwannome vestibulaire", "Surdité asymétrique, PEA, IRM"],
      ["Canaux/otolithes", "VPPB, Ménière, déficit aigu", "Dix-Hallpike, HIT, VEMP, calorique"],
      ["Voies centrales", "AVC tronc/cervelet, SEP, migraine vestibulaire", "HINTS, nystagmus central, IRM"]
    ])}`
  },

  /* ---------------- MODULE 2 : IMAGERIE ---------------- */
  {
    id: "b1-imagerie", ico: "🖼️", titre: "M2 · Imagerie audio-vestibulaire",
    niveau: NIV.inter,
    html: `
    <p class="lead">Savoir <em>quand</em> demander l'imagerie, <em>laquelle</em>, et <em>ce qu'on cherche</em> — autant que savoir la lire.</p>

    <h4>Objectifs</h4>
    <ul><li>Choisir entre scanner des rochers et IRM ;</li>
    <li>Reconnaître les anomalies à ne pas manquer ;</li>
    <li>Comprendre ce qu'attend le chirurgien.</li></ul>

    <h3>1. Les deux examens : logique de choix</h3>
    ${tbl(["Critère", "Scanner (TDM) des rochers", "IRM CAI / oreille interne / encéphale"], [
      ["Explore surtout", "L'<strong>os</strong> : caisse, osselets, mastoïde, canaux, fenêtres", "Les <strong>tissus mous</strong> : nerf VIII, labyrinthe membraneux, tronc, cerveau"],
      ["Indications phares", "Surdité de transmission/mixte, cholestéatome, otospongiose, malformation osseuse, traumatisme, bilan pré-implant (osseux)", "Surdité de perception asymétrique, acouphène pulsatile/unilatéral, vertige central suspecté, labyrinthite, pré-implant (perméabilité cochléaire, nerf)"],
      ["Déhiscence canal sup.", "<strong>Examen de référence</strong> (coupes fines, reconstructions)", "Complément (épanchement, signes indirects)"],
      ["Irradiation", "Oui", "Non"],
      ["Limite", "Peu sensible aux tissus mous", "Moins bon pour l'os cortical fin ; contre-indications (matériel, claustrophobie)"]
    ])}
    ${box("retenir", `Règle simple : <strong>transmission/os → scanner</strong> ; <strong>perception/nerf/central → IRM</strong>.
    Une surdité de perception <strong>asymétrique</strong> ou un acouphène <strong>unilatéral</strong> → IRM des CAI pour éliminer un schwannome vestibulaire.`)}

    <h3>2. Ce qu'il faut chercher, pathologie par pathologie</h3>
    ${tbl(["Situation", "Examen", "À rechercher"], [
      ["Schwannome vestibulaire", "IRM CAI (séquences fines + gadolinium si doute)", "Masse du CAI / angle ponto-cérébelleux, prise de contraste"],
      ["Labyrinthite", "IRM", "Rehaussement / signal anormal du labyrinthe ; éliminer cause centrale"],
      ["Cholestéatome", "TDM (± IRM diffusion)", "Lyse osseuse, masse, érosion ossiculaire / mur de la logette ; diffusion pour résidu/récidive"],
      ["Otospongiose", "TDM rochers", "Foyer otospongieux (platine, fenêtre ronde, capsule)"],
      ["Déhiscence canal semi-circ. sup.", "TDM coupes fines", "Absence d'os couvrant le canal supérieur (3e fenêtre)"],
      ["Malformations oreille interne", "TDM + IRM", "Aplasie/hypoplasie cochléaire, dilatation de l'aqueduc vestibulaire (EVA), anomalie du nerf"],
      ["Atteinte centrale", "IRM encéphale (± diffusion, angio)", "AVC tronc/cervelet, SEP, lésion fosse postérieure"],
      ["Pré-implant cochléaire", "TDM + IRM", "Perméabilité/ossification cochléaire, présence et calibre du nerf cochléaire, anatomie pour l'insertion"]
    ])}

    <h3>3. Quand demander l'imagerie ?</h3>
    ${algo([
      "Surdité de perception <b>asymétrique</b> ou acouphène/atteinte <b>unilatéral(e)</b> inexpliqué(e) → <b>IRM</b> (schwannome).",
      "Vertige avec <b>signes centraux</b> (HINTS central, nystagmus vertical/multidirectionnel, déficit neuro) → <b>IRM</b> en urgence.",
      "Surdité de transmission à tympan normal (suspicion otospongiose) ou cholestéatome → <b>TDM rochers</b>.",
      "Signes de 3e fenêtre (autophonie, vertige au bruit/pression — Tullio) → <b>TDM coupes fines</b> du canal supérieur.",
      "Bilan pré-implant ou préchirurgical → <b>TDM + IRM</b> selon le geste."
    ])}

    ${box("redflag", `Acouphène <strong>pulsatile</strong>, surdité <strong>rapidement progressive ou asymétrique</strong>, vertige avec
    <strong>signe neurologique</strong> : ne pas se contenter d'un audiogramme — imagerie adaptée et avis spécialisé.`)}
    ${box("specialiste", `Le chirurgien attend un compte rendu qui précise : côté, structure atteinte, rapports anatomiques
    (nerf facial, golfe jugulaire, méninge), perméabilité cochléaire, calibre du nerf cochléaire, et toute variante à risque opératoire.
    Une imagerie « normale » mal ciblée ne lui suffit pas : précisez la question clinique sur la demande.`)}
    ${box("piege", `Une IRM « normale » faite trop tôt ou sans séquences adaptées ne rassure pas définitivement : devant une
    forte suspicion (ex. schwannome), discuter le protocole avec le radiologue et le suivi.`)}
    ${box("erreur", `Demander un scanner pour une surdité de perception isolée (peu rentable) ou une IRM pour explorer la chaîne
    ossiculaire (l'os se voit au scanner). Choisir l'examen selon la <em>structure</em> suspectée.`)}`
  },

  /* ---------------- MODULE 3 : AUDIOLOGIE CLINIQUE ---------------- */
  {
    id: "b1-audio-clinique", ico: "🔊", titre: "M3 · Audiologie clinique — les examens",
    niveau: NIV.inter,
    html: `
    <p class="lead">Panorama des examens auditifs : objectif, indications, réalisation, résultats normaux/pathologiques,
    pièges et conduite à tenir. La pratique fine de l'audiométrie est détaillée au Module 4 et au Bloc 2.</p>

    <h3>1. Physiologie de l'audition (rappel utile)</h3>
    <p>Onde sonore → tympan → osselets (adaptation d'impédance) → fenêtre ovale → onde dans les liquides → déplacement de la
    membrane basilaire (tonotopie) → stimulation CCI → message dans le nerf VIII → voies centrales → perception.
    Les <strong>CCE amplifient</strong> et affinent ; leur intégrité conditionne sensibilité et OEA.</p>

    <h3>2. Audiométrie tonale liminaire</h3>
    <ul>
      <li><strong>Objectif</strong> : seuils auditifs par fréquence, en conduction aérienne (CA) et osseuse (CO).</li>
      <li><strong>Indications</strong> : toute plainte auditive, acouphène, vertige, surveillance bruit, bilan préopératoire.</li>
      <li><strong>Résultat</strong> : audiogramme. CA-CO superposées = perception ; <strong>Rinne audiométrique</strong> (écart CA-CO) = composante transmissionnelle.</li>
      <li><strong>Pièges</strong> : masquage insuffisant (cf. M4), non-réponses, simulation.</li>
    </ul>

    <h3>3. Audiométrie vocale</h3>
    <ul>
      <li><strong>Objectif</strong> : intelligibilité (% de mots compris selon l'intensité) → reflète l'audition « utile ».</li>
      <li><strong>Intérêt</strong> : confronter à la tonale ; dépister une atteinte rétrocochléaire ; évaluer le bénéfice prothétique.</li>
    </ul>
    ${box("piege", `<strong>Discordance tonale/vocale</strong> : une intelligibilité effondrée par rapport aux seuils tonals (ou une
    chute paradoxale aux fortes intensités, « roll-over ») évoque une atteinte <strong>rétrocochléaire</strong> → IRM, PEA.`)}

    <h3>4. Impédancemétrie : tympanométrie & réflexes stapédiens</h3>
    ${tbl(["Examen", "Mesure", "Interprétation type"], [
      ["Tympanométrie", "Compliance de l'oreille moyenne selon la pression", "Pic normal (type A) ; plat (type B) → épanchement/perforation ; décalé (type C) → dépression tubaire"],
      ["Réflexe stapédien", "Contraction réflexe au son fort", "Présent = arc réflexe intègre ; absent → transmission, atteinte rétrocochléaire ou facial"]
    ])}
    ${box("retenir", `Tympano <strong>plate (B)</strong> + surdité de transmission de l'enfant = otite séromuqueuse jusqu'à preuve du contraire.
    Réflexes stapédiens absents avec audition tonale conservée = signal d'alerte rétrocochléaire.`)}

    <h3>5. Otoémissions acoustiques (OEA) & produits de distorsion (DPOAE)</h3>
    <ul>
      <li><strong>Objectif</strong> : tester le fonctionnement des <strong>CCE</strong> (sons réémis par la cochlée).</li>
      <li><strong>OEA présentes</strong> → CCE fonctionnelles → audition périphérique probablement ≥ ~30 dB.</li>
      <li><strong>Usage</strong> : dépistage néonatal, suivi ototoxicité, argument pour <strong>neuropathie auditive</strong> (OEA présentes mais PEA anormaux).</li>
    </ul>

    <h3>6. Potentiels évoqués auditifs (PEA / ABR) & ASSR</h3>
    <ul>
      <li><strong>PEA</strong> : réponses électriques des voies auditives (clics, tone burst). <strong>Objectif</strong> : estimer le seuil
      (nourrisson, non-coopérant), explorer la voie rétrocochléaire (latences, morphologie).</li>
      <li><strong>ASSR</strong> : estimation de seuils fréquentiels objectifs, utile en pédiatrie.</li>
      <li><strong>Speech ABR</strong> (Bloc 2) : exploration des réponses à la parole.</li>
    </ul>
    ${box("retenir", `Combinaison clé en pédiatrie et dans les surdités complexes : <strong>OEA + PEA</strong>.
    OEA présentes + PEA désorganisés = profil de <strong>neuropathie/désynchronisation auditive</strong>.`)}

    <h3>7. Exploration de l'audition centrale & endocochléaire</h3>
    <ul>
      <li><strong>Audition centrale</strong> (M7, Bloc 2) : tests d'écoute dichotique, dans le bruit, etc. — plainte avec audiogramme normal.</li>
      <li><strong>Fonction endocochléaire / hydrops</strong> : électrocochléographie et techniques dédiées (recherche d'hydrops dans Ménière) — pratique spécialisée.</li>
      <li><strong>Mesure des acouphènes</strong> : acouphénométrie (hauteur, intensité), recherche d'hyperacousie — oriente la thérapie sonore (Bloc 2).</li>
    </ul>

    <h3>Tableau de synthèse — quel examen pour quelle question ?</h3>
    ${tbl(["Question clinique", "Examen de 1re intention"], [
      ["Y a-t-il une surdité et de quel type ?", "Tonale + tympanométrie"],
      ["L'audition est-elle utile (intelligibilité) ?", "Vocale"],
      ["Les CCE fonctionnent-elles ?", "OEA / DPOAE"],
      ["Atteinte rétrocochléaire ?", "PEA + réflexes stapédiens (± IRM)"],
      ["Seuil objectif chez le nourrisson ?", "PEA / ASSR (+ OEA)"],
      ["Plainte avec audiogramme normal ?", "Tests d'audition centrale (M7)"]
    ])}
    ${box("erreur", `Confondre « examen normal » et « examen non contributif » : des OEA présentes n'excluent pas une surdité
    rétrocochléaire ; un audiogramme normal n'exclut pas un trouble central.`)}`
  },

  /* ---------------- MODULE 4 : AUDIOMÉTRIE PRATIQUE ---------------- */
  {
    id: "b1-audiometrie", ico: "📈", titre: "M4 · Audiométrie pratique",
    niveau: NIV.inter,
    html: `
    <p class="lead">Module très concret : comment réaliser une audiométrie fiable, et comment lire l'audiogramme en quelques minutes.</p>

    <h3>1. Avant l'examen</h3>
    ${checklist([
      "Otoscopie préalable (éliminer un bouchon, une OSM, une perforation) — sinon résultats faussés.",
      "Environnement sonore calme / cabine ; matériel calibré (vérifier la date de calibration).",
      "Anamnèse : côté, ancienneté, fluctuations, acouphène, vertige, exposition au bruit, ototoxiques.",
      "Consignes claires au patient : « signalez dès que vous entendez, même très faiblement »."
    ])}

    <h3>2. Réalisation — conduction aérienne (CA)</h3>
    <ul>
      <li>Casque correctement posé ; tester d'abord la <strong>meilleure oreille</strong> (souvent), fréquence de départ ~1000 Hz.</li>
      <li>Méthode ascendante/descendante pour cerner le seuil (plus faible intensité entendue de façon reproductible).</li>
      <li>Tester les fréquences clés (graves → aigus), avec contrôle de cohérence.</li>
    </ul>

    <h3>3. Conduction osseuse (CO)</h3>
    <ul>
      <li>Vibrateur sur la mastoïde (ou front). La CO court-circuite l'oreille externe/moyenne → teste l'oreille <strong>interne</strong>.</li>
      <li><strong>CO normale + CA abaissée</strong> = surdité de <strong>transmission</strong> (Rinne audiométrique « ouvert »).</li>
      <li><strong>CA et CO abaissées et superposées</strong> = surdité de <strong>perception</strong>.</li>
    </ul>

    <h3>4. Le masquage (et ses pièges)</h3>
    <p>Quand une oreille est bien meilleure que l'autre, le son testé peut être perçu par l'oreille <strong>controlatérale</strong>
    (transfert crânien). On masque alors l'oreille non testée par un bruit pour « l'occuper ».</p>
    ${box("piege", `Pièges du masquage : <strong>sous-masquage</strong> (l'oreille opposée répond → faux seuil) et
    <strong>sur-masquage</strong> (le bruit traverse et masque l'oreille testée). Le masquage est <strong>indispensable</strong> dès
    qu'il existe un écart important entre oreilles, surtout en CO (qui n'est quasiment pas atténuée par le crâne).`)}
    ${box("erreur", `Oublier de masquer en conduction osseuse : c'est l'erreur classique qui fait diagnostiquer à tort une
    « cophose controlatérale qui entend » ou une fausse surdité de perception. Au moindre doute d'asymétrie → masquer.`)}

    <h3>5. Lire un audiogramme — méthode en 5 temps</h3>
    ${algo([
      "<b>Vérifier la fiabilité</b> : otoscopie faite ? masquage correct ? réponses cohérentes ?",
      "<b>Type</b> : comparer CA et CO. Écart CA-CO = transmission ; CA=CO abaissées = perception ; les deux = mixte.",
      "<b>Degré</b> : léger / moyen / sévère / profond (selon référentiel utilisé — à préciser localement).",
      "<b>Forme</b> : sur les aigus (bruit, presbyacousie), sur les graves, plate, en cuvette, en encoche (4000 Hz : bruit).",
      "<b>Symétrie</b> : symétrique vs asymétrique (→ alerte si asymétrie inexpliquée)."
    ])}

    <h3>6. Profils typiques</h3>
    ${tbl(["Profil audiométrique", "Évoque"], [
      ["Transmission, tympan anormal", "Bouchon, OSM, perforation, cholestéatome"],
      ["Transmission, tympan normal", "Otospongiose, blocage/luxation ossiculaire (→ scanner)"],
      ["Perception aigus + encoche 4 kHz", "Traumatisme sonore / presbyacousie"],
      ["Perception asymétrique", "Schwannome jusqu'à preuve du contraire → IRM"],
      ["Perception sur les graves, fluctuante", "Hydrops / Ménière (à confronter à la clinique)"],
      ["Mixte", "Otospongiose évoluée, otite chronique, association de causes"]
    ])}

    <h3>7. Situations particulières</h3>
    <ul>
      <li><strong>Fausses surdités / simulation</strong> : incohérences tonale/vocale, réponses fluctuantes ; recourir aux examens
      <strong>objectifs</strong> (OEA, PEA, réflexes).</li>
      <li><strong>Non-réponses</strong> : revoir consignes, intensité, appareillage du test ; ne pas conclure trop vite à une cophose.</li>
      <li><strong>Discordance tonale/vocale</strong> : penser rétrocochléaire / central.</li>
    </ul>

    ${box("retenir", `Trois réflexes : (1) <strong>otoscopie avant audiométrie</strong> ; (2) <strong>masquer</strong> dès qu'il y a asymétrie ;
    (3) une <strong>asymétrie</strong> ou une <strong>discordance tonale/vocale</strong> inexpliquée = signal d'alerte (IRM/PEA, avis ORL).`)}

    <h4>Checklist « après l'examen »</h4>
    ${checklist([
      "Audiogramme daté, oreilles et masquage notés.",
      "Type + degré + forme + symétrie conclus.",
      "Confrontation à la clinique et à la vocale.",
      "Décision : surveillance / appareillage / examens complémentaires / adressage.",
      "Compte rendu et information du patient."
    ])}`
  },

  /* ---------------- MODULE 5 : PÉDIATRIE ---------------- */
  {
    id: "b1-pediatrie", ico: "🍼", titre: "M5 · Audiologie du nourrisson, de l'enfant & de l'adolescent",
    niveau: NIV.inter,
    html: `
    <p class="lead">Chez l'enfant, le temps est un organe : tout retard de diagnostic d'une surdité a un coût sur le langage.
    L'enjeu est de <strong>dépister tôt, confirmer objectivement, et adapter à l'âge</strong>.</p>

    <h3>1. Dépistage néonatal & outils objectifs</h3>
    <ul>
      <li><strong>OEA automatisées</strong> : rapides, dépistent l'atteinte cochléaire (CCE). Ne détectent pas une neuropathie.</li>
      <li><strong>PEA automatisés (a-ABR)</strong> : dépistent aussi la voie rétrocochléaire ; préférés notamment en réanimation néonatale (risque de neuropathie).</li>
      <li>Un test de dépistage <strong>non concluant</strong> impose un <strong>recontrôle puis un bilan diagnostique</strong> (PEA diagnostiques, ASSR), pas une simple réassurance.</li>
    </ul>
    ${box("piege", `Des OEA normales n'excluent pas une <strong>neuropathie auditive</strong> (CCE intactes mais transmission nerveuse anormale).
    En cas de facteurs de risque (prématurité, ictère sévère, réanimation), privilégier/associer les <strong>PEA</strong>.`)}

    <h3>2. Audiométrie selon l'âge (comportementale & conditionnée)</h3>
    ${tbl(["Âge approximatif", "Technique", "Principe"], [
      ["Nourrisson", "Objective (OEA, PEA, ASSR) + observation comportementale", "Réactions au son (réflexe, orientation)"],
      ["~6 mois–2 ans", "Audiométrie par renforcement visuel (VRA)", "L'enfant tourne la tête vers le son, récompense visuelle"],
      ["~2–5 ans", "Audiométrie conditionnée / ludique (peep-show, jeu)", "L'enfant agit (mettre un jeton) quand il entend"],
      ["Grand enfant / ado", "Audiométrie « adulte » tonale et vocale", "Coopération suffisante"]
    ])}
    ${box("retenir", `Adapter la <strong>méthode à l'âge développemental</strong>, pas seulement à l'âge civil. Chez l'enfant non coopérant,
    croiser plusieurs techniques et toujours confronter aux examens objectifs.`)}

    <h3>3. Pathologies fréquentes & causes</h3>
    <ul>
      <li><strong>Otite séromuqueuse (OSM)</strong> : cause n°1 de surdité de transmission de l'enfant ; tympano plate, impact sur langage/apprentissage si bilatérale prolongée.</li>
      <li><strong>Surdités congénitales</strong> : génétiques (souvent), CMV congénital, malformations.</li>
      <li><strong>Surdités évolutives</strong> : peuvent s'aggraver (ex. EVA — dilatation de l'aqueduc vestibulaire) → revoir régulièrement.</li>
      <li><strong>CMV congénital</strong> : 1re cause non génétique de surdité neurosensorielle de l'enfant ; surdité parfois retardée/évolutive → diagnostic précoce important (fenêtre de confirmation néonatale).</li>
    </ul>

    <h3>4. Quand demander un bilan génétique ?</h3>
    ${box("adresser", `Devant une surdité de perception <strong>permanente</strong> de l'enfant, après confrontation clinique et imagerie,
    un <strong>bilan étiologique incluant la génétique</strong> et la recherche de CMV (selon l'âge et le contexte) se discute en
    <strong>centre spécialisé / ORL pédiatrique</strong>. Rechercher des signes syndromiques (rein, œil, thyroïde, cœur, anomalies pigmentaires).`)}

    <h3>5. Troubles du langage & audition</h3>
    ${box("retenir", `Tout <strong>retard de langage</strong> impose de <strong>vérifier l'audition</strong> avant toute autre conclusion.
    Un enfant qui « n'écoute pas » ou parle peu peut être malentendant, pas opposant.`)}

    <h3>6. Conduite devant une suspicion de surdité chez l'enfant</h3>
    ${algo([
      "Recueillir : dépistage néonatal, facteurs de risque, langage, comportement, antécédents familiaux.",
      "Otoscopie + tympanométrie (éliminer/quantifier une OSM).",
      "Évaluation auditive adaptée à l'âge (comportementale/conditionnée) + objective (OEA/PEA).",
      "Si surdité permanente confirmée → ORL pédiatrique / centre : étiologie (imagerie, CMV, génétique), appareillage précoce, accompagnement orthophonique.",
      "Suivi rapproché (surdité possiblement évolutive)."
    ])}
    ${box("redflag", `Méningite, traumatisme crânien, ototoxiques, surdité d'apparition ou d'aggravation rapide, surdité unilatérale
    chez l'enfant : avis spécialisé sans attendre.`)}
    ${box("patient", `Aux parents : le dépistage n'est pas un diagnostic ; un test « à recontrôler » est fréquent et ne signifie pas
    surdité. Mais une surdité confirmée doit être prise en charge <strong>tôt</strong> car elle conditionne le langage. Le suivi est essentiel car certaines surdités évoluent.`)}`
  },

  /* ---------------- MODULE 6 : SUJET ÂGÉ ---------------- */
  {
    id: "b1-age", ico: "🧓", titre: "M6 · Audiologie du sujet âgé",
    niveau: NIV.inter,
    html: `
    <p class="lead">La presbyacousie n'est pas qu'un problème d'oreille : c'est un enjeu de cognition, de lien social et de chute.</p>

    <h3>1. Presbyacousie</h3>
    <ul>
      <li>Surdité de perception bilatérale, symétrique, prédominant sur les <strong>aigus</strong>, d'installation progressive.</li>
      <li>Plainte typique : « j'entends mais je ne comprends pas », surtout <strong>dans le bruit</strong>.</li>
    </ul>
    ${box("erreur", `Tout mettre sur le compte de l'âge sans otoscopie ni audiogramme : on rate bouchons, OSM, et surtout les
    <strong>asymétries</strong> (→ IRM). Une presbyacousie est <em>symétrique</em> ; une asymétrie n'est pas « l'âge ».`)}

    <h3>2. Audition, cognition, isolement, chutes</h3>
    ${box("retenir", `La perte auditive non corrigée est associée à l'isolement social, à un retentissement cognitif et à un risque
    accru de chute. <strong>Dépister et appareiller</strong> participe à la prévention gériatrique globale (à intégrer dans une approche multifactorielle).`)}

    <h3>3. Bilan adapté & limites de l'audiométrie chez le patient fragile</h3>
    <ul>
      <li>Adapter consignes, durée, et environnement ; tolérer les pauses.</li>
      <li>Recourir aux examens <strong>objectifs</strong> si la coopération est limitée (troubles cognitifs).</li>
      <li>Vérifier dextérité/vision pour la manipulation des aides auditives.</li>
    </ul>

    <h3>4. Appareillage</h3>
    ${box("patient", `Au patient et à l'entourage : l'appareil auditif ne « rend » pas une oreille neuve mais améliore nettement la
    compréhension et la communication, surtout s'il est posé tôt et utilisé régulièrement. Une période d'adaptation est normale ;
    l'accompagnement (audioprothésiste, famille) est déterminant pour l'observance.`)}

    <h3>5. Surdité en EHPAD</h3>
    ${box("note", `En institution : penser systématiquement au <strong>bouchon de cérumen</strong> (cause réversible fréquente et sous-diagnostiquée),
    vérifier l'<strong>entretien et le port effectif</strong> des aides auditives, et former les soignants à la communication (face à face, articuler, réduire le bruit ambiant).`)}

    <h3>6. Coordination</h3>
    ${box("adresser", `Coordonner médecin traitant ↔ ORL ↔ audioprothésiste ↔ famille/EHPAD ↔ orthophoniste si besoin.
    Adresser à l'ORL devant : asymétrie, surdité brusque/rapidement évolutive, otorrhée, douleur, suspicion de cause autre que presbyacousie.`)}

    <h4>Comparatif des âges</h4>
    ${tbl(["Critère", "Enfant", "Adulte", "Sujet âgé"], [
      ["Enjeu majeur", "Langage, développement", "Vie professionnelle, sociale", "Cognition, autonomie, chutes"],
      ["Méthode audiométrique", "Comportementale/conditionnée + objective", "Standard", "Standard adaptée ± objective"],
      ["Cause fréquente", "OSM, congénitale, CMV", "Bruit, otospongiose, brusque", "Presbyacousie, bouchon"],
      ["Priorité", "Dépister/traiter tôt", "Éliminer asymétrie/urgence", "Appareiller, prévenir l'isolement et la chute"]
    ])}`
  },

  /* ---------------- MODULE 7 : AUDITION CENTRALE ---------------- */
  {
    id: "b1-centrale", ico: "🧠", titre: "M7 · Audition centrale",
    niveau: NIV.avance,
    html: `
    <p class="lead">« J'entends mais je ne comprends pas » avec un audiogramme normal : penser au traitement central de l'audition.</p>

    <h3>1. Définition & signes d'appel</h3>
    <p>Les troubles du traitement auditif central désignent une difficulté à <strong>traiter</strong> l'information sonore malgré une
    audition périphérique normale (ou expliquant mal la plainte). Signes : difficulté de compréhension <strong>dans le bruit</strong>,
    à localiser les sons, à suivre une consigne complexe, fatigabilité auditive.</p>

    <h3>2. Diagnostic différentiel essentiel</h3>
    ${box("piege", `Avant d'évoquer un trouble « central » : (1) refaire/vérifier l'<strong>audiogramme</strong> (déficits aigus discrets,
    atteinte rétrocochléaire) ; (2) penser aux causes <strong>attentionnelles, cognitives, neurologiques, psychologiques</strong> et,
    chez l'enfant, au <strong>langage</strong>. Le « central » est un diagnostic d'argumentation, pas d'élimination paresseuse.`)}

    <h3>3. Tests & explorations</h3>
    <ul>
      <li>Tests comportementaux : compréhension dans le bruit, écoute dichotique, tâches temporelles (détaillés au Bloc 2).</li>
      <li>Explorations objectives : PEA, parfois potentiels plus tardifs / speech ABR (indications spécialisées).</li>
    </ul>
    ${box("note", `Les tests d'audition centrale demandent une <strong>standardisation</strong> et une interprétation experte (âge, langue,
    attention, niveau cognitif). Leurs limites diagnostiques sont réelles : à interpréter en contexte, pas isolément.`)}

    <h3>4. Affections neurologiques associées</h3>
    <p>SEP, séquelles d'AVC, pathologies dégénératives, traumatisme crânien peuvent retentir sur le traitement auditif central.</p>

    <h3>5. Orientation</h3>
    ${box("adresser", `Plainte d'intelligibilité avec audiogramme normal et retentissement réel → adresser pour
    <strong>évaluation spécialisée</strong> (ORL/audiologie + selon contexte neurologie, orthophonie, neuropsychologie).
    Chez l'enfant, coordonner avec orthophoniste et équipe scolaire.`)}`
  },

  /* ---------------- MODULE 8 : MALADIES PROFESSIONNELLES ---------------- */
  {
    id: "b1-pro", ico: "🏭", titre: "M8 · Bruit professionnel & surveillance audiologique",
    niveau: NIV.inter,
    html: `
    <p class="lead">Le traumatisme sonore chronique est évitable. La surveillance audiométrique a une dimension clinique
    <em>et</em> médico-légale.</p>

    <h3>1. Mécanisme & profil audiométrique</h3>
    <p>L'exposition au bruit lèse les CCE de la base cochléaire → atteinte de perception prédominant sur les aigus, avec
    typiquement une <strong>encoche sur 4000 Hz</strong> au début, puis élargissement.</p>

    <h3>2. Audiogramme de surveillance & critères d'alerte</h3>
    ${box("note", `Comparer aux audiogrammes <strong>antérieurs</strong> (référence d'embauche) : c'est l'<strong>évolution</strong> qui alerte.
    Les seuils d'aggravation et les modalités de surveillance relèvent des <strong>référentiels de médecine du travail en vigueur</strong> —
    à vérifier localement. Toute aggravation significative doit être documentée et explorée.`)}

    <h3>3. Prévention & protection</h3>
    ${checklist([
      "Réduction du bruit à la source (priorité collective).",
      "Protection auditive individuelle adaptée et effectivement portée.",
      "Information/formation du salarié.",
      "Surveillance audiométrique régulière selon le poste."
    ])}

    <h3>4. Conduite à tenir devant une aggravation</h3>
    ${algo([
      "Confirmer l'aggravation (otoscopie, audiogramme fiable, comparaison aux antérieurs).",
      "Éliminer une autre cause (asymétrie → IRM ; brusque → urgence).",
      "Renforcer la protection / adapter le poste.",
      "Orientation médecine du travail + ORL ; traçabilité (médico-légal)."
    ])}
    ${box("redflag", `Une surdité <strong>asymétrique</strong> ou <strong>brusque</strong> n'est pas une surdité « du bruit » : ne pas l'étiqueter
    professionnelle sans avoir éliminé une autre cause (notamment schwannome, surdité brusque).`)}
    ${box("piege", `Pièges médico-légaux : audiogramme non comparatif, otoscopie non faite, masquage négligé, absence de traçabilité.
    Un compte rendu daté, comparatif et rigoureux protège le patient <em>et</em> le praticien.`)}`
  },

  /* ---------------- MODULE 9 : SURDITÉS, ACOUPHÈNES, PATHOLOGIES ---------------- */
  {
    id: "b1-surdites", ico: "👂", titre: "M9 · Surdités, acouphènes & pathologies de l'audition",
    niveau: NIV.inter,
    html: `
    <p class="lead">Module clinique central. Pour chaque entité : reconnaître, hiérarchiser l'urgence, explorer, orienter.</p>

    <h3>Les trois types de surdité</h3>
    ${tbl(["Type", "CA / CO", "Causes types", "Examen clé"], [
      ["Transmission", "CA abaissée, CO normale (Rinne ouvert)", "Bouchon, OSM, perforation, otospongiose, cholestéatome", "Otoscopie, tympanométrie, scanner"],
      ["Perception", "CA = CO abaissées", "Presbyacousie, bruit, brusque, schwannome, ototoxiques", "Audiogramme, OEA/PEA, IRM si asymétrie"],
      ["Mixte", "CA et CO abaissées + écart CA-CO", "Otospongiose évoluée, otite chronique, causes combinées", "Scanner + audiologie complète"]
    ])}

    <h3>⚡ Surdité brusque — urgence</h3>
    <p>Surdité de perception d'installation rapide (typiquement en moins de 72 h), souvent unilatérale, parfois avec acouphène/vertige.</p>
    ${box("redflag", `La <strong>surdité brusque de perception</strong> est une <strong>urgence</strong> : adressage ORL <strong>sans délai</strong>
    (la précocité de la prise en charge conditionne le pronostic). Éliminer une cause centrale (signes neuro associés → urgence neurovasculaire).
    Bilan ultérieur : audiogramme, et <strong>IRM</strong> pour ne pas manquer un schwannome.`)}
    ${box("erreur", `Rassurer et reporter (« ça va revenir », « c'est un bouchon ») une surdité brusque de perception : c'est l'erreur à ne pas commettre.`)}

    <h3>Acouphènes</h3>
    <ul>
      <li><strong>Subjectif</strong> (majorité), souvent associé à une perte auditive.</li>
      <li><strong>Unilatéral / pulsatile</strong> → bilan ciblé (IRM, imagerie vasculaire) : ne pas banaliser.</li>
    </ul>
    ${box("adresser", `Acouphène <strong>unilatéral</strong>, <strong>pulsatile</strong>, avec surdité asymétrique, vertige ou signe neuro → ORL + imagerie.
    Acouphène bilatéral chronique avec presbyacousie : prise en charge (information, sevrage de l'attention, thérapie sonore, appareillage si surdité).`)}
    ${box("patient", `À expliquer : l'acouphène est fréquent, rarement signe de gravité quand il est bilatéral et stable ; le stress, la fatigue
    et le silence l'amplifient. Des approches existent (thérapie sonore, gestion de l'attention, appareillage) ; l'objectif est l'<em>habituation</em>.`)}

    <h3>Hyperacousie</h3>
    <p>Intolérance aux sons d'intensité normale, souvent associée acouphènes/anxiété. Prise en charge progressive (éviter la
    surprotection auditive qui aggrave), thérapie sonore.</p>

    <h3>Neuropathie auditive & synaptopathie cochléaire</h3>
    ${tbl(["Entité", "Mécanisme", "Profil"], [
      ["Neuropathie/désynchronisation auditive", "Atteinte synapse CCI–nerf ou nerf : transmission désynchronisée", "<strong>OEA présentes</strong>, <strong>PEA anormaux/désorganisés</strong>, intelligibilité souvent effondrée"],
      ["Synaptopathie cochléaire (« hidden hearing loss »)", "Perte de synapses malgré seuils normaux", "Plainte dans le bruit avec audiogramme normal (concept en partie discuté)"]
    ])}
    ${box("note", `La synaptopathie cochléaire « cachée » est un concept partiellement <strong>discuté/en recherche</strong> chez l'humain :
    l'évoquer comme hypothèse, pas comme certitude diagnostique.`)}

    <h3>Atteintes par cause</h3>
    ${tbl(["Catégorie", "Exemples", "Points clés / conduite"], [
      ["Syndromiques / génétiques", "Surdités isolées ou syndromiques (rein, œil, cœur, thyroïde, pigmentation)", "Antécédents familiaux, signes associés → bilan génétique en centre"],
      ["Maladies systémiques / auto-immunes", "Atteintes cochléo-vestibulaires auto-immunes", "Surdité fluctuante/rapidement progressive bilatérale → avis spécialisé"],
      ["CMV materno-fœtal", "Surdité congénitale ± évolutive", "Diagnostic néonatal, suivi, ORL pédiatrique"],
      ["Ototoxiques", "Aminosides, sels de platine, certains diurétiques, etc.", "Surveillance audiométrique/OEA ; informer ; réévaluer le traitement avec le prescripteur"],
      ["Traumatiques", "Trauma sonore, barotraumatisme, fracture du rocher, commotion", "Otoscopie, audiogramme, imagerie selon contexte ; éliminer fistule"]
    ])}

    <h3>Trame d'analyse — pour chaque pathologie auditive</h3>
    ${algo([
      "<b>Définition / physiopathologie</b> : où est la lésion ?",
      "<b>Interrogatoire ciblé</b> : côté, mode d'installation, fluctuation, acouphène/vertige, exposition, ototoxiques, ATCD familiaux.",
      "<b>Examen clinique</b> : otoscopie, acoumétrie (Rinne/Weber), examen neuro/otoneuro si vertige.",
      "<b>Examens complémentaires</b> : audiogramme, tympano, OEA/PEA, imagerie ciblée.",
      "<b>Diagnostic différentiel</b> et <b>critères de gravité</b>.",
      "<b>Prise en charge initiale + orientation</b> + suivi + conseils patient."
    ])}

    ${box("retenir", `Trois urgences/alertes à ne jamais manquer en audition : <strong>surdité brusque de perception</strong> (adressage immédiat),
    <strong>surdité/acouphène asymétrique ou unilatéral</strong> (IRM, schwannome), <strong>signes neurologiques associés</strong> (urgence neurovasculaire).`)}`
  },

  /* ---------------- MODULE 10 : VESTIBULOGIE CLINIQUE ---------------- */
  {
    id: "b1-vestibulo", ico: "🌀", titre: "M10 · Vestibulogie clinique",
    niveau: NIV.inter,
    html: `
    <p class="lead">Le vertige est un symptôme, pas un diagnostic. La première question n'est pas « quelle oreille ? » mais
    « <strong>périphérique ou central ?</strong> ».</p>

    <h3>1. Physiologie vestibulaire (rappel)</h3>
    <p>Canaux (rotations) + otolithes (linéaire/gravité) → noyaux vestibulaires → RVO (regard), voies spinales (posture),
    cervelet, cortex (perception). Un déséquilibre <strong>asymétrique</strong> du tonus vestibulaire crée l'illusion de mouvement = vertige.</p>

    <h3>2. Déficit vestibulaire unilatéral aigu</h3>
    <ul>
      <li>Grand vertige rotatoire prolongé, nystagmus <strong>horizonto-rotatoire battant vers le côté sain</strong>, déviation vers le côté atteint, nausées.</li>
      <li>HIT positif du côté atteint ; pas de signe central (HINTS « périphérique »).</li>
    </ul>
    ${box("redflag", `Le piège vital : un <strong>AVC cérébelleux/du tronc</strong> peut imiter un déficit périphérique. D'où l'examen
    <strong>HINTS</strong> (M11) : c'est lui qui tranche, pas l'intensité du vertige.`)}

    <h3>3. Déficit vestibulaire bilatéral</h3>
    <ul>
      <li>Pas de « vertige rotatoire » typique mais <strong>instabilité chronique</strong> + <strong>oscillopsie</strong> (le décor « saute » à la marche/aux mouvements de tête).</li>
      <li>Causes : ototoxicité (aminosides), maladies dégénératives/auto-immunes, idiopathique.</li>
    </ul>

    <h3>4. Compensation vestibulaire & répercussions</h3>
    ${box("retenir", `Après un déficit unilatéral, le cerveau <strong>compense</strong> (rééquilibrage central) : le vertige cède en jours/semaines.
    La <strong>rééducation</strong> (M14) accélère et solidifie cette compensation. Les troubles vestibulaires ont aussi des
    <strong>répercussions cognitives</strong> (attention, mémoire spatiale, fatigue) et, chez l'enfant avec déficit complet, un retentissement
    <strong>moteur/développemental</strong>.`)}

    <h3>5. Les grandes entités</h3>
    ${tbl(["Pathologie", "Durée typique de la crise", "Signe distinctif", "Audition"], [
      ["VPPB", "Secondes (positionnel)", "Déclenché par les changements de position ; manœuvres +", "Normale"],
      ["Maladie de Ménière", "Minutes–heures", "Vertige + surdité fluctuante + acouphène/plénitude", "Atteinte fluctuante (graves)"],
      ["Névrite / déficit aigu", "Jours", "Grand vertige continu, HIT+, pas de signe central", "Normale (névrite)"],
      ["Migraine vestibulaire", "Variable (min–heures, parfois jours)", "Contexte migraineux, photo/phonophobie, céphalées", "Souvent normale"],
      ["Cause centrale (AVC, SEP…)", "Variable", "Signes neuro, HINTS central, nystagmus central", "Variable"]
    ])}

    <h3>6. Vertiges otolithiques, fonctionnels, ophtalmologiques, traumatiques</h3>
    <ul>
      <li><strong>Otolithiques</strong> : sensations d'inclinaison, instabilité ; explorés par VEMP.</li>
      <li><strong>Fonctionnels</strong> (ex. vertige/instabilité posturo-perceptuel persistant) : instabilité chronique majorée par les
      stimuli visuels et les situations, sans déficit objectif expliquant l'intensité — diagnostic <strong>positif</strong>, pas d'élimination (M_Bloc3).</li>
      <li><strong>Ophtalmologiques</strong> : trouble de réfraction non corrigé, paralysie oculomotrice → instabilité/diplopie ; penser à l'examen oculomoteur.</li>
      <li><strong>Traumatiques</strong> : VPPB post-traumatique, commotion labyrinthique, fistule périlymphatique, déficit post-fracture.</li>
    </ul>

    <h3>7. Affections mixtes audio-vestibulaires</h3>
    <p>Ménière, schwannome, labyrinthite, malformations, atteintes génétiques/auto-immunes : associer plainte auditive ET vestibulaire
    doit faire évoquer une atteinte de l'oreille interne ou du nerf VIII → audiogramme + exploration vestibulaire + imagerie.</p>

    <h3>8. Vertiges selon l'âge</h3>
    ${tbl(["Âge", "Causes fréquentes / particularités"], [
      ["Enfant", "Migraine vestibulaire / vertige paroxystique bénin de l'enfant, OMA, post-infectieux ; déficit complet → retard moteur"],
      ["Adulte", "VPPB, névrite, Ménière, migraine vestibulaire, central"],
      ["Sujet âgé", "Souvent multifactoriel (vestibulaire + vision + proprioception + cognition + iatrogénie) ; VPPB fréquent et sous-diagnostiqué ; risque de chute majeur"]
    ])}
    ${box("erreur", `Étiqueter « VPPB » tout vertige du sujet âgé sans manœuvre, ou « crise d'angoisse » un vertige central.
    Toujours faire l'examen otoneurologique structuré (M11).`)}`
  },

  /* ---------------- MODULE 11 : EXAMEN OTONEUROLOGIQUE ---------------- */
  {
    id: "b1-exam-otoneuro", ico: "🩺", titre: "M11 · Examen clinique otoneurologique",
    niveau: NIV.inter,
    html: `
    <p class="lead">Le module le plus « gestes ». Un examen structuré au lit/au cabinet permet de trancher périphérique vs central
    dans la majorité des cas, souvent mieux qu'une imagerie précoce.</p>

    <h3>1. Interrogatoire du patient vertigineux</h3>
    <p>Caractériser d'abord le <strong>type de sensation</strong>, puis le <strong>timing</strong> et les <strong>déclencheurs</strong>
    (approche « TiTrATE » : Timing, Triggers, And Targeted Examination).</p>
    ${tbl(["Sensation décrite", "Oriente vers"], [
      ["Vertige rotatoire vrai", "Atteinte vestibulaire (périph. ou centrale)"],
      ["Instabilité / déséquilibre", "Bilatéral, central, sensoriel multiple, âgé"],
      ["Étourdissement / tête vide / pré-syncope", "Cause non vestibulaire (hémodynamique, métabolique)"],
      ["Malaise lipothymique", "Cardio-vasculaire / vagal — autre piste"]
    ])}
    ${box("piege", `Le « type » de sensation est utile mais <strong>peu fiable seul</strong> (les patients décrivent mal). Le
    <strong>timing + déclencheurs + examen ciblé</strong> sont plus discriminants que la seule description.`)}
    <p>Préciser : durée des crises, déclencheurs (position, mouvement de tête, effort, bruit/pression), signes associés
    (auditifs, neuro, céphalées), antécédents (migraine, vasculaire), traitements.</p>

    <h3>2. Examen — la séquence</h3>
    ${checklist([
      "Otoscopie (vésicules zostériennes ? otite ? cholestéatome ?).",
      "Recherche de nystagmus spontané (lunettes de Frenzel / vidéonystagmoscopie si possible : la fixation masque le nystagmus périphérique).",
      "Oculomotricité : poursuite, saccades, nystagmus du regard.",
      "Head Impulse Test (HIT / Halmagyi).",
      "Test of Skew (couverture alternée).",
      "Examen neurologique ciblé (paires crâniennes, cervelet, sensibilité, marche).",
      "Romberg, Fukuda/Unterberger, marche (yeux ouverts/fermés).",
      "Manœuvres positionnelles (Dix-Hallpike, supine roll test)."
    ])}

    <h3>3. HINTS — l'outil clé du vertige aigu continu</h3>
    <p>Chez un patient en <strong>syndrome vestibulaire aigu</strong> (vertige continu avec nystagmus, présent au moment de l'examen),
    HINTS = <strong>H</strong>ead <strong>I</strong>mpulse + <strong>N</strong>ystagmus + <strong>T</strong>est of <strong>S</strong>kew.</p>
    ${tbl(["Composante", "Rassurant (périphérique)", "Inquiétant (central)"], [
      ["Head Impulse Test", "<strong>Anormal</strong> (saccade de rattrapage) du côté atteint", "<strong>Normal</strong> (pas de saccade) malgré grand vertige"],
      ["Nystagmus", "Unidirectionnel, horizonto-rotatoire, ↑ regard côté sain", "Change de direction, vertical pur ou torsionnel pur"],
      ["Test of Skew", "Absent", "Présent (déviation verticale à la couverture)"]
    ])}
    ${box("redflag", `Mnémonique <strong>INFARCT</strong> = signes <em>centraux</em> : <strong>I</strong>mpulse <strong>N</strong>ormal,
    <strong>FA</strong>st-phase <strong>A</strong>lternating (nystagmus changeant), <strong>R</strong>efixation on
    <strong>C</strong>over <strong>T</strong>est (skew). Un seul signe central → IRM/avis neuro en urgence. HINTS « central » peut être
    <em>plus sensible</em> qu'une IRM précoce pour un AVC de fosse postérieure.`)}
    ${box("piege", `HINTS ne s'applique <strong>qu'au syndrome vestibulaire aigu continu avec nystagmus</strong>. L'appliquer à un patient
    sans nystagmus, ou à un vertige positionnel/épisodique, n'a pas de sens et induit en erreur. Un HIT « normal » dans un grand vertige
    aigu est <em>inquiétant</em>, pas rassurant.`)}

    <h3>4. Romberg, Fukuda, marche</h3>
    <ul>
      <li><strong>Romberg</strong> : chute/déviation yeux fermés → déficit vestibulaire ou proprioceptif.</li>
      <li><strong>Fukuda (piétinement)</strong> : rotation vers le côté déficitaire (à interpréter avec prudence, peu spécifique).</li>
      <li><strong>Marche</strong> : déviation, élargissement du polygone, marche en étoile ; ataxie franche → central.</li>
    </ul>

    <h3>5. Manœuvres positionnelles & VPPB</h3>
    <p><strong>Dix-Hallpike</strong> : diagnostic du VPPB du <strong>canal postérieur</strong> (le plus fréquent) → nystagmus
    <strong>torsionnel/géotropique, retardé, paroxystique, épuisable</strong>, après une latence.</p>
    <p><strong>Supine roll test</strong> : diagnostic du VPPB du <strong>canal horizontal</strong> (nystagmus horizontal géotropique
    = canalolithiase ; apogéotropique = cupulolithiase).</p>
    ${tbl(["Caractère du nystagmus positionnel", "Périphérique (VPPB typique)", "Suspicion centrale"], [
      ["Latence", "Quelques secondes", "Absente"],
      ["Durée", "Bref, épuisable (< ~1 min)", "Persistant, non épuisable"],
      ["Direction", "Concordante avec le canal stimulé (torsionnel/géotropique au D-H)", "Vertical pur vers le bas (downbeat), incongruente"],
      ["Symptômes", "Vertige intense bref, fatigable", "Souvent moins de vertige que le nystagmus, signes neuro"]
    ])}
    ${tbl(["VPPB", "Manœuvre diagnostique", "Mécanisme"], [
      ["Canal postérieur", "Dix-Hallpike", "Canalolithiase (le plus souvent)"],
      ["Canal horizontal", "Supine roll test", "Canalolithiase (géotropique) ou cupulolithiase (apogéotropique)"],
      ["Canal antérieur (rare)", "Dix-Hallpike / formes particulières", "Rare ; downbeat → prudence (éliminer central)"]
    ])}
    ${box("erreur", `Confondre <strong>canalolithiase</strong> (otolithes libres dans le canal — nystagmus bref, retardé) et
    <strong>cupulolithiase</strong> (otolithes sur la cupule — nystagmus plus durable) : cela change la manœuvre thérapeutique.
    Un nystagmus positionnel <strong>downbeat persistant</strong> n'est pas un VPPB banal → suspecter une cause centrale.`)}

    ${box("retenir", `La séquence gagnante du vertige aigu : décrire (timing/déclencheurs) → chercher le nystagmus sans fixation →
    HINTS si syndrome aigu continu → manœuvres positionnelles si vertige positionnel. L'examen prime sur l'imagerie précoce dans la
    plupart des cas, mais tout doute central impose l'imagerie.`)}`
  },

  /* ---------------- MODULE 12 : NYSTAGMUS ---------------- */
  {
    id: "b1-nystagmus", ico: "👁️", titre: "M12 · Nystagmus & mouvements oculaires anormaux",
    niveau: NIV.avance,
    html: `
    <p class="lead">Lire les yeux, c'est lire le vestibule et le tronc cérébral. Savoir distinguer un nystagmus périphérique d'un
    central est une compétence vitale.</p>

    <h3>1. Caractériser un nystagmus</h3>
    <ul>
      <li><strong>Direction</strong> de la phase rapide (horizontal, vertical, torsionnel, mixte).</li>
      <li><strong>Effet de la fixation</strong> : la fixation <em>réduit</em> le nystagmus périphérique ; elle ne réduit pas (voire majore) le central.</li>
      <li><strong>Effet du regard</strong> : loi d'Alexander (périphérique : ↑ dans le sens de la phase rapide).</li>
    </ul>

    <h3>2. Tableau comparatif périphérique vs central</h3>
    ${tbl(["Caractère", "Nystagmus périphérique", "Nystagmus central"], [
      ["Direction", "Horizonto-rotatoire, unidirectionnel", "Vertical pur, torsionnel pur, ou multidirectionnel"],
      ["Effet de la fixation", "Diminue (d'où Frenzel pour le voir)", "Inchangé ou augmenté"],
      ["Changement de sens selon le regard", "Non (reste unidirectionnel)", "Oui possible (gaze-evoked changeant)"],
      ["Signes associés", "Auditifs possibles, pas de déficit neuro", "Déficit neuro, ataxie, diplopie, dysarthrie"],
      ["HIT", "Anormal côté atteint", "Souvent normal"],
      ["Évolution", "S'atténue (compensation)", "Persistant"]
    ])}

    <h3>3. Mouvements particuliers à reconnaître</h3>
    ${tbl(["Anomalie", "Signification"], [
      ["Gaze-evoked nystagmus", "Incapacité à maintenir le regard excentré → atteinte centrale (tronc/cervelet), parfois iatrogène"],
      ["Rebound nystagmus", "Atteinte cérébelleuse"],
      ["Downbeat / upbeat nystagmus", "Atteinte centrale (jonction bulbo-médullaire, cervelet) → IRM"],
      ["Saccades anormales (dysmétrie, ralentissement)", "Atteinte cérébelleuse / tronc"],
      ["Poursuite saccadique", "Peu spécifique (attention, médicaments) mais peut témoigner d'une atteinte centrale"],
      ["Skew deviation", "Désalignement vertical → atteinte centrale (otolithique centrale)"],
      ["Oscillopsie", "Instabilité de l'image : déficit vestibulaire bilatéral (à l'effort/mvt) ou nystagmus acquis"]
    ])}
    ${box("redflag", `<strong>Nystagmus vertical pur (surtout downbeat), purement torsionnel, multidirectionnel ou changeant de sens</strong>,
    nystagmus <strong>non atténué par la fixation</strong> avec signes neuro : ce sont des signaux <strong>centraux</strong> → IRM / avis neuro.`)}
    ${box("piege", `Sans suppression de la fixation (Frenzel/vidéonystagmoscopie), on <strong>sous-estime</strong> un nystagmus périphérique.
    À l'inverse, un nystagmus qui <strong>persiste malgré la fixation</strong> doit alerter.`)}
    ${box("retenir", `Trois questions sauvent : (1) la fixation l'atténue-t-elle ? (2) la direction est-elle « permise » (horizonto-rotatoire) ou
    « suspecte » (verticale/torsionnelle pure/changeante) ? (3) y a-t-il un signe neuro associé ?`)}`
  },

  /* ---------------- MODULE 13 : EXPLORATIONS VESTIBULAIRES ---------------- */
  {
    id: "b1-explorations-vest", ico: "🧪", titre: "M13 · Explorations vestibulaires",
    niveau: NIV.avance,
    html: `
    <p class="lead">Chaque test explore un récepteur et une plage de fréquences. Les combiner permet de cartographier le vestibule.
    Détails techniques approfondis au Bloc 3.</p>

    <h3>1. Vue d'ensemble — qui teste quoi ?</h3>
    ${tbl(["Examen", "Récepteur exploré", "Plage / type de stimulus"], [
      ["Épreuves caloriques (VNG)", "Canal horizontal", "<strong>Basses fréquences</strong> (stimulus non physiologique)"],
      ["VHIT (Video Head Impulse Test)", "Les 3 canaux (par plan)", "<strong>Hautes fréquences</strong> (mouvement de tête rapide)"],
      ["Fauteuil rotatoire", "Canaux horizontaux", "Fréquences moyennes ; utile en bilatéral / enfant"],
      ["cVEMP", "Saccule / voie vestibulaire inférieure", "Réponse sacculo-colique (muscle SCM)"],
      ["oVEMP", "Utricule / voie vestibulaire supérieure", "Réponse oculaire"],
      ["Posturographie", "Intégration de l'équilibre", "Statique / dynamique (vision-proprioception-vestibule)"]
    ])}
    ${box("retenir", `Calorique = <strong>basses fréquences</strong>, VHIT = <strong>hautes fréquences</strong> : ils sont
    <strong>complémentaires</strong>, pas redondants. Une calorique altérée avec un VHIT normal (et inversement) a un sens
    (ex. profil compatible avec un hydrops/Ménière vs déficit complet).`)}

    <h3>2. Pour chaque examen : indications, interprétation, limites</h3>

    <h4>Vidéonystagmographie (VNG) & épreuves caloriques</h4>
    <ul>
      <li><strong>Indications</strong> : quantifier un déficit canalaire unilatéral, suivre une compensation, bilan de vertiges chroniques.</li>
      <li><strong>Interprétation</strong> : asymétrie (« prépondérance ») entre les deux oreilles ; aréflexie → déficit profond.</li>
      <li><strong>Limites</strong> : non physiologique, mal toléré (nausées), perturbé par cérumen / perforation / consignes.</li>
    </ul>

    <h4>VHIT</h4>
    <ul>
      <li><strong>Indications</strong> : déficit canalaire (gain du RVO), distinction périphérique/central au lit, suivi.</li>
      <li><strong>Interprétation</strong> : <strong>gain abaissé + saccades de rattrapage</strong> (overt/covert) = déficit du canal testé.</li>
      <li><strong>Limites</strong> : artefacts (clignements, glissement des lunettes, mauvaise calibration, saccades anticipatoires).</li>
    </ul>

    <h4>VEMP (cVEMP / oVEMP)</h4>
    <ul>
      <li><strong>Indications</strong> : fonction otolithique ; aide au diagnostic de <strong>déhiscence du canal supérieur</strong> (seuils anormalement bas, amplitudes augmentées), atteintes otolithiques, Ménière.</li>
      <li><strong>Limites</strong> : dépend de la contraction musculaire (cVEMP), de l'âge, de la transmission (oreille moyenne).</li>
    </ul>

    <h4>Posturographie</h4>
    <ul>
      <li><strong>Indications</strong> : objectiver/suivre un trouble de l'équilibre, orienter la rééducation, contexte médico-légal.</li>
      <li><strong>Limites</strong> : peu spécifique d'une étiologie ; évalue la <em>fonction</em>, pas la <em>cause</em>.</li>
    </ul>

    <h3>3. Place dans l'algorithme</h3>
    ${algo([
      "Clinique + examen otoneurologique (M11) d'abord — ils orientent et trient l'urgence.",
      "Si déficit unilatéral à préciser/suivre : VHIT ± calorique (haute + basse fréquence).",
      "Si suspicion otolithique / 3e fenêtre / Ménière : VEMP (+ imagerie ciblée).",
      "Si trouble de l'équilibre chronique / rééducation : posturographie.",
      "Tout signe central → imagerie/neuro, indépendamment des explorations."
    ])}
    ${box("erreur", `Demander une batterie complète d'explorations vestibulaires « par principe » avant tout examen clinique : coûteux,
    mal toléré, et souvent ininterprétable hors contexte. L'examen clinique pose la question ; les explorations y répondent.`)}
    ${box("note", `La disponibilité en ville est variable : VNG/VHIT/posturographie existent dans des cabinets équipés ; certains tests
    (VEMP, fauteuil rotatoire, électrocochléographie) sont surtout en centre. Adapter la demande à l'offre locale (cf. fiche dédiée).`)}`
  },

  /* ---------------- MODULE 14 : RÉÉDUCATION VESTIBULAIRE ---------------- */
  {
    id: "b1-reeducation", ico: "🤸", titre: "M14 · Rééducation vestibulaire",
    niveau: NIV.inter,
    html: `
    <p class="lead">La rééducation vestibulaire (kiné spécialisé) repose sur la plasticité : on ne « répare » pas l'oreille, on
    <strong>réentraîne le cerveau</strong> à compenser.</p>

    <h3>1. Les trois mécanismes</h3>
    ${tbl(["Mécanisme", "Principe", "Exemple d'exercice"], [
      ["Adaptation", "Recalibrer le gain du RVO", "Stabilisation du regard sur cible fixe pendant mouvements de tête (gaze stabilization)"],
      ["Substitution", "Utiliser d'autres entrées (vision, proprioception, saccades) pour suppléer", "Stratégies de regard, appui proprioceptif"],
      ["Habituation", "Réduire la réponse symptomatique par exposition répétée", "Répétition des mouvements/positions provocateurs (type Brandt-Daroff dans certains cas)"]
    ])}

    <h3>2. Selon le tableau</h3>
    <ul>
      <li><strong>Déficit unilatéral</strong> : favoriser une <strong>mobilisation précoce</strong> et la rééducation pour accélérer la compensation
      (éviter le repos prolongé et les sédatifs vestibulaires au long cours qui la freinent).</li>
      <li><strong>Déficit bilatéral complet</strong> : objectif = <strong>substitution</strong> (vision, proprioception), stabilisation du regard, sécurité,
      prévention des chutes ; la compensation est partielle, la rééducation est longue.</li>
      <li><strong>VPPB</strong> : ce n'est pas de la « rééducation » mais des <strong>manœuvres libératoires</strong> spécifiques au canal (cf. Bloc 3 / fiche VPPB).</li>
      <li><strong>Vertige fonctionnel (PPPD)</strong> : rééducation + approche cognitivo-comportementale ± traitement, désensibilisation visuelle.</li>
    </ul>

    <h3>3. Spécificités enfant & sujet âgé</h3>
    <ul>
      <li><strong>Enfant</strong> : rééducation ludique, intégrer le développement moteur ; un déficit complet précoce nécessite un accompagnement spécifique.</li>
      <li><strong>Sujet âgé</strong> : intégrer la <strong>prévention des chutes</strong> (force, équilibre, revue des médicaments, vision, environnement) ; approche multifactorielle.</li>
    </ul>

    <h3>4. Conseils pratiques à donner au patient</h3>
    ${box("patient", `Messages simples : (1) bouger est <strong>bon</strong> pour récupérer — le repos prolongé retarde la guérison ;
    (2) il est normal de ressentir des symptômes pendant les exercices, ils diminuent avec la répétition ; (3) la régularité (un peu, souvent)
    compte plus que l'intensité ; (4) sécuriser le domicile (lumière la nuit, pas de tapis glissants) ; (5) prévenir en cas d'aggravation
    brutale ou de nouveaux signes (neuro, surdité).`)}
    ${box("adresser", `Adresser à un <strong>kinésithérapeute vestibulaire</strong> : déficit unilatéral mal compensé, déficit bilatéral,
    instabilité chronique, vertige fonctionnel, sujet âgé chuteur. Réévaluer l'efficacité (échelles de gêne, équilibre, qualité de vie).`)}
    ${box("piege", `Prescrire au long cours des <strong>sédatifs vestibulaires</strong> (anti-vertigineux) : utiles en phase aiguë très courte,
    ils <strong>freinent la compensation</strong> et favorisent les chutes s'ils sont prolongés. La rééducation est le vrai traitement de fond.`)}
    ${box("note", `L'efficacité de la rééducation vestibulaire dans le déficit unilatéral est bien étayée ; elle est plus limitée mais utile
    dans le bilatéral. Le suivi de l'efficacité doit être objectivé (équilibre, oscillopsie, retentissement).`)}`
  },

  /* ---------------- MODULE 15 : CHIRURGIE & INNOVATIONS ---------------- */
  {
    id: "b1-chirurgie", ico: "🛠️", titre: "M15 · Chirurgie & innovations thérapeutiques",
    niveau: NIV.avance,
    html: `
    <p class="lead">Comprendre l'interface médico-chirurgicale : ce qu'attend le chirurgien du bilan, et les grandes options
    thérapeutiques actuelles et émergentes.</p>

    <h3>1. Ce qu'attend le chirurgien</h3>
    ${box("specialiste", `Du <strong>bilan audiologique</strong> : type/degré de surdité, audiométrie tonale ET vocale (l'intelligibilité guide
    l'indication d'implant), latéralité, évolutivité, OEA/PEA selon le cas. Du <strong>bilan vestibulaire</strong> : état fonctionnel des deux
    oreilles (un geste destructeur d'un côté suppose de connaître l'autre), réserve de compensation. De l'<strong>imagerie</strong> : anatomie,
    perméabilité cochléaire, nerf cochléaire, rapports à risque.`)}

    <h3>2. Implants & dispositifs</h3>
    ${tbl(["Dispositif", "Indication schématique", "Principe"], [
      ["Implant cochléaire", "Surdité de perception sévère-profonde avec bénéfice prothétique insuffisant", "Stimule directement le nerf auditif"],
      ["Implant à conduction osseuse", "Surdité de transmission/mixte non appareillable classiquement, certaines surdités unilatérales", "Transmet le son par l'os"],
      ["Aides auditives conventionnelles", "Surdités légères à sévères", "Amplification"]
    ])}

    <h3>3. Chirurgies otologiques principales</h3>
    ${tbl(["Pathologie", "Geste", "But"], [
      ["Otospongiose", "Chirurgie de l'étrier (platinotomie/stapédotomie)", "Restaurer la transmission ; alternative = appareillage"],
      ["Cholestéatome", "Tympanoplastie / mastoïdectomie", "Éradiquer la lésion (risque de complications), reconstruire"],
      ["Déhiscence canal supérieur (3e fenêtre)", "Comblement/resurfaçage du canal", "Corriger les symptômes pression/son ; après confirmation TDM + VEMP"],
      ["Schwannome vestibulaire", "Surveillance / radiochirurgie / exérèse selon taille, audition, évolution", "Contrôler la tumeur, préserver facial/audition"]
    ])}
    ${box("note", `Les indications (seuils, tailles, stratégies surveillance vs chirurgie vs radiochirurgie) sont
    <strong>spécialisées et évolutives</strong> : décision en RCP/centre expert, à confronter aux référentiels en vigueur.`)}

    <h3>4. Pharmacologie des vertiges (principes)</h3>
    <ul>
      <li>Phase aiguë : sédatifs vestibulaires / antiémétiques sur une <strong>durée courte</strong>.</li>
      <li>Fond : traiter la cause (ex. Ménière : mesures hygiéno-diététiques, traitements de crise/de fond discutés) ; migraine vestibulaire : approche de la migraine.</li>
    </ul>
    ${box("piege", `Ne pas prolonger les anti-vertigineux : ils freinent la compensation (cf. M14).`)}

    <h3>5. Innovations & perspectives</h3>
    <ul>
      <li><strong>Implant cochléaire</strong> : électrodes, préservation de l'audition résiduelle, traitement du signal, réhabilitation bimodale.</li>
      <li><strong>Implant vestibulaire</strong> : en développement pour le déficit bilatéral sévère.</li>
      <li><strong>Thérapie génique / cellulaire</strong> : pistes prometteuses (surdités génétiques), encore largement <strong>au stade de recherche</strong>.</li>
      <li><strong>Entraînements auditifs, serious games, substitution sensorielle</strong> : adjuvants de réhabilitation.</li>
    </ul>
    ${box("note", `Thérapie génique/cellulaire et implant vestibulaire : <strong>domaines de recherche/innovation</strong> — à présenter au patient
    comme des perspectives, pas comme des traitements de routine. Vérifier l'état de l'art et l'accès (essais, centres).`)}

    ${box("adresser", `Adresser au chirurgien : surdité relevant d'un implant (cochléaire / conduction osseuse), otospongiose, cholestéatome,
    suspicion de 3e fenêtre confirmée, schwannome, échec d'appareillage bien conduit, et toute pathologie chirurgicale de l'oreille.`)}`
  }

  ]
});
