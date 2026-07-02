# Content Sources — `/recetas/*` — Bundle MX

-   **Fecha:** 2026-04-21
-   **Autor:** apelozo (Pelozo Andrés — Producto y Tecnologia)
-   **Fuente original:** `openspec/analysis/recetas-content-sources-mx.html`
-   **Contexto:** 63 sources en el monolito → **11–12 necesarios** para MX
-   **Corrección (verificación en vivo, 2026-07-02):** `sectionSource` estaba categorizado "no necesario" (§5) pero el `resolver_config` real restaurado desde el dump de sandbox — el resolver `"Foodit Acu Section"` (`note: "Resolver para acumulados de Foodit"`), que matchea `/recetas/` vía patrón catch-all con `priority: 7` — tiene `contentSourceId: 'sectionSource'`, no `fooditAcuSource` como asumía este audit. Confirmado con HTTP 500 `Could not find source: sectionSource` al pegarle a `/recetas/?_website=foodit` sin este source. Ver corrección aplicada en §3 y §7.

---

## 1. Rutas y layouts

| URL Pattern            | Layout Arc Fusion    | Tipo de página                                     |
| ---------------------- | -------------------- | -------------------------------------------------- |
| `/recetas/`            | Foodit-subcategorias | Home recetas — listing + cards de categoría        |
| `/recetas/{categoria}` | Foodit-subcategorias | Categoría / subcategoría (ej. `/recetas/saladas/`) |
| `/recetas/{slug}`      | Foodit-ficha-receta  | Nota / receta individual                           |

> **Fuera de scope:** `/recetas/tema` y el buscador usan `Foodit-acumulado` con `AcuTema` (Queryly). Se incluye `fooditQuerylySource` como opcional.

---

## 2. Resolvers y contentService por página

### 2.1 — `/recetas/` y `/recetas/{categoria}` → `Foodit-subcategorias`

El layout no tiene `globalContent` propio. Todo el contenido se carga con `useContent` dentro de los features inyectados en las sections **Apertura** y **Notas**.

| Feature / Hook                                               | contentService              | Params clave                                                                 |
| ------------------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------- |
| `CardCategory` → `useGetImage`                               | `fooditCategoryImageSource` | `id`, `imageConfig: 'category'`, `website: 'foodit'`                         |
| `GrillaNotasAcu` → `useGridArticles`                         | `fooditAcuSource`           | `sectionId: id`, `page`, `size: 24`, `website: 'foodit'`, `imageConfig: 'm'` |
| `foodit_Caja_Collection` → `useGetArticleInCollectionFoodit` | `fooditCollectionsSource`   | `id`, `size`, `from`, `website: 'foodit'`, `imageConfig`                     |
| `Header` → `useNavigationData`                               | `navigationSource`          | `hierarchy: 'header_menu_ejes_foodit'`, `website: 'foodit'`                  |

### 2.2 — `/recetas/{slug}` → `Foodit-ficha-receta`

`globalContent` configurado en el template de PageBuilder con `fooditArticleSource` — `query: url` (website_url del slug), `website: 'foodit'`, `published: true`, `paywallSoftEnabled`, `meteringVariant`.

| Feature / Hook                                         | contentService                                  | Params clave                                                           |
| ------------------------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------------- |
| `Card`, `CardOpening` (imagen)                         | `fooditBaseArticleSource`                       | `id`, `published: true`, `imageConfig`, `isInApertura`, `website`      |
| `Card`, `CardOpening` (con video)                      | `fooditVideoSource`                             | `id` (JWPlayer), `imageConfig`, `isInApertura`                         |
| `VideoVertical` chain                                  | `videosJwCarruselSource`                        | `id` (JWPlayer), `website: 'foodit'`                                   |
| `RelatedContent`                                       | `relatedContentSource`                          | `id` (article `_id`), `website: 'foodit'`, `limit: 2`                  |
| `useGetRelatedArticles` (`RelatedArticles`, `AcuTema`) | `fooditAcuSource`                               | `sectionId\|authorId`, `website: 'foodit'`, `size`, `imageConfig: 'm'` |
| `UserBookmarks` → `useGetFooditArticle`                | `fooditArticleSource`                           | `id`, `published: true`, `website: 'foodit'`, `imageConfig: 'm'`       |
| `preloadImage` helper                                  | `fooditBaseArticleSource` o `fooditVideoSource` | según si la apertura tiene video o imagen                              |
| `Header` → `useNavigationData`                         | `navigationSource`                              | `hierarchy: 'header_menu_ejes_foodit'`, `website: 'foodit'`            |

