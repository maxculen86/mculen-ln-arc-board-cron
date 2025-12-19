import React from 'react';
import ComParagraph from '../../../common/com-paragraph';

const isLetter = (text = '') => text.match(/^[A-Za-z]/);

function Parrafo(props) {
    const {
        data = {},
        capital = false,
        size = '--s',
        classCondition = ''
    } = props;
    const content = data.content || '';

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (content === '<br/>') return <></>;

    return (
        <ComParagraph
            capital={capital && isLetter(content) ? `--capital` : ''}
            classCondition={classCondition}
            size={size}
            content={content}
        />
    );
}

Parrafo.arcType = 'text';
Parrafo.isStatic = true;

export default Parrafo;
