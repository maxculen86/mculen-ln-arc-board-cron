import React from 'react';

function Syndication({ type, subtype, syndication, nodeType }) {
    const { search } = syndication || {};

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
