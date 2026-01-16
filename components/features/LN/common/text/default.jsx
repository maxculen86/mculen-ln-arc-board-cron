import React from 'react';
import TextUI from '../../../ui/ln/text/default';

const isLetter = (text = '') => text.match(/^[A-Za-z]/);

function Text({
    data = {},
    capital = false,
    size = '--s',
    classCondition = ''
} = {}) {
    const { content = '' } = data;

    if (content === '<br/>') return null;
    return (
        <TextUI
            content={content}
            size={size}
            classCondition={classCondition}
            capital={capital && isLetter(content) ? '--capital' : ''}
        />
    );
}

Text.arcType = 'text';
Text.isStatic = true;

export default Text;
