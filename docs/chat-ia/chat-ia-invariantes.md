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

**Excepción, en el Mundial:** `canReset` no espera el tipeo cuando el status es
`error`. Ahí no hay respuesta que tipear, y esperarla deja el chat sin salida:
input bloqueado y sin CTA para reiniciar.

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
disabled: isBlocked || inputProps?.disabled; // isBlocked = status blocked|error
```

El `disabled` que se le pasa al root va al wrapper `Formcontrol` y termina en un
`data-disabled` — puro estilo. **El campo solo se deshabilita de verdad con
`inputProps.disabled`.** Sin eso, cualquier bloqueo propio (generating, tipeo,
sesión expirada) es decorativo: el usuario escribe igual.

Los mocks de `Thread.Input` en los tests tienen que modelar esa precedencia
(leer `inputProps.disabled`, no la prop del root) o el bug pasa en verde.

## 4. Los carteles se deciden por `status`, no por `runtime.error`

`runtime.error` es señal machine-readable para telemetría: el backend puede
informar un `internal_error` con la sesión `active` y el chat andando. Solo
`status` (`error` / `blocked`) dice si el chat quedó parado.

## 5. `RESPONSE_FORMAT` es una constante por chat

El mismo valor alimenta el `response_type` del request y el `answerFormat` del
render. El bloque no ve el request y la respuesta no trae indicador de formato:
si divergen, el markdown se muestra crudo (`**` en pantalla) sin ningún error
de por medio. Los tests comparan contra la constante, no contra el literal.

## 6. El término de búsqueda de Queryly sale de `keywords`, con `query` de red

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

## 7. La key de los mensajes es el índice

La lista es append-only y el reset la vacía entera, así que el índice es
estable. Los campos del contrato no sirven: las respuestas de error comparten
`session_id` y `chat_count`.
