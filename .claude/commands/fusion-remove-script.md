---
name: "Fusion: Remove Static Script"
description: Elimina o desregistra un script estático del pipeline ScriptManager (scriptsHelper + scriptsConfig + JSX + opcionalmente source y .min.js)
category: Arc XP
tags: [fusion, script, arc-xp, scriptmanager, remove]
---

Elimina un script estático del pipeline del ScriptManager, con verificación de referencias previa a cualquier acción destructiva.

**Flujo inverso**:
```
scriptsHelper.js + scriptsConfig.js
        ↓ desregistrar
components/private/common/scriptManager/{Name}.jsx
        ↓ eliminar componente
[opcional] resources/js/{folder}/{name}.min.js
        ↓ eliminar build
[opcional] src/statics/{folder}/js/{name}.js
        ↓ eliminar source
```

**Steps**

1. **Recopilar información**

   Usar AskUserQuestion para preguntar:
   - **Nombre del script** a eliminar (PascalCase — ej: `HotjarScript`)
   - **Modo de eliminación**:
     - *Limpieza completa*: elimina JSX, source en `src/statics/`, `.min.js` en `resources/js/`, y desregistra
     - *Solo desregistrar*: elimina solo el JSX y las entradas en `scriptsHelper` + `scriptsConfig` — el source y `.min.js` quedan como backup

2. **Safety check — buscar referencias**

   Antes de tocar cualquier archivo, correr tres búsquedas en paralelo:

   ```bash
   # Referencias en componentes y propiedades
   grep -rn "{PascalCaseName}\|{camelCaseName}.min.js" \
     components/ properties/ \
     --include="*.js" --include="*.jsx" \
     | grep -v "node_modules" | grep -v ".fusion"

   # Referencias en tests (incluyendo snapshots)
   grep -rn "{PascalCaseName}\|{camelCaseName}" \
     __tests__/ \
     --include="*.js" --include="*.jsx" --include="*.snap"

   # Test file dedicado al componente
   find __tests__ -name "{PascalCaseName}*" -o -name "{camelCaseName}*"
   ```

   Mostrar los resultados al dev y pedir confirmación antes de continuar.

   - Referencias esperadas: `scriptsHelper.js`, `scriptsConfig.js`, el JSX propio, y las entradas en `index.test.js`
   - Si hay un **test file dedicado** (`{PascalCaseName}.test.jsx`), eliminarlo también
   - Si hay **snapshots** que lo referencian, eliminarlos o actualizarlos
   - Si hay referencias inesperadas fuera de los archivos anteriores, advertirlo y no proceder sin confirmación

3. **Desregistrar de scriptsHelper.js**

   Archivo: `components/private/LN/common/utils/scriptsHelper.js`

   Eliminar el import:
   ```js
   import {PascalCaseName} from '../../../common/scriptManager/{PascalCaseName}';
   ```

   Eliminar la entrada del `scriptList`:
   ```js
   {
       component: { name: '{PascalCaseName}', function: {PascalCaseName} },
       feature: 'none'
   },
   ```

4. **Desregistrar de scriptsConfig.js**

   Archivo: `properties/sites/helperConfigLN/scriptsConfig.js`

   Eliminar la entrada:
   ```js
   {PascalCaseName}: { props: {}, location: [...] },
   ```

   Verificar también si existe en `properties/sites/helperConfigFoodit/scriptConfig.js` y eliminarlo si está.

5. **Eliminar el componente JSX**

   ```bash
   rm components/private/common/scriptManager/{PascalCaseName}.jsx
   ```

6. **Si el modo es limpieza completa — eliminar source y build**

   Primero identificar la carpeta (`LN`, `common`, o `FOODIT`) buscando el archivo:
   ```bash
   find src/statics -name "{camelCaseName}.js"
   find resources/js -name "{camelCaseName}.min.js"
   ```

   Luego eliminar:
   ```bash
   rm src/statics/{folder}/js/{camelCaseName}.js
   rm resources/js/{folder}/{camelCaseName}.min.js
   ```

7. **Limpiar tests**

   - En `__tests__/components/private/common/scriptManager/index.test.js`: eliminar `'{PascalCaseName}'` de todos los arrays `toEqual([...])` donde aparezca (típicamente 3 arrays)
   - Si el safety check encontró un **test file dedicado** al componente, eliminarlo
   - Si el safety check encontró **snapshots** con el nombre, correr `npm test -- -u` para actualizarlos o eliminarlos manualmente si el test desaparece

8. **Verificar**

   ```bash
   npm test -- --testPathPattern="scriptManager"
   ```

   Confirmar que todos los tests pasan. Si alguno falla, revisar que no quedó ninguna referencia al nombre eliminado.

**Guardrails**
- **Nunca eliminar sin mostrar el safety check primero** — el dev debe confirmar antes de cualquier acción destructiva
- Si el grep encuentra referencias fuera de `scriptsHelper.js` y `scriptsConfig.js`, detener y advertir — puede haber usos directos del `.min.js` o del componente en otros lugares
- Verificar siempre Foodit config además de LN — el script puede estar registrado en ambos sites
- Si el dev elige "solo desregistrar", mencionar explícitamente que el source y `.min.js` quedan huérfanos en el repo — sugerir un seguimiento posterior
