import React from 'react';
import getMetaDescriptionForAcum from './getMetaDescriptionForAcum';
import get from './get';

export const getSectionOfRequestUri = (requestUri = '') => {
    const [section] = requestUri.split('/').filter(item => item !== '');
    return section || '';
};
export const getTitle = ({ title, properties = {}, uri, nodeType }) => {
    const { longTitle, title: defaultTitle } = properties;
    if (getSectionOfRequestUri(uri) === 'mis-notas') {
        return title || defaultTitle;
    }

    return nodeType === 'home' ? longTitle : title || defaultTitle;
};

export const getTagTitle = ({
    basicTitle,
    shortTitle,
    ottTitle,
    nodeType,
    siteProps,
    arcSite
}) => {
    const { longTitle, title: defaultTitle } = siteProps;
    if (arcSite === 'ott')
        return get(
            nodeTypeTitles,
            arcSite,
            nodeTypeTitles.default
        )({ ottTitle });
    return get(
        nodeTypeTitles,
        nodeType,
        nodeTypeTitles.default
    )({ basicTitle, shortTitle, ottTitle, longTitle, defaultTitle });
};

const nodeTypeTitles = {
    nota: ({ basicTitle, shortTitle }) =>
        shortTitle ? `${shortTitle} - LA NACION` : basicTitle,
    ott: ({ ottTitle }) => ottTitle,
    home: ({ basicTitle, longTitle, defaultTitle }) => {
        return longTitle || basicTitle || defaultTitle;
    },
    default: ({ basicTitle, defaultTitle }) => {
        return basicTitle || defaultTitle;
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
