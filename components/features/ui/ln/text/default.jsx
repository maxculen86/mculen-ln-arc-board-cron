import React from 'react';

function TextUI({
    content = '',
    size = '--s',
    capital = '',
    classCondition = ''
} = {}) {
    if (!content) return null;
    // TODO front: revisar y ajustar estilos
    return (
        <p
            className={`com-paragraph ${classCondition} ${capital} ${size}`}
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
}

export default TextUI;
