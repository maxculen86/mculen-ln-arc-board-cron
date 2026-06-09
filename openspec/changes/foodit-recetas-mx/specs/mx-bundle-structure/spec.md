## ADDED Requirements

### Requirement: Bundle inicializado con fusion init
El directorio `apps/foodit-mx/` SHALL crearse ejecutando `fusion init` dentro de ese path, generando la estructura base de app Fusion. El `package.json` resultante SHALL tener `name: "foodit-mx-1.0.0"` y el `arc.config.json` SHALL registrar `mxId: "foodit-mx"`.

#### Scenario: Directorio generado con estructura Fusion base
- **WHEN** se completa `fusion init` en `apps/foodit-mx/`
- **THEN** existen los directorios `.fusion/`, `components/`, `content/`, `environment/` y el archivo `arc.config.json` con `mxId: "foodit-mx"`

#### Scenario: package.json name correcto
- **WHEN** se lee `apps/foodit-mx/package.json`
- **THEN** el campo `name` es exactamente `"foodit-mx-1.0.0"`

### Requirement: webpack.config.js configurado para site foodit
El `apps/foodit-mx/webpack.config.js` SHALL declarar `sites: ["foodit"]`, incluir los SCSS entries del site Foodit y los plugins equivalentes al bundle de referencia (`~/p/ln/lanacion-arcxp-mx/apps/lanacion-arcxp-mx/webpack.config.js`).

#### Scenario: Sites limitados a foodit
- **WHEN** se inspecciona `apps/foodit-mx/webpack.config.js`
- **THEN** la propiedad `sites` contiene únicamente `["foodit"]`, sin referencias al site `default` ni a otros sites

#### Scenario: SCSS entries del site foodit incluidos
- **WHEN** webpack compila `apps/foodit-mx/`
- **THEN** los archivos SCSS del site foodit son procesados sin errores de módulo no encontrado

### Requirement: Properties y environment configurados para Foodit
El bundle SHALL contener `apps/foodit-mx/properties/sites/foodit.js` con las propiedades del site Foodit y `apps/foodit-mx/environment/index.js` configurado para arrancar Fusion con el site `foodit`.

#### Scenario: Properties del site foodit presentes
- **WHEN** Fusion arranca `apps/foodit-mx/` en entorno local
- **THEN** `getProperties('foodit')` retorna las propiedades definidas en `properties/sites/foodit.js`

#### Scenario: Environment arranca con site foodit
- **WHEN** se inspecciona `apps/foodit-mx/environment/index.js`
- **THEN** el archivo configura el site activo como `foodit` en los parámetros de arranque de Fusion

### Requirement: 54 dependencias @ln/* pinneadas sin rangos
El `apps/foodit-mx/package.json` SHALL declarar exactamente las 54 dependencias `@ln/*` extraídas de `docs/migrate-mx/ln-packages/package-json-snippet.json`, con versiones pinneadas sin rangos semver (`^`, `~`).

#### Scenario: Dependencias @ln/* sin rangos semver
- **WHEN** se audita `apps/foodit-mx/package.json`
- **THEN** ninguna dependencia `@ln/*` tiene prefijo `^` ni `~` en su versión

#### Scenario: Todas las 54 dependencias listadas
- **WHEN** se compara `apps/foodit-mx/package.json` con `docs/migrate-mx/ln-packages/package-json-snippet.json`
- **THEN** todos los paquetes del snippet están presentes en el package.json del bundle MX

### Requirement: Dotfiles requeridos presentes en el bundle
El bundle SHALL incluir `.npmrc` con la configuración de registry para paquetes `@ln/*`, `.nvmrc` especificando Node v22, y `arc.config.json` con los parámetros de configuración del bundle MX.

#### Scenario: .nvmrc especifica Node v22
- **WHEN** se lee `apps/foodit-mx/.nvmrc`
- **THEN** el contenido especifica la versión Node 22 (ej. `22` o `22.x`)

#### Scenario: .npmrc configura registry para @ln/*
- **WHEN** se ejecuta `npm install` en `apps/foodit-mx/`
- **THEN** los paquetes `@ln/*` se resuelven usando el registry declarado en `.npmrc` sin error de módulo no encontrado

#### Scenario: arc.config.json excluye content sources no requeridos
- **WHEN** se inspecciona `apps/foodit-mx/arc.config.json`
- **THEN** la configuración incluye `excludeModules: "*"` o equivalente para que solo los 10 content sources en scope sean incluidos en el bundle
