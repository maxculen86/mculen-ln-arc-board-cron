## ADDED Requirements

### Requirement: Output-type foodit.jsx adaptado al bundle MX
El bundle SHALL contener `apps/foodit-mx/components/output-types/foodit.jsx` adaptado del output-type del monolito, reemplazando `deployment()` por `pagebuilderURL()` y cualquier otra referencia específica del monolito. El output-type del monolito SHALL permanecer sin modificaciones.

#### Scenario: Output-type compila en el bundle MX
- **WHEN** webpack compila `apps/foodit-mx/` con solo el output-type presente
- **THEN** el build completa sin errores y el output-type `foodit.jsx` está incluido en el bundle

#### Scenario: Output-type sirve HTTP 200 en local
- **WHEN** Fusion arranca `apps/foodit-mx/` con el output-type y sin layouts
- **THEN** el path `/recetas` responde HTTP 200 con un documento HTML mínimo válido

#### Scenario: Output-type del monolito no modificado
- **WHEN** se compara `components/output-types/foodit.jsx` del monolito antes y después de la migración
- **THEN** el archivo del monolito es idéntico a su estado previo

### Requirement: Componentes acotados por card de scope post-layout
Los features, chains y archivos de `components/private/` incluidos en `apps/foodit-mx/` SHALL estar acotados por la card de scope creada después de migrar los layouts. El universo máximo es 59 archivos de `components/private/` auditados en `docs/migrate-mx/private-components/audit.md`; el scope real se acota por layout en la card.

#### Scenario: Ningún componente fuera de scope
- **WHEN** se audita `apps/foodit-mx/components/`
- **THEN** todos los archivos presentes en `features/`, `chains/` y `private/` están listados en la card de scope del layout correspondiente; no existe ningún archivo copiado sin autorización de scope

#### Scenario: Evaluación copia-vs-lib documentada por archivo
- **WHEN** se revisa cada componente incluido en la card de scope
- **THEN** existe una decisión explícita (comentario en PR o task) indicando si se copia al bundle MX o se extrae a `libs/`

### Requirement: Secuencia de deploy progresivo de componentes
La incorporación de componentes SHALL seguir el orden de deploy progresivo: (1) output-type solo, (2) layouts, (3) features/private por bloques, (4) conexión con PageBuilder y content sources. Cada capa SHALL ser validada en local antes de continuar con la siguiente.

#### Scenario: Checkpoint tras output-type
- **WHEN** se deploya el bundle MX con solo el output-type
- **THEN** hay evidencia de validación local (HTTP 200 confirmado) antes de agregar layouts

#### Scenario: Checkpoint tras layouts
- **WHEN** se agregan ambos layouts al bundle MX
- **THEN** hay evidencia de validación local (render sin errores JS/CSS) antes de agregar features y private components

#### Scenario: Checkpoint tras bloque de componentes
- **WHEN** se agrega un bloque de features y/o archivos de `components/private/`
- **THEN** hay evidencia de validación local (renders coherentes, sin regresiones visuales) antes del siguiente bloque

### Requirement: Originales del monolito no modificados durante copia de componentes
Los archivos de `components/features/`, `components/chains/` y `components/private/` del monolito SHALL leerse solo para copiar; ningún archivo del monolito SHALL modificarse como parte de esta migración.

#### Scenario: Monolito sin cambios post-migración de componentes
- **WHEN** se ejecuta `git diff HEAD -- components/features/ components/chains/ components/private/` en el repo
- **THEN** el diff no muestra modificaciones en los archivos del monolito; los únicos cambios son adiciones en `apps/foodit-mx/`
