# PAI ASSIST — Projet d'Accueil Individualisé (remplissage automatique)

Application web **statique et hors-ligne** qui aide à rédiger un **PAI** au
**format officiel de l'Éducation nationale / Eduscol** (modèle 2021, art. D. 351-9
du Code de l'éducation) et **génère automatiquement** la *conduite à tenir en cas
d'urgence* et la *trousse d'urgence* à partir des **médicaments prescrits**.

On décrit l'enfant, on coche la (les) pathologie(s) et les médicaments, et le
document se met en forme tout seul selon les **3 parties officielles**.

## Structure générée (modèle officiel)

- **Partie 1 — Renseignements administratifs** : élève (état civil, adresse, poids),
  responsables légaux (lien, nom, téléphone), établissement / classe / année,
  1ʳᵉ demande ou modification, médecin traitant, numéro d'urgence spécifique.
- **Partie 2 — Aménagements et adaptations** :
  - I. pathologies et conséquences ;
  - II–IV. aménagements (temps de présence, environnement, sorties) **suggérés
    automatiquement** par pathologie ;
  - V. restauration (régime / éviction / panier-repas) ;
  - VI. soins — tableau des traitements (nom, posologie, voie, horaire) ;
  - **trousse d'urgence** (contenu, lieu de stockage, autorisation de port).
- **Partie 3 — Conduite à tenir en cas d'urgence** : pour chaque pathologie
  disposant d'une fiche, **format officiel à deux niveaux** — ① signes d'appel /
  réaction modérée → mesures → traitement, puis ② signes de gravité → appel du
  **15 / 112**. Rappel des médicaments prescrits, signatures et cachet du médecin.

## Fonctionnement

1. Remplir l'identité et les renseignements administratifs.
2. Cocher la (les) **pathologie(s)** — le choix filtre les médicaments proposés.
3. Cocher les **médicaments** (posologie / voie / horaire ajustables, médicaments
   libres possibles) ; renseigner lieu de la trousse, surveillances, restauration.
4. **Aperçu en temps réel = le PDF officiel lui-même** : la colonne de droite
   affiche le **vrai formulaire Eduscol rempli** (PAI général + une fiche
   « conduite à tenir » par pathologie), régénéré automatiquement à chaque
   modification. C'est ce document — le seul accepté par les établissements —
   qui est imprimé / téléchargé.
5. Sorties : **📄 Télécharger le PDF officiel**, **🖨️ Imprimer le PDF**,
   **📋 Copier le texte**.

## Version autonome (un seul fichier, hors-ligne)

`node pai/build-standalone.js` produit **`pai/pai-autonome.html`** : un fichier
HTML unique embarquant pdf-lib **et** les 7 formulaires officiels (base64). Il
fonctionne par simple double-clic, sans serveur — le remplissage du PDF officiel
y compris. (Artefact volumineux, non versionné : voir `.gitignore`.)

## Remplissage du PDF officiel

Les modèles officiels (dossier `templates/`) sont de vrais formulaires PDF à
champs nommés. L'app utilise [pdf-lib](https://pdf-lib.js.org/) (embarqué dans
`vendor/`, hors-ligne) pour :

- **PAI général** : état civil de l'élève, responsables légaux, 1ʳᵉ demande /
  modification (date, classe), médecin traitant, cases restauration, soins
  (traitement médicamenteux + nom/posologie/voie du 1ᵉʳ traitement),
  contenu de la trousse, quelques aménagements selon la pathologie ;
- **fiches conduite à tenir** : identité / période / n° d'urgence / cachet,
  cases « signes » cochées, et **traitement déduit des médicaments cochés**
  (ex. corticoïde dans « traitement complémentaire » de l'asthme, antalgique
  dans la fiche drépanocytose, traitement de crise dans la fiche épilepsie).

Le PDF fusionné est aplati (valeurs figées) puis téléchargé sous
`PAI_Nom.pdf`. Les champs incertains restent vides, à compléter par le médecin.

> Le remplissage PDF nécessite que le site soit servi en **http(s)**
> (GitHub Pages ou serveur local) — l'ouverture directe du fichier `index.html`
> bloque le chargement des modèles par le navigateur.

## Pathologies & logique embarquée

Une vingtaine de pathologies, regroupées par catégorie :

| Catégorie | Pathologies |
|---|---|
| Allergies & immunité | allergie alimentaire / anaphylaxie, allergie aux venins, allergie médicamenteuse / latex |
| Respiratoire | asthme, mucoviscidose |
| Endocrino-métabolique | diabète type 1, insuffisance surrénale, maladie métabolique (PCU…) |
| Digestif & nutrition | maladie cœliaque, intolérance alimentaire, MICI (Crohn / RCH) |
| Hématologie & oncologie | drépanocytose, hémophilie, cancer / chimiothérapie |
| Cardio-rénal | cardiopathie, insuffisance rénale chronique |
| Neurologie | épilepsie, migraine |
| Neurodéveloppement & apprentissages | TDAH, dyslexie / dysorthographie, dysgraphie, dyscalculie, dyspraxie, dysphasie, TSA |
| Santé mentale | trouble anxieux / refus scolaire |

Pour les pathologies **avec traitement / protocole**, les médicaments cochés
alimentent le tableau des soins, la trousse d'urgence et la conduite à tenir.
Une **fiche « conduite à tenir » à deux niveaux** (au format officiel des fiches
spécifiques Eduscol) est fournie pour : asthme (fiche 01), allergie alimentaire /
anaphylaxie (fiche 02), allergie aux venins, diabète de type 1 (fiche 03a),
épilepsie (fiche 04, avec « à ne pas faire » et massage cardiaque),
drépanocytose (fiche 06, paracétamol 1 dose/6 h, fièvre ≥ 38,5 °C, taux
d'hémoglobine de base), insuffisance surrénale, hémophilie, cancer /
chimiothérapie, migraine. Pour une pathologie sans fiche dédiée mais avec un
traitement d'urgence coché, une **fiche standard** (gabarit générique, fiche 07)
est générée à compléter.

Pour les **troubles des apprentissages / neurodéveloppementaux**, l'app génère
des **aménagements** suggérés et rappelle qu'ils relèvent le plus souvent d'un
**PAP** (Plan d'Accompagnement Personnalisé) ou d'un **PPS** — le PAI ne
s'imposant que s'il y a un traitement à administrer sur le temps scolaire.

> **Repère réglementaire.** PAI = pathologie nécessitant des soins / un régime /
> un protocole d'urgence à l'école. PAP/PPS = troubles des apprentissages et du
> neurodéveloppement (aménagements pédagogiques).

## Confidentialité

100 % local dans le navigateur : **aucune donnée n'est enregistrée ni transmise**.

> ⚠️ **Aide à la rédaction.** Les protocoles générés sont des **trames** à
> valider, dater et signer par le médecin prescripteur et à adapter à chaque
> enfant (doses au poids, allergènes, comorbidités). Urgence vitale : **15 / 112**.
