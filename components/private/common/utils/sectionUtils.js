/* eslint-disable no-underscore-dangle */

export const getFirstParentSection = section => {
    if (section && section._id) {
        const parents = section._id.split('/').filter(x => x !== '');
        if (!!parents && parents.length > 0) return `/${parents[0]}`;
    }
    return null;
};

/**
 * TODO: Pasar a configurable de site Services
 * TODO: Resolver desde contentSource
 * No harcodear codigo para evitar release
 * @param {string} sectionId
 */

export const getRegex = sectionId => {
    const regexList = [
        /\/(lnmas)/,
        /^\/(propiedades)(?:\/.+)?/,
        /^\/(economia\/campo)(?:\/.+)?/,
        /^\/(salud)(?:\/.+)?/,
        /^\/(autos)(?:\/.+)?/,
        /^\/(canchallena)(?:\/.+)?/,
        /^\/(deportes\/canchallena)(?:\/.+)?/,
        /^\/(economia\/IA)(?:\/.+)?/,
        /^\/(que-sale)(?:\/.+)?/,
        /\/revista-(.\w+[^\W]?)/
    ];

    return regexList.find(regex => {
        const match = sectionId && sectionId.match(regex);
        // Se necesita que match.length > 1 para que traiga grupo $1 y tomar de ahí el nombre del logo
        return match && match.length > 1;
    });
};

export const generatePath = (sectionId, regex, fullMatch, $1) => {
    if (sectionId === '/deportes/canchallena') {
        return 'https://canchallena.lanacion.com.ar';
    }
    return (
        sectionId &&
        sectionId.replace(
            regex,
            (sectionId.includes('/revista-') && fullMatch) || `/${$1}`
        )
    );
};

export const getLogoData = sections => {
    const resp = {};

    sections.find(section => {
        const { _id: sectionId } = section;

        const regex = getRegex(sectionId);
        const match = (regex && sectionId.match(regex)) || [];

        const [fullMatch, $1] = match;
        const logoName =
            ($1 === 'lnmas' && 'ln-mas') ||
            ($1 === 'economia/campo' && 'campo') ||
            ($1 === 'deportes/canchallena' && 'canchallena') ||
            ($1 === 'economia/IA' && 'futuria') ||
            ($1 === 'que-sale' && 'que-sale') ||
            $1;
        const path = generatePath(sectionId, regex, fullMatch, $1);
        return (
            logoName &&
            path &&
            Object.assign(resp, {
                logoName,
                path
            })
        );
    });

    return resp;
};

export const dictionaryAlt = {
    hola: 'Revista Hola',
    jardin: 'Revista Jardin',
    brando: 'Revista Brando',
    living: 'Revista Living',
    lugares: 'Revista Lugares',
    rolling: 'Revista Rolling Stone',
    ohlala: 'Revista Ohlalá',
    futuria: 'Futuria',
    'que-sale': 'Qué Sale',
    'hola-blanco': 'Revista Hola',
    'jardin-blanco': 'Revista Jardin',
    'brando-blanco': 'Revista Brando',
    'living-blanco': 'Revista Living',
    'lugares-blanco': 'Revista Lugares',
    'rolling-blanco': 'Revista Rolling Stone',
    'ohlala-blanco': 'Revista Ohlalá',
    'que-sale-blanco': 'Qué Sale',
    'futuria-blanco': 'Futuria'
};

export const getSectionLogo = (sections, layout, distributorName) => {
    const color = !(
        layout === 'LN-nota-storytelling' || layout === 'LN-nota-foto-al-100'
    );

    const isBBC = distributorName === 'BBC Mundo';

    const layoutsExcludingLogo = [{ name: 'LN-nota-receta' }];

    const currentLayoutExcludesLogo = layoutsExcludingLogo.find(
        el => el.name === layout
    );

    if (!sections || !layout || currentLayoutExcludesLogo) return null;

    const { logoName, path } = getLogoData(sections);

    if (isBBC)
        return {
            logoName: 'bbc',
            path: '/distributor/bbc-mundo',
            color
        };

    return (
        (logoName &&
            path && {
                logoName,
                path,
                color
            }) ||
        null
    );
};

export const formatText = (str = '') =>
    str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

export function toKebabCase(str = '') {
    if (typeof str !== 'string') return '';
    if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(str)) return str;
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
