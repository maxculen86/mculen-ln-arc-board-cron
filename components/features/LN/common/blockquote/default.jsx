import React from 'react';
import BlockQuoteUI from '../../../ui/ln/blockQuote/default';
import { WrapperBody } from '../wrapperBody/default';

function BlockQuote({ data }) {
    const { subtype, content_elements: contentElements = [] } = data ?? {};
    const content = contentElements?.[0]?.content;

    if (subtype !== 'blockquote') return null;

    return (
        <WrapperBody className="mb-64">
            <BlockQuoteUI content={content} />
        </WrapperBody>
    );
}

BlockQuote.arcType = 'blockquote';
BlockQuote.isStatic = true;

export default BlockQuote;
