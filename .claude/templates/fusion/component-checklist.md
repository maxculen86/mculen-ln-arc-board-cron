# Fusion Component Checklist

Use this when creating/modifying Fusion components.

## Pre-Implementation
- [ ] Read `openspec/specs/fusion-components.md`
- [ ] Check if @ln/common-ui has similar component
- [ ] Verify component type (layout/feature/output-type/private)
- [ ] Identify data/content sources needed

## Implementation
- [ ] Create component directory: `components/{type}/{name}/`
- [ ] Create `index.jsx` with Fusion imports
- [ ] Add PropTypes validation
- [ ] Create `styles.scss` if needed
- [ ] Follow consumer/presenter pattern (for features)
- [ ] Handle loading/error states

## Testing
- [ ] Create `{name}.test.js`
- [ ] Test rendering
- [ ] Test props validation
- [ ] Run `npm run test`

## Integration
- [ ] Add to parent layout/component
- [ ] Verify build: `npm run build-dev`
- [ ] Check bundle size if client-side heavy
- [ ] Update related specs in `openspec/specs/`

## Performance (if client-side)
- [ ] Check critical CSS impact
- [ ] Verify no unnecessary re-renders
- [ ] Test on mobile/slow network

## Before PR
- [ ] Run `npm run eslint`
- [ ] Run `npm run prettier`
- [ ] All tests passing
- [ ] Build successful
