# Styling Architecture

## ⚠️ Critical: DO NOT create styles.scss in components

Arc XP Fusion Engine in this project **does not follow** the standard pattern of component-level stylesheets.

## 🎨 Three Styling Approaches

### 1. Global SCSS (Primary)
**Location:** `src/statics/{site}/css/`

```
src/statics/
├── LN/css/          → la-nacion-ar styles
│   ├── abstracts/   → Variables, mixins, imports
│   ├── modules/     → Reusable modules
│   ├── pages/       → Page-specific styles
│   └── base/        → Base/reset styles
└── (foodit structure similar)
```

**Usage:**
- Global site styles
- Modules and utilities
- Page-specific layouts
- Compiled by webpack to `resources/dist/css/{site}/`

**Build:**
```bash
npm run build-dev  # Compiles SCSS from src/statics/
```

### 2. @ln Component Libraries
**Location:** `node_modules/@ln/common-ui-*/dist/`

```
@ln/common-ui-button/dist/styles.css
@ln/common-ui-grid/dist/styles.css
@ln/common-ui-icon/dist/styles.css
```

**Usage:**
- Pre-built UI components with their own styles
- CSS copied during postinstall

**Build:**
```bash
npm run ln:copycss  # Copies CSS from @ln libs
# Runs automatically on postinstall
```

**Import in component:**
```javascript
import { Button } from '@ln/common-ui-button';
// CSS already available via ln:copycss
```

### 3. Tailwind CSS (Scoped)
**Location:** `resources/dist/css/{site}/tailwind/`

```
resources/dist/css/
├── ln/tailwind/global.css       → la-nacion-ar tailwind
└── foodit/tailwind/global.css   → foodit tailwind
```

**Usage:**
- Loaded via output-types/criticalCss
- **MUST be scoped** to avoid affecting parent elements
- Use wrapping div with specific class

**Example:**
```jsx
// ✅ CORRECT - Scoped
<div className="tw-scope">
  <div className="tw-flex tw-items-center">
    Content with Tailwind
  </div>
</div>

// ❌ WRONG - Affects parent
<div className="flex items-center">
  Content
</div>
```

**Critical CSS Integration:**
```javascript
// output-types/criticalCss/default.jsx (la-nacion-ar)
<link
    rel="stylesheet"
    href="resources/dist/css/ln/tailwind/global.css"
    id="critical-css-tailwind"
/>

// output-types/criticalCss/foodit.jsx
<link
    rel="stylesheet"
    href="resources/dist/css/foodit/tailwind/global.css"
    id="critical-css-tailwind"
/>
```

## 🗂️ Output Structure

After build (`npm run build-dev`):
```
resources/dist/css/
├── ln/               → la-nacion-ar
│   ├── base/         → Base styles
│   ├── modules/      → Module styles
│   ├── pages/        → Page styles
│   ├── components/   → Component styles
│   └── tailwind/     → Tailwind CSS
└── foodit/           → foodit
    ├── base/
    ├── tailwind/
    └── ...
```

## 🔧 Build Process

Custom webpack (not Arc's default):
1. Webpack processes `src/statics/` SCSS
2. `npm run ln:buildjs` runs esbuild for scripts
3. `npm run ln:copycss` copies @ln lib styles
4. Output to `resources/dist/`

**Key script:**
```json
{
  "build-dev": "npm run clean && npm run webpack-dev && npm run ln:buildjs",
  "ln:copycss": "node scripts/copyfilesLnLibsCss.js",
  "ln:buildjs": "scripts/esbuildScripts.sh"
}
```

## ✅ Best Practices

### When to use each approach:

| Approach | Use When | Don't Use When |
|----------|----------|----------------|
| **Global SCSS** | Site-wide styles, layouts, pages | Component-specific styles |
| **@ln libs** | Standard UI components exist | Custom one-off components |
| **Tailwind** | Quick utility classes, prototypes | Complex component styling |

### Component Styling Guidelines:

```javascript
// ✅ GOOD - Use @ln lib
import { Button } from '@ln/common-ui-button';
const MyComponent = () => <Button>Click</Button>;

// ✅ GOOD - Use global CSS class
const MyComponent = () => <div className="mod-tooltip">Content</div>;

// ✅ GOOD - Scoped Tailwind
const MyComponent = () => (
  <div className="tw-scope">
    <div className="tw-flex">Content</div>
  </div>
);

// ❌ BAD - Don't create component.scss
// NO: components/features/MyComponent/styles.scss
```

## 🚨 Common Mistakes

1. **Creating `styles.scss` in components** → Use global SCSS or @ln libs
2. **Unscoped Tailwind** → Always wrap with scoping class
3. **Forgetting `ln:copycss`** → Run if @ln lib styles missing
4. **Modifying output-types CSS** → Coordinate with both sites

## 📝 Debugging Style Issues

```bash
# Check if CSS built correctly
ls -la resources/dist/css/ln/
ls -la resources/dist/css/foodit/

# Rebuild styles
npm run build-dev

# Copy @ln lib CSS
npm run ln:copycss

# Full clean rebuild
npm run clean && npm run build-dev
```

## 🌐 Site-Specific Considerations

### la-nacion-ar
- Uses `src/statics/LN/css/`
- Output: `resources/dist/css/ln/`
- Critical CSS: `output-types/criticalCss/default.jsx`

### foodit
- Uses `src/statics/foodit/css/` (if exists)
- Output: `resources/dist/css/foodit/`
- Critical CSS: `output-types/criticalCss/foodit.jsx`

**Never mix site styles** - each site has its own compilation path.
