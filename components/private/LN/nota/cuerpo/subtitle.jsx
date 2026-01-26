import React from 'react';
import ComTitle from '../../../common/com-title';

import { getHeadingConfig } from '../../../../features/LN/common/heading/_helpers';

function Subtitle({ data }) {
    const { level, content } = data;

    const config = getHeadingConfig(level);

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

export default Subtitle;
