# Connexion à Plaud via MCP — Guide de setup

Ce dossier contient tout le nécessaire pour brancher tes enregistrements Plaud
dans Claude Code via le **serveur MCP intégré au CLI `plaud`** (transport stdio,
en local — pas de serveur HTTP à héberger, pas de GitHub OAuth).

## ⚠️ Prérequis bloquant à vérifier

Le code du CLI vit dans `https://github.com/harshav167/plaud`, qui n'est **pas
public** (testé : le clone échoue avec « could not read Username » = repo privé
ou supprimé). Tant que tu n'as pas accès à ce repo, l'installation du CLI est
impossible — demande l'accès à l'auteur (Harsha) ou une version publiée sur PyPI.

`harshav167/plaud-plugin` (les skills de doc) est public, lui, et déjà installé
dans `.agents/skills/`.

## Étapes (sur TA machine locale, pas une session web distante)

Le serveur tourne en stdio : il s'exécute là où tourne ton Claude Code local.

### 1. Installer `uv`
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Vérifier l'accès au CLI
```bash
uvx --from git+https://github.com/harshav167/plaud plaud --help
```
Si ça échoue sur l'authentification → c'est le blocage repo privé ci-dessus.

### 3. S'authentifier auprès de Plaud
```bash
# Option A — email / mot de passe
uvx --from git+https://github.com/harshav167/plaud plaud login

# Option B — token depuis le site web :
#   1. Ouvre https://web.plaud.ai et connecte-toi
#   2. F12 → Console → localStorage.getItem('tokenstr')
#   3. Copie la valeur (commence par "bearer eyJ...")
uvx --from git+https://github.com/harshav167/plaud plaud login --token "bearer eyJ..."
```

### 4. Tester
```bash
uvx --from git+https://github.com/harshav167/plaud plaud me
uvx --from git+https://github.com/harshav167/plaud plaud ls
```

### 5. Brancher le serveur MCP dans Claude Code
Le plus simple :
```bash
claude mcp add plaud -- uvx --from git+https://github.com/harshav167/plaud plaud mcp
```
Ou copie `mcp.stdio.json` (ce dossier) dans ton `.mcp.json` local et remplace
`PLAUD_TOKEN` par ton token. `ELEVENLABS_API_KEY` n'est requis que pour la
transcription ElevenLabs.

### 6. Relancer Claude Code
Les 11 outils `mcp__plaud__*` apparaissent : `find_recordings`, `get_recording`,
`get_audio_url`, `transcribe`, `get_content`, `trigger_processing`,
`get_account_info`, `get_processing_status`, `list_languages`, `memory_search`,
`memory_ingest`.

## Note sur la session web distante

Un serveur MCP stdio doit s'exécuter en local, là où est ton Claude Code. Cette
session web distante et éphémère ne peut pas le lancer. La config ci-dessus est
donc destinée à ton **Claude Code local**.

## Skills de référence installés

`.agents/skills/` contient les 6 skills du plugin (documentation des outils) :
`using-plaud-mcp`, `using-plaud-cli`, `recording-search`, `memory-search`,
`transcription`, `bulk-operations`.
