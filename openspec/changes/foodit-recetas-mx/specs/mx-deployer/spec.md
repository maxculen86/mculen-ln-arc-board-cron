## ADDED Requirements

### Requirement: deployer.js con flags de entorno y soporte para mxId

El archivo `./scripts/deployer.js` SHALL soportar los flags `--sandbox` (default), `--dev`, `--st`, `--prod` para seleccionar el entorno de destino. El targeting de mxId (`foodit-mx`) SHALL estar activo por defecto en todo ambiente; `--no-mxid` es la vía de escape explícita (no recomendada) para desactivarlo. La secuencia SHALL ser: build → upload → deploy → checkDeployment. Promote NO SHALL ejecutarse automáticamente en ningún ambiente — requiere el flag opt-in `--promote`, ya que el mxId de Sandbox y Development es compartido entre todo el equipo, y un promote automático pisaría sin aviso cualquier demo que esté live para otra persona.

> **Corrección (2026-07-06)**: versión previa de este requirement describía `--use-mxid` como flag opt-in y promote como parte automática de la secuencia. Ambos se invirtieron por diseño: mxId quedó on-by-default (`--no-mxid` para desactivar) y promote quedó opt-in (`--promote`), decisiones tomadas explícitamente durante la implementación de Fase 5 y confirmadas en vivo contra Sandbox y Development.

#### Scenario: Deploy a sandbox con flag --sandbox (default)

-   **WHEN** se ejecuta `node ./scripts/deployer.js --sandbox` (o sin flags, sandbox es el default)
-   **THEN** el script ejecuta build → upload → deploy → checkDeployment apuntando al entorno sandbox del bundle MX, sin promover

#### Scenario: Deploy a producción con flag --prod

-   **WHEN** se ejecuta `node ./scripts/deployer.js --prod`
-   **THEN** el script ejecuta la secuencia completa apuntando al entorno de producción del bundle MX, sin promover

#### Scenario: mxId activo por defecto, --no-mxid como escape opcional

-   **WHEN** se ejecuta el script sin pasar ningún flag de mxId
-   **THEN** el deploy incluye el mxId `foodit-mx` en los parámetros de upload/deploy, diferenciándolo de un deploy del bundle `default`; pasar `--no-mxid` explícitamente lo desactiva

#### Scenario: Promote es opt-in, nunca automático

-   **WHEN** se ejecuta el script sin el flag `--promote`
-   **THEN** el deploy queda completo pero no-live; el mensaje final indica que el promote debe hacerse manualmente en ese ambiente
-   **WHEN** se ejecuta con `--promote`
-   **THEN** el script promueve la versión recién deployada a "live" inmediatamente después de `checkDeployment`

### Requirement: .env.example documenta las variables por entorno

El repo SHALL contener `.env.example` en la raíz del bundle (`apps/foodit-mx/.env.example`) con las variables de entorno requeridas por `deployer.js` para cada entorno (sandbox, development, staging, prod), con valores placeholder y comentarios descriptivos.

#### Scenario: .env.example presente con todas las variables

-   **WHEN** se verifica `apps/foodit-mx/.env.example`
-   **THEN** el archivo lista al menos: credenciales de Arc, endpoint de deployment API, mxId, y una sección por entorno (sandbox/development/staging/prod)

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
