# Arc XP Contenidos - Context for AI

## Project Overview
Arc XP Fusion Engine app for @ln content platform. React + Webpack based.

**⚠️ IMPORTANT: For detailed specs, read files in `openspec/specs/` on demand**

## Quick Reference

### Key Documentation (read when needed)
- [openspec/specs/fusion-components.md](openspec/specs/fusion-components.md) - Component architecture
- [openspec/specs/build-system.md](openspec/specs/build-system.md) - Build process
- [openspec/specs/common-ui-libs.md](openspec/specs/common-ui-libs.md) - UI component library
- [openspec/specs/styling.md](openspec/specs/styling.md) - Styling architecture (3 approaches)
- [openspec/specs/testing.md](openspec/specs/testing.md) - Jest testing patterns

### Project Structure
```
components/
  ├── layouts/      # Full page layouts
  ├── features/     # Reusable features
  ├── output-types/ # SEO/performance (DO NOT modify without review)
  └── private/      # Internal utilities
content/            # Content sources
data/               # Data sources
config/             # Build config
```

### Essential Rules
1. **Read before modifying**: Always check existing component patterns
2. **Use @ln libs first**: Check openspec/specs/common-ui-libs.md before creating components
3. **Test locally**: `npm run build-dev && npm run test`
4. **Fusion patterns**: Follow consumer/presenter pattern (see fusion-components.md)
5. **DO NOT touch**: .fusion/, output-types/ without explicit approval

### Common Tasks
- New component → Use `/fusion-component` or read `openspec/specs/fusion-components.md`
- New content source → Use template `.claude/templates/fusion/content-source.md`
- Build/debug issues → Use `/fusion-debug` or check `openspec/specs/build-system.md`
- Writing tests → Check `openspec/specs/testing.md`
- Need UI component → Check `openspec/specs/common-ui-libs.md`

## Workflows

### OpenSpec (Structured changes)
```bash
/opsx:new [name]      # Create new change with spec-driven workflow
/opsx:continue        # Continue current change (create artifacts)
/opsx:apply           # Implement tasks
/opsx:archive         # Archive completed change
```

### Fusion Shortcuts (Quick tasks)
```bash
/fusion-component [name]  # Create component following Arc XP patterns
/fusion-debug [issue]     # Debug build/runtime issues
```

See [.claude/templates/fusion/README.md](.claude/templates/fusion/README.md) for details.
