# PAI ASSIST — Projet d'Accueil Individualisé (remplissage automatique)

Application web **statique et hors-ligne** qui aide à rédiger un **PAI** et
**génère automatiquement** la *conduite à tenir en cas d'urgence* et la
*trousse d'urgence* à partir des **médicaments prescrits**.

Inspiré dans son principe par les outils de génération de PAI (type
[paiclic.fr](https://www.paiclic.fr/)) : on décrit l'enfant, on coche la (les)
pathologie(s) et les médicaments, et le protocole d'urgence se rédige tout seul.

## Fonctionnement

1. **Identité & établissement** — enfant, poids (pour les doses), école, classe,
   médecin, année scolaire.
2. **Pathologie(s)** — allergie alimentaire / anaphylaxie, asthme, diabète de
   type 1, épilepsie. Le choix filtre les médicaments proposés.
3. **Médicaments prescrits** — chaque médicament coché peut être précisé
   (posologie, voie, situation). Possibilité d'ajouter des médicaments libres.
4. **Aperçu du PAI en temps réel** à droite :
   - traitements prescrits,
   - **conduite à tenir d'urgence** construite et ordonnée par gravité
     (signes d'alerte → geste → médicament → appel du 15),
   - **trousse d'urgence** déduite des médicaments,
   - éviction alimentaire, aménagements, signatures.
5. **Imprimer / PDF** (mise en page d'impression dédiée) ou **copier le texte**.

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

Pour les pathologies **avec traitement / protocole**, les médicaments d'urgence
sont triés par gravité et produisent : le **signe d'alerte**, le **geste à
faire**, la **dose** (modifiable) et la **trousse d'urgence**.

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
