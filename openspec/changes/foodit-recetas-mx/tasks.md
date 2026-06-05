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
Fase 4 — Scope card + Component copy [paralelo con Fase 4b: libs/]
  ├── Fase 4a: Scope card (post-layout)
  ├── Fase 4b: libs/ + ln-arc-lib generator [puede arrancar en paralelo con 4a]
  ├── Fase 4c: private/ Bloque Ficha-Receta [posterior a 4a]
  └── Fase 4d: private/ + features Bloque Acumulado [posterior a 4a]
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

-   [ ] `apps/foodit-mx/components/layouts/Foodit-acumulado/` existe con comentario de fork en cabecera
-   [ ] `apps/foodit-mx/components/layouts/Foodit-ficha-receta/` existe con adaptaciones de imports
-   [ ] `git diff HEAD -- components/layouts/` en el monolito no muestra modificaciones
-   [ ] `fusion start` en `apps/foodit-mx/` con ambos layouts presentes levanta sin errores
-   [ ] `/recetas` responde HTTP 200 con `Foodit-acumulado` en local
-   [ ] `/recetas/<slug-nid>` responde HTTP 200 con `Foodit-ficha-receta` en local (aun sin data real)

**ADO**: Area `Gestion LANACION-ARC\Arquitectura\Frontend` | Iteration `2026 - Q2\Mayo` | Parent: 173242 | Tags: `dev; mx-recetas`

---

### US-NEW-4: Crear scope card de componentes por layout

**Título**: Levantar scope card de features y components/private/ en juego por layout

**Descripción**:
Post-layout migration, crear un documento de scope card que enumere todos los features, chains y archivos de `components/private/` necesarios para cada layout (`Foodit-acumulado` y `Foodit-ficha-receta`). Usar `docs/migrate-mx/private-components/audit.md` como fuente de verdad (59 archivos auditados). Para cada archivo, marcar la decisión copy-vs-lib según el criterio del spec `monorepo-shared-libs`: (a) solo-Foodit → copiar; (b) compartido default+foodit-mx → `libs/shared/`; (c) compartido multi-bundle-foodit → `libs/foodit/`.

**Criterios de aceptación**:

-   [ ] Existe documento/card (task o PR comment) listando componentes por layout
-   [ ] Todos los archivos de `docs/migrate-mx/private-components/audit.md` tienen una decisión copy-vs-lib asignada
-   [ ] Los bloques de copy para Fase 4c y 4d están definidos (qué archivos van en cada bloque)
-   [ ] Al menos un responsable asignado por bloque de copia

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

-   [ ] Existen los directorios `libs/shared/ui/`, `libs/shared/util/`, `libs/shared/data-access/`, `libs/foodit/`
-   [ ] `npx nx g ln-arc-lib --name=test-lib --scope=shared --type=util` genera `libs/shared/util/test-lib/` con `src/index.ts` y `project.json`
-   [ ] `project.json` generado tiene `importPath: "@ln/arc-test-lib"` y tags `["scope:shared", "type:util"]`
-   [ ] `tsconfig.base.json` incluye el path alias `@ln/arc-test-lib` automáticamente tras generar la lib
-   [ ] `project.json` NO contiene `publishable: true` ni configuración de npm publish
-   [ ] Un archivo en `apps/foodit-mx/` puede importar `@ln/arc-test-lib` y ESLint no reporta boundary violation

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

-   [ ] 3.1 Copiar `components/layouts/Foodit-acumulado/` al bundle MX como fork estratégico (agregar comentario de cabecera con path de origen y fecha)
-   [ ] 3.2 Copiar `components/layouts/Foodit-ficha-receta/` al bundle MX con adaptaciones mínimas (imports relativos, registro del layout)
-   [ ] 3.3 Verificar que los originales del monolito no fueron modificados (`git diff -- components/layouts/` limpio)
-   [ ] 3.4 Checkpoint: `fusion start` en `apps/foodit-mx/` con ambos layouts → `/recetas` y `/recetas/<slug>` responden HTTP 200 sin errores JS/CSS

