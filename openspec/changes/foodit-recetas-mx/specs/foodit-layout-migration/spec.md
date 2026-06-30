## ADDED Requirements

### Requirement: Foodit-acumulado migrado como duplicación estratégica (disponible, no ruteado)
El layout `Foodit-acumulado` SHALL copiarse al bundle MX en `apps/foodit-mx/components/layouts/Foodit-acumulado/` desacoplado del original del monolito (`components/layouts/Foodit-acumulado/`). El archivo copiado SHALL incluir en su cabecera un comentario con el path de origen y la fecha del fork. El layout queda **migrado y disponible** en el bundle pero **ninguna ruta lo asigna por defecto**: `/recetas` mantiene `Foodit-subcategorias` (ver corrección de Fase 6 — no hay swap).

> **Decisión (corrección no-swap):** se canceló el swap `Foodit-subcategorias` → `Foodit-acumulado` en PageBuilder. `Foodit-acumulado` se conserva migrado (Fase 3 + bloque 4d: `AcuTema`/`TagCategories`) para no descartar el trabajo y habilitar uso futuro, pero no es el layout productivo de `/recetas`.

#### Scenario: Layout copiado al bundle MX
- **WHEN** se verifica `apps/foodit-mx/components/layouts/Foodit-acumulado/`
- **THEN** el directorio existe con los archivos del layout y un comentario de cabecera indicando el path de origen en el monolito y la fecha del fork

#### Scenario: Original del monolito no modificado
- **WHEN** se compara `components/layouts/Foodit-acumulado/` antes y después de la migración
- **THEN** los archivos del monolito son idénticos a su estado previo; ningún archivo fue modificado

#### Scenario: Layout disponible en el bundle pero no ruteado por defecto
- **WHEN** se verifica la configuración de ruteo del bundle MX y se monta `Foodit-acumulado` en un entorno de prueba
- **THEN** el layout renderiza sin errores JS ni CSS cuando se lo monta, pero ninguna ruta productiva (`/recetas` incluida) lo tiene asignado; `/recetas` resuelve con `Foodit-subcategorias`

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

### Requirement: Foodit-subcategorias es el layout productivo de /recetas en el bundle MX
El bundle MX SHALL incluir `Foodit-subcategorias` en `apps/foodit-mx/components/layouts/Foodit-subcategorias/` con todas sus dependencias (helpers, features y private components requeridos), de forma que el layout renderice en `fusion start` sin producir `[MISSING]` en el HTML. Este layout es el **layout definitivo de `/recetas`**: PageBuilder mantiene el mapeo existente y **no se ejecuta swap** a `Foodit-acumulado`.

> **Contexto (corrección no-swap)**: PageBuilder tiene `/recetas` mapeado a `Foodit-subcategorias` y así se conserva. Se canceló el swap originalmente planeado en la tarea 6.8; `Foodit-subcategorias` deja de ser un fallback temporal y pasa a ser el layout productivo. `Foodit-acumulado` queda migrado en el bundle pero sin ruta asignada.

#### Scenario: Layout presente con todas sus dependencias

- **WHEN** se verifica `apps/foodit-mx/components/layouts/Foodit-subcategorias/`
- **THEN** el directorio existe con el layout principal y todos sus helpers y dependencias directas (`_helpers.js`, `CardCategory`, `BreadcrumbCustomFoodit` y el dataLayer util transitivo)

#### Scenario: Sin [MISSING] al renderizar

- **WHEN** Fusion arranca `apps/foodit-mx/` y se navega a una URL que usa `Foodit-subcategorias` (ej. `/aprende-en-la-cocina/`)
- **THEN** el HTML resultante no contiene el literal `[MISSING]`; todos los imports del layout resuelven dentro del bundle compilado

#### Scenario: Foodit-subcategorias original del monolito no modificado

- **WHEN** se compara `components/layouts/Foodit-subcategorias/` antes y después de la migración
- **THEN** los archivos del monolito son idénticos a su estado previo

### Requirement: Secuencia de migración layouts → card de scope → componentes
La migración SHALL seguir el orden: (1) layouts al bundle MX, (2) card de scope que delimita features y `components/private/` en juego para cada layout, (3) migración de componentes. Los componentes no SHALL migrarse antes de tener ambos layouts en el bundle.

#### Scenario: Card de scope creada post-layout
- **WHEN** ambos layouts están en `apps/foodit-mx/components/layouts/`
- **THEN** existe una card (task o documento) que lista los features y archivos de `components/private/` en scope para cada layout, tomando `docs/migrate-mx/private-components/audit.md` como fuente de verdad

#### Scenario: Componentes no presentes antes de layouts
- **WHEN** se verifica el bundle MX antes de completar la migración de layouts
- **THEN** `apps/foodit-mx/components/features/` y `apps/foodit-mx/components/private/` están vacíos o solo contienen archivos explícitamente autorizados por card de scope
