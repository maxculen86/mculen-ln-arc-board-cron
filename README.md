# Cron de mantenimiento ARC: Azure DevOps + planilla

Esto instala un cron de Hermes para auditar y mantener el board de Azure DevOps de ARC (`Contenidos-Web-LN`) y reflejar evidencia en la planilla de release.

La idea es que sea llave en mano, pero no mágica: cada persona tiene que tener sus credenciales locales funcionando. Jarvis puede manejar el workflow, pero si no le das acceso a la obra, no levanta una pared.

## Qué hace

Este repo arma un cron de Hermes compuesto por dos piezas separadas:

1. `arc-board-check.sh`: script determinístico de recolección de evidencia.
2. `cron.prompt.md`: instrucciones para que Hermes analice esa evidencia, verifique contra sistemas vivos y decida si corresponde operar.

En conjunto:

- Consulta Azure DevOps por work items en el área configurada.
- Limita el scope al usuario configurado y a sus tasks hijas `Desarrollo:`.
- Cruza evidencia con ramas remotas del repo ARC.
- Aplica las reglas oficiales del board:
  - `Ready`: evidencia real en `develop`, sin `sandbox` ni `master`.
  - `Finished`: evidencia real en `develop` + `sandbox`, sin `master`.
  - `Closed`: evidencia real en `master`.
  - `Blocked/Detenida`: PR en review o bloqueo explícito; agrega tag `code review` cuando corresponde.
- Ignora `demo/*` y `demo-sandbox/*` como evidencia terminal.
- Puede actualizar la planilla `Pasajes a Sandbox y PRD - NOTAS DE TESTEO` si el Hermes del usuario tiene herramientas/credenciales de Google Workspace.

## Separación de responsabilidades: script vs Hermes

Esto es importante, porque si mezclamos responsabilidades después nadie entiende quién rompió qué. El bash no es el arquitecto; es el albañil que mide y trae datos.

### Qué hace `arc-board-check.sh`

El script hace solamente recolección y prediagnóstico. No decide estados finales y no modifica Azure DevOps ni Google Sheets.

Responsabilidades del script:

- Lee la configuración desde variables de entorno (`ARC_BOARD_ORG`, `ARC_BOARD_PROJECT`, `ARC_BOARD_AREA_PATH`, `ARC_BOARD_ASSIGNEE_EMAIL`, `ARC_REPO_PATH`, etc.).
- Ejecuta consultas WIQL con `az boards query` para encontrar work items del usuario configurado.
- Busca tasks hijas cuyo título empieza con `Desarrollo:` aunque estén sin asignar o asignadas al usuario.
- Lee metadata básica de los work items: ID, título, estado, asignado, tags, fechas y relaciones padre/hijo.
- Ejecuta comandos `git` en `ARC_REPO_PATH` para mirar ramas remotas (`origin/develop`, `origin/sandbox`, `origin/master` y ramas relacionadas).
- Imprime un resumen textual con evidencia candidata: work items en scope, hijos `Desarrollo:`, ramas remotas relevantes y señales encontradas.

Lo que el script NO hace:

- NO cambia estados del board.
- NO asigna work items.
- NO agrega tags.
- NO escribe en la planilla.
- NO decide `Ready`, `Finished` o `Closed` como verdad final.
- NO reemplaza la verificación humana/agentiva contra Azure DevOps vivo.

El output del script es un índice de investigación. Sirve para que Hermes arranque con contexto y no tenga que descubrir todo desde cero en cada corrida.

### Qué hace Hermes en el cron

Hermes es quien razona y opera. El cron ejecuta el script primero y le inyecta esa salida al agente como contexto previo. Después Hermes sigue las reglas de `cron.prompt.md`.

Responsabilidades de Hermes:

- Lee el output del script como punto de partida, no como verdad absoluta.
- Vuelve a verificar con herramientas vivas antes de tocar nada: Azure DevOps, git remoto/local y, si aplica, Google Sheets.
- Aplica las reglas de negocio del board:
  - `Ready` si hay evidencia real en `develop` y no en `sandbox/master`.
  - `Finished` si hay evidencia real en `develop + sandbox` y no en `master`.
  - `Closed` si hay evidencia real en `master`.
  - `Blocked/Detenida` si hay PR/code review o bloqueo explícito.