## 4a. Scope Card: auditoría de componentes por layout

> **Spec**: `foodit-layout-migration`, `foodit-component-copy` | **US ADO**: US-NEW-4

-   [ ] 4a.1 Abrir `docs/migrate-mx/private-components/audit.md` e identificar los 59 archivos de `components/private/` auditados
-   [ ] 4a.2 Para cada layout, listar los features y `components/private/` realmente en uso (inspección de imports en los layouts del bundle MX)
-   [ ] 4a.3 Para cada archivo identificado, marcar la decisión copy-vs-lib según criterio del spec `monorepo-shared-libs`
-   [ ] 4a.4 Crear el documento de scope card (puede ser task ADO, PR comment, o Notion) con los listados por layout y las decisiones
-   [ ] 4a.5 Definir los dos bloques de copy (Ficha-Receta y Acumulado) para las US-NEW-5 y US-NEW-6

## 4b. Monorepo: estructura libs/ y generator (paralelo con 4a)

> **Spec**: `monorepo-shared-libs` | **US ADO**: US-NEW-7

-   [ ] 4b.1 Crear directorios `libs/shared/ui/`, `libs/shared/util/`, `libs/shared/data-access/`, `libs/foodit/` en raíz del repo
-   [ ] 4b.2 Crear el generator `tools/generators/ln-arc-lib/index.ts` con soporte para `--name`, `--scope`, `--type`
-   [ ] 4b.3 Verificar que el generator genera `src/index.ts`, `project.json` y README en el directorio correcto
-   [ ] 4b.4 Verificar que `project.json` generado tiene `importPath: "@ln/arc-<name>"` y tags correctos (`scope:X`, `type:Y`)
-   [ ] 4b.5 Verificar que `tsconfig.base.json` se actualiza automáticamente con el alias de la nueva lib
-   [ ] 4b.6 Verificar que `project.json` NO tiene `publishable: true`
-   [ ] 4b.7 Generar la primera lib real identificada en 4a como "extraer a libs/" y validar que el import resuelve desde `apps/foodit-mx/`

## 4c. Component copy — Bloque Foodit-ficha-receta (posterior a 4a y 4b)

> **Spec**: `foodit-component-copy` | **US ADO**: US-NEW-5

-   [ ] 4c.1 Para cada archivo del bloque Ficha-Receta marcado "copiar": copiar a `apps/foodit-mx/components/` con imports relativos adaptados
-   [ ] 4c.2 Para cada archivo marcado "extraer a lib": generar la lib con `ln-arc-lib` y actualizar el import en el layout
-   [ ] 4c.3 Verificar que `git diff -- components/` del monolito no muestra modificaciones
-   [ ] 4c.4 Checkpoint: `Foodit-ficha-receta` renderiza en `fusion start` sin `[MISSING]` ni errores JS

## 4d. Component copy — Bloque Foodit-acumulado (posterior a 4a y 4b)

> **Spec**: `foodit-component-copy` | **US ADO**: US-NEW-6, 173243 (refinada)

-   [ ] 4d.1 Para cada archivo del bloque Acumulado (incluye componentes compartidos entre layouts) marcado "copiar": copiar con imports adaptados
-   [ ] 4d.2 Para cada archivo marcado "extraer a lib": generar la lib y actualizar imports en layouts
-   [ ] 4d.3 Verificar que `git diff -- components/` del monolito no muestra modificaciones
-   [ ] 4d.4 Checkpoint: `Foodit-acumulado` renderiza en `fusion start` sin `[MISSING]`
-   [ ] 4d.5 Checkpoint de no-regresión: `Foodit-ficha-receta` sigue renderizando correctamente

## 5. Deployer script

> **Spec**: `mx-deployer` | **US ADO**: US-NEW-8

