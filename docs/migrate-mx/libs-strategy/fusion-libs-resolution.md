# Estrategia de `libs/` compartidas en bundles Fusion — resolución de módulos

> **Estado:** 🟡 ABIERTO — recomendación de ingeniería clara (**copiar**); pendiente de una **decisión simple** de Arquitectura (ver §0).
> **Fecha:** 2026-06-16
> **Contexto:** change `foodit-recetas-mx`, Fase 4b (infra `libs/` + generator `ln-arc-lib`)
> **Relacionado:** `openspec/changes/foodit-recetas-mx/design.md` (Decision 4), spec `monorepo-shared-libs`

## 0. TL;DR — La pregunta para Arquitectura

**Contexto en una línea:** Fusion no resuelve los path aliases de `tsconfig.base.json`; compartir código entre bundles es **o copiar, o publicar un package `@ln/*` versionado** (no hay "aliases mágicos").

**Realidad del proyecto:** existen **2 bundles** — `default` (monolito LN actual) y `foodit-mx` (fork extraído del default). Por ahora no hay más bundles Foodit en el horizonte.

**Recomendación de ingeniería: en este escenario de 2 bundles, NO compartir vía `libs/` — copiar.** Razones:

- El `default` es el monolito legacy que **YA tiene el código** (ej. `get.js`, 378 consumidores por ruta relativa). Hacerlo consumir una lib = refactor masivo de legacy, valor cero → la lib tendría **un solo consumidor real** (`foodit-mx`) = no es una lib, es indirección.
- Los 2 bundles **deployan independiente** → compartir runtime dep = version-skew. Copiar lo elimina.
- La migración es **fork-por-aislamiento** (Decision 1/3 del design). Los forks copian.
- **El sharing real entre bundles YA existe y funciona:** los packages **`@ln/*` publicados** (design system, UI), que ambos bundles ya consumen. Si algo necesitara compartirse de verdad, ese es el camino (= lo que Arc recomienda) — **no `libs/`**.

**La pregunta se reduce a una confirmación + un destino para la infra de 4b:**

> **(1)** Tenemos 2 bundles: `default` (monolito) + `foodit-mx` (fork). El código compartido real ya viaja por packages `@ln/*` publicados; el glue interno (utils, layouts) lo copiamos por bundle. **¿Confirman esta estrategia de copiar?**
> **(2)** **¿Qué hacemos con la infra `libs/` + generator de Fase 4b?** ¿La dejamos **dormida** por si aparece un tercer bundle, o la **removemos** para no cargar un mecanismo que no usamos?

**Lo único que daría vuelta la respuesta** (→ sí compartir/publicar): que exista **lógica sustancial y en evolución activa** compartida entre los 2 bundles que NO sea ya un `@ln/*`. La evidencia hoy dice que no existe (lo compartido son utils congelados + el design system, que ya está en `@ln/*`).

> Las secciones 1–6 son el detalle técnico y las fuentes que respaldan este TL;DR.

## 1. Problema

La Fase 4b creó `libs/` + el generator `ln-arc-lib`, que registra cada lib como path alias `@ln/arc-<name>` en `tsconfig.base.json`. El supuesto del spec `monorepo-shared-libs` (Requirement: "Path alias registrado automáticamente") era que **`apps/foodit-mx/` y el bundle `default` podrían importar la lib sin configuración adicional** vía ese alias.

**Ese supuesto es falso para el runtime/build.** El bundler interno de Fusion (Arc PageBuilder Engine) **no lee los path aliases de `tsconfig.base.json`** para imports de componentes.

## 2. Hallazgos

### 2.1 Evidencia del código (este repo)

- El `webpack.config.js` de `apps/foodit-mx/` **solo compila SCSS** (genera entries CSS); la resolución JS/JSX la maneja Fusion internamente.
- `arc.config.json` **no tiene** ninguna opción de `resolve`/`alias`/módulos (solo `compiler.parallel`, `compiler.devtool`, `compiler.contentSources.{exclude,include}Modules`).
- El monolito tiene **0 archivos `.ts/.tsx`** → el pipeline es **JS/JSX puro** (babel preset-react, sin preset-typescript). Una lib con entry `.ts` no se transpilaría.
- El alias `@ln/arc-test-lib` **sí** lo resuelve ESLint (vía `@nx` plugin + tsconfig) — por eso el boundary-check de 4b pasó. Pero ESLint resolviendo un alias **≠** el build de Fusion resolviéndolo.

