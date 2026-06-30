/* ===== FICHES MÉMO, ALGORITHMES & RESSOURCES ===== */
FORMATION.push({
  cat: "Fiches mémo & ressources",
  ico: "🗂️",
  sections: [

  {
    id: "fiches-1", ico: "📄", titre: "Fiches mémo 1–10 (consultation)",
    html: `
    <p class="lead">Fiches pratiques, prêtes à l'emploi en consultation. Cliquez pour déplier.</p>

    ${acc("1 · Audiométrie : checklist de réalisation", `
      <h4>Avant</h4>${checklist(["Otoscopie (éliminer bouchon/OSM/perforation).","Cabine/environnement calme, matériel calibré.","Anamnèse : côté, ancienneté, fluctuation, acouphène, vertige, bruit, ototoxiques.","Consignes claires."])}
      <h4>Pendant</h4>${checklist(["CA puis CO.","Masquage dès qu'il y a asymétrie (surtout CO).","Vérifier la cohérence des réponses.","Vocale pour confronter à la tonale."])}
      <h4>Après</h4>${checklist(["Conclure : type + degré + forme + symétrie.","Dater, noter masquage et oreilles.","Décision : surveillance / appareillage / examens / adressage."])}
      ${box("piege","Pas d'otoscopie = audiogramme potentiellement faux. Pas de masquage = fausse asymétrie/fausse surdité.")}`, "1")}

    ${acc("2 · Interpréter un audiogramme en 5 minutes", `
      ${algo(["<b>Fiabilité</b> : otoscopie ? masquage ? cohérence ?","<b>Type</b> : CA vs CO (écart = transmission ; superposées abaissées = perception ; les deux = mixte).","<b>Degré</b> : léger→profond (selon référentiel local).","<b>Forme</b> : aigus (bruit/presby), graves (hydrops), encoche 4 kHz (bruit), plate.","<b>Symétrie</b> : asymétrie inexpliquée = alerte (IRM)."])}
      ${box("retenir","Confronter toujours à la vocale et à la clinique. Asymétrie ou discordance tonale/vocale = signal d'alerte.")}`, "2")}

    ${acc("3 · Surdité brusque : conduite à tenir", `
      ${box("redflag","Surdité de PERCEPTION d'installation rapide = URGENCE. Adressage ORL sans délai (pronostic temps-dépendant).")}
      ${algo(["Otoscopie (éliminer bouchon) + acoumétrie (Weber latéralisé côté sain = perception).","Rechercher signes neuro associés → si présents, urgence neurovasculaire.","Adresser ORL en urgence (audiogramme, prise en charge).","IRM à distance (éliminer schwannome)."])}
      ${box("erreur","« C'est sûrement un bouchon / ça va revenir » : ne jamais temporiser une surdité brusque de perception.")}`, "3")}

    ${acc("4 · Acouphènes : bilan initial et orientation", `
      ${checklist(["Caractériser : uni/bilatéral, pulsatile ou non, ancienneté, retentissement.","Audiogramme + recherche d'hyperacousie.","Examen otoscopique et neuro."])}
      ${box("redflag","Acouphène PULSATILE ou UNILATÉRAL, ou avec surdité asymétrique/vertige/signe neuro → bilan ciblé (IRM ± imagerie vasculaire).")}
      ${box("patient","Bilatéral chronique stable : rassurer, expliquer l'habituation, thérapie sonore, appareillage si surdité.")}`, "4")}

    ${acc("5 · Vertiges : interrogatoire structuré (TiTrATE)", `
      ${algo(["<b>Timing</b> : épisodique bref / aigu continu / chronique ?","<b>Triggers</b> : position, mouvement de tête, son/pression, debout, spontané ?","<b>And Targeted Examination</b> : examen orienté selon les 2 premiers."])}
      ${tbl(["Profil","Évoque"],[["Bref, positionnel","VPPB"],["Crises min–h + surdité fluctuante","Ménière"],["Aigu continu (jours)","Névrite / central"],["Récurrent + migraine","Migraine vestibulaire"],["Chronique + visuel/debout","Fonctionnel (PPPD)"]])}
      ${box("piege","Le « type » de sensation seul est peu fiable : privilégier timing + déclencheurs + examen.")}`, "5")}

    ${acc("6 · Vertiges : signes centraux à ne pas manquer", `
      ${box("redflag","HIT NORMAL en plein vertige aigu · nystagmus vertical/torsionnel pur ou changeant · skew · nystagmus non atténué par la fixation · déficit neuro (dysarthrie, diplopie, ataxie tronculaire) · céphalée brutale · downbeat positionnel persistant.")}
      ${box("adresser","Un seul signe central → IRM (diffusion) / avis neuro EN URGENCE. HINTS central peut être plus sensible qu'une IRM précoce pour un AVC de fosse postérieure.")}`, "6")}

    ${acc("7 · VPPB : diagnostic et manœuvres", `
      ${tbl(["Canal","Test diagnostique","Manœuvre type"],[["Postérieur (fréquent)","Dix-Hallpike","Epley"],["Horizontal","Supine roll test","BBQ/Gufoni (selon géo/apogéotropique)"],["Antérieur (rare)","Dix-Hallpike / formes particulières","Avis spécialisé (prudence : downbeat)"]])}
      ${box("retenir","Périphérique bénin = latence + paroxystique + épuisable, concordant avec le canal. Atypique/persistant/downbeat → éliminer central.")}
      ${box("patient","« De petits cristaux déplacés ; une manœuvre les remet en place, souvent en 1–2 séances. »")}`, "7")}

    ${acc("8 · HINTS : indications et limites", `
      ${box("retenir","À utiliser UNIQUEMENT dans le syndrome vestibulaire aigu CONTINU avec nystagmus présent.")}
      ${tbl(["Composante","Périphérique","Central"],[["Head Impulse","Anormal (saccade)","Normal"],["Nystagmus","Unidirectionnel horizonto-rotatoire","Changeant / vertical / torsionnel pur"],["Skew","Absent","Présent"]])}
      ${box("piege","Ne s'applique pas au VPPB ni au vertige sans nystagmus. HIT normal en plein vertige aigu = inquiétant.")}`, "8")}

    ${acc("9 · Déficit vestibulaire unilatéral : conseils patient", `
      ${box("patient","« L'oreille de l'équilibre d'un côté a été touchée ; votre cerveau va compenser en quelques jours/semaines. Bougez dès que possible : le repos prolongé retarde la guérison. Les exercices (rééducation) accélèrent la récupération. Évitez les médicaments anti-vertige au long cours. Prévenez si surdité, vision double, troubles de la parole ou aggravation brutale. »")}`, "9")}

    ${acc("10 · Déficit vestibulaire bilatéral : conseils patient", `
      ${box("patient","« Les deux oreilles de l'équilibre sont touchées : la sensation d'instabilité et l'impression que le décor 'saute' (oscillopsie) peuvent persister. On apprend à compenser par la vue et le toucher. Attention à l'obscurité et aux sols irréguliers (la nuit, allumez). La rééducation est longue mais utile ; sécurisez le domicile pour éviter les chutes. »")}`, "10")}`
  },

  {
    id: "fiches-2", ico: "📄", titre: "Fiches mémo 11–20 (orientation)",
    html: `
    ${acc("11 · Quand demander une IRM ?", `
      ${checklist(["Surdité de perception ASYMÉTRIQUE ou acouphène/atteinte UNILATÉRAL(E) inexpliqué(e) → schwannome.","Vertige avec SIGNES CENTRAUX → urgence (diffusion).","Acouphène pulsatile (± imagerie vasculaire).","Suspicion de labyrinthite, atteinte centrale, bilan pré-implant (nerf, perméabilité)."])}
      ${box("note","IRM explore tissus mous (nerf VIII, labyrinthe membraneux, cerveau). Préciser la question clinique sur la demande.")}`, "11")}

    ${acc("12 · Quand demander un scanner des rochers ?", `
      ${checklist(["Surdité de transmission/mixte (otospongiose à tympan normal, otite chronique).","Cholestéatome (± IRM diffusion).","Suspicion de 3e fenêtre (déhiscence canal supérieur) : coupes fines.","Traumatisme (fracture du rocher), malformation osseuse, bilan pré-implant (osseux)."])}
      ${box("note","TDM explore l'os : caisse, osselets, fenêtres, mastoïde, canaux.")}`, "12")}

    ${acc("13 · Quand adresser au chirurgien ?", `
      ${checklist(["Otospongiose (chirurgie de l'étrier vs appareillage).","Cholestéatome (toujours chirurgical).","Surdité sévère-profonde avec bénéfice prothétique insuffisant → implant cochléaire.","Surdité de transmission/mixte non appareillable → implant à conduction osseuse.","3e fenêtre confirmée et invalidante.","Schwannome vestibulaire (RCP : surveillance/radiochirurgie/chirurgie)."])}
      ${box("specialiste","Fournir : type/degré, tonale ET vocale, latéralité, évolutivité, imagerie ciblée.")}`, "13")}

    ${acc("14 · Quand demander un bilan génétique ?", `
      ${checklist(["Surdité de perception PERMANENTE de l'enfant (après confrontation clinique/imagerie).","Antécédents familiaux / consanguinité.","Signes syndromiques (œil, rein, cœur, thyroïde, pigmentation, équilibre).","Surdité évolutive inexpliquée."])}
      ${box("adresser","En centre spécialisé / ORL pédiatrique ; associer recherche CMV (selon âge) et conseil génétique familial.")}`, "14")}

    ${acc("15 · Audiologie du nourrisson : conduite pratique", `
      ${algo(["Dépistage (OEA et/ou a-ABR) ; si non concluant → recontrôle.","Bilan diagnostique : PEA ± ASSR, OEA.","Typer : transmission ? perception ? neuropathie (OEA+/PEA–) ?","Étiologie : CMV (fenêtre néonatale), génétique, imagerie.","Appareillage précoce + accompagnement + suivi rapproché (évolutivité)."])}
      ${box("piege","OEA normales n'excluent pas une neuropathie ; en réanimation néonatale, privilégier/associer les PEA.")}`, "15")}

    ${acc("16 · Audiologie en EHPAD", `
      ${checklist(["Éliminer le bouchon de cérumen (réversible).","Vérifier port effectif + entretien des aides auditives (piles, encrassement).","Communication : face à face, articuler, réduire le bruit ambiant.","Repérer l'impact cognitif, l'isolement, le risque de chute.","Coordonner ORL / audioprothésiste / famille."])}
      ${box("note","Troubles cognitifs → audiométrie standard limitée : recourir aux examens objectifs et à l'observation fonctionnelle.")}`, "16")}

    ${acc("17 · Explorations vestibulaires disponibles en ville", `
      ${tbl(["Examen","Souvent dispo en ville ?","Apport"],[["VNG / caloriques","Cabinets équipés","Déficit unilatéral, basses fréquences"],["VHIT","De plus en plus","Hautes fréquences, par canal"],["Posturographie","Variable","Équilibre, suivi rééducation"],["VEMP","Plutôt centre","Otolithes, 3e fenêtre"],["Fauteuil rotatoire","Centre","Bilatéral, enfant"]])}
      ${box("note","Adapter la demande à l'offre locale ; l'examen clinique reste premier et oriente la prescription.")}`, "17")}

    ${acc("18 · Nystagmus périphérique vs central", `
      ${tbl(["Caractère","Périphérique","Central"],[["Direction","Horizonto-rotatoire, unidirectionnel","Vertical/torsionnel pur, multidirectionnel"],["Fixation","Atténue","N'atténue pas / majore"],["Change selon le regard","Non","Possible"],["Signes associés","Auditifs possibles","Déficit neuro, ataxie"],["HIT","Anormal côté atteint","Souvent normal"]])}
      ${box("piege","Sans suppression de fixation (Frenzel), on sous-estime un nystagmus périphérique.")}`, "18")}

    ${acc("19 · Migraine vestibulaire : reconnaître et orienter", `
      ${box("retenir","Vertiges récurrents (min–heures, parfois jours) + contexte migraineux (photo/phonophobie, céphalées, déclencheurs) + audition souvent normale. Très fréquente et SOUS-DIAGNOSTIQUÉE.")}
      ${checklist(["Rechercher critères de migraine et antécédents.","Audiogramme (normal/peu touché).","Imagerie si atypies / red flags.","Prise en charge type migraine (hygiène de vie, traitement de crise/fond)."])}
      ${box("piege","Peut coexister/ressembler à la maladie de Ménière.")}`, "19")}

    ${acc("20 · Maladie de Ménière : diagnostic et suivi", `
      ${box("retenir","Triade : crises de vertige (min–heures) + surdité de perception FLUCTUANTE (graves) + acouphène/plénitude. Diagnostic CLINIQUE, documenté par audiogrammes répétés.")}
      ${checklist(["Documenter la fluctuation auditive.","Éliminer schwannome (IRM), distinguer/associer migraine vestibulaire.","Mesures hygiéno-diététiques (sel…), traitements de crise/fond (ORL).","Suivi audiométrique (surdité résiduelle progressive possible)."])}
      ${box("patient","« Maladie de l'oreille interne par crises ; on cherche à espacer les crises et à protéger l'audition. »")}`, "20")}`
  },

  {
    id: "algos", ico: "🧭", titre: "Algorithmes & checklists transversaux",
    html: `
    <h3>Algorithme — plainte auditive (synthèse)</h3>
    ${algo([
      "Otoscopie : anomalie ? → traiter (bouchon, OSM, otite, cholestéatome → ORL).",
      "Tympan normal : acoumétrie + audiogramme → transmission / perception / mixte.",
      "Brusque de perception → URGENCE ORL.",
      "Asymétrie / acouphène unilatéral / discordance tonale-vocale → IRM (schwannome).",
      "Symétrique aigus, âge → presbyacousie → appareillage ; bruit → prévention + surveillance.",
      "Enfant → bilan adapté à l'âge + objectif ; permanent → étiologie (CMV, génétique) + appareillage précoce."
    ])}

    <h3>Algorithme — vertige (synthèse)</h3>
    ${algo([
      "Éliminer l'urgence : signes neuro / red flags → IRM, filière.",
      "Aigu continu avec nystagmus → HINTS (périphérique vs central).",
      "Bref positionnel → Dix-Hallpike / supine roll → VPPB → manœuvre.",
      "Crises min–h + surdité fluctuante → Ménière ; récurrent + migraine → migraine vestibulaire.",
      "Chronique + visuel/debout, examen compensé → fonctionnel (PPPD) → rééducation/TCC.",
      "Sujet âgé → multifactoriel : VPPB, iatrogénie, vision, proprioception, prévention chutes."
    ])}

    <h3>Checklist — examen otoneurologique au cabinet</h3>
    ${checklist([
      "Otoscopie.",
      "Nystagmus spontané (sans fixation si possible).",
      "Oculomotricité (poursuite, saccades, nystagmus du regard).",
      "HIT (Halmagyi).",
      "Test of Skew (cover test).",
      "Examen neuro ciblé (paires crâniennes, cervelet).",
      "Romberg, Fukuda, marche.",
      "Manœuvres positionnelles (Dix-Hallpike, supine roll)."
    ])}

    <h3>Checklist — « ai-je éliminé le grave ? »</h3>
    ${checklist([
      "Surdité brusque de perception adressée en urgence ?",
      "Asymétrie auditive / acouphène unilatéral → IRM programmée ?",
      "Signes centraux du vertige recherchés (HINTS, nystagmus, neuro) ?",
      "Acouphène pulsatile exploré ?",
      "Red flags pédiatriques / ototoxiques / traumatiques pris en compte ?"
    ])}`
  },

  {
    id: "biblio", ico: "📚", titre: "Bibliographie & ressources (à vérifier)",
    html: `
    <p class="lead">Ressources à consulter et à <strong>vérifier dans leur version en vigueur</strong>. Les recommandations évoluent :
    privilégier les dernières versions des sociétés savantes et de la HAS.</p>

    ${box("note","Cette liste oriente vers des <strong>types de sources</strong> fiables ; elle ne remplace pas la lecture des référentiels à jour. Aucune donnée chiffrée de cette formation ne doit être utilisée sans confrontation à la source primaire actuelle.")}

    <h3>Sociétés savantes & référentiels</h3>
    <ul>
      <li>Société Française d'ORL et de chirurgie de la face et du cou (SFORL) — recommandations de pratique clinique (surdité brusque, acouphènes, vertiges, etc.).</li>
      <li>HAS (Haute Autorité de Santé) — recommandations et dépistage (ex. dépistage néonatal de la surdité, appareillage).</li>
      <li>Sociétés internationales d'otoneurologie / Bárány Society — critères diagnostiques (VPPB, migraine vestibulaire, maladie de Ménière, PPPD, déficit vestibulaire bilatéral).</li>
      <li>Sociétés de neurologie — vertige et urgences neurovasculaires (HINTS, AVC de fosse postérieure).</li>
      <li>Sociétés de pédiatrie / ORL pédiatrique — surdité de l'enfant, CMV congénital.</li>
      <li>Médecine du travail — surveillance audiométrique et bruit professionnel (référentiels nationaux).</li>
      <li>Gériatrie — presbyacousie, prévention des chutes.</li>
    </ul>

    <h3>Ouvrages & supports</h3>
    <ul>
      <li>Traités d'audiologie et d'otoneurologie (référence universitaire) — anatomie, physiologie, explorations.</li>
      <li>Manuels d'examen vestibulaire au lit du patient et d'interprétation du VHIT/VNG/VEMP.</li>
      <li>Atlas et vidéothèques de nystagmus et de manœuvres (voir suggestions ci-dessous).</li>
    </ul>

    <h3>Vidéos pédagogiques à créer / suggérer</h3>
    ${tbl(["Thème","Contenu vidéo proposé"],[
      ["HINTS","Démonstration HIT, recherche du nystagmus, cover test ; cas périphérique vs central"],
      ["Dix-Hallpike & Epley","Installation, observation du nystagmus, manœuvre libératoire pas à pas"],
      ["Supine roll test","Géotropique vs apogéotropique, manœuvres du canal horizontal"],
      ["VHIT","Réalisation, plans RALP/LARP, lecture gain + saccades, artefacts"],
      ["Nystagmus","Banque de nystagmus périphériques et centraux avec/sans fixation"],
      ["Otoscopie & audiométrie","Bonnes pratiques, masquage, pièges"]
    ])}
    ${box("note","Pour une application interactive : intégrer ces vidéos, des audiogrammes commentés cliquables, et des cas interactifs avec scoring.")}

    <h3>Limites & mises à jour</h3>
    ${box("retenir","Cette formation distingue, lorsque c'est pertinent : ce qui est <strong>validé</strong>, ce qui relève de la <strong>pratique courante</strong>, ce qui est <strong>discuté</strong> (ex. synaptopathie « cachée », certaines indications/seuils), et ce qui <strong>nécessite un avis spécialisé</strong>. Réviser périodiquement selon les recommandations actualisées.")}`
  }

  ]
});
