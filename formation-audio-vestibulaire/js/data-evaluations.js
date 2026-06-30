/* ===== ÉVALUATIONS PÉDAGOGIQUES ===== */
FORMATION.push({
  cat: "Évaluations",
  ico: "✅",
  sections: [

  {
    id: "eval-positionnement", ico: "🎯", titre: "Test de positionnement initial",
    html: `
    <p class="lead">10 questions pour situer son niveau avant la formation. Cliquez pour révéler la correction.</p>
    ${qcm("1. Devant une surdité de perception unilatérale progressive avec acouphène, l'examen clé à ne pas manquer est :",
      [{t:"Un scanner des rochers", good:false},{t:"Une IRM des conduits auditifs internes", good:true},
       {t:"Une tympanométrie", good:false},{t:"Une posturographie", good:false}],
      "Asymétrie de perception / acouphène unilatéral → IRM des CAI pour éliminer un schwannome vestibulaire.")}
    ${qcm("2. Le HINTS s'applique :",
      [{t:"À tout vertige, même bref et positionnel", good:false},{t:"Au syndrome vestibulaire aigu continu avec nystagmus", good:true},
       {t:"Uniquement en l'absence de nystagmus", good:false},{t:"Au VPPB", good:false}],
      "HINTS n'a de sens que dans un syndrome vestibulaire aigu continu avec nystagmus présent.")}
    ${qcm("3. Une surdité brusque de perception est :",
      [{t:"À surveiller une semaine", good:false},{t:"Souvent un bouchon", good:false},
       {t:"Une urgence à adresser sans délai", good:true},{t:"Toujours d'origine psychogène", good:false}],
      "La surdité brusque de perception est une urgence ORL : la précocité conditionne le pronostic.")}
    ${qcm("4. Tympanométrie plate (type B) chez un enfant évoque en priorité :",
      [{t:"Une otospongiose", good:false},{t:"Une otite séromuqueuse", good:true},
       {t:"Un schwannome", good:false},{t:"Une presbyacousie", good:false}],
      "Type B = épanchement (ou perforation) ; chez l'enfant → OSM, 1re cause de surdité de transmission.")}
    ${qcm("5. OEA présentes + PEA absents = profil de :",
      [{t:"Surdité de transmission", good:false},{t:"Neuropathie / désynchronisation auditive", good:true},
       {t:"Audition normale", good:false},{t:"Bouchon de cérumen", good:false}],
      "CCE fonctionnelles (OEA) mais transmission nerveuse anormale (PEA) = neuropathie auditive.")}
    ${qcm("6. Un HIT (Head Impulse Test) NORMAL chez un patient en grand vertige aigu continu est :",
      [{t:"Rassurant (périphérique)", good:false},{t:"Inquiétant (oriente vers le central)", good:true},
       {t:"Ininterprétable", good:false},{t:"Synonyme de VPPB", good:false}],
      "Dans un syndrome aigu, on attend un HIT anormal si périphérique ; un HIT normal oriente vers une cause centrale.")}
    ${qcm("7. La presbyacousie est typiquement :",
      [{t:"Asymétrique sur les graves", good:false},{t:"Symétrique, prédominant sur les aigus", good:true},
       {t:"Une surdité de transmission", good:false},{t:"Fluctuante avec acouphène pulsatile", good:false}],
      "Perte de perception bilatérale symétrique sur les aigus ; une asymétrie n'est PAS de la presbyacousie.")}
    ${qcm("8. La calorique et le VHIT explorent :",
      [{t:"La même plage de fréquences", good:false},{t:"Des plages différentes (basses vs hautes) — complémentaires", good:true},
       {t:"Les otolithes", good:false},{t:"L'audition", good:false}],
      "Calorique = basses fréquences ; VHIT = hautes fréquences. Complémentaires.")}
    ${qcm("9. Le masquage en audiométrie sert à :",
      [{t:"Augmenter le volume", good:false},{t:"Éviter que l'oreille opposée réponde à la place de l'oreille testée", good:true},
       {t:"Tester les acouphènes", good:false},{t:"Calibrer l'appareil", good:false}],
      "On occupe l'oreille non testée pour éviter qu'elle perçoive le son (surtout en CO).")}
    ${qcm("10. Un nystagmus positionnel downbeat persistant et non épuisable évoque :",
      [{t:"Un VPPB postérieur banal", good:false},{t:"Une cause centrale à explorer", good:true},
       {t:"Un bouchon", good:false},{t:"Une presbyacousie", good:false}],
      "Downbeat persistant = signal central → prudence, imagerie/avis neuro.")}`
  },

  {
    id: "eval-qcm", ico: "❓", titre: "QCM par module (corrigés)",
    html: `
    <h3>Bases & imagerie</h3>
    ${qcm("L'artère labyrinthique est une artère terminale, ce qui explique :",
      [{t:"Sa résistance à l'ischémie", good:false},{t:"La vulnérabilité ischémique de l'oreille interne", good:true},
       {t:"L'absence de surdité dans les AVC", good:false},{t:"La transmission du son", good:false}],
      "Artère terminale (branche de l'AICA) = pas de suppléance → grande vulnérabilité ischémique ; un déficit cochléo-vestibulaire brutal peut révéler un AVC AICA.")}
    ${qcm("Pour explorer une chaîne ossiculaire, l'examen d'imagerie adapté est :",
      [{t:"L'IRM", good:false},{t:"Le scanner des rochers", good:true},
       {t:"L'échographie", good:false},{t:"La posturographie", good:false}],
      "L'os (osselets, fenêtres, mastoïde) se voit au scanner ; l'IRM explore les tissus mous (nerf, labyrinthe membraneux, cerveau).")}

    <h3>Audiologie</h3>
    ${qcm("Une discordance avec intelligibilité effondrée par rapport à la tonale (roll-over) évoque :",
      [{t:"Une surdité de transmission", good:false},{t:"Une atteinte rétrocochléaire", good:true},
       {t:"Un bouchon", good:false},{t:"Une presbyacousie isolée", good:false}],
      "Vocale bien pire que la tonale et/ou roll-over → rétrocochléaire (PEA, IRM).")}
    ${qcm("Le dépistage néonatal par OEA seules peut « rater » :",
      [{t:"Une otite séreuse", good:false},{t:"Une neuropathie auditive", good:true},
       {t:"Un bouchon", good:false},{t:"Une surdité de transmission", good:false}],
      "Les OEA testent les CCE mais pas la voie nerveuse : une neuropathie peut passer inaperçue → PEA en réanimation néonatale.")}

    <h3>Vestibulogie</h3>
    ${qcm("La durée typique d'un vertige de VPPB est :",
      [{t:"Quelques secondes, déclenché par la position", good:true},{t:"Plusieurs heures avec surdité", good:false},
       {t:"Plusieurs jours, continu", good:false},{t:"Permanent", good:false}],
      "VPPB = vertige bref (secondes) déclenché par les changements de position ; pas de signe auditif.")}
    ${qcm("Dans la maladie de Ménière, la surdité est typiquement :",
      [{t:"Sur les aigus, stable", good:false},{t:"Sur les graves, fluctuante", good:true},
       {t:"De transmission", good:false},{t:"Absente", good:false}],
      "Surdité de perception fluctuante prédominant sur les graves, avec acouphène et plénitude, lors des crises.")}
    ${qcm("Le traitement de fond des anti-vertigineux au long cours :",
      [{t:"Accélère la compensation", good:false},{t:"Freine la compensation et favorise les chutes", good:true},
       {t:"Guérit le VPPB", good:false},{t:"Est recommandé systématiquement", good:false}],
      "Les sédatifs vestibulaires prolongés freinent la compensation : la rééducation est le traitement de fond.")}

    <h3>Pédiatrie & sujet âgé</h3>
    ${qcm("Devant un retard de langage chez un enfant, le premier réflexe est :",
      [{t:"Orthophonie immédiate sans bilan", good:false},{t:"Vérifier l'audition", good:true},
       {t:"Bilan psychiatrique", good:false},{t:"Rassurer et attendre", good:false}],
      "Tout retard de langage impose de vérifier l'audition avant toute autre conclusion.")}
    ${qcm("Chez un résident d'EHPAD qui « n'entend plus », la première cause à éliminer est :",
      [{t:"Un schwannome", good:false},{t:"Un bouchon de cérumen / aides non entretenues", good:true},
       {t:"Une surdité brusque", good:false},{t:"Une otospongiose", good:false}],
      "Causes fréquentes et réversibles : bouchon, aides auditives non portées/non entretenues.")}`
  },

  {
    id: "eval-qroc", ico: "✍️", titre: "QROC (questions à réponse ouverte courte)",
    html: `
    <p class="lead">Formulez votre réponse, puis dépliez les éléments attendus.</p>
    ${qroc("Citez les 3 composantes du HINTS et leur résultat « central ».",
      "<ul><li><strong>Head Impulse Test</strong> : NORMAL (pas de saccade) = central.</li><li><strong>Nystagmus</strong> : changeant de direction / vertical pur / torsionnel pur = central.</li><li><strong>Test of Skew</strong> : présent (réfixation verticale au cover test) = central.</li></ul>Mnémonique INFARCT. Un seul signe central → IRM/avis neuro.")}
    ${qroc("Quels éléments font d'une surdité une URGENCE ?",
      "<ul><li>Surdité brusque de <strong>perception</strong> (installation rapide).</li><li>Signes neurologiques associés (urgence neurovasculaire).</li><li>Otorragie/otorrhée fébrile, contexte traumatique sévère.</li></ul>Adressage ORL sans délai ; otoscopie pour éliminer un bouchon.")}
    ${qroc("Quelle est la différence entre canalolithiase et cupulolithiase ?",
      "<strong>Canalolithiase</strong> : otolithes libres dans le canal → nystagmus avec latence, bref, épuisable. <strong>Cupulolithiase</strong> : otolithes adhérents à la cupule → nystagmus sans/peu de latence, plus durable. Cela change la manœuvre thérapeutique.")}
    ${qroc("Pourquoi associer OEA et PEA chez le nourrisson à risque ?",
      "Les OEA testent les CCE mais pas la voie nerveuse ; les PEA détectent l'atteinte rétrocochléaire/neuropathie. Les associer évite de « rater » une neuropathie (prématuré, ictère sévère, réanimation).")}
    ${qroc("Citez 3 mécanismes de la rééducation vestibulaire.",
      "<strong>Adaptation</strong> (recalibrer le gain du RVO), <strong>substitution</strong> (vision/proprioception/saccades), <strong>habituation</strong> (réduction de la réponse par exposition répétée).")}
    ${qroc("Quels signes orientent vers une 3e fenêtre (déhiscence du canal supérieur) ?",
      "Vertige/oscillopsie au bruit fort (Tullio) ou à la pression (effort, mouchage), autophonie, hypersensibilité aux bruits corporels, parfois pseudo-surdité de transmission à réflexes stapédiens présents. Confirmation : TDM coupes fines + VEMP.")}`
  },

  {
    id: "eval-osce", ico: "🎭", titre: "Mises en situation OSCE / ECOS",
    html: `
    <p class="lead">Trois stations type, avec scénario, consignes candidat, consignes examinateur et grille de notation.</p>

    ${acc("Station 1 — Vertige aigu : trier périphérique vs central", `
      <h4>Scénario</h4><p>Patient de 68 ans, vertige rotatoire continu depuis 12 h, vomissements. Facteurs de risque vasculaire.</p>
      <h4>Consignes candidat (7 min)</h4><p>Conduisez l'interrogatoire ciblé et l'examen otoneurologique pertinent, énoncez votre orientation et votre conduite.</p>
      <h4>Consignes examinateur</h4><p>Le patient (simulé) présente un HIT normal, un nystagmus changeant de direction et un skew. Vérifier que le candidat réalise le HINTS et reconnaît le profil central.</p>
      <h4>Grille de notation</h4>
      ${tbl(["Item", "Points"], [
        ["Caractérise timing + déclencheurs + signes associés", "/3"],
        ["Recherche le nystagmus (sans fixation) et l'oculomotricité", "/2"],
        ["Réalise correctement HIT + Skew", "/3"],
        ["Reconnaît le profil HINTS central (INFARCT)", "/3"],
        ["Conduite : urgence neurovasculaire / IRM / filière AVC", "/4"],
        ["Communication, sécurité", "/2"],
        ["<strong>Total</strong>", "<strong>/17</strong>"]
      ])}`, "1")}

    ${acc("Station 2 — VPPB postérieur : diagnostiquer et traiter", `
      <h4>Scénario</h4><p>Femme de 58 ans, vertiges brefs en se retournant dans le lit depuis 3 jours, sans surdité.</p>
      <h4>Consignes candidat (7 min)</h4><p>Confirmez le diagnostic par la manœuvre adaptée, interprétez, réalisez (ou décrivez) la manœuvre thérapeutique, donnez les conseils.</p>
      <h4>Consignes examinateur</h4><p>Au Dix-Hallpike droit : nystagmus torsionnel géotropique avec latence, paroxystique, épuisable. Vérifier l'installation et la sécurité.</p>
      <h4>Grille de notation</h4>
      ${tbl(["Item", "Points"], [
        ["Interrogatoire (positionnel, bref, pas de red flag)", "/2"],
        ["Réalise correctement le Dix-Hallpike", "/3"],
        ["Interprète (latence, épuisable, torsionnel = canal post.)", "/3"],
        ["Réalise/décrit la manœuvre libératoire (Epley)", "/4"],
        ["Reconnaît un signe atypique imposant l'arrêt (downbeat persistant)", "/2"],
        ["Conseils patient + suivi", "/2"],
        ["<strong>Total</strong>", "<strong>/16</strong>"]
      ])}`, "2")}

    ${acc("Station 3 — Annonce et orientation d'une surdité brusque", `
      <h4>Scénario</h4><p>Homme de 45 ans, baisse d'audition unilatérale brutale ce matin, anxieux.</p>
      <h4>Consignes candidat (7 min)</h4><p>Confirmez l'urgence, expliquez au patient, organisez l'orientation.</p>
      <h4>Consignes examinateur</h4><p>Otoscopie normale. Vérifier que le candidat n'attribue pas la perte à un bouchon et adresse en urgence.</p>
      <h4>Grille de notation</h4>
      ${tbl(["Item", "Points"], [
        ["Otoscopie + acoumétrie (élimine le bouchon, oriente perception)", "/3"],
        ["Reconnaît l'urgence (surdité brusque de perception)", "/3"],
        ["Recherche des signes neuro associés", "/2"],
        ["Organise l'adressage ORL sans délai", "/3"],
        ["Information claire et empathique du patient", "/3"],
        ["Mentionne l'IRM à distance", "/1"],
        ["<strong>Total</strong>", "<strong>/15</strong>"]
      ])}`, "3")}`
  },

  {
    id: "eval-finale", ico: "🏅", titre: "Évaluation finale & grille de validation des compétences",
    html: `
    <h3>Évaluation finale certifiante (structure proposée)</h3>
    ${tbl(["Épreuve", "Format", "Pondération indicative"], [
      ["QCM transversal", "40 QCM corrigés (tous modules)", "40 %"],
      ["QROC", "10 QROC", "20 %"],
      ["Cas clinique long", "1–2 cas intégratifs (auditif + vestibulaire)", "20 %"],
      ["OSCE", "3 stations (vertige aigu, VPPB, annonce/orientation)", "20 %"]
    ])}
    ${box("note", "Seuils de réussite et modalités de certification à définir selon le cadre (DU/DIU, DPC, organisme) et les référentiels locaux.")}

    <h3>Grille de validation des compétences</h3>
    ${tbl(["Compétence", "Acquis", "À renforcer"], [
      ["Distinguer transmission / perception / mixte et lire un audiogramme", "☐", "☐"],
      ["Reconnaître et orienter une surdité brusque", "☐", "☐"],
      ["Identifier une asymétrie/acouphène unilatéral → IRM", "☐", "☐"],
      ["Conduire l'interrogatoire d'un vertige (timing/déclencheurs)", "☐", "☐"],
      ["Réaliser et interpréter HINTS", "☐", "☐"],
      ["Diagnostiquer et traiter un VPPB (postérieur/horizontal)", "☐", "☐"],
      ["Reconnaître un vertige central (red flags)", "☐", "☐"],
      ["Adapter l'évaluation auditive à l'âge (enfant, âgé)", "☐", "☐"],
      ["Choisir la bonne imagerie (scanner vs IRM)", "☐", "☐"],
      ["Orienter (ORL, neuro, chirurgien, généticien, kiné, audioprothésiste)", "☐", "☐"]
    ])}

    <h3>Grille d'évaluation des gestes pratiques</h3>
    ${tbl(["Geste", "Critères de réussite"], [
      ["Otoscopie", "Traction du pavillon, repérage du tympan, description structurée"],
      ["Acoumétrie (Rinne/Weber)", "Réalisation correcte, interprétation transmission/perception"],
      ["Dix-Hallpike", "Installation, plan correct, observation latence/durée/sens"],
      ["HIT (Halmagyi)", "Mouvement bref/rapide/imprévisible, détection de la saccade"],
      ["Manœuvre libératoire (Epley)", "Séquence correcte, sécurité, conseils post-manœuvre"]
    ])}`
  }

  ]
});
