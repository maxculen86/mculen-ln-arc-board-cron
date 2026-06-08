# Cron de mantenimiento ARC: Azure DevOps + planilla

Esto instala un cron de Hermes para auditar y mantener el board de Azure DevOps de ARC (`Contenidos-Web-LN`) y reflejar evidencia en la planilla de release.

La idea es que sea llave en mano, pero no mágica: cada persona tiene que tener sus credenciales locales funcionando. Jarvis puede manejar el workflow, pero si no le das acceso a la obra, no levanta una pared, boludo.

## Qué hace

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

## Requisitos

1. Hermes Agent instalado y configurado.
   - Verificar: `hermes doctor`
2. Azure CLI con extensión Azure DevOps.
   - Verificar: `az extension show --name azure-devops`
3. Login a Azure DevOps.
   - Opción interactiva: `az login`
   - Opción PAT: configurar `AZURE_DEVOPS_EXT_PAT`
4. Repo ARC clonado localmente.
5. Credenciales de Google Workspace si querés que el cron también mantenga la planilla.

## Instalación rápida

Desde la raíz del repo donde está esta carpeta:

```bash
cd tools/arc-board-cron
cp .env.example .env
$EDITOR .env
./install.sh
```

Para validar sin crear el cron todavía:

```bash
./install.sh --dry-run
```

El instalador:

- Copia `arc-board-check.sh` a `~/.hermes/scripts/arc-board-check.sh`.
- Genera un prompt personalizado desde `cron.prompt.md`.
- Crea un cron de Hermes con `hermes cron create`.
- Deja el job corriendo con el schedule configurado.

## Configuración

Editá `.env` antes de instalar:

```bash
ARC_BOARD_ASSIGNEE_EMAIL=mculen@lanacion.com.ar
ARC_BOARD_ASSIGNEE_NAME=mculen
ARC_REPO_PATH=/home/mculen/Arc
ARC_CRON_SCHEDULE="0 10,17 * * *"
ARC_CRON_DELIVER=local
```

Para otro integrante del equipo, cambiás `ARC_BOARD_ASSIGNEE_EMAIL`, `ARC_BOARD_ASSIGNEE_NAME` y `ARC_REPO_PATH`.

## Verificación

Después de instalar:

```bash
hermes cron list
bash ~/.hermes/scripts/arc-board-check.sh
hermes cron run azure-devops-board-check-$ARC_BOARD_ASSIGNEE_NAME
```

Si tu versión de Hermes no acepta el nombre en `cron run`, copiá el ID desde `hermes cron list` y ejecutá:

```bash
hermes cron run <JOB_ID>
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

- No commitees `.env`; contiene identidad local y puede terminar apuntando a paths privados.
- No metas PATs en archivos del repo. Usá variables de entorno o el auth local de Azure CLI.
- El cron corre con tus permisos locales. Si tu Hermes puede actualizar Azure/Google, el cron también.

## Troubleshooting

### `az: command not found`

Instalá Azure CLI y la extensión:

```bash
az extension add --name azure-devops
```

### No aparecen work items

Revisá:

- `ARC_BOARD_ASSIGNEE_EMAIL` exacto.
- `ARC_BOARD_AREA_PATH` exacto.
- Que tu login de Azure tenga acceso al proyecto.

### El cron no actualiza la planilla

El prompt le pide hacerlo, pero Hermes necesita herramientas y credenciales de Google Workspace. Verificá tu setup local antes de culpar al cron.

### El script muestra evidencia vieja

Actualizá remotos del repo:

```bash
git -C "$ARC_REPO_PATH" fetch --all --prune
```
