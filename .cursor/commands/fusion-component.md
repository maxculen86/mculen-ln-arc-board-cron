---
name: /fusion-component
id: fusion-component
category: Arc XP
description: Crea un nuevo componente Fusion siguiendo los patrones de Arc XP en el proyecto LN Contenidos.
---

Crea un nuevo componente de Fusion Engine siguiendo las convenciones del proyecto.

**Input**: Nombre del componente y tipo (layout, feature o private).

**Cuándo usar esto vs OpenSpec:**
- ✅ Usar `/fusion-component`: componente simple, agregado rápido, < 30 min de trabajo.
- ⚠️ Usar `/opsx:new`: feature compleja, múltiples componentes, necesita planificación.

**Steps**

1. **Revisar si hay un cambio OpenSpec activo**

   ```bash
   openspec list --json 2>/dev/null || echo "No active changes"
   ```

   Si hay un cambio activo, considerar si este componente debería pertenecer a ese cambio y, de ser así, coordinar con `/opsx:continue` / `/opsx:apply`.

2. **Determinar detalles del componente y sitio**

   Si no vienen dados, preguntar a la persona:
   - **Site:** la-nacion-ar o foodit? (CRÍTICO: afecta nombres y ubicación).
   - Tipo de componente (layout, feature, private).
   - Nombre del componente (PascalCase).
   - Breve descripción de qué hace.

3. **Leer los patrones de componentes**

   Read `openspec/specs/fusion-components.md` for structure patterns and recommended architecture.

4. **Comprobar si existe un componente similar**

   Buscar layouts/features similares para copiar patrones:

   ```bash
   find components/{layouts,features} -type f -name "index.jsx" | head -10
   ```

   Mostrar algunos ejemplos relevantes a la persona.

5. **Confirmar el plan con la persona**

   Confirmar:
   - Sitio: la-nacion-ar o foodit.
   - Path del componente: `components/{type}/{Site-name}/...`.
   - Archivos a crear: `index.jsx`, `{ComponentName}.test.js` (mismo directorio).
   - Patrón a seguir: consumer/presenter o componente simple.

6. **Crear la estructura del componente**

   - Crear el directorio siguiendo el naming del sitio:
     - la-nacion-ar:
       - Layouts: `components/layouts/LN-{name}/`.
       - Features: `components/features/LN/{name}/` or `components/features/LN-{name}/` per conventions.
     - foodit:
       - Layouts: `components/layouts/Foodit-{name}/`.
       - Features: `components/features/foodit-global/{name}/`.
   - Crear `index.jsx` con los imports de Fusion correctos y patrón consumer/presenter cuando aplique.
   - **NO crear styles.scss en el componente** (el styling se maneja aparte; ver spec de estilos).
   - Crear `{ComponentName}.test.js` en el mismo directorio que el componente.
   - Seguir los patrones de `openspec/specs/fusion-components.md` y de componentes existentes.

7. **Próximos pasos**

   Sugerir:
   - Correr `npm run test` (o tests específicos) para verificar el nuevo componente.
   - Conectar el componente en un layout o feature según corresponda.
   - Verificar si las librerías de UI `@ln` ya cubren parte de la UI antes de crear algo desde cero.
   - Para estilos, leer `openspec/specs/styling.md`.

**Guardrails**

- Comprobar primero si hay un cambio OpenSpec activo y evitar crear componentes que deberían vivir dentro de ese cambio sin coordinar.
- Leer siempre `openspec/specs/fusion-components.md` antes de generar boilerplate.
- **NUNCA crear o modificar archivos en `components/output-types/`** con este comando.
- **NUNCA mezclar sitios** (LN vs Foodit) en nombres ni ubicación de directorios.
- Verificar que no exista ya un componente similar antes de crear uno nuevo.
- Seguir el patrón consumer/presenter para features salvo que haya una razón fuerte para no hacerlo.
- **NO crear styles.scss en el directorio del componente**; seguir la spec de estilos.
- Para features o flujos que claramente lleven más de ~30 minutos o toquen varios componentes, sugerir usar `/opsx:new` en lugar de solo este comando.

