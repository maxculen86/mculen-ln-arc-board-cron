import React from 'react';

function Syndication({ type, subtype, syndication, nodeType }) {
    const { search } = syndication || {};

    if (!subtype) return null;
    if (type !== 'story') return null;

    if (nodeType === 'home' || nodeType === 'acumulado') {
        return <meta name="robots" content="max-image-preview:standard" />;
    }

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
