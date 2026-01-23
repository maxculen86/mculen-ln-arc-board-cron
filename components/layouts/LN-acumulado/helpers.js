export const CLASS_ACU_REVISTA = '';

export const revistas = [
    'ohlala',
    'lugares',
    'hola',
    'living',
    'brando',
    'jardin',
    'rolling-stone'
];

export const SECTIONS_URI_MAP = {
    '/videos': 'videos',
    '/autos': 'autos',
    '/deportes': 'deportes',
    '/economia': 'economia',
    '/economia/campo': 'campo',
    '/economia/IA': 'futuria',
    '/juegos': 'juegos',
    '/mis-notas': 'mis-notas',
    '/opinion': 'opinion',
    '/propiedades': 'propiedades',
    '/que-sale': 'que-sale',
    '/salud': 'salud'
};

export function getSectionClassName(requestUri = '') {
    const sectionsBySpecificity = Object.keys(SECTIONS_URI_MAP).sort((a, b) => {
        const segmentsA = a.split('/').length;
        const segmentsB = b.split('/').length;
        return segmentsB - segmentsA;
    });

    const matchedSection = sectionsBySpecificity.find(section =>
        requestUri?.startsWith(section)
    );

    return matchedSection ? SECTIONS_URI_MAP[matchedSection] : '';
}
