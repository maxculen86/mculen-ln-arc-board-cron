## Why

La sección `/recetas` de Foodit está actualmente embebida en el bundle monolítico `Arc`. Extraerla como Micro Experience (MX) en Arc XP le da un ciclo de release, escalado y rollback completamente independiente del monolito, en línea con la estrategia MX-por-sección de la organización. Es el primer MX de sección; sirve de piloto antes de escalar el patrón a otros paths.

## Repos de referencia (contexto local)

Estos paths son del entorno local del autor de la change y se persisten para que `design.md`, `specs/` y `tasks.md` puedan ir a buscar contexto adicional sin reconstruir la ubicación:

-   **Repo de trabajo (este repo, monolito `Arc`)**: `~/p/ln/Contenidos/`
-   **Bundle MX de referencia (read-only, ya en producción para otra sección)**: `~/p/ln/lanacion-arcxp-mx/apps/lanacion-arcxp-mx/`

El bundle de referencia es la fuente canónica para estructura de `apps/foodit-mx/` (webpack config, properties, environment, arc.config.json, deployer.js). No se modifica; solo se lee.

## What Changes

### Prerequisito: habilitar Nx en el repo `Arc`

-   Integrar Nx en el monorepo `Arc` para poder gestionar `apps/foodit-mx/` como proyecto independiente con targets propios (build, deploy, test) sin romper los proyectos existentes
-   Habilitar Nx incluye configurar el soporte para `libs/` como carpeta raíz de librerías compartidas: `tsconfig.base.json` con path aliases (`@ln/arc-<lib-name>` → `libs/<lib-name>/src/index.ts`) y la regla `@nx/enforce-module-boundaries` en ESLint para que los bundles solo consuman libs a través de su API pública

### Bundle MX `apps/foodit-mx/`

-   El bundle se crea con `fusion init` dentro de `apps/foodit-mx/`, generando una app Fusion en blanco como punto de partida
-   Luego del scaffold: ajustar `package.json` name a `foodit-mx-1.0.0` y mxId `foodit-mx` (MVP1: sección `/recetas`; estructura pensada para escalar al sitio Foodit completo)
-   Adaptar `webpack.config.js` generado: sites `["foodit"]`, entries SCSS y plugins equivalentes al bundle de referencia
-   Agregar `properties/sites/foodit.js` y ajustar `environment/index.js` para que Fusion arranque con el site Foodit
-   Agregar las 54 dependencias `@ln/*` pinneadas sin rangos (ver `docs/migrate-mx/ln-packages/package-json-snippet.json`)
-   Agregar `.npmrc`, `.nvmrc`, `arc.config.json` propios del bundle

### Script de routing MX para PageBuilder

