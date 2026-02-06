import { createStrictContext } from '@ln/ds-core-hooks';

/**
 * @typedef {Object} CardCarruselContextValue
 * @property {string} variant - Variante del card carrusel 'vertical' | 'horizontal'

/**
 * Context para el Card Carrusel que provee información de la variante y configuración
 * @type {[React.Provider<HeaderContextValue>, () => HeaderContextValue]}
 */
export const [CardCarruselProvider, useCardCarruselContext] =
    createStrictContext('CardCarrusel');
