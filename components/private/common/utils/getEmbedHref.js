/**
 * helper para obtener el url de los embebidos para JSON APPS
 * @param {string} attr
 * @param {string} nodo
 */

export default function getEmbedHref(attr, nodo) {
    const hrefRegex = new RegExp(`${attr}="([^"]+)"`);
    const attrs = hrefRegex.exec(nodo);

    if (!attrs) return null;

    return attrs[1];
}
