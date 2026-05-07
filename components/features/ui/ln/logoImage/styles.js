/**
 * Dimensiones portadas desde _com-logo.scss proximamente deprecado.
 * Cada entrada soporta los mismos tamaños que existían en el SCSS.
 * `w` puede ser undefined: el SVG hereda su ancho natural.
 *
 * @typedef {{ w?: number, h?: number }} LogoDimensions
 * @typedef {{ xs?: LogoDimensions, sm?: LogoDimensions, md?: LogoDimensions }} LogoSizeMap
 */

/** @type {Record<string, LogoSizeMap>} */
export const LOGO_SIZES = {
    'ln-logo': { xs: { w: 34, h: 16 }, sm: { w: 44, h: 21 } },
    'la-nacion': {
        xs: { w: 164, h: 16 },
        sm: { w: 215, h: 21 },
        md: { w: 306, h: 30 }
    },
    gda: { xs: { w: 36, h: 20 }, sm: { w: 36, h: 20 } },
    'data-fiscal': { xs: { w: 28, h: 38 }, sm: { w: 28, h: 38 } },
    brando: { xs: { w: 83, h: 17 }, sm: { w: 107, h: 22 } },
    hola: { xs: { w: 45, h: 22 }, sm: { w: 62, h: 30 } },
    jardin: { xs: { w: 62, h: 20 }, sm: { w: 88, h: 28 } },
    living: { xs: { w: 60, h: 20 }, sm: { w: 84, h: 28 } },
    lugares: { xs: { w: 86, h: 16 }, sm: { w: 118, h: 22 } },
    rolling: { xs: { w: 129, h: 23 }, sm: { w: 168, h: 30 } },
    ohlala: { xs: { w: 64, h: 18 }, sm: { w: 106, h: 30 } },
    'ln-mas': { xs: { w: 34, h: 20 }, sm: { w: 44, h: 26 } },
    negocios: { xs: { w: 95, h: 30 }, sm: { w: 127, h: 40 } },
    bbc: { xs: { w: 128, h: 20 }, sm: { w: 167, h: 26 } },
    propiedades: { xs: { w: 166, h: 22 }, sm: { w: 241, h: 32 } },
    canchallena: { xs: { w: 143, h: 30 }, sm: { w: 239, h: 50 } },
    salud: { xs: { w: 129, h: 22 }, sm: { w: 187, h: 32 } },
    autos: { xs: { w: 141, h: 20 }, sm: { w: 205, h: 28 } },
    campo: { xs: { w: 121, h: 22 }, sm: { w: 176, h: 32 } },
    deportes: { xs: { w: 94, h: 22 }, sm: { w: 128, h: 30 } },
    futuria: { xs: { h: 22 }, sm: { h: 48 } },
    'que-sale': { xs: { h: 22 }, sm: { h: 48 } },
    'ln-radio': { xs: { h: 32 }, sm: { h: 48 } },
    'a-fondo-logo': { sm: { h: 35 } },
    'android-store': { xs: { w: 120, h: 35 }, sm: { w: 120, h: 35 } },
    'ios-store': { xs: { w: 120, h: 35 }, sm: { w: 120, h: 35 } }
};

const LOGO_NAME_ALIASES = {
    'lnmas-blanco': 'ln-mas'
};

/**
 * Normaliza el logoName para el lookup:
 * - Resuelve aliases explícitos (ej: lnmas-blanco → ln-mas)
 * - Strip del sufijo -blanco (ej: hola-blanco → hola)
 * @param {string} logoName
 * @returns {string}
 */
const normalizeLogoName = (logoName = '') =>
    LOGO_NAME_ALIASES[logoName] ?? logoName.replace(/-blanco$/, '');

/**
 * Retorna las dimensiones para un logo y tamaño dados.
 * @param {string} logoName
 * @param {'xs'|'sm'|'md'} size
 * @returns {LogoDimensions}
 */
export const getLogoSize = (logoName, size = 'sm') =>
    LOGO_SIZES[normalizeLogoName(logoName)]?.[size] ?? {};
