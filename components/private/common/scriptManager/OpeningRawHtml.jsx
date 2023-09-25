import React from 'react';
import parse from 'html-react-parser';

const OpeningRawHTML = ({ contentElements = [] }) => {
    const rawHTMLS = contentElements.filter(
        (contentElement = {}) => contentElement.type === 'raw_html'
    );

    const opening = rawHTMLS.length > 1 && rawHTMLS[0].content;

    return opening && <>{parse(opening)}</>;
};

export default OpeningRawHTML;
