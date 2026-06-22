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

| Pathologie | Médicaments d'urgence reconnus |
|---|---|
| Allergie / anaphylaxie | adrénaline auto-injecteur, antihistaminique, corticoïde oral, salbutamol |
| Asthme | salbutamol de secours, corticoïde oral de crise (+ fond pour info) |
| Diabète type 1 | resucrage, glucagon (injection / spray nasal), insuline |
| Épilepsie | midazolam buccal, diazépam intrarectal |

Les médicaments d'urgence sont triés par niveau de gravité de la situation et
chacun produit : le **signe d'alerte** correspondant, le **geste à faire** et la
**dose** (modifiable).

## Confidentialité

100 % local dans le navigateur : **aucune donnée n'est enregistrée ni transmise**.

> ⚠️ **Aide à la rédaction.** Les protocoles générés sont des **trames** à
> valider, dater et signer par le médecin prescripteur et à adapter à chaque
> enfant (doses au poids, allergènes, comorbidités). Urgence vitale : **15 / 112**.
