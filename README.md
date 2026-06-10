# Cron de mantenimiento ARC: Azure DevOps + planilla

Esto instala un cron de Hermes para auditar y mantener el board de Azure DevOps de ARC (`Contenidos-Web-LN`) y reflejar evidencia en la planilla de release.

La idea es que sea llave en mano, pero no mágica: cada persona tiene que tener sus credenciales locales funcionando. Jarvis puede manejar el workflow, pero si no le das acceso a la obra, no levanta una pared.

## Índice

- [Lectura rápida](#lectura-rápida)
- [1. Qué hace](#1-qué-hace)
- [2. Separación de responsabilidades: script vs Hermes](#2-separación-de-responsabilidades-script-vs-hermes)
  - [2.1 Qué hace `arc-board-check.sh`](#21-qué-hace-arc-board-checksh)
  - [2.2 Qué hace Hermes en el cron](#22-qué-hace-hermes-en-el-cron)
  - [2.3 Qué hace `cron.prompt.md`](#23-qué-hace-cronpromptmd)
  - [2.4 Flujo completo de una corrida](#24-flujo-completo-de-una-corrida)
- [3. Cómo funciona la instalación](#3-cómo-funciona-la-instalación)
- [4. ¿Puede funcionar sin Hermes?](#4-puede-funcionar-sin-hermes)
- [5. Modo auditoría independiente (sin Hermes)](#5-modo-auditoría-independiente-sin-hermes)
- [6. Requisitos](#6-requisitos)
- [7. Instalación rápida](#7-instalación-rápida)
- [8. Configuración del `.env`](#8-configuración-del-env)
- [9. Verificación después de instalar](#9-verificación-después-de-instalar)
- [10. Actualizar una instalación existente](#10-actualizar-una-instalación-existente)
- [11. Desinstalar](#11-desinstalar)
- [12. Seguridad](#12-seguridad)
- [13. Troubleshooting](#13-troubleshooting)
- [14. Roadmap e issues](#14-roadmap-e-issues)

## Lectura rápida

Si solo querés instalar el cron Hermes actual:

1. Leé [Requisitos](#6-requisitos).
2. Copiá `.env.example` a `.env` y ajustá usuario/path.
3. Corré `./install.sh --dry-run`.
4. Si el dry-run está bien, corré `./install.sh`.
5. Verificá con `hermes cron list` y `hermes cron run <JOB_ID>`.

Si querés entender la arquitectura:

- [Separación de responsabilidades](#2-separación-de-responsabilidades-script-vs-hermes) explica qué hace el script y qué hace Hermes.
- [¿Puede funcionar sin Hermes?](#4-puede-funcionar-sin-hermes) explica el roadmap para independizarlo.
- [Roadmap e issues](#14-roadmap-e-issues) apunta a los borradores de issues versionados.


## 1. Qué hace

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

## 2. Separación de responsabilidades: script vs Hermes

Esto es importante, porque si mezclamos responsabilidades después nadie entiende quién rompió qué. El bash no es el arquitecto; es el albañil que mide y trae datos.

### 2.1 Qué hace `arc-board-check.sh`

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

### 2.2 Qué hace Hermes en el cron

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

### 2.3 Qué hace `cron.prompt.md`

`cron.prompt.md` no ejecuta comandos. Es el contrato operativo que se le entrega a Hermes en cada corrida.

Define:

- scope del usuario;
- reglas de estado;
- reglas de evidencia válida;
- reglas padre/hijo;
- reglas de espejo en Google Sheets;
- comportamiento esperado antes y después de modificar algo.

Si querés cambiar la política de decisión, normalmente se cambia `cron.prompt.md`. Si querés cambiar qué datos se recolectan antes de que Hermes piense, se cambia `arc-board-check.sh`.

### 2.4 Flujo completo de una corrida

1. Hermes Scheduler dispara el job según `ARC_CRON_SCHEDULE`.
2. Hermes ejecuta `~/.hermes/scripts/arc-board-check.sh` como script pre-run.
3. El script consulta Azure DevOps y git, y devuelve evidencia textual.
4. Hermes recibe esa evidencia junto con el prompt renderizado desde `cron.prompt.md`.
5. Hermes verifica contra sistemas vivos antes de decidir.
6. Si hay evidencia suficiente, Hermes actualiza Azure DevOps y/o Google Sheets.
7. Hermes vuelve a verificar los cambios.
8. Hermes reporta resultado: cambios hechos, evidencia usada o motivo por el cual no tocó nada.

## 3. Cómo funciona la instalación

El instalador hace cuatro cosas:

1. Valida que tengas Hermes, Azure CLI, el repo ARC local y credenciales mínimas.
2. Copia `arc-board-check.sh` a `~/.hermes/scripts/arc-board-check.sh`.
3. Renderiza `cron.prompt.md` con los datos de tu `.env`.
4. Crea un cron de Hermes que ejecuta el script como contexto previo y después le pide al agente que verifique/actualice Azure DevOps y la planilla.

O sea: el script junta evidencia; Hermes razona y opera. Si Hermes no está configurado con modelo, herramientas y credenciales, el cron no tiene cerebro ni manos. Dale, no hagamos magia negra.

## 4. ¿Puede funcionar sin Hermes?

Sí, pero no todo al mismo nivel. Hoy el proyecto está armado como integración con Hermes, aunque una parte ya es independiente.

### 4.1 Qué ya puede vivir sin Hermes

`arc-board-check.sh` puede ejecutarse sin Hermes porque depende de herramientas estándar:

- bash;
- python3;
- git;
- Azure CLI;
- extensión `azure-devops`;
- credenciales de Azure DevOps;
- repo ARC clonado localmente.

Eso permite usarlo como auditoría manual o programada. Por ejemplo, con `crontab`, `systemd timer`, GitHub Actions o Azure Pipelines.

Lo que obtenés en ese modo es un reporte de evidencia. No una corrección automática del board.

### 4.2 Qué todavía depende de Hermes

La parte que hoy depende de Hermes es la más delicada:

- scheduling del job con `hermes cron`;
- ejecución de `cron.prompt.md`;
- razonamiento sobre evidencia incompleta o ambigua;
- decisión final de estado (`Ready`, `Finished`, `Closed`, `Blocked/Detenida`);
- modificación de Azure DevOps;
- actualización de Google Sheets;
- reporte final con explicación de cambios.

En criollo: sin Hermes, el script puede medir. Para decidir y operar sin Hermes hay que convertir el prompt en código testeable. Si no, estamos haciendo magia negra con otro nombre.

### 4.3 Caminos posibles

#### 4.3.1 Opción 1: modo auditoría independiente

> Implementado. Ver [Modo auditoría independiente (sin Hermes)](#5-modo-auditoría-independiente-sin-hermes) para instrucciones de uso, crontab y systemd.

Agregar un modo sin Hermes que solo genere reportes.

Ejemplo esperado:

```bash
./arc-board-check.sh > reports/board-check-$(date +%F).log
```

O instalado con cron del sistema:

```cron
0 10,17 * * * /path/to/arc-board-check.sh >> /path/to/reports/arc-board-check.log 2>&1
```

Pros:

- cero Hermes;
- bajo riesgo;
- fácil de adoptar por el equipo;
- no toca Azure DevOps ni Google Sheets.

Contras:

- solo reporta;
- alguien tiene que leer y actuar;
- no resuelve estados automáticamente.

#### 4.3.2 Opción 2: core determinístico independiente

Reescribir la lógica central como CLI propia, idealmente en Python o Node, con reglas explícitas y tests.

Arquitectura sugerida:

```text
arc-board-maintainer/
  src/
    config
    azure_devops_client
    git_evidence
    state_rules
    sheets_client
    report
    main
  tests/
```

Responsabilidades del core:

- consultar Azure DevOps;
- obtener work items, padres e hijos `Desarrollo:`;
- detectar evidencia en `develop`, `sandbox` y `master`;
- ignorar `demo/*` y `demo-sandbox/*`;
- aplicar reglas de estado;
- soportar `--dry-run` por defecto;
- aplicar cambios solo con `--apply`;
- generar reportes en texto/JSON/Markdown;
- tener tests para cada regla del board.

Pros:

- independiente de Hermes;
- predecible;
- testeable;
- mejor para compartir con el equipo;
- más fácil de correr en CI o pipelines corporativos.

Contras:

- más laburo inicial;
- hay que codificar todas las reglas que hoy están en `cron.prompt.md`;
- los casos grises ya no los resuelve un agente flexible;
- requiere mantenimiento como producto interno, no como script suelto.

#### 4.3.3 Opción 3: IA sin Hermes

Se podría reemplazar Hermes por llamadas directas a un LLM vía API.

Flujo:

1. script junta evidencia;
2. CLI manda evidencia + prompt a OpenAI/Anthropic/OpenRouter;
3. el modelo devuelve acciones propuestas en JSON;
4. el script valida y aplica.

Pros:

- no requiere Hermes;
- conserva razonamiento flexible.

Contras:

- sigue requiriendo API keys de IA;
- hay que implementar protocolo de acciones;
- hay que validar fuerte para no romper Azure DevOps;
- termina siendo un Hermes casero si no se diseña bien.

No es la primera opción recomendada. Cambiar una dependencia madura por un pegote propio no es arquitectura, es ansiedad.

### 4.4 Recomendación de roadmap

El camino sano es hacerlo por capas:

1. Mantener el modo Hermes actual como integración avanzada.
2. Agregar un modo auditoría independiente que genere reportes sin tocar nada.
3. Evolucionar a un core determinístico con `--dry-run` y tests.
4. Agregar `--apply` para cambios automáticos solo cuando las reglas estén cubiertas.
5. Dejar Hermes como adaptador opcional, no como dependencia del core.

Diseño objetivo:

```text
Core independiente
  ├─ Azure DevOps
  ├─ Git evidence
  ├─ reglas de estado
  ├─ reportes
  └─ tests

Adaptadores opcionales
  ├─ Hermes cron
  ├─ system cron / systemd timer
  ├─ GitHub Actions / Azure Pipelines
  └─ Google Sheets
```

La regla de arquitectura es simple: el core no debería saber que Hermes existe. Hermes debería ser un adaptador más.

## 5. Modo auditoría independiente (sin Hermes)

> Ver también [4.3.1 Opción 1: modo auditoría independiente](#431-opción-1-modo-auditoría-independiente) para el contexto original.

Este modo corre `arc-board-check.sh` directamente, sin Hermes, y escribe un log con timestamp en `reports/`. No modifica Azure DevOps ni Google Sheets. Es útil para auditoría manual o programada.

### 5.1 Uso rápido

```bash
cp .env.example .env
$EDITOR .env        # ajustá usuario, paths y credenciales
./run-report.sh
```

El log queda en `reports/board-check-YYYYMMDDTHHMMSS.log`.

### 5.2 Qué obtenés / qué no obtenés

| Obtenés | No obtenés |
|---------|------------|
| Reporte de evidencia con timestamp | Cambios en Azure DevOps |
| Work items en scope del usuario | Escrituras en Google Sheets |
| Hijos `Desarrollo:` en scope | Decisión automática de estado |
| Ramas remotas recientes del repo ARC | Razonamiento agentivo |
| Framing `[MODO AUDITORÍA]` en la salida | Actualización del board |

### 5.3 Códigos de salida

| Código | Significado |
|--------|-------------|
| 0 | Reporte escrito, script principal OK |
| 3 | `.env` no encontrado (guardia del wrapper) |
| 10 | Azure CLI (`az`) no instalado o no en PATH |
| 11 | Extensión `azure-devops` de az no instalada |
| 12 | `ARC_REPO_PATH` no es un repositorio git válido |

### 5.4 Programar con crontab

Para correr el reporte dos veces por día con crontab del sistema (sin Hermes):

```cron
PATH=/usr/local/bin:/usr/bin:/bin:/home/mculen/.local/bin
0 10,17 * * * /home/mculen/mculen-arc-board-cron/run-report.sh >> /tmp/run-report-cron.log 2>&1
```

Notas:
- La línea `PATH=` es obligatoria en crontab: el entorno de cron no carga tu shell profile, así que `az` y `python3` pueden no estar en el PATH por defecto. Ajustá los paths según tu instalación (`which az`, `which python3`).
- Usá paths absolutos para el script.
- `>> /tmp/run-report-cron.log 2>&1` captura la salida del wrapper; el log del board se escribe igualmente en `reports/`.

### 5.5 Programar con systemd timer

Creá dos archivos de unit:

**`~/.config/systemd/user/arc-board-report.service`**

```ini
[Unit]
Description=ARC board audit report (modo auditoria independiente)
After=network.target

[Service]
Type=oneshot
WorkingDirectory=/home/mculen/mculen-arc-board-cron
ExecStart=/home/mculen/mculen-arc-board-cron/run-report.sh
StandardOutput=journal
StandardError=journal
```

**`~/.config/systemd/user/arc-board-report.timer`**

```ini
[Unit]
Description=Ejecutar ARC board audit report dos veces por dia

[Timer]
OnCalendar=*-*-* 10,17:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

Habilitalo:

```bash
systemctl --user daemon-reload
systemctl --user enable --now arc-board-report.timer
systemctl --user list-timers arc-board-report.timer
```

Verificá la última ejecución:

```bash
journalctl --user -u arc-board-report.service -n 50
```

## 6. Requisitos

### 6.1 Sistema base

Necesitás correr esto en Linux, macOS o WSL. En Windows puro puede funcionar, pero el camino recomendado para el equipo es WSL porque ARC normalmente ya se labura desde ahí.

Comandos requeridos:

```bash
git --version
python3 --version
bash --version
```

### 6.2 Hermes Agent instalado

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

### 6.3 Hermes configurado con modelo/proveedor

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

### 6.4 Toolsets de Hermes necesarios

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

### 6.5 Scheduler/cron de Hermes funcionando

Verificá que Hermes pueda listar cron jobs:

```bash
hermes cron list
```

Si falla, corré:

```bash
hermes doctor
hermes config check
```

### 6.6 Azure CLI + extensión Azure DevOps

Instalá Azure CLI si no está instalada. Después agregá la extensión:

```bash
az extension add --name azure-devops
```

Verificá:

```bash
az --version
az extension show --name azure-devops
```

### 6.7 Login a Azure DevOps

Tenés dos opciones.

#### 6.7.1 Opción A: login interactivo

```bash
az login
az devops configure --defaults organization=https://dev.azure.com/lndigital/ project="Gestion LANACION-ARC"
```

#### 6.7.2 Opción B: PAT local

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

### 6.8 Repo ARC clonado localmente

Cada integrante necesita el repo ARC en su máquina, porque el cron cruza evidencia contra ramas remotas.

Ejemplo:

```bash
git clone <URL_DEL_REPO_ARC> ~/Arc
cd ~/Arc
git fetch --all --prune
```

El path real se configura después en `ARC_REPO_PATH`.

### 6.9 Google Workspace / Sheets, opcional pero recomendado

Si querés que el cron también mantenga la planilla `Pasajes a Sandbox y PRD - NOTAS DE TESTEO`, el Hermes del usuario tiene que tener configurado el acceso a Google Workspace/Sheets o la herramienta equivalente que use tu setup.

Validación mínima: desde Hermes, pedile que liste o consulte una planilla a la que tengas acceso. Si Hermes no puede tocar Google Sheets manualmente, el cron tampoco va a poder. No le pidas a Jarvis que abra una puerta sin llave.

## 7. Instalación rápida

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

## 8. Configuración del `.env`

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

## 9. Verificación después de instalar

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

## 10. Actualizar una instalación existente

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

## 11. Desinstalar

```bash
hermes cron list
hermes cron remove <JOB_ID>
```

Opcional:

```bash
rm ~/.hermes/scripts/arc-board-check.sh
```

## 12. Seguridad

- No commitees `.env`; contiene identidad local y paths privados.
- No metas PATs en archivos del repo. Usá variables de entorno, `~/.hermes/.env`, el credential manager local o el auth local de Azure CLI.
- El cron corre con tus permisos locales. Si tu Hermes puede actualizar Azure/Google, el cron también.
- Si pegaste un PAT en Slack, Teams, GitHub, ChatGPT, Hermes o cualquier chat: revocalo y generá otro. No negocies con credenciales quemadas.

## 13. Troubleshooting

### 13.1 `hermes: command not found`

Hermes no está instalado o la terminal no cargó el `PATH` nuevo.

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
exec "$SHELL" -l
hermes --version
```

### 13.2 Hermes está instalado pero el cron no razona o falla el modelo

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

### 13.3 `hermes cron list` falla

Corré:

```bash
hermes doctor
hermes config check
```

Después reiniciá la terminal. Si usás gateway o servicio persistente, reiniciá el gateway según tu instalación.

### 13.4 `az: command not found`

Instalá Azure CLI y la extensión:

```bash
az extension add --name azure-devops
```

### 13.5 Azure devuelve permisos denegados

Tu usuario/PAT no tiene permisos suficientes en Azure DevOps. Necesitás como mínimo leer work items. Para que el cron corrija estados/tags, necesitás permisos de escritura sobre esos work items.

### 13.6 No aparecen work items

Revisá:

- `ARC_BOARD_ASSIGNEE_EMAIL` exacto.
- `ARC_BOARD_AREA_PATH` exacto.
- Que tu login de Azure tenga acceso al proyecto.
- Que el WI esté dentro de `Contenidos-Web-LN`.

### 13.7 El cron no actualiza la planilla

El prompt le pide hacerlo, pero Hermes necesita herramientas y credenciales de Google Workspace. Verificá tu setup local antes de culpar al cron.

### 13.8 El script muestra evidencia vieja

Actualizá remotos del repo:

```bash
git -C "$ARC_REPO_PATH" fetch --all --prune
```


## 14. Roadmap e issues

El roadmap para independizar este proyecto de Hermes está documentado en `docs/issue-drafts/`.

Archivos principales:

- `docs/issue-drafts/README.md`: orden recomendado de implementación.
- `docs/issue-drafts/01-modo-auditoria-independiente.md`: auditoría sin Hermes y sin side effects.
- `docs/issue-drafts/02-core-deterministico-independiente.md`: core con reglas explícitas y tests.
- `docs/issue-drafts/03-schedulers-sin-hermes.md`: crontab, systemd, GitHub Actions y Azure Pipelines.
- `docs/issue-drafts/04-hermes-como-adaptador-opcional.md`: Hermes como adaptador opcional.

GitHub Issues reales: si el token local de `gh` tiene permisos de Issues, esos drafts se pueden publicar con `gh issue create --body-file`.
