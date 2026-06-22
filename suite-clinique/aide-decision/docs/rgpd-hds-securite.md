# Sécurité, RGPD & HDS

> Les données de symptômes sont des **données de santé** (RGPD art. 9 — catégorie
> particulière). Leur traitement impose des garanties renforcées.

## 1. Principes RGPD appliqués

| Principe | Mise en œuvre |
|----------|---------------|
| **Base légale** | Consentement explicite du patient (case à cocher, étape d'accueil) ; mission de soins pour le médecin. |
| **Finalité** | Aide à la préparation de consultation uniquement. Pas de réutilisation sans nouvelle base légale. |
| **Minimisation** | On ne collecte que les champs cliniques utiles. Identité directe évitée quand c'est possible (référence externe / pseudonyme). |
| **Exactitude** | Données déclaratives, validées par le médecin. |
| **Limitation de conservation** | Durée définie (ex. rattachement au dossier de soins) ; purge automatique des sessions de test. |
| **Sécurité** | Chiffrement en transit (TLS) et au repos ; contrôle d'accès ; journalisation. |
| **Droits** | Information, accès, rectification, **effacement**, **export** patient. |

## 2. Hébergement HDS

- Dès qu'il y a des **données de santé nominatives**, l'hébergement doit être
  **certifié HDS** (Hébergeur de Données de Santé, France).
- Le backend, la base et le stockage des PDF doivent être déployés chez un
  hébergeur HDS ; contractualiser la conformité (sous-traitance art. 28 RGPD).
- Tenir un **registre des traitements** et réaliser une **AIPD/DPIA** (analyse
  d'impact) — obligatoire pour des données de santé à cette échelle.

## 3. Mode local / anonymisé (implémenté dans le prototype)

- Le prototype fonctionne **entièrement dans le navigateur**, **aucune donnée
  transmise**, aucune persistance serveur → utilisable pour démonstration et
  test sans contrainte HDS.
- Pas de cookie traceur, pas d'appel réseau tiers.

## 4. Sécurité technique

- **Chiffrement** : TLS 1.2+ en transit ; chiffrement au repos (BD + objets).
- **Authentification médecin** : OIDC / Pro Santé Connect, MFA recommandé.
- **RBAC** : séparation stricte patient / médecin / admin.
- **Journalisation** (`audit_log`) : qui a accédé à quelle consultation, quand.
- **Cloisonnement** des secrets (coffre), rotation des clés.
- **Sauvegardes** chiffrées, testées, avec plan de reprise.

## 5. Consignes médico-légales (UX)

- Bandeau permanent : *« Cette application ne pose pas de diagnostic médical… »*
  + consignes d'urgence (15 / 112).
- **Côté patient** : aucune annonce de pathologie grave. Formulations prudentes
  uniquement (*« Certains éléments nécessitent un avis médical rapide afin
  d'éliminer une cause potentiellement sérieuse. »*).
- **Côté médecin** : la synthèse est explicitement une **aide à valider**, ne
  dispense ni de l'examen clinique ni des recommandations (HAS, sociétés
  savantes).

## 6. Checklist de conformité avant mise en production

- [ ] Hébergement HDS contractualisé pour backend + BD + stockage.
- [ ] DPIA réalisée et validée par le DPO.
- [ ] Registre des traitements à jour.
- [ ] Consentement explicite tracé et horodaté.
- [ ] Politique de confidentialité accessible et claire.
- [ ] Procédures d'exercice des droits (accès, effacement, export) opérationnelles.
- [ ] Chiffrement en transit et au repos vérifié.
- [ ] Journalisation des accès activée et supervisée.
- [ ] Tests de sécurité (pentest) réalisés.
- [ ] Revue médicale des fiches/règles validée et versionnée.
