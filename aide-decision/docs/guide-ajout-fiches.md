# Guide — ajouter une fiche symptôme (monter à 64)

La base est conçue pour être étendue **fiche par fiche** sans toucher au moteur.
Les 64 fiches sources sont déjà extraites et structurées dans
`../data/fiches.json` (à la racine du projet) ; ce guide explique comment
convertir une fiche « lecture » en fiche « décisionnelle ».

## 1. Étapes

1. Ouvrir la fiche source (texte) dans `data/fiches.json` (champ `interrogatoire`,
   `differentiels`, `pathognomonique`, `redflags`).
2. Ajouter une entrée dans `data/knowledge-base.js` sous une nouvelle clé
   (`slug` du symptôme, ex. `cephalee`).
3. Convertir :
   - **interrogatoire** → `questions[]` en **langage patient** (voir §2) ;
   - **redflags** → `red_flags[]` avec `when` (prédicat) + `niveau` + messages ;
   - **differentiels** → `diagnostics_differentiels[]` avec `arguments[]` pondérés ;
   - **pathognomonique** → augmente le poids `w` de l'argument correspondant ;
   - conduite à tenir / examens → `examens_a_discuter` et `examens_clinique`.
4. Tester avec quelques scénarios (cf. README, section tests Node).

## 2. Traduire en langage patient

| Médical | Patient |
|---------|---------|
| Dyspnée d'effort | « Êtes-vous essoufflé en montant les escaliers ? » |
| Métrorragies | « Avez-vous des saignements en dehors des règles ? » |
| Acouphène pulsatile | « Le bruit bat-il au rythme de votre cœur ? » |
| Photophobie | « La lumière vous gêne-t-elle ? » |
| Claudication | « Avez-vous mal aux jambes en marchant, soulagé à l'arrêt ? » |

Règles : phrases courtes, une idée par question, pas de sigle, proposer
« Je ne sais pas ».

## 3. Encoder un red flag

```js
{ id: "cep_rf_thunderclap", niveau: 3,
  when: { q: "cep_brutal", eq: true },
  message_medecin: "Céphalée en coup de tonnerre : éliminer une hémorragie méningée (TDM ± PL).",
  message_patient: "Cette douleur nécessite une évaluation médicale sans attendre." }
```

- `niveau` : 1 (non urgent) · 2 (avis rapide) · 3 (urgence).
- Combiner les conditions avec `all` / `any` / `not`.
- Le niveau d'urgence global = **max** des red flags déclenchés.

## 4. Encoder un différentiel pondéré

```js
{ id: "cep_hsa", diagnostic: "Hémorragie sous-arachnoïdienne",
  arguments: [
    { label: "début en coup de tonnerre", w: 3, when: { q: "cep_brutal", eq: true } },
    { label: "raideur de nuque",          w: 2, when: { q: "cep_raideur", eq: true } }
  ],
  examens_a_discuter: ["TDM cérébrale sans injection", "PL si TDM normale"] }
```

Poids conseillés : **3** = signe d'orientation forte / pathognomonique ; **2** =
argument important ; **1** = argument d'appoint.

## 5. Checklist qualité par fiche

- [ ] Toutes les questions sont en langage patient et proposent « Je ne sais pas »
      quand pertinent.
- [ ] Chaque red flag des fiches sources est couvert par une règle `when`.
- [ ] Chaque différentiel a au moins un argument discriminant pondéré.
- [ ] Les messages patient sont **prudents** (aucune pathologie nommée).
- [ ] Examens cliniques et complémentaires renseignés.
- [ ] Scénarios de test passés (red flag déclenché, hypothèse attendue en tête).
- [ ] **Revue par un médecin** avant publication.

## 6. Priorité de déploiement (urgences d'abord)

Encoder en priorité les fiches marquées **(URGENCE)** dans le manuel :
douleurs thoraciques, dyspnées aiguës, déficit neurologique transitoire, malaise/
PC, hématémèse/méléna, hémoptysie, grosse jambe rouge, grosse bourse, fièvre au
retour des tropiques, épanchement pleural — puis les symptômes les plus fréquents
en médecine générale (céphalée, fièvre, toux, lombalgie, douleur abdominale,
vertige…).
