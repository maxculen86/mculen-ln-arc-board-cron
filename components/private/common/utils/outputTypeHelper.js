import React from 'react';
import getMetaDescriptionForAcum from './getMetaDescriptionForAcum';
import { RECETA } from './subtypes/subtypeHelper';
import uncapitalizeFirstLetter from './uncapitalizeFirstLetter';
import get from './get';

export const getSectionOfRequestUri = (requestUri = '') => {
    const [section] = requestUri
        ? requestUri.split('/').filter(item => item !== '')
        : [];
    return section || '';
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
    ottTitle,
    nodeType,
    siteProps,
    arcSite,
    subtype,
    metaTitle
}) => {
    const { longTitle, title: defaultTitle } = siteProps;
    if (arcSite === 'ott') {
        return get(
            nodeTypeTitles,
            arcSite,
            nodeTypeTitles.default
        )({ ottTitle });
    }
    if (subtype === RECETA) {
        return nodeTypeTitles.receta({ basicTitle, shortTitle, metaTitle });
    }
    return get(
        nodeTypeTitles,
        nodeType,
        nodeTypeTitles.default
    )({ PBTitle, shortTitle, ottTitle, longTitle, defaultTitle, metaTitle });
};

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
    nota: ({ PBTitle, shortTitle, metaTitle }) => {
        if (metaTitle) return `${metaTitle} - LA NACION`;
        return shortTitle ? `${shortTitle} - LA NACION` : PBTitle;
    },
    ott: ({ ottTitle }) => ottTitle,
    home: ({ PBTitle, longTitle, defaultTitle }) => {
        return longTitle || PBTitle || defaultTitle;
    },
    default: ({ PBTitle, defaultTitle }) => {
        return PBTitle || defaultTitle;
    }
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
    requestUri
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

    return defaultDescription;
};

export const metasFromSiteServices = (metaTags = {}) => {
    const metas =
        metaTags && !Array.isArray(metaTags) && Object.entries(metaTags);

    if (!metas || metas.length === 0) return <></>;

    return (
        <>
            {metas.map(([name, content]) => {
                return (
                    name && content && <meta name={name} content={content} />
                );
            })}
        </>
    );
};

export const addMetaNoIndexNoFollow = ({
    outputType = 'default',
    requestUri,
    layout,
    siteProperties
}) => {
    return get(siteProperties, 'layoutsName.HomeLN10', 'LN10-Home_Main') ===
        layout ||
        ['home-vivo', 'home-temas'].includes(
            getSectionOfRequestUri(requestUri)
        ) ||
        ['opta', 'widgets'].includes(outputType) ? (
        <meta name="robots" content="noindex, nofollow" />
    ) : (
        <></>
    );
};
