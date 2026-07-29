---
name: cardpromo-responsive
description: Ajustar cómo se ve una card de la Caja Promo (LN_DS_CajaPromo / DS-CardPromo) en algún viewport — su size, su orientación, o la grilla de la diagramación. Usalo siempre que llegue un pedido de diseño sobre la caja de juegos o podcasts, aunque no nombre archivos ni clases: "que en tablet las cards sean 32", "en mobile que vayan horizontales", "esta diagramación tiene que verse distinto en acumulado", "el título quedó chico en desktop", "falta el breakpoint lg". También cuando haya que completar combinaciones de size×orientación que falten en CARD_RESPONSIVE. Evita las tres trampas conocidas de esta card: los tokens tipográficos del DS que anulan los overrides responsive, las clases de Tailwind construidas dinámicamente, y el guard de variants.test.js.
---

# Ajustes responsive de la card de Caja Promo

Esta card no decide su aspecto: lo deriva de su posición dentro de la chain. Por eso un pedido de
diseño como "que en tablet sean más grandes" casi nunca se resuelve tocando un componente — se
resuelve cambiando una regla y, a veces, completando la tabla de clases responsive.

El contexto completo está en `components/chains/LN_DS_CajaPromo/README.md`. Leelo si algo de acá no
te cierra; este skill es el procedimiento, ese README es el porqué.

## Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| Regla de card por diagramación y posición | `components/chains/LN_DS_CajaPromo/common/layoutRules.js` |
| Grilla de cada diagramación | `components/chains/LN_DS_CajaPromo/diagramations/*.jsx` |
| Estilos de la card por size × orientación | `components/features/LN/common/cardPromo/styles.js` |
| Guard de estilos | `__tests__/components/features/LN/common/cardPromo/variants.test.js` |
| Doc para diseño | `docs/Arc/doc-promo.md`, **fuera del repo** (un directorio arriba) |

## Procedimiento

### 1. Traducir el pedido a una regla

Identificá la diagramación (la key de `LAYOUT_RULES`) y qué posiciones de card afecta. `range` es
inclusivo y va sobre el índice del feature dentro de la chain.

```js
{ range: [0, 3], size: { default: 18, md: 24 }, orientation: 'vertical' }
```

`size` y `orientation` aceptan un valor suelto (vale para todos los viewports) o un objeto
`{ default, md, lg, xl }`. Un valor suelto no es lo mismo que `{ default: X }` en intención pero sí
en efecto — usá el objeto solo cuando algo cambie entre breakpoints, así se lee de un vistazo qué es
responsive y qué no.

### 2. Decidir si va en la base o en un override por página

Mirá `GAME_LAYOUT_RULES` en `common/_helper.js`: si la diagramación está habilitada en **una sola**
página, el cambio va en `LAYOUT_RULES` y listo. Si está en varias y el pedido aplica a una,
va en `PAGE_OVERRIDES`, indexado por layout de página.

El array de un override **reemplaza completo** al de la base para esa combinación; no hay merge.
Eso es a propósito: con arrays de una o dos reglas es más fácil de leer que cualquier merge parcial.

### 3. Verificar que existan las clases del combo destino

Este es el paso que se olvida y produce un cambio que "no hace nada".

Las combinaciones responsive están escritas como **strings literales** en `CARD_RESPONSIVE`
(`cardPromo/styles.js`), con la forma `CARD_RESPONSIVE[slot][breakpoint]['<size>_<orientación>']`.
Tienen que ser literales porque Tailwind 4 escanea el código fuente buscando clases; una clase
armada con template string no existe en el CSS compilado.

Los slots son seis: `root`, `media`, `content`, `title`, `description`, `action`. La cinta de
suscriptor va aparte, en `CARD_RIBBON_RESPONSIVE`, indexada solo por size.

Chequeá el estado actual antes de escribir nada:

```bash
grep -n "'18_\|'24_\|'32_" components/features/LN/common/cardPromo/styles.js
```

Si el combo destino ya existe en el breakpoint que necesitás, no hay nada que agregar y el cambio
del paso 1 alcanza. Si falta, derivalo del `compoundVariants` de ese size × orientación en el cva
correspondiente, prefijando cada utility con el breakpoint. El combo tiene que quedar en **los seis
slots**, porque `getResponsiveCardClasses` los consulta por separado y un slot faltante deja esa
parte de la card con el estilo del viewport anterior.

Ojo con las clases que apagan algo: si el estado base de un slot es `hidden` y en el breakpoint
tiene que aparecer, el override necesita una clase que reponga el `display` (`md:line-clamp-3` lo
hace, `md:block` también). Sin eso el elemento queda invisible aunque el resto de las clases lleguen.

### 4. Nunca usar tokens tipográficos del DS

