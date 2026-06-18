# Marepos — Collection de skills & outils Claude Code

Dépôt personnel rassemblant des skills, agents et outils pour Claude Code.
Tout est commité ici pour persister entre les sessions (les conteneurs distants
sont éphémères). Branche de travail : `claude/funny-shannon-g5618b` (PR #1).

## Skills installés (`.claude/skills/`)

### Design & UI
- **ui-ux-pro-max** — Intelligence design UI/UX : 67 styles, 161 palettes, 57
  pairings de polices, 99 guidelines UX, 25 charts sur 10+ stacks. Moteur de
  recherche Python : `scripts/search.py` (données dans `src/ui-ux-pro-max/`).
  Aucune clé requise. ✅ Fonctionnel.
- **banner-design / brand / design / design-system / slides / ui-styling** —
  Skills compagnons de ui-ux-pro-max (bannières, identité de marque, logos/CIP,
  design tokens, présentations, composants shadcn/Tailwind). ✅ Fonctionnels.
- **canvas-design** — Art visuel statique (posters, PDF/PNG) via une « design
  philosophy ». Polices dans `canvas-fonts/`. ✅ Fonctionnel.

### Génération d'images (Gemini)
- **banana** — Directeur créatif IA via Google Gemini Nano Banana (backend MCP
  `@ycse/nanobanana-mcp`). Agent associé : `brief-constructor`.
  ⚠️ Requiert `GEMINI_API_KEY` + facturation Google Cloud activée.
- **nano-banana** — Même objectif, backend Gemini CLI + extension nanobanana.
  ⚠️ Requiert `NANOBANANA_GEMINI_API_KEY`. Doublon de `banana` (dédup à décider).

### Vidéo
- **remotion-best-practices** — Bonnes pratiques Remotion (vidéo en React) :
  37 docs de règles. Layout « universel » : fichiers réels dans
  `.agents/skills/`, symlink depuis `.claude/skills/`. ✅ Doc pure, aucune clé.

### NotebookLM
- **nlm-skill** — Guide pour le CLI `nlm` et le serveur MCP NotebookLM.
  ⚠️ Requiert l'outil `notebooklm-mcp-cli` (PyPI) + `nlm login` (navigateur,
  sur ta machine). Non utilisable depuis un conteneur headless.

### Optimisation tokens
- **caveman-compress** — Compresse les fichiers mémoire (CLAUDE.md, todos) en
  « caveman speak » pour réduire les tokens d'entrée. Backup lisible conservé.
  Scripts Python stdlib. ✅ Fonctionnel. Déclencheur : `/caveman-compress <fichier>`.

## Système de mémoire (hooks)
- **claude-memory-compiler** — Capture les conversations et les compile en base
  de connaissances markdown réinjectée aux sessions suivantes.
  - Hooks (`.claude/settings.json`) : `SessionStart`, `PreCompact`, `SessionEnd`
  - Scripts : `scripts/` ; deps : `pyproject.toml` + `uv.lock` (`uv sync`)
  - Référence technique : `AGENTS.md`. Données générées (gitignored) :
    `daily/`, `knowledge/`, `reports/`. ✅ Fonctionnel.

## Autres
- **exports/** — Livrables (ex. `flashcards_iatrogenie_generaliste.csv`).

## Configuration requise côté utilisateur
| Composant | À faire sur ta machine |
|---|---|
| banana / nano-banana | Clé Google AI Studio + facturation activée ; `export GEMINI_API_KEY=…` |
| nlm-skill | `uv tool install notebooklm-mcp-cli` ; `nlm login` ; `nlm setup add claude-code` |
| memory-compiler | `uv sync` après clonage |

## Notes
- Les noms de skills correspondent à leurs dossiers (préfixe `ckm:` retiré).
- Ne jamais committer de clés/secrets — utiliser des variables d'environnement.
