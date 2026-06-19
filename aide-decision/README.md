# Aide au raisonnement clinique — module `aide-decision/`

Prototype **fonctionnel** d'application d'aide au raisonnement clinique pour la
médecine générale, construit à partir du *Manuel du Généraliste — Du Symptôme au
Diagnostic* et des *Fiches d'interrogatoire par symptôme* (Dr Mario Fuiano).

> ⚠️ **Cet outil ne pose pas de diagnostic.** Il structure les symptômes,
> détecte des *red flags* par règles explicites et génère une synthèse à
> **valider par le médecin**.

## Ce que fait le prototype

1. **Espace patient** — saisie du contexte (âge, sexe, grossesse possible,
   antécédents), choix du symptôme, puis **questionnaire adaptatif** en langage
   simple (les questions conditionnelles s'affichent selon les réponses).
2. **Moteur de règles** (`engine.js`) — évalue des prédicats explicites :
   - **red flags d'abord** → fixent le niveau d'urgence (1/2/3) ;
   - **diagnostics différentiels** scorés par poids d'arguments ;
   - agrégation des examens et points à vérifier.
3. **Retour patient** — message **prudent, non anxiogène**, jamais de diagnostic.
4. **Espace médecin** — synthèse structurée : motif, éléments importants, red
   flags, hypothèses classées, examen clinique à vérifier, examens à discuter,
   orientation, **notes éditables**, export **PDF (impression)**.

## Symptômes couverts (43 fiches cliniques)

**TOUS les symptômes cliniques du manuel sont encodés** (43 fiches). Les 21 fiches
restantes du livre sont des fiches d'**interprétation biologique** (anomalies de
l'hémostase, ionogramme, transaminases, etc.) — elles ne se prêtent pas à un
questionnaire patient et relèveraient d'un module médecin distinct (voir plus bas).

**Fiches URGENCE (10)** : `douleur thoracique` · `dyspnée aiguë` · `déficit
neurologique transitoire` · `fièvre au retour des tropiques` · `grosse bourse` ·
`grosse jambe rouge aiguë` · `hématémèse / méléna` · `hémoptysie` · `malaise /
perte de connaissance` · `épanchement pleural`.

**Motifs courants & spécialisés (33)** : acouphène, adénopathie, algie faciale,
algie pelvienne, asthénie, lombalgie, dorsalgie, cervicalgie, douleurs des membres
(sup./inf.), crampes, diarrhée aiguë/chronique, constipation, hématurie,
leucorrhées, dysménorrhée, écoulement urétral, hémospermie, épistaxis, dysphonie,
diplopie, goitre, galactorrhée, bouffées de chaleur, hyperhidrose, difficultés
sexuelles, érythermalgie, hépatomégalie, hoquet chronique, grain de beauté
(mélanome), dyspnée chronique, alopécie.

Les symptômes marqués `urgence: true` affichent un badge **URGENCE**.

### Module « Interprétation biologique » (médecin) — `biologie.html`

Les **21 fiches biologiques** du manuel (43-63) sont encodées dans un module
**distinct, côté médecin** : `biologie.html` (données `data/bio-kb.js`).
Contrairement au questionnaire patient, l'entrée est un **résultat anormal**
(ex. hyperkaliémie, TCA allongé, cytolyse, hypercalcémie…) et la sortie est
structurée : **démarche de 1re intention**, **causes à explorer** avec leur
**signe discriminant** et les **examens**, **red flags**, **conduite à tenir**.

Couvre : anomalies de l'hémostase (TS, TCA, TP, TT, hérédité), électrophorèse,
hyperéosinophilie, inversion de formule, hyperglycémie, hypercalcémie,
hyper/hypokaliémie, hyponatrémie, hyperphosphorémie, hyperprolactinémie, GGT,
cytolyse, dyslipidémie, CPK, LDH, et la CAT devant une anémie.

Accès : lien **« 🧪 Interprétation biologique »** depuis l'en-tête de l'app
clinique. Version autonome : `biologie-standalone.html` (cross-liée au
`aide-decision-standalone.html`).

La base reste extensible : voir `docs/guide-ajout-fiches.md`.

## Lancer

Ouvrir `index.html` dans un navigateur (aucun serveur requis), ou utiliser le
fichier autonome `aide-decision-standalone.html`.

```bash
python3 -m http.server 8000   # puis http://localhost:8000/aide-decision/
```

## Fichiers

```
index.html                application (patient + médecin)
styles.css                mise en forme + règles d'impression PDF
engine.js                 moteur de règles (window.Engine)
app.js                    contrôleur d'interface
data/knowledge-base.js    base de connaissances structurée (window.KB)
docs/                     livrables : cahier des charges, archi, modèle, RGPD/HDS, guide
```

## Sécurité du raisonnement

- Les red flags sont **codés en règles explicites** (jamais laissés à une IA).
- L'IA/NLP n'intervient que pour des tâches périphériques (reformulation, mapping
  de texte libre, rédaction de synthèse) — voir `docs/architecture-technique.md`.
- **Priorité : red flags → différentiel → jamais de diagnostic automatique →
  validation médicale obligatoire.**
