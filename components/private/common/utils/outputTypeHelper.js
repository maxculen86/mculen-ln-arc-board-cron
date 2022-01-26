import getQueryParamValue from './getQueryParamValue';
import getMetaDescriptionForAcum from './getMetaDescriptionForAcum';

export const getTitle = (
    _nodeType = '',
    metaValue,
    layout = '',
    requestUri = '',
    { host, longTitle, title: defaultTitle }
) => {
    const title = _nodeType === 'home' ? longTitle : metaValue || defaultTitle;
    const query =
        host && requestUri
            ? getQueryParamValue('query', `${host}${requestUri}`)
            : null;

    return layout === 'LN-buscador' && query ? `${query}: ${title}` : title;
};

export const getMetaDescriptionDefault = (
    metaValue,
    layout,
    defaultDescription,
    host,
    requestUri,
    _nodeType,
    _id,
    Payload,
    nodeType,
    name,
    arcSite
) => {
    const query =
        host && requestUri
            ? getQueryParamValue('query', `${host}${requestUri}`)
            : null;

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

    return layout === 'LN-buscador' && query && metaValue
        ? metaValue.replace(/[+]/, query)
        : defaultDescription;
};
