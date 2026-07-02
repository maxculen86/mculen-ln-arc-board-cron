## Context

El repo `~/p/ln/Contenidos/` es un monolito Fusion (Arc XP) que actualmente compila un único bundle con mxId `default`. La sección `/recetas` del site Foodit vive embebida ahí (layouts en `components/layouts/Foodit-acumulado/` y `components/layouts/Foodit-ficha-receta/`, sus features y un subset de `components/private/`).

La organización adoptó **MX (Micro Experiences)** de Arc XP como patrón para desacoplar secciones críticas. El repo `~/p/ln/lanacion-arcxp-mx/apps/lanacion-arcxp-mx/` es una **PoC de referencia** (sin relación productiva) basada en Fusion aplicada a una app de características similares a La Nación; se usa exclusivamente como guía de estructura (directorios, `webpack.config.js`, `arc.config.json`, `properties/`, `environment/`, `deployer.js`).

Este change extrae `/recetas` como **primer MX-de-sección** dentro del repo `Contenidos`, conviviendo con el bundle `default` en el mismo monorepo. Para que ambos bundles coexistan sin romper nada se introduce **Nx** como capa de orquestación y `libs/` como carpeta de código compartido.

**Stakeholders**:

-   Equipo Foodit (consumidor de la sección y dueño funcional)
-   Equipo Plataforma (responsable del MX Router y provisioning Arc — US #173238)
-   Equipo Infra/CI (consumidor futuro del pipeline; CI/CD fuera de scope MVP1)

**Restricciones**:

-   No tocar `.fusion/` (managed por Arc XP)
-   No modificar `components/output-types/` del monolito sin review (SEO/perf críticos)
-   El mxId `foodit-mx` debe estar provisionado en Arc antes del primer deploy
-   MVP1 es solo `/recetas`; la estructura debe escalar al sitio Foodit completo

## Goals / Non-Goals

**Goals:**

-   Crear `apps/foodit-mx/` como bundle Fusion independiente, deployable con su propio ciclo
-   Habilitar Nx en `Contenidos` sin romper los flujos actuales del bundle `default`
-   Establecer `libs/` + generator `ln-arc-lib` como mecanismo formal para código compartido entre bundles
-   Migrar layouts (`Foodit-acumulado`, `Foodit-ficha-receta`), features, private components y 10 content sources necesarios para `/recetas`
-   Permitir go-live progresivo con checkpoints humanos en cada capa (output-type → layouts → componentes → PB)
-   Permitir rollback a través del script de routing MX (vuelta a `default`)

**Non-Goals:**

-   CI/CD en Azure DevOps (fase posterior; MVP1 es deploy local)
-   Migrar otras secciones de Foodit fuera de `/recetas`
-   Refactorizar el bundle `default` para extraer libs proactivamente (solo se extrae lo que efectivamente se duplique al migrar)
-   Cambiar el output-type del monolito
-   Provisioning del mxId `foodit-mx` en Arc (US #173238, fuera de scope)
-   Modificar cualquier código existente fuera de `apps/foodit-mx/`: el alcance de este change se limita a ese directorio. Las únicas excepciones permitidas son archivos de configuración Nx en la raíz del repo (`nx.json`, `tsconfig.base.json`, `.eslintrc.json`) que deben agregarse de forma aditiva sin alterar el comportamiento actual del bundle `default` ni sus scripts npm.

## Decisions

### Decision 1: Nx como orquestador del monorepo

**Elegido**: Adoptar Nx con `nx.json` en raíz, `project.json` por app y por lib, `tsconfig.base.json` con path aliases, y `@nx/enforce-module-boundaries` en ESLint.

**Alternativas consideradas**:

-   **npm workspaces puros**: simple, pero no provee task graph, caching, ni boundary enforcement. Migración futura a más MXs sufriría sin orquestador.
-   **Turborepo**: bueno en caching y task graph, pero menos maduro en library scaffolding y boundary rules; el equipo no tiene experiencia con él.
-   **Lerna**: en mantenimiento mínimo; sin valor adicional sobre Nx.

**Por qué Nx**:

-   Generators built-in (`@nx/js:lib`) reducen boilerplate
-   `enforce-module-boundaries` previene que un bundle importe de otro bundle; la regla base es `{ sourceTag: "type:app", notDependOnLibsWithTags: ["type:app"] }` — las apps solo pueden importar de libs o de sus propios archivos internos
-   Task graph permite `nx affected` futuro para CI selectivo
-   Soporta convivir con scripts npm existentes del bundle `default` sin migración invasiva

**Aclaración de lenguaje por proyecto**:

-   `apps/foodit-mx/` se configura como proyecto **JavaScript** (igual que el bundle `default`). Fusion de Arc XP no soporta TypeScript de forma oficial; forzar TS en la app requeriría configuración custom no soportada y fuera del scope de este change.
-   `libs/` (shared y foodit) se configuran en **TypeScript**. Las libs son código propio del repo sin dependencia del runtime Fusion, por lo que TS es aplicable y deseable para type safety en el código compartido.
-   `tsconfig.base.json` en raíz define los path aliases para ambos contextos; los proyectos JS consumen las libs compiladas (dist) o con `allowJs`/`resolveJsonModule` según corresponda.

### Decision 2: `apps/foodit-mx/` arrancado con `fusion init`, no copiando el bundle de referencia

**Elegido**: Ejecutar `fusion init` dentro de `apps/foodit-mx/` para generar app Fusion en blanco; luego adaptar `package.json`, `webpack.config.js`, `properties/`, `environment/` tomando como **lectura** el bundle `~/p/ln/lanacion-arcxp-mx/apps/lanacion-arcxp-mx/`.

**Alternativas**:

-   **Copiar el bundle de referencia completo**: arrastra código/config específicos del otro site que después hay que limpiar; introduce ruido difícil de auditar.
-   **Construir todo from scratch sin `fusion init`**: alto riesgo de divergir de las convenciones Fusion managed (`.fusion/`).

**Por qué `fusion init` + adaptación**:

-   Punto de partida limpio y oficialmente soportado
-   El bundle de referencia se usa como **manual vivo**, no como base de copia
-   Cada archivo del bundle MX tiene su origen explícito (generado por Fusion vs. adaptado del referencia)

### Decision 3: Estrategia de migración de layouts (`Foodit-acumulado` y `Foodit-ficha-receta`)

La sección `/recetas` usa dos layouts con contextos distintos; cada uno justifica una estrategia diferente:

| Ruta                       | Layout                | Estrategia                  |
| -------------------------- | --------------------- | --------------------------- |
| `/recetas` (listado)       | `Foodit-acumulado`    | **Duplicación estratégica** |
| `/recetas/<*-nid>` (ficha) | `Foodit-ficha-receta` | **Copia directa**           |

#### `Foodit-acumulado` — duplicación estratégica

**Elegido**: Copiar el layout al bundle MX y desacoplarlo del original del monolito.

**Alternativas descartadas**:

-   **Reusar via lib compartida**: el layout es muy específico de la sección; extraerlo a `libs/` lo expone a evolución no deseada desde otras secciones del monolito que lo usen.
-   **Importar desde el monolito**: rompe el aislamiento del MX (objetivo central del change).

**Por qué duplicación**:

-   `Foodit-acumulado` es usado por otras secciones del monolito; una copia desacoplada en `foodit-mx` permite que `/recetas` itere sin riesgo de regresión en esas otras secciones.
-   El costo de mantener dos copias se acepta explícitamente a cambio de aislamiento de release.

#### `Foodit-ficha-receta` — copia directa

**Elegido**: Copiar el layout al bundle MX con adaptaciones mínimas (rutas, imports).

**Por qué copia directa** (sin necesidad de "duplicación estratégica"):

-   `Foodit-ficha-receta` es exclusivo de `/recetas/<*-nid>`; no existe en otras secciones del monolito, por lo que no hay riesgo de regresión cruzada.
-   La copia es mecánica: ajustar imports relativos y el registro del layout en el bundle. Sin lógica adicional de desacoplamiento.

#### Nota post-Fase 3: PageBuilder y el layout de `/recetas` — corrección no-swap

Durante la implementación de Fase 3 se descubrió que PageBuilder tiene el path `/recetas` mapeado actualmente al layout `Foodit-subcategorias`, no a `Foodit-acumulado` como se asumía originalmente. Aunque las pruebas confirmaron que el swap a `Foodit-acumulado` era técnicamente compatible, **se decidió NO ejecutar el swap**: `/recetas` mantiene `Foodit-subcategorias` como layout productivo.

Impacto en el plan de migración (corrección no-swap):

-   `Foodit-subcategorias` se agrega al bundle MX (Fase 4e) como **layout definitivo de `/recetas`** (copia fiel en paridad con el monolito), no como fallback temporal. PageBuilder conserva el mapeo existente.
-   La tarea 6.8 (swap en PageBuilder) queda **CANCELADA**. No hay cambio de routing.
-   `Foodit-acumulado` se conserva migrado en el bundle MX (Fase 3 + bloque 4d) como duplicación estratégica desacoplada del monolito, **pero sin ruta asignada** — disponible para evolución/uso futuro, no sirve `/recetas` por defecto.

### Decision 4: `libs/` con generator local `ln-arc-lib` self-contained (no wrappea `@nx/js:lib`)

> ✅ **RESUELTO (Arquitectura, 2026-06-17): copy-vs-lib es _per-componente, just-in-time_.** Al migrar cada pieza: solo-foodit-nuevo → copiar; compartido **congelado** → copiar (duplicar no duele); compartido que **se va a cambiar** en ambos lados → **lib `@ln/*`** (centralizar). Disparador para libificar: cuando te topás con que hay que CAMBIAR el código compartido. **"Lib" = paquete `@ln/*` en `node_modules`** (`file:`/symlink para dev **y** prod — Fusion hornea la lib en el bundle, deploy autocontenido; publicar versionado es **opcional**, solo para gobernanza de versión), NO alias de tsconfig (Fusion no lo resuelve). Sin mandato global. El generator + `libs/` (abajo) se mantienen como workspace de esas libs. Detalle completo + fuentes Arc: [`docs/migrate-mx/libs-strategy/fusion-libs-resolution.md`](../../../docs/migrate-mx/libs-strategy/fusion-libs-resolution.md).

**Elegido**: Generator local en `tools/generators/ln-arc-lib/` construido **self-contained** sobre las primitivas de `@nx/devkit` (`generateFiles`/`updateJson`/`formatFiles`), que aplica las convenciones del repo (importPath `@ln/arc-<name>`, tags por scope/type, README template, targets `build`/`lint`/`test`, buildable y no publicable).

**Alternativas**:

-   **Wrappear `@nx/js:lib`** (intención original): descartado. `@nx/js:lib` asume libs compiladas con `tsc`, testeadas con `jest` y potencialmente publicables — un ecosistema que este monolito **Fusion/Webpack NO usa**. Arrastra scaffolding ajeno (`tsconfig.lib.json`, config de jest, `package.json` de publish) e invoca sub-generators de `@nx/jest` y `@nx/eslint` que **no están instalados** en el repo. Wrappearlo importaría convenciones que pelean con el repo. _Nota: esta decisión se mantendría aun con esos deps presentes — no es solo un workaround._
-   **Usar `@nx/js:lib` directamente sin wrapper**: cada dev decide convenciones; deriva en inconsistencia entre libs.
-   **Solo documentar convenciones en `CONTRIBUTING.md`**: no se enforza; el linter no detecta drift.

**Por qué generator local**:

-   Garantiza consistencia (importPath, tags, estructura) sin depender de revisión manual
-   Tags habilitan reglas de boundaries diferenciadas por tipo (`type:util` no puede importar `type:ui`)
-   Onboarding más simple: un solo comando para crear libs correctas
-   Cero dependencias de toolchain extra: corre con lo que ya hay en el repo

**Lenguaje del generator — JS, no TS**: el generator se autora en `index.js` (CommonJS), no en `.ts`. Motivo: el workspace **no tiene transpiler de generators** (`@swc/core`, `ts-node` y `@swc-node/register` ausentes), por lo que un `.ts` no es ejecutable por `nx g`. Decisión deliberada: no se agrega un transpiler solo para honrar la extensión — el generator son ~130 líneas de glue y JS es adecuado. Si a futuro se construyen muchos generators y se quiere type-safety, se evalúa el transpiler como decisión propia.

**Registro como plugin local**: para que `nx g ln-arc-lib` resuelva por nombre corto, Nx exige resolver la colección vía node-resolution. Se registra como plugin local `@ln/arc-tools` mediante `tools/generators/{package.json,generators.json}` + un devDep `"@ln/arc-tools": "file:tools/generators"` en el `package.json` raíz (que `npm install` symlinkea a `node_modules/@ln/arc-tools`). El symlink no se versiona: **`npm install` es requisito** tras clonar para que el nombre corto resuelva.

**Estructura aplicada** (fórmula uniforme `libs/<scope>/<type>/<name>`, alineada con el spec `monorepo-shared-libs`):

-   `libs/shared/{ui,util,data-access}/<name>/` para código consumible por cualquier bundle
-   `libs/foodit/<type>/<name>/` para código compartido entre múltiples futuros bundles Foodit (el `<type>` se mantiene en la ruta para conservar la fórmula uniforme y los boundaries por tipo; el directorio base `libs/foodit/` existe desde 4b.1)

**Scope de las libs**: el generator crea únicamente libs **internas** (buildable, no publicables). No se agrega soporte para `publishable` porque todo el código de `libs/` es de uso exclusivo de este repo; si en el futuro una lib debe publicarse a `@ln/*`, se evalúa en ese momento como change independiente.

### Decision 5: Deploy progresivo con checkpoints humanos (HITL)

**Elegido**: Go-live por capas (output-type → layouts → componentes → PB connect), con un checkpoint de validación local entre cada capa antes de promover.

**Alternativas**:

-   **Big-bang**: deploy completo de una; difícil aislar la causa de un fallo en producción.
-   **Feature flags por componente**: complejidad alta para un piloto; el MX Router ya provee toggle a nivel sección.

**Por qué progresivo + HITL**:

-   Acota el scope de cada validación → menos fatiga de revisión
-   Cada capa que rompe se diagnostica con mínimo cambio diferencial
-   El rollback es cambiar 1 línea en el script de routing MX (vuelve a `default`)

### Decision 6: Pipeline solo local (`deployer.js`) en MVP1; CI/CD diferido

**Elegido**: `./scripts/deployer.js` con flags `--sandbox/--st/--prod/--use-mxid` ejecutado manualmente. El script de routing MX (que activa/desactiva la sección en PageBuilder) también vive en `./scripts/`. `.env.example` en raíz documenta las variables necesarias. Ambos scripts se versionan en este repo (`Contenidos`); no hay repo de operaciones separado para MVP1.

**Alternativa**: Configurar Azure DevOps pipelines desde MVP1.

**Por qué diferir CI/CD**:

-   El bundle MX es nuevo; iterar manualmente reduce el bucle de feedback durante el piloto
-   CI/CD requiere variables/secrets en ADO + aprobaciones de seguridad → bloquea el go-live del piloto
-   Una vez estable, una feature posterior portea `deployer.js` a un pipeline yml

## Risks / Trade-offs

-   **Riesgo**: Adoptar Nx puede introducir conflictos con scripts npm existentes del bundle `default` (`ln:buildjs`, `ln:copycss`, `npm run build-dev`).
    → **Mitigación**: Mantener `package.json` scripts intactos en raíz; Nx envuelve sin reemplazar. Validar `npm run build-dev` post-Nx-init antes de continuar.

-   **Riesgo**: Drift entre el layout `Foodit-acumulado` duplicado en el bundle MX y el original del monolito (bug fixes que no se propagan).
    → **Mitigación**: Documentar en el header del archivo duplicado el origen y la fecha del fork; el equipo Foodit es dueño de mantener paridad funcional cuando aplique.

-   **Riesgo**: Migrar 58 dependencias `@ln/*` con versiones pinneadas puede divergir del monolito si este actualiza.
    → **Mitigación**: El audit en `docs/migrate-mx/ln-packages/` es snapshot de hoy; la primera task del MVP1 valida que las versiones del bundle MX matchean al monolito al momento del go-live.

-   **Riesgo**: El generator `ln-arc-lib` se subutiliza si los devs prefieren `@nx/js:lib` directo.
    → **Mitigación**: Documentar en `CONTRIBUTING.md` que `ln-arc-lib` es el camino oficial; PR review enforza.

-   **Riesgo**: El script de routing MX cambia config en PageBuilder sin auditoría git.
    → **Mitigación**: El script logea la operación (path + bundle target + timestamp); el operador commitea el log al repo como parte del PR de go-live.

-   **Riesgo**: Los 10 content sources migrados pueden depender transitivamente de utils/filtros no auditados.
    → **Mitigación**: La migración por content source incluye análisis de imports transitivos; cualquier dependencia no listada en `docs/migrate-mx/content-sources/audit.md` levanta una task adicional.

-   **Trade-off**: Bundle MX en blanco (`fusion init`) requiere más adaptación inicial que copiar el bundle de referencia, pero produce un repo más auditable.

-   **Trade-off**: Duplicar `Foodit-acumulado` en lugar de extraer a `libs/` aumenta superficie a mantener, a cambio de aislamiento de release.

## Migration Plan

1. **Habilitar Nx** en `Contenidos` (sin tocar bundle `default`); validar `npm run build-dev` sigue funcionando.
2. **Configurar `libs/` + tsconfig + ESLint boundaries**; crear generator `ln-arc-lib`. Validar generando una lib dummy.
3. **`fusion init` en `apps/foodit-mx/`**; adaptar `package.json`, `webpack.config.js`, `properties/`, `environment/`, `arc.config.json`, `.npmrc`, `.nvmrc` (Node v22, igual que el repo) según referencia. Pinear las 58 deps `@ln/*`.
4. **Implementar `deployer.js`** con flags y `.env.example`.
5. **Output-type `foodit.jsx` adaptado** → primer deploy a sandbox. ✋ Checkpoint local.
6. **Activar MX Router** para `/recetas` apuntando a `foodit-mx`. ✋ Validar HTTP 200 en sandbox.
7. **Migrar layouts** (`Foodit-acumulado` duplicado, `Foodit-ficha-receta` copia). ✋ Checkpoint render.
8. **Card de scope post-layout** que delimita features/private en juego.
9. **Migración progresiva de componentes**, evaluando copia vs `libs/` por archivo. ✋ Checkpoint por bloque.
10. **Migrar 10 content sources + utils + filtros**. ✋ Checkpoint datos reales.
11. **Promote a staging → prod**.

**Rollback**: ejecutar `deployer.js`/script de routing con flag de desactivación → `/recetas` vuelve a servirse desde el bundle `default`. El bundle MX queda buildeado y disponible; no se desinstala.

## Open Questions

> No hay open questions pendientes.
