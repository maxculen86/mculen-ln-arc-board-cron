## ADDED Requirements

### Requirement: 10 content sources de Foodit migrados al bundle MX

El bundle SHALL incluir exactamente los 10 content sources de Foodit requeridos para `/recetas`, según el listado en `docs/migrate-mx/content-sources/audit.md`. Los content sources SHALL copiarse a `apps/foodit-mx/content/sources/` con sus imports relativos adaptados.

#### Scenario: 10 content sources presentes en el bundle MX

-   **WHEN** se verifica `apps/foodit-mx/content/sources/`
-   **THEN** están presentes exactamente los content sources listados en `docs/migrate-mx/content-sources/audit.md`, ni más ni menos

#### Scenario: Content sources no presentes en scope excluidos del bundle

-   **WHEN** webpack compila `apps/foodit-mx/`
-   **THEN** los content sources del monolito no incluidos en `docs/migrate-mx/content-sources/audit.md` no son empaquetados en el bundle MX

### Requirement: Utils transitivos y filtros de Foodit incluidos

Por cada content source migrado, SHALL analizarse el grafo de imports transitivos. Todos los utils y filtros de Foodit necesarios para que los sources funcionen SHALL incluirse en `apps/foodit-mx/content/` (en `filters/` o subdirectorios equivalentes).

#### Scenario: Análisis de imports transitivos por content source

-   **WHEN** se migra cada uno de los 10 content sources
-   **THEN** existe documentación (comentario en PR o task) listando los utils y filtros transitivos identificados para ese source

#### Scenario: Dependencias transitivas no listadas generan task adicional

-   **WHEN** durante la migración se identifica una dependencia transitiva no listada en `docs/migrate-mx/content-sources/audit.md`
-   **THEN** se levanta una task adicional para auditar y migrar esa dependencia antes de conectar el source a PageBuilder

### Requirement: arc.config.json excluye content sources fuera de scope

El `apps/foodit-mx/arc.config.json` SHALL configurar la exclusión de todos los content sources del monolito no incluidos en el scope de `/recetas`, de modo que el bundle MX no empaquete código innecesario.

#### Scenario: excludeModules configurado en arc.config.json

-   **WHEN** se inspecciona `apps/foodit-mx/arc.config.json`
-   **THEN** la configuración incluye una directiva de exclusión (`excludeModules: "*"` o equivalente) que restringe los content sources incluidos en el bundle

#### Scenario: Build no incluye content sources del monolito fuera de scope

-   **WHEN** se compila el bundle MX y se analiza el output
-   **THEN** los content sources exclusivos del bundle `default` (no relacionados con `/recetas`) no están en el output compilado
