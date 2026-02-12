# Arc XP Fusion - Critical Context

## 🚨 Never Touch
- `.fusion/` (Arc XP managed)
- `components/output-types/` (SEO/perf critical - needs approval)
  - ⚠️ CRITICAL: `default.jsx` = la-nacion-ar, `foodit.jsx` = foodit
  - Never mix sites in output-types!
- `node_modules/`, `package-lock.json` directly

## 📁 Key Paths
```
components/layouts/
  ├── LN-*, Api-LN-*     → la-nacion-ar layouts
  └── Foodit-*           → foodit layouts (explicit)
components/features/
  ├── LN/, LN-*          → la-nacion-ar features
  └── foodit-global/     → foodit features (explicit)
components/output-types/
  ├── default.jsx        → la-nacion-ar (implicit)
  └── foodit.jsx         → foodit (explicit)
components/private/      → Shared utils, helpers
content/                → Content sources
data/                   → Data sources
```

## 🔧 Essential Commands
```bash
npm run build-dev      # Clean + webpack + ln:buildjs
npm run test          # Jest with coverage
npm run watch         # Dev with auto-reload
fusion start          # Start local server
```

## 🎨 Fusion Pattern (Most Common)
```javascript
// Feature component - consumer/presenter
import Consumer from 'fusion:consumer'

const MyFeature = ({ customFields, content }) => {
  // presenter logic
}

MyFeature.propTypes = { /* ... */ }

export default Consumer(MyFeature)
```

## 📦 Check @ln Libs First
Before creating UI components, check: `openspec/specs/common-ui-libs.md`

## 📚 More Context
- Fusion patterns: `openspec/specs/fusion-components.md`
- Build system: `openspec/specs/build-system.md`
- Full index: `CLAUDE.md`
