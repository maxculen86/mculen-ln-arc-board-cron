# MX Recetas — Documentación de migración

> **Feature ADO #173237** — Prerequisitos de plataforma y spikes exploratorios  
> Estado: In Progress · Iteración: 2026-Q2/Abril

Antes de escribir una línea de código en el bundle MX de recetas, esta Feature cubre el provisioning y los 3 spikes exploratorios que determinan el alcance exacto de la extracción del monolito. Sin estos artefactos no se puede armar el bundle ni el pipeline.

## Índice de carpetas

| Carpeta                                                | US ADO                                                                                                 | Autor   | Estado                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------- | -------------------------- |
| [`private-components/`](./private-components/audit.md) | [#173240](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173240) | cgomes  | ✅ Completado (2026-04-27) |
| [`ln-packages/`](./ln-packages/audit.md)               | [#173241](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173241) | cgomes  | ✅ Completado (2026-04-28) |
| [`content-sources/`](./content-sources/audit.md)       | [#173239](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173239) | apelozo | ✅ Completado (2026-04-21) |

## Resumen de resultados

### `components/private/` — 59 archivos a copiar

-   49 alcanzados desde entry points de componentes
-   10 adicionales requeridos por content sources utils
-   Concentración en `components/private/common/**` (41) y `components/private/LN/**` (18)

### Paquetes `@ln/*` — 54 directos

-   Breakdown: common-ui (23), contenidos-ui (6), ds/cva (6), foodit-ui (13), libs/utils (6)
-   18 transitivos adicionales · 0 conflictos de peer deps
-   Versiones pinneadas (sin `^` ni `~`) en [`ln-packages/package-json-snippet.json`](./ln-packages/package-json-snippet.json)

### Content sources — ver PDF en ADO

El relevamiento está adjunto como PDF en la US [#173239](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173239). Pendiente migrar a este directorio.

## Prerequisito bloqueante

US [#173238](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173238) — Abrir ticket a Arc XP Support para provisionar el MX `lanacionar-recetas` (Fusion Engine `7.0.2`). Sin MX provisionado no se puede deployar ni configurar routing.
