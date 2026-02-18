# @ln/common-ui Libraries

## Available Components

Prefer using these libs before creating custom components:

- `@ln/common-ui-accordion`
- `@ln/common-ui-adaptableimage`
- `@ln/common-ui-button`
- `@ln/common-ui-breadcrumb`
- `@ln/common-ui-dialog`
- `@ln/common-ui-dropdown`
- `@ln/common-ui-grid`
- `@ln/common-ui-icon`
- `@ln/common-ui-image`
- `@ln/common-ui-header`

## Usage Pattern

```javascript
import { Button } from '@ln/common-ui-button'
import '@ln/common-ui-button/dist/styles.css' // if needed

const MyComponent = () => (
  <Button variant="primary">Click me</Button>
)
```

## CSS Handling
- Styles copied via `npm run ln:copycss`
- Auto-runs on postinstall
- Located in node_modules/@ln/*/dist/
