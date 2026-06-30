/* ===== PRÉSENTATION / SYLLABUS ===== */
FORMATION.push({
  cat: "Présentation",
  ico: "🎓",
  sections: [

  {
    id: "accueil", ico: "🏠", titre: "Présentation & plan global",
    html: `
    <p class="lead">Formation médicale complète, progressive et scientifiquement structurée sur les
    <strong>pathologies audio-vestibulaires</strong> : de l'embryologie au geste de rééducation, du dépistage
    néonatal à la décision chirurgicale. Conçue pour être lue en autonomie, projetée en cours, ou transformée
    en e-learning / DU-DIU / fiches de consultation.</p>

    ${box("note", `Cette formation est un <strong>support de raisonnement et d'enseignement</strong>. Elle ne se substitue
    pas aux recommandations des sociétés savantes (ORL, audiologie, otoneurologie, neurologie, pédiatrie, médecine du
    travail, gériatrie, HAS, consensus internationaux). Les seuils, valeurs et protocoles sont donnés à titre indicatif
    et <strong>doivent être vérifiés selon les référentiels en vigueur et les protocoles locaux</strong>. Lorsque les
    données sont discutées, le texte le signale explicitement.`)}

    <h3>1 · Titre de la formation</h3>
    <p><strong>« Audiologie & Otoneurologie en pratique — Comprendre, explorer et prendre en charge les pathologies
    audio-vestibulaires »</strong></p>

    <h3>2 · Public cible</h3>
    <ul>
      <li>Médecins généralistes souhaitant fiabiliser le triage des plaintes auditives et vertigineuses ;</li>
      <li>ORL débutants et internes d'ORL ;</li>
      <li>Internes de neurologie, gériatrie, pédiatrie en contact avec ces plaintes ;</li>
      <li>Audioprothésistes avancés ;</li>
      <li>Kinésithérapeutes vestibulaires, orthophonistes, et professionnels de santé visant une compétence solide.</li>
    </ul>

    <h3>3 · Prérequis</h3>
    <ul>
      <li>Bases de sémiologie médicale et d'examen clinique général ;</li>
      <li>Notions d'anatomie de la tête et du cou (utiles, non indispensables : revues au Bloc 1) ;</li>
      <li>Aucun prérequis instrumental : les examens sont expliqués à partir de zéro.</li>
    </ul>

    <h3>4 · Compétences finales attendues</h3>
    ${algo([
      "<b>Comprendre</b> les mécanismes anatomo-physiologiques et physiopathologiques audio-vestibulaires.",
      "<b>Interroger et examiner</b> un patient avec une plainte auditive ou vertigineuse, de façon structurée et reproductible.",
      "<b>Choisir</b> les bons examens (audiologiques, vestibulaires, imagerie) au bon moment.",
      "<b>Interpréter</b> les résultats et rédiger un compte rendu exploitable.",
      "<b>Identifier les urgences</b> et les red flags (surdité brusque, vertige central, signes neurologiques).",
      "<b>Proposer une prise en charge adaptée</b> à l'âge et au contexte.",
      "<b>Orienter</b> au bon moment vers ORL, neurologue, chirurgien, généticien, audioprothésiste, kiné vestibulaire ou centre expert."
    ])}

    <h3>5 · Durée totale recommandée</h3>
    ${tbl(["Format", "Durée indicative", "Commentaire"], [
      ["Tronc commun (Bloc 1)", "≈ 35–45 h", "Cours + cas + auto-évaluation"],
      ["Module Audiologie avancée (Bloc 2)", "≈ 15–20 h", "Optionnel, orienté pratique instrumentale"],
      ["Module Vestibule avancé (Bloc 3)", "≈ 15–20 h", "Optionnel, orienté gestes et explorations"],
      ["Cas cliniques + évaluations", "≈ 10–15 h", "Transversal"],
      ["<strong>Total</strong>", "<strong>≈ 75–100 h</strong>", "À moduler selon le public et le format"]
    ])}
    ${box("note", "Ces durées sont des repères pédagogiques modulables, pas des normes réglementaires. Adapter au format (présentiel, e-learning, DPC).")}

    <h3>6 · Architecture globale</h3>
    ${tbl(["Bloc", "Contenu", "Objectif"], [
      ["<strong>Bloc 1 — Tronc commun</strong>", "15 modules : bases, imagerie, audiologie, vestibulogie, examen otoneurologique, rééducation, chirurgie", "Socle indispensable pour tous"],
      ["<strong>Bloc 2 — Audiologie avancée</strong>", "Techniques d'audiométrie, OEA, PEA/ASSR, audition centrale, acouphènes, EHPAD", "Maîtrise instrumentale auditive"],
      ["<strong>Bloc 3 — Vestibule avancé</strong>", "Examen otoneurologique fin, VHIT, VEMP, posturographie, rééducation ciblée, VPPB complexes", "Maîtrise instrumentale et gestuelle vestibulaire"],
      ["Transversal", "30 cas cliniques, évaluations (QCM/QROC/OSCE), 20 fiches mémo, algorithmes, bibliographie", "Application et certification"]
    ])}

    <h3>7 · Comment utiliser cette application</h3>
    <ul>
      <li><strong>Menu latéral</strong> : navigation par bloc et module.</li>
      <li><strong>Recherche</strong> (en haut) : retrouve une notion par mot-clé dans tout le contenu.</li>
      <li><strong>Encadrés colorés</strong> : 💡 À retenir · ⚠️ Piège · 🔁 Erreur fréquente · 🚩 Red flag ·
      📨 Quand adresser · 🗣️ Patient · 🎯 Spécialiste.</li>
      <li><strong>QCM</strong> : cliquez une réponse pour révéler la correction.</li>
      <li><strong>🖨️ Imprimer</strong> : génère une version PDF de l'ensemble (déplie les cas et corrections).</li>
      <li><strong>🌙 / ☀️</strong> : thème clair / sombre.</li>
    </ul>`
  },

  {
    id: "deroule", ico: "🗺️", titre: "Déroulé pédagogique détaillé",
    html: `
    <p class="lead">Progression conseillée et objectifs transversaux. Chaque module suit la même logique :
    <em>comprendre → examiner → explorer → interpréter → décider → orienter</em>.</p>

    <h3>Fil rouge pédagogique</h3>
    ${algo([
      "<b>Test de positionnement</b> (voir Évaluations) pour cibler ses lacunes.",
      "<b>Bloc 1, modules 1–4</b> : bases anatomo-physio, imagerie, audiologie clinique et audiométrie pratique.",
      "<b>Bloc 1, modules 5–9</b> : audiologie selon l'âge, audition centrale, surveillance professionnelle, pathologies auditives.",
      "<b>Bloc 1, modules 10–14</b> : vestibulogie, examen otoneurologique, nystagmus, explorations, rééducation.",
      "<b>Bloc 1, module 15</b> : interface chirurgicale et innovations.",
      "<b>Cas cliniques</b> (30) à traiter en parallèle, par thème.",
      "<b>Blocs 2 et 3</b> (optionnels) selon le projet professionnel.",
      "<b>Évaluation finale</b> + grille de validation des compétences."
    ])}

    <h3>Objectifs transversaux travaillés dans chaque module</h3>
    ${tbl(["Compétence", "Travaillée via"], [
      ["Raisonnement clinique", "Cas, algorithmes, encadrés « pourquoi »"],
      ["Geste technique", "Checklists, fiches gestes (Bloc 3), grilles OSCE"],
      ["Interprétation d'examen", "Courbes décrites, comptes rendus types"],
      ["Sécurité / urgences", "Red flags, critères d'orientation urgente"],
      ["Communication", "Encadrés « Patient » et « Spécialiste »"]
    ])}

    ${box("retenir", `La règle d'or de toute la formation : <strong>une plainte auditive ou vestibulaire impose d'abord
    d'éliminer l'urgence</strong> (surdité brusque, vertige d'allure centrale, signes neurologiques associés) avant de
    raffiner le diagnostic. La hiérarchie « éliminer le grave → caractériser → explorer → traiter » structure tous les modules.`)}`
  }

  ]
});
