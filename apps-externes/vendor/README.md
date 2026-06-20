# vendor/ — librairies auto-hébergées (prod HDS)

Ce dossier doit contenir les 5 fichiers ci-dessous pour que `suivi_preventif.html`
fonctionne **sans aucune requête externe** (obligatoire en production HDS/RGPD).

Tant que le dossier est vide (ou absent), l'app se replie automatiquement sur
les CDN épinglés — **acceptable en développement, interdit en prod HDS**.

## Fichiers attendus

| Fichier local         | Source                                                                     | Version |
|-----------------------|----------------------------------------------------------------------------|---------|
| `xlsx.full.min.js`    | jsdelivr/npm xlsx@0.18.5/dist/xlsx.full.min.js                             | 0.18.5  |
| `jspdf.umd.min.js`    | jsdelivr/npm jspdf@2.5.1/dist/jspdf.umd.min.js                             | 2.5.1   |
| `lucide.min.js`       | unpkg lucide@0.460.0/dist/umd/lucide.min.js                                | 0.460.0 |
| `pdf.min.mjs`         | cdnjs pdf.js/4.7.76/pdf.min.mjs                                            | 4.7.76  |
| `pdf.worker.min.mjs`  | cdnjs pdf.js/4.7.76/pdf.worker.min.mjs                                     | 4.7.76  |

## Téléchargement + génération SRI

Depuis un poste avec accès Internet, exécuter **`fetch_vendor.sh`**
(à la racine de `apps-externes/`) :

```bash
cd apps-externes
bash fetch_vendor.sh
```

Le script télécharge les fichiers, calcule les hash SRI (`sha384`) et les affiche.
Copier les valeurs `integrity="sha384-..."` dans le HTML si votre serveur
impose une Content-Security-Policy avec `require-sri-for script`.

## Après déploiement

Vérifier dans la console navigateur (F12 → Réseau) qu'aucune requête
ne part vers cdnjs, jsdelivr, unpkg ou cloudflare. Si le réseau HDS bloque
ces domaines, l'app doit quand même démarrer normalement (les fichiers
locaux sont servis par votre serveur).
