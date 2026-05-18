## ADDED Requirements

### Requirement: Estructura de libs/ creada en el monorepo
El monorepo SHALL contener el directorio `libs/` en raíz con la estructura `libs/shared/{ui,util,data-access}/` y `libs/foodit/`. Cada lib generada SHALL incluir `src/index.ts` como punto de entrada y API pública, y `project.json` con targets `build`, `lint` y `test`.

#### Scenario: Directorios de estructura base presentes
- **WHEN** se verifica la raíz del repo después de configurar `libs/`
- **THEN** existen los directorios `libs/shared/ui/`, `libs/shared/util/`, `libs/shared/data-access/` y `libs/foodit/`

#### Scenario: Lib generada tiene punto de entrada y project.json
- **WHEN** se genera una lib con `ln-arc-lib`
- **THEN** existen `src/index.ts` y `project.json` con targets `build`, `lint` y `test` en el directorio de la lib

### Requirement: Generator ln-arc-lib scaffoldea libs con convenciones del repo
El generator SHALL estar en `tools/generators/ln-arc-lib/` y SHALL generar libs con `importPath: "@ln/arc-<name>"`, tags `scope:<scope>` y `type:<type>`, y un README template. Uso: `npx nx g ln-arc-lib --name=<name> --scope=<shared|foodit> --type=<ui|util|data-access>`.

#### Scenario: Generator disponible vía Nx
- **WHEN** se ejecuta `npx nx g ln-arc-lib --name=format-date --scope=shared --type=util`
- **THEN** se genera `libs/shared/util/format-date/` con `src/index.ts`, `project.json` y README

#### Scenario: importPath generado sigue convención @ln/arc-<name>
- **WHEN** se genera una lib con `--name=format-date --scope=shared --type=util`
- **THEN** el `project.json` de la lib registra `importPath: "@ln/arc-format-date"` y `tsconfig.base.json` incluye el path alias `@ln/arc-format-date`

#### Scenario: Tags asignados correctamente
- **WHEN** se genera una lib con `--scope=shared --type=util`
- **THEN** el `project.json` contiene los tags `["scope:shared", "type:util"]`

### Requirement: Path alias registrado automáticamente en tsconfig.base.json
El generator SHALL agregar automáticamente el path alias de la nueva lib a `tsconfig.base.json` en raíz, apuntando a `libs/<scope>/<type>/<name>/src/index.ts`, para que tanto `apps/foodit-mx/` como el bundle `default` puedan importar la lib sin configuración adicional.

#### Scenario: Alias presente en tsconfig.base.json tras generar lib
- **WHEN** se genera una nueva lib y se inspecciona `tsconfig.base.json`
- **THEN** el path `@ln/arc-<name>` está mapeado a `libs/<scope>/<type>/<name>/src/index.ts`

#### Scenario: Import resuelve desde bundle default y desde foodit-mx
- **WHEN** un archivo de `apps/foodit-mx/` y un archivo del bundle `default` importan `@ln/arc-<name>`
- **THEN** ambos imports resuelven correctamente al mismo `src/index.ts` de la lib

### Requirement: Libs son exclusivamente internas (no publicables)
Las libs generadas con `ln-arc-lib` SHALL configurarse como **buildable** (con target `build`) pero no como **publishable**. El generator no SHALL incluir configuración para publicar en registros npm externos.

#### Scenario: project.json no contiene configuración publishable
- **WHEN** se inspecciona el `project.json` de una lib generada con `ln-arc-lib`
- **THEN** no existe ningún campo `publishable: true` ni configuración de `npm publish` en los targets

### Requirement: Criterio explícito para decidir copia-vs-lib
Durante la migración de componentes, SHALL aplicarse el criterio: (a) código usado solo en Foodit/un bundle → copiar al bundle directamente; (b) código compartido entre `default` y `foodit-mx` → extraer a `libs/shared/`; (c) código compartido entre múltiples bundles Foodit futuros → extraer a `libs/foodit/`. La decisión SHALL documentarse por componente.

#### Scenario: Componente solo-Foodit copiado al bundle
- **WHEN** se evalúa un componente usado exclusivamente en el bundle `foodit-mx`
- **THEN** el componente se copia a `apps/foodit-mx/` y no se crea una lib para él

#### Scenario: Componente compartido extraído a libs/shared
- **WHEN** se identifica un componente usado tanto por el bundle `default` como por `foodit-mx`
- **THEN** el componente se extrae a `libs/shared/<type>/<name>/` vía `ln-arc-lib` y ambos bundles lo consumen por alias
