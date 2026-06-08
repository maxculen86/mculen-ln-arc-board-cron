# Separar Hermes como adaptador opcional

## Objetivo
Reorganizar la integración con Hermes como adaptador opcional, no como dependencia del core.

## Contexto
El diseño objetivo es que el core de Azure DevOps + git evidence + reglas de estado no sepa que Hermes existe. Hermes debería quedar como una forma avanzada de ejecutar/razonar/reportar, no como la arquitectura base.

## Alcance
- Separar README en modo independiente vs modo Hermes.
- Mantener `install.sh` o reemplazarlo por `install-hermes-cron.sh`.
- Mantener `cron.prompt.md` como contrato operativo del adaptador Hermes.
- Documentar claramente qué hace Hermes y qué hace el core/script.

## Criterios de aceptación
- El README permite instalar modo auditoría sin pasar por Hermes.
- El modo Hermes sigue funcionando para usuarios que lo tienen configurado.
- El core/script no depende de `~/.hermes`.
- La documentación presenta Hermes como adaptador opcional.

## Tradeoff
Mejor arquitectura y onboarding, pero exige separar responsabilidades que hoy están juntas en el instalador.
