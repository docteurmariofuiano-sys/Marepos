# CertiSport Médecin

Assistant clinique, réglementaire et médico-légal pour la **consultation préalable
à la délivrance d'un certificat médical d'absence de contre-indication à la
pratique sportive**. Outil **réservé aux médecins** : il soutient le raisonnement,
il ne se substitue jamais au jugement du praticien.

> **Avertissement.** CertiSport Médecin est un outil professionnel d'aide à la
> consultation et à la décision. Il ne remplace ni l'examen médical, ni le jugement
> du praticien, ni la consultation des textes réglementaires et des règlements
> fédéraux en vigueur. Le médecin demeure seul responsable de la décision médicale
> et du certificat qu'il signe.

## Démarrage

Application statique, hors-ligne, sans serveur : ouvrir `index.html`
(ou via le portail ASSISTANT MÉDICAL). Les scénarios de validation sont dans
`tests.html`.

## Architecture fonctionnelle

Séparation stricte en trois couches, conformément au principe « ne pas coder les
règles dans l'interface » :

| Fichier | Rôle |
|---|---|
| `data.js` | **Base de connaissances versionnée** (`CS_VERSION_BASE`) : règles réglementaires sourcées et datées (`CS_REGLES`), catégories D.231-1-5 (`CS_CATEGORIES_CP`), fiches sports avec synonymes (`CS_SPORTS`), questionnaire général (`CS_QUESTIONNAIRE`), définitions d'alertes (`CS_ALERTES`), modules par sport (`CS_MODULES`), fiche d'examen (`CS_EXAMEN`), catalogue d'examens complémentaires, conclusions, niveaux, modèles de certificats. |
| `moteur.js` | **Moteur de règles explicable** (`CSM`) : cadre réglementaire (`evaluerCadre`), alertes (`evaluerAlertes`), classification 0–5 + urgence (`classifier`), verrous médico-légaux (`verrousCertificat`), génération des documents (`genererCertificat`, `genererNote`). Sans dépendance DOM → testable. |
| `app.js` | Interface : parcours en étapes, tableau de bord, liaison état ↔ formulaires, rendu synthèse/alertes/documents. |
| `tests.js` / `tests.html` | Scénarios de validation (10 cas obligatoires + tests de socle), exécutables dans le navigateur ou en Node. |

### Parcours de consultation (navigation en étapes)

0. Tableau de bord (+ identité du médecin) · 1. Patient · 2. Sport ·
3. Cadre réglementaire · 4. Questionnaire général · 5. Questionnaire spécifique ·
6. Examen clinique · 7. Alertes · 8. Examens complémentaires · 9. Synthèse ·
10. Décision · 11. Certificat · 12. Note dossier · 13. Base réglementaire.

## Moteur réglementaire

`CSM.evaluerCadre(ctx)` retourne un code parmi :
`OBLIGATOIRE_LOI` · `EXIGE_FEDERATION` · `EXIGE_CLUB` · `QUESTIONNAIRE_SUFFIT` ·
`NON_SYSTEMATIQUE` · `INDETERMINE`, toujours accompagné de
**« Pourquoi cette conclusion ? »** : texte, article, dates, statut de la règle,
lien Légifrance, niveau de certitude, avertissements.

Points clés encodés (chaque règle porte sa **source, sa date et son statut**
`verifiee` / `a-verifier`) :

- **D.231-1-5** dans sa rédaction issue du **décret n° 2023-853 du 31/08/2023** :
  5 catégories (plongée y c. souterraine ; combat avec mise hors combat en
  compétition ; armes à feu / air comprimé ; véhicules terrestres à moteur en
  compétition **hors karting et modélisme radioguidé** ; motonautisme).
- Sports **retirés de l'ancienne liste** (alpinisme, spéléologie, parachutisme,
  vol libre, rugby…) : jamais présentés comme « contraintes particulières »,
  mais **modules d'évaluation spécifiques conservés** + alerte sur le règlement fédéral.
- **Mineurs** : questionnaire de santé (décret/arrêté du 07/05/2021), certificat
  < 6 mois si réponse positive — sauf disciplines à contraintes particulières.
- **Majeurs licenciés** : depuis la loi 2022-296, régime fixé par le règlement
  fédéral → l'outil répond « à vérifier » plutôt que d'inventer une obligation.
