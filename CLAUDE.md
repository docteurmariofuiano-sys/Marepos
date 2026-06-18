# Marepos — Collection de skills & outils Claude Code

Dépôt perso: skills, agents, outils Claude Code. Tout commité (conteneurs éphémères). Branche: `claude/funny-shannon-g5618b` (PR #1).

## Skills installés (`.claude/skills/`)

### Design & UI
- **ui-ux-pro-max** — UI/UX: 67 styles, 161 palettes, 57 font pairings, 99 UX guidelines, 25 charts, 10+ stacks. Search: `scripts/search.py` (data: `src/ui-ux-pro-max/`). No key. ✅
- **banner-design / brand / design / design-system / slides / ui-styling** — Compagnons ui-ux-pro-max (bannières, marque, logos/CIP, tokens, slides, shadcn/Tailwind). ✅
- **canvas-design** — Art statique (posters, PDF/PNG), design philosophy. Fonts: `canvas-fonts/`. ✅

### Génération d'images (Gemini)
- **banana** — IA créatif via Gemini Nano Banana (MCP `@ycse/nanobanana-mcp`). Agent: `brief-constructor`. ⚠️ Requiert `GEMINI_API_KEY` + facturation GCloud (activée ✅).

### Vidéo
- **remotion-best-practices** — Remotion (vidéo React): 37 règles. Fichiers: `.agents/skills/`, symlink: `.claude/skills/`. ✅ Doc pure, no key.

### NotebookLM
- **nlm-skill** — Guide CLI `nlm` + MCP NotebookLM. ⚠️ Requiert `notebooklm-mcp-cli` (PyPI) + `nlm login` (browser, ta machine). No headless.

### Optimisation tokens
- **caveman-compress** — Compresse mémoire (CLAUDE.md, todos) → caveman speak, réduit tokens. Backup conservé. Python stdlib. ✅ Trigger: `/caveman-compress <fichier>`.

## Système de mémoire (hooks)
- **claude-memory-compiler** — Capture convos → base knowledge markdown → réinjectée sessions suivantes.
  - Hooks (`.claude/settings.json`): `SessionStart`, `PreCompact`, `SessionEnd`
  - Scripts: `scripts/`; deps: `pyproject.toml` + `uv.lock` (`uv sync`)
  - Ref: `AGENTS.md`. Données (gitignored): `daily/`, `knowledge/`, `reports/`. ✅

## Autres
- **exports/** — Livrables (ex. `flashcards_iatrogenie_generaliste.csv`).

## Configuration requise côté utilisateur
| Composant | À faire sur ta machine |
|---|---|
| banana | Clé Google AI Studio + facturation activée ; `export GEMINI_API_KEY=…` |
| nlm-skill | `uv tool install notebooklm-mcp-cli` ; `nlm login` ; `nlm setup add claude-code` |
| memory-compiler | `uv sync` après clonage |

## Notes
- Noms skills = dossiers (préfixe `ckm:` retiré).
- Jamais committer clés/secrets — utiliser variables d'environnement.