-   [ ] 5.1 Crear `./scripts/deployer.js` con soporte para flags `--sandbox`, `--st`, `--prod`, `--use-mxid`
-   [ ] 5.2 Implementar la secuencia build → upload → deploy → promote con `mxId "foodit-mx"` cuando `--use-mxid`
-   [ ] 5.3 Agregar validación de variables de entorno al inicio del script (fail rápido con mensaje descriptivo)
-   [ ] 5.4 Crear `apps/foodit-mx/.env.example` con todas las variables por sección de entorno (sandbox/staging/prod)
-   [ ] 5.5 Smoke test: `node ./scripts/deployer.js --sandbox --use-mxid` con `.env` válido ejecuta sin errores fatales
-   [ ] 5.6 Smoke test: ejecutar sin variable requerida → error descriptivo, no intento de deploy parcial
-   [ ] 5.7 Verificar que `azure-pipeline.yml` no fue modificado y no se crearon pipelines ADO nuevos

## 6. Content sources + conexión PageBuilder

> **Spec**: `content-source-migration` | **US ADO**: 173244

-   [ ] 6.1 Abrir `docs/migrate-mx/content-sources/audit.md` e identificar los 10 content sources en scope
-   [ ] 6.2 Para cada content source: copiar a `apps/foodit-mx/content/sources/` con imports relativos adaptados
-   [ ] 6.3 Para cada content source copiado: identificar y documentar dependencias transitivas (utils, filtros de Foodit)
-   [ ] 6.4 Copiar utils y filtros transitivos a `apps/foodit-mx/content/` (en `filters/` o subdirectorios equivalentes)
-   [ ] 6.5 Verificar que `arc.config.json` tiene `excludeModules` que excluye los content sources fuera de scope
-   [ ] 6.6 Verificar que ningún transform filtra el campo `_id` (requisito de cache tagging)
-   [ ] 6.7 Verificar que los transforms hacen `throw` en caso de error (no retornan error como objeto)
-   [ ] 6.8 Conectar los 10 content sources en PageBuilder (sandbox) y verificar que resuelven sin errores HTTP

## 7. Validación integral local

> **Spec**: D5 deploy progresivo | **US ADO**: 173249

-   [ ] 7.1 Ejecutar `fusion start` en `apps/foodit-mx/` completo (output-type + layouts + componentes + content sources)
-   [ ] 7.2 Verificar HTTP 200 en al menos 3 URLs representativas: `/recetas` (listado), `/recetas/<slug>` (ficha), `/recetas/<categoría>` (categoría)
-   [ ] 7.3 Verificar que no hay componentes `[MISSING]` en ningún HTML de las 3 URLs
-   [ ] 7.4 Verificar que los estilos del site foodit se aplican correctamente (no estilos de la-nacion-ar)
-   [ ] 7.5 Ejecutar `fusion build` en `apps/foodit-mx/` y verificar que completa sin errores
-   [ ] 7.6 Verificar que el tamaño del bundle compilado es menor al del bundle Contenidos completo

## 8. Routing script MX

> **Spec**: `mx-routing-script` | **US ADO**: US-NEW-9

-   [ ] 8.1 Crear `./scripts/mx-routing.js` con soporte para flags de activación y desactivación del MX Router
-   [ ] 8.2 Implementar guard: verificar que `mxId "foodit-mx"` está provisionado en Arc antes de ejecutar cambios
-   [ ] 8.3 Implementar logging de cada operación (path, bundle target, timestamp, usuario/token)
-   [ ] 8.4 Smoke test activación: `/recetas` es enrutado a `foodit-mx-1.0.0` en PageBuilder (sandbox)
-   [ ] 8.5 Smoke test rollback: `/recetas` vuelve a ser servido por `default`; bundle MX permanece deployado y sin errores
-   [ ] 8.6 Verificar que el script está comiteado en `./scripts/` junto a `deployer.js`
