/* ===== CAS CLINIQUES (30) ===== */
FORMATION.push({
  cat: "Cas cliniques",
  ico: "🧩",
  sections: [

  {
    id: "cas-intro", ico: "📚", titre: "30 cas cliniques — mode d'emploi",
    html: `
    <p class="lead">30 cas progressifs, du nourrisson au sujet âgé, de l'auditif au vestibulaire. Chaque cas suit la même trame
    pour ancrer le raisonnement. Cliquez un cas pour le déplier.</p>
    ${box("retenir", `Méthode conseillée : lisez le <strong>contexte</strong> et la <strong>plainte</strong>, fermez les yeux, formulez votre
    hypothèse et votre conduite, <em>puis</em> déroulez la correction. L'erreur est pédagogique.`)}
    <div class="cards">
      <div class="mini-card"><h4>Cas 1–13</h4><p>Auditif : pédiatrie, brusque, asymétrie, acouphène, presbyacousie, bruit, neuropathie, central.</p></div>
      <div class="mini-card"><h4>Cas 14–25</h4><p>Vestibulaire : VPPB, Ménière, migraine, déficit aigu/bilatéral, central, traumatique, fonctionnel, âges.</p></div>
      <div class="mini-card"><h4>Cas 26–30</h4><p>Mixtes & complexes : 3e fenêtre, génétique, CMV, décision chirurgicale.</p></div>
    </div>`
  },

  {
    id: "cas-auditifs", ico: "👂", titre: "Cas 1 à 13 — pathologies auditives",
    html: `
    ${cas(1, "Nourrisson — dépistage auditif anormal", {
      contexte:"Nouveau-né à terme, dépistage néonatal par OEA « non concluant » à droite, recontrôle non concluant bilatéral.",
      plainte:"Aucune (dépistage systématique). Parents inquiets.",
      interro:"<ul><li>Facteurs de risque : prématurité, séjour en réanimation, ictère sévère, ototoxiques, infection materno-fœtale (CMV) ?</li><li>Antécédents familiaux de surdité ?</li><li>Grossesse, sérologies.</li></ul>",
      examen:"Otoscopie (éliminer obstruction/épanchement), observation des réactions au son.",
      complementaires:"PEA diagnostiques ± ASSR (seuils objectifs) ; OEA de contrôle ; recherche CMV selon délai/contexte ; avis ORL pédiatrique.",
      interpretation:"OEA non concluantes ne prouvent pas la surdité (cérumen, immaturité, neuropathie possible). Les PEA tranchent sur le type et le seuil.",
      diagnostic:"À confirmer : surdité de perception congénitale (à typer) — fréquemment génétique ; éliminer CMV.",
      differentiels:"Épanchement transitoire, neuropathie auditive, artefact technique.",
      cat:"Bilan diagnostique rapide (PEA/ASSR), étiologie (CMV, génétique, imagerie), appareillage <strong>précoce</strong> si surdité permanente confirmée, accompagnement.",
      gravite:"Retard de diagnostic = coût sur le langage. Surdité possiblement évolutive.",
      education:"« Un dépistage à recontrôler est fréquent et ne veut pas dire sourd. Mais si une surdité est confirmée, la prendre en charge tôt est essentiel pour la parole. »",
      points:"Dépistage ≠ diagnostic ; OEA ne voient pas la neuropathie ; penser CMV ; agir tôt."
    })}
    ${cas(2, "Enfant 3 ans — retard de langage", {
      contexte:"Consultation pour parole peu développée, l'enfant « n'écoute pas », otites à répétition.",
      plainte:"Retard de langage, troubles d'attention apparents.",
      interro:"Otites répétées ? ronflement/respiration buccale (végétations) ? compréhension dans le bruit ? antécédents ?",
      examen:"Otoscopie (tympan terne/rétracté/épanchement), tympanométrie.",
      complementaires:"Tympanométrie (type B ?), audiométrie adaptée à l'âge (conditionnée/ludique), avis ORL/orthophonie.",
      interpretation:"OSM bilatérale chronique = surdité de transmission fluctuante → impact langage/apprentissage.",
      diagnostic:"Otite séromuqueuse bilatérale avec retentissement.",
      differentiels:"Surdité de perception sous-jacente, trouble du langage primaire, TSA (à ne pas confondre — vérifier l'audition d'abord).",
      cat:"Traiter l'OSM selon recommandations (surveillance, ± aérateurs si retentissement/persistance), orthophonie, réévaluer l'audition.",
      gravite:"Retentissement durable sur langage si négligé.",
      education:"« Une oreille pleine de liquide entend comme sous l'eau : cela peut expliquer le retard de parole. C'est souvent réversible. »",
      points:"Tout retard de langage → vérifier l'audition. OSM = 1re cause de transmission de l'enfant."
    })}
    ${cas(3, "Adolescent — plainte auditive fluctuante", {
      contexte:"Adolescent, sensation d'oreille bouchée fluctuante, parfois acouphène, après efforts/expositions sonores (concerts).",
      plainte:"Audition variable, acouphènes intermittents.",
      interro:"Exposition sonore (musique au casque, concerts) ? fluctuation, vertige, antécédents familiaux, ototoxiques ?",
      examen:"Otoscopie normale, acoumétrie.",
      complementaires:"Audiogramme (encoche aigus ? fluctuation ?), OEA ; si surdité fluctuante avec vertige → explorer (hydrops ?).",
      interpretation:"Le plus souvent traumatisme sonore débutant / acouphène d'exposition ; rester attentif à une fluctuation vraie évoquant un hydrops (rare à cet âge).",
      diagnostic:"Probable atteinte liée au bruit / acouphène d'exposition ; surveiller.",
      differentiels:"Dysfonction tubaire, hydrops débutant, surdité évolutive.",
      cat:"Prévention auditive +++ (protection, baisser le volume, pauses), audiogramme de référence, suivi.",
      gravite:"Risque d'aggravation cumulée par le bruit.",
      education:"« Le bruit fort abîme l'oreille de façon définitive et cumulative. Protégez vos oreilles maintenant : c'est irréversible. »",
      points:"Prévention du bruit chez le jeune ; distinguer fluctuation vraie (hydrops) d'une gêne d'exposition."
    })}
    ${cas(4, "Adulte — surdité brusque", {
      contexte:"Homme 45 ans, baisse d'audition unilatérale gauche installée en quelques heures ce matin, acouphène associé.",
      plainte:"« Je n'entends plus de l'oreille gauche depuis ce matin. »",
      interro:"Mode d'installation (heures/jours), vertige, signes neuro, contexte (effort, plongée, trauma), ototoxiques.",
      examen:"Otoscopie NORMALE (clé : ce n'est pas un bouchon), acoumétrie : Weber latéralisé à <strong>droite</strong> (oreille saine) → perception ; examen neuro.",
      complementaires:"Audiogramme en urgence (surdité de perception unilatérale), puis IRM (schwannome) à distance.",
      interpretation:"Surdité de perception d'installation rapide = surdité brusque = urgence.",
      diagnostic:"Surdité brusque idiopathique (diagnostic d'élimination) jusqu'à preuve du contraire.",
      differentiels:"Bouchon (otoscopie !), schwannome, AVC AICA (chercher signes neuro), Ménière inaugural, cause virale/vasculaire.",
      cat:"<strong>Adressage ORL en urgence</strong> (la précocité conditionne le pronostic) ; bilan + IRM.",
      gravite:"Urgence : fenêtre thérapeutique courte. Signes neuro associés → urgence neurovasculaire.",
      education:"« Une perte d'audition brutale est une urgence, comme pour l'œil. Plus on agit vite, mieux c'est. »",
      points:"Surdité brusque de perception = URGENCE. Otoscopie pour éliminer le bouchon. IRM ensuite."
    })}
    ${cas(5, "Adulte — surdité asymétrique", {
      contexte:"Femme 52 ans, gêne auditive droite progressive depuis des mois, acouphène droit, compréhension téléphonique difficile à droite.",
      plainte:"Audition et acouphène asymétriques (droite).",
      interro:"Évolution, acouphène unilatéral, vertige/instabilité, troubles de l'équilibre, hypoesthésie faciale.",
      examen:"Otoscopie normale, acoumétrie (perception droite), examen des paires crâniennes (V, VII).",
      complementaires:"Audiogramme (perception asymétrique), vocale (discordance ?), PEA, <strong>IRM des CAI</strong>.",
      interpretation:"Toute surdité de perception asymétrique inexpliquée = recherche de schwannome vestibulaire.",
      diagnostic:"Suspicion de schwannome vestibulaire → IRM.",
      differentiels:"Presbyacousie asymétrique, séquelle traumatique/bruit asymétrique, Ménière unilatéral.",
      cat:"IRM CAI ; selon résultat, avis ORL/neurochirurgie (surveillance / radiochirurgie / chirurgie).",
      gravite:"Tumeur bénigne mais à rapports à risque ; surveillance/traitement selon taille et évolution.",
      education:"« L'asymétrie justifie une IRM, le plus souvent rassurante, pour ne pas passer à côté d'une cause traitable. »",
      points:"Asymétrie de perception ou acouphène unilatéral = IRM. Discordance tonale/vocale = rétrocochléaire."
    })}
    ${cas(6, "Adulte — acouphène unilatéral", {
      contexte:"Homme 38 ans, acouphène permanent oreille gauche depuis 2 mois, sans surdité évidente.",
      plainte:"Sifflement gauche continu, gênant le soir.",
      interro:"Pulsatile ou non ? unilatéral strict ? surdité, vertige, signes neuro ? exposition, stress, médicaments.",
      examen:"Otoscopie, acoumétrie, auscultation cervicale/crânienne si pulsatile, examen neuro.",
      complementaires:"Audiogramme ; si unilatéral persistant/pulsatile → IRM (± imagerie vasculaire si pulsatile).",
      interpretation:"Acouphène unilatéral persistant = bilan ciblé (≠ acouphène bilatéral banal).",
      diagnostic:"Acouphène unilatéral à explorer (éliminer schwannome / cause vasculaire si pulsatile).",
      differentiels:"Schwannome, atteinte cochléaire focale, cause vasculaire (pulsatile), dysfonction tubaire.",
      cat:"Imagerie selon caractère ; si bilan négatif : prise en charge (information, thérapie sonore, gestion attention).",
      gravite:"Pulsatile/unilatéral = ne pas banaliser.",
      education:"« Un acouphène d'un seul côté mérite un examen pour vérifier l'oreille interne ; le plus souvent c'est bénin. »",
      points:"Unilatéral/pulsatile → bilan. Bilatéral chronique stable → prise en charge symptomatique."
    })}
    ${cas(7, "Sujet âgé — presbyacousie & troubles cognitifs", {
      contexte:"Femme 80 ans, l'entourage note qu'elle « répond à côté », s'isole, semble confuse en réunion de famille.",
      plainte:"Compréhension difficile surtout dans le bruit ; suspicion de déclin cognitif.",
      interro:"Symétrie, évolution, isolement, chutes, autonomie, plaintes mnésiques distinctes de l'audition.",
      examen:"Otoscopie (bouchon ?), acoumétrie ; évaluation cognitive de base.",
      complementaires:"Audiogramme (perception symétrique aigus), tympanométrie ; bilan cognitif si doute après correction auditive.",
      interpretation:"La perte auditive peut mimer/aggraver un trouble cognitif et l'isolement.",
      diagnostic:"Presbyacousie ; intrication possible avec un trouble cognitif (à réévaluer après appareillage).",
      differentiels:"Bouchon réversible, dépression, trouble cognitif vrai.",
      cat:"Corriger l'audition (appareillage), réévaluer la cognition après ; lutter contre l'isolement ; prévention des chutes.",
      gravite:"Isolement, risque cognitif et de chute.",
      education:"À la famille : « Avant de conclure à la mémoire, corrigeons l'audition : bien entendre protège le cerveau et le lien social. »",
      points:"Audition–cognition–isolement–chutes liés. Toujours éliminer le bouchon ; appareiller tôt."
    })}
    ${cas(8, "Patient EHPAD — suspicion de surdité", {
      contexte:"Homme 86 ans en EHPAD, soignants signalent qu'il « n'entend plus », agitation, refus de soins.",
      plainte:"Communication très difficile.",
      interro:"(Avec soignants/famille) ancienneté, port d'aides auditives, entretien, comportement.",
      examen:"Otoscopie (<strong>bouchon de cérumen +++</strong>), vérifier les aides auditives (piles, encrassement).",
      complementaires:"Désobstruction si bouchon, puis réévaluation ; audiométrie adaptée/objective si besoin.",
      interpretation:"En institution, le bouchon et les aides non entretenues/non portées sont des causes fréquentes et réversibles.",
      diagnostic:"Surdité majorée par bouchon ± aides auditives défaillantes (à confirmer).",
      differentiels:"Presbyacousie sévère, OSM, cause cognitive, dépression.",
      cat:"Désobstruction, maintenance/port effectif des aides, formation des soignants à la communication, coordination ORL/audioprothésiste.",
      gravite:"Isolement, troubles du comportement, dénutrition possible.",
      education:"Aux soignants : « Parler en face, articuler, réduire le bruit ; vérifier oreilles et appareils avant de conclure à la démence. »",
      points:"EHPAD : penser bouchon et entretien des aides ; communication adaptée."
    })}
    ${cas(9, "Travailleur exposé au bruit", {
      contexte:"Homme 50 ans, industrie, surveillance médecine du travail ; audiogramme montrant une encoche à 4 kHz qui s'aggrave.",
      plainte:"Acouphènes, gêne dans le bruit.",
      interro:"Poste, durée d'exposition, protection portée, antécédents, symétrie, autres expositions (loisirs).",
      examen:"Otoscopie, acoumétrie.",
      complementaires:"Audiogramme comparé aux antérieurs (référence d'embauche), confirmer la fiabilité (masquage, otoscopie).",
      interpretation:"Profil compatible avec traumatisme sonore chronique ; l'évolution comparative alerte.",
      diagnostic:"Surdité induite par le bruit (à confirmer/déclarer selon référentiels), <strong>après avoir éliminé une asymétrie</strong>.",
      differentiels:"Schwannome (si asymétrie !), presbyacousie associée, autre cause.",
      cat:"Renforcer la protection, adapter le poste, traçabilité, orientation médecine du travail + ORL ; déclaration selon procédure.",
      gravite:"Irréversible ; enjeu médico-légal.",
      education:"« Les dégâts du bruit sont définitifs mais évitables : la protection doit être portée en continu. »",
      points:"Comparer aux audiogrammes antérieurs ; une asymétrie n'est pas « du bruit » → IRM. Traçabilité."
    })}
    ${cas(10, "Audiogramme discordant", {
      contexte:"Patient adressé pour « surdité profonde bilatérale », mais communique normalement en consultation.",
      plainte:"Plainte d'audition, contexte parfois médico-légal/assurantiel.",
      interro:"Cohérence de la plainte, contexte, bénéfices secondaires possibles, antécédents.",
      examen:"Otoscopie, observation du comportement auditif spontané.",
      complementaires:"Refaire l'audiométrie (consignes, masquage), confronter tonale/vocale, et surtout <strong>examens objectifs</strong> (OEA, PEA).",
      interpretation:"Discordances majeures + objectifs normaux → fausse surdité / majoration ; mais ne jamais conclure sans objectifs.",
      diagnostic:"Surdité non organique / majorée (après objectivation) — diagnostic prudent.",
      differentiels:"Surdité centrale, neuropathie, défaut technique, surdité vraie sous-évaluée.",
      cat:"Examens objectifs, attitude non accusatoire, compte rendu factuel.",
      gravite:"Pièges médico-légaux.",
      education:"Rester neutre et factuel ; proposer les tests objectifs comme une vérification.",
      points:"Toujours objectiver (OEA/PEA) avant de parler de fausse surdité. Masquage et consignes d'abord."
    })}
    ${cas(11, "Suspicion de neuropathie auditive", {
      contexte:"Enfant suivi (ancien prématuré, ictère sévère néonatal), parle peu, comprend mal malgré « OEA présentes ».",
      plainte:"Compréhension très altérée, disproportionnée.",
      interro:"Antécédents néonataux (réanimation, ictère), évolution du langage.",
      examen:"Otoscopie, observation.",
      complementaires:"PEA (désorganisés/absents) + OEA (présentes) = signature ; ASSR ; avis centre spécialisé.",
      interpretation:"OEA présentes + PEA anormaux = neuropathie/désynchronisation auditive.",
      diagnostic:"Neuropathie auditive.",
      differentiels:"Surdité de perception cochléaire, trouble central, surdité fluctuante.",
      cat:"Prise en charge spécialisée (l'appareillage classique peut être peu efficace ; discuter implant selon le cas), orthophonie.",
      gravite:"Impact majeur sur le langage.",
      education:"« L'oreille capte mais le message passe mal au cerveau : la prise en charge est particulière et spécialisée. »",
      points:"Profil OEA+/PEA– ; dépistage par OEA seules peut rater ; PEA en réanimation néonatale."
    })}
    ${cas(12, "Suspicion de synaptopathie cochléaire", {
      contexte:"Adulte jeune, musicien, se plaint de mal comprendre dans le bruit alors que l'audiogramme est normal.",
      plainte:"Difficulté dans le bruit, fatigue auditive.",
      interro:"Exposition sonore, acouphène, contexte attentionnel, sommeil.",
      examen:"Otoscopie, acoumétrie normales.",
      complementaires:"Audiogramme normal ; vocale dans le bruit ; éliminer un trouble central (M7) ; OEA.",
      interpretation:"Profil compatible avec une difficulté dans le bruit à audiogramme normal ; la « synaptopathie cachée » est un concept en partie discuté chez l'humain.",
      diagnostic:"Plainte auditive dans le bruit à audiogramme normal — hypothèse de synaptopathie (prudence), éliminer central.",
      differentiels:"Trouble central, attentionnel, acouphène/hyperacousie, presbyacousie débutante.",
      cat:"Prévention sonore, vocale dans le bruit, accompagnement ; pas de sur-diagnostic.",
      gravite:"Faible mais gênant ; risque de sur-médicalisation.",
      education:"« Vos seuils sont normaux mais comprendre dans le bruit demande plus que des seuils ; protégez vos oreilles et on vous aide. »",
      points:"Audiogramme normal ≠ audition parfaite ; concept de synaptopathie à manier avec prudence."
    })}
    ${cas(13, "Suspicion de trouble central de l'audition", {
      contexte:"Enfant scolarisé, audiogramme normal, difficultés de compréhension en classe bruyante, suit mal les consignes.",
      plainte:"Compréhension/attention auditive en milieu bruyant.",
      interro:"Langage, attention, contexte neuro/développemental, audition dans le calme vs bruit.",
      examen:"Otoscopie, audiométrie normales.",
      complementaires:"Tests d'audition centrale (standardisés), avis ORL/audiologie + orthophonie ± neuropsychologie.",
      interpretation:"Plainte d'intelligibilité avec audition périphérique normale → évaluer le traitement central, en éliminant attention/langage.",
      diagnostic:"Trouble du traitement auditif central (diagnostic d'argumentation, pas d'élimination).",
      differentiels:"TDAH, trouble du langage, surdité légère/rétrocochléaire passée inaperçue.",
      cat:"Aménagements (réduire le bruit, consignes claires, système FM en classe selon avis), prise en charge pluridisciplinaire.",
      gravite:"Retentissement scolaire.",
      education:"« L'oreille entend bien mais le cerveau trie mal les sons dans le bruit : des aménagements aident beaucoup. »",
      points:"Audiogramme normal + plainte d'intelligibilité → central ; approche pluridisciplinaire."
    })}`
  },

  {
    id: "cas-vestibulaires", ico: "🌀", titre: "Cas 14 à 25 — pathologies vestibulaires",
    html: `
    ${cas(14, "Vertige positionnel typique (VPPB postérieur)", {
      contexte:"Femme 60 ans, vertiges rotatoires brefs déclenchés en se retournant dans le lit et en se levant, depuis 4 jours.",
      plainte:"« La tête tourne quelques secondes quand je bouge. »",
      interro:"Déclenché par les changements de position ? durée brève (secondes) ? pas de signe auditif ni neuro ? trauma récent ?",
      examen:"Examen neuro normal ; <strong>Dix-Hallpike</strong> : nystagmus torsionnel/géotropique, après latence, paroxystique, épuisable.",
      complementaires:"Aucun en 1re intention si tableau typique et examen concordant.",
      interpretation:"Caractères typiques = VPPB du canal postérieur (canalolithiase).",
      diagnostic:"VPPB du canal postérieur.",
      differentiels:"VPPB horizontal, vertige central positionnel (downbeat persistant → alerte), hypotension orthostatique.",
      cat:"Manœuvre libératoire adaptée (type Epley) ; réévaluer ; conseils.",
      gravite:"Bénin, mais chutes possibles ; downbeat persistant → éliminer central.",
      education:"« De petits cristaux se sont déplacés dans l'oreille interne ; une manœuvre les remet en place, souvent en 1–2 séances. »",
      points:"Dix-Hallpike fait le diagnostic ; latence + épuisable = bénin ; manœuvre = traitement."
    })}
    ${cas(15, "VPPB horizontal", {
      contexte:"Homme 55 ans, vertiges positionnels brefs surtout en tournant la tête sur l'oreiller, intenses.",
      plainte:"Vertiges en se tournant latéralement, couché.",
      interro:"Déclenchement par rotation en décubitus, durée brève, pas de signe auditif/neuro.",
      examen:"Dix-Hallpike peu contributif ; <strong>supine roll test</strong> : nystagmus horizontal — géotropique (canalolithiase) ou apogéotropique (cupulolithiase).",
      complementaires:"Aucun si typique.",
      interpretation:"VPPB du canal horizontal ; déterminer géotropique vs apogéotropique et le côté.",
      diagnostic:"VPPB du canal horizontal.",
      differentiels:"VPPB postérieur, central positionnel.",
      cat:"Manœuvre adaptée au canal horizontal (ex. BBQ/Gufoni selon forme) ; réévaluer.",
      gravite:"Bénin ; déterminer le côté est parfois délicat.",
      education:"Idem VPPB postérieur, en précisant que la manœuvre diffère.",
      points:"Supine roll test pour l'horizontal ; géotropique vs apogéotropique change la manœuvre."
    })}
    ${cas(16, "VPPB compliqué / réfractaire", {
      contexte:"Patient avec VPPB récidivant, plusieurs canaux suspectés, échec de manœuvres, ou nystagmus atypique.",
      plainte:"Vertiges positionnels persistants malgré traitement.",
      interro:"Récidives, traumatisme, ostéoporose/âge, atypies (downbeat, persistance).",
      examen:"Manœuvres répétées et documentées ; rechercher des caractères atypiques (non épuisable, downbeat persistant).",
      complementaires:"Si atypique/réfractaire : avis spécialisé ± imagerie (éliminer central).",
      interpretation:"VPPB multi-canalaire/réfractaire ou « pseudo-VPPB » central.",
      diagnostic:"VPPB complexe (multi-canal, cupulolithiase) ou cause centrale à éliminer.",
      differentiels:"Central positionnel, migraine vestibulaire, malformation.",
      cat:"Avis ORL/otoneuro spécialisé ; manœuvres ciblées ; surveillance.",
      gravite:"Atypies = vigilance centrale ; chutes.",
      education:"« Parfois plusieurs canaux sont touchés ou cela récidive ; un avis spécialisé adapte les manœuvres. »",
      points:"Réfractaire/atypique → spécialiste ; downbeat persistant → central."
    })}
    ${cas(17, "Maladie de Ménière", {
      contexte:"Femme 45 ans, crises de vertige rotatoire de 1–3 h, avec acouphène et sensation d'oreille pleine à gauche, baisse d'audition fluctuante.",
      plainte:"Crises vertige + surdité fluctuante + acouphène + plénitude (gauche).",
      interro:"Durée (min–heures), fluctuation auditive documentée, plénitude, facteurs déclenchants, fréquence des crises.",
      examen:"Entre les crises souvent normal ; acoumétrie (perception graves à gauche).",
      complementaires:"Audiogrammes répétés (fluctuation graves), explorations vestibulaires (calorique/VHIT, dissociation possible) ; éliminer autres causes.",
      interpretation:"Association vertige + surdité fluctuante + acouphène/plénitude = Ménière (diagnostic clinique).",
      diagnostic:"Maladie de Ménière (à confirmer par la documentation auditive).",
      differentiels:"Migraine vestibulaire (peut coexister), schwannome, auto-immun, VPPB (durée incompatible).",
      cat:"Mesures hygiéno-diététiques (réduction sel, etc.), traitement de crise et de fond discutés en ORL ; suivi audiométrique.",
      gravite:"Retentissement, surdité résiduelle progressive possible.",
      education:"« Maladie de l'oreille interne évoluant par crises ; on espace les crises (hygiène de vie, traitements) et on surveille l'audition. »",
      points:"Diagnostic clinique : documenter la surdité fluctuante ; distinguer/associer migraine vestibulaire."
    })}
    ${cas(18, "Migraine vestibulaire", {
      contexte:"Femme 35 ans migraineuse, épisodes de vertige/instabilité de durée variable, parfois avec photophobie, sans surdité.",
      plainte:"Vertiges récurrents, contexte migraineux.",
      interro:"Antécédents/critères de migraine, photo-phonophobie pendant les épisodes, déclencheurs migraineux, audition (normale ?).",
      examen:"Souvent normal entre les épisodes ; pas de signe central durable.",
      complementaires:"Surtout clinique ; audiogramme (normal/peu touché) ; imagerie si atypies/red flags.",
      interpretation:"Vertiges récurrents + contexte migraineux + audition normale = migraine vestibulaire.",
      diagnostic:"Migraine vestibulaire.",
      differentiels:"Ménière (surdité fluctuante), VPPB, central, anxiété.",
      cat:"Prise en charge de la migraine (hygiène de vie, traitement de crise/de fond), éviction des déclencheurs ; réévaluer.",
      gravite:"Bénin mais invalidant ; sous-diagnostiqué.",
      education:"« Vos vertiges sont une forme de migraine ; les traiter comme une migraine les espace. »",
      points:"Très fréquente et sous-diagnostiquée ; audition normale ; peut coexister avec Ménière."
    })}
    ${cas(19, "Déficit vestibulaire unilatéral aigu (névrite)", {
      contexte:"Homme 40 ans, grand vertige rotatoire continu depuis 24 h, nausées, instable, sans surdité ni signe neuro, après épisode viral.",
      plainte:"Vertige intense permanent, impossible de marcher droit.",
      interro:"Continu (jours) ? surdité (non) ? signes neuro (non) ? céphalée brutale (non) ? facteurs vasculaires ?",
      examen:"Nystagmus horizonto-rotatoire unidirectionnel battant vers le côté sain, atténué par fixation ; <strong>HINTS périphérique</strong> (HIT anormal côté atteint, pas de skew, nystagmus unidirectionnel).",
      complementaires:"Si HINTS périphérique franc et examen rassurant : pas d'imagerie d'emblée ; sinon IRM.",
      interpretation:"Syndrome vestibulaire aigu d'allure périphérique = névrite vestibulaire.",
      diagnostic:"Névrite vestibulaire (déficit unilatéral aigu).",
      differentiels:"<strong>AVC cérébelleux/AICA</strong> (HINTS central !), labyrinthite (si surdité), Ménière inaugural.",
      cat:"Traitement symptomatique <strong>court</strong>, <strong>mobilisation et rééducation précoces</strong> ; éviter sédatifs prolongés.",
      gravite:"Piège vital = AVC qui imite. HINTS tranche.",
      education:"« L'oreille de l'équilibre a été touchée ; le cerveau va compenser. Bougez dès que possible, c'est ce qui guérit. »",
      points:"HINTS sur syndrome aigu continu ; HIT normal en plein vertige = inquiétant ; rééduquer tôt."
    })}
    ${cas(20, "Déficit vestibulaire bilatéral", {
      contexte:"Homme 65 ans, instabilité chronique, sensation que « le décor saute » à la marche, après traitement par aminosides.",
      plainte:"Instabilité permanente + oscillopsie, pas de vertige rotatoire.",
      interro:"Ototoxiques (aminosides), évolution, chutes, oscillopsie aux mouvements de tête.",
      examen:"HIT anormal des <strong>deux côtés</strong>, instabilité majorée yeux fermés ; pas de signe central.",
      complementaires:"VHIT bilatéral (gain abaissé bilatéral), calorique (hyporéflexie bilatérale), fauteuil rotatoire.",
      interpretation:"Atteinte vestibulaire bilatérale (ototoxique).",
      diagnostic:"Déficit vestibulaire bilatéral (ototoxique).",
      differentiels:"Neuropathie proprioceptive, atteinte cérébelleuse, idiopathique/dégénératif.",
      cat:"Rééducation (substitution, stabilisation du regard), sécurité/chutes ; arrêter/éviter l'ototoxique ; pas de récupération spontanée complète.",
      gravite:"Handicap durable, chutes, oscillopsie.",
      education:"« Les deux oreilles de l'équilibre sont touchées ; on apprend à compenser par la vue et le corps. Évitez l'obscurité, sécurisez le domicile. »",
      points:"Oscillopsie + instabilité + HIT bilatéral ; penser ototoxicité ; substitution."
    })}
    ${cas(21, "Vertige central", {
      contexte:"Homme 70 ans hypertendu/diabétique, vertige aigu continu + instabilité majeure, vomissements, depuis ce matin.",
      plainte:"Vertige sévère, incapable de tenir debout.",
      interro:"Facteurs de risque vasculaire, céphalée, diplopie, dysarthrie, troubles de déglutition.",
      examen:"<strong>HINTS central</strong> : HIT normal, nystagmus changeant/vertical, skew possible ; ataxie tronculaire (ne tient pas assis) ; ± autres signes neuro.",
      complementaires:"<strong>IRM</strong> (diffusion) en urgence, avis neuro ; attention IRM précoce parfois faussement négative.",
      interpretation:"Syndrome vestibulaire aigu d'allure centrale = AVC de fosse postérieure jusqu'à preuve du contraire.",
      diagnostic:"Vertige central (AVC cérébelleux/tronc).",
      differentiels:"Névrite (mais HINTS périphérique), SEP, tumeur.",
      cat:"<strong>Urgence neurovasculaire</strong> : filière AVC, imagerie, hospitalisation.",
      gravite:"Pronostic vital (œdème cérébelleux, engagement).",
      education:"À l'entourage : prise en charge en urgence comme un AVC.",
      points:"HIT normal + ataxie sévère + signes centraux = urgence ; HINTS > IRM précoce pour la fosse postérieure."
    })}
    ${cas(22, "Vertige post-traumatique", {
      contexte:"Patient après traumatisme crânien/cervical, vertiges positionnels + instabilité + céphalées.",
      plainte:"Vertiges et instabilité depuis le trauma.",
      interro:"Mécanisme, perte de connaissance, otorragie, surdité, signes neuro, déclencheurs positionnels.",
      examen:"Otoscopie (hémotympan ?), Dix-Hallpike (VPPB post-traumatique fréquent), examen neuro, recherche de signe de fistule (Tullio).",
      complementaires:"Selon contexte : TDM rochers (fracture), audiogramme ; éliminer atteinte centrale.",
      interpretation:"Plusieurs mécanismes possibles : VPPB post-traumatique (fréquent), commotion labyrinthique, fistule, fracture.",
      diagnostic:"Vertige post-traumatique (souvent VPPB post-traumatique).",
      differentiels:"Fistule périlymphatique, fracture du rocher, atteinte centrale, syndrome post-commotionnel.",
      cat:"Traiter le VPPB (manœuvre) ; imagerie si red flags ; avis ORL ; rééducation.",
      gravite:"Éliminer fracture, atteinte centrale, fistule.",
      education:"« Les cristaux de l'oreille se déplacent souvent après un choc ; une manœuvre aide. On vérifie l'absence de lésion plus grave. »",
      points:"VPPB post-trauma fréquent ; penser fistule/fracture ; imagerie selon red flags."
    })}
    ${cas(23, "Vertige fonctionnel (PPPD)", {
      contexte:"Femme 40 ans, instabilité/étourdissement quasi permanents depuis 4 mois après une névrite, aggravés en magasin et devant les écrans.",
      plainte:"Instabilité chronique, sensation de « flotter », majorée par mouvement/visuel.",
      interro:"Chronicité (≥3 mois), aggravation debout/mouvement/stimuli visuels, déclencheur initial (vestibulaire), anxiété associée.",
      examen:"Examen otoneurologique normal ou compensé ; pas de signe central ; nystagmus absent.",
      complementaires:"Souvent normaux/compensés ; servent à rassurer et exclure une cause active.",
      interpretation:"Critères positifs de PPPD ; pas un diagnostic d'élimination paresseux.",
      diagnostic:"Vertige/instabilité posturo-perceptuel persistant (PPPD).",
      differentiels:"Déficit non compensé, migraine vestibulaire, cause centrale, trouble anxieux primaire.",
      cat:"Explication/déculpabilisation, rééducation vestibulaire + désensibilisation visuelle, ± approche cognitivo-comportementale/traitement.",
      gravite:"Invalidant, chronique ; risque d'errance diagnostique.",
      education:"« Après l'épisode initial, le système d'équilibre est resté en alerte. On le rééduque et on réduit l'hypervigilance ; cela se traite. »",
      points:"Diagnostic positif ; éviter les explorations en boucle ; rééducation + TCC."
    })}
    ${cas(24, "Vertige chez l'enfant", {
      contexte:"Enfant 8 ans, épisodes brefs et récurrents de vertige/instabilité, parfois pâleur, antécédents familiaux de migraine.",
      plainte:"Épisodes de vertige récurrents.",
      interro:"Durée, déclencheurs, céphalées, antécédents familiaux migraine, otites, audition, signes neuro.",
      examen:"Otoscopie, examen otoneurologique adapté, marche, observation.",
      complementaires:"Surtout clinique ; audiogramme ; imagerie si red flags/atypies.",
      interpretation:"Vertige récurrent de l'enfant : souvent vertige paroxystique bénin de l'enfant / migraine vestibulaire.",
      diagnostic:"Migraine vestibulaire / vertige paroxystique bénin de l'enfant (selon âge et critères).",
      differentiels:"OMA, VPPB (rare), central (rare mais à éliminer), causes ophtalmo.",
      cat:"Rassurer, hygiène de vie, suivi ; avis spécialisé si atypies/red flags ou retentissement.",
      gravite:"Éliminer cause centrale ; rare.",
      education:"« Souvent une forme de migraine de l'enfant, bénigne ; on surveille et on agit sur les facteurs déclenchants. »",
      points:"Penser migraine/équivalents ; un déficit complet précoce retentit sur le développement moteur."
    })}
    ${cas(25, "Vertige chez le sujet âgé", {
      contexte:"Femme 82 ans, instabilité et chutes répétées, plusieurs médicaments, vue baissée, vertiges positionnels intermittents.",
      plainte:"Instabilité, peur de tomber, chutes.",
      interro:"VPPB (positionnel) ? hypotension orthostatique ? médicaments (sédatifs, antihypertenseurs) ? vision, neuropathie, cognition.",
      examen:"Dix-Hallpike (VPPB fréquent et sous-diagnostiqué), TA couché/debout, marche, Timed Up and Go, examen neuro.",
      complementaires:"Selon orientation ; réviser l'ordonnance.",
      interpretation:"Équilibre du sujet âgé = multifactoriel (vestibulaire + visuel + proprioceptif + cognitif + iatrogène).",
      diagnostic:"Instabilité multifactorielle ± VPPB associé.",
      differentiels:"VPPB, hypotension orthostatique, central, iatrogénie, presbyvestibulie.",
      cat:"Traiter le VPPB, réviser les médicaments, corriger la vision, rééducation/équilibre, prévention des chutes (domicile).",
      gravite:"Chutes = morbi-mortalité majeure.",
      education:"« Plusieurs causes s'additionnent ; on agit sur chacune (oreille, médicaments, vue, muscles) pour réduire les chutes. »",
      points:"Toujours chercher un VPPB et l'iatrogénie ; approche multifactorielle des chutes."
    })}`
  },

  {
    id: "cas-mixtes", ico: "🔗", titre: "Cas 26 à 30 — mixtes & complexes",
    html: `
    ${cas(26, "Suspicion de troisième fenêtre (déhiscence canal supérieur)", {
      contexte:"Adulte, vertige/oscillopsie déclenchés par les sons forts (Tullio) ou les efforts (mouchage), autophonie (« j'entends ma voix/mes yeux »).",
      plainte:"Vertige au bruit/à la pression, autophonie, parfois hypersensibilité aux bruits corporels.",
      interro:"Vertige provoqué par son fort/pression, autophonie, sensation de plénitude, audition.",
      examen:"Recherche de nystagmus au son/pression ; acoumétrie (parfois « surdité de transmission » à tympan normal et réflexes présents — paradoxe).",
      complementaires:"<strong>TDM coupes fines</strong> du canal supérieur (déhiscence) + <strong>VEMP</strong> (seuils bas/amplitudes augmentées).",
      interpretation:"Signes de 3e fenêtre + TDM + VEMP concordants.",
      diagnostic:"Déhiscence du canal semi-circulaire supérieur.",
      differentiels:"Otospongiose (mais réflexes absents), Ménière, fistule.",
      cat:"Avis ORL spécialisé ; abstention/chirurgie de comblement selon retentissement (après confirmation).",
      gravite:"Invalidant ; diagnostic souvent retardé.",
      education:"« Une petite déhiscence osseuse crée une fenêtre supplémentaire dans l'oreille interne, d'où ces symptômes au bruit/à l'effort ; cela s'explique et se traite. »",
      points:"Vertige au son/pression + autophonie = penser 3e fenêtre ; TDM fin + VEMP ; pseudo-transmission à réflexes présents."
    })}
    ${cas(27, "Affection mixte audio-vestibulaire", {
      contexte:"Patient présentant à la fois une surdité de perception unilatérale progressive ET une instabilité, acouphène du même côté.",
      plainte:"Surdité + acouphène + instabilité homolatéraux.",
      interro:"Évolution, latéralité, signes neuro, antécédents.",
      examen:"Acoumétrie (perception unilatérale), examen otoneurologique (déficit canalaire homolatéral ?).",
      complementaires:"Audiogramme + explorations vestibulaires + <strong>IRM CAI</strong>.",
      interpretation:"Atteinte combinée cochléo-vestibulaire homolatérale → oreille interne ou nerf VIII.",
      diagnostic:"À préciser : schwannome vestibulaire, labyrinthite, Ménière évolué, atteinte auto-immune.",
      differentiels:"Cf. ci-dessus selon évolution et IRM.",
      cat:"IRM, avis ORL/otoneuro ; traitement étiologique.",
      gravite:"Selon cause (tumeur, auto-immun).",
      education:"« L'audition et l'équilibre du même côté sont touchés : on explore l'oreille interne et le nerf par IRM. »",
      points:"Association cochléo-vestibulaire homolatérale → IRM CAI."
    })}
    ${cas(28, "Atteinte audio-vestibulaire génétique / syndromique", {
      contexte:"Enfant avec surdité de perception bilatérale, antécédents familiaux, signes associés (anomalie pigmentaire / rénale / visuelle selon syndrome).",
      plainte:"Surdité permanente, contexte familial/syndromique.",
      interro:"Arbre généalogique, consanguinité, signes associés (œil, rein, cœur, thyroïde, équilibre/marche tardive).",
      examen:"Examen général à la recherche de signes syndromiques ; évaluation vestibulaire (certaines surdités génétiques s'accompagnent d'aréflexie vestibulaire).",
      complementaires:"Audiologie complète, imagerie (malformations, EVA), <strong>bilan génétique</strong> et avis pluridisciplinaire (centre).",
      interpretation:"Surdité génétique isolée ou syndromique ; impact vestibulaire possible.",
      diagnostic:"Surdité génétique (à caractériser) ± syndrome.",
      differentiels:"CMV, malformation acquise, autres causes.",
      cat:"Centre spécialisé : génétique, appareillage/implant, accompagnement, conseil génétique familial.",
      gravite:"Évolutivité, atteintes associées.",
      education:"« Il peut exister une cause génétique ; un bilan en centre précise le diagnostic, le suivi et l'information pour la famille. »",
      points:"Chercher les signes syndromiques ; bilan génétique en centre ; penser à l'équilibre."
    })}
    ${cas(29, "Atteinte liée au CMV congénital", {
      contexte:"Nourrisson, surdité de perception détectée, contexte de primo-infection maternelle / signes néonataux.",
      plainte:"Surdité néonatale.",
      interro:"Sérologies maternelles, signes néonataux (RCIU, microcéphalie, hépatosplénomégalie, pétéchies), évolution.",
      examen:"Examen pédiatrique complet ; audiologie objective.",
      complementaires:"Recherche de CMV (idéalement dans la <strong>fenêtre néonatale</strong> pour affirmer le caractère congénital), imagerie cérébrale, suivi audiologique <strong>rapproché</strong> (surdité souvent évolutive/retardée).",
      interpretation:"CMV congénital = 1re cause non génétique de surdité neurosensorielle de l'enfant ; surdité pouvant apparaître/s'aggraver secondairement.",
      diagnostic:"Surdité liée au CMV congénital.",
      differentiels:"Surdité génétique, autre infection, malformation.",
      cat:"Avis spécialisé (infectiologie pédiatrique/ORL), discussion d'un traitement selon protocole, appareillage, suivi prolongé.",
      gravite:"Surdité évolutive ; atteintes neurologiques associées possibles.",
      education:"« Une infection avant la naissance peut toucher l'audition, parfois de façon retardée : un suivi régulier est indispensable. »",
      points:"Diagnostic de fenêtre néonatale ; surdité évolutive → suivi rapproché."
    })}
    ${cas(30, "Patient nécessitant une discussion chirurgicale (implant)", {
      contexte:"Adulte avec surdité de perception bilatérale sévère-profonde évoluée, bénéfice insuffisant des aides auditives bien réglées, gêne de communication majeure.",
      plainte:"Ne comprend plus malgré ses appareils.",
      interro:"Évolution, durée de la surdité, intelligibilité avec appareils, retentissement, attentes, motivation.",
      examen:"Otoscopie, acoumétrie ; évaluation globale.",
      complementaires:"Audiométrie tonale ET <strong>vocale</strong> (avec appareils), imagerie (TDM + IRM : cochlée perméable ? nerf cochléaire présent ?), bilan pluridisciplinaire.",
      interpretation:"Profil pouvant relever d'un implant cochléaire si bénéfice prothétique insuffisant et anatomie favorable.",
      diagnostic:"Indication potentielle d'implant cochléaire (décision en centre/RCP).",
      differentiels:"Réglage prothétique optimisable, neuropathie, autre dispositif (conduction osseuse selon le cas).",
      cat:"Adresser en centre d'implantation : bilan complet, information, décision partagée ; rééducation post-implant.",
      gravite:"Retentissement majeur sur la communication ; enjeu de réhabilitation.",
      education:"« Quand les appareils ne suffisent plus, un implant peut redonner de la compréhension ; un centre spécialisé évalue si vous êtes candidat. »",
      points:"L'intelligibilité (vocale) guide l'indication d'implant ; imagerie pour cochlée/nerf ; décision en centre."
    })}`
  }

  ]
});
