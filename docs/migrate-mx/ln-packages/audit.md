# Auditoría de Paquetes `@ln/*` — Bundle MX Foodit Recetas

-   **Fecha de ejecución:** 2026-04-28
-   **Repositorio:** `/home/cgomes/Arc`
-   **Autor:** cgomes (Gomes Carlos — Producto y Tecnologia)
-   **US ADO:** [#173241](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173241)
-   **Objetivo:** identificar el subset de `@ln/*` necesario para el bundle MX de recetas, con versiones exactas y análisis de árbol de dependencias.

## Resumen

| Métrica                                           | Valor |
| ------------------------------------------------- | ----: |
| Total `@ln/*` en package.json de Contenidos       |   123 |
| Archivos escaneados (scope MX recetas)            |  1156 |
| Matches grep `@ln/`                               |   412 |
| Paquetes directos únicos usados por MX recetas    |    54 |
| Transitivos `@ln/*` adicionales                   |    18 |
| Transitivos no declarados en root package.json    |     4 |
| Conflictos de dependencias/peer deps obligatorias |     0 |

> Nota: en el estado actual del repo hay **123** paquetes `@ln/*` en Contenidos (no 124).

## Scope de grep (archivos a copiar para MX recetas)

-   `components/features/foodit/**`
-   `components/features/foodit-global/**`
-   `components/chains/foodit_Caja_Apertura/**`
-   `components/chains/foodit_Caja_Collection/**`
-   `components/chains/foodit_Caja_Manual/**`
-   `components/chains/foodit_Carousel_Categories/**`
-   `components/chains/foodit_Carousel_Videos/**`
-   `components/chains/foodit-global/**`
-   `components/layouts/Foodit-subcategorias/**`
-   `components/layouts/Foodit-acumulado/**`
-   `components/layouts/Foodit-ficha-receta/**`
-   `components/layouts/Foodit-ficha-nota/**`
-   `components/layouts/Foodit-recipe-paywall/**`
-   `components/layouts/Foodit-note-paywall/**`
-   `components/output-types/foodit.jsx`
-   `components/output-types/fontPreload/foodit.jsx`
-   `components/output-types/criticalCss/foodit.jsx`
-   `components/private/common/**`
-   `components/private/LN/**`
-   `content/sources/fooditAcuSource.js`
-   `content/sources/fooditVideoSource.js`
-   `content/sources/fooditHasVideoSource.js`
-   `content/sources/fooditCategoryImageSource.js`

## Lista final de paquetes directos `@ln/*` con versión exacta (pinneada)

Breakdown: common-ui (23), contenidos-ui (6), ds/cva (6), foodit-ui (13), libs/utils (6).

Ver también [`package-json-snippet.json`](./package-json-snippet.json) para copiar directamente en el `package.json` del MX.

| Paquete                          | Versión exacta en Contenidos |
| -------------------------------- | ---------------------------- |
| @ln/common-ui-accordion          | 0.0.10                       |
| @ln/common-ui-adaptableimage     | 1.1.5                        |
| @ln/common-ui-breadcrumb         | 1.1.6                        |
| @ln/common-ui-button             | 2.1.0                        |
| @ln/common-ui-closebutton        | 0.0.2                        |
| @ln/common-ui-dialog             | 0.0.14                       |
| @ln/common-ui-drawer             | 0.1.0                        |
| @ln/common-ui-dropdown           | 0.0.16                       |
| @ln/common-ui-groupbutton        | 0.0.1                        |
| @ln/common-ui-header             | 0.0.6                        |
| @ln/common-ui-horizontalscroller | 0.0.7                        |
| @ln/common-ui-icon               | 1.1.2                        |
| @ln/common-ui-image              | 1.1.3                        |
| @ln/common-ui-inputfield         | 0.0.8                        |
| @ln/common-ui-mediascroller      | 0.0.18                       |
| @ln/common-ui-motion             | 0.0.3                        |
| @ln/common-ui-select             | 0.0.8                        |
| @ln/common-ui-skeleton           | 1.1.0                        |
| @ln/common-ui-spinner            | 2.0.0                        |
| @ln/common-ui-tabs               | 0.0.6                        |
| @ln/common-ui-text               | 1.1.1                        |
| @ln/common-ui-toast              | 1.0.0                        |
| @ln/common-ui-tooltip            | 2.0.2                        |
| @ln/contenidos-ui-animatedicons  | 0.0.3                        |
| @ln/contenidos-ui-badge          | 1.1.22                       |
| @ln/contenidos-ui-button         | 1.1.8                        |
| @ln/contenidos-ui-cardhtml       | 1.1.0                        |
| @ln/contenidos-ui-link           | 1.1.1                        |
| @ln/contenidos-ui-text           | 1.1.1                        |
| @ln/cva                          | 0.0.1                        |
| @ln/ds-common-button             | 1.5.4                        |
| @ln/ds-common-drawer             | 1.2.0                        |
| @ln/ds-common-formcontrol        | 0.0.3                        |
| @ln/ds-common-mediascroller      | 1.6.7                        |
| @ln/ds-cva                       | 1.7.0                        |
| @ln/foodit-ui-avatar             | 0.0.2                        |
| @ln/foodit-ui-badge              | 0.0.2                        |
| @ln/foodit-ui-button             | 0.0.10                       |
| @ln/foodit-ui-card               | 0.0.43                       |
| @ln/foodit-ui-category           | 0.0.10                       |
| @ln/foodit-ui-image              | 0.0.5                        |
| @ln/foodit-ui-itemcard           | 0.0.14                       |
| @ln/foodit-ui-link               | 0.0.8                        |
| @ln/foodit-ui-list               | 0.0.3                        |
| @ln/foodit-ui-logo               | 0.0.9                        |
| @ln/foodit-ui-note               | 0.0.1                        |
| @ln/foodit-ui-recipe             | 0.0.1                        |
| @ln/foodit-ui-topnavigationbar   | 0.0.2                        |
| @ln/hooks                        | 1.1.2                        |
| @ln/lib-personalizacion          | 1.3.3                        |
| @ln/mini-paywall                 | 1.8.0                        |
| @ln/user.client.libs             | 7.6.0                        |
| @ln/utility-hooks                | 0.0.1                        |
| @ln/utils                        | 0.0.6                        |

## Dependency tree y peer deps

-   Se analizó el árbol de dependencias de los **54** paquetes directos.
-   Resultado: **0 conflictos** (deps + peer deps obligatorias).

### Transitivas `@ln/*` adicionales (no directas)

| Paquete transitivo           | Versión(es) | Requerido por (directos)                                                                  | En root package.json |
| ---------------------------- | ----------- | ----------------------------------------------------------------------------------------- | -------------------- |
| @ln/common-ui-floatinglabel  | 0.0.3       | @ln/common-ui-inputfield, @ln/common-ui-select                                            | Sí                   |
| @ln/common-ui-infinitescroll | 0.0.3       | @ln/lib-personalizacion                                                                   | **No**               |
| @ln/common-ui-interfaces     | 1.1.1       | @ln/common-ui-text, @ln/foodit-ui-card                                                    | Sí                   |
| @ln/common-ui-link           | 1.1.1       | @ln/common-ui-header, @ln/contenidos-ui-link, @ln/foodit-ui-link, @ln/lib-personalizacion | Sí                   |
| @ln/common-ui-portal         | 0.0.3       | @ln/common-ui-dialog, @ln/common-ui-toast, @ln/common-ui-tooltip, @ln/lib-personalizacion | Sí                   |
| @ln/common-ui-progress       | 0.0.2       | @ln/common-ui-mediascroller, @ln/common-ui-toast                                          | Sí                   |
| @ln/common-ui-video          | 1.1.0       | @ln/foodit-ui-card                                                                        | Sí                   |
| @ln/contenidos-ui-interfaces | 1.1.3       | @ln/contenidos-ui-badge                                                                   | Sí                   |
| @ln/ds-common-divider        | 1.2.0       | @ln/ds-common-drawer                                                                      | Sí                   |
| @ln/ds-common-motion         | 1.2.0       | @ln/ds-common-drawer                                                                      | Sí                   |
| @ln/ds-common-overlay        | 0.0.2       | @ln/ds-common-drawer                                                                      | **No**               |
| @ln/ds-common-portal         | 1.2.0       | @ln/ds-common-drawer                                                                      | Sí                   |
| @ln/ds-common-range          | 1.2.4       | @ln/ds-common-mediascroller                                                               | Sí                   |
| @ln/ds-common-slot           | 1.2.0       | @ln/ds-common-button                                                                      | **No**               |
| @ln/ds-common-spinner        | 1.2.4       | @ln/ds-common-button                                                                      | Sí                   |
| @ln/ds-core-hooks            | 1.3.0       | @ln/ds-common-drawer, @ln/ds-common-formcontrol, @ln/ds-common-mediascroller              | Sí                   |
| @ln/ds-event-emitter         | 1.0.0       | @ln/ds-common-drawer                                                                      | **No**               |
| @ln/ds-hooks                 | 1.4.0       | @ln/ds-common-drawer                                                                      | Sí                   |

### Transitivos NO declarados en root package.json

Se resuelven automáticamente vía npm al instalar las dependencias directas:

-   `@ln/common-ui-infinitescroll` (0.0.3)
-   `@ln/ds-common-overlay` (0.0.2)
-   `@ln/ds-common-slot` (1.2.0)
-   `@ln/ds-event-emitter` (1.0.0)

## Acceptance Criteria

-   [x] Grep ejecutado sobre todos los archivos identificados para el bundle MX
-   [x] Lista de paquetes `@ln/*` únicos con versión exacta de Contenidos
-   [x] Dependency tree de cada paquete analizado (sin conflictos de peer deps)
-   [x] Estimación validada: 54 paquetes directos (el rango 20-30 era conservador para este scope)
-   [x] Versiones pinneadas documentadas para `package.json` del MX
-   [x] Documento final disponible para Feature 2
