import React from 'react';
import Paragraph from '../../../ui/ln/paragraph/default';
import { WrapperBody } from '../wrapperBody/default';

function Text({ data = {}, capital = false, className = '' } = {}) {
    const { content = '', alignment = '' } = data;

    if (content === '<br/>') return null;

    return (
        <WrapperBody className="mb-16">
            <Paragraph
                content={content}
                capital={capital}
                className={className}
                alignment={alignment}
            />
        </WrapperBody>
    );
}

Text.arcType = 'text';
Text.isStatic = true;

export default Text;
