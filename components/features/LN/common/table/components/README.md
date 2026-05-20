# Table Components

Este módulo expone el componente de tabla para contenido editorial de ARC.

---

## `LNTable` (default)

Renderiza tablas a partir del formato de datos que envía ARC. Es el componente que se usa en features de contenido editorial.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `data` | `{ header[], rows[] }` | `{}` | Datos en formato ARC |
| `classnames` | `{ container?, header?, row? }` | `{}` | Overrides de clases por zona |
| `stickyFirstCol` | `boolean` | `false` | Fija la primera columna al hacer scroll horizontal |
| `striped` | `boolean` | `false` | Filas alternas con fondo (`odd:bg-neutral-50`), delegado al `Table.Body` del DS |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Alineación de celdas |
| `className` | `string` | — | Clase extra para el wrapper |
| `captionProps` | `{ content?, align?, className?, ...rest }` | `{}` | Caption accesible debajo de la tabla |

### Ejemplo

```jsx
<LNTable
  data={arcTableData}
  stickyFirstCol
  striped
  captionProps={{ content: 'Fuente: INDEC', align: 'end' }}
/>
```

Para datos que no vienen de ARC, transformarlos al formato esperado antes de pasarlos:

```js
const data = {
    header: columns.map(col => ({ content: col.label })),
    rows: items.map(item =>
        columns.map(col => ({ content: col.render ? col.render(item) : item[col.key] }))
    )
};
```

---

## `TableSkeleton`

Loading state para tablas. Lo usa internamente `LNTable`, pero puede usarse standalone.

### Props

| Prop | Tipo | Default |
|---|---|---|
| `columns` | `number` | `3` |
| `rows` | `number` | `2` |
