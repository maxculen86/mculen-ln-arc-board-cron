/**
 * Elimina los espacios en blanco de los extremos de una cadena si no está vacía.
 *
 * @param {string|null} value - La cadena a procesar. Puede ser `null` o una cadena vacía.
 * @returns {string|null} La cadena sin espacios en blanco en los extremos, o el valor original si es `null`, vacío o no es una cadena.
 */
const trimIfNotEmpty = value => {
    return typeof value === 'string' ? value.trim() : value;
};

export default trimIfNotEmpty;
