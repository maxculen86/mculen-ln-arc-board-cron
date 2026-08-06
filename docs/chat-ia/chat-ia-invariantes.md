# Chats IA — invariantes

Reglas no obvias de los dos chats sobre `@ln/ds-blocks-thread` 2.0: Foodit IA
(`components/layouts/Foodit-chat-ia`) y Chat Mundial
(`components/features/LN-acumulado/chatIa`).

Del contrato 2.0 alcanza con saber que la respuesta viaja en `data.message`
(`answer` en markdown, `sources`, `follow_up_query`, `keywords`) y que la
continuidad la define `data.session_status` (`active` | `completed` |
`terminated`), nunca `max_reached`.

## 1. Cierre de sesión ≠ error

El backend cierra la sesión por diseño cuando se agotan las preguntas
(`session_status: 'completed'` → `runtime.status === 'blocked'`, código
`session_completed`). Ese es el final normal de la conversación.

`Thread.Error` es el fallback técnico y nada más. Su `filter` excluye
`session_completed` y `session_terminated`; sin eso el bloque cae en su default
de debug y muestra el código crudo en pantalla.

El cierre limpio lo renderiza `SessionEnd`: texto de despedida + CTA de
navegación.

## 2. El cierre se muestra recién cuando terminó de tipearse la respuesta

`useChatRuntime` appendea el mensaje y pasa a `blocked` en el mismo tick, así
que React los batchea: cualquier cosa gateada por `runtime.status` aparece
mientras el asistente todavía se está tipeando.

Por eso el bloque de cierre entero (texto + botón) cuelga de
`showAfterRenderAssistant`, que se prende con el `onTypingComplete` del root y
se apaga en `sending`/`generating`. Si el texto y el botón vuelven a colgar de
gates distintos, reaparece el desfasaje que motivó `SessionEnd`.

**Excepción, en los dos:** en `error` no hay respuesta que tipear, y esperarla
deja el chat sin salida. En el Mundial `canReset` no espera el tipeo cuando el
status es `error`; en Foodit no hay CTA de reset, así que la salida es el propio
input y por eso `disableInput` no incluye `error` (ver punto 3).

## 3. El input tampoco se habilita hasta que termina el tipeo

Mismo motivo, otra punta: el runtime vuelve a `idle` en cuanto llega la
respuesta, así que la animación corre con el chat "libre". Si el usuario manda
otra pregunta ahí, el mensaje anterior se corta a mitad de camino — no rompe
nada, pero se pierde la simulación de streaming.

`disableInput` suma `isTypingAnswer` (último mensaje del asistente +
`showAfterRenderAssistant` en false), que no puede derivarse de `runtime.status`
porque durante el tipeo el status ya es `idle`.

### ⚠️ El `disabled` de `Thread.Input` NO deshabilita el campo

Trampa de la librería, y aplica a los dos chats. `Thread.Input` renderiza el
textarea con su propio `disabled`, spreadeado último, así que gana:

```js
disabled: isBlocked || inputProps?.disabled; // isBlocked = status blocked, nada más
```

El `disabled` que se le pasa al root va al wrapper `Formcontrol` y termina en un
`data-disabled` — puro estilo. **El campo solo se deshabilita de verdad con
`inputProps.disabled`.** Sin eso, cualquier bloqueo propio (generating, tipeo,
sesión expirada) es decorativo: el usuario escribe igual.

### `error` no bloquea, y bloquearlo a mano rompe la recuperación

`isBlocked` mira **solo** `blocked`, que es un hecho de la sesión
(`session_status !== 'active'`): mandar otro mensaje va a fallar sí o sí. `error`
es transitorio —un timeout, un 502, un JSON cortado— y la librería lo deja pasar
a propósito porque `onSubmit` arranca con `setError(null)`: reintentar destraba
el chat solo.

Por eso `disableInput` **no** incluye `error`. Sumarlo devuelve el chat al estado
sin salida del punto 2: input muerto, cartel de error y ningún CTA, porque el
bloque de cierre espera un `onTypingComplete` que en error nunca llega.

El corolario es el placeholder de Foodit: **habla solo de estados que además
deshabilitan el campo** ("Sesión expirada", "Foodit está escribiendo…"). El error
quedó afuera por lo mismo — sobre un input que funciona, anunciar el error invita
a no escribir justo cuando reintentar es la salida. Del error avisa el cartel de
`Thread.Error`, que es su lugar.

Los mocks de `Thread.Input` en los tests tienen que modelar esa precedencia
(leer `inputProps.disabled`, no la prop del root) o el bug pasa en verde.

## 4. Los carteles se deciden por `status`, no por `runtime.error`

`runtime.error` es señal machine-readable para telemetría: el backend puede
informar un `internal_error` con la sesión `active` y el chat andando. Solo
`status` (`error` / `blocked`) dice si el chat quedó parado.

