# Proposal: [Change Name]

## Context
<!-- Why this change is needed -->

## Fusion Engine Considerations
- Component type: [layout|feature|output-type|private]
- Rendering: [server-side|client-side|hybrid]
- Data/Content sources: [list sources if needed]

## Proposal

### What we're building
<!-- Brief description -->

### Fusion patterns to use
- [ ] Consumer/presenter (if feature)
- [ ] Layout with resolver
- [ ] Output type (SEO/performance)
- [ ] Private utility

### Dependencies
- Existing components:
- @ln/common-ui libs:
- Content sources:
- Data sources:

### Files affected
```
components/{type}/{name}/
  ├── index.jsx
  ├── styles.scss (if needed)
  └── {name}.test.js
```

## Non-Goals
<!-- What we're explicitly NOT doing -->

## Performance Impact
- Bundle size impact: [none|small|medium|needs review]
- Critical CSS: [affected|not affected]
- Client-side JS: [yes|no]

## Risks
- Fusion Engine constraints:
- Build process impact:
- Breaking changes:

## Testing Strategy
- Unit tests:
- Integration:
- Manual testing:
