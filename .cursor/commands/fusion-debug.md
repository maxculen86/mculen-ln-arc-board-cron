---
name: /fusion-debug
id: fusion-debug
category: Arc XP
description: Hace debug de problemas de build y runtime de Fusion en el proyecto LN Contenidos con un enfoque estructurado.
---

Hace debug de problemas de build o runtime en la app de Fusion Engine.

**Input**: Descripción del error o problema.

**Cuándo usar esto vs OpenSpec:**
- ✅ Usar `/fusion-debug`: debugging rápido, investigación de errores, fixes de build.
- ⚠️ Usar `/opsx:explore`: investigación compleja, problemas de arquitectura, muchos unknowns o cuando se espera un cambio grande después.

**Steps**

1. **Revisar si hay un cambio OpenSpec activo**

   ```bash
   openspec list --json 2>/dev/null || echo "No active changes"
   ```

   Si se hace debug dentro del contexto de un cambio activo, mencionarlo en los resúmenes y sugerencias.

2. **Recolectar contexto de la persona**

   Preguntar:
   - ¿Cuándo pasa? (build, runtime, página/ruta específica).
   - Mensaje de error exacto o comportamiento observado.
   - Cambios recientes (archivos, branches, updates de dependencias).
   - **¿Qué sitio?** la-nacion-ar o foodit (afecta dónde mirar).

3. **Leer specs relevantes**

   - `openspec/specs/build-system.md` → Build process, webpack, Fusion integration.
   - `openspec/specs/styling.md` → If CSS/styling-related issues are suspected.

4. **Ejecutar comandos de diagnóstico**

   Usar diagnósticos enfocados en lugar de ejecutar todo a ciegas:

   ```bash
   # Check current build status
   npm run build-dev 2>&1 | head -50

   # Check for common output directories
   ls -la resources/dist/ 2>/dev/null || echo "No dist"
   ls -la .fusion/dist/ 2>/dev/null || echo "No fusion dist"

   # Check site-specific outputs if needed
   ls -la resources/dist/css/ln/ 2>/dev/null
   ls -la resources/dist/css/foodit/ 2>/dev/null
   ```

5. **Revisar problemas comunes de Arc XP**

   Considerar:

   - Missing or incorrect `fusion:*` imports.
   - Invalid or mismatched PropTypes.
   - Circular dependencies between components/modules.
   - Missing content/data source configuration.
   - CSS build errors (e.g. in `src/statics/` or related pipeline).
   - Tailwind or scoping issues (if applicable).
   - Site mixing (LN vs Foodit components or output-types).
   - `@ln` library CSS not copied correctly (may require `npm run ln:copycss` or similar workflow).

6. **Proponer solución**

   En base a los diagnósticos y mensajes de error:

   - Syntax error → Show the file and propose a concrete code fix.
   - Build error → Inspect webpack/Fusion build output and point to likely misconfigurations (without editing webpack config unless explicitly approved).
   - Fusion error → Check component patterns, consumers, and data dependencies.
   - Import error → Verify import paths, `fusion:*` usage, and `.fusion/` contents.
   - CSS error → Inspect `src/statics/`, `@ln` UI libs, and styling spec.
   - Site-specific error → Verify correct output type (`default.jsx` vs `foodit.jsx`) and layout usage.

7. **Verificar el fix**

   ```bash
   # Always verify build first
   npm run build-dev

   # Prefer targeted tests instead of full suite
   # Example mapping:
   #   components/chains/utils/processLayoutItems.js → npm test -- processLayoutItems
   #   content/sources/utils/audioNews/helper.js    → npm test -- audioNews
   ```

   - Si hay múltiples archivos, sugerir tests por área o recomendar correr la suite completa en una terminal externa.

**Guardrails**

- Leer e interpretar siempre los mensajes de error con cuidado; no adivinar cuando hay logs disponibles.
- No modificar la config de webpack ni otras herramientas de build globales sin aprobación explícita.
- No modificar `components/output-types/` salvo que el contexto de sitio y el impacto estén muy claros.
- Comprobar el sitio objetivo (la-nacion-ar vs foodit) antes de sugerir cambios que afecten output-types o layouts.
- Sugerir `npm ci` o reinstalar dependencias si se sospecha corrupción en dependencias.
- Para problemas profundos o de arquitectura, recomendar escalar a `/opsx:explore` y un cambio OpenSpec en lugar de solo fixes ad‑hoc.