## 5. Todo request al chatbot va con timeout, y no es el mismo para todos

Un `fetch` sin `AbortSignal` no falla nunca: queda colgado hasta que el browser
decida cortar, con criterio propio y del orden de los minutos. Y un request
colgado **no produce error**, así que la UI —que gatea por estado y no por
tiempo— se queda esperando para siempre: en Foodit el "Foodit está pensando ..."
queda eterno (`showIsThinking` sin `hasAnswer` ni `hasError`) y en el Mundial los
chips de sugeridas quedan `disabled` porque nunca llega el `session_id`.

Los cuatro helpers pasan por `fetchWithTimeout`
(`components/private/common/utils/`), con dos valores distintos:

| Endpoint | Timeout | Por qué |
| --- | --- | --- |
| `/api/chat` | `API_IA_CHAT_TIMEOUT` | genera con el LLM, tarda por diseño |
| `/api/session`, `/api/sq`, `/api/search` | `API_IA_SESSION_TIMEOUT` | son triviales |

Un solo valor no sirve: el corto corta respuestas largas que están llegando
bien, y el largo deja la creación de sesión colgada mucho más de lo que amerita.

Los valores salen de `environment/*.js` y llegan como string, así que los helpers
los pasan por `Number`. Hoy `API_IA_SESSION_TIMEOUT` es 15s en todos lados y
`API_IA_CHAT_TIMEOUT` va más holgado en dev/QA (90s contra los 60s de prod),
donde los chatbots responden más lento y un corte se confunde con un bug del
chat.

**Los 15s de sesión no son redondeo:** una creación de sesión medida en sandbox
tardó **9,81s**. Contra los 10s que tenía esto al principio, el margen era de
190ms — cualquier día lento cortaba sesiones que estaban llegando bien. Si
alguien va a bajar este valor, que mida antes.

**Los 60s de `/api/chat`, en cambio, todavía no están medidos.** Lo único medido
es **~6s contra la imagen vieja del chatbot**, la que responde texto plano. La
imagen que sirve markdown todavía no estaba desplegada cuando se puso este
número, y generar markdown puede correr el tiempo de respuesta hacia arriba. Los
60s son holgura deliberada sobre esos 6s, no un percentil real: **re-medir
después del release de la imagen nueva** y ajustar si hace falta.

Dos detalles que dependen de la invariante 3: el corte deja el runtime en
`error`, y **es recuperable** —el `disableInput` de Foodit no bloquea en `error`,
así que reintentar es la salida—. Y `fetchWithTimeout` marca el error con
`isTimeout` porque en `fetch` un corte por tiempo y una cancelación del usuario
son el mismo `AbortError`: sin esa marca, `resolveErrorMessage` del Mundial cae
en el copy genérico ("retomá el chat más adelante"), que sugiere esperar justo
cuando reintentar es lo que corresponde.

Si `Number(...)` da `NaN` —variable sin setear en un entorno—, `fetchWithTimeout`
cae al `fetch` de siempre en vez de abortar en el tick 0. Es lo que mantiene
verdes los tests que no mockean `fusion:environment`, que en test no existe.

## 6. `RESPONSE_FORMAT` es una constante por chat

El mismo valor alimenta el `response_type` del request y el `answerFormat` del
render. El bloque no ve el request y la respuesta no trae indicador de formato:
si divergen, el markdown se muestra crudo (`**` en pantalla) sin ningún error
de por medio. Los tests comparan contra la constante, no contra el literal.

## 7. El término de búsqueda de Queryly sale de `keywords`, con `query` de red

Debajo del chat de Foodit hay una búsqueda de Queryly que se alimenta de la
conversación: `getSearchTerm` → `onSearchTermChange` → `foodit.jsx` →
`QuerylySearch query=` → `dynamicQuery` de `useFilterManager`.

El término se deriva del último mensaje del asistente que tenga algo utilizable:

1. **`data.message.keywords`** — array de strings con los términos que extrae el
   backend. Se usan las **primeras 2**, unidas por espacio-barra-espacio (`" / "`). Más términos angostan
   demasiado la búsqueda.
2. **`data.message.query`** — el eco crudo de lo que escribió el usuario. Da
   peores resultados en consultas conversacionales largas, así que es solo la
   red para que la búsqueda nunca quede sin término.
3. Si el último mensaje no tiene ninguno de los dos, se busca hacia atrás.

`keywords` estuvo fuera del contrato entre la migración a 2.0 y el 2026-08-03 —
en ese lapso la búsqueda funcionó con `query` y los resultados degradaron. Por
eso el fallback existe y conviene dejarlo aunque hoy el campo llegue siempre.

## 8. La key de los mensajes es el índice

La lista es append-only y el reset la vacía entera, así que el índice es
estable. Los campos del contrato no sirven: las respuestas de error comparten
`session_id` y `chat_count`.
