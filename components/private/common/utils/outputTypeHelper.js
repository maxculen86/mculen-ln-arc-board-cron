import React from 'react';
import getMetaDescriptionForAcum from './getMetaDescriptionForAcum';

export const getSectionOfRequestUri = (requestUri = '') => {
    const [section] = requestUri.split('/').filter(item => item !== '');
    return section || '';
};
export const getTitle = (
    metaValue,
    { longTitle, title: defaultTitle },
    requestUri = '',
    _nodeType = ''
) => {
    if (getSectionOfRequestUri(requestUri) === 'mis-notas') {
        return metaValue || defaultTitle;
    }

    return _nodeType === 'home' ? longTitle : metaValue || defaultTitle;
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

    return metas.map(([name, content]) => {
        return name && content && <meta name={name} content={content} />;
    });
};
