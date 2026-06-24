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

- **Multi-fichiers** : ouvrir `index.html` (double-clic) — fonctionne en `file://`,
  ou via le portail **ASSISTANT MÉDICAL** (`../index.html`).
- **Fichier unique portable** : ouvrir `dermato-mg.html` — tout (CSS + données +
  script) est inliné dans un seul fichier, idéal pour partager/archiver hors-ligne.
- En statique : `python3 -m http.server` puis ouvrir `/dermato-mg/`.

### Installer comme application (PWA)

Servie en **HTTPS** (ex. GitHub Pages : `…/Marepos/dermato-mg/`), l'application
est **installable** sur mobile, tablette et ordinateur et fonctionne **hors-ligne** :

- **Android / Chrome / Edge** : menu ⋮ → « Installer l'application » / « Ajouter à l'écran d'accueil ».
- **iOS / Safari** : Partager → « Sur l'écran d'accueil ».
- **Ordinateur** : icône d'installation dans la barre d'adresse.

Une fois installée, elle s'ouvre en plein écran (`standalone`) et reste utilisable
sans connexion (service worker `sw.js` + `manifest.webmanifest`). En `file://`
(double-clic), le mode hors-ligne PWA est inactif mais l'app fonctionne quand même.

> Icônes générées sans dépendance : `node build-icons.js`. Après toute modification
> des fichiers mis en cache, incrémenter `CACHE` dans `sw.js` pour forcer la mise à jour.

### Régénérer le fichier unique

`dermato-mg.html` est **généré** depuis les sources (`index.html`, `style.css`,
`data.js`, `app.js`). Après modification des sources :

```bash
node build-single.js
```

Ne pas éditer `dermato-mg.html` à la main.

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
- **Aide visuelle** : schémas originaux des lésions élémentaires (coupe de peau) et des
  structures dermatoscopiques (réseau pigmenté, globules, stries, voile bleu-blanc,
  télangiectasies…), avec définitions et exemples. Schémas pédagogiques originaux,
  sans reproduction d'images protégées. Pour les **photos réelles**, chaque lésion
  propose un lien vers un **atlas en accès libre** (Wikimedia Commons, DermNet) :
  les images ne sont pas hébergées dans l'app (droit d'auteur), elles sont consultées
  en ligne.
- **Apprentissage** : cas cliniques, QCM, flashcards, fiches synthétiques.
- **Alertes terrain** : grossesse, allaitement, nourrisson, enfant, immunodépression,
  insuffisance rénale, allergie.
- **Impression** : ordonnances et fiches patients (PDF via le navigateur).

## Structure

```
index.html             Coquille + onglets + disclaimer (+ métas PWA)
style.css              Style médical (bleu=info, vert=traitement, orange=prudence,
                       rouge=urgence, gris=différentiel, violet=apprentissage)
app.js                 Moteur : recherche, navigation, rendu, impression, alertes terrain
data.js                Base de données locale (pathologies + collections), schéma JSON embarqué
dermato-mg.html        Build autonome : tout inliné en un seul fichier (généré)
manifest.webmanifest   Manifeste PWA (nom, icônes, couleurs, standalone)
sw.js                  Service worker (mode hors-ligne, cache de la coquille)
icon-*.png             Icônes de l'application (192, 512, maskable)
build-single.js        Génère dermato-mg.html depuis les sources
build-icons.js         Génère les icônes PNG (sans dépendance)
```

## Sources & droit d'auteur

Source médicale principale : **Dermatoclic** — <https://www.dermatoclic.com>.
Contenus **reformulés** à partir des arbres décisionnels et recommandations
(HAS, sociétés savantes) ; aucun texte protégé reproduit intégralement, aucune
image source protégée copiée. À vérifier et mettre à jour régulièrement.
