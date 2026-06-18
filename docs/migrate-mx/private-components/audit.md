# Auditoría Foodit `recetas/*` → `components/private/**` para bundle MX

-   **Fecha:** 2026-04-23 (actualización 2026-04-24)
-   **Repositorio:** `/Arc`
-   **Autor:** cgomes (Gomes Carlos — Producto y Tecnologia)
-   **US ADO:** [#173240](https://dev.azure.com/lndigital/336c835e-ca0b-48f3-b1f9-a65e3390b603/_workitems/edit/173240)
-   **Objetivo:** identificar qué archivos de `components/private/` deben copiarse al bundle MX de Foodit a partir de los entry points que aplican a `recetas/*`.

## Resumen ejecutivo

-   Archivos actuales en `components/private/` en este checkout: **813**
-   Entry points trazados: **22** (6 layouts, 5 chains, 11 feature roots)
-   Archivos visitados en el grafo: **358**
-   Archivos `components/private/**` alcanzados por componentes: **49** → **59** total (ver Sección 7)
    -   `components/private/common/**`: 33 → **41** (+ 8 archivos de content sources)
    -   `components/private/LN/**`: 16 → **18** (+ 2 archivos de content sources)
-   Imports relativos sin resolver: **0**

> **Actualización 2026-04-24:** El análisis de content sources identificó **10 archivos adicionales** de `components/private/` requeridos por los content source utils. Ver Sección 7 para la lista completa.

## Cumplimiento de criterios de aceptación

-   [x] Lista de features, chains y layouts de Foodit que aplican a `recetas/*` (entry points)
-   [x] Para cada entry point: imports directos hacia `components/private/`
-   [x] Rastreo transitivo completado (`private/` que importa otros `private/`)
-   [x] Lista final de archivos `components/private/` a copiar al bundle MX
-   [x] Archivos organizados por sub-carpeta para facilitar la copia
-   [x] Verificación: ningún import queda sin resolver al armar la lista completa

## 1) Entry points considerados

> Nota metodológica: para no subcontar dependencias, se incluyeron todos los chains `foodit_*` y los feature roots de `components/features/foodit/*` relevantes para páginas de recetas. Los módulos bajo `components/features/foodit-global/**` se recorrieron transitivamente dentro del grafo, pero no se listan como PageBuilder entry points independientes.

### 1.1 Layouts Foodit-_ que aplican a `recetas/_`

-   `components/layouts/Foodit-subcategorias/foodit.jsx`
-   `components/layouts/Foodit-acumulado/foodit.jsx`
-   `components/layouts/Foodit-ficha-receta/foodit.jsx`
-   `components/layouts/Foodit-ficha-nota/foodit.jsx`
-   `components/layouts/Foodit-recipe-paywall/foodit.jsx`
-   `components/layouts/Foodit-note-paywall/foodit.jsx`

### 1.2 Chains `foodit_*` incluidos en la cobertura

-   `components/chains/foodit_Caja_Apertura/foodit.jsx`
-   `components/chains/foodit_Caja_Collection/foodit.jsx`
-   `components/chains/foodit_Caja_Manual/foodit.jsx`
-   `components/chains/foodit_Carousel_Categories/foodit.jsx`
-   `components/chains/foodit_Carousel_Videos/foodit.jsx`

### 1.3 Feature roots de `components/features/foodit/*` incluidos

-   `components/features/foodit/Body/foodit.jsx`
-   `components/features/foodit/CajaVentas/foodit.jsx`
-   `components/features/foodit/Card/foodit.jsx`
-   `components/features/foodit/CardCategory/foodit.jsx`
-   `components/features/foodit/CardOpening/foodit.jsx`
-   `components/features/foodit/CommentFoodit/foodit.jsx`
-   `components/features/foodit/GrillaNotasAcu/foodit.jsx`
-   `components/features/foodit/HtmlBanner/foodit.jsx`
-   `components/features/foodit/RelatedArticles/foodit.jsx`
-   `components/features/foodit/RelatedContent/foodit.jsx`
-   `components/features/foodit/VideoVertical/foodit.jsx`

## 2) Imports directos hacia `components/private/` por entry point

### 2.1 Layouts

#### `components/layouts/Foodit-subcategorias/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **26**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/layouts/Foodit-acumulado/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **26**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/layouts/Foodit-ficha-receta/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **32**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/layouts/Foodit-ficha-nota/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **32**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/utils/get.js`

#### `components/layouts/Foodit-recipe-paywall/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **32**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/layouts/Foodit-note-paywall/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **32**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/utils/get.js`

### 2.2 Chains

#### `components/chains/foodit_Caja_Apertura/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **5**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/chains/foodit_Caja_Collection/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **14**
-   Imports directos hacia `components/private/`:
    -   `components/private/LN/common/utils/isSSR.js`
    -   `components/private/LN/common/utils/mediaHelper.js`
    -   `components/private/common/utils/get.js`
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/chains/foodit_Caja_Manual/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **5**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/chains/foodit_Carousel_Categories/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **5**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/chains/foodit_Carousel_Videos/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **8**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/warningMessage/warningMessage.jsx`

### 2.3 Features

#### `components/features/foodit/Body/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **15**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/utils/storage.js`

#### `components/features/foodit/CajaVentas/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **9**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/features/foodit/Card/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **21**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/utils/get.js`
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/features/foodit/CardCategory/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **7**
-   Imports directos hacia `components/private/`:
    -   `components/private/LN/common/utils/mediaHelper.js`
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/features/foodit/CardOpening/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **21**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/utils/get.js`
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/features/foodit/CommentFoodit/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **12**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/features/foodit/GrillaNotasAcu/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **10**
-   Imports directos hacia `components/private/`: _ninguno en el archivo root_

#### `components/features/foodit/HtmlBanner/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **6**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/SetFixedHeight.jsx`
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/features/foodit/RelatedArticles/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **15**
-   Imports directos hacia `components/private/`:
    -   `components/private/LN/common/utils/isSSR.js`
    -   `components/private/common/utils/capitalizeFirstLetter.js`
    -   `components/private/common/utils/get.js`
    -   `components/private/common/utils/getAuthorsAsString.js`
    -   `components/private/common/warningMessage/warningMessage.jsx`

#### `components/features/foodit/RelatedContent/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **10**
-   Imports directos hacia `components/private/`:
    -   `components/private/LN/common/utils/mediaHelper.js`
    -   `components/private/common/utils/get.js`

#### `components/features/foodit/VideoVertical/foodit.jsx`

-   Private files alcanzados transitivamente desde este root: **16**
-   Imports directos hacia `components/private/`:
    -   `components/private/common/utils/get.js`
    -   `components/private/common/warningMessage/warningMessage.jsx`

## 3) Rastreo transitivo completado

### 3.1 Resultado global

-   Layouts solos → **33** archivos `components/private/**` alcanzados
-   Layouts + chains → **36** archivos `components/private/**` alcanzados
-   Layouts + chains + feature roots → **49** archivos `components/private/**` alcanzados

### 3.2 Archivos agregados por incluir chains (sobre el set de layouts)

-   `components/private/LN/home/common/components/pageBuilderMessage/getData.jsx`
-   `components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx`
-   `components/private/common/warningMessage/warningMessage.jsx`

### 3.3 Archivos agregados por incluir feature roots (sobre layouts + chains)

-   `components/private/LN/acumulado/anexoIframe.jsx`
-   `components/private/LN/common/utils/getStreams.js`
-   `components/private/LN/common/utils/homeHelper-WebApi.js`
-   `components/private/LN/common/utils/screenHelper.js`
-   `components/private/LN/nota/cuerpo/htmlPym.jsx`
-   `components/private/common/SetFixedHeight.jsx`
-   `components/private/common/badge/types.js`
-   `components/private/common/utils/diagramationRules.js`
-   `components/private/common/utils/getChainPosition.js`
-   `components/private/common/utils/getElementFromRenderables.js`
-   `components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/common/helper-WebApi.js`
-   `components/private/common/utils/image/getDataToLinkImage/_helper/common/helper-WebApi.js`
-   `components/private/common/utils/storage.js`

## 4) Lista final de archivos `components/private/` a copiar al bundle MX

> Lista exhaustiva para el root set analizado: **49** archivos (sin contar los 10 adicionales de content sources — ver Sección 7).

### `components/private/LN/acumulado`

-   `components/private/LN/acumulado/anexoIframe.jsx`

### `components/private/LN/common/utils`

-   `components/private/LN/common/utils/addEventToDataLayer.js`
-   `components/private/LN/common/utils/dynamicallyLoadScript.js`
-   `components/private/LN/common/utils/getItemNearest.js`
-   `components/private/LN/common/utils/getSourcesJw.js`
-   `components/private/LN/common/utils/getStreams.js`
-   `components/private/LN/common/utils/handleCookie.jsx`
-   `components/private/LN/common/utils/homeHelper-WebApi.js`
-   `components/private/LN/common/utils/isSSR.js`
-   `components/private/LN/common/utils/mediaHelper.js`
-   `components/private/LN/common/utils/safeLocalStorageHelpers.js`
-   `components/private/LN/common/utils/screenHelper.js`
-   `components/private/LN/common/utils/shareHelper.js`

### `components/private/LN/home/common/components/pageBuilderMessage`

-   `components/private/LN/home/common/components/pageBuilderMessage/getData.jsx`
-   `components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx`

### `components/private/LN/nota/cuerpo`

-   `components/private/LN/nota/cuerpo/htmlPym.jsx`

### `components/private/common`

-   `components/private/common/SetFixedHeight.jsx`

### `components/private/common/auth`

-   `components/private/common/auth/AuthInitializer.jsx`

### `components/private/common/auth/helper`

-   `components/private/common/auth/helper/loginHelper.js`

### `components/private/common/auth/hooks`

-   `components/private/common/auth/hooks/_helper.js`
-   `components/private/common/auth/hooks/useAuthManager.js`
-   `components/private/common/auth/hooks/useGetUserData.js`

### `components/private/common/badge`

-   `components/private/common/badge/types.js`

### `components/private/common/scriptManager`

-   `components/private/common/scriptManager/DataLayerInteracions.jsx`

### `components/private/common/utils`

-   `components/private/common/utils/bookmarkHelper.js`
-   `components/private/common/utils/capitalizeFirstLetter.js`
-   `components/private/common/utils/compare.js`
-   `components/private/common/utils/dateAndTimeUtil.js`
-   `components/private/common/utils/diagramationRules.js`
-   `components/private/common/utils/epigrafeAndCreditsData.js`
-   `components/private/common/utils/get.js`
-   `components/private/common/utils/getAperturaStorytelling.js`
-   `components/private/common/utils/getAssetsPath.js`
-   `components/private/common/utils/getAuthorsAsString.js`
-   `components/private/common/utils/getChainPosition.js`
-   `components/private/common/utils/getElementFromRenderables.js`
-   `components/private/common/utils/getElementId.js`
-   `components/private/common/utils/getUserInitials.js`
-   `components/private/common/utils/getWebFont.js`
-   `components/private/common/utils/isExternalDistributor.js`
-   `components/private/common/utils/pageBuilderValidator.js`
-   `components/private/common/utils/removeAccents.js`
-   `components/private/common/utils/scheduleTask.js`
-   `components/private/common/utils/setClassName.js`
-   `components/private/common/utils/storage.js`

### `components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/common`

-   `components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/common/helper-WebApi.js`

### `components/private/common/utils/image/getDataToLinkImage/_helper/common`

-   `components/private/common/utils/image/getDataToLinkImage/_helper/common/helper-WebApi.js`

### `components/private/common/utils/subtypes`

-   `components/private/common/utils/subtypes/subtypeHelper.js`

### `components/private/common/warningMessage`

-   `components/private/common/warningMessage/warningMessage.jsx`

## 5) Verificación final

-   [x] Grafo de imports recorrido desde **22** entry points
-   [x] Archivos visitados: **358**
-   [x] Imports relativos sin resolver (global): **0**
-   [x] Imports relativos sin resolver dentro de `components/private/**`: **0**
-   [x] Lista final cerrada de `components/private/**`: **49** archivos
-   [x] No quedó ningún import relativo sin resolver al armar la lista completa

## 6) Observaciones

-   El conteo actual del repo para `components/private/` es **813** archivos; la referencia original a **801** corresponde a otro snapshot del árbol.

## 7) Archivos adicionales identificados en análisis de content sources

Los content sources del bundle MX importan archivos de `components/private/` que no son alcanzables desde los entry points de componentes. Estos **10 archivos** deben incluirse en el bundle MX.

### `components/private/LN/common/utils` (2 nuevos)

-   `components/private/LN/common/utils/addForwardSlash.js`
-   `components/private/LN/common/utils/pageReferrer.js`

### `components/private/common/utils` (6 nuevos)

-   `components/private/common/utils/dataValidation.js`
-   `components/private/common/utils/functional.js`
-   `components/private/common/utils/handleHttpError.js`
-   `components/private/common/utils/logger.js`
-   `components/private/common/utils/sectionUtils.js`
-   `components/private/common/utils/stringFallback.js`

### `components/private/common/utils/image/resizer` (2 nuevos)

-   `components/private/common/utils/image/resizer/addResizerUrls.js`
-   `components/private/common/utils/image/resizer/v2/resizerHelper.js`

### Totales actualizados

| Sub-árbol                      | Antes  | Ahora  |
| ------------------------------ | ------ | ------ |
| `components/private/LN/**`     | 16     | **18** |
| `components/private/common/**` | 33     | **41** |
| **Total**                      | **49** | **59** |

## Key Learnings

1. El subset de `components/private/**` para el bundle MX recetas es de **59 archivos** (49 desde componentes + 10 desde content sources), con fuerte concentración en `components/private/common/**`.
2. Foodit todavía depende de **18 archivos** bajo `components/private/LN/**`, incluyendo `addForwardSlash.js` y `pageReferrer.js` (ambos requeridos por el transform de `fooditArticleSource`).
3. El grafo trazado desde componentes quedó cerrado. Los 10 nuevos archivos fueron identificados rastreando imports de `content/sources/utils/`.
4. Los archivos de resizer (`addResizerUrls.js`, `resizerHelper.js`) son fundamentales para el procesamiento de imágenes en el server-side de los content sources.
