import React from 'react';
import htmr from 'htmr';

function OpeningRawHTML({
    contentElements = [],
    layoutName = '',
    allowedLayout = ''
}) {
    const isTemplateAllowed = allowedLayout === layoutName;
    const rawHTMLS = contentElements.filter(
        (contentElement = {}) => contentElement.type === 'raw_html'
    );

    const opening = rawHTMLS.length > 1 && rawHTMLS[0].content;

    return opening && isTemplateAllowed && <>{htmr(opening)}</>;
}

export default OpeningRawHTML;
