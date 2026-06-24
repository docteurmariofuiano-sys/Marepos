# Dossier des photos réelles (aide visuelle)

Déposez ici **une image par lésion**, nommée **exactement** par l'identifiant
de la lésion (extension `.jpg`, `.jpeg`, `.png` ou `.webp`).

Puis régénérer :

```bash
node build-photos.js   # génère photos.js (images en data URLs)
node build-single.js   # régénère dermato-mg.html avec les photos intégrées
```

Les images importées par l'utilisateur dans l'app (bouton « Importer une
photo ») restent prioritaires sur celles déposées ici.

## Noms de fichiers attendus

### Lésions élémentaires
- `macule`
- `papule`
- `plaque`
- `nodule`
- `vesicule`
- `bulle`
- `pustule`
- `papule_oedemateuse`
- `squame`
- `croute`
- `erosion`
- `ulceration`
- `atrophie`
- `lichenification`
- `fissure`

### Structures dermatoscopiques
- `reseau_typique`
- `reseau_atypique`
- `points_globules`
- `stries`
- `voile_bleu_blanc`
- `regression`
- `telangiectasies`
- `nids_bleu_gris`
- `vaisseaux_glomerulaires`
- `comedons_milia`

Exemple : la photo de la macule = `macule.jpg`.
