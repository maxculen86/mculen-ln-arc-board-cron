import React from 'react';

const Subtitle = ({ data }) => {
    const tagConfigByLevel = {
        1: { tag: 'h3', className: 'text-28 text-32_md text-36_lg' },
        2: { tag: 'h3', className: 'text-24 text-28_md text-32_lg' },
        3: { tag: 'h3', className: 'text-24' },
        4: { tag: 'h4', className: 'text-24' },
        5: { tag: 'h5', className: 'text-24' },
        6: { tag: 'h6', className: 'text-24' },
        default: { tag: 'h2', className: 'text-24 text-28_md text-32_lg' }
    };
    const { level, content } = data;
    const _props = tagConfigByLevel[level] || tagConfigByLevel.default;

    const Component = _props.tag;

    return (
        <Component
            className={'-mb-8 prumo prumo-light ' + _props.className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default Subtitle;
