# Audio Player (`LN/common/audioPlayer`)

Reproductor de audio de notas basado en **BeyondWords**, con drawer no modal, modo resumen y
tracking de reproducción al dataLayer. Este documento cubre la arquitectura técnica, el store, los
eventos y los puntos de integración.

> Para la perspectiva de negocio (barrier, modos, eventos en lenguaje de producto), ver el doc de
> producto que acompaña esta feature.

---

## 1. Estructura de archivos

```
audioPlayer/
├── default.jsx                  # Drawer: monta el player + cierre (Escape) + SummarySwitch
├── getAudioEvents.js            # Arma el payload de metadatos para el dataLayer
├── helpers.js                   # Trigger de apertura, tracking de progreso, utilidades
├── components/
│   ├── buildAudioPlayer.jsx     # Instancia y controla BeyondWords.Player
│   └── summarySwitch.jsx        # Switch "Escuchar resumen" + evento de cambio de modo
├── hooks/
│   ├── useAudioPlayerState.js   # Lectura reactiva del store (useSyncExternalStore)
│   ├── useAudioPlayerActions.js # Acciones del store
│   └── useBeyondWordsScript.js  # Carga (con dedup) del script UMD de BeyondWords
└── store/
    └── audioPlayerStore.js      # Store singleton (estado compartido del player)
```

Componente relacionado fuera de la carpeta:
`LN/common/switchToggle/default.jsx` — switch genérico reutilizable que usa `summarySwitch`.

---

## 2. Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     audioPlayerStore (singleton)              │
│   { isOpen, noteId, isPlaying, isSummary, showVariantIa,      │
│     hasError }                                                │
└───────▲───────────────────────────────▲─────────────────────┘
        │ useAudioPlayerState/Actions    │
        │                                │
   AudioButton (DS-Toolbar)         AudioPlayer (default.jsx)
   - dispara open()/barrier          - Portal + Motion (drawer)
   - lee isOpen/isPlaying/hasError   - cierra con Escape
                                     │
                                     ├── BuildAudioPlayer
                                     │   - useBeyondWordsScript()
                                     │   - new BeyondWords.Player(...)
                                     │   - listeners → store + tracking
                                     │
                                     └── SummarySwitch
                                         - setSummary() + page_listened
