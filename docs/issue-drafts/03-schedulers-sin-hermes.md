# Agregar schedulers sin Hermes: crontab, systemd, GitHub Actions y Azure Pipelines

## Objetivo
Agregar instaladores/samples para ejecutar el mantenimiento sin depender del scheduler de Hermes.

## Contexto
Aunque Hermes puede programar el job con `hermes cron`, una versión independiente debería poder correr con herramientas estándar.

## Alcance
Agregar opciones documentadas para:
- `crontab`.
- `systemd timer`.
- GitHub Actions.
- Azure Pipelines.

## Criterios de aceptación
- README explica cuándo conviene cada scheduler.
- Hay ejemplos listos para copiar.
- Los ejemplos usan modo seguro por defecto (`report` o `--dry-run`).
- Ningún scheduler independiente requiere Hermes instalado.

## Tradeoff
Más opciones implican más documentación, pero reducen fricción para el equipo.
