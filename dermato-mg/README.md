# DERMATO MG — Assistant dermatologique de consultation

Application autonome (HTML + CSS + JavaScript, **sans backend**, **hors-ligne**)
d'aide au diagnostic, à la prise en charge et à la prescription en dermatologie
de **médecine générale**. Pensée pour une utilisation réelle en consultation :
rapide, claire, mobile/tablette friendly.

> **Outil d'aide à la décision destiné aux professionnels de santé.** Ne remplace
> pas le jugement clinique. Vérifier contre-indications, allergies, grossesse,
> allaitement, âge, poids, fonction rénale et RCP avant prescription. Urgence
> vitale : **15 / 112**.

## Démarrage

- Ouvrir `index.html` (double-clic) — fonctionne en `file://`, ou via le portail
  **ASSISTANT MÉDICAL** (`../index.html`).
- En statique : `python3 -m http.server` puis ouvrir `/dermato-mg/`.

## Fonctions (parcours < 30 s : symptôme → hypothèses → red flags → traitement → ordonnance → conseil)

- **Recherche rapide** : pathologie, symptôme, localisation, lésion, contexte, mot-clé thérapeutique.
- **Par symptôme** / **Par localisation** : du signe d'appel aux diagnostics et fiches.
- **Pathologies** : 39 fiches structurées en 14 rubriques (définition, éléments clés,
  terrain, clinique, gravité, différentiels, examens, traitements 1re/2e intention,
  ordonnance type, conseils patient, quand adresser, suivi, source).
- **Urgences / Red flags** : urgences absolues (SAMU 15) et avis rapide.
- **Diagnostic différentiel** : tableaux comparatifs (arguments pour/contre, orientation).
- **Ordonnances types** : bibliothèque modifiable et imprimable.
- **Conseils patients** : fiches imprimables, rassurantes, avec signes pour reconsulter.
- **Traitements** : base médicamenteuse par classe (indications, CI, grossesse/allaitement,
  EI, durée, erreurs fréquentes, application).
- **Dermatoscopie MG** · **Lecture d'image** (grille structurée, aucune donnée transmise).
- **Apprentissage** : cas cliniques, QCM, flashcards, fiches synthétiques.
- **Alertes terrain** : grossesse, allaitement, nourrisson, enfant, immunodépression,
  insuffisance rénale, allergie.
- **Impression** : ordonnances et fiches patients (PDF via le navigateur).

## Structure

```
index.html   Coquille + onglets + disclaimer
style.css    Style médical (bleu=info, vert=traitement, orange=prudence,
             rouge=urgence, gris=différentiel, violet=apprentissage)
app.js       Moteur : recherche, navigation, rendu, impression, alertes terrain
data.js      Base de données locale (pathologies + collections), schéma JSON embarqué
```

## Sources & droit d'auteur

Source médicale principale : **Dermatoclic** — <https://www.dermatoclic.com>.
Contenus **reformulés** à partir des arbres décisionnels et recommandations
(HAS, sociétés savantes) ; aucun texte protégé reproduit intégralement, aucune
image source protégée copiée. À vérifier et mettre à jour régulièrement.
