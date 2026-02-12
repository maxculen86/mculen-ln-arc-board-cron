# .claude/context - Auto-loaded Context

⚠️ **Files here are loaded AUTOMATICALLY in every conversation**

## Token Budget: ~600 tokens

Keep this directory MINIMAL. Only critical, frequently-needed context.

## Current Files

| File | Lines | Purpose | When Updated |
|------|-------|---------|--------------|
| `arc-xp-essentials.md` | ~40 | Critical paths, commands, patterns | Rarely |
| `project-conventions.md` | ~80 | Code style, naming, testing | When conventions change |
| `domain-knowledge.md` | ~50 | Sites (la-nacion-ar, foodit), content types | When adding sites/types |

**Total: ~165 lines ≈ 600 tokens**

## Guidelines

### ✅ Should go here:
- Critical "never touch" warnings
- Frequently used paths/commands
- Code style that affects every file
- Domain knowledge needed often

### ❌ Should NOT go here:
- Detailed implementation patterns → `openspec/specs/`
- One-off reference info → Link in `CLAUDE.md`
- Large code examples → Templates
- Rarely needed context → On-demand specs

## Verification

Check token usage impact:
```bash
wc -l .claude/context/*.md
# Keep total < 200 lines
```

Run `/context` to see total token usage with this loaded.

## Related Context Locations

- **Auto-load (always):** `.claude/context/` ← You are here
- **Auto-load (OpenSpec):** `openspec/config.yaml`
- **On-demand:** `openspec/specs/*.md`
- **Index/reference:** `CLAUDE.md`
- **Templates:** `.claude/templates/`
