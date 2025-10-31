# UI-LN - Componentes de Interfaz para La Nación

Este directorio implementa el **patrón de diseño Facade** para encapsular la capa presentacional de los componentes utilizados específicamente en el sitio de **La Nación**.

## 🎯 Propósito

Los componentes en esta carpeta actúan como una **fachada** que:

- ✨ Encapsula la complejidad de las librerías del Design System `@ln`
- 🎨 Proporciona una interfaz simplificada y consistente
- 🔧 Adapta los componentes del DS a las necesidades específicas de La Nación
- 📱 Garantiza la compatibilidad y estructura sugerida por ARC para el correcto uso en el bundle para el `outputType: default`

## 🏗️ Arquitectura

### Patrón Facade

```
┌─────────────────────────────────────┐
│          ui-ln (Facade)             │
│  ┌─────────────────────────────┐    │
│  │     Componente Simple       │    │
│  │   (Props personalizadas)    │    │
│  └─────────────────────────────┘    │
│              │                      │
│              ▼                      │
│  ┌─────────────────────────────┐    │
│  │   @ln Design System         │    │
│  │   (Lógica compleja)         │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Ventajas del patrón implementado:

- **Simplificación**: Interfaz más simple para desarrolladores
- **Consistencia**: Estilo y comportamiento unificado
- **Mantenibilidad**: Cambios centralizados en una sola capa
- **Reutilización**: Componentes específicos para La Nación

## 🛠️ Tecnologías y Convenciones

### JSDoc
Dado que no utilizamos TypeScript, empleamos **JSDoc** para:
- 📝 Documentar las props de los componentes en caso de extenderlas
- 🔍 Habilitar IntelliSense en el IDE
- 🎯 Mejorar la experiencia de desarrollo


#### Estructura en componente simples

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



### PropTypes
Utilizamos **PropTypes** para:
- ✅ Validación de props en tiempo de ejecución
- 📋 Cumplir con las reglas de ESLint
- 🔒 Mantener convenciones del proyecto

```javascript
import { Button as CommonButton } from '@ln/ds-common-button';

...

function Button(props) {
    ...
}
export default Button;
Button.propTypes = CommonButton.propTypes;
```

## 📁 Estructura de Archivos

```
ui-ln/
├── README.md
├── button/
│   └── default.jsx
├── card/
│   └── default.jsx
├── mediasScroller/
│   │── helpers/
│   │   └── getClassNames.js (ejemplo) 
│   └── default.jsx
└── ...
```

### Convenciones de nomenclatura:

- **Carpetas**: `camelCase` (ej: `button`, `modalDialog`)
- **Archivos**: `default.jsx` (para compatibilidad con outputType default, garantizamos el export desde este archivo)
- **Componentes a exportar**: `PascalCase` (ej: `Button`, `ModalDialog`)

## 🎯 Alcance y Responsabilidades

### ✅ Este directorio ES responsable de:

- Componentes específicos para **La Nación** únicamente
- Implementación del patrón Facade
- Adaptación de componentes del Design System `@ln`
- Compatibilidad con `outputType: default`
- Documentación JSDoc completa
- Validación PropTypes

### ❌ Este directorio NO ES responsable de:

- Componentes compartidos entre sitios
- Lógica de negocio compleja (delegar a containers o hooks)
- Componentes de otros sitios (Foodit)

## 🔧 Cómo contribuir

### Agregando un nuevo componente:

1. **Crear directorio**: `ui-ln/nombreComponente/`
2. **Crear archivo**: `default.jsx`
3. **Implementar Facade**:
   ```javascript
   import { Component as CommomComponent } from '@ln/ds-common-component';

    /**
     * @typedef {import('@ln/ds-common-component').ComponentProps} ComponentProps
     */
    /**
     * @param {string} props.extraPropFacade - EJEMPLO - Agregar en caso de querer extender props.
     * @param {ComponentProps} props - Props default del componente @ln/ds-common-component
     * @returns {React.ReactElement}
    */
    function Component = ({ prop1, prop2, ...props }) => {
        // Lógica de adaptación aquí
        return <CommomComponent {...props} />;
    };

    export default Component;
    Component.propTypes = CommomComponent.propTypes;
   ```

### Buenas prácticas:

- 📖 **Documentar todas las props** con JSDoc
- 🔍 **Validar props** con PropTypes
- 🎨 **Mantener la simplicidad** en la interfaz del componente
- 🧪 **Escribir tests** para los componentes
- 📱 **Verificar compatibilidad** con outputType default

## 🔗 Enlaces relacionados

- Sumar documentacion de confluence

---

> **Nota**: Este directorio implementa componentes exclusivamente para La Nación.
