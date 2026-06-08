# Agregar modo auditoría independiente de Hermes

## Objetivo
Agregar un modo de auditoría que funcione sin Hermes y solo genere reportes de evidencia.

## Contexto
Hoy `arc-board-check.sh` ya puede ejecutarse sin Hermes porque depende de bash, python3, git, Azure CLI y credenciales de Azure DevOps. El problema es que el repo está presentado principalmente como cron de Hermes.

## Alcance
- Agregar documentación y comandos para correr auditoría manual sin Hermes.
- Agregar wrapper opcional, por ejemplo `run-report.sh` o equivalente.
- Generar reportes en `reports/` con timestamp.
- Mantener cero side effects: no modificar Azure DevOps ni Google Sheets.
- Documentar instalación con `crontab` o `systemd timer`.

## Criterios de aceptación
- Se puede ejecutar un comando local sin Hermes y obtener un reporte.
- El modo auditoría no requiere `hermes` en PATH.
- El reporte deja claro que es evidencia candidata, no decisión final.
- README incluye ejemplo de programación con cron del sistema.

## Tradeoff
Este modo es más seguro y fácil de adoptar, pero no corrige estados automáticamente.
