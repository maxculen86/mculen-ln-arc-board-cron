import React from 'react';
import parse from 'html-react-parser';

const OpeningRawHTML = ({
    contentElements = [],
    layoutName = 'LN-nota-html-libre'
}) => {
    // TODO: Repensar donde poner 'LN-nota-html-libre' para que no quede hardcore
    // Se sube rapido por ser hotfix
    const templateAllowed = 'LN-nota-html-libre' === layoutName;
    const rawHTMLS = contentElements.filter(
        (contentElement = {}) => contentElement.type === 'raw_html'
    );

    const opening = rawHTMLS.length > 1 && rawHTMLS[0].content;

    return opening && templateAllowed && <>{parse(opening)}</>;
};

export default OpeningRawHTML;
