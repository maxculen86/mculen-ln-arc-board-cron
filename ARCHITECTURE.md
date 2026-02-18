# Architecture - Arc XP Contenidos

> Decisiones arquitectónicas de alto nivel para la plataforma de contenidos LN en Arc XP Fusion

## Overview

**Tipo**: Arc XP Fusion Engine application
**Stack**: React + Webpack + Arc XP runtime
**Sites**: la-nacion-ar (default.jsx) + foodit (foodit.jsx)
**Deployment**: Arc XP managed infrastructure

## Arquitectura Fusion

### Component Model

Fusion usa un modelo de componentes con tipos específicos:

```
components/
├── layouts/       # Page-level layouts (full pages)
├── features/      # Reusable UI features (composable)
├── output-types/  # Output rendering (HTML head, SEO, perf)
└── private/       # Internal utilities
```

**Decisión clave**: Separar layouts (site-specific) de features (reusable).

**Rationale**: Permite reutilización de features entre sites (la-nacion-ar, foodit) mientras layouts se mantienen específicos.

Ver: `openspec/specs/fusion-components.md`

### Consumer/Presenter Pattern

Features complejas usan patrón consumer/presenter:

-   **Consumer** (HOC): Fetches data, handles state, wraps presenter
-   **Presenter** (component): Receives props, renders UI, stateless

```jsx
// Consumer (index.jsx)
import Consumer from 'fusion:consumer';
import Presenter from './presenter';

const MyFeatureConsumer = Consumer(MyFeaturePresenter);
export default MyFeatureConsumer;

// Presenter (presenter.jsx)
const MyFeaturePresenter = ({ data, customFields }) => { ... }
```

**Rationale**: Separa lógica de datos (consumer) de rendering (presenter), facilitando testing y reutilización.

## Content Architecture

### Content Sources

Abstracciones para fetch de contenido desde Arc Content API:

```
content/sources/      # Source implementations
content/schemas/      # PropTypes schemas
content/filters/      # Content filters
```

**Decisión**: Content sources son singleton functions que retornan data.

**Rationale**: Fusion cachea y optimiza automáticamente. Sources deben ser puros (no side effects).

Ver: `.claude/templates/fusion/content-source.md`

### Data Sources

Para datos externos (db, APIs, servicios):

```
data/sources/         # External data fetchers
```

**Diferencia con content sources**: Data sources para datos NO de Content API.

## Styling Architecture

**Decisión**: 3 approaches coexisten:

1. **Styled Components** - Componentes React con CSS-in-JS
2. **SASS Modules** - `.scss` files importados como modules
3. **Tailwind Utilities** - Utility classes para spacing/layout

**Rationale**: Legacy + progresivo. Nuevo código prefiere Styled Components o Tailwind.

Ver: `openspec/specs/styling.md`

## Build System

### Webpack + Arc XP CLI

-   **Local dev**: `npm run dev` (dev server con HMR)
-   **Build prod**: Arc XP CLI build pipeline (managed)
-   **Custom build**: `npm run build-dev` (local verification)

**Decisión**: Mantener build customizations mínimas.

**Rationale**: Arc XP upgrades son más fáciles si no divergimos del build estándar.

Ver: `openspec/specs/build-system.md`

### Bundle Optimization

-   Code splitting por route/layout
-   Lazy loading de features pesadas
-   Arc XP CDN para assets estáticos

**Optimización crítica**: `output-types/` impacta directamente SEO/perf. Modificar con extremo cuidado.

## Multi-Site Strategy

### Site Separation

-   **la-nacion-ar**: `components/output-types/default.jsx`
-   **foodit**: `components/output-types/foodit.jsx`

**Decisión**: Sites comparten features pero tienen output-types separados.

**Rationale**: Permite compartir código UI mientras se mantiene separación de SEO/metadata/analytics por site.

### Shared Components

Features y utilidades compartidas:

```
components/features/     # Compartible entre sites
components/private/      # Utilidades compartidas
@ln/ui                   # Design system compartido
```

**Regla**: Features no deben asumir site. Reciben config via customFields.

## Testing Strategy

### Jest + React Testing Library

```
__tests__/              # Co-located with components
*.test.js              # Unit tests
```

**Decisión**: Prefer integration tests over unit tests para componentes.

**Rationale**: Integration tests cubren más escenarios reales (props + rendering + interactions).

**Optimización**: Tests específicos en IDE, suite completa en CI.

Ver: `openspec/specs/testing.md`, `MEMORY.md`

## Dependencies Strategy

### @ln Libraries

Preferir librerías internas `@ln/*` antes de crear código nuevo:

-   `@ln/ui` - Design system components
-   `@ln/user.client.libs` - Auth, login, user management
-   `@arcxp/engine-theme-sdk` - Theme utilities

**Decisión**: Reutilizar sobre reinventar.

**Rationale**: Reduce duplicación, aprovecha trabajo del equipo UI/Platform.

Ver: `openspec/specs/common-ui-libs.md`

### Update Strategy

-   **Minor/patch bumps**: `/fusion-update-libs` workflow
-   **Major bumps**: OpenSpec change (`/opsx:new update-[lib]`)

**Rationale**: Major bumps requieren análisis de breaking changes y testing amplio.

## OpenSpec as SSOT

### Documentation-Driven Development

Specs técnicos en `openspec/specs/`:

-   fusion-components.md
-   build-system.md
-   styling.md
-   testing.md
-   git-commits.md
-   common-ui-libs.md

**Decisión**: Specs son single source of truth (SSOT).

**Rationale**: Evita duplicación de documentación. Agentes AI y humanos leen las mismas specs.

### Change Workflow

Cambios estructurados usan OpenSpec workflow:

```
openspec/changes/[nombre]/
├── 01-proposal.md      # Propuesta inicial del cambio
├── 02-design.md        # Decisiones de diseño
├── 03-specs.md         # Especificación técnica detallada
└── 04-tasks.md         # Checklist de implementación
```

**Flujo**: proposal → design → specs → tasks

**Decisión**: Features/migraciones grandes usan OpenSpec.

**Rationale**: Documentación como parte del proceso (no after-thought). Facilita onboarding y knowledge transfer.

Ver: `openspec/README.md`

## Security

-   **Auth**: @ln/user.client.libs (SSO + token rotation)
-   **XSS**: React auto-escaping + DOMPurify para HTML externo
-   **CSRF**: Arc XP session management
-   **Content Security**: Arc Content API valida/sanitiza content

**Decisión**: Confiar en Arc XP + @ln libs para security.

**Rationale**: No reinventar auth/security. Usar platform features.

## Performance

### Metrics

-   **LCP** (Largest Contentful Paint): <2.5s
-   **CLS** (Cumulative Layout Shift): <0.1
-   **FID** (First Input Delay): <100ms

**Optimizaciones**:

-   Arc XP CDN + edge caching
-   Lazy loading images (IntersectionObserver)
-   Code splitting por route
-   Critical CSS inline en output-types

**Monitoreo**: Arc XP Analytics + Google Analytics

## Evolución

### Patterns en evolución

-   **Styled Components** reemplazando SASS modules progresivamente
-   **Tailwind utilities** para spacing/layout (nuevo código)
-   **OpenSpec** como workflow estándar para cambios grandes

### Deprecations

-   Evitar crear nuevos SASS modules (preferir Styled Components)
-   Consolidar custom hooks dispersos en `components/private/hooks/`

## Referencias

-   [Arc XP Fusion Docs](https://arcxp.com/developers/fusion)
-   [React Best Practices](https://react.dev/learn)
-   Specs internas: `openspec/specs/`
-   Templates: `.claude/templates/fusion/`
