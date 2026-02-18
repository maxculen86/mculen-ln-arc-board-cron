---
name: /fusion-update-libs
id: fusion-update-libs
category: Arc XP
description: Actualiza una sola librería npm en el proyecto LN Contenidos con verificación y testing estructurados.
---

Actualiza la versión de una librería/dependencia npm con una guía clara de verificación y testing.

**Input**: Nombre de la librería y versión objetivo (ejemplo: `@ln/user.client.libs 7.6.0`).

**Cuándo usar esto vs OpenSpec:**
- ✅ Usar `/fusion-update-libs`: update de una sola librería, bump de minor/patch, librería conocida.
- ⚠️ Usar `/opsx:new`: múltiples librerías, bump de major, breaking changes desconocidos, migración compleja.

**Steps**

1. **Verificar estado actual**

   ```bash
   # Check current version
   grep -A 2 "LIBRARY_NAME" package.json

   # Check if library is in dependencies or devDependencies
   cat package.json | grep -E "(dependencies|devDependencies)" -A 50
   ```

2. **Investigar los cambios**

   Para el rango de versiones entre la actual y la objetivo:

   - Check changelog/releases between current and target versions.
   - Look for breaking changes, deprecations, and new features.
   - Note any migration steps.
   - Use GitHub releases, npm page, or official docs as references.

3. **Identificar áreas de impacto crítico**

   Based on the library:

   - `@ln/user.client.libs` → Login (LN + foodit), token rotation, auth flows.
   - `@ln/ui` or similar UI libs → UI components usage across the app.
   - `react` / `react-dom` → All components and render behavior.
   - `styled-components` or styling libs → Styling and theming.
   - `fusion:*`-related packages → Arc XP integration, content/data sources.
   - Testing libs → Test suite execution and expectations.
   - Build tools → Build process, bundle output.

4. **Actualizar package.json**

   - Edit `package.json` to bump the specified library version.
   - Use the Edit tool to change only the relevant version string.
   - Keep caret/tilde semantics consistent with existing conventions unless the user requests otherwise.

5. **Instalar y verificar**

   ```bash
   npm install
   npm run build-dev
   ```

   - Verificar que no aparezcan nuevos errores/warnings de build que indiquen breaking changes.

6. **Identificar stakeholders (si aplica)**

   - UCL / auth libs → Coordinate with the owner for token rotation and login flows.
   - UI libs → Inform design/UX stakeholders for visual regressions.
   - Arc XP / Fusion libs → Coordinate with Arc XP owners if compatibility questions arise.
   - Security libs → Coordinate with security stakeholders.

7. **Recomendar un plan de testing**

   Proponer una checklist específica y accionable:

   - [ ] Build passes (`npm run build-dev`).
   - [ ] Relevant tests pass (specify which suites or patterns to run).
   - [ ] Manual checks of the most critical flows touched by the library.
   - [ ] Stakeholder validation where appropriate.
   - [ ] No new console errors in dev.

   Preferir tests específicos sobre correr toda la suite desde el IDE; recomendar correr la suite completa en una terminal externa cuando haga falta.

8. **Revisar si hay pasos adicionales**

   - New or changed peer dependencies?
   - Config changes required?
   - Code changes needed for compatibility?
   - New features that should be adopted?

**Guardrails**

- **Solo una librería**: para múltiples librerías o migraciones grandes, sugerir `/opsx:new`.
- **Revisar semver**: bumps de major (x.0.0) requieren más cautela y son buenos candidatos para OpenSpec.
- **No actualizar sin investigar**: revisar siempre changelog o release notes primero.
- **No saltar el install**: hay que actualizar lockfile y node_modules.
- **No asumir compatibilidad hacia atrás**: verificar el comportamiento con al menos un plan mínimo de testing.
- Si el changelog muestra pasos de migración complejos, recomendar usar `/opsx:new` y un cambio OpenSpec en lugar de este comando shortcut.