---

## 3. Content sources — lista para bundle MX

### Necesarios — Notas (`/recetas/{slug}`)

| Source                    | Archivo                                      | TTL  | Rol                                                                            |
| ------------------------- | -------------------------------------------- | ---- | ------------------------------------------------------------------------------ |
| `fooditArticleSource`     | `content/sources/fooditArticleSource.js`     | 600s | `globalContent` de `Foodit-ficha-receta`; bookmarks                            |
| `fooditBaseArticleSource` | `content/sources/fooditBaseArticleSource.js` | 600s | Base de `fooditArticleSource`; usado directo en `Card`, `CardOpening`, preload |
| `fooditVideoSource`       | `content/sources/fooditVideoSource.js`       | 900s | Video de apertura JWPlayer en notas con video                                  |
| `videosJwCarruselSource`  | `content/sources/videosJwCarruselSource.js`  | —    | Carrusel de video en `VideoVertical` feature                                   |
| `relatedContentSource`    | `content/sources/relatedContentSource.js`    | 600s | `RelatedContent` en ficha-receta — "Versiones de esta receta"                  |

### Necesarios — Acumulados/Listing (`/recetas/`, `/recetas/{categoria}`)

| Source                      | Archivo                                        | TTL  | Rol                                                                          |
| --------------------------- | ---------------------------------------------- | ---- | ---------------------------------------------------------------------------- |
| `fooditAcuSource`           | `content/sources/fooditAcuSource.js`           | 120s | `GrillaNotasAcu`, `useGetRelatedArticles` — listado de artículos por sección |
| `acuArticlesSourceV2`       | `content/sources/acuArticlesSourceV2.js`       | 120s | Dependencia interna de `fooditAcuSource` (cachedCall)                        |
| `fooditCategoryImageSource` | `content/sources/fooditCategoryImageSource.js` | 600s | Imágenes de categorías en `CardCategory`                                     |
| `fooditCollectionsSource`   | `content/sources/fooditCollectionsSource.js`   | 120s | `foodit_Caja_Collection` chain — bloques colección en listing                |

### Compartido LN + Foodit (infraestructura)

| Source             | Archivo                               | TTL  | Rol                                                     |
| ------------------ | ------------------------------------- | ---- | ------------------------------------------------------- |
| `navigationSource` | `content/sources/navigationSource.js` | 300s | Header / menú de navegación (`header_menu_ejes_foodit`) |

### Opcional (solo si MX incluye `/recetas/tema` o buscador)

| Source                | Archivo                                  | TTL  | Rol                                                         |
| --------------------- | ---------------------------------------- | ---- | ----------------------------------------------------------- |
| `fooditQuerylySource` | `content/sources/fooditQuerylySource.js` | 360s | Páginas de tema (`AcuTema`) y buscador Foodit — Queryly API |

---

## 4. Dependencias transitivas

### `fooditArticleSource`

```
fooditArticleSource
├─ fooditBaseArticleSource (cachedCall)
│  ├─ utils/articleSourceNota/_helper
│  │    getUrlQuery, transformSubtype
│  ├─ utils/signingServiceSource/getImagesAuth
│  │    getAllImagesAuth
│  ├─ utils/fooditSources/fooditArticleSource/index
│  │    getArticleSubtype, getImageConfig
│  └─ utils/image/resizer/addResizerUrls
├─ utils/fooditSources/fooditArticleSource/index   transform
├─ utils/fooditSources/fooditArticleSource/_configs
├─ utils/articleSourceNota/_helper                 setRedirect
└─ filters/foodit/article/articleFilterNota
```

### `fooditAcuSource`

