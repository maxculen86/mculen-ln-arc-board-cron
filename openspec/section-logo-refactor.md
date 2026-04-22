# Refactor: sectionUtils logo resolution

## Consumers actuales

| Archivo | Usa |
|---|---|
| `components/private/LN/common/logoBase/container.jsx` | `getSectionLogo \|\| getCustomSectionLogo` |
| `components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningAddons.jsx` | `getAFondoLogo \|\| getSectionLogo \|\| getCustomSectionLogo` |

> `getCustomSectionLogo` recibe named params `({ sections, layout, tags })` — más robusto ante cambios de firma sin depender del orden de argumentos.

---

## Contexto

`sectionUtils.js` tiene dos sistemas de resolución de logo que conviven durante la migración:

- **Sistema viejo** (`getSectionLogo` + `getLogoData`): regex contra `_id` de sección, paths dinámicos, BBC
- **Sistema nuevo** (`getCustomSectionLogo` + `SECTION_LOGO_CONFIG`): config-driven, matches exactos por `sectionId` o `tagSlug`

---

## Estado actual

- `SECTION_LOGO_CONFIG` tiene entrada para `/comunidad` (layouts: Noticia → foreground, StoryTelling/V2 → blanco)
- `getCustomSectionLogo` retorna `{ logoName, path, color, isExternal }` — mismo contrato que `getSectionLogo`
- `container.jsx` llama a `getSectionLogo || getCustomSectionLogo`

---

## Pasos pendientes

### 1. Prioridad via orden del config

El orden del array `SECTION_LOGO_CONFIG` define la prioridad — `.find()` retorna el primer match. Así la prioridad vive en el config y ningún consumer necesita saberla:

```js
const SECTION_LOGO_CONFIG = [
    // prioridad 1 — tag a-fondo prevalece sobre cualquier sección
    { matchBy: 'tag', tagSlug: 'a-fondo', ... },
    // prioridad 2 — secciones específicas
    { matchBy: 'section', sectionId: '/comunidad', ... },
];
```

Si un artículo es de `/comunidad` Y tiene el tag `a-fondo`, gana `a-fondo`. Para invertir la prioridad solo se reordena el array.

---

### 2. Agregar `getAFondoLogo` al config

Extender `SECTION_LOGO_CONFIG` con soporte para match por tag:

```js
{
    matchBy: 'tag',
    tagSlug: 'a-fondo',
    validLayouts: [layoutsName.StoryTelling, layoutsName.StoryTellingV2, layoutsName.Cards],
    foregroundLayouts: [layoutsName.Cards],
    logoName: 'a-fondo-logo',
    path: '/a-fondo'
}
```

`getCustomSectionLogo` recibe `tags` como tercer parámetro y agrega el matcher:

```js
const matchers = {
    section: ({ sectionId }) => sections.some(s => s?._id === sectionId),
    tag:     ({ tagSlug })   => tags.some(t => t?.slug === tagSlug)
};
```

### 3. Crear facade `resolveSectionLogo`

Punto de entrada único para el consumer, delega en orden de prioridad:

```js
export const resolveSectionLogo = (sections, layout, tags, distributorName) =>
    getCustomSectionLogo(sections, layout, tags) ||
    getSectionLogo(sections, layout, distributorName);
```

Actualizar `container.jsx` para usar solo `resolveSectionLogo`.

### 4. Migrar casos simples de `getSectionLogo` al config

Candidatos (match exacto de `_id`, sin path dinámico):
- `/propiedades`, `/salud`, `/autos`, `/que-sale`

No migrar (path dinámico o lógica especial):
- `/revista-xxx` (regex con capture group)
- `/deportes/canchallena`, `/masmusica` (paths externos)
- BBC (match por distributor, no por sección)

### 5. Eliminar código muerto

Una vez que `getSectionLogo` quede sin casos:
- Eliminar `getSectionLogo`, `getLogoData`, `getRegex`, `generatePath`, `LOGO_NAME_MAP`
- Eliminar `getAFondoLogo`, `hasAFondoTag`
- Quitar `color` del fallback en `container.jsx`

---

## Tests

Archivo: `__tests__/components/private/common/utils/getCustomSectionLogo.test.js`

Cubre el estado actual del util (`/comunidad` con Noticia/StoryTelling/StoryTellingV2). A medida que se migran casos al config, el test debe actualizarse:

| Paso de migración | Qué agregar al test |
|---|---|
| Agregar `a-fondo` al config | `describe` con casos de tag match: layout StoryTelling/V2 → `color: false`, Cards → `color: true`, tag ausente → null |
| Agregar secciones simples (`/propiedades`, `/salud`, etc.) | Un `it` por sección nueva verificando `logoName` y `path` correctos |
| Soporte `matchBy: 'tag'` en el resolver | Caso donde tag y sección matchean simultáneamente → verificar que gana la prioridad del config (orden del array) |
| Facade `resolveSectionLogo` | Test de integración separado que verifique la cadena completa: config → regex → null |

> Cada entrada nueva en `SECTION_LOGO_CONFIG` requiere al menos: happy path con layout foreground, happy path con layout background, y caso sin match.

---

## Estructura del config al final de la migración

```js
const SECTION_LOGO_CONFIG = [
    { matchBy: 'section', sectionId: '/comunidad',   ... },
    { matchBy: 'section', sectionId: '/propiedades', ... },
    { matchBy: 'section', sectionId: '/salud',       ... },
    { matchBy: 'section', sectionId: '/autos',       ... },
    { matchBy: 'section', sectionId: '/que-sale',    ... },
    { matchBy: 'tag',     tagSlug: 'a-fondo',        ... },
    // casos regex quedan fuera o se resuelven aparte
];
```
