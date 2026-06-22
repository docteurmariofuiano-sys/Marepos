# Fiches d'interrogatoire par symptôme — Application de consultation

Application web de consultation construite à partir du document
**`Fiches_Interrogatoire_par_Symptome.pdf`** (Manuel du Généraliste — *Du symptôme
au diagnostic*).

Elle rend les **64 fiches** consultables et recherchables. Chaque fiche suit la
logique de consultation :

1. **Interrogatoire ciblé** — ce qu'on demande pour trier les hypothèses
2. **Diagnostics différentiels** — avec le signe qui pointe vers chacun
3. **Pathognomonique / orientation forte** — le signe clé quand il existe
4. **⚠ Red flags / urgences** — à ne jamais manquer

## Fonctionnalités

- 🔎 **Recherche instantanée** par symptôme, spécialité ou mot-clé (texte intégral, insensible aux accents)
- 🩺 **Filtre par spécialité** (ORL, Cardio, Bio, etc.)
- ⚠ **Filtre « Urgences seulement »** et signalisation des fiches urgentes
- 📄 **Vue détaillée** avec sections codées par couleur
- 🔗 **Lien profond** vers une fiche (`#fiche-27`)
- 📱 **Responsive**, fonctionne **hors-ligne**, sans dépendance ni build

## Utilisation

Ouvrez simplement **`index.html`** dans un navigateur — aucune installation ni
serveur requis (les données sont embarquées dans `data/fiches-data.js`).

Pour servir via HTTP (optionnel) :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
index.html              Interface
styles.css              Mise en forme
app.js                  Recherche, filtres, rendu des fiches
data/fiches-data.js     64 fiches structurées (chargées en global, hors-ligne)
data/fiches.json        Mêmes données au format JSON (réutilisable)
assets/Fiches_Interrogatoire_par_Symptome.pdf   PDF source original
```

Les données ont été extraites du PDF en respectant la mise en page à deux
colonnes (interrogatoire à gauche ; différentiels / pathognomonique / red flags
à droite), puis découpées par section.

## Avertissement

Support de **raisonnement**, *pas un protocole*. Ne dispense ni de l'examen
clinique complet ni des recommandations en vigueur (HAS, sociétés savantes).
Les vrais signes pathognomoniques sont rares : la plupart des cases
« pathognomonique » donnent en réalité un signe d'orientation forte. À confronter
au manuel source et à la clinique du patient.