- Aplica las reglas padre/hijo:
  - una task `Desarrollo:` mergeada en una rama real puede cerrarse;
  - el padre solo se cierra con evidencia propia en `master`;
  - si la hija `Desarrollo:` está sin asignar, Hermes puede asignarla antes de alinear estado.
- Corrige estados/tags/asignaciones en Azure DevOps cuando la evidencia alcanza.
- Actualiza la planilla solo si tiene herramientas y credenciales de Google Workspace configuradas.
- Después de modificar algo, vuelve a verificar y reporta qué cambió y con qué evidencia.

### Qué hace `cron.prompt.md`

`cron.prompt.md` no ejecuta comandos. Es el contrato operativo que se le entrega a Hermes en cada corrida.

Define:

- scope del usuario;
- reglas de estado;
- reglas de evidencia válida;
- reglas padre/hijo;
- reglas de espejo en Google Sheets;
- comportamiento esperado antes y después de modificar algo.

Si querés cambiar la política de decisión, normalmente se cambia `cron.prompt.md`. Si querés cambiar qué datos se recolectan antes de que Hermes piense, se cambia `arc-board-check.sh`.

### Flujo completo de una corrida

1. Hermes Scheduler dispara el job según `ARC_CRON_SCHEDULE`.
2. Hermes ejecuta `~/.hermes/scripts/arc-board-check.sh` como script pre-run.
3. El script consulta Azure DevOps y git, y devuelve evidencia textual.
4. Hermes recibe esa evidencia junto con el prompt renderizado desde `cron.prompt.md`.
5. Hermes verifica contra sistemas vivos antes de decidir.
6. Si hay evidencia suficiente, Hermes actualiza Azure DevOps y/o Google Sheets.
7. Hermes vuelve a verificar los cambios.
8. Hermes reporta resultado: cambios hechos, evidencia usada o motivo por el cual no tocó nada.

## Cómo funciona la instalación

El instalador hace cuatro cosas:

1. Valida que tengas Hermes, Azure CLI, el repo ARC local y credenciales mínimas.
2. Copia `arc-board-check.sh` a `~/.hermes/scripts/arc-board-check.sh`.
3. Renderiza `cron.prompt.md` con los datos de tu `.env`.
4. Crea un cron de Hermes que ejecuta el script como contexto previo y después le pide al agente que verifique/actualice Azure DevOps y la planilla.

O sea: el script junta evidencia; Hermes razona y opera. Si Hermes no está configurado con modelo, herramientas y credenciales, el cron no tiene cerebro ni manos. Dale, no hagamos magia negra.

## Requisitos

### 1. Sistema base

Necesitás correr esto en Linux, macOS o WSL. En Windows puro puede funcionar, pero el camino recomendado para el equipo es WSL porque ARC normalmente ya se labura desde ahí.

Comandos requeridos:

```bash
git --version
python3 --version
bash --version
```

### 2. Hermes Agent instalado

Instalación oficial:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Cerrá y abrí la terminal si `hermes` no aparece en el `PATH`.

Verificá:

```bash
hermes --version
hermes doctor
```

### 3. Hermes configurado con modelo/proveedor

Hermes necesita un modelo configurado para que el cron pueda ejecutar el prompt.

Configuración interactiva recomendada:

```bash
hermes setup
hermes model
```

Si usás un proveedor con API key, cargala según el proveedor. Ejemplos comunes:

```bash
hermes config env-path
$EDITOR "$(hermes config env-path)"
```

Variables típicas en `~/.hermes/.env`:

```bash
OPENROUTER_API_KEY="..."
ANTHROPIC_API_KEY="..."
OPENAI_API_KEY="..."
GOOGLE_API_KEY="..."
```

No necesitás todas. Necesitás la que corresponda al proveedor/modelo que elijas en `hermes model`.

Chequeo mínimo:

```bash
hermes chat -q "Respondé solamente: Hermes OK"
```

Si eso no responde bien, ni sigas con el cron. Primero arreglá Hermes. Conceptos antes que comandos, viejo.

