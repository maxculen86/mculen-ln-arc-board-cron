## ADDED Requirements

### Requirement: Foodit-acumulado migrado como duplicación estratégica
El layout `Foodit-acumulado` SHALL copiarse al bundle MX en `apps/foodit-mx/components/layouts/Foodit-acumulado/` desacoplado del original del monolito (`components/layouts/Foodit-acumulado/`). El archivo copiado SHALL incluir en su cabecera un comentario con el path de origen y la fecha del fork.

#### Scenario: Layout copiado al bundle MX
- **WHEN** se verifica `apps/foodit-mx/components/layouts/Foodit-acumulado/`
- **THEN** el directorio existe con los archivos del layout y un comentario de cabecera indicando el path de origen en el monolito y la fecha del fork

#### Scenario: Original del monolito no modificado
- **WHEN** se compara `components/layouts/Foodit-acumulado/` antes y después de la migración
- **THEN** los archivos del monolito son idénticos a su estado previo; ningún archivo fue modificado

#### Scenario: Layout en bundle MX sirve el path /recetas
- **WHEN** Fusion arranca `apps/foodit-mx/` y se navega a `/recetas`
- **THEN** el layout `Foodit-acumulado` del bundle MX renderiza la página de listado sin errores JS ni CSS

### Requirement: Foodit-ficha-receta migrado como copia directa
El layout `Foodit-ficha-receta` SHALL copiarse al bundle MX en `apps/foodit-mx/components/layouts/Foodit-ficha-receta/` con adaptaciones mínimas limitadas a: imports relativos, registro del layout en el bundle y paths de rutas. No SHALL requerirse lógica adicional de desacoplamiento.

#### Scenario: Layout copiado al bundle MX
- **WHEN** se verifica `apps/foodit-mx/components/layouts/Foodit-ficha-receta/`
- **THEN** el directorio existe y los archivos contienen únicamente las adaptaciones de imports/paths necesarias para funcionar en el bundle MX

#### Scenario: Original del monolito no modificado
- **WHEN** se compara `components/layouts/Foodit-ficha-receta/` antes y después de la migración
- **THEN** los archivos del monolito son idénticos a su estado previo

#### Scenario: Layout en bundle MX sirve el path /recetas/<*-nid>
- **WHEN** Fusion arranca `apps/foodit-mx/` y se navega a una URL del tipo `/recetas/<slug-nid>`
- **THEN** el layout `Foodit-ficha-receta` del bundle MX renderiza la ficha de artículo sin errores JS ni CSS

### Requirement: Secuencia de migración layouts → card de scope → componentes
La migración SHALL seguir el orden: (1) layouts al bundle MX, (2) card de scope que delimita features y `components/private/` en juego para cada layout, (3) migración de componentes. Los componentes no SHALL migrarse antes de tener ambos layouts en el bundle.

#### Scenario: Card de scope creada post-layout
- **WHEN** ambos layouts están en `apps/foodit-mx/components/layouts/`
- **THEN** existe una card (task o documento) que lista los features y archivos de `components/private/` en scope para cada layout, tomando `docs/migrate-mx/private-components/audit.md` como fuente de verdad

#### Scenario: Componentes no presentes antes de layouts
- **WHEN** se verifica el bundle MX antes de completar la migración de layouts
- **THEN** `apps/foodit-mx/components/features/` y `apps/foodit-mx/components/private/` están vacíos o solo contienen archivos explícitamente autorizados por card de scope
