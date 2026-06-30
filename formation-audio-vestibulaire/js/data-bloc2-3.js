/* ===== BLOC 2 — AUDIOLOGIE AVANCÉE ===== */
FORMATION.push({
  cat: "Bloc 2 — Audiologie avancée",
  ico: "📗",
  sections: [

  {
    id: "b2-techniques", ico: "🎚️", titre: "B2.1 · Techniques d'audiométrie & fonction endocochléaire",
    niveau: NIV.avance,
    html: `
    <p class="lead">Approfondissement instrumental : techniques fines, courbes types (décrites), erreurs de réalisation et
    interprétation.</p>

    <h3>Fiche technique — Audiométrie tonale & vocale (rappel avancé)</h3>
    ${tbl(["Item", "Tonale", "Vocale"], [
      ["Mesure", "Seuils par fréquence (CA/CO)", "% d'intelligibilité selon l'intensité"],
      ["Courbe normale", "CA et CO ~ proches de 0–20 dB, superposées", "Courbe en S atteignant ~100 % à intensité modérée"],
      ["Courbe pathologique (perception)", "CA=CO abaissées (souvent aigus)", "Courbe décalée vers la droite, plateau parfois < 100 %"],
      ["Rétrocochléaire", "Variable", "Intelligibilité effondrée / <strong>roll-over</strong> (baisse aux fortes intensités)"]
    ])}
    ${box("retenir", `Le <strong>roll-over</strong> (chute de l'intelligibilité quand on augmente l'intensité) et une vocale bien pire que la
    tonale orientent vers le <strong>rétrocochléaire</strong> → PEA, IRM.`)}

    <h3>Mesure de la fonction endocochléaire & hydrops</h3>
    <p>Électrocochléographie et techniques dédiées explorent la cochlée et recherchent des arguments d'<strong>hydrops</strong>
    (Ménière). Examens spécialisés ; interprétation experte.</p>
    ${box("note", `Aucun test n'est à lui seul « le » diagnostic de Ménière : le diagnostic reste avant tout <strong>clinique</strong>
    (crises de vertige + surdité fluctuante documentée + acouphène/plénitude). Les explorations confortent, ne remplacent pas.`)}

    <h3>Erreurs de réalisation fréquentes</h3>
    ${checklist([
      "Pas d'otoscopie préalable → cérumen faussant les seuils.",
      "Masquage absent/insuffisant → fausses asymétries ou fausses surdités.",
      "Calibration/environnement non vérifiés.",
      "Consignes ambiguës → faux seuils, fausses non-réponses.",
      "Vocale réalisée sans liste adaptée à la langue/au patient."
    ])}

    <h3>Exemple de compte rendu structuré (audiométrie)</h3>
    ${box("note", `<em>« Otoscopie : CAE libres, tympans normaux. Tonale (avec masquage adapté) : surdité de perception bilatérale
    symétrique prédominant sur les aigus, ~X dB de perte moyenne. Vocale : intelligibilité Y % à Z dB, cohérente avec la tonale,
    sans roll-over. Tympanométrie type A bilatérale, réflexes présents. Conclusion : presbyacousie modérée. Proposition :
    information, bilan prothétique. »</em> — adapter les valeurs et toujours dater/comparer.`)}

    <h3>Phrases d'explication au patient</h3>
    ${box("patient", `« Votre test montre que vous entendez moins les sons aigus, ce qui explique que vous compreniez mal dans le bruit.
    Ce n'est pas une maladie grave, mais c'est utile de corriger tôt car bien entendre protège la mémoire et le lien social. »`)}

    <h3>Critères d'orientation ORL (urgente / semi-urgente)</h3>
    ${box("adresser", `<strong>Urgent</strong> : surdité brusque de perception, otorragie/otorrhée fébrile, surdité + vertige + signe neuro.
    <strong>Semi-urgent</strong> : asymétrie inexpliquée, discordance tonale/vocale, surdité évolutive, acouphène unilatéral/pulsatile.`)}`
  },

  {
    id: "b2-objectif", ico: "📡", titre: "B2.2 · OEA, PEA, ASSR, speech ABR, neuropathie",
    niveau: NIV.avance,
    html: `
    <p class="lead">Les examens « objectifs » : indispensables chez le nourrisson, le non-coopérant et dans les surdités atypiques.</p>

    <h3>Comparatif OEA / PEA / ASSR</h3>
    ${tbl(["Critère", "OEA / DPOAE", "PEA (ABR)", "ASSR"], [
      ["Explore", "CCE (cochlée)", "Voie auditive jusqu'au tronc", "Seuils fréquentiels objectifs"],
      ["Donne un seuil ?", "Non (présence/absence)", "Estimation de seuil (clic/tone burst)", "Oui, par fréquence"],
      ["Coopération", "Non requise", "Repos/sommeil", "Repos/sommeil"],
      ["Atout clé", "Dépistage, ototoxicité, argument neuropathie", "Rétrocochléaire, seuil nourrisson", "Profil fréquentiel chez l'enfant"],
      ["Limite", "Faussé par oreille moyenne, ne voit pas le rétrocochléaire", "Estimation (pas un audiogramme exact)", "Interprétation experte"]
    ])}

    <h3>Fiche technique — PEA (clicks / tone burst / speech ABR)</h3>
    <ul>
      <li><strong>Clicks</strong> : exploration globale (surtout aigus), ondes I–III–V ; latences/intervalles pour le rétrocochléaire.</li>
      <li><strong>Tone burst</strong> : estimation de seuil par fréquence (utile pédiatrie).</li>
      <li><strong>Speech ABR</strong> : réponse à la parole — recherche, exploration du traitement temporel.</li>
    </ul>
    <p><strong>Courbe type normale</strong> : ondes bien individualisées, latences dans les normes, onde V persistant aux faibles intensités
    (seuil). <strong>Anormale rétrocochléaire</strong> : allongement des latences/intervalles (ex. I–V), désynchronisation, asymétrie.</p>

    <h3>Neuropathie / désynchronisation auditive</h3>
    ${box("retenir", `Signature : <strong>OEA présentes</strong> (CCE OK) + <strong>PEA absents/désorganisés</strong>. Intelligibilité souvent
    très altérée, disproportionnée par rapport aux seuils tonals. Implications : dépistage par OEA <em>seules</em> peut « rater » ces enfants
    (d'où PEA en réanimation néonatale) ; prise en charge spécialisée.`)}

    <h3>Cas pratiques d'interprétation</h3>
    ${qcm("Nourrisson, OEA présentes mais PEA absents des deux côtés. L'interprétation la plus probable :",
      [{t:"Audition normale", good:false},{t:"Surdité de transmission bilatérale", good:false},
       {t:"Neuropathie / désynchronisation auditive", good:true},{t:"Erreur de calibration certaine", good:false}],
      "OEA présentes = CCE fonctionnelles ; PEA absents = transmission nerveuse anormale → profil de neuropathie auditive. Bilan et prise en charge spécialisés.")}

    <h3>Arbre décisionnel — dépistage néonatal non concluant</h3>
    ${algo([
      "Recontrôle du dépistage (OEA et/ou a-ABR).",
      "Si toujours non concluant → bilan diagnostique : PEA diagnostiques ± ASSR, OEA.",
      "Confirmer le type (transmission ? perception ? neuropathie ?).",
      "Si surdité permanente → étiologie (imagerie, CMV, génétique) + appareillage précoce + accompagnement.",
      "Suivi (surdité possiblement évolutive)."
    ])}`
  },

  {
    id: "b2-centrale-acou", ico: "🎧", titre: "B2.3 · Audition centrale, acouphènes & thérapie sonore",
    niveau: NIV.avance,
    html: `
    <p class="lead">Explorations objectives de l'audition centrale, mesure des acouphènes et mise en place d'une thérapie sonore ;
    audiologie en EHPAD.</p>

    <h3>Explorations de l'audition centrale (objectives)</h3>
    <p>Au-delà des tests comportementaux (M7), des potentiels plus tardifs et le speech ABR explorent le traitement central — usage
    spécialisé, interprétation prudente (âge, attention, langue).</p>
    ${box("note", `Limites diagnostiques réelles : un résultat anormal n'identifie pas une « lésion », il décrit une difficulté de traitement.
    Toujours confronter à la neuropsychologie / neurologie / orthophonie.`)}

    <h3>Mesure des acouphènes (acouphénométrie)</h3>
    ${checklist([
      "Caractériser : hauteur (fréquence), intensité, latéralité, type (sifflement, bourdonnement, pulsatile).",
      "Rechercher une perte auditive associée (audiogramme) et une hyperacousie (seuils d'inconfort).",
      "Évaluer le retentissement (questionnaires de gêne, sommeil, anxiété/dépression)."
    ])}

    <h3>Thérapie sonore — principes & mise en place</h3>
    ${algo([
      "Bilan : audiogramme, acouphénométrie, retentissement, hyperacousie.",
      "Information / éducation thérapeutique (déculpabiliser, expliquer l'habituation).",
      "Enrichissement sonore (bruit de fond doux, générateurs, applications) pour réduire le contraste avec le silence.",
      "Appareillage si surdité associée (souvent très efficace sur l'acouphène).",
      "Approche cognitivo-comportementale si fort retentissement ; suivi."
    ])}
    ${box("patient", `« L'objectif n'est pas forcément de supprimer l'acouphène mais que votre cerveau cesse d'y prêter attention
    (habituation). Le silence l'amplifie : un fond sonore doux aide. Le stress et la fatigue l'aggravent ; mieux dormir et bien
    entendre (appareil si besoin) le réduisent souvent. »`)}
    ${box("redflag", `Acouphène <strong>pulsatile</strong>, <strong>unilatéral</strong>, ou avec surdité asymétrique/vertige/signe neuro → bilan ciblé
    (imagerie) avant toute thérapie sonore.`)}

    <h3>Audiologie en EHPAD (approfondissement)</h3>
    ${box("note", `Priorités : dépister le bouchon (réversible), vérifier le <strong>port effectif</strong> et l'entretien des aides auditives,
    adapter la communication (face à face, articuler, réduire le bruit), repérer l'impact cognitif et le risque de chute, coordonner avec
    famille/ORL/audioprothésiste. Les troubles cognitifs limitent l'audiométrie standard → examens objectifs et observation fonctionnelle.`)}`
  }

  ]
});

/* ===== BLOC 3 — VESTIBULE AVANCÉ ===== */
FORMATION.push({
  cat: "Bloc 3 — Vestibule avancé",
  ico: "📙",
  sections: [

  {
    id: "b3-examen", ico: "🔬", titre: "B3.1 · Examen otoneurologique fin (adulte & enfant)",
    niveau: NIV.avance,
    html: `
    <p class="lead">Fiches gestes et critères de normalité/pathologie pour un examen otoneurologique reproductible.</p>

    <h3>Fiche geste — Head Impulse Test (Halmagyi)</h3>
    ${algo([
      "Patient fixe une cible (nez de l'examinateur). Tenir la tête.",
      "Imprimer une rotation <b>brève, rapide, de faible amplitude, imprévisible</b>, dans le plan du canal testé.",
      "Observer les yeux : restent sur la cible = RVO normal ; <b>saccade de rattrapage</b> = déficit du canal testé.",
      "Tester les 3 plans : horizontal (latéral), RALP et LARP (canaux verticaux antérieurs/postérieurs)."
    ])}
    ${box("piege", `Mouvement trop lent/ample/prévisible → faux négatif. Les saccades <strong>covert</strong> (pendant le mouvement) ne se voient
    qu'au VHIT : un HIT clinique normal n'exclut pas totalement un déficit → VHIT si doute.`)}

    <h3>Fiche geste — Test of Skew & oculomotricité</h3>
    ${checklist([
      "Cover test alterné : une réfixation verticale = skew (signe central).",
      "Poursuite lente : saccadique = peu spécifique mais à noter.",
      "Saccades : dysmétrie/ralentissement = atteinte centrale.",
      "Nystagmus du regard (gaze-evoked, rebound) = central."
    ])}

    <h3>Examen otoneurologique de l'enfant</h3>
    ${box("note", `Adapter : jeu, fixation sur jouet, observation de la tenue de tête et de la marche, recherche d'un retard moteur
    (déficit vestibulaire complet précoce). Les manœuvres sont possibles mais l'interprétation tient compte du développement.
    Penser migraine vestibulaire / vertige paroxystique bénin de l'enfant.`)}

    <h3>Critères de normalité / pathologie (synthèse)</h3>
    ${tbl(["Test", "Normal", "Pathologique"], [
      ["HIT", "Yeux restent sur cible", "Saccade de rattrapage (déficit du canal)"],
      ["Skew", "Aucun désalignement", "Réfixation verticale = central"],
      ["Nystagmus spontané", "Absent (ou physiologique)", "Présent : sens et fixation orientent périph/central"],
      ["Marche / Romberg", "Stable", "Déviation/chute (vestibulaire/proprioceptif) ; ataxie → central"]
    ])}`
  },

  {
    id: "b3-explorations", ico: "📐", titre: "B3.2 · VHIT, canaux & VEMP (technique)",
    niveau: NIV.avance,
    html: `
    <p class="lead">Maîtrise technique des explorations canalaires et otolithiques.</p>

    <h3>VHIT — techniques & exploration canalaire</h3>
    <ul>
      <li><strong>Plans testés</strong> : horizontal (latéral), <strong>RALP</strong> (Right Anterior – Left Posterior), <strong>LARP</strong> (Left Anterior – Right Posterior).</li>
      <li><strong>Hautes vitesses</strong> : mouvements rapides, imprévisibles, faible amplitude ; calibration soignée.</li>
      <li><strong>Lecture</strong> : <strong>gain</strong> du RVO (par canal) + <strong>saccades</strong> (overt/covert) reproductibles.</li>
    </ul>
    ${box("piege", `Artefacts VHIT : glissement des lunettes, clignements, fixation perdue, saccades anticipatoires (mouvement prévisible),
    mauvaise calibration. Des saccades isolées sans baisse de gain doivent être interprétées avec prudence.`)}

    <h3>Basses / moyennes / hautes vitesses — complémentarité</h3>
    ${tbl(["Plage", "Test", "Apport"], [
      ["Basses fréquences", "Calorique", "Sensible au déficit unilatéral ; dissociation possible avec le VHIT"],
      ["Moyennes", "Fauteuil rotatoire", "Utile en bilatéral, enfant, suivi"],
      ["Hautes fréquences", "VHIT", "Physiologique, rapide, par canal"]
    ])}
    ${box("retenir", `Une <strong>dissociation calorique altérée / VHIT normal</strong> est un profil classique (ex. évoqué dans l'hydrops/Ménière).
    Tester plusieurs plages est informatif.`)}

    <h3>VEMP — cVEMP & oVEMP, conduction aérienne & osseuse</h3>
    ${tbl(["VEMP", "Récepteur / voie", "Recueil", "Usage clé"], [
      ["cVEMP", "Saccule / voie inférieure", "Muscle sterno-cléido-mastoïdien (contraction)", "Fonction sacculaire ; 3e fenêtre (seuils bas)"],
      ["oVEMP", "Utricule / voie supérieure", "Muscle oculaire (sous l'œil)", "Fonction utriculaire ; 3e fenêtre"]
    ])}
    <ul>
      <li><strong>Conduction aérienne</strong> : usuelle ; faussée par une atteinte de l'oreille moyenne.</li>
      <li><strong>Conduction osseuse</strong> : utile quand la transmission aérienne est altérée (épanchement, etc.).</li>
    </ul>
    ${box("note", `Déhiscence du canal supérieur : VEMP à seuils anormalement <strong>bas</strong> / amplitudes augmentées, à confronter au
    <strong>scanner coupes fines</strong> et à la clinique (autophonie, Tullio, vertige à la pression). Aucun test isolé ne suffit.`)}`
  },

  {
    id: "b3-equilibre-reeduc", ico: "⚖️", titre: "B3.3 · Équilibre, rééducation ciblée & vertiges fonctionnels/centraux",
    niveau: NIV.avance,
    html: `
    <p class="lead">Évaluer l'équilibre statique/dynamique, adapter la rééducation à l'origine, et reconnaître fonctionnel vs central.</p>

    <h3>Évaluation de l'équilibre & du contrôle posturo-moteur</h3>
    ${tbl(["Évaluation", "Statique", "Dynamique"], [
      ["Clinique", "Romberg (yeux ouverts/fermés), appui unipodal", "Marche, marche tête tournée, demi-tour, Timed Up and Go"],
      ["Instrumentale", "Posturographie statique", "Posturographie dynamique, tâches doubles"]
    ])}
    ${box("note", `Chez le sujet âgé, des outils simples (appui unipodal, Timed Up and Go, vitesse de marche) évaluent le risque de chute et
    guident la rééducation, à interpréter avec les autres facteurs (vision, force, médicaments, cognition).`)}

    <h3>Adapter la rééducation selon l'origine</h3>
    ${tbl(["Origine", "Cible de rééducation"], [
      ["Déficit unilatéral", "Adaptation (gain RVO) + mobilisation précoce"],
      ["Déficit bilatéral", "Substitution (vision/proprioception), stabilisation du regard, sécurité/chutes"],
      ["VPPB", "Manœuvres libératoires spécifiques au canal (pas de la « rééducation »)"],
      ["Fonctionnel (PPPD)", "Désensibilisation visuelle, exposition graduée, approche cognitivo-comportementale"],
      ["Central", "Rééducation adaptée + traitement de la cause (neuro)"]
    ])}

    <h3>Rééducation motrice de l'enfant</h3>
    ${box("note", `Un déficit vestibulaire complet précoce retentit sur le développement moteur (tenue de tête, marche). La rééducation
    est ludique, intègre le développement global et l'accompagnement familial/scolaire.`)}

    <h3>Vertiges fonctionnels (PPPD)</h3>
    ${box("retenir", `Le vertige/instabilité posturo-perceptuel persistant (PPPD) est un <strong>diagnostic positif</strong> : instabilité/
    étourdissement <strong>chroniques</strong> (≥ 3 mois), aggravés par la <strong>position debout</strong>, le <strong>mouvement</strong> et les
    <strong>stimuli visuels complexes</strong> (rayons de supermarché, écrans), souvent <strong>déclenché par un événement vestibulaire aigu</strong>.
    Ce n'est ni « dans la tête » ni un diagnostic d'élimination paresseux : il a des critères et une prise en charge (rééducation,
    désensibilisation visuelle, parfois traitement, TCC).`)}

    <h3>Vertiges centraux & migraine vestibulaire</h3>
    ${tbl(["", "Migraine vestibulaire", "Maladie de Ménière"], [
      ["Vertige", "Épisodes variables (min–heures, parfois jours)", "Crises minutes–heures"],
      ["Audition", "Souvent normale / peu touchée", "Surdité fluctuante (graves), acouphène, plénitude"],
      ["Contexte", "Migraine, photo/phonophobie, céphalées, déclencheurs migraineux", "Évolution par poussées, atteinte auditive progressive"],
      ["Entre crises", "Souvent normal", "Surdité résiduelle possible"]
    ])}
    ${box("piege", `Migraine vestibulaire et Ménière peuvent coexister et se ressembler ; la migraine vestibulaire est <strong>sous-diagnostiquée</strong>.
    Devant des vertiges récurrents avec contexte migraineux et audition normale, l'évoquer avant d'enchaîner les explorations.`)}
    ${box("redflag", `Vertige central : nystagmus central (vertical/torsionnel pur, changeant), HIT normal en plein syndrome aigu, skew,
    signes neuro, céphalée brutale, facteurs de risque vasculaire → IRM / avis neuro en urgence.`)}

    <h3>VPPB simples & complexes</h3>
    ${box("note", `Canal postérieur (fréquent) : Dix-Hallpike + manœuvre libératoire adaptée. Canal horizontal : supine roll test + manœuvre
    dédiée (géotropique vs apogéotropique). Formes <strong>complexes/réfractaires</strong>, multi-canalaires, ou atypiques (downbeat persistant) :
    avis spécialisé et prudence (éliminer central). Détails pratiques dans la fiche VPPB.`)}`
  }

  ]
});
