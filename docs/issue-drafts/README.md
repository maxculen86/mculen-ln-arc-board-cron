# Roadmap: independencia de Hermes

Este directorio contiene los borradores de issues para evolucionar el proyecto desde una integración Hermes-first hacia una arquitectura donde Hermes sea un adaptador opcional.

## Orden recomendado

1. `01-modo-auditoria-independiente.md`: primero separar el modo auditoría sin side effects.
2. `02-core-deterministico-independiente.md`: después convertir reglas del prompt en código testeable.
3. `03-schedulers-sin-hermes.md`: luego sumar schedulers estándar sin Hermes.
4. `04-hermes-como-adaptador-opcional.md`: finalmente reorganizar la integración Hermes como adaptador.

La regla de arquitectura es simple: el core no debería saber que Hermes existe.
