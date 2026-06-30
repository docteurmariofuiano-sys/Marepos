# ASSISTANT MÉDICAL — portail unifié

Site web statique qui **regroupe toutes les applications d'aide clinique** de la
suite (Dr Mario Fuiano). La page d'accueil (`index.html`) est un **portail** :
recherche, filtres par domaine, et une carte par application. Tout fonctionne
**hors-ligne**, sans serveur ni dépendance.

> ⚠️ Outils d'aide au **raisonnement**. Ne remplacent ni l'examen clinique, ni le
> jugement médical, ni les recommandations en vigueur. Urgence vitale : **15 / 112**.

## Démarrage

- Double-cliquer sur `index.html`, ou servir en statique :
  ```bash
  python3 -m http.server 8000   # puis http://localhost:8000
  ```
- En ligne (GitHub Pages, « Deploy from a branch » → `main` / root) :
  **https://docteurmariofuiano-sys.github.io/Marepos/**

## Structure

```
index.html            Portail ASSISTANT MÉDICAL (page de lancement)
assistant.css         Style du portail
assistant.js          Catalogue des apps + recherche/filtres
.nojekyll             Sert le site statique tel quel (pas de Jekyll)

neuro-gp/             NEURO-GP ASSIST (neurologie)
dermato-mg/           DERMATO MG — Assistant dermatologique de consultation
                        (recherche, symptôme/localisation, fiches, red flags,
                        ordonnances, conseils patients, apprentissage)
bilan-biologique/     Lecture de bilan biologique
suite-clinique/       Suite clinique :
  index.html            Fiches d'interrogatoire par symptôme (64 fiches)
  aide-decision/        Raisonnement clinique, biologie, catalogue, procédures
  apps-externes/        Dermato, ECG, ORL/vertiges, GynoAide (contraception,
                        ménopause), suivi préventif, échelles & évaluations
```

## Applications regroupées

| Domaine | Application | Accès |
|---|---|---|
| Neurologie | NEURO-GP ASSIST | `neuro-gp/` |
| Dermatologie | Dermato MG — Assistant de consultation | `dermato-mg/` |
| Dermatologie | Dermato Consult | `suite-clinique/apps-externes/dermato.html` |
| Cardiologie | ECG Cabinet | `suite-clinique/apps-externes/ecg_assistant.html` |
| ORL | Bilan ORL — vertiges | `suite-clinique/apps-externes/bilan_orl_vertiges.html` |
| Gynécologie | GynoAide, Contraception, Ménopause | `suite-clinique/apps-externes/` |
| Raisonnement | Fiches d'interrogatoire, Aide au raisonnement, Catalogue | `suite-clinique/` |
| Biologie | Interprétation biologique, Lecture de bilan | `suite-clinique/` · `bilan-biologique/` |
| Prévention | Procédures & prévention, Suivi préventif CNAM | `suite-clinique/` |
| Transversal | Échelles & évaluations | `suite-clinique/apps-externes/` |
| Médecine vasculaire | ÉCHO-VASC DIU — formation d'ultrasonographie vasculaire | `echo-vasc/` |

### À venir (non fournies / volontairement exclues)
- **Cotation NGAP/CCAM** — nécessite une base tarifaire Ameli sourcée + disclaimer.
- **Pneumologie / Spirométrie** — application à fournir.

## Ajouter une application

1. Placer l'app dans un sous-dossier (ex. `pneumo/`).
2. Ajouter une entrée dans le tableau `APPS` de `assistant.js` (titre, emoji,
   domaine, description, `href`).

Le portail se met à jour automatiquement (recherche/filtre inclus).
