import React from 'react';

function Syndication({
    type,
    subtype,
    syndication,
    arcSite,
    outputType,
    nodeType
}) {
    const { search } = syndication || {};

    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return null;
    if (outputType !== 'default') return null;

    if (nodeType === 'home' || nodeType === 'acumulado') {
        return <meta name="robots" content="max-image-preview:standard" />;
    }

    if (type !== 'story') return null;

    const shouldNoIndex =
        subtype !== '7' && syndication !== undefined && !search;

    return (
        <meta
            name="robots"
            content={
                shouldNoIndex
                    ? 'noindex, follow, max-image-preview:large'
                    : 'max-image-preview:large'
            }
        />
    );
}

export default Syndication;
