## ADDED Requirements

### Requirement: Nx instalado sin romper workflows existentes
El monorepo `Arc` SHALL integrar Nx con `nx.json` en raíz y un `project.json` por proyecto (app y lib), de forma que los scripts npm existentes del bundle `default` (`npm run build-dev`, `ln:buildjs`, `ln:copycss`) continúen funcionando sin modificaciones.

#### Scenario: Build del bundle default post-instalación Nx
- **WHEN** se ejecuta `npm run build-dev` después de integrar Nx
- **THEN** el build completa sin errores y el bundle `default` produce el output esperado

#### Scenario: Scripts npm existentes no alterados
- **WHEN** se verifica el `package.json` raíz después de la integración Nx
- **THEN** las entradas `scripts` existentes permanecen idénticas a las previas a la integración

### Requirement: tsconfig.base.json con path aliases para libs
El monorepo SHALL contener un `tsconfig.base.json` en raíz que defina los path aliases para cada lib bajo `libs/`, con el formato `@ln/arc-<lib-name>` apuntando a `libs/<path>/src/index.ts`.

#### Scenario: Path alias resuelve correctamente
- **WHEN** un archivo en `apps/foodit-mx/` importa `@ln/arc-shared-util`
- **THEN** el módulo resuelve a `libs/shared/util/<name>/src/index.ts` según el alias en `tsconfig.base.json`

#### Scenario: Path alias disponible para bundle default
- **WHEN** un archivo del bundle `default` importa una lib via `@ln/arc-<name>`
- **THEN** el alias resuelve correctamente desde `tsconfig.base.json`, sin configuración adicional por bundle

### Requirement: ESLint enforce-module-boundaries configurado
El monorepo SHALL incluir la regla `@nx/enforce-module-boundaries` en la configuración ESLint raíz con la restricción `{ sourceTag: "type:app", notDependOnLibsWithTags: ["type:app"] }`, de modo que ningún proyecto `type:app` pueda importar desde otro proyecto `type:app`.

#### Scenario: Import entre apps detectado por linter
- **WHEN** un archivo de `apps/foodit-mx/` intenta importar desde `apps/` (otro bundle)
- **THEN** ESLint reporta un error de boundary violation

#### Scenario: Import desde lib permitido por linter
- **WHEN** un archivo de `apps/foodit-mx/` importa desde `@ln/arc-shared-util`
- **THEN** ESLint no reporta ningún error de boundary violation

### Requirement: project.json por app con targets estándar
Cada app bajo `apps/` SHALL tener su propio `project.json` con los targets `build`, `lint` y `test` configurados, de forma que `nx build <app>`, `nx lint <app>` y `nx test <app>` sean ejecutables independientemente.

#### Scenario: Target build de foodit-mx ejecutable vía Nx
- **WHEN** se ejecuta `nx build foodit-mx`
- **THEN** Nx resuelve y ejecuta el target `build` definido en `apps/foodit-mx/project.json` sin error

#### Scenario: Targets del bundle default no afectados
- **WHEN** se ejecuta `nx lint default` o `nx test default`
- **THEN** los targets del bundle `default` se ejecutan correctamente usando su propia configuración de `project.json`
