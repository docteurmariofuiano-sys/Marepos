# Architecture technique

## 1. Vue d'ensemble

```
┌──────────────────────────┐        ┌───────────────────────────┐
│  Frontend (PWA)          │  HTTPS │  Backend API              │
│  - Interface patient     │ <────> │  - Auth médecin (OIDC)    │
│  - Interface médecin     │  REST  │  - Moteur de règles       │
│  - Mode local/anonyme    │        │  - Service synthèse       │
└──────────────────────────┘        │  - Service NLP (encadré)  │
                                     └─────────────┬─────────────┘
                                                   │
                                     ┌─────────────┴─────────────┐
                                     │  PostgreSQL / Supabase    │
                                     │  (hébergement HDS)        │
                                     │  + Object storage (PDF)   │
                                     └───────────────────────────┘
```

## 2. Prototype livré (ce dépôt)

- **100 % frontend statique**, sans dépendance ni build : `index.html`,
  `styles.css`, `engine.js`, `app.js`, `data/knowledge-base.js`.
- **Mode local** : aucune donnée n'est transmise — idéal pour tester sans
  contrainte HDS. C'est le « mode local/anonymisé pour test » du cahier des
  charges.
- Le **moteur de règles** (`engine.js`) est volontairement **isomorphe** :
  même code exécutable côté navigateur et côté serveur (Node), pour garantir un
  raisonnement identique en local et en backend.

## 3. Architecture cible (industrialisation)

### Frontend
- **React / Next.js** (ou Flutter pour le mobile natif).
- PWA installable, responsive, accessibilité AA, i18n.
- Deux parcours : patient (kiosque/salle d'attente ou lien envoyé) et médecin
  (authentifié).

### Backend
- **Node.js / NestJS** ou **Python / FastAPI**.
- API REST (ou GraphQL) ; le **moteur de règles reste déterministe et testé**.
- Service de génération de **synthèse** (templating + LLM encadré).
- Service **NLP** isolé (voir §5).

### Base de données
- **PostgreSQL** (Supabase possible). Schéma : voir `modele-de-donnees.md`.
- Stockage objet chiffré pour les exports PDF.

### Authentification & rôles
- OIDC / Pro Santé Connect pour les médecins.
- RBAC : `patient` (éphémère/anonyme), `medecin`, `admin_clinique`.

## 4. Séparation des responsabilités (sécurité du raisonnement)

| Décision | Mécanisme | Jamais |
|----------|-----------|--------|
| **Red flags / urgence** | Règles **explicites** codées et testées | confiées à un LLM |
| **Différentiel / score** | Pondérations déclaratives | masquées au médecin |
| **Reformulation / mapping / rédaction** | NLP/LLM | utilisé pour décider de l'urgence |

## 5. Place de l'IA / NLP (strictement encadrée)

Usages autorisés :
1. **Reformuler** le langage patient (clair, non anxiogène).
2. **Mapper** un symptôme en texte libre vers une fiche (classification).
3. **Générer** la synthèse médicale rédigée à partir des données structurées.
4. **Expliquer** l'arbre décisionnel au médecin.

Usage interdit : décider seule d'une urgence. Les red flags sont **toujours**
calculés par le moteur de règles. Le LLM reçoit en entrée la sortie structurée du
moteur ; il **n'invente pas** de niveau d'urgence.

> Pour les briques IA, privilégier les modèles **Claude** les plus récents
> (famille Claude 4.x — p. ex. `claude-opus-4-8` pour la rédaction de synthèse,
> `claude-haiku-4-5` pour le mapping rapide), avec sorties **contraintes** (JSON
> schema / tool use) et garde-fous : aucune mention de pathologie au patient,
> température basse, validation du JSON avant affichage.

## 6. Contrats d'API (V1, indicatif)

```
GET  /symptoms                      -> liste des fiches (id, label, specialités)
GET  /symptoms/:id/questionnaire    -> questions + showIf
POST /consultations                 -> { symptomId, context, answers } => résultat moteur
GET  /consultations/:id             -> résultat + synthèse
POST /consultations/:id/notes       -> notes/conclusion médecin
POST /nlp/map-symptom               -> { text } => { symptomId, confiance }   (NLP encadré)
POST /consultations/:id/synthesis   -> synthèse rédigée (LLM encadré)
```

Le corps `POST /consultations` et la réponse réutilisent exactement le format de
`engine.run()` du prototype → continuité MVP → V1.

## 7. Observabilité & qualité

- Tests unitaires du moteur (jeux de scénarios cliniques — cf. README).
- Versionnage des fiches/règles ; revue médicale obligatoire avant publication.
- Journalisation des accès (audit_log) ; métriques d'usage anonymisées.
