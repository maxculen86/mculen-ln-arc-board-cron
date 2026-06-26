# Reutilizables de la POC de Ingala → foodit-mx (bundles separados)

> **Origen:** POC `lanacion-arcxp-mx` (Ingala Tech, feb-2026) — monorepo Nx con La Nación + Foodit. Repo **local/efímero**; este doc captura lo reutilizable para que sobreviva sin él.
> **Filtro aplicado:** solo lo que sirve para NUESTRO caso de **bundles separados (Opción B)**. Lo multi-tenant de la POC se descarta (ver §"No aplica").

## Contexto crítico: la POC ≠ nuestra arquitectura

La POC implementó **"Opción A: bundle único multi-tenant"** — un solo bundle JS (~248KB) que carga en ambos sitios, diferenciado en runtime por `arcSite`. **Su objetivo CORE "separación de bundles" quedó NO cumplido.** Nuestro `foodit-mx` es la **"Opción B" (bundle separado con deploy propio)** que la POC NO construyó. Por eso reutilizamos **piezas**, no su arquitectura de bundle.

---

## 1. Fase 5 — `deployer.js` (alto valor, casi copiable)

El `apps/lanacion-arcxp-mx/deployer.js` (291 líneas) hace exactamente el flujo que pide US-NEW-8. **Reutilizable directo, adaptando el paso de build.**

**Contrato de env vars** (por ambiente `PROD`/`SANDBOX`/`STAGING`):

```
{ENV}_DEPLOYER_FUSION_RELEASE   = <versión PB o "latest">
{ENV}_DEPLOYER_ENDPOINT         = api[.sandbox].<org>.arcpublishing.com
{ENV}_DEPLOYER_ACCESS_TOKEN     = <all-access token del Developer Center>
SANDBOX_MX_ID / PROD_MX_ID      = <mxId del MX>   ← clave para foodit-mx
POLLING_DELAY (10000) · TIMEOUT (30)
```

**Mecanismo MX (lo más importante para nosotros):** con `--use-mxid`, appendea `?mxId=${mxId}` a **todas** las llamadas del deployer API (`/deployments/fusion/services`, `/bundles`, `/services/{v}/promote`, `/terminate`). Así el deploy va a la **instancia MX** en vez del bundle default.

**Flags:** `--prod` · `--sandbox` (default) · `--st` · `--use-mxid` · `--mac`.

**Secuencia:**
```
upload (zip → POST /bundles)
  → terminateOldest (borra el service no-live más viejo)
  → deploy (POST /services?bundle=&version=)
  → checkDeployment (poll cada POLLING_DELAY hasta TIMEOUT, detecta nueva Version)
  → promote (POST /services/{version}/promote)
SANDBOX = deploya Y promueve · PROD = deploya pero NO promueve (promote manual)
```

**Adaptación para foodit-mx:** el build de ellos es `npx webpack` (solo CSS en su caso). En el nuestro el build del bundle es **`fusion build`** (JS+todo); ajustar ese paso. El zip excluye `.git/node_modules/.fusion/data/dist/.env/.npmrc/etc`. Lo demás (orquestación API + mxId) se copia tal cual.

---

## 2. Fase 6 — Content sources (plantilla de patrón)

`apps/lanacion-arcxp-mx/content/sources/` tiene ~15 sources como plantilla. **Patrón de un source:**

```js
export default {
  fetch,              // async ({ _id, 'arc-site', ... }, { cachedCall }) => data
  params,             // [{ displayName, name, type }]
  schemaName: "...",  // schema asociado
  searchable: "story" // opcional
};
```

**Utils reutilizables** (`content/utils/`, `content/sources/`):
- `arc-fetch` — wrapper de fetch al Content API (`/content/v4/`).
- `handle-redirect` / `handle-fetch-error` — manejo de redirects y errores (los transforms deben **`throw`**, requisito de nuestro spec 6.7).
- **`sign-images-in-ans-object` + `signing-service-api`** — firma de imágenes del resizer (pieza valiosa; recetas la necesita).
- Cache vía el `cachedCall` que Fusion inyecta.

Sources disponibles como referencia: `content-api`, `content-api-collections`, `content-api-gallery`, `content-api-video`, `author-api`, `related-content`, `story-feed-author`, `site-service-navigation-fetch`, `signing-service-api`, `sign-images-in-ans-object`.

> ⚠️ Nuestro spec exige: ningún transform filtra `_id` (cache tagging, task 6.6) y transforms hacen `throw` (6.7). Verificar al adaptar.

---

## 3. Fase 4cf (si va lib) — patrón de consumo de libs

La POC consume libs vía **npm workspaces** (mecanismo PROBADO, node_modules, NO alias de tsconfig):

```jsonc
// package.json raíz
"workspaces": ["packages/*", "libs/*"]

// libs/<name>/package.json
{ "name": "@scope/<name>", "version": "1.0.0",
  "main": "./src/index.jsx",            // entry JSX (Fusion transpila node_modules)
  "private": true,
  "peerDependencies": { "react": "...", "react-dom": "..." } }

// consumo en un componente del bundle
import Image from "@scope/image";       // resuelve por node_modules symlink
```

`npm install` symlinkea cada workspace en `node_modules`. Fusion transpila el JSX del paquete.

> ⚠️ **Caveats para nuestro caso:**
> 1. Sus libs son **Fusion-agnósticas** (React puro, cero `fusion:`). Nuestro armazón del sitio (`BaseLayout`/`Header`) usa `fusion:context`/`@ln/*` → extraerlo a lib es **más pesado** (acoplado a Fusion).
> 2. Ellos = **1 bundle** → sharing trivial (un solo `node_modules`). Nosotros = **2 bundles que deployan independiente** → vuelve el **version-skew** → la lib quiere ser **publicada versionada al registry `@ln`**, no solo workspace-symlink local.
> 3. Nuestro repo Arc **NO usa workspaces** (usamos `file:` dep para el generator). Si vamos lib-heavy, adoptar workspaces (`libs/*`) sería el camino limpio.

---

## 4. Transpiler TS (dato de infra)

La POC tiene `@swc/core` + `@swc-node/register` en devDependencies → **pueden escribir `.ts`**. Nuestro repo Arc NO los tiene — por eso el generator `ln-arc-lib` tuvo que ser `.js`. Si en algún momento queremos generators/libs en `.ts`, sabemos qué agregar.

---

## 5. Lo que NO aplica a nosotros (descartar)

- **Bundle único multi-tenant** (LN+foodit en un bundle) — nosotros separamos por bundle.
- **Diferenciación runtime por `arcSite`** para elegir CSS — no aplica: foodit-mx es foodit-only.
- **`.lazy = true` para code-splitting dentro de un bundle** — es la optimización de la Opción A; nosotros ya separamos a nivel bundle. (Guardarlo solo como conocimiento de Fusion, no como tarea.)
- **Sus libs concretas** (`image`, `figure`, `link`, `youtube`, `conditional`, `lazy-load`) — son del scope LN genérico, no de recetas; sirven como **ejemplo de estructura**, no para copiar.

---

## Resumen accionable

| Fase nuestra | Reutilizar de la POC | Acción |
|--------------|----------------------|--------|
| **5 deployer** | `deployer.js` completo | copiar, cambiar build a `fusion build`, mantener mecanismo `mxId` |
| **6 content sources** | patrón source + utils + **signing-service** | plantilla; verificar `_id` no filtrado + `throw` |
| **4cf lib** (si aplica) | patrón **npm workspaces** | mecanismo; pero publicar versionado por los 2 bundles |
| infra | `@swc` transpiler | solo si queremos `.ts` |