### 4. Toolsets de Hermes necesarios

El cron necesita que Hermes pueda usar herramientas para inspeccionar y operar:

- `terminal`: ejecutar comandos (`az`, `git`, scripts locales).
- `file`: leer contexto local cuando haga falta.
- `cronjob`: administrar/verificar cron jobs desde Hermes.
- Google Workspace o el mecanismo local que uses para Sheets, si querés que actualice la planilla.

Ver herramientas disponibles:

```bash
hermes tools list
```

Configuración interactiva:

```bash
hermes tools
```

Después de cambiar herramientas, arrancá una sesión nueva de Hermes o usá `/reset` en la sesión interactiva. Si pretendés que un proceso ya iniciado lea configuración nueva sin reiniciarlo, estás peleándote con el cache, no con el sistema.

### 5. Scheduler/cron de Hermes funcionando

Verificá que Hermes pueda listar cron jobs:

```bash
hermes cron list
```

Si falla, corré:

```bash
hermes doctor
hermes config check
```

### 6. Azure CLI + extensión Azure DevOps

Instalá Azure CLI si no está instalada. Después agregá la extensión:

```bash
az extension add --name azure-devops
```

Verificá:

```bash
az --version
az extension show --name azure-devops
```

### 7. Login a Azure DevOps

Tenés dos opciones.

#### Opción A: login interactivo

```bash
az login
az devops configure --defaults organization=https://dev.azure.com/lndigital/ project="Gestion LANACION-ARC"
```

#### Opción B: PAT local

Creá un PAT en Azure DevOps con permisos para leer work items y, si querés que Hermes actualice estados/tags, permisos de escritura sobre work items.

Guardalo fuera del repo. Por ejemplo en tu shell profile o en `~/.hermes/.env`:

```bash
AZURE_DEVOPS_EXT_PAT="..."
```

Nunca lo pegues en este repo, nunca en `.env` compartido, nunca en un README. Si lo compartís por chat, consideralo quemado y revocalo.

Verificación:

```bash
az boards query \
  --org "https://dev.azure.com/lndigital/" \
  --project "Gestion LANACION-ARC" \
  --wiql "SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = 'Gestion LANACION-ARC' ORDER BY [System.ChangedDate] DESC" \
  --output table
```

### 8. Repo ARC clonado localmente

Cada integrante necesita el repo ARC en su máquina, porque el cron cruza evidencia contra ramas remotas.

Ejemplo:

```bash
git clone <URL_DEL_REPO_ARC> ~/Arc
cd ~/Arc
git fetch --all --prune
```

El path real se configura después en `ARC_REPO_PATH`.

### 9. Google Workspace / Sheets, opcional pero recomendado

Si querés que el cron también mantenga la planilla `Pasajes a Sandbox y PRD - NOTAS DE TESTEO`, el Hermes del usuario tiene que tener configurado el acceso a Google Workspace/Sheets o la herramienta equivalente que use tu setup.

Validación mínima: desde Hermes, pedile que liste o consulte una planilla a la que tengas acceso. Si Hermes no puede tocar Google Sheets manualmente, el cron tampoco va a poder. No le pidas a Jarvis que abra una puerta sin llave.

## Instalación rápida

Desde este repo:

```bash
git clone https://github.com/maxculen86/mculen-ln-arc-board-cron.git
cd mculen-ln-arc-board-cron
cp .env.example .env
$EDITOR .env
./install.sh --dry-run
./install.sh
```

Para validar sin crear el cron todavía:

```bash
./install.sh --dry-run
```

## Configuración del `.env`

Editá `.env` antes de instalar:

```bash
ARC_BOARD_ORG="https://dev.azure.com/lndigital/"
ARC_BOARD_PROJECT="Gestion LANACION-ARC"
ARC_BOARD_AREA_PATH="Gestion LANACION-ARC\\Contenidos-Web-LN"

ARC_BOARD_ASSIGNEE_EMAIL="tu.usuario@lanacion.com.ar"
ARC_BOARD_ASSIGNEE_NAME="tuusuario"
ARC_REPO_PATH="/home/tuusuario/Arc"

ARC_CRON_SCHEDULE="0 10,17 * * *"
ARC_CRON_DELIVER="local"
ARC_CRON_WORKDIR="/home/tuusuario"
ARC_CRON_NAME_PREFIX="azure-devops-board-check"
```

