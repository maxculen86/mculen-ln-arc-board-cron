import React from 'react';
import Static from 'fusion:static';

//TODO: REFACTORIZAR PARA QUE NO MANDE EL HTMLONLY CUANDO NECESITEMOS EVENTOS.

const StaticContentV2 = ({ children, Tag = 'div', ...attrs }) => {
    const { className = 'hidden', id, htmlOnly = true } = attrs;

    return (
        <Static id={id} htmlOnly={htmlOnly}>
            <Tag className={className} {...attrs}>
                {children}
            </Tag>
        </Static>
    );
};

export default StaticContentV2;
