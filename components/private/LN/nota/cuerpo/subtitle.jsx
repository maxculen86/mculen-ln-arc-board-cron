import React from 'react';
import ComTitle from '../../../common/com-title';

const LEGACY_HEADING_CONFIG = {
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

const getLegacyHeadingConfig = level => ({
    ...LEGACY_HEADING_CONFIG.defaults,
    ...LEGACY_HEADING_CONFIG.variantsByLevel.get(level)
});

function Subtitle({ data }) {
    const { level, content, alignment } = data;

    const config = getLegacyHeadingConfig(level);

    return (
        <ComTitle
            tag={config.tag}
            size={config.size}
            classCondition={config.classCondition}
            content={content}
            weight={config.weight}
            font={config.font}
            alignment={alignment}
        />
    );
}

Subtitle.arcType = 'header';
Subtitle.isStatic = true;

export default Subtitle;
