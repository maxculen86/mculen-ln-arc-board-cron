---
name: "Fusion: Add Static Script"
description: Add a new third-party/static script to the ScriptManager pipeline (src/statics → esbuild → scriptManager component → scriptsHelper → scriptsConfig)
category: Arc XP
tags: [fusion, script, arc-xp, scriptmanager]
---

Agrega un nuevo script estático al pipeline completo del ScriptManager.

**Flujo**:
```
src/statics/{folder}/js/{name}.js
        ↓ esbuild (scripts/esbuildWatch.js)
resources/js/{folder}/{name}.min.js
        ↓ import via contextPath
components/private/common/scriptManager/{Name}.jsx
        ↓ register
scriptsHelper.js + scriptsConfig.js
```

**Steps**

1. **Recopilar información**

   Si no fue provista, usar AskUserQuestion para preguntar:
   - **Nombre del script** (PascalCase para el componente, camelCase para el archivo — ej: `HotjarScript` / `hotjarScript`)
   - **Carpeta en src/statics**: `LN`, `common`, o `FOODIT`
   - **Ubicación en el head**: `head`, `body-top`, o `body-bottom`
   - **Contenido del script fuente** (el JS a alojar en src/statics)
   - **¿Tiene preconnect u otros tags HTML extra?** (como VWO que agrega `<link rel="preconnect">`)
   - **Tipo de carga**: `defer`, `async`, o sin atributo (bloqueante) — según la criticidad del script

2. **Crear archivo fuente en src/statics**

   Ruta: `src/statics/{folder}/js/{camelCaseName}.js`

   - Pegar el contenido JS provisto exactamente como fue dado
   - No modificar ni reformatear — es código de terceros

3. **Hacer el build con esbuild**

   ```bash
   # Correr el watcher una vez y matarlo tras el rebuild
   timeout 8 node scripts/esbuildWatch.js || true
   ```

   Verificar que apareció `resources/js/{folder}/{camelCaseName}.min.js` en el output del build.
   Si no aparece, revisar que el archivo source esté en la ruta correcta (el script busca `*.js` en `{folder}/js/`).

4. **Crear el componente JSX en scriptManager**

   Ruta: `components/private/common/scriptManager/{PascalCaseName}.jsx`

   Patrón estándar (solo `<script src>`):
   ```jsx
   import React from 'react';
   import { useAppContext } from 'fusion:context';

   function {PascalCaseName}() {
       const { deployment, contextPath } = useAppContext();

       return (
           <script
               {tipo-de-carga}
               type="application/javascript"
               src={deployment(
                   `${contextPath}/resources/js/{folder}/{camelCaseName}.min.js`
               )}
           />
       );
   }

   export default {PascalCaseName};
   ```

   Si el script requiere tags adicionales (ej: `<link rel="preconnect">`) o necesita correr **sin `defer`** (scripts críticos de head como VWO), ajustar el componente según lo indicado por el usuario. En ese caso envolverlo en un Fragment `<>...</>`.

5. **Registrar en scriptsHelper.js**

   Archivo: `components/private/LN/common/utils/scriptsHelper.js`

   Usar AskUserQuestion para preguntar dónde quiere agregar el import (¿al final del bloque, junto a algún script relacionado, etc.?) y respetarlo:
   ```js
   import {PascalCaseName} from '../../../common/scriptManager/{PascalCaseName}';
   ```

   Agregar al array `scriptList` (al final, antes del cierre `]`):
   ```js
   {
       component: { name: '{PascalCaseName}', function: {PascalCaseName} },
       feature: 'none'
   }
   ```

   Si el script solo aplica a ciertas features (no a todas las páginas), cambiar `feature: 'none'` por la feature correspondiente.

6. **Registrar en scriptsConfig.js**

   Archivo: `properties/sites/helperConfigLN/scriptsConfig.js`

   Agregar al objeto exportado:
   ```js
   {PascalCaseName}: { props: {}, location: [{LOCATION}] }
   ```
   Donde `{LOCATION}` es `HEAD`, `BODYTOP`, o `BODYBOTTOM` según corresponda (las constantes ya están definidas al inicio del archivo).

7. **Actualizar tests**

   Archivo: `__tests__/components/private/common/scriptManager/index.test.js`

   Buscar los arrays `toEqual([...])` que listan los nombres de scripts y agregar `'{PascalCaseName}'` en cada uno.
   Hay típicamente 3 arrays:
   - El de `getScriptsToLoad(undefined)` — lista sin features activas
   - El de `getScriptsToLoad(false, renderables)` — lista con features
   - El de `getScriptsToLoad(true, renderables)` — lista con bannersDisabled (incluye `MetaRobots` al final)

   En los tres, agregar `'{PascalCaseName}'` justo antes de `'MetaRobots'` en el tercer array, y al final en los dos primeros.

8. **Verificar**

   ```bash
   npm test -- --testPathPattern="scriptManager"
   ```

   Confirmar que todos los tests pasan. Si algún test falla por el nuevo nombre, revisar el paso 7.

**Guardrails**
- **NUNCA** modificar `.fusion/` ni `components/output-types/` sin aprobación
- El source va en `src/statics/` — **no** en `resources/js/` directamente (ese es el output del build)
- La carpeta `LN` es solo para scripts de La Nación; `common` para scripts compartidos entre sites; `FOODIT` para Foodit
- Siempre preguntar al dev el tipo de carga (`defer`, `async`, o bloqueante) — no asumir un default
- Para scripts de Foodit, también registrar en `properties/sites/helperConfigFoodit/scriptConfig.js`
