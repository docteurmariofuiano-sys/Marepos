# Aide au raisonnement clinique — module `aide-decision/`

Prototype **fonctionnel** d'application d'aide au raisonnement clinique pour la
médecine générale, construit à partir du *Manuel du Généraliste — Du Symptôme au
Diagnostic* et des *Fiches d'interrogatoire par symptôme* (Dr Mario Fuiano).

> ⚠️ **Cet outil ne pose pas de diagnostic.** Il structure les symptômes,
> détecte des *red flags* par règles explicites et génère une synthèse à
> **valider par le médecin**.

## Ce que fait le prototype

1. **Espace patient** — saisie du contexte (âge, sexe, **température obligatoire**
   — seuil fièvre ≥ 38,5 °C —, grossesse possible, antécédents), une section
   **« Informations patient et antécédents »** (identité **obligatoire**, allergies,
   antécédents médicaux et chirurgicaux par spécialité — cases repliables +
   recherche, **export JSON** et **résumé médical** copiable), puis **sélection
   de 1 à 5 motifs** dans un **catalogue groupé par spécialité** (cases à cocher,
   recherche). Les motifs cochés ouvrent un **questionnaire adaptatif** regroupé
   **par motif** ; les questions conditionnelles s'affichent selon les réponses.
   La synthèse médecin **agrège** les motifs (urgence = niveau le plus élevé,
   red flags en union, différentiels par motif) et intègre une **orientation liée
   à la fièvre** (hyperpyrexie, immunodépression, grossesse, terrain CV).
2. **Moteur de règles** (`engine.js`) — évalue des prédicats explicites :
   - **red flags d'abord** → fixent le niveau d'urgence (1/2/3) ;
   - **diagnostics différentiels** scorés par poids d'arguments ;
   - agrégation des examens et points à vérifier.
3. **Retour patient** — message **prudent, non anxiogène**, jamais de diagnostic.
4. **Espace médecin** — synthèse structurée : motif, éléments importants, red
   flags, hypothèses classées, examen clinique à vérifier, examens à discuter,
   orientation, **notes éditables**, export **PDF (impression)**.

## Symptômes couverts (162 fiches cliniques)

> Le catalogue patient **filtre les motifs selon l'âge et le sexe** saisis (un
> homme ne voit pas les motifs féminins, un adulte ne voit pas les motifs du
> nourrisson, etc.). Métadonnées dans `app.js` (`RESTRICTIONS`, seuil enfant 15 ans).
> **Pédiatrie — Lot A (urgences)** : malaise grave du nourrisson, stridor/laryngite,
> convulsion sans fièvre, trouble de conscience, déficit moteur aigu, ataxie aiguë,
> anaphylaxie, grosse bourse aiguë, purpura.

**Les 43 fiches du manuel + 15 motifs très fréquents de cabinet sont encodés**
(58 fiches cliniques). Les 21 fiches biologiques du livre sont dans un module
médecin distinct (voir plus bas), et le catalogue des 16 spécialités relie le
tout (voir plus bas).

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

Les **85 fiches biologiques** sont encodées dans un module **distinct, côté
médecin** : `biologie.html` (données `data/bio-kb.js`). Contrairement au
questionnaire patient, l'entrée est un **résultat anormal** (ex. hyperkaliémie,
TCA allongé, cytolyse, hypercalcémie…) et la sortie est structurée : **démarche
de 1re intention**, **causes à explorer** avec leur **signe discriminant** et les
**examens**, **tableaux comparatifs** (le cas échéant), **red flags**, **conduite
à tenir**.

