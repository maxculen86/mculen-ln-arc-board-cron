/* eslint-disable react/no-danger */
import React from 'react';
import '../../../resources/dist/css/ln/components/com-paragraph.css';

function ComParagraph({
    size = '',
    capital = '',
    content,
    classCondition = '',
    // eslint-disable-next-line no-unused-vars
    alignment = ''
}) {
    // TODO Front: aplicar clase de alineado segun alignment ('left' | 'center' | 'right') proveniente de Composer y borrar el eslint-disable de arriba
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