```

**Principio de diseño:** el **store** guarda estado **compartido** entre componentes; el estado de
**vista** (ej. `contentAvailable` para el spinner) se queda **local** en `buildAudioPlayer`.

---

## 3. Store (`store/audioPlayerStore.js`)

Store singleton de módulo, consumido vía `useSyncExternalStore`. No usa Context para poder ser
disparado desde helpers imperativos (ej. el click handler del botón) sin estar dentro del árbol.

### Estado

| Campo | Tipo | Descripción |
|---|---|---|
| `isOpen` | `boolean` | Drawer abierto/cerrado. |
| `noteId` | `string\|null` | ID de la nota a reproducir (= `sourceId` de BeyondWords). |
| `isPlaying` | `boolean` | Si el audio está reproduciéndose (lo leen los botones para animar). |
| `isSummary` | `boolean` | Preferencia de modo resumen (persistida en cookie). |
| `summaryAvailable` | `boolean\|null` | Si la nota tiene resumen. `null` = aún no se sabe (pre-carga). |
| `showVariantIa` | `boolean` | Variante "voz del autor". |
| `hasError` | `boolean` | Hubo un error de audio. |

### Acciones

| Acción | Efecto |
|---|---|
| `open(noteId, opts)` | `isOpen=true`, setea `noteId`, **restaura** `isSummary` desde la cookie (ver abajo), `summaryAvailable=null` y `hasError=false`. |
| `close()` | `isOpen=false`, `noteId=null`, `isPlaying=false`, `summaryAvailable=null`, `hasError=false`. |
| `setPlaying(bool)` | Actualiza `isPlaying`. |
| `setSummary(bool)` | Actualiza `isSummary` **y persiste la preferencia en cookie**. |
| `setSummaryAvailable(bool)` | Marca si la nota actual tiene resumen (lo setea `buildAudioPlayer` al cargar). |
| `setError()` | `isOpen=false`, `isPlaying=false`, `hasError=true`. |

> **Singleton ⇒ el estado persiste entre aperturas.** Por eso `open()` resetea los flags relevantes.
> Si en el futuro se agrega estado al store, recordar resetearlo en `open()`/`close()`.

### Persistencia de "Escuchar resumen"

La última elección del switch de resumen se guarda en la cookie **`lnAudioSummary`** (`'true'`/`'false'`)
con vencimiento a **7 días**, vía `handleCookie` (`setCookie` espera la expiración **en minutos** →
`7 * 24 * 60`). `setSummary()` la escribe; `open()` la lee con `getCookie` para restaurar `isSummary`.
En SSR `getCookie` devuelve `undefined` (no hay `document`) ⇒ default `full`.

> La preferencia restaurada **no** se aplica directamente al crear el player: se reconcilia con la
> disponibilidad real de la nota (ver "Disponibilidad del resumen" en §4).

### Hooks

- `useAudioPlayerState()` → snapshot reactivo del estado.
- `useAudioPlayerActions()` → referencias estables a las acciones.

---

## 4. Ciclo de vida del player (`components/buildAudioPlayer.jsx`)

1. **Carga del script** vía `useBeyondWordsScript()`. El hook **deduplica**: si el `<script>` ya
   está en el DOM o `window.BeyondWords` ya existe, no lo reinyecta.
2. **Instanciación** en un `useEffect` con guard triple:
   ```js
   if (!isScriptLoaded || !noteId || !document.querySelector('.audio-player')) return;
   ```
   El guard `!noteId` es clave: evita instanciar el player con `sourceId: null` durante la animación
   de cierre del `<Motion>` (causaba un 404 + toast de error fantasma).
3. **Listeners** (registrados con `AbortController.signal` para limpieza automática):
   - `NoContentAvailable` → `notifyAudioError()`.
   - `PlaybackPaused` / `PlaybackPlaying` → `actions.setPlaying()`.
   - `ContentAvailable`, `CurrentTimeUpdated`, `PlaybackEnded` → tracking (ver §5), vía
     `setupBwReproductionTracking`.
4. **Cleanup**: `controller.abort()` + `player.destroy()`.
5. **Cambio de modo resumen**: un `useEffect` separado actualiza `player.summary` e `playbackState`
   **sin recrear** la instancia (depende de `isSummary` y `summaryAvailable`).

### Disponibilidad del resumen (gating del switch)

No hay forma de saber si una nota tiene resumen **antes** de cargar el player: el único dato
confiable es `player.content[0].summarization.audio[0].duration` (`getDurations`), disponible recién
en `ContentAvailable`. Por eso:

- El player **siempre se instancia en completo** (`summary: false`). En `ContentAvailable`,
  `setupBwReproductionTracking` calcula `summary > 0` y lo reporta vía `setSummaryAvailable`.
- El **switch** (`summarySwitch`) queda **deshabilitado** mientras `summaryAvailable !== true`
  (incluye el estado `null` de carga); con `false` muestra un `title` aclaratorio.
- El player solo pasa a resumen si `isSummary && summaryAvailable === true`. Así, si la preferencia
  guardada es resumen pero la nota no lo tiene, **se respeta la cookie pero esa nota queda en
  completo** (no se pisa la preferencia para las notas que sí lo tengan).

### Manejo de error

`notifyAudioError()` está protegido con un `useRef` (`hasNotifiedError`) para disparar **un solo
toast por sesión de player**. Marca `hasError` en el store (fuente de verdad, leída por los botones)
y enruta el toast por el adapter (ver §7).

### Estado local

`contentAvailable` (`useState`) controla el spinner. Es estado de vista puro, no se sube al store.

---

## 5. Tracking de reproducción (`helpers.js`)

Todos los eventos usan `addEventToDataLayerV2` con `event: 'page_listened'`. El payload de metadatos
lo arma `getAudioEvents()` y se le agrega el campo `reproduccion`.

### Disparos

| Origen | `reproduccion` | Función |
|---|---|---|
| Click en "Escuchar" (incluso si va al barrier) | `'0'` | `handleClickAudioNews` |
| Cambio de switch resumen | `'0'` | `summarySwitch` (inline) |
| Hitos de progreso | `'25'`,`'50'`,`'75'` | `emitPercentage` |
| Fin de reproducción | `'100'` | `emitCompletion` |

### Conteo de progreso

- Estado de progreso mantenido en `progressByAudioMode`, **keyed por `audioId|mode`** → conteos
  independientes para `full` y `summary` de la misma nota.
- `PROGRESS_AUDIO = [25, 50, 75]`. Cada hito se emite una vez (flags `sent25/50/75`).
- `100%` solo en `PlaybackEnded` (flag `sent100`), no por scrubbing.
- `ContentAvailable` y `PlaybackPlaying` resetean el progreso de la pista actual
  (`resetCurrentProgress`).

### Payload de `getAudioEvents(globalContent, globalContentConfig, isSummary)`

```js
{
  autor_nombre,   // extractDataFromCredits(credits.by).autores || 'N/A'
  method: 'MP3',
  origin: 'nota',
  mode: isSummary ? 'summary' : 'full',
  seccion,        // getSectionOfRequestUri(query.uri)
  nota_id,        // globalContent._id
  audio_id,       // promo_items.audio_nota.embed.config.audio_id
  custom_voice,   // isCustomVoice(credits.by[0].additional_properties.original)
}
```

---

## 6. Apertura y barrier (`helpers.js` → `handleClickAudioNews`)

```js
if (subscription && token) {
  audioPlayerStore.open(noteId, { showVariantIa });   // suscripto + logueado → abre drawer
  if (closeTooltipIAAuthor) scheduleTask(() => closeTooltipIAAuthor());
} else {
  openBarrier();                                        // si no → barrier de suscripción
}
// page_listened (reproduccion: '0') se dispara SIEMPRE, en ambas ramas.
```

El trigger (`AudioButton` en `DS-Toolbar`) decide mostrarse con:
`!useTermica('hide_listening_articles') && isListenable`.

`showVariantIa` se calcula en `DS-Toolbar/default.jsx`:
`customVoice && thermicalAudio && authors.length <= 1`.

---

## 7. Sistema de toasts (migración en curso)

El toast de error se enruta por `renderToastAdapter`, que elige entre el sistema legacy y el DS según
el layout:

```js
const DS_TOAST_LAYOUTS = [layoutsName.StoryTellingV2, layoutsName.NotaOpinion];
const useDesignSystem = DS_TOAST_LAYOUTS.includes(layout);
renderToastAdapter({ variant: 'danger', title, message, duration }, useDesignSystem);
```

Los nombres de layout se importan de `properties/sites/la-nacion-ar.js` (fuente única).

> **TODO:** cuando todos los templates estén migrados al DS, eliminar el adapter y
> `DS_TOAST_LAYOUTS`, y llamar directo a `renderToasts` del DS. Ver el TODO inline en
> `buildAudioPlayer.jsx`.

---

## 8. Accesibilidad

- Drawer: `<section aria-label="Reproductor de audio">`, cierre con **Escape**.
- `switchToggle`: `role="switch"` + `aria-checked`; el nombre accesible se provee con
  `aria-labelledby` (apunta al texto visible "Escuchar resumen"); íconos decorativos con
  `aria-hidden`.
- Botón de cerrar con `aria-label`.

### Gestión de foco (no-modal)

El drawer se renderiza en un `Portal` (al final del `<body>`), por lo que sin intervención el foco
no llega a sus controles al abrir. El manejo vive en `default.jsx`:

- **Al abrir** → el foco se mueve al `<section>` (`tabIndex={-1}`, `focus:outline-none`), de modo
  que el lector de pantalla anuncia la región y el siguiente `Tab` recorre los controles
  (player BeyondWords → cerrar → switch de resumen).
- **Sin focus trap** → es un mini-player **persistente**: al seguir tabulando el foco vuelve al
  sitio. No se atrapa el foco a propósito (no es un diálogo modal).
- **Al cerrar** (Escape / botón / `setError`) → el foco se devuelve al trigger que lo abrió.

> **Por qué un callback ref y no un `useEffect`:** `Motion` monta el drawer **un render después**
> de que `show` pasa a `true` (hace `setShouldRender(true)` en su propio effect). Un `focus()` por
> effect/`rAF` corre antes de que el `<section>` exista en el DOM y no aterriza. El callback ref
> (`useCallback([isOpen])`) ejecuta el `focus()` justo cuando el nodo se monta, y al depender solo de
> `isOpen` no roba el foco en cada re-render (play/pausa, toggle de resumen).

> **Dependencia externa:** los controles de play/pausa los renderiza BeyondWords dentro de
> `.audio-player`; que sean alcanzables por teclado depende de ese player, no de este componente.

Ver el spec `openspec/specs/accessibility.md`.

---

## 9. Integración: cómo se monta

`<AudioPlayer />` (este `default.jsx`) se monta una vez por página donde haya toolbar de nota:

- `LN/DS-Toolbar/default.jsx`
- `LN-nota/signature/default.jsx` (cuando `withAudio` está activo)

El disparo se hace desde `AudioButton`, que llama a `handleClickAudioNews`. No hace falta pasar
props entre el botón y el drawer: se comunican por el store.

---

## 10. Tests

```
__tests__/components/features/LN/common/audioPlayer/
├── default.test.jsx
├── helpers.test.js                        # detección de resumen disponible (ContentAvailable)
├── components/buildAudioPlayer.test.jsx   # incluye toast legacy vs DS por layout + gating de resumen
├── components/summarySwitch.test.jsx      # incluye estados disabled del switch
├── store/audioPlayerStore.test.js         # incluye persistencia en cookie + summaryAvailable
└── hooks/{useAudioPlayerState,useAudioPlayerActions}.test.jsx
```

Correr: `npm test -- audioPlayer`

**Gotchas de testing:**
- `useSyncExternalStore` re-renderiza: envolver mutaciones del store en `act()`.
- `clearAllMocks()` limpia historial pero **no** implementaciones de `mockReturnValue`: restaurar el
  contexto por defecto en `beforeEach` si un test lo sobreescribe.
- El `<script>` de BeyondWords se comparte a propósito (no se remueve en unmount): limpiarlo en
  `afterEach` para aislar tests.
- **Cookies en jsdom:** la URL de test es `http://localhost/`, así que el `domain=.lanacion.com.ar`
  de `handleCookie` es rechazado. Para testear la persistencia hay que **mockear `handleCookie`**
  (ver `store/audioPlayerStore.test.js`).
