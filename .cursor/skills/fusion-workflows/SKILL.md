---
name: fusion-workflows
description: Ayuda a trabajar en cambios de Arc XP Fusion Engine en este repo combinando convenciones del proyecto, templates de Fusion y workflows de OpenSpec. Se usa cuando la persona pide ayuda con componentes Fusion, layouts, content sources o debugging en el proyecto Contenidos.
---

# Workflows de Fusion para Arc XP Contenidos

Usa este skill siempre que estés ayudando con trabajo relacionado a Fusion Engine en este repositorio (componentes, layouts, content sources, build/debugging o updates chicos de librerías).

## Inicio rápido

Cuando la persona pida ayuda con algo de Fusion:

1. **Identificar el tipo de tarea**
   - ¿Componente o layout nuevo?
   - ¿Cambio en una feature/UI?
   - ¿Trabajo sobre un content/data source?
   - ¿Debug de build/runtime?
   - ¿Update de dependencia/librería?
2. **Determinar el alcance**
   - Tarea rápida (< 30 minutos, un componente/área).
   - Feature más grande, varios componentes o migración.
3. **Elegir el workflow**
   - Tarea rápida → preferir atajos Fusion (`/fusion-*`).
   - Trabajo más grande o cross-cutting → preferir OpenSpec (`/opsx:*`).

## Elegir entre OpenSpec y atajos Fusion

- **OpenSpec (`/opsx:*`)** — para trabajo estructurado de varios pasos:
  - Features nuevas o flujos que cruzan varios componentes/layouts.
  - Migraciones (dependencias, arquitectura, modelos de contenido/datos).
  - Cualquier cosa que requiera documentación, acuerdos o revisión.
- **Atajos Fusion (`/fusion-*`)** — para tareas locales y enfocadas:
  - `/fusion-component` → Componente nuevo o agregado chico a un layout/feature.
  - `/fusion-debug` → Debug de issues concretos de build/runtime.
  - `/fusion-update-libs` → Bump de una librería npm con verificación.

Recomendación por defecto:

- Si la descripción suena a **feature** → proponer `/opsx:new` y explicar por qué.
- Si suena a **cambio chico o quick fix** → proponer el comando `/fusion-*` adecuado.

## Usar las convenciones específicas del proyecto

Respetar siempre las reglas del proyecto descritas en:

- `CLAUDE.md` → Overall index and rules.
- `.claude/context/arc-xp-essentials.md` → Critical Arc XP guardrails.
- `.claude/context/project-conventions.md` → Code style, naming, and directory structure.

Puntos clave:

- No tocar `.fusion/` ni `components/output-types/` salvo que lo pidan explícitamente y con contexto claro de sitio (la-nacion-ar vs foodit).
- Mantener la separación de sitios estricta:
  - `LN-*` / `Api-LN-*` / `LN/` for la-nacion-ar.
  - `Foodit-*` / `foodit-global/` for foodit.
- Usar el patrón consumer/presenter para features, con imports `fusion:consumer` y `fusion:content`.
- Preferir librerías de UI `@ln` de `openspec/specs/common-ui-libs.md` antes de construir componentes nuevos.

## Aprovechar los templates de Fusion

Al implementar tareas relacionadas con Fusion, cargar los templates bajo demanda en vez de copiar mucho contenido a la conversación:

- `.claude/templates/fusion/component-checklist.md`
  - Use when creating or refactoring components to ensure steps are covered (structure, tests, wiring).
- `.claude/templates/fusion/proposal-template.md`
  - Use for proposals/specs where Fusion is a core part of the change.
- `.claude/templates/fusion/content-source.md`
  - Use for content source work (fetch patterns, transforms, schemas, testing).

Workflow:

1. Detect that the task is Fusion-specific.
2. Reference the relevant template(s) explicitly.
3. Read only the necessary templates/files via tools.
4. Apply checklist/proposal sections to the current task.

## Patrón de debugging y verificación

Para cualquier trabajo de Fusion (componente, layout, content source o cambio de dependencia):

1. **Understand the scenario**
   - Which site? (la-nacion-ar vs foodit).
   - Which path(s)? (`components/layouts/`, `components/features/`, `content/`, etc.).
2. **Check for existing patterns**
   - Look for similar components/layouts/content sources to reuse patterns.
   - Consult `openspec/specs/fusion-components.md` and `openspec/specs/build-system.md`.
3. **Make minimal, well-targeted changes**
   - Keep changes focused and explained.
4. **Verify**
   - Suggest or run `npm run build-dev`.
   - Use targeted tests instead of full suite inside the IDE; propose specific test commands.
   - For visual/behavioral changes, describe manual checks the user should perform.

## Ejemplos

- **Usuario**: "Quiero agregar un componente chico para mostrar una lista de tags"
  - Reconocerlo como una feature chica de Fusion.
  - Sugerir `/fusion-component TagsList`.
  - Preguntar sitio, tipo (feature) y dónde se va a usar.
  - Guiar usando `openspec/specs/fusion-components.md` y `component-checklist.md`.

- **Usuario**: "El build de Fusion está fallando con un module not found"
  - Sugerir `/fusion-debug "module not found in webpack build"`.
  - Juntar contexto (cuándo, en qué sitio, qué cambió).
  - Correr diagnósticos enfocados y revisar issues comunes de Arc XP.

- **Usuario**: "Necesito subir una versión menor de @ln/user.client.libs"
  - Sugerir `/fusion-update-libs "@ln/user.client.libs 7.6.0"`.
  - Investigar changes, actualizar `package.json`, correr install + build y proponer una checklist de testing.