### 2.2 Evidencia de la documentación oficial de Arc XP

- **Código compartido → paquetes privados versionados, NO aliases.** Arc recomienda: *"decouple your Shared Components completely by making them into private packages"*, importados como dependencias en el `package.json` de cada bundle; usar **Nx/moonrepo** para empaquetar/releasear; **`npm link`** para dev local. ([Adopting Monorepo With Micro Experiences])
- **⚠️ Corrección a un supuesto previo:** Fusion **SÍ transpila `node_modules` por defecto** — *"PageBuilder Engine applies Babel transpilation to node_modules by default"*. Existe `fusionIgnore` (Engine 3.2+) para EXCLUIR módulos ya pre-compilados. **Implicación:** una lib con **JSX/ESM** symlinkeada o publicada **se transpila correctamente** → no solo utils, también **UI libs** son viables. (El temor inicial de "JSX en node_modules no transpila" aplicaba a webpack estándar, NO a Fusion.) ([How to Use Third-Party Libraries])
- **`arc.config.json` no expone webpack-resolve.** Confirma que el mecanismo soportado es package.json (node_modules), no aliases. ([arc.config.json])

## 3. Opciones

| # | Opción | Cómo | Pros | Contras |
|---|--------|------|------|---------|
| **A** | **Copiar** al bundle | Copia verbatim en rutas espejo (imports relativos) | Cero riesgo, funciona hoy, sin tocar internals de Fusion | Duplicación; `libs/` pierde sentido para código consumido por Fusion |
| **B** | **Lib + `file:`/`npm link`** | Lib = package real (entry JS); cada bundle la declara `file:`/link → symlink en su `node_modules` → Fusion resuelve y transpila | Dedup real en mono-repo; alineado con dev local que recomienda Arc; UI libs OK (Fusion transpila) | Cada bundle necesita la dep + `npm install`; el symlink no cubre **release independiente** (version skew); entry debe ser JS |
| **C** | **Publicar package privado versionado** (registry `@ln`) | Lib publicada al registry Azure donde ya viven los `@ln/*`; consumida con versión pinneada | **Es la recomendación oficial de Arc**; resuelve version-skew entre bundles que deployan por separado | Overhead de release/pipeline; choca con la Decision 4 ("no publishable") |

> Nota: el path alias de `tsconfig.base.json` se mantiene en TODAS las opciones, pero **solo para ESLint/IDE/TS**, nunca como mecanismo de runtime.

## 4. Decisiones para Arquitectura

**La decisión principal está en §0** (confirmar "copiar" + destino de la infra `libs/`). En el escenario real de **2 bundles**, las sub-decisiones de abajo en su mayoría **se resuelven solas** — quedan documentadas por si Arquitectura decide que sí va a haber sharing cross-bundle vía libs:

1. **Conflicto con Decision 4 ("buildable, NO publicable").** Solo aplica **si** se decide compartir vía lib. En ese caso Arc recomienda **publicar versionado** (no symlink), porque los bundles deployan independiente → *"different bundles may have different versions"* (version skew). Con 2 bundles y copy, **no aplica**.
2. **`file:`/symlink (B) vs publish (C).** Solo si se comparte. Recomendación: B nunca como destino (reintroduce skew); si se comparte, C (publish). Con copy, **no aplica**.
3. **Entry de las libs: JS vs TS.** Solo si se generan libs consumibles. El repo es JS-only → entry JS. Con copy, **no aplica** (queda anotado para el generator).
4. **Corregir el spec `monorepo-shared-libs`** (independiente de lo anterior, **sí hay que hacerlo**): el escenario *"import resuelve desde foodit-mx sin configuración adicional"* es **incorrecto** (Fusion no resuelve aliases). Reescribirlo **antes del `/opsx:archive`** del change.

