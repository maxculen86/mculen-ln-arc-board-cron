import { createStrictContext } from '@ln/ds-core-hooks';

/**
 * @typedef {Object} HeaderContextValue
 * @property {string} userType - Tipo de usuario
 * @property {string} initials - Iniciales del usuario
 * @property {string} userEmail - Email del usuario
 * @property {boolean} isSubscribed - Si el usuario está suscrito
 * @property {string} userName - Nombre del usuario
 * @property {string} userLastName - Apellido del usuario
 * @property {string} position - Posición del header
 * @property {string} appearance - Apariencia del header
 * @property {boolean} isHome - Si la página es la home, para evitar varias validaciones en distintos componentes del header

/**
 * Context para el Header que provee información del usuario y configuración
 * @type {[React.Provider<HeaderContextValue>, () => HeaderContextValue]}
 */
export const [HeaderProvider, useHeaderContext] = createStrictContext('Header');