Couvre : anomalies de l'hémostase (TS, TCA, TP, TT, hérédité, maladie de
Willebrand, hémophilies A et B, syndrome des antiphospholipides, démarche
devant un bilan de coagulation anormal), électrophorèse,
hyperéosinophilie, inversion de formule, métabolisme phospho-calcique
(vitamine D, PTH, calcitonine), hyper/hypocalcémie, marqueurs du remodelage
osseux (CTX/NTX, ostéoporose), hyper/hypothyroïdie (TSH/T4L, Basedow,
Hashimoto), pathologies surrénaliennes (hypercorticisme/Cushing,
hyperaldostéronisme, insuffisance surrénalienne), hyperglycémie, diabète de type 1
(auto-immunité, acidocétose), diabète de type 2 (insulino-résistance, syndrome
métabolique), diabète gestationnel (HGPO, O'Sullivan), hypercalcémie,
hyper/hypokaliémie, hyper/hyponatrémie, hyperphosphorémie, troubles de l'hydratation
intracellulaire (osmolalité efficace), troubles acido-basiques (trou anionique),
maladie rénale chronique (DFG, marqueurs,
stades), syndrome néphrotique (pur/impur, complications),
hyperprolactinémie, GGT,
cytolyse, syndrome cholestatique, insuffisance hépatique, cirrhose (Child-Pugh),
hyperuricémie (goutte, lithiase urique), syndrome inflammatoire (VS, CRP, PCT,
protéines de l'inflammation), infection à VIH (dépistage 4e génération, Western
Blot, stades, transmission), hépatites C (ARN, chronicité) et B (profils
sérologiques Ag HBs/anti-HBc/anti-HBs), EBV (sérologie VCA/EA/EBNA), CMV
(immunodéprimé, congénital), HSV (encéphalite, herpès génital),
pancréatite aiguë (Ranson/Imrie), dyslipidémie, CPK, LDH, les marqueurs de
l'infarctus du myocarde (troponine, myoglobine) et de l'insuffisance cardiaque
(BNP, NT-proBNP), les marqueurs tumoraux (ACE, CA 19-9, PSA, AFP, CA 125…), l'allergologie
(hypersensibilité de type I : IgE, tests cutanés/in vitro) et l'auto-immunité
(anticorps antinucléaires : titres, fluorescence, anti-ENA ; ANCA : c-ANCA/PR3,
p-ANCA/MPO, vascularites ; facteur rhumatoïde et anti-CCP, polyarthrite
rhumatoïde ; auto-anticorps spécifiques d'organe), l'**immuno-hématologie** (groupage ABO-RH1 :
Beth-Vincent, Simonin, RH1 ; phénotypes érythrocytaires ABO/Rhésus/Kell/MNSs/
Kidd/Duffy/Lewis), et un **bloc hématologie** : CAT devant une
anémie, anémie **microcytaire** (tableau ferriprive / inflammatoire /
β-thalassémie), anémie **hémolytique** (classification corpusculaire /
extracorpusculaire), **AHAI** (auto-Ac chauds vs froids), **thrombopénie**
(centrale / périphérique / répartition, seuils hémorragiques), **PTAI**
(aigu vs chronique), **MAT** (PTT / SHU : diagnostic biologique, schizocytes,
ADAMTS13, vérotoxines), **TIH** (thrombopénie induite par l'héparine, type 1
vs type 2), **syndrome mononucléosique** (orientation EBV / CMV / VIH /
toxoplasmose), **LLC** (score de Matutes, facteurs pronostiques), **maladie de
Waldenström** (IgM monoclonale, hyperviscosité), **myélome multiple**
(CRAB, composant monoclonal, pronostic), **leucémie à tricholeucocytes**
(monocytopénie, immunophénotype, BRAF), **LMC** (myélémie, chromosome
Philadelphie / BCR-ABL), **polyglobulie de Vaquez** (JAK2, EPO, seuils
Hte/Hb), **thrombocytémie essentielle** (critères, thrombocytose
réactionnelle), **myélofibrose primitive** (dacryocytes, érythromyélémie,
stades de fibrose), **LAL** (leucémie aiguë lymphoïde : immunophénotype EGIL
B/T, syndrome de lyse), **LAM** (leucémie aiguë myéloïde : classification FAB,
MPO, corps d'Auer), **SMD** (syndromes myélodysplasiques : classification OMS)
et **LMMC** (leucémie myélomonocytaire chronique : monocytose, critères OMS).
Le bloc hématologie s'appuie sur
du contenu **MémoBio** d'accès libre et des références classiques, reformaté au
schéma du module.

Plusieurs fiches ont en outre été **vérifiées et enrichies** d'après *Blood
Tests Made Easy* (P. Hamilton, Elsevier, 2022) : calcémie corrigée (bornes
albumine < 40 et > 45), **trou osmolaire**, profils enzymatiques hépatiques
(cytolytique vs cholestatique), profils des maladies osseuses (Ca/P/PAL/PTH),
et une fiche transversale **« Pièges préanalytiques »** (hémolyse, interférences
EDTA/citrate, pseudohyperkaliémie/pseudohyponatrémie).

Accès : lien **« 🧪 Interprétation biologique »** depuis l'en-tête de l'app
clinique. Version autonome : `biologie-standalone.html` (cross-liée aux autres
modules).

### Module « Procédures & prévention » (médecin) — `procedures.html`

Les motifs **administratifs, préventifs et développementaux** ne relèvent pas du
modèle symptôme→red flags→diagnostics : ils sont traités dans un module
**dédié, côté médecin** (`procedures.html`, données `data/procedures.js`).
Format **aide-mémoire** : pour chaque item, une **check-list de points clés** et,
le cas échéant, des **signaux de vigilance / d'escalade**. **26 fiches** en
**7 catégories** : certificats & aptitude, arrêt de travail & dossiers sociaux
(AT/MP, ALD, MDPH), renouvellements & suivi (anticoagulant, personne âgée),
prévention & dépistage (vaccination, HTA, col/HPV, nutrition), pédiatrie
(croissance, langage, comportement), vigilance & signalement (maltraitance,
pharmacovigilance), petite chirurgie / dermatologie courante (ongle incarné,
verrue, kyste, corps étranger ORL). À adapter aux **recommandations en vigueur**
(HAS, calendrier vaccinal, Assurance Maladie).

Accès : lien **« 📋 Procédures & prévention »** depuis l'en-tête.
Version autonome : `procedures-standalone.html`.

### Catalogue des motifs de consultation — `catalogue.html`

Colonne vertébrale de navigation couvrant **16 spécialités** et **423 motifs**
(fréquents + urgences), d'après la nomenclature de consultation en médecine
générale. Chaque motif est **relié à une fiche décisionnelle** (parcours
patient→médecin), à une **fiche d'interprétation biologique**, ou à une **fiche
procédure / prévention** : **les 423 motifs (100 %)** sont désormais reliés et
cliquables. Trois pastilles de couleur distinguent les destinations (clinique /
biologie / procédure). Recherche, filtre « urgences », filtre « fiche disponible ».

Accès direct à une fiche : `index.html#s=<clé>`, `biologie.html#<id>` ou
`procedures.html#<id>` (depuis le catalogue).
Version autonome : `catalogue-standalone.html` (cross-liée aux autres modules).

La base reste extensible : voir `docs/guide-ajout-fiches.md`.

## Lancer

Ouvrir `index.html` dans un navigateur (aucun serveur requis), ou utiliser le
fichier autonome `aide-decision-standalone.html`.

```bash
python3 -m http.server 8000   # puis http://localhost:8000/aide-decision/
```

## Fichiers

```
index.html                application clinique (patient + médecin)
styles.css                mise en forme + règles d'impression PDF
engine.js                 moteur de règles (window.Engine)
app.js                    contrôleur d'interface
biologie.html / bio.js    module interprétation biologique (médecin)
catalogue.html / *.js     catalogue des motifs (navigation, 16 spécialités)
procedures.html / *.js    module procédures & prévention (médecin)
data/knowledge-base.js    base de connaissances clinique (window.KB)
data/bio-kb.js            fiches d'interprétation biologique (window.BIOKB)
data/motifs-catalogue.js  catalogue des 423 motifs (window.MOTIFS)
data/procedures.js        fiches procédures & prévention (window.PROCEDURES)
build-standalone.py       génère les versions autonomes (single-file)
docs/                     livrables : cahier des charges, archi, modèle, RGPD/HDS, guide
```

Régénérer les fichiers autonomes après modification : `python3 build-standalone.py`.

## Sécurité du raisonnement

- Les red flags sont **codés en règles explicites** (jamais laissés à une IA).
- L'IA/NLP n'intervient que pour des tâches périphériques (reformulation, mapping
  de texte libre, rédaction de synthèse) — voir `docs/architecture-technique.md`.
- **Priorité : red flags → différentiel → jamais de diagnostic automatique →
  validation médicale obligatoire.**
