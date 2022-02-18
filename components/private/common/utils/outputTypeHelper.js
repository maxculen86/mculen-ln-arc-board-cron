import getMetaDescriptionForAcum from './getMetaDescriptionForAcum';

export const getTitle = (
    _nodeType = '',
    metaValue,
    { longTitle, title: defaultTitle }
) => {
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
    arcSite
) => {
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
