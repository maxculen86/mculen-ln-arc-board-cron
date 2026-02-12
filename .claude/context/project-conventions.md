# Project Conventions - LN Arc XP

## 🎨 Code Style (Auto-enforced)

### Prettier (tabWidth: 4)
- Single quotes: `'string'`
- No trailing commas
- Arrow parens: `avoid`

### ESLint (Airbnb + Prettier)
- React 18.2.0
- JSX in `.js` or `.jsx`
- Indent: 4 spaces for JSX
- Console: Only `console.warn`, `.error`, `.info` allowed
- PropTypes: OFF (not required)
- Props spreading: ALLOWED

### Fusion-specific
- Ignore unresolved `fusion:*` imports
- Allow underscore dangle in `.jsx`

## 📂 Component Naming

### Layouts (components/layouts/)
Pattern: `LN-{feature-name}/`
Example: `LN-nota-video/`, `LN-acumulado/`

Components inside:
- Main: `components/{FeatureName}.jsx`
- Sub-components: `components/{FeatureName}{Part}.jsx`

Example:
```
LN-nota-video/
  ├── components/
  │   ├── NotaVideoOpening.jsx
  │   ├── NotaVideoOpeningMedia.jsx
  │   └── NotaVideoOpeningDescription.jsx
  └── index.jsx
```

### Features (components/features/)
Pattern: `LN/{DS-FeatureName}/`
Example: `LN/DS-Toolbar/`

Hooks pattern: `hooks/use{Feature}.jsx`
Example: `useBookmark.jsx`, `useComments.jsx`

## 🗂️ Content & Data Sources

### Content Sources (content/)
```
content/
  ├── sources/   → Content source definitions
  ├── schemas/   → Content type schemas
  └── filters/   → Content filters
```

### Data Sources (data/)
```
data/
  ├── db/        → Database configs
  ├── dumps/     → Data dumps
  └── restore/   → Restore scripts
```

## 🧪 Testing Convention

- Test files: `{ComponentName}.test.js`
- Location: Same directory as component
- Framework: Jest
- Coverage: Required (run `npm run test`)

## 🚀 Before Commit

1. `npm run eslint` (or auto-fix in IDE)
2. `npm run prettier` (or format on save)
3. `npm run test`
4. `npm run build-dev` (verify build)

## 🔍 Common Patterns

### Fusion imports always use `fusion:` prefix
```javascript
import Consumer from 'fusion:consumer'
import Content from 'fusion:content'
```

### LN libs use @ln namespace
```javascript
import { Button } from '@ln/common-ui-button'
```

### Hooks must start with `use`
```javascript
// hooks/useBookmark.jsx
export const useBookmark = () => { /* ... */ }
```
