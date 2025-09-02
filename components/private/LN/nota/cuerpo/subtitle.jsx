import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';

function Subtitle({ data }) {
    const { level, content } = data;

    const SUBTITLE_CONFIG = {
        defaults: {
            weight: '--font-extra',
            tag: 'h4',
            size: '--m'
        },
        variantsByLevel: new Map([
            [1, { tag: 'h2', size: '--xl' }],
            [2, { tag: 'h3', size: '--l' }],
            [4, { classCondition: 'underline' }]
        ])
    };

    const config = {
        ...SUBTITLE_CONFIG.defaults,
        ...SUBTITLE_CONFIG.variantsByLevel.get(level)
    };

    return (
        <ComTitle
            tag={config.tag}
            size={config.size}
            classCondition={config.classCondition}
            content={content}
            weight={config.weight}
            font={config.font}
        />
    );
}

Subtitle.arcType = 'header';
Subtitle.isStatic = true;

Subtitle.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default Subtitle;
