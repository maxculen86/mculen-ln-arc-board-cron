/**
 * Normaliza un id de contenido: devuelve el valor sin espacios, o falsy si
 * viene vacío/whitespace.
 *
 * Extraído de `LN-10/article/common/_helper-WebApi` — Foodit solo usaba esta
 * función de las 306 líneas de ese archivo (maquinaria de artículos LN-10),
 * que arrastraba getChainPosition/LN10_Caja_Segmentada/getStreams sin uso.
 */
export const checkForId = idValue => idValue && idValue.trim();
