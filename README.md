# NEURO-GP ASSIST
**Aide clinique neurologique pour le médecin généraliste**

Application web autonome (HTML/CSS/JavaScript), en français, fonctionnant **hors-ligne** et **sans serveur**. Conçue pour le cabinet, la visite, la téléconsultation et la garde. Architecture modulaire, exportable vers React / Next.js.

> ⚠️ Outil d'aide au **raisonnement** clinique. Il ne remplace pas le jugement médical. En cas de déficit aigu, trouble de conscience, crise prolongée, céphalée brutale ou suspicion d'AVC : **15 / SAMU**.

---

## Démarrage

- **Le plus simple** : double-cliquer sur `index.html` (tout fonctionne en local, aucune dépendance, aucune connexion).
- **Via un serveur statique** (recommandé pour le développement) :
  ```bash
  python -m http.server 4181
  # puis ouvrir http://localhost:4181
  ```

Aucune donnée patient n'est stockée ni transmise par défaut : tout reste dans le navigateur.

---

## Structure du projet

```
NEURO-GP-ASSIST/
├── index.html                 # Page unique (4 modules + sécurité)
├── css/
│   ├── styles.css             # Système de design (bleu nuit / urgence / vigilance / rassurant)
│   └── animations.css         # Keyframes des animations pédagogiques
├── js/
│   ├── app.js                 # Moteur applicatif (navigation, triage, rendu, générateurs)
│   ├── data-triage.js         # Moteur de triage initial commun
│   ├── data-fiches.js         # 20 fiches cliniques décisionnelles
│   ├── data-exam.js           # Banque de tests + examens orientés
│   ├── data-courriers.js      # 16 modèles de courriers
│   ├── data-flashcards.js     # 37 flashcards
│   ├── data-videos.js         # 10 scripts de vidéos pédagogiques originales
│   └── data-cas.js            # 12 cas cliniques interactifs
└── data/                      # Mêmes données exportées en JSON pur (portabilité / réutilisation)
    ├── fiches.json  triage.json  examen_tests.json  examen_types.json
    ├── courriers.json  flashcards.json  videos.json  cas_cliniques.json
```

> Les données sont chargées comme objets JS globaux (et non via `fetch`) afin de garantir le fonctionnement par **double-clic** (sans serveur, le protocole `file://` bloque `fetch`). Le dossier `data/` fournit les **mêmes données en JSON pur** pour un futur portage React/Next.js (import direct).

---

## Modules

### 1 · Aide clinique rapide
20 motifs neurologiques (A→T). Chaque fiche : interrogatoire ciblé, **drapeaux rouges**, examen minimal obligatoire, examen orienté, hypothèses, examens complémentaires, **orientation hiérarchisée** (15 / urgences / spécialiste / domicile), traitement initial adapté au MG, lien direct vers le courrier. Un **triage des urgences** précède toujours l'ouverture d'une fiche.

### 2 · Examen neurologique guidé
11 parcours (complet, urgence, céphalée, AVC, vertige, neuropathie, parkinsonien, cérébelleux, myasthénie, cognitif, lombosciatique/queue de cheval). Pour chaque test : objectif, matériel, position, consigne exacte, geste, résultat normal/anormal, interprétation, pièges, conduite si anormal. Chaque test peut être qualifié (normal / anormal / non testé) et **génère automatiquement le compte rendu**.

### 3 · Générateur de courrier
16 modèles (neurologue standard/urgent, urgences neurovasculaires, imagerie, IRM médullaire, EEG, ENMG, centre du sommeil, ORL/vestibulaire, neurochirurgie, kiné, Parkinson, céphalées, SEP, queue de cheval, cardio/syncope). Construction automatique à partir des champs et cases cochées, pastille de **degré d'urgence**, boutons **Copier / TXT / PDF / Imprimer**.

### 4 · Formation (NEURO TRAINING)
- **Vidéothèque** : 10 animations originales (Babinski, Barré, paralysie faciale, pupilles, Romberg, marche parkinsonienne, steppage, Dix-Hallpike, aphasies, crise TCG) avec script, voix off (sous-titres), points clés, erreur fréquente et mini-quiz.
- **Flashcards** : 37 cartes filtrables par thème (recto / verso + piège).
- **Quiz** : quiz visuels associés aux animations.
- **Cas cliniques** : 12 cas interactifs (choix → feedback → synthèse → courrier).

### Modules transverses
- **Compte rendu** d'examen neurologique (texte type « normal », insertion d'items, export).
- **Sécurité médicale** : liste des alertes rouges et hiérarchie de l'orientation.
- **Modes** : *Consultation rapide* (red flags, examen, examens, orientation, courrier en < 60 s) et *Pédagogique* (bouton « Pourquoi ? », interprétation anatomoclinique, animations).

---

## Sources & contenu

Contenu pédagogique **original**, rédigé de zéro, inspiré des référentiels et recommandations : **HAS, CEN, SFN, SFMU, ESC** (syncope), **ICHD-3** (céphalées) et référentiels **sommeil** (SAHOS, narcolepsie, parasomnies).

**Aucune image, vidéo ou schéma protégé** (CEN, ouvrages) n'est reproduit : les animations, schémas et cas sont des créations originales, médicalement fidèles. Pour intégrer des contenus externes, ne le faire que s'ils sont libres ou autorisés (lien / iframe selon licence).

---

## Confidentialité

- Aucune donnée patient stockée ni transmise par défaut.
- Tout le traitement est **local** (navigateur).
- Les exports (courrier, compte rendu) sont générés à la demande, sans persistance.

---

## Portage React / Next.js

Les données (`data/*.json`) sont déjà découplées de la logique. Pour migrer : importer les JSON, transformer chaque module (`app.js`) en composants (Accueil, AideClinique, ExamenGuide, Courrier, Formation), et remplacer le rendu `innerHTML` par du JSX. Le système de design CSS est réutilisable tel quel (variables CSS).

---

## Mise à jour — Formation : images de signes animées (anti-figé)

Les vignettes de l'onglet **Formation** affichaient des images **statiques** (les
`<img>` de `assets/training-3d/`), si bien que le *signe* n'était jamais visible
« en mouvement ». Correctif appliqué :

- **Ken Burns** permanent sur chaque image (zoom/panoramique lent) — fini l'effet figé.
- **Ciné-loop** en vignette : les 3 vues (*clinique → geste → différence*) s'enchaînent
  en fondu et « jouent » le signe en boucle.
- **Repli SVG animé** : si une image manque ou échoue à charger, la vignette bascule
  automatiquement sur la scène SVG animée correspondante (`neuroImgFallback`) — donc
  **jamais d'image vide ni figée**, même sans le dossier `assets/`.
- Respect de `prefers-reduced-motion` (animations désactivées pour les utilisateurs concernés).
- Correctifs annexes : champ `#c-motif` manquant ajouté (corrige une erreur sur
  « Générer le courrier »), `aria-current` sur la navigation.

> **À fournir séparément** : le dossier binaire `assets/training-3d/` (images `*.png`
> et leurs 3 variantes `steps/<id>-1-vue.png`, `-2-geste.png`, `-3-difference.png`).
> Il n'est pas versionné ici. En son absence, le repli SVG animé prend le relais.

---

*NEURO-GP ASSIST — version initiale. Toujours distinguer urgence vitale/fonctionnelle, urgence différée, avis programmé et surveillance. Ne jamais rassurer abusivement devant un déficit récent, une céphalée brutale, un trouble de conscience, une fièvre neurologique, une crise persistante, une queue de cheval, un syndrome médullaire ou une dyspnée neuromusculaire.*
