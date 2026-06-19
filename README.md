# Marepos

Outils d'aide au raisonnement clinique et biologique — usage **médecin**.

## 📂 Contenu

| Fichier | Description |
|---|---|
| **`index.html`** | **Lecture intelligente d'un bilan biologique** — coller un bilan brut de laboratoire et obtenir une interprétation médicale structurée (anomalies, syndromes, hiérarchisation, orientation diagnostique, red flags, examens complémentaires, synthèse + version dossier). |
| `biologie-reference.html` | Référentiel des anomalies biologiques (fiches : causes, signe discriminant, examens, red flags, conduite à tenir). |

## 🧬 Lecture intelligente d'un bilan biologique (`index.html`)

Application **autonome** (HTML/CSS/JavaScript, sans serveur) : ouvrir le fichier
dans un navigateur, coller le texte brut du laboratoire, cliquer sur
**« Analyser le bilan »**.

### Ce que fait le moteur
1. **Parse** le texte brut (formats français : virgule décimale, valeurs `*46*`,
   normes `(3,84-5,12)`, `(<5,0)`, `(>90)`, unités `g/L`, `mmol/L`, `µmol/L`,
   `U/L`, `G/L`, `mL/min/1,73m²`…).
2. **Extrait** les paramètres et les **normalise** (Hb, VGM, DFG CKD-EPI, RAC…).
3. **Détecte les anomalies** et compare aux normes du laboratoire si présentes,
   sinon aux normes par défaut (ajustées au sexe quand pertinent).
4. **Reconnaît des syndromes** (MRC + stade G/A, dyslipidémie mixte, syndrome
   métabolique, anémie micro/normo/macrocytaire, cytolyse/cholestase, carences…).
   - **Grandeurs calculées** : calcium corrigé (selon albumine, utilisé pour les
     red flags), trou anionique, osmolalité calculée, rapport ASAT/ALAT (De Ritis),
     cholestérol non-HDL. Paramètres thyroïdiens (TSH, T4L, T3L).
   - **Parsing** : reconnaît aussi les normes en colonne sans parenthèses
     (`Sodium 139 mmol/L 135 - 145`) et les valeurs placées avant le libellé.
5. **Hiérarchise** chaque anomalie : *Mineur · Significatif · Important · Urgent*.
6. **Signale les red flags** (hyperkaliémie sévère, hyponatrémie sévère, anémie
   profonde, thrombopénie/neutropénie sévères, DFG très bas, cytolyse majeure,
   cholestase ictérique, hypercalcémie sévère, CRP > 100, TG ≥ 10 g/L, suspicion
   de MAT, suspicion de myélome, hyperglycémie majeure…).
7. **Propose** hypothèses diagnostiques (arguments pour/contre, examens),
   examens complémentaires hiérarchisés et une **conduite pratique**.
8. **Génère** une synthèse clinique + une **version courte pour le dossier**.

### Exports
Copier la synthèse · Copier la conduite à tenir · Copier la version dossier ·
Imprimer / PDF (`Ctrl/Cmd + Entrée` pour relancer l'analyse).

### Architecture interne (extensible)
Le moteur est organisé en modules clairement séparés dans `index.html` :
`KB.biomarkers` (base de connaissances), `KB.patterns` (syndromes),
`KB.detectRedFlags`, `Parser`, `Analyzer`, `renderer`. Ajouter un biomarqueur =
ajouter une entrée à `KB.biomarkers` (normes, seuils de gravité, interprétation).

## ⚕️ Avertissement

Outils d'**aide au raisonnement**. Ne remplacent **ni le jugement clinique ni
l'avis du biologiste**. Toute interprétation est à confronter à la clinique, à
l'âge, au sexe, aux antécédents, aux traitements et aux valeurs antérieures.
Aucun diagnostic ne doit être posé sur la seule biologie.
