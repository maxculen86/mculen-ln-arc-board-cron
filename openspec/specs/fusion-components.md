# Fusion Components Structure

## Component Types

### 1. Layouts (`components/layouts/`)
- Full page layouts (LN-nota-video, LN-acumulado, etc.)
- Use Fusion's resolver pattern for data fetching
- Export default component with `PropTypes.children`

### 2. Features (`components/features/`)
- Reusable feature components
- Follow consumer/presenter pattern
- Consumer: data fetching, logic
- Presenter: pure display component

### 3. Output Types (`components/output-types/`)
- SEO/Performance utilities
- criticalCss, fontPreload, Helper
- DO NOT modify without performance review

### 4. Private (`components/private/`)
- Internal utilities and helpers
- LN-specific implementations
- Common utilities

## Fusion Patterns

```javascript
// Standard Fusion Component
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

const MyComponent = ({ customFields }) => {
  // Component logic
}

MyComponent.propTypes = {
  customFields: PropTypes.shape({
    // fields
  })
}

export default MyComponent
```

## Key Files Per Component
- `index.jsx` - Main component
- `default.jsx` - Default export (if needed)
- `[component].test.js` - Jest tests
- **NO styles.scss** - See `styling.md` for style approach