```
fooditAcuSource
├─ acuArticlesSourceV2 (cachedCall)
│  └─ utils/acuArticleSourceV2/getQueryParams
└─ utils/fooditSources/acuArticleSourceV2/helper   transformFooditAcu
   ├─ signingServiceSource/getImagesAuth
   └─ utils/image/resizer/addResizerUrls
```

### `fooditCategoryImageSource`

```
fooditCategoryImageSource
├─ utils/presets                                   getPresets
├─ utils/fooditSources/utils/authImage
│    getCategoryImageAuth
│    └─ signingServiceSource/getImagesAuth
└─ utils/image/resizer/addResizerUrls
```

### `fooditVideoSource`

```
fooditVideoSource
├─ utils/getVideoJwDataHome
├─ signingServiceSource/getImagesAuth              signingServiceCachedCall
└─ utils/image/resizer/v2/resizerHelper            resizeImgUrl
```

### `relatedContentSource`

```
relatedContentSource
└─ utils/relatedContentSource/_helper              transformData
   ├─ utils/presets
   ├─ signingServiceSource/getImagesAuth
   └─ utils/image/resizer/addResizerUrls
```

### `fooditCollectionsSource`

```
fooditCollectionsSource
└─ utils/fooditSources/fooditCollectionsSource/helper
   resolve, transform
```

### Helpers compartidos por múltiples sources

| Helper                                                         | Usado por                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `utils/signingServiceSource/getImagesAuth`                     | `fooditBaseArticleSource`, `fooditAcuSource`, `fooditCategoryImageSource`, `fooditVideoSource`, `relatedContentSource` |
| `components/private/common/utils/image/resizer/addResizerUrls` | `fooditBaseArticleSource`, `fooditAcuSource`, `fooditCategoryImageSource`, `relatedContentSource`                      |
| `components/private/common/utils/logger`                       | todos                                                                                                                  |
| `components/private/common/utils/get`                          | todos                                                                                                                  |
| `components/private/common/utils/handleHttpError`              | `acuArticlesSourceV2`, `fooditQuerylySource`                                                                           |

---

## 5. Categorización completa — los 63 sources

| Source                      | Categoría                  | TTL  |
| --------------------------- | -------------------------- | ---- |
| `fooditArticleSource`       | necesario-notas            | 600s |
| `fooditBaseArticleSource`   | necesario-notas            | 600s |
| `fooditVideoSource`         | necesario-notas            | 900s |
| `videosJwCarruselSource`    | necesario-notas            | —    |
| `relatedContentSource`      | necesario-notas            | 600s |
| `fooditAcuSource`           | necesario-acumulados       | 120s |
| `acuArticlesSourceV2`       | necesario-acumulados       | 120s |
| `fooditCategoryImageSource` | necesario-acumulados       | 600s |
| `fooditCollectionsSource`   | necesario-acumulados       | 120s |
| `navigationSource`          | compartido LN+Foodit       | 300s |
| `fooditQuerylySource`       | opcional (/tema, buscador) | 360s |
| `fooditHasVideoSource`      | no necesario               | 120s |
| `chefsSource`               | no necesario               | —    |
| `acuArticlesSource`         | no necesario               | —    |
| `acuArticlesSourcebyIds`    | no necesario               | —    |
| `apiAcuAuthorsV2Source`     | no necesario               | —    |
| `apiAcumuladoTagsV2`        | no necesario               | —    |
| `apiAcumuladosV2Source`     | no necesario               | —    |
| `apiAcumuladosV2SourceV2`   | no necesario               | —    |
| `apiConvivenciaSource`      | no necesario               | —    |
| `apiImageSource`            | no necesario               | —    |
| `apiLnAcuSource`            | no necesario               | —    |
| `apiPageAcumuladoAuthors`   | no necesario               | —    |
| `apiPageAcumuladoTags`      | no necesario               | —    |
| `apiPageAcumuladosSource`   | no necesario               | —    |
| `apiPageHomeSource`         | no necesario               | —    |
| `apiPageHomeUpdateSource`   | no necesario               | —    |
| `apiSigningServiceSource`   | no necesario               | —    |
| `articleSourceNota`         | no necesario (solo LN)     | —    |
| `audionewsSource`           | no necesario               | —    |
| `authorSource`              | no necesario               | —    |
| `collectionsSource`         | no necesario (LN)          | —    |
| `collectionsV2Source`       | no necesario (LN)          | —    |
| `contentApiSource`          | no necesario               | —    |
| `distributorSource`         | no necesario               | —    |
| `dolarSource`               | no necesario               | —    |
| `embedCardSource`           | no necesario               | —    |
| `gallerySource`             | no necesario               | —    |
| `imageSource`               | no necesario               | —    |
| `jwPlaylistSource`          | no necesario               | —    |
| `liftigniterSource`         | no necesario               | —    |
| `liveblogAuthorSource`      | no necesario               | —    |
| `lnAcuSource`               | no necesario               | —    |
| `lnHomeBaseArticleSource`   | no necesario               | —    |
| `menuSource`                | no necesario               | —    |
| `navigationTreeSource`      | no necesario               | —    |
| `optaSource`                | no necesario               | —    |
| `podcastSource`             | no necesario               | —    |
| `rankingArticlesSource`     | no necesario               | —    |
| `relatedImageSource`        | no necesario               | —    |
| `relatedSource`             | no necesario               | —    |
| `sectionSource`             | no necesario               | —    |
| `seguirSource`              | no necesario               | —    |
| `servicesSource`            | no necesario               | —    |
| `signingServiceSource`      | no necesario (wrapper SSR) | —    |
| `summarySource`             | no necesario               | —    |
| `tagSource`                 | no necesario               | —    |
| `videoFichaJwSource`        | no necesario               | —    |
| `videoJwArticleSource`      | no necesario               | —    |
| `videosJwSource`            | no necesario               | —    |
| `weatherSource`             | no necesario               | —    |
| `widgetsSource`             | no necesario               | —    |
| `wikiTagSource`             | no necesario               | —    |

