import React from 'react';
import getMetaDescriptionForAcum from './getMetaDescriptionForAcum';
import { AGENCIA, LIVEBLOG_EDITORIAL, RECETA } from './subtypes/subtypeHelper';
import uncapitalizeFirstLetter from './uncapitalizeFirstLetter';
import get from './get';
import { getEconomicIndicesMetaData } from '../../../../content/sources/utils/servicesSource/economicIndices/_helpers';

export const getSectionOfRequestUri = (requestUri = '') => {
    const [section] = requestUri
        ? requestUri.split('/').filter(item => item !== '')
        : [];
    return section || '';
};
// TODO: Revisar con producto todas las reglas de los titles y eliminar las que no son necesarias
const nodeTypeTitles = {
    receta: ({ basicTitle, shortTitle, metaTitle }) => {
        if (metaTitle)
            return `Receta de ${uncapitalizeFirstLetter(
                metaTitle
            )} - LA NACION`;

        return `Receta de ${
            shortTitle
                ? uncapitalizeFirstLetter(shortTitle)
                : uncapitalizeFirstLetter(basicTitle)
        } - LA NACION`;
    },
    nota: ({ PBTitle, shortTitle, metaTitle, subtype }) => {
        if (subtype === LIVEBLOG_EDITORIAL) {
            return PBTitle;
        }
        if (metaTitle) return `${metaTitle} - LA NACION`;
        return shortTitle ? `${shortTitle} - LA NACION` : PBTitle;
    },
    home: ({ PBTitle, longTitle, defaultTitle }) =>
        longTitle || PBTitle || defaultTitle,
    default: ({ PBTitle, defaultTitle }) => PBTitle || defaultTitle
};

export const getTitle = ({
    title,
    basicTitle,
    mobileTitle,
    properties = {},
    uri,
    nodeType,
    subtype
}) => {
    const { longTitle, title: defaultTitle } = properties;
    if (getSectionOfRequestUri(uri) === 'mis-notas') {
        return title || defaultTitle;
    }
    if (subtype === RECETA) {
        return nodeTypeTitles.receta({ basicTitle, shortTitle: mobileTitle });
    }
    return nodeType === 'home' ? longTitle : title || defaultTitle;
};

export const getTagTitle = ({
    PBTitle,
    basicTitle,
    shortTitle,
    nodeType,
    siteProps,
    subtype,
    metaTitle
}) => {
    const { longTitle, title: defaultTitle } = siteProps;
    if (subtype === RECETA) {
        return nodeTypeTitles.receta({ basicTitle, shortTitle, metaTitle });
    }

    return get(
        nodeTypeTitles,
        nodeType,
        nodeTypeTitles.default
    )({
        PBTitle,
        shortTitle,
        longTitle,
        defaultTitle,
        metaTitle,
        subtype
    });
};

export const getMetaDescriptionDefault = (
    metaValue,
    layout,
    defaultDescription,
    _nodeType,
    _id,
    Payload,
    nodeType,
    name,
    arcSite,
    requestUri,
    globalContent
) => {
    if (getSectionOfRequestUri(requestUri) === 'mis-notas') {
        return metaValue ? `${metaValue}` : defaultDescription;
    }

    if (_nodeType === 'acumulado') {
        return (
            getMetaDescriptionForAcum(
                metaValue,
                _id,
                Payload,
                nodeType,
                name,
                arcSite,
                layout
            ) || ''
        );
    }

    if (globalContent?.serviceType === 'detalle-indices' && metaValue) {
        return metaValue;
    }

    const isEconomiaIndicesHome = requestUri?.startsWith('/economia/indices');
    if (isEconomiaIndicesHome) {
        return getEconomicIndicesMetaData('default').description;
    }

    return defaultDescription;
};

export const isUSALangHtml = (sectionId, canonicalUrl = '') =>
    sectionId === '/estados-unidos' || canonicalUrl.includes('/estados-unidos');

export const metasFromSiteServices = (metaTags = {}) => {
    const metas =
        metaTags && !Array.isArray(metaTags) && Object.entries(metaTags);

    if (!metas || metas.length === 0) return null;

    return (
        <>
            {metas.map(
                ([name, content]) =>
                    name && content && <meta name={name} content={content} />
            )}
        </>
    );
};

export const addMetaNoIndexNoFollow = ({
    outputType = 'default',
    requestUri,
    subtype,
    distributorName = ''
}) => {
    const section = getSectionOfRequestUri(requestUri);
    const blockedSections = [
        'home-vivo',
        'home-temas',
        'cajaafondo',
        'home-webstories',
        'home-juegos',
        'preview-arc',
        'home-content',
        'carrusel-home'
    ];
    const blockedOutputTypes = ['opta', 'widgets'];
    const blockedSubtypes = [AGENCIA];

    const showRobotsMeta =
        blockedSubtypes.includes(subtype) ||
        blockedSections.includes(section) ||
        blockedOutputTypes.includes(outputType);
    const normalizedUri = requestUri?.toLowerCase?.() || '';
    const showGooglebotMeta =
        distributorName === 'EL PAIS' ||
        normalizedUri.includes('/distributor/el-pais');

    if (showRobotsMeta) {
        return <meta name="robots" content="noindex, nofollow" />;
    }

    if (showGooglebotMeta) {
        return <meta name="googlebot" content="noindex" />;
    }

    return null;
};
