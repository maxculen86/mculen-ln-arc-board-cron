/**
 * Genera la ruta completa para el archivo SVG de iconos de La Nación
 * @param {Object} params
 * @param {'default'|'color'} [params.type='default']
 * @param {string} params.contextPath
 * @param {function(string): string} params.deployment
 * @returns {string}
 */
function generateIconPath({ type = 'default', contextPath, deployment }) {
    const fileName = `foodit-sprite-${type}.svg`;
    const path = `${contextPath}/resources/images/${fileName}`;
    return deployment(path);
}

export default generateIconPath;
