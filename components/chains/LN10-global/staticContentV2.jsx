import React from 'react';
import Static from 'fusion:static';

const StaticContentV2 = ({ children, Tag = 'div', ...attrs }) => {
    const { className = 'hidden', id } = attrs;

    return (
        <Static id={id} htmlOnly>
            <Tag className={className} {...attrs}>
                {children}
            </Tag>
        </Static>
    );
};

export default StaticContentV2;