Campos importantes:

- `ARC_BOARD_ASSIGNEE_EMAIL`: mail exacto del usuario en Azure DevOps.
- `ARC_BOARD_ASSIGNEE_NAME`: nombre corto usado para nombrar el cron.
- `ARC_REPO_PATH`: path local al repo ARC.
- `ARC_CRON_SCHEDULE`: horario del cron. `0 10,17 * * *` corre a las 10:00 y 17:00 del timezone del host.
- `ARC_CRON_DELIVER`: destino de entrega de Hermes. `local` deja la salida local; si tu Hermes tiene gateway configurado, podés ajustarlo.
- `ARC_CRON_WORKDIR`: directorio desde donde corre el job.

Para otro integrante del equipo, normalmente cambiás `ARC_BOARD_ASSIGNEE_EMAIL`, `ARC_BOARD_ASSIGNEE_NAME`, `ARC_REPO_PATH` y `ARC_CRON_WORKDIR`.

## Verificación después de instalar

```bash
hermes cron list
bash ~/.hermes/scripts/arc-board-check.sh
hermes cron run <JOB_ID>
```

Sacá el `<JOB_ID>` desde `hermes cron list`.

También podés verificar que el script copiado exista:

```bash
test -x ~/.hermes/scripts/arc-board-check.sh && echo "script OK"
```

## Actualizar una instalación existente

```bash
git pull
./install.sh --dry-run
./install.sh
```

Si ya existe un cron viejo con el mismo propósito, revisá primero:

```bash
hermes cron list
```

Y eliminá el job anterior si quedó duplicado:

```bash
hermes cron remove <JOB_ID>
```

## Desinstalar

```bash
hermes cron list
hermes cron remove <JOB_ID>
```

Opcional:

```bash
rm ~/.hermes/scripts/arc-board-check.sh
```

## Seguridad

- No commitees `.env`; contiene identidad local y paths privados.
- No metas PATs en archivos del repo. Usá variables de entorno, `~/.hermes/.env`, el credential manager local o el auth local de Azure CLI.
- El cron corre con tus permisos locales. Si tu Hermes puede actualizar Azure/Google, el cron también.
- Si pegaste un PAT en Slack, Teams, GitHub, ChatGPT, Hermes o cualquier chat: revocalo y generá otro. No negocies con credenciales quemadas.

## Troubleshooting

### `hermes: command not found`

Hermes no está instalado o la terminal no cargó el `PATH` nuevo.

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
exec "$SHELL" -l
hermes --version
```

### Hermes está instalado pero el cron no razona o falla el modelo

Verificá modelo/proveedor:

```bash
hermes doctor
hermes model
hermes chat -q "Respondé solamente: OK"
```

Si usás API keys, revisá:

```bash
hermes config env-path
```

### `hermes cron list` falla

Corré:

```bash
hermes doctor
hermes config check
```

Después reiniciá la terminal. Si usás gateway o servicio persistente, reiniciá el gateway según tu instalación.

### `az: command not found`

Instalá Azure CLI y la extensión:

```bash
az extension add --name azure-devops
```

### Azure devuelve permisos denegados

Tu usuario/PAT no tiene permisos suficientes en Azure DevOps. Necesitás como mínimo leer work items. Para que el cron corrija estados/tags, necesitás permisos de escritura sobre esos work items.

### No aparecen work items

Revisá:

- `ARC_BOARD_ASSIGNEE_EMAIL` exacto.
- `ARC_BOARD_AREA_PATH` exacto.
- Que tu login de Azure tenga acceso al proyecto.
- Que el WI esté dentro de `Contenidos-Web-LN`.

### El cron no actualiza la planilla

El prompt le pide hacerlo, pero Hermes necesita herramientas y credenciales de Google Workspace. Verificá tu setup local antes de culpar al cron.

### El script muestra evidencia vieja

Actualizá remotos del repo:

```bash
git -C "$ARC_REPO_PATH" fetch --all --prune
```
