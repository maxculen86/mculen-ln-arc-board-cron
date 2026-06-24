## ADDED Requirements

### Requirement: Estructura de libs/ creada en el monorepo
El monorepo SHALL contener el directorio `libs/` en raíz con la estructura `libs/shared/{ui,util,data-access}/` y `libs/foodit/`. Cada lib generada SHALL incluir un punto de entrada de API pública (`src/index`) y `project.json` con targets `build`, `lint` y `test`. Para ser **consumible por un bundle Fusion**, la lib SHALL exponer además un `package.json` con `name: "@ln/..."` y `main` apuntando a un entry **JS/JSX** (el pipeline de Fusion es JS/JSX; un entry `.ts` no es consumible sin transpiler en este repo).

#### Scenario: Directorios de estructura base presentes
- **WHEN** se verifica la raíz del repo después de configurar `libs/`
- **THEN** existen los directorios `libs/shared/ui/`, `libs/shared/util/`, `libs/shared/data-access/` y `libs/foodit/`

#### Scenario: Lib generada tiene punto de entrada y project.json
- **WHEN** se genera una lib con `ln-arc-lib`
- **THEN** existen el entry `src/index` y `project.json` con targets `build`, `lint` y `test` en el directorio de la lib

### Requirement: Generator ln-arc-lib scaffoldea libs con convenciones del repo
El generator SHALL estar en `tools/generators/ln-arc-lib/` y SHALL generar libs con `importPath: "@ln/arc-<name>"`, tags `scope:<scope>` y `type:<type>`, y un README template. Uso: `npx nx g ln-arc-lib --name=<name> --scope=<shared|foodit> --type=<ui|util|data-access>`.

#### Scenario: Generator disponible vía Nx
- **WHEN** se ejecuta `npx nx g ln-arc-lib --name=format-date --scope=shared --type=util`
- **THEN** se genera `libs/shared/util/format-date/` con entry, `project.json` y README

#### Scenario: importPath y tags asignados correctamente
- **WHEN** se genera una lib con `--name=format-date --scope=shared --type=util`
- **THEN** el `project.json` registra `importPath: "@ln/arc-format-date"` y tags `["scope:shared", "type:util"]`

### Requirement: El alias de tsconfig es solo tooling; el consumo en runtime es vía node_modules
El path alias en `tsconfig.base.json` (que el generator registra) SHALL servir **únicamente** para tooling: resolución de `@nx/enforce-module-boundaries` en ESLint y autocomplete del IDE/TS. El bundler de Fusion **NO resuelve los path aliases de `tsconfig`** para imports de componentes — resuelve `node_modules` + rutas relativas + `fusion:`. Por lo tanto, una lib **consumible por un bundle** SHALL resolver como **paquete en `node_modules`**, vía `file:` dep (dev y prod en monorepo — Fusion hornea la lib en el bundle al buildear, el deploy queda autocontenido) o, opcionalmente, `@ln/*` publicado versionado (para gobernanza de versión o consumo desde otro repo; NO es requisito de prod). El alias NO SHALL usarse como mecanismo de runtime/build.

#### Scenario: El alias se registra para tooling
- **WHEN** se genera una lib y se inspecciona `tsconfig.base.json`
- **THEN** el path `@ln/arc-<name>` está mapeado al entry de la lib, y ESLint resuelve los boundaries usando ese alias

#### Scenario: El import resuelve en el build de Fusion vía node_modules
- **WHEN** un componente de `apps/foodit-mx/` importa la lib por nombre (`@ln/...`) y la lib está declarada como `file:` dep (o publicada) en el `package.json` del bundle
- **THEN** el import resuelve vía el symlink/paquete en `node_modules` y Fusion lo bundlea, sin depender del alias de tsconfig

#### Scenario: Un import por alias sin paquete node_modules NO resuelve en Fusion
- **WHEN** un componente importa `@ln/arc-<name>` y la lib existe SOLO como alias de `tsconfig` (sin `file:` dep ni publicación)
- **THEN** el build de Fusion falla con `Cannot find module` — el alias no alcanza

### Requirement: Libs internas con publicación versionada como camino de producción
Las libs SHALL ser **internas al repo** (no se publican a registros npm públicos). El generator no SHALL preconfigurar publicación. Para **consumo cross-bundle en producción** (bundles que deployan independiente), una lib estabilizada SHALL poder publicarse al **registry privado `@ln`** con versión pinneada — el mecanismo que controla el version-skew. En dev/monorepo, el consumo es vía `file:` dep (symlink local), sin publicar.

#### Scenario: Lib no publicable a registros públicos
- **WHEN** se inspecciona una lib generada
- **THEN** no existe configuración de publicación a un registro npm público

#### Scenario: Consumo en dev vía file: dep
- **WHEN** una lib se consume en el monorepo en dev
- **THEN** se declara como `"@ln/...": "file:../../libs/..."` en el `package.json` del bundle y resuelve por symlink en `node_modules`

### Requirement: Criterio copy-vs-lib per-componente, just-in-time
La decisión de copiar-vs-extraer-a-lib SHALL tomarse **por componente, al migrar/tocar la pieza** (no un mandato global upfront). Criterio: (a) código solo de un bundle → copiar; (b) compartido pero **congelado** (no se va a cambiar) → copiar; (c) compartido que **se va a cambiar/mantener** en ambos lados → extraer a lib. El disparador para extraer a lib SHALL ser la necesidad de **cambiar** ese código compartido. La decisión SHALL documentarse por bloque/componente.

#### Scenario: Componente solo-Foodit o compartido-congelado → copiado
- **WHEN** se evalúa un componente usado solo en `foodit-mx`, o compartido pero que no se va a modificar
- **THEN** se copia al bundle y no se crea una lib para él

#### Scenario: Componente compartido y evolutivo → lib consumida por node_modules
- **WHEN** se identifica un componente compartido entre bundles que se va a cambiar/mantener en ambos lados
- **THEN** se extrae a `libs/` y se consume vía `file:` dep (dev y prod; Fusion hornea la lib en el bundle) o, opcionalmente, `@ln/*` publicado (gobernanza de versión) — NO por alias de `tsconfig`
