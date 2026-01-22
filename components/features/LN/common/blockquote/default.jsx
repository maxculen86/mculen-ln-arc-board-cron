import React from 'react';
import BlockQuoteUI from '../../../ui/ln/blockQuote/default';

function BlockQuote({ data }) {
    const { subtype, content_elements: contentElements = [] } = data ?? {};
    const content = contentElements?.[0]?.content;

    if (subtype !== 'blockquote') return null;

    return <BlockQuoteUI content={content} />;
}

BlockQuote.arcType = 'blockquote';
BlockQuote.isStatic = true;

export default BlockQuote;