Los tokens semánticos (`text-heading-*`, `text-subheading-*`, `text-body-*`, `text-label-*`,
`text-display-*`, `text-small-*`) viven en `@layer components` y, como el proyecto importa Tailwind
con el flag `important`, compilan con `!important`. Para declaraciones `!important` el orden de
capas se invierte: `components` le gana a `utilities`. Resultado: el token anula cualquier
`md:`/`xl:` del mismo property y el texto queda clavado en el valor de mobile.

Escribí siempre las utilities crudas equivalentes:

| Token | Utilities |
|---|---|
| `text-heading-sm` | `text-24 md:text-28 xl:text-32 leading-[110%] tracking-[-0.6px] opsz-50` |
| `text-subheading-md` | `text-24 leading-[110%] tracking-[-0.3px] opsz-50` |
| `text-body-lg` | `text-18 leading-[140%] tracking-[-0.6px]` |
| `text-body-md` | `text-16 leading-[140%] tracking-[-0.3px]` |

Si necesitás uno que no está en la tabla, buscá su definición en
`node_modules/@ln/theme-lanacion/config/components.css` y copiá lo que declara su `@apply`.

El límite de la regla son los tokens de **tamaño de texto**. `font-primary` y `font-w-*` también
son de `components`, pero no se expanden: montan la fuente variable con selectores de descendencia y
custom properties, no hay utilities equivalentes, y ningún breakpoint las pisa.

Relacionado: `cx` no hace merge de clases de Tailwind. Si el mismo property queda declarado dos
veces en el string final, gana el orden del stylesheet, no el orden en que las escribiste. Declará
cada property una sola vez por combinación en vez de poner un default en la base y pisarlo en un
compound.

### 5. Actualizar la grilla si hace falta

Si el pedido incluye cambiar la cantidad de columnas, eso vive en `diagramations/*.jsx`, no en las
reglas de card. Hoy la grilla no varía por página: si un pedido necesitara distintas columnas según
la página, hace falta extender el override hasta el componente de grilla, y eso es trabajo aparte
que conviene conversar antes de encarar.

### 6. Verificar

```bash
npx jest __tests__/components/features/LN/common/cardPromo __tests__/components/chains/LN_DS_CajaPromo
```

`variants.test.js` evalúa los cva reales — sin mockear `@ln/ds-cva` — y falla si se coló un token
semántico en cualquier combinación. Si te falla ahí, volvé al paso 4.

Si tocaste `layoutRules.js`, actualizá los casos de `layoutRules.test.js` que afirman esa
diagramación. Si agregaste un combo nuevo a `CARD_RESPONSIVE`, sumá un caso en `styles.test.js`
sobre `getResponsiveCardClasses` para ese size × orientación.

Las clases nuevas necesitan que se regenere el CSS para verse en el navegador. **No corras
`npm run build-dev` con el engine levantado**: borra `resources/dist` y rompe `/render` con un
ENOENT de CSS hasta que termine.

### 7. Actualizar la documentación

Son dos documentos con audiencias distintas, y los dos se actualizan en el mismo paso que el código,
no al final:

- `components/chains/LN_DS_CajaPromo/README.md` — para devs. La tabla de "Configuración actual" y,
  si corresponde, las limitaciones técnicas. Sin lenguaje de diseño ni pendientes.
- `docs/Arc/doc-promo.md` — para diseño, fuera del repo. La descripción visual de la diagramación y
  el estado del pendiente si el cambio venía de uno.

## Efectos colaterales que conviene anticipar

Cambiar un size arrastra cosas que el pedido no menciona. Revisalas y avisá si alguna sorprende:

- **La descripción aparece o desaparece.** No se configura: se deriva de size × orientación en
  `cardDescriptionVariants`. Está oculta en size 18 (ambas orientaciones) y en 24 vertical, y visible
  en el resto. Bajar una card de 32 a 24 en mobile le saca la descripción en mobile.
- **El título cambia de escala.** El size de la card no es el tamaño del título: 18 → 18px fijo,
  24 → 24px fijo, 32 → 24px que sube a 28 en `md` y a 32 en `xl`.
- **La cinta de suscriptor cambia de medidas** entre size 18 (28×32, ícono 16) y sizes 24 y 32
  (40×44, ícono 24). El badge no: va siempre a 4px del borde.
- **La imagen puede quedar corta.** Cada diagramación tiene su config de resizer en
  `properties/sites/helperConfigLN/imageConfig.js`, mapeada en `DS-CardPromo/_helpers.js`. Si la
  card crece, comparar el ancho que ocupa contra el tamaño que se sirve.

## Un detalle sobre breakpoints

`BP_ORDER` contempla `sm`, `md`, `lg` y `xl`, y `getResponsiveCardClasses` resuelve en cascada: para
un breakpoint dado toma el último valor declarado en ese o en uno anterior. Pero `CARD_RESPONSIVE`
hoy **solo tiene el bloque `md`**. Declarar `size: { default: 18, lg: 24 }` no rompe nada, pero no
produce ninguna clase hasta que exista el bloque `lg` con ese combo en los seis slots. Si el pedido
es para `lg` o `xl`, el trabajo real es armar ese bloque.
