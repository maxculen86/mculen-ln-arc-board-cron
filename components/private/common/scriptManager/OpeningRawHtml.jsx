import React from 'react';
import parse from 'html-react-parser';

const OpeningRawHTML = ({
    contentElements = [],
    layoutsAllowed = [],
    layoutName = 'LN-nota-html-libre'
}) => {
    const templateAllowed = layoutsAllowed.includes(layoutName);
    const rawHTMLS = contentElements.filter(
        (contentElement = {}) => contentElement.type === 'raw_html'
    );

    const opening = rawHTMLS.length > 1 && rawHTMLS[0].content;

    return opening && templateAllowed && <>{parse(opening)}</>;
};

export default OpeningRawHTML;
