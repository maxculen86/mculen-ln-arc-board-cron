import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '../image/helpers';

function Subtitle({ data }) {
    const tagConfigByLevel = {
        1: { tag: 'h3', className: 'text-24 text-32_md text-36_lg' },
        2: { tag: 'h3', className: 'text-24 text-28_md text-32_lg' },
        3: { tag: 'h3', className: 'text-24' },
        4: { tag: 'h4', className: 'text-16 text-18_md' },
        5: { tag: 'h5', className: 'text-24' },
        6: { tag: 'h6', className: 'text-24' },
        default: { tag: 'h2', className: 'text-24 text-28_md text-32_lg' }
    };
    const { level, content } = data;
    const _props = tagConfigByLevel[level] || tagConfigByLevel.default;

    const Component = _props.tag;

    const fontClass = level === 4 ? 'roboto roboto-bold' : 'prumo prumo-light';
    return (
        <Component
            className={`${fontClass} ${_props.className}`}
            data-section={normalize(content)}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

Subtitle.propTypes = {
    data: PropTypes.shape({
        level: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired
};

export default Subtitle;
