# Apps externes — versions corrigées (audit clinique)

Outils autonomes (HTML/JS, 100 % local, aucune IA externe) de la future suite,
**audités et corrigés** d'après les référentiels (HAS, sociétés savantes, OMS).

| Fichier | Correctifs appliqués |
|---|---|
| `bilan_orl_vertiges.html` | HIT normal + syndrome vestibulaire aigu → **ROUGE** (règle HINTS/INFARCT) ; SVA sans HINTS rassurant → orange ; badge cohérent avec une hypothèse centrale ; bug `marche`. |
| `biologie_lecture_bilan.html` | Troponine (seuil dépendant du dosage/sexe + cinétique, non-IDM) ; **calcémie corrigée par l'albumine** (calcul automatique si albumine présente). |
| `evaluations_medicales.html` | MoCA (correction scolarité ≤ 12 ans correcte) ; **CHA₂DS₂-VASc sexe-conscient** (ESC) ; AUDIT (bandes OMS 8/16/20) ; RMQD (12 items) ; Google Fonts retiré (RGPD) ; **bandeau médico-légal persistant**. |

**Non inclus ici :**
- `cotation` (NGAP/CCAM) — non modifiée ; nécessite une base tarifaire datée/sourcée (Ameli) + disclaimer avant toute diffusion.
- `dermato` — en attente du fichier source pour audit.

> Aide à la décision — ne remplace pas le jugement médical. À intégrer ensuite à
> la suite (portail unifié, contexte patient partagé, hébergement HDS).
