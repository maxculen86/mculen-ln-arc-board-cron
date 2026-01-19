import React from 'react';
import Text from '../text/default';

// TODO para front: realizar ajustes de estilos segun diseño
function BlockQuote({ data }) {
    const { subtype, content_elements: contentElements = [] } = data ?? {};
    const firstElement = contentElements?.[0]?.content;

    if (subtype !== 'blockquote' || !firstElement) return null;

    return (
        <>
            <hr />
            <blockquote>
                <Text data={{ content: firstElement }} />
            </blockquote>
            <hr />
        </>
    );
}

BlockQuote.arcType = 'blockquote';
BlockQuote.isStatic = true;

export default BlockQuote;
