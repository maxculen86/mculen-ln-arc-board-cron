# Fusion Engine Templates & Commands

## Quick Commands

### `/fusion-component [name]`
Create a new Fusion component following Arc XP patterns.

```bash
# Example usage
/fusion-component UserProfile

# What it does:
# 1. Asks for component type (layout/feature/etc)
# 2. Reads fusion-components.md spec
# 3. Shows similar examples
# 4. Creates proper structure
```

### `/fusion-debug [description]`
Debug build or runtime issues with structured approach.

```bash
# Example usage
/fusion-debug "webpack build failing with module not found"

# What it does:
# 1. Gathers error context
# 2. Runs diagnostics
# 3. Checks common Arc XP issues
# 4. Proposes solution
```

## Templates

### Component Checklist
Path: `.claude/templates/fusion/component-checklist.md`

Use with OpenSpec changes to ensure all steps are covered when creating/modifying components.

### Proposal Template
Path: `.claude/templates/fusion/proposal-template.md`

Fusion-specific proposal template that includes:
- Fusion Engine considerations
- Component type selection
- Performance impact assessment
- Data/Content source planning

### Content Source Template
Path: `.claude/templates/fusion/content-source.md`

Complete template for creating Fusion content sources:
- Fetch pattern with error handling & timeout
- Transform helpers with image processing
- GraphQL schema definition
- Testing checklist

## Integration with OpenSpec

### Standard workflow:
```bash
# 1. Create change
/opsx:new add-user-profile

# 2. OpenSpec will use config.yaml context automatically
# 3. For Fusion-specific changes, reference templates:
#    - Copy component-checklist.md into tasks
#    - Use proposal-template.md structure

# 4. Implement
/opsx:apply

# 5. Archive
/opsx:archive
```

### Fusion-specific workflow:
```bash
# 1. Use fusion command for simple components
/fusion-component UserAvatar

# 2. Use OpenSpec for complex features
/opsx:new user-authentication-flow

# 3. Debug issues
/fusion-debug "component not rendering"
```

## Token Optimization

These templates are **not auto-loaded** (to save tokens).
They're loaded **on-demand** when:
- You use `/fusion-component` or `/fusion-debug`
- You explicitly reference them in OpenSpec changes
- You ask for Fusion-specific help

## Customization

You can add more templates for:
- Data sources: `.claude/templates/fusion/data-source.md`
- Layout patterns: `.claude/templates/fusion/layout-pattern.md`

Keep each < 150 lines for token efficiency.

## Related Specs

For detailed patterns, see:
- `openspec/specs/testing.md` - Jest testing patterns
- `openspec/specs/fusion-components.md` - Component architecture
- `openspec/specs/build-system.md` - Build process
