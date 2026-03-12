/* eslint-disable react/no-danger */
import React from 'react';
import '../../../resources/dist/css/ln/components/com-paragraph.css';

function ComParagraph({
    size = '',
    capital = '',
    content,
    classCondition = ''
}) {
    return (
        <p
            className={`com-paragraph ${classCondition} ${capital} ${size}`}
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
}

export default ComParagraph;
