# LN_DS_CajaPromo

Chain de cajas promocionales de Juegos y Podcasts. Renderiza N features `DS-CardPromo` dentro de una
grilla, según la diagramación que el editor elige en PageBuilder.

La referencia visual y los pendientes con diseño viven fuera del repo, en `docs/Arc/doc-promo.md`.

## Estructura

| Archivo | Rol |
|---|---|
| `default.jsx` | Techo, validaciones y selección del componente de grilla |
| `common/layoutRules.js` | Reglas de card por diagramación: size, orientación y clamp por posición |
| `common/_helper.js` | Diagramaciones habilitadas por página y mínimos/máximos de items |
| `common/promoContext.js` | Provee `contentType` (`game` \| `podcast`) a las cards |
| `diagramations/*.jsx` | Un componente por diagramación: solo la grilla (columnas, gap, margen) |
| `json.js` | Salida para la app |

Los estilos de la card están en `components/features/LN/common/cardPromo/` y la feature que la
consume en `components/features/LN/DS-CardPromo/`.

## Cómo se resuelve una card

`DS-CardPromo` no sabe qué aspecto tiene que tener: lo deriva de su posición dentro de la chain.

```js
const { size, orientation, clampTitle } = getRuleForIndex(
    diagramation,  // customFields.layout de la chain padre
    cardPosition,  // índice del feature dentro de la chain
    pageLayout     // layout de página, del appContext
);
```

`getRuleForIndex` busca en `LAYOUT_RULES[diagramation]` la regla cuyo `range` contiene al índice.
Si existe una entrada en `PAGE_OVERRIDES[pageLayout][diagramation]`, esa **reemplaza completo** al
array base para esa combinación.

`size` y `orientation` aceptan un valor suelto o un objeto responsive `{ default, md }`.

## Configuración actual

| Diagramación | Grilla | Reglas de card |
|---|---|---|
| `oneLargeFourSmall` | `grid-cols-1 md:grid-cols-2` + sub-grid de 2 | #0: 24 → `md` 32 · #1-4: 18 → `md` 24, vertical |
| `twoHorizontal` | `grid-cols-1 md:grid-cols-2` | 18 → `md` 24, horizontal |
| `fourVertical` | `grid-cols-2 md:grid-cols-4` | 18 vertical · override Acumulado: 18 → `md` 24 |
| `oneHorizontalThreeVertical` | `grid-cols-1 md:grid-cols-12` (6 + 2/2/2) | #0: 24 vertical → `md` horizontal · #1-3: 18 horizontal → `md` vertical, `clampTitle` |
| `threeVertical` | `grid-cols-1 md:grid-cols-3` | 24 → `md` 32, vertical |
| `oneHorizontal` | `grid-cols-1 lg:grid-cols-12 xl:grid-cols-16`, centrada | 32, vertical → `md` horizontal |

Qué diagramación se puede elegir en cada página se declara en `common/_helper.js`
(`GAME_LAYOUT_RULES`).

## Limitaciones técnicas

**Nunca usar tokens tipográficos semánticos en las variantes de la card.** Los tokens
(`text-subheading-md`, `text-heading-sm`, `text-body-*`) viven en `@layer components` y, con
`important` activado globalmente, compilan todas sus declaraciones con `!important`. Para
declaraciones `!important` **el orden de capas se invierte**: `components` le gana a `utilities`.
Resultado: el token pisa a los overrides responsive (`md:text-28`, `xl:text-32`) y el texto queda
clavado en el tamaño de mobile. Hay que escribir las utilities crudas equivalentes.
`__tests__/.../cardPromo/variants.test.js` falla si vuelve a colarse alguno.

El límite son los tokens de tamaño de texto. `font-primary` y `font-w-*` también viven en
`components`, pero no se expanden: montan la fuente variable con selectores de descendencia y custom
properties, y ningún breakpoint las pisa.

**Solo se puede variar size u orientación en `md`.** Las combinaciones responsive están escritas como
clases literales en `CARD_RESPONSIVE` (`cardPromo/styles.js`) y hoy solo existe el bloque `md`.
Variar en `lg` o `xl` requiere agregar ese bloque para los 6 slots de la card. Las combinaciones
soportadas son `18_vertical`, `24_vertical`, `24_horizontal`, `32_vertical` y `32_horizontal`.

**La visibilidad de la descripción no se configura**, se deriva de size × orientación en
`cardDescriptionVariants`: oculta en 18 (ambas) y en 24 vertical, visible en el resto. Al cambiar el
size de una diagramación se cambia también si la descripción aparece.

**La card horizontal recibe un gap del sistema viejo.** Hay una regla global sin capa,
`.grid-cols-2 { grid-column-gap: 1rem }`, que matchea la clase literal `grid-cols-2` que emite la
variante `horizontal` del root. O sea que toda card cuya orientación base sea horizontal se come
16px de separación entre imagen y contenido que no están declarados en ningún cva. El combo
`18_horizontal` lo anula con `gap-0` — no lo saques pensando que es redundante. Las cards que recién
pasan a horizontal en `md` llevan `md:grid-cols-2`, que ese selector no matchea, así que nunca lo
tuvieron.

**La grilla no varía por página**, solo las reglas de card. Si una diagramación necesitara distinta
cantidad de columnas según la página, hay que extender el override al componente de grilla.

## Cómo agregar un ajuste por página

El skill `/cardpromo-responsive` cubre el procedimiento completo, incluidos los efectos colaterales
que arrastra cambiar un size. Lo de abajo es la forma del override.

```js
export const PAGE_OVERRIDES = {
    [layoutsName.Acumulado]: {
        fourVertical: [
            { range: [0, 3], size: { default: 18, md: 24 }, orientation: 'vertical' }
        ]
    }
};
```

`range` es el rango de posiciones de card, inclusivo. `clampTitle: true` limita el título a 2 líneas.

## Deuda conocida

- `json.js` recorta la cantidad de cards solo para `oneLargeFourSmall` (5) y
  `oneHorizontalThreeVertical` (4). En el resto devuelve todas las cargadas, mientras que la web
  renderiza solo las que entran en la grilla. Con 6 cards en un `fourVertical`, la web muestra 4 y la
  app recibe 6.
- `twoHorizontal` en `md` sigue recibiendo el gap del legacy sobre su `md:pl-16`, o sea 32px entre
  imagen y texto. Cuando se elimine esa hoja va a quedar en 16. Aplicarle `gap-0` al combo
  `24_horizontal` lo dejaría en 16 desde ahora, pero es un cambio visible que falta confirmar.
- El padding del ribbon en size 18 declara `w-28 h-32 pt-12 pb-8 px-8`, o sea 12×12 de caja de
  contenido para un icono de 16. Funciona porque el icono lleva `shrink-0` y el centrado de flex lo
  deja en la posición correcta, pero los valores honestos serían `pt-10 pb-6 px-6` — más `md:pb-8`
  en `CARD_RIBBON_RESPONSIVE` para las diagramaciones que pasan de 18 a 24 en `md`. Esas cuatro
  clases no existen en el CSS compilado, así que el cambio hay que hacerlo junto con un build.
