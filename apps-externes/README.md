# Apps externes — versions corrigées (audit clinique)

Outils autonomes (HTML/JS, 100 % local, aucune IA externe) de la future suite,
**audités et corrigés** d'après les référentiels (HAS, sociétés savantes, OMS).

| Fichier | Correctifs appliqués |
|---|---|
| `bilan_orl_vertiges.html` | HIT normal + syndrome vestibulaire aigu → **ROUGE** (règle HINTS/INFARCT) ; SVA sans HINTS rassurant → orange ; badge cohérent avec une hypothèse centrale ; bug `marche`. |
| `biologie_lecture_bilan.html` | Troponine (seuil dépendant du dosage/sexe + cinétique, non-IDM) ; **calcémie corrigée par l'albumine** (calcul automatique si albumine présente). |
| `evaluations_medicales.html` | MoCA (correction scolarité ≤ 12 ans correcte) ; **CHA₂DS₂-VASc sexe-conscient** (ESC) ; AUDIT (bandes OMS 8/16/20) ; RMQD (12 items) ; Google Fonts retiré (RGPD) ; **bandeau médico-légal persistant**. |

| `dermato.html` | App déjà très solide (red flag → priorité ROUGE, mélanome/ABCDE, module photo honnêtement non-IA, disclaimers OK). Ajout d'un palier **URGENCE VITALE (15/SAMU)** distinct du simple avis urgent (fasciite nécrosante, purpura fulminans, SJS/Lyell, DRESS, sepsis cutané, érythrodermie fébrile, eczema herpeticum). |

| `suivi_preventif.html` | Outil d'organisation (import CNAM → liste de rappels prévention). **Cliniquement sain** : s'appuie sur le ciblage CNAM + vérification secrétariat, n'encode aucun seuil d'âge/périodicité (pas d'erreur possible) ; disclaimer confidentialité déjà présent. Durcissement sécurité : `lucide@latest` → version figée (0.460.0), `crossorigin`/`referrerpolicy=no-referrer` sur les 4 CDN, garde défensive sur les icônes. **En prod HDS : auto-héberger les 4 librairies + SRI** (réseau bloqué ici pour le faire). |

## Suite GynoAide (gynécologie / médecine générale)

`index-accueil.html` est le portail (2 cartes → contraception / ménopause). Les
deux applications partagent la même architecture (100 % local, 1 seul `<script>`,
aucune ressource externe, aucune police Google → conformes RGPD/HDS).

| Fichier | Verdict d'audit |
|---|---|
| `index-accueil.html` | Portail statique, aucun JS, aucune ressource externe ; disclaimer correct citant HAS/CNGOF/GEMVi/ANSM/CRAT. **Aucune correction nécessaire.** |
| `contraception.html` | **Cliniquement solide et concordant** (HAS/CNGOF/CRAT/ANSM). CI estroprogestatifs justes (migraine avec aura = CI absolue, tabac ≥ 15 cig/j après 35 ans = CI absolue, ATCD TVP/EP/AVC/IDM/thrombophilie, cancer du sein, HTA non contrôlée) ; feu tricolore cohérent ; règles d'oubli correctes (OP ≤ 12 h, désogestrel ≤ 12 h, lévonorgestrel microdosé ≤ 3 h, semaine 3 enchaîner sans pause) ; contraception d'urgence correcte (LNG ≤ 72 h, ulipristal ≤ 120 h, DIU cuivre ≤ 120 h 1ʳᵉ intention ; ne pas associer ulipristal + LNG ; attendre 5 j après ulipristal). **Aucune correction nécessaire.** |
| `menopause.html` | **Cliniquement solide et concordant** (GEMVi/CNGOF/HAS). Saignement post-ménopausique = red flag → exploration de l'endomètre (cancer jusqu'à preuve du contraire) ; CI au THM justes (cancer sein/endomètre, ATCD thrombose/AVC/IDM, hépatopathie sévère, saignement inexpliqué, SAPL) ; **voie transdermique privilégiée** (pas de surrisque thromboembolique) ; utérus présent → œstrogène + progestatif (protection endométriale) ; SGUM → local en 1ʳᵉ intention ; classification ACR/BI-RADS correcte (1-2 rassurant, 3 surveillance, 4-6 pas de THM/avis) ; IOP/ménopause précoce → THM jusqu'à ≈ 51 ans ; alertes interaction tamoxifène ↔ paroxétine/fluoxétine (CYP2D6) ; fézolinétant avec surveillance hépatique. **Aucune correction nécessaire.** Liens internes harmonisés (`index-accueil.html`). |

**Non inclus ici :**
- `cotation` (NGAP/CCAM) — non modifiée ; nécessite une base tarifaire datée/sourcée (Ameli) + disclaimer avant toute diffusion.

> Aide à la décision — ne remplace pas le jugement médical. À intégrer ensuite à
> la suite (portail unifié, contexte patient partagé, hébergement HDS).