---

## 6. Variables de entorno requeridas

```
CONTENT_BASE              # URL base Arc Content API
ARC_ACCESS_TOKEN          # Bearer token para Arc
SITE_FOODIT               # URL del sitio Foodit (redirects en fooditArticleSource)
SITIO_SEGURO_REGISTRACION # URL de paywall/login
API_QUERYLY               # (opcional) URL base de Queryly
API_KEY_QUERYLY           # (opcional) API Key de Queryly
```

---

## 7. Lista final para Feature 2 (bundle MX)

### Sources — necesario-notas

```
→ content/sources/fooditArticleSource.js
→ content/sources/fooditBaseArticleSource.js
→ content/sources/fooditVideoSource.js
→ content/sources/videosJwCarruselSource.js
→ content/sources/relatedContentSource.js
```

### Sources — necesario-acumulados

```
→ content/sources/fooditAcuSource.js
→ content/sources/acuArticlesSourceV2.js
→ content/sources/fooditCategoryImageSource.js
→ content/sources/fooditCollectionsSource.js
```

### Sources — compartido LN+Foodit

```
→ content/sources/navigationSource.js
```

### Sources — opcional (/tema o buscador)

```
? content/sources/fooditQuerylySource.js
```

### Utils transitivos

```
→ content/sources/utils/articleSourceNota/_helper.js
→ content/sources/utils/signingServiceSource/getImagesAuth.js
→ content/sources/utils/fooditSources/fooditArticleSource/index.js
→ content/sources/utils/fooditSources/fooditArticleSource/_configs.js
→ content/sources/utils/fooditSources/acuArticleSourceV2/helper.js
→ content/sources/utils/fooditSources/fooditCollectionsSource/helper.js
→ content/sources/utils/fooditSources/utils/authImage.js
→ content/sources/utils/acuArticleSourceV2/getQueryParams.js
→ content/sources/utils/relatedContentSource/_helper.js
→ content/sources/utils/presets.js
→ content/sources/utils/getVideoJwDataHome.js
→ content/sources/utils/getVideoJwDataCarrusel.js
```

### Filters

```
→ content/filters/foodit/article/articleFilterNota.js
→ content/filters/foodit/home/collectionFoodit.js
→ content/filters/foodit/relatedArticles.js
→ content/filters/foodit/home/fooditCategoryImageSource.js
→ content/filters/foodit/filterMenuSections.js
→ content/filters/foodit/videoJwFilter.js
```
