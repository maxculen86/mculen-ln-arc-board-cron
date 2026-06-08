# Implementar core determinístico independiente para reglas del board

## Objetivo
Diseñar e implementar un core determinístico independiente de Hermes para decidir estados del board con reglas explícitas y testeables.

## Contexto
Hoy la decisión final vive en `cron.prompt.md` y la ejecuta Hermes. Para independizar el proyecto de Hermes, hay que convertir esas reglas en código real, no en texto interpretado por un agente.

## Alcance propuesto
Crear una CLI propia, idealmente Python o Node, con módulos separados:

```text
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

## Reglas mínimas a codificar
- `develop` y no `sandbox/master` => `Ready`.
- `develop + sandbox` y no `master` => `Finished`.
- `master` => `Closed`.
- PR/code review => `Blocked/Detenida` + tag `code review`.
- Ignorar `demo/*` y `demo-sandbox/*` como evidencia terminal.
- Una task `Desarrollo:` mergeada en rama real puede cerrarse.
- El padre solo se cierra con evidencia propia en `master`.
- Si una task hija `Desarrollo:` está sin asignar, puede asignarse antes de alinear estado.

## Criterios de aceptación
- Existe comando `check` o equivalente con salida texto y JSON.
- Existe `--dry-run` por defecto.
- Existe `--apply` explícito para modificar Azure DevOps.
- Hay tests unitarios para cada regla de estado.
- El core no importa ni ejecuta Hermes.

## Tradeoff
Más trabajo inicial, pero mucho más robusto para compartir con el equipo.
