import { SITE_LANACION, LANACIONAR_URLASSETS } from 'fusion:environment';
/**
 * helper para obtener el url de los embebidos para JSON APPS
 * @param {string} attr
 * @param {string} nodo
 */

export function getLinkDomain(url) {
    if (url.includes(LANACIONAR_URLASSETS))
        return url.replace(LANACIONAR_URLASSETS, SITE_LANACION);

    return url;
}

export default function getEmbedHref(attr, nodo) {
    const hrefRegex = new RegExp(`${attr}="([^"]+)"`);
    const attrs = hrefRegex.exec(nodo);

    if (!attrs) return null;

    return getLinkDomain(attrs[1]);
}
