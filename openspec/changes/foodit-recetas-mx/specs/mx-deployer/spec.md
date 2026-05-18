## ADDED Requirements

### Requirement: deployer.js con flags de entorno y soporte para mxId

El archivo `./scripts/deployer.js` SHALL soportar los flags `--sandbox`, `--st`, `--prod` para seleccionar el entorno de destino, y `--use-mxid` para indicar que el deploy es de un bundle MX (`foodit-mx`). La secuencia SHALL ser: build → upload → deploy → promote.

#### Scenario: Deploy a sandbox con flag --sandbox

-   **WHEN** se ejecuta `node ./scripts/deployer.js --sandbox --use-mxid`
-   **THEN** el script ejecuta la secuencia build → upload → deploy → promote apuntando al entorno sandbox del bundle MX

#### Scenario: Deploy a producción con flag --prod

-   **WHEN** se ejecuta `node ./scripts/deployer.js --prod --use-mxid`
-   **THEN** el script ejecuta la secuencia completa apuntando al entorno de producción del bundle MX

#### Scenario: Flag --use-mxid activa parámetros específicos de MX

-   **WHEN** se ejecuta el script con `--use-mxid`
-   **THEN** el deploy incluye el mxId `foodit-mx` en los parámetros de upload/promote, diferenciándolo de un deploy del bundle `default`

### Requirement: .env.example documenta las variables por entorno

El repo SHALL contener `.env.example` en la raíz del bundle (`apps/foodit-mx/.env.example`) con las variables de entorno requeridas por `deployer.js` para cada entorno (sandbox, staging, prod), con valores placeholder y comentarios descriptivos.

#### Scenario: .env.example presente con todas las variables

-   **WHEN** se verifica `apps/foodit-mx/.env.example`
-   **THEN** el archivo lista al menos: credenciales de Arc, endpoint de deployment API, mxId, y una sección por entorno (sandbox/staging/prod)

#### Scenario: Script falla con mensaje descriptivo si variable falta

-   **WHEN** se ejecuta `deployer.js` sin una variable de entorno requerida
-   **THEN** el script termina con un error descriptivo indicando qué variable falta, sin intentar ejecutar el deploy parcialmente

### Requirement: Script versionado en el repo Contenidos

El script `./scripts/deployer.js` y el script de routing MX SHALL versionarse en el repo `Contenidos` (este repo). No SHALL existir un repo de operaciones separado para MVP1.

#### Scenario: Scripts presentes en ./scripts/ del repo

-   **WHEN** se verifica el directorio `./scripts/` en el repo `Contenidos`
-   **THEN** existen al menos `deployer.js` y el script de routing MX, ambos comiteados con historial git

### Requirement: CI/CD en Azure DevOps explícitamente fuera de scope de MVP1

El deploy SHALL ejecutarse manualmente desde local usando `deployer.js`. No SHALL crearse pipelines de Azure DevOps, variables en ADO ni configuración de CI/CD como parte de este change.

#### Scenario: No existen pipelines ADO nuevos para foodit-mx en MVP1

-   **WHEN** se revisa el `azure-pipeline.yml` del repo y las definiciones de pipeline en ADO
-   **THEN** no existe ningún pipeline nuevo relacionado con `foodit-mx` creado como parte de este change
