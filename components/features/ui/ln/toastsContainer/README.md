# Toasts — La Nación

> ⚠️ **Mantener este README al día.** Al cerrar el ticket **#179724**
> (unificación en el toast del DS) hay que actualizar este documento: varias
> secciones describen una situación de convivencia temporal.

## TL;DR — qué canal usar

| Desde dónde disparás | Qué usás |
|---|---|
| **Bundle principal** (componentes React, hooks, utils in-bundle) | `renderToasts` del DS (`./renderToast`) — shape nativo `{ color, title, description, duration, buttonProps }` |
| **Scripts estáticos** (`src/statics/**`, componente `Static` de Fusion) | `publishToast({ variant, title, message, ... })` de `./publishToast` — publica `addToast` al bus global |

El eje es **dónde compila el archivo**, no React-vs-JS. Un `.js` que entra al
bundle principal usa el DS directo; solo los que terminan en un **bundle
estático aparte** van por el bus global.

## Por qué existen dos caminos

Hoy conviven dos sistemas de toast:

- **Legacy** — `@ln/common-ui-toast`, disparado por el bus global
  `window.LN.observable` (evento `addToast`). Contenedor:
  `components/features/LN-10-global/common/toasts/default.jsx`.
- **DS** — `@ln/ds-common-toasts`, disparado por `toastManager` (un singleton
  de **scope de módulo**). Contenedor: este archivo (`default.jsx`).

**Restricción clave:** los scripts estáticos corren en **bundles separados**
(IIFE independientes generados desde `src/statics/**`). Un singleton de módulo
solo es único dentro de su propio bundle, así que desde un script estático el
`toastManager` del DS es **inalcanzable** — sería otra instancia muerta sin
contenedor suscrito. Lo único que cruza el límite de bundle es algo colgado de
`window`: el bus `window.LN.observable`.

## El puente (en este contenedor)

Para que un script estático pueda mostrar un toast del DS, este contenedor se
suscribe al bus global y reenvía el evento al `toastManager`:

```
helperJw (script estático) ──publish('addToast')──► window.LN.observable (bus neutral)
                                                            │
                                  ┌─────────────────────────┴─────────────────────────┐
                            <Toasts> legacy                                  <ToastsContainer> DS
                          (layouts viejos)                                  (este archivo, vía el puente)
```

El caller dispara al bus y **no le importa quién renderiza**: en cada página hay
montado **un solo** contenedor (legacy XOR DS, según el layout), así que un
`publish` produce exactamente un toast.

### Dos partes con distinto ciclo de vida

- **El forwarding `observable → toastManager` es PERMANENTE.** Es el único canal
  estático→DS; no se elimina aunque se borre el legacy (salvo que en el futuro
  se exponga `toastManager` en `window`).
- **La traducción de shape (`variant→color`, `message→description`) es
  TEMPORAL.** Existe solo mientras haya callers con vocabulario legacy. La meta
  (ticket #179724) es alinear todos los callers al shape nativo del DS y dejar
  el puente como un forwarding "tonto", sin mapeo.

## Plan de unificación (ticket #179724)

Objetivo: un solo sistema de toast (el del DS).

- Swap del contenedor `Toasts` (legacy) por `ToastsContainer` (DS) en los ~7
  puntos de montaje (layouts de nota + `notaMain` + `LN-10-global/.../baseLayout`).
  Gracias al puente, **no hay que tocar los callers**.
- Alinear callers al shape nativo del DS y remover la traducción de este puente.
- Desinstalar `@ln/common-ui-toast` — **bloqueado hasta migrar foodit**, que
  también la usa (`components/features/foodit-global/common/toasts/foodit.jsx`).
- Simplificar/eliminar `renderToastAdapter`
  (`components/features/LN-10-global/common/toasts/renderToastAdapter.js`).

## Archivos relacionados

- `default.jsx` — contenedor DS + el puente (subscribe del bus, este folder).
- `renderToast.jsx` — wrapper de `toastManager.show` (entrada DS in-bundle).
- `publishToast.js` — publisher del bus (`window.LN.observable.publish('addToast')`),
  entrada para callers cross-bundle (scripts estáticos). Contraparte del subscribe.
- `../../../LN-10-global/common/toasts/default.jsx` — contenedor legacy.
- `../../../LN-10-global/common/toasts/renderToastAdapter.js` — adapter de convivencia.
- `../../../private-global/common/utils/renderToast.js` — publisher del bus legacy
  (mismo canal); pendiente de unificar con `publishToast.js` (ticket #179724).
