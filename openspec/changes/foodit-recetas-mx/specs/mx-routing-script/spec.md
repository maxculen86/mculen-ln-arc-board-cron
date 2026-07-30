## ADDED Requirements

### Requirement: Script activa el MX Router para /recetas
El archivo `./scripts/mx-routing.js` (o equivalente en `./scripts/`) SHALL poder activar el MX Router en PageBuilder apuntando el path `/recetas` al bundle `foodit-mx-1.0.0`. El script SHALL requerir que el mxId `foodit-mx` esté provisionado en Arc antes de ejecutarse.

#### Scenario: Activación del routing en PageBuilder
- **WHEN** se ejecuta el script de routing con el flag de activación y credenciales válidas
- **THEN** PageBuilder enruta el path `/recetas` al bundle `foodit-mx-1.0.0` y las peticiones a `/recetas` son servidas por el bundle MX

#### Scenario: Guard para mxId no provisionado
- **WHEN** se ejecuta el script de routing y el mxId `foodit-mx` no está provisionado en Arc
- **THEN** el script termina con un error descriptivo indicando que el mxId debe estar registrado antes de activar el routing

### Requirement: Script soporta rollback (desactivación del MX Router)
El script SHALL poder desactivar el MX Router para `/recetas`, de modo que el path vuelva a ser servido por el bundle `default` del monolito. El bundle MX SHALL permanecer deployado; solo se revierte el routing.

#### Scenario: Desactivación del routing (rollback)
- **WHEN** se ejecuta el script con el flag de desactivación y credenciales válidas
- **THEN** PageBuilder deja de enrutar `/recetas` al bundle MX y el monolito `default` vuelve a servir ese path

#### Scenario: Bundle MX no se borra al desactivar routing
- **WHEN** se completa la desactivación del routing
- **THEN** el bundle `foodit-mx-1.0.0` permanece deployado en Arc y puede reactivarse sin necesidad de un nuevo deploy

### Requirement: Script registra la operación en log
Cada ejecución del script (activación o desactivación) SHALL registrar la operación con al menos: path afectado (`/recetas`), bundle target resultante, timestamp y usuario/token que ejecutó la operación.

#### Scenario: Log de activación generado
- **WHEN** se activa el MX Router para `/recetas`
- **THEN** el script genera un log con path `/recetas`, bundle `foodit-mx-1.0.0` y timestamp de la operación

#### Scenario: Log de desactivación generado
- **WHEN** se desactiva el MX Router para `/recetas`
- **THEN** el script genera un log indicando el rollback al bundle `default` con timestamp de la operación

### Requirement: El script parametriza el path a rutear (multi-sección)
El script SHALL aceptar el path como parámetro (`--path <prefix>`), de modo que pueda enrutar cualquier subárbol del site Foodit al MX, no solo `/recetas`. `/recetas` es el objetivo de MVP1; secciones futuras (`/postres`, etc.) se rutean con el mismo script, una corrida por subárbol, después de migrar y deployar su código. El MX se identifica por su **slug** (configurable por entorno vía `{ENV}_MX_SLUG`), distinto del id numérico que usa el deployer.

> **Nota (realidad post-implementación)**: el bundle no vive en un MX llamado `foodit-mx` sino dentro de un MX existente (ej. `devlab-ln` en sandbox). Las menciones a "mxId `foodit-mx`" en este spec son el nombre aspiracional; el identificador real es el slug por entorno (`{ENV}_MX_SLUG`).

#### Scenario: Ruteo de un path arbitrario
- **WHEN** se ejecuta el script con `--path <prefix>` para un subárbol válido del site
- **THEN** el script agrega (activación) o quita (rollback) ese prefijo de los `siteMappings` del MX, sin estar limitado a `/recetas`

#### Scenario: El prefijo cubre todo el subárbol
- **WHEN** se rutea `/recetas` (prefijo) al MX
- **THEN** todas las sub-rutas (`/recetas/<slug>`, `/recetas/<categoría>`) quedan servidas por el mismo MX sin necesidad de un mapping por ruta
