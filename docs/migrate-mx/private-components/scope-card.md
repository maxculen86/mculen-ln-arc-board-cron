# Scope Card — componentes por layout (foodit-mx)

> **Fuente:** auditoría de cierre transitivo cross-layout (`tasks.md` 4cf.8) + `docs/migrate-mx/private-components/audit.md`.
> **Fecha:** 2026-06-17 · **Cubre:** US-NEW-4 (scope card) · Fase 4a.
> **Layouts en scope:** `Foodit-acumulado`, `Foodit-ficha-receta`, `Foodit-subcategorias`.

## Decisión copy-vs-lib (marco)

No se pre-asigna un label fijo por archivo. Se aplica la **regla de Arquitectura (per-componente, just-in-time)** — ver `design.md` Decision 4 y `docs/migrate-mx/libs-strategy/fusion-libs-resolution.md`:

- solo foodit-nuevo → **copiar**
- compartido **congelado** → **copiar** (duplicar no duele)
- compartido que **se va a cambiar** en ambos → **lib** (= paquete `@ln/*` vía workspace/publicado; NO alias)

**Lean por bloque** (señal de recencia git de 4cf.8): armazón compartido = evolutivo → **candidato a lib**; exclusivos de layout = **copiar**; utils-hoja congelados = **copiar**.

## Tamaños (cierre transitivo)

| Layout | Cierre | Exclusivo |
|--------|--------|-----------|
| Acumulado | 146 | 8 |
| Ficha-receta | 221 | 83 |
| Subcategorías | 139 | 9 |
| **Compartido (≥2 layouts)** | **138** | — |

## Inventario por bloque

### 🟦 Bloque común — piso compartido (4cf · 134 archivos, ≥2 layouts)

Armazón del sitio, **candidato a lib** (evolutivo + compartido foodit-actual↔nuevo):
`BaseLayout`, `Header` (+Search/voz, Avatar, MenuCategories), `Footer`, Drawers (Container/Menu/MyAccount/Sections), `Modals/SaveRecipe`, `bookmark` (+API), `auth` (AuthInitializer, useAuthManager, loginHelper), `SubscribeLoginButton`, `MyAccount`, `MenuCategories`, `PWAInstallPrompt`/`PromoteInstallation`, `floatingGroupButton`, `emptyState`/`errorMessage`, `toastContainer`, utils (`priv/utils`, `priv/LN-utils`, `feat/utils`), `properties/sites`, `content/filters`.

- ✅ **Tier 0a hecho (copiado):** `breadcrumb` (+_helpers, +Tooltip), `IconSprite` (+getIconPath), `get`, `capitalizeFirstLetter`, `parentCategoryMapping.json` — utils/leaf congelados.
- ⏳ **Tier 0b pendiente (4cf.9–12):** el resto del armazón (≈120).
- ⚪ Congelados → copy: `pwaModal/register`, `fontFace`, `MenuSemanal` helpers, `safeJSONParse`, `scriptManager`.

### 🟩 Bloque Ficha-Receta (4c · 83 exclusivos)
`PowerupsReceta` (ingredientsBox, summaryBox), `OpeningRecipe`, `Banners` (+useAdManager), `MenuSemanal`, `Newsletter`, `AudioFoodit`, `LayoutImpression`/`PrintIngredients`/`PrintButton`/`TimePrint`, `ShareFoodit`, `DialogFoodit`/`DialogBarrier`, `ActionsButtons`, `RoofFoodit`, `nutritionalInfo`, `subtitle`, `RelatedContent`, `videoPlayer`, `facade`, UI `badge`/`image`, + utils de ficha. → mayormente **copy** (exclusivo de ficha).

### 🟨 Bloque Acumulado (4d · 8 exclusivos)
`AcuTema` (+`gridTemaServer`/`gridTemaClient`/`useGridTema`/helpers), `TagCategories`, `GrillaNotasAcu/loadMoreButton`. → **copy**.

### 🟧 Bloque Subcategorías (4e · 9 exclusivos)
Layout `Foodit-subcategorias` (+`_helpers`, `Card/CardCategory` +sections, `hooks/useImagePreload`), `subcategorias/helpers`, `breadcrumb/_childrens/BreadcrumbCustom`, `subcategoryKeywords.json`. → **copy** (fork).

### 🔴 Compartidos detectados fuera del armazón (4 gaps, Acumulado+Ficha)
`CommonCardFoodit/foodit.jsx` + `components/CardButton.jsx` + `components/DropdownCard.jsx`, `recetario/hooks/useApiGuard.js`. → al bloque común (4cf.11).

## Responsables por bloque (pendiente — asignar el equipo)

| Bloque | Tasks | Responsable | Estado |
|--------|-------|-------------|--------|
| 4cf común (Tier 0b) | 4cf.9–12 | _(asignar)_ | pendiente |
| 4c Ficha | 4c.x | _(asignar)_ | pendiente |
| 4d Acumulado | 4d.x | _(asignar)_ | pendiente |
| 4e Subcategorías | 4e.x | _(asignar)_ | pendiente |
