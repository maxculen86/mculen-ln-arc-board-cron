# OpenSpec Specifications

## Token Optimization Strategy

This directory contains **minimal, focused specs** to provide context without consuming excessive tokens.

### Design Principles
1. **Lazy loading**: Specs are read on-demand, not loaded in every prompt
2. **Single responsibility**: Each spec covers ONE specific area
3. **Reference, don't duplicate**: Link to code instead of repeating it
4. **Concise examples**: Show patterns, not full implementations

### Current Specs

| Spec | Purpose | When to Read |
|------|---------|--------------|
| `fusion-components.md` | Component architecture patterns | Creating/modifying components |
| `build-system.md` | Build process & scripts | Build errors, deployment |
| `common-ui-libs.md` | Available UI components | Before creating new UI components |
| `styling.md` | Styling architecture (SCSS, @ln libs, Tailwind) | Adding styles, CSS issues |
| `testing.md` | Jest testing patterns & best practices | Writing tests, debugging tests |

### Adding New Specs

Only add specs for:
- ✅ Frequently referenced patterns
- ✅ Critical domain knowledge
- ✅ Non-obvious conventions
- ❌ NOT for one-off use cases
- ❌ NOT for code that can be easily searched

### Maintenance
- Review specs quarterly
- Remove outdated information
- Keep each spec < 100 lines
- Update CLAUDE.md quick reference when adding specs
