#!/usr/bin/env bash
# fetch_vendor.sh — télécharge les librairies et calcule leur hash SRI (sha384)
# Usage : cd apps-externes && bash fetch_vendor.sh
# Nécessite : curl, openssl (standard sur Linux/macOS)
set -euo pipefail

VENDOR="$(dirname "$0")/vendor"
mkdir -p "$VENDOR"

declare -A URLS=(
  ["xlsx.full.min.js"]="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"
  ["jspdf.umd.min.js"]="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"
  ["lucide.min.js"]="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"
  ["pdf.min.mjs"]="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.min.mjs"
  ["pdf.worker.min.mjs"]="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.mjs"
)

echo "=== Téléchargement des librairies vendor/ ==="
for filename in "${!URLS[@]}"; do
  url="${URLS[$filename]}"
  dest="$VENDOR/$filename"
  echo -n "  $filename ... "
  curl -sSL --fail --retry 3 -o "$dest" "$url"
  sri="sha384-$(openssl dgst -sha384 -binary "$dest" | openssl base64 -A)"
  echo "OK"
  echo "    SRI : integrity=\"$sri\""
done

echo ""
echo "=== vendor/ prêt. Vérifier les SRI ci-dessus si CSP require-sri-for script. ==="
