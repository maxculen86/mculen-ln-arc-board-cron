# Tasks — foodit-recetas-mx

> **ADO Feature**: [173242 — MX Recetas — Extracción del código de recetas y armado del bundle MX](https://dev.azure.com/lndigital/_workitems/edit/173242) > **Area Path**: `Gestion LANACION-ARC\Arquitectura\Frontend` > **Iteration Path**: `Gestion LANACION-ARC\2026 - Q2\Mayo`

---

## Roadmap de implementación

Las fases deben ejecutarse **en orden secuencial salvo donde se indica "paralelo"**.
El criterio es el deploy progresivo con checkpoints definido en D5 del `design.md`.

```
Fase 1 — Monorepo Nx [secuencial]
  ↓
Fase 2 — Bundle MX: inicialización base [secuencial, incluye output-type]
  ↓
Fase 3 — Layout migration [secuencial]
  ↓
Fase 4 — Scope card + Common foundation + Component copy
  ├── Fase 4a:  Scope card (post-layout)
  ├── Fase 4b:  libs/ + ln-arc-lib generator [paralelo con 4a]
  ├── Fase 4cf: COMMON FOUNDATION — piso compartido [posterior a 4a/4b · BLOQUEANTE]
  │              ├─ Tier 0a: breadcrumb + IconSprite + utils  ✓ hecho
  │              └─ Tier 0b: BaseLayout shell (134) + UserBookmarks  ✓ copiado (render: dev)
  ├── Fase 4c:  Bloque Ficha-Receta (features de ficha)   ┐
  ├── Fase 4d:  Bloque Acumulado (AcuTema, TagCategories)  ├─ paralelos DESPUÉS de 4cf
  ├── Fase 4e:  Fork Subcategorías                         ┘
  └── Fase 4ot: Output-type — migrar cluster (121) + swap stub→real [cierra Fase 4]
  ↓
Fase 5 — Deployer script [secuencial]
  ↓
Fase 6 — Content sources + conexión PageBuilder [secuencial]
  ↓
Fase 7 — Validación integral local [secuencial]
  ↓
Fase 8 — Routing script MX [secuencial, último]
```

**Notas de secuencia críticas:**

-   El output-type (`foodit.jsx`) se adapta junto con la inicialización del bundle (Fase 2), ANTES de migrar layouts.
-   Los layouts se migran ANTES de definir el scope card de componentes.
-   La copia de `components/private/` y features va EN PARALELO con la creación de `libs/` para poder decidir copy-vs-lib por archivo en tiempo real.
-   El deployer se implementa DESPUÉS de que el bundle compila localmente con componentes, ANTES de conectar content sources (deploy progresivo a sandbox primero).
-   El routing script va al FINAL (Fase 8), una vez que el bundle está deployado y validado.

> **📋 Plan de paralelización post-4c**: ver [`docs/migrate-mx/parallelization-plan.md`](../../../docs/migrate-mx/parallelization-plan.md). Resumen: 4 streams de código arrancan en paralelo (A=4ot, B=Fase 5 deployer, C=Fase 6.1-6.7 content sources, D=Fase 8.1-8.3 routing script); convergen en Fase 7 (validación integral, JOIN); luego 6.9 + 8.4-8.5 quedan gateadas por deploy. Única zona de roce: `components/private/common/utils/` (idempotente). Prioridad: B (deployer) primero.

---

## ADO: US existentes — revisión

| US ADO                                                           | Título actual                                                 | Acción      | Justificación                                                                                                                                                                                      |
| ---------------------------------------------------------------- | ------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [173245](https://dev.azure.com/lndigital/_workitems/edit/173245) | Copiar foodit.jsx y migrar deployment() a pagebuilderURL()    | **KEEP**    | Cubre exactamente el requisito de output-type del spec `foodit-component-copy`. Asignar a Fase 2.                                                                                                  |
| [173246](https://dev.azure.com/lndigital/_workitems/edit/173246) | Configurar package.json con @ln/\* pinneados y .npmrc         | **KEEP**    | Alineada con spec `mx-bundle-structure`. Asignar a Fase 2.                                                                                                                                         |
| [173247](https://dev.azure.com/lndigital/_workitems/edit/173247) | Configurar variables de entorno y secrets de Foodit           | **KEEP**    | Alineada con spec `mx-bundle-structure`. Asignar a Fase 2.                                                                                                                                         |
| [173248](https://dev.azure.com/lndigital/_workitems/edit/173248) | Configurar Webpack entries solo para site foodit y SCSS       | **KEEP**    | Alineada con spec `mx-bundle-structure`. Asignar a Fase 2.                                                                                                                                         |
| [173243](https://dev.azure.com/lndigital/_workitems/edit/173243) | Copiar features, chains **y layouts** de Foodit al bundle MX  | **REFINAR** | Demasiado amplia: mezcla layout migration + component copy. Renombrar a "features y chains" (sin layouts); layouts pasan a US-NEW-3. Separar también el copy en bloques (ver US-NEW-5 y US-NEW-6). |
| [173244](https://dev.azure.com/lndigital/_workitems/edit/173244) | Copiar y configurar content sources de Foodit                 | **KEEP**    | Cubre spec `content-source-migration`. Agregar referencia a `docs/migrate-mx/content-sources/audit.md` en descripción y sub-tarea explícita de análisis transitivo. Asignar a Fase 6.              |
| [173249](https://dev.azure.com/lndigital/_workitems/edit/173249) | Validar que el bundle MX compila y renderiza recetas en local | **KEEP**    | Es el checkpoint final de D5. Asignar a Fase 7.                                                                                                                                                    |

---

## ADO: Nuevas User Stories propuestas

### US-NEW-1: Integrar Nx en el monorepo Contenidos

**Título**: Integrar Nx en el monorepo Contenidos sin romper el bundle default

**Descripción**:
Instalar Nx como orchestrator en el monorepo para habilitar el multi-app approach de `apps/`. Crear `nx.json` en raíz, `project.json` para el bundle `default` existente y `apps/foodit-mx/`. Configurar `tsconfig.base.json` con path aliases (`@ln/arc-<name>`) para las futuras libs. Agregar la regla ESLint `@nx/enforce-module-boundaries` para prevenir imports cross-app.

**Criterios de aceptación**:

-   [x] `nx.json` presente en raíz con configuración base
-   [x] `project.json` creado para el bundle `default` con targets `build`, `lint`, `test`
-   [x] `project.json` creado para `apps/foodit-mx/` con tags `type:app` y `scope:foodit`
-   [x] `tsconfig.base.json` en raíz con sección `paths` lista para recibir aliases de libs
-   [x] Regla `@nx/enforce-module-boundaries` configurada: `{ sourceTag: "type:app", notDependOnLibsWithTags: ["type:app"] }`
-   [x] `npm run build-dev` del bundle default completa sin errores post-Nx
-   [x] ESLint reporta error si un archivo de `apps/foodit-mx/` intenta importar desde `apps/` (otro bundle)

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `arq; mx-recetas`

---

### US-NEW-2: Inicializar bundle apps/foodit-mx con fusion init

**Título**: Inicializar bundle apps/foodit-mx con `fusion init` y configurar estructura base

**Descripción**:
Ejecutar `fusion init` en el directorio `apps/foodit-mx/` para generar la estructura base de la app Fusion. Configurar `arc.config.json` con `mxId: "foodit-mx"`, `package.json` con `name: "foodit-mx-1.0.0"`, y `arc.config.json` con `excludeModules: "*"` para evitar empaquetar content sources fuera de scope. Crear `.nvmrc` con Node v22.

**Criterios de aceptación**:

-   [x] Existen los directorios `.fusion/`, `components/`, `content/`, `environment/` en `apps/foodit-mx/`
-   [x] `arc.config.json` tiene `mxId: "foodit-mx"` y configuración `excludeModules: "*"` o equivalente
-   [x] `package.json` tiene `name: "foodit-mx-1.0.0"`
-   [x] `.nvmrc` especifica Node 22
-   [x] `fusion start` arranca en `apps/foodit-mx/` sin errores de inicialización (aún sin componentes)

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `arq; mx-recetas`

---

### US-NEW-3: Migrar layouts Foodit-acumulado y Foodit-ficha-receta al bundle MX

**Título**: Migrar layouts Foodit-acumulado y Foodit-ficha-receta al bundle MX con adaptaciones mínimas

**Descripción**:
Copiar ambos layouts al bundle MX siguiendo la estrategia del `design.md` (D3): `Foodit-acumulado` como fork estratégico (comentario de cabecera con path de origen y fecha), `Foodit-ficha-receta` como copia directa con adaptaciones de imports/paths. Los originales del monolito NO deben ser modificados. Esta US desbloquea la creación del scope card de componentes.

**Criterios de aceptación**:

-   [x] `apps/foodit-mx/components/layouts/Foodit-acumulado/` existe con comentario de fork en cabecera
-   [x] `apps/foodit-mx/components/layouts/Foodit-ficha-receta/` existe con adaptaciones de imports
-   [x] `git diff HEAD -- components/layouts/` en el monolito no muestra modificaciones
-   [x] `fusion start` en `apps/foodit-mx/` con ambos layouts presentes levanta sin errores
-   [ ] `/recetas` responde HTTP 200 con `Foodit-subcategorias` en local _(pendiente Fase 6: content sources. **Corrección no-swap**: el layout productivo de `/recetas` es `Foodit-subcategorias`, NO `Foodit-acumulado` — sin swap en PageBuilder)_
-   [ ] `/recetas/<slug-nid>` responde HTTP 200 con `Foodit-ficha-receta` en local _(pendiente Fase 6: content sources)_

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `dev; mx-recetas`

---

### US-NEW-4: Crear scope card de componentes por layout

**Título**: Levantar scope card de features y components/private/ en juego por layout

**Descripción**:
Post-layout migration, crear un documento de scope card que enumere todos los features, chains y archivos de `components/private/` necesarios para cada layout (`Foodit-acumulado` y `Foodit-ficha-receta`). Usar `docs/migrate-mx/private-components/audit.md` como fuente de verdad (59 archivos auditados). Para cada archivo, marcar la decisión copy-vs-lib según el criterio del spec `monorepo-shared-libs`: (a) solo-Foodit → copiar; (b) compartido default+foodit-mx → `libs/shared/`; (c) compartido multi-bundle-foodit → `libs/foodit/`.

**Criterios de aceptación**:

-   [x] Existe documento/card (task o PR comment) listando componentes por layout → `docs/migrate-mx/private-components/scope-card.md`
-   [x] Todos los archivos tienen una decisión copy-vs-lib asignada → vía el **marco per-componente just-in-time** (no label fijo por archivo; la regla determina la decisión por categoría)
-   [x] Los bloques de copy están definidos (qué archivos van en cada bloque) → 4cf común + 4c Ficha + 4d Acumulado + 4e Subcat
-   [ ] Al menos un responsable asignado por bloque de copia _(pendiente: asignación del equipo — tabla placeholder en `scope-card.md`)_

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `arq; dev; mx-recetas`

---

### US-NEW-5: Copiar components/private/ y features — Bloque Foodit-ficha-receta

**Título**: Copiar components/private/ y features en scope de Foodit-ficha-receta al bundle MX

**Descripción**:
Tomar la lista de la scope card (US-NEW-4) correspondiente al layout `Foodit-ficha-receta`. Para cada archivo marcado como "copiar": copiar a `apps/foodit-mx/components/` con imports relativos adaptados. Para cada archivo marcado "extraer a lib": crear la lib con `ln-arc-lib` y consumirla por alias. Validar que `Foodit-ficha-receta` renderiza una ficha completa en local sin `[MISSING]`.

**Sub-tareas**:

-   Copiar archivos `components/private/` del bloque Ficha-Receta
-   Copiar features del bloque Ficha-Receta
-   Verificar que no hay componentes del bloque en el monolito modificados
-   Checkpoint local: `/recetas/<slug>` renderiza sin `[MISSING]` ni errores JS

**Criterios de aceptación**:

-   [ ] Todos los archivos del bloque Ficha-Receta presentes en `apps/foodit-mx/` (copia o lib)
-   [ ] Ningún archivo del monolito fue modificado (`git diff` limpio en `components/`)
-   [ ] `Foodit-ficha-receta` renderiza en local sin componentes `[MISSING]`
-   [ ] Evaluación copy-vs-lib documentada en PR o comentario para cada archivo del bloque

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `dev; mx-recetas`

---

### US-NEW-6: Copiar components/private/ y features — Bloque Foodit-acumulado

**Título**: Copiar components/private/ y features en scope de Foodit-acumulado al bundle MX

**Descripción**:
Tomar la lista de la scope card (US-NEW-4) correspondiente al layout `Foodit-acumulado`. Para cada archivo: copiar o extraer a lib según la decisión. Incorporar también features y chains compartidos entre ambos layouts (identificados en US-NEW-4) que no fueron incluidos en el bloque Ficha-Receta. Validar que `Foodit-acumulado` renderiza en local sin `[MISSING]`.

**Sub-tareas**:

-   Copiar archivos `components/private/` del bloque Acumulado
-   Copiar features y chains del bloque Acumulado (incluye componentes compartidos entre layouts)
-   Checkpoint local: `/recetas` renderiza sin `[MISSING]` ni errores JS
-   Validar que no hay regresiones en `Foodit-ficha-receta` (render coherente post-bloque-Acumulado)

**Criterios de aceptación**:

-   [ ] Todos los archivos del bloque Acumulado presentes en `apps/foodit-mx/` (copia o lib)
-   [ ] Ningún archivo del monolito fue modificado
-   [ ] `Foodit-acumulado` renderiza en local sin componentes `[MISSING]`
-   [ ] `Foodit-ficha-receta` sigue renderizando sin regresiones
-   [ ] Evaluación copy-vs-lib documentada para cada archivo del bloque

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `dev; mx-recetas`

---

### US-NEW-7: Configurar estructura libs/ y generator ln-arc-lib

**Título**: Crear estructura libs/ y generator ln-arc-lib en el monorepo

**Descripción**:
Crear los directorios base `libs/shared/{ui,util,data-access}/` y `libs/foodit/` en la raíz del monorepo. Implementar el generator Nx `ln-arc-lib` en `tools/generators/ln-arc-lib/` que scaffoldea libs con `importPath: "@ln/arc-<name>"`, tags `scope:<scope>` y `type:<type>`, y actualiza automáticamente `tsconfig.base.json` con el path alias de la nueva lib. Las libs son buildable pero no publishable.

**Criterios de aceptación**:

-   [x] Existen los directorios `libs/shared/ui/`, `libs/shared/util/`, `libs/shared/data-access/`, `libs/foodit/`
-   [x] `npx nx g ln-arc-lib --name=test-lib --scope=shared --type=util` genera `libs/shared/util/test-lib/` con `src/index.ts` y `project.json`
-   [x] `project.json` generado tiene `importPath: "@ln/arc-test-lib"` y tags `["scope:shared", "type:util"]`
-   [x] `tsconfig.base.json` incluye el path alias `@ln/arc-test-lib` automáticamente tras generar la lib
-   [x] `project.json` NO contiene `publishable: true` ni configuración de npm publish
-   [x] Un archivo en `apps/foodit-mx/` puede importar `@ln/arc-test-lib` y ESLint no reporta boundary violation

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `arq; dev; mx-recetas`

---

### US-NEW-8: Implementar deployer.js para deploy manual del bundle MX

**Título**: Implementar ./scripts/deployer.js para deploy manual del bundle foodit-mx

**Descripción**:
Crear `./scripts/deployer.js` (en el repo Contenidos) con soporte para flags `--sandbox`, `--st`, `--prod` y `--use-mxid`. La secuencia de deploy es build → upload → deploy → promote, con el `mxId "foodit-mx"` incluido cuando se usa `--use-mxid`. Crear `apps/foodit-mx/.env.example` con todas las variables de entorno requeridas por entorno (sandbox/staging/prod). CI/CD en ADO está **explícitamente fuera de scope de MVP1**.

**Criterios de aceptación**:

-   [ ] `./scripts/deployer.js` existe y está comiteado en el repo
-   [ ] `node ./scripts/deployer.js --sandbox --use-mxid` ejecuta la secuencia build→upload→deploy→promote apuntando al entorno sandbox del bundle MX
-   [ ] El script termina con error descriptivo si falta alguna variable de entorno requerida
-   [ ] `apps/foodit-mx/.env.example` lista credenciales Arc, endpoint API, mxId, y valores placeholder por sección de entorno
-   [ ] NO se crea ningún pipeline ADO nuevo como parte de esta US
-   [ ] `azure-pipeline.yml` no es modificado

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `arq; dev; mx-recetas`

---

### US-NEW-9: Implementar script de routing MX para /recetas

**Título**: Implementar script de routing MX que activa/desactiva el bundle foodit-mx para /recetas

**Descripción**:
Crear `./scripts/mx-routing.js` que puede activar o desactivar el MX Router en PageBuilder para el path `/recetas` → bundle `foodit-mx-1.0.0`. El script debe verificar que el `mxId "foodit-mx"` esté provisionado en Arc antes de activar. El rollback solo cambia el routing (no borra el bundle deployado). Cada operación genera un log con path, bundle target, timestamp y usuario/token.

**Criterios de aceptación**:

-   [ ] `./scripts/mx-routing.js` existe y está comiteado en el repo
-   [ ] Ejecutar con flag de activación enruta `/recetas` a `foodit-mx-1.0.0` en PageBuilder
-   [ ] Ejecutar con flag de desactivación revierte el routing a `default`; el bundle MX permanece deployado
-   [ ] Si `mxId "foodit-mx"` no está provisionado, el script termina con error descriptivo antes de ejecutar cambios
-   [ ] Cada ejecución genera log con: path, bundle resultante, timestamp, usuario/token

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `arq; dev; mx-recetas`

---

## Tabla de US — campo-a-campo para ADO

| #   | US       | Acción ADO                                                                              | Título para ADO                                                                  | Tags                   |
| --- | -------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------- |
| 1   | US-NEW-1 | Crear nueva                                                                             | Integrar Nx en el monorepo Contenidos sin romper el bundle default               | `arq; mx-recetas`      |
| 2   | US-NEW-2 | Crear nueva                                                                             | Inicializar bundle apps/foodit-mx con `fusion init` y configurar estructura base | `arq; mx-recetas`      |
| 3   | 173245   | Mantener, reasignar a Fase 2                                                            | (sin cambios)                                                                    | `dev; mx-recetas`      |
| 4   | 173246   | Mantener, reasignar a Fase 2                                                            | (sin cambios)                                                                    | `arq; mx-recetas`      |
| 5   | 173247   | Mantener, reasignar a Fase 2                                                            | (sin cambios)                                                                    | `arq; mx-recetas`      |
| 6   | 173248   | Mantener, reasignar a Fase 2                                                            | (sin cambios)                                                                    | `dev; mx-recetas`      |
| 7   | US-NEW-3 | Crear nueva                                                                             | Migrar layouts Foodit-acumulado y Foodit-ficha-receta al bundle MX               | `dev; mx-recetas`      |
| 8   | US-NEW-4 | Crear nueva                                                                             | Levantar scope card de features y components/private/ en juego por layout        | `arq; dev; mx-recetas` |
| 9   | US-NEW-7 | Crear nueva                                                                             | Crear estructura libs/ y generator ln-arc-lib en el monorepo                     | `arq; dev; mx-recetas` |
| 10  | 173243   | **Refinar** título a: "Copiar features y chains de Foodit para recetas/\* al bundle MX" | Quitar "layouts" del scope                                                       | `dev; mx-recetas`      |
| 11  | US-NEW-5 | Crear nueva                                                                             | Copiar components/private/ y features — Bloque Foodit-ficha-receta               | `dev; mx-recetas`      |
| 12  | US-NEW-6 | Crear nueva                                                                             | Copiar components/private/ y features — Bloque Foodit-acumulado                  | `dev; mx-recetas`      |
| 13  | US-NEW-8 | Crear nueva                                                                             | Implementar ./scripts/deployer.js para deploy manual del bundle MX               | `arq; dev; mx-recetas` |
| 14  | 173244   | Mantener, agregar ref a audit.md en descripción                                         | (sin cambios en título)                                                          | `dev; mx-recetas`      |
| 15  | 173249   | Mantener, reasignar a Fase 7                                                            | (sin cambios)                                                                    | `dev; mx-recetas; QA`  |
| 16  | US-NEW-9 | Crear nueva                                                                             | Implementar script de routing MX que activa/desactiva /recetas para foodit-mx    | `arq; dev; mx-recetas` |

---

## 1. Nx & Monorepo Foundation

> **Spec**: `nx-integration` | **US ADO**: US-NEW-1

-   [x] 1.1 Instalar `nx` como devDependency en `package.json` raíz y generar `nx.json` base
-   [x] 1.2 Crear `project.json` para el bundle `default` con targets `build`, `lint`, `test`
-   [x] 1.3 Crear `apps/foodit-mx/project.json` con tags `type:app`, `scope:foodit`
-   [x] 1.4 Crear `tsconfig.base.json` en raíz con sección `paths` vacía (lista para aliases de libs)
-   [x] 1.5 Configurar regla ESLint `@nx/enforce-module-boundaries` en `.eslintrc.js` raíz
-   [x] 1.6 Smoke test: `npm run build-dev` del bundle default completa sin errores
-   [x] 1.7 Smoke test ESLint: import cross-app en test file es detectado como boundary violation

## 2. Bundle MX: Inicialización base + output-type + configuración

> **Spec**: `mx-bundle-structure`, `foodit-component-copy` (output-type) | **US ADO**: US-NEW-2, 173245, 173246, 173247, 173248

-   [x] 2.1 Ejecutar `fusion init` en `apps/foodit-mx/` (estructura base generada)
-   [x] 2.2 Editar `arc.config.json`: establecer `mxId: "foodit-mx"`, agregar `excludeModules: "*"`
-   [x] 2.3 Editar `package.json`: `name: "foodit-mx-1.0.0"`
-   [x] 2.4 Crear `.nvmrc` con `22`
-   [x] 2.5 Configurar `apps/foodit-mx/webpack.config.js` con `sites: ["foodit"]` y SCSS entries de Foodit
-   [x] 2.6 Crear `apps/foodit-mx/properties/sites/foodit.js` copiado del monolito y adaptado
-   [x] 2.7 Configurar `apps/foodit-mx/environment/index.js` para site `foodit`
-   [x] 2.8 Copiar las 54 dependencias `@ln/*` de `docs/migrate-mx/ln-packages/package-json-snippet.json` al `package.json` del bundle MX con versiones pinneadas (sin `^` ni `~`)
-   [x] 2.9 Crear `.npmrc` apuntando al registry privado para paquetes `@ln/*`
-   [x] 2.10 Configurar `apps/foodit-mx/environment/` con variables y secrets de Foodit (sandbox y prod)
-   [x] 2.11 Copiar `components/output-types/foodit.jsx` del monolito a `apps/foodit-mx/components/output-types/foodit.jsx`
-   [x] 2.12 Reemplazar todas las llamadas `deployment()` por `pagebuilderURL()` en el output-type del bundle MX
    > ⚠️ El output-type adaptado está en `foodit.full.jsx`. Un stub mínimo ocupa `foodit.jsx` para el checkpoint 2.14.
    > El swap stub→real ocurre al finalizar Fase 4 (todos los imports de `foodit.full.jsx` resuelven). Los warnings ESLint
    > en `foodit.full.jsx` son el manifest exacto de componentes que Fase 4 debe copiar.
-   [x] 2.13 Verificar que el output-type del monolito no fue modificado (`git diff` limpio en `components/output-types/`)
-   [x] 2.14 Checkpoint: `fusion start` en `apps/foodit-mx/` con solo el output-type → `/recetas` responde HTTP 200
    > **Corrección**: responde HTTP 500 `Could not find source: sectionSource` porque la DB sandbox ya tiene la ruta `/recetas` configurada con layout + content source. El bundle levanta, Fusion despacha la ruta y el output-type se invoca correctamente. El 200 se alcanza en Fase 6 una vez migrados los content sources.

## 3. Layout Migration

> **Spec**: `foodit-layout-migration` | **US ADO**: US-NEW-3

-   [x] 3.1 Copiar `components/layouts/Foodit-acumulado/` al bundle MX como fork estratégico (agregar comentario de cabecera con path de origen y fecha)
-   [x] 3.2 Copiar `components/layouts/Foodit-ficha-receta/` al bundle MX con adaptaciones mínimas (imports relativos, registro del layout)
-   [x] 3.3 Verificar que los originales del monolito no fueron modificados (`git diff -- components/layouts/` limpio)
-   [x] 3.4 Checkpoint: `fusion start` en `apps/foodit-mx/` con ambos layouts → levanta sin errores, output-type MX invocado correctamente. HTTP 500 en `/recetas` esperado (content sources pendientes — Fase 6)

## 4a. Scope Card: auditoría de componentes por layout

> **Spec**: `foodit-layout-migration`, `foodit-component-copy` | **US ADO**: US-NEW-4
>
> **Dependencias y aclaraciones (post-restructure):**
>
> - **4a.2 alimenta a `4cf.8`** (auditoría del cierre de `BaseLayout`): el cierre por layout que produce 4a.2 es el input para escopear el Tier 0b. 4a debe correr **antes o junto con** el inicio de 4cf.
> - **4a.3 (copy-vs-lib) ya está resuelto a nivel global → COPIAR.** El escenario de 2 bundles (`default` + `foodit-mx`) descarta extraer a `libs/` (Fusion no consume aliases; el sharing real va por packages `@ln/*` publicados). Ver [`docs/migrate-mx/libs-strategy/fusion-libs-resolution.md`](../../../docs/migrate-mx/libs-strategy/fusion-libs-resolution.md). 4a.3 se reduce a confirmar la lista, no a decidir.
> - **4a.5 (dos bloques) quedó superada:** la estructura real son **4cf/4c/4d/4e** (piso compartido + 3 layouts), no dos bloques Ficha/Acumulado.

-   [x] 4a.1 Abrir `docs/migrate-mx/private-components/audit.md` e identificar los 59 archivos de `components/private/` auditados _(consolidado en la auditoría cross-layout 4cf.8)_
-   [x] 4a.2 Para cada layout, listar los features y `components/private/` realmente en uso _(cierres por layout en 4cf.8: Acumulado 146 / Ficha 221 / Subcat 139; exclusivos 8/83/9; compartidos 138)_
-   [x] 4a.3 Decisión copy-vs-lib → **marco per-componente just-in-time** (Arquitectura), no label por archivo. Lean documentado: armazón→lib, exclusivos→copy, hojas-congeladas→copy. Ver `scope-card.md`
-   [x] 4a.4 Documento de scope card creado: [`docs/migrate-mx/private-components/scope-card.md`](../../../docs/migrate-mx/private-components/scope-card.md)
-   [x] 4a.5 Bloques de copy definidos → **4 bloques** (supera los 2 originales): 4cf común + 4c Ficha + 4d Acumulado + 4e Subcat

## 4b. Monorepo: estructura libs/ y generator (paralelo con 4a)

> **Spec**: `monorepo-shared-libs` | **US ADO**: US-NEW-7

-   [x] 4b.1 Crear directorios `libs/shared/ui/`, `libs/shared/util/`, `libs/shared/data-access/`, `libs/foodit/` en raíz del repo
-   [x] 4b.2 Crear el generator `tools/generators/ln-arc-lib/index.ts` con soporte para `--name`, `--scope`, `--type`
    > ⚠️ Autorado en `index.js` (no `.ts`): este workspace no tiene transpiler de generators (`@swc/core`, `ts-node`, `@swc-node/register` ausentes), así que un `.ts` no es ejecutable por `nx g`. Output y contrato idénticos. Registrado como plugin local `@ln/arc-tools` (`file:tools/generators` en `package.json` raíz) para resolver el nombre corto `nx g ln-arc-lib`.
-   [x] 4b.3 Verificar que el generator genera `src/index.ts`, `project.json` y README en el directorio correcto
-   [x] 4b.4 Verificar que `project.json` generado tiene `importPath: "@ln/arc-<name>"` y tags correctos (`scope:X`, `type:Y`)
-   [x] 4b.5 Verificar que `tsconfig.base.json` se actualiza automáticamente con el alias de la nueva lib
-   [x] 4b.6 Verificar que `project.json` NO tiene `publishable: true`
-   [ ] 4b.7 Generar la primera lib real identificada en 4a como "extraer a libs/" y validar que el import resuelve desde `apps/foodit-mx/`
    > ⏸️ BLOQUEADA por dos motivos: (1) 4a (scope card) aún no identifica una lib "real" a extraer; (2) **HALLAZGO CRÍTICO**: el bundler interno de Fusion NO resuelve los path aliases de `tsconfig.base.json` para imports de componentes (resuelve relativos + `node_modules` + `fusion:`). El boundary-check de ESLint sí lee el alias (por eso pasó con `@ln/arc-test-lib`), pero `import x from '@ln/arc-<name>'` **rompería el build de Fusion**. Consecuencia: `libs/` está validada como **tooling**, pero CONSUMIR una lib desde un bundle Fusion requiere cablear resolución de aliases (p.ej. `tsconfig-paths-webpack-plugin` en el webpack de Fusion, o publicar/symlinkear la lib a `node_modules`) y verificarlo con `fusion start`. Hasta entonces, el código compartido (ej. `get.js`, `capitalizeFirstLetter.js`) se **copia** al bundle, no se extrae a lib.

## 4cf. Common foundation — piso compartido (posterior a 4a/4b · BLOQUEANTE de 4c/4d/4e)

> **Spec**: `foodit-component-copy` | **US ADO**: (nueva — derivar de US-NEW-5/6)
> Componentes que importan **dos o más** layouts (`BaseLayout`, `breadcrumb`, `UserBookmarks`) + sus utils. Aterrizan ANTES de 4c/4d/4e para habilitar trabajo en paralelo. Fusion no resuelve aliases → todo se **copia** en rutas espejo (ver 4b).

**Tier 0a — piso liviano (sin auth/armazón) — ✓ HECHO (rama infra)**

> breadcrumb + IconSprite + utils. Verificado por cierre estático (0 unresolved); render checkpoint (`fusion start`) pendiente de validación por un dev.

-   [x] 4cf.1 `features/foodit-global/common/breadcrumb/foodit.jsx` — copiado real (reemplaza stub)
-   [x] 4cf.2 `features/foodit-global/common/breadcrumb/_helpers.js` — copiado real (`getFooditAcuTitle`, `getBreadcrumbSections`)
-   [x] 4cf.3 `features/foodit-global/common/breadcrumb/_childrens/BreadcrumbTooltip/foodit.jsx` — copiado
-   [x] 4cf.4 `components/private/common/utils/get.js` — copiado
-   [x] 4cf.5 `components/private/common/utils/capitalizeFirstLetter.js` — copiado
-   [x] 4cf.6 `private-global/common/iconSprite/IconSprite.jsx` (+`utils/getIconPath.js`) — copiado (+dep `@ln/common-ui-spriteicon`)
-   [x] 4cf.7 `__mocks__/data/fooditCategories/parentCategoryMapping.json` — copiado

**Tier 0b — piso pesado (BaseLayout shell + auth) — EPIC dedicado, NO es "reemplazar stub"**

> `BaseLayout` real = cierre transitivo de **≈134 archivos** (Header/Footer/Drawers/FloatingGroupButton/PWA/Toasts/Auth). `UserBookmarks` arrastra el árbol de auth.
>
> **Regla copy-vs-lib (Arquitectura, per-componente / just-in-time):** al migrar cada pieza decidir — solo-foodit-nuevo → copiar; compartido **congelado** → copiar; compartido que **se va a cambiar** en ambos lados → **lib `@ln/*`** (paquete node_modules vía `file:`/symlink para dev **y** prod —Fusion hornea la lib en el bundle—; publicar versionado es opcional, solo para gobernanza de versión; NO alias de tsconfig). Disparador para libificar: toparse con que hay que CAMBIAR el código compartido. Ver `design.md` Decision 4 + `docs/migrate-mx/libs-strategy/fusion-libs-resolution.md`.
> 📎 **Referencia patrón de lib**: POC Ingala (repo `lanacion-arcxp-mx`) consume libs vía **npm workspaces** (`workspaces: ["libs/*"]`, lib con `main: ./src/index.jsx`, import por nombre). Caveat: sus libs son Fusion-agnósticas (React puro); el armazón foodit está acoplado a `fusion:`/`@ln`, así que extraerlo es más pesado.

-   [x] 4cf.8 **Auditoría de cierre cross-layout** (acumulado + ficha + subcategorías): unión **238 archivos**, **138 compartidos (≥2 layouts)**. La foundation-armazón (`BaseLayout`+breadcrumb+`UserBookmarks`+`IconSprite`) cubre **134/138**. **4 GAPS detectados** (compartidos AF que el armazón no alcanza) → agregados como `4cf.11`. Conclusión: con los gaps, la foundation cubre los 138 → **paralelo seguro**.
-   [x] 4cf.9 `BaseLayout` + árbol (Header, Footer, Drawers, FloatingGroupButton, Modals/SaveRecipe, SubscribeLogin, MyAccount, MenuCategories, PWA, Toasts, emptyState/errorMessage + utils) **COPIADO** (decisión A — copia fiel, regla default; lib queda para cuando haya que cambiarlo). 124 archivos nuevos + 9 stubs/Tier0a sobrescritos; rutas espejo; **cierre estático 0 unresolved** ✓
-   [x] 4cf.10 `bookmark/components/UserBookmarks.jsx` + árbol de auth (`getBookmarks`, `toggleBookmarks`, `loginHelper`, `useAuthManager`) **COPIADO** (parte del mismo cierre)
-   [x] 4cf.11 **4 GAPS** copiados: `CommonCardFoodit/foodit.jsx` + `components/CardButton.jsx` + `components/DropdownCard.jsx` + `recetario/hooks/useApiGuard.js`. Deps agregadas al `package.json` del bundle: `@ln/ds-common-icon@1.2.1`, `@ln/ds-common-toasts@1.0.8`, `classnames@2.3.2`, `react-speech-recognition@4.0.1`, `slugify@1.6.5`
-   [ ] 4cf.12 Checkpoint render: `BaseLayout` + armazón renderizan sin `[MISSING]`. _(lo valida un dev — no ejecutable sin runtime)_
    > ℹ️ **Lo que desbloquea 4c/4d/4e en paralelo es el CÓDIGO del armazón (`4cf.9–11`, ya migrado), no este render.** `4cf.12` es validación, y está diferida a Fase 6 (ver abajo) — por eso NO es prerrequisito de 4c/4d/4e (sería dependencia circular: Fase 6 va después).
    > ⚠️ **DEPENDE DE FASE 6 — no validable solo.** `BaseLayout` solo se pinta cuando un **layout lo monta**, y un layout monta cuando la ruta **resuelve su content source** (Fase 6). Hoy `/recetas` da **HTTP 500** (sin content sources) → ningún layout monta → el armazón no se referencia → no hay `[MISSING]` que mirar todavía. Que `fusion start` levante y la tab diga "Foodit MX" **solo confirma que el bundle compila + el stub del output-type renderiza**, NO que el armazón rinda. El render visual real de la foundation se valida en **Fase 6**.
    > ✅ **Lint ya resuelto:** los archivos verbatim disparaban nits airbnb; se bajaron a `warn` durante Fase 4 en `apps/foodit-mx/.eslintrc.js` (+ `firebase` como global, + prettier `--fix`) → 0 errores, commit desbloqueado. Restaurar a `error` al cerrar Fase 4.

## 4c. Component copy — Bloque Foodit-ficha-receta (posterior a 4a, 4b y 4cf)

> **Spec**: `foodit-component-copy` | **US ADO**: US-NEW-5
>
> **Scope exclusivo de Ficha (de la auditoría 4cf.8): ≈83 archivos — el bloque más grande.** Subárboles: `PowerupsReceta` (ingredientsBox, summaryBox), `OpeningRecipe`, `Banners` (+`useAdManager`), `MenuSemanal`, `Newsletter`, `AudioFoodit`, `LayoutImpression`/`PrintIngredients`/`PrintButton`/`TimePrint`, `ShareFoodit`, `DialogFoodit`/`DialogBarrier`, `ActionsButtons`, `RoofFoodit`, `nutritionalInfo`, `subtitle`, `RelatedContent`, `videoPlayer`, `facade`, UI `badge`/`image` + utils de ficha.

-   [x] 4c.1 Para cada archivo del bloque Ficha-Receta marcado "copiar": copiar a `apps/foodit-mx/components/` con imports relativos adaptados ✓ **82 archivos** copiados verbatim a rutas espejo (74 nuevos + 8 stubs reemplazados: Banners/PowerupsReceta/AIImageDisclaimer/Newsletter/OpeningRecipe/nutritionalInfo/subtitle/RelatedContent). Cierre estático computado con walker (recursivo, resuelve .js/.jsx/.json/.scss/index + imports dinámicos): **cierre 220 archivos, 0 unresolved**. Deps npm: agregadas 2 faltantes al `package.json` — `@ln/ds-common-badge@0.1.0`, `@ln/ds-common-image@1.2.4` (pinneadas); el resto ya presentes.
-   [x] 4c.2 ~~Para cada archivo marcado "extraer a lib": generar la lib con `ln-arc-lib`~~ **N/A** — la decisión copy-vs-lib se resolvió globalmente a **COPIAR** (4a.3 + `fusion-libs-resolution.md`: Fusion no consume aliases). 0 libs en este bloque.
-   [x] 4c.3 Verificar que `git diff -- components/` del monolito no muestra modificaciones ✓ diff limpio en `components/` y `__mocks__/`; solo adiciones en `apps/foodit-mx/`
-   [ ] 4c.4 Checkpoint: `Foodit-ficha-receta` renderiza en `fusion start` sin `[MISSING]` ni errores JS
    > ⚠️ **Diferido a Fase 6** (mismo razonamiento que `4cf.12`/`3.4`/`4d.4`/`4e.10`): el layout solo se pinta cuando `/recetas/<slug>` resuelve su content source (`fooditArticleSource` → globalContent). Cierre estático ya garantiza 0 imports sin resolver. Lo valida un dev con runtime.

## 4d. Component copy — Bloque Foodit-acumulado (posterior a 4cf, paralelo con 4c/4e)

> **Spec**: `foodit-component-copy` | **US ADO**: US-NEW-6, 173243 (refinada)
> Solo features **específicas de Acumulado** — el piso compartido (`BaseLayout`, breadcrumb, `UserBookmarks`, utils) está en **4cf**.
>
> **Scope exclusivo de Acumulado (de la auditoría 4cf.8): ≈8 archivos** — `AcuTema` (+`gridTemaServer`/`gridTemaClient`/`useGridTema`/`helpers`), `TagCategories`, `GrillaNotasAcu/loadMoreButton`.

-   [x] 4d.1 `features/foodit-global/common/TagCategories/foodit.jsx` — reemplazar stub (usa `IconSprite` de `private-global/`, ya copiado en 4cf) ✓ copia fiel verbatim
-   [x] 4d.2 `features/foodit-global/common/AcuTema/foodit.jsx` — reemplazar stub (solo activo cuando `globalContent._id === '/tema'`; auditar árbol `helpers/GridTemaServer` + `GridTemaClient`) ✓ árbol completo copiado: `foodit.jsx` + `helpers/{index,gridTemaServer,gridTemaClient}` + `hooks/useGridTema` + dep transitiva `foodit/GrillaNotasAcu/helpers/loadMoreButton.jsx`. **Cierre estático 0 unresolved** (12/12 imports relativos resueltos; deps `notaFooditHelper`/`CommonCardFoodit`/`get`/`isSSR`/`safeJSONParse`/`IconSprite` ya en bundle por 4cf; npm `@ln/foodit-ui-{button,link}`, `@ln/common-ui-icon` presentes en `package.json`)
-   [x] 4d.3 Verificar que `git diff -- components/` del monolito no muestra modificaciones ✓ diff limpio, solo adiciones en `apps/foodit-mx/`
-   [ ] 4d.4 Checkpoint: `Foodit-acumulado` renderiza en `fusion start` sin `[MISSING]`
    > ⚠️ **DEPENDE DE FASE 6 — no validable solo** (mismo razonamiento que `4cf.12`/`3.4`). El layout solo se pinta cuando `/recetas` resuelve su content source (Fase 6); hoy da HTTP 500. Además `AcuTema` solo monta con `globalContent._id === '/tema'`. Lo valida un dev con runtime. Cierre estático ya garantiza 0 imports sin resolver.
-   [ ] 4d.5 Checkpoint de no-regresión: `Foodit-ficha-receta` sigue renderizando correctamente
    > ⚠️ Diferido a Fase 6 (mismo motivo que 4d.4). 4d solo agregó archivos NUEVOS (AcuTema/TagCategories/loadMoreButton); no tocó ningún archivo compartido con Ficha → sin superficie de regresión a nivel código.

## 4e. Layout fork — Foodit-subcategorias (posterior a 4cf, paralelo con 4c/4d)

> `/recetas` usa este layout en PageBuilder y **lo mantiene** (corrección no-swap: la tarea 6.8 quedó cancelada). Se copia al bundle MX como copia fiel en paridad con el monolito; es el layout **productivo definitivo** de `/recetas`, no un fallback temporal. `Foodit-acumulado` queda migrado pero sin ruta asignada.
>
> **Scope exclusivo de Subcategorías (de la auditoría 4cf.8): ≈9 archivos** — layout `Foodit-subcategorias/` (+`_helpers`, `Card/CardCategory` +`sections`, `hooks/useImagePreload`), `subcategorias/helpers.js`, `breadcrumb/_childrens/BreadcrumbCustom`, `subcategoryKeywords.json`.

-   [x] 4e.1 Copiar `components/layouts/Foodit-subcategorias/foodit.jsx` al bundle MX con header de fork (path + fecha) ✓ header de **copia-fiel-en-paridad** (no fork divergente): `/recetas` mantiene este layout, no hay swap a `Foodit-acumulado` (ver corrección Fase 6)
-   [x] 4e.2 Copiar `components/layouts/Foodit-subcategorias/_helpers.js` — contiene `getPageTitleFromUrl`, `applyPageBasedPriority`, `trackSubcategoryCard` (depende de `addEventToDataLayer`) ✓ verbatim
-   [x] 4e.3 Copiar `components/layouts/Foodit-subcategorias/Card/CardCategory.jsx` y sus secciones `Card/sections/CategoryCustom.jsx` + `Card/sections/CategoryDefault.jsx` ✓ verbatim
-   [x] 4e.4 Copiar `components/layouts/Foodit-subcategorias/hooks/useImagePreload.js` ✓ verbatim
-   [x] 4e.5 Copiar `features/foodit-global/common/subcategorias/helpers.js` (contiene mocks de categorías; depende de `subcategoryKeywords.json`) ✓ verbatim
-   [x] 4e.6 Copiar `features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit.jsx` ✓ verbatim (dep `capitalizeFirstLetter` ya en bundle por 4cf.5)
-   [x] 4e.7 Copiar utils adicionales: `private/LN/common/utils/isSSR.js`, `private/LN/common/utils/addEventToDataLayer.js` ✓ **ya estaban en bundle por el cierre de 4cf** (verificado); `addEventToDataLayer` arrastra `scheduleTask` → también presente
-   [x] 4e.8 Copiar `__mocks__/data/fooditCategories/subcategoryKeywords.json` a `apps/foodit-mx/__mocks__/data/fooditCategories/` ✓ verbatim
-   [x] 4e.9 Verificar que `git diff -- components/layouts/Foodit-subcategorias/` del monolito no muestra modificaciones ✓ diff limpio en `components/` y `__mocks__/`; solo adiciones en `apps/foodit-mx/`. **Cierre estático 15/15 imports relativos resueltos, 0 unresolved.** npm requeridos presentes: `@ln/{common-ui-text,utils,foodit-ui-category,common-ui-breadcrumb,foodit-ui-link,cva}`
-   [ ] 4e.10 Checkpoint: `Foodit-subcategorias` renderiza en `fusion start` sin `[MISSING]` (usando rutas como `/aprende-en-la-cocina/`). `[MISSING]` es el placeholder que Fusion inserta en el HTML cuando un import no resuelve en el bundle compilado — su ausencia confirma que todos los archivos copiados en 4e.1–4e.8 están correctamente referenciados
    > ⚠️ **Diferido a Fase 6** (mismo razonamiento que `4cf.12`/`3.4`/`4d.4`): el layout solo se pinta cuando la ruta resuelve su content source. Cierre estático ya garantiza 0 imports sin resolver. Lo valida un dev con runtime.

## 4ot. Output-type: migrar cluster + swap stub→real (cierre de Fase 4)

> El output-type real (`_pending/output-types/foodit.full.jsx`) tiene su **propio árbol de dependencias** (`<head>`/SEO/scripts/critical-CSS/schemas/syndication), **distinto del armazón (4cf) y de los layouts (4c/4d/4e)** — no estaba cubierto por ningún bloque. Hoy `components/output-types/foodit.jsx` es un **stub** (por eso `/` y `/recetas` rinden en blanco). El swap stub→real cierra Fase 4.

-   [x] 4ot.1 **Auditoría del cierre del output-type** (`components/output-types/foodit.jsx` del monolito): cierre **159 archivos**, **38 ya en bundle**, **121 a migrar**, **0 unresolved**, **0 deps `@ln`/npm faltantes**. Subárboles: `scriptManager` (31), `private/common/utils` (22), `foodit-global/common` MetaFoodit/favicon (16), `schemas` (13), `private/LN/common` (10), criticalCss + content filters sueltos.
-   [x] 4ot.2 Migrar los **121 archivos** del cierre a `apps/foodit-mx/` en rutas espejo, aplicando la regla copy-vs-lib por pieza (cierre estático 0 unresolved; incluir imports dinámicos + assets `.scss`) ✓ 120 archivos copiados vía resolución de cierre transitivo (1 ya estaba en bundle de más — total 159 en el cierre completo, coincide con la auditoría 4ot.1). 0 unresolved, 0 deps `@ln`/npm faltantes.
-   [x] 4ot.3 **Swap** `components/output-types/foodit.jsx` (stub) → contenido real de `_pending/output-types/foodit.full.jsx` (que ya tiene `deployment()`→`pagebuilderURL()`); remover `_pending/` cuando todos sus imports resuelvan ✓ swap hecho, `_pending/` eliminado
    > ⚠️ **Corrección (code review post-swap):** el rename `deployment()`→`pagebuilderURL()` hecho en Fase 2 sobre `foodit.full.jsx` no se propagó a los componentes hijos que ya existían con su propio prop `deployment` (copiados verbatim del monolito en 4ot.2): `FontPreload`, `GetFonts` y `MetaFoodit` invocan `deployment` como función sin guard, así que con `deployment: undefined` explotan con `TypeError: deployment is not a function` en **cualquier** render, sin depender de layout ni de content source — `PreloadFooditImages`/`FooditSchemas` (rama `Foodit-home`) y `Favicon` tienen el mismo mismatch pero degradan en silencio en vez de crashear. Fix: las 6 llamadas JSX en `output-types/foodit.jsx` ahora pasan `deployment={pagebuilderURL}` en vez de `pagebuilderURL={pagebuilderURL}`; no se tocó ningún componente hijo (siguen copia fiel del monolito). El bug ya existía desde `b37b74c7f3` (Fase 2, 2026-06-05) dentro de `_pending/`, dormido hasta este swap.
    > 📌 **Pendiente separado:** `RecipeSchema` (layout `Foodit-ficha-receta`, el que importa a esta migración) resuelve `deployment` vía `useAppContext()` y no estaba afectado; `HomeSchema`/`OrganizationSchema` (`Foodit-home`) sí lo estaban y quedan resueltos por el mismo fix vía `FooditSchemas`.
-   [x] 4ot.4 Verificar que `git diff -- components/output-types/` del monolito está limpio ✓ diff limpio, solo adiciones en `apps/foodit-mx/`
-   [ ] 4ot.5 Checkpoint: `fusion start` — el output-type real renderiza un documento HTML completo (`<head>` con meta/fonts/criticalCss + schemas), sin `[MISSING]`. _(HTTP 200 en `/recetas` depende además de content sources — Fase 6; con el fix de arriba ya no debería haber TypeError en el `<head>`, pero sigue sin validarse con `fusion start` real)_
    > ⚠️ **Corrección:** `criticalCss/foodit.jsx` (copiado verbatim en 4ot.2) pedía vía `<Resource>` el CSS de `resources/dist/css/foodit/tailwind/global.css` para casi todos los layouts en scope (`isAllowedSection` cubre Home/ChatIA/FichaReceta/FichaNota/ListadoCompras/Recetario/Acumulado/MenuSemanal/Chef/Buscador), y tiraba `ENOENT` en cualquier render. Causa: en el monolito raíz existen tanto el source tailwind (`src/statics/FOODIT/css/tailwind/global.css`) como el loader postcss en el webpack root; ninguna de las dos piezas fue portada a `apps/foodit-mx` (su `webpack.config.js` solo compila `.scss` vía `sass-loader`, sin paso de tailwind/postcss). Fix: se comentó el bloque `<Resource>` de tailwind en `criticalCss/foodit.jsx` (mismo patrón que las dos llamadas a `TagsLoadingList` ya comentadas más abajo en `output-types/foodit.jsx`). El critical CSS base (`base/index.css`) no se vio afectado.
    > 📌 **Pendiente separado:** portar el pipeline de tailwind CSS de Foodit a `apps/foodit-mx` (source css + postcss loader en webpack) antes de que Foodit dependa de estilos tailwind en producción. No bloqueante para 4ot.5.
    > ℹ️ **Nota de testing local (2026-07-06):** para pegarle al bundle MX en `fusion start` hay que usar el contextPath + params que bypasean el resolver de PageBuilder: `http://localhost:3000/pf/recetas/?_website=foodit&outputType=foodit&mxId=00000000` (sin `/pf` y sin `outputType`/`mxId` explícitos, el engine no resuelve `outputTypeMap` y tira un `TypeError` previo al output-type — no es un bug de código, es la URL de prueba incorrecta). Con la URL correcta, `outputTypeMap` resuelve bien (`foodit`) y el único error es el esperado: `Could not find source: fooditAcuSource` — confirma en vivo el gap de Fase 6 ya documentado (uno de los ~9 sources de nota/acumulado pendientes), nada nuevo. Sigue sin marcarse porque el render completo (incluido el `<head>`) no se puede confirmar end-to-end hasta que al menos un content source de body resuelva — Fusion aborta el render completo si falta cualquier source usado en el árbol, no solo el del `<head>`.

### 4ot-opt. Optimización: especializar criticalCss a foodit-only (no bloqueante)

> **Hallazgo (PR #53529):** vía `BaseLayout → criticalCss/dynamicStylesheetLoader → criticalCss/helpers.js`, el bundle foodit arrastra config **LN** (`properties/sites/la-nacion-ar.js` + `helperConfigLN/{imageConfig 2058, bannerConfig 1448, cajaTema, scripts}` ≈ **3895 líneas**). Causa: `criticalCss/helpers.js` es **multi-site en el monolito** (mapa keyed por `'la-nacion-ar'` y `'foodit'`). En el bundle foodit-only, la rama `la-nacion-ar` es **código muerto** (cargado, no usado) → peso + leak multi-site (contradice la separación del MX). Funciona, pero no es ideal. Es **cambio de código** (diverge del verbatim) → optimización deliberada, no migración.

-   [x] 4ot-opt.1 Trimear `apps/foodit-mx/components/output-types/criticalCss/helpers.js` a **foodit-only**: remover la rama `'la-nacion-ar'` del mapa + los imports `sitePropertiesLN` (`properties/sites/la-nacion-ar`) y `fontFaceLn10` (`LN-10-global/fontFace`)
-   [x] 4ot-opt.2 Eliminar del bundle los archivos que quedan huérfanos: `properties/sites/la-nacion-ar.js`, `properties/sites/helperConfigLN/*`, `features/LN-10-global/fontFace/*`
    > ⚠️ **Corrección (2026-07-02):** `components/private/LN/common/utils/shareHelper.js` (bloque Ficha-Receta, consumido por `features/foodit-global/common/ShareFoodit/socials.js`) importaba `config` de `la-nacion-ar.js` para `shareConfig.facebook.appID` — un **bug real**: el botón de compartir en Facebook de una receta de Foodit iba a usar el App ID de Facebook de LA NACION, no el de Foodit. Fix: el import se redirigió a `properties/sites/foodit.js`, que ya tiene la misma forma (`shareConfig.facebook.appID: '154042854349421'`, propio de Foodit). Con eso, `la-nacion-ar.js`/`helperConfigLN/*` quedaron genuinamente huérfanos y se borraron.
    > 📌 **Pendiente separado (no resuelto acá, decisión de producto):** `shareHelper.js` sigue con varias URLs/textos hardcodeados de LA NACION no derivados de `config` (fallbacks de X/Facebook/Google+/RSS apuntando a `lanacion.com.ar`, copy de mailto "esta nota de LA NACION"). No se tocaron porque requieren confirmar los equivalentes reales de Foodit (handles sociales, URL de ayuda RSS), no son parte de este cleanup de huérfanos.
-   [ ] 4ot-opt.3 Checkpoint: `fusion start` — el armazón sigue renderizando sin `[MISSING]` y el bundle pesa ≈3895 líneas menos. _(lo valida un dev)_

## 5. Deployer script

> **Spec**: `mx-deployer` | **US ADO**: US-NEW-8
> 📎 **Referencia**: POC Ingala (repo `lanacion-arcxp-mx`) tiene un `apps/.../deployer.js` (291 líneas) casi copiable — `--use-mxid`, `SANDBOX_MX_ID`/`PROD_MX_ID`, secuencia build→upload→deploy→promote, multi-ambiente. Adaptar a `foodit-mx`.

-   [x] 5.1 Crear `./scripts/deployer.js` con soporte para flags `--sandbox`, `--st`, `--prod`
    > ⚠️ **Corrección (2026-07-03):** `--use-mxid` pasó de flag opt-in a comportamiento **por defecto** (con `--no-mxid` como vía de escape explícita, no recomendada). Justificación: este script solo opera sobre `apps/foodit-mx/`, que nunca debería deployarse como el bundle "default" — hacerlo por accidente pisaría el bundle que sirve el monolito en producción. Como efecto secundario, el script ahora **no deploya nada** hasta que `SANDBOX_MX_ID`/`PROD_MX_ID` esté provisionado (US #173238), incluso sin pasar ningún flag — es la garantía de seguridad más fuerte posible: ningún deploy accidental es posible hasta que el mxId real exista.
    > 📦 **Sin dependencias nuevas:** usa `fetch`/`FormData`/`Blob` nativos de Node 22 en vez de `axios`/`form-data`, y un parser de `.env` propio (~15 líneas) en vez de `dotenv`. Cero paquetes agregados a `package.json`.
-   [x] 5.2 Implementar la secuencia build → upload → deploy → promote con `mxId "foodit-mx"` (por defecto, ver 5.1)
    > Build vía `fusion build` (no `webpack`, el bundle MX es JS+CSS) y empaquetado vía `fusion zip` (no depende del binario `zip` del sistema — confirmado que no está instalado en la máquina de desarrollo).
    > ⚠️ **Corrección (2026-07-06):** promote dejó de ser parte automática de la secuencia. La secuencia real es build → upload → deploy → checkDeployment, y promote quedó **opt-in** vía flag `--promote` (nunca automático, en ningún ambiente). Justificación: el mxId de Sandbox/Development es compartido por todo el equipo — hay un solo slot "live" por ambiente, no uno por persona — y un promote automático pisaría sin aviso la demo que esté live para otra persona. `deployerInteractive.mjs` (ver 5.8) pide confirmación explícita antes de pasar `--promote` cuando el ambiente elegido comparte mxId.
-   [x] 5.3 Agregar validación de variables de entorno al inicio del script (fail rápido con mensaje descriptivo)
-   [x] 5.4 Crear `apps/foodit-mx/.env.example` con todas las variables por sección de entorno (sandbox/staging/prod)
    > Endpoints confirmados con evidencia: `SANDBOX_DEPLOYER_ENDPOINT`/`STAGING_DEPLOYER_ENDPOINT` verificados contra `.env` real y `azure-pipeline.yml`. `PROD_DEPLOYER_ENDPOINT` es inferido por patrón (`api.<org>.arcpublishing.com`), no verificado — pendiente de confirmar cuando se consiga ese token.
-   [x] 5.5 Smoke test: `node ./scripts/deployer.js --sandbox` con `.env` válido ejecuta sin errores fatales
    > ✅ Verificado en vivo (2026-07-03): `SANDBOX_MX_ID` (`97f9a1c9`, confirmado vía `Fusion.mxId` en el editor de `pb-devlab-ln`) + token de deploy (Developer Center, scope `Deployments: Full Access`) + endpoint. El script corrió `fusion build` → `fusion zip` → upload → deploy-trigger sin ningún error propio; el bundle se subió correctamente a `api.sandbox.lanacionar.arcpublishing.com/bundles`.
    > ⚠️ **Bloqueante externo descubierto**: el build en la nube de Arc falla con `npm error 404 ... '@ln/ds-common-badge@0.1.0' is not in this registry` — falta `apps/foodit-mx/.npmrc-encrypted` (paquetes `@ln/*` privados no resuelven en el build remoto sin él). Se genera desde la "Maestro Secrets Page" de Arc XP (encripta las credenciales del registry privado); pendiente ubicar esa página en el Arc Home de la org. Ver [How to Use a Private NPM Repository](https://dev.arcxp.com/pagebuilder-engine/how-to-guides/basics/using-private-npm-repository-in-your-bundle/).
    > 📌 El `checkDeployment` hizo timeout correctamente a los 5 min (falla descriptiva, sugiere verificar el panel de Arc a mano) — comportamiento esperado dado que el build remoto nunca terminó.
    > 🎉 **Deploy real exitoso (2026-07-06)**: tras 6 intentos fallidos por auth (`E401`, probado con `.npmrc-encrypted` en distintos formatos, con el token compartido `vstsagent` y con un PAT personal — todos con error idéntico), la causa real era que `apps/foodit-mx/.npmrc`/`.npmrc-encrypted` estaban armados distinto a como los tiene el monolito (`default`); una vez alineados, la auth funcionó al toque. Descubierto un segundo bloqueante en el camino ("bundle size too big"): `apps/foodit-mx/package.json` no tenía sección `devDependencies` — `@arc-fusion/cli`, `webpack`, `webpack-cli`, `css-loader`, `mini-css-extract-plugin`, `sass`, `sass-loader` y `glob` (herramientas de build local, sin uso en runtime) estaban todos en `dependencies`, así que el install "production" de Arc los instalaba igual. Se movieron a `devDependencies` (igual que en la raíz) + se corrió `npm install` para resincronizar `package-lock.json`. Resultado: `fusion build` → `fusion zip` → upload → **deploy (versión 3) → promote, completos**. Bug menor encontrado y arreglado de paso: el cleanup final (`fs.unlinkSync(zipPath)`) tiraba `EACCES` (el zip queda con dueño `root`, generado por Docker) y hacía que el script reportara error pese a que el deploy ya había sido exitoso — envuelto en try/catch, no bloqueante.
-   [x] 5.6 Smoke test: ejecutar sin variable requerida → error descriptivo, no intento de deploy parcial
    > ✅ Verificado en vivo: con `SANDBOX_MX_ID` vacío, el script cortó ANTES de tocar build/zip/upload con `❌ SANDBOX_MX_ID está vacío...` — sin intento de deploy parcial. También se encontró y arregló un bug real en el parser de `.env` (una key duplicada en el archivo hacía que la primera ocurrencia -vacía- ganara sobre la segunda con el valor real); fix: la última ocurrencia en el archivo gana.
-   [x] 5.7 Verificar que `azure-pipeline.yml` no fue modificado y no se crearon pipelines ADO nuevos
-   [x] 5.8 Agregar ambiente `Development` (flag `--dev`, `DEVELOP_DEPLOYER_*`) — no contemplado en el plan original de esta fase
    > Arc XP expone `Development` como ambiente hermano de `Sandbox` dentro del mismo "sandbox tier" (confirmado contra [dev.arcxp.com](https://dev.arcxp.com/pagebuilder-engine/pagebuilder-basics/arc-xp-environments/)), con endpoint y token propios. ✅ Verificado en vivo (2026-07-06): deploy real a `api.dev.lanacionar.arcpublishing.com`, versión 1, sin promover. Reusa `SANDBOX_MX_ID` (mxId propio para Development aún no provisionado).
-   [x] 5.9 Crear `scripts/deployerInteractive.mjs` — wrapper con UX calcada de `create-demo` — no contemplado en el plan original de esta fase
    > Selector de ambiente (Development/Sandbox/Staging/Producción), chequeo de cambios sin comitear, opción de correr tests, y confirmación explícita antes de pasar `--promote` cuando el ambiente elegido comparte mxId (Sandbox/Development). `npm run deploy-foodit-mx` (raíz) y `npm run deploy:interactive` (`apps/foodit-mx/`).

## 6. Content sources + conexión PageBuilder

> **Spec**: `content-source-migration` | **US ADO**: 173244
> 📎 **Referencia**: POC Ingala (repo `lanacion-arcxp-mx`) tiene `apps/.../content/sources/` con content-api, collections, gallery, video, author, related-content, **signing-service** y caching — plantilla para los content sources de recetas.

-   [x] 6.1 Abrir `docs/migrate-mx/content-sources/audit.md` e identificar los 10 content sources en scope
-   [x] 6.2 Para cada content source: copiar a `apps/foodit-mx/content/sources/` con imports relativos adaptados
    > 📌 **Adelanto acotado (fuera de orden):** `navigationSource` (+ `navigation-schema`) ya se portó a `apps/foodit-mx/content/sources/navigationSource.js` y `apps/foodit-mx/content/schemas/navigation-schema.js` (copia verbatim del monolito, sin deps transitivas). Motivo: `Header` → `useNavigationData` lo usa desde `BaseLayout`, que envuelve las tres layouts ya migradas (`Foodit-acumulado`, `Foodit-subcategorias`, `Foodit-ficha-receta`), así que cualquier página foodit local tiraba `Could not find source: navigationSource` al validar 4ot.5. `filterMenuSections` ya estaba copiado. Los ~9 sources restantes (nota/acumulado: `fooditArticleSource`, `fooditBaseArticleSource`, `fooditVideoSource`, `videosJwCarruselSource`, `relatedContentSource`, `fooditAcuSource`, `acuArticlesSourceV2`, `fooditCategoryImageSource`, `fooditCollectionsSource`) se portaron en `8f8b02e`, con sus árboles de dependencias transitivas (ver audit.md §8).
-   [x] 6.3 Para cada content source copiado: identificar y documentar dependencias transitivas (utils, filtros de Foodit)
-   [x] 6.4 Copiar utils y filtros transitivos a `apps/foodit-mx/content/` (en `filters/` o subdirectorios equivalentes)
-   [x] 6.5 Verificar que `arc.config.json` tiene `excludeModules` que excluye los content sources fuera de scope
-   [x] 6.6 Verificar que ningún transform filtra el campo `_id` (requisito de cache tagging)
-   [x] 6.7 Verificar que los transforms hacen `throw` en caso de error (no retornan error como objeto)
-   [x] 6.8 ~~En PageBuilder sandbox: cambiar el layout de `/recetas` de `Foodit-subcategorias` → `Foodit-acumulado`~~ **CANCELADO (corrección no-swap).** `/recetas` MANTIENE `Foodit-subcategorias` (migrado en 4e). NO se ejecuta swap. Verificado: PageBuilder sandbox conserva el mapeo `/recetas` → `Foodit-subcategorias` y el bundle MX lo sirve. `Foodit-acumulado` queda migrado pero sin ruta asignada.
-   [x] 6.9 Conectar los 10 content sources en PageBuilder (sandbox) y verificar que resuelven sin errores HTTP

## 7. Validación integral local

> **Spec**: D5 deploy progresivo | **US ADO**: 173249
> ⚠️ Antes de `fusion start` local: ver `design.md` § Risks/Trade-offs — 2 hallazgos operativos (mocks del admin de PageBuilder faltantes en `apps/foodit-mx/mocks/`; version-pinning `FUSION_RELEASE`↔Mongo) que causan crashes que no parecen tener relación con esta fase si no se conocen de antemano.

-   [x] 7.1 Ejecutar `fusion start` en `apps/foodit-mx/` completo (output-type + layouts + componentes + content sources)
    > ✅ Verificado (2026-07-15): `npm run build-dev` compila sin errores; `fusion start` levanta los 9 contenedores (`webpack`, `cache-proxy`, `origin`, `engine`, `content-cache`, `fusion-cli-api`, `admin`, `themes`, `data`, `resolver`) sin crashear — no se reproducen los 2 riesgos operativos de `design.md` (mocks de PageBuilder, version-pinning Mongo).
-   [ ] 7.2 Verificar HTTP 200 en al menos 3 URLs representativas: `/recetas` (listado), `/recetas/<slug>` (ficha), `/recetas/<categoría>` (categoría)
-   [ ] 7.3 Verificar que no hay componentes `[MISSING]` en ningún HTML de las 3 URLs _(bloqueado por 7.2 — mismo motivo)_
-   [ ] 7.4 Verificar que los estilos del site foodit se aplican correctamente (no estilos de la-nacion-ar) _(bloqueado por 7.2 — mismo motivo)_
-   [x] 7.5 Ejecutar `fusion build` en `apps/foodit-mx/` y verificar que completa sin errores
    > ✅ Verificado (2026-07-15): `npx fusion verify` (build:prod completo — components, content sources, configs, engine) sale con exit code 0. Solo warnings de tamaño de asset (`foodit.server.js` 1.36 MiB, `foodit.js` 572 KiB superan el límite recomendado de 244 KiB de webpack), no errores. `.fusion/verify/dist/` refleja el trabajo de sesión (`GrillaNotasAcu`, `sectionSource` presentes en el output).
-   [x] 7.6 Verificar que el tamaño del bundle compilado es menor al del bundle Contenidos completo
    > ✅ Verificado (2026-07-15): `apps/foodit-mx/.fusion/verify/dist/` = 3.3 MB vs `.fusion/verify/dist/` (bundle Contenidos, build del 2026-06-03) = 47 MB — ~14x más chico. Nota: la comparación default no es de una corrida del mismo día, pero la diferencia de magnitud hace improbable que cambie la conclusión.

## 8. Routing script MX

> **Spec**: `mx-routing-script` | **US ADO**: US-NEW-9

-   [x] 8.1 Crear `./scripts/mx-routing.js` con soporte para flags de activación y desactivación del MX Router ✓ CLI Node (CommonJS, `fetch` nativo). Flags `--activate`/`--deactivate` (excluyentes) + `--env <develop|sandbox|staging|prod>` + **`--path <prefix>` (requerido, multi-sección)** + `--site` (opcional, default `foodit`) + `--dry-run`. **API verificada** (Arc MX Management API): activar = agregar `{path, site}` a `siteMappings` del MX `foodit-mx` vía `PATCH /pagebuilder/mx/foodit-mx` (array completo, GET-modify-PATCH); rollback = quitar el mapeo (el bundle deployado NO se toca). **Generalizado a multi-path** — un solo MX `foodit-mx` sirve varias secciones (`/recetas` hoy; `/postres` etc. a futuro, una corrida por subárbol tras migrar+deployar su código). Doc: [How To Update Traffic Routes](https://dev.arcxp.com/micro-experiences/how-to-guides/how-to-update-traffic-routes-between-multiple-experiences/). Env vars: `{ENV}_DEPLOYER_ENDPOINT` (host de Arc, compartido) + **`{ENV}_MX_ROUTING_ACCESS_TOKEN` (token DEDICADO, scope MX Management)** — NO reutiliza el token del deployer (ese es deployment-only y no puede hacer `PATCH /pagebuilder/mx`) + **`SANDBOX_MX_SLUG`/`PROD_MX_SLUG` (slug del MX)** — dev/staging reusan `SANDBOX_MX_SLUG` (comparten el MX de sandbox, mismo criterio que el deployer con `SANDBOX_MX_ID`). Fail-fast de flags/env/vars verificado. ✅ **RESUELTO**: la MX Service API usa el **slug** (`devlab-ln` en sandbox, id numérico `97f9a1c9`), confirmado vía `GET /pagebuilder/mx/` (lista los MX). El bundle NO vive en un MX `foodit-mx` sino dentro de `devlab-ln`.
-   [x] 8.2 Implementar guard: verificar que `mxId "foodit-mx"` está provisionado en Arc antes de ejecutar cambios ✓ `fetchMx()` hace `GET /pagebuilder/mx/foodit-mx` antes de cualquier cambio: 404 → error descriptivo "mxId no provisionado (US #173238, Plataforma)"; 401/403 → error de credenciales. El PATCH solo corre si el GET resuelve.
-   [x] 8.3 Implementar logging de cada operación (path, bundle target, timestamp, usuario/token) ✓ `writeLog()` emite JSON con `timestamp` ISO, `action`, `path`, `resultingBundle` (foodit-mx-1.0.0 | default), `env`, `mxId`, `operator` (`$USER`), `token` (enmascarado `…xxxx`), `dryRun`. Doble salida: consola + append a `scripts/logs/mx-routing.log` (audit trail).
-   [x] 8.4 Smoke test activación: `/recetas` es enrutado a `foodit-mx-1.0.0` en PageBuilder (sandbox) ✓ **VALIDADO (2026-07-14, sandbox, MX `devlab-ln`)**: `--activate` → `PATCH` HTTP 200; el response body del server confirma `siteMappings=[{"path":"/recetas","site":"foodit"}]` (verificado por el body del PATCH, NO por GET — el GET cachea 5 min y devolvía `[]` stale). Token con **scope de escritura confirmado** (primer intento dio 401 con token read-only; regenerado con Full Access a PageBuilder → 200).
    > ⚠️ Se **revirtió de inmediato** (no se dejó activo): el render real de `/recetas` requiere content sources (Fase 6) — sin ellos daría HTTP 500. Este smoke test valida el **mecanismo de routing**, no el render (eso es Fase 7).
-   [x] 8.5 Smoke test rollback: `/recetas` vuelve a ser servido por `default`; bundle MX permanece deployado y sin errores ✓ **VALIDADO**: `--deactivate` → `PATCH` HTTP 200; server confirma `siteMappings=[]` → `/recetas` vuelve a `default`. El bundle deployado **NO se toca** (solo se modifica `siteMappings`). Estado final del MX: limpio (`[]`).
-   [x] 8.6 Verificar que el script está comiteado en `./scripts/` junto a `deployer.js` ✓ ambos conviven comiteados: `scripts/deployer.js` (Fase 5) y `scripts/mx-routing.js` (Fase 8). Comparten el host `{ENV}_DEPLOYER_ENDPOINT`; el routing usa su token dedicado `{ENV}_MX_ROUTING_ACCESS_TOKEN` (scope MX Management) y el slug `SANDBOX/PROD_MX_SLUG` — ver `apps/foodit-mx/.env.example`.