-   Script que apunta el path `/recetas` en PageBuilder al nuevo bundle MX (`foodit-mx-1.0.0`) activando el MX Router
-   El mismo script permite **dar de baja** el ruteo (rollback: vuelve a servir `/recetas` desde el monolito `Arc`)
-   Prerequisito: el mxId `foodit-mx` debe estar provisionado en Arc (US #173238)

### Estrategia de deploy progresivo (blank deploy)

El go-live no es un big-bang. El bundle se va construyendo en capas verificables, con un **checkpoint humano** entre cada capa: el avance solo continúa cuando una persona valida que la capa anterior está correcta en local antes de promover. Esto evita acumular errores y reduce la fatiga de revisión al acotar el scope de cada verificación.

1. **Output-type solo**: deploy del bundle con únicamente el output-type `foodit.jsx` adaptado (`deployment()` → `pagebuilderURL()`); el path `/recetas` queda enrutado al MX pero renderiza una página mínima
    - ✋ **Checkpoint**: validar en local que el output-type compila y sirve HTTP 200 antes de continuar
2. **Layouts**: se agregan los dos layouts migrados:
    - `Foodit-acumulado` (duplicación estratégica) → sirve el listado `/recetas`
    - `Foodit-ficha-receta` → sirve la ficha `/recetas/<*-nid>`
    - ✋ **Checkpoint**: validar en local que ambos layouts renderizan sin errores JS ni CSS rotos antes de continuar
3. **Componentes progresivos**: se van sumando features, chains y componentes internos de cada layout hasta cubrir el template completo. El orden surge de la card de scope: primero los archivos de `components/private/` auditados que cada layout necesita, luego las features correspondientes
    - ✋ **Checkpoint**: validar en local que cada bloque de componentes agrega renders coherentes (sin regresiones visuales) antes de continuar
4. **Conexión con PageBuilder**: content sources conectados, datos reales fluyendo desde los 10 sources migrados
    - ✋ **Checkpoint final**: validar render end-to-end en sandbox con datos reales antes de promover a staging/prod

### Migración de componentes y contenido

El orden de migración es **layouts primero, luego los componentes** que cada layout requiere. Solo después de tener los layouts en el bundle se levanta una card para acotar qué features y archivos de `components/private/` se relevan del audit para esos layouts específicos. Esta change define la estrategia y produce las cards; el relevamiento detallado ocurre en las tasks derivadas.

#### Layouts

La sección `/recetas` tiene dos rutas con layouts distintos:

| Ruta                                   | Layout de origen                          | Estrategia                                                                                                                                      |
| -------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `/recetas` (listado/acumulado)         | `components/layouts/Foodit-acumulado/`    | Duplicación estratégica: se copia el layout al bundle y se adapta para servir solo el path `/recetas`; no se reutiliza el original del monolito |
| `/recetas/<*-nid>` (ficha de artículo) | `components/layouts/Foodit-ficha-receta/` | Copia directa al bundle con adaptaciones mínimas                                                                                                |

> **Por qué duplicación estratégica en `Foodit-acumulado`**: el layout original del monolito puede evolucionar de forma independiente; una copia desacoplada en el bundle MX permite iterar `/recetas` sin riesgo de regresión en otras secciones que usen el mismo layout en el monolito.

#### Componentes (features + private)

-   **Después de migrar los layouts**: se crea una card que delimita qué features y archivos de `components/private/` están en scope para cada layout migrado, usando `docs/migrate-mx/private-components/audit.md` como fuente de verdad
-   Los 59 archivos del audit son el universo máximo; el scope real se acota por layout en la card correspondiente
-   **Evaluación de código compartido**: antes de copiar, el dev analiza si el componente es core/común. Si lo es, se extrae a `libs/*` en lugar de copiarse (ver sección anterior)

#### Content sources

-   Migración de 10 content sources + utils transitivos y filtros de Foodit (ver `docs/migrate-mx/content-sources/audit.md`)

### Libs compartidas entre bundles (`libs/`)

El repo `Arc` actualmente tiene un único bundle con mxId `default`. Al agregar `foodit-mx`, dos bundles distintos coexistirán en el mismo monorepo. Durante la migración de componentes puede descubrirse que ciertos helpers, utils o componentes son utilizados por ambos sitios. En ese escenario copiarlos en cada bundle genera deuda técnica; la solución es extraerlos como librerías compartidas en `libs/`.

#### Estructura de `libs/` en el monorepo

```
libs/
  shared/          # código consumible por cualquier bundle
    ui/            # componentes presentacionales sin lógica de negocio
    util/          # funciones puras, helpers, formatters
    data-access/   # clientes de API, content source utils compartidos
  foodit/          # código compartido específico de Foodit (si aplica)
```

Cada lib tiene:

-   `src/index.ts` — punto de entrada y API pública (solo se exporta lo necesario)
-   `project.json` — configuración Nx con targets `build`, `lint`, `test`
-   El bundle consumidor importa via alias: `import { X } from '@ln/arc-shared-util'`

#### Generator Nx local para scaffoldear libs

Para garantizar consistencia y evitar configuración manual, se crea un **generator local** en `tools/generators/ln-arc-lib/` que wrappea `@nx/js:lib` con las convenciones del monorepo:

```
tools/
  generators/
    ln-arc-lib/
      generator.ts      # lógica: llama @nx/js:lib + configura importPath, tags, tsconfig
      schema.json       # opciones: name, scope (shared|foodit), type (ui|util|data-access)
      files/            # templates EJS para README, index.ts, .eslintrc
```

Uso:

```bash
npx nx g ln-arc-lib --name=format-date --scope=shared --type=util
# genera libs/shared/format-date/ con project.json, src/index.ts y
# agrega el path alias en tsconfig.base.json automáticamente
```

El generator registra el path alias en `tsconfig.base.json` para que tanto `apps/` (bundle `default`) como `apps/foodit-mx/` puedan importar la lib sin configuración adicional.

#### Cuándo usar `libs/` vs copiar

| Criterio                                                                     | Acción                                    |
| ---------------------------------------------------------------------------- | ----------------------------------------- |
| Código usado solo en Foodit, único bundle                                    | Copiar al bundle `foodit-mx` directamente |
| Código compartido entre `default` y `foodit-mx`                              | Extraer a `libs/shared/`                  |
| Código compartido solo entre features de Foodit en distintos bundles futuros | Extraer a `libs/foodit/`                  |

> **Nota**: La evaluación ocurre durante la migración de componentes (card de scope post-layout). Esta change define el framework; la extracción concreta a `libs/` se documenta en las tasks derivadas cuando se identifica cada caso.

### Pipeline de deploy local (MVP1)

-   `deployer.js` con flags `--sandbox/--st/--prod/--use-mxid` para build → upload → deploy → promote ejecutado **manualmente desde local**
-   `.env.example` con las variables requeridas para cada entorno
-   La integración CI/CD en Azure DevOps queda fuera de scope de esta feature; se abordará en una feature posterior

## Capabilities

### New Capabilities

-   `nx-integration`: Integración de Nx en el monorepo `Arc` para gestionar `apps/foodit-mx/` como proyecto independiente con targets build/deploy/test propios.
-   `mx-bundle-structure`: Estructura del bundle MX — directorios, `package.json`, `arc.config.json`, `webpack.config.js`, `properties/sites/foodit.js`, `environment/`, `.npmrc`, `.nvmrc` y SCSS entries. Requisitos mínimos para compilar y servir el site `foodit`.
-   `mx-routing-script`: Script de activación/desactivación del MX Router en PageBuilder para el path `/recetas`. Cubre tanto el go-live como el rollback al monolito.
-   `foodit-layout-migration`: Estrategia de migración de layouts para `/recetas`. Define los dos layouts involucrados (`Foodit-acumulado` para el listado, `Foodit-ficha-receta` para ficha), la justificación de duplicación estratégica y la secuencia layouts → card de scope → componentes.
-   `foodit-component-copy`: Componentes Foodit para `/recetas` — features, chains, output-types y archivos de `components/private/` acotados por card de scope post-layout. Define qué se incluye, qué adaptaciones requiere, la evaluación copia-vs-lib para cada archivo y la secuencia de deploy progresivo (output-type → layout → componentes → conexión con PB).
-   `monorepo-shared-libs`: Estructura `libs/` en el monorepo (shared/ui, shared/util, shared/data-access, foodit/), generator local `ln-arc-lib` en `tools/generators/ln-arc-lib/` para scaffoldear libs con convenciones del repo (importPath `@ln/arc-<name>`, tags, path alias en `tsconfig.base.json`), y criterio copia-vs-lib para decidir en qué caso extraer vs copiar al bundle.
-   `content-source-migration`: Content sources, utils transitivos y filtros de Foodit que el bundle MX necesita. Define los 10 sources requeridos y que los no incluidos se excluyen vía `excludeModules: "*"` en `arc.config.json`.
-   `mx-deployer`: Script de deploy local (`deployer.js`) con `--use-mxid`, `.env.example` y variables de entorno por ambiente. CI/CD fuera de scope de esta feature.

### Modified Capabilities

_(ninguna — esta change no altera requisitos de specs existentes)_

## Impact

-   **Código nuevo**: `apps/foodit-mx/` — carpeta nueva dentro del monolito; no se modifica código existente
-   **Nx**: configuración Nx agregada al raíz del monolito (`nx.json`, `project.json` en `apps/foodit-mx/`); `tsconfig.base.json` con path aliases para `libs/`; regla `@nx/enforce-module-boundaries` en ESLint
-   **`libs/`**: carpeta nueva en raíz del monorepo; cada lib extraída tiene su propio `project.json` y `src/index.ts`
-   **`tools/generators/ln-arc-lib/`**: generator local para scaffoldear libs; no afecta código existente
-   **Script de routing**: script nuevo (fuera del bundle) que modifica la configuración del MX Router en PageBuilder; requiere credenciales de Arc con permisos de routing
-   **Componentes del monolito**: solo lectura para copiar; los originales no se tocan
-   **`components/output-types/`**: el output-type `foodit.jsx` del bundle MX es una copia adaptada; el del monolito no se modifica
-   **`.fusion/`**: no se modifica
-   **Dependencias**: 54 paquetes `@ln/*` ya usados en el monolito (ver `docs/migrate-mx/ln-packages/`); se agregan al `package.json` del bundle, no al raíz
-   **Provisioning Arc**: requiere que el mxId `foodit-mx` esté registrado antes del primer deploy (US #173238 — fuera de scope de esta change)
-   **Documentación de auditoría**: los docs en `docs/migrate-mx/` son fuentes de verdad para specs y tasks
