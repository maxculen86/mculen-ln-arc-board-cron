# Claude Code - Arc XP Contenidos

> Arc XP Fusion Engine (React + Webpack) para plataforma contenidos LN
> **Para detalles**: Lee `openspec/specs/*.md` bajo demanda | Ver [AGENTS.md](./AGENTS.md) para más contexto

## Critical Guardrails

**NEVER modify**: `.fusion/`, `components/output-types/` without approval (SEO/perf critical)
**Multi-site**: `default.jsx`=la-nacion-ar, `foodit.jsx`=foodit (keep separated)

## Specs (SSOT - read on demand)
- `openspec/specs/fusion-components.md` - Component architecture, consumer/presenter pattern
- `openspec/specs/common-ui-libs.md` - @ln UI libs (check BEFORE creating UI)
- `openspec/specs/styling.md` - 3 styling approaches
- `openspec/specs/testing.md` - Jest patterns
- `openspec/specs/git-commits.md` - Semantic commit format

## Workflows
**OpenSpec**: `/opsx:new` → `/opsx:continue` → `/opsx:apply` → `/opsx:archive`
**Fusion shortcuts**: `/fusion-component`, `/fusion-debug`, `/fusion-update-libs`
**Git**: `/git-commit` (follows git-commits.md spec)

## Tool Preferences
- Use dedicated tools: Read (not cat), Edit (not sed), Grep (not grep), Glob (not find)
- Use Task+Explore for complex searches (>3 queries), Grep/Glob for simple ones
- Test: `npm run build-dev && npm test -- [specific]` (see MEMORY.md for preferences)