## 5. Recomendación (opinión de ingeniería — para validar con Arquitectura)

**Postura: para MVP1, COPIAR. No construir el pipeline de consumo de libs todavía.**

Fundamento:

1. **Efectivamente hay UN solo consumidor.** Son 2 bundles: `default` (monolito legacy, que **ya tiene el código** embebido por ruta relativa — 378 archivos importan `get.js`) y `foodit-mx`. Hacer que el legacy consuma una lib = refactor masivo de valor cero; así que una lib tendría **un único consumidor real** (`foodit-mx`). Montar publish + versionado para deduplicar un `get.js` de 12 líneas hacia un solo consumidor es **infra prematura (YAGNI)**. Y el sharing real (design system/UI) **ya viaja por packages `@ln/*` publicados**, no por `libs/`.
2. **Copiar respeta la arquitectura ya decidida.** La Decision 1/3 eligió **forkear** layouts *"por aislamiento de release"*. La misma lógica aplica al código compartido en MVP1: **copiar = aislamiento = cada bundle evoluciona sin coordinar releases**. Además **elimina el version-skew** que la propia doc de Arc advierte (bundles que deployan independiente). Copiar no es la opción "pobre": compra la independencia que el diseño valora.
3. **La Opción B (`file:`/symlink) NO es un destino — descartarla como estrategia.** Da el acoplamiento (dep de runtime compartida) **sin** el pinning de versión del publish → reintroduce exactamente el version-skew. Sirve solo como **ergonomía de dev local sobre un package ya publicado**, nunca como mecanismo de distribución.

**Plan recomendado:**

- **MVP1 → Opción A (copiar).** Ya aplicado en Tier 0a (breadcrumb + IconSprite + utils). `libs/` + el generator quedan como **infra validada, lista y guardada** para cuando se justifique.
- **Trigger para graduar a Opción C (publish versionado, la forma de Arc):** cuando exista un **segundo/tercer bundle Foodit** que comparta código **no trivial** con `foodit-mx`, **Y** la duplicación cause dolor real de mantenimiento (mismo bug arreglado en N lugares). Recién ahí: extraer a `libs/foodit/`, publicar versionado al registry `@ln`, consumir con versión pinneada — **como iniciativa propia, con tests, no colgada del MVP de recetas**.
- **Cuando se adopte C:** ajustar `ln-arc-lib` para emitir `src/index.js` + `main` en el `package.json` de la lib (hoy emite `src/index.ts`) y agregar config de publish.

**En una línea:** abstraer cuando duela, no antes. Para un solo consumidor, "hacerlo bien de una" es sobre-ingeniería y pelea con el aislamiento-por-fork que el diseño ya eligió.

## 6. Pendiente de verificación

> Nada de esto bloquea MVP1 (la recomendación es copiar). Aplica cuando se gatille la graduación a libs publicadas (sección 5, Opción C).

- [ ] **Revisión y firma del equipo de Arquitectura** sobre las decisiones de la sección 4 y la recomendación de la sección 5.
- [ ] Smoke test al graduar: lib publicada/symlinkeada (`npm link` para dev) + `fusion start` → confirmar que resuelve y transpila sin `Cannot find module` (la doc dice que Fusion transpila `node_modules`; confirmar que aplica también a `node_modules` symlinkeados para dev local).

## Fuentes

- [Adopting Monorepo With Micro Experiences | Arc XP](https://dev.arcxp.com/micro-experiences/adopting-monorepo-with-micro-experiences/)
- [How to Use Third-Party Libraries | Arc XP](https://dev.arcxp.com/pagebuilder-engine/how-to-guides/basics/how-to-use-third-party-libraries/)
- [arc.config.json | Arc XP](https://dev.arcxp.com/pagebuilder-engine/pagebuilder-basics/arcconfigjson/)
- [Using a private NPM repository in your bundle | Arc XP](https://dev.arcxp.com/pagebuilder-engine/how-to-guides/basics/using-private-npm-repository-in-your-bundle/)
