# Prenatal MG

Application React + TypeScript pour consultation préconceptionnelle et entretien prénatal précoce du 1er trimestre.

## Architecture

- `src/components` : champs, panneaux, tableau traitements, alertes, sources, synthèse.
- `src/data` : données cliniques initiales séparées par domaine.
- `src/modules/preconception` : parcours préconceptionnel.
- `src/modules/epp` : parcours EPP / EPG.
- `src/utils` : calculs, état initial, sauvegarde locale, synthèse.
- `src/exports` : export PDF.
- `src/templates` : prévu pour futurs modèles éditables.
- `src/styles` : styles globaux TailwindCSS.

## Fonctionnalités MVP

- Deux entrées : consultation préconceptionnelle et EPP/EPG.
- Mode rapide 10 minutes et mode complet 45 minutes.
- Repérage dynamique des points de vigilance.
- Traitements avec rappel CRAT obligatoire.
- Vaccins, dépistages, expositions, antécédents, vulnérabilités.
- Module violences masquable et exclusion de la synthèse patient.
- Génération de synthèse patient, dossier médical, courriers, ordonnances et checklist.
- Copie dossier médical, impression et sauvegarde PDF de la synthèse en mode 10 minutes ou 45 minutes selon le mode sélectionné.
- Sauvegarde locale uniquement avec consentement, chiffrement local optionnel par phrase secrète.
- Aucune donnée envoyée à un serveur par défaut.

## Installation

```powershell
npm.cmd install
npm.cmd run dev
```

## Sources

Le PDF utilisateur `Consultation préconceptionnelle.pdf` annoncé dans la demande n'était pas présent dans le dossier accessible au moment de la création.
Les sources évolutives sont volontairement affichées comme à vérifier dans l'application :

- HAS - Préparation à la naissance et à la parentalité
- Ameli / NGAP - EPG, cotations et règles
- CRAT - médicaments pendant grossesse et allaitement
- OMNIPrat - fiche EPP du 1er trimestre

## Améliorations futures

- Ajouter le PDF utilisateur dès disponibilité et tracer la version intégrée.
- Ajouter des tests unitaires pour la synthèse et le stockage chiffré.
- Ajouter une bibliothèque locale de ressources périnatales.
- Ajouter un mode de personnalisation des courriers par cabinet.
- Ajouter une vérification source datée par recommandation.
