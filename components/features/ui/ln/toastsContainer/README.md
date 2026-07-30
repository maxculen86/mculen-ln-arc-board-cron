# Toasts — La Nación

> Un solo sistema de toast para LN y foodit: el del **Design System**
> (`@ln/ds-common-toasts`).

## TL;DR — qué canal usar

| Desde dónde disparás | Qué usás |
|---|---|
| **Bundle principal** (componentes React, hooks, utils in-bundle) | `renderToasts` del DS (`./renderToast`) — shape `{ color, title, description, duration, buttonProps }` |
| **Scripts estáticos** (`src/statics/**`, componente `Static` de Fusion) | `publishToast({ color, title, description, ... })` de `./publishToast` — publica `addToast` al bus global |

El eje es **dónde compila el archivo**, no React-vs-JS. Un `.js` que entra al
bundle principal usa el DS directo; solo los que terminan en un **bundle
estático aparte** van por el bus global.

## Sistema único (DS)

- **Contenedor:** este archivo (`default.jsx`). Se monta en los layouts de nota
  (`LN-nota-*`, `notaMain`) y en `LN-10-global/common/baseLayout`.
- **Entrada in-bundle:** `renderToasts` (`./renderToast`) → `toastManager.show`
  del DS. Recibe el shape nativo.
- **Entrada cross-bundle (statics):** `publishToast` (`./publishToast`) →
  `window.LN.observable.publish('addToast')`.

## El puente (en este contenedor) — passthrough

Los scripts estáticos corren en **bundles separados** (IIFE independientes
generados desde `src/statics/**`). Un singleton de módulo (`toastManager`) solo
es único dentro de su propio bundle, así que desde un script estático el
`toastManager` del DS es **inalcanzable** — sería otra instancia muerta sin
contenedor suscrito. Lo único que cruza el límite de bundle es algo colgado de
`window`: el bus `window.LN.observable`.

Por eso este contenedor se suscribe al bus global y **reenvía el evento al
`toastManager` sin transformarlo** (passthrough): el payload ya llega con el
shape nativo del DS (`{ color, title, description, duration, buttonProps }`).

```
helperJw (script estático) ──publish('addToast', {color, title, description})──► window.LN.observable (bus neutral)
                                                                                    │
                                                            <ToastsContainer> DS (este archivo, puente passthrough)
                                                                                    │
                                                                             renderToasts → toastManager
```

El forwarding `observable → toastManager` es **PERMANENTE**: es el único canal
estático→DS; no se elimina (salvo que en el futuro se exponga `toastManager` en
`window`).

## Callers LN unificados

Todos los layouts LN montan el contenedor DS. Todos los callers in-bundle usan
`renderToasts` directo con shape nativo (`color`/`description`):

- `LN/DS-Toolbar/hooks/useBookmark`
- `LN-nota/newsletter`
- `LN/common/audioPlayer` (buildAudioPlayer)
- `LN-10-global/common/barrierDeleteNote`
- `private/LN/common/utils/shareHelper` (bookmark)
- **Via bus (statics):** `private/common/videoPlayerJw/utils/helperJw` (toast de
  georestricción/error de video) → `publishToast`.

## Archivos relacionados

- `default.jsx` — contenedor DS + puente passthrough (subscribe del bus, este folder).
- `renderToast.jsx` — wrapper de `toastManager.show` (entrada DS in-bundle).
- `publishToast.js` — publisher del bus (`window.LN.observable.publish('addToast')`),
  entrada para callers cross-bundle (scripts estáticos). Contraparte del subscribe.


