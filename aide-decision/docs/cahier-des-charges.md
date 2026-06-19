# Cahier des charges — Application d'aide au raisonnement clinique

## 1. Contexte et finalité

Application destinée au **cabinet de médecine générale**. Le patient saisit ses
symptômes avant/pendant la consultation ; l'application génère un **arbre
décisionnel clinique structuré** pour aider le médecin à orienter son
raisonnement.

**Principe absolu** : outil d'**aide au raisonnement**, jamais de substitution au
médecin. Aucun diagnostic n'est délivré automatiquement ; toute conclusion est
**validée par le praticien**.

## 2. Sources de connaissances

- *Manuel du Généraliste — Du Symptôme au Diagnostic*
- *Fiches d'interrogatoire par symptôme — Manuel du Généraliste* (Dr M. Fuiano)

Chaque fiche fournit : interrogatoire ciblé, diagnostics différentiels, signes
discriminants, signe pathognomonique / d'orientation forte, red flags / urgences,
conduite à tenir.

## 3. Utilisateurs

| Rôle | Besoins |
|------|---------|
| **Patient** | Décrire son symptôme en langage simple, rapidement, sans jargon ni message anxiogène. |
| **Médecin** | Disposer d'une synthèse fiable, hiérarchisée (red flags d'abord), modifiable et exportable. |
| **Administrateur clinique** | Éditer/valider les fiches, gérer les règles, tracer les versions. |

## 4. Exigences fonctionnelles

### 4.1 Entrée patient
Saisie de : symptôme principal ; durée ; mode d'apparition (brutal/progressif/
intermittent) ; intensité ; localisation ; facteurs déclenchants/calmants ;
signes associés ; antécédents ; traitements ; allergies ; contexte (voyage,
traumatisme, grossesse possible, immunodépression, âge, terrain CV…).

Langage **patient** obligatoire. *Ex. : « Êtes-vous essoufflé en montant les
escaliers ? » au lieu de « Présentez-vous une dyspnée d'effort ? ».*

### 4.2 Mapping symptôme → fiche
Identification du symptôme principal et rattachement à une fiche. Saisie libre
possible (mapping assisté par NLP, voir archi). Génération d'un **questionnaire
dynamique** à partir de la fiche.

### 4.3 Moteur décisionnel
- Détection des **red flags par règles explicites** (priorité absolue).
- Pondération des signes, raisonnement différentiel, score par hypothèse.
- Génération d'un **arbre décisionnel lisible**.
- Ne délivre **jamais** de diagnostic définitif au patient.

### 4.4 Synthèse médecin
Résumé clinique ; hypothèses classées ; red flags ; points à vérifier à
l'examen ; examens complémentaires à discuter ; orientation proposée ; niveau
d'urgence. Édition des hypothèses/conclusions, export PDF, intégration possible
au dossier patient.

### 4.5 Modules
1. **Base de connaissances** — import des fiches, extraction structurée, stockage,
   édition par le médecin.
2. **Questionnaire patient** — questions adaptatives (oui/non, choix multiple,
   texte libre, échelle de douleur, durée, localisation/schéma corporel).
3. **Moteur décisionnel** — règles + pondération + red flags + différentiel.
4. **Synthèse médecin** — génération automatique structurée.
5. **Interface médecin** — visualisation, édition, export, dossier patient.

## 5. Exigences non fonctionnelles

- **Sécurité du raisonnement** : red flags codés, pas d'IA décisionnelle pour
  l'urgence.
- **Non anxiogène** : aucune annonce de pathologie grave au patient.
- **Performance** : questionnaire rapide à remplir (< 2 min).
- **Accessibilité** : responsive, mobile-first, langage clair (niveau A2/B1).
- **Personnalisable** par le praticien (règles, fiches, libellés).
- **Traçabilité** : versionnage des fiches et des règles.

## 6. Contraintes médico-légales

Affichage permanent : *« Cette application ne pose pas de diagnostic médical… »*
et consignes d'urgence (15/112). Interdiction de toute formulation définitive
côté patient (« vous avez un cancer/une embolie/une tumeur »). Formulation
prudente imposée : *« Certains éléments nécessitent un avis médical rapide afin
d'éliminer une cause potentiellement sérieuse. »*

## 7. Conformité données de santé

Voir `rgpd-hds-securite.md` : hébergement HDS si données nominatives,
consentement explicite, minimisation, chiffrement, journalisation, droit à
l'effacement, export patient, **mode local/anonymisé pour test** (implémenté dans
le prototype).

## 8. Périmètre du prototype livré

- 5 symptômes complets (acouphène, adénopathie, algie faciale, algie pelvienne,
  asthénie).
- Moteur de règles fonctionnel, synthèse médecin, export PDF, mode 100 % local.
- Architecture cible (backend, BD, NLP) **documentée** pour l'industrialisation.

## 9. Trajectoire (jalons)

1. **MVP** (ce prototype) : 5 fiches, moteur, synthèse, local.
2. **V1** : backend + BD, auth médecin, 64 fiches, éditeur de fiches.
3. **V2** : mapping NLP du texte libre, synthèse rédigée par LLM (encadrée),
   intégration DPI/HDS, journalisation, statistiques d'usage.
