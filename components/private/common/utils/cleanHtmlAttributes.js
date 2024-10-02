/**
 * Elimina los espacios en blanco dentro de los atributos de un string HTML.
 *
 * @param {string} value - El string HTML que contiene los atributos a limpiar.
 * @returns {string|null} El string HTML con los atributos sin espacios en blanco, o el valor original si es `null` o vacío.
 */
const cleanHtmlAttributes = value => {
    return typeof value === 'string' && value !== ''
        ? value.replace(/\s*=\s*"\s*/g, '="').replace(/\s+"/g, '"')
        : value;
};

export default cleanHtmlAttributes;