- Le certificat « **pour tous les sports** » est refusé (verrou + explication).

## Moteur clinique

Chaque alerte affiche : donnée déclenchante, risque, sport concerné, niveau,
conduite suggérée, source éventuelle, date de version de la base et **limites de
l'algorithme**. Pas de boîte noire « apte/inapte ».

Niveaux : 0 aucun élément défavorable · 1 vigilance · 2 bilan recommandé ·
3 différer · 4 CI temporaire probable · 5 CI durable **possible** (validation
renforcée) · U urgence (bandeau rouge, question sportive suspendue).

## Sécurité médico-légale (verrous techniques)

La génération du certificat est **bloquée** tant que : date d'examen, discipline,
identité patient/médecin/RPPS manquantes ; date d'examen future ; alerte de
niveau ≥ 3 ou urgence **non explicitement évaluée** par le médecin ; conclusion
non choisie ; case de validation non cochée (« Je confirme avoir examiné le
patient… ») ; CI durable sans justification écrite ; conclusion favorable
incompatible avec des alertes ≥ 4 non levées. Aucune signature automatique.
Le certificat remis au club ne contient ni diagnostic, ni traitement, ni motif
médical.

## Données personnelles (RGPD / secret médical)

Prototype **local-first** : aucune donnée n'est stockée (pas de localStorage),
transmise ou tracée ; tout est perdu à la fermeture, l'export (copie, impression,
.txt, .json) est un acte volontaire du médecin vers son propre logiciel métier.
Une version serveur devrait ajouter : authentification forte, rôles,
journalisation, chiffrement en transit/au repos, hébergement HDS, sauvegardes
chiffrées, durées de conservation, traçabilité des exports, séparation
identité/données médicales — prérequis listés ici pour ne pas être perdus.
Aucune donnée n'est utilisée pour entraîner un modèle. Rien n'est transmis au
club, à la fédération ou à l'employeur.

## Documentation médecin (résumé)

1. Renseigner votre identité (étape 0) — reportée sur les documents.
2. Suivre les étapes 1 → 12 ; à l'étape 3, lire « Pourquoi cette conclusion ? »
   et ses statuts de règles (`à vérifier` = confronter à Légifrance/fédération).
3. À l'étape 7, **chaque alerte bloquante doit être évaluée et commentée** ;
   c'est ce commentaire qui lève le verrou et se retrouve dans la note de dossier.
4. Étape 11 : choisir le modèle (standard, compétition, contraintes
   particulières, restriction, CI temporaire, EPS, réévaluation, courrier).
5. Étape 12 : copier la **note clinique** dans le dossier patient (elle trace le
   fondement de la décision) — ne jamais la remettre au club.

## Documentation administrateur & plan de maintenance réglementaire

- Les règles vivent uniquement dans `data.js` (`CS_REGLES`), avec pour chacune :
  texte, article, résumé, portée, `date_vigueur`, `date_verification`, URL
  officielle, `statut`, `niveau_validation`, `divergence`.
- **Procédure de mise à jour** : ① vérifier la source primaire (Légifrance >
  ministère des Sports > Service-Public.fr > fédérations > HAS > sociétés
  savantes) ; ② modifier la règle, mettre à jour `date_verification` et
  `statut` ; ③ incrémenter `CS_VERSION_BASE` ; ④ rejouer `tests.html`
  (15 scénarios) ; ⑤ committer — l'historique git assure versionnage,
  comparaison des versions et identification du validateur.
- Ne **jamais** modifier une règle sur la base d'une page internet non validée.
- Rythme conseillé : revue trimestrielle des règles `a-verifier`, revue
  systématique à chaque décret/arrêté touchant les articles L.231-2 à L.231-2-3,
  R.231-1 à D.231-1-5, et à chaque saison sportive pour les règlements fédéraux.

## Limites connues (v1)

- Base embarquée : les règlements fédéraux ne sont **pas** intégrés — l'outil
  renvoie explicitement à leur vérification (c'est un choix : ne rien inventer).
- Les recommandations scientifiques (ECG SFC…) sont citées comme
  recommandations, jamais comme obligations.
- Pas de signature électronique intégrée ; pas de stockage : l'archivage relève
  du logiciel métier du médecin.
