# UI - Componentes de Interfaz

Este directorio implementa el **patrón de diseño Facade** para encapsular la capa presentacional de los componentes utilizados en los diferentes subproductos del proyecto (**La Nación** y **Foodit**).

## 🎯 Propósito

Los componentes en esta carpeta actúan como una **fachada** que:

- ✨ Encapsula la complejidad de las librerías del Design System 
- 🎨 Proporciona una interfaz simplificada y consistente
- 🔧 Adapta los componentes del DS a las necesidades específicas de cada subproducto
- 📱 Garantiza la compatibilidad y estructura sugerida por ARC para el correcto uso en el bundle para el outputType indicado

## 🏗️ Arquitectura

### Patrón Facade

```
┌─────────────────────────────────────┐
│      ui/[subproducto] (Facade)      │
│  ┌─────────────────────────────┐    │
│  │     Componente Simple       │    │
│  │   (Props personalizadas)    │    │
│  └─────────────────────────────┘    │
│              │                      │
│              ▼                      │
│  ┌─────────────────────────────┐    │
│  │  Design System (@ln/ds-c...)│    │
│  │   (Lógica compleja)         │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Ventajas del patrón implementado:

- **Simplificación**: Interfaz más simple para desarrolladores
- **Consistencia**: Estilo y comportamiento unificado
- **Mantenibilidad**: Cambios centralizados en una sola capa
- **Reutilización**: Componentes específicos para cada subproducto

## 🛠️ Tecnologías y Convenciones

### JSDoc
Dado que no utilizamos TypeScript, empleamos **JSDoc** para:
- 📝 Documentar las props de los componentes en caso de extenderlas
- 🔍 Habilitar IntelliSense en el IDE
- 🎯 Mejorar la experiencia de desarrollo


#### Estructura en componentes simples

**Ejemplo para La Nación (`ui/ln`):**
```javascript
/**
 * @typedef {import('@ln/ds-common-button').ButtonProps} ButtonProps
 */

/**
 * @param {string} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
 * @param {ButtonProps} props - Props default del componente @ln/ds-common-button
 * @returns {React.ReactElement}
 */
```

**Ejemplo para Foodit (`ui/foodit`):**
```javascript
/**
 * @typedef {import('@ln/ds-common-button').ButtonProps} ButtonProps
 */

/**
 * @param {string} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
 * @param {ButtonProps} props - Props default del componente @ln/ds-common-button
 * @returns {React.ReactElement}
 */
```

#### Estructura en componente compound component (utiliza las RootProps)

**Ejemplo para La Nación (`ui/ln`):**
```javascript
/**
 * @typedef {import('@ln/ds-common-mediascroller').MediaScrollerRootProps} MediaScrollerProps
 */

/**
 * @param {boolean} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
 * @param {MediaScrollerProps} props
 * @returns {React.ReactElement}
 */
```

**Ejemplo para Foodit (`ui/foodit`):**
```javascript
/**
 * @typedef {import('@ln/ds-common-mediascroller').MediaScrollerRootProps} MediaScrollerProps
 */

/**
 * @param {boolean} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
 * @param {MediaScrollerProps} props
 * @returns {React.ReactElement}
 */
```

## 📁 Estructura de Archivos

```
ui/
├── README.md
├── ln/                        # Componentes para La Nación
│   ├── button/
│   │   └── default.jsx
│   ├── card/
│   │   └── default.jsx
│   └── mediaScroller/
│       ├── helpers/
│       │   └── getClassNames.js (ejemplo) 
│       └── default.jsx
├── foodit/                    # Componentes para Foodit
│   ├── button/
│   │   └── foodit.jsx
│   ├── card/
│   │   └── foodit.jsx
│   └── mediaScroller/
│       ├── helpers/
│       │   └── getClassNames.js (ejemplo) 
│       └── foodit.jsx
└── ...
```

### Convenciones de nomenclatura:

- **Carpetas de subproducto**: `camelCase` (ej: `ln`, `foodit`)
- **Carpetas de componente**: `camelCase` (ej: `button`, `modalDialog`)
- **Archivos**: `default.jsx` (para compatibilidad con outputType default, garantizamos el export desde este archivo)
- **Componentes a exportar**: `PascalCase` (ej: `Button`, `ModalDialog`)

## 🎯 Alcance y Responsabilidades

### ✅ Este directorio ES responsable de:

- Componentes específicos para cada subproducto (**La Nación** y **Foodit**)
- Implementación del patrón Facade
- Adaptación de componentes del Design System correspondiente
- Compatibilidad con `outputType: default`
- Documentación JSDoc completa

### ❌ Este directorio NO ES responsable de:

- Componentes compartidos entre todos los sitios (usar `/components/shared` en su lugar)
- Lógica de negocio compleja (delegar a containers o hooks)
- Componentes que no pertenezcan a ningún subproducto específico

## 🔧 Cómo contribuir

### Agregando un nuevo componente:

1. **Crear directorio**: `ui/[subproducto]/nombreComponente/` (ej: `ui/ln/button/` o `ui/foodit/button/`)
2. **Crear archivo**: `[outputType].jsx`
3. **Implementar Facade**:

**Para La Nación:**
```javascript
import { Component as CommonComponent } from '@ln/ds-common-component';

/**
 * @typedef {import('@ln/ds-common-component').ComponentProps} ComponentProps
 */
/**
 * @param {string} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
 * @param {ComponentProps} props - Props default del componente @ln/ds-common-component
 * @returns {React.ReactElement}
*/
function Component({ prop1, prop2, ...props }) {
    // Lógica de adaptación aquí
    return <CommonComponent {...props} />;
}

export default Component;
```

**Para Foodit:**
```javascript
import { Component as CommonComponent } from '@ln/ds-common-component';

/**
 * @typedef {import('@ln/ds-common-component').ComponentProps} ComponentProps
 */
/**
 * @param {string} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
 * @param {ComponentProps} props - Props default del componente @ln/ds-common-component
 * @returns {React.ReactElement}
*/
function Component({ prop1, prop2, ...props }) {
    // Lógica de adaptación aquí
    return <CommonComponent {...props} />;
}

export default Component;
```

### Buenas prácticas:

- 📖 **Documentar todas las props** con JSDoc
- 🎨 **Mantener la simplicidad** en la interfaz del componente
- 🧪 **Escribir tests** para los componentes
- 📱 **Verificar compatibilidad** con outputType
- 🔄 **Mantener consistencia** entre subproductos cuando sea posible


> **Nota**: Este directorio implementa componentes específicos para cada subproducto (La Nación y Foodit). Cada subproducto mantiene su propia implementación de componentes UI siguiendo el patrón Facade.
