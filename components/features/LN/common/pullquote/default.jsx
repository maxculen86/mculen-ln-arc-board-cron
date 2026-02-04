import React from 'react';
import PullQuoteUI from '../../../ui/ln/pullQuote/default';

function PullQuote({ data = {}, className }) {
    const { citation = {}, content_elements: contentElements = [] } = data;
    const author = citation?.content ?? '';
    const content = contentElements?.[0]?.content;

    return (
        <PullQuoteUI content={content} author={author} className={className} />
    );
}

PullQuote.arcType = 'pullquote';
PullQuote.isStatic = true;

export default PullQuote;
