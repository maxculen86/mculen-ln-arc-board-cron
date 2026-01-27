import React from 'react';
import Paragraph from '../../../ui/ln/paragraph/default';

function Text({ data = {}, capital = false, className = '' } = {}) {
    const { content = '' } = data;

    if (content === '<br/>') return null;

    return (
        <Paragraph content={content} capital={capital} className={className} />
    );
}

Text.arcType = 'text';
Text.isStatic = true;

export default Text;
