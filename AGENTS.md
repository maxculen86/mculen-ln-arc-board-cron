# AI Agents Context - Arc XP Contenidos

> **Índice liviano para agentes AI. Para detalles, lee specs en `openspec/specs/` bajo demanda.**

## Project Type
Arc XP Fusion Engine app (React + Webpack) para plataforma de contenidos LN.

## Tech Stack
- **Framework**: Arc XP Fusion (React-based)
- **Build**: Webpack + Arc XP CLI
- **Styling**: Styled Components + SASS modules + Tailwind utility classes
- **Testing**: Jest + React Testing Library
- **Libs**: `@ln/ui`, `@ln/user.client.libs`, `@arcxp/engine-theme-sdk`

## Project Structure
```
components/
  ├─ layouts/      # Page layouts (site-specific)
  ├─ features/     # Reusable features (consumer/presenter pattern)
  ├─ output-types/ # SEO/perf critical (DO NOT modify without approval)
  └─ private/      # Internal utilities
content/           # Content sources
openspec/
  ├─ specs/        # SSOT technical specs (READ THESE)
  └─ changes/      # Active changes (workflow artifacts)
```

## Critical Guardrails

**NEVER modify**:
- `.fusion/` (Arc XP managed)
- `components/output-types/` without explicit approval (SEO/performance critical)

**Multi-site separation**:
- `default.jsx` = la-nacion-ar only
- `foodit.jsx` = foodit only
- Keep components clearly separated

## Specs (SSOT - read on demand)

When you need details, read these instead of guessing:

- `openspec/specs/fusion-components.md` → Component architecture, consumer/presenter pattern
- `openspec/specs/build-system.md` → Build process, webpack, Fusion integration
- `openspec/specs/common-ui-libs.md` → Reusable @ln UI components (check BEFORE creating UI)
- `openspec/specs/styling.md` → 3 styling approaches and where to use each
- `openspec/specs/testing.md` → Jest patterns and conventions
- `openspec/specs/git-commits.md` → Semantic commit message format (shared spec)

## Workflows

**OpenSpec** (structured changes):
- `/opsx:new [name]` → Start spec-driven change
- `/opsx:continue` → Create next artifact
- `/opsx:apply` → Implement tasks
- `/opsx:archive` → Archive completed change

**Fusion shortcuts** (quick tasks):
- `/fusion-component [name]` → Create component following patterns
- `/fusion-debug [issue]` → Debug build/runtime issues
- `/fusion-update-libs [lib] [ver]` → Update dependency

## Quick Checks
- Build: `npm run build-dev`
- Tests: `npm test -- [specific]` (avoid full suite in IDE)
- See `MEMORY.md` for test preferences

## Agent-Specific Config
- Claude: See `CLAUDE.md`
- Cursor: See `.cursor/rules/base.mdc`
