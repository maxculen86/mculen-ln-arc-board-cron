import { SITE_LANACION, LANACIONAR_URLASSETS } from 'fusion:environment';
import trimIfNotEmpty from './trimIfNotEmpty';
/**
 * helper para obtener el url de los embebidos para JSON APPS
 * @param {string} attr
 * @param {string} nodo
 */

export function getLinkDomain(url) {
    if (url && url.includes(LANACIONAR_URLASSETS))
        return url.replace(LANACIONAR_URLASSETS, SITE_LANACION);

    return trimIfNotEmpty(url);
}

export default function getEmbedHref(attr, nodo) {
    const hrefRegex = new RegExp(`${attr}="([^"]+)"|${attr}='([^']+)'`);
    const attrs = hrefRegex.exec(nodo);

    if (!attrs) return null;

    return getLinkDomain(attrs[1]);
}
