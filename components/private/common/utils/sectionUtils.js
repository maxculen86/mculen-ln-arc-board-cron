/* eslint-disable no-underscore-dangle */
import { SITE_LANACION } from 'fusion:environment';
import siteProperties from '../../../../properties/sites/la-nacion-ar';

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
        /^\/(masmusica)(?:\/.+)?/,
        /\/revista-(.\w+[^\W]?)/
    ];

    return regexList.find(regex => {
        const match = sectionId && sectionId.match(regex);
        // Se necesita que match.length > 1 para que traiga grupo $1 y tomar de ahí el nombre del logo
        return match && match.length > 1;
    });
};

const normalizePath = path => (path && path.endsWith('/') ? path : `${path}/`);

export const generatePath = (sectionId, regex, fullMatch, $1) => {
    if (sectionId === '/deportes/canchallena') {
        return normalizePath('https://canchallena.lanacion.com.ar');
    }
    if (sectionId === '/masmusica') {
        return normalizePath('https://masmusica.lanacion.com.ar');
    }
    return normalizePath(
        sectionId &&
            sectionId.replace(
                regex,
                (sectionId.includes('/revista-') && fullMatch) || `/${$1}`
            )
    );
};

const LOGO_NAME_MAP = {
    lnmas: 'ln-mas',
    'economia/campo': 'campo',
    'deportes/canchallena': 'canchallena',
    'economia/IA': 'futuria',
    'que-sale': 'que-sale',
    masmusica: 'ln-radio'
};

const getLogoName = captureGroup => LOGO_NAME_MAP[captureGroup] || captureGroup;

const isExternalPath = path => {
    if (!path) return false;
    return !path.startsWith('/') && !path.startsWith(SITE_LANACION);
};

export const getLogoData = sections => {
    const resp = {};

    sections.find(section => {
        const { _id: sectionId } = section;

        const regex = getRegex(sectionId);
        const match = (regex && sectionId.match(regex)) || [];

        const [fullMatch, $1] = match;
        const logoName = getLogoName($1);
        const path = generatePath(sectionId, regex, fullMatch, $1);
        const isExternal = isExternalPath(path);

        if (logoName && path) {
            Object.assign(resp, { logoName, path, isExternal });
            return true;
        }

        return false;
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
    'ln-radio': 'LN 104.9 + Música',
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
    const { layoutsName = {} } = siteProperties || {};
    const { logoName, path, isExternal } = getLogoData(sections);
    const color = !(
        layout === layoutsName.StoryTelling ||
        layout === layoutsName.StoryTellingV2 ||
        layout === layoutsName.FotoAl100 ||
        (layout === layoutsName.Video && logoName === 'futuria')
    );

    const isBBC = distributorName === 'BBC Mundo';

    const layoutsExcludingLogo = [{ name: layoutsName.Receta }];

    const currentLayoutExcludesLogo = layoutsExcludingLogo.find(
        el => el.name === layout
    );

    if (!sections || !layout || currentLayoutExcludesLogo) return null;

    if (isBBC)
        return {
            logoName: 'bbc',
            path: '/distributor/bbc-mundo/',
            color,
            isExternal
        };

    return (
        (logoName &&
            path && {
                logoName,
                path,
                color,
                isExternal
            }) ||
        null
    );
};

const A_FONDO_SLUG = 'a-fondo';
const A_FONDO_PATH = '/a-fondo';

export const hasAFondoTag = tags =>
    Array.isArray(tags) && tags.some(tag => tag && tag.slug === A_FONDO_SLUG);

export const getAFondoLogo = (tags, layout) => {
    const { layoutsName = {} } = siteProperties || {};
    const validLayouts = [
        layoutsName.StoryTelling,
        layoutsName.StoryTellingV2,
        layoutsName.Cards
    ];

    if (!validLayouts.includes(layout)) return null;
    if (!hasAFondoTag(tags)) return null;

    const isWhiteLogo = layout !== layoutsName.Cards;

    return {
        logoName: 'a-fondo-logo',
        path: A_FONDO_PATH,
        color: !isWhiteLogo,
        isExternal: false
    };
};

export const formatText = (str = '') =>
    str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